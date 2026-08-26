import { describe, expect, it } from "vitest";
import { normalizePath, normalizeReferrer } from "./analytics";

describe("first-party analytics privacy normalization", () => {
  it("keeps only a route pathname and discards query values", () => {
    expect(normalizePath("/clarity-sales?utm_source=instagram&email=private@example.com")).toBe("/clarity-sales");
  });

  it("keeps only a referrer hostname and never its path or query string", () => {
    expect(normalizeReferrer("https://www.instagram.com/reel/example/?tracking=private")).toBe("www.instagram.com");
  });

  it("classifies malformed and empty referrers as direct traffic", () => {
    expect(normalizeReferrer("not a url")).toBe("direct");
    expect(normalizeReferrer()).toBe("direct");
  });
});
