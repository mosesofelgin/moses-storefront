import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { AlertCircle, CheckCircle2, Download, Loader2, PackageOpen } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { NEW_GENESIS_COVER, NEW_GENESIS_META } from '@/data/new-genesis-bundle';
import { CLARITY_COVER } from '@/data/project-catalog';

type Product = 'clarity' | 'new-genesis';

const productDetails: Record<Product, { title: string; cover: string; details: string; filename: string }> = {
  clarity: { title: 'CLARITY', cover: CLARITY_COVER, details: '12 tracks and the full CLARITY visual bundle.', filename: 'CLARITY-Album-Bundle.zip' },
  'new-genesis': { title: 'NEW GENESIS', cover: NEW_GENESIS_COVER, details: `${NEW_GENESIS_META.trackCount} tracks and New Genesis cover art.`, filename: 'New-Genesis.zip' },
};

export default function Success() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [inputToken, setInputToken] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSessionId(params.get('session_id'));
    setInputToken(params.get('token'));
  }, []);

  const delivery = trpc.session.delivery.useQuery(
    { sessionId: sessionId || '' },
    { enabled: Boolean(sessionId) && !inputToken, refetchInterval: (query) => query.state.data?.pending ? 2500 : false },
  );
  const activeToken = inputToken || delivery.data?.token || null;
  const access = trpc.downloads.verifyToken.useQuery({ token: activeToken || '' }, { enabled: Boolean(activeToken) });

  const isLoading = (Boolean(sessionId) && !inputToken && delivery.isLoading) || (Boolean(activeToken) && access.isLoading);
  const isPending = Boolean(sessionId) && !inputToken && Boolean(delivery.data?.pending);
  const isValid = Boolean(activeToken && access.data?.valid);
  const product = (delivery.data?.product || access.data?.product || 'clarity') as Product;
  const details = productDetails[product];

  const download = () => {
    if (!activeToken) return;
    const link = document.createElement('a');
    link.href = `/api/download/all/${activeToken}`;
    link.download = details.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading || isPending) {
    return <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-zinc-100"><div className="max-w-md text-center"><Loader2 className="mx-auto h-10 w-10 animate-spin text-amber-200" /><h1 className="mt-6 font-display text-3xl tracking-[0.12em]">PREPARING YOUR DELIVERY</h1><p className="mt-4 text-sm leading-7 text-zinc-400">Your payment is verified. Your secure download is being prepared now.</p></div></main>;
  }

  if (!isValid) {
    return <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-zinc-100"><div className="max-w-md text-center"><AlertCircle className="mx-auto h-12 w-12 text-red-400" /><h1 className="mt-6 font-display text-3xl tracking-[0.12em]">PURCHASE NOT FOUND</h1><p className="mt-4 text-sm leading-7 text-zinc-400">This delivery link is invalid, expired, or payment has not completed. Check the receipt sent to your email for the correct secure link.</p><Link href="/store" className="mt-8 inline-flex min-h-12 items-center rounded-xl border border-amber-200/30 px-6 font-display text-sm tracking-[0.14em] text-amber-100 transition hover:border-amber-200">RETURN TO STORE</Link></div></main>;
  }

  return <main className="min-h-screen bg-[radial-gradient(circle_at_75%_10%,rgba(184,134,11,0.16),transparent_26%),#090909] px-4 py-10 text-zinc-100 sm:py-16"><div className="mx-auto max-w-3xl"><section className="overflow-hidden rounded-3xl border border-amber-100/15 bg-zinc-950/90 shadow-[0_30px_100px_rgba(0,0,0,0.5)]"><div className="grid md:grid-cols-[0.72fr_1.28fr]"><img src={details.cover} alt={`${details.title} cover`} className="aspect-square h-full w-full object-cover" /><div className="flex flex-col justify-center p-7 sm:p-10"><CheckCircle2 className="h-11 w-11 text-amber-200" /><p className="mt-6 text-[10px] uppercase tracking-[0.26em] text-amber-200">Purchase verified</p><h1 className="mt-3 font-display text-5xl tracking-[0.1em] text-zinc-50">YOU&apos;RE ON THE ROLL.</h1><p className="mt-4 font-serif text-3xl italic text-amber-50/85">Welcome to the army.</p><p className="mt-6 text-sm leading-7 text-zinc-400">Your copy of <strong className="text-zinc-100">{details.title}</strong> is ready. {details.details}</p><button type="button" onClick={download} className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-amber-300 px-6 font-display text-lg tracking-[0.14em] text-zinc-950 transition hover:bg-amber-200"><Download className="h-5 w-5" /> DOWNLOAD {details.filename.toUpperCase()}</button><p className="mt-4 text-center text-[10px] uppercase tracking-[0.14em] text-zinc-600">This is a private, purchase-linked delivery.</p></div></div></section></div></main>;
}
