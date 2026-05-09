// ─────────────────────────────────────────────────────────────────────────────
// If I Wrote A Mixtape — ZIP Bundle Builder
// Streams all 30 tracks as a single ZIP archive for free download.
// ─────────────────────────────────────────────────────────────────────────────

import archiver from 'archiver';
import { PassThrough } from 'stream';
import type { Response } from 'express';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk';

const MIXTAPE_TRACKS = [
  { filename: '01-Dishonourable.mp3',                          url: `${CDN}/01-dishonourable_3ff71577.mp3` },
  { filename: '02-Dissolve (ft. G Ikeo).mp3',                  url: `${CDN}/02-dissolve_bcaf386e.mp3` },
  { filename: '03-Drip Drop.mp3',                              url: `${CDN}/03-drip-drop_72a53b2e.mp3` },
  { filename: '04-Forces Like Mine.mp3',                       url: `${CDN}/04-forces-like-mine_6259f49d.mp3` },
  { filename: '05-God Bless (Amystic).mp3',                    url: `${CDN}/05-god-bless_bf1534a6.mp3` },
  { filename: '06-God Gift (A Work of Light).mp3',             url: `${CDN}/06-god-gift_b4f6c216.mp3` },
  { filename: '07-Humble Lady.mp3',                            url: `${CDN}/07-humble-lady_84725b30.mp3` },
  { filename: '08-Insurmountable Evidence.mp3',                url: `${CDN}/08-insurmountable-evidence_38771c3d.mp3` },
  { filename: '09-Jailed.mp3',                                 url: `${CDN}/09-jailed_90384463.mp3` },
  { filename: '10-Juice Almighty.mp3',                         url: `${CDN}/10-juice-almighty_ded84ed6.mp3` },
  { filename: '11-Love Letters to the Beloved.mp3',            url: `${CDN}/11-love-letters_5effca9c.mp3` },
  { filename: '12-Low Expectations.mp3',                       url: `${CDN}/12-low-expectations_f4d7dffc.mp3` },
  { filename: '13-Nature Boy.mp3',                             url: `${CDN}/13-nature-boy_fdaca1be.mp3` },
  { filename: '14-Next Kid.mp3',                               url: `${CDN}/14-next-kid_b4c17390.mp3` },
  { filename: '15-Not Another Love Song (ft. Lando).mp3',      url: `${CDN}/15-not-another-love-song_63bc6fe2.mp3` },
  { filename: '16-Ooouuu Freestyle.mp3',                       url: `${CDN}/16-ooouuu-freestyle_acb86cba.mp3` },
  { filename: '17-Oxygen.mp3',                                 url: `${CDN}/17-oxygen_b83ac15d.mp3` },
  { filename: '18-Prisoner.mp3',                               url: `${CDN}/18-prisoner_f505e16d.mp3` },
  { filename: '19-Rainy Days.mp3',                             url: `${CDN}/19-rainy-days_a5490c7b.mp3` },
  { filename: '20-Return.mp3',                                 url: `${CDN}/20-return_a1d734c1.mp3` },
  { filename: '21-Rudely.mp3',                                 url: `${CDN}/21-rudely_4341abcd.mp3` },
  { filename: '22-Slowly Fallin Down (ft. Mo the Poet).mp3',   url: `${CDN}/22-slowly-fallin-down_6d4898ed.mp3` },
  { filename: '23-Spared Me.mp3',                              url: `${CDN}/23-spared-me_9609b102.mp3` },
  { filename: '24-Stone of Hope.mp3',                          url: `${CDN}/24-stone-of-hope_4f44ba16.mp3` },
  { filename: '25-Terra.mp3',                                  url: `${CDN}/25-terra_4cfcb43e.mp3` },
  { filename: '26-Aftermath.mp3',                              url: `${CDN}/26-aftermath_05ac86a4.mp3` },
  { filename: '27-Anubis Clone.mp3',                           url: `${CDN}/27-anubis-clone_61b97f4d.mp3` },
  { filename: '28-Aye Man.mp3',                                url: `${CDN}/28-aye-man_c9796f74.mp3` },
  { filename: '29-Beautiful Thing Outro.mp3',                  url: `${CDN}/29-beautiful-thing-outro_1604a60d.mp3` },
  { filename: '30-Deep End.mp3',                               url: `${CDN}/30-deep-end_c3adf2fb.mp3` },
];

export async function streamMixtapeZip(res: Response) {
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename="If-I-Wrote-A-Mixtape.zip"');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  const archive = archiver('zip', { zlib: { level: 0 } });
  archive.pipe(res);

  for (const track of MIXTAPE_TRACKS) {
    console.log(`[Mixtape ZIP] Adding ${track.filename}`);
    const response = await fetch(track.url);
    if (!response.ok || !response.body) {
      console.error(`[Mixtape ZIP] Failed to fetch ${track.filename}: ${response.status}`);
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
