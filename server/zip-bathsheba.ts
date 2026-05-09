import { Readable } from "stream";
import https from "https";
import http from "http";
import archiver from "archiver";

interface Track {
  id: number;
  number: number;
  title: string;
  duration: string;
  url: string;
}

const bathshebaTrackList: Track[] = [
  {
    id: 1,
    number: 1,
    title: 'Close To You',
    duration: '3:00',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/closetoyou_d541cc09.mp3',
  },
  {
    id: 2,
    number: 2,
    title: 'Vices Master',
    duration: '3:11',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/vicesmaster_0f7cb1af.mp3',
  },
  {
    id: 3,
    number: 3,
    title: 'Man I Want To Be',
    duration: '2:28',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/ManIwanttoBe_578133b6.mp3',
  },
  {
    id: 4,
    number: 4,
    title: 'Deal With Me',
    duration: '2:35',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/dealwithme-001_b7c3d6d1.mp3',
  },
  {
    id: 5,
    number: 5,
    title: 'Faith On It',
    duration: '3:15',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/faithonit_d7911a38.mp3',
  },
  {
    id: 6,
    number: 6,
    title: 'Monopoly',
    duration: '2:41',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/monopoly_e31e0efe.mp3',
  },
  {
    id: 7,
    number: 7,
    title: 'Naval',
    duration: '3:20',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/Naval_d8eed78e.mp3',
  },
  {
    id: 8,
    number: 8,
    title: 'Nothing Personal',
    duration: '2:26',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/nothingpersonal_93486785.mp3',
  },
  {
    id: 9,
    number: 9,
    title: '1212',
    duration: '2:58',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/1212_221875d6.mp3',
  },
  {
    id: 10,
    number: 10,
    title: 'Bathsheba',
    duration: '2:14',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/bathsheba_c989bd50.mp3',
  },
];

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

export async function createBathshebaBundle(): Promise<Readable> {
  const archive = archiver("zip", { zlib: { level: 9 } });

  // Add all tracks
  for (const track of bathshebaTrackList) {
    try {
      const buffer = await downloadFile(track.url);
      const filename = `${track.number.toString().padStart(2, "0")}-${track.title}.mp3`;
      archive.append(buffer, { name: `BATHSHEBA/${filename}` });
      console.log(`[Bathsheba ZIP] Added ${filename}`);
    } catch (error) {
      console.error(`[Bathsheba ZIP] Error fetching ${track.title}:`, error);
    }
  }

  archive.finalize();
  return archive;
}
