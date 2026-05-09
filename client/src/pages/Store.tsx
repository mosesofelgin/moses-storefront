import { Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { useState } from 'react';
import { Check, X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  minPrice: number;
  badge?: string;
  details?: string[];
  isPayWhatYouWant?: boolean;
}

const PRODUCTS: Product[] = [
  {
    id: 'bathsheba',
    name: 'Bathsheba',
    description: '10-track project - a royal journey',
    minPrice: 0,
    badge: 'FREE',
    isPayWhatYouWant: true,
    details: [
      'All 10 Bathsheba tracks',
      'Direct download',
      'No email required',
      'Lifetime access',
      'Support the artist',
    ],
  },
  {
    id: 'dedication',
    name: 'Dedication',
    description: '14-track mixtape - homage to Lil Wayne',
    minPrice: 0,
    badge: 'FREE',
    isPayWhatYouWant: true,
    details: [
      'All 14 Dedication tracks',
      'Direct download',
      'No email required',
      'Lifetime access',
      'Support the artist',
    ],
  },
  {
    id: 'mixtape',
    name: 'If I Wrote A Mixtape',
    description: '30-track free mixtape - before the lockdown season',
    minPrice: 0,
    badge: 'FREE',
    isPayWhatYouWant: true,
    details: [
      'All 30 tracks',
      'Direct download',
      'No email required',
      'Lifetime access',
      'Support the artist',
    ],
  },
  {
    id: 'new-genesis',
    name: 'New Genesis',
    description: '15-track project - a return to the source',
    minPrice: 12,
    badge: 'PAY WHAT YOU WANT',
    isPayWhatYouWant: true,
    details: [
      'All 15 New Genesis tracks',
      'Direct download',
      'Lifetime access',
      '$12 = support the mission',
      'Free download always available',
    ],
  },
  {
    id: 'clarity',
    name: 'Clarity',
    description: '12-track digital album - truth-driven music rooted in alignment',
    minPrice: 12,
    badge: 'PAY WHAT YOU WANT',
    isPayWhatYouWant: true,
    details: [
      'All 12 CLARITY tracks',
      '4 brand images (high-res)',
      'Lyric book PDF',
      'Lifetime access',
      '$12 = 3,000 streams worth',
    ],
  },
];

export default function Store() {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const createCheckout = trpc.checkout.createSession.useMutation();
  const createFreeOrder = trpc.checkout.createFreeOrder.useMutation();

  const handleBuyClick = (product: Product) => {
    setSelectedProduct(product);
    setShowCheckoutModal(true);
    setCustomAmount(product.minPrice.toString());
    setEmail('');
    setName('');
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!selectedProduct?.isPayWhatYouWant) {
      toast.error('Invalid product');
      return;
    }

    if (!customAmount || isNaN(parseFloat(customAmount))) {
      toast.error('Please enter a valid amount');
      return;
    }

    const amountInCents = Math.round(parseFloat(customAmount) * 100);

    // If $0, create free order
    if (amountInCents === 0) {
      setLoading(true);
      try {
        await createFreeOrder.mutateAsync({
          customerEmail: email,
          customerName: name,
          productId: selectedProduct.id,
        });
        toast.success('Thank you! Check your email for download link.');
        setShowCheckoutModal(false);
        setEmail('');
        setName('');
        setCustomAmount('');
      } catch (error) {
        toast.error('Failed to process order. Please try again.');
        console.error(error);
      } finally {
        setLoading(false);
      }
      return;
    }

    // If paid amount, create Stripe session
    setLoading(true);
    try {
      const session = await createCheckout.mutateAsync({
        customerEmail: email,
        customerName: name,
        amountInCents,
        productId: selectedProduct.id,
      });

      if (session?.url) {
        window.open(session.url, '_blank');
        toast.success('Opening checkout...');
        setShowCheckoutModal(false);
        setEmail('');
        setName('');
        setCustomAmount('');
      }
    } catch (error) {
      toast.error('Failed to start checkout. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="text-sm opacity-70 mb-4 tracking-widest">
            Clarity Season 1: April 2026
          </div>
          <h1 className="text-4xl font-light">Store</h1>
          <p className="text-sm opacity-60 mt-2">Support the music. Direct-to-consumer. No middlemen.</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 max-w-md mx-auto">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 hover:border-zinc-700 transition flex flex-col"
            >
              {product.badge && (
                <div className="inline-block bg-blue-500 text-black text-xs font-semibold px-2 py-1 rounded mb-3 w-fit">
                  {product.badge}
                </div>
              )}
              <h3 className="text-xl font-light mb-2">{product.name}</h3>
              <p className="text-sm opacity-70 mb-4">{product.description}</p>
              
              {/* Product Details */}
              {product.details && (
                <ul className="text-xs opacity-60 mb-4 space-y-2 flex-grow">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
              
              <div className="text-2xl font-bold text-green-500 mb-4">
                Starting at ${product.minPrice}
              </div>
              
              <button
                onClick={() => handleBuyClick(product)}
                disabled={loading}
                className="w-full py-3 px-4 bg-green-500 text-black font-medium rounded hover:bg-green-600 transition disabled:opacity-50 mt-auto"
              >
                {loading ? 'Processing...' : 'Buy Now'}
              </button>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 mb-8">
          <h3 className="text-lg font-light mb-4">Why Direct Support Matters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="font-medium mb-2">3x Streaming Value</p>
              <p className="opacity-70">One $12 purchase = 3,000 streams worth to the artist</p>
            </div>
            <div>
              <p className="font-medium mb-2">Instant Access</p>
              <p className="opacity-70">Download all files immediately after purchase</p>
            </div>
            <div>
              <p className="font-medium mb-2">Direct Relationship</p>
              <p className="opacity-70">No algorithms. No middlemen. Pure connection.</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center text-sm">
          <Link href="/">
            <a className="text-blue-400 hover:underline">← Back to Home</a>
          </Link>
          <Link href="/connect">
            <a className="text-blue-400 hover:underline">Connect →</a>
          </Link>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light">Checkout</h2>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="text-gray-400 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Order Summary */}
            <div className="bg-zinc-800 rounded p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm opacity-70">{selectedProduct.name}</span>
                <span className="font-medium">Custom Amount</span>
              </div>
              <div className="border-t border-zinc-700 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total</span>
                  <span className="text-lg font-bold text-green-500">
                    {customAmount ? `$${parseFloat(customAmount).toFixed(2)}` : '$0.00'}
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Amount (USD)</label>
                <div className="flex items-center gap-2">
                  <span className="text-white">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="12.00"
                    className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition"
                    required
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {selectedProduct.minPrice > 0
                    ? `Minimum $${selectedProduct.minPrice}. Pay more to support the mission.`
                    : 'Enter $0 for free, or pay what you want to support the mission.'}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-green-500 text-black font-medium rounded hover:bg-green-600 transition disabled:opacity-50 mt-6"
              >
                {loading ? 'Processing...' : customAmount === '0' ? 'Get Free Download' : 'Continue to Payment'}
              </button>

              {customAmount !== '0' && (
                <p className="text-xs text-center opacity-60 mt-4">
                  You'll be redirected to Stripe to complete your purchase securely.
                </p>
              )}
              {customAmount === '0' && (
                <p className="text-xs text-center opacity-60 mt-4">
                  We'll send you a download link via email.
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
