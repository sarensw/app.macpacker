import type { Metadata } from "next";
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
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
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
  };
}

function JsonLd({ locale }: { locale: Locale }) {
  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MacPacker",
    operatingSystem: "macOS",
    applicationCategory: "UtilitiesApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: "https://macpacker.app",
    downloadUrl:
      "https://apps.apple.com/us/app/macpacker/id6473273874",
    description:
      locale === "zh"
        ? "预览嵌套压缩包，仅提取所需文件。这是 macOS 上早该存在的压缩包管理工具。"
        : "Preview nested archives, extract only what you need. The macOS archive manager that should have existed all along.",
    license: "https://opensource.org/licenses/GPL-3.0",
    isAccessibleForFree: true,
    inLanguage: ["en", "zh", "de", "fr", "es", "uk", "ru", "fa", "ja", "ko"],
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MacPacker",
    url: "https://macpacker.app",
    sameAs: ["https://github.com/sarensw/MacPacker"],
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
      <body className="font-sans bg-bg text-text antialiased overflow-x-hidden">
        {children}
        <WebMCP />
      </body>
    </html>
  );
}
