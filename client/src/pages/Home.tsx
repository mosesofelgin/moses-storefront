import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';

const ALBUM_COVER =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/album-cover_2118610e.png';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">

      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center">
        {/* Subtle ambient glow — no animation */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/5 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-2xl">
          {/* Season badge */}
          <div className="mb-8 inline-block">
            <span className="rounded-full border border-zinc-700 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
              Clarity Season 1 · April 2026
            </span>
          </div>

          {/* Brand name */}
          <h1 className="mb-4 font-bebas text-[clamp(5rem,18vw,10rem)] leading-none tracking-widest">
            MOSES
          </h1>

          {/* Primary headline */}
          <p className="mb-4 font-cormorant text-2xl italic text-zinc-200 md:text-3xl">
            10 years. One testimony. Truth-driven music.
          </p>

          {/* Sub-headline */}
          <p className="mb-12 text-sm leading-relaxed text-zinc-400 md:text-base">
            CLARITY is a 12-track journey of faith, discipline, and transformation —
            built direct, owned, and real.
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/listen"
              className="flex items-center justify-center gap-2 rounded-lg bg-green-500 px-7 py-3.5 font-bebas text-lg tracking-wide text-black transition-colors hover:bg-green-400"
            >
              Experience CLARITY <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/store"
              className="flex items-center justify-center gap-2 rounded-lg border border-zinc-600 px-7 py-3.5 font-bebas text-lg tracking-wide text-zinc-100 transition-colors hover:border-zinc-400 hover:text-white"
            >
              Own the Album <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/connect"
              className="flex items-center justify-center gap-2 rounded-lg border border-zinc-700 px-7 py-3.5 font-bebas text-lg tracking-wide text-zinc-400 transition-colors hover:border-zinc-500 hover:text-zinc-200"
            >
              Join the Community <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. FEATURED PROJECT ─────────────────────────────────── */}
      <section className="border-t border-zinc-800 px-4 py-20">
        <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2 md:items-center">
          {/* Album art */}
          <div className="overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl shadow-black/60">
            <img
              src={ALBUM_COVER}
              alt="CLARITY album cover"
              className="h-auto w-full object-cover transition-opacity hover:opacity-95"
              loading="lazy"
            />
          </div>

          {/* Copy */}
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              Clarity Season 1 · April 2026
            </p>
            <h2 className="mb-4 font-bebas text-5xl leading-none tracking-wide md:text-6xl">
              CLARITY
            </h2>
            <p className="mb-8 leading-relaxed text-zinc-400">
              This is more than music. This is a journey through confusion, surrender,
              discipline, and purpose.
            </p>
            <Link
              href="/listen"
              className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 font-bebas text-lg tracking-wide text-black transition-colors hover:bg-green-400"
            >
              Listen Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. VALUE PROPS ──────────────────────────────────────── */}
      <section className="border-t border-zinc-800 bg-zinc-900/40 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                label: 'OWNED',
                copy: 'No algorithms. No middlemen. Direct from artist to listener.',
              },
              {
                label: 'DIRECT',
                copy: 'Support the music and receive the full project instantly.',
              },
              {
                label: 'REAL',
                copy: 'Faith, testimony, and truth-driven music from lived experience.',
              },
            ].map(({ label, copy }) => (
              <div key={label} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <div className="mb-3 font-bebas text-3xl tracking-wide text-green-400">
                  {label}
                </div>
                <p className="text-sm leading-relaxed text-zinc-400">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PATHWAY CARDS ────────────────────────────────────── */}
      <section className="border-t border-zinc-800 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center font-bebas text-4xl tracking-wide text-zinc-200">
            WHERE DO YOU WANT TO GO?
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: 'LISTEN',
                copy: 'Enter the CLARITY listening experience.',
                href: '/listen',
                accent: 'text-green-400',
                btn: 'bg-green-500 hover:bg-green-400 text-black',
              },
              {
                title: 'STORE',
                copy: 'Own the full album and support the mission.',
                href: '/store',
                accent: 'text-zinc-200',
                btn: 'border border-zinc-600 hover:border-zinc-400 text-zinc-100',
              },
              {
                title: 'CONNECT',
                copy: 'Join the community and stay close to the journey.',
                href: '/connect',
                accent: 'text-zinc-400',
                btn: 'border border-zinc-700 hover:border-zinc-500 text-zinc-300',
              },
            ].map(({ title, copy, href, accent, btn }) => (
              <div
                key={title}
                className="flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <div>
                  <div className={`mb-2 font-bebas text-3xl tracking-wide ${accent}`}>
                    {title}
                  </div>
                  <p className="mb-6 text-sm leading-relaxed text-zinc-400">{copy}</p>
                </div>
                <Link
                  href={href}
                  className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-bebas text-base tracking-wide transition-colors ${btn}`}
                >
                  {title} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. MISSION ──────────────────────────────────────────── */}
      <section className="border-t border-zinc-800 bg-zinc-900/40 px-4 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
            The Mission
          </p>
          <p className="font-cormorant text-2xl italic leading-relaxed text-zinc-300 md:text-3xl">
            "MOSES SOG is building a direct-to-consumer music and media ecosystem rooted
            in faith, ownership, and creative discipline."
          </p>
        </div>
      </section>

      {/* ── 6. FOOTER ───────────────────────────────────────────── */}
      <footer className="border-t border-zinc-800 px-4 py-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-6 font-mono text-xs uppercase tracking-widest text-zinc-500 md:justify-start">
            {[
              { label: 'Home', href: '/' },
              { label: 'Listen', href: '/listen' },
              { label: 'Store', href: '/store' },
              { label: 'Connect', href: '/connect' },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="transition-colors hover:text-zinc-300">
                {label}
              </Link>
            ))}
          </nav>

          {/* Email */}
          <a
            href="mailto:mosessog@gmail.com"
            className="font-mono text-xs text-zinc-500 transition-colors hover:text-zinc-300"
          >
            mosessog@gmail.com
          </a>

          {/* Copyright */}
          <p className="font-mono text-xs text-zinc-600">© 2026 MOSES SOG</p>
        </div>
      </footer>
    </div>
  );
}
