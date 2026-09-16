import { useState } from "react";
import { trpc } from "@/lib/trpc";

const GUIDE_PDF = "/manus-storage/ai-without-the-fear_7d7e0e65.pdf";
const GUIDE_COVER = "/manus-storage/ebook-cover_fa7f9393.jpg";

const benefits = [
  "Whether AI is actually coming for your job — and which parts of it",
  "How to spot AI-generated misinformation and deepfakes before they fool you",
  "What is really happening to your data — and how much control you actually have",
  "Why AI systems can be biased, and what that means for decisions made about you",
  "The real-world cost of AI: data centers, energy, and communities",
  "How AI is changing cybercrime — and cyber defense",
  "The line between using AI as a tool and leaning on it as a crutch",
  "A practical framework for evaluating any AI claim or tool for yourself",
];

export default function AiWithoutFear() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const subscribe = trpc.subscribe.addEmail.useMutation();

  const deliverGuide = () => {
    const link = document.createElement("a");
    link.href = GUIDE_PDF;
    link.download = "AI-Without-the-Fear.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    try {
      const result = await subscribe.mutateAsync({
        firstName: firstName.trim(),
        email: email.trim(),
        source: "ai_without_fear",
      });
      if (result.success || result.message === "Already subscribed") {
        setSubmitted(true);
        deliverGuide();
      } else {
        setError(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("We couldn't send the guide yet. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#111827] selection:bg-[#1c3faa]/15 selection:text-[#142c77]">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
        <header className="flex items-center justify-between border-b border-[#dbe3f4] pb-5">
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#1c3faa]">New Covenant Enterprises</p>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-slate-500">A clear-eyed guide to AI</p>
        </header>

        <section className="grid items-center gap-12 border-b border-[#dbe3f4] py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:py-24">
          <div>
            <p className="mb-6 font-sans text-xs font-bold uppercase tracking-[0.22em] text-[#1c3faa]">Free guide · written by Moses</p>
            <h1 className="max-w-3xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-[#101828] sm:text-6xl lg:text-7xl">AI isn&apos;t going away. Fear doesn&apos;t have to come with it.</h1>
            <p className="mt-7 max-w-2xl font-serif text-xl leading-relaxed text-slate-600 sm:text-2xl">Stop guessing about AI and start thinking clearly about it. <em>AI Without the Fear</em> is a plain-language guide to the real risks, tradeoffs, and decisions that matter.</p>
            <p className="mt-6 max-w-xl font-sans text-sm leading-7 text-slate-500">No hype. No panic. No 100-slide lecture. Just practical discernment for people building something of their own.</p>
            <a href="#get-the-guide" className="mt-9 inline-flex min-h-12 items-center justify-center bg-[#1c3faa] px-7 py-4 font-sans text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#16328b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1c3faa] focus-visible:ring-offset-4">Get the free guide</a>
          </div>

          <div className="mx-auto w-full max-w-[300px] lg:max-w-[340px]">
            <div className="relative rotate-[2deg] border border-[#b9c7e4] bg-[#f6f8fc] p-3 shadow-[18px_22px_0_#e8edf7]">
              <img src={GUIDE_COVER} alt="AI Without the Fear ebook cover" className="block aspect-[3/4] w-full object-cover" />
            </div>
            <p className="mt-8 text-center font-sans text-[10px] uppercase tracking-[0.2em] text-slate-400">A free guide from New Covenant Enterprises</p>
          </div>
        </section>

        <section className="grid gap-12 border-b border-[#dbe3f4] py-14 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-[#1c3faa]">Inside the guide</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] text-[#101828] sm:text-5xl">Understand what&apos;s real before you decide what to do.</h2>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex gap-4 border-t border-[#dbe3f4] pt-4 font-serif text-lg leading-snug text-slate-700">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#1c3faa]" aria-hidden="true" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-10 border-b border-[#dbe3f4] py-14 sm:py-20 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-[#1c3faa]">Why this guide</p>
          <div className="max-w-3xl">
            <p className="font-serif text-3xl leading-tight tracking-[-0.025em] text-[#101828] sm:text-4xl">Moses is an MIT-certified AI strategist who has taught AI literacy labs in real high school classrooms on Chicago&apos;s South Side.</p>
            <p className="mt-6 font-serif text-lg leading-8 text-slate-600">This guide comes directly out of that curriculum. He builds his own tools, his own website, and his own systems — so the conversation is grounded in practice, not performance.</p>
          </div>
        </section>

        <section id="get-the-guide" className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.22em] text-[#1c3faa]">Get the guide</p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight tracking-[-0.03em] text-[#101828] sm:text-5xl">A clearer relationship with AI starts here.</h2>
            <p className="mt-5 max-w-lg font-serif text-lg leading-8 text-slate-600">Leave your first name and email. The PDF will download immediately, and you&apos;ll receive occasional real talk about AI literacy, financial literacy, and investing.</p>
          </div>

          <div className="border border-[#b9c7e4] bg-[#f6f8fc] p-6 sm:p-8">
            {submitted ? (
              <div className="py-5" aria-live="polite">
                <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#1c3faa]">It&apos;s on its way</p>
                <h3 className="mt-3 font-serif text-3xl text-[#101828]">Your guide is downloading.</h3>
                <p className="mt-4 font-serif text-lg leading-7 text-slate-600">If the download didn&apos;t start, use the button below.</p>
                <button type="button" onClick={deliverGuide} className="mt-6 inline-flex min-h-12 items-center justify-center bg-[#1c3faa] px-6 py-4 font-sans text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#16328b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1c3faa] focus-visible:ring-offset-2">Download the guide</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="ai-guide-name" className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-slate-600">First name</label>
                  <input id="ai-guide-name" name="firstName" type="text" autoComplete="given-name" required value={firstName} onChange={(event) => setFirstName(event.target.value)} className="mt-2 min-h-12 w-full border border-slate-300 bg-white px-4 font-serif text-lg text-[#101828] outline-none transition focus:border-[#1c3faa] focus:ring-2 focus:ring-[#1c3faa]/20" />
                </div>
                <div>
                  <label htmlFor="ai-guide-email" className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-slate-600">Email address</label>
                  <input id="ai-guide-email" name="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 min-h-12 w-full border border-slate-300 bg-white px-4 font-serif text-lg text-[#101828] outline-none transition focus:border-[#1c3faa] focus:ring-2 focus:ring-[#1c3faa]/20" />
                </div>
                {error && <p role="alert" className="font-sans text-sm text-red-700">{error}</p>}
                <button type="submit" disabled={subscribe.isPending} className="min-h-12 w-full bg-[#1c3faa] px-5 py-4 font-sans text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#16328b] disabled:cursor-wait disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1c3faa] focus-visible:ring-offset-2">{subscribe.isPending ? "Sending the guide…" : "Send Me the Free Guide"}</button>
                <p className="font-sans text-xs leading-5 text-slate-500">No spam. Just the guide, and occasional real talk about AI.</p>
              </form>
            )}
          </div>
        </section>

        <footer className="border-t border-[#dbe3f4] pt-6 font-sans text-xs leading-6 text-slate-500 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <p className="font-bold uppercase tracking-[0.16em] text-[#1c3faa]">New Covenant Enterprises</p>
          <p>Building clarity through AI literacy, financial literacy, and investing.</p>
        </footer>
      </div>
    </main>
  );
}
