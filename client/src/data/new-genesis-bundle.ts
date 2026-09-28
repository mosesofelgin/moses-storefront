// New Genesis — official release bundle
// The official album contains exactly the 16 tracks below, in this order.

const STORAGE = '/manus-storage';

export const NEW_GENESIS_COVER = `${STORAGE}/download_aefbd102.webp`;

export interface NewGenesisTrack {
  id: number;
  title: string;
  description: string;
  duration: string;
  url: string;
  filename: string;
}

export const NEW_GENESIS_TRACKS: NewGenesisTrack[] = [
  { id: 1, title: 'Genesis (The Source)', description: 'The origin. Where it all begins.', duration: '0:52', url: `${STORAGE}/Moses-NewGenesis-01Genesis_dca8906c.mp3`, filename: '01-Genesis (The Source).mp3' },
  { id: 2, title: 'Exodus (The Flame)', description: 'The departure. Fire in motion.', duration: '2:57', url: `${STORAGE}/Moses-NewGenesis-02Exodus_0e754ab3.mp3`, filename: '02-Exodus (The Flame).mp3' },
  { id: 3, title: 'Leviticus (The Return)', description: 'Coming back to what matters.', duration: '2:38', url: `${STORAGE}/Moses-NewGenesis-03Leviticus_54ce7862.mp3`, filename: '03-Leviticus (The Return).mp3' },
  { id: 4, title: 'Numbers (The Rose)', description: 'Beauty in the count.', duration: '2:27', url: `${STORAGE}/Moses-NewGenesis-04Numbers_a8340b55.mp3`, filename: '04-Numbers (The Rose).mp3' },
  { id: 5, title: 'Deuteronomy (The Pen)', description: 'The law, written again.', duration: '2:08', url: `${STORAGE}/Moses-NewGenesis-05Deuternomy_ca7b5fe1.mp3`, filename: '05-Deuteronomy (The Pen).mp3' },
  { id: 6, title: 'First Flight Book 1', description: 'The first chapter of something larger.', duration: '4:16', url: `${STORAGE}/Moses-NewGenesis-06FirstFlightBook1_8ce045ab.mp3`, filename: '06-First Flight Book 1.mp3' },
  { id: 7, title: 'Angels', description: 'Presence felt, not seen.', duration: '4:17', url: `${STORAGE}/Moses-NewGenesis-07Angels_22662fc0.mp3`, filename: '07-Angels.mp3' },
  { id: 8, title: 'Crown', description: 'The weight of the crown.', duration: '3:25', url: `${STORAGE}/Moses-NewGenesis-08Crown_530945b4.mp3`, filename: '08-Crown.mp3' },
  { id: 9, title: 'Blood Moon', description: 'The reckoning. Red sky, clear mind.', duration: '2:55', url: `${STORAGE}/Moses-NewGenesis-09BloodMoon_e04622b0.mp3`, filename: '09-Blood Moon.mp3' },
  { id: 10, title: 'Suburban Picasso', description: 'Art as identity.', duration: '2:44', url: `${STORAGE}/Moses-NewGenesis-10SuburbanPicasso_4af9deb9.mp3`, filename: '10-Suburban Picasso.mp3' },
  { id: 11, title: 'The Legend of Durag Mo', description: 'A character study. A legend in the making.', duration: '3:22', url: `${STORAGE}/Moses-NewGenesis-11TheLegendofDu-RagMo_ed277ca4.mp3`, filename: '11-The Legend of Durag Mo.mp3' },
  { id: 12, title: 'Rock With Me', description: '[DESCRIPTION]', duration: '2:48', url: `${STORAGE}/Moses-NewGenesis-12RockWithMe_0edec750.mp3`, filename: '12-Rock With Me.mp3' },
  { id: 13, title: 'Just Right', description: 'Exactly where he needs to be.', duration: '3:11', url: `${STORAGE}/Moses-NewGenesis-13JustRight_ea56d8a8.mp3`, filename: '13-Just Right.mp3' },
  { id: 14, title: 'The Blessing of Youth', description: 'Gratitude for the early years.', duration: '2:38', url: `${STORAGE}/Moses-NewGenesis-14TheBlessingofYouth_bab7b0df.mp3`, filename: '14-The Blessing of Youth.mp3' },
  { id: 15, title: 'Bank Roll', description: 'The hustle, documented.', duration: '2:10', url: `${STORAGE}/Moses-NewGenesis-15BankRoll_96995ec6.mp3`, filename: '15-Bank Roll.mp3' },
  { id: 16, title: 'First Flight Book 2', description: '[DESCRIPTION]', duration: '3:25', url: `${STORAGE}/Moses-NewGenesis-16FirstFlightbook2_90b911a4.mp3`, filename: '16-First Flight Book 2.mp3' },
];

export const NEW_GENESIS_META = {
  title: 'New Genesis',
  artist: 'MOSES',
  year: '2023',
  type: 'Project',
  trackCount: NEW_GENESIS_TRACKS.length,
  totalDuration: '46:12',
  description: 'The debut album from Moses — seven years in the making, recorded at Mount Pisgah Baptist Church in Chicago. Listen free or own it for $10.',
  isFree: false,
  price: '$10',
  downloadEndpoint: '/api/download/new-genesis',
  zipFilename: 'New-Genesis.zip',
  listenPath: '/new-genesis/listen',
  landingPath: '/new-genesis',
} as const;
