import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isValidLocale, getTranslations } from "@/lib/i18n";
import { getReleaseData } from "@/lib/release";
import { pageMetadata } from "@/lib/seo";
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

  const title = isZh
    ? "隐私政策 — 无追踪、无账户"
    : "Privacy Policy — No Tracking, No Accounts";
  const description = isZh
    ? "MacPacker 不收集、存储或传输任何个人数据——没有分析、没有账户、没有网络请求。所有操作均在你的 Mac 本地完成。"
    : "MacPacker does not collect, store, or transmit any personal data — no analytics, no accounts, no network requests. Everything stays on your Mac.";

  return pageMetadata({
    locale,
    path: "/privacy",
    title,
    description,
  });
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
              ? "MacPacker 完全在您的设备本地运行。应用不会向任何服务器发送数据，也不含任何分析工具、追踪器或遥测数据。"
              : "MacPacker runs entirely on your local device. The app sends no data to any server, and contains no analytics, trackers, or telemetry."}
          </p>
          <p className="text-[15px] leading-[1.7] text-ink-secondary mb-6">
            {isZh
              ? "本网站（macpacker.app）使用 Ahrefs Web Analytics（一款注重隐私、无 Cookie 的工具）来统计访问量。它不设置 Cookie，也不会跨站点追踪您。"
              : "This website (macpacker.app) uses Ahrefs Web Analytics, a privacy-friendly, cookieless tool, to measure visits. It sets no cookies and doesn't track you across sites."}
          </p>
          <p className="text-[15px] leading-[1.7] text-ink-secondary mb-6">
            {isZh
              ? "Ahrefs 只统计聚合的访问数据（如页面浏览量、来源网站和大致的国家/地区），不记录您的 IP 地址，也不会构建跨网站的用户画像。这些数据仅用于了解哪些页面有帮助。我们不出售或共享任何数据。"
              : "Ahrefs records only aggregated visit data — such as page views, referring sites, and approximate country — without logging your IP address or building a cross-site profile. It exists only to show which pages are useful. No data is ever sold or shared."}
          </p>

          <h2 className="text-[20px] font-medium tracking-[-0.015em] text-ink-primary mb-3 mt-10">
            {isZh ? "文件访问" : "File access"}
          </h2>
          <p className="text-[15px] leading-[1.7] text-ink-secondary mb-6">
            {isZh
              ? "MacPacker 仅在您明确打开文件时访问您选择的文件。应用在 macOS 沙盒环境中运行，不会在您的操作范围之外访问任何文件。"
              : "MacPacker only accesses files that you explicitly open. The app runs in a macOS sandbox and does not access files beyond what you interact with."}
          </p>
          <p className="text-[15px] leading-[1.7] text-ink-secondary mb-6">
            {isZh
              ? "MacPacker 没有服务器端组件。所有压缩包的浏览、预览和提取都完全在您的 Mac 本地进行——您的文件永远不会离开您的设备。应用不含账户系统，无需注册或登录。"
              : "MacPacker has no server-side component. All browsing, previewing, and extraction happens entirely on your Mac — your files never leave your device. The app has no account system, so there is nothing to sign up for or log in to."}
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
