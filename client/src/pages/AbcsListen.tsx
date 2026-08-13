import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'wouter';
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  ArrowLeft, Music, ChevronDown, ChevronUp,
} from 'lucide-react';
import { ABCS_COVER, ABCS_META, ABCS_TRACKS, type AbcsTrack } from '@/data/abcs-bundle';
import ListenNavigation from '@/components/ListenNavigation';
import DownloadButton from '@/components/DownloadButton';

function formatTime(secs: number): string {
  if (!isFinite(secs) || secs < 0) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function AbcsListen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showTracklist, setShowTracklist] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack: AbcsTrack = ABCS_TRACKS[currentIndex];

  // ── Audio event handlers ──────────────────────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration);
    const onEnded = () => {
      if (currentIndex < ABCS_TRACKS.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
    };
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('durationchange', onDurationChange);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('durationchange', onDurationChange);
      audio.removeEventListener('ended', onEnded);
    };
  }, [currentIndex]);

  // ── Auto-play on track change ─────────────────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = currentTrack.url;
    audio.load();
    setCurrentTime(0);
    setDuration(0);
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // ── Volume / mute ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (!audio.src || audio.src === window.location.href) {
        audio.src = currentTrack.url;
        audio.load();
      }
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [isPlaying, currentTrack.url]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = parseFloat(e.target.value);
    setCurrentTime(t);
    if (audioRef.current) audioRef.current.currentTime = t;
  };

  const handlePrev = () => {
    if (currentTime > 3 && audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    } else {
      setCurrentIndex(prev => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => setCurrentIndex(prev => Math.min(ABCS_TRACKS.length - 1, prev + 1));

  const handleTrackClick = (index: number) => {
    if (index === currentIndex) {
      togglePlay();
    } else {
      setCurrentIndex(index);
      setIsPlaying(true);
    }
  };


  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <audio ref={audioRef} preload="metadata" />

      <div className="mx-auto max-w-5xl px-4 pt-4">
        <ListenNavigation project="BACK TO BASICS: ABCs" backHref="/abcs" backLabel="Project" actionHref="/store" actionLabel="Store" />
      </div>

      {/* ── PLAYER ── */}
      <section className="px-4 py-10 md:py-16" style={{ background: 'linear-gradient(to bottom, rgba(120,60,10,0.12), transparent 60%)' }}>
        <div className="mx-auto max-w-3xl">

          {/* Now playing header */}
          <div className="mb-8 flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:gap-8">
            <div className="mb-6 sm:mb-0 shrink-0">
              <div className="relative h-40 w-40 overflow-hidden rounded-xl border border-amber-900/30 shadow-xl shadow-amber-950/30">
                <img src={ABCS_COVER} alt="ABCs cover" className="h-full w-full object-cover" />
                {isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="flex gap-1 items-end h-6">
                      {[1,2,3,4].map(i => (
                        <div
                          key={i}
                          className="w-1 rounded-full bg-amber-400"
                          style={{ height: `${40 + i * 15}%`, animation: `bounce ${0.6 + i * 0.1}s ease-in-out infinite alternate` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="mb-1 font-mono text-xs uppercase tracking-widest text-amber-600">
                Now Playing · {currentIndex + 1} of {ABCS_TRACKS.length}
              </p>
              <h2 className="mb-1 font-bebas text-4xl tracking-wider text-zinc-100 leading-tight truncate">
                {currentTrack.title}
              </h2>
              <p className="mb-4 font-mono text-sm text-zinc-500">{currentTrack.description}</p>

              {/* Progress bar */}
              <div className="mb-2">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full cursor-pointer accent-amber-500"
                  style={{ height: '4px' }}
                />
              </div>
              <div className="flex justify-between font-mono text-xs text-zinc-600">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mb-6 flex items-center justify-center gap-6">
            <button
              onClick={handlePrev}
              className="rounded-full p-2 text-zinc-400 transition-colors hover:text-zinc-100"
              aria-label="Previous track"
            >
              <SkipBack className="h-6 w-6" />
            </button>
            <button
              onClick={togglePlay}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-600 text-white shadow-lg shadow-amber-900/40 transition-all hover:bg-amber-500 hover:scale-105 active:scale-95"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
            </button>
            <button
              onClick={handleNext}
              className="rounded-full p-2 text-zinc-400 transition-colors hover:text-zinc-100"
              aria-label="Next track"
            >
              <SkipForward className="h-6 w-6" />
            </button>
          </div>

          {/* Volume + Download All */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(m => !m)}
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={e => { setVolume(parseFloat(e.target.value)); setIsMuted(false); }}
                className="w-24 cursor-pointer accent-amber-500"
              />
            </div>
              <DownloadButton
                endpoint={ABCS_META.downloadEndpoint}
                filename={ABCS_META.zipFilename}
                label="Download Full Project"
                variant="primary"
                size="md"
                className="rounded-lg bg-amber-500 font-mono text-xs font-bold uppercase tracking-widest text-black hover:bg-amber-400"
              />
          </div>
        </div>
      </section>

      {/* ── TRACKLIST ── */}
      <section className="border-t border-zinc-800 px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={() => setShowTracklist(v => !v)}
            className="mb-6 flex w-full items-center justify-between font-bebas text-2xl tracking-wider text-zinc-300 hover:text-zinc-100 transition-colors"
          >
            <span>Tracklist ({ABCS_TRACKS.length})</span>
            {showTracklist ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>

          {showTracklist && (
            <div className="space-y-1">
              {ABCS_TRACKS.map((track, i) => {
                const isActive = i === currentIndex;
                return (
                  <div
                    key={track.id}
                    className={`group flex items-center gap-3 rounded-lg px-3 py-3 transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-amber-900/20 border border-amber-800/40'
                        : 'hover:bg-zinc-900/60'
                    }`}
                    onClick={() => handleTrackClick(i)}
                  >
                    {/* Track number / play indicator */}
                    <div className="w-7 text-center shrink-0">
                      {isActive && isPlaying ? (
                        <div className="flex justify-center gap-0.5 items-end h-4">
                          {[1,2,3].map(j => (
                            <div
                              key={j}
                              className="w-0.5 rounded-full bg-amber-500"
                              style={{ height: `${50 + j * 20}%`, animation: `bounce ${0.5 + j * 0.1}s ease-in-out infinite alternate` }}
                            />
                          ))}
                        </div>
                      ) : (
                        <span className={`font-mono text-xs ${isActive ? 'text-amber-500' : 'text-zinc-600 group-hover:text-amber-600'}`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      )}
                    </div>

                    <Music className={`h-3.5 w-3.5 shrink-0 ${isActive ? 'text-amber-600' : 'text-zinc-700 group-hover:text-amber-700'}`} />

                    <div className="flex-1 min-w-0">
                      <p className={`truncate text-sm font-medium ${isActive ? 'text-amber-300' : 'text-zinc-300 group-hover:text-zinc-100'}`}>
                        {track.title}
                      </p>
                      <p className="truncate font-mono text-xs text-zinc-600">{track.description}</p>
                    </div>

                    <span className="font-mono text-xs text-zinc-600 shrink-0">{track.duration}</span>

                    {/* Individual download */}
                      <div onClick={(event) => event.stopPropagation()}>
                        <DownloadButton
                          href={track.url}
                          filename={track.filename}
                          variant="outline"
                          size="sm"
                          iconOnly
                          className="border-transparent bg-transparent p-2 text-zinc-600 hover:border-amber-900/50 hover:bg-zinc-800 hover:text-amber-400"
                        />
                      </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER NAV ── */}
      <footer className="border-t border-zinc-800 px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap justify-center gap-6 font-mono text-xs uppercase tracking-widest text-zinc-600">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <Link href="/abcs" className="hover:text-amber-500 transition-colors">ABCs</Link>
            <Link href="/bathsheba/listen" className="hover:text-zinc-300 transition-colors">Bathsheba</Link>
            <Link href="/new-genesis/listen" className="hover:text-zinc-300 transition-colors">New Genesis</Link>
            <Link href="/mixtape/listen" className="hover:text-zinc-300 transition-colors">Mixtape</Link>
            <Link href="/listen" className="hover:text-zinc-300 transition-colors">CLARITY</Link>
            <Link href="/store" className="hover:text-zinc-300 transition-colors">Store</Link>
          </div>
          <p className="mt-8 text-center font-mono text-xs text-zinc-700">
            © {new Date().getFullYear()} MOSES SOG — Moses Enterprises
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes bounce {
          from { transform: scaleY(0.6); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
