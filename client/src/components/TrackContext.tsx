import { CLARITY_BUNDLE } from '@/data/clarity-bundle';

interface TrackContextProps {
  trackId: number | null;
}

const albumMessage = 'Press play on any track to step into CLARITY — a story of faith, discipline, and transformation.';

export default function TrackContext({ trackId }: TrackContextProps) {
  const track = trackId ? CLARITY_BUNDLE.getTrack(trackId) : null;

  return (
    <div className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900/80 p-5">
      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-zinc-400">Track Context</p>
      {track ? (
        <>
          <h2 className="text-xl font-semibold text-zinc-100 sm:text-2xl">
            {String(track.id).padStart(2, '0')}. {track.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-200">{track.experience?.meaning.hook}</p>
          <p className="mt-2 text-xs leading-relaxed text-zinc-400">{track.experience?.meaning.pull}</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-zinc-100">CLARITY</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">{albumMessage}</p>
        </>
      )}
    </div>
  );
}
