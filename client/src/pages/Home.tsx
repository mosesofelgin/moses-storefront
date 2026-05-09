import { Link } from 'wouter';
import { ArrowRight, Download } from 'lucide-react';
import { useState } from 'react';

const DEDICATION_COVER =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/dedication-cover_20e0add5.jpg';

const CLARITY_COVER =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/album-cover_2118610e.png';

const BATHSHEBA_COVER =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/bathsheba-cover-a7iGpxp22xB7WCpL6jtdHa.webp';

const MIXTAPE_COVER =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/if-i-wrote-a-mixtape-cover_6a183be2.jpg';

const NEW_GENESIS_COVER =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/new-genesis-cover_23ac8f82.png';

const ABCS_COVER =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/abcs-cover_be82498d.png';

export default function Home() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isBathshebaDownloading, setIsBathshebaDownloading] = useState(false);
  const [isMixtapeDownloading, setIsMixtapeDownloading] = useState(false);
  const [isNewGenesisDownloading, setIsNewGenesisDownloading] = useState(false);
  const [isAbcsDownloading, setIsAbcsDownloading] = useState(false);

  const handleDownloadBathsheba = async () => {
    setIsBathshebaDownloading(true);
    try {
      const response = await fetch('/api/download/bathsheba');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'BATHSHEBA-Project.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsBathshebaDownloading(false);
    }
  };

  const handleDownloadMixtape = async () => {
    setIsMixtapeDownloading(true);
    try {
      const response = await fetch('/api/download/mixtape');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'If-I-Wrote-A-Mixtape.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsMixtapeDownloading(false);
    }
  };

  const handleDownloadNewGenesis = async () => {
    setIsNewGenesisDownloading(true);
    try {
      const response = await fetch('/api/download/new-genesis');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'New-Genesis.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsNewGenesisDownloading(false);
    }
  };

  const handleDownloadAbcs = async () => {
    setIsAbcsDownloading(true);
    try {
      const response = await fetch('/api/download/abcs');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Back-to-Basics-ABCs.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsAbcsDownloading(false);
    }
  };

  const handleDownloadDedication = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch('/api/download/dedication');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'DEDICATION-Mixtape.zip';
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

      {/* ── 1. DEDICATION HERO ──────────────────────────────────── */}
      <section className="relative min-h-screen px-4 py-16 sm:py-24">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-1/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/8 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/3 h-[300px] w-[300px] rounded-full bg-red-900/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl grid gap-10 lg:grid-cols-2 lg:items-center">          
          {/* Cover Art */}
          <div className="order-2 lg:order-1 flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-2xl" />
              <img
                src={DEDICATION_COVER}
                alt="DEDICATION cover"
                className="relative w-full rounded-2xl object-cover shadow-2xl border border-red-900/50"
              />
            </div>
          </div>

          {/* Text + CTAs */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
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
              href="/dedication"
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

      {/* ── 3. IF I WROTE A MIXTAPE ─────────────────────────────── */}
      <section className="border-t border-zinc-800 px-4 py-20 bg-gradient-to-b from-amber-950/10 to-zinc-900/20">
        <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2 md:items-center">
          {/* Album art */}
          <div className="overflow-hidden rounded-2xl border border-amber-900/40 shadow-2xl shadow-amber-900/20">
            <img
              src={MIXTAPE_COVER}
              alt="If I Wrote A Mixtape cover"
              className="h-auto w-full object-cover transition-opacity hover:opacity-95"
              loading="lazy"
            />
          </div>

          {/* Copy */}
          <div>
            <div className="mb-4 inline-block">
              <span className="rounded-full border border-amber-800 px-3 py-1 font-mono text-xs uppercase tracking-[0.15em] text-amber-500">
                Free Mixtape · 30 Tracks
              </span>
            </div>

            <h2 className="mb-4 font-bebas text-5xl leading-tight tracking-wider text-zinc-100">
              If I Wrote A Mixtape
            </h2>

            <p className="mb-6 font-cormorant text-2xl italic text-zinc-300">
              Before the silence
            </p>

            <p className="mb-8 leading-relaxed text-zinc-400">
              30 tracks recorded right before the lockdown season. Raw, uncut, and completely free.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/mixtape/listen"
                className="flex items-center justify-center gap-2 rounded-lg bg-amber-700 px-6 py-3 font-bebas text-base tracking-wide text-white transition-colors hover:bg-amber-600"
              >
                Listen Now <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={handleDownloadMixtape}
                disabled={isMixtapeDownloading}
                className="flex items-center justify-center gap-2 rounded-lg border border-amber-700 px-6 py-3 font-bebas text-base tracking-wide text-amber-400 transition-colors hover:bg-amber-700/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="h-4 w-4" />
                {isMixtapeDownloading ? 'Downloading...' : 'Download Free'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. NEW GENESIS ──────────────────────────────────────── */}
      <section className="border-t border-zinc-800 px-4 py-20" style={{ background: 'linear-gradient(to bottom, rgba(15,12,41,0.4), rgba(26,16,64,0.2), transparent)' }}>
        <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2 md:items-center">
          {/* Album art */}
          <div className="order-2 md:order-1 overflow-hidden rounded-2xl border border-indigo-900/40 shadow-2xl shadow-indigo-900/20">
            <img
              src={NEW_GENESIS_COVER}
              alt="New Genesis cover"
              className="h-auto w-full object-cover transition-opacity hover:opacity-95"
              loading="lazy"
            />
          </div>

          {/* Copy */}
          <div className="order-1 md:order-2">
            <div className="mb-4 inline-block">
              <span className="rounded-full border border-indigo-800 px-3 py-1 font-mono text-xs uppercase tracking-[0.15em] text-indigo-400">
                Project · 15 Tracks · Free Download
              </span>
            </div>

            <h2 className="mb-4 font-bebas text-5xl leading-tight tracking-wider text-zinc-100">
              New Genesis
            </h2>

            <p className="mb-6 font-cormorant text-2xl italic text-zinc-300">
              A return to the source
            </p>

            <p className="mb-8 leading-relaxed text-zinc-400">
              15 tracks. A new beginning after the silence. Free to download — or support it in the store for $12.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/new-genesis/listen"
                className="flex items-center justify-center gap-2 rounded-lg bg-indigo-700 px-6 py-3 font-bebas text-base tracking-wide text-white transition-colors hover:bg-indigo-600"
              >
                Listen Now <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={handleDownloadNewGenesis}
                disabled={isNewGenesisDownloading}
                className="flex items-center justify-center gap-2 rounded-lg border border-indigo-700 px-6 py-3 font-bebas text-base tracking-wide text-indigo-300 transition-colors hover:bg-indigo-700/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="h-4 w-4" />
                {isNewGenesisDownloading ? 'Downloading...' : 'Download Free'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. BACK TO BASICS: ABCs ───────────────────────────── */}
      <section className="border-t border-zinc-800 px-4 py-20" style={{ background: 'linear-gradient(to bottom, rgba(120,60,10,0.08), transparent)' }}>
        <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2 md:items-center">
          {/* Album art */}
          <div className="overflow-hidden rounded-2xl border border-amber-900/30 shadow-2xl shadow-amber-950/20">
            <img
              src={ABCS_COVER}
              alt="Back to Basics: ABCs cover"
              className="h-auto w-full object-cover transition-opacity hover:opacity-95"
              loading="lazy"
            />
          </div>

          {/* Copy */}
          <div>
            <div className="mb-4 inline-block">
              <span className="rounded-full border border-amber-900/60 px-3 py-1 font-mono text-xs uppercase tracking-[0.15em] text-amber-700">
                Self-Made Project · 11 Tracks · Free
              </span>
            </div>

            <h2 className="mb-1 font-bebas text-4xl leading-tight tracking-wider text-zinc-100">
              Back to Basics
            </h2>
            <h3 className="mb-4 font-bebas text-3xl leading-tight tracking-wider text-amber-600">
              ;ABCs
            </h3>

            <p className="mb-6 font-cormorant text-xl italic text-zinc-400">
              Going back to the days when we were using FL Studio and pure focus.
            </p>

            <p className="mb-8 leading-relaxed text-zinc-500 text-sm">
              Produced, mixed, written, photographed, and edited by one person. Not perfect — but complete.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/abcs/listen"
                className="flex items-center justify-center gap-2 rounded-lg bg-amber-700 px-6 py-3 font-bebas text-base tracking-wide text-white transition-colors hover:bg-amber-600"
              >
                Listen Now <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={handleDownloadAbcs}
                disabled={isAbcsDownloading}
                className="flex items-center justify-center gap-2 rounded-lg border border-amber-800/60 px-6 py-3 font-bebas text-base tracking-wide text-amber-600 transition-colors hover:bg-amber-900/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="h-4 w-4" />
                {isAbcsDownloading ? 'Downloading...' : 'Download Free'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CLARITY FEATURED PROJECT ─────────────────────────── */}
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
