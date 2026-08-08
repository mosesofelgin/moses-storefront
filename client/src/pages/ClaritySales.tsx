import { useState } from 'react';
import { Music, Play, ArrowRight, Loader2, Check } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

const CLARITY_COVER = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/album-cover_2118610e.png';

export default function ClaritySales() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const createCheckoutMutation = trpc.checkout.createSession.useMutation();

  const tracks = [
    { title: 'Final Prayer by Moses', duration: '3:42' },
    { title: 'Wish I had you', duration: '3:15' },
    { title: 'Get To The Studio', duration: '2:58' },
    { title: 'Over', duration: '3:22' },
    { title: 'Fade Away', duration: '3:45' },
    { title: 'King', duration: '3:33' },
    { title: 'Soulja', duration: '3:28' },
    { title: 'Dear Kobe', duration: '3:12' },
    { title: 'Refined', duration: '3:50' },
    { title: 'Look At All These Blessings', duration: '3:41' },
    { title: 'Platform', duration: '3:35' },
    { title: 'Sweet Dreams', duration: '3:26' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const result = await createCheckoutMutation.mutateAsync({
        customerEmail: formData.email,
        customerName: formData.name,
      });

      if (result.url) {
        setPurchaseComplete(true);
        toast.success('Redirecting to checkout...');
        setTimeout(() => {
          if (result.url) {
            window.open(result.url, '_blank');
          }
        }, 800);
      }
    } catch (error) {
      toast.error('Failed to create checkout session');
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0908] text-[#f0e8d7]">
      {/* ── HEADER ── */}
      <div className="sticky top-0 z-40 border-b border-[#3a3020] bg-[#0a0908]/95 backdrop-blur-sm px-4 py-3">
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#b8860b] uppercase">
            MOSES SOG
          </p>
        </div>
      </div>

      {/* ── HERO / PRODUCT SECTION ── */}
      <section className="px-4 py-8 border-b border-[#3a3020]">
        <div className="max-w-2xl mx-auto">
          {/* Album Cover */}
          <div className="mb-8">
            <div className="relative max-w-sm mx-auto">
              <div className="absolute inset-0 bg-[#b8860b]/15 blur-3xl rounded-2xl" />
              <img
                src={CLARITY_COVER}
                alt="CLARITY album cover"
                className="relative w-full rounded-2xl object-cover shadow-2xl border border-[#3a3020]"
              />
            </div>
          </div>

          {/* Title & Description */}
          <div className="text-center mb-8">
            <p className="font-mono text-[11px] tracking-[0.3em] text-[#b8860b] uppercase mb-3">
              New Album
            </p>
            <h1 className="font-bebas text-5xl tracking-widest text-[#f0e8d7] mb-3">
              CLARITY
            </h1>
            <p className="font-cormorant text-2xl italic text-[#c8b89a] mb-4">
              A 12-track journey of faith, discipline, and transformation
            </p>
            <p className="text-[#7a7060] text-sm leading-relaxed max-w-md mx-auto">
              This is more than music. This is a journey through confusion, surrender, discipline, and purpose. Built direct, owned, and real.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8 text-center">
            <div className="px-4 py-3 rounded-sm border border-[#3a3020] bg-[#0f0c0a]">
              <p className="font-bebas text-2xl text-[#b8860b]">12</p>
              <p className="text-[#7a7060] text-xs uppercase tracking-wider">Tracks</p>
            </div>
            <div className="px-4 py-3 rounded-sm border border-[#3a3020] bg-[#0f0c0a]">
              <p className="font-bebas text-2xl text-[#b8860b]">45m</p>
              <p className="text-[#7a7060] text-xs uppercase tracking-wider">Runtime</p>
            </div>
            <div className="px-4 py-3 rounded-sm border border-[#3a3020] bg-[#0f0c0a]">
              <p className="font-bebas text-2xl text-[#b8860b]">$12</p>
              <p className="text-[#7a7060] text-xs uppercase tracking-wider">Price</p>
            </div>
          </div>

          {/* Primary CTA */}
          <button
            onClick={() => setShowCheckout(true)}
            disabled={showCheckout || purchaseComplete}
            className="w-full px-6 py-4 bg-[#b8860b] hover:bg-[#d4a017] disabled:bg-[#7a5c08] disabled:cursor-not-allowed text-[#0a0908] font-bebas text-lg tracking-[0.2em] rounded-sm transition-all flex items-center justify-center gap-2 group mb-4"
          >
            {purchaseComplete ? (
              <>
                <Check className="w-5 h-5" />
                PURCHASE COMPLETE
              </>
            ) : (
              <>
                BUY NOW
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Secondary CTA */}
          <a
            href="/listen"
            className="block w-full px-6 py-3 border border-[#3a3020] bg-[#0f0c0a] hover:border-[#b8860b] hover:bg-[#b8860b]/5 text-[#f0e8d7] font-bebas text-base tracking-wider rounded-sm transition-all text-center"
            rel="noopener noreferrer"
          >
            Listen First
          </a>
        </div>
      </section>

      {/* ── TRACKLIST ── */}
      <section className="px-4 py-8 border-b border-[#3a3020]">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-bebas text-2xl tracking-wider text-[#f0e8d7] mb-6">
            TRACKLIST
          </h2>
          <div className="space-y-2">
            {tracks.map((track, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-sm border border-[#3a3020] bg-[#0f0c0a] hover:border-[#b8860b] hover:bg-[#b8860b]/5 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Play className="w-4 h-4 text-[#b8860b] flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[#f0e8d7] text-sm font-medium truncate">
                      {idx + 1}. {track.title}
                    </p>
                  </div>
                </div>
                <p className="text-[#7a7060] text-xs flex-shrink-0 ml-2">
                  {track.duration}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHECKOUT MODAL ── */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-8">
          <div className="w-full max-w-md bg-[#0f0c0a] border border-[#3a3020] rounded-lg p-6">
            <h3 className="font-bebas text-2xl tracking-wider text-[#f0e8d7] mb-6">
              COMPLETE YOUR PURCHASE
            </h3>

            {purchaseComplete ? (
              <div className="text-center py-8">
                <Check className="w-12 h-12 text-[#b8860b] mx-auto mb-4" />
                <p className="font-bebas text-xl text-[#b8860b] tracking-wider mb-2">
                  PURCHASE COMPLETE
                </p>
                <p className="text-[#7a7060] text-sm">
                  Check your email for confirmation and download link.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCheckout} className="space-y-4">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#c8b89a] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-[#0a0908] border border-[#3a3020] rounded-sm text-[#f0e8d7] placeholder-[#4a4030] focus:outline-none focus:border-[#b8860b] focus:ring-1 focus:ring-[#b8860b]/30 transition-all"
                    disabled={isLoading}
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#c8b89a] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-[#0a0908] border border-[#3a3020] rounded-sm text-[#f0e8d7] placeholder-[#4a4030] focus:outline-none focus:border-[#b8860b] focus:ring-1 focus:ring-[#b8860b]/30 transition-all"
                    disabled={isLoading}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-6 px-6 py-3 bg-[#b8860b] hover:bg-[#d4a017] disabled:bg-[#7a5c08] disabled:cursor-not-allowed text-[#0a0908] font-bebas text-base tracking-wider rounded-sm transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay $12 <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setShowCheckout(false)}
                  disabled={isLoading}
                  className="w-full px-6 py-2 border border-[#3a3020] text-[#7a7060] font-bebas text-sm tracking-wider rounded-sm hover:border-[#b8860b] hover:text-[#b8860b] transition-all disabled:opacity-50"
                >
                  Cancel
                </button>

                {/* Info Text */}
                <p className="text-center text-xs text-[#3a3020] mt-4">
                  You will be redirected to Stripe to complete payment securely.
                </p>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer className="px-4 py-6 border-t border-[#3a3020] bg-[#0f0c0a] text-center">
        <p className="text-[#3a3020] text-[10px] tracking-wide">
          Direct from MOSES · Chicago
        </p>
      </footer>
    </div>
  );
}
