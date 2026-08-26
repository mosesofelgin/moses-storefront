import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, BarChart3, LockKeyhole, RefreshCw, Users } from "lucide-react";
import { useMemo, useState } from "react";

function formatMetric(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatDay(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00.000Z`),
  );
}

export default function OwnerInsights() {
  const { loading: authLoading, user } = useAuth();
  const [days, setDays] = useState<7 | 30>(7);
  const isOwner = user?.role === "admin";
  const overview = trpc.analytics.overview.useQuery(
    { days },
    { enabled: Boolean(isOwner), retry: false, refetchOnWindowFocus: false },
  );

  const maxDailyPageviews = useMemo(
    () => Math.max(...(overview.data?.daily.map((day) => day.pageviews) ?? [0]), 1),
    [overview.data?.daily],
  );

  if (authLoading) {
    return <div className="min-h-screen bg-zinc-950 px-6 py-20 text-center font-mono text-sm tracking-[0.16em] text-zinc-400">LOADING OWNER INSIGHTS…</div>;
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-5 text-center text-ivory">
        <section className="max-w-md border border-amber-400/25 bg-zinc-900/80 p-7 shadow-2xl">
          <LockKeyhole className="mx-auto mb-5 h-7 w-7 text-amber-300" aria-hidden="true" />
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-amber-300">Private owner report</p>
          <h1 className="mt-3 font-display text-5xl tracking-[0.08em]">INSIGHTS</h1>
          <p className="mt-4 font-serif text-lg leading-relaxed text-zinc-300">Sign in with the Manus account that owns this storefront to view mobile traffic reporting.</p>
          <Button className="mt-6 min-h-11 w-full bg-amber-500 text-zinc-950 hover:bg-amber-400" onClick={() => { window.location.href = getLoginUrl(); }}>
            SIGN IN TO VIEW
          </Button>
          <a className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-zinc-400 hover:text-ivory" href="/">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to site
          </a>
        </section>
      </main>
    );
  }

  if (!isOwner) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-5 text-center text-ivory">
        <section className="max-w-md border border-amber-400/25 bg-zinc-900/80 p-7 shadow-2xl">
          <LockKeyhole className="mx-auto mb-5 h-7 w-7 text-amber-300" aria-hidden="true" />
          <h1 className="font-display text-4xl tracking-[0.08em]">OWNER ACCESS ONLY</h1>
          <p className="mt-4 font-serif text-lg leading-relaxed text-zinc-300">This report is intentionally restricted to the storefront owner and does not expose visitor data publicly.</p>
          <a className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm text-zinc-400 hover:text-ivory" href="/">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to site
          </a>
        </section>
      </main>
    );
  }

  const report = overview.data;
  const noTrackedTraffic = report && report.totals.pageviews === 0;

  return (
    <main className="min-h-screen bg-zinc-950 text-ivory">
      <header className="sticky top-0 z-30 border-b border-amber-400/15 bg-zinc-950/95 px-4 py-4 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300">MOSES SOG · PRIVATE OWNER REPORT</p>
            <h1 className="font-display text-3xl tracking-[0.08em]">AUDIENCE INSIGHTS</h1>
          </div>
          <a className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-zinc-700 px-3 font-mono text-xs tracking-[0.1em] text-zinc-300 hover:border-amber-300 hover:text-amber-200" href="/">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> SITE
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-7 md:px-8 md:py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-serif text-lg text-zinc-300">Anonymous first-party page views, visitor counts, routes, and referral domains.</p>
            <p className="mt-1 font-mono text-xs text-zinc-500">No IP addresses, fingerprints, or visitor identities are stored.</p>
          </div>
          <div className="flex gap-2" aria-label="Reporting period">
            {[7, 30].map((range) => (
              <button
                key={range}
                className={`min-h-11 rounded-sm border px-4 font-mono text-xs tracking-[0.1em] transition-colors ${days === range ? "border-amber-300 bg-amber-400 text-zinc-950" : "border-zinc-700 text-zinc-300 hover:border-amber-300"}`}
                onClick={() => setDays(range as 7 | 30)}
              >
                {range} DAYS
              </button>
            ))}
          </div>
        </div>

        {overview.isLoading ? (
          <div className="mt-8 border border-zinc-800 bg-zinc-900/70 p-8 font-mono text-sm tracking-[0.14em] text-zinc-400">LOADING LIVE REPORT…</div>
        ) : overview.error ? (
          <div className="mt-8 border border-red-400/30 bg-red-950/20 p-6 text-zinc-200">
            <p className="font-display text-2xl tracking-[0.08em]">REPORT UNAVAILABLE</p>
            <p className="mt-2 font-serif text-lg text-zinc-300">The report could not be loaded. Try again in a moment.</p>
            <Button variant="outline" className="mt-4 min-h-11 border-zinc-600 text-zinc-100 hover:bg-zinc-800" onClick={() => overview.refetch()}>
              <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" /> RETRY
            </Button>
          </div>
        ) : report ? (
          <>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <article className="border border-amber-400/25 bg-gradient-to-br from-amber-400/10 to-zinc-900 p-5">
                <div className="flex items-center justify-between text-amber-200"><BarChart3 className="h-5 w-5" aria-hidden="true" /><span className="font-mono text-[10px] uppercase tracking-[0.16em]">Page views</span></div>
                <p className="mt-5 font-display text-6xl tracking-[0.06em]">{formatMetric(report.totals.pageviews)}</p>
                <p className="mt-2 font-serif text-zinc-300">Pages opened in the last {days} calendar days.</p>
              </article>
              <article className="border border-amber-400/25 bg-gradient-to-br from-amber-400/10 to-zinc-900 p-5">
                <div className="flex items-center justify-between text-amber-200"><Users className="h-5 w-5" aria-hidden="true" /><span className="font-mono text-[10px] uppercase tracking-[0.16em]">Unique visitors</span></div>
                <p className="mt-5 font-display text-6xl tracking-[0.06em]">{formatMetric(report.totals.visitors)}</p>
                <p className="mt-2 font-serif text-zinc-300">Distinct anonymous browser IDs in this period.</p>
              </article>
            </div>

            {noTrackedTraffic ? (
              <aside className="mt-6 border border-amber-400/25 bg-amber-400/5 p-5 text-zinc-200">
                <p className="font-display text-2xl tracking-[0.08em] text-amber-200">TRACKING IS READY</p>
                <p className="mt-2 font-serif text-lg leading-relaxed text-zinc-300">This first-party report begins recording after this version is published. It cannot recreate historical visits that were kept only inside the platform dashboard.</p>
              </aside>
            ) : (
              <section className="mt-6 border border-zinc-800 bg-zinc-900/60 p-5">
                <div className="flex items-baseline justify-between gap-4"><h2 className="font-display text-3xl tracking-[0.07em]">DAILY ATTENTION</h2><p className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">PAGE VIEWS</p></div>
                <div className="mt-6 grid grid-cols-7 items-end gap-2" aria-label="Daily page views">
                  {report.daily.map((day) => (
                    <div key={day.date} className="min-w-0">
                      <div className="flex h-36 items-end rounded-sm bg-zinc-800/80" title={`${formatDay(day.date)}: ${day.pageviews} page views`}>
                        <div className="w-full rounded-sm bg-amber-400" style={{ height: `${Math.max((day.pageviews / maxDailyPageviews) * 100, day.pageviews ? 5 : 0)}%` }} />
                      </div>
                      <p className="mt-2 truncate text-center font-mono text-[9px] text-zinc-500">{formatDay(day.date)}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <section className="border border-zinc-800 bg-zinc-900/60 p-5"><h2 className="font-display text-3xl tracking-[0.07em]">TOP ROUTES</h2><InsightList rows={report.topPages.map((item) => ({ label: item.path, value: item.pageviews, detail: `${formatMetric(item.visitors)} visitors` }))} empty="Routes will appear after visitors begin browsing." /></section>
              <section className="border border-zinc-800 bg-zinc-900/60 p-5"><h2 className="font-display text-3xl tracking-[0.07em]">REFERRAL SOURCES</h2><InsightList rows={report.topReferrers.map((item) => ({ label: item.referrer, value: item.pageviews, detail: `${formatMetric(item.visitors)} visitors` }))} empty="Referral domains will appear when visitors arrive from shared links." /></section>
            </div>
          </>
        ) : null}
      </section>
    </main>
  );
}

function InsightList({ rows, empty }: { rows: Array<{ label: string; value: number; detail: string }>; empty: string }) {
  if (rows.length === 0) return <p className="mt-5 font-serif text-lg text-zinc-400">{empty}</p>;

  return <div className="mt-5 divide-y divide-zinc-800">{rows.map((row) => <div key={row.label} className="flex items-center justify-between gap-4 py-3"><div className="min-w-0"><p className="truncate font-mono text-sm text-zinc-200">{row.label}</p><p className="mt-1 font-serif text-sm text-zinc-500">{row.detail}</p></div><p className="font-display text-3xl text-amber-200">{formatMetric(row.value)}</p></div>)}</div>;
}
