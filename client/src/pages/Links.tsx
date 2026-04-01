import { Music, Youtube, Radio, Globe, Disc3 } from 'lucide-react';

export default function Links() {

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-neutral-800 bg-black/95 backdrop-blur">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bebas tracking-widest">MOSES</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-6xl font-bebas tracking-widest mb-4">
            MOSES
          </h2>
          <p className="text-neutral-400 font-cormorant text-lg italic">
            Digital Music & Creative Services
          </p>
          <div className="w-16 h-px bg-neutral-700 mx-auto mt-6"></div>
        </div>

        {/* Links Grid */}
        <div className="space-y-4">
          {/* Clarity Project */}
          <a
            href="/clarity"
            className="block group"
          >
            <div className="border border-neutral-700 p-6 hover:border-neutral-500 transition-colors duration-300">
              <div className="flex items-center gap-4">
                <Disc3 className="w-6 h-6 text-neutral-400 group-hover:text-white transition-colors" />
                <div className="flex-1">
                  <h3 className="font-bebas text-xl tracking-wide">CLARITY</h3>
                  <p className="text-neutral-500 text-sm font-dm-mono">
                    Project Showcase
                  </p>
                </div>
                <span className="text-neutral-600 group-hover:text-neutral-400 transition-colors">
                  →
                </span>
              </div>
            </div>
          </a>

          {/* Shop Link */}
          <a
            href="/"
            className="block group"
          >
            <div className="border border-neutral-700 p-6 hover:border-neutral-500 transition-colors duration-300">
              <div className="flex items-center gap-4">
                <Music className="w-6 h-6 text-neutral-400 group-hover:text-white transition-colors" />
                <div className="flex-1">
                  <h3 className="font-bebas text-xl tracking-wide">SHOP</h3>
                  <p className="text-neutral-500 text-sm font-dm-mono">
                    Purchase Clarity Album
                  </p>
                </div>
                <span className="text-neutral-600 group-hover:text-neutral-400 transition-colors">
                  →
                </span>
              </div>
            </div>
          </a>

          {/* YouTube Playlist */}
          <a
            href="https://www.youtube.com/playlist?list=PLTt1W4MaPgT3799Kyqr9oAV62pPsOAxS0"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="border border-neutral-700 p-6 hover:border-neutral-500 transition-colors duration-300">
              <div className="flex items-center gap-4">
                <Youtube className="w-6 h-6 text-neutral-400 group-hover:text-white transition-colors" />
                <div className="flex-1">
                  <h3 className="font-bebas text-xl tracking-wide">YOUTUBE</h3>
                  <p className="text-neutral-500 text-sm font-dm-mono">
                    Clarity Playlist
                  </p>
                </div>
                <span className="text-neutral-600 group-hover:text-neutral-400 transition-colors">
                  ↗
                </span>
              </div>
            </div>
          </a>

          {/* Streaming Link */}
          <a
            href="https://distrokid.com/hyperfollow/mosesofelgin/clarity?ref=release"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="border border-neutral-700 p-6 hover:border-neutral-500 transition-colors duration-300">
              <div className="flex items-center gap-4">
                <Radio className="w-6 h-6 text-neutral-400 group-hover:text-white transition-colors" />
                <div className="flex-1">
                  <h3 className="font-bebas text-xl tracking-wide">STREAMING</h3>
                  <p className="text-neutral-500 text-sm font-dm-mono">
                    Listen on All Platforms
                  </p>
                </div>
                <span className="text-neutral-600 group-hover:text-neutral-400 transition-colors">
                  ↗
                </span>
              </div>
            </div>
          </a>

          {/* Transform Your Website */}
          <a
            href="https://www.sharetheicecream.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="border border-neutral-700 p-6 hover:border-neutral-500 transition-colors duration-300">
              <div className="flex items-center gap-4">
                <Globe className="w-6 h-6 text-neutral-400 group-hover:text-white transition-colors" />
                <div className="flex-1">
                  <h3 className="font-bebas text-xl tracking-wide">TRANSFORM YOUR WEBSITE</h3>
                  <p className="text-neutral-500 text-sm font-dm-mono">
                    Share the Ice Cream
                  </p>
                </div>
                <span className="text-neutral-600 group-hover:text-neutral-400 transition-colors">
                  ↗
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>


    </div>
  );
}
