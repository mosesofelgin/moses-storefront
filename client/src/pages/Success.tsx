import { useEffect, useState } from 'react';
import { useLocation, useRoute } from 'wouter';
import { CLARITY_BUNDLE } from '@/data/clarity-bundle';
import { Button } from '@/components/ui/button';
import { Download, CheckCircle, Music, Image as ImageIcon, FileText } from 'lucide-react';

export default function Success() {
  const [location, navigate] = useLocation();
  const [, params] = useRoute('/success');
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const sid = searchParams.get('session_id');
    setSessionId(sid);
  }, []);

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = () => {
    // Download all tracks
    CLARITY_BUNDLE.tracks.forEach((track) => {
      setTimeout(() => {
        handleDownload(track.url, `${track.id}-${track.title}.mp3`);
      }, 200);
    });

    // Download all images
    CLARITY_BUNDLE.images.forEach((image) => {
      setTimeout(() => {
        handleDownload(image.url, `${image.title}.jpg`);
      }, 200);
    });

    // Download lyric book
    setTimeout(() => {
      handleDownload(
        CLARITY_BUNDLE.lyricBook.url,
        'CLARITY-Lyric-Book.pdf'
      );
    }, 200);
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
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
            Download your album bundle below.
          </p>
        </div>

        {/* Download Section */}
        <div className="bg-zinc-900 rounded-lg p-8 mb-8 border border-zinc-800">
          <h2 className="text-2xl font-display font-bold mb-6">Your Downloads</h2>

          {/* Download All Button */}
          <Button
            onClick={handleDownloadAll}
            className="w-full bg-red-600 hover:bg-red-700 text-white mb-8 py-3 text-lg font-semibold"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Everything
          </Button>

          {/* Tracks */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Music className="w-5 h-5 mr-2 text-red-500" />
              12 Audio Tracks
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {CLARITY_BUNDLE.tracks.map((track) => (
                <div
                  key={track.id}
                  className="flex items-center justify-between bg-zinc-800 p-3 rounded hover:bg-zinc-700 transition"
                >
                  <span className="text-sm">
                    {track.id}. {track.title}
                  </span>
                  <button
                    onClick={() => handleDownload(track.url, `${track.id}-${track.title}.mp3`)}
                    className="text-red-500 hover:text-red-400 transition"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

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
