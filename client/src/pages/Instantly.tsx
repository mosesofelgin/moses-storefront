import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Download, Mail, Pause, Play, Send, Video } from 'lucide-react';
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
  { title: 'Know Me', audio: '/manus-storage/Knowme_2c62facb.mp3', video: '/manus-storage/KnowMe-SmallerPhoneCopy_11fe4399.mp4' },
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

export default function Instantly() {
  const feedRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const [captureVisible, setCaptureVisible] = useState(false);
  const subscribe = trpc.subscribe.addEmail.useMutation();

  const pauseAll = (except?: HTMLVideoElement) => videoRefs.current.forEach((video) => { if (video && video !== except) video.pause(); });
  const selectTrack = (index: number, shouldPlay = true) => {
    const next = Math.max(0, Math.min(index, TRACKS.length - 1));
    const video = videoRefs.current[next];
    setActiveIndex(next);
    video?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    pauseAll(video ?? undefined);
    if (shouldPlay) video?.play().then(() => setPlaying(true)).catch(() => toast.info('Tap the video to start the project.'));
  };
  const startProject = () => selectTrack(0);
  const handleVideoPlay = (index: number, video: HTMLVideoElement) => {
    setActiveIndex(index);
    setPlaying(true);
    pauseAll(video);
  };
  const handleVideoEnd = (index: number) => {
    if (index < TRACKS.length - 1) selectTrack(index + 1);
    else setPlaying(false);
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
  useEffect(() => {
    const captureTimer = window.setTimeout(() => setCaptureVisible(true), 18000);
    const startTimer = window.setTimeout(() => selectTrack(0), 300);
    return () => { window.clearTimeout(captureTimer); window.clearTimeout(startTimer); };
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#090708] text-[#f8e8c7]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#090708]/90 px-4 py-3 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between"><Link href="/music" className="inline-flex min-h-10 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#b49a76] hover:text-[#ffd477]"><ArrowLeft className="h-4 w-4" /> All music</Link><span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#f2ad38]">MOSES / SOG</span><a href="https://instagram.com/moses_sog" target="_blank" rel="noreferrer" className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#b49a76] hover:text-[#ffd477]">Instagram</a></div>
      </header>

      <section id="tracks" className="relative border-b border-[#f2ad38]/25 bg-[radial-gradient(circle_at_50%_10%,rgba(194,73,31,0.28),transparent_42%),#10090a] px-3 pb-12 pt-5 sm:px-8 sm:pb-20">
        <div className="mx-auto max-w-7xl"><div className="mb-5 flex items-end justify-between gap-4"><div><p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#f2ad38]">New release · 2026</p><h1 className="mt-2 font-display text-5xl leading-[0.82] tracking-[0.03em] text-[#fff2d4] sm:text-7xl">INSTANTLY<br /><em className="not-italic text-[#f2ad38]">THE PROCESS</em></h1></div><div className="text-right"><p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#b49a76]">{String(activeIndex + 1).padStart(2, '0')} / 11</p><p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[#806b50]">Swipe the project</p></div></div>
          <div ref={feedRef} className="mx-auto flex max-w-[560px] snap-y snap-mandatory flex-col gap-5 overflow-y-auto scroll-smooth rounded-2xl pr-1 [scrollbar-color:#f2ad38_#24110e]" style={{ maxHeight: '78vh' }}>
            {TRACKS.map((track, index) => <article key={track.title} className="relative min-h-[72vh] snap-center overflow-hidden rounded-2xl border border-[#f2ad38]/40 bg-black shadow-[10px_10px_0_rgba(143,46,32,0.34)]"><video ref={(element) => { videoRefs.current[index] = element; }} className="h-full min-h-[72vh] w-full bg-black object-cover" controls playsInline preload={index === 0 ? 'metadata' : 'none'} onPlay={(event) => handleVideoPlay(index, event.currentTarget)} onPause={() => { if (activeIndex === index) setPlaying(false); }} onEnded={() => handleVideoEnd(index)}><source src={track.video} type="video/mp4" /></video><div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between p-4"><span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/80">MOSES / SOG · INSTANTLY</span><span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/80">{String(index + 1).padStart(2, '0')} / 11</span></div><div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent px-5 pb-16 pt-24"><p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#f2ad38]">The Process · full video</p><h2 className="mt-2 font-display text-4xl tracking-[0.05em] text-white sm:text-5xl">{track.title}</h2><p className="mt-2 font-serif text-lg italic text-white/75">Swipe up for the next song.</p></div><button type="button" onClick={() => selectTrack(index)} aria-label={`Play ${track.title}`} className="absolute bottom-5 right-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#f2ad38] text-[#1a0d09] shadow-lg">{activeIndex === index && playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}</button></article>)}
          </div>
          <div className="mx-auto mt-5 flex max-w-[560px] items-center justify-between gap-3"><p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#806b50]">11 songs · 11 video posts · swipe / scroll</p><button type="button" onClick={startProject} className="inline-flex min-h-10 items-center gap-2 border border-[#f2ad38]/50 px-4 font-display text-sm tracking-[0.1em] text-[#ffd477] hover:bg-[#f2ad38]/10"><Play className="h-3 w-3" /> PLAY FROM START</button></div>
          <div className="mx-auto mt-5 flex max-w-[560px] flex-col gap-3 border border-[#f2ad38]/30 bg-[#4a1713]/35 p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-display text-xl tracking-[0.08em] text-[#fff2d4]">TAKE THE FULL PROJECT</p><p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[#b49a76]">11 original MP3s · one complete download</p></div><a href="/api/download/instantly" className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#f2ad38] px-5 font-display text-base tracking-[0.1em] text-[#1a0d09] hover:bg-[#ffd477]"><Download className="h-4 w-4" /> DOWNLOAD PROJECT</a></div>
        </div>
      </section>

      <section className="relative border-b border-[#f2ad38]/20 px-4 py-14 sm:px-8 sm:py-24"><div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.85fr]"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f2ad38]">From the notebook to the mic</p><p className="mt-6 max-w-2xl font-serif text-3xl italic leading-snug text-[#f4dcae] sm:text-5xl">Ten songs became eleven. One process became a world you can enter.</p><p className="mt-5 max-w-xl font-mono text-xs uppercase leading-6 tracking-[0.12em] text-[#b49a76]">Press play, swipe through the sessions, then stay for the stories behind the songs.</p></div><div className="border border-[#f2ad38]/30 bg-[#4a1713]/30 p-6"><p className="font-display text-4xl leading-[0.9] tracking-[0.04em] text-[#fff2d4]">PLAY THE<br /><em className="not-italic text-[#f2ad38]">PROCESS.</em></p><button type="button" onClick={startProject} className="mt-6 inline-flex min-h-11 items-center gap-2 bg-[#f2ad38] px-5 font-display text-base tracking-[0.1em] text-[#1a0d09]">START AGAIN <Play className="h-4 w-4" /></button></div></div></section>

      <section id="notebook" className="border-y border-[#f2ad38]/20 bg-[#4a1713]/20 px-4 py-14 sm:px-8 sm:py-24"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f2ad38]">The rollout</p><h2 className="mt-3 font-display text-6xl leading-[0.82] tracking-[0.04em] text-[#fff2d4] sm:text-8xl">FROM THE NOTEBOOK<br /><em className="not-italic text-[#f2ad38]">TO THE MIC</em></h2></div><p className="font-mono text-[10px] uppercase leading-6 tracking-[0.12em] text-[#b49a76] sm:text-right">Writing, punch-ins,<br />stacking takes.</p></div><div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{ROLLOUT.map((post) => <article key={post.number} className="overflow-hidden border border-[#f8e8c7]/15 bg-[#190d0c]"><video className="aspect-[9/12] w-full bg-black object-cover" controls preload="none" playsInline onPlay={(event) => { pauseAll(event.currentTarget); }}><source src={post.video} type="video/mp4" /></video><div className="p-4"><p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#f2ad38]">{post.number} · {post.label}</p><h3 className="mt-2 font-display text-xl tracking-[0.05em] text-[#fff2d4]">{post.title}</h3></div></article>)}</div></div></section>

      {captureVisible && <section className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-24" aria-labelledby="capture-title"><div className="grid gap-8 border border-[#f2ad38]/35 bg-[#4a1713]/35 p-6 sm:p-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f2ad38]">Stay close to the process</p><h2 id="capture-title" className="mt-3 font-display text-5xl leading-[0.86] tracking-[0.03em] text-[#fff2d4] sm:text-6xl">GET THE NEXT<br /><em className="not-italic text-[#f2ad38]">TRANSMISSION.</em></h2><p className="mt-5 max-w-md font-serif text-xl leading-relaxed text-[#c6a979]">New music, videos, and behind-the-scenes moments sent directly from Moses. No noise.</p></div>{joined ? <div className="border border-[#f2ad38]/35 bg-[#100909]/70 p-6"><p className="font-display text-3xl tracking-[0.1em] text-[#ffd477]">YOU’RE IN.</p></div> : <form onSubmit={submitEmail} className="border border-[#f8e8c7]/15 bg-[#100909]/70 p-5 sm:p-6"><label htmlFor="instantly-email" className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#b49a76]">Email address</label><div className="mt-3 flex flex-col gap-3 sm:flex-row"><input id="instantly-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="your@email.com" className="min-h-12 min-w-0 flex-1 border border-[#f8e8c7]/20 bg-[#100909] px-4 font-mono text-sm text-[#fff2d4] outline-none placeholder:text-[#806b50] focus:border-[#f2ad38]" /><button type="submit" disabled={subscribe.isPending} className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#f2ad38] px-5 font-display text-lg tracking-[0.1em] text-[#1a0d09] disabled:opacity-60">{subscribe.isPending ? 'JOINING…' : 'JOIN THE LIST'} <Send className="h-4 w-4" /></button></div></form>}</div></section>}

      <footer className="px-4 py-8 sm:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[#806b50] sm:flex-row sm:items-center sm:justify-between"><Link href="/music" className="inline-flex min-h-10 items-center gap-2 hover:text-[#ffd477]"><ArrowLeft className="h-4 w-4" /> All music</Link><span>INSTANTLY: THE PROCESS · 11 SONGS · MOSES · 2026</span><a href="https://mosessog.com/instantly" className="hover:text-[#ffd477]">mosessog.com/instantly</a></div></footer>
    </main>
  );
}
