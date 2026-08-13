import { ArrowRight, ExternalLink, Play, ShoppingBag, Youtube } from 'lucide-react';
import { Link } from 'wouter';

const PORTRAIT = '/manus-storage/TOP_05_8692d459.jpg';

const videos = [
  { title: 'Rainbow PUSH Coalition Keynote', label: 'The Stage', youtubeId: 'D94a9DKh1es' },
  { title: 'Church', label: 'The Beginning', youtubeId: 'CC3lHW_usho' },
  { title: 'Final Prayer', label: 'The Message', youtubeId: 'xn0KdOotyTI' },
];

const socials = [
  ['Instagram', '@moses_sog', 'https://instagram.com/moses_sog'],
  ['YouTube', '@MosesSOG', 'https://youtube.com/@MosesSOG'],
  ['TikTok', '@mosessog', 'https://tiktok.com/@mosessog'],
  ['Twitch', '@mosessog', 'https://twitch.tv/mosessog'],
  ['Twitter / X', 'sogmoses', 'https://twitter.com/sogmoses'],
];

export default function Links() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_50%_0%,rgba(184,134,11,0.14),transparent_22%),#090909] px-4 py-10 text-zinc-100 sm:py-14">
      <div className="mx-auto max-w-md">
        <header className="text-center"><div className="mx-auto h-24 w-24 overflow-hidden rounded-full border border-amber-200/50 bg-zinc-900 p-1 shadow-[0_18px_55px_rgba(0,0,0,0.4)]"><img src={PORTRAIT} alt="MOSES SOG" className="h-full w-full rounded-full object-cover object-top" /></div><p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-amber-200">Chicago · Prophetic Hip-Hop</p><h1 className="mt-3 font-display text-5xl tracking-[0.15em] text-zinc-50">MOSES SOG</h1><p className="mt-3 font-serif text-2xl italic text-amber-50/75">Music. Projects. The work.</p></header>

        <section className="mt-10 space-y-3" aria-label="Primary destinations"><a href="https://mosessog.com" className="group block rounded-2xl border border-amber-200/55 bg-amber-300 px-5 py-5 text-zinc-950 transition hover:bg-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"><div className="flex items-center gap-4"><div className="flex-1"><p className="text-[9px] uppercase tracking-[0.22em] text-zinc-950/65">The Vault</p><h2 className="mt-1 font-display text-3xl tracking-[0.13em]">MOSESSOG.COM</h2><p className="mt-2 text-xs text-zinc-950/70">Music, projects, artist page, and the full catalog.</p></div><ExternalLink className="h-5 w-5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></div></a>
          <div className="grid gap-3 sm:grid-cols-2"><Link href="/clarity-sales" className="group rounded-2xl border border-amber-100/20 bg-zinc-950/80 p-5 transition hover:border-amber-200/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"><ShoppingBag className="h-5 w-5 text-amber-200" aria-hidden="true" /><p className="mt-6 text-[9px] uppercase tracking-[0.2em] text-zinc-500">New album</p><h2 className="mt-2 font-display text-2xl tracking-[0.12em] text-zinc-100">BUY CLARITY</h2><p className="mt-2 text-xs text-zinc-500">Direct digital purchase</p><ArrowRight className="mt-5 h-4 w-4 text-amber-200 transition group-hover:translate-x-1" aria-hidden="true" /></Link><Link href="/listen" className="group rounded-2xl border border-amber-100/12 bg-zinc-950/80 p-5 transition hover:border-amber-200/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"><Play className="h-5 w-5 fill-current text-amber-200" aria-hidden="true" /><p className="mt-6 text-[9px] uppercase tracking-[0.2em] text-zinc-500">Listen first</p><h2 className="mt-2 font-display text-2xl tracking-[0.12em] text-zinc-100">UNLOCK CLARITY</h2><p className="mt-2 text-xs text-zinc-500">Email unlocks full playback</p><ArrowRight className="mt-5 h-4 w-4 text-amber-200 transition group-hover:translate-x-1" aria-hidden="true" /></Link></div>
        </section>

        <section className="mt-10" aria-labelledby="links-videos"><div className="flex items-center gap-3"><div className="h-px flex-1 bg-amber-100/10" /><h2 id="links-videos" className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">Watch</h2><div className="h-px flex-1 bg-amber-100/10" /></div><div className="mt-4 space-y-3">{videos.map((video) => <a key={video.youtubeId} href={`https://www.youtube.com/watch?v=${video.youtubeId}`} target="_blank" rel="noopener noreferrer" className="group flex overflow-hidden rounded-2xl border border-amber-100/10 bg-zinc-950/80 transition hover:border-amber-200/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"><div className="relative w-28 shrink-0 overflow-hidden"><img src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`} alt={`${video.title} video thumbnail`} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-105" /><div className="absolute inset-0 flex items-center justify-center bg-black/35"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-300 text-zinc-950"><Play className="ml-0.5 h-3.5 w-3.5 fill-current" aria-hidden="true" /></span></div></div><div className="flex min-w-0 flex-1 items-center justify-between gap-3 px-4 py-4"><div><p className="text-[9px] uppercase tracking-[0.18em] text-amber-200">{video.label}</p><h3 className="mt-1 font-display text-xl tracking-[0.1em] text-zinc-100">{video.title}</h3></div><Youtube className="h-4 w-4 shrink-0 text-zinc-600 transition group-hover:text-amber-200" aria-hidden="true" /></div></a>)}</div></section>
        <section className="mt-10" aria-labelledby="links-social"><div className="flex items-center gap-3"><div className="h-px flex-1 bg-amber-100/10" /><h2 id="links-social" className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">Follow</h2><div className="h-px flex-1 bg-amber-100/10" /></div><div className="mt-4 grid gap-2">{socials.map(([name,handle,href]) => <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="group flex min-h-12 items-center justify-between rounded-xl border border-amber-100/10 bg-zinc-950/80 px-4 transition hover:border-amber-200/45 hover:bg-amber-200/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"><span className="font-display text-xl tracking-[0.1em] text-zinc-100">{name}</span><span className="text-xs text-zinc-500 transition group-hover:text-amber-100">{handle}</span></a>)}</div></section>
        <p className="mt-10 text-center text-[10px] uppercase tracking-[0.22em] text-zinc-600">MOSES SOG · Chicago</p>
      </div>
    </main>
  );
}
