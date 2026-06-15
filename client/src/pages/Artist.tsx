import { useState } from 'react';
import { Download, FileText, Image as ImageIcon, Archive, Play, ChevronRight, Mail, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

// ─── Image Assets (via storage proxy) ────────────────────────────────────────
const HERO_IMAGE = '/manus-storage/TOP_02_2eb4481e.jpg';
const PORTRAIT_1 = '/manus-storage/TOP_05_8692d459.jpg';
const PORTRAIT_2 = '/manus-storage/ChatGPTImageMar19,2026,11_14_44AM_76fb924e.png';

// ─── CDN Images (publicly accessible) ────────────────────────────────────────
const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk';
const ALBUM_COVER = `${CDN}/album-cover_2118610e.png`;
const PHOTO_CAMO = `${CDN}/TOP_01_aaeff941.jpg`;

// ─── Videos (corrected IDs: Church = CC3lHW_usho, Final Prayer = xn0KdOotyTI) ─
const VIDEOS = [
  {
    id: 'rainbow-push',
    title: 'The Stage',
    subtitle: 'Rainbow PUSH Coalition Keynote',
    description: 'Authority, presence, and institutional readiness. A keynote performance that demonstrates what MOSES brings to major venues.',
    youtubeId: 'D94a9DKh1es',
    label: 'KEYNOTE PERFORMANCE',
  },
  {
    id: 'church',
    title: 'The Beginning',
    subtitle: 'Church',
    description: 'The first music video — evidence of longevity, craft, and a sound that has remained consistent across fifteen years.',
    youtubeId: 'CC3lHW_usho',
    label: 'MUSIC VIDEO',
  },
  {
    id: 'final-prayer',
    title: 'The Message',
    subtitle: 'Final Prayer',
    description: 'The clearest expression of mission and spiritual conviction. The song that defines the MOSES catalog.',
    youtubeId: 'xn0KdOotyTI',
    label: 'MUSIC VIDEO',
  },
];

const PROOF_POINTS = [
  { number: '400+', label: 'Published Songs' },
  { number: '600+', label: 'Recordings' },
  { number: '15+', label: 'Years Active' },
  { number: 'Chicago', label: 'Based' },
];

// ─── EPK Documents ─────────────────────────────────────────────────────────
const EPK_DOCS = [
  {
    id: 'one-sheet',
    title: 'One-Sheet',
    description: 'Quick overview for booking agents and promoters',
    icon: 'file',
    path: '/api/download/epk/one-sheet',
    filename: 'MOSES_One-Sheet.pdf',
  },
  {
    id: 'short-bio',
    title: 'Short Bio',
    description: '300-word biography for press and programs',
    icon: 'file',
    path: '/api/download/epk/short-bio',
    filename: 'MOSES_Short-Bio.pdf',
  },
  {
    id: 'long-bio',
    title: 'Long Bio',
    description: 'Comprehensive press narrative for features and profiles',
    icon: 'file',
    path: '/api/download/epk/long-bio',
    filename: 'MOSES_Long-Bio.pdf',
  },
  {
    id: 'press-kit',
    title: 'Full Press Kit',
    description: 'All 3 PDFs + 4 hi-res photos in one ZIP',
    icon: 'archive',
    path: '/api/download/epk/press-kit',
    filename: 'MOSES_Press-Kit.zip',
    featured: true,
  },
];

// ─── Download handler ─────────────────────────────────────────────────────
async function downloadFile(path: string, filename: string) {
  const toastId = toast.loading(`Preparing ${filename}…`);
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 500);
    toast.success(`Downloaded ${filename}`, { id: toastId });
  } catch (err) {
    console.error('Download error:', err);
    toast.error(`Download failed — try again`, { id: toastId });
  }
}

export default function Artist() {
  const [selectedVideo, setSelectedVideo] = useState(VIDEOS[0]);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleDownload = async (doc: typeof EPK_DOCS[0]) => {
    setDownloading(doc.id);
    await downloadFile(doc.path, doc.filename);
    setDownloading(null);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setEmailSubmitted(true);
      toast.success('Welcome to the Covenant.');
    }
  };

  return (
    <div className="bg-[#0d0c0b] text-[#f0e8d7] min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0b] via-[#0d0c0b]/60 to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20 pt-32 w-full">
          <p className="font-mono text-xs tracking-[0.25em] text-[#b8860b] mb-4 uppercase">
            Chicago · Prophetic Hip-Hop
          </p>
          <h1
            className="font-serif text-[clamp(4rem,12vw,9rem)] font-bold leading-none tracking-tight mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            MOSES
          </h1>
          <p className="text-xl md:text-2xl text-[#f0e8d7]/80 font-light max-w-xl mb-10 leading-relaxed">
            Prophetic hip-hop from Chicago. Built to awaken faith, wisdom, and dominion.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#featured-performance"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#b8860b] hover:bg-[#a07808] text-[#0d0c0b] font-bold transition-colors text-sm tracking-wide"
            >
              <Play size={16} />
              Watch the Keynote
            </a>
            <button
              onClick={() => document.getElementById('epk')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#b8860b] text-[#b8860b] hover:bg-[#b8860b] hover:text-[#0d0c0b] font-bold transition-colors text-sm tracking-wide"
            >
              <Download size={16} />
              Download EPK
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm">
            {['Videos', 'Story', 'Booking'].map((label, i) => (
              <a
                key={label}
                href={['#videos', '#story', '#booking'][i]}
                className="text-[#f0e8d7]/50 hover:text-[#b8860b] transition-colors flex items-center gap-1"
              >
                {label} <ChevronRight size={12} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proof Strip ──────────────────────────────────────────────────── */}
      <section className="bg-[#111009] border-y border-[#b8860b]/30 py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {PROOF_POINTS.map((pt, i) => (
            <div key={i} className="text-center">
              <p
                className="font-serif text-3xl md:text-4xl font-bold text-[#b8860b] mb-1"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {pt.number}
              </p>
              <p className="text-xs text-[#f0e8d7]/40 tracking-widest uppercase">{pt.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Performance ─────────────────────────────────────────── */}
      <section id="featured-performance" className="py-24 px-6 bg-[#0d0c0b]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <div className="w-10 h-[2px] bg-[#b8860b] mb-6" />
            <h2
              className="font-serif text-4xl md:text-5xl font-bold mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {selectedVideo.title}
            </h2>
            <p className="text-[#b8860b] font-mono text-xs tracking-widest uppercase mb-2">
              {selectedVideo.label}
            </p>
            <p className="text-[#f0e8d7]/60 max-w-xl">{selectedVideo.description}</p>
          </div>

          {/* Video Player */}
          <div className="aspect-video bg-black rounded overflow-hidden shadow-2xl shadow-black/50 mb-4">
            <iframe
              key={selectedVideo.youtubeId}
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=0&rel=0`}
              title={selectedVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* ── Video Gallery ─────────────────────────────────────────────────── */}
      <section id="videos" className="py-24 px-6 bg-[#0f0e0c]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <div className="w-10 h-[2px] bg-[#b8860b] mb-6" />
            <h2
              className="font-serif text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              The Three-Film Story
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VIDEOS.map((video) => {
              const isActive = selectedVideo.id === video.id;
              return (
                <button
                  key={video.id}
                  onClick={() => {
                    setSelectedVideo(video);
                    document.getElementById('featured-performance')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`group text-left transition-all duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <div className={`relative aspect-video bg-[#1a1812] overflow-hidden mb-4 ${
                    isActive ? 'ring-2 ring-[#b8860b]' : ''
                  }`}>
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-[#0d0c0b]/40 group-hover:bg-[#0d0c0b]/20 transition-colors flex items-center justify-center">
                      <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isActive ? 'border-[#b8860b] bg-[#b8860b]/20' : 'border-[#f0e8d7]/60'
                      }`}>
                        <Play size={20} className={isActive ? 'text-[#b8860b] ml-1' : 'text-[#f0e8d7] ml-1'} fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="font-mono text-[9px] tracking-widest bg-[#b8860b] text-[#0d0c0b] px-2 py-1 uppercase">
                        {video.label}
                      </span>
                    </div>
                  </div>
                  <h3
                    className="font-serif text-xl font-bold mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {video.title}
                  </h3>
                  <p className="text-[#b8860b] text-xs font-mono tracking-wide">{video.subtitle}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Artist Story ─────────────────────────────────────────────────── */}
      <section id="story" className="py-24 px-6 bg-[#0d0c0b]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <div className="w-10 h-[2px] bg-[#b8860b] mb-6" />
              <h2
                className="font-serif text-4xl md:text-5xl font-bold mb-8"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                The Artist
              </h2>
              <p className="text-[#f0e8d7]/75 leading-relaxed mb-5 text-lg">
                MOSES is a Chicago-based prophetic hip-hop artist, writer, and builder creating clean music rooted in faith, truth, financial wisdom, and the liberation of the human spirit.
              </p>
              <p className="text-[#f0e8d7]/75 leading-relaxed mb-5">
                His work stands at the intersection of church, city, technology, and institution-building. With over 400 published songs and 600+ recordings, MOSES has performed at major institutional venues including the Rainbow PUSH Coalition, demonstrating a commitment to both artistic excellence and social impact.
              </p>
              <p className="text-[#f0e8d7]/75 leading-relaxed">
                Every project is built with discipline, authenticity, and a clear mission: to awaken faith, wisdom, and dominion in those who encounter it.
              </p>

              <div className="mt-10 border-l-2 border-[#b8860b] pl-5">
                <p className="font-serif text-xl italic text-[#f0e8d7]/80" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  "Music Is the Door. Dominion Is the Work."
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={PORTRAIT_1}
                  alt="MOSES Portrait"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={PHOTO_CAMO}
                    alt="MOSES"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden">
                  <img
                    src={ALBUM_COVER}
                    alt="CLARITY Album"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#0f0e0c] border-t border-[#b8860b]/20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <div className="w-10 h-[2px] bg-[#b8860b] mb-6" />
              <h2
                className="font-serif text-4xl md:text-5xl font-bold mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Music Is the Door.<br />Dominion Is the Work.
              </h2>
              <p className="text-[#f0e8d7]/60 mb-8">
                Beyond music, MOSES is building infrastructure for liberation:
              </p>
              <ul className="space-y-3">
                {[
                  'AI literacy and digital sovereignty',
                  'Financial mastery and wealth-building',
                  'Community uplift and institution-building',
                  'Clean prophetic culture and creative excellence',
                  'Free creative and educational infrastructure',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#f0e8d7]/70">
                    <span className="text-[#b8860b] font-bold mt-0.5">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div id="covenant">
              <h3
                className="font-serif text-2xl font-bold text-[#b8860b] mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Join the Covenant
              </h3>
              <p className="text-[#f0e8d7]/60 mb-6 leading-relaxed">
                Be part of a movement that values authenticity, discipline, and liberation. Receive new music, performances, teachings, and exclusive updates.
              </p>
              {emailSubmitted ? (
                <div className="border border-[#b8860b]/40 bg-[#b8860b]/10 p-6 text-center">
                  <p className="font-serif text-xl text-[#b8860b]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Welcome to the Covenant.
                  </p>
                  <p className="text-[#f0e8d7]/50 text-sm mt-2">Check your inbox for confirmation.</p>
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 bg-[#1a1812] text-[#f0e8d7] border border-[#b8860b]/40 focus:border-[#b8860b] focus:outline-none placeholder:text-[#f0e8d7]/30 transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-[#b8860b] hover:bg-[#a07808] text-[#0d0c0b] font-bold transition-colors tracking-wide"
                  >
                    Join the Covenant
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── EPK Section ──────────────────────────────────────────────────── */}
      <section id="epk" className="py-24 px-6 bg-[#0d0c0b] border-t border-[#b8860b]/20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <div className="w-10 h-[2px] bg-[#b8860b] mb-6" />
            <h2
              className="font-serif text-4xl md:text-5xl font-bold mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Press Kit
            </h2>
            <p className="text-[#f0e8d7]/50 max-w-xl">
              Professional materials for booking agents, press, churches, institutions, and media. Download individual documents or the complete press kit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EPK_DOCS.map((doc) => (
              <button
                key={doc.id}
                onClick={() => handleDownload(doc)}
                disabled={downloading === doc.id}
                className={`group text-left p-6 border transition-all duration-200 disabled:opacity-60 disabled:cursor-wait ${
                  doc.featured
                    ? 'border-[#b8860b] bg-[#b8860b]/5 hover:bg-[#b8860b]/10 md:col-span-2'
                    : 'border-[#f0e8d7]/10 bg-[#111009] hover:border-[#b8860b]/50 hover:bg-[#1a1812]'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded ${doc.featured ? 'bg-[#b8860b]/20' : 'bg-[#f0e8d7]/5'}`}>
                      {doc.icon === 'archive' ? (
                        <Archive size={20} className={doc.featured ? 'text-[#b8860b]' : 'text-[#f0e8d7]/50'} />
                      ) : (
                        <FileText size={20} className={doc.featured ? 'text-[#b8860b]' : 'text-[#f0e8d7]/50'} />
                      )}
                    </div>
                    <div>
                      <h3 className={`font-bold mb-1 ${doc.featured ? 'text-[#b8860b] text-lg' : 'text-[#f0e8d7]'}`}>
                        {doc.title}
                      </h3>
                      <p className="text-[#f0e8d7]/50 text-sm">{doc.description}</p>
                      {doc.featured && (
                        <div className="flex items-center gap-3 mt-3">
                          <span className="flex items-center gap-1 text-xs text-[#f0e8d7]/40">
                            <FileText size={11} /> 3 PDFs
                          </span>
                          <span className="flex items-center gap-1 text-xs text-[#f0e8d7]/40">
                            <ImageIcon size={11} /> 4 Photos
                          </span>
                          <span className="flex items-center gap-1 text-xs text-[#f0e8d7]/40">
                            <Archive size={11} /> ZIP Bundle
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={`flex-shrink-0 p-2 rounded transition-colors ${
                    doc.featured
                      ? 'bg-[#b8860b] text-[#0d0c0b] group-hover:bg-[#a07808]'
                      : 'bg-[#f0e8d7]/5 text-[#f0e8d7]/50 group-hover:bg-[#b8860b]/20 group-hover:text-[#b8860b]'
                  }`}>
                    {downloading === doc.id ? (
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Download size={18} />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Photo Preview Strip */}
          <div className="mt-8">
            <p className="text-xs text-[#f0e8d7]/30 font-mono tracking-widest uppercase mb-4">
              Press Photos (included in full kit)
            </p>
            <div className="grid grid-cols-4 gap-2">
              {[PORTRAIT_1, HERO_IMAGE, PHOTO_CAMO, ALBUM_COVER].map((src, i) => (
                <div key={i} className="aspect-square overflow-hidden bg-[#1a1812]">
                  <img
                    src={src}
                    alt={`Press photo ${i + 1}`}
                    className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Booking & Contact ─────────────────────────────────────────────── */}
      <section id="booking" className="py-24 px-6 bg-[#0f0e0c] border-t border-[#b8860b]/20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <div className="w-10 h-[2px] bg-[#b8860b] mb-6" />
            <h2
              className="font-serif text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Get in Touch
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border border-[#f0e8d7]/10 bg-[#111009]">
              <h3
                className="font-serif text-2xl font-bold text-[#b8860b] mb-3"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Book MOSES
              </h3>
              <p className="text-[#f0e8d7]/60 mb-6 leading-relaxed">
                For concerts, churches, schools, conferences, community organizations, and institutional events.
              </p>
              <a
                href="mailto:booking@mosessog.com"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#b8860b] text-[#b8860b] hover:bg-[#b8860b] hover:text-[#0d0c0b] font-bold transition-colors text-sm"
              >
                <Mail size={16} />
                booking@mosessog.com
              </a>
            </div>

            <div className="p-8 border border-[#f0e8d7]/10 bg-[#111009]">
              <h3
                className="font-serif text-2xl font-bold text-[#b8860b] mb-3"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Media &amp; Partnerships
              </h3>
              <p className="text-[#f0e8d7]/60 mb-6 leading-relaxed">
                For interviews, collaborations, licensing, sponsorships, and educational initiatives.
              </p>
              <a
                href="mailto:media@mosessog.com"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#b8860b] text-[#b8860b] hover:bg-[#b8860b] hover:text-[#0d0c0b] font-bold transition-colors text-sm"
              >
                <Mail size={16} />
                media@mosessog.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer Social ─────────────────────────────────────────────────── */}
      <section className="py-12 px-6 bg-[#0d0c0b] border-t border-[#b8860b]/20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p
            className="font-serif text-2xl font-bold"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            MOSES SOG
          </p>
          <div className="flex gap-6">
            {[
              { label: 'Instagram', href: 'https://instagram.com/mosessog' },
              { label: 'YouTube', href: 'https://youtube.com/@mosessog' },
              { label: 'TikTok', href: 'https://tiktok.com/@mosessog' },
              { label: 'Twitter', href: 'https://twitter.com/mosessog' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#b8860b] hover:text-[#f0e8d7] transition-colors text-sm"
              >
                {s.label}
                <ExternalLink size={11} />
              </a>
            ))}
          </div>
          <p className="text-[#f0e8d7]/30 text-xs font-mono">@mosessog · mosessog.com</p>
        </div>
      </section>

    </div>
  );
}
