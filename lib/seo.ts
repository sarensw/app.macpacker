import type { Metadata } from "next";
import { locales } from "@/lib/i18n";

/** Production origin used for all canonical / hreflang / OpenGraph URLs. */
export const SITE_URL = "https://macpacker.app";

/** Shared social-card image (square app icon). */
const OG_IMAGE = {
  url: "/logo.png",
  width: 1024,
  height: 1024,
  alt: "MacPacker",
};

/**
 * Build a consistent SEO metadata block for a localized route.
 *
 * Every page gets a self-referential canonical, a full hreflang set
 * (en + zh + x-default), and complete OpenGraph + Twitter cards with an
 * image — so social previews and search engines treat each URL correctly.
 *
 * `path` is the route below the locale segment, e.g. "" (home), "/docs",
 * "/docs/zip", "/press". Pass already-localized `title` / `description`.
 */
export function pageMetadata(opts: {
  locale: string;
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
}): Metadata {
  const { locale, path, title, description, type = "website" } = opts;
  const url = `${SITE_URL}/${locale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}${path}`]),
        ),
        "x-default": `${SITE_URL}/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      siteName: "MacPacker",
      type,
      locale: locale === "zh" ? "zh_CN" : "en_US",
      url,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/logo.png"],
    },
  };
}
