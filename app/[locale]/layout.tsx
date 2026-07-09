import type { Metadata, Viewport } from "next";
import { Newsreader } from "next/font/google";
import { notFound } from "next/navigation";
import { isValidLocale, locales, getTranslations } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";
import { getReleaseData } from "@/lib/release";
import WebMCP from "@/components/client/WebMCP";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: "italic",
  weight: "400",
  display: "swap",
  variable: "--font-newsreader",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

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

  const t = await getTranslations(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t.meta.title,
      template: t.meta.titleTemplate,
    },
    description: t.meta.description,
    keywords:
      locale === "zh"
        ? [
            "MacPacker",
            "macOS",
            "压缩包管理器",
            "解压工具",
            "ZIP",
            "RAR",
            "7z",
            "DMG",
            "开源",
          ]
        : [
            "MacPacker",
            "macOS",
            "archive manager",
            "extract",
            "ZIP",
            "RAR",
            "7z",
            "DMG",
            "open source",
          ],
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      siteName: t.meta.siteName,
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? "en_US" : "zh_CN",
      url: `${SITE_URL}/${locale}`,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "MacPacker — preview & extract any archive on macOS",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: ["/og.png"],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}`])),
        "x-default": `${SITE_URL}/en`,
      },
    },
    // Smart App Banner — surfaces an "Install" CTA on Safari iOS when users
    // happen to land on the site from a mobile device.
    other: {
      "apple-itunes-app": "app-id=6473273874",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-title": "MacPacker",
    },
  };
}

function JsonLd({
  locale,
  version,
  dmgUrl,
  zipUrl,
}: {
  locale: Locale;
  version: string;
  dmgUrl: string;
  zipUrl: string;
}) {
  const description =
    locale === "zh"
      ? "预览嵌套压缩包，仅提取所需文件。这是 macOS 上早该存在的压缩包管理工具。"
      : "Preview nested archives, extract only what you need. The macOS archive manager that should have existed all along.";

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: "MacPacker",
    operatingSystem: "macOS 14+",
    applicationCategory: "UtilitiesApplication",
    softwareVersion: version,
    datePublished: "2024-01-04",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: SITE_URL,
    downloadUrl: [
      "https://apps.apple.com/us/app/macpacker/id6473273874",
      dmgUrl,
      zipUrl,
      "https://github.com/sarensw/MacPacker/releases",
    ],
    installUrl: "https://apps.apple.com/us/app/macpacker/id6473273874",
    softwareHelp: {
      "@type": "CreativeWork",
      url: `${SITE_URL}/${locale}/docs`,
    },
    releaseNotes: `${SITE_URL}/${locale}#changelog`,
    featureList:
      locale === "zh"
        ? [
            "像浏览文件夹一样浏览压缩包内容",
            "使用 Quick Look 预览文件而无需提取",
            "拖放提取单个文件",
            "浏览嵌套压缩包（压缩包中的压缩包）",
            "就地编辑并重新保存 ZIP 压缩包",
            "支持 41 种格式，包括 ZIP、RAR、7z、TAR、DMG 和 ISO",
            "打开受密码保护/加密的压缩包",
            "原生 SwiftUI 界面，Apple 芯片原生运行",
          ]
        : [
            "Browse archive contents like a folder without extracting",
            "Preview files with Quick Look",
            "Extract individual files via drag and drop",
            "Navigate nested archives (archives within archives)",
            "Edit and re-save ZIP archives in place",
            "Supports 41 formats including ZIP, RAR, 7z, TAR, DMG, and ISO",
            "Open password-protected / encrypted archives",
            "Native SwiftUI interface, Apple Silicon native",
          ],
    image: `${SITE_URL}/og.png`,
    screenshot: {
      "@type": "ImageObject",
      url: `${SITE_URL}/hero.png`,
      width: 1824,
      height: 1224,
      caption:
        locale === "zh"
          ? "MacPacker 正在显示压缩包的内容"
          : "MacPacker showing the contents of an archive",
    },
    description,
    license: "https://opensource.org/licenses/GPL-3.0",
    isAccessibleForFree: true,
    inLanguage: ["en", "zh", "de", "fr", "es", "uk", "ru", "fa", "ja", "ko", "pl", "pt", "it"],
    author: {
      "@type": "Person",
      name: "Stephan Arenswald",
      url: "https://sarensw.com",
    },
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "MacPacker",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
      width: 1024,
      height: 1024,
    },
    foundingDate: "2023",
    founder: {
      "@type": "Person",
      name: "Stephan Arenswald",
      url: "https://sarensw.com",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: "https://github.com/sarensw/MacPacker/issues",
    },
    sameAs: [
      "https://github.com/sarensw/MacPacker",
      "https://apps.apple.com/us/app/macpacker/id6473273874",
      "https://formulae.brew.sh/cask/macpacker",
      `${SITE_URL}/en/press`,
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "MacPacker",
    url: SITE_URL,
    inLanguage: locale === "zh" ? "zh-CN" : "en-US",
    dateModified: "2026-07-09",
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "MacPacker",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
    // No SearchAction: the docs page has no ?q= results view, and a fake
    // search target is worse for crawlers than none at all.
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const { latestVersion, latestDmgUrl, latestZipUrl } =
    await getReleaseData(locale);

  return (
    <html lang={locale} className={newsreader.variable}>
      <head>
        <JsonLd
          locale={locale}
          version={latestVersion}
          dmgUrl={latestDmgUrl}
          zipUrl={latestZipUrl}
        />
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="aoVZsOFrUliNz+LrQKEdwQ"
          async
        />
      </head>
      <body className="font-sans bg-bg-page text-ink-primary antialiased overflow-x-hidden">
        {children}
        <WebMCP />
      </body>
    </html>
  );
}
