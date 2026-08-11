import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isValidLocale, locales, getTranslations } from "@/lib/i18n";
import { getCompetitorSlugs, getPairComparison } from "@/lib/compare";
import { getReleaseData } from "@/lib/release";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComparisonView from "@/components/ComparisonView";

/** Date the comparison data was compiled — also the Article date in JSON-LD. */
const COMPILED = "2026-08-10";

export async function generateStaticParams() {
  const slugs = getCompetitorSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};

  const pair = getPairComparison(locale, slug);
  if (!pair) return {};

  const isZh = locale === "zh";
  const rival = pair.competitor.name;
  const formats = pair.bands.reduce((n, b) => n + b.rows.length, 0);

  return {
    ...pageMetadata({
      locale,
      path: `/compare/${slug}`,
      title: isZh
        ? `MacPacker 对比 ${rival}：格式支持与功能对照`
        : `MacPacker vs ${rival}: Format Support Compared`,
      description: isZh
        ? `${formats} 种格式逐项对照：在 macOS 上，MacPacker 与 ${rival} 各自能打开哪些压缩包、安装包与磁盘镜像，又能创建哪些。`
        : `A format-by-format comparison of MacPacker and ${rival} on macOS — ${formats} archive, package and disk-image formats, showing which each app can open and which it can create.`,
      type: "article",
    }),
    keywords: isZh
      ? [
          `MacPacker 对比 ${rival}`,
          `${rival} 替代`,
          `${rival} 支持格式`,
          "Mac 解压软件对比",
        ]
      : [
          `macpacker vs ${rival.toLowerCase()}`,
          `${rival.toLowerCase()} alternative`,
          `${rival.toLowerCase()} formats supported`,
          "mac archiver comparison",
        ],
  };
}

export default async function ComparePairPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const pair = getPairComparison(locale, slug);
  if (!pair) notFound();

  const t = await getTranslations(locale);
  const release = await getReleaseData(locale);
  const isZh = locale === "zh";
  const rival = pair.competitor.name;
  const headline = `${pair.copy.pairHeadline}${rival}`;

  // The other head-to-heads plus the five-app hub, so every comparison page is
  // one click from the rest.
  const links = [
    ...getCompetitorSlugs()
      .filter((s) => s !== slug)
      .map((s) => ({
        href: `/${locale}/compare/${s}`,
        label: `${pair.copy.pairHeadline}${getPairComparison(locale, s)!.competitor.name}`,
      })),
    { href: `/${locale}/compare`, label: isZh ? "全部五款对照" : "All five compared" },
  ];

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
        name: pair.copy.eyebrow,
        item: `${SITE_URL}/${locale}/compare`,
      },
      { "@type": "ListItem", position: 3, name: headline },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description: pair.copy.pairDeck,
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
    mainEntityOfPage: `${SITE_URL}/${locale}/compare/${slug}`,
    about: pair.apps.map((a) => ({
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
        data={pair}
        headline={headline}
        deck={pair.copy.pairDeck}
        t={t}
        release={release}
        links={links}
      />

      <Footer locale={locale} t={t} />
    </>
  );
}
