import { CLARITY_BUNDLE } from '@/data/clarity-bundle';

interface TrackContextProps {
  trackId: number | null;
}

export default function TrackContext({ trackId }: TrackContextProps) {
  if (!trackId) return null;

  const track = CLARITY_BUNDLE.getTrack(trackId);
  if (!track || !track.experience) return null;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-8">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="text-sm opacity-60 mb-2 tracking-widest uppercase">Now Playing</div>
          <h2 className="text-2xl font-light mb-3">
            {String(track.id).padStart(2, '0')}. {track.title}
          </h2>
          <p className="text-lg opacity-80 italic mb-3">
            "{track.experience.meaning.hook}"
          </p>
          <p className="text-sm opacity-70 leading-relaxed">
            {track.experience.meaning.description}
          </p>
        </div>
      </div>
    </div>
  );
}
