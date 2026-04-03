import { useState } from 'react';
import { Lock, Check } from 'lucide-react';

export default function ClarityProject() {
  const [purchased, setPurchased] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrderBump, setShowOrderBump] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const tracks = [
    { id: 1, title: 'Final Prayer by Moses', duration: '3:42' },
    { id: 2, title: 'Wish I had you', duration: '3:15' },
    { id: 3, title: 'Get To The Studio', duration: '2:58' },
    { id: 4, title: 'Over', duration: '3:22' },
    { id: 5, title: 'Fade Away', duration: '3:45' },
    { id: 6, title: 'King', duration: '3:33' },
    { id: 7, title: 'Soulja', duration: '3:28' },
    { id: 8, title: 'Dear Kobe', duration: '3:12' },
    { id: 9, title: 'Refined', duration: '3:50' },
    { id: 10, title: 'Look At All These Blessings', duration: '3:41' },
    { id: 11, title: 'Platform', duration: '3:35' },
    { id: 12, title: 'Sweet Dreams', duration: '3:26' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePurchase = () => {
    if (formData.name && formData.email && formData.cardNumber && formData.expiry && formData.cvc) {
      setPurchased(true);
      setShowCheckout(false);
    }
  };

  const handleOrderBump = () => {
    setShowOrderBump(false);
    // In a real system, this would process the additional charge
  };

  if (purchased && !showOrderBump) {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="sticky top-0 z-50 border-b border-neutral-800 bg-black/95 backdrop-blur">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <h1 className="text-2xl font-bebas tracking-widest">MOSES</h1>
          </div>
        </div>

        {/* Success Content */}
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-green-400" />
              </div>
            </div>
            <h2 className="text-5xl font-bebas tracking-widest mb-4">CLARITY UNLOCKED</h2>
            <p className="text-neutral-400 font-cormorant text-xl italic mb-8">
              Welcome to the project. Your download is ready.
            </p>
          </div>

          {/* Download Section */}
          <div className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-lg mb-12">
            <h3 className="font-bebas text-xl tracking-wide mb-6">Your Album</h3>
            <div className="space-y-3">
              {tracks.map((track) => (
                <div key={track.id} className="flex items-center justify-between p-3 bg-black/50 rounded">
                  <div>
                    <p className="text-white font-dm-mono">{track.title}</p>
                    <p className="text-neutral-500 text-sm">{track.duration}</p>
                  </div>
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-white transition-colors font-dm-mono text-sm"
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="text-center">
            <p className="text-neutral-400 mb-6">
              Thank you for supporting independent art.
            </p>
            <button
              onClick={() => setShowOrderBump(true)}
              className="px-8 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-bebas tracking-wide transition-colors"
            >
              Complete the Journey
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showOrderBump) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bebas tracking-widest mb-4">Complete the Journey</h2>
            <p className="text-neutral-400 font-cormorant text-lg italic">
              Add New Genesis to your collection
            </p>
          </div>

          <div className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-lg mb-8">
            <p className="text-neutral-300 mb-6">
              You've unlocked CLARITY. Now step deeper into the story.
            </p>
            <p className="text-2xl font-bebas tracking-wide mb-8">
              CLARITY + New Genesis Bundle — $15
            </p>
            <button
              onClick={handleOrderBump}
              className="w-full px-8 py-4 bg-white text-black font-bebas tracking-wide hover:bg-neutral-200 transition-colors mb-4"
            >
              Add to Collection
            </button>
            <button
              onClick={() => setShowOrderBump(false)}
              className="w-full px-8 py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-bebas tracking-wide transition-colors"
            >
              Skip for Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-neutral-800 bg-black/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bebas tracking-widest">MOSES</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* SECTION 1: HERO */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bebas tracking-widest leading-tight mb-6">
                10 years. One testimony. This is CLARITY.
              </h1>
              <p className="text-xl text-neutral-300 font-cormorant italic mb-6">
                A 12-song project from Moses—where faith, hip-hop, and the Midwest collide.
              </p>
              <p className="text-neutral-500 font-dm-mono text-sm mb-8 tracking-wide">
                CHICAGO × ELGIN × REAL LIFE × REAL GOD
              </p>
              <button
                onClick={() => setShowCheckout(true)}
                className="px-8 py-4 bg-white text-black font-bebas text-lg tracking-wide hover:bg-neutral-200 transition-colors"
              >
                Get CLARITY — $10
              </button>
            </div>
            <div className="flex justify-center">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663298995484/RyuYxqyoXrjSTTrJPDd5xk/ChatGPTImageMar31,2026,09_21_37PM_93a0c949.png"
                alt="CLARITY Album Cover"
                className="w-full max-w-sm rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* SECTION 2: IDENTITY */}
        <section className="mb-20 border-t border-neutral-800 pt-16">
          <h2 className="text-4xl font-bebas tracking-widest mb-8">This isn't for everybody.</h2>
          <div className="space-y-6 text-neutral-300">
            <p className="text-lg">
              This is for people who've been through something.
              <br />
              Who have a story. A testimony.
            </p>
            <p className="text-lg">
              For those who love rap—but need something real.
              <br />
              Something clean enough to live with.
              <br />
              Something honest enough to grow with.
            </p>
            <p className="font-bebas text-neutral-400 mt-8 tracking-wide">
              If you've ever been:
            </p>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-neutral-500 mt-1">•</span>
                <span>Rebuilding your life</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neutral-500 mt-1">•</span>
                <span>Searching for direction</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neutral-500 mt-1">•</span>
                <span>Walking with God while still loving the culture</span>
              </li>
            </ul>
            <p className="text-lg mt-8 font-cormorant italic">This is for you.</p>
          </div>
        </section>

        {/* SECTION 3: WHAT THIS IS */}
        <section className="mb-20 border-t border-neutral-800 pt-16">
          <h2 className="text-4xl font-bebas tracking-widest mb-8">More than music.</h2>
          <div className="space-y-6 text-neutral-300">
            <p className="text-lg">
              CLARITY is a 10-year journey.
            </p>
            <p className="text-lg font-cormorant italic">
              Recorded from the basement of Mount Pisgah Baptist Church.
              <br />
              Built between the South Side of Chicago and Elgin, Illinois.
            </p>
            <p className="font-bebas text-neutral-400 mt-8 tracking-wide">
              It's where:
            </p>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-neutral-500 mt-1">•</span>
                <span>Faith meets hip-hop</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neutral-500 mt-1">•</span>
                <span>Struggle meets purpose</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neutral-500 mt-1">•</span>
                <span>Life becomes art</span>
              </li>
            </ul>
            <p className="text-lg mt-8">
              This isn't just a project.
              <br />
              <span className="font-cormorant italic">It's part of a larger story. A trilogy. A transformation.</span>
            </p>
          </div>
        </section>

        {/* SECTION 4: WHAT YOU GET */}
        <section className="mb-20 border-t border-neutral-800 pt-16">
          <h2 className="text-4xl font-bebas tracking-widest mb-8">What you receive</h2>
          <div className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-lg mb-8">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-neutral-400 mt-1 flex-shrink-0" />
                <span className="text-lg">Full 12-song digital album</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-neutral-400 mt-1 flex-shrink-0" />
                <span className="text-lg">Instant access after purchase</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-neutral-400 mt-1 flex-shrink-0" />
                <span className="text-lg">High-quality audio files</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-neutral-400 mt-1 flex-shrink-0" />
                <span className="text-lg">Direct connection to the artist</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => setShowCheckout(true)}
            className="w-full px-8 py-4 bg-white text-black font-bebas text-lg tracking-wide hover:bg-neutral-200 transition-colors"
          >
            Get the Album — $10
          </button>
        </section>

        {/* SECTION 5: WHY BUY DIRECT */}
        <section className="mb-20 border-t border-neutral-800 pt-16">
          <h2 className="text-4xl font-bebas tracking-widest mb-8">Why buy CLARITY instead of streaming?</h2>
          <div className="space-y-6 text-neutral-300">
            <p className="text-lg font-cormorant italic">Streaming is passive.</p>
            <p className="text-lg font-bebas tracking-wide text-white">This is participation.</p>
            <p className="font-bebas text-neutral-400 mt-8 tracking-wide">
              When you buy CLARITY:
            </p>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-neutral-500 mt-1">•</span>
                <span>You own the project—not rent it</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neutral-500 mt-1">•</span>
                <span>You support independent art directly</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neutral-500 mt-1">•</span>
                <span>You become part of what's being built</span>
              </li>
            </ul>
            <p className="text-lg mt-8">
              One purchase does more than thousands of streams ever could.
            </p>
            <p className="text-lg font-cormorant italic mt-6">
              This isn't about consumption.
              <br />
              It's about alignment.
            </p>
          </div>
        </section>

        {/* SECTION 6: ARTIST AUTHORITY */}
        <section className="mb-20 border-t border-neutral-800 pt-16">
          <h2 className="text-4xl font-bebas tracking-widest mb-8">Who is Moses?</h2>
          <div className="space-y-6 text-neutral-300">
            <p className="text-lg">
              MIT-certified.
              <br />
              10 years in the craft.
            </p>
            <p className="text-lg">
              Music rooted in faith.
              <br />
              Recorded in the church.
            </p>
            <p className="text-lg mt-8">
              Not separating God from the art.
              <br />
              Not separating life from the music.
            </p>
            <p className="text-lg font-cormorant italic mt-8">
              Building something bigger than songs—
              <br />
              something generational.
              <br />
              <br />
              For the culture. For the people. For the future.
            </p>
          </div>
        </section>

        {/* SECTION 7: FINAL CLOSE */}
        <section className="mb-20 border-t border-neutral-800 pt-16 text-center">
          <h2 className="text-4xl font-bebas tracking-widest mb-8">If this resonates, don't wait.</h2>
          <p className="text-2xl font-cormorant italic text-neutral-300 mb-12">
            You already feel it.
            <br />
            Now step into it.
          </p>
          <button
            onClick={() => setShowCheckout(true)}
            className="px-12 py-4 bg-white text-black font-bebas text-lg tracking-wide hover:bg-neutral-200 transition-colors"
          >
            Get CLARITY — $10
          </button>
        </section>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg max-w-md w-full p-8">
            <h3 className="text-2xl font-bebas tracking-widest mb-6">Get CLARITY</h3>

            {/* Order Summary */}
            <div className="bg-black/50 p-4 rounded mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-neutral-400">CLARITY Album</span>
                <span className="text-white">$10.00</span>
              </div>
              <div className="border-t border-neutral-700 pt-2 mt-2 flex justify-between font-bebas">
                <span>Total</span>
                <span>$10.00</span>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4 mb-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-black border border-neutral-700 px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-black border border-neutral-700 px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
              />
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="w-full bg-black border border-neutral-700 px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM / YY"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  className="bg-black border border-neutral-700 px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
                />
                <input
                  type="text"
                  name="cvc"
                  placeholder="CVC"
                  value={formData.cvc}
                  onChange={handleInputChange}
                  className="bg-black border border-neutral-700 px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
                />
              </div>
            </div>

            {/* Buttons */}
            <button
              onClick={handlePurchase}
              className="w-full px-6 py-3 bg-white text-black font-bebas tracking-wide hover:bg-neutral-200 transition-colors mb-3"
            >
              Complete Purchase
            </button>
            <button
              onClick={() => setShowCheckout(false)}
              className="w-full px-6 py-3 bg-neutral-800 text-white font-bebas tracking-wide hover:bg-neutral-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
