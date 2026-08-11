import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isValidLocale, locales, getTranslations } from "@/lib/i18n";
import { getComparison, getCompetitorSlugs, getPairComparison } from "@/lib/compare";
import { getReleaseData } from "@/lib/release";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComparisonView from "@/components/ComparisonView";

/** Date the comparison data was compiled — also the Article date in JSON-LD. */
const COMPILED = "2026-08-10";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const isZh = locale === "zh";

  return {
    ...pageMetadata({
      locale,
      path: "/compare",
      title: isZh
        ? "Mac 压缩工具对比：MacPacker、7-Zip、The Unarchiver、Keka、BetterZip"
        : "Mac Archiver Comparison: MacPacker vs 7-Zip vs The Unarchiver vs Keka vs BetterZip",
      description: isZh
        ? "69 种格式、9 项能力的逐项对照：MacPacker、7-Zip、The Unarchiver、Keka 与 BetterZip 在 macOS 上各自能读什么、能写什么。"
        : "A format-by-format comparison of five macOS archivers across 69 formats and 9 capabilities — what MacPacker, 7-Zip, The Unarchiver, Keka and BetterZip can each actually read and write.",
      type: "article",
    }),
    keywords: isZh
      ? [
          "Mac 解压软件对比",
          "MacPacker 对比 Keka",
          "The Unarchiver 替代",
          "BetterZip 值得买吗",
          "macOS 压缩工具",
        ]
      : [
          "mac archiver comparison",
          "macpacker vs keka",
          "the unarchiver alternative",
          "keka vs betterzip",
          "best archive app for mac",
          "7-zip for mac",
        ],
  };
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const t = await getTranslations(locale);
  const release = await getReleaseData(locale);
  const isZh = locale === "zh";
  const data = getComparison(locale);

  // One link per head-to-head page, labelled with the pair it covers.
  const links = getCompetitorSlugs().map((slug) => {
    const pair = getPairComparison(locale, slug)!;
    return {
      href: `/${locale}/compare/${slug}`,
      label: `${data.copy.pairHeadline}${pair.competitor.name}`,
    };
  });

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isZh ? "首页" : "Home",
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: data.copy.eyebrow,
        item: `${SITE_URL}/${locale}/compare`,
      },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.copy.headline,
    description: data.copy.deck,
    inLanguage: isZh ? "zh-CN" : "en-US",
    author: { "@type": "Person", name: "Stephan Arenswald", url: "https://sarensw.com" },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "MacPacker",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    image: `${SITE_URL}/og.png`,
    datePublished: COMPILED,
    dateModified: COMPILED,
    mainEntityOfPage: `${SITE_URL}/${locale}/compare`,
    about: data.apps.map((a) => ({
      "@type": "SoftwareApplication",
      name: a.name,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "macOS",
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      <Header locale={locale} t={t} downloadUrl={release.latestDmgUrl} />

      <ComparisonView
        data={data}
        headline={data.copy.headline}
        deck={data.copy.deck}
        t={t}
        release={release}
        links={links}
      />

      <Footer locale={locale} t={t} />
    </>
  );
}
