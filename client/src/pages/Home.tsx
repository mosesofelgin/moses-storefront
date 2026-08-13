import { useState } from 'react';
import { ArrowDown, ArrowRight, CheckCircle2, Disc3, ExternalLink, Loader2, Mail, Sparkles } from 'lucide-react';
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

export default function Home() {
  const flagship = PROJECTS[0];
  const archiveProjects = PROJECTS.slice(1);

  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <section className="relative isolate border-b border-amber-100/10 px-4 pb-16 pt-14 sm:pb-24 sm:pt-20 lg:min-h-[calc(100vh-4rem)] lg:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_83%_20%,rgba(184,134,11,0.18),transparent_26%),radial-gradient(circle_at_18%_83%,rgba(44,98,69,0.12),transparent_32%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.96fr_1.04fr] lg:gap-20">
          <div className="order-2 lg:order-1">
            <p className="text-[10px] uppercase tracking-[0.34em] text-amber-200">MOSES SOG · Chicago · Prophetic Hip-Hop</p>
            <h1 className="mt-6 max-w-4xl font-display text-[clamp(4.7rem,12vw,10.5rem)] leading-[0.76] tracking-[0.08em] text-zinc-50">MUSIC FOR THE WORK.</h1>
            <p className="mt-8 max-w-2xl font-serif text-3xl italic leading-[1.08] text-amber-50/85 sm:text-4xl">A living archive of faith, discipline, testimony, and transformation.</p>
            <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">MOSES builds prophetic hip-hop from Chicago—recording by recording, project by project. Start with the current transmission, then enter the wider vault.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/clarity-sales" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-300 px-7 font-display text-sm tracking-[0.16em] text-zinc-950 transition hover:bg-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">ENTER CLARITY <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <Link href="#archive" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-amber-100/20 px-7 font-display text-sm tracking-[0.16em] text-zinc-200 transition hover:border-amber-200/70 hover:text-amber-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">EXPLORE THE ARCHIVE <ArrowDown className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
            <div className="mt-11 grid max-w-xl grid-cols-3 gap-4 border-t border-amber-100/10 pt-5">
              {[['400+','Published songs'],['600+','Recordings'],['15+','Years active']].map(([value,label]) => <div key={label}><p className="font-display text-3xl tracking-[0.1em] text-amber-200">{value}</p><p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-zinc-600">{label}</p></div>)}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-xl">
              <div className="absolute -inset-8 rounded-[2.5rem] bg-amber-300/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[1.6rem] border border-amber-100/25 bg-zinc-900 p-2 shadow-[0_30px_100px_rgba(0,0,0,0.52)]">
                <img src={CLARITY_COVER} alt="CLARITY album cover" className="aspect-square w-full rounded-[1.2rem] object-cover" />
                <div className="absolute inset-x-8 bottom-8 flex items-end justify-between rounded-2xl border border-amber-100/15 bg-zinc-950/75 px-4 py-3 backdrop-blur-xl"><div><p className="text-[9px] uppercase tracking-[0.24em] text-amber-200">Current transmission</p><p className="mt-1 font-display text-2xl tracking-[0.14em] text-zinc-100">CLARITY / SEASON 1</p></div><Disc3 className="h-6 w-6 animate-[spin_10s_linear_infinite] text-amber-200" aria-hidden="true" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-amber-100/10 bg-[#100d09] px-4 py-5" aria-label="MOSES proof points"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-3 text-center text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:justify-between"><span className="text-amber-200">Independent by design</span><span>Chicago born & built</span><span>Music is the door</span><span>Dominion is the work</span><span>EPK ready</span></div></section>

      <section id="archive" className="px-4 py-20 sm:py-28" aria-labelledby="archive-title"><div className="mx-auto max-w-7xl"><div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] uppercase tracking-[0.3em] text-amber-200">The vault</p><h2 id="archive-title" className="mt-4 font-display text-6xl leading-[0.82] tracking-[0.1em] text-zinc-50 sm:text-8xl">CHOOSE YOUR DOORWAY.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400">Each project carries a different season of the work. The archive is not a pile of releases—it is a map.</p></div><Link href="/projects" className="inline-flex min-h-11 items-center gap-2 self-start rounded-xl border border-amber-100/20 px-5 py-3 text-[10px] uppercase tracking-[0.16em] text-amber-100 transition hover:border-amber-200/60 hover:bg-amber-100/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:self-auto">Open full archive <ExternalLink className="h-4 w-4" aria-hidden="true" /></Link></div><div className="grid gap-5 md:grid-cols-2"><ProjectVaultCard project={flagship} featured />{archiveProjects.map((project) => <ProjectVaultCard key={project.title} project={project} />)}</div></div></section>

      <section className="border-y border-amber-100/10 bg-[#100d09] px-4 py-20 sm:py-28" aria-labelledby="pathways-title"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end"><div><p className="text-[10px] uppercase tracking-[0.3em] text-amber-200">Beyond the music</p><h2 id="pathways-title" className="mt-4 font-display text-6xl leading-[0.84] tracking-[0.1em] text-zinc-50 sm:text-7xl">A WAY TO ENTER THE WORK.</h2><p className="mt-5 max-w-lg text-sm leading-7 text-zinc-400">For listeners, collaborators, churches, institutions, and the curious: there is a clear place to begin.</p></div><div className="grid gap-3 sm:grid-cols-3">{[["/artist",Sparkles,"Artist / EPK","Press, booking, proof, and the complete story."],["/links",ExternalLink,"Link tree","The cleanest doorway to every platform and video."],["/connect",Mail,"Connect","Booking, partnerships, and direct communication."]].map(([href,Icon,title,copy]) => <Link key={String(href)} href={String(href)} className="group rounded-2xl border border-amber-100/10 bg-zinc-950/70 p-5 transition hover:-translate-y-1 hover:border-amber-200/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"><Icon className="h-5 w-5 text-amber-200" aria-hidden="true" /><h3 className="mt-8 font-display text-3xl tracking-[0.1em] text-zinc-100">{String(title)}</h3><p className="mt-3 text-sm leading-6 text-zinc-500">{String(copy)}</p><ArrowRight className="mt-6 h-4 w-4 text-amber-200 transition group-hover:translate-x-1" aria-hidden="true" /></Link>)}</div></div></section>
      <CovenantCapture />
      <footer className="bg-zinc-950 px-4 py-10"><div className="mx-auto flex max-w-7xl flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left"><div><p className="font-display text-2xl tracking-[0.14em] text-zinc-100">MOSES SOG</p><p className="mt-1 text-xs text-zinc-600">Owned music. Direct access. Chicago, IL.</p></div><div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.14em] text-zinc-500"><Link href="/projects" className="inline-flex min-h-11 items-center px-2 hover:text-amber-200">Archive</Link><Link href="/artist" className="inline-flex min-h-11 items-center px-2 hover:text-amber-200">Artist</Link><Link href="/links" className="inline-flex min-h-11 items-center px-2 hover:text-amber-200">Links</Link><Link href="/connect" className="inline-flex min-h-11 items-center px-2 hover:text-amber-200">Connect</Link></div></div></footer>
    </main>
  );
}
