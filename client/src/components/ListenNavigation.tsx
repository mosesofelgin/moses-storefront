import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

type ListenNavigationProps = {
  project: string;
  backHref: string;
  backLabel?: string;
  actionHref?: string;
  actionLabel?: string;
};

export default function ListenNavigation({
  project,
  backHref,
  backLabel = 'All projects',
  actionHref = '/artist',
  actionLabel = 'Artist / EPK',
}: ListenNavigationProps) {
  return (
    <nav aria-label={`${project} listening navigation`} className="mb-7 flex items-center justify-between gap-4 border-b border-zinc-800 pb-4 text-xs">
      <Link
        href={backHref}
        className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 py-2 text-zinc-400 transition hover:text-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        <span>{backLabel}</span>
      </Link>
      <div className="text-center">
        <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-amber-300">Now listening</p>
        <p className="mt-1 font-bebas tracking-[0.12em] text-zinc-200">{project}</p>
      </div>
      <Link
        href={actionHref}
        className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 py-2 text-zinc-400 transition hover:text-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
      >
        <span>{actionLabel}</span>
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </nav>
  );
}
