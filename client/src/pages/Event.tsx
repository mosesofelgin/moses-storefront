import { Link } from 'wouter';
import { Music, Zap, Users, ShoppingCart, Instagram, Youtube, Twitter, Twitch } from 'lucide-react';

export default function Event() {
  return (
    <div className="min-h-screen bg-[#0a0908] text-[#f0e8d7] flex flex-col">
      {/* ── HEADER ── */}
      <div className="sticky top-0 z-40 border-b border-[#3a3020] bg-[#0a0908]/95 backdrop-blur-sm px-4 py-3">
        <div className="max-w-md mx-auto">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#b8860b] uppercase">
            MOSES SOG
          </p>
          <p className="font-bebas text-lg tracking-wider text-[#f0e8d7]">
            THE VAULT
          </p>
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <section className="px-4 py-6 bg-gradient-to-b from-[#1a1410] to-[#0a0908] border-b border-[#3a3020]">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#b8860b]/50 bg-[#b8860b]/10">
            <Zap className="w-6 h-6 text-[#b8860b]" />
          </div>
          <h1 className="font-bebas text-3xl tracking-widest text-[#f0e8d7] mb-2">
            PROPHETIC HIP-HOP
          </h1>
          <p className="text-[#a09880] text-sm font-cormorant italic mb-4">
            Chicago · Music · Mission
          </p>
          <p className="text-[#7a7060] text-xs leading-relaxed">
            Explore music, projects, and exclusive content. Direct from MOSES.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-3">

          {/* ── CLARITY PROJECT ── */}
          <Link
            href="/checkout"
            className="block p-4 rounded-sm border border-[#3a3020] bg-[#0f0c0a] hover:border-[#b8860b] hover:bg-[#b8860b]/5 transition-all group"
          >
            <div className="flex items-start gap-3">
              <Music className="w-5 h-5 text-[#b8860b] flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <p className="font-bebas text-sm tracking-wider text-[#f0e8d7] group-hover:text-[#b8860b] transition-colors">
                  CLARITY
                </p>
                <p className="text-[#7a7060] text-xs mt-0.5">
                  12-track album. Faith, discipline, transformation.
                </p>
                <p className="text-[#b8860b] text-xs font-mono mt-2">
                  → Own Now
                </p>
              </div>
            </div>
          </Link>

          {/* ── ARTIST PAGE ── */}
          <Link
            href="/artist"
            className="block p-4 rounded-sm border border-[#3a3020] bg-[#0f0c0a] hover:border-[#b8860b] hover:bg-[#b8860b]/5 transition-all group"
          >
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-[#b8860b] flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <p className="font-bebas text-sm tracking-wider text-[#f0e8d7] group-hover:text-[#b8860b] transition-colors">
                  ARTIST PAGE
                </p>
                <p className="text-[#7a7060] text-xs mt-0.5">
                  Bio, videos, EPK downloads, booking info.
                </p>
                <p className="text-[#b8860b] text-xs font-mono mt-2">
                  → Learn More
                </p>
              </div>
            </div>
          </Link>

          {/* ── LISTEN ── */}
          <Link
            href="/listen"
            className="block p-4 rounded-sm border border-[#3a3020] bg-[#0f0c0a] hover:border-[#b8860b] hover:bg-[#b8860b]/5 transition-all group"
          >
            <div className="flex items-start gap-3">
              <Music className="w-5 h-5 text-[#b8860b] flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <p className="font-bebas text-sm tracking-wider text-[#f0e8d7] group-hover:text-[#b8860b] transition-colors">
                  LISTEN
                </p>
                <p className="text-[#7a7060] text-xs mt-0.5">
                  All projects. Streaming & downloads.
                </p>
                <p className="text-[#b8860b] text-xs font-mono mt-2">
                  → Play Now
                </p>
              </div>
            </div>
          </Link>

          {/* ── STORE ── */}
          <Link
            href="/store"
            className="block p-4 rounded-sm border border-[#3a3020] bg-[#0f0c0a] hover:border-[#b8860b] hover:bg-[#b8860b]/5 transition-all group"
          >
            <div className="flex items-start gap-3">
              <ShoppingCart className="w-5 h-5 text-[#b8860b] flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <p className="font-bebas text-sm tracking-wider text-[#f0e8d7] group-hover:text-[#b8860b] transition-colors">
                  STORE
                </p>
                <p className="text-[#7a7060] text-xs mt-0.5">
                  Albums, projects, exclusive content.
                </p>
                <p className="text-[#b8860b] text-xs font-mono mt-2">
                  → Shop
                </p>
              </div>
            </div>
          </Link>

          {/* ── CONNECT ── */}
          <Link
            href="/connect"
            className="block p-4 rounded-sm border border-[#3a3020] bg-[#0f0c0a] hover:border-[#b8860b] hover:bg-[#b8860b]/5 transition-all group"
          >
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-[#b8860b] flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <p className="font-bebas text-sm tracking-wider text-[#f0e8d7] group-hover:text-[#b8860b] transition-colors">
                  CONNECT
                </p>
                <p className="text-[#7a7060] text-xs mt-0.5">
                  Email, booking, partnerships, press.
                </p>
                <p className="text-[#b8860b] text-xs font-mono mt-2">
                  → Get in Touch
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* ── SOCIAL FOOTER ── */}
      <section className="px-4 py-4 border-t border-[#3a3020] bg-[#0f0c0a]">
        <div className="max-w-md mx-auto">
          <p className="text-[#7a7060] text-xs font-mono tracking-wider mb-3 text-center">
            FOLLOW @MOSESSOG
          </p>
          <div className="flex justify-center gap-3">
            <a
              href="https://instagram.com/moses_sog"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-sm border border-[#3a3020] bg-[#0a0908] hover:border-[#b8860b] hover:bg-[#b8860b]/10 flex items-center justify-center transition-all"
              title="Instagram"
            >
              <Instagram className="w-4 h-4 text-[#b8860b]" />
            </a>
            <a
              href="https://youtube.com/@MosesSOG"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-sm border border-[#3a3020] bg-[#0a0908] hover:border-[#b8860b] hover:bg-[#b8860b]/10 flex items-center justify-center transition-all"
              title="YouTube"
            >
              <Youtube className="w-4 h-4 text-[#b8860b]" />
            </a>
            <a
              href="https://twitch.tv/mosessog"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-sm border border-[#3a3020] bg-[#0a0908] hover:border-[#b8860b] hover:bg-[#b8860b]/10 flex items-center justify-center transition-all"
              title="Twitch"
            >
              <Twitch className="w-4 h-4 text-[#b8860b]" />
            </a>
            <a
              href="https://twitter.com/sogmoses"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-sm border border-[#3a3020] bg-[#0a0908] hover:border-[#b8860b] hover:bg-[#b8860b]/10 flex items-center justify-center transition-all"
              title="Twitter"
            >
              <Twitter className="w-4 h-4 text-[#b8860b]" />
            </a>
          </div>
          <p className="text-[#3a3020] text-[10px] text-center mt-3 tracking-wide">
            Direct from MOSES · Chicago
          </p>
        </div>
      </section>
    </div>
  );
}
