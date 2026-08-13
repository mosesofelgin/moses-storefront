import { useState } from 'react';
import { ArrowRight, Disc3, Download, Play, ShoppingBag, Sparkles } from 'lucide-react';
import { Link } from 'wouter';
import DownloadButton from '@/components/DownloadButton';
import type { Project } from '@/data/project-catalog';

const accents = {
  amber: { badge: 'border-amber-300/35 text-amber-200', glow: 'from-amber-300/16', action: 'bg-amber-300 text-zinc-950 hover:bg-amber-200' },
  violet: { badge: 'border-violet-300/35 text-violet-200', glow: 'from-violet-300/16', action: 'bg-violet-300 text-zinc-950 hover:bg-violet-200' },
  red: { badge: 'border-red-300/35 text-red-200', glow: 'from-red-300/16', action: 'bg-red-300 text-zinc-950 hover:bg-red-200' },
  orange: { badge: 'border-orange-300/35 text-orange-200', glow: 'from-orange-300/16', action: 'bg-orange-300 text-zinc-950 hover:bg-orange-200' },
  indigo: { badge: 'border-indigo-300/35 text-indigo-200', glow: 'from-indigo-300/16', action: 'bg-indigo-300 text-zinc-950 hover:bg-indigo-200' },
  gold: { badge: 'border-yellow-300/35 text-yellow-200', glow: 'from-yellow-300/16', action: 'bg-yellow-300 text-zinc-950 hover:bg-yellow-200' },
} as const;

export function ProjectArtwork({ project, priority = false }: { project: Project; priority?: boolean }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex aspect-square items-center justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(184,134,11,0.16),transparent_42%),linear-gradient(145deg,#1a1713,#090909)] p-8 text-center">
        <div>
          <Disc3 className="mx-auto h-8 w-8 text-amber-200/70" aria-hidden="true" />
          <p className="mt-4 font-display text-2xl tracking-[0.14em] text-zinc-100">{project.title}</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-zinc-500">Artwork unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={project.cover}
      alt={project.alt}
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setFailed(true)}
      className="aspect-square h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
    />
  );
}

export default function ProjectVaultCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const accent = accents[project.accent];
  const isPaid = project.download === null;

  return (
    <article className={`group overflow-hidden rounded-2xl border border-amber-100/10 bg-zinc-950/80 transition duration-300 hover:-translate-y-1 hover:border-amber-200/45 hover:shadow-[0_20px_70px_rgba(0,0,0,0.36)] ${featured ? 'md:col-span-2 md:grid md:grid-cols-[minmax(0,1.03fr)_minmax(0,0.97fr)]' : ''}`}>
      <Link href={project.route} className="block overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-inset">
        <div className={`relative overflow-hidden ${featured ? 'aspect-square md:h-full md:min-h-[390px] md:aspect-auto' : 'aspect-square'}`}>
          <ProjectArtwork project={project} priority={featured} />
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent.glow} via-transparent to-zinc-950/50`} />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent px-5 pb-5 pt-20">
            <span className={`inline-flex rounded-full border bg-zinc-950/75 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] backdrop-blur ${accent.badge}`}>{project.eyebrow}</span>
          </div>
          {featured && <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-zinc-950/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-amber-200 backdrop-blur"><Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Current transmission</span>}
        </div>
      </Link>

      <div className="flex flex-col justify-between p-5 sm:p-6">
        <div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.16em] text-zinc-500">
            <span>{project.tracks}</span><span aria-hidden="true">/</span><span>{project.duration}</span><span aria-hidden="true">/</span><span className={isPaid ? 'text-amber-200' : 'text-emerald-200'}>{project.access}</span>
          </div>
          <Link href={project.route} className="mt-3 flex min-h-11 items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">
            <h2 className={`${featured ? 'text-5xl sm:text-6xl' : 'text-3xl'} font-display leading-[0.9] tracking-[0.09em] text-zinc-100`}>{project.title}</h2>
          </Link>
          <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400">{project.descriptor}</p>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Link href={isPaid ? '/checkout' : project.listenRoute} className={`inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 font-display text-sm tracking-[0.14em] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${accent.action}`}>
            {isPaid ? 'Buy CLARITY' : 'Listen / Download'}
            {isPaid ? <ShoppingBag className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4 fill-current" aria-hidden="true" />}
          </Link>
          {project.download ? (
            <DownloadButton endpoint={project.download.endpoint} filename={project.download.filename} label="ZIP" variant="outline" size="md" className="min-h-12 rounded-xl border-zinc-700 px-4 text-zinc-200 hover:border-amber-200 hover:bg-zinc-900" />
          ) : (
            <Link href={project.listenRoute} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-amber-200/25 px-4 py-3 text-[10px] uppercase tracking-[0.16em] text-amber-100 transition hover:border-amber-200/60 hover:bg-amber-200/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">
              Listen first <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
