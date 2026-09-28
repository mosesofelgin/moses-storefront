import { useState } from 'react';
import { ArrowLeft, LockKeyhole, Loader2, ShoppingBag } from 'lucide-react';
import { Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { CLARITY_COVER } from '@/data/project-catalog';
import { NEW_GENESIS_COVER, NEW_GENESIS_META } from '@/data/new-genesis-bundle';

type CheckoutProduct = {
  id: 'clarity' | 'new-genesis';
  title: string;
  cover: string;
  description: string;
  details: string;
  price: string;
  backHref: string;
};

export default function Checkout() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const checkout = trpc.checkout.createSession.useMutation();
  const isNewGenesis = new URLSearchParams(window.location.search).get('product') === 'new-genesis';
  const product: CheckoutProduct = isNewGenesis ? {
    id: 'new-genesis',
    title: 'NEW GENESIS',
    cover: NEW_GENESIS_COVER,
    description: 'The debut album from Moses — seven years in the making.',
    details: '15 tracks · 42m 50s',
    price: '$10',
    backHref: '/new-genesis',
  } : {
    id: 'clarity',
    title: 'CLARITY',
    cover: CLARITY_COVER,
    description: 'Twelve movements of faith, discipline, and transformation.',
    details: '12 tracks · 45m',
    price: '$12',
    backHref: '/clarity-sales',
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Enter your name and email to continue.');
      return;
    }
    try {
      const result = await checkout.mutateAsync({ customerEmail: formData.email.trim(), customerName: formData.name.trim(), productId: product.id });
      if (result.url) window.location.assign(result.url);
      else toast.error('Checkout could not be opened. Please try again.');
    } catch (error) {
      console.error(error);
      toast.error('Checkout could not be opened. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_76%_10%,rgba(184,134,11,0.14),transparent_24%),#090909] px-4 py-8 text-zinc-100 sm:py-14"><div className="mx-auto max-w-4xl"><Link href={product.backHref} className="inline-flex min-h-11 items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-zinc-400 transition hover:text-amber-200"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to {product.title}</Link><div className="mt-8 grid overflow-hidden rounded-3xl border border-amber-100/15 bg-zinc-950/85 shadow-[0_30px_100px_rgba(0,0,0,0.5)] lg:grid-cols-[0.85fr_1.15fr]"><aside className="border-b border-amber-100/10 bg-[#100d09] p-7 lg:border-b-0 lg:border-r lg:p-10"><img src={product.cover} alt={`${product.title} album cover`} className="mx-auto aspect-square w-full max-w-sm rounded-2xl object-cover shadow-2xl" /><div className="mt-8"><p className="text-[10px] uppercase tracking-[0.26em] text-amber-200">Digital album</p><h1 className="mt-3 font-display text-5xl tracking-[0.1em] text-zinc-50">{product.title}</h1><p className="mt-4 font-serif text-2xl italic leading-snug text-amber-50/80">{product.description}</p><div className="mt-7 flex items-center justify-between border-t border-amber-100/10 pt-5 text-[10px] uppercase tracking-[0.16em] text-zinc-500"><span>{product.details}</span><span className="text-amber-200">{product.price}</span></div></div></aside><section className="p-7 sm:p-10"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-100/20 bg-amber-300/10"><ShoppingBag className="h-4 w-4 text-amber-200" aria-hidden="true" /></div><div><p className="text-[10px] uppercase tracking-[0.22em] text-amber-200">Secure purchase</p><h2 className="mt-1 font-display text-3xl tracking-[0.1em] text-zinc-50">COMPLETE YOUR ORDER</h2></div></div><p className="mt-6 max-w-lg text-sm leading-7 text-zinc-400">Enter your information once, then continue to Stripe&apos;s secure payment page. Your purchase confirmation and delivery arrive by email.</p><form onSubmit={submit} className="mt-8 space-y-5"><div><label htmlFor="checkout-name" className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-zinc-400">Full name</label><input id="checkout-name" name="name" type="text" autoComplete="name" required value={formData.name} onChange={(event) => setFormData((previous) => ({ ...previous, name: event.target.value }))} disabled={checkout.isPending} placeholder="Your name" className="min-h-12 w-full rounded-xl border border-amber-100/15 bg-zinc-900/80 px-4 text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-amber-200 focus:ring-2 focus:ring-amber-200/20 disabled:opacity-60" /></div><div><label htmlFor="checkout-email" className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-zinc-400">Email address</label><input id="checkout-email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={(event) => setFormData((previous) => ({ ...previous, email: event.target.value }))} disabled={checkout.isPending} placeholder="your@email.com" className="min-h-12 w-full rounded-xl border border-amber-100/15 bg-zinc-900/80 px-4 text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-amber-200 focus:ring-2 focus:ring-amber-200/20 disabled:opacity-60" /></div><button type="submit" disabled={checkout.isPending} className="mt-3 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-amber-300 px-6 font-display text-lg tracking-[0.16em] text-zinc-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60">{checkout.isPending ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> OPENING STRIPE…</> : <>CONTINUE TO PAYMENT <LockKeyhole className="h-4 w-4" /></>}</button></form><p className="mt-5 flex items-center justify-center gap-2 text-center text-[10px] uppercase tracking-[0.13em] text-zinc-600"><LockKeyhole className="h-3.5 w-3.5" /> Payment is processed securely by Stripe</p></section></div></div></main>
  );
}
