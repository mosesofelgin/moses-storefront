export interface ClarityWebsiteTrack {
  id: number;
  title: string;
  description: string;
  duration: string;
  url: string;
  filename: string;
  isWebsiteExclusive?: boolean;
}

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk';

/**
 * CLARITY has two deliberately separate editions:
 * - Streaming Edition: tracks 1–12 (35:36)
 * - Website Edition: all tracks below, including Website Exclusive #13 (39:19)
 */
export const CLARITY_WEBSITE_EDITION_COVER = '/manus-storage/ChatGPTImageSep28,2026,07_34_57PM_14c05d91.png';

export const CLARITY_WEBSITE_EDITION_TRACKS: ClarityWebsiteTrack[] = [
  { id: 1, title: 'Final Prayer', description: 'A prayerful opening that invites surrender before the climb.', duration: '2:51', url: `${CDN}/1-Moses-FinalPrayerByMoses_11c2ba3f.mp3`, filename: '01-Final Prayer.mp3' },
  { id: 2, title: 'Soulja', description: 'A faith-fueled battle cry for endurance through pressure.', duration: '3:29', url: `${CDN}/07-Moses-Soulja_7ba0876c.mp3`, filename: '02-Soulja.mp3' },
  { id: 3, title: 'Get to the Studio', description: 'A disciplined anthem about showing up when no one is watching.', duration: '2:19', url: `${CDN}/03-Moses-GetToTheStu_fdbb7ebb.mp3`, filename: '03-Get to the Studio.mp3' },
  { id: 4, title: 'Over', description: 'An honest checkpoint where endings force truth to the surface.', duration: '3:27', url: `${CDN}/over_3b8e9f0f.mp3`, filename: '04-Over.mp3' },
  { id: 5, title: 'Refined', description: 'A testimony of being shaped by fire, not broken by it.', duration: '3:35', url: `${CDN}/09-Moses-Refined_ba82d395.mp3`, filename: '05-Refined.mp3' },
  { id: 6, title: 'King', description: 'A declaration of identity, purpose, and God-given authority.', duration: '2:08', url: `${CDN}/06-Moses-King_e592ea70.mp3`, filename: '06-King.mp3' },
  { id: 7, title: 'Falling for You', description: '[DESCRIPTION]', duration: '3:44', url: '/manus-storage/MosesofElgin-FallingforYoubyMoses_880840fa.mp3', filename: '07-Falling for You.mp3' },
  { id: 8, title: 'Dear Kobe', description: 'A tribute to legacy, focus, and the cost of greatness.', duration: '3:34', url: `${CDN}/08-Moses-DearKobe_bfa7dc5b.mp3`, filename: '08-Dear Kobe.mp3' },
  { id: 9, title: 'Look at All These Blessings', description: 'A gratitude record that reframes success through blessings.', duration: '2:16', url: `${CDN}/10-Moses-LookAtAllTheseBlessings_4b5725ec.mp3`, filename: '09-Look at All These Blessings.mp3' },
  { id: 10, title: 'Platform', description: 'A reminder that influence is stewardship, not self-promotion.', duration: '2:09', url: `${CDN}/11-Moses-Platform_cf321b03.mp3`, filename: '10-Platform.mp3' },
  { id: 11, title: 'Sweet Dreams', description: 'A soft landing into peace after the journey of becoming.', duration: '3:46', url: `${CDN}/12-Moses-SweetDreams_37d7f3ad.mp3`, filename: '11-Sweet Dreams.mp3' },
  { id: 12, title: 'Fade Away', description: 'A meditation on letting old versions of yourself fall away.', duration: '2:19', url: `${CDN}/05-Moses-FadeAway_5363cc88.mp3`, filename: '12-Fade Away.mp3' },
  { id: 13, title: 'Wish I Had You', description: 'A vulnerable look at loss, memory, and the ache of absence.', duration: '3:43', url: `${CDN}/02-Moses-WishIhadyou_16091eff.mp3`, filename: '13-Wish I Had You (Website Exclusive).mp3', isWebsiteExclusive: true },
];

export const CLARITY_WEBSITE_EDITION = {
  title: 'CLARITY',
  artist: 'MOSES',
  year: '2026',
  cover: CLARITY_WEBSITE_EDITION_COVER,
  tracks: CLARITY_WEBSITE_EDITION_TRACKS,
  trackCount: 13,
  runtime: '39:19',
  streamingTrackCount: 12,
  streamingRuntime: '35:36',
  listenPath: '/listen',
  checkoutPath: '/checkout?product=clarity',
} as const;
