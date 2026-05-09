import { useState } from 'react';
import { Link } from 'wouter';
import { Download, Play, ArrowRight, ArrowLeft, Music } from 'lucide-react';
import { ABCS_COVER, ABCS_META, ABCS_TRACKS } from '@/data/abcs-bundle';

export default function Abcs() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(ABCS_META.downloadEndpoint);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = ABCS_META.zipFilename;
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 border-b border-zinc-800/60 bg-zinc-950/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-300 transition-colors">
            <ArrowLeft className="h-3 w-3" /> Home
          </Link>
          <span className="font-bebas text-lg tracking-widest text-zinc-300">MOSES SOG</span>
          <Link href="/store" className="font-mono text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-300 transition-colors">
            Store
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="px-4 py-16 md:py-24" style={{ background: 'linear-gradient(to bottom, rgba(120,60,10,0.15), transparent)' }}>
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-center">
          {/* Cover art */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-amber-900/30 to-transparent blur-xl" />
            <div className="relative overflow-hidden rounded-2xl border border-amber-900/30 shadow-2xl shadow-amber-950/40">
              <img
                src={ABCS_COVER}
                alt="Back to Basics: ABCs cover art"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

          {/* Copy */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full border border-amber-800/60 px-3 py-1 font-mono text-xs uppercase tracking-[0.15em] text-amber-600">
                Free Project · {ABCS_META.trackCount} Tracks · {ABCS_META.year}
              </span>
            </div>

            <h1 className="mb-2 font-bebas text-6xl leading-none tracking-wider text-zinc-100 md:text-7xl">
              Back to Basics
            </h1>
            <h2 className="mb-6 font-bebas text-4xl leading-none tracking-wider text-amber-600 md:text-5xl">
              ;ABCs
            </h2>

            <p className="mb-4 font-mono text-sm italic text-zinc-400">
              "{ABCS_META.tagline}"
            </p>

            <p className="mb-8 leading-relaxed text-zinc-400">
              {ABCS_META.description}
            </p>

            {/* Stats row */}
            <div className="mb-8 grid grid-cols-3 gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
              <div className="text-center">
                <p className="font-bebas text-2xl text-amber-500">{ABCS_META.trackCount}</p>
                <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">Tracks</p>
              </div>
              <div className="text-center">
                <p className="font-bebas text-2xl text-amber-500">{ABCS_META.totalDuration}</p>
                <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">Runtime</p>
              </div>
              <div className="text-center">
                <p className="font-bebas text-2xl text-amber-500">FREE</p>
                <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">Price</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/abcs/listen"
                className="flex items-center justify-center gap-2 rounded-lg bg-amber-700 px-6 py-3 font-bebas text-base tracking-wide text-white transition-colors hover:bg-amber-600"
              >
                <Play className="h-4 w-4" /> Listen Now
              </Link>
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center justify-center gap-2 rounded-lg border border-amber-800 px-6 py-3 font-bebas text-base tracking-wide text-amber-400 transition-colors hover:bg-amber-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="h-4 w-4" />
                {isDownloading ? 'Preparing ZIP...' : 'Download Free'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT THE PROJECT ── */}
      <section className="border-t border-zinc-800 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h3 className="mb-6 font-bebas text-3xl tracking-wider text-zinc-200">
            About the Project
          </h3>
          <div className="space-y-4 leading-relaxed text-zinc-400">
            <p>
              <strong className="text-zinc-200">Back to Basics: ABCs</strong> is a challenge project — everything on this record was produced, mixed, written, photographed, and edited by one person. No outside help. No shortcuts.
            </p>
            <p>
              Going back to the days of FL Studio and pure focus. The goal wasn't perfection. The goal was completion. And it's complete.
            </p>
            <p>
              11 tracks. 27 minutes. A proof of concept that the fundamentals still work.
            </p>
          </div>
        </div>
      </section>

      {/* ── TRACKLIST ── */}
      <section className="border-t border-zinc-800 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h3 className="mb-8 font-bebas text-3xl tracking-wider text-zinc-200">
            Tracklist
          </h3>
          <div className="space-y-1">
            {ABCS_TRACKS.map((track, i) => (
              <div
                key={track.id}
                className="group flex items-center gap-4 rounded-lg px-4 py-3 transition-colors hover:bg-zinc-900/60"
              >
                <span className="w-6 text-right font-mono text-sm text-zinc-600 group-hover:text-amber-600">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <Music className="h-3.5 w-3.5 shrink-0 text-zinc-700 group-hover:text-amber-700" />
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium text-zinc-300 group-hover:text-zinc-100">
                    {track.title}
                  </p>
                  <p className="truncate font-mono text-xs text-zinc-600">
                    {track.description}
                  </p>
                </div>
                <span className="font-mono text-xs text-zinc-600">{track.duration}</span>
              </div>
            ))}
          </div>

          {/* Listen CTA below tracklist */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/abcs/listen"
              className="flex items-center gap-2 rounded-lg bg-amber-700 px-8 py-3 font-bebas text-base tracking-wide text-white transition-colors hover:bg-amber-600"
            >
              <Play className="h-4 w-4" /> Open Full Player
            </Link>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-2 rounded-lg border border-amber-800 px-8 py-3 font-bebas text-base tracking-wide text-amber-400 transition-colors hover:bg-amber-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-4 w-4" />
              {isDownloading ? 'Preparing...' : 'Download All Free'}
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <footer className="border-t border-zinc-800 px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap justify-center gap-8 font-mono text-xs uppercase tracking-widest text-zinc-600">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <Link href="/bathsheba" className="hover:text-zinc-300 transition-colors">Bathsheba</Link>
            <Link href="/new-genesis" className="hover:text-zinc-300 transition-colors">New Genesis</Link>
            <Link href="/mixtape" className="hover:text-zinc-300 transition-colors">Mixtape</Link>
            <Link href="/dedication" className="hover:text-zinc-300 transition-colors">Dedication</Link>
            <Link href="/listen" className="hover:text-zinc-300 transition-colors">CLARITY</Link>
            <Link href="/store" className="hover:text-zinc-300 transition-colors">Store</Link>
          </div>
          <p className="mt-8 text-center font-mono text-xs text-zinc-700">
            © {new Date().getFullYear()} MOSES SOG — Moses Enterprises
          </p>
        </div>
      </footer>
    </div>
  );
}
