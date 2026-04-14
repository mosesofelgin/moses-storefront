import archiver from "archiver";
import { Readable } from "stream";
import https from "https";
import http from "http";

export interface AssetFile {
  url: string;
  filename: string;
}

/**
 * Download a file from URL and return as buffer
 */
async function downloadFile(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;

    protocol
      .get(url, (response) => {
        if (response.statusCode && response.statusCode >= 400) {
          reject(new Error(`Failed to download file: ${response.statusCode}`));
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
 * Create a ZIP archive containing multiple files
 * Returns a readable stream of the ZIP file
 */
export async function createZipArchive(
  files: AssetFile[]
): Promise<{ stream: Readable; size: number }> {
  const archive = archiver("zip", {
    zlib: { level: 6 },
  });

  let totalSize = 0;

  // Start adding files to the archive
  (async () => {
    try {
      for (const file of files) {
        try {
          const buffer = await downloadFile(file.url);
          archive.append(buffer, { name: file.filename });
          totalSize += buffer.length;
        } catch (error) {
          console.error(`Failed to download file ${file.filename}:`, error);
          // Continue with other files even if one fails
        }
      }
      await archive.finalize();
    } catch (error) {
      console.error("Error creating ZIP archive:", error);
      archive.destroy();
    }
  })();

  return {
    stream: archive,
    size: totalSize,
  };
}

/**
 * Create a ZIP archive for the Brand Images + Lyric PDF product
 */
export async function createBrandImagesBundle(): Promise<{ stream: Readable; size: number }> {
  const files: AssetFile[] = [
    // Brand Images
    {
      url: "https://d1o3xwbqmqkzlb.cloudfront.net/ChatGPTImageMar31,2026,09_21_37PM.png",
      filename: "album-cover.png",
    },
    {
      url: "https://d1o3xwbqmqkzlb.cloudfront.net/TOP_01.jpg",
      filename: "brand-image-01.jpg",
    },
    {
      url: "https://d1o3xwbqmqkzlb.cloudfront.net/TOP_04.jpg",
      filename: "brand-image-02.jpg",
    },
    {
      url: "https://d1o3xwbqmqkzlb.cloudfront.net/TOP_05.jpg",
      filename: "brand-image-03.jpg",
    },

    // Lyric book
    {
      url: "https://d1o3xwbqmqkzlb.cloudfront.net/FINAL_PRAYER_PROCESS_LOG_001_9e12e531.pdf",
      filename: "lyric-book.pdf",
    },
  ];

  return createZipArchive(files);
}

/**
 * Create a ZIP archive for the CLARITY album bundle
 */
export async function createClarityBundle(): Promise<{ stream: Readable; size: number }> {
  const files: AssetFile[] = [
    // Tracks
    {
      url: "https://d1o3xwbqmqkzlb.cloudfront.net/1-Moses-FinalPrayerByMoses.mp3",
      filename: "01-Final Prayer by Moses.mp3",
    },
    {
      url: "https://d1o3xwbqmqkzlb.cloudfront.net/02-Moses-WishIhadyou.mp3",
      filename: "02-Wish I had you.mp3",
    },
    {
      url: "https://d1o3xwbqmqkzlb.cloudfront.net/03-Moses-GetToTheStu.mp3",
      filename: "03-Get To The Stu.mp3",
    },
    {
      url: "https://d1o3xwbqmqkzlb.cloudfront.net/04-Moses-Over.mp3",
      filename: "04-Over.mp3",
    },
    {
      url: "https://d1o3xwbqmqkzlb.cloudfront.net/05-Moses-Clarity.mp3",
      filename: "05-Clarity.mp3",
    },
    {
      url: "https://d1o3xwbqmqkzlb.cloudfront.net/06-Moses-Pressure.mp3",
      filename: "06-Pressure.mp3",
    },
    {
      url: "https://d1o3xwbqmqkzlb.cloudfront.net/07-Moses-Amen.mp3",
      filename: "07-Amen.mp3",
    },
    {
      url: "https://d1o3xwbqmqkzlb.cloudfront.net/08-Moses-Blessed.mp3",
      filename: "08-Blessed.mp3",
    },
    {
      url: "https://d1o3xwbqmqkzlb.cloudfront.net/09-Moses-Testimony.mp3",
      filename: "09-Testimony.mp3",
    },
    {
      url: "https://d1o3xwbqmqkzlb.cloudfront.net/10-Moses-Intro.mp3",
      filename: "10-Intro.mp3",
    },
    {
      url: "https://d1o3xwbqmqkzlb.cloudfront.net/11-Moses-Bridge.mp3",
      filename: "11-Bridge.mp3",
    },
    {
      url: "https://d1o3xwbqmqkzlb.cloudfront.net/12-Moses-Outro.mp3",
      filename: "12-Outro.mp3",
    },

    // Images
    {
      url: "https://d1o3xwbqmqkzlb.cloudfront.net/ChatGPTImageMar31,2026,09_21_37PM.png",
      filename: "album-cover.png",
    },
    {
      url: "https://d1o3xwbqmqkzlb.cloudfront.net/TOP_01.jpg",
      filename: "brand-image-01.jpg",
    },
    {
      url: "https://d1o3xwbqmqkzlb.cloudfront.net/TOP_04.jpg",
      filename: "brand-image-02.jpg",
    },
    {
      url: "https://d1o3xwbqmqkzlb.cloudfront.net/TOP_05.jpg",
      filename: "brand-image-03.jpg",
    },

    // Lyric book
    {
      url: "https://d1o3xwbqmqkzlb.cloudfront.net/FINAL_PRAYER_PROCESS_LOG_001_9e12e531.pdf",
      filename: "lyric-book.pdf",
    },
  ];

  return createZipArchive(files);
}
