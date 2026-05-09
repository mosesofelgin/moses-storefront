import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Download, Music } from 'lucide-react';
import { MIXTAPE_COVER, MIXTAPE_TRACKS, MIXTAPE_META } from '../data/mixtape-bundle';

export default function IfIWroteAMixtape() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(MIXTAPE_META.downloadEndpoint);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = MIXTAPE_META.zipFilename;
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
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-amber-950/30 to-black text-white" style={{ fontFamily: "'DM Mono', monospace" }}>

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-amber-900/30 bg-black/80 backdrop-blur-md px-4 py-4">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <Link href="/" className="text-amber-500 hover:text-amber-300 transition-colors font-mono text-xs uppercase tracking-widest">
            ← Home
          </Link>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-amber-600">
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
          <div className="absolute left-1/4 top-1/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-700/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl grid gap-10 md:grid-cols-2 md:gap-16 items-center">
          {/* Cover Art */}
          <div className="flex justify-center md:justify-start order-2 md:order-1">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-700/20 blur-2xl rounded-lg" />
              <img
                src={MIXTAPE_COVER}
                alt="If I Wrote A Mixtape"
                className="relative h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96 rounded-lg object-cover shadow-2xl"
              />
            </div>
          </div>

          {/* Text */}
          <div className="order-1 md:order-2 text-center md:text-left">
            <div className="mb-5 inline-block">
              <span className="rounded-full border border-amber-700 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-amber-400">
                Free Mixtape · {MIXTAPE_META.trackCount} Tracks
              </span>
            </div>

            <h1 className="mb-3 font-bebas text-[clamp(2.8rem,10vw,7rem)] leading-none tracking-wide text-amber-200">
              If I Wrote<br />A Mixtape
            </h1>

            <p className="mb-3 font-cormorant text-xl sm:text-2xl italic text-amber-300">
              Before the silence
            </p>

            <p className="mb-8 text-sm sm:text-base leading-relaxed text-stone-300 max-w-md mx-auto md:mx-0">
              Recorded right before the lockdown season. {MIXTAPE_META.trackCount} tracks. Raw and uncut.
              The last thing made before the world went quiet.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8 text-xs font-mono uppercase tracking-widest text-stone-400">
              <span>{MIXTAPE_META.trackCount} Tracks</span>
              <span className="text-amber-700">·</span>
              <span>{MIXTAPE_META.totalDuration}</span>
              <span className="text-amber-700">·</span>
              <span>{MIXTAPE_META.year}</span>
              <span className="text-amber-700">·</span>
              <span className="text-amber-400">Free</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
              <Link
                href={MIXTAPE_META.listenPath}
                className="flex items-center justify-center gap-2 rounded-lg bg-amber-700 px-6 sm:px-8 py-3 sm:py-4 font-bebas text-base sm:text-lg tracking-wide text-white transition-colors hover:bg-amber-600 active:bg-amber-800"
              >
                Listen Now <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center justify-center gap-2 rounded-lg border border-amber-700 px-6 sm:px-8 py-3 sm:py-4 font-bebas text-base sm:text-lg tracking-wide text-amber-200 transition-colors hover:border-amber-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="h-4 w-4" />
                {isDownloading ? 'Downloading...' : 'Download Free'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRACK PREVIEW ──────────────────────────────────────── */}
      <section className="px-4 py-16 sm:py-20 border-t border-amber-900/20">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-bebas text-2xl sm:text-3xl tracking-wide text-amber-200">
              Tracklist
            </h2>
            <span className="font-mono text-xs text-stone-500 uppercase tracking-widest">
              {MIXTAPE_META.trackCount} tracks
            </span>
          </div>

          <div className="space-y-1">
            {MIXTAPE_TRACKS.map((track) => (
              <div
                key={track.id}
                className="flex items-center gap-4 rounded px-3 py-2.5 transition-colors hover:bg-amber-900/10 group"
              >
                <span className="w-6 text-right font-mono text-xs text-stone-600 flex-shrink-0">
                  {track.id.toString().padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-stone-200 truncate group-hover:text-amber-200 transition-colors">
                    {track.title}
                  </p>
                </div>
                <span className="font-mono text-xs text-stone-600 flex-shrink-0">
                  {track.duration}
                </span>
              </div>
            ))}
          </div>

          {/* CTA after tracklist */}
          <div className="mt-10 text-center border-t border-amber-900/20 pt-10">
            <p className="text-stone-400 text-sm mb-4">
              {MIXTAPE_META.trackCount} tracks. No email required. Direct from MOSES SOG.
            </p>
            <Link
              href={MIXTAPE_META.listenPath}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-700 px-8 py-4 font-bebas text-lg tracking-wide text-white transition-colors hover:bg-amber-600"
            >
              <Music className="h-5 w-5" />
              Start Listening
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="border-t border-amber-900/20 px-4 py-10">
        <div className="mx-auto max-w-4xl text-center text-stone-600">
          <p className="text-sm">© 2026 MOSES SOG. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
