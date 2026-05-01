import { Link } from 'wouter';
import { CLARITY_BUNDLE } from '@/data/clarity-bundle';
import { useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import TrackContext from '@/components/TrackContext';
import PersistentCTA from '@/components/PersistentCTA';

export default function Listen() {
  const [playingTrackId, setPlayingTrackId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const albumCover = CLARITY_BUNDLE.images.find((img) => img.title === 'CLARITY Album Cover');

  const handlePlayTrack = (trackId: number, url: string) => {
    if (!audioRef.current) return;

    if (playingTrackId === trackId) {
      audioRef.current.pause();
      setPlayingTrackId(null);
      return;
    }

    audioRef.current.src = url;
    void audioRef.current.play();
    setPlayingTrackId(trackId);
  };

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-400">Clarity Season 1 · April 2026</p>
          <h1 className="text-4xl font-semibold">Listen</h1>
          <p className="mt-2 text-sm text-zinc-300">A focused listening space for the full CLARITY journey.</p>
        </header>

        {albumCover && (
          <div className={`mb-6 overflow-hidden rounded-2xl border bg-zinc-900 transition ${playingTrackId ? 'border-zinc-500 shadow-[0_0_40px_rgba(255,255,255,0.10)]' : 'border-zinc-800'}`}><img src={albumCover.url} alt="CLARITY album cover" className={`h-auto w-full transition ${playingTrackId ? 'opacity-100' : 'opacity-95'}`} /></div>
        )}

        <TrackContext trackId={playingTrackId} />

        <section className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5">
          <h2 className="mb-4 text-lg font-medium">All Tracks</h2>
          <div className="space-y-2">
            {CLARITY_BUNDLE.getAllTracks().map((track) => {
              const isPlaying = playingTrackId === track.id;
              return (
                <div
                  key={track.id}
                  className={`flex items-center gap-3 rounded-lg border p-3 ${
                    isPlaying ? 'border-white/40 bg-zinc-800 text-white ring-1 ring-white/20' : 'border-zinc-800 bg-zinc-900 text-zinc-200'
                  }`}
                >
                  <button
                    onClick={() => handlePlayTrack(track.id, track.url)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black"
                    aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                  <div className="min-w-0">
                    <p className={`truncate text-sm font-medium ${isPlaying ? 'text-white' : 'text-zinc-200'}`}>
                      {String(track.id).padStart(2, '0')}. {track.title}
                    </p>
                    <p className={`truncate text-xs ${isPlaying ? 'text-zinc-300' : 'text-zinc-400'}`}>{track.experience?.meaning.hook}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <audio ref={audioRef} onEnded={() => setPlayingTrackId(null)} className="hidden" />
        </section>

        <p className="mb-4 text-center text-sm text-zinc-300">If this album spoke to you, go deeper.</p>
        <PersistentCTA />

        <div className="flex items-center justify-between text-sm">
          <Link href="/">
            <a className="text-zinc-300 hover:text-white">← Back to Home</a>
          </Link>
          <Link href="/store">
            <a className="text-zinc-300 hover:text-white">View Store →</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
