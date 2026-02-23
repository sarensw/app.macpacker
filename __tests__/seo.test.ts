import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { locales } from "@/lib/i18n";
import { getAllFormatSlugs } from "@/lib/formats";

describe("sitemap.ts", () => {
  it("returns entries for all locales", () => {
    const entries = sitemap();
    const slugs = getAllFormatSlugs();
    const expectedCount = locales.length + locales.length + locales.length * slugs.length;
    expect(entries).toHaveLength(expectedCount);

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
  it("allows all user agents", () => {
    const config = robots();
    if (Array.isArray(config.rules)) {
      const rule = config.rules[0];
      expect(rule.userAgent).toBe("*");
      expect(rule.allow).toBe("/");
    } else {
      expect(config.rules.userAgent).toBe("*");
      expect(config.rules.allow).toBe("/");
    }
  });

  it("includes sitemap URL", () => {
    const config = robots();
    expect(config.sitemap).toBe("https://macpacker.app/sitemap.xml");
  });
});
