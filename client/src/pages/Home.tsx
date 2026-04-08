import { Link } from 'wouter';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Date Stamp */}
        <div className="text-sm opacity-70 mb-8 tracking-widest">
          Clarity Season 1: April 2026
        </div>

        {/* Brand */}
        <h1 className="text-5xl font-light mb-6">Moses</h1>

        {/* CTAs */}
        <div className="space-y-3 mb-12">
          <Link href="/listen">
            <a className="block w-full py-3 px-6 bg-green-500 text-black font-medium rounded hover:bg-green-600 transition transform hover:-translate-y-0.5">
              Listen
            </a>
          </Link>
          <Link href="/store">
            <a className="block w-full py-3 px-6 border border-white text-white font-medium rounded hover:bg-white hover:text-black transition transform hover:-translate-y-0.5">
              Store
            </a>
          </Link>
          <Link href="/connect">
            <a className="block w-full py-3 px-6 bg-blue-400 text-black font-medium rounded hover:bg-blue-500 transition transform hover:-translate-y-0.5">
              Connect
            </a>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs opacity-60">
          Truth-driven music • Direct-to-consumer • Owned infrastructure
        </p>
      </div>
    </div>
  );
}
