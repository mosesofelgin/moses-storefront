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

        // Image 05
        "image-05": `${CDN}/ChatGPTImageMar19,2026,11_14_44AM_97e635c2.png`,

        // Lyric book
        "lyric-book": `${CDN}/FINAL_PRAYER_PROCESS_LOG_001_9e12e531.pdf`,
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
