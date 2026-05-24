import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isValidLocale, locales, getTranslations } from "@/lib/i18n";
import { getReleaseData } from "@/lib/release";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const isZh = locale === "zh";

  const title = isZh ? "博客" : "Blog";
  const description = isZh
    ? "MacPacker 的最新消息、发行说明和功能更新。"
    : "Updates, release notes, and product news for MacPacker — the macOS archive manager.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://macpacker.app/${locale}/blog`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `https://macpacker.app/${l}/blog`]),
      ),
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      url: `https://macpacker.app/${locale}/blog`,
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const t = await getTranslations(locale);
  const release = await getReleaseData(locale);
  const isZh = locale === "zh";

  return (
    <>
      <Header locale={locale} t={t} downloadUrl={release.latestDmgUrl} />

      <main className="max-w-[1120px] mx-auto px-6 max-md:px-5">
        <section className="py-16 max-md:py-12">
          <p className="font-mono text-[11px] tracking-[0.08em] text-ink-tertiary uppercase mb-2">
            {isZh ? "博客" : "Blog"}
          </p>
          <h1
            className="font-medium leading-[1.1] tracking-[-0.025em] text-ink-primary mb-5"
            style={{ fontSize: "clamp(32px, 4.5vw, 48px)" }}
          >
            {isZh ? "最新动态" : "Latest updates"}
          </h1>
          <p className="text-[16px] leading-[1.6] text-ink-secondary max-w-[520px] mb-6">
            {isZh
              ? "博客内容即将上线。同时，可在更新日志中查看版本发布详情。"
              : "Blog posts coming soon. In the meantime, see release details in the changelog."}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/${locale}#changelog`}
              className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-ink-primary text-ink-inverse text-[13px] font-medium hover:bg-[#2a2a2a] transition-colors"
            >
              {isZh ? "查看更新日志" : "See the changelog"}
            </Link>
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 h-9 px-3.5 rounded-md bg-bg-surface text-ink-primary text-[13px] font-medium border-[0.5px] border-border-strong hover:bg-bg-page transition-colors"
            >
              ← {isZh ? "返回首页" : "Back to home"}
            </Link>
          </div>
        </section>
      </main>

      <Footer locale={locale} t={t} />
    </>
  );
}
