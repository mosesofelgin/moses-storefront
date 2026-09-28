// New Genesis — paid ZIP bundle builder
// The archive is streamed only from the purchase delivery flow.

import archiver from 'archiver';
import { PassThrough } from 'stream';
import type { Response } from 'express';
import { ENV } from './_core/env';

const STORAGE = `${ENV.publicSiteUrl}/manus-storage`;

const NEW_GENESIS_FILES = [
  { filename: 'New-Genesis-Cover.webp', path: `${STORAGE}/download_aefbd102.webp` },
  { filename: '01-Genesis (The Source).mp3', path: `${STORAGE}/Moses-NewGenesis-01Genesis_dca8906c.mp3` },
  { filename: '02-Exodus (The Flame).mp3', path: `${STORAGE}/Moses-NewGenesis-02Exodus_0e754ab3.mp3` },
  { filename: '03-Leviticus (The Return).mp3', path: `${STORAGE}/Moses-NewGenesis-03Leviticus_54ce7862.mp3` },
  { filename: '04-Numbers (The Rose).mp3', path: `${STORAGE}/Moses-NewGenesis-04Numbers_a8340b55.mp3` },
  { filename: '05-Deuteronomy (The Pen).mp3', path: `${STORAGE}/Moses-NewGenesis-05Deuternomy_ca7b5fe1.mp3` },
  { filename: '06-First Flight Book 1.mp3', path: `${STORAGE}/Moses-NewGenesis-06FirstFlightBook1_8ce045ab.mp3` },
  { filename: '07-Angels.mp3', path: `${STORAGE}/Moses-NewGenesis-07Angels_22662fc0.mp3` },
  { filename: '08-Crown.mp3', path: `${STORAGE}/Moses-NewGenesis-08Crown_530945b4.mp3` },
  { filename: '09-Blood Moon.mp3', path: `${STORAGE}/Moses-NewGenesis-09BloodMoon_e04622b0.mp3` },
  { filename: '10-Suburban Picasso.mp3', path: `${STORAGE}/Moses-NewGenesis-10SuburbanPicasso_4af9deb9.mp3` },
  { filename: '11-The Legend of Durag Mo.mp3', path: `${STORAGE}/Moses-NewGenesis-11TheLegendofDu-RagMo_ed277ca4.mp3` },
  { filename: '12-Rock With Me.mp3', path: `${STORAGE}/Moses-NewGenesis-12RockWithMe_0edec750.mp3` },
  { filename: '13-Just Right.mp3', path: `${STORAGE}/Moses-NewGenesis-13JustRight_ea56d8a8.mp3` },
  { filename: '14-The Blessing of Youth.mp3', path: `${STORAGE}/Moses-NewGenesis-14TheBlessingofYouth_bab7b0df.mp3` },
  { filename: '15-Bank Roll.mp3', path: `${STORAGE}/Moses-NewGenesis-15BankRoll_96995ec6.mp3` },
  { filename: '16-First Flight Book 2.mp3', path: `${STORAGE}/Moses-NewGenesis-16FirstFlightbook2_90b911a4.mp3` },
];

export async function streamNewGenesisZip(res: Response) {
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename="New-Genesis.zip"');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  const archive = archiver('zip', { zlib: { level: 0 } });
  archive.pipe(res);

  for (const file of NEW_GENESIS_FILES) {
    const response = await fetch(file.path);
    if (!response.ok || !response.body) {
      throw new Error(`Failed to fetch ${file.filename}: ${response.status}`);
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
    archive.append(pass, { name: file.filename });
    await new Promise<void>((resolve, reject) => {
      pass.on('end', resolve);
      pass.on('error', reject);
    });
  }

  await archive.finalize();
}
