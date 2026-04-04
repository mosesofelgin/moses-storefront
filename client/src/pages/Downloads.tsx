import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { CLARITY_BUNDLE } from '@/data/clarity-bundle';
import { Button } from '@/components/ui/button';
import { Download, CheckCircle, Music, Image as ImageIcon, FileText, AlertCircle } from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function Downloads() {
  const [location, navigate] = useLocation();
  const [token, setToken] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [downloadingZip, setDownloadingZip] = useState(false);

  // Verify token with backend
  const verifyTokenMutation = trpc.downloads.verifyToken.useQuery(
    { token: token || '' },
    { enabled: !!token }
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const downloadToken = searchParams.get('token');
    
    if (downloadToken) {
      setToken(downloadToken);
    } else {
      setLoading(false);
    }
  }, []);

  // Check verification result
  useEffect(() => {
    if (verifyTokenMutation.isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
      setIsValid(verifyTokenMutation.data?.valid ?? false);
    }
  }, [verifyTokenMutation.data, verifyTokenMutation.isLoading]);

  const handleDownload = (fileId: string, filename: string) => {
    if (!token) return;
    
    // Use backend endpoint for authenticated downloads
    const downloadUrl = `/api/download/${token}/${fileId}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = async () => {
    if (!token) return;
    
    setDownloadingZip(true);
    try {
      const downloadUrl = `/api/download/all/${token}`;
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'CLARITY-Album-Bundle.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('ZIP download failed:', error);
    } finally {
      setDownloadingZip(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="min-h-screen bg-black text-white py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <AlertCircle className="w-16 h-16 text-red-500" />
            </div>
            <h1 className="text-4xl font-display font-bold mb-4">Invalid Link</h1>
            <p className="text-xl text-gray-300 mb-2">
              This download link is not valid or has expired.
            </p>
            <p className="text-gray-400 mb-8">
              Check your email for the correct download link, or purchase CLARITY again.
            </p>
            <Button
              onClick={() => navigate('/')}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-4xl font-display font-bold mb-4">Your Downloads</h1>
          <p className="text-xl text-gray-300 mb-2">
            CLARITY Album Bundle
          </p>
          <p className="text-gray-400">
            Download your files anytime using this link.
          </p>
        </div>

        {/* Download Section */}
        <div className="bg-zinc-900 rounded-lg p-8 mb-8 border border-zinc-800">
          <h2 className="text-2xl font-display font-bold mb-6">Your Downloads</h2>

          {/* Download All Button */}
          <Button
            onClick={handleDownloadAll}
            disabled={downloadingZip}
            className="w-full bg-red-600 hover:bg-red-700 text-white mb-8 py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-5 h-5 mr-2" />
            {downloadingZip ? 'Creating ZIP...' : 'Download Everything'}
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
                    onClick={() => handleDownload(`track-${String(track.id).padStart(2, '0')}`, `${track.id}-${track.title}.mp3`)}
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
                  onClick={() => handleDownload(`image-${String(image.id).padStart(2, '0')}`, `${image.title}.jpg`)}
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
                'lyric-book',
                'CLARITY-Lyric-Book.pdf'
              )}
              className="w-full bg-zinc-800 p-4 rounded hover:bg-zinc-700 transition text-left flex items-center justify-between"
            >
              <span className="font-medium">{CLARITY_BUNDLE.lyricBook.title}</span>
              <Download className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="bg-zinc-900 rounded-lg p-8 border border-zinc-800 mb-8">
          <h3 className="text-lg font-semibold mb-4">About Your Downloads</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-red-500 mr-3 mt-1">•</span>
              <span>All files are ready to download immediately</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3 mt-1">•</span>
              <span>You can access this page anytime with your unique link</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3 mt-1">•</span>
              <span>Download individual files or everything at once</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3 mt-1">•</span>
              <span>Share CLARITY with your network</span>
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
