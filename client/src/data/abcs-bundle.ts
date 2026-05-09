// ─────────────────────────────────────────────────────────────────────────────
// Back to Basics: ABCs — Asset Bundle
// All assets hosted on CloudFront CDN.
// Produced, mixed, written, photographed, and edited entirely by MOSES SOG.
// ─────────────────────────────────────────────────────────────────────────────

export const ABCS_COVER =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/abcs-cover_be82498d.png';

export interface AbcsTrack {
  id: number;
  title: string;
  description: string;
  duration: string; // mm:ss
  url: string;
  filename: string; // used for download attribute
}

export const ABCS_TRACKS: AbcsTrack[] = [
  {
    id: 1,
    title: 'Not Perfect',
    description: 'An honest opener. Raw and unfiltered.',
    duration: '2:30',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/notperfect_c2788245.mp3',
    filename: '01-Not Perfect.mp3',
  },
  {
    id: 2,
    title: 'ABCs',
    description: 'The title track. Back to the fundamentals.',
    duration: '1:41',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/abcs_631c6cc4.mp3',
    filename: '02-ABCs.mp3',
  },
  {
    id: 3,
    title: 'Big Ol Booty',
    description: 'A moment of levity. Produced and mixed in-house.',
    duration: '2:24',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/bigolbooty_6b569e34.mp3',
    filename: '03-Big Ol Booty.mp3',
  },
  {
    id: 4,
    title: "God's Here",
    description: 'Presence. Faith in the room.',
    duration: '2:46',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/Godshere_dde858ca.mp3',
    filename: "04-God's Here.mp3",
  },
  {
    id: 5,
    title: 'Plant a Seed',
    description: 'Long-game thinking. Invest now, harvest later.',
    duration: '3:15',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/plantaseed_0ee8ff82.mp3',
    filename: '05-Plant a Seed.mp3',
  },
  {
    id: 6,
    title: 'Project 7 Español',
    description: 'A bilingual experiment. Crossing borders.',
    duration: '2:28',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/project7espanol_fd1ae6c7.mp3',
    filename: '06-Project 7 Español.mp3',
  },
  {
    id: 7,
    title: 'Reaper Amp',
    description: 'The longest cut. Let it breathe.',
    duration: '4:40',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/reaperamp_981e5763.mp3',
    filename: '07-Reaper Amp.mp3',
  },
  {
    id: 8,
    title: 'On the Run',
    description: 'Motion. Always moving.',
    duration: '1:55',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/ontherun_066b1f82.mp3',
    filename: '08-On the Run.mp3',
  },
  {
    id: 9,
    title: 'On',
    description: 'Switched on. Locked in.',
    duration: '1:31',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/On_8b970a31.mp3',
    filename: '09-On.mp3',
  },
  {
    id: 10,
    title: 'Wake Up Call',
    description: 'A reminder. Time is not waiting.',
    duration: '2:21',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/wakeupcall_eb96a006.mp3',
    filename: '10-Wake Up Call.mp3',
  },
  {
    id: 11,
    title: 'Revenue Numbers',
    description: 'The closer. Business and art in the same breath.',
    duration: '1:32',
    url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/revnuenumbers_b6197d00.mp3',
    filename: '11-Revenue Numbers.mp3',
  },
];

export const ABCS_META = {
  title: 'Back to Basics: ABCs',
  subtitle: 'A self-made project',
  tagline: 'Going back to the days when we were using FL Studio and pure focus.',
  artist: 'MOSES SOG',
  year: '2025',
  trackCount: ABCS_TRACKS.length,
  totalDuration: '27:03',
  description:
    'Produced, mixed, written, photographed, and edited by one person. Not perfect — but complete. A challenge accepted and finished.',
  isFree: true,
  downloadEndpoint: '/api/download/abcs',
  zipFilename: 'Back-to-Basics-ABCs.zip',
  listenPath: '/abcs/listen',
  landingPath: '/abcs',
};
