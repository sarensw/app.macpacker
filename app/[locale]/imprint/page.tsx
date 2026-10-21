import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isValidLocale, getTranslations } from "@/lib/i18n";
import { getReleaseData } from "@/lib/release";
import { pageMetadata } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// The app's "Legal Notice" button opens macpacker.app/imprint, and every
// shipped version has that address built in — keep this route.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const isZh = locale === "zh";

  return pageMetadata({
    locale,
    path: "/imprint",
    title: isZh ? "法律声明" : "Legal Notice",
    description: isZh
      ? "MacPacker 及 macpacker.app 的法律声明（Impressum）。"
      : "Legal notice (Impressum) for MacPacker and macpacker.app.",
  });
}

export default async function ImprintPage({
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
            {isZh ? "法律声明" : "Legal Notice"}
          </h1>

          <p className="text-[16px] leading-[1.7] text-ink-secondary mb-8">
            {isZh
              ? "根据德国《数字服务法》（DDG）第 5 条提供的信息。"
              : "Information pursuant to § 5 DDG (German Digital Services Act)."}
          </p>

          <h2 className="text-[20px] font-medium tracking-[-0.015em] text-ink-primary mb-3 mt-10">
            {isZh ? "服务提供者" : "Service provider"}
          </h2>
          <p className="text-[15px] leading-[1.7] text-ink-secondary mb-6">
            Stephan Arenswald
            <br />
            Goldmühlestraße 65
            <br />
            71065 Sindelfingen
            <br />
            {isZh ? "德国" : "Germany"}
          </p>

          <h2 className="text-[20px] font-medium tracking-[-0.015em] text-ink-primary mb-3 mt-10">
            {isZh ? "联系方式" : "Contact"}
          </h2>
          <p className="text-[15px] leading-[1.7] text-ink-secondary mb-6">
            {isZh ? "电子邮件：" : "Email: "}
            <a
              href="mailto:apps@sarensw.com"
              className="text-ink-primary underline underline-offset-[3px] decoration-[0.5px] decoration-border-strong hover:decoration-ink-primary"
            >
              apps@sarensw.com
            </a>
          </p>

          <h2 className="text-[20px] font-medium tracking-[-0.015em] text-ink-primary mb-3 mt-10">
            {isZh
              ? "增值税识别号（依据德国《增值税法》第 27a 条）"
              : "VAT ID (pursuant to § 27a UStG)"}
          </h2>
          <p className="text-[15px] leading-[1.7] text-ink-secondary mb-10">
            DE452469174
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
