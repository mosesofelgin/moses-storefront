import { ArrowLeft, ArrowRight, Check, Disc3, Play, ShoppingBag } from 'lucide-react';
import { Link } from 'wouter';
import { CLARITY_COVER } from '@/data/project-catalog';

const proof = [
  ['12', 'Tracks'],
  ['45m', 'Runtime'],
  ['$12', 'Digital album'],
];

export default function ClaritySales() {
  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <header className="border-b border-amber-100/10 bg-zinc-950/90 px-4 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-zinc-400 transition hover:text-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Vault</Link>
          <p className="font-display text-lg tracking-[0.16em] text-amber-200">MOSES SOG</p>
          <Link href="/artist" className="inline-flex min-h-11 items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-zinc-400 transition hover:text-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">Artist <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </header>

      <section className="relative isolate px-4 py-12 sm:py-20 lg:min-h-[calc(100vh-4.75rem)] lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_24%,rgba(184,134,11,0.18),transparent_27%),radial-gradient(circle_at_18%_80%,rgba(51,99,68,0.13),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
          <div className="order-2 lg:order-1">
            <p className="text-[10px] uppercase tracking-[0.32em] text-amber-200">New album · Current transmission</p>
            <h1 className="mt-5 font-display text-[clamp(5rem,13vw,10rem)] leading-[0.76] tracking-[0.09em] text-zinc-50">CLARITY</h1>
            <p className="mt-7 max-w-2xl font-serif text-3xl italic leading-[1.05] text-amber-50/85 sm:text-4xl">Faith, discipline, and transformation in twelve movements.</p>
            <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">CLARITY moves through confusion, surrender, discipline, and purpose. It is built direct, owned, and released without a middleman.</p>
            <div className="mt-9 grid max-w-lg grid-cols-3 gap-3">{proof.map(([value,label]) => <div key={label} className="border border-amber-100/10 bg-zinc-950/60 px-3 py-4 text-center"><p className="font-display text-3xl tracking-[0.1em] text-amber-200">{value}</p><p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-zinc-600">{label}</p></div>)}</div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/checkout" className="inline-flex min-h-14 flex-1 items-center justify-center gap-2 rounded-xl bg-amber-300 px-7 font-display text-lg tracking-[0.16em] text-zinc-950 transition hover:bg-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">BUY NOW <ShoppingBag className="h-4 w-4" aria-hidden="true" /></Link>
              <Link href="/listen" className="inline-flex min-h-14 flex-1 items-center justify-center gap-2 rounded-xl border border-amber-100/20 px-7 font-display text-lg tracking-[0.16em] text-amber-100 transition hover:border-amber-200/60 hover:bg-amber-100/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">LISTEN FIRST <Play className="h-4 w-4 fill-current" aria-hidden="true" /></Link>
            </div>
            <p className="mt-4 text-center text-[10px] uppercase tracking-[0.15em] text-zinc-600 sm:text-left">Buy Now goes straight to secure checkout · Listen First unlocks with email</p>
          </div>
          <div className="order-1 lg:order-2"><div className="relative mx-auto max-w-xl"><div className="absolute -inset-10 rounded-[3rem] bg-amber-300/12 blur-3xl" /><div className="relative overflow-hidden rounded-[2rem] border border-amber-100/25 bg-zinc-900 p-2 shadow-[0_35px_110px_rgba(0,0,0,0.58)]"><img src={CLARITY_COVER} alt="CLARITY album cover by MOSES" className="aspect-square w-full rounded-[1.55rem] object-cover" /><div className="absolute inset-x-9 bottom-9 flex items-center justify-between rounded-2xl border border-amber-100/15 bg-zinc-950/75 px-4 py-3 backdrop-blur-xl"><div><p className="text-[9px] uppercase tracking-[0.22em] text-amber-200">Digital album</p><p className="mt-1 font-display text-xl tracking-[0.13em] text-zinc-100">OWN THE WORK</p></div><Disc3 className="h-6 w-6 animate-[spin_10s_linear_infinite] text-amber-200" aria-hidden="true" /></div></div></div></div>
        </div>
      </section>

      <section className="border-y border-amber-100/10 bg-[#100d09] px-4 py-14"><div className="mx-auto max-w-6xl"><div className="grid gap-8 md:grid-cols-3"><div><Check className="h-5 w-5 text-amber-200" aria-hidden="true" /><h2 className="mt-4 font-display text-3xl tracking-[0.1em] text-zinc-100">DIRECT</h2><p className="mt-3 text-sm leading-6 text-zinc-500">A direct purchase from MOSES, delivered through secure checkout.</p></div><div><Check className="h-5 w-5 text-amber-200" aria-hidden="true" /><h2 className="mt-4 font-display text-3xl tracking-[0.1em] text-zinc-100">COMPLETE</h2><p className="mt-3 text-sm leading-6 text-zinc-500">Twelve tracks, one complete work, available in full after purchase.</p></div><div><Check className="h-5 w-5 text-amber-200" aria-hidden="true" /><h2 className="mt-4 font-display text-3xl tracking-[0.1em] text-zinc-100">CONNECTED</h2><p className="mt-3 text-sm leading-6 text-zinc-500">Listen First creates a direct line for the rest of the archive and future transmissions.</p></div></div></div></section>
    </main>
  );
}
