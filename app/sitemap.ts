import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { getAllFormatSlugs } from "@/lib/formats";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://macpacker.app";

  const homePages = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: locale === "en" ? 1.0 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${baseUrl}/${l}`])
      ),
    },
  }));

  const docsIndexPages = locales.map((locale) => ({
    url: `${baseUrl}/${locale}/docs`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: locale === "en" ? 0.9 : 0.7,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${baseUrl}/${l}/docs`])
      ),
    },
  }));

  const slugs = getAllFormatSlugs();
  const docsArticlePages = locales.flatMap((locale) =>
    slugs.map((slug) => ({
      url: `${baseUrl}/${locale}/docs/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: locale === "en" ? 0.8 : 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/docs/${slug}`])
        ),
      },
    }))
  );

  return [...homePages, ...docsIndexPages, ...docsArticlePages];
}
