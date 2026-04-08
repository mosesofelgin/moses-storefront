import { Link } from 'wouter';
import { Mail, Youtube, Instagram, Twitter } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Connect() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setLoading(true);
    try {
      // TODO: Integrate with email service (Resend/Mailchimp)
      toast.success('Thanks for signing up!');
      setEmail('');
    } catch (error) {
      toast.error('Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="text-sm opacity-70 mb-4 tracking-widest">
            Clarity Season 1: April 2026
          </div>
          <h1 className="text-4xl font-light">Connect</h1>
        </div>

        {/* Livestream Section */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8 border border-zinc-800">
          <h2 className="text-2xl font-light mb-6 text-blue-400">Livestream Schedule</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-start pb-4 border-b border-zinc-700">
              <div>
                <p className="text-sm opacity-70">Next Stream</p>
                <p className="font-medium">Sunday, April 12 • 7:00 PM CDT</p>
              </div>
            </div>
            <div className="flex justify-between items-start pb-4 border-b border-zinc-700">
              <div>
                <p className="text-sm opacity-70">Platform</p>
                <p className="font-medium">YouTube Live</p>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm opacity-70">Focus</p>
                <p className="font-medium">Live performance + testimony</p>
              </div>
            </div>
          </div>
          <p className="text-sm opacity-70 mt-6">
            Weekly livestreams are the primary engine for attention and connection. Each stream includes performance, teaching, and real-time interaction.
          </p>
        </div>

        {/* Email Signup Section */}
        <div className="bg-zinc-900 rounded-lg p-6 mb-8 border border-zinc-800">
          <h2 className="text-2xl font-light mb-4 text-green-500">Stay Connected</h2>
          <p className="text-sm opacity-70 mb-6">
            Get direct updates on new music, livestreams, and exclusive offers—no algorithms, no middlemen.
          </p>
          <form onSubmit={handleEmailSubmit} className="flex gap-2 mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-2 bg-zinc-800 rounded border border-zinc-700 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-500 text-black font-medium rounded hover:bg-green-600 transition disabled:opacity-50"
            >
              {loading ? 'Joining...' : 'Join'}
            </button>
          </form>
          <p className="text-xs opacity-60">We respect your inbox. Unsubscribe anytime.</p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-12">
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition"
            aria-label="YouTube"
          >
            <Youtube className="w-6 h-6" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition"
            aria-label="Instagram"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition"
            aria-label="Twitter/X"
          >
            <Twitter className="w-6 h-6" />
          </a>
          <a
            href="mailto:contact@moses.com"
            className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition"
            aria-label="Email"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center text-sm">
          <Link href="/">
            <a className="text-blue-400 hover:underline">← Back to Home</a>
          </Link>
          <Link href="/listen">
            <a className="text-blue-400 hover:underline">Listen →</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
