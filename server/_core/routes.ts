import { Express, Request, Response } from "express";
import { verifyDownloadToken, getOrderByToken } from "../downloads";
import { createClarityBundle } from "../zip-service";
import { createDedicationBundle, getDedicationAlbumFiles } from "../zip-dedication";
import { createBathshebaBundle } from "../zip-bathsheba";
import { streamAbcsZip } from "../zip-abcs";
import { streamNewGenesisZip } from "../zip-new-genesis";
import { streamMixtapeZip } from "../zip-mixtape";
import { verifyWebhookSignature, processWebhookEvent } from "./stripe-webhook";
import { streamZipDownload, getClarityAlbumFiles } from "./zip-download";
import https from "https";
import http from "http";

/**
 * Download a file from URL and stream it to response
 * @param overrideHeaders - if provided, use these instead of deriving from URL
 */
async function streamFileFromUrl(
  url: string,
  res: Response,
  overrideHeaders?: { contentType?: string; filename?: string }
): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;

    protocol
      .get(url, (response) => {
        if (response.statusCode && response.statusCode >= 400) {
          res.status(404).send("File not found");
          reject(new Error(`Failed to download file: ${response.statusCode}`));
          return;
        }

        // Use override headers if provided, otherwise derive from URL
        const contentType = overrideHeaders?.contentType ||
          response.headers["content-type"] || "application/octet-stream";
        const filename = overrideHeaders?.filename ||
          (url.split("/").pop() || "download").split("?")[0]; // strip query string

        res.setHeader("Content-Type", contentType);
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

        response.pipe(res);
        response.on("end", resolve);
        response.on("error", reject);
      })
      .on("error", reject);
  });
}

/**
 * Register download and webhook routes
 * IMPORTANT: More specific routes must be registered BEFORE parameterized routes.
 * /api/download/zip and /api/download/all/:token must come before /api/download/:token/:fileId
 * otherwise Express matches "all" as the :token param and the token as :fileId.
 */
export function registerRoutes(app: Express) {

  /**
   * GET /api/download/epk/:docId
   * Proxy EPK documents directly from storage (no redirect — avoids CORS blob issue)
   * docId: one-sheet | short-bio | long-bio | press-kit
   */
  app.get("/api/download/epk/:docId", async (req: Request, res: Response) => {
    const EPK_FILES: Record<string, { key: string; filename: string; contentType: string }> = {
      "one-sheet":  { key: "MOSES_One-Sheet_e1a3ef3f.pdf",   filename: "MOSES_One-Sheet.pdf",   contentType: "application/pdf" },
      "short-bio":  { key: "MOSES_Short-Bio_32574b0d.pdf",   filename: "MOSES_Short-Bio.pdf",   contentType: "application/pdf" },
      "long-bio":   { key: "MOSES_Long-Bio_5f05e4ad.pdf",    filename: "MOSES_Long-Bio.pdf",    contentType: "application/pdf" },
      "press-kit":  { key: "MOSES_Press-Kit_bcce9997.zip",   filename: "MOSES_Press-Kit.zip",   contentType: "application/zip" },
    };

    const doc = EPK_FILES[req.params.docId];
    if (!doc) {
      return res.status(404).json({ error: "EPK document not found" });
    }

    try {
      // Get signed URL from forge
      const forgeUrl = new URL(
        "v1/storage/presign/get",
        (process.env.BUILT_IN_FORGE_API_URL || "").replace(/\/+$/, "") + "/",
      );
      forgeUrl.searchParams.set("path", doc.key);
      const forgeResp = await fetch(forgeUrl.toString(), {
        headers: { Authorization: `Bearer ${process.env.BUILT_IN_FORGE_API_KEY}` },
      });
      if (!forgeResp.ok) {
        console.error(`[EPK Download] Forge error: ${forgeResp.status}`);
        return res.status(502).json({ error: "Storage backend error" });
      }
      const { url: signedUrl } = (await forgeResp.json()) as { url: string };
      if (!signedUrl) {
        return res.status(502).json({ error: "Empty signed URL" });
      }

      // Stream the file bytes directly to the client (no redirect)
      // Pass override headers so streamFileFromUrl uses our clean filename, not the signed URL path
      await streamFileFromUrl(signedUrl, res, {
        contentType: doc.contentType,
        filename: doc.filename,
      });
      console.log(`[EPK Download] Served ${doc.filename}`);
    } catch (err) {
      console.error("[EPK Download] Error:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to download EPK document" });
      }
    }
  });

  /**
   * GET /api/download/bathsheba
   * Download Bathsheba project as ZIP (no token required — free download)
   * MUST be registered before /api/download/all/:token to avoid route collision
   */
  app.get("/api/download/bathsheba", async (req: Request, res: Response) => {
    try {
      console.log("[Bathsheba Download] Request received");
      const stream = await createBathshebaBundle();

      // Set response headers
      res.setHeader("Content-Type", "application/zip");
      res.setHeader('Content-Disposition', 'attachment; filename="BATHSHEBA-Project.zip"');
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

      // Stream ZIP to client
      stream.pipe(res);

      stream.on("error", (error) => {
        console.error("[Bathsheba Download] Error:", error);
        if (!res.headersSent) {
          res.status(500).json({ error: "Failed to create ZIP archive" });
        }
      });
    } catch (error) {
      console.error("[Bathsheba Download] Error:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to download ZIP" });
      }
    }
  });

  /**
   * GET /api/download/dedication
   * Download Dedication mixtape as ZIP (no token required — free download)
   * MUST be registered before /api/download/all/:token to avoid route collision
   */
  app.get("/api/download/dedication", async (req: Request, res: Response) => {
    try {
      console.log("[Dedication Download] Request received");
      const { stream } = await createDedicationBundle();

      // Set response headers
      res.setHeader("Content-Type", "application/zip");
      res.setHeader('Content-Disposition', 'attachment; filename="DEDICATION-Mixtape.zip"');
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

      // Stream ZIP to client
      stream.pipe(res);

      stream.on("error", (error) => {
        console.error("[Dedication Download] Error:", error);
        if (!res.headersSent) {
          res.status(500).json({ error: "Failed to create ZIP archive" });
        }
      });
    } catch (error) {
      console.error("[Dedication Download] Error:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to download ZIP" });
      }
    }
  });

  /**
   * GET /api/download/abcs
   * Download Back to Basics: ABCs project as ZIP (no token required — free download)
   * MUST be registered before /api/download/all/:token to avoid route collision
   */
  app.get("/api/download/abcs", async (req: Request, res: Response) => {
    try {
      console.log("[ABCs Download] Request received");
      await streamAbcsZip(res);
    } catch (error) {
      console.error("[ABCs Download] Error:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to download ZIP" });
      }
    }
  });

  /**
   * GET /api/download/new-genesis
   * Download New Genesis project as ZIP (no token required — free download)
   */
  app.get("/api/download/new-genesis", async (req: Request, res: Response) => {
    try {
      console.log("[New Genesis Download] Request received");
      await streamNewGenesisZip(res);
    } catch (error) {
      console.error("[New Genesis Download] Error:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to download ZIP" });
      }
    }
  });

  /**
   * GET /api/download/mixtape
   * Download If I Wrote A Mixtape as ZIP (no token required — free download)
   */
  app.get("/api/download/mixtape", async (req: Request, res: Response) => {
    try {
      console.log("[Mixtape Download] Request received");
      await streamMixtapeZip(res);
    } catch (error) {
      console.error("[Mixtape Download] Error:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to download ZIP" });
      }
    }
  });

  /**
   * GET /api/download/zip
   * Download CLARITY album as ZIP (no token required — for paid Stripe customers on /success page)
   */
  app.get("/api/download/zip", async (req: Request, res: Response) => {
    try {
      console.log("[ZIP Download] Request received");
      const files = getClarityAlbumFiles();
      await streamZipDownload(files, res, "CLARITY-Album-Bundle.zip");
    } catch (error) {
      console.error("[ZIP Download] Error:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to create ZIP file" });
      }
    }
  });

  /**
   * GET /api/download/all/:token
   * Download all files as a ZIP archive (token-protected — for free order customers)
   * MUST be registered before /api/download/:token/:fileId to avoid route collision
   */
  app.get("/api/download/all/:token", async (req: Request, res: Response) => {
    try {
      const { token } = req.params;

      // Verify token
      const tokenData = await verifyDownloadToken(token);
      if (!tokenData) {
        return res.status(401).json({ error: "Invalid or expired download token" });
      }

      // Get order to verify it exists
      const order = await getOrderByToken(token);
      if (!order) {
        return res.status(401).json({ error: "Order not found" });
      }

      // Create ZIP archive
      const { stream } = await createClarityBundle();

      // Set response headers
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", 'attachment; filename="CLARITY-Album-Bundle.zip"');
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

      // Stream ZIP to client
      stream.pipe(res);

      stream.on("error", (error) => {
        console.error("[Download ZIP] Error:", error);
        if (!res.headersSent) {
          res.status(500).json({ error: "Failed to create ZIP archive" });
        }
      });
    } catch (error) {
      console.error("[Download ZIP] Error:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to download ZIP" });
      }
    }
  });

  /**
   * GET /api/download/:token/:fileId
   * Download a single file from the CLARITY bundle
   * MUST be registered AFTER the more specific routes above
   */
  app.get("/api/download/:token/:fileId", async (req: Request, res: Response) => {
    try {
      const { token, fileId } = req.params;

      // Verify token
      const tokenData = await verifyDownloadToken(token);
      if (!tokenData) {
        return res.status(401).json({ error: "Invalid or expired download token" });
      }

      // Get order to verify it exists
      const order = await getOrderByToken(token);
      if (!order) {
        return res.status(401).json({ error: "Order not found" });
      }

      const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk";

      // Map file IDs to URLs (new CDN, all MP3)
      const fileMap: Record<string, string> = {
        // Tracks
        "track-01": `${CDN}/1-Moses-FinalPrayerByMoses_11c2ba3f.mp3`,
        "track-02": `${CDN}/02-Moses-WishIhadyou_16091eff.mp3`,
        "track-03": `${CDN}/03-Moses-GetToTheStu_fdbb7ebb.mp3`,
        "track-04": `${CDN}/over_3b8e9f0f.mp3`,
        "track-05": `${CDN}/05-Moses-FadeAway_5363cc88.mp3`,
        "track-06": `${CDN}/06-Moses-King_e592ea70.mp3`,
        "track-07": `${CDN}/07-Moses-Soulja_7ba0876c.mp3`,
        "track-08": `${CDN}/08-Moses-DearKobe_bfa7dc5b.mp3`,
        "track-09": `${CDN}/09-Moses-Refined_ba82d395.mp3`,
        "track-10": `${CDN}/10-Moses-LookAtAllTheseBlessings_4b5725ec.mp3`,
        "track-11": `${CDN}/11-Moses-Platform_cf321b03.mp3`,
        "track-12": `${CDN}/12-Moses-SweetDreams_37d7f3ad.mp3`,

        // Images
        "image-01": `${CDN}/album-cover_2118610e.png`,
        "image-02": `${CDN}/TOP_01_aaeff941.jpg`,
        "image-03": `${CDN}/TOP_04_edae7ba8.jpg`,
        "image-04": `${CDN}/TOP_05_b7f42eb5.jpg`,
        "image-05": `${CDN}/ChatGPTImageMar19,2026,11_14_44AM_97e635c2.png`,

        // Lyric book
        "lyric-book": `${CDN}/CLARITY-Lyric-Book_7b3f1a4c.pdf`,
      };

      const fileUrl = fileMap[fileId];
      if (!fileUrl) {
        return res.status(404).json({ error: "File not found" });
      }

      await streamFileFromUrl(fileUrl, res);
    } catch (error) {
      console.error("[Download] Error:", error);
      res.status(500).json({ error: "Failed to download file" });
    }
  });

}
