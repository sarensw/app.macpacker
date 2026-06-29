import type { Metadata } from "next";
import { locales } from "@/lib/i18n";

/**
 * Origin used for all canonical / hreflang / OpenGraph URLs.
 *
 * Defaults to the production domain so every environment ships correct,
 * production-pointing metadata out of the box. Deployments that should be
 * self-referential (e.g. the staging mirror) set `NEXT_PUBLIC_SITE_URL` to
 * their own origin so canonicals, hreflang, sitemap and OG URLs all match
 * the domain actually serving them.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://macpacker.app"
).replace(/\/$/, "");

/** Shared social-card image — a 1200×630 landscape card for summary_large_image. */
const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "MacPacker — preview & extract any archive on macOS",
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
      images: ["/og.png"],
    },
  };
}
