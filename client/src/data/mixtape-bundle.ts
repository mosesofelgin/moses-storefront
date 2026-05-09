// ─────────────────────────────────────────────────────────────────────────────
// If I Wrote A Mixtape — Asset Bundle
// All assets hosted on CloudFront CDN.
// ─────────────────────────────────────────────────────────────────────────────

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk';

export const MIXTAPE_COVER = `${CDN}/if-i-wrote-a-mixtape-cover_6a183be2.jpg`;

export interface MixtapeTrack {
  id: number;
  title: string;
  description: string;
  duration: string;
  url: string;
  filename: string;
}

export const MIXTAPE_TRACKS: MixtapeTrack[] = [
  { id: 1,  title: 'Dishonourable',                          description: 'The opener. No apologies.',                            duration: '3:00', url: `${CDN}/01-dishonourable_3ff71577.mp3`,              filename: '01-Dishonourable.mp3' },
  { id: 2,  title: 'Dissolve (ft. G Ikeo)',                  description: 'Letting go. A collaboration.',                         duration: '3:45', url: `${CDN}/02-dissolve_bcaf386e.mp3`,                   filename: '02-Dissolve (ft. G Ikeo).mp3' },
  { id: 3,  title: 'Drip Drop',                             description: 'Slow and steady.',                                     duration: '2:50', url: `${CDN}/03-drip-drop_72a53b2e.mp3`,                  filename: '03-Drip Drop.mp3' },
  { id: 4,  title: 'Forces Like Mine',                      description: 'Power in motion.',                                     duration: '3:30', url: `${CDN}/04-forces-like-mine_6259f49d.mp3`,           filename: '04-Forces Like Mine.mp3' },
  { id: 5,  title: 'God Bless (Amystic)',                   description: 'A blessing over the work.',                            duration: '4:00', url: `${CDN}/05-god-bless_bf1534a6.mp3`,                  filename: '05-God Bless (Amystic).mp3' },
  { id: 6,  title: 'God Gift (A Work of Light)',            description: 'The gift, acknowledged.',                              duration: '3:55', url: `${CDN}/06-god-gift_b4f6c216.mp3`,                   filename: '06-God Gift (A Work of Light).mp3' },
  { id: 7,  title: 'Humble Lady',                          description: 'Grace in simplicity.',                                 duration: '3:10', url: `${CDN}/07-humble-lady_84725b30.mp3`,                filename: '07-Humble Lady.mp3' },
  { id: 8,  title: 'Insurmountable Evidence',              description: 'The proof is in the work.',                            duration: '4:15', url: `${CDN}/08-insurmountable-evidence_38771c3d.mp3`,    filename: '08-Insurmountable Evidence.mp3' },
  { id: 9,  title: 'Jailed',                               description: 'Confined but not broken.',                             duration: '3:25', url: `${CDN}/09-jailed_90384463.mp3`,                     filename: '09-Jailed.mp3' },
  { id: 10, title: 'Juice Almighty',                       description: 'Power in a different form.',                           duration: '2:45', url: `${CDN}/10-juice-almighty_ded84ed6.mp3`,             filename: '10-Juice Almighty.mp3' },
  { id: 11, title: 'Love Letters to the Beloved',          description: 'Written with intention.',                              duration: '4:10', url: `${CDN}/11-love-letters_5effca9c.mp3`,               filename: '11-Love Letters to the Beloved.mp3' },
  { id: 12, title: 'Low Expectations',                     description: 'Setting the bar, then clearing it.',                   duration: '3:05', url: `${CDN}/12-low-expectations_f4d7dffc.mp3`,           filename: '12-Low Expectations.mp3' },
  { id: 13, title: 'Nature Boy',                           description: 'Back to earth.',                                       duration: '3:40', url: `${CDN}/13-nature-boy_fdaca1be.mp3`,                filename: '13-Nature Boy.mp3' },
  { id: 14, title: 'Next Kid',                             description: 'The next one up.',                                     duration: '2:55', url: `${CDN}/14-next-kid_b4c17390.mp3`,                   filename: '14-Next Kid.mp3' },
  { id: 15, title: 'Not Another Love Song (ft. Lando)',    description: 'A love song that refuses to be one.',                  duration: '3:50', url: `${CDN}/15-not-another-love-song_63bc6fe2.mp3`,     filename: '15-Not Another Love Song (ft. Lando).mp3' },
  { id: 16, title: 'Ooouuu Freestyle',                     description: 'Loose and free. Unfiltered.',                          duration: '2:30', url: `${CDN}/16-ooouuu-freestyle_acb86cba.mp3`,           filename: '16-Ooouuu Freestyle.mp3' },
  { id: 17, title: 'Oxygen',                               description: 'Necessary. Essential.',                                duration: '3:15', url: `${CDN}/17-oxygen_b83ac15d.mp3`,                     filename: '17-Oxygen.mp3' },
  { id: 18, title: 'Prisoner',                             description: 'Trapped in the moment.',                               duration: '3:35', url: `${CDN}/18-prisoner_f505e16d.mp3`,                   filename: '18-Prisoner.mp3' },
  { id: 19, title: 'Rainy Days',                           description: 'When the weather matches the mood.',                   duration: '4:05', url: `${CDN}/19-rainy-days_a5490c7b.mp3`,                 filename: '19-Rainy Days.mp3' },
  { id: 20, title: 'Return',                               description: 'Coming back.',                                         duration: '3:20', url: `${CDN}/20-return_a1d734c1.mp3`,                     filename: '20-Return.mp3' },
  { id: 21, title: 'Rudely',                               description: 'Unapologetically direct.',                             duration: '2:50', url: `${CDN}/21-rudely_4341abcd.mp3`,                     filename: '21-Rudely.mp3' },
  { id: 22, title: 'Slowly Fallin Down (ft. Mo the Poet)', description: 'A descent, witnessed.',                                duration: '4:00', url: `${CDN}/22-slowly-fallin-down_6d4898ed.mp3`,        filename: '22-Slowly Fallin Down (ft. Mo the Poet).mp3' },
  { id: 23, title: 'Spared Me',                            description: 'Gratitude for survival.',                              duration: '3:10', url: `${CDN}/23-spared-me_9609b102.mp3`,                  filename: '23-Spared Me.mp3' },
  { id: 24, title: 'Stone of Hope',                        description: 'Solid ground in uncertain times.',                     duration: '3:45', url: `${CDN}/24-stone-of-hope_4f44ba16.mp3`,              filename: '24-Stone of Hope.mp3' },
  { id: 25, title: 'Terra',                                description: 'Earth. Grounded.',                                     duration: '4:20', url: `${CDN}/25-terra_4cfcb43e.mp3`,                      filename: '25-Terra.mp3' },
  { id: 26, title: 'Aftermath',                            description: 'What remains.',                                        duration: '3:30', url: `${CDN}/26-aftermath_05ac86a4.mp3`,                  filename: '26-Aftermath.mp3' },
  { id: 27, title: 'Anubis Clone',                         description: 'Ancient energy, modern vessel.',                       duration: '3:15', url: `${CDN}/27-anubis-clone_61b97f4d.mp3`,               filename: '27-Anubis Clone.mp3' },
  { id: 28, title: 'Aye Man',                              description: 'A conversation with self.',                            duration: '2:40', url: `${CDN}/28-aye-man_c9796f74.mp3`,                    filename: '28-Aye Man.mp3' },
  { id: 29, title: 'Beautiful Thing Outro',                description: 'The send-off. Gentle and final.',                      duration: '2:15', url: `${CDN}/29-beautiful-thing-outro_1604a60d.mp3`,      filename: '29-Beautiful Thing Outro.mp3' },
  { id: 30, title: 'Deep End',                             description: 'The closer. All the way in.',                          duration: '3:50', url: `${CDN}/30-deep-end_c3adf2fb.mp3`,                   filename: '30-Deep End.mp3' },
];

export const MIXTAPE_META = {
  title: 'If I Wrote A Mixtape',
  subtitle: 'Before the silence',
  tagline: 'Recorded right before the lockdown season. 30 tracks. Raw and uncut.',
  artist: 'MOSES SOG',
  year: '2020',
  type: 'Mixtape',
  trackCount: MIXTAPE_TRACKS.length,
  totalDuration: '1:41:30',
  description:
    'Recorded right before the lockdown season. A raw, expansive collection of 30 tracks capturing the energy and uncertainty of the moment. The precursor to the silence that followed.',
  isFree: true,
  downloadEndpoint: '/api/download/mixtape',
  zipFilename: 'If-I-Wrote-A-Mixtape.zip',
  listenPath: '/mixtape/listen',
  landingPath: '/mixtape',
};
