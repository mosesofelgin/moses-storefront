import { Response } from "express";
import archiver from "archiver";
import https from "https";
import http from "http";

interface FileToZip {
  url: string;
  filename: string;
}

/**
 * Download file from URL and return as buffer — follows redirects
 */
async function downloadFile(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;
    protocol
      .get(url, (response) => {
        // Follow redirects
        if (
          response.statusCode &&
          response.statusCode >= 300 &&
          response.statusCode < 400 &&
          response.headers.location
        ) {
          downloadFile(response.headers.location).then(resolve).catch(reject);
          return;
        }
        if (response.statusCode && response.statusCode >= 400) {
          reject(new Error(`HTTP ${response.statusCode}: ${url}`));
          return;
        }
        const chunks: Buffer[] = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () => resolve(Buffer.concat(chunks)));
        response.on("error", reject);
      })
      .on("error", reject);
  });
}

/**
 * Stream ZIP file directly to response
 */
export async function streamZipDownload(
  files: FileToZip[],
  res: Response,
  filename: string = "download.zip"
): Promise<void> {
  try {
    const archive = archiver("zip", { zlib: { level: 6 } });

    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename}"`
    );
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

    archive.pipe(res);

    let added = 0;
    let failed = 0;

    for (const file of files) {
      try {
        console.log(`[ZIP] Fetching: ${file.filename}`);
        const buffer = await downloadFile(file.url);
        archive.append(buffer, { name: file.filename });
        added++;
        console.log(`[ZIP] Added: ${file.filename} (${buffer.length} bytes)`);
      } catch (err) {
        failed++;
        console.error(`[ZIP] Skipped ${file.filename}:`, err);
      }
    }

    console.log(`[ZIP] Finalizing — ${added} added, ${failed} failed`);
    await archive.finalize();
  } catch (error) {
    console.error("[ZIP] Fatal error:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to create ZIP file" });
    }
  }
}

const CDN =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk";

/**
 * CLARITY album files — URLs match clarity-bundle.ts exactly
 */
export function getClarityAlbumFiles(): FileToZip[] {
  return [
    {
      url: `${CDN}/1-Moses-FinalPrayerByMoses_11c2ba3f.mp3`,
      filename: "01-Final Prayer by Moses.mp3",
    },
    {
      url: `${CDN}/02-Moses-WishIhadyou_16091eff.mp3`,
      filename: "02-Wish I Had You.mp3",
    },
    {
      url: `${CDN}/03-Moses-GetToTheStu_fdbb7ebb.mp3`,
      filename: "03-Get to the Studio.mp3",
    },
    {
      url: `${CDN}/over_3b8e9f0f.mp3`,
      filename: "04-Over.mp3",
    },
    {
      url: `${CDN}/05-Moses-FadeAway_5363cc88.mp3`,
      filename: "05-Fade Away.mp3",
    },
    {
      url: `${CDN}/06-Moses-King_e592ea70.mp3`,
      filename: "06-King.mp3",
    },
    {
      url: `${CDN}/07-Moses-Soulja_7ba0876c.mp3`,
      filename: "07-Soulja.mp3",
    },
    {
      url: `${CDN}/08-Moses-DearKobe_bfa7dc5b.mp3`,
      filename: "08-Dear Kobe.mp3",
    },
    {
      url: `${CDN}/09-Moses-Refined_ba82d395.mp3`,
      filename: "09-Refined.mp3",
    },
    {
      url: `${CDN}/10-Moses-LookAtAllTheseBlessings_4b5725ec.mp3`,
      filename: "10-Look at All These Blessings.mp3",
    },
    {
      url: `${CDN}/11-Moses-Platform_cf321b03.mp3`,
      filename: "11-Platform.mp3",
    },
    {
      url: `${CDN}/12-Moses-SweetDreams_37d7f3ad.mp3`,
      filename: "12-Sweet Dreams.mp3",
    },
    {
      url: `${CDN}/album-cover_2118610e.png`,
      filename: "album-cover.png",
    },
    {
      url: `${CDN}/TOP_01_aaeff941.jpg`,
      filename: "moses-camo.jpg",
    },
    {
      url: `${CDN}/TOP_04_edae7ba8.jpg`,
      filename: "moses-graphic-tee.jpg",
    },
    {
      url: `${CDN}/TOP_05_b7f42eb5.jpg`,
      filename: "moses-white-shirt.jpg",
    },
    {
      url: `${CDN}/ChatGPTImageMar19,2026,11_14_44AM_97e635c2.png`,
      filename: "moses-studio-session.png",
    },
  ];
}
