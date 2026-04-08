'use client';

import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { CLARITY_BUNDLE } from "@/data/clarity-bundle";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Download,
  Play,
  Pause,
  ExternalLink,
  Music,
  Image as ImageIcon,
  PackageOpen,
  AlertCircle,
  Loader,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Success() {
  const [location] = useLocation();
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [customerEmail, setCustomerEmail] = useState<string | null>(null);

  const sessionVerifyMutation = trpc.session.verify.useQuery(
    { sessionId: sessionId || "" },
    { enabled: !!sessionId }
  );

  // Extract session ID from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("session_id");
    if (id) {
      setSessionId(id);
    } else {
      setIsVerifying(false);
      setIsValid(false);
    }
  }, []);

  // Verify session when query completes
  useEffect(() => {
    if (sessionVerifyMutation.isLoading) {
      setIsVerifying(true);
    } else if (sessionVerifyMutation.data) {
      setIsVerifying(false);
      if (sessionVerifyMutation.data.valid) {
        setIsValid(true);
        setCustomerEmail(sessionVerifyMutation.data.email || null);
      } else {
        setIsValid(false);
        toast.error(sessionVerifyMutation.data.error || "Invalid session");
      }
    } else if (sessionVerifyMutation.error) {
      setIsVerifying(false);
      setIsValid(false);
      toast.error("Failed to verify purchase");
    }
  }, [sessionVerifyMutation.isLoading, sessionVerifyMutation.data, sessionVerifyMutation.error]);

  const playTrack = (track: (typeof CLARITY_BUNDLE.tracks)[0]) => {
    if (audioEl) {
      audioEl.pause();
    }
    if (playingId === track.id) {
      setPlayingId(null);
      setAudioEl(null);
      return;
    }
    const a = new Audio(track.url);
    a.play();
    a.onended = () => {
      setPlayingId(null);
      setAudioEl(null);
    };
    setAudioEl(a);
    setPlayingId(track.id);
  };

  // Loading state
  if (isVerifying) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-400" />
          <p className="text-xl">Verifying your purchase...</p>
        </div>
      </div>
    );
  }

  // Invalid session
  if (!isValid) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Invalid Purchase</h1>
          <p className="text-gray-400 mb-6">
            This download link is either invalid, expired, or the payment was not completed.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            If you just completed a purchase, please check your email for a confirmation link with your download.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  // Valid session - show downloads
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${CLARITY_BUNDLE.images[0].url})` }}
        />
        <div className="relative z-10 text-center py-20 px-4">
          <CheckCircle className="w-14 h-14 text-green-400 mx-auto mb-4" />
          <h1 className="text-5xl font-black tracking-tight mb-3">THANK YOU</h1>
          <p className="text-xl text-gray-300 mb-1">Your copy of CLARITY is ready.</p>
          <p className="text-gray-500 text-sm">All 12 tracks + 5 photos — download below.</p>
          {customerEmail && (
            <p className="text-gray-600 text-xs mt-3">
              Confirmation sent to <span className="font-mono">{customerEmail}</span>
            </p>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-20 space-y-10">

        {/* ── DOWNLOAD EVERYTHING ── */}
        <section className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 text-center">
          <PackageOpen className="w-10 h-10 mx-auto mb-3 text-white" />
          <h2 className="text-xl font-bold mb-1">Download Everything</h2>
          <p className="text-gray-400 text-sm mb-5">
            One ZIP file — all 12 tracks + 5 photos bundled together (~130MB).
          </p>
          <a
            href="/api/download/zip"
            download="CLARITY-by-Moses.zip"
            className="flex items-center justify-center gap-2 w-full bg-white text-black hover:bg-gray-200 font-bold py-4 text-base rounded-md transition"
          >
            <Download className="w-5 h-5" />
            Download CLARITY.zip (17 files)
          </a>
          <p className="text-gray-600 text-xs mt-3">
            The file is ~130MB — your browser will start downloading automatically.
          </p>
        </section>

        {/* ── TRACKS ── */}
        <section>
          <h2 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4 flex items-center gap-2">
            <Music className="w-4 h-4" /> 12 Tracks — individual downloads
          </h2>
          <div className="space-y-2">
            {CLARITY_BUNDLE.tracks.map((track) => (
              <div
                key={track.id}
                className="flex items-center gap-3 bg-zinc-900 hover:bg-zinc-800 transition rounded-lg px-4 py-3"
              >
                <span className="text-gray-600 text-sm w-5 text-right shrink-0">
                  {track.id}
                </span>
                <button
                  onClick={() => playTrack(track)}
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-200 transition"
                  aria-label={playingId === track.id ? "Pause" : "Play"}
                >
                  {playingId === track.id ? (
                    <Pause className="w-4 h-4" fill="currentColor" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                  )}
                </button>
                <span className="flex-1 font-medium text-sm">{track.title}</span>
                <a
                  href={track.url}
                  download={`${track.id}-${track.title}.mp3`}
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded bg-zinc-700 hover:bg-zinc-600 transition"
                  aria-label="Download track"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── IMAGES ── */}
        <section>
          <h2 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4 flex items-center gap-2">
            <ImageIcon className="w-4 h-4" /> 5 Photos
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {CLARITY_BUNDLE.images.map((image, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition rounded-lg flex items-center justify-center">
                  <a
                    href={image.url}
                    download={image.title}
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200 transition"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── STREAM EVERYWHERE ── */}
        <section className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 text-center">
          <Music className="w-10 h-10 mx-auto mb-3 text-blue-400" />
          <h2 className="text-xl font-bold mb-2">Stream Everywhere</h2>
          <p className="text-gray-400 text-sm mb-5">
            Listen on all major platforms — Apple Music, Spotify, YouTube Music, and more.
          </p>
          <a
            href="https://distrokid.com/hyperfollow/mosesofelgin/clarity?ref=release"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            <ExternalLink className="w-4 h-4" />
            Stream on All Platforms
          </a>
        </section>

        {/* ── FOOTER ── */}
        <div className="text-center text-gray-600 text-sm pt-10 border-t border-zinc-800">
          <p>Thank you for supporting independent music.</p>
          <p className="mt-2">
            Questions? Email <a href="mailto:contact@moses.com" className="text-blue-400 hover:underline">contact@moses.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
