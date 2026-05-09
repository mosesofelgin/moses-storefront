import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Download, Music } from 'lucide-react';
import { bathshebaProject } from '../data/bathsheba-bundle';

export default function Bathsheba() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadBathsheba = () => {
    setIsDownloading(true);
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
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-black text-white">
      {/* ── HERO SECTION ──────────────────────────────────── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:py-24 text-center">
        {/* Subtle purple ambient glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/3 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl">
          {/* Badge */}
          <div className="mb-8 inline-block">
            <span className="rounded-full border border-purple-600 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-purple-300">
              Free Project · 10 Tracks
            </span>
          </div>

          {/* Headline */}
          <h1 className="mb-3 sm:mb-4 font-bebas text-[clamp(3.5rem,15vw,11rem)] leading-none tracking-widest text-purple-300">
            BATHSHEBA
          </h1>

          {/* Subheadline */}
          <p className="mb-3 sm:mb-4 font-cormorant text-xl sm:text-3xl md:text-4xl italic text-purple-200">
            A Royal Journey
          </p>

          {/* Description */}
          <p className="mb-8 sm:mb-12 text-sm sm:text-base leading-relaxed text-purple-100 md:text-lg">
            A collection of timeless tracks inspired by royalty, grace, and power.
            <br />
            Listen now. Download free. Direct from MOSES SOG.
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-2 sm:gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/bathsheba/listen"
              className="flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-6 sm:px-8 py-3 sm:py-4 font-bebas text-base sm:text-lg tracking-wide text-white transition-colors hover:bg-purple-500 active:bg-purple-700"
            >
              Listen Now <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
            <button
              onClick={handleDownloadBathsheba}
              disabled={isDownloading}
              className="flex items-center justify-center gap-2 rounded-lg border border-purple-500 px-6 sm:px-8 py-3 sm:py-4 font-bebas text-base sm:text-lg tracking-wide text-purple-100 transition-colors hover:border-purple-300 hover:text-white active:border-purple-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {isDownloading ? 'Downloading...' : 'Download Free'}
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURED SECTION ──────────────────────────────────── */}
      <section className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            {/* Album Art */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-lg" />
                <img
                  src={bathshebaProject.coverArt}
                  alt="BATHSHEBA"
                  className="relative h-80 w-80 sm:h-96 sm:w-96 rounded-lg object-cover shadow-2xl"
                />
              </div>
            </div>

            {/* Project Info */}
            <div className="space-y-6">
              <div>
                <p className="font-mono text-sm uppercase tracking-[0.2em] text-purple-400 mb-2">
                  {bathshebaProject.releaseDate}
                </p>
                <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide text-purple-200 mb-4">
                  {bathshebaProject.title}
                </h2>
                <p className="font-cormorant text-2xl italic text-purple-300 mb-6">
                  {bathshebaProject.subtitle}
                </p>
              </div>

              <p className="text-lg leading-relaxed text-purple-100">
                {bathshebaProject.description}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-purple-700">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-purple-400">
                    Tracks
                  </p>
                  <p className="font-bebas text-3xl text-purple-200">
                    {bathshebaProject.totalTracks}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-purple-400">
                    Duration
                  </p>
                  <p className="font-bebas text-3xl text-purple-200">
                    {bathshebaProject.totalDuration}
                  </p>
                </div>
              </div>

              <Link
                href="/bathsheba/listen"
                className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-8 py-4 font-bebas text-lg tracking-wide text-white transition-colors hover:bg-purple-500 mt-6"
              >
                <Music className="h-5 w-5" />
                Enter the Experience
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────── */}
      <footer className="border-t border-purple-800 px-4 py-12">
        <div className="mx-auto max-w-4xl text-center text-purple-300">
          <p className="text-sm">
            © 2026 MOSES SOG. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
