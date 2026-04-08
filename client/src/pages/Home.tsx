import { Link } from 'wouter';
import { ArrowRight, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section with Gradient Background */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {/* Animated gradient background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl text-center">
          {/* Date Stamp */}
          <div className="inline-block mb-8">
            <div className="text-xs font-mono tracking-widest text-neutral-400 border border-neutral-700 px-4 py-2 rounded-full">
              CLARITY SEASON 1: APRIL 2026
            </div>
          </div>

          {/* Brand */}
          <h1 className="text-7xl md:text-8xl font-bebas tracking-widest mb-6 leading-none">
            MOSES
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-neutral-300 font-cormorant italic mb-4">
            10 years. One testimony. Truth-driven music.
          </p>
          <p className="text-sm md:text-base text-neutral-500 mb-12 tracking-wide">
            Direct-to-consumer • Owned infrastructure • Building something generational
          </p>

          {/* Main CTAs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {/* Listen */}
            <Link href="/listen">
              <a className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bebas tracking-wide py-4 px-6 rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/50 transform hover:-translate-y-1 flex items-center justify-center gap-2">
                <span className="text-lg">LISTEN</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Link>

            {/* Store */}
            <Link href="/store">
              <a className="group relative overflow-hidden border-2 border-white text-white font-bebas tracking-wide py-4 px-6 rounded-lg transition-all duration-300 hover:bg-white hover:text-black hover:shadow-2xl hover:shadow-white/50 transform hover:-translate-y-1 flex items-center justify-center gap-2">
                <span className="text-lg">STORE</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Link>

            {/* Connect */}
            <Link href="/connect">
              <a className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-600 text-black font-bebas tracking-wide py-4 px-6 rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 transform hover:-translate-y-1 flex items-center justify-center gap-2">
                <span className="text-lg">CONNECT</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Link>
          </div>

          {/* Secondary CTA - Digital Transformation */}
          <div className="mb-12">
            <a
              href="https://www.sharetheicecream.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-neutral-900/50 border border-neutral-700 text-neutral-200 rounded-lg hover:border-neutral-500 hover:bg-neutral-800/50 transition-all duration-300 group"
            >
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-dm-mono">Digital Transformation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Value Proposition */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-neutral-800">
            <div className="text-center">
              <div className="text-2xl font-bebas mb-2">OWNED</div>
              <p className="text-sm text-neutral-400">Your music. Your data. Your relationship.</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bebas mb-2">DIRECT</div>
              <p className="text-sm text-neutral-400">No middlemen. No algorithms. Pure connection.</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bebas mb-2">REAL</div>
              <p className="text-sm text-neutral-400">Faith-rooted. Truth-driven. Generational.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed bottom-8 left-8 text-xs text-neutral-600 font-mono">
        MOSES.DTC
      </div>
      <div className="fixed bottom-8 right-8 text-xs text-neutral-600 font-mono">
        EST. 2026
      </div>
    </div>
  );
}
