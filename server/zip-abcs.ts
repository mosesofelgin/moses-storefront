// ─────────────────────────────────────────────────────────────────────────────
// Back to Basics: ABCs — ZIP Bundle Builder
// Streams all 11 tracks as a single ZIP archive for free download.
// ─────────────────────────────────────────────────────────────────────────────

import archiver from 'archiver';
import { PassThrough } from 'stream';
import type { Response } from 'express';

const ABCS_TRACKS = [
  {
    filename: '01-Not Perfect.mp3',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/notperfect_c2788245.mp3',
  },
  {
    filename: '02-ABCs.mp3',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/abcs_631c6cc4.mp3',
  },
  {
    filename: '03-Big Ol Booty.mp3',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/bigolbooty_6b569e34.mp3',
  },
  {
    filename: "04-God's Here.mp3",
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/Godshere_dde858ca.mp3',
  },
  {
    filename: '05-Plant a Seed.mp3',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/plantaseed_0ee8ff82.mp3',
  },
  {
    filename: '06-Project 7 Español.mp3',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/project7espanol_fd1ae6c7.mp3',
  },
  {
    filename: '07-Reaper Amp.mp3',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/reaperamp_981e5763.mp3',
  },
  {
    filename: '08-On the Run.mp3',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/ontherun_066b1f82.mp3',
  },
  {
    filename: '09-On.mp3',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/On_8b970a31.mp3',
  },
  {
    filename: '10-Wake Up Call.mp3',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/wakeupcall_eb96a006.mp3',
  },
  {
    filename: '11-Revenue Numbers.mp3',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/revnuenumbers_b6197d00.mp3',
  },
];

export async function streamAbcsZip(res: Response) {
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader(
    'Content-Disposition',
    'attachment; filename="Back-to-Basics-ABCs.zip"'
  );
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  const archive = archiver('zip', { zlib: { level: 0 } });
  archive.pipe(res);

  for (const track of ABCS_TRACKS) {
    console.log(`[ABCs ZIP] Adding ${track.filename}`);
    const response = await fetch(track.url);
    if (!response.ok || !response.body) {
      console.error(
        `[ABCs ZIP] Failed to fetch ${track.filename}: ${response.status}`
      );
      continue;
    }
    const pass = new PassThrough();
    const reader = (response.body as any).getReader();
    (async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          pass.end();
          break;
        }
        pass.write(value);
      }
    })();
    archive.append(pass, { name: track.filename });
    await new Promise<void>((resolve) => pass.on('end', resolve));
  }

  await archive.finalize();
}
