import { Response } from "express";
import archiver from "archiver";
import https from "https";

interface FileToZip {
  url: string;
  filename: string;
}

/**
 * Download file from URL and return as buffer
 */
async function downloadFile(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
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
    // Create archiver instance
    const archive = archiver("zip", {
      zlib: { level: 9 }, // Maximum compression
    });

    // Set response headers
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    // Pipe archive to response
    archive.pipe(res);

    // Add files to archive
    let filesAdded = 0;
    let filesFailed = 0;

    for (const file of files) {
      try {
        console.log(`[ZIP] Downloading: ${file.filename}`);
        const buffer = await downloadFile(file.url);
        archive.append(buffer, { name: file.filename });
        filesAdded++;
        console.log(`[ZIP] Added: ${file.filename} (${buffer.length} bytes)`);
      } catch (error) {
        filesFailed++;
        console.error(`[ZIP] Failed to download ${file.filename}:`, error);
        // Continue with other files
      }
    }

    console.log(`[ZIP] Finalized: ${filesAdded} files added, ${filesFailed} failed`);

    // Finalize archive
    await archive.finalize();

    // Log completion
    res.on("finish", () => {
      console.log(`[ZIP] Download complete: ${filename}`);
    });
  } catch (error) {
    console.error("[ZIP] Stream error:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to create ZIP file" });
    }
  }
}

/**
 * Get CLARITY album files for ZIP
 */
export function getClarityAlbumFiles(): FileToZip[] {
  return [
    // Tracks - Using correct CDN URLs
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/1-Moses-FinalPrayerByMoses_59ef240a.mp3",
      filename: "01-Final Prayer by Moses.mp3",
    },
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/02-Moses-WishIhadyou_d4722b46.mp3",
      filename: "02-Wish I had you.mp3",
    },
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/03-Moses-GetToTheStu_009423b1.mp3",
      filename: "03-Get to the Studio.mp3",
    },
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/04-Moses-Over_4bc34543.mp3",
      filename: "04-Over.mp3",
    },
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/05-Moses-FadeAway_6090551e.mp3",
      filename: "05-Fade Away.mp3",
    },
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/06-Moses-King_87865f2d.mp3",
      filename: "06-King.mp3",
    },
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/07-Moses-Soulja_e2048960.mp3",
      filename: "07-Soulja.mp3",
    },
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/08-Moses-DearKobe_b8c30f90.mp3",
      filename: "08-Dear Kobe.mp3",
    },
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/09-Moses-Refined_8f8b1a7c.mp3",
      filename: "09-Refined.mp3",
    },
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/10-Moses-LookAtAllTheseBlessings_a3886331.mp3",
      filename: "10-Look at All These Blessings.mp3",
    },
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/11-Moses-Platform_de1f0890.mp3",
      filename: "11-Platform.mp3",
    },
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/12-Moses-SweetDreams_fede9cb2.mp3",
      filename: "12-Sweet Dreams.mp3",
    },

    // Images - Using correct CDN URLs
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/ChatGPTImageMar19,2026,11_14_44AM_e03b7f14.png",
      filename: "album-cover.png",
    },
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/TOP_01_befedf39.jpg",
      filename: "brand-image-01-camo.jpg",
    },
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/TOP_04_fe2e5b34.jpg",
      filename: "brand-image-02-graphic-tee.jpg",
    },
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/TOP_05_6c9fd106.jpg",
      filename: "brand-image-03-white-shirt.jpg",
    },

    // Lyric book
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/FINAL_PRAYER_PROCESS_LOG_001_9e12e531_94f36142.pdf",
      filename: "CLARITY-Lyric-Book.pdf",
    },
  ];
}
