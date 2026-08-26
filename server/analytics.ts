import { and, desc, gte, ne, sql } from "drizzle-orm";
import { analyticsEvents } from "../drizzle/schema";
import { getDb } from "./db";

export type PageViewInput = {
  visitorId: string;
  path: string;
  referrer?: string | null;
  campaignSource?: string | null;
  campaignMedium?: string | null;
  campaignName?: string | null;
};

export function normalizePath(path: string) {
  const pathname = path.split("?")[0]?.trim() || "/";
  return pathname.startsWith("/") ? pathname.slice(0, 512) : "/";
}

export function normalizeReferrer(referrer?: string | null) {
  if (!referrer || referrer === "direct") return "direct";

  try {
    return new URL(referrer).hostname.toLowerCase().slice(0, 255) || "direct";
  } catch {
    return "direct";
  }
}

function normalizeCampaignValue(value?: string | null) {
  const normalized = value?.trim().slice(0, 128);
  return normalized || null;
}

function numberValue(value: unknown) {
  return Number(value ?? 0);
}

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getCalendarRange(days: number) {
  const end = new Date();
  end.setUTCHours(23, 59, 59, 999);

  const start = new Date(end);
  start.setUTCHours(0, 0, 0, 0);
  start.setUTCDate(start.getUTCDate() - days + 1);

  return { start, end };
}

export async function recordPageView(input: PageViewInput) {
  const db = await getDb();
  if (!db) return false;

  await db.insert(analyticsEvents).values({
    visitorId: input.visitorId,
    path: normalizePath(input.path),
    referrer: normalizeReferrer(input.referrer),
    campaignSource: normalizeCampaignValue(input.campaignSource),
    campaignMedium: normalizeCampaignValue(input.campaignMedium),
    campaignName: normalizeCampaignValue(input.campaignName),
  });

  return true;
}

export async function getAnalyticsOverview(days: number) {
  const db = await getDb();
  const range = getCalendarRange(days);
  const emptyDaily = Array.from({ length: days }, (_, index) => {
    const date = new Date(range.start);
    date.setUTCDate(range.start.getUTCDate() + index);
    return { date: dateKey(date), pageviews: 0, visitors: 0 };
  });

  if (!db) {
    return {
      range: { start: range.start.toISOString(), end: range.end.toISOString(), days },
      totals: { pageviews: 0, visitors: 0 },
      daily: emptyDaily,
      topPages: [],
      topReferrers: [],
    };
  }

  // Keep this expression literal: the managed TiDB driver accepts the tested
  // SQL expression directly but rejects Drizzle's interpolated expression in
  // GROUP BY / ORDER BY clauses.
  const daySql = sql.raw("DATE(`createdAt`)");
  const pageviewCount = sql<number>`COUNT(*)`;
  const visitorCount = sql<number>`COUNT(DISTINCT ${analyticsEvents.visitorId})`;
  const whereInRange = gte(analyticsEvents.createdAt, range.start);

  // The project database client uses a single connection, so run these aggregate
  // queries in sequence rather than issuing concurrent commands on that connection.
  const totalsResult = await db
    .select({ pageviews: pageviewCount, visitors: visitorCount })
    .from(analyticsEvents)
    .where(whereInRange);
  const dailyRows = await db
    .select({ date: daySql, pageviews: pageviewCount, visitors: visitorCount })
    .from(analyticsEvents)
    .where(whereInRange)
    .groupBy(daySql)
    .orderBy(daySql);
  const pageRows = await db
    .select({ path: analyticsEvents.path, pageviews: pageviewCount, visitors: visitorCount })
    .from(analyticsEvents)
    .where(whereInRange)
    .groupBy(analyticsEvents.path)
    .orderBy(desc(pageviewCount))
    .limit(5);
  const referrerRows = await db
    .select({ referrer: analyticsEvents.referrer, pageviews: pageviewCount, visitors: visitorCount })
    .from(analyticsEvents)
    .where(and(whereInRange, ne(analyticsEvents.referrer, "direct")))
    .groupBy(analyticsEvents.referrer)
    .orderBy(desc(pageviewCount))
    .limit(5);

  const dailyByDate = new Map(
    dailyRows.map((row) => [
      String(row.date),
      { pageviews: numberValue(row.pageviews), visitors: numberValue(row.visitors) },
    ]),
  );

  return {
    range: { start: range.start.toISOString(), end: range.end.toISOString(), days },
    totals: {
      pageviews: numberValue(totalsResult[0]?.pageviews),
      visitors: numberValue(totalsResult[0]?.visitors),
    },
    daily: emptyDaily.map((day) => ({ ...day, ...(dailyByDate.get(day.date) ?? {}) })),
    topPages: pageRows.map((row) => ({
      path: row.path,
      pageviews: numberValue(row.pageviews),
      visitors: numberValue(row.visitors),
    })),
    topReferrers: referrerRows.map((row) => ({
      referrer: row.referrer,
      pageviews: numberValue(row.pageviews),
      visitors: numberValue(row.visitors),
    })),
  };
}
