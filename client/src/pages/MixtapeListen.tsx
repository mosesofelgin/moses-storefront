import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'wouter';
import {
  Play, Pause, SkipBack, SkipForward,
  Volume2, VolumeX, Download
} from 'lucide-react';
import { MIXTAPE_COVER, MIXTAPE_TRACKS, MIXTAPE_META, type MixtapeTrack } from '../data/mixtape-bundle';

export default function MixtapeListen() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const tracklistRef = useRef<HTMLDivElement>(null);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isDownloadingFull, setIsDownloadingFull] = useState(false);
  const [downloadingTrackId, setDownloadingTrackId] = useState<number | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const currentTrack = MIXTAPE_TRACKS[currentTrackIndex];

  // Play/pause sync
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(err => console.error('Play error:', err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Reload when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    setCurrentTime(0);
    setDuration(0);
    if (isPlaying) {
      audio.play().catch(err => console.error('Play error:', err));
    }
  }, [currentTrackIndex]);

  // Audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (currentTrackIndex < MIXTAPE_TRACKS.length - 1) {
        setCurrentTrackIndex(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('durationchange', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('durationchange', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex]);

  // Volume sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handlePlayPause = useCallback(() => {
    setHasStarted(true);
    setIsPlaying(prev => !prev);
  }, []);

  const handlePrevious = useCallback(() => {
    if (currentTime > 3 && audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    } else if (currentTrackIndex > 0) {
      setCurrentTrackIndex(prev => prev - 1);
    }
  }, [currentTrackIndex, currentTime]);

  const handleNext = useCallback(() => {
    if (currentTrackIndex < MIXTAPE_TRACKS.length - 1) {
      setCurrentTrackIndex(prev => prev + 1);
    }
  }, [currentTrackIndex]);

  const handleTrackClick = useCallback((index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setHasStarted(true);
  }, []);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) audioRef.current.currentTime = newTime;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    setIsMuted(v === 0);
  };

  const toggleMute = () => setIsMuted(prev => !prev);

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleDownloadFull = async () => {
    setIsDownloadingFull(true);
    try {
      const response = await fetch(MIXTAPE_META.downloadEndpoint);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = MIXTAPE_META.zipFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setIsDownloadingFull(false);
    }
  };

  const handleDownloadTrack = async (track: MixtapeTrack, e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloadingTrackId(track.id);
    try {
      const response = await fetch(track.url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = track.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (err) {
      console.error('Track download failed:', err);
    } finally {
      setDownloadingTrackId(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'DM Mono', monospace" }}>
      <audio
        ref={audioRef}
        src={currentTrack.url}
        crossOrigin="anonymous"
        preload="metadata"
      />

      {/* ── STICKY MINI PLAYER ─────────────────────────────────── */}
      {hasStarted && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-amber-900/50 bg-black/95 backdrop-blur-md px-4 py-3">
          <div className="mx-auto max-w-5xl flex items-center gap-3 sm:gap-4">
            <img
              src={MIXTAPE_COVER}
              alt="If I Wrote A Mixtape"
              className="h-10 w-10 rounded object-cover flex-shrink-0 border border-amber-800/50"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{currentTrack.title}</p>
              <p className="text-xs text-amber-500">{formatTime(currentTime)} / {formatTime(duration)}</p>
            </div>
            <div className="hidden sm:block flex-1 max-w-xs">
              <div className="h-1 bg-amber-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-600 rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={handlePrevious} disabled={currentTrackIndex === 0} className="p-1.5 text-amber-400 hover:text-white disabled:opacity-30 transition-colors">
                <SkipBack className="h-4 w-4" />
              </button>
              <button
                onClick={handlePlayPause}
                className="p-2 rounded-full bg-amber-700 hover:bg-amber-600 transition-colors"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
              </button>
              <button onClick={handleNext} disabled={currentTrackIndex === MIXTAPE_TRACKS.length - 1} className="p-1.5 text-amber-400 hover:text-white disabled:opacity-30 transition-colors">
                <SkipForward className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-amber-900/30 bg-black/80 backdrop-blur-md px-4 py-4">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <Link href="/mixtape" className="text-amber-500 hover:text-amber-300 transition-colors font-mono text-xs uppercase tracking-widest">
            ← Mixtape
          </Link>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-amber-600">
            Listening Experience
          </span>
          <Link href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors font-mono text-xs uppercase tracking-widest">
            Home
          </Link>
        </div>
      </header>

      {/* ── HERO PLAYER ────────────────────────────────────────── */}
      <section className="relative px-4 pt-12 pb-16 sm:pt-20 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-900/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl">
          {/* Cover + track info */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start mb-8">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-amber-700/20 blur-xl rounded-lg" />
              <img
                src={MIXTAPE_COVER}
                alt="If I Wrote A Mixtape"
                className="relative h-40 w-40 sm:h-48 sm:w-48 rounded-lg object-cover shadow-2xl"
              />
            </div>
            <div className="text-center sm:text-left flex-1">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-600 mb-1">
                Now Playing
              </p>
              <h1 className="font-bebas text-3xl sm:text-4xl tracking-wide text-amber-200 mb-1">
                {currentTrack.title}
              </h1>
              <p className="text-sm text-stone-400 mb-1">{currentTrack.description}</p>
              <p className="font-mono text-xs text-stone-600">
                Track {currentTrack.id} of {MIXTAPE_TRACKS.length}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={currentTime}
              onChange={handleProgressChange}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #d97706 ${progressPercent}%, #292524 ${progressPercent}%)`
              }}
            />
            <div className="flex justify-between mt-1">
              <span className="font-mono text-xs text-stone-500">{formatTime(currentTime)}</span>
              <span className="font-mono text-xs text-stone-500">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6">
            <button
              onClick={handlePrevious}
              disabled={currentTrackIndex === 0}
              className="p-2 text-amber-400 hover:text-white disabled:opacity-30 transition-colors"
            >
              <SkipBack className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <button
              onClick={handlePlayPause}
              className="p-4 rounded-full bg-amber-700 hover:bg-amber-600 active:bg-amber-800 transition-colors shadow-lg"
            >
              {isPlaying
                ? <Pause className="h-6 w-6 sm:h-7 sm:w-7" />
                : <Play className="h-6 w-6 sm:h-7 sm:w-7 ml-0.5" />
              }
            </button>
            <button
              onClick={handleNext}
              disabled={currentTrackIndex === MIXTAPE_TRACKS.length - 1}
              className="p-2 text-amber-400 hover:text-white disabled:opacity-30 transition-colors"
            >
              <SkipForward className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3 justify-center mb-8">
            <button onClick={toggleMute} className="text-stone-500 hover:text-amber-400 transition-colors">
              {isMuted || volume === 0
                ? <VolumeX className="h-4 w-4" />
                : <Volume2 className="h-4 w-4" />
              }
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #d97706 ${(isMuted ? 0 : volume) * 100}%, #292524 ${(isMuted ? 0 : volume) * 100}%)`
              }}
            />
          </div>

          {/* Download full project */}
          <div className="flex justify-center">
            <button
              onClick={handleDownloadFull}
              disabled={isDownloadingFull}
              className="flex items-center gap-2 rounded-lg border border-amber-700 px-6 py-3 font-bebas text-base tracking-wide text-amber-200 transition-colors hover:border-amber-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-4 w-4" />
              {isDownloadingFull ? 'Downloading...' : 'Download Full Project'}
            </button>
          </div>
        </div>
      </section>

      {/* ── TRACKLIST ──────────────────────────────────────────── */}
      <section ref={tracklistRef} className="px-4 pb-28 sm:pb-32">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between mb-6 border-t border-amber-900/20 pt-8">
            <h2 className="font-bebas text-xl tracking-wide text-amber-300">
              All {MIXTAPE_TRACKS.length} Tracks
            </h2>
            <span className="font-mono text-xs text-stone-600 uppercase tracking-widest">
              {MIXTAPE_META.totalDuration}
            </span>
          </div>

          <div className="space-y-0.5">
            {MIXTAPE_TRACKS.map((track, index) => {
              const isActive = index === currentTrackIndex;
              return (
                <div
                  key={track.id}
                  onClick={() => handleTrackClick(index)}
                  className={`flex items-center gap-3 rounded px-3 py-2.5 cursor-pointer transition-colors group ${
                    isActive
                      ? 'bg-amber-900/30 border border-amber-800/40'
                      : 'hover:bg-amber-900/10'
                  }`}
                >
                  {/* Track number / playing indicator */}
                  <div className="w-6 flex-shrink-0 text-right">
                    {isActive && isPlaying ? (
                      <span className="inline-flex gap-0.5 items-end h-3">
                        <span className="w-0.5 bg-amber-500 animate-pulse" style={{ height: '60%' }} />
                        <span className="w-0.5 bg-amber-500 animate-pulse" style={{ height: '100%', animationDelay: '0.15s' }} />
                        <span className="w-0.5 bg-amber-500 animate-pulse" style={{ height: '40%', animationDelay: '0.3s' }} />
                      </span>
                    ) : (
                      <span className={`font-mono text-xs ${isActive ? 'text-amber-400' : 'text-stone-600'}`}>
                        {track.id.toString().padStart(2, '0')}
                      </span>
                    )}
                  </div>

                  {/* Title + description */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm truncate transition-colors ${isActive ? 'text-amber-200 font-semibold' : 'text-stone-300 group-hover:text-amber-200'}`}>
                      {track.title}
                    </p>
                    <p className="text-xs text-stone-600 truncate hidden sm:block">
                      {track.description}
                    </p>
                  </div>

                  {/* Duration */}
                  <span className="font-mono text-xs text-stone-600 flex-shrink-0">
                    {track.duration}
                  </span>

                  {/* Download button */}
                  <button
                    onClick={(e) => handleDownloadTrack(track, e)}
                    disabled={downloadingTrackId === track.id}
                    className="flex-shrink-0 p-1.5 text-stone-600 hover:text-amber-400 disabled:opacity-30 transition-colors opacity-0 group-hover:opacity-100"
                    title={`Download ${track.title}`}
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
