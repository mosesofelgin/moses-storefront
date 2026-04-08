'use client';

import { useState } from 'react';
import { Lock, Play } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

export default function ClarityProject() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const createCheckoutMutation = trpc.checkout.createSession.useMutation();

  const tracks = [
    { id: 1, title: 'Final Prayer by Moses', duration: '3:42' },
    { id: 2, title: 'Wish I had you', duration: '3:15' },
    { id: 3, title: 'Get To The Studio', duration: '2:58' },
    { id: 4, title: 'Over', duration: '3:22' },
    { id: 5, title: 'Fade Away', duration: '3:45' },
    { id: 6, title: 'King', duration: '3:33' },
    { id: 7, title: 'Soulja', duration: '3:28' },
    { id: 8, title: 'Dear Kobe', duration: '3:12' },
    { id: 9, title: 'Refined', duration: '3:50' },
    { id: 10, title: 'Look At All These Blessings', duration: '3:41' },
    { id: 11, title: 'Platform', duration: '3:35' },
    { id: 12, title: 'Sweet Dreams', duration: '3:26' },
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
        window.open(result.url, '_blank');
        toast.success('Redirecting to checkout...');
        setShowCheckout(false);
      }
    } catch (error) {
      toast.error('Failed to create checkout session');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-neutral-800 bg-black/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bebas tracking-widest">MOSES</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bebas tracking-widest mb-4">
            10 years. One testimony. This is CLARITY.
          </h2>
          <p className="text-xl text-neutral-400 font-cormorant italic mb-8">
            A 12-song project from Moses—where faith, hip-hop, and the Midwest collide.
          </p>
          <p className="text-neutral-500 mb-8">
            Chicago × Elgin × Real Life × Real God
          </p>

          <div className="flex justify-center">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/ChatGPTImageMar31,2026,09_21_37PM_93a0c949.png"
              alt="CLARITY Album Cover"
              className="w-full max-w-sm rounded-lg shadow-2xl"
            />
          </div>
        </section>

        {/* Identity Section */}
        <section className="mb-16 bg-neutral-900/30 border border-neutral-800 p-8 rounded-lg">
          <h3 className="text-3xl font-bebas tracking-wide mb-6">This isn't for everybody.</h3>
          <p className="text-neutral-300 mb-4">
            This is for people who've been through something. Who have a story. A testimony.
          </p>
          <p className="text-neutral-300 mb-4">
            For those who love rap—but need something real. Something clean enough to live with. Something honest enough to grow with.
          </p>
          <p className="text-neutral-300">
            If you've ever been rebuilding your life, searching for direction, or walking with God while still loving the culture—this is for you.
          </p>
        </section>

        {/* What This Is */}
        <section className="mb-16">
          <h3 className="text-3xl font-bebas tracking-wide mb-6">More than music.</h3>
          <p className="text-neutral-300 mb-4">
            CLARITY is a 10-year journey. Recorded from the basement of Mount Pisgah Baptist Church. Built between the South Side of Chicago and Elgin, Illinois.
          </p>
          <p className="text-neutral-300 mb-4">
            It's where faith meets hip-hop, struggle meets purpose, and life becomes art.
          </p>
          <p className="text-neutral-300">
            This isn't just a project. It's part of a larger story. A trilogy. A transformation.
          </p>
        </section>

        {/* Tracklist Section */}
        <section className="mb-16">
          <h3 className="text-3xl font-bebas tracking-wide mb-8">12 Songs. Locked.</h3>
          <div className="space-y-3">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="flex items-center justify-between p-4 bg-neutral-900/50 border border-neutral-800 rounded hover:border-neutral-700 transition"
              >
                <div className="flex items-center flex-1">
                  <Lock className="w-4 h-4 text-neutral-600 mr-3" />
                  <div>
                    <p className="text-white font-dm-mono">{track.title}</p>
                    <p className="text-neutral-500 text-sm">{track.duration}</p>
                  </div>
                </div>
                <button disabled className="text-neutral-600 cursor-not-allowed">
                  <Play className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* What You Get */}
        <section className="mb-16 bg-neutral-900/30 border border-neutral-800 p-8 rounded-lg">
          <h3 className="text-2xl font-bebas tracking-wide mb-6">What you receive</h3>
          <ul className="space-y-3 text-neutral-300">
            <li className="flex items-start">
              <span className="text-red-500 mr-3">•</span>
                <span>Full 12-song digital album</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3">•</span>
              <span>Instant access after purchase</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3">•</span>
              <span>High-quality audio files</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3">•</span>
              <span>4 brand-aligned images</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3">•</span>
              <span>Final Prayer lyric book (PDF)</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3">•</span>
              <span>Direct connection to the artist</span>
            </li>
          </ul>
        </section>

        {/* Why Buy Direct */}
        <section className="mb-16">
          <h3 className="text-2xl font-bebas tracking-wide mb-6">Why buy direct</h3>
          <p className="text-neutral-300 mb-4">
            When you buy CLARITY: You own the project—not rent it. You support independent art directly. You become part of what's being built.
          </p>
          <p className="text-neutral-300">
            One purchase does more than thousands of streams ever could. This isn't about consumption. It's about alignment.
          </p>
        </section>

        {/* Artist Authority */}
        <section className="mb-16 bg-neutral-900/30 border border-neutral-800 p-8 rounded-lg">
          <h3 className="text-2xl font-bebas tracking-wide mb-6">Who is Moses?</h3>
          <p className="text-neutral-300 mb-4">
            MIT-certified. 10 years in the craft. Music rooted in faith. Recorded in the church.
          </p>
          <p className="text-neutral-300">
            Not separating God from the art. Not separating life from the music. Building something bigger than songs—something generational. For the culture. For the people. For the future.
          </p>
        </section>

        {/* CTA Section */}
        <section className="mb-16 text-center">
          <h3 className="text-3xl font-bebas tracking-wide mb-6">If this resonates, don't wait.</h3>
          <p className="text-neutral-400 mb-8">You already feel it. Now step into it.</p>
            <button
              onClick={() => setShowCheckout(true)}
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bebas tracking-wide text-lg transition-colors"
            >
              Get CLARITY — $12
            </button>
        </section>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg max-w-md w-full p-8">
            <h2 className="text-2xl font-bebas tracking-wide mb-6">Get CLARITY</h2>

            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-sm font-dm-mono text-neutral-400 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-neutral-800 rounded px-4 py-2 text-white focus:outline-none focus:border-red-600"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-dm-mono text-neutral-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-neutral-800 rounded px-4 py-2 text-white focus:outline-none focus:border-red-600"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="bg-black/50 border border-neutral-800 p-4 rounded mt-6 mb-6">
                <p className="text-sm text-neutral-400 mb-2">Order Summary</p>
                <div className="flex justify-between mb-2">
                  <span>CLARITY Album Bundle</span>
                  <span>$12.00</span>
                </div>
                <div className="border-t border-neutral-800 pt-2 mt-2 flex justify-between font-bebas">
                  <span>Total</span>
                  <span>$12.00</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 text-white font-bebas tracking-wide py-3 rounded transition-colors"
              >
                {isLoading ? 'Processing...' : 'Proceed to Checkout'}
              </button>

              <button
                type="button"
                onClick={() => setShowCheckout(false)}
                className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bebas tracking-wide py-3 rounded transition-colors"
              >
                Cancel
              </button>
            </form>

            <p className="text-xs text-neutral-500 text-center mt-6">
              Secure payment powered by Stripe. Your information is encrypted and safe.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
