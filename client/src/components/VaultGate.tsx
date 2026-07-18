import { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { Loader2, ArrowRight } from 'lucide-react';

const HERO_IMAGE = '/manus-storage/TOP_02_2eb4481e.jpg';
const STORAGE_KEY = 'moses_vault_unlocked';

interface VaultGateProps {
  onUnlock: () => void;
}

export default function VaultGate({ onUnlock }: VaultGateProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'submitting' | 'unlocking'>('idle');

  const subscribeMutation = trpc.subscribe.addEmail.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isLoading) return;

    setIsLoading(true);
    setPhase('submitting');

    try {
      await subscribeMutation.mutateAsync({ email });
      // Store unlock in localStorage so returning visitors skip the gate
      localStorage.setItem(STORAGE_KEY, '1');
      setPhase('unlocking');
      // Brief pause to show the unlock animation, then open the vault
      setTimeout(() => {
        onUnlock();
      }, 1400);
    } catch (err: unknown) {
      // If already subscribed, still let them in
      const msg = err instanceof Error ? err.message : '';
      if (msg.includes('duplicate') || msg.includes('already') || msg.includes('UNIQUE')) {
        localStorage.setItem(STORAGE_KEY, '1');
        setPhase('unlocking');
        setTimeout(() => onUnlock(), 1400);
      } else {
        toast.error('Something went wrong. Try again.');
        setIsLoading(false);
        setPhase('idle');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#0a0908]">

      {/* ── Full-bleed background photo ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
      />
      {/* Layered overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-[#0a0908]/70 to-[#0a0908]/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0908]/60 via-transparent to-[#0a0908]/60" />

      {/* ── Ambient glow ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#b8860b]/10 blur-[100px] rounded-full pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-6 text-center">

        {phase === 'unlocking' ? (
          /* ── Unlock animation ── */
          <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="w-20 h-20 rounded-full border-2 border-[#b8860b] flex items-center justify-center bg-[#b8860b]/10">
              <svg viewBox="0 0 24 24" className="w-9 h-9 text-[#b8860b] fill-current animate-in zoom-in duration-300">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
            </div>
            <div>
              <p className="font-bebas text-3xl tracking-[0.3em] text-[#b8860b]">THE VAULT IS OPEN</p>
              <p className="text-[#a09880] text-sm mt-2 font-cormorant italic">Welcome to the covenant.</p>
            </div>
          </div>
        ) : (
          /* ── Gate form ── */
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Logo / Name */}
            <p className="font-mono text-[11px] tracking-[0.4em] text-[#b8860b] uppercase mb-6">
              MOSES SOG · CHICAGO
            </p>

            {/* Headline */}
            <h1 className="font-bebas text-[clamp(3.5rem,14vw,7rem)] leading-none tracking-widest text-[#f0e8d7] mb-4">
              THE VAULT
            </h1>

            {/* Subheading */}
            <p className="font-cormorant text-xl sm:text-2xl italic text-[#c8b89a] mb-3 leading-snug">
              Prophetic Hip-Hop from Chicago
            </p>

            {/* Description */}
            <p className="text-[#7a7060] text-sm sm:text-base leading-relaxed mb-10 max-w-sm mx-auto">
              Music. Projects. Exclusive content. Enter your email for access.
            </p>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={isLoading}
                autoFocus
                className="w-full px-5 py-4 bg-[#0a0908]/80 border border-[#3a3020] rounded-sm text-[#f0e8d7] placeholder-[#4a4030] focus:outline-none focus:border-[#b8860b] focus:ring-1 focus:ring-[#b8860b]/30 transition-all text-base disabled:opacity-50 backdrop-blur-sm"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-4 bg-[#b8860b] hover:bg-[#d4a017] disabled:bg-[#7a5c08] disabled:cursor-not-allowed text-[#0a0908] font-bebas text-lg tracking-[0.2em] rounded-sm transition-all flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    ENTER THE VAULT
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Fine print */}
            <p className="mt-6 text-[#3a3020] text-xs tracking-wide">
              Direct from MOSES. No spam. Unsubscribe anytime.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/** Returns true if the visitor has already unlocked the vault */
export function isVaultUnlocked(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}
