// ─────────────────────────────────────────────────────────────────────────────
// New Genesis — Asset Bundle
// All assets hosted on CloudFront CDN.
// ─────────────────────────────────────────────────────────────────────────────

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk';

export const NEW_GENESIS_COVER = `${CDN}/new-genesis-cover_23ac8f82.png`;

export interface NewGenesisTrack {
  id: number;
  title: string;
  description: string;
  duration: string;
  url: string;
  filename: string;
}

export const NEW_GENESIS_TRACKS: NewGenesisTrack[] = [
  { id: 1,  title: 'Genesis (The Source)',       description: 'The origin. Where it all begins.',                       duration: '3:45', url: `${CDN}/01-genesis-the-source_f4613f44.mp3`,       filename: '01-Genesis (The Source).mp3' },
  { id: 2,  title: 'Exodus (The Flame)',          description: 'The departure. Fire in motion.',                         duration: '4:12', url: `${CDN}/02-exodus-the-flame_3773dd6e.mp3`,          filename: '02-Exodus (The Flame).mp3' },
  { id: 3,  title: 'Leviticus (The Return)',      description: 'Coming back to what matters.',                           duration: '3:30', url: `${CDN}/03-leviticus-the-return_032aa199.mp3`,      filename: '03-Leviticus (The Return).mp3' },
  { id: 4,  title: 'Numbers (The Rose)',          description: 'Beauty in the count.',                                   duration: '2:55', url: `${CDN}/04-numbers-the-rose_6d85fb5f.mp3`,          filename: '04-Numbers (The Rose).mp3' },
  { id: 5,  title: 'Deuteronomy (The Pen)',       description: 'The law, written again.',                                duration: '4:05', url: `${CDN}/05-deuteronomy-the-pen_75f41f5c.mp3`,       filename: '05-Deuteronomy (The Pen).mp3' },
  { id: 6,  title: 'Moses Crown',                description: 'The weight of the crown.',                               duration: '3:18', url: `${CDN}/06-moses-crown_d038626e.mp3`,               filename: '06-Moses Crown.mp3' },
  { id: 7,  title: 'Moses Just Right',           description: 'Exactly where he needs to be.',                          duration: '2:00', url: `${CDN}/07-moses-just-right_bded9d45.mp3`,          filename: '07-Moses Just Right.mp3' },
  { id: 8,  title: 'Picasso',                    description: 'Art as identity.',                                       duration: '3:20', url: `${CDN}/08-picasso_5c1180be.mp3`,                   filename: '08-Picasso.mp3' },
  { id: 9,  title: 'The Legend of Durag Mo',     description: 'A character study. A legend in the making.',             duration: '2:45', url: `${CDN}/09-legend-of-durag-mo_8be8d460.mp3`,       filename: '09-The Legend of Durag Mo.mp3' },
  { id: 10, title: 'Angels',                     description: 'Presence felt, not seen.',                               duration: '3:50', url: `${CDN}/10-angels_e0a3610a.mp3`,                    filename: '10-Angels.mp3' },
  { id: 11, title: 'Badu',                       description: 'Soul music. Rooted.',                                    duration: '4:15', url: `${CDN}/11-badu_cbebdb1e.mp3`,                      filename: '11-Badu.mp3' },
  { id: 12, title: 'Bank Roll',                  description: 'The hustle, documented.',                                duration: '3:10', url: `${CDN}/12-bankroll_66eb4b50.mp3`,                  filename: '12-Bank Roll.mp3' },
  { id: 13, title: 'Blessings of Youth',         description: 'Gratitude for the early years.',                         duration: '3:35', url: `${CDN}/13-blessings-of-youth_fa9a6c88.mp3`,        filename: '13-Blessings of Youth.mp3' },
  { id: 14, title: 'Blood Moon',                 description: 'The reckoning. Red sky, clear mind.',                   duration: '4:00', url: `${CDN}/14-blood-moon_f4283371.mp3`,                filename: '14-Blood Moon.mp3' },
  { id: 15, title: 'First Flight Book 1',        description: 'The closer. The first chapter of something larger.',     duration: '3:40', url: `${CDN}/15-first-flight-book-1_cbb968fb.mp3`,       filename: '15-First Flight Book 1.mp3' },
];

export const NEW_GENESIS_META = {
  title: 'New Genesis',
  subtitle: 'A return to the source',
  tagline: 'Recorded after the lockdown season. A return to origin, law, and wandering.',
  artist: 'MOSES SOG',
  year: '2022',
  type: 'Project',
  trackCount: NEW_GENESIS_TRACKS.length,
  totalDuration: '50:05',
  description:
    'Recorded after the lockdown season. A return to the source, exploring themes of origin, law, and wandering. It marks a new beginning — a genesis — after a period of silence and separation.',
  isFree: true,
  downloadEndpoint: '/api/download/new-genesis',
  zipFilename: 'New-Genesis.zip',
  listenPath: '/new-genesis/listen',
  landingPath: '/new-genesis',
};
