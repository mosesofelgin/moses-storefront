// ─────────────────────────────────────────────────────────────────────────────
// New Genesis — ZIP Bundle Builder
// Streams all 15 tracks as a single ZIP archive for free download.
// ─────────────────────────────────────────────────────────────────────────────

import archiver from 'archiver';
import { PassThrough } from 'stream';
import type { Response } from 'express';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk';

const NEW_GENESIS_TRACKS = [
  { filename: '01-Genesis (The Source).mp3',    url: `${CDN}/01-genesis-the-source_f4613f44.mp3` },
  { filename: '02-Exodus (The Flame).mp3',       url: `${CDN}/02-exodus-the-flame_3773dd6e.mp3` },
  { filename: '03-Leviticus (The Return).mp3',   url: `${CDN}/03-leviticus-the-return_032aa199.mp3` },
  { filename: '04-Numbers (The Rose).mp3',       url: `${CDN}/04-numbers-the-rose_6d85fb5f.mp3` },
  { filename: '05-Deuteronomy (The Pen).mp3',    url: `${CDN}/05-deuteronomy-the-pen_75f41f5c.mp3` },
  { filename: '06-Moses Crown.mp3',              url: `${CDN}/06-moses-crown_d038626e.mp3` },
  { filename: '07-Moses Just Right.mp3',         url: `${CDN}/07-moses-just-right_bded9d45.mp3` },
  { filename: '08-Picasso.mp3',                  url: `${CDN}/08-picasso_5c1180be.mp3` },
  { filename: '09-The Legend of Durag Mo.mp3',   url: `${CDN}/09-legend-of-durag-mo_8be8d460.mp3` },
  { filename: '10-Angels.mp3',                   url: `${CDN}/10-angels_e0a3610a.mp3` },
  { filename: '11-Badu.mp3',                     url: `${CDN}/11-badu_cbebdb1e.mp3` },
  { filename: '12-Bank Roll.mp3',                url: `${CDN}/12-bankroll_66eb4b50.mp3` },
  { filename: '13-Blessings of Youth.mp3',       url: `${CDN}/13-blessings-of-youth_fa9a6c88.mp3` },
  { filename: '14-Blood Moon.mp3',               url: `${CDN}/14-blood-moon_f4283371.mp3` },
  { filename: '15-First Flight Book 1.mp3',      url: `${CDN}/15-first-flight-book-1_cbb968fb.mp3` },
];

export async function streamNewGenesisZip(res: Response) {
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename="New-Genesis.zip"');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  const archive = archiver('zip', { zlib: { level: 0 } });
  archive.pipe(res);

  for (const track of NEW_GENESIS_TRACKS) {
    console.log(`[New Genesis ZIP] Adding ${track.filename}`);
    const response = await fetch(track.url);
    if (!response.ok || !response.body) {
      console.error(`[New Genesis ZIP] Failed to fetch ${track.filename}: ${response.status}`);
      continue;
    }
    const pass = new PassThrough();
    const reader = (response.body as any).getReader();
    (async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) { pass.end(); break; }
        pass.write(value);
      }
    })();
    archive.append(pass, { name: track.filename });
    await new Promise<void>((resolve) => pass.on('end', resolve));
  }

  await archive.finalize();
}
