import { AlertTriangle, RefreshCw } from 'lucide-react';

interface AudioErrorNoticeProps {
  onRetry: () => void;
  tone?: 'amber' | 'purple' | 'indigo' | 'green';
}

export default function AudioErrorNotice({ onRetry, tone = 'amber' }: AudioErrorNoticeProps) {
  const tones = {
    amber: 'border-amber-500/30 bg-amber-950/30 text-amber-100',
    purple: 'border-purple-500/30 bg-purple-950/30 text-purple-100',
    indigo: 'border-indigo-500/30 bg-indigo-950/30 text-indigo-100',
    green: 'border-emerald-500/30 bg-emerald-950/30 text-emerald-100',
  } as const;

  return (
    <div role="alert" className={`mt-4 flex items-center justify-between gap-4 rounded-xl border px-4 py-3 text-sm ${tones[tone]}`}>
      <div className="flex min-w-0 items-center gap-3">
        <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>That track could not load. Check your connection and try again.</span>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md border border-current/30 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-current"
      >
        <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
        Retry
      </button>
    </div>
  );
}
