import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { getAllFormatSlugs } from "@/lib/formats";
import { SITE_URL } from "@/lib/seo";

const baseUrl = SITE_URL;

// Stable per-section last-modified dates. Using fixed dates (rather than the
// build timestamp) keeps the lastmod signal meaningful: crawlers can tell
// which sections actually changed instead of seeing "everything updated today"
// on every deploy.
const LASTMOD = {
  home: "2026-07-09",
  docs: "2026-06-29",
  docsArticle: "2026-05-23",
  press: "2026-06-15",
  blog: "2026-06-15",
  privacy: "2026-06-15",
} as const;

// Build the hreflang alternates for a route, including the x-default that the
// HTML <head> already emits, so the XML sitemap and the page agree.
function languagesFor(path: string) {
  return {
    ...Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}${path}`])),
    "x-default": `${baseUrl}/en${path}`,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const homePages = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: LASTMOD.home,
    changeFrequency: "monthly" as const,
    priority: locale === "en" ? 1.0 : 0.8,
    alternates: { languages: languagesFor("") },
  }));

  const docsIndexPages = locales.map((locale) => ({
    url: `${baseUrl}/${locale}/docs`,
    lastModified: LASTMOD.docs,
    changeFrequency: "monthly" as const,
    priority: locale === "en" ? 0.9 : 0.7,
    alternates: { languages: languagesFor("/docs") },
  }));

  const pressPages = locales.map((locale) => ({
    url: `${baseUrl}/${locale}/press`,
    lastModified: LASTMOD.press,
    changeFrequency: "monthly" as const,
    priority: locale === "en" ? 0.7 : 0.5,
    alternates: { languages: languagesFor("/press") },
  }));

  // The blog is noindex until posts ship, so it's intentionally omitted here.

  const privacyPages = locales.map((locale) => ({
    url: `${baseUrl}/${locale}/privacy`,
    lastModified: LASTMOD.privacy,
    changeFrequency: "monthly" as const,
    priority: 0.3,
    alternates: { languages: languagesFor("/privacy") },
  }));

  const slugs = getAllFormatSlugs();
  const docsArticlePages = locales.flatMap((locale) =>
    slugs.map((slug) => ({
      url: `${baseUrl}/${locale}/docs/${slug}`,
      lastModified: LASTMOD.docsArticle,
      changeFrequency: "monthly" as const,
      priority: locale === "en" ? 0.8 : 0.6,
      alternates: { languages: languagesFor(`/docs/${slug}`) },
    }))
  );

  return [
    ...homePages,
    ...docsIndexPages,
    ...docsArticlePages,
    ...pressPages,
    ...privacyPages,
  ];
}
