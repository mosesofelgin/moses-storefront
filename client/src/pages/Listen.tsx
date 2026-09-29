import { Link } from 'wouter';
import { useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import TrackContext from '@/components/TrackContext';
import PersistentCTA from '@/components/PersistentCTA';
import ListenNavigation from '@/components/ListenNavigation';
import AudioErrorNotice from '@/components/AudioErrorNotice';
import { CLARITY_WEBSITE_EDITION } from '@/data/clarity-website-edition';

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

export default function Listen() {
  const tracks = useMemo(() => CLARITY_WEBSITE_EDITION.tracks, []);
  const [playingTrackId, setPlayingTrackId] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const activeTrackIndex = tracks.findIndex((track) => track.id === playingTrackId);
  const activeTrack = activeTrackIndex >= 0 ? tracks[activeTrackIndex] : null;
  const progressPercent = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  const playTrack = (trackId: number) => {
    const audio = audioRef.current;
    const track = tracks.find((item) => item.id === trackId);
    if (!audio || !track) return;

    setAudioError(false);
    const absoluteUrl = new URL(track.url, window.location.origin).href;
    if (audio.src !== absoluteUrl) {
      audio.src = track.url;
      setCurrentTime(0);
      setDuration(0);
    }
    void audio.play().catch(() => setAudioError(true));
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
    if (activeTrackIndex >= 0 && activeTrackIndex < tracks.length - 1) {
      playTrack(tracks[activeTrackIndex + 1].id);
      return;
    }
    setPlayingTrackId(null);
    setCurrentTime(0);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_20%_0%,rgba(9,92,62,0.28),transparent_33%),#090b09] px-4 py-6 text-zinc-100 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <ListenNavigation project="CLARITY" backHref="/clarity-sales" backLabel="Buy CLARITY" actionHref="/artist" actionLabel="Artist / EPK" />
        <header className="mb-8 border-b border-emerald-100/10 pb-7 sm:mb-10">
          <p className="text-[10px] uppercase tracking-[0.26em] text-amber-200">CLARITY · Website Edition · 13 tracks · {CLARITY_WEBSITE_EDITION.runtime}</p>
          <h1 className="mt-4 font-display text-6xl leading-[0.82] tracking-[0.1em] text-emerald-50 sm:text-7xl">LISTEN WITH INTENTION.</h1>
          <p className="mt-5 max-w-xl font-serif text-2xl italic leading-snug text-amber-50/75">The complete CLARITY Website Edition — including an exclusive track from Moses.</p>
        </header>

        <div className={`mb-6 overflow-hidden rounded-2xl border bg-zinc-900 transition ${playingTrackId ? 'border-emerald-300/55 shadow-[0_0_40px_rgba(52,211,153,0.12)]' : 'border-emerald-900/45'}`}>
          <img src={CLARITY_WEBSITE_EDITION.cover} alt="CLARITY Website Edition album cover" className={`h-auto w-full transition ${playingTrackId ? 'opacity-100' : 'opacity-95'}`} />
        </div>

        <TrackContext track={activeTrack} />

        <section className="mb-6 rounded-xl border border-emerald-900/45 bg-zinc-900/90 p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-4"><div><p className="text-[10px] uppercase tracking-[0.2em] text-amber-200">Now Playing</p><p className="mt-1 truncate font-display text-xl tracking-[0.08em] text-emerald-50">{activeTrack ? `${String(activeTrack.id).padStart(2, '0')}. ${activeTrack.title}` : 'SELECT A TRACK'}</p></div><span className="font-mono text-xs text-emerald-300/60">{activeTrack?.duration || '—'}</span></div>
          <div className="mb-3 flex items-center justify-between text-xs text-zinc-400"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div>
          <input type="range" min={0} max={100} step={0.1} value={progressPercent} onChange={(event) => handleSeek(Number(event.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-700 accent-emerald-400" aria-label="Seek playback position" disabled={!playingTrackId || duration <= 0} />
          <div className="mt-4 flex items-center justify-center gap-3"><button onClick={handlePrevious} disabled={activeTrackIndex <= 0} className="rounded-full border border-emerald-800 p-2 text-emerald-100 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Previous track"><ChevronLeft className="h-4 w-4" /></button><button onClick={() => activeTrack && handlePlayTrack(activeTrack.id)} disabled={!activeTrack} className="rounded-full bg-emerald-300 p-3 text-zinc-950 disabled:cursor-not-allowed disabled:opacity-40" aria-label={playingTrackId ? 'Pause current track' : 'Play current track'}>{playingTrackId ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}</button><button onClick={handleNext} disabled={activeTrackIndex < 0 || activeTrackIndex >= tracks.length - 1} className="rounded-full border border-emerald-800 p-2 text-emerald-100 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Next track"><ChevronRight className="h-4 w-4" /></button></div>
        </section>

        {audioError && playingTrackId && <AudioErrorNotice onRetry={() => playTrack(playingTrackId)} />}

        <section className="mb-8 rounded-xl border border-emerald-900/45 bg-zinc-900/90 p-4 sm:p-5">
          <div className="mb-4 flex items-end justify-between"><h2 className="text-lg font-medium">All Tracks</h2><span className="font-mono text-xs text-emerald-300/65">13 tracks · {CLARITY_WEBSITE_EDITION.runtime}</span></div>
          <div className="space-y-2">{tracks.map((track) => { const isPlaying = playingTrackId === track.id; return <div key={track.id} className={`flex items-center gap-3 rounded-lg border p-3 ${isPlaying ? 'border-emerald-300/45 bg-emerald-950/35 text-white ring-1 ring-emerald-300/15' : 'border-emerald-900/35 bg-zinc-900 text-zinc-200'}`}><button onClick={() => handlePlayTrack(track.id)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-300 text-zinc-950" aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}>{isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}</button><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><p className={`truncate text-sm font-medium ${isPlaying ? 'text-white' : 'text-zinc-200'}`}>{String(track.id).padStart(2, '0')}. {track.title}</p>{track.isWebsiteExclusive && <span className="shrink-0 rounded border border-amber-300/35 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.12em] text-amber-200">Website Exclusive</span>}</div><p className={`truncate text-xs ${isPlaying ? 'text-zinc-300' : 'text-zinc-400'}`}>{track.description}</p></div><span className="shrink-0 font-mono text-xs text-emerald-300/65">{track.duration}</span></div>; })}</div>
          <audio ref={audioRef} onError={() => setAudioError(true)} onLoadedMetadata={() => { setAudioError(false); setDuration(audioRef.current?.duration ?? 0); }} onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)} onEnded={handleTrackEnd} className="hidden" />
        </section>

        <PersistentCTA />
        <div className="flex items-center justify-between text-sm"><Link href="/" className="text-zinc-300 hover:text-white">← Back to Home</Link><Link href="/store" className="text-zinc-300 hover:text-white">View Store →</Link></div>
      </div>
    </main>
  );
}
