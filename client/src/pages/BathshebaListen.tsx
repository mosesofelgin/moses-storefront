import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'wouter';
import {
  Play, Pause, SkipBack, SkipForward,
  Volume2, VolumeX, Download, ArrowRight, ChevronDown
} from 'lucide-react';
import { bathshebaProject, bathshebaTrackList } from '../data/bathsheba-bundle';

// Short narrative context for each track — gives the listener a frame
const TRACK_CONTEXT: Record<number, { hook: string; pull: string }> = {
  1: { hook: "Where it begins.", pull: "An invitation into the world of BATHSHEBA. Let it find you." },
  2: { hook: "The pull of old habits.", pull: "Every king has his vices. This is the honest accounting." },
  3: { hook: "Aspiration made audible.", pull: "The man you're becoming is already in the music." },
  4: { hook: "A direct conversation.", pull: "No filters. No performance. Just the truth between two people." },
  5: { hook: "Belief under pressure.", pull: "Faith isn't passive. This track is the proof." },
  6: { hook: "Power and strategy.", pull: "The board is set. Every move is intentional." },
  7: { hook: "Depth and direction.", pull: "Naval — navigating by the stars when the map runs out." },
  8: { hook: "It's not about you.", pull: "The most freeing words you'll ever hear." },
  9: { hook: "A number with meaning.", pull: "12:12 — a moment of alignment. You'll feel it when it hits." },
  10: { hook: "The name. The crown.", pull: "This is where everything arrives. The final word." },
};

export default function BathshebaListen() {
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

  const currentTrack = bathshebaTrackList[currentTrackIndex];
  const context = TRACK_CONTEXT[currentTrack.number];

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

  // Reload audio when track changes, then play
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

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (currentTrackIndex < bathshebaTrackList.length - 1) {
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
    if (currentTrackIndex < bathshebaTrackList.length - 1) {
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
      const response = await fetch('/api/download/bathsheba');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'BATHSHEBA-Project.zip';
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

  const handleDownloadTrack = async (track: typeof bathshebaTrackList[0], e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloadingTrackId(track.id);
    try {
      const response = await fetch(track.url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${track.number.toString().padStart(2, '0')}-${track.title}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setDownloadingTrackId(null);
    }
  };

  const scrollToTracklist = () => {
    tracklistRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'DM Mono', monospace" }}>
      <audio
        ref={audioRef}
        src={currentTrack.url}
        crossOrigin="anonymous"
        preload="metadata"
      />

      {/* ── STICKY PLAYER BAR (appears after first play) ─────────── */}
      {hasStarted && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-purple-900/60 bg-black/95 backdrop-blur-md px-4 py-3">
          <div className="mx-auto max-w-5xl flex items-center gap-3 sm:gap-4">
            {/* Tiny cover */}
            <img
              src={bathshebaProject.coverArt}
              alt="BATHSHEBA"
              className="h-10 w-10 rounded object-cover flex-shrink-0 border border-purple-800/50"
            />
            {/* Track info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{currentTrack.title}</p>
              <p className="text-xs text-purple-400">{formatTime(currentTime)} / {formatTime(duration)}</p>
            </div>
            {/* Mini progress */}
            <div className="hidden sm:block flex-1 max-w-xs">
              <div className="h-1 bg-purple-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
            {/* Controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={handlePrevious} disabled={currentTrackIndex === 0} className="p-1.5 text-purple-300 hover:text-white disabled:opacity-30 transition-colors">
                <SkipBack className="h-4 w-4" />
              </button>
              <button
                onClick={handlePlayPause}
                className="p-2 rounded-full bg-purple-600 hover:bg-purple-500 transition-colors"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
              </button>
              <button onClick={handleNext} disabled={currentTrackIndex === bathshebaTrackList.length - 1} className="p-1.5 text-purple-300 hover:text-white disabled:opacity-30 transition-colors">
                <SkipForward className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── HEADER ───────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-purple-900/40 bg-black/80 backdrop-blur-md px-4 py-4">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <Link href="/bathsheba" className="text-purple-400 hover:text-purple-200 transition-colors font-mono text-xs uppercase tracking-widest">
            ← Bathsheba
          </Link>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-purple-500">
            Listening Experience
          </span>
          <Link href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors font-mono text-xs uppercase tracking-widest">
            Home
          </Link>
        </div>
      </header>

      {/* ── HERO PLAYER ──────────────────────────────────────────── */}
      <section className="relative px-4 pt-12 pb-16 sm:pt-20 sm:pb-24">
        {/* Purple ambient background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-purple-900/20 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-purple-800/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-16 lg:items-start">

            {/* ── LEFT: Album Art + Project Info ── */}
            <div className="lg:col-span-2 flex flex-col items-center lg:items-start">
              {/* Cover art with glow */}
              <div className="relative w-full max-w-[280px] sm:max-w-xs mb-6">
                <div className={`absolute inset-0 rounded-2xl blur-2xl transition-opacity duration-700 ${isPlaying ? 'opacity-60' : 'opacity-20'} bg-purple-500`} />
                <img
                  src={bathshebaProject.coverArt}
                  alt="BATHSHEBA"
                  className="relative w-full rounded-2xl object-cover shadow-2xl border border-purple-700/40"
                />
                {/* Playing indicator overlay */}
                {isPlaying && (
                  <div className="absolute bottom-3 right-3 flex gap-1 items-end">
                    <div className="w-1 bg-purple-300 rounded-full animate-[bounce_0.8s_ease-in-out_infinite]" style={{ height: '12px', animationDelay: '0ms' }} />
                    <div className="w-1 bg-purple-300 rounded-full animate-[bounce_0.8s_ease-in-out_infinite]" style={{ height: '18px', animationDelay: '150ms' }} />
                    <div className="w-1 bg-purple-300 rounded-full animate-[bounce_0.8s_ease-in-out_infinite]" style={{ height: '10px', animationDelay: '300ms' }} />
                    <div className="w-1 bg-purple-300 rounded-full animate-[bounce_0.8s_ease-in-out_infinite]" style={{ height: '16px', animationDelay: '100ms' }} />
                  </div>
                )}
              </div>

              {/* Project title */}
              <div className="text-center lg:text-left">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-purple-500 mb-2">
                  MOSES SOG · {bathshebaProject.releaseDate}
                </p>
                <h1 className="font-bebas text-5xl sm:text-6xl tracking-widest text-white mb-1">
                  BATHSHEBA
                </h1>
                <p className="font-cormorant text-lg italic text-purple-300 mb-6">
                  {bathshebaProject.subtitle}
                </p>
                <p className="text-xs text-zinc-500 leading-relaxed hidden lg:block">
                  {bathshebaTrackList.length} tracks · {bathshebaProject.totalDuration} · Free
                </p>
              </div>
            </div>

            {/* ── RIGHT: Player Controls + Track Context ── */}
            <div className="lg:col-span-3 flex flex-col">

              {/* Now Playing + Context */}
              <div className="mb-6 p-5 rounded-xl border border-purple-800/40 bg-purple-950/30">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-purple-500 mb-1">
                  {hasStarted ? 'Now Playing' : 'Ready to Play'}
                </p>
                <h2 className="font-bebas text-3xl sm:text-4xl text-white mb-1 tracking-wide">
                  {currentTrack.title}
                </h2>
                <p className="text-xs text-purple-400 mb-4">
                  Track {currentTrack.number} of {bathshebaTrackList.length}
                </p>
                {context && (
                  <div className="border-l-2 border-purple-600 pl-4">
                    <p className="text-sm font-semibold text-purple-200 mb-1">{context.hook}</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">{context.pull}</p>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mb-5">
                <div className="relative h-1.5 bg-purple-900/60 rounded-full overflow-hidden mb-2 cursor-pointer group">
                  <div
                    className="absolute left-0 top-0 h-full bg-purple-500 rounded-full transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleProgressChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <div className="flex justify-between font-mono text-xs text-purple-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6">
                <button
                  onClick={handlePrevious}
                  disabled={currentTrackIndex === 0 && currentTime < 3}
                  className="p-2.5 rounded-full bg-purple-900/40 hover:bg-purple-800/60 disabled:opacity-25 disabled:cursor-not-allowed transition-all hover:scale-105"
                  title="Previous"
                >
                  <SkipBack className="h-5 w-5" />
                </button>

                <button
                  onClick={handlePlayPause}
                  className="p-4 rounded-full bg-purple-600 hover:bg-purple-500 transition-all shadow-xl shadow-purple-600/40 hover:scale-105 hover:shadow-purple-500/60"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying
                    ? <Pause className="h-6 w-6" />
                    : <Play className="h-6 w-6 ml-0.5" />
                  }
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentTrackIndex === bathshebaTrackList.length - 1}
                  className="p-2.5 rounded-full bg-purple-900/40 hover:bg-purple-800/60 disabled:opacity-25 disabled:cursor-not-allowed transition-all hover:scale-105"
                  title="Next"
                >
                  <SkipForward className="h-5 w-5" />
                </button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-lg bg-purple-950/40 border border-purple-900/40">
                <button onClick={toggleMute} className="text-purple-400 hover:text-white transition-colors flex-shrink-0">
                  {isMuted || volume === 0
                    ? <VolumeX className="h-4 w-4" />
                    : <Volume2 className="h-4 w-4" />
                  }
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-1 bg-purple-900 rounded-full appearance-none cursor-pointer accent-purple-500"
                />
                <span className="font-mono text-xs text-purple-400 w-8 text-right">
                  {isMuted ? '0' : Math.round(volume * 100)}%
                </span>
              </div>

              {/* Download Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDownloadFull}
                  disabled={isDownloadingFull}
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-purple-700 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bebas tracking-wide text-sm"
                >
                  <Download className="h-4 w-4" />
                  {isDownloadingFull ? 'Preparing ZIP...' : 'Download Full Project'}
                </button>
                <button
                  onClick={(e) => handleDownloadTrack(currentTrack, e as React.MouseEvent)}
                  disabled={downloadingTrackId === currentTrack.id}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-purple-700 hover:bg-purple-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bebas tracking-wide text-sm text-purple-300"
                >
                  <Download className="h-4 w-4" />
                  {downloadingTrackId === currentTrack.id ? 'Saving...' : 'Save This Track'}
                </button>
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="flex justify-center mt-12">
            <button
              onClick={scrollToTracklist}
              className="flex flex-col items-center gap-2 text-purple-500 hover:text-purple-300 transition-colors"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em]">All Tracks</span>
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      {/* ── TRACKLIST ────────────────────────────────────────────── */}
      <section ref={tracklistRef} className="px-4 pb-24 sm:pb-32">
        <div className="mx-auto max-w-5xl">
          <div className="border-t border-purple-900/40 pt-12">
            <h3 className="font-bebas text-2xl sm:text-3xl tracking-widest text-purple-200 mb-8 uppercase">
              Full Tracklist
            </h3>

            <div className="space-y-2">
              {bathshebaTrackList.map((track, index) => {
                const isActive = index === currentTrackIndex;
                const trackCtx = TRACK_CONTEXT[track.number];
                return (
                  <div
                    key={track.id}
                    onClick={() => handleTrackClick(index)}
                    className={`group relative flex items-center gap-3 sm:gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                      isActive
                        ? 'bg-purple-900/60 border border-purple-600/60 shadow-lg shadow-purple-900/40'
                        : 'bg-white/3 hover:bg-purple-950/40 border border-transparent hover:border-purple-800/40'
                    }`}
                  >
                    {/* Track number / playing indicator */}
                    <div className="flex-shrink-0 w-8 flex items-center justify-center">
                      {isActive && isPlaying ? (
                        <div className="flex gap-0.5 items-end h-4">
                          <div className="w-0.5 bg-purple-400 rounded-full animate-[bounce_0.6s_ease-in-out_infinite]" style={{ height: '8px', animationDelay: '0ms' }} />
                          <div className="w-0.5 bg-purple-400 rounded-full animate-[bounce_0.6s_ease-in-out_infinite]" style={{ height: '14px', animationDelay: '100ms' }} />
                          <div className="w-0.5 bg-purple-400 rounded-full animate-[bounce_0.6s_ease-in-out_infinite]" style={{ height: '10px', animationDelay: '200ms' }} />
                        </div>
                      ) : (
                        <span className={`font-mono text-sm ${isActive ? 'text-purple-300' : 'text-zinc-600 group-hover:text-purple-500'} transition-colors`}>
                          {track.number.toString().padStart(2, '0')}
                        </span>
                      )}
                    </div>

                    {/* Track info */}
                    <div className="flex-1 min-w-0">
                      <p className={`font-bebas text-lg sm:text-xl tracking-wide truncate transition-colors ${isActive ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
                        {track.title}
                      </p>
                      {trackCtx && (
                        <p className={`text-xs truncate transition-colors ${isActive ? 'text-purple-300' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                          {trackCtx.hook}
                        </p>
                      )}
                    </div>

                    {/* Duration */}
                    <span className={`font-mono text-xs flex-shrink-0 hidden sm:block transition-colors ${isActive ? 'text-purple-300' : 'text-zinc-600'}`}>
                      {track.duration}
                    </span>

                    {/* Download button */}
                    <button
                      onClick={(e) => handleDownloadTrack(track, e)}
                      disabled={downloadingTrackId === track.id}
                      className={`flex-shrink-0 p-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                        isActive
                          ? 'bg-purple-700 hover:bg-purple-600 text-white'
                          : 'bg-transparent hover:bg-purple-900/50 text-zinc-600 hover:text-purple-300 opacity-0 group-hover:opacity-100'
                      }`}
                      title="Download track"
                    >
                      <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Project description + upsell */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {/* About */}
            <div className="p-6 rounded-xl border border-purple-900/40 bg-purple-950/20">
              <h4 className="font-bebas text-xl tracking-widest text-purple-200 mb-3 uppercase">
                About BATHSHEBA
              </h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {bathshebaProject.description} Each track is crafted with intention — a royal project built for those who listen deeply.
              </p>
              <div className="mt-4 flex gap-4 font-mono text-xs text-purple-500">
                <span>{bathshebaTrackList.length} tracks</span>
                <span>{bathshebaProject.totalDuration}</span>
                <span>Free</span>
              </div>
            </div>

            {/* CLARITY upsell */}
            <div className="p-6 rounded-xl border border-green-900/40 bg-green-950/10">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-green-500 mb-2">
                Also Available
              </p>
              <h4 className="font-bebas text-xl tracking-widest text-zinc-100 mb-2 uppercase">
                CLARITY — Season 1
              </h4>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                12-track full album. Faith, discipline, and transformation. Own the complete project.
              </p>
              <Link
                href="/store"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-green-600 hover:bg-green-500 transition-colors font-bebas text-sm tracking-wide text-black"
              >
                Own CLARITY <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Nav footer */}
          <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-wrap justify-center gap-6 font-mono text-xs uppercase tracking-widest text-zinc-600">
            <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
            <Link href="/mixtape" className="hover:text-zinc-300 transition-colors">Dedication</Link>
            <Link href="/listen" className="hover:text-zinc-300 transition-colors">CLARITY</Link>
            <Link href="/store" className="hover:text-zinc-300 transition-colors">Store</Link>
            <Link href="/connect" className="hover:text-zinc-300 transition-colors">Connect</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
