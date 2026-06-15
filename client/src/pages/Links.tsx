import { ExternalLink, Play, ChevronRight } from 'lucide-react';

// Artist photo for header
const PORTRAIT = '/manus-storage/TOP_05_8692d459.jpg';

// Videos mirrored from Artist.tsx
const VIDEOS = [
  {
    id: 'rainbow-push',
    title: 'The Stage',
    subtitle: 'Rainbow PUSH Coalition Keynote',
    youtubeId: 'D94a9DKh1es',
    label: 'KEYNOTE PERFORMANCE',
  },
  {
    id: 'church',
    title: 'The Beginning',
    subtitle: 'Church',
    youtubeId: 'CC3lHW_usho',
    label: 'MUSIC VIDEO',
  },
  {
    id: 'final-prayer',
    title: 'The Message',
    subtitle: 'Final Prayer',
    youtubeId: 'xn0KdOotyTI',
    label: 'MUSIC VIDEO',
  },
];

export default function Links() {
  return (
    <div className="min-h-screen bg-[#0d0c0b] text-[#f0e8d7]">

      {/* ── Avatar + Name ─────────────────────────────────────────── */}
      <div className="flex flex-col items-center pt-12 pb-8 px-6">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#b8860b] mb-4 shadow-lg">
          <img
            src={PORTRAIT}
            alt="Moses Sog"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <h1 className="font-bebas text-3xl tracking-widest text-[#f0e8d7]">MOSES SOG</h1>
        <p className="text-[#b8860b] text-sm font-cormorant italic mt-1 tracking-wide">
          Prophetic Hip-Hop · Chicago
        </p>
      </div>

      {/* ── Links ─────────────────────────────────────────────────── */}
      <div className="max-w-md mx-auto px-5 pb-16 space-y-3">

        {/* ── THE VAULT (primary CTA) ── */}
        <a
          href="https://mosessog.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <div className="relative overflow-hidden rounded-sm border border-[#b8860b] bg-[#b8860b]/10 px-5 py-4 hover:bg-[#b8860b]/20 transition-all duration-200">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-mono text-[#b8860b] tracking-widest uppercase">The Vault</span>
                </div>
                <h2 className="font-bebas text-2xl tracking-widest text-[#f0e8d7] leading-none">
                  MOSESSOG.COM
                </h2>
                <p className="text-[#888880] text-xs mt-1">
                  Music · Projects · Store · Artist Page
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-[#b8860b] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
            </div>
          </div>
        </a>

        {/* ── Divider ── */}
        <div className="flex items-center gap-3 py-2">
          <div className="flex-1 h-px bg-[#2a2928]" />
          <span className="text-[10px] font-mono text-[#555550] tracking-widest uppercase">Videos</span>
          <div className="flex-1 h-px bg-[#2a2928]" />
        </div>

        {/* ── Video links ── */}
        {VIDEOS.map((video) => (
          <a
            key={video.id}
            href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="rounded-sm border border-[#2a2928] bg-[#141312] overflow-hidden hover:border-[#555550] transition-all duration-200">
              <div className="flex items-stretch gap-0">
                {/* Thumbnail */}
                <div className="relative w-28 flex-shrink-0 overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                    alt={video.subtitle}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                    }}
                  />
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#b8860b]/90 flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 text-[#0d0c0b] fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1 px-4 py-3 flex flex-col justify-center">
                  <span className="text-[9px] font-mono text-[#b8860b] tracking-widest uppercase mb-0.5">
                    {video.label}
                  </span>
                  <h3 className="font-bebas text-lg tracking-wide text-[#f0e8d7] leading-none">
                    {video.subtitle}
                  </h3>
                  <p className="text-[#555550] text-xs mt-0.5 italic font-cormorant">
                    {video.title}
                  </p>
                </div>

                <div className="flex items-center pr-4">
                  <ChevronRight className="w-4 h-4 text-[#555550] group-hover:text-[#b8860b] transition-colors" />
                </div>
              </div>
            </div>
          </a>
        ))}

        {/* ── Divider ── */}
        <div className="flex items-center gap-3 py-2">
          <div className="flex-1 h-px bg-[#2a2928]" />
          <span className="text-[10px] font-mono text-[#555550] tracking-widest uppercase">Follow</span>
          <div className="flex-1 h-px bg-[#2a2928]" />
        </div>

        {/* ── Social links ── */}
        {[
          { label: 'Instagram', handle: '@mosessog', href: 'https://instagram.com/mosessog' },
          { label: 'YouTube', handle: '@mosessog', href: 'https://youtube.com/@mosessog' },
          { label: 'TikTok', handle: '@mosessog', href: 'https://tiktok.com/@mosessog' },
          { label: 'Twitter / X', handle: '@mosessog', href: 'https://twitter.com/mosessog' },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="rounded-sm border border-[#2a2928] bg-[#141312] px-5 py-3 hover:border-[#555550] transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bebas text-base tracking-widest text-[#f0e8d7]">{s.label}</span>
                  <span className="text-[#555550] text-xs ml-2 font-mono">{s.handle}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#555550] group-hover:text-[#b8860b] transition-colors" />
              </div>
            </div>
          </a>
        ))}

      </div>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <div className="text-center pb-10">
        <p className="text-[#2a2928] text-xs font-mono tracking-widest">MOSES SOG · CHICAGO</p>
      </div>
    </div>
  );
}
