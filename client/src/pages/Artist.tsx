import { useState } from 'react';
import { Button } from '@/components/ui/button';

const HERO_IMAGE = '/manus-storage/TOP_02_62795e56.jpg';
const PORTRAIT_1 = '/manus-storage/TOP_05_81f9f12e.jpg';
const PORTRAIT_2 = '/manus-storage/ChatGPTImageMar19,2026,11_14_44AM_88a4e5c1.png';

const VIDEOS = [
  {
    id: 'rainbow-push',
    title: 'The Stage',
    subtitle: 'Rainbow PUSH Coalition Keynote Performance',
    description: 'Authority, presence, institutional readiness.',
    youtubeId: 'D94a9DKh1es',
  },
  {
    id: 'final-prayer',
    title: 'The Message',
    subtitle: 'Final Prayer',
    description: 'The clearest expression of mission and spiritual conviction.',
    youtubeId: 'CC3lHW_usho',
  },
  {
    id: 'church',
    title: 'The Beginning',
    subtitle: 'Church',
    description: 'The first music video and evidence of longevity.',
    youtubeId: 'xn0KdOotyTI',
  },
];

const PROOF_POINTS = [
  { number: '400+', label: 'Published Songs' },
  { number: '600+', label: 'Recordings' },
  { number: 'Chicago', label: 'Based' },
  { number: 'Performer', label: 'Writer' },
];

export default function Artist() {
  const [selectedVideo, setSelectedVideo] = useState(VIDEOS[0]);

  const handleDownloadEPK = async () => {
    try {
      const response = await fetch('/MOSES_EPK.pdf');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'MOSES_EPK.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${HERO_IMAGE}')`,
            opacity: 0.3,
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />

        {/* Content */}
        <div className="relative z-10 text-center max-w-3xl px-6 py-20">
          <h1 className="font-serif text-7xl md:text-8xl font-bold mb-6 tracking-tight">
            MOSES
          </h1>
          <p className="text-xl md:text-2xl mb-2 text-amber-100 font-light">
            Prophetic hip-hop from Chicago
          </p>
          <p className="text-lg md:text-xl mb-12 text-gray-300 font-light leading-relaxed">
            Built to awaken faith, wisdom, and dominion.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#featured-performance"
              className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-black font-bold transition"
            >
              Watch the Keynote
            </a>
            <button
              onClick={handleDownloadEPK}
              className="px-8 py-4 border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-black font-bold transition"
            >
              Download EPK
            </button>
          </div>

          {/* Secondary Links */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
            <a href="#videos" className="text-amber-100 hover:text-amber-400 transition">
              Listen
            </a>
            <span className="text-gray-600">·</span>
            <a href="#booking" className="text-amber-100 hover:text-amber-400 transition">
              Booking
            </a>
            <span className="text-gray-600">·</span>
            <a href="#covenant" className="text-amber-100 hover:text-amber-400 transition">
              Join the Covenant
            </a>
          </div>
        </div>
      </section>

      {/* Proof Strip */}
      <section className="bg-gray-900 border-t-2 border-amber-600 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {PROOF_POINTS.map((point, idx) => (
            <div key={idx} className="text-center">
              <p className="font-serif text-3xl md:text-4xl font-bold text-amber-600 mb-2">
                {point.number}
              </p>
              <p className="text-sm text-gray-400">{point.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Performance */}
      <section id="featured-performance" className="py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="w-12 h-1 bg-amber-600 mb-8" />
            <h2 className="font-serif text-5xl md:text-6xl font-bold mb-4">
              MOSES Live at Rainbow PUSH Coalition
            </h2>
            <p className="text-gray-400 max-w-2xl">
              A keynote performance demonstrating authority, presence, and institutional readiness.
            </p>
          </div>

          {/* Video Player */}
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-12">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=0`}
              title={selectedVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {/* Video Info */}
          <div className="mb-12">
            <h3 className="font-serif text-3xl font-bold mb-2">{selectedVideo.title}</h3>
            <p className="text-amber-600 mb-4">{selectedVideo.subtitle}</p>
            <p className="text-gray-400">{selectedVideo.description}</p>
          </div>
        </div>
      </section>

      {/* Video Gallery Navigation */}
      <section id="videos" className="py-20 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="w-12 h-1 bg-amber-600 mb-8" />
            <h2 className="font-serif text-5xl md:text-6xl font-bold">The Three-Film Story</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VIDEOS.map((video) => (
              <button
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className={`group text-left transition ${
                  selectedVideo.id === video.id ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-2 border-amber-600 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-amber-600 ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="font-serif text-2xl font-bold">{video.title}</h3>
                <p className="text-amber-600 text-sm mt-2">{video.subtitle}</p>
                <p className="text-gray-400 text-sm mt-2">{video.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Artist Statement */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <div className="w-12 h-1 bg-amber-600 mb-8" />
            <h2 className="font-serif text-5xl md:text-6xl font-bold mb-12">The Artist</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                MOSES is a Chicago-based prophetic hip-hop artist, writer, and builder creating clean music rooted in faith, truth, financial wisdom, and the liberation of the human spirit.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                His work stands at the intersection of church, city, technology, and institution-building. With over 400 published songs and 600+ recordings, MOSES has performed at major institutional venues including the Rainbow PUSH Coalition, demonstrating a commitment to both artistic excellence and social impact.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Every project is built with discipline, authenticity, and a clear mission: to awaken faith, wisdom, and dominion in those who encounter it.
              </p>
            </div>

            {/* Image */}
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src={PORTRAIT_1}
                alt="MOSES Portrait"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="covenant" className="py-20 px-6 bg-gray-950 border-t-2 border-amber-600">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <div className="w-12 h-1 bg-amber-600 mb-8" />
            <h2 className="font-serif text-5xl md:text-6xl font-bold mb-4">
              Music Is the Door. Dominion Is the Work.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-serif text-2xl font-bold text-amber-600 mb-4">The Mission</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Beyond music, MOSES is building infrastructure for liberation:
              </p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex gap-4">
                  <span className="text-amber-600 font-bold">→</span>
                  <span>AI literacy and digital sovereignty</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-amber-600 font-bold">→</span>
                  <span>Financial mastery and wealth-building</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-amber-600 font-bold">→</span>
                  <span>Community uplift and institution-building</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-amber-600 font-bold">→</span>
                  <span>Clean prophetic culture and creative excellence</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-amber-600 font-bold">→</span>
                  <span>Free creative and educational infrastructure</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-amber-600 mb-4">Join the Covenant</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Be part of a movement that values authenticity, discipline, and liberation. Receive new music, performances, teachings, and exclusive updates.
              </p>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-900 text-white border border-amber-600 rounded focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-amber-600 hover:bg-amber-700 text-black font-bold transition"
                >
                  Join the Covenant
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Booking & Contact */}
      <section id="booking" className="py-20 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <div className="w-12 h-1 bg-amber-600 mb-8" />
            <h2 className="font-serif text-5xl md:text-6xl font-bold">Get in Touch</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Booking */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-amber-600 mb-4">Book MOSES</h3>
              <p className="text-gray-300 mb-6">
                For concerts, churches, schools, conferences, community organizations, and institutional events.
              </p>
              <a
                href="mailto:booking@mosessog.com"
                className="inline-block px-6 py-3 border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-black font-bold transition"
              >
                booking@mosessog.com
              </a>
            </div>

            {/* Media & Partnerships */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-amber-600 mb-4">
                Media & Partnerships
              </h3>
              <p className="text-gray-300 mb-6">
                For interviews, collaborations, licensing, sponsorships, and educational initiatives.
              </p>
              <a
                href="mailto:media@mosessog.com"
                className="inline-block px-6 py-3 border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-black font-bold transition"
              >
                media@mosessog.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-12 px-6 bg-gray-950 border-t-2 border-amber-600">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 mb-6">Follow @mosessog</p>
          <div className="flex justify-center gap-8">
            <a href="https://instagram.com/mosessog" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-400 transition">
              Instagram
            </a>
            <a href="https://youtube.com/@mosessog" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-400 transition">
              YouTube
            </a>
            <a href="https://tiktok.com/@mosessog" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-400 transition">
              TikTok
            </a>
            <a href="https://twitter.com/mosessog" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-400 transition">
              Twitter
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
