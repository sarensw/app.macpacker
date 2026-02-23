import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { getLocalizedPopularFormats, getLocalizedFormatsByType } from "@/lib/formats";
import type { FormatEntry, FormatType } from "@/lib/formats";
import ScrollReveal from "@/components/client/ScrollReveal";

const typeLabels: Record<FormatType, { en: string; zh: string }> = {
  archive: { en: "Archives", zh: "压缩包" },
  "disk-image": { en: "Disk Images", zh: "磁盘镜像" },
  compression: { en: "Compression Formats", zh: "压缩格式" },
  installer: { en: "Installers", zh: "安装包" },
};

const typeOrder: FormatType[] = ["archive", "disk-image", "compression", "installer"];

export default async function DocsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const isZh = locale === "zh";
  const popularFormats = getLocalizedPopularFormats(locale);

  return (
    <>
      <ScrollReveal />

      {/* ─── NAV ─── */}
      <nav
        className="fixed top-0 left-0 right-0 z-100 px-12 h-15 flex items-center justify-between bg-[rgba(250,250,248,0.85)] backdrop-blur-[20px] backdrop-saturate-[1.3] border-b border-border max-md:px-5"
        aria-label={isZh ? "主导航" : "Main navigation"}
      >
        <div className="flex items-center gap-2.5">
          <Link
            href={`/${locale}`}
            className="no-underline flex items-center gap-2.5"
          >
            <div className="w-[26px] h-[26px] bg-gradient-to-br from-accent to-[#C06830] rounded-[6px] flex items-center justify-center font-bold text-[13px] text-white" aria-hidden="true">M</div>
            <span className="text-base font-bold text-text tracking-[-0.02em]">MacPacker</span>
          </Link>
        </div>
        <div className="flex items-center gap-7 max-md:hidden">
          <Link href={`/${locale}#features`} className="text-[13.5px] font-medium text-text-secondary no-underline transition-colors hover:text-text">
            {isZh ? "功能" : "Features"}
          </Link>
          <Link href={`/${locale}#formats`} className="text-[13.5px] font-medium text-text-secondary no-underline transition-colors hover:text-text">
            {isZh ? "格式" : "Formats"}
          </Link>
          <Link href={`/${locale}#open-source`} className="text-[13.5px] font-medium text-text-secondary no-underline transition-colors hover:text-text">
            {isZh ? "开源" : "Open Source"}
          </Link>
          <Link href={`/${locale}/docs`} className="nav-active text-[13.5px] font-medium no-underline transition-colors">
            {isZh ? "文档" : "Docs"}
          </Link>
          <Link href={`/${locale}/blog`} className="text-[13.5px] font-medium text-text-secondary no-underline transition-colors hover:text-text">
            {isZh ? "博客" : "Blog"}
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/sarensw/MacPacker"
            className="flex items-center justify-center min-w-[44px] min-h-[44px] text-[13px] font-semibold text-text-secondary no-underline transition-colors hover:text-text"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={isZh ? "GitHub 上的 MacPacker" : "MacPacker on GitHub"}
          >
            GitHub
          </a>
        </div>
      </nav>

      <main>
        {/* ─── DOCS HERO ─── */}
        <section className="pt-35 px-12 pb-15 text-center flex flex-col items-center max-md:pt-30 max-md:px-5 max-md:pb-10">
          <p className="section-eyebrow">
            {isZh ? "文档" : "Documentation"}
          </p>
          <h1 className="section-title max-w-[640px]">
            {isZh
              ? "macOS 上的文件提取指南"
              : "File Extraction Guides for macOS"}
          </h1>
          <p className="mt-4 text-base leading-[1.65] text-text-secondary max-w-[560px] text-center">
            {isZh
              ? "了解如何在 macOS 上打开和提取每种压缩包和磁盘镜像格式。涵盖内置工具、终端命令和 MacPacker 的逐步指南。"
              : "Learn how to open and extract every archive and disk image format on macOS. Step-by-step guides covering built-in tools, Terminal commands, and MacPacker."}
          </p>
        </section>

        {/* ─── POPULAR FORMATS ─── */}
        <section className="py-10 pb-15 reveal">
          <div className="max-w-[1120px] mx-auto px-12 max-md:px-5">
            <h2 className="text-[22px] font-bold tracking-[-0.01em] mb-6 text-text">
              {isZh ? "热门格式" : "Popular Formats"}
            </h2>
            <div className="grid grid-cols-3 gap-3.5 max-md:grid-cols-1">
              {popularFormats.map((f) => (
                <FormatCard key={f.slug} format={f} locale={locale} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── ALL FORMATS BY TYPE ─── */}
        {typeOrder.map((type) => {
          const group = getLocalizedFormatsByType(type, locale);
          if (group.length === 0) return null;
          return (
            <section key={type} className="py-10 pb-15 reveal">
              <div className="max-w-[1120px] mx-auto px-12 max-md:px-5">
                <h2 className="text-[22px] font-bold tracking-[-0.01em] mb-6 text-text">
                  {isZh ? typeLabels[type].zh : typeLabels[type].en}
                </h2>
                <div className="grid grid-cols-3 gap-3.5 max-md:grid-cols-1">
                  {group.map((f) => (
                    <FormatCard key={f.slug} format={f} locale={locale} />
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* ─── CTA ─── */}
        <section className="pt-20 pb-30 text-center reveal">
          <div className="max-w-[1120px] mx-auto px-12 max-md:px-5">
            <h2 className="text-[clamp(24px,3vw,36px)] font-bold tracking-[-0.025em] mb-3">
              {isZh
                ? "使用 MacPacker 轻松提取文件"
                : "Extract files the easy way with MacPacker"}
            </h2>
            <p className="text-[15px] text-text-secondary max-w-[480px] mx-auto mb-7 leading-[1.6]">
              {isZh
                ? "免费、开源的 macOS 压缩包管理器。浏览、预览和提取 30 多种格式的单个文件。"
                : "Free, open-source archive manager for macOS. Browse, preview, and extract individual files from 30+ formats."}
            </p>
            <div className="flex justify-center gap-2.5 flex-wrap">
              <a
                href="https://apps.apple.com/us/app/macpacker/id6473273874"
                className="btn-primary"
              >
                {isZh ? "Mac App Store" : "Mac App Store"}
              </a>
              <Link href={`/${locale}`} className="btn-outline">
                {isZh ? "了解更多" : "Learn more"}
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="py-10 border-t border-border">
        <div className="max-w-[1120px] mx-auto px-12 flex items-center justify-between max-md:flex-col max-md:gap-4 max-md:px-5">
          <div className="text-[13px] text-text-dim flex items-center gap-4">
            <span>&copy; {new Date().getFullYear()} MacPacker</span>
            <span>&middot;</span>
            <span>
              {isZh ? "由 " : "Made by "}
              <a href="https://sarensw.com" className="text-text-secondary no-underline">sarensw</a>
            </span>
          </div>
          <div className="flex gap-6">
            <Link href={`/${locale}/docs`} className="text-[13px] text-text-dim no-underline transition-colors hover:text-text-secondary">{isZh ? "文档" : "Docs"}</Link>
            <Link href={`/${locale}/blog`} className="text-[13px] text-text-dim no-underline transition-colors hover:text-text-secondary">{isZh ? "博客" : "Blog"}</Link>
            <a
              href="https://github.com/sarensw/MacPacker"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-text-dim no-underline transition-colors hover:text-text-secondary"
            >
              GitHub
            </a>
            <Link href={`/${locale}/privacy`} className="text-[13px] text-text-dim no-underline transition-colors hover:text-text-secondary">
              {isZh ? "隐私政策" : "Privacy"}
            </Link>
          </div>
        </div>
      </footer>
    </>
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
      className={`flex flex-col p-6 bg-bg-white border rounded no-underline text-inherit transition-all duration-[0.25s] hover:border-border-hover hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.05)] ${format.popular ? "border-accent-border bg-accent-bg hover:border-accent" : "border-border"}`}
    >
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[17px] font-bold tracking-[-0.01em]">{format.displayName}</span>
        <span className="text-xs font-semibold text-text-dim font-mono">
          {format.extensions[0]}
        </span>
      </div>
      <p className="text-[13.5px] leading-[1.55] text-text-secondary flex-1">{format.description}</p>
      <span className="mt-3.5 text-[13px] font-semibold text-accent">
        {locale === "zh" ? "阅读指南 →" : "Read guide →"}
      </span>
    </Link>
  );
}
