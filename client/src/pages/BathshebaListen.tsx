import { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import { Play, Pause, SkipBack, SkipForward, Volume2, Download } from 'lucide-react';
import { bathshebaProject, bathshebaTrackList } from '../data/bathsheba-bundle';

export default function BathshebaListen() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const currentTrack = bathshebaTrackList[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play();
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

  const handleDownloadTrack = (track: typeof bathshebaTrackList[0]) => {
    const link = document.createElement('a');
    link.href = track.url;
    link.download = `${track.number}-${track.title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-black text-white">
      {/* Header */}
      <header className="border-b border-purple-800 px-4 py-6 sm:py-8">
        <div className="mx-auto max-w-4xl">
          <Link href="/bathsheba" className="text-purple-300 hover:text-purple-100 transition-colors text-sm font-mono uppercase tracking-wide">
            ← Back to Project
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          {/* Album Art & Player */}
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-start mb-12">
            {/* Album Art */}
            <div className="flex justify-center md:justify-start">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-lg" />
                <img
                  src={bathshebaProject.coverArt}
                  alt="BATHSHEBA"
                  className="relative h-64 w-64 sm:h-80 sm:w-80 rounded-lg object-cover shadow-2xl"
                />
              </div>
            </div>

            {/* Player Controls */}
            <div className="space-y-8">
              {/* Now Playing */}
              <div className="space-y-4">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-purple-400">
                  Now Playing
                </p>
                <div>
                  <h2 className="font-bebas text-4xl text-purple-200 mb-2">
                    {currentTrack.title}
                  </h2>
                  <p className="text-purple-300">
                    Track {currentTrack.number} of {bathshebaTrackList.length}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleProgressChange}
                  className="w-full h-2 bg-purple-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-xs text-purple-300">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentTrackIndex === 0}
                  className="p-3 rounded-full bg-purple-900 hover:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <SkipBack className="h-5 w-5" />
                </button>

                <button
                  onClick={handlePlayPause}
                  className="p-4 rounded-full bg-purple-600 hover:bg-purple-500 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6 ml-0.5" />
                  )}
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentTrackIndex === bathshebaTrackList.length - 1}
                  className="p-3 rounded-full bg-purple-900 hover:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <SkipForward className="h-5 w-5" />
                </button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3 pt-4 border-t border-purple-800">
                <Volume2 className="h-4 w-4 text-purple-400" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-2 bg-purple-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Tracklist */}
          <div className="space-y-4">
            <h3 className="font-bebas text-2xl text-purple-200 mb-6">Tracklist</h3>
            <div className="space-y-2">
              {bathshebaTrackList.map((track, index) => (
                <div
                  key={track.id}
                  className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-colors ${
                    index === currentTrackIndex
                      ? 'bg-purple-700 border border-purple-500'
                      : 'bg-purple-900/30 hover:bg-purple-800/50 border border-purple-800'
                  }`}
                  onClick={() => handleTrackClick(index)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      {index === currentTrackIndex && isPlaying && (
                        <div className="flex gap-1">
                          <div className="h-3 w-1 bg-purple-300 rounded-full animate-pulse" />
                          <div className="h-3 w-1 bg-purple-300 rounded-full animate-pulse delay-100" />
                          <div className="h-3 w-1 bg-purple-300 rounded-full animate-pulse delay-200" />
                        </div>
                      )}
                      <span className="font-mono text-sm text-purple-400 w-8">
                        {track.number.toString().padStart(2, '0')}
                      </span>
                    </div>
                    <p className="font-bebas text-lg text-white truncate">
                      {track.title}
                    </p>
                  </div>
                  <span className="text-sm text-purple-300">{track.duration}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadTrack(track);
                    }}
                    className="p-2 rounded-lg bg-purple-800 hover:bg-purple-700 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.url}
        crossOrigin="anonymous"
      />
    </div>
  );
}
