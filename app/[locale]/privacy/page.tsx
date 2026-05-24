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

  const title = isZh ? "隐私政策" : "Privacy Policy";
  const description = isZh
    ? "MacPacker 不收集、存储或传输任何个人数据。所有操作均在本地完成。"
    : "MacPacker does not collect, store, or transmit any personal data. Everything stays on your Mac.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://macpacker.app/${locale}/privacy`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `https://macpacker.app/${l}/privacy`]),
      ),
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      url: `https://macpacker.app/${locale}/privacy`,
    },
  };
}

export default async function PrivacyPage({
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

      <main className="max-w-[720px] mx-auto px-6 max-md:px-5">
        <article className="py-16 max-md:py-12">
          <p className="font-mono text-[11px] tracking-[0.08em] text-ink-tertiary uppercase mb-2">
            {isZh ? "法律" : "Legal"}
          </p>
          <h1
            className="font-medium leading-[1.1] tracking-[-0.025em] text-ink-primary mb-8"
            style={{ fontSize: "clamp(32px, 4.5vw, 44px)" }}
          >
            {isZh ? "隐私政策" : "Privacy Policy"}
          </h1>

          <p className="text-[16px] leading-[1.7] text-ink-secondary mb-8">
            {isZh
              ? "MacPacker 尊重您的隐私。本应用不收集、存储或传输任何个人数据。"
              : "MacPacker respects your privacy. The app does not collect, store, or transmit any personal data."}
          </p>

          <h2 className="text-[20px] font-medium tracking-[-0.015em] text-ink-primary mb-3 mt-10">
            {isZh ? "数据收集" : "Data collection"}
          </h2>
          <p className="text-[15px] leading-[1.7] text-ink-secondary mb-6">
            {isZh
              ? "MacPacker 完全在您的设备本地运行。不会向任何服务器发送数据。没有分析工具、没有追踪器、没有遥测数据。"
              : "MacPacker runs entirely on your local device. No data is sent to any server. There are no analytics, no trackers, and no telemetry."}
          </p>

          <h2 className="text-[20px] font-medium tracking-[-0.015em] text-ink-primary mb-3 mt-10">
            {isZh ? "文件访问" : "File access"}
          </h2>
          <p className="text-[15px] leading-[1.7] text-ink-secondary mb-6">
            {isZh
              ? "MacPacker 仅在您明确打开文件时访问您选择的文件。应用在 macOS 沙盒环境中运行，不会在您的操作范围之外访问任何文件。"
              : "MacPacker only accesses files that you explicitly open. The app runs in a macOS sandbox and does not access files beyond what you interact with."}
          </p>

          <h2 className="text-[20px] font-medium tracking-[-0.015em] text-ink-primary mb-3 mt-10">
            {isZh ? "联系方式" : "Contact"}
          </h2>
          <p className="text-[15px] leading-[1.7] text-ink-secondary mb-10">
            {isZh ? "如有疑问，请通过 " : "For questions, reach out via "}
            <a
              href="https://github.com/sarensw/MacPacker/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-primary underline underline-offset-[3px] decoration-[0.5px] decoration-border-strong hover:decoration-ink-primary"
            >
              GitHub Issues
            </a>
            {isZh ? "。" : "."}
          </p>

          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 h-9 px-3.5 rounded-md bg-bg-surface text-ink-primary text-[13px] font-medium border-[0.5px] border-border-strong hover:bg-bg-page transition-colors"
          >
            ← {isZh ? "返回首页" : "Back to home"}
          </Link>
        </article>
      </main>

      <Footer locale={locale} t={t} />
    </>
  );
}
