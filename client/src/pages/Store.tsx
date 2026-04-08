import { Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { useState } from 'react';
import { Check, X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  badge?: string;
  details?: string[];
}

const PRODUCTS: Product[] = [
  {
    id: 'clarity',
    name: 'Clarity',
    description: '12-track digital album - truth-driven music rooted in alignment',
    price: 12,
    details: [
      'All 12 CLARITY tracks',
      '4 brand images (high-res)',
      'Lyric book PDF',
      'Lifetime access',
    ],
  },
];

export default function Store() {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const createCheckout = trpc.checkout.createSession.useMutation();

  const handleBuyClick = () => {
    setShowCheckoutModal(true);
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const session = await createCheckout.mutateAsync({
        customerEmail: email,
        customerName: name,
      });

      if (session?.url) {
        // Open Stripe checkout in new tab
        window.open(session.url, '_blank');
        toast.success('Opening checkout...');
        setShowCheckoutModal(false);
        setEmail('');
        setName('');
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
          <p className="text-sm opacity-60 mt-2">Get CLARITY - 12 tracks of truth-driven music</p>
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
                ${product.price}
              </div>
              <button
                onClick={handleBuyClick}
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
          <h3 className="text-lg font-light mb-4">What You Get</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="font-medium mb-2">Instant Access</p>
              <p className="opacity-70">Download all files immediately after purchase</p>
            </div>
            <div>
              <p className="font-medium mb-2">Lifetime Ownership</p>
              <p className="opacity-70">Keep your files forever with no expiration</p>
            </div>
            <div>
              <p className="font-medium mb-2">Direct Support</p>
              <p className="opacity-70">Direct connection to Moses and the community</p>
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
      {showCheckoutModal && (
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
                <span className="text-sm opacity-70">CLARITY Album</span>
                <span className="font-medium">$12.00</span>
              </div>
              <div className="border-t border-zinc-700 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total</span>
                  <span className="text-lg font-bold text-green-500">$12.00</span>
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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-green-500 text-black font-medium rounded hover:bg-green-600 transition disabled:opacity-50 mt-6"
              >
                {loading ? 'Processing...' : 'Continue to Payment'}
              </button>

              <p className="text-xs text-center opacity-60 mt-4">
                You'll be redirected to Stripe to complete your purchase securely.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
