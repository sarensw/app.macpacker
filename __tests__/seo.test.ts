import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { locales } from "@/lib/i18n";
import { getAllFormatSlugs } from "@/lib/formats";

describe("sitemap.ts", () => {
  it("returns entries for all locales", () => {
    const entries = sitemap();
    const slugs = getAllFormatSlugs();
    const expectedCount =
      locales.length + // home
      locales.length + // press
      locales.length + // privacy
      locales.length + // docs index
      locales.length * slugs.length; // docs articles
    // Note: /blog is intentionally excluded (noindex until posts ship).
    expect(entries).toHaveLength(expectedCount);

    // The blog is omitted from the sitemap while it is noindex.
    expect(entries.some((e) => e.url?.endsWith("/blog"))).toBe(false);

    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://macpacker.app/en");
    expect(urls).toContain("https://macpacker.app/zh");
  });

  it("sets en as priority 1.0", () => {
    const entries = sitemap();
    const en = entries.find((e) => e.url?.includes("/en"));
    expect(en?.priority).toBe(1.0);
  });

  it("sets zh as lower priority", () => {
    const entries = sitemap();
    const zh = entries.find((e) => e.url?.includes("/zh"));
    expect(zh?.priority).toBe(0.8);
  });

  it("includes alternates for each entry", () => {
    const entries = sitemap();
    for (const entry of entries) {
      expect(entry.alternates?.languages).toBeDefined();
      const langs = entry.alternates?.languages as Record<string, string>;
      const urlPath = new URL(entry.url!).pathname;
      const pathSuffix = urlPath.replace(/^\/(en|zh)/, "");
      for (const locale of locales) {
        expect(langs[locale]).toBe(`https://macpacker.app/${locale}${pathSuffix}`);
      }
    }
  });

  it("has changeFrequency set", () => {
    const entries = sitemap();
    for (const entry of entries) {
      expect(entry.changeFrequency).toBe("monthly");
    }
  });
});

describe("robots.ts", () => {
  it("allows all user agents via a wildcard rule", () => {
    const config = robots();
    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
    const wildcard = rules.find((r) => r.userAgent === "*");
    expect(wildcard).toBeDefined();
    expect(wildcard?.allow).toBe("/");
  });

  it("names AI crawlers explicitly with allow", () => {
    const config = robots();
    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
    for (const ua of ["GPTBot", "ClaudeBot", "PerplexityBot"]) {
      const rule = rules.find((r) => r.userAgent === ua);
      expect(rule, `expected a rule for ${ua}`).toBeDefined();
      expect(rule?.allow).toBe("/");
    }
  });

  it("includes sitemap URL", () => {
    const config = robots();
    expect(config.sitemap).toBe("https://macpacker.app/sitemap.xml");
  });
});
