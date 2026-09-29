import { useState } from 'react';
import { ArrowRight, ExternalLink, Loader2, Mail, Music2, ShoppingBag } from 'lucide-react';
import { Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { CLARITY_WEBSITE_EDITION } from '@/data/clarity-website-edition';
import { NEW_GENESIS_COVER, NEW_GENESIS_META } from '@/data/new-genesis-bundle';

const CLARITY_LINKS = [
  { label: 'Spotify Pre-Save', href: 'https://distrokid.com/hyperfollow/mosesofelgin/clarity-2' },
  { label: 'Bandcamp', href: 'https://mosessog.bandcamp.com/album/clarity-2' },
  { label: 'SoundCloud', href: 'https://soundcloud.com/mosessog/sets/clarity-1?si=16f0f5af5c5041be915be8599d18afe7&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing' },
  { label: 'YouTube', href: 'https://www.youtube.com/playlist?list=PLTt1W4MaPgT3799Kyqr9oAV62pPsOAxS0' },
];

const NEW_GENESIS_LINKS = [
  { label: 'Streaming', placeholder: '[NEW GENESIS DISTROKID/HYPERFOLLOW URL]' },
  { label: 'Bandcamp', href: 'https://mosessog.bandcamp.com/album/new-genesis-2' },
  { label: 'SoundCloud', href: 'https://soundcloud.com/mosessog/sets/new-genesis' },
  { label: 'YouTube', placeholder: '[NEW GENESIS YOUTUBE URL]' },
];

function PlatformLinks({ links }: { links: Array<{ label: string; href?: string; placeholder?: string }> }) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Album platforms">
      {links.map((link) => link.href ? (
        <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-zinc-300 transition hover:border-amber-200/60 hover:text-amber-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">
          {link.label} <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      ) : (
        <span key={link.label} className="inline-flex min-h-11 items-center rounded-lg border border-dashed border-amber-200/20 px-3 py-2 text-[10px] uppercase tracking-[0.1em] text-amber-100/65" title="Add this link when available">
          {link.label} {link.placeholder}
        </span>
      ))}
    </div>
  );
}

function AlbumCard({
  id,
  cover,
  eyebrow,
  title,
  hook,
  listenHref,
  listenLabel,
  buyHref,
  buyLabel,
  albumHref,
  links,
  note,
  tone,
}: {
  id: string;
  cover: string;
  eyebrow: string;
  title: string;
  hook: string;
  listenHref: string;
  listenLabel: string;
  buyHref: string;
  buyLabel: string;
  albumHref: string;
  links: Array<{ label: string; href?: string; placeholder?: string }>;
  note?: React.ReactNode;
  tone: 'emerald' | 'indigo';
}) {
  const accent = tone === 'emerald' ? 'border-emerald-400/25 bg-emerald-950/25' : 'border-indigo-400/25 bg-indigo-950/25';
  const eyebrowColor = tone === 'emerald' ? 'text-emerald-200' : 'text-indigo-200';
  const listenColor = tone === 'emerald' ? 'bg-emerald-700 hover:bg-emerald-600' : 'bg-indigo-700 hover:bg-indigo-600';
  return (
    <article id={id} className={`overflow-hidden rounded-2xl border ${accent} bg-black/25`}>
      <img src={cover} alt={`${title} album cover`} className="aspect-square w-full object-cover" />
      <div className="space-y-6 p-5 sm:p-7">
        <div>
          <p className={`text-[10px] uppercase tracking-[0.24em] ${eyebrowColor}`}>{eyebrow}</p>
          <h2 className="mt-3 font-display text-5xl tracking-[0.08em] text-zinc-50 sm:text-6xl">{title}</h2>
          <p className="mt-3 max-w-xl font-serif text-2xl italic leading-snug text-amber-50/80">{hook}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <Link href={listenHref} className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 py-3 font-display text-sm tracking-[0.12em] text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${listenColor}`}>{listenLabel} <Music2 className="h-4 w-4" aria-hidden="true" /></Link>
          <Link href={buyHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-amber-300/55 px-4 py-3 font-display text-sm tracking-[0.12em] text-amber-100 transition hover:border-amber-200 hover:bg-amber-200/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">{buyLabel} <ShoppingBag className="h-4 w-4" aria-hidden="true" /></Link>
          <Link href={albumHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 font-display text-sm tracking-[0.12em] text-zinc-200 transition hover:border-white/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">Album Page <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
        <div className="border-t border-white/10 pt-5"><p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-zinc-500">Hear it elsewhere</p><PlatformLinks links={links} />{note && <p className="mt-4 text-xs leading-6 text-amber-100/70">{note}</p>}</div>
      </div>
    </article>
  );
}

function StayConnected() {
  const [email, setEmail] = useState('');
  const [complete, setComplete] = useState(false);
  const subscribe = trpc.subscribe.addEmail.useMutation();
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    try {
      await subscribe.mutateAsync({ email: email.trim() });
      setComplete(true);
      toast.success('Welcome to the covenant.');
    } catch {
      toast.error('Your email could not be saved. Please try again.');
    }
  };
  return <section className="mt-8 rounded-2xl border border-amber-200/15 bg-[#100d09] p-5 sm:p-7" aria-labelledby="stay-connected"><div className="flex items-center gap-3"><Mail className="h-5 w-5 text-amber-200" aria-hidden="true" /><div><p className="text-[10px] uppercase tracking-[0.24em] text-amber-200">Stay connected</p><h2 id="stay-connected" className="mt-1 font-display text-3xl tracking-[0.1em] text-zinc-50">THE NEXT TRANSMISSION</h2></div></div>{complete ? <p className="mt-5 text-sm text-amber-100">You&apos;re in. The next transmission will meet you in your inbox.</p> : <form onSubmit={submit} className="mt-5 flex flex-col gap-3 sm:flex-row"><label className="sr-only" htmlFor="music-email">Email address</label><input id="music-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="your@email.com" className="min-h-12 flex-1 rounded-xl border border-amber-100/15 bg-zinc-950 px-4 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-amber-200 focus:ring-2 focus:ring-amber-200/20" /><button type="submit" disabled={subscribe.isPending} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-300 px-6 font-display text-sm tracking-[0.14em] text-zinc-950 transition hover:bg-amber-200 disabled:opacity-60">{subscribe.isPending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : 'JOIN THE COVENANT'}</button></form>}<div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-zinc-500"><a href="https://instagram.com/moses_sog" target="_blank" rel="noopener noreferrer" className="hover:text-amber-100">Instagram</a><a href="https://tiktok.com/@mosessog" target="_blank" rel="noopener noreferrer" className="hover:text-amber-100">TikTok</a><a href="https://youtube.com/@MosesSOG" target="_blank" rel="noopener noreferrer" className="hover:text-amber-100">YouTube Channel</a></div></section>;
}

export default function Music() {
  return <main className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_85%_8%,rgba(184,134,11,0.16),transparent_24%),#090909] px-4 py-5 text-zinc-100 sm:py-8"><header className="mx-auto flex max-w-5xl items-center justify-between border-b border-white/10 pb-4"><Link href="/" className="text-xs uppercase tracking-[0.16em] text-zinc-400 transition hover:text-amber-200">← Home</Link><span className="text-xs uppercase tracking-[0.3em] text-amber-200">Moses</span><Link href="/store" className="text-xs uppercase tracking-[0.16em] text-zinc-400 transition hover:text-amber-200">Store</Link></header><div className="mx-auto max-w-5xl"><section className="py-16 text-center sm:py-20"><p className="text-[10px] uppercase tracking-[0.34em] text-amber-200">MOSES SOG · STUDIO ALBUMS</p><h1 className="mt-5 font-display text-7xl leading-[0.8] tracking-[0.1em] text-zinc-50 sm:text-9xl">THE WORK</h1><p className="mx-auto mt-7 max-w-xl font-serif text-2xl italic leading-snug text-amber-50/80 sm:text-3xl">Two albums. One journey of faith, discipline, and transformation.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><a href="#clarity" className="inline-flex min-h-12 items-center rounded-xl bg-emerald-700 px-6 py-3 font-display text-sm tracking-[0.14em] text-white transition hover:bg-emerald-600">CLARITY</a><a href="#new-genesis" className="inline-flex min-h-12 items-center rounded-xl border border-indigo-400/50 px-6 py-3 font-display text-sm tracking-[0.14em] text-indigo-100 transition hover:border-indigo-200">NEW GENESIS</a></div></section><div className="space-y-6"><AlbumCard id="clarity" cover={CLARITY_WEBSITE_EDITION.cover} eyebrow="New album · 2026" title="CLARITY" hook="Faith, discipline, and transformation in thirteen movements." listenHref="/listen" listenLabel="Listen Free" buyHref="/checkout?product=clarity" buyLabel="Own It — $12" albumHref="/clarity-sales" links={CLARITY_LINKS} note={<>Website Edition includes the exclusive <em>Wish I Had You</em>.</>} tone="emerald" /><AlbumCard id="new-genesis" cover={NEW_GENESIS_COVER} eyebrow="Debut album · 2023" title="New Genesis" hook="A beginning, recorded. Seven years in the making at Mount Pisgah Baptist Church." listenHref={NEW_GENESIS_META.listenPath} listenLabel="Listen Now" buyHref="/checkout?product=new-genesis" buyLabel="Own It — $10" albumHref={NEW_GENESIS_META.landingPath} links={NEW_GENESIS_LINKS} tone="indigo" /></div><StayConnected /><footer className="py-10 text-center text-xs text-zinc-600">© 2026 MOSES SOG. All rights reserved.</footer></div></main>;
}
