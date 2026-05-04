import { Link } from 'wouter';
import {
  ArrowRight,
  Mail,
  Youtube,
  Instagram,
  Twitter,
  Tv,
  Music2,
  Video,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { trpc } from '../lib/trpc';

const SOCIALS = [
  {
    platform: 'YouTube',
    handle: '@mosessog',
    purpose: 'Music, visuals, and live sessions.',
    href: 'https://youtube.com/@mosessog',
    icon: Youtube,
    hover: 'hover:border-red-500 hover:text-red-400',
  },
  {
    platform: 'Instagram',
    handle: '@moses_sog',
    purpose: 'Daily updates, clips, and moments.',
    href: 'https://instagram.com/moses_sog',
    icon: Instagram,
    hover: 'hover:border-pink-500 hover:text-pink-400',
  },
  {
    platform: 'TikTok',
    handle: '@mosessog',
    purpose: 'Short-form music and message.',
    href: 'https://tiktok.com/@mosessog',
    icon: Music2,
    hover: 'hover:border-zinc-300 hover:text-zinc-200',
  },
  {
    platform: 'Twitch',
    handle: 'mosessog',
    purpose: 'Live performances and community.',
    href: 'https://twitch.tv/mosessog',
    icon: Tv,
    hover: 'hover:border-purple-500 hover:text-purple-400',
  },
  {
    platform: 'X / Twitter',
    handle: 'sogmoses',
    purpose: 'Thoughts, updates, and conversation.',
    href: 'https://x.com/sogmoses',
    icon: Twitter,
    hover: 'hover:border-zinc-300 hover:text-zinc-200',
  },
  {
    platform: 'Email',
    handle: 'wtgexodus@gmail.com',
    purpose: 'Direct contact and booking.',
    href: 'mailto:wtgexodus@gmail.com',
    icon: Mail,
    hover: 'hover:border-green-500 hover:text-green-400',
  },
];

const BENEFITS = [
  'Early updates on new music and releases',
  'Invites to live sessions and performances',
  'Behind-the-scenes reflections and moments',
  'Direct connection with MOSES SOG',
  'No algorithms — straight to your inbox',
];

export default function Connect() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const subscribeMutation = trpc.subscribe.addEmail.useMutation();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setLoading(true);
    try {
      const result = await subscribeMutation.mutateAsync({ email });
      if (result.success) {
        setSubmitted(true);
        setEmail('');
      } else {
        toast.error(result.message || 'Failed to sign up. Please try again.');
      }
    } catch (error) {
      console.error('Subscribe error:', error);
      toast.error('Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">

      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className="border-b border-zinc-800 px-4 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
            Clarity Season 1 · April 2026
          </p>
          <h1 className="mb-4 font-bebas text-[clamp(3rem,12vw,6rem)] leading-none tracking-wide">
            Stay close to the journey.
          </h1>
          <p className="text-sm leading-relaxed text-zinc-400 md:text-base">
            Join the CLARITY community for updates, releases, live sessions, and
            behind-the-scenes moments from MOSES SOG.
          </p>
        </div>
      </section>

      {/* ── 2. EMAIL SIGNUP ─────────────────────────────────────── */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-xl">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
            {submitted ? (
              <div className="py-6 text-center">
                <div className="mb-3 font-bebas text-3xl tracking-wide text-green-400">
                  You're in.
                </div>
                <p className="text-zinc-400">Welcome to the CLARITY community.</p>
              </div>
            ) : (
              <>
                <h2 className="mb-2 font-bebas text-3xl tracking-wide text-green-400">
                  Join the Community
                </h2>
                <p className="mb-6 text-sm text-zinc-400">
                  Direct updates. No middlemen. Unsubscribe anytime.
                </p>

                {/* Benefits */}
                <ul className="mb-8 space-y-2">
                  {BENEFITS.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-zinc-400">
                      <span className="mt-0.5 text-green-500">→</span>
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Form */}
                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition focus:border-green-500"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-3 font-bebas text-lg tracking-wide text-black transition-colors hover:bg-green-400 disabled:opacity-50"
                  >
                    {loading ? 'Joining...' : <>Join the Community <ArrowRight className="h-4 w-4" /></>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── 3. SOCIAL LINKS ─────────────────────────────────────── */}
      <section className="border-t border-zinc-800 bg-zinc-900/40 px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-center font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
            Find MOSES SOG
          </p>
          <h2 className="mb-10 text-center font-bebas text-4xl tracking-wide">
            Connect on Every Platform
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SOCIALS.map(({ platform, handle, purpose, href, icon: Icon, hover }) => (
              <a
                key={platform}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className={`group flex items-start gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition-colors ${hover}`}
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-zinc-500 transition-colors group-hover:text-inherit" />
                <div>
                  <div className="font-bebas text-lg tracking-wide">{platform}</div>
                  <div className="mb-1 font-mono text-xs text-zinc-500">{handle}</div>
                  <p className="text-xs leading-relaxed text-zinc-400">{purpose}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. LIVE / EVENTS ────────────────────────────────────── */}
      <section className="border-t border-zinc-800 px-4 py-20">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
            <div className="mb-2 flex items-center gap-3">
              <Video className="h-5 w-5 text-zinc-500" />
              <h2 className="font-bebas text-3xl tracking-wide">Live Sessions &amp; Updates</h2>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-zinc-400">
              Upcoming live sessions, performances, and community moments will be shared
              here and through the email list.
            </p>
            <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-5 py-4">
              <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                Next date coming soon
              </p>
              <p className="mt-1 text-sm text-zinc-300">
                Subscribe above to be the first to know when the next session is scheduled.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. DIRECT CONTACT ───────────────────────────────────── */}
      <section className="border-t border-zinc-800 bg-zinc-900/40 px-4 py-20 text-center">
        <div className="mx-auto max-w-xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
            Direct Contact
          </p>
          <h2 className="mb-4 font-bebas text-4xl tracking-wide">Get in Touch</h2>
          <p className="mb-8 text-sm leading-relaxed text-zinc-400">
            For booking, collaborations, church events, workshops, or media inquiries:
          </p>
          <a
            href="mailto:wtgexodus@gmail.com"
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-7 py-3.5 font-bebas text-lg tracking-wide text-zinc-100 transition-colors hover:bg-zinc-700"
          >
            <Mail className="h-4 w-4" />
            Send an Email
          </a>
          <p className="mt-4 font-mono text-xs text-zinc-600">wtgexodus@gmail.com</p>
        </div>
      </section>

      {/* ── 6. FOOTER ───────────────────────────────────────────── */}
      <footer className="border-t border-zinc-800 px-4 py-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <nav className="flex flex-wrap justify-center gap-6 font-mono text-xs uppercase tracking-widest text-zinc-500 md:justify-start">
            {[
              { label: 'Home', href: '/' },
              { label: 'Listen', href: '/listen' },
              { label: 'Store', href: '/store' },
              { label: 'Connect', href: '/connect' },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="transition-colors hover:text-zinc-300">
                {label}
              </Link>
            ))}
          </nav>
          <p className="font-mono text-xs text-zinc-600">© 2026 MOSES SOG</p>
        </div>
      </footer>
    </div>
  );
}
