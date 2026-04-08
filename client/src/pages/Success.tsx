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
          <p className="text-gray-500 text-sm">All 12 tracks + 5 photos — download below.</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-20 space-y-10">

        {/* ── DOWNLOAD EVERYTHING ── */}
        <section className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 text-center">
          <PackageOpen className="w-10 h-10 mx-auto mb-3 text-white" />
          <h2 className="text-xl font-bold mb-1">Download Everything</h2>
          <p className="text-gray-400 text-sm mb-5">
            One ZIP file — all 12 tracks + 5 photos bundled together (~130MB).
          </p>
          <a
            href="/api/download/zip"
            download="CLARITY-by-Moses.zip"
            className="flex items-center justify-center gap-2 w-full bg-white text-black hover:bg-gray-200 font-bold py-4 text-base rounded-md transition"
          >
            <Download className="w-5 h-5" />
            Download CLARITY.zip (17 files)
          </a>
          <p className="text-gray-600 text-xs mt-3">
            The file is ~130MB — your browser will start downloading automatically.
          </p>
        </section>

        {/* ── TRACKS ── */}
        <section>
          <h2 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4 flex items-center gap-2">
            <Music className="w-4 h-4" /> 12 Tracks — individual downloads
          </h2>
          <div className="space-y-2">
            {CLARITY_BUNDLE.tracks.map((track) => (
              <div
                key={track.id}
                className="flex items-center gap-3 bg-zinc-900 hover:bg-zinc-800 transition rounded-lg px-4 py-3"
              >
                <span className="text-gray-600 text-sm w-5 text-right shrink-0">
                  {track.id}
                </span>
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
                <span className="flex-1 font-medium text-sm">{track.title}</span>
                <a
                  href={track.url}
                  download={track.filename}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-gray-500 hover:text-white transition"
                  aria-label={`Download ${track.title}`}
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── IMAGES ── */}
        <section>
          <h2 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4 flex items-center gap-2">
            <ImageIcon className="w-4 h-4" /> 5 Photos — individual downloads
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
                  <a
                    href={img.url}
                    download={img.filename}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full hover:bg-gray-200 transition"
                  >
                    <Download className="w-3 h-3" /> Download
                  </a>
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
        </section>

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
