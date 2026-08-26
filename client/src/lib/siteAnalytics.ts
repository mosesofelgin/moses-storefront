const VISITOR_STORAGE_KEY = "moses_anonymous_visitor";

function createAnonymousVisitorId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `visitor-${Date.now()}-${Math.random().toString(36).slice(2, 14)}`;
}

export function getAnonymousVisitorId() {
  const existing = window.localStorage.getItem(VISITOR_STORAGE_KEY);
  if (existing) return existing;

  const visitorId = createAnonymousVisitorId();
  window.localStorage.setItem(VISITOR_STORAGE_KEY, visitorId);
  return visitorId;
}

export function createPageViewPayload(path: string, search: string, referrer: string) {
  const params = new URLSearchParams(search);

  return {
    visitorId: getAnonymousVisitorId(),
    path,
    referrer: referrer || "direct",
    campaignSource: params.get("utm_source"),
    campaignMedium: params.get("utm_medium"),
    campaignName: params.get("utm_campaign"),
  };
}
