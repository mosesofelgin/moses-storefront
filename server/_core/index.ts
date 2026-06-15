import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { registerRoutes } from "./routes";
import { registerStorageProxy } from "./storageProxy";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  
  // Register webhook route FIRST with raw body middleware
  // This must happen before express.json() to capture the raw body for signature verification
  app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    // Store raw body for Stripe signature verification
    (req as any).rawBody = req.body;
    // Call the webhook handler
    const { verifyWebhookSignature, processWebhookEvent } = await import("./stripe-webhook");
    try {
      const signature = req.headers["stripe-signature"] as string;
      if (!signature) {
        console.error("[Stripe Webhook] Missing stripe-signature header");
        return res.status(400).json({ verified: false, error: "Missing stripe-signature header" });
      }

      // Get raw body as string for signature verification
      const body = typeof req.body === "string" ? req.body : Buffer.isBuffer(req.body) ? req.body.toString() : JSON.stringify(req.body);

      // Verify webhook signature using raw body
      const event = verifyWebhookSignature(body, signature);
      if (!event) {
        console.error("[Stripe Webhook] Invalid webhook signature");
        return res.status(400).json({ verified: false, error: "Invalid webhook signature" });
      }

      console.log(`[Stripe Webhook] Verified event: ${event.type} (${event.id})`);

      // Process the event asynchronously
      processWebhookEvent(event).catch((error: any) => {
        console.error("[Stripe Webhook] Error processing event:", error);
      });

      // Return verified: true to Stripe immediately
      return res.status(200).json({ verified: true });
    } catch (error) {
      console.error("[Stripe Webhook] Unexpected error:", error);
      return res.status(200).json({ verified: true });
    }
  });
  
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // Storage proxy for /manus-storage/* paths
  registerStorageProxy(app);
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // Download routes (webhook already registered above)
  registerRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
