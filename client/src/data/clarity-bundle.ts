/**
 * CLARITY Album Bundle - All Digital Assets
 * 12 Tracks + 5 Brand Images + Lyric Book PDF
 * URLs verified from fresh CDN upload on 2026-04-08
 */

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk";

export interface TrackExperience {
  trackId: number;
  meaning: {
    hook: string;
    pull: string;
  };
}

export const CLARITY_BUNDLE = {
  tracks: [
    {
      id: 1,
      title: "Final Prayer",
      url: `${CDN}/1-Moses-FinalPrayerByMoses_11c2ba3f.mp3`,
      filename: "01-Final Prayer by Moses.mp3",
      type: "audio/mpeg",
    },
    {
      id: 2,
      title: "Wish I Had You",
      url: `${CDN}/02-Moses-WishIhadyou_16091eff.mp3`,
      filename: "02-Wish I Had You.mp3",
      type: "audio/mpeg",
    },
    {
      id: 3,
      title: "Get to the Studio",
      url: `${CDN}/03-Moses-GetToTheStu_fdbb7ebb.mp3`,
      filename: "03-Get to the Studio.mp3",
      type: "audio/mpeg",
    },
    {
      id: 4,
      title: "Over",
      url: `${CDN}/04-Moses-Over_6f624126.wav`,
      filename: "04-Over.wav",
      type: "audio/wav",
    },
    {
      id: 5,
      title: "Fade Away",
      url: `${CDN}/05-Moses-FadeAway_5363cc88.mp3`,
      filename: "05-Fade Away.mp3",
      type: "audio/mpeg",
    },
    {
      id: 6,
      title: "King",
      url: `${CDN}/06-Moses-King_e592ea70.mp3`,
      filename: "06-King.mp3",
      type: "audio/mpeg",
    },
    {
      id: 7,
      title: "Soulja",
      url: `${CDN}/07-Moses-Soulja_7ba0876c.mp3`,
      filename: "07-Soulja.mp3",
      type: "audio/mpeg",
    },
    {
      id: 8,
      title: "Dear Kobe",
      url: `${CDN}/08-Moses-DearKobe_bfa7dc5b.mp3`,
      filename: "08-Dear Kobe.mp3",
      type: "audio/mpeg",
    },
    {
      id: 9,
      title: "Refined",
      url: `${CDN}/09-Moses-Refined_ba82d395.mp3`,
      filename: "09-Refined.mp3",
      type: "audio/mpeg",
    },
    {
      id: 10,
      title: "Look at All These Blessings",
      url: `${CDN}/10-Moses-LookAtAllTheseBlessings_4b5725ec.mp3`,
      filename: "10-Look at All These Blessings.mp3",
      type: "audio/mpeg",
    },
    {
      id: 11,
      title: "Platform",
      url: `${CDN}/11-Moses-Platform_cf321b03.mp3`,
      filename: "11-Platform.mp3",
      type: "audio/mpeg",
    },
    {
      id: 12,
      title: "Sweet Dreams",
      url: `${CDN}/12-Moses-SweetDreams_37d7f3ad.mp3`,
      filename: "12-Sweet Dreams.mp3",
      type: "audio/mpeg",
    },
  ],
  images: [
    {
      id: 1,
      title: "CLARITY Album Cover",
      url: `${CDN}/album-cover_2118610e.png`,
      filename: "album-cover.png",
    },
    {
      id: 2,
      title: "Moses – Camo Look",
      url: `${CDN}/TOP_01_aaeff941.jpg`,
      filename: "moses-camo.jpg",
    },
    {
      id: 3,
      title: "Moses – Graphic Tee",
      url: `${CDN}/TOP_04_edae7ba8.jpg`,
      filename: "moses-graphic-tee.jpg",
    },
    {
      id: 4,
      title: "Moses – White Shirt",
      url: `${CDN}/TOP_05_b7f42eb5.jpg`,
      filename: "moses-white-shirt.jpg",
    },
    {
      id: 5,
      title: "Moses – Studio Session",
      url: `${CDN}/ChatGPTImageMar19,2026,11_14_44AM_97e635c2.png`,
      filename: "moses-studio-session.png",
    },
  ],
  lyricBook: {
    title: "CLARITY – Lyric Book",
    url: `${CDN}/FINAL_PRAYER_PROCESS_LOG_001_9e12e531.pdf`,
    filename: "CLARITY-Lyric-Book.pdf",
  },
  experiences: {
    1: { trackId: 1, meaning: { hook: "A prayerful opening that invites surrender before the climb.", pull: "It feels like the first deep breath before a hard but holy road." } },
    2: { trackId: 2, meaning: { hook: "A vulnerable look at loss, memory, and the ache of absence.", pull: "Every line leans toward someone who is gone but still near." } },
    3: { trackId: 3, meaning: { hook: "A disciplined anthem about showing up when no one is watching.", pull: "You can hear the quiet hours turning into momentum." } },
    4: { trackId: 4, meaning: { hook: "An honest checkpoint where endings force truth to the surface.", pull: "The weight drops in slowly, then all at once." } },
    5: { trackId: 5, meaning: { hook: "A meditation on letting old versions of yourself fall away.", pull: "It sounds like dusk closing on what can no longer stay." } },
    6: { trackId: 6, meaning: { hook: "A declaration of identity, purpose, and God-given authority.", pull: "Confidence rises here without losing humility." } },
    7: { trackId: 7, meaning: { hook: "A faith-fueled battle cry for endurance through pressure.", pull: "The drums feel like footsteps that refuse to retreat." } },
    8: { trackId: 8, meaning: { hook: "A tribute to legacy, focus, and the cost of greatness.", pull: "Grief and grit move together in the same breath." } },
    9: { trackId: 9, meaning: { hook: "A testimony of being shaped by fire, not broken by it.", pull: "You can feel scars turning into strength in real time." } },
    10: { trackId: 10, meaning: { hook: "A gratitude record that reframes success through blessings.", pull: "Joy settles in like light after a long storm." } },
    11: { trackId: 11, meaning: { hook: "A reminder that influence is stewardship, not self-promotion.", pull: "It asks what your voice is building when nobody applauds." } },
    12: { trackId: 12, meaning: { hook: "A soft landing into peace after the journey of becoming.", pull: "The ending opens like morning after a long night." } },
  } as Record<number, TrackExperience>,

  getTrack(trackId: number) {
    const track = this.tracks.find(t => t.id === trackId);
    if (!track) return null;
    return {
      ...track,
      experience: this.experiences[trackId],
    };
  },

  getAllTracks() {
    return this.tracks.map(track => ({
      ...track,
      experience: this.experiences[track.id],
    }));
  },
};
