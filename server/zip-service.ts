import archiver from "archiver";
import { Readable } from "stream";
import https from "https";
import http from "http";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk";

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
    // Brand Images (new CDN)
    {
      url: `${CDN}/album-cover_2118610e.png`,
      filename: "album-cover.png",
    },
    {
      url: `${CDN}/TOP_01_aaeff941.jpg`,
      filename: "brand-image-01.jpg",
    },
    {
      url: `${CDN}/TOP_04_edae7ba8.jpg`,
      filename: "brand-image-02.jpg",
    },
    {
      url: `${CDN}/TOP_05_b7f42eb5.jpg`,
      filename: "brand-image-03.jpg",
    },

    // Lyric book
    {
      url: `${CDN}/FINAL_PRAYER_PROCESS_LOG_001_9e12e531.pdf`,
      filename: "lyric-book.pdf",
    },
  ];

  return createZipArchive(files);
}

/**
 * Create a ZIP archive for the CLARITY album bundle
 * URLs sourced from clarity-bundle.ts (new CDN, verified working)
 */
export async function createClarityBundle(): Promise<{ stream: Readable; size: number }> {
  const files: AssetFile[] = [
    // Tracks (all MP3, new CDN)
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

    // Images (new CDN)
    {
      url: `${CDN}/album-cover_2118610e.png`,
      filename: "album-cover.png",
    },
    {
      url: `${CDN}/TOP_01_aaeff941.jpg`,
      filename: "brand-image-01.jpg",
    },
    {
      url: `${CDN}/TOP_04_edae7ba8.jpg`,
      filename: "brand-image-02.jpg",
    },
    {
      url: `${CDN}/TOP_05_b7f42eb5.jpg`,
      filename: "brand-image-03.jpg",
    },
    {
      url: `${CDN}/ChatGPTImageMar19,2026,11_14_44AM_97e635c2.png`,
      filename: "brand-image-04.png",
    },

    // Lyric book
    {
      url: `${CDN}/FINAL_PRAYER_PROCESS_LOG_001_9e12e531.pdf`,
      filename: "CLARITY-Lyric-Book.pdf",
    },
  ];

  return createZipArchive(files);
}
