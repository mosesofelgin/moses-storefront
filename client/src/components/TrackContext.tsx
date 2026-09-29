import type { ClarityWebsiteTrack } from '@/data/clarity-website-edition';

interface TrackContextProps {
  track: ClarityWebsiteTrack | null;
}

const albumMessage = 'Press play on any track to step into CLARITY — a story of confusion, surrender, discipline, and purpose.';

export default function TrackContext({ track }: TrackContextProps) {
  return (
    <div className="mb-6 rounded-xl border border-emerald-900/45 bg-zinc-900/80 p-5">
      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-emerald-300/70">Track Context</p>
      {track ? <><div className="flex flex-wrap items-center gap-2"><h2 className="text-xl font-semibold text-emerald-50 sm:text-2xl">{String(track.id).padStart(2, '0')}. {track.title}</h2>{track.isWebsiteExclusive && <span className="rounded border border-amber-300/35 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.14em] text-amber-200">Website Exclusive</span>}</div><p className="mt-2 text-sm leading-relaxed text-zinc-200">{track.description}</p></> : <><h2 className="text-xl font-semibold text-emerald-50">CLARITY — WEBSITE EDITION</h2><p className="mt-2 text-sm leading-relaxed text-zinc-300">{albumMessage}</p></>}
    </div>
  );
}
