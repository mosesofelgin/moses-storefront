/**
 * Dedication Mixtape ZIP Bundle
 * Creates a ZIP file with all 14 Dedication tracks
 */

import archiver from 'archiver';
import { Readable } from 'stream';

export async function createDedicationBundle(): Promise<{ stream: archiver.Archiver }> {
  const archive = archiver('zip', {
    zlib: { level: 6 }, // Compression level
  });

  // Track URLs from CDN
  const tracks = [
    {
      filename: '01-2nd-Coming-of-Big-L.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/GpPDDEsEHDjjirdr.mp3',
    },
    {
      filename: '02-Chanel.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/kXIcYySVvSABuEEQ.mp3',
    },
    {
      filename: '03-Dedicate.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/ijfmWqCjCqfRkVwF.mp3',
    },
    {
      filename: '04-Dont-Shoot-Me-Down.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/DYhwdWHgZopyrxSb.mp3',
    },
    {
      filename: '05-Let-Another.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/TnYBHIgCKAtCrGeJ.mp3',
    },
    {
      filename: '06-Open-Letter.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/tFpmDwRnPPyUsmsH.mp3',
    },
    {
      filename: '07-Perfect-Strangers.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/LiuIREHfpnuJGJLe.mp3',
    },
    {
      filename: '08-Ridemaster.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/VwkLFNohsiTqbLQC.mp3',
    },
    {
      filename: '09-Write-Your-Name.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/ACXEkZXfRpfVvvQY.mp3',
    },
    {
      filename: '10-BB-Master.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/uLuarTbaXpnGXRug.mp3',
    },
    {
      filename: '11-Pretty-Brown.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/lwNlSvtPikeGsWoC.mp3',
    },
    {
      filename: '12-Strong-Smoke-Master.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/ehTOhJipSpISmmaw.mp3',
    },
    {
      filename: '13-Takeover-001.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/FbRLfBIQGyVLPPoY.mp3',
    },
    {
      filename: '14-Untitled-Evil-Ways-111.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/aDRajPXWMVVQucoC.mp3',
    },
  ];

  // Add all tracks to the archive
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

  // Finalize the archive
  archive.finalize();

  return { stream: archive };
}

/**
 * Get list of all Dedication tracks with CDN URLs
 * Used for individual file downloads
 */
export function getDedicationAlbumFiles() {
  return [
    {
      filename: '01-2nd-Coming-of-Big-L.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/GpPDDEsEHDjjirdr.mp3',
    },
    {
      filename: '02-Chanel.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/kXIcYySVvSABuEEQ.mp3',
    },
    {
      filename: '03-Dedicate.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/ijfmWqCjCqfRkVwF.mp3',
    },
    {
      filename: '04-Dont-Shoot-Me-Down.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/DYhwdWHgZopyrxSb.mp3',
    },
    {
      filename: '05-Let-Another.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/TnYBHIgCKAtCrGeJ.mp3',
    },
    {
      filename: '06-Open-Letter.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/tFpmDwRnPPyUsmsH.mp3',
    },
    {
      filename: '07-Perfect-Strangers.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/LiuIREHfpnuJGJLe.mp3',
    },
    {
      filename: '08-Ridemaster.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/VwkLFNohsiTqbLQC.mp3',
    },
    {
      filename: '09-Write-Your-Name.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/ACXEkZXfRpfVvvQY.mp3',
    },
    {
      filename: '10-BB-Master.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/uLuarTbaXpnGXRug.mp3',
    },
    {
      filename: '11-Pretty-Brown.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/lwNlSvtPikeGsWoC.mp3',
    },
    {
      filename: '12-Strong-Smoke-Master.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/ehTOhJipSpISmmaw.mp3',
    },
    {
      filename: '13-Takeover-001.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/FbRLfBIQGyVLPPoY.mp3',
    },
    {
      filename: '14-Untitled-Evil-Ways-111.mp3',
      url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663298995484/aDRajPXWMVVQucoC.mp3',
    },
  ];
}
