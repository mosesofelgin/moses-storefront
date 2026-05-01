import { CLARITY_BUNDLE } from '@/data/clarity-bundle';

interface AlbumArtDisplayProps {
  isPlaying?: boolean;
}

export default function AlbumArtDisplay({ isPlaying }: AlbumArtDisplayProps) {
  const albumCover = CLARITY_BUNDLE.images.find(img => img.title === "CLARITY Album Cover");
  
  if (!albumCover) return null;

  return (
    <div className="mb-8 flex justify-center">
      <div className={`relative ${isPlaying ? 'scale-105' : 'scale-100'} transition-transform duration-300`}>
        <img
          src={albumCover.url}
          alt="CLARITY Album Cover"
          className="w-full max-w-sm rounded-lg shadow-2xl"
        />
        {isPlaying && (
          <div className="absolute inset-0 rounded-lg border-2 border-green-500 opacity-50" />
        )}
      </div>
    </div>
  );
}
