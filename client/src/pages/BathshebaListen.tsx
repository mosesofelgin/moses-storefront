import { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import { Play, Pause, SkipBack, SkipForward, Volume2, Download, Music } from 'lucide-react';
import { bathshebaProject, bathshebaTrackList } from '../data/bathsheba-bundle';

export default function BathshebaListen() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isDownloadingFull, setIsDownloadingFull] = useState(false);
  const [downloadingTrackId, setDownloadingTrackId] = useState<number | null>(null);

  const currentTrack = bathshebaTrackList[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(err => console.error('Play error:', err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (currentTrackIndex < bathshebaTrackList.length - 1) {
        setCurrentTrackIndex(currentTrackIndex + 1);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
      setCurrentTime(0);
    }
  };

  const handleNext = () => {
    if (currentTrackIndex < bathshebaTrackList.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
      setCurrentTime(0);
    }
  };

  const handleTrackClick = (index: number) => {
    setCurrentTrackIndex(index);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleDownloadTrack = async (track: typeof bathshebaTrackList[0]) => {
    setDownloadingTrackId(track.id);
    try {
      const link = document.createElement('a');
      link.href = track.url;
      link.download = `${track.number.toString().padStart(2, '0')}-${track.title}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloadingTrackId(null);
    }
  };

  const handleDownloadFull = async () => {
    setIsDownloadingFull(true);
    try {
      const link = document.createElement('a');
      link.href = '/api/download/bathsheba';
      link.download = 'BATHSHEBA-Project.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloadingFull(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-black text-white">
      {/* Header */}
      <header className="border-b border-purple-800/50 px-4 py-4 sm:py-6 sticky top-0 z-50 backdrop-blur-sm bg-black/30">
        <div className="mx-auto max-w-6xl">
          <Link href="/bathsheba" className="text-purple-300 hover:text-purple-100 transition-colors text-xs sm:text-sm font-mono uppercase tracking-wide">
            ← Back to Project
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-6xl">
          {/* Player Section */}
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-3 mb-12">
            {/* Album Art & Now Playing - Left Column */}
            <div className="lg:col-span-1 flex flex-col items-center">
              <div className="relative w-full max-w-xs mb-6">
                <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-lg" />
                <img
                  src={bathshebaProject.coverArt}
                  alt="BATHSHEBA"
                  className="relative w-full rounded-lg object-cover shadow-2xl border border-purple-700/50"
                />
              </div>

              {/* Now Playing Info */}
              <div className="w-full text-center">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-purple-400 mb-2">
                  Now Playing
                </p>
                <h2 className="font-bebas text-2xl sm:text-3xl text-purple-200 mb-1 line-clamp-2">
                  {currentTrack.title}
                </h2>
                <p className="text-xs sm:text-sm text-purple-300">
                  Track {currentTrack.number} of {bathshebaTrackList.length}
                </p>
              </div>
            </div>

            {/* Player Controls - Right Column */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              {/* Progress Bar */}
              <div className="mb-6 sm:mb-8">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleProgressChange}
                  className="w-full h-2 bg-purple-800/50 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 transition-colors"
                />
                <div className="flex justify-between text-xs sm:text-sm text-purple-300 mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-3 sm:gap-6 mb-8 sm:mb-10">
                <button
                  onClick={handlePrevious}
                  disabled={currentTrackIndex === 0}
                  className="p-2 sm:p-3 rounded-full bg-purple-900/50 hover:bg-purple-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Previous track"
                >
                  <SkipBack className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>

                <button
                  onClick={handlePlayPause}
                  className="p-3 sm:p-4 rounded-full bg-purple-600 hover:bg-purple-500 transition-colors shadow-lg shadow-purple-600/50"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5 sm:h-6 sm:w-6" />
                  ) : (
                    <Play className="h-5 w-5 sm:h-6 sm:w-6 ml-0.5" />
                  )}
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentTrackIndex === bathshebaTrackList.length - 1}
                  className="p-2 sm:p-3 rounded-full bg-purple-900/50 hover:bg-purple-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Next track"
                >
                  <SkipForward className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-2 sm:gap-3 px-2 py-3 sm:py-4 rounded-lg bg-purple-900/30 border border-purple-800/50">
                <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400 flex-shrink-0" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-2 bg-purple-800/50 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <span className="text-xs text-purple-300 w-8 text-right">{Math.round(volume * 100)}%</span>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-6 sm:mt-8">
                <button
                  onClick={handleDownloadFull}
                  disabled={isDownloadingFull}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bebas text-sm sm:text-base tracking-wide"
                >
                  <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                  {isDownloadingFull ? 'Downloading...' : 'Download Full Project'}
                </button>
              </div>
            </div>
          </div>

          {/* Tracklist */}
          <div className="mt-12 sm:mt-16">
            <h3 className="font-bebas text-2xl sm:text-3xl text-purple-200 mb-4 sm:mb-6 flex items-center gap-2">
              <Music className="h-6 w-6 sm:h-7 sm:w-7" />
              Tracklist
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {bathshebaTrackList.map((track, index) => (
                <div
                  key={track.id}
                  className={`flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg cursor-pointer transition-all ${
                    index === currentTrackIndex
                      ? 'bg-purple-700 border border-purple-500 shadow-lg shadow-purple-600/30'
                      : 'bg-purple-900/30 hover:bg-purple-800/50 border border-purple-800/50 hover:border-purple-700'
                  }`}
                  onClick={() => handleTrackClick(index)}
                >
                  {/* Track Number & Visualizer */}
                  <div className="flex-shrink-0 w-8 sm:w-10 flex items-center justify-center">
                    {index === currentTrackIndex && isPlaying ? (
                      <div className="flex gap-1">
                        <div className="h-3 w-1 bg-purple-300 rounded-full animate-pulse" />
                        <div className="h-3 w-1 bg-purple-300 rounded-full animate-pulse delay-100" />
                        <div className="h-3 w-1 bg-purple-300 rounded-full animate-pulse delay-200" />
                      </div>
                    ) : (
                      <span className="font-mono text-xs sm:text-sm text-purple-400 font-bold">
                        {track.number.toString().padStart(2, '0')}
                      </span>
                    )}
                  </div>

                  {/* Track Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bebas text-base sm:text-lg text-white truncate">
                      {track.title}
                    </p>
                    <p className="text-xs text-purple-300">
                      {track.duration}
                    </p>
                  </div>

                  {/* Duration & Download */}
                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <span className="text-xs sm:text-sm text-purple-300 hidden sm:inline">
                      {track.duration}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadTrack(track);
                      }}
                      disabled={downloadingTrackId === track.id}
                      className="p-2 rounded-lg bg-purple-800 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      title="Download track"
                    >
                      <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Info */}
          <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-lg bg-purple-900/30 border border-purple-800/50">
            <h4 className="font-bebas text-xl sm:text-2xl text-purple-200 mb-3 sm:mb-4">
              About BATHSHEBA
            </h4>
            <p className="text-sm sm:text-base text-purple-300 leading-relaxed">
              A 10-track project rooted in royalty, grace, and creative sovereignty. Each track is crafted with intention and artistic excellence. Download the full project or individual tracks to take this experience with you.
            </p>
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.url}
        crossOrigin="anonymous"
        preload="metadata"
      />
    </div>
  );
}
