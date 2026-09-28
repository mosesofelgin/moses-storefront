export const CLARITY_COVER =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/album-cover_2118610e.png';
export const DEDICATION_COVER =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/dedication-cover_20e0add5.jpg';
export const BATHSHEBA_COVER =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/bathsheba-cover-a7iGpxp22xB7WCpL6jtdHa.webp';
export const MIXTAPE_COVER =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/if-i-wrote-a-mixtape-cover_6a183be2.jpg';
export const NEW_GENESIS_COVER =
  '/manus-storage/download_aefbd102.webp';
export const ABCS_COVER =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/abcs-cover_be82498d.png';

export const PROJECTS = [
  {
    title: 'CLARITY',
    eyebrow: 'FLAGSHIP PROJECT',
    descriptor: 'Faith, discipline, and transformation in twelve movements.',
    cover: CLARITY_COVER,
    alt: 'CLARITY album cover',
    tracks: '12 tracks',
    duration: '45m',
    access: 'Listen free.',
    route: '/clarity-sales',
    listenRoute: '/listen',
    download: null,
    accent: 'amber',
  },
  {
    title: 'BATHSHEBA',
    eyebrow: 'PROJECT 02',
    descriptor: 'A royal journey through grace, sovereignty, and becoming.',
    cover: BATHSHEBA_COVER,
    alt: 'BATHSHEBA album cover',
    tracks: '10 tracks',
    duration: '28m',
    access: 'Free project download',
    route: '/bathsheba',
    listenRoute: '/bathsheba/listen',
    download: { endpoint: '/api/download/bathsheba', filename: 'BATHSHEBA-Project.zip' },
    accent: 'violet',
  },
  {
    title: 'DEDICATION',
    eyebrow: 'MIXTAPE 01',
    descriptor: 'Seventeen songs of homage, craft, and undiluted intention.',
    cover: DEDICATION_COVER,
    alt: 'DEDICATION mixtape cover',
    tracks: '17 tracks',
    duration: '56m',
    access: 'Free project download',
    route: '/dedication',
    listenRoute: '/dedication',
    download: { endpoint: '/api/download/dedication', filename: 'DEDICATION-Mixtape.zip' },
    accent: 'red',
  },
  {
    title: 'IF I WROTE A MIXTAPE',
    eyebrow: 'ARCHIVE 2020',
    descriptor: 'Thirty raw recordings from before the silence.',
    cover: MIXTAPE_COVER,
    alt: 'If I Wrote A Mixtape cover',
    tracks: '30 tracks',
    duration: '1h 43m',
    access: 'Free project download',
    route: '/mixtape',
    listenRoute: '/mixtape/listen',
    download: { endpoint: '/api/download/mixtape', filename: 'If-I-Wrote-A-Mixtape.zip' },
    accent: 'orange',
  },
  {
    title: 'NEW GENESIS',
    eyebrow: 'PROJECT 03',
    descriptor: 'The debut album from Moses — seven years in the making.',
    cover: NEW_GENESIS_COVER,
    alt: 'New Genesis cover',
    tracks: '16 tracks',
    duration: '46m 12s',
    access: '$10 digital album',
    route: '/new-genesis',
    listenRoute: '/new-genesis/listen',
    download: null,
    checkoutProductId: 'new-genesis',
    accent: 'indigo',
  },
  {
    title: 'BACK TO BASICS: ABCs',
    eyebrow: 'ARCHIVE 02',
    descriptor: 'Pure focus, FL Studio, and the discipline of making it complete.',
    cover: ABCS_COVER,
    alt: 'Back to Basics ABCs cover',
    tracks: '11 tracks',
    duration: '27m',
    access: 'Free project download',
    route: '/abcs',
    listenRoute: '/abcs/listen',
    download: { endpoint: '/api/download/abcs', filename: 'Back-to-Basics-ABCs.zip' },
    accent: 'gold',
  },
] as const;

export type Project = (typeof PROJECTS)[number];
