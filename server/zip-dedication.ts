/**
 * Dedication Mixtape ZIP Bundle
 * Creates a ZIP file with all 17 Dedication tracks.
 */

import archiver from 'archiver';
const ON_MY_OWN_TRACK_KEY = 'onmyownhomagetolilWayne_44d88d20.mp3';
const DEAR_MAMA_TRACK_KEY = '[Explicit]DearMama(shine(flip))-Moses_7c40fc46.mp3';
const EXPEDITE_TRACK_KEY = 'expeditethisletterroughdraftlildurkflip_7672c194.mp3';

function buildStorageProxyUrl(origin: string, key: string): string {
  const encodedKey = key.split('/').map(encodeURIComponent).join('/');
  return new URL(`/manus-storage/${encodedKey}`, origin).toString();
}

export async function createDedicationBundle(origin: string): Promise<{ stream: archiver.Archiver }> {
  const archive = archiver('zip', {
    zlib: { level: 6 },
  });
  const onMyOwnUrl = buildStorageProxyUrl(origin, ON_MY_OWN_TRACK_KEY);
  const dearMamaUrl = buildStorageProxyUrl(origin, DEAR_MAMA_TRACK_KEY);
  const expediteUrl = buildStorageProxyUrl(origin, EXPEDITE_TRACK_KEY);

  const tracks = [
    {
      filename: '01-Dedicate.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/ijfmWqCjCqfRkVwF.mp3',
    },
    {
      filename: '02-Dont-Shoot-Me-Down.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/DYhwdWHgZopyrxSb.mp3',
    },
    {
      filename: '03-Open-Letter.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/tFpmDwRnPPyUsmsH.mp3',
    },
    {
      filename: '04-Perfect-Strangers.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/LiuIREHfpnuJGJLe.mp3',
    },
    {
      filename: '05-On-My-Own-Homage-to-Lil-Wayne.mp3',
      url: onMyOwnUrl,
    },
    {
      filename: '06-[Explicit]-Dear-Mama-Shine-Flip.mp3',
      url: dearMamaUrl,
    },
    {
      filename: '07-Expedite-This-Letter-Rough-Draft-Lil-Durk-Flip.mp3',
      url: expediteUrl,
    },
    {
      filename: '08-Let-Another.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/TnYBHIgCKAtCrGeJ.mp3',
    },
    {
      filename: '09-Pretty-Brown.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/lwNlSvtPikeGsWoC.mp3',
    },
    {
      filename: '10-Ride-Master.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/VwkLFNohsiTqbLQC.mp3',
    },
    {
      filename: '11-Strong-Smoke-Master.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/ehTOhJipSpISmmaw.mp3',
    },
    {
      filename: '12-Takeover.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/FbRLfBIQGyVLPPoY.mp3',
    },
    {
      filename: '13-Untitled-Evil-Ways.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/aDRajPXWMVVQucoC.mp3',
    },
    {
      filename: '14-Write-Your-Name.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/ACXEkZXfRpfVvvQY.mp3',
    },
    {
      filename: '15-2nd-Coming-of-Big-L.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/GpPDDEsEHDjjirdr.mp3',
    },
    {
      filename: '16-BB-Master.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/uLuarTbaXpnGXRug.mp3',
    },
    {
      filename: '17-Chanel.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/kXIcYySVvSABuEEQ.mp3',
    },
  ];

  for (const track of tracks) {
    try {
      const response = await fetch(track.url);
      if (!response.ok) {
        console.error(`[Dedication ZIP] Failed to download ${track.filename}: ${response.status}`);
        continue;
      }

      const buffer = await response.arrayBuffer();
      archive.append(Buffer.from(buffer), { name: track.filename });
      console.log(`[Dedication ZIP] Added ${track.filename}`);
    } catch (error) {
      console.error(`[Dedication ZIP] Error downloading ${track.filename}:`, error);
    }
  }

  archive.finalize();
  return { stream: archive };
}

/**
 * Get list of all Dedication tracks with CDN/storage URLs.
 * Used for individual file downloads.
 */
export function getDedicationAlbumFiles() {
  return [
    {
      filename: '01-Dedicate.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/ijfmWqCjCqfRkVwF.mp3',
    },
    {
      filename: '02-Dont-Shoot-Me-Down.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/DYhwdWHgZopyrxSb.mp3',
    },
    {
      filename: '03-Open-Letter.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/tFpmDwRnPPyUsmsH.mp3',
    },
    {
      filename: '04-Perfect-Strangers.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/LiuIREHfpnuJGJLe.mp3',
    },
    {
      filename: '05-On-My-Own-Homage-to-Lil-Wayne.mp3',
      url: '/manus-storage/onmyownhomagetolilWayne_44d88d20.mp3',
    },
    {
      filename: '06-[Explicit]-Dear-Mama-Shine-Flip.mp3',
      url: '/manus-storage/[Explicit]DearMama(shine(flip))-Moses_7c40fc46.mp3',
    },
    {
      filename: '07-Expedite-This-Letter-Rough-Draft-Lil-Durk-Flip.mp3',
      url: '/manus-storage/expeditethisletterroughdraftlildurkflip_7672c194.mp3',
    },
    {
      filename: '08-Let-Another.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/TnYBHIgCKAtCrGeJ.mp3',
    },
    {
      filename: '09-Pretty-Brown.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/lwNlSvtPikeGsWoC.mp3',
    },
    {
      filename: '10-Ride-Master.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/VwkLFNohsiTqbLQC.mp3',
    },
    {
      filename: '11-Strong-Smoke-Master.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/ehTOhJipSpISmmaw.mp3',
    },
    {
      filename: '12-Takeover.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/FbRLfBIQGyVLPPoY.mp3',
    },
    {
      filename: '13-Untitled-Evil-Ways.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/aDRajPXWMVVQucoC.mp3',
    },
    {
      filename: '14-Write-Your-Name.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/ACXEkZXfRpfVvvQY.mp3',
    },
    {
      filename: '15-2nd-Coming-of-Big-L.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/GpPDDEsEHDjjirdr.mp3',
    },
    {
      filename: '16-BB-Master.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/uLuarTbaXpnGXRug.mp3',
    },
    {
      filename: '17-Chanel.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/kXIcYySVvSABuEEQ.mp3',
    },
  ];
}
