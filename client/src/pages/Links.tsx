import {
  ArrowDownToLine,
  ArrowRight,
  BookOpen,
  ExternalLink,
  Headphones,
  Play,
  ShoppingBag,
  Sparkles,
  Video,
  Youtube,
} from 'lucide-react';
import { Link } from 'wouter';

const PORTRAIT = '/manus-storage/TOP_05_8692d459.jpg';
const CLARITY_COVER = '/manus-storage/ChatGPTImageSep28,2026,07_34_57PM_14c05d91.png';

const releaseCards = [
  {
    eyebrow: 'New release · video + music',
    title: 'INSTANTLY: THE PROCESS',
    description: 'The songs, sessions, and clips from the notebook to the mic.',
    route: '/instantly',
    action: 'Enter the process',
    icon: Sparkles,
    tone: 'border-amber-200/35 bg-amber-200/[0.08]',
  },
  {
    eyebrow: 'Free visual + MP3',
    title: 'CHURCH',
    description: 'Watch the visual, then take the audio with a name-your-price contribution.',
    route: '/church',
    action: 'Watch + get the MP3',
    icon: Video,
    tone: 'border-zinc-100/15 bg-zinc-950/85',
  },
  {
    eyebrow: 'Free archive download',
    title: 'DEDICATION',
    description: 'Seventeen tracks from the MOSES archive, available to enter and download.',
    route: '/dedication',
    action: 'Open the archive',
    icon: ArrowDownToLine,
    tone: 'border-zinc-100/15 bg-zinc-950/85',
  },
];

const videos = [
  { title: 'FINAL PRAYER', label: 'Featured visual', youtubeId: 'xn0KdOotyTI' },
  { title: 'Church', label: 'Watch the release', youtubeId: 'CC3lHW_usho' },
  { title: 'Rainbow PUSH Coalition Keynote', label: 'On the stage', youtubeId: 'D94a9DKh1es' },
];

const socials = [
  ['Instagram', '@moses_sog', 'https://instagram.com/moses_sog'],
  ['YouTube', '@MosesSOG', 'https://youtube.com/@MosesSOG'],
  ['TikTok', '@mosessog', 'https://tiktok.com/@mosessog'],
  ['Twitch', '@mosessog', 'https://twitch.tv/mosessog'],
  ['Twitter / X', 'sogmoses', 'https://twitter.com/sogmoses'],
];

function ActionLink({
  href,
  children,
  variant = 'dark',
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'gold' | 'dark' | 'outline';
}) {
  const styles = {
    gold: 'bg-amber-300 text-zinc-950 hover:bg-amber-200',
    dark: 'bg-zinc-950 text-zinc-100 hover:bg-zinc-900',
    outline: 'border border-amber-100/20 bg-transparent text-zinc-100 hover:border-amber-200/60 hover:bg-amber-200/[0.06]',
  };

  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] transition active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}

export default function Links() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_50%_0%,rgba(184,134,11,0.18),transparent_24%),linear-gradient(180deg,#11100f_0%,#090909_52%,#11100f_100%)] px-4 py-7 text-zinc-100 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <header className="text-center">
          <div className="mx-auto h-20 w-20 overflow-hidden rounded-full border border-amber-200/60 bg-zinc-900 p-1 shadow-[0_18px_55px_rgba(0,0,0,0.45)] sm:h-24 sm:w-24">
            <img src={PORTRAIT} alt="MOSES SOG" className="h-full w-full rounded-full object-cover object-top" />
          </div>
          <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-amber-200">Chicago · Prophetic Hip-Hop</p>
          <h1 className="mt-3 font-display text-5xl tracking-[0.15em] text-zinc-50 sm:text-6xl">MOSES SOG</h1>
          <p className="mx-auto mt-3 max-w-md font-serif text-2xl italic text-amber-50/75">The music, the visuals, and the work in one place.</p>
        </header>

        <section className="mt-9 overflow-hidden rounded-[1.7rem] border border-amber-200/35 bg-[#1a1713] shadow-[0_24px_80px_rgba(0,0,0,0.34)]" aria-labelledby="featured-release">
          <div className="grid md:grid-cols-[0.88fr_1.12fr]">
            <div className="relative min-h-[280px] overflow-hidden md:min-h-full">
              <img src={CLARITY_COVER} alt="CLARITY album cover" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
              <div className="absolute bottom-5 left-5 rounded-full border border-white/25 bg-black/35 px-3 py-2 text-[9px] uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">Featured release</div>
            </div>
            <div className="flex flex-col justify-between p-6 sm:p-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-amber-200">The current drop</p>
                <h2 id="featured-release" className="mt-3 font-display text-5xl leading-[0.9] tracking-[0.1em] text-zinc-50 sm:text-6xl">CLARITY</h2>
                <p className="mt-4 max-w-md text-sm leading-6 text-zinc-300">The 13-track Website Edition, including the exclusive <em className="font-serif text-lg text-amber-100">Wish I Had You</em>.</p>
              </div>
              <div className="mt-7 grid gap-2 sm:grid-cols-3">
                <ActionLink href="/listen" variant="gold"><Headphones className="h-4 w-4" aria-hidden="true" /> Listen</ActionLink>
                <ActionLink href="/clarity-sales" variant="dark"><ShoppingBag className="h-4 w-4" aria-hidden="true" /> Own it</ActionLink>
                <a href="https://www.youtube.com/watch?v=xn0KdOotyTI" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-amber-100/20 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-100 transition hover:border-amber-200/60 hover:bg-amber-200/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"><Play className="h-4 w-4 fill-current" aria-hidden="true" /> Watch</a>
              </div>
              <p className="mt-4 text-[10px] uppercase tracking-[0.16em] text-zinc-500">Hear it first. Watch the world around it. Own the full edition.</p>
            </div>
          </div>
        </section>

        <section className="mt-9" aria-labelledby="link-page-pathways">
          <div className="flex items-center gap-3"><div className="h-px flex-1 bg-amber-100/10" /><h2 id="link-page-pathways" className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">Enter the work</h2><div className="h-px flex-1 bg-amber-100/10" /></div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {releaseCards.map(({ eyebrow, title, description, route, action, icon: Icon, tone }) => (
              <Link key={route} href={route} className={`group flex min-h-[220px] flex-col rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:border-amber-200/60 ${tone} focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200`}>
                <Icon className="h-5 w-5 text-amber-200" aria-hidden="true" />
                <p className="mt-6 text-[9px] uppercase tracking-[0.2em] text-amber-200">{eyebrow}</p>
                <h3 className="mt-2 font-display text-2xl leading-none tracking-[0.1em] text-zinc-100">{title}</h3>
                <p className="mt-3 flex-1 text-xs leading-5 text-zinc-400">{description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-zinc-200">{action}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-9 rounded-2xl border border-amber-100/10 bg-zinc-950/75 p-5 sm:p-6" aria-labelledby="explore-more">
          <div className="flex items-start justify-between gap-4"><div><p className="text-[9px] uppercase tracking-[0.22em] text-amber-200">Keep exploring</p><h2 id="explore-more" className="mt-2 font-display text-3xl tracking-[0.12em] text-zinc-100">THE FULL MUSIC ARCHIVE</h2><p className="mt-2 max-w-xl text-xs leading-5 text-zinc-400">Projects, listening rooms, releases, and the deeper MOSES catalog.</p></div><Headphones className="h-5 w-5 shrink-0 text-amber-200" aria-hidden="true" /></div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2"><ActionLink href="/music" variant="outline">Open the music hub <ArrowRight className="h-4 w-4" aria-hidden="true" /></ActionLink><ActionLink href="/store" variant="outline">Visit the store <ShoppingBag className="h-4 w-4" aria-hidden="true" /></ActionLink></div>
        </section>

        <section className="mt-9" aria-labelledby="links-videos">
          <div className="flex items-center gap-3"><div className="h-px flex-1 bg-amber-100/10" /><h2 id="links-videos" className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">Watch</h2><div className="h-px flex-1 bg-amber-100/10" /></div>
          <div className="mt-4 space-y-3">{videos.map((video) => <a key={video.youtubeId} href={`https://www.youtube.com/watch?v=${video.youtubeId}`} target="_blank" rel="noopener noreferrer" className="group flex overflow-hidden rounded-2xl border border-amber-100/10 bg-zinc-950/80 transition hover:border-amber-200/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"><div className="relative w-28 shrink-0 overflow-hidden"><img src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`} alt={`${video.title} video thumbnail`} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-105" /><div className="absolute inset-0 flex items-center justify-center bg-black/35"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-300 text-zinc-950"><Play className="ml-0.5 h-3.5 w-3.5 fill-current" aria-hidden="true" /></span></div></div><div className="flex min-w-0 flex-1 items-center justify-between gap-3 px-4 py-4"><div><p className="text-[9px] uppercase tracking-[0.18em] text-amber-200">{video.label}</p><h3 className="mt-1 font-display text-xl tracking-[0.1em] text-zinc-100">{video.title}</h3></div><Youtube className="h-4 w-4 shrink-0 text-zinc-600 transition group-hover:text-amber-200" aria-hidden="true" /></div></a>)}</div>
        </section>

        <section className="mt-9 grid gap-3 sm:grid-cols-2" aria-label="More MOSES destinations">
          <Link href="/airisks" className="group rounded-2xl border border-[#e7d7a6] bg-[#f6f3ea] p-5 text-zinc-950 transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"><BookOpen className="h-5 w-5 text-[#1c3faa]" aria-hidden="true" /><p className="mt-5 text-[9px] uppercase tracking-[0.2em] text-[#1c3faa]">Free guide</p><h2 className="mt-2 font-display text-2xl tracking-[0.12em]">AI WITHOUT THE FEAR</h2><p className="mt-2 text-xs text-zinc-600">A plain-language guide to the real risks of artificial intelligence.</p><ArrowRight className="mt-5 h-4 w-4 text-[#1c3faa] transition group-hover:translate-x-1" aria-hidden="true" /></Link>
          <a href="https://www.youtube.com/@MosesSOG/" target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-amber-200/20 bg-amber-300/[0.08] p-5 transition hover:border-amber-200/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"><Youtube className="h-5 w-5 text-amber-200" aria-hidden="true" /><p className="mt-5 text-[9px] uppercase tracking-[0.2em] text-amber-200">Official channel</p><h2 className="mt-2 font-display text-2xl tracking-[0.12em] text-zinc-100">MOSES ON YOUTUBE</h2><p className="mt-2 text-xs text-zinc-400">Music, visuals, interviews, and the process.</p><ArrowRight className="mt-5 h-4 w-4 text-amber-200 transition group-hover:translate-x-1" aria-hidden="true" /></a>
        </section>

        <section className="mt-10" aria-labelledby="links-social"><div className="flex items-center gap-3"><div className="h-px flex-1 bg-amber-100/10" /><h2 id="links-social" className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">Follow</h2><div className="h-px flex-1 bg-amber-100/10" /></div><div className="mt-4 grid gap-2">{socials.map(([name, handle, href]) => <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="group flex min-h-12 items-center justify-between rounded-xl border border-amber-100/10 bg-zinc-950/80 px-4 transition hover:border-amber-200/45 hover:bg-amber-200/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"><span className="font-display text-xl tracking-[0.1em] text-zinc-100">{name}</span><span className="text-xs text-zinc-400 transition group-hover:text-amber-100">{handle}</span></a>)}</div></section>

        <footer className="mt-10 flex flex-col items-center gap-3 text-center"><a href="https://mosessog.com" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-amber-200 transition hover:text-amber-100"><ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /> Return to the Vault</a><p className="text-[10px] uppercase tracking-[0.22em] text-zinc-600">MOSES SOG · Chicago</p></footer>
      </div>
    </main>
  );
}
