import { Link } from 'wouter';
import { ArrowRight, Download } from 'lucide-react';
import { useState } from 'react';

const DEDICATION_COVER =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/dedication-cover_20e0add5.jpg';

const CLARITY_COVER =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/album-cover_2118610e.png';

const BATHSHEBA_COVER =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/bathsheba-cover_a8f2c1d3.png';

export default function Home() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isBathshebaDownloading, setIsBathshebaDownloading] = useState(false);

  const handleDownloadBathsheba = async () => {
    setIsBathshebaDownloading(true);
    try {
      const link = document.createElement('a');
      link.href = '/api/download/bathsheba';
      link.download = 'BATHSHEBA-Project.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsBathshebaDownloading(false);
    }
  };

  const handleDownloadDedication = async () => {
    setIsDownloading(true);
    try {
      const link = document.createElement('a');
      link.href = '/api/download/dedication';
      link.download = 'DEDICATION-Mixtape.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">

      {/* ── 1. DEDICATION HERO ──────────────────────────────────── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:py-24 text-center">
        {/* Subtle red/black ambient glow for Dedication */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/3 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/5 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl">
          {/* Dedication badge */}
          <div className="mb-8 inline-block">
            <span className="rounded-full border border-red-700 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-red-400">
              Free Mixtape · 14 Tracks
            </span>
          </div>

          {/* Dedication headline */}
          <h1 className="mb-3 sm:mb-4 font-bebas text-[clamp(3.5rem,15vw,11rem)] leading-none tracking-widest text-red-500">
            DEDICATION
          </h1>

          {/* Dedication subheadline */}
          <p className="mb-3 sm:mb-4 font-cormorant text-xl sm:text-3xl md:text-4xl italic text-zinc-200">
            A homage to Lil Wayne
          </p>

          {/* Dedication description */}
          <p className="mb-8 sm:mb-12 text-sm sm:text-base leading-relaxed text-zinc-300 md:text-lg">
            14 tracks of pure artistry. Listen now. Download free. No email required.
            <br />
            Direct from MOSES SOG.
          </p>

          {/* Dedication CTAs */}
          <div className="flex flex-col gap-2 sm:gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/mixtape"
              className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 sm:px-8 py-3 sm:py-4 font-bebas text-base sm:text-lg tracking-wide text-white transition-colors hover:bg-red-500 active:bg-red-700"
            >
              Listen Now <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
            <button
              onClick={handleDownloadDedication}
              disabled={isDownloading}
              className="flex items-center justify-center gap-2 rounded-lg border border-zinc-600 px-6 sm:px-8 py-3 sm:py-4 font-bebas text-base sm:text-lg tracking-wide text-zinc-100 transition-colors hover:border-zinc-400 hover:text-white active:border-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {isDownloading ? 'Downloading...' : 'Download Free'}
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. BATHSHEBA FEATURED PROJECT ──────────────────────────── */}
      <section className="border-t border-zinc-800 px-4 py-20 bg-gradient-to-b from-purple-950/20 to-zinc-900/30">
        <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2 md:items-center">
          {/* Album art */}
          <div className="overflow-hidden rounded-2xl border border-purple-800 shadow-2xl shadow-purple-900/40">
            <img
              src={BATHSHEBA_COVER}
              alt="BATHSHEBA cover"
              className="h-auto w-full object-cover transition-opacity hover:opacity-95"
              loading="lazy"
            />
          </div>

          {/* Copy */}
          <div>
            <div className="mb-4 inline-block">
              <span className="rounded-full border border-purple-700 px-3 py-1 font-mono text-xs uppercase tracking-[0.15em] text-purple-400">
                BATHSHEBA · 10 Tracks
              </span>
            </div>

            <h2 className="mb-4 font-bebas text-5xl leading-tight tracking-wider text-zinc-100">
              BATHSHEBA
            </h2>

            <p className="mb-6 font-cormorant text-2xl italic text-zinc-300">
              A royal journey through grace and sovereignty
            </p>

            <p className="mb-8 leading-relaxed text-zinc-400">
              10 tracks of artistic excellence. A project rooted in royalty, purpose, and creative vision.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/bathsheba/listen"
                className="flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-bebas text-base tracking-wide text-white transition-colors hover:bg-purple-500"
              >
                Listen Now <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={handleDownloadBathsheba}
                disabled={isBathshebaDownloading}
                className="flex items-center justify-center gap-2 rounded-lg border border-purple-600 px-6 py-3 font-bebas text-base tracking-wide text-purple-400 transition-colors hover:bg-purple-600/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="h-4 w-4" />
                {isBathshebaDownloading ? 'Downloading...' : 'Download Free'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. CLARITY FEATURED PROJECT ─────────────────────────── */}
      <section className="border-t border-zinc-800 px-4 py-20 bg-zinc-900/30">
        <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2 md:items-center">
          {/* Album art */}
          <div className="overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl shadow-black/60">
            <img
              src={CLARITY_COVER}
              alt="CLARITY album cover"
              className="h-auto w-full object-cover transition-opacity hover:opacity-95"
              loading="lazy"
            />
          </div>

          {/* Copy */}
          <div>
            <div className="mb-4 inline-block">
              <span className="rounded-full border border-zinc-700 px-3 py-1 font-mono text-xs uppercase tracking-[0.15em] text-zinc-400">
                CLARITY Season 1 · April 2026
              </span>
            </div>

            <h2 className="mb-4 font-bebas text-5xl leading-tight tracking-wider text-zinc-100">
              CLARITY
            </h2>

            <p className="mb-6 font-cormorant text-2xl italic text-zinc-300">
              A 12-track journey of faith, discipline, and transformation
            </p>

            <p className="mb-8 leading-relaxed text-zinc-400">
              This is more than music. This is a journey through confusion, surrender,
              discipline, and purpose. Built direct, owned, and real.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/listen"
                className="flex items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-3 font-bebas text-base tracking-wide text-black transition-colors hover:bg-green-400"
              >
                Listen Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/store"
                className="flex items-center justify-center gap-2 rounded-lg border border-green-600 px-6 py-3 font-bebas text-base tracking-wide text-green-400 transition-colors hover:bg-green-600/10"
              >
                Own the Album <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. VALUE PROPOSITION ────────────────────────────────── */}
      <section className="border-t border-zinc-800 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center font-bebas text-4xl tracking-wider uppercase">
            The MOSES Difference
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {/* OWNED */}
            <div className="rounded-lg border border-zinc-800 p-6 text-center hover:border-zinc-700 transition-colors">
              <h3 className="mb-3 font-bebas text-2xl tracking-wider text-green-500">
                OWNED
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                No algorithms. No middlemen. Direct from artist to listener.
              </p>
            </div>

            {/* DIRECT */}
            <div className="rounded-lg border border-zinc-800 p-6 text-center hover:border-zinc-700 transition-colors">
              <h3 className="mb-3 font-bebas text-2xl tracking-wider text-green-500">
                DIRECT
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                Support the music and receive the full project instantly.
              </p>
            </div>

            {/* REAL */}
            <div className="rounded-lg border border-zinc-800 p-6 text-center hover:border-zinc-700 transition-colors">
              <h3 className="mb-3 font-bebas text-2xl tracking-wider text-green-500">
                REAL
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                Faith, testimony, and truth-driven music from lived experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. PATHWAY CARDS ────────────────────────────────────── */}
      <section className="border-t border-zinc-800 px-4 py-20 bg-zinc-900/30">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center font-bebas text-4xl tracking-wider uppercase">
            Your Journey
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Listen */}
            <Link
              href="/listen"
              className="group rounded-lg border border-zinc-800 p-8 text-center transition-all hover:border-green-600 hover:bg-green-600/5"
            >
              <h3 className="mb-3 font-bebas text-2xl tracking-wider text-zinc-100 group-hover:text-green-400">
                LISTEN
              </h3>
              <p className="mb-6 text-sm text-zinc-400">
                Enter the CLARITY listening experience.
              </p>
              <button className="inline-flex items-center gap-2 font-bebas text-sm tracking-wide text-green-500 group-hover:text-green-400">
                Listen <ArrowRight className="h-3 w-3" />
              </button>
            </Link>

            {/* Store */}
            <Link
              href="/store"
              className="group rounded-lg border border-zinc-800 p-8 text-center transition-all hover:border-green-600 hover:bg-green-600/5"
            >
              <h3 className="mb-3 font-bebas text-2xl tracking-wider text-zinc-100 group-hover:text-green-400">
                STORE
              </h3>
              <p className="mb-6 text-sm text-zinc-400">
                Own the full album and support the mission.
              </p>
              <button className="inline-flex items-center gap-2 font-bebas text-sm tracking-wide text-green-500 group-hover:text-green-400">
                Store <ArrowRight className="h-3 w-3" />
              </button>
            </Link>

            {/* Connect */}
            <Link
              href="/connect"
              className="group rounded-lg border border-zinc-800 p-8 text-center transition-all hover:border-green-600 hover:bg-green-600/5"
            >
              <h3 className="mb-3 font-bebas text-2xl tracking-wider text-zinc-100 group-hover:text-green-400">
                CONNECT
              </h3>
              <p className="mb-6 text-sm text-zinc-400">
                Join the community and stay close to the journey.
              </p>
              <button className="inline-flex items-center gap-2 font-bebas text-sm tracking-wide text-green-500 group-hover:text-green-400">
                Connect <ArrowRight className="h-3 w-3" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. MISSION ──────────────────────────────────────────── */}
      <section className="border-t border-zinc-800 px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-cormorant text-3xl italic leading-relaxed text-zinc-300">
            MOSES SOG is building a direct-to-consumer music and media ecosystem
            rooted in faith, ownership, and creative discipline.
          </p>
        </div>
      </section>

      {/* ── 6. FOOTER ───────────────────────────────────────────── */}
      <footer className="border-t border-zinc-800 px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 grid grid-cols-2 gap-8 md:grid-cols-4">
            <Link href="/" className="text-zinc-400 hover:text-green-500 transition-colors font-bebas tracking-wide">
              HOME
            </Link>
            <Link href="/listen" className="text-zinc-400 hover:text-green-500 transition-colors font-bebas tracking-wide">
              LISTEN
            </Link>
            <Link href="/store" className="text-zinc-400 hover:text-green-500 transition-colors font-bebas tracking-wide">
              STORE
            </Link>
            <Link href="/connect" className="text-zinc-400 hover:text-green-500 transition-colors font-bebas tracking-wide">
              CONNECT
            </Link>
          </div>

          <div className="border-t border-zinc-800 pt-8 text-center text-sm text-zinc-600">
            <p>© 2026 MOSES SOG</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
