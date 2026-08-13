import { ArrowLeft, ArrowRight, LibraryBig } from 'lucide-react';
import { Link } from 'wouter';
import ProjectVaultCard from '@/components/ProjectVaultCard';
import { PROJECTS } from '@/data/project-catalog';

export default function Projects() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="border-b border-amber-100/10 bg-[radial-gradient(circle_at_78%_0%,rgba(184,134,11,0.13),transparent_30%),linear-gradient(145deg,#110e0a,#090909)] px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between gap-4 border-b border-amber-100/10 pb-5">
            <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-zinc-400 transition hover:text-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Home</Link>
            <p className="font-display text-lg tracking-[0.18em] text-amber-200">THE ARCHIVE</p>
            <Link href="/artist" className="inline-flex min-h-11 items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-zinc-400 transition hover:text-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">Artist / EPK <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="mt-14 grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div><LibraryBig className="h-7 w-7 text-amber-200" aria-hidden="true" /><p className="mt-7 text-[10px] uppercase tracking-[0.3em] text-amber-200">400+ songs · 600+ recordings · Chicago</p><h1 className="mt-5 font-display text-7xl leading-[0.78] tracking-[0.09em] text-zinc-50 sm:text-9xl">THE MOSES ARCHIVE</h1></div>
            <div><p className="font-serif text-3xl italic leading-tight text-amber-50/85 sm:text-4xl">A living catalog of faith, discipline, memory, and becoming.</p><p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400">Start with the current transmission, then move through the releases that built the foundation. This is an independent catalog designed to be explored at your own pace.</p></div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-24" aria-labelledby="archive-grid-title">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] uppercase tracking-[0.26em] text-zinc-500">All projects</p><h2 id="archive-grid-title" className="mt-3 font-display text-5xl tracking-[0.1em] text-zinc-50 sm:text-6xl">CHOOSE YOUR DOORWAY.</h2></div><Link href="/links" className="inline-flex min-h-11 items-center gap-2 self-start rounded-xl border border-amber-100/20 px-5 py-3 text-[10px] uppercase tracking-[0.16em] text-amber-100 transition hover:border-amber-200/60 hover:bg-amber-100/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:self-auto">Open link tree <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
          <div className="grid gap-5 md:grid-cols-2">{PROJECTS.map((project, index) => <ProjectVaultCard key={project.title} project={project} featured={index === 0} />)}</div>
        </div>
      </section>

      <footer className="border-t border-amber-100/10 px-4 py-8 text-center text-[10px] uppercase tracking-[0.18em] text-zinc-600">MOSES SOG · Prophetic Hip-Hop from Chicago</footer>
    </main>
  );
}
