import { Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  badge?: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'clarity',
    name: 'Clarity',
    description: '12-track digital album - truth-driven music rooted in alignment',
    price: 12,
  },
  {
    id: 'clarity-exclusive',
    name: 'Clarity + Exclusive',
    description: 'Full album + behind-the-scenes voice note + early New Genesis access',
    price: 25,
    badge: 'Bundle',
  },
  {
    id: 'clarity-deluxe',
    name: 'Clarity Deluxe',
    description: 'Deluxe edition with bonus tracks + signed digital certificate',
    price: 35,
    badge: 'Premium',
  },
  {
    id: 'new-genesis',
    name: 'New Genesis',
    description: '17-track album - proven sales, ready for direct release',
    price: 15,
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="text-sm opacity-70 mb-4 tracking-widest">
            Clarity Season 1: April 2026
          </div>
          <h1 className="text-4xl font-light">Store</h1>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 hover:border-zinc-700 transition"
            >
              {product.badge && (
                <div className="inline-block bg-blue-500 text-black text-xs font-semibold px-2 py-1 rounded mb-3">
                  {product.badge}
                </div>
              )}
              <h3 className="text-xl font-light mb-2">{product.name}</h3>
              <p className="text-sm opacity-70 mb-4">{product.description}</p>
              <div className="text-2xl font-bold text-green-500 mb-4">
                ${product.price}
              </div>
              <button
                onClick={() => handleBuyClick(product)}
                disabled={loading}
                className="w-full py-2 px-4 border border-white text-white font-medium rounded hover:bg-white hover:text-black transition disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Buy Now'}
              </button>
            </div>
          ))}
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
