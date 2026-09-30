import { useState } from "react";
import { ArrowDown, ArrowLeft, Church as ChurchIcon, ExternalLink, Mail, Play, Send, Youtube } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const MP3_URL = "/manus-storage/church_55d3de5a.mp3";
const POSTER_URL = "/manus-storage/church-poster_8642bc0c.jpg";
const VIDEO_URL = "/manus-storage/church-web_573306b2.mp4";
const YOUTUBE_VIDEO_ID = "CC3lHW_usho";
const RUNTIME = "3:34";

export default function Church() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("0");
  const [submitted, setSubmitted] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const checkout = trpc.checkout.createSession.useMutation();
  const freeOrder = trpc.checkout.createFreeOrder.useMutation();
  const subscribeMutation = trpc.subscribe.addEmail.useMutation();

  const submitDelivery = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dollars = Number(amount);
    if (!name.trim() || !email.trim() || !Number.isFinite(dollars) || dollars < 0) {
      toast.error("Enter your name, email, and a valid amount.");
      return;
    }
    setDelivery(true);
    try {
      if (dollars === 0) {
        const result = await freeOrder.mutateAsync({
          customerEmail: email.trim(),
          customerName: name.trim(),
          productId: "church",
        });
        if (result.token) window.location.assign(`/success?token=${result.token}`);
      } else {
        const result = await checkout.mutateAsync({
          customerEmail: email.trim(),
          customerName: name.trim(),
          productId: "church",
          amountInCents: Math.round(dollars * 100),
        });
        if (result.url) window.location.assign(result.url);
      }
    } catch (error) {
      console.error("CHURCH delivery error:", error);
      toast.error("We could not prepare your download. Please try again.");
      setDelivery(false);
    }
  };

  const submitEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    try {
      const result = await subscribeMutation.mutateAsync({ email: email.trim(), source: "church_release" });
      if (result.success) {
        setSubmitted(true);
        toast.success("You are on the list.");
      } else toast.error(result.message || "Could not join the list.");
    } catch {
      toast.error("Could not join the list. Please try again.");
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#080908] text-[#f2eadb]">
      <section className="relative border-b border-[#b8860b]/25">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_18%,rgba(56,115,79,0.35),transparent_33%),radial-gradient(circle_at_15%_78%,rgba(184,134,11,0.14),transparent_38%)]" />
        <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-7 sm:px-8 sm:pb-20 sm:pt-9">
          <div className="flex items-center justify-between gap-4">
            <Link href="/music" className="inline-flex min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#aa9c86] transition hover:text-[#f0e8d7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d5a21a]"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> All music</Link>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#b8860b]">New visual transmission</p>
          </div>
          <div className="grid items-end gap-10 pt-20 lg:grid-cols-[1fr_0.72fr] lg:pt-28">
            <div>
              <div className="mb-6 flex items-center gap-3 text-[#d5a21a]"><ChurchIcon className="h-5 w-5" aria-hidden="true" /><span className="font-mono text-xs uppercase tracking-[0.22em]">MOSES SOG · CHURCH</span></div>
              <h1 className="font-display text-[clamp(5rem,18vw,12rem)] leading-[0.76] tracking-[0.02em] text-[#f4ecdf]">CHURCH</h1>
              <p className="mt-8 max-w-xl font-serif text-2xl italic leading-snug text-[#c6b9a4] sm:text-3xl">A song for the sanctuary, the struggle, and the people still becoming.</p>
              <p className="mt-5 max-w-xl font-mono text-xs uppercase leading-6 tracking-[0.12em] text-[#8e8373]">Watch the visual. Take the audio. Name your price.</p>
            </div>
            <div className="justify-self-start border-l border-[#b8860b]/40 pl-5 lg:justify-self-end lg:pl-7"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8e8373]">Direct release</p><p className="mt-3 max-w-xs font-serif text-xl leading-relaxed text-[#d9cdbd]">The full-resolution MP3 is available directly from MOSES. Give what you can, or take it free.</p></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="mb-5 flex items-end justify-between gap-4"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8860b]">01 · The visual</p><h2 className="mt-2 font-display text-4xl tracking-[0.08em] text-[#f4ecdf] sm:text-5xl">WATCH CHURCH</h2></div><Youtube className="hidden h-6 w-6 text-[#b8860b] sm:block" aria-hidden="true" /></div>
        <div className="relative aspect-video overflow-hidden border border-[#b8860b]/35 bg-[#15120e] shadow-[0_24px_90px_rgba(0,0,0,0.46)]"><video className="h-full w-full" controls preload="metadata" poster={POSTER_URL} aria-label="Church by Moses ft Snoop (prod. Don Cannon)"><source src={VIDEO_URL} type="video/mp4" />Your browser does not support the video player. <a href={`https://youtu.be/${YOUTUBE_VIDEO_ID}`}>Watch CHURCH on YouTube.</a></video></div>
        <div className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center"><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#776d60]">If the player is restricted, watch directly on YouTube.</p><a href={`https://youtu.be/${YOUTUBE_VIDEO_ID}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 border border-[#b8860b]/35 px-4 font-display text-sm tracking-[0.12em] text-[#d5a21a] transition hover:border-[#d5a21a] hover:text-[#f0e8d7]">WATCH ON YOUTUBE <ExternalLink className="h-4 w-4" aria-hidden="true" /></a></div>
      </section>

      <section className="border-y border-[#b8860b]/20 bg-[#110e0b]"><div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.75fr_1.25fr] lg:items-center"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8860b]">02 · The audio</p><h2 className="mt-2 font-display text-5xl tracking-[0.08em] text-[#f4ecdf] sm:text-6xl">TAKE THE SONG</h2><p className="mt-4 max-w-md font-serif text-xl leading-relaxed text-[#c6b9a4]">Listen to the full audio, then choose what the work is worth to you. $0 is welcome.</p></div><div className="border border-[#b8860b]/30 bg-[#0a0908] p-5 sm:p-7"><div className="flex items-center gap-4 border-b border-[#b8860b]/20 pb-5"><img src={POSTER_URL} alt="Church release still" className="h-16 w-16 object-cover" /><div><p className="font-display text-3xl tracking-[0.12em] text-[#f0e8d7]">CHURCH</p><p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#817666]">MOSES SOG · MP3 · {RUNTIME}</p></div><ArrowDown className="ml-auto h-5 w-5 text-[#d5a21a]" aria-hidden="true" /></div><audio className="mt-6 w-full accent-[#d5a21a]" controls preload="metadata" src={MP3_URL} aria-label="Church audio by Moses SOG"><a href={MP3_URL}>Listen to Church</a></audio><form onSubmit={submitDelivery} className="mt-6 grid gap-3 sm:grid-cols-2"><div className="sm:col-span-2"><label htmlFor="church-name" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-[#8e8373]">Name</label><input id="church-name" type="text" required value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" className="min-h-12 w-full border border-[#b8860b]/30 bg-[#15120e] px-4 text-[#f0e8d7] outline-none placeholder:text-[#6d6255] focus:border-[#d5a21a] focus:ring-2 focus:ring-[#d5a21a]/25" /></div><div className="sm:col-span-2"><label htmlFor="church-email" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-[#8e8373]">Email for your download link</label><input id="church-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="your@email.com" className="min-h-12 w-full border border-[#b8860b]/30 bg-[#15120e] px-4 text-[#f0e8d7] outline-none placeholder:text-[#6d6255] focus:border-[#d5a21a] focus:ring-2 focus:ring-[#d5a21a]/25" /></div><div><label htmlFor="church-amount" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-[#8e8373]">Your price (USD)</label><div className="relative"><span className="pointer-events-none absolute left-4 top-3 text-[#8e8373]">$</span><input id="church-amount" type="number" min="0" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} className="min-h-12 w-full border border-[#b8860b]/30 bg-[#15120e] pl-8 pr-4 text-[#f0e8d7] outline-none focus:border-[#d5a21a] focus:ring-2 focus:ring-[#d5a21a]/25" /></div></div><button type="submit" disabled={delivery} className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 bg-[#d5a21a] px-5 font-display text-sm tracking-[0.14em] text-[#0a0908] transition hover:bg-[#edc448] disabled:cursor-not-allowed disabled:opacity-60 sm:mt-7">{delivery ? "PREPARING…" : Number(amount) > 0 ? "CONTINUE TO PAYMENT" : "GET THE MP3"} <ArrowDown className="h-4 w-4" aria-hidden="true" /></button></form><p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.13em] text-[#6f665a]">Your download link is private and delivered after you submit.</p></div></div></section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20"><div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8860b]">03 · Stay close</p><h2 className="mt-2 font-display text-5xl tracking-[0.08em] text-[#f4ecdf] sm:text-6xl">JOIN THE TRANSMISSION</h2></div><div className="border border-[#b8860b]/30 bg-[#15120e] p-6 sm:p-8">{submitted ? <div className="py-4"><div className="flex items-center gap-3 text-[#d5a21a]"><Send className="h-5 w-5" aria-hidden="true" /><p className="font-display text-3xl tracking-[0.1em]">YOU’RE IN</p></div><p className="mt-4 font-serif text-xl leading-relaxed text-[#c6b9a4]">The next transmission will find you directly.</p></div> : <><div className="flex items-center gap-3 text-[#d5a21a]"><Mail className="h-5 w-5" aria-hidden="true" /><p className="font-display text-3xl tracking-[0.1em]">THE VAULT, DELIVERED</p></div><p className="mt-4 max-w-xl font-serif text-xl leading-relaxed text-[#c6b9a4]">Get new music, visuals, and direct updates from MOSES SOG. No algorithms. No noise.</p><form className="mt-7 flex flex-col gap-3 sm:flex-row" onSubmit={submitEmail}><label className="sr-only" htmlFor="church-list-email">Email address</label><input id="church-list-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="your@email.com" className="min-h-12 flex-1 border border-[#b8860b]/35 bg-[#0a0908] px-4 font-mono text-sm text-[#f0e8d7] outline-none placeholder:text-[#6d6255] focus:border-[#d5a21a] focus:ring-2 focus:ring-[#d5a21a]/25" /><button type="submit" disabled={subscribeMutation.isPending} className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#d5a21a] px-6 font-display text-base tracking-[0.14em] text-[#0a0908]">{subscribeMutation.isPending ? "JOINING…" : "JOIN THE LIST"} <Send className="h-4 w-4" aria-hidden="true" /></button></form></>}</div></div></section>

      <footer className="border-t border-[#b8860b]/20 px-5 py-8 sm:px-8"><div className="mx-auto flex max-w-6xl flex-col gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[#706557] sm:flex-row sm:items-center sm:justify-between"><Link href="/music" className="inline-flex min-h-11 items-center gap-2 transition hover:text-[#f0e8d7]"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> All music</Link><p>CHURCH · MOSES SOG · Chicago</p></div></footer>
    </main>
  );
}
