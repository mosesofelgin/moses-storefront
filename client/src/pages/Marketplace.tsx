import { useState } from 'react';
import { ArrowDown, ArrowRight, CheckCircle2, Disc3, ExternalLink, Loader2, Mail, Music2, ShoppingBag, Sparkles, Youtube } from 'lucide-react';
import { Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import ProjectVaultCard from '@/components/ProjectVaultCard';
import { CLARITY_COVER, PROJECTS } from '@/data/project-catalog';

function CovenantCapture() {
  const [email, setEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const subscribe = trpc.subscribe.addEmail.useMutation();

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setIsSaving(true);
    try {
      await subscribe.mutateAsync({ email: email.trim() });
      setIsComplete(true);
      toast.success('Welcome to the covenant.');
    } catch {
      toast.error('Your email could not be saved. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="relative overflow-hidden border-y border-amber-200/10 bg-[linear-gradient(135deg,#130f09,#0b0a09_48%,#16110a)] px-4 py-24 sm:py-32" aria-labelledby="covenant-title">
      <div className="pointer-events-none absolute left-[12%] top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-amber-300/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-[10%] h-64 w-64 rounded-full bg-emerald-400/5 blur-3xl" />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="text-[10px] uppercase tracking-[0.32em] text-amber-200">Direct from the vault</p>
        <h2 id="covenant-title" className="mt-5 font-display text-6xl leading-[0.86] tracking-[0.12em] text-zinc-50 sm:text-8xl">JOIN THE COVENANT</h2>
        <p className="mx-auto mt-6 max-w-xl font-serif text-2xl italic leading-relaxed text-amber-50/80 sm:text-3xl">New music, unreleased recordings, and messages from the work.</p>
        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-zinc-400">No noise. No rented audience. A direct line to the music and the mission.</p>
        {isComplete ? (
          <div className="mt-10" role="status"><CheckCircle2 className="mx-auto h-10 w-10 text-amber-200" aria-hidden="true" /><p className="mt-4 font-display text-2xl tracking-[0.16em] text-amber-100">YOU&apos;RE IN.</p><p className="mt-2 text-sm text-zinc-500">The next transmission will meet you in your inbox.</p></div>
        ) : (
          <form onSubmit={submit} className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="covenant-email">Email address</label>
            <input id="covenant-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="your@email.com" disabled={isSaving} className="min-h-12 flex-1 rounded-xl border border-amber-100/20 bg-zinc-950/60 px-5 text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-amber-200 focus:ring-2 focus:ring-amber-200/20 disabled:opacity-60" />
            <button type="submit" disabled={isSaving} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-300 px-7 font-display text-sm tracking-[0.16em] text-zinc-950 transition hover:bg-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-60">
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <>ENTER <ArrowRight className="h-4 w-4" aria-hidden="true" /></>}
            </button>
          </form>
        )}
        <p className="mt-6 text-[10px] uppercase tracking-[0.18em] text-zinc-600">Direct from MOSES · Unsubscribe anytime</p>
      </div>
    </section>
  );
}

function MarketplaceSpecials() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <article className="group overflow-hidden rounded-2xl border border-amber-200/15 bg-zinc-950/80 transition hover:-translate-y-1 hover:border-amber-200/45">
        <div className="relative aspect-[1.15] overflow-hidden bg-[radial-gradient(circle_at_70%_20%,rgba(242,173,56,0.42),transparent_28%),linear-gradient(145deg,#160c0b,#7c2a1d_58%,#100807)] p-6 sm:p-8">
          <div className="absolute inset-5 border border-amber-100/20" />
          <div className="relative flex h-full flex-col justify-between"><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-100">Visual release · 2026</p><div><p className="font-display text-6xl leading-[0.8] tracking-[0.05em] text-amber-50 sm:text-8xl">CHURCH</p><p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-200">Watch + name your price</p></div><div className="flex justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-amber-100/70"><span>MOSES SOG</span><span>DIRECT RELEASE</span></div></div>
        </div>
        <div className="p-5 sm:p-6"><p className="text-[10px] uppercase tracking-[0.2em] text-amber-200">A direct visual transmission</p><h3 className="mt-3 font-display text-4xl tracking-[0.08em] text-zinc-100">CHURCH</h3><p className="mt-3 text-sm leading-7 text-zinc-400">Watch the visual, then take the full song with a name-your-price contribution.</p><Link href="/church" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-amber-300 px-4 py-3 font-display text-sm tracking-[0.14em] text-zinc-950 transition hover:bg-amber-200">WATCH + DOWNLOAD <ArrowRight className="h-4 w-4" /></Link></div>
      </article>
      <article className="group overflow-hidden rounded-2xl border border-orange-200/15 bg-zinc-950/80 transition hover:-translate-y-1 hover:border-orange-200/45">
        <div className="relative aspect-[1.15] overflow-hidden bg-[radial-gradient(circle_at_70%_20%,rgba(194,73,31,0.5),transparent_30%),linear-gradient(145deg,#120807,#542017_58%,#080606)] p-6 sm:p-8"><div className="absolute inset-5 border border-orange-100/20" /><div className="relative flex h-full flex-col justify-between"><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-orange-100">Full video project · 2026</p><div><p className="font-display text-5xl leading-[0.8] tracking-[0.05em] text-orange-50 sm:text-7xl">INSTANTLY</p><p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-orange-200">The Process</p></div><div className="flex justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-orange-100/70"><span>10 SONGS</span><span>10 VIDEO POSTS</span></div></div></div>
        <div className="p-5 sm:p-6"><p className="text-[10px] uppercase tracking-[0.2em] text-orange-200">Music + process archive</p><h3 className="mt-3 font-display text-4xl tracking-[0.08em] text-zinc-100">INSTANTLY</h3><p className="mt-3 text-sm leading-7 text-zinc-400">Enter the Instagram-style feed for the songs, music clips, and session footage.</p><Link href="/instantly" className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-orange-200/35 px-4 py-3 font-display text-sm tracking-[0.14em] text-orange-100 transition hover:border-orange-200 hover:bg-orange-200/10">ENTER THE FEED <ArrowRight className="h-4 w-4" /></Link></div>
      </article>
    </div>
  );
}

export default function Home() {
  const flagship = PROJECTS[0];
  const archiveProjects = PROJECTS.slice(1);

  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <section id="marketplace" className="relative isolate border-b border-amber-100/10 px-4 pb-16 pt-8 sm:pb-24 sm:pt-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_84%_18%,rgba(184,134,11,0.18),transparent_25%),radial-gradient(circle_at_14%_72%,rgba(44,98,69,0.1),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl">
          <header className="flex flex-col gap-5 border-b border-amber-100/15 pb-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-200">MOSES SOG · Direct marketplace</p><h1 className="mt-4 font-display text-6xl leading-[0.8] tracking-[0.1em] text-zinc-50 sm:text-8xl">THE WORK<br /><em className="not-italic text-amber-200">IS AVAILABLE.</em></h1></div><div className="sm:text-right"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">Digital releases · visual transmissions · archive recordings</p><div className="mt-4 flex flex-wrap gap-2 sm:justify-end"><a href="#marketplace-grid" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-amber-100/20 px-4 text-[10px] uppercase tracking-[0.16em] text-amber-100 hover:border-amber-200/60">Shop releases <ArrowDown className="h-3 w-3" /></a><Link href="/connect" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-[10px] uppercase tracking-[0.16em] text-zinc-300 hover:border-white/40">Contact <Mail className="h-3 w-3" /></Link></div></div></header>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
            <article className="group relative overflow-hidden rounded-2xl border border-amber-200/30 bg-zinc-900/80"><div className="grid md:grid-cols-[0.95fr_1.05fr]"><Link href={flagship.route} className="relative block min-h-[330px] overflow-hidden md:min-h-[470px]"><img src={CLARITY_COVER} alt="CLARITY album cover" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" /><div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" /><span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-zinc-950/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-amber-200 backdrop-blur"><Sparkles className="h-3.5 w-3.5" /> Current transmission</span></Link><div className="flex flex-col justify-between p-6 sm:p-8"><div><p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-200">Flagship project · Website Edition</p><h2 className="mt-4 font-display text-6xl leading-[0.82] tracking-[0.08em] text-zinc-50 sm:text-8xl">CLARITY</h2><p className="mt-5 max-w-md font-serif text-2xl italic leading-snug text-amber-50/80">Faith, discipline, and transformation in thirteen movements.</p><p className="mt-5 text-sm leading-7 text-zinc-400">Listen free, own the direct edition, or find CLARITY across the platforms.</p></div><div className="mt-8 grid gap-3 sm:grid-cols-2"><Link href="/checkout?product=clarity" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-300 px-4 py-3 font-display text-sm tracking-[0.14em] text-zinc-950 hover:bg-amber-200">BUY CLARITY <ShoppingBag className="h-4 w-4" /></Link><Link href="/listen" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-amber-100/20 px-4 py-3 font-display text-sm tracking-[0.14em] text-amber-100 hover:border-amber-200/60">LISTEN FREE <Music2 className="h-4 w-4" /></Link></div></div></div></article>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1"><div className="rounded-2xl border border-amber-100/10 bg-[#100d09] p-6"><p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-200">Marketplace note</p><p className="mt-5 font-serif text-3xl italic leading-snug text-amber-50/85">Music is the door. Direct access is the model.</p><p className="mt-5 text-sm leading-7 text-zinc-500">No placeholder merchandise. Every offer below is a real MOSES release, listening room, visual, or verified download path.</p></div><div className="rounded-2xl border border-amber-100/10 bg-zinc-950/70 p-6"><div className="flex items-center justify-between"><p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">At a glance</p><Disc3 className="h-5 w-5 text-amber-200" /></div><div className="mt-6 grid grid-cols-2 gap-5"><div><p className="font-display text-4xl text-amber-200">06</p><p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-zinc-600">Projects</p></div><div><p className="font-display text-4xl text-amber-200">01</p><p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-zinc-600">Paid album</p></div><div><p className="font-display text-4xl text-amber-200">03</p><p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-zinc-600">Visual doors</p></div><div><p className="font-display text-4xl text-amber-200">∞</p><p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-zinc-600">Archive depth</p></div></div></div></div>
          </div>

          <div id="marketplace-grid" className="mt-14 scroll-mt-8"><div className="mb-7 flex flex-col gap-3 border-b border-amber-100/10 pb-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[0.28em] text-amber-200">Shop the catalog</p><h2 className="mt-3 font-display text-5xl tracking-[0.08em] text-zinc-50 sm:text-6xl">ALL RELEASES</h2></div><p className="max-w-sm text-xs leading-6 text-zinc-500 sm:text-right">Choose a project. Listen, own, or download directly from the source.</p></div><div className="grid gap-5 md:grid-cols-2"><ProjectVaultCard project={archiveProjects[0]} />{archiveProjects.slice(1).map((project) => <ProjectVaultCard key={project.title} project={project} />)}</div></div>
          <div className="mt-5"><MarketplaceSpecials /></div>
        </div>
      </section>

      <section className="border-b border-amber-100/10 bg-[#100d09] px-4 py-5" aria-label="MOSES proof points"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-3 text-center text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:justify-between"><span className="text-amber-200">Independent by design</span><span>Chicago born & built</span><span>Music is the door</span><span>Dominion is the work</span><span>EPK ready</span></div></section>

      <section className="border-y border-amber-100/10 bg-[#100d09] px-4 py-20 sm:py-28" aria-labelledby="pathways-title"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end"><div><p className="text-[10px] uppercase tracking-[0.3em] text-amber-200">Beyond the marketplace</p><h2 id="pathways-title" className="mt-4 font-display text-6xl leading-[0.84] tracking-[0.1em] text-zinc-50 sm:text-7xl">A WAY TO ENTER THE WORK.</h2><p className="mt-5 max-w-lg text-sm leading-7 text-zinc-400">For listeners, collaborators, churches, institutions, and the curious: there is a clear place to begin.</p></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{[["/music",Music2,"Music","Listen to or own both studio albums."],["/onmyown",Youtube,"THEPRINCE","Watch the visual and download the free MP3."],["/artist",Sparkles,"Artist / EPK","Press, booking, proof, and the complete story."],["/links",ExternalLink,"Link tree","The cleanest doorway to every platform and video."],["/connect",Mail,"Connect","Booking, partnerships, and direct communication."]].map(([href,Icon,title,copy]) => <Link key={String(href)} href={String(href)} className="group rounded-2xl border border-amber-100/10 bg-zinc-950/70 p-5 transition hover:-translate-y-1 hover:border-amber-200/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"><Icon className="h-5 w-5 text-amber-200" aria-hidden="true" /><h3 className="mt-8 font-display text-3xl tracking-[0.1em] text-zinc-100">{String(title)}</h3><p className="mt-3 text-sm leading-6 text-zinc-500">{String(copy)}</p><ArrowRight className="mt-6 h-4 w-4 text-amber-200 transition group-hover:translate-x-1" aria-hidden="true" /></Link>)}</div></div></section>
      <CovenantCapture />
      <footer className="bg-zinc-950 px-4 py-10"><div className="mx-auto flex max-w-7xl flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left"><div><p className="font-display text-2xl tracking-[0.14em] text-zinc-100">MOSES SOG</p><p className="mt-1 text-xs text-zinc-600">Owned music. Direct access. Chicago, IL.</p></div><div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.14em] text-zinc-500"><Link href="/music" className="inline-flex min-h-11 items-center px-2 hover:text-amber-200">Music</Link><Link href="/projects" className="inline-flex min-h-11 items-center px-2 hover:text-amber-200">Archive</Link><Link href="/artist" className="inline-flex min-h-11 items-center px-2 hover:text-amber-200">Artist</Link><Link href="/links" className="inline-flex min-h-11 items-center px-2 hover:text-amber-200">Links</Link><Link href="/connect" className="inline-flex min-h-11 items-center px-2 hover:text-amber-200">Connect</Link></div></div></footer>
    </main>
  );
}
