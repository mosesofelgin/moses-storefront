import { useState } from "react";
import { ArrowDown, ArrowLeft, Crown, Mail, Play, Send, Youtube } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";
import DownloadButton from "@/components/DownloadButton";
import { trpc } from "@/lib/trpc";

const MP3_URL = "/manus-storage/THEPRINCE_ec280adc.mp3";

// Supplied YouTube URL: https://youtu.be/bq44Ga7xovw
const YOUTUBE_VIDEO_ID = "bq44Ga7xovw";

function youtubeEmbedUrl(videoId: string) {
  return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0` : null;
}

export default function ThePrince() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const subscribeMutation = trpc.subscribe.addEmail.useMutation();
  const embedUrl = youtubeEmbedUrl(YOUTUBE_VIDEO_ID);

  const submitEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;

    try {
      const result = await subscribeMutation.mutateAsync({ email: email.trim() });
      if (result.success) {
        setSubmitted(true);
        setEmail("");
        toast.success("You are on the list.");
      } else {
        toast.error(result.message || "Could not join the list. Please try again.");
      }
    } catch (error) {
      console.error("THEPRINCE signup error:", error);
      toast.error("Could not join the list. Please try again.");
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#0a0908] text-[#f0e8d7]">
      <section className="relative border-b border-[#b8860b]/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(184,134,11,0.17),transparent_35%),radial-gradient(circle_at_12%_78%,rgba(70,42,20,0.28),transparent_35%)]" />
        <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-7 sm:px-8 sm:pb-20 sm:pt-9">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="inline-flex min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#aa9c86] transition hover:text-[#f0e8d7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d5a21a]">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to the Vault
            </Link>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#b8860b]">New transmission</p>
          </div>

          <div className="grid items-end gap-10 pt-20 lg:grid-cols-[1fr_0.8fr] lg:pt-28">
            <div>
              <div className="mb-6 flex items-center gap-3 text-[#d5a21a]">
                <Crown className="h-5 w-5" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-[0.22em]">MOSES SOG · THEPRINCE</span>
              </div>
              <h1 className="max-w-4xl font-display text-[clamp(4.5rem,17vw,11rem)] leading-[0.78] tracking-[0.02em] text-[#f4ecdf]">THE<br />PRINCE</h1>
              <p className="mt-8 max-w-xl font-serif text-2xl italic leading-snug text-[#c6b9a4] sm:text-3xl">Watch the visual. Take the song with you.</p>
              <p className="mt-5 max-w-xl font-mono text-xs uppercase leading-6 tracking-[0.12em] text-[#8e8373]">A free visual and MP3 release from the MOSES SOG vault.</p>
            </div>
            <div className="justify-self-start border-l border-[#b8860b]/40 pl-5 lg:justify-self-end lg:pl-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8e8373]">Direct release</p>
              <p className="mt-3 max-w-xs font-serif text-xl leading-relaxed text-[#d9cdbd]">No middleman. No paywall. Just the work, delivered directly.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8860b]">01 · The visual</p>
            <h2 className="mt-2 font-display text-4xl tracking-[0.08em] text-[#f4ecdf] sm:text-5xl">WATCH THE VIDEO</h2>
          </div>
          <Youtube className="hidden h-6 w-6 text-[#b8860b] sm:block" aria-hidden="true" />
        </div>

        <div className="relative aspect-video overflow-hidden border border-[#b8860b]/35 bg-[#15120e] shadow-[0_24px_90px_rgba(0,0,0,0.46)]">
          {embedUrl ? (
            <iframe
              className="h-full w-full"
              src={embedUrl}
              title="THEPRINCE by MOSES SOG"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,rgba(184,134,11,0.15),transparent_45%)] px-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d5a21a]/60 text-[#d5a21a]">
                <Play className="ml-1 h-6 w-6" aria-hidden="true" />
              </div>
              <p className="mt-6 font-display text-3xl tracking-[0.1em] text-[#f0e8d7] sm:text-4xl">YOUTUBE SPACE RESERVED</p>
              <p className="mt-3 max-w-md font-serif text-lg italic leading-relaxed text-[#a99c89]">The embedded THEPRINCE visual will live here as soon as the YouTube upload is ready.</p>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#776d60]">The visual will appear here after the YouTube upload is live</p>
            </div>
          )}
        </div>
        {embedUrl && (
          <div className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#776d60]">If the player is restricted in your browser, watch directly on YouTube.</p>
            <a href={`https://youtu.be/${YOUTUBE_VIDEO_ID}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 border border-[#b8860b]/35 px-4 font-display text-sm tracking-[0.12em] text-[#d5a21a] transition hover:border-[#d5a21a] hover:text-[#f0e8d7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0e8d7]">
              WATCH ON YOUTUBE <Youtube className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        )}
      </section>

      <section className="border-y border-[#b8860b]/20 bg-[#110e0b]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8860b]">02 · The audio</p>
            <h2 className="mt-2 font-display text-5xl tracking-[0.08em] text-[#f4ecdf] sm:text-6xl">TAKE THE MP3</h2>
            <p className="mt-4 max-w-md font-serif text-xl leading-relaxed text-[#c6b9a4]">Download THEPRINCE free. Keep the song close and pass it to somebody who needs the message.</p>
          </div>
          <div className="border border-[#b8860b]/30 bg-[#0a0908] p-5 sm:p-7">
            <div className="flex items-center justify-between gap-4 border-b border-[#b8860b]/20 pb-5">
              <div>
                <p className="font-display text-3xl tracking-[0.12em] text-[#f0e8d7]">THEPRINCE</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#817666]">MOSES SOG · MP3</p>
              </div>
              <ArrowDown className="h-5 w-5 text-[#d5a21a]" aria-hidden="true" />
            </div>
            <audio className="mt-6 w-full accent-[#d5a21a]" controls preload="metadata" src={MP3_URL} aria-label="THEPRINCE audio preview by MOSES SOG">
              Your browser does not support the audio player.
            </audio>
            <DownloadButton href={MP3_URL} filename="THEPRINCE.mp3" label="FREE MP3 DOWNLOAD" variant="primary" size="lg" className="mt-5 w-full bg-[#d5a21a] text-[#0a0908] hover:bg-[#edc448]" />
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-[#6f665a]">No email required to download · Free from MOSES</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#b8860b]">03 · Stay close</p>
            <h2 className="mt-2 font-display text-5xl tracking-[0.08em] text-[#f4ecdf] sm:text-6xl">JOIN THE TRANSMISSION</h2>
          </div>
          <div className="border border-[#b8860b]/30 bg-[#15120e] p-6 sm:p-8">
            {submitted ? (
              <div className="py-4">
                <div className="flex items-center gap-3 text-[#d5a21a]"><Send className="h-5 w-5" aria-hidden="true" /><p className="font-display text-3xl tracking-[0.1em]">YOU’RE IN</p></div>
                <p className="mt-4 font-serif text-xl leading-relaxed text-[#c6b9a4]">The next transmission will find you directly.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 text-[#d5a21a]"><Mail className="h-5 w-5" aria-hidden="true" /><p className="font-display text-3xl tracking-[0.1em]">THE VAULT, DELIVERED</p></div>
                <p className="mt-4 max-w-xl font-serif text-xl leading-relaxed text-[#c6b9a4]">Get new music, visuals, and direct updates from MOSES SOG. No algorithms. No noise.</p>
                <form className="mt-7 flex flex-col gap-3 sm:flex-row" onSubmit={submitEmail}>
                  <label className="sr-only" htmlFor="theprince-email">Email address</label>
                  <input id="theprince-email" name="email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="your@email.com" disabled={subscribeMutation.isPending} className="min-h-12 flex-1 border border-[#b8860b]/35 bg-[#0a0908] px-4 font-mono text-sm text-[#f0e8d7] outline-none placeholder:text-[#6d6255] focus:border-[#d5a21a] focus:ring-2 focus:ring-[#d5a21a]/25 disabled:opacity-60" />
                  <button type="submit" disabled={subscribeMutation.isPending} className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#d5a21a] px-6 font-display text-base tracking-[0.14em] text-[#0a0908] transition hover:bg-[#edc448] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0e8d7] disabled:cursor-not-allowed disabled:opacity-60">{subscribeMutation.isPending ? "JOINING…" : "JOIN THE LIST"} <Send className="h-4 w-4" aria-hidden="true" /></button>
                </form>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.13em] text-[#706557]">Direct from MOSES · Unsubscribe anytime</p>
              </>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#b8860b]/20 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[#706557] sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 transition hover:text-[#f0e8d7]"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to the Vault</Link>
          <p>THEPRINCE · MOSES SOG · Chicago</p>
        </div>
      </footer>
    </main>
  );
}
