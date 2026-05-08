import { useState } from 'react';
import { Music, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dedicationBundle } from '@/data/dedication-bundle';
import { Link } from 'wouter';

export default function Mixtape() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Trigger download of the ZIP file
      const link = document.createElement('a');
      link.href = '/api/download/dedication';
      link.download = 'DEDICATION-Mixtape.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00ff00] to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-64 h-64 rounded-lg overflow-hidden shadow-2xl border-2 border-[#00ff00]">
              <img
                src={dedicationBundle.albumCover}
                alt="Dedication Mixtape"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mb-4 text-sm font-mono text-[#00ff00] uppercase tracking-widest">
            Free Mixtape
          </div>

          <h1 className="font-bebas text-6xl md:text-7xl mb-4 tracking-wider">
            {dedicationBundle.title}
          </h1>

          <p className="font-cormorant text-2xl italic text-zinc-300 mb-6">
            {dedicationBundle.subtitle}
          </p>

          <p className="text-lg text-zinc-400 mb-12 max-w-xl mx-auto leading-relaxed">
            {dedicationBundle.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-[#00ff00] text-black hover:bg-[#00dd00] text-lg px-8 py-6 font-bold"
            >
              <Download className="mr-2 w-5 h-5" />
              {isDownloading ? 'Downloading...' : 'Download Free'}
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="text-2xl font-bold text-[#00ff00]">{dedicationBundle.trackCount}</div>
              <div className="text-zinc-500">Tracks</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#00ff00]">Free</div>
              <div className="text-zinc-500">Download</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#00ff00]">100%</div>
              <div className="text-zinc-500">Direct</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracklist Section */}
      <section className="px-4 py-20 max-w-4xl mx-auto">
        <h2 className="font-bebas text-4xl mb-12 tracking-wider uppercase">Tracklist</h2>

        <div className="space-y-3">
          {dedicationBundle.tracks.map((track) => (
            <div
              key={track.id}
              className="flex items-center justify-between p-4 rounded-lg border border-zinc-800 hover:border-[#00ff00] hover:bg-zinc-900/50 transition-all group"
            >
              <div className="flex items-center gap-4 flex-1">
                <Music className="w-5 h-5 text-[#00ff00] flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-mono font-semibold">{track.title}</div>
                  <div className="text-sm text-zinc-500">{track.artist}</div>
                </div>
              </div>
              <div className="text-sm text-zinc-400 ml-4">{track.duration}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Upsell Section */}
      <section className="px-4 py-20 bg-gradient-to-b from-zinc-900 to-[#0a0a0a]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-bebas text-4xl mb-6 tracking-wider uppercase">
            Ready for More?
          </h2>

          <p className="text-lg text-zinc-400 mb-8">
            Love this mixtape? Experience the full CLARITY album — a 12-track journey of faith, discipline, and transformation.
          </p>

          <Link href="/store">
            <Button className="bg-zinc-800 hover:bg-zinc-700 text-white border border-[#00ff00] text-lg px-8 py-6 font-bold">
              Explore CLARITY
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <Link href="/">
              <a className="text-zinc-400 hover:text-[#00ff00] transition-colors">HOME</a>
            </Link>
            <Link href="/listen">
              <a className="text-zinc-400 hover:text-[#00ff00] transition-colors">LISTEN</a>
            </Link>
            <Link href="/store">
              <a className="text-zinc-400 hover:text-[#00ff00] transition-colors">STORE</a>
            </Link>
            <Link href="/connect">
              <a className="text-zinc-400 hover:text-[#00ff00] transition-colors">CONNECT</a>
            </Link>
          </div>

          <div className="border-t border-zinc-800 pt-8 text-center text-sm text-zinc-600">
            <p>© 2026 MOSES SOG</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
