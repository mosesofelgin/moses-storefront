import { Link } from 'wouter';
import { CLARITY_BUNDLE } from '@/data/clarity-bundle';
import { useState } from 'react';
import { Play, Pause } from 'lucide-react';

export default function Listen() {
  const [playingTrackId, setPlayingTrackId] = useState<number | null>(null);

  const handleBuyClick = () => {
    // Navigate to store for purchase
    window.location.href = '/store';
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="text-sm opacity-70 mb-4 tracking-widest">
            Clarity Season 1: April 2026
          </div>
          <h1 className="text-4xl font-light mb-2">Clarity</h1>
          <p className="opacity-70">12-track digital album</p>
        </div>

        {/* Track Preview Section */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-light mb-6">Track Preview</h2>
          <div className="space-y-3">
            {CLARITY_BUNDLE.tracks.map((track) => (
              <div
                key={track.id}
                className="flex items-center justify-between p-3 bg-zinc-800 rounded hover:bg-zinc-700 transition"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <button
                    onClick={() =>
                      setPlayingTrackId(playingTrackId === track.id ? null : track.id)
                    }
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Purchase CTA */}
        <div className="mb-8">
          <button
            onClick={handleBuyClick}
            className="w-full py-3 px-6 bg-green-500 text-black font-medium rounded hover:bg-green-600 transition transform hover:-translate-y-0.5"
          >
            Buy Full Album ($12)
          </button>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center text-sm">
          <Link href="/">
            <a className="text-blue-400 hover:underline">← Back to Home</a>
          </Link>
          <Link href="/store">
            <a className="text-blue-400 hover:underline">View All Products →</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
