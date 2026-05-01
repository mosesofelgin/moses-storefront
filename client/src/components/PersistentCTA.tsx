import { useLocation } from 'wouter';

interface PersistentCTAProps {
  isPlaying?: boolean;
}

export default function PersistentCTA({ isPlaying }: PersistentCTAProps) {
  const [, navigate] = useLocation();

  const handleBuyClick = () => {
    navigate('/store');
  };

  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-lg p-6">
        <div className="text-center">
          <p className="text-sm opacity-90 mb-2 tracking-widest uppercase">Complete Your Journey</p>
          <h3 className="text-2xl font-light mb-4">Own CLARITY</h3>
          <p className="text-sm opacity-80 mb-6 max-w-sm mx-auto">
            Support the artist. Direct-to-consumer. No middlemen. $12 = 3,000 streams worth.
          </p>
          <button
            onClick={handleBuyClick}
            className="w-full py-3 px-6 bg-black text-green-500 font-medium rounded hover:bg-zinc-900 transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Buy Now (Pay What You Want)
          </button>
          <p className="text-xs opacity-70 mt-3">
            Minimum $12. Pay more to support the mission.
          </p>
        </div>
      </div>
    </div>
  );
}
