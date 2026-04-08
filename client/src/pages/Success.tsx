import { useState } from "react";
import { useLocation } from "wouter";
import { CLARITY_BUNDLE } from "@/data/clarity-bundle";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Download,
  Play,
  Pause,
  ExternalLink,
  Music,
  Image as ImageIcon,
  PackageOpen,
} from "lucide-react";

export default function Success() {
  const [, navigate] = useLocation();
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);

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

  const downloadFile = (url: string, filename: string) => {
    // Open in new tab — most reliable cross-browser download from CDN
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const downloadAll = async () => {
    setDownloading(true);
    setDownloadProgress(0);
    const allFiles = [
      ...CLARITY_BUNDLE.tracks.map((t) => ({ url: t.url, filename: t.filename })),
      ...CLARITY_BUNDLE.images.map((i) => ({ url: i.url, filename: i.filename })),
    ];
    for (let i = 0; i < allFiles.length; i++) {
      const { url, filename } = allFiles[i];
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setDownloadProgress(i + 1);
      // Small delay so browser doesn't block multiple downloads
      await new Promise((r) => setTimeout(r, 600));
    }
    setDownloading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${CLARITY_BUNDLE.images[0].url})` }}
        />
        <div className="relative z-10 text-center py-20 px-4">
          <CheckCircle className="w-14 h-14 text-green-400 mx-auto mb-4" />
          <h1 className="text-5xl font-black tracking-tight mb-3">THANK YOU</h1>
          <p className="text-xl text-gray-300 mb-1">Your copy of CLARITY is ready.</p>
          <p className="text-gray-500 text-sm">Download your files below or stream on all platforms.</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-20 space-y-10">

        {/* ── DOWNLOAD ALL ── */}
        <section className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <PackageOpen className="w-6 h-6 text-white" />
            <h2 className="text-lg font-bold">Download All Files</h2>
          </div>
          <p className="text-gray-400 text-sm mb-5">
            Downloads all 12 tracks and 5 photos one by one directly to your device.
            Your browser may ask permission to download multiple files — click <strong className="text-white">Allow</strong>.
          </p>
          <Button
            onClick={downloadAll}
            disabled={downloading}
            className="w-full bg-white text-black hover:bg-gray-200 font-bold py-3 text-base disabled:opacity-60"
          >
            {downloading ? (
              <>
                <Download className="w-5 h-5 mr-2 animate-bounce" />
                Downloading {downloadProgress} / {CLARITY_BUNDLE.tracks.length + CLARITY_BUNDLE.images.length}...
              </>
            ) : (
              <>
                <Download className="w-5 h-5 mr-2" />
                Download All ({CLARITY_BUNDLE.tracks.length + CLARITY_BUNDLE.images.length} files)
              </>
            )}
          </Button>
        </section>

        {/* ── TRACKS ── */}
        <section>
          <h2 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4 flex items-center gap-2">
            <Music className="w-4 h-4" /> 12 Tracks
          </h2>
          <div className="space-y-2">
            {CLARITY_BUNDLE.tracks.map((track) => (
              <div
                key={track.id}
                className="flex items-center gap-3 bg-zinc-900 hover:bg-zinc-800 transition rounded-lg px-4 py-3"
              >
                {/* Track number */}
                <span className="text-gray-600 text-sm w-5 text-right shrink-0">
                  {track.id}
                </span>

                {/* Play button */}
                <button
                  onClick={() => playTrack(track)}
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-200 transition"
                  aria-label={playingId === track.id ? "Pause" : "Play"}
                >
                  {playingId === track.id ? (
                    <Pause className="w-4 h-4" fill="currentColor" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                  )}
                </button>

                {/* Title */}
                <span className="flex-1 font-medium text-sm">{track.title}</span>

                {/* Download */}
                <button
                  onClick={() => downloadFile(track.url, track.filename)}
                  className="shrink-0 text-gray-500 hover:text-white transition"
                  aria-label={`Download ${track.title}`}
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── IMAGES ── */}
        <section>
          <h2 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4 flex items-center gap-2">
            <ImageIcon className="w-4 h-4" /> 5 Photos
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CLARITY_BUNDLE.images.map((img) => (
              <div key={img.id} className="relative group rounded-lg overflow-hidden bg-zinc-900">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full aspect-[3/4] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2 p-2">
                  <p className="text-xs text-center text-white font-medium">{img.title}</p>
                  <button
                    onClick={() => downloadFile(img.url, img.filename)}
                    className="flex items-center gap-1 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full hover:bg-gray-200 transition"
                  >
                    <Download className="w-3 h-3" /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── STREAM ── */}
        <section>
          <a
            href="https://distrokid.com/hyperfollow/mosesofelgin/clarity?ref=release"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold py-4 text-base">
              <ExternalLink className="w-5 h-5 mr-2" />
              Stream on Apple Music, Spotify & More
            </Button>
          </a>
          <p className="text-center text-gray-600 text-xs mt-2">
            Also available on all major platforms via DistroKid
          </p>
        </section>

        {/* ── BACK ── */}
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="w-full border-zinc-700 text-white hover:bg-zinc-900"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
