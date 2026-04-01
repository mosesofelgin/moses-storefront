import { useState } from 'react';
import { Music, Calendar, Youtube, Radio, Globe } from 'lucide-react';

interface BookingFormData {
  name: string;
  email: string;
  eventType: string;
  eventDate: string;
  message: string;
}

export default function Links() {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    eventType: '',
    eventDate: '',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Booking inquiry submitted:', formData);
    setShowThankYou(true);
    setFormData({
      name: '',
      email: '',
      eventType: '',
      eventDate: '',
      message: '',
    });
    setTimeout(() => {
      setShowBookingForm(false);
      setShowThankYou(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-neutral-800 bg-black/95 backdrop-blur">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bebas tracking-widest">MOSES</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-6xl font-bebas tracking-widest mb-4">
            MOSES
          </h2>
          <p className="text-neutral-400 font-cormorant text-lg italic">
            Digital Music & Creative Services
          </p>
          <div className="w-16 h-px bg-neutral-700 mx-auto mt-6"></div>
        </div>

        {/* Links Grid */}
        <div className="space-y-4">
          {/* Shop Link */}
          <a
            href="/"
            className="block group"
          >
            <div className="border border-neutral-700 p-6 hover:border-neutral-500 transition-colors duration-300">
              <div className="flex items-center gap-4">
                <Music className="w-6 h-6 text-neutral-400 group-hover:text-white transition-colors" />
                <div className="flex-1">
                  <h3 className="font-bebas text-xl tracking-wide">SHOP</h3>
                  <p className="text-neutral-500 text-sm font-dm-mono">
                    Purchase Clarity Album
                  </p>
                </div>
                <span className="text-neutral-600 group-hover:text-neutral-400 transition-colors">
                  →
                </span>
              </div>
            </div>
          </a>

          {/* Book Now Link */}
          <button
            onClick={() => setShowBookingForm(true)}
            className="w-full text-left group"
          >
            <div className="border border-neutral-700 p-6 hover:border-neutral-500 transition-colors duration-300">
              <div className="flex items-center gap-4">
                <Calendar className="w-6 h-6 text-neutral-400 group-hover:text-white transition-colors" />
                <div className="flex-1">
                  <h3 className="font-bebas text-xl tracking-wide">BOOK NOW</h3>
                  <p className="text-neutral-500 text-sm font-dm-mono">
                    Performance Inquiries
                  </p>
                </div>
                <span className="text-neutral-600 group-hover:text-neutral-400 transition-colors">
                  →
                </span>
              </div>
            </div>
          </button>

          {/* YouTube Playlist */}
          <a
            href="https://www.youtube.com/playlist?list=PLTt1W4MaPgT3799Kyqr9oAV62pPsOAxS0"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="border border-neutral-700 p-6 hover:border-neutral-500 transition-colors duration-300">
              <div className="flex items-center gap-4">
                <Youtube className="w-6 h-6 text-neutral-400 group-hover:text-white transition-colors" />
                <div className="flex-1">
                  <h3 className="font-bebas text-xl tracking-wide">YOUTUBE</h3>
                  <p className="text-neutral-500 text-sm font-dm-mono">
                    Clarity Playlist
                  </p>
                </div>
                <span className="text-neutral-600 group-hover:text-neutral-400 transition-colors">
                  ↗
                </span>
              </div>
            </div>
          </a>

          {/* Streaming Link */}
          <a
            href="https://distrokid.com/hyperfollow/mosesofelgin/clarity?ref=release"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="border border-neutral-700 p-6 hover:border-neutral-500 transition-colors duration-300">
              <div className="flex items-center gap-4">
                <Radio className="w-6 h-6 text-neutral-400 group-hover:text-white transition-colors" />
                <div className="flex-1">
                  <h3 className="font-bebas text-xl tracking-wide">STREAMING</h3>
                  <p className="text-neutral-500 text-sm font-dm-mono">
                    Listen on All Platforms
                  </p>
                </div>
                <span className="text-neutral-600 group-hover:text-neutral-400 transition-colors">
                  ↗
                </span>
              </div>
            </div>
          </a>

          {/* Transform Your Website */}
          <a
            href="https://www.sharetheicecream.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="border border-neutral-700 p-6 hover:border-neutral-500 transition-colors duration-300">
              <div className="flex items-center gap-4">
                <Globe className="w-6 h-6 text-neutral-400 group-hover:text-white transition-colors" />
                <div className="flex-1">
                  <h3 className="font-bebas text-xl tracking-wide">TRANSFORM YOUR WEBSITE</h3>
                  <p className="text-neutral-500 text-sm font-dm-mono">
                    Share the Ice Cream
                  </p>
                </div>
                <span className="text-neutral-600 group-hover:text-neutral-400 transition-colors">
                  ↗
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-lg max-w-md w-full p-8">
            {showThankYou ? (
              <div className="text-center">
                <div className="mb-4 text-4xl">✓</div>
                <h3 className="font-bebas text-2xl tracking-wide mb-2">
                  THANK YOU
                </h3>
                <p className="text-neutral-400 font-dm-mono text-sm">
                  Your booking inquiry has been submitted. We'll be in touch soon!
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-bebas text-2xl tracking-wide mb-6">
                  BOOK A PERFORMANCE
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-dm-mono text-neutral-400 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-dm-mono text-neutral-400 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-dm-mono text-neutral-400 mb-2">
                      Event Type
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
                    >
                      <option value="">Select event type</option>
                      <option value="concert">Concert</option>
                      <option value="festival">Festival</option>
                      <option value="private-event">Private Event</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-dm-mono text-neutral-400 mb-2">
                      Event Date (Approximate)
                    </label>
                    <input
                      type="text"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors"
                      placeholder="e.g., Q2 2026"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-dm-mono text-neutral-400 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors resize-none"
                      placeholder="Tell us about your opportunity..."
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowBookingForm(false)}
                      className="flex-1 border border-neutral-700 py-2 rounded font-dm-mono text-sm hover:border-neutral-500 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-white text-black py-2 rounded font-dm-mono text-sm font-semibold hover:bg-neutral-200 transition-colors"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
