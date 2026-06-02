import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, getTranslations } from "@/lib/i18n";
import {
  getLocalizedPopularFormats,
  getLocalizedFormatsByType,
} from "@/lib/formats";
import type { FormatEntry, FormatType } from "@/lib/formats";
import { getReleaseData } from "@/lib/release";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DownloadCard from "@/components/DownloadCard";

const typeLabels: Record<FormatType, { en: string; zh: string }> = {
  archive: { en: "Archives", zh: "压缩包" },
  "disk-image": { en: "Disk Images", zh: "磁盘镜像" },
  compression: { en: "Compression Formats", zh: "压缩格式" },
  installer: { en: "Installers", zh: "安装包" },
};

const typeOrder: FormatType[] = [
  "archive",
  "disk-image",
  "compression",
  "installer",
];

export default async function DocsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const t = await getTranslations(locale);
  const release = await getReleaseData(locale);
  const isZh = locale === "zh";
  const popularFormats = getLocalizedPopularFormats(locale);

  return (
    <>
      <Header locale={locale} t={t} downloadUrl={release.latestDmgUrl} />

      <main className="max-w-[1120px] mx-auto px-6 max-md:px-5">
        <section className="py-16 max-md:py-12 max-w-[640px]">
          <p className="font-mono text-[11px] tracking-[0.08em] text-ink-tertiary uppercase mb-2">
            {isZh ? "文档" : "Documentation"}
          </p>
          <h1
            className="font-medium leading-[1.1] tracking-[-0.025em] text-ink-primary mb-5"
            style={{ fontSize: "clamp(32px, 4.5vw, 48px)" }}
          >
            {isZh
              ? "macOS 上的文件提取指南"
              : "File extraction guides for macOS"}
          </h1>
          <p className="text-[16px] leading-[1.6] text-ink-secondary">
            {isZh
              ? "了解如何在 macOS 上打开和提取每种压缩包和磁盘镜像格式。涵盖内置工具、终端命令和 MacPacker 的逐步指南。"
              : "Learn how to open and extract every archive and disk image format on macOS. Step-by-step guides covering built-in tools, Terminal commands, and MacPacker."}
          </p>
        </section>

        <FormatGroup
          title={isZh ? "热门格式" : "Popular formats"}
          formats={popularFormats}
          locale={locale}
        />

        {typeOrder.map((type) => {
          const group = getLocalizedFormatsByType(type, locale);
          if (group.length === 0) return null;
          return (
            <FormatGroup
              key={type}
              title={isZh ? typeLabels[type].zh : typeLabels[type].en}
              formats={group}
              locale={locale}
            />
          );
        })}

        <DownloadCard
          t={t}
          latestVersion={release.latestVersion}
          latestDmgUrl={release.latestDmgUrl}
          latestZipUrl={release.latestZipUrl}
          className="my-16 max-w-[720px]"
        />
      </main>

      <Footer locale={locale} t={t} />
    </>
  );
}

function FormatGroup({
  title,
  formats,
  locale,
}: {
  title: string;
  formats: FormatEntry[];
  locale: string;
}) {
  return (
    <section className="mb-12">
      <h2 className="text-[18px] font-medium tracking-[-0.01em] text-ink-primary mb-4">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {formats.map((f) => (
          <FormatCard key={f.slug} format={f} locale={locale} />
        ))}
      </div>
    </section>
  );
}

function FormatCard({
  format,
  locale,
}: {
  format: FormatEntry;
  locale: string;
}) {
  return (
    <Link
      href={`/${locale}/docs/${format.slug}`}
      className="flex flex-col p-5 bg-bg-surface border-[0.5px] border-border-default rounded-md no-underline text-inherit transition-colors hover:border-border-strong"
    >
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[15px] font-medium text-ink-primary tracking-[-0.005em]">
          {format.displayName}
        </span>
        <span className="text-[11px] font-mono text-ink-tertiary">
          {format.extensions[0]}
        </span>
      </div>
      <p className="text-[13px] leading-[1.55] text-ink-secondary flex-1 m-0">
        {format.description}
      </p>
      <span className="mt-4 text-[12px] font-medium text-ink-primary inline-flex items-center gap-1">
        {locale === "zh" ? "阅读指南 →" : "Read guide →"}
      </span>
    </Link>
  );
}
