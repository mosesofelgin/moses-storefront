import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { CLARITY_BUNDLE } from '@/data/clarity-bundle';
import { Button } from '@/components/ui/button';
import { Download, CheckCircle, Music, Image as ImageIcon, FileText, Play, ExternalLink } from 'lucide-react';

export default function Success() {
  const [location, navigate] = useLocation();
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);
  const [downloadingZip, setDownloadingZip] = useState(false);

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadZip = async () => {
    setDownloadingZip(true);
    try {
      console.log('[Success] Starting ZIP download...');
      const response = await fetch('/api/download/zip');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      console.log('[Success] ZIP blob received:', blob.size, 'bytes');
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'CLARITY-Album-Bundle.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      console.log('[Success] ZIP download complete');
    } catch (error) {
      console.error('[Success] ZIP download failed:', error);
      alert('Failed to download ZIP file. Please try downloading individual files instead.');
    } finally {
      setDownloadingZip(false);
    }
  };

  const handleDownloadAll = () => {
    // Download all tracks
    CLARITY_BUNDLE.tracks.forEach((track, index) => {
      setTimeout(() => {
        handleDownload(track.url, `${String(track.id).padStart(2, '0')}-${track.title}.mp3`);
      }, index * 300);
    });

    // Download all images
    CLARITY_BUNDLE.images.forEach((image, index) => {
      setTimeout(() => {
        handleDownload(image.url, `${image.title}.jpg`);
      }, (CLARITY_BUNDLE.tracks.length + index) * 300);
    });

    // Download lyric book
    setTimeout(() => {
      handleDownload(
        CLARITY_BUNDLE.lyricBook.url,
        'CLARITY-Lyric-Book.pdf'
      );
    }, (CLARITY_BUNDLE.tracks.length + CLARITY_BUNDLE.images.length) * 300);
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-4xl font-display font-bold mb-4">Thank You!</h1>
          <p className="text-xl text-gray-300 mb-2">
            Your purchase of CLARITY is complete.
          </p>
          <p className="text-gray-400">
            Download your album and stream it everywhere.
          </p>
        </div>

        {/* Quick Download Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-8 mb-8 border border-red-500">
          <h2 className="text-2xl font-display font-bold mb-4">Get Your Album</h2>
          <p className="text-red-100 mb-6">Download all 12 tracks, images, and lyric book as a single ZIP file.</p>
          <Button
            onClick={handleDownloadZip}
            disabled={downloadingZip}
            className="w-full bg-white text-red-600 hover:bg-gray-100 font-bold py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-5 h-5 mr-2" />
            {downloadingZip ? 'Creating ZIP... This may take 30-60 seconds' : 'Download Everything (ZIP)'}
          </Button>
          <p className="text-red-100 text-sm mt-3">
            Alternatively, you can download individual files below
          </p>
        </div>

        {/* Music Players Section */}
        <div className="bg-zinc-900 rounded-lg p-8 mb-8 border border-zinc-800">
          <h2 className="text-2xl font-display font-bold mb-6">Play Your Tracks</h2>
          <div className="space-y-4">
            {CLARITY_BUNDLE.tracks.map((track) => (
              <div
                key={track.id}
                className="bg-zinc-800 rounded-lg p-4 hover:bg-zinc-700 transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <p className="font-semibold">{track.id}. {track.title}</p>
                    <p className="text-sm text-gray-400">From CLARITY</p>
                  </div>
                  <button
                    onClick={() => setPlayingTrack(playingTrack === track.id ? null : track.id)}
                    className="text-red-500 hover:text-red-400 transition ml-4"
                  >
                    <Play className="w-6 h-6" fill="currentColor" />
                  </button>
                </div>
                
                {/* Audio Player */}
                {playingTrack === track.id && (
                  <audio
                    controls
                    autoPlay
                    className="w-full mb-3"
                    style={{
                      accentColor: '#dc2626',
                    }}
                  >
                    <source src={track.url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(track.url, `${String(track.id).padStart(2, '0')}-${track.title}.mp3`)}
                  className="text-sm text-gray-400 hover:text-gray-200 transition flex items-center"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download MP3
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Stream Everywhere Section */}
        <div className="bg-zinc-900 rounded-lg p-8 mb-8 border border-zinc-800">
          <h2 className="text-2xl font-display font-bold mb-6">Stream Everywhere</h2>
          <p className="text-gray-300 mb-6">Listen to CLARITY on all major streaming platforms:</p>
          <a
            href="https://distrokid.com/hyperfollow/mosesofelgin/clarity?ref=release"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold py-3 text-lg">
              <ExternalLink className="w-5 h-5 mr-2" />
              Stream on Apple Music, Spotify & More
            </Button>
          </a>
        </div>

        {/* Downloads Section */}
        <div className="bg-zinc-900 rounded-lg p-8 mb-8 border border-zinc-800">
          <h2 className="text-2xl font-display font-bold mb-6">All Downloads</h2>

          {/* Images */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <ImageIcon className="w-5 h-5 mr-2 text-red-500" />
              Brand Images (4)
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {CLARITY_BUNDLE.images.map((image) => (
                <button
                  key={image.id}
                  onClick={() => handleDownload(image.url, `${image.title}.jpg`)}
                  className="bg-zinc-800 p-3 rounded hover:bg-zinc-700 transition text-left"
                >
                  <div className="text-sm font-medium mb-2">{image.title}</div>
                  <Download className="w-4 h-4 text-red-500" />
                </button>
              ))}
            </div>
          </div>

          {/* Lyric Book */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-red-500" />
              Bonus Content
            </h3>
            <button
              onClick={() => handleDownload(
                CLARITY_BUNDLE.lyricBook.url,
                'CLARITY-Lyric-Book.pdf'
              )}
              className="w-full bg-zinc-800 p-4 rounded hover:bg-zinc-700 transition text-left flex items-center justify-between"
            >
              <span className="font-medium">{CLARITY_BUNDLE.lyricBook.title}</span>
              <Download className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-zinc-900 rounded-lg p-8 border border-zinc-800 mb-8">
          <h3 className="text-lg font-semibold mb-4">What's Next?</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-red-500 mr-3 mt-1">•</span>
              <span>All files are ready to download immediately</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3 mt-1">•</span>
              <span>Check your email for a receipt and download links</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3 mt-1">•</span>
              <span>Share CLARITY with your network</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3 mt-1">•</span>
              <span>Follow for updates on the next project</span>
            </li>
          </ul>
        </div>

        {/* Continue Shopping */}
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          className="w-full border-gray-600 text-white hover:bg-zinc-900"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
