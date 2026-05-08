/**
 * Dedication Mixtape Bundle
 * A homage to Lil Wayne
 * 14 tracks, free download
 */

export const dedicationBundle = {
  id: 'dedication',
  title: 'Dedication',
  subtitle: 'A Homage to Lil Wayne',
  description: 'A 14-track mixtape paying tribute to the legacy and influence of Lil Wayne. Free to download, direct from MOSES SOG.',
  releaseDate: '2026-05-08',
  trackCount: 14,
  totalDuration: '~52 minutes',
  price: 0,
  free: true,
  albumCover: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/album-cover_2118610e.png', // Using CLARITY cover as placeholder
  tracks: [
    {
      id: 1,
      title: '2nd Coming of Big L',
      artist: 'MOSES SOG',
      duration: '3:28',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/GpPDDEsEHDjjirdr.mp3',
    },
    {
      id: 2,
      title: 'Chanel',
      artist: 'MOSES SOG',
      duration: '2:52',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/kXIcYySVvSABuEEQ.mp3',
    },
    {
      id: 3,
      title: 'Dedicate',
      artist: 'MOSES SOG',
      duration: '3:42',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/ijfmWqCjCqfRkVwF.mp3',
    },
    {
      id: 4,
      title: "Don't Shoot Me Down",
      artist: 'MOSES SOG',
      duration: '3:09',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/DYhwdWHgZopyrxSb.mp3',
    },
    {
      id: 5,
      title: 'Let Another',
      artist: 'MOSES SOG',
      duration: '3:54',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/TnYBHIgCKAtCrGeJ.mp3',
    },
    {
      id: 6,
      title: 'Open Letter',
      artist: 'MOSES SOG',
      duration: '4:52',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/tFpmDwRnPPyUsmsH.mp3',
    },
    {
      id: 7,
      title: 'Perfect Strangers',
      artist: 'MOSES SOG',
      duration: '4:33',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/LiuIREHfpnuJGJLe.mp3',
    },
    {
      id: 8,
      title: 'Ridemaster',
      artist: 'MOSES SOG',
      duration: '3:01',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/VwkLFNohsiTqbLQC.mp3',
    },
    {
      id: 9,
      title: 'Write Your Name',
      artist: 'MOSES SOG',
      duration: '2:24',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/ACXEkZXfRpfVvvQY.mp3',
    },
    {
      id: 10,
      title: 'BB Master',
      artist: 'MOSES SOG',
      duration: '3:18',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/uLuarTbaXpnGXRug.mp3',
    },
    {
      id: 11,
      title: 'Pretty Brown',
      artist: 'MOSES SOG',
      duration: '3:54',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/lwNlSvtPikeGsWoC.mp3',
    },
    {
      id: 12,
      title: 'Strong Smoke Master',
      artist: 'MOSES SOG',
      duration: '2:34',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/ehTOhJipSpISmmaw.mp3',
    },
    {
      id: 13,
      title: 'Takeover 001',
      artist: 'MOSES SOG',
      duration: '3:42',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/FbRLfBIQGyVLPPoY.mp3',
    },
    {
      id: 14,
      title: 'Untitled Evil Ways 111',
      artist: 'MOSES SOG',
      duration: '3:58',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/aDRajPXWMVVQucoC.mp3',
    },
  ],
};

export type DedicationTrack = (typeof dedicationBundle.tracks)[number];
