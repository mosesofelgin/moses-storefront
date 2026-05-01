import { useLocation } from 'wouter';

export default function PersistentCTA() {
  const [, navigate] = useLocation();

  return (
    <section className="mb-8 rounded-xl border border-zinc-700 bg-zinc-900 p-6">
      <h3 className="text-2xl font-semibold text-white">Own CLARITY</h3>
      <p className="mt-2 text-sm text-zinc-300">
        This is more than music. This is a journey of faith, discipline, and transformation.
      </p>
      <ul className="mt-4 space-y-2 text-sm text-zinc-200">
        <li>• Full 12-track album</li>
        <li>• High-quality audio</li>
        <li>• Lifetime access</li>
        <li>• Direct support to the artist</li>
      </ul>
      <button
        onClick={() => navigate('/store')}
        className="mt-6 w-full rounded-lg bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-zinc-200"
      >
        Buy Full Album — $12
      </button>
    </section>
  );
}
