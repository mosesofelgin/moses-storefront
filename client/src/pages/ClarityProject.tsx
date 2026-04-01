import { useState } from 'react';
import { Lock, Play } from 'lucide-react';
import { CLARITY_TRACKS } from '@/data/clarity-tracks';

export default function ClarityProject() {
  const [isPurchased, setIsPurchased] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [pricingMode, setPricingMode] = useState<'fixed' | 'flexible'>('fixed');
  const [customPrice, setCustomPrice] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  const handlePurchase = (mode: 'fixed' | 'flexible') => {
    setPricingMode(mode);
    if (mode === 'fixed') {
      // Simulate purchase
      setIsPurchased(true);
      setShowPricingModal(false);
      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 3000);
    } else {
      setShowPricingModal(true);
    }
  };

  const handleFlexiblePriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(customPrice);
    if (price >= 8) {
      setIsPurchased(true);
      setShowPricingModal(false);
      setCustomPrice('');
      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-neutral-800 bg-black/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bebas tracking-widest">MOSES</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Album Cover */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-sm">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/ChatGPTImageMar31,2026,09_21_37PM_24a5bc71.png"
                alt="Clarity Album"
                className="w-full aspect-square object-cover rounded-lg"
              />
              {!isPurchased && (
                <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                  <Lock className="w-16 h-16 text-white/60" />
                </div>
              )}
            </div>

            {/* Purchase Button */}
            {!isPurchased && (
              <div className="mt-8 w-full max-w-sm space-y-3">
                <button
                  onClick={() => handlePurchase('fixed')}
                  className="w-full bg-white text-black py-3 rounded font-bebas text-lg tracking-wide hover:bg-neutral-200 transition-colors"
                >
                  BUY NOW — $8
                </button>
                <button
                  onClick={() => handlePurchase('flexible')}
                  className="w-full border border-neutral-600 py-3 rounded font-bebas text-lg tracking-wide hover:border-neutral-400 transition-colors"
                >
                  NAME YOUR PRICE
                </button>
              </div>
            )}

            {isPurchased && (
              <div className="mt-8 w-full max-w-sm">
                <div className="bg-neutral-900 border border-neutral-700 p-4 rounded text-center">
                  <p className="text-green-400 font-bebas tracking-wide">✓ UNLOCKED</p>
                  <p className="text-neutral-400 text-sm font-dm-mono mt-2">
                    All tracks are now available
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Tracklist */}
          <div>
            <div className="mb-8">
              <h2 className="font-bebas text-4xl tracking-widest mb-2">CLARITY</h2>
              <p className="text-neutral-400 font-cormorant text-lg italic">
                Album — 12 Tracks
              </p>
              <div className="w-12 h-px bg-neutral-700 mt-4"></div>
            </div>

            <div className="space-y-3">
              {CLARITY_TRACKS.map((track) => (
                <div
                  key={track.id}
                  className={`border border-neutral-800 p-4 rounded transition-all ${
                    isPurchased
                      ? 'hover:border-neutral-600 cursor-pointer group'
                      : 'opacity-75'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {isPurchased ? (
                      <button className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                        <Play className="w-4 h-4 fill-current" />
                      </button>
                    ) : (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-neutral-600" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="font-dm-mono text-sm">
                        <span className="text-neutral-500">{track.id.toString().padStart(2, '0')}.</span>{' '}
                        {track.title}
                      </p>
                    </div>

                    <span className="text-neutral-500 font-dm-mono text-sm flex-shrink-0">
                      {track.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {!isPurchased && (
              <div className="mt-8 p-6 bg-neutral-900 border border-neutral-800 rounded">
                <p className="text-neutral-400 text-sm font-dm-mono text-center">
                  Purchase to unlock all tracks and stream directly
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Name Your Price Modal */}
      {showPricingModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-lg max-w-md w-full p-8">
            <h3 className="font-bebas text-2xl tracking-wide mb-6">NAME YOUR PRICE</h3>
            <form onSubmit={handleFlexiblePriceSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-dm-mono text-neutral-400 mb-2">
                  Price (minimum $8)
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400">$</span>
                  <input
                    type="number"
                    value={customPrice}
                    onChange={(e) => setCustomPrice(e.target.value)}
                    min="8"
                    step="0.01"
                    placeholder="8.00"
                    required
                    className="flex-1 bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
                  />
                </div>
                <p className="text-xs text-neutral-500 font-dm-mono mt-2">
                  Support the artist by paying more than the minimum
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowPricingModal(false);
                    setCustomPrice('');
                  }}
                  className="flex-1 border border-neutral-700 py-2 rounded font-dm-mono text-sm hover:border-neutral-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!customPrice || parseFloat(customPrice) < 8}
                  className="flex-1 bg-white text-black py-2 rounded font-dm-mono text-sm font-semibold hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Purchase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Thank You Message */}
      {showThankYou && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-lg max-w-md w-full p-8 text-center">
            <div className="mb-4 text-4xl">✓</div>
            <h3 className="font-bebas text-2xl tracking-wide mb-2">THANK YOU</h3>
            <p className="text-neutral-400 font-dm-mono text-sm">
              Your purchase is complete. Enjoy Clarity!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
