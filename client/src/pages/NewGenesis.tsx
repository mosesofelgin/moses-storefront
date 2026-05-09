import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Download, Music, ShoppingBag } from 'lucide-react';
import { NEW_GENESIS_COVER, NEW_GENESIS_TRACKS, NEW_GENESIS_META } from '../data/new-genesis-bundle';

export default function NewGenesis() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(NEW_GENESIS_META.downloadEndpoint);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = NEW_GENESIS_META.zipFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      className="min-h-screen text-white"
      style={{
        fontFamily: "'DM Mono', monospace",
        background: 'linear-gradient(to bottom, #0f0c29, #1a1040, #0d0d0d)',
      }}
    >

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-indigo-900/30 bg-black/80 backdrop-blur-md px-4 py-4">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <Link href="/" className="text-indigo-400 hover:text-indigo-200 transition-colors font-mono text-xs uppercase tracking-widest">
            ← Home
          </Link>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-500">
            Moses SOG
          </span>
          <Link href="/store" className="text-zinc-500 hover:text-zinc-300 transition-colors font-mono text-xs uppercase tracking-widest">
            Store
          </Link>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative px-4 pt-16 pb-20 sm:pt-24 sm:pb-28">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/3 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-900/20 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-yellow-900/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl grid gap-10 md:grid-cols-2 md:gap-16 items-center">
          {/* Cover Art */}
          <div className="flex justify-center md:justify-start order-2 md:order-1">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-700/20 blur-2xl rounded-lg" />
              <img
                src={NEW_GENESIS_COVER}
                alt="New Genesis"
                className="relative h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96 rounded-lg object-cover shadow-2xl"
              />
            </div>
          </div>

          {/* Text */}
          <div className="order-1 md:order-2 text-center md:text-left">
            <div className="mb-5 inline-block">
              <span className="rounded-full border border-indigo-700 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-indigo-300">
                Project · {NEW_GENESIS_META.trackCount} Tracks
              </span>
            </div>

            <h1 className="mb-3 font-bebas text-[clamp(3rem,10vw,8rem)] leading-none tracking-wide text-indigo-100">
              New Genesis
            </h1>

            <p className="mb-3 font-cormorant text-xl sm:text-2xl italic text-yellow-400/80">
              A return to the source
            </p>

            <p className="mb-8 text-sm sm:text-base leading-relaxed text-indigo-200/70 max-w-md mx-auto md:mx-0">
              Recorded after the lockdown season. A return to origin, law, and wandering.
              It marks a new beginning — a genesis — after a period of silence and separation.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8 text-xs font-mono uppercase tracking-widest text-indigo-400/60">
              <span>{NEW_GENESIS_META.trackCount} Tracks</span>
              <span className="text-indigo-700">·</span>
              <span>{NEW_GENESIS_META.totalDuration}</span>
              <span className="text-indigo-700">·</span>
              <span>{NEW_GENESIS_META.year}</span>
              <span className="text-indigo-700">·</span>
              <span className="text-yellow-400/70">Free Download</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
              <Link
                href={NEW_GENESIS_META.listenPath}
                className="flex items-center justify-center gap-2 rounded-lg bg-indigo-700 px-6 sm:px-8 py-3 sm:py-4 font-bebas text-base sm:text-lg tracking-wide text-white transition-colors hover:bg-indigo-600 active:bg-indigo-800"
              >
                Listen Now <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center justify-center gap-2 rounded-lg border border-indigo-700 px-6 sm:px-8 py-3 sm:py-4 font-bebas text-base sm:text-lg tracking-wide text-indigo-200 transition-colors hover:border-indigo-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="h-4 w-4" />
                {isDownloading ? 'Downloading...' : 'Download Free'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRACKLIST ──────────────────────────────────────────── */}
      <section className="px-4 py-16 sm:py-20 border-t border-indigo-900/20">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-bebas text-2xl sm:text-3xl tracking-wide text-indigo-200">
              Tracklist
            </h2>
            <span className="font-mono text-xs text-indigo-600 uppercase tracking-widest">
              {NEW_GENESIS_META.trackCount} tracks · {NEW_GENESIS_META.totalDuration}
            </span>
          </div>

          <div className="space-y-1">
            {NEW_GENESIS_TRACKS.map((track) => (
              <div
                key={track.id}
                className="flex items-center gap-4 rounded px-3 py-2.5 transition-colors hover:bg-indigo-900/15 group"
              >
                <span className="w-6 text-right font-mono text-xs text-yellow-700/60 flex-shrink-0">
                  {track.id.toString().padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-indigo-100 truncate group-hover:text-yellow-300 transition-colors">
                    {track.title}
                  </p>
                  <p className="text-xs text-indigo-500/60 truncate hidden sm:block">
                    {track.description}
                  </p>
                </div>
                <span className="font-mono text-xs text-indigo-600/60 flex-shrink-0">
                  {track.duration}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs after tracklist */}
          <div className="mt-10 border-t border-indigo-900/20 pt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={NEW_GENESIS_META.listenPath}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-700 px-8 py-4 font-bebas text-lg tracking-wide text-white transition-colors hover:bg-indigo-600"
            >
              <Music className="h-5 w-5" />
              Start Listening
            </Link>
            <Link
              href="/store"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-yellow-700/50 px-8 py-4 font-bebas text-lg tracking-wide text-yellow-300/80 transition-colors hover:border-yellow-500 hover:text-yellow-200"
            >
              <ShoppingBag className="h-5 w-5" />
              Support — $12 in Store
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="border-t border-indigo-900/20 px-4 py-10">
        <div className="mx-auto max-w-4xl text-center text-indigo-700">
          <p className="text-sm">© 2026 MOSES SOG. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
