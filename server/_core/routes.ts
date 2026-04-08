import { Express, Request, Response } from "express";
import { verifyDownloadToken, getOrderByToken } from "../downloads";
import { createClarityBundle } from "../zip-service";
import { verifyWebhookSignature, processWebhookEvent } from "./stripe-webhook";
import { streamZipDownload, getClarityAlbumFiles } from "./zip-download";
import https from "https";
import http from "http";

/**
 * Download a file from URL and stream it to response
 */
async function streamFileFromUrl(url: string, res: Response): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;

    protocol
      .get(url, (response) => {
        if (response.statusCode && response.statusCode >= 400) {
          res.status(404).send("File not found");
          reject(new Error(`Failed to download file: ${response.statusCode}`));
          return;
        }

        // Set content type and disposition headers
        const contentType = response.headers["content-type"] || "application/octet-stream";
        const filename = url.split("/").pop() || "download";

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
 */
export function registerRoutes(app: Express) {
  /**
   * GET /api/download/:token/:fileId
   * Download a single file from the CLARITY bundle
   */
  app.get("/api/download/:token/:fileId", async (req: Request, res: Response) => {
    try {
      const { token, fileId } = req.params;

      // Verify token
      const tokenData = verifyDownloadToken(token);
      if (!tokenData) {
        return res.status(401).json({ error: "Invalid or expired download token" });
      }

      // Get order to verify it exists
      const order = await getOrderByToken(token);
      if (!order) {
        return res.status(401).json({ error: "Order not found" });
      }

      // Map file IDs to URLs
      const fileMap: Record<string, string> = {
        // Tracks
        "track-01": "https://d1o3xwbqmqkzlb.cloudfront.net/1-Moses-FinalPrayerByMoses.mp3",
        "track-02": "https://d1o3xwbqmqkzlb.cloudfront.net/02-Moses-WishIhadyou.mp3",
        "track-03": "https://d1o3xwbqmqkzlb.cloudfront.net/03-Moses-GetToTheStu.mp3",
        "track-04": "https://d1o3xwbqmqkzlb.cloudfront.net/04-Moses-Over.mp3",
        "track-05": "https://d1o3xwbqmqkzlb.cloudfront.net/05-Moses-Clarity.mp3",
        "track-06": "https://d1o3xwbqmqkzlb.cloudfront.net/06-Moses-Pressure.mp3",
        "track-07": "https://d1o3xwbqmqkzlb.cloudfront.net/07-Moses-Amen.mp3",
        "track-08": "https://d1o3xwbqmqkzlb.cloudfront.net/08-Moses-Blessed.mp3",
        "track-09": "https://d1o3xwbqmqkzlb.cloudfront.net/09-Moses-Testimony.mp3",
        "track-10": "https://d1o3xwbqmqkzlb.cloudfront.net/10-Moses-Intro.mp3",
        "track-11": "https://d1o3xwbqmqkzlb.cloudfront.net/11-Moses-Bridge.mp3",
        "track-12": "https://d1o3xwbqmqkzlb.cloudfront.net/12-Moses-Outro.mp3",

        // Images
        "image-01": "https://d1o3xwbqmqkzlb.cloudfront.net/ChatGPTImageMar31,2026,09_21_37PM.png",
        "image-02": "https://d1o3xwbqmqkzlb.cloudfront.net/TOP_01.jpg",
        "image-03": "https://d1o3xwbqmqkzlb.cloudfront.net/TOP_04.jpg",
        "image-04": "https://d1o3xwbqmqkzlb.cloudfront.net/TOP_05.jpg",

        // Lyric book
        "lyric-book": "https://d1o3xwbqmqkzlb.cloudfront.net/FINAL_PRAYER_PROCESS_LOG_001_9e12e531.pdf",
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

  /**
   * GET /api/download/all/:token
   * Download all files as a ZIP archive
   */
  app.get("/api/download/all/:token", async (req: Request, res: Response) => {
    try {
      const { token } = req.params;

      // Verify token
      const tokenData = verifyDownloadToken(token);
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
   * GET /api/download/zip
   * Download CLARITY album as ZIP (no token required for testing)
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

}
