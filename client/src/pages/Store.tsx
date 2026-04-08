import { Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { useState } from 'react';
import { Check } from 'lucide-react';

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
  const [loading, setLoading] = useState(false);
  const createCheckout = trpc.checkout.createSession.useMutation();

  const handleBuyClick = async (product: Product) => {
    // Prompt for email and name
    const email = prompt('Enter your email:');
    if (!email) return;
    
    const name = prompt('Enter your name:');
    if (!name) return;
    
    setLoading(true);
    try {
      const session = await createCheckout.mutateAsync({
        customerEmail: email,
        customerName: name,
      });

      if (session?.url) {
        window.open(session.url, '_blank');
        toast.success(`Redirecting to checkout...`);
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
                onClick={() => handleBuyClick(product)}
                disabled={loading}
                className="w-full py-2 px-4 border border-white text-white font-medium rounded hover:bg-white hover:text-black transition disabled:opacity-50 mt-auto"
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
    </div>
  );
}
