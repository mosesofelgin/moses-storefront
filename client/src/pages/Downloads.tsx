import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { CLARITY_BUNDLE } from '@/data/clarity-bundle';
import {
  Download,
  CheckCircle,
  Music,
  Image as ImageIcon,
  FileText,
  AlertCircle,
  Loader2,
  Play,
  Pause,
  PackageOpen,
  ExternalLink,
} from 'lucide-react';
import { trpc } from '@/lib/trpc';

const ALBUM_ART = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/album-cover_2118610e.png';

export default function Downloads() {
  const [, navigate] = useLocation();
  const [token, setToken] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);

  const verifyTokenQuery = trpc.downloads.verifyToken.useQuery(
    { token: token || '' },
    { enabled: !!token }
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const downloadToken = searchParams.get('token');
    if (downloadToken) {
      setToken(downloadToken);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (verifyTokenQuery.isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
      setIsValid(verifyTokenQuery.data?.valid ?? false);
    }
  }, [verifyTokenQuery.data, verifyTokenQuery.isLoading]);

  const playTrack = (track: (typeof CLARITY_BUNDLE.tracks)[0]) => {
    if (audioEl) {
      audioEl.pause();
    }
    if (playingId === track.id) {
      setPlayingId(null);
      setAudioEl(null);
      return;
    }
    const a = new Audio(track.url);
    a.play();
    a.onended = () => {
      setPlayingId(null);
      setAudioEl(null);
    };
    setAudioEl(a);
    setPlayingId(track.id);
  };

  const handleDownload = (fileId: string, filename: string) => {
    if (!token) return;
    const link = document.createElement('a');
    link.href = `/api/download/${token}/${fileId}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = () => {
    if (!token) return;
    setDownloadingZip(true);
    const link = document.createElement('a');
    link.href = `/api/download/all/${token}`;
    link.download = 'CLARITY-Album-Bundle.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloadingZip(false), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-[#00ff00]" />
          <p className="text-xl font-mono text-gray-400">Verifying your access...</p>
        </div>
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-4xl font-display font-black tracking-wider mb-3">INVALID LINK</h1>
          <p className="text-gray-400 mb-3 font-mono text-sm">
            This download link is not valid or has expired.
          </p>
          <p className="text-gray-500 text-sm mb-8 font-mono">
            Check your email for the correct download link, or visit the store to get CLARITY.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/store')}
              className="w-full bg-[#00ff00] hover:bg-[#00dd00] text-black font-bold py-3 rounded-md transition"
            >
              Go to Store
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full border border-zinc-700 text-white hover:bg-zinc-900 font-medium py-3 rounded-md transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${ALBUM_ART})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0a0a0a]" />
        <div className="relative z-10 text-center py-20 px-4">
          <CheckCircle className="w-14 h-14 text-[#00ff00] mx-auto mb-5" />
          <h1 className="text-5xl md:text-6xl font-display font-black tracking-widest mb-3">
            YOUR DOWNLOADS
          </h1>
          <p className="text-xl text-gray-300 mb-1 font-mono">CLARITY — Full Album Bundle</p>
          <p className="text-gray-500 text-sm font-mono">
            12 tracks · 5 photos · lyric book — download anytime with this link.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-20 space-y-10">

        {/* Download Everything */}
        <section className="bg-[#111] border border-zinc-800 rounded-xl p-6 text-center">
          <PackageOpen className="w-10 h-10 mx-auto mb-3 text-[#00ff00]" />
          <h2 className="text-xl font-display font-bold tracking-wider mb-1">DOWNLOAD EVERYTHING</h2>
          <p className="text-gray-400 text-sm mb-5 font-mono">
            One ZIP file — all 12 tracks + 5 photos + lyric book bundled together.
          </p>
          <button
            onClick={handleDownloadAll}
            disabled={downloadingZip}
            className="flex items-center justify-center gap-2 w-full bg-[#00ff00] hover:bg-[#00dd00] text-black font-bold py-4 text-base rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Download className="w-5 h-5" />
            {downloadingZip ? 'Starting Download...' : 'Download CLARITY.zip (18 files)'}
          </button>
          <p className="text-gray-600 text-xs mt-3 font-mono">
            ~130MB — your browser will start downloading automatically.
          </p>
        </section>

        {/* Tracks */}
        <section>
          <h2 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4 flex items-center gap-2 font-mono">
            <Music className="w-4 h-4" /> 12 Tracks — individual downloads
          </h2>
          <div className="space-y-2">
            {CLARITY_BUNDLE.tracks.map((track) => (
              <div
                key={track.id}
                className="flex items-center gap-3 bg-[#111] hover:bg-[#1a1a1a] transition rounded-lg px-4 py-3 border border-zinc-900 hover:border-zinc-700"
              >
                <span className="text-gray-600 text-sm w-5 text-right shrink-0 font-mono">
                  {track.id}
                </span>
                <button
                  onClick={() => playTrack(track)}
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#00ff00] text-black hover:bg-[#00dd00] transition"
                  aria-label={playingId === track.id ? 'Pause' : 'Play'}
                >
                  {playingId === track.id ? (
                    <Pause className="w-4 h-4" fill="currentColor" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                  )}
                </button>
                <span className="flex-1 font-medium text-sm">{track.title}</span>
                <button
                  onClick={() =>
                    handleDownload(
                      `track-${String(track.id).padStart(2, '0')}`,
                      `${track.id}-${track.title}.mp3`
                    )
                  }
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded bg-zinc-800 hover:bg-zinc-700 transition"
                  aria-label="Download track"
                >
                  <Download className="w-4 h-4 text-[#00ff00]" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Photos */}
        <section>
          <h2 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4 flex items-center gap-2 font-mono">
            <ImageIcon className="w-4 h-4" /> 5 Photos
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {CLARITY_BUNDLE.images.map((image, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full aspect-square object-cover rounded-lg border border-zinc-900"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition rounded-lg flex items-center justify-center">
                  <button
                    onClick={() =>
                      handleDownload(
                        `image-${String(image.id).padStart(2, '0')}`,
                        image.filename
                      )
                    }
                    className="flex items-center gap-2 bg-[#00ff00] text-black px-4 py-2 rounded font-bold hover:bg-[#00dd00] transition text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lyric Book */}
        <section>
          <h2 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4 flex items-center gap-2 font-mono">
            <FileText className="w-4 h-4" /> Bonus Content
          </h2>
          <button
            onClick={() => handleDownload('lyric-book', 'CLARITY-Lyric-Book.pdf')}
            className="w-full bg-[#111] border border-zinc-800 hover:border-zinc-600 p-4 rounded-lg transition text-left flex items-center justify-between group"
          >
            <div>
              <p className="font-medium text-sm">{CLARITY_BUNDLE.lyricBook.title}</p>
              <p className="text-gray-500 text-xs font-mono mt-0.5">PDF — process notes &amp; reflections</p>
            </div>
            <Download className="w-5 h-5 text-[#00ff00] group-hover:scale-110 transition" />
          </button>
        </section>

        {/* Stream Everywhere */}
        <section className="bg-[#111] border border-zinc-800 rounded-xl p-6 text-center">
          <Music className="w-10 h-10 mx-auto mb-3 text-[#00ff00]" />
          <h2 className="text-xl font-display font-bold tracking-wider mb-2">STREAM EVERYWHERE</h2>
          <p className="text-gray-400 text-sm mb-5 font-mono">
            Listen on Apple Music, Spotify, YouTube Music, and more.
          </p>
          <a
            href="https://distrokid.com/hyperfollow/mosesofelgin/clarity?ref=release"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00] hover:text-black font-bold py-3 px-6 rounded-lg transition"
          >
            <ExternalLink className="w-4 h-4" />
            Stream on All Platforms
          </a>
        </section>

        {/* Footer */}
        <div className="text-center text-gray-600 text-sm pt-10 border-t border-zinc-900 font-mono">
          <p>Thank you for supporting independent music.</p>
          <p className="mt-2">
            Questions?{' '}
            <a href="mailto:wtgexodus@gmail.com" className="text-[#00ff00] hover:underline">
              wtgexodus@gmail.com
            </a>
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 text-gray-500 hover:text-white transition text-xs underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
