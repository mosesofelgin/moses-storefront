import { useState, useRef, useEffect } from 'react';
import { Music, Download, ArrowRight, Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dedicationBundle } from '@/data/dedication-bundle';
import { Link } from 'wouter';

export default function Mixtape() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = dedicationBundle.tracks[currentTrackIndex];

  // Handle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle next track
  const playNext = () => {
    if (currentTrackIndex < dedicationBundle.tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  // Handle previous track
  const playPrevious = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  // Handle track selection
  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  // Update time as audio plays
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', playNext);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', playNext);
    };
  }, [currentTrackIndex]);

  // Auto-play when track changes
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [currentTrackIndex]);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch('/api/download/dedication');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'DEDICATION-Mixtape.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={currentTrack?.url}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00ff00] to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Album Art */}
            <div className="flex justify-center">
              <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#00ff00]">
                <img
                  src={dedicationBundle.albumCover}
                  alt="Dedication Mixtape"
                  className="w-full h-full object-cover"
                />
                {isPlaying && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="animate-pulse">
                      <Music className="w-16 h-16 text-[#00ff00]" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Info & Player */}
            <div className="text-center md:text-left">
              <div className="mb-4 text-sm font-mono text-[#00ff00] uppercase tracking-widest">
                Free Mixtape
              </div>

              <h1 className="font-bebas text-6xl md:text-7xl mb-4 tracking-wider">
                DEDICATION
              </h1>

              <p className="font-cormorant text-2xl italic text-zinc-300 mb-6">
                A 14-track homage to Lil Wayne
              </p>

              <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                Listen now. Download free. No email required. Direct from MOSES SOG.
              </p>

              {/* Player Controls */}
              <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800 mb-8">
                {/* Current Track Info */}
                <div className="mb-6">
                  <div className="text-sm text-zinc-400 mb-2">Now Playing</div>
                  <div className="font-bebas text-xl text-[#00ff00] truncate">
                    {currentTrack?.title}
                  </div>
                  <div className="text-sm text-zinc-500">{currentTrack?.artist}</div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={(e) => {
                      if (audioRef.current) {
                        audioRef.current.currentTime = parseFloat(e.target.value);
                        setCurrentTime(parseFloat(e.target.value));
                      }
                    }}
                    className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-[#00ff00]"
                  />
                  <div className="flex justify-between text-xs text-zinc-500 mt-2">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <button
                    onClick={playPrevious}
                    disabled={currentTrackIndex === 0}
                    className="p-2 rounded-full hover:bg-zinc-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>

                  <button
                    onClick={togglePlayPause}
                    className="p-3 rounded-full bg-[#00ff00] text-black hover:bg-[#00dd00] transition"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6 ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={playNext}
                    disabled={currentTrackIndex === dedicationBundle.tracks.length - 1}
                    className="p-2 rounded-full hover:bg-zinc-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-3">
                  <Volume2 className="w-4 h-4 text-zinc-500" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => {
                      const newVolume = parseFloat(e.target.value);
                      setVolume(newVolume);
                      if (audioRef.current) {
                        audioRef.current.volume = newVolume;
                      }
                    }}
                    className="flex-1 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-[#00ff00]"
                  />
                </div>
              </div>

              {/* Download Button */}
              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full bg-[#00ff00] text-black hover:bg-[#00dd00] text-lg px-8 py-6 font-bold"
              >
                <Download className="mr-2 w-5 h-5" />
                {isDownloading ? 'Downloading...' : 'Download Free'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tracklist Section */}
      <section className="px-4 py-20 bg-zinc-900/30 border-t border-zinc-800">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-bebas text-4xl mb-12 tracking-wider uppercase">Tracklist</h2>

          <div className="space-y-2">
            {dedicationBundle.tracks.map((track, index) => (
              <div
                key={track.id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                  currentTrackIndex === index
                    ? 'border-[#00ff00] bg-zinc-800/50'
                    : 'border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50'
                }`}
              >
                <button
                  onClick={() => selectTrack(index)}
                  className="flex items-center gap-4 flex-1 text-left hover:opacity-80 transition"
                >
                  {currentTrackIndex === index ? (
                    isPlaying ? (
                      <div className="w-5 h-5 flex items-center justify-center">
                        <Pause className="w-4 h-4 text-[#00ff00]" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 flex items-center justify-center">
                        <Play className="w-4 h-4 text-[#00ff00] ml-0.5" />
                      </div>
                    )
                  ) : (
                    <Music className="w-5 h-5 text-zinc-600" />
                  )}
                  <div className="flex-1">
                    <div
                      className={`font-mono font-semibold ${
                        currentTrackIndex === index ? 'text-[#00ff00]' : 'text-white'
                      }`}
                    >
                      {track.title}
                    </div>
                    <div className="text-sm text-zinc-500">{track.artist}</div>
                  </div>
                  <div className="text-sm text-zinc-400 ml-4">{track.duration}</div>
                </button>
                <button
                  className="ml-4 p-2 rounded hover:bg-zinc-700 transition text-zinc-400 hover:text-[#00ff00]"
                  title="Download MP3"
                  onClick={async (e) => {
                    e.stopPropagation();
                    try {
                      const response = await fetch(track.url);
                      if (!response.ok) throw new Error(`HTTP ${response.status}`);
                      const blob = await response.blob();
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${track.title}.mp3`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      setTimeout(() => URL.revokeObjectURL(url), 10000);
                    } catch (err) {
                      console.error('Track download failed:', err);
                    }
                  }}
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
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
