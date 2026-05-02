import { Link, useLocation } from 'wouter';
import { CLARITY_BUNDLE } from '@/data/clarity-bundle';
import { useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import TrackContext from '@/components/TrackContext';
import PersistentCTA from '@/components/PersistentCTA';

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

export default function Listen() {
  const tracks = useMemo(() => CLARITY_BUNDLE.getAllTracks(), []);
  const [playingTrackId, setPlayingTrackId] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasSeenTrackSevenModal, setHasSeenTrackSevenModal] = useState(false);
  const [isTrackSevenModalOpen, setIsTrackSevenModalOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [, navigate] = useLocation();
  const albumCover = CLARITY_BUNDLE.images.find((img) => img.title === 'CLARITY Album Cover');

  const activeTrackIndex = tracks.findIndex((track) => track.id === playingTrackId);
  const progressPercent = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  const playTrack = (trackId: number) => {
    const audio = audioRef.current;
    const track = tracks.find((item) => item.id === trackId);
    if (!audio || !track) return;

    if (audio.src !== track.url) {
      audio.src = track.url;
      setCurrentTime(0);
      setDuration(0);
    }

    void audio.play();
    setPlayingTrackId(trackId);
  };

  const handlePlayTrack = (trackId: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingTrackId === trackId) {
      audio.pause();
      setPlayingTrackId(null);
      return;
    }

    playTrack(trackId);
  };

  const handleSeek = (value: number) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const nextTime = (value / 100) * duration;
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handlePrevious = () => {
    if (activeTrackIndex <= 0) return;
    playTrack(tracks[activeTrackIndex - 1].id);
  };

  const handleNext = () => {
    if (activeTrackIndex < 0 || activeTrackIndex >= tracks.length - 1) return;
    playTrack(tracks[activeTrackIndex + 1].id);
  };

  const handleTrackEnd = () => {
    const endedTrackId = playingTrackId;

    if (endedTrackId === 7 && !hasSeenTrackSevenModal) {
      setHasSeenTrackSevenModal(true);
      setIsTrackSevenModalOpen(true);
    }

    if (activeTrackIndex >= 0 && activeTrackIndex < tracks.length - 1) {
      playTrack(tracks[activeTrackIndex + 1].id);
      return;
    }

    setPlayingTrackId(null);
    setCurrentTime(0);
  };

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-400">
            Clarity Season 1 · April 2026
          </p>
          <h1 className="text-4xl font-semibold">Listen</h1>
          <p className="mt-2 text-sm text-zinc-300">
            A focused listening space for the full CLARITY journey.
          </p>
        </header>

        {albumCover && (
          <div
            className={`mb-6 overflow-hidden rounded-2xl border bg-zinc-900 transition ${
              playingTrackId
                ? 'border-zinc-500 shadow-[0_0_40px_rgba(255,255,255,0.10)]'
                : 'border-zinc-800'
            }`}
          >
            <img
              src={albumCover.url}
              alt="CLARITY album cover"
              className={`h-auto w-full transition ${playingTrackId ? 'opacity-100' : 'opacity-95'}`}
            />
          </div>
        )}

        <TrackContext trackId={playingTrackId} />

        <section className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between text-xs text-zinc-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={progressPercent}
            onChange={(event) => handleSeek(Number(event.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-700 accent-white"
            aria-label="Seek playback position"
            disabled={!playingTrackId || duration <= 0}
          />
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={handlePrevious}
              disabled={activeTrackIndex <= 0}
              className="rounded-full border border-zinc-700 p-2 text-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous track"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => activeTrackIndex >= 0 && handlePlayTrack(tracks[activeTrackIndex].id)}
              disabled={activeTrackIndex < 0}
              className="rounded-full bg-white p-3 text-black disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={playingTrackId ? 'Pause current track' : 'Play current track'}
            >
              {playingTrackId ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            <button
              onClick={handleNext}
              disabled={activeTrackIndex < 0 || activeTrackIndex >= tracks.length - 1}
              className="rounded-full border border-zinc-700 p-2 text-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next track"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <section className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:p-5">
          <h2 className="mb-4 text-lg font-medium">All Tracks</h2>
          <div className="space-y-2">
            {tracks.map((track) => {
              const isPlaying = playingTrackId === track.id;
              return (
                <div
                  key={track.id}
                  className={`flex items-center gap-3 rounded-lg border p-3 ${
                    isPlaying
                      ? 'border-white/40 bg-zinc-800 text-white ring-1 ring-white/20'
                      : 'border-zinc-800 bg-zinc-900 text-zinc-200'
                  }`}
                >
                  <button
                    onClick={() => handlePlayTrack(track.id)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black"
                    aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                  <div className="min-w-0">
                    <p className={`truncate text-sm font-medium ${isPlaying ? 'text-white' : 'text-zinc-200'}`}>
                      {String(track.id).padStart(2, '0')}. {track.title}
                    </p>
                    <p className={`truncate text-xs ${isPlaying ? 'text-zinc-300' : 'text-zinc-400'}`}>
                      {track.experience?.meaning.hook}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <audio
            ref={audioRef}
            onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
            onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
            onEnded={handleTrackEnd}
            className="hidden"
          />
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

      {isTrackSevenModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 transition-opacity duration-300"
          onClick={() => setIsTrackSevenModalOpen(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-900 p-6 text-zinc-100 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="clarity-modal-title"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id="clarity-modal-title" className="text-2xl font-semibold">
                You're experiencing CLARITY
              </h2>
              <button
                onClick={() => setIsTrackSevenModalOpen(false)}
                className="rounded-md px-2 py-1 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <p className="mt-3 text-sm text-zinc-300">
              This is more than music. This is a journey of discipline, faith, and transformation.
            </p>
            <p className="mt-3 text-sm italic text-zinc-200">If this has spoken to you… go deeper.</p>

            <button
              onClick={() => navigate('/store')}
              className="mt-6 w-full rounded-lg bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-zinc-200"
            >
              Own the full album
            </button>

            <button
              onClick={() => setIsTrackSevenModalOpen(false)}
              className="mt-3 w-full text-center text-xs text-zinc-400 hover:text-zinc-200"
            >
              Continue listening
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
