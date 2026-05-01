import { Link } from 'wouter';
import { CLARITY_BUNDLE } from '@/data/clarity-bundle';
import { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import AlbumArtDisplay from '@/components/AlbumArtDisplay';
import TrackContext from '@/components/TrackContext';
import PersistentCTA from '@/components/PersistentCTA';

export default function Listen() {
  const [playingTrackId, setPlayingTrackId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayTrack = (trackId: number, url: string) => {
    if (playingTrackId === trackId) {
      // Pause
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingTrackId(null);
    } else {
      // Play new track
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
      }
      setPlayingTrackId(trackId);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="text-sm opacity-70 mb-4 tracking-widest">
            Clarity Season 1: April 2026
          </div>
          <h1 className="text-4xl font-light mb-2">Listen</h1>
          <p className="opacity-70">Experience the full album. Support the artist.</p>
        </div>

        {/* Album Art Display */}
        <AlbumArtDisplay isPlaying={playingTrackId !== null} />

        {/* Track Context (Now Playing) */}
        <TrackContext trackId={playingTrackId} />

        {/* Track Preview Section */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8 border border-zinc-800">
          <h2 className="text-xl font-light mb-6">All Tracks</h2>
          <div className="space-y-3">
            {CLARITY_BUNDLE.getAllTracks().map((track) => (
              <div
                key={track.id}
                className={`flex items-center justify-between p-3 rounded transition ${
                  playingTrackId === track.id
                    ? 'bg-green-500 bg-opacity-20 border border-green-500'
                    : 'bg-zinc-800 border border-transparent hover:bg-zinc-700'
                }`}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <button
                    onClick={() => handlePlayTrack(track.id, track.url)}
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 text-black flex items-center justify-center hover:bg-green-600 transition"
                  >
                    {playingTrackId === track.id ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </button>
                  <div className="min-w-0">
                    <p className="font-medium truncate">
                      {String(track.id).padStart(2, '0')}. {track.title}
                    </p>
                    {track.experience && (
                      <p className="text-xs opacity-60 truncate">
                        {track.experience.meaning.hook}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Hidden audio player */}
          <audio
            ref={audioRef}
            onEnded={() => setPlayingTrackId(null)}
            className="hidden"
          />
        </div>

        {/* Persistent CTA */}
        <PersistentCTA isPlaying={playingTrackId !== null} />

        {/* Navigation */}
        <div className="flex justify-between items-center text-sm">
          <Link href="/">
            <a className="text-blue-400 hover:underline">← Back to Home</a>
          </Link>
          <Link href="/store">
            <a className="text-blue-400 hover:underline">View Store →</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
