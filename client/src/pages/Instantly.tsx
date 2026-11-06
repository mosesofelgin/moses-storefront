import { useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowUpRight, Download, Mail, Pause, Play, Send, Video } from 'lucide-react';
import { Link } from 'wouter';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';

type Track = { title: string; audio: string; video: string };
type Rollout = { number: string; title: string; label: string; video: string; featured?: boolean };

const TRACKS: Track[] = [
  { title: 'Gave My All', audio: '/manus-storage/Gave My All_2a4c20a3.mp3', video: '/manus-storage/Gave My All - Phone_4f08c7c3.mp4' },
  { title: 'Healing Music', audio: '/manus-storage/Healing Music_f24e7226.mp3', video: '/manus-storage/Healing Music - Phone_c391a921.mp4' },
  { title: 'Blue Print', audio: '/manus-storage/Blue Print_0b8a1857.mp3', video: '/manus-storage/Blue Print - Phone_93233bb2.mp4' },
  { title: 'Freefalling', audio: '/manus-storage/Freefalling_a02d7735.mp3', video: '/manus-storage/Freefalling - Phone_a81951b8.mp4' },
  { title: 'Unfuckwitable', audio: '/manus-storage/Unfuckwitable_dac15be6.mp3', video: '/manus-storage/Unfuckwitable - Phone_4f097212.mp4' },
  { title: 'Wash Away the Blood', audio: '/manus-storage/Wash Away the Blood_f83fa8f4.mp3', video: '/manus-storage/Wash Away the Blood - Phone_65734858.mp4' },
  { title: 'Do U Roc Wit Me', audio: '/manus-storage/Do U Roc Wit Me_33552255.mp3', video: '/manus-storage/Do U Roc Wit Me - Phone_9fbe7f5a.mp4' },
  { title: 'Show Me', audio: '/manus-storage/Show Me_6c944a32.mp3', video: '/manus-storage/Show Me - Phone_c1e4d5fc.mp4' },
  { title: 'Apologies Don’t Heal a Broken Heart', audio: '/manus-storage/Apologies Dont Heal a Broken Heart_cd57fe1b.mp3', video: '/manus-storage/Apologies Dont Heal a Broken Heart - Phone_8a9303b5.mp4' },
  { title: '100K Idea', audio: '/manus-storage/100K Idea_bf68975d.mp3', video: '/manus-storage/100K Idea - Phone_5d8d9f9d.mp4' },
];

const ROLLOUT: Rollout[] = [
  { number: '01', title: 'Introduction', label: 'Unfuckwitable hook · the project begins', video: '/manus-storage/01 of 06 - Instantly Introduction_6a28ee7d.mp4', featured: true },
  { number: '02', title: 'Wash Away the Blood', label: 'Hook clip', video: '/manus-storage/02 - Wash Away the Blood_8990db22.mp4' },
  { number: '03', title: 'Do U Roc Wit Me', label: 'Hook clip', video: '/manus-storage/03 - Do U Roc Wit Me_ffbf51e2.mp4' },
  { number: '04', title: 'Show Me', label: 'Hook clip', video: '/manus-storage/04 - Show Me_cf5726af.mp4' },
  { number: '05', title: 'Apologies', label: 'Hook clip', video: '/manus-storage/05 - Apologies_867df028.mp4' },
  { number: '06', title: 'Notebook to Mic', label: 'Writing, punch-ins, and the room', video: '/manus-storage/06 - Notebook to Mic_3e63582f.mp4' },
  { number: '07', title: 'The Apologies Punch-In', label: 'Process archive', video: '/manus-storage/07 - The Apologies Punch-In_90f8d0b1.mp4' },
  { number: '08', title: 'Show Me at the Desk', label: 'Process archive', video: '/manus-storage/08 - Show Me at the Desk_c14b1540.mp4' },
  { number: '09', title: 'Stacking the Takes', label: 'Process archive', video: '/manus-storage/09 - Stacking the Takes_4b6ff3bd.mp4' },
  { number: '10', title: 'How 100K Idea Started', label: 'Process archive', video: '/manus-storage/10 - How 100K Idea Started_dd33ada5.mp4' },
];

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) return '0:00';
  return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`;
};

export default function Instantly() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const featuredVideoRef = useRef<HTMLVideoElement>(null);
  const [activeTrack, setActiveTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const subscribe = trpc.subscribe.addEmail.useMutation();
  const active = activeTrack === null ? null : TRACKS[activeTrack];
  const progress = useMemo(() => duration ? (currentTime / duration) * 100 : 0, [currentTime, duration]);

  const pauseVideos = (except?: HTMLVideoElement | null) => {
    document.querySelectorAll('video').forEach((video) => { if (video !== except) video.pause(); });
  };
  const playTrack = (index: number) => {
    const audio = audioRef.current;
    const track = TRACKS[index];
    if (!audio) return;
    pauseVideos();
    if (activeTrack === index && !audio.paused) { audio.pause(); setIsPlaying(false); return; }
    if (activeTrack !== index) { audio.src = track.audio; audio.load(); setCurrentTime(0); }
    setActiveTrack(index);
    audio.play().then(() => setIsPlaying(true)).catch(() => toast.error('Press play again to start this track.'));
  };
  const openTrackVideo = (track: Track) => {
    audioRef.current?.pause();
    pauseVideos();
    const target = document.getElementById(`video-${track.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`);
    target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const video = target?.querySelector('video') as HTMLVideoElement | null;
    video?.play().catch(() => undefined);
  };
  const watchIntroduction = () => {
    featuredVideoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    pauseVideos(featuredVideoRef.current);
    featuredVideoRef.current?.play().catch(() => undefined);
  };
  const submitEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    try {
      const result = await subscribe.mutateAsync({ email: email.trim(), source: 'instantly_the_process' });
      if (result.success || result.message === 'Already subscribed') { setJoined(true); toast.success('You are on the list.'); }
      else toast.error(result.message || 'Could not join the list.');
    } catch { toast.error('Could not join the list. Please try again.'); }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#100909] text-[#f8e8c7]">
      <header className="border-b border-[#f8e8c7]/15 bg-[#100909]/95 px-4 py-4 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between"><Link href="/music" className="inline-flex min-h-10 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#b49a76] transition hover:text-[#ffd477]"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> All music</Link><span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#f2ad38]">MOSES / SOG</span><a href="https://instagram.com/moses_sog" target="_blank" rel="noreferrer" className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#b49a76] transition hover:text-[#ffd477]">Instagram</a></div>
      </header>
      <section className="relative border-b border-[#f2ad38]/20 px-4 py-14 sm:px-8 sm:py-24"><div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_12%,rgba(194,73,31,0.34),transparent_30%),radial-gradient(circle_at_15%_75%,rgba(242,173,56,0.10),transparent_30%)]" /><div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f2ad38]">● New release · 2026</p><h1 className="mt-6 font-display text-[clamp(4.7rem,12vw,9rem)] leading-[0.78] tracking-[0.02em] text-[#fff2d4]">INSTANTLY<span className="text-[#f2ad38]">:</span><br /><em className="not-italic text-[#f2ad38]">THE PROCESS</em></h1><p className="mt-8 max-w-xl font-serif text-2xl italic leading-snug text-[#f4dcae] sm:text-3xl">Ten songs. Ten videos. From the notebook to the mic.</p><p className="mt-4 max-w-lg font-mono text-xs uppercase leading-6 tracking-[0.12em] text-[#b49a76]">Hear the finished tracks and see the sessions behind them.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#tracks" className="inline-flex min-h-12 items-center gap-4 bg-[#f2ad38] px-5 font-display text-lg tracking-[0.1em] text-[#1a0d09] transition hover:bg-[#ffd477]">LISTEN TO THE PROJECT <ArrowDown className="h-4 w-4" aria-hidden="true" /></a><button type="button" onClick={watchIntroduction} className="inline-flex min-h-12 items-center gap-4 border border-[#f8e8c7]/25 px-5 font-display text-lg tracking-[0.1em] text-[#f8e8c7] transition hover:border-[#f2ad38] hover:text-[#ffd477]">WATCH THE INTRO <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></button></div><div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#f8e8c7]/15 pt-5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#b49a76]"><span>10 tracks</span><span>10 videos</span><span>Direct MP3 downloads</span></div></div><div className="mx-auto w-full max-w-[500px]"><div className="relative aspect-square overflow-hidden border border-[#f2ad38]/55 bg-[radial-gradient(circle_at_70%_20%,rgba(242,173,56,0.72),transparent_28%),linear-gradient(140deg,#160c0b_8%,#8f2e20_57%,#100807)] p-6 shadow-[16px_16px_0_rgba(143,46,32,0.55)] sm:p-10"><div className="absolute inset-5 border border-[#f8e8c7]/20 sm:inset-8" /><div className="relative flex h-full flex-col justify-between"><div className="font-mono text-xs uppercase tracking-[0.24em] text-[#fff2d4]">MOSES</div><div><p className="font-display text-[clamp(4rem,10vw,7.5rem)] leading-[0.77] tracking-[0.01em] text-[#fff2d4]">INSTANTLY</p><p className="mt-4 font-mono text-sm uppercase tracking-[0.25em] text-[#ffd477]">THE PROCESS</p></div><div className="flex justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-[#f4dcae]"><span>10 songs · 10 videos</span><span>2026</span></div></div></div><div className="mt-4 flex justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-[#b49a76]"><span>01 / 10</span><span>From the notebook to the mic</span></div></div></div></section>
      <section className="border-b border-[#f8e8c7]/15 bg-[#4a1713]/30 px-4 py-7 sm:px-8"><div className="mx-auto grid max-w-7xl grid-cols-[32px_1fr] gap-5"><span className="font-mono text-[10px] text-[#f2ad38]">01</span><p className="max-w-3xl font-serif text-xl leading-relaxed text-[#f4dcae] sm:text-2xl">“The finished song is only the surface. This is the room, the notebook, the punch-in, the take that finally landed.”</p></div></section>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-24" aria-labelledby="capture-title"><div className="grid gap-8 border border-[#f2ad38]/35 bg-[#4a1713]/35 p-6 sm:p-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f2ad38]">Stay close to the process</p><h2 id="capture-title" className="mt-3 font-display text-5xl leading-[0.86] tracking-[0.03em] text-[#fff2d4] sm:text-6xl">GET THE NEXT<br /><em className="not-italic text-[#f2ad38]">TRANSMISSION.</em></h2><p className="mt-5 max-w-md font-serif text-xl leading-relaxed text-[#c6a979]">New music, videos, and behind-the-scenes moments sent directly from Moses. No noise.</p></div>{joined ? <div className="border border-[#f2ad38]/35 bg-[#100909]/70 p-6"><p className="font-display text-3xl tracking-[0.1em] text-[#ffd477]">YOU’RE IN.</p><p className="mt-3 font-serif text-xl text-[#c6a979]">The next transmission will find you directly.</p></div> : <form onSubmit={submitEmail} className="border border-[#f8e8c7]/15 bg-[#100909]/70 p-5 sm:p-6"><label htmlFor="instantly-email" className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#b49a76]">Email address</label><div className="mt-3 flex flex-col gap-3 sm:flex-row"><input id="instantly-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="your@email.com" className="min-h-12 min-w-0 flex-1 border border-[#f8e8c7]/20 bg-[#100909] px-4 font-mono text-sm text-[#fff2d4] outline-none placeholder:text-[#806b50] focus:border-[#f2ad38] focus:ring-2 focus:ring-[#f2ad38]/20" /><button type="submit" disabled={subscribe.isPending} className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#f2ad38] px-5 font-display text-lg tracking-[0.1em] text-[#1a0d09] transition hover:bg-[#ffd477] disabled:opacity-60">{subscribe.isPending ? 'JOINING…' : 'JOIN THE LIST'} <Send className="h-4 w-4" aria-hidden="true" /></button></div><p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-[#806b50]">Direct from MOSES · Unsubscribe anytime</p></form>}</div></section>
      <section id="tracks" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-16 sm:px-8 sm:pb-24"><div className="flex flex-col justify-between gap-5 border-b border-[#f8e8c7]/15 pb-7 sm:flex-row sm:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f2ad38]">The complete release</p><h2 className="mt-3 font-display text-6xl tracking-[0.05em] text-[#fff2d4] sm:text-8xl">LISTEN <em className="not-italic text-[#f2ad38]">/ DOWNLOAD</em></h2></div><p className="font-mono text-[10px] uppercase leading-6 tracking-[0.12em] text-[#b49a76] sm:text-right">Every full song.<br />Every original MP3.</p></div><div className="sticky top-0 z-20 mt-6 border border-[#f2ad38]/35 bg-[#190e0c]/95 p-4 backdrop-blur-xl"><div className="flex items-center justify-between gap-3"><div><p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#f2ad38]">Now playing</p><p className="mt-1 font-display text-2xl tracking-[0.08em] text-[#fff2d4]">{active ? active.title : 'Choose a track'}</p></div><p className="font-mono text-[10px] text-[#b49a76]">{formatTime(currentTime)} / {formatTime(duration)}</p></div><div className="mt-3 h-1 bg-[#f8e8c7]/15"><div className="h-full bg-[#f2ad38] transition-[width]" style={{ width: `${progress}%` }} /></div></div><div className="border-t border-[#f8e8c7]/15">{TRACKS.map((track, index) => <article key={track.title} className="grid gap-3 border-b border-[#f8e8c7]/15 py-5 sm:grid-cols-[44px_1fr_auto] sm:items-center"><span className="font-mono text-[10px] text-[#f2ad38]">{String(index + 1).padStart(2, '0')}</span><h3 className="font-display text-2xl tracking-[0.05em] text-[#fff2d4] sm:text-3xl">{track.title}</h3><div className="flex gap-2 sm:justify-end"><button type="button" onClick={() => playTrack(index)} className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 border border-[#f2ad38]/45 px-3 font-mono text-[9px] uppercase tracking-[0.1em] text-[#ffd477] transition hover:bg-[#f2ad38]/10 sm:flex-none">{activeTrack === index && isPlaying ? <Pause className="h-3 w-3" aria-hidden="true" /> : <Play className="h-3 w-3" aria-hidden="true" />} {activeTrack === index && isPlaying ? 'Pause' : 'Play'}</button><a href={track.audio} download className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 border border-[#f8e8c7]/20 px-3 font-mono text-[9px] uppercase tracking-[0.1em] text-[#f8e8c7] transition hover:border-[#f2ad38] sm:flex-none"><Download className="h-3 w-3" aria-hidden="true" /> MP3</a><button type="button" onClick={() => openTrackVideo(track)} className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 border border-[#f8e8c7]/20 px-3 font-mono text-[9px] uppercase tracking-[0.1em] text-[#f8e8c7] transition hover:border-[#f2ad38] sm:flex-none"><Video className="h-3 w-3" aria-hidden="true" /> Video</button></div></article>)}</div><audio ref={audioRef} className="hidden" preload="metadata" onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)} onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onEnded={() => setIsPlaying(false)} aria-label="Instantly project audio" />
      </section>
      <section id="notebook" className="border-y border-[#f2ad38]/20 bg-[#4a1713]/20 px-4 py-14 sm:px-8 sm:py-24"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f2ad38]">The rollout</p><h2 className="mt-3 font-display text-6xl leading-[0.82] tracking-[0.04em] text-[#fff2d4] sm:text-8xl">FROM THE NOTEBOOK<br /><em className="not-italic text-[#f2ad38]">TO THE MIC</em></h2></div><p className="font-mono text-[10px] uppercase leading-6 tracking-[0.12em] text-[#b49a76] sm:text-right">Writing, punch-ins,<br />stacking takes.</p></div><article className="mt-10 grid overflow-hidden border border-[#f2ad38]/35 bg-[#24110e] lg:grid-cols-[1.15fr_0.85fr]"><div className="p-5 sm:p-8"><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#f2ad38]">01 / 06 · Introduction</p><h3 className="mt-5 font-display text-5xl leading-[0.86] tracking-[0.04em] text-[#fff2d4] sm:text-7xl">THE HOOK<br />OPENS THE DOOR.</h3><p className="mt-5 max-w-md font-serif text-xl leading-relaxed text-[#c6a979]">Start with the Unfuckwitable hook, then follow the record from the notebook into the finished room.</p><button type="button" onClick={watchIntroduction} className="mt-7 inline-flex min-h-11 items-center gap-2 border-b border-[#f2ad38] font-mono text-[10px] uppercase tracking-[0.12em] text-[#ffd477]">Watch introduction <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></button></div><video ref={featuredVideoRef} className="min-h-[360px] w-full bg-black object-cover" controls preload="none" playsInline onPlay={() => { audioRef.current?.pause(); pauseVideos(featuredVideoRef.current); }}><source src={ROLLOUT[0].video} type="video/mp4" /></video></article><div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{ROLLOUT.slice(1).map((post) => <article id={`video-${post.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`} key={post.number} className="overflow-hidden border border-[#f8e8c7]/15 bg-[#190d0c]"><video className="aspect-[9/12] w-full bg-black object-cover" controls preload="none" playsInline onPlay={(event) => { audioRef.current?.pause(); pauseVideos(event.currentTarget); }}><source src={post.video} type="video/mp4" /></video><div className="p-4"><p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#f2ad38]">{post.number} · {post.label}</p><h3 className="mt-2 font-display text-xl tracking-[0.05em] text-[#fff2d4]">{post.title}</h3></div></article>)}</div></div></section>
      <section className="border-b border-[#f8e8c7]/15 bg-[#4a1713]/25 px-4 py-16 sm:px-8 sm:py-24"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 sm:flex-row sm:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f2ad38]">Keep the process moving</p><h2 className="mt-4 font-display text-6xl leading-[0.82] tracking-[0.04em] text-[#fff2d4] sm:text-8xl">WHICH ONE ARE<br />YOU <em className="not-italic text-[#f2ad38]">RUNNING BACK?</em></h2></div><Link href="#tracks" className="inline-flex min-h-12 items-center gap-3 border border-[#f2ad38]/45 px-5 font-display text-lg tracking-[0.1em] text-[#ffd477]">RETURN TO THE PROJECT <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link></div></section>
      <footer className="px-4 py-8 sm:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[#806b50] sm:flex-row sm:items-center sm:justify-between"><Link href="/music" className="inline-flex min-h-10 items-center gap-2 hover:text-[#ffd477]"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> All music</Link><span>INSTANTLY: THE PROCESS · MOSES · 2026</span><a href="https://mosessog.com/instantly" className="hover:text-[#ffd477]">mosessog.com/instantly</a></div></footer>
    </main>
  );
}
