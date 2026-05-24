import type { Metadata, Viewport } from "next";
import { Newsreader } from "next/font/google";
import { notFound } from "next/navigation";
import { isValidLocale, locales, getTranslations } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
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
    metadataBase: new URL("https://macpacker.app"),
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
      url: `https://macpacker.app/${locale}`,
      images: [
        {
          url: "/logo.png",
          width: 1024,
          height: 1024,
          alt: "MacPacker",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: ["/logo.png"],
    },
    alternates: {
      canonical: `https://macpacker.app/${locale}`,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `https://macpacker.app/${l}`])
        ),
        "x-default": "https://macpacker.app/en",
      },
    },
    icons: {
      icon: "/icon",
      apple: { url: "/logo.png", sizes: "180x180", type: "image/png" },
      shortcut: "/logo.png",
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

function JsonLd({ locale }: { locale: Locale }) {
  const description =
    locale === "zh"
      ? "预览嵌套压缩包，仅提取所需文件。这是 macOS 上早该存在的压缩包管理工具。"
      : "Preview nested archives, extract only what you need. The macOS archive manager that should have existed all along.";

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MacPacker",
    operatingSystem: "macOS 14+",
    applicationCategory: "UtilitiesApplication",
    softwareVersion: "0.15.1",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: "https://macpacker.app",
    downloadUrl: [
      "https://apps.apple.com/us/app/macpacker/id6473273874",
      "https://macpacker-releases.s3.eu-central-1.amazonaws.com/MacPacker_v0.15.dmg",
      "https://macpacker-releases.s3.eu-central-1.amazonaws.com/MacPacker_v0.15.zip",
      "https://github.com/sarensw/MacPacker/releases",
    ],
    installUrl: "https://apps.apple.com/us/app/macpacker/id6473273874",
    image: "https://macpacker.app/logo.png",
    screenshot: "https://macpacker.app/logo.png",
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
    name: "MacPacker",
    url: "https://macpacker.app",
    logo: "https://macpacker.app/logo.png",
    sameAs: [
      "https://github.com/sarensw/MacPacker",
      "https://apps.apple.com/us/app/macpacker/id6473273874",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MacPacker",
    url: "https://macpacker.app",
    inLanguage: locale === "zh" ? "zh-CN" : "en-US",
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

  return (
    <html lang={locale} className={newsreader.variable}>
      <head>
        <JsonLd locale={locale} />
      </head>
      <body className="font-sans bg-bg-page text-ink-primary antialiased overflow-x-hidden">
        {children}
        <WebMCP />
      </body>
    </html>
  );
}
