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
    // Tracks
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
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/05-Moses-Clarity_6090551e.mp3",
      filename: "05-Clarity.mp3",
    },
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/06-Moses-Pressure_87865f2d.mp3",
      filename: "06-Pressure.mp3",
    },
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/07-Moses-Amen_b1c2d3e4.mp3",
      filename: "07-Amen.mp3",
    },
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/08-Moses-Blessed_f5g6h7i8.mp3",
      filename: "08-Blessed.mp3",
    },
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/09-Moses-Testimony_j9k0l1m2.mp3",
      filename: "09-Testimony.mp3",
    },
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/10-Moses-Intro_n3o4p5q6.mp3",
      filename: "10-Intro.mp3",
    },
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/11-Moses-Bridge_r7s8t9u0.mp3",
      filename: "11-Bridge.mp3",
    },
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/12-Moses-Outro_v1w2x3y4.mp3",
      filename: "12-Outro.mp3",
    },

    // Images
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/ChatGPTImageMar31,2026,09_21_37PM.png",
      filename: "album-cover.png",
    },
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/TOP_01.jpg",
      filename: "brand-image-01.jpg",
    },
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/TOP_04.jpg",
      filename: "brand-image-02.jpg",
    },
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/TOP_05.jpg",
      filename: "brand-image-03.jpg",
    },

    // Lyric book
    {
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/FINAL_PRAYER_PROCESS_LOG_001_9e12e531.pdf",
      filename: "CLARITY-Lyric-Book.pdf",
    },
  ];
}
