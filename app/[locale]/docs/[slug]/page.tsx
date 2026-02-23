import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isValidLocale, locales } from "@/lib/i18n";
import {
  getFormatBySlug,
  getLocalizedFormatBySlug,
  getLocalizedRelatedFormats,
  getAllFormatSlugs,
} from "@/lib/formats";
import ScrollReveal from "@/components/client/ScrollReveal";

export async function generateStaticParams() {
  const slugs = getAllFormatSlugs();
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const format = getLocalizedFormatBySlug(slug, locale);
  if (!format) return {};

  return {
    title: format.articleTitle,
    description: format.articleIntro.slice(0, 160),
    keywords: format.keywords,
    alternates: {
      canonical: `https://macpacker.app/${locale}/docs/${slug}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `https://macpacker.app/${l}/docs/${slug}`])
      ),
    },
    openGraph: {
      title: format.articleTitle,
      description: format.articleIntro.slice(0, 160),
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "article",
      url: `https://macpacker.app/${locale}/docs/${slug}`,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const format = getLocalizedFormatBySlug(slug, locale);
  if (!format) notFound();

  const isZh = locale === "zh";
  const related = getLocalizedRelatedFormats(slug, locale);

  const baseUrl = "https://macpacker.app";

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isZh ? "首页" : "Home",
        item: `${baseUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isZh ? "文档" : "Docs",
        item: `${baseUrl}/${locale}/docs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: format.fullName,
      },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: format.articleTitle,
    description: format.articleIntro.slice(0, 160),
    author: { "@type": "Organization", name: "MacPacker" },
    publisher: {
      "@type": "Organization",
      name: "MacPacker",
      url: baseUrl,
    },
    datePublished: "2025-01-01",
    dateModified: "2026-02-20",
    mainEntityOfPage: `${baseUrl}/${locale}/docs/${slug}`,
  };

  const faqLd =
    format.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: format.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: format.articleTitle,
    step: format.defaultMethod.steps.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text,
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
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />

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
        {/* ─── BREADCRUMB ─── */}
        <div className="pt-20 max-md:pt-18">
          <div className="max-w-[1120px] mx-auto px-12 max-md:px-5 flex items-center gap-2 text-[13px] text-text-dim">
            <Link href={`/${locale}`} className="text-text-secondary no-underline transition-colors hover:text-accent">
              {isZh ? "首页" : "Home"}
            </Link>
            <span className="text-text-dim" aria-hidden="true">/</span>
            <Link href={`/${locale}/docs`} className="text-text-secondary no-underline transition-colors hover:text-accent">
              {isZh ? "文档" : "Docs"}
            </Link>
            <span className="text-text-dim" aria-hidden="true">/</span>
            <span>{format.fullName}</span>
          </div>
        </div>

        {/* ─── ARTICLE ─── */}
        <article className="py-10 pb-20">
          <div className="max-w-[1120px] mx-auto px-12 max-md:px-5">
            <div className="mb-12 max-w-[720px]">
              <div className="flex items-center gap-3 mb-5">
                <span className={`py-2 px-4 rounded-lg text-[13px] font-semibold tracking-[0.01em] transition-all ${format.popular ? "bg-accent-bg border border-accent-border text-accent" : "bg-bg-white border border-border text-text-secondary"}`}>
                  {format.displayName}
                </span>
                <span className="text-[13px] font-mono text-text-dim">
                  {format.extensions.join(", ")}
                </span>
              </div>
              <h1 className="text-[clamp(28px,4vw,40px)] font-bold leading-[1.15] tracking-[-0.025em] mb-5">{format.articleTitle}</h1>
              <p className="text-base leading-[1.7] text-text-secondary">{format.articleIntro}</p>
            </div>

            {/* ─── DEFAULT METHOD ─── */}
            <section className="max-w-[720px] mb-12 reveal">
              <h2 className="text-2xl font-bold tracking-[-0.02em] mb-4">
                {isZh
                  ? `在 macOS 上打开 ${format.displayName} 文件的默认方法`
                  : `The Default Way to Open ${format.displayName} Files on macOS`}
              </h2>
              <p className="text-sm text-text-secondary mb-4">
                <strong className="text-text">{isZh ? "工具：" : "Tool:"}</strong>{" "}
                {format.defaultMethod.tool}
              </p>

              {format.defaultMethod.command && (
                <div className="bg-bg-dark rounded-[10px] py-4 px-5 mb-5 overflow-x-auto">
                  <code className="font-mono text-sm text-white/90 whitespace-pre">{format.defaultMethod.command}</code>
                </div>
              )}

              <h3 className="text-lg font-bold mb-3 mt-5">{isZh ? "步骤" : "Steps"}</h3>
              <ol className="list-decimal pl-6 mb-5">
                {format.defaultMethod.steps.map((step, i) => (
                  <li key={i} className="text-[15px] leading-[1.7] text-text-secondary mb-2 pl-1">{step}</li>
                ))}
              </ol>

              {format.defaultMethod.notes && (
                <div className="bg-bg-subtle border border-border rounded p-4 px-5 text-sm leading-[1.6] text-text-secondary">
                  <strong className="text-text">{isZh ? "注意：" : "Note:"}</strong>{" "}
                  {format.defaultMethod.notes}
                </div>
              )}
            </section>

            {/* ─── SELECTIVE EXTRACTION CALLOUT ─── */}
            {format.macpackerSelectiveExtraction && (
              <section className="max-w-[720px] mb-12 bg-accent-bg border border-accent-border rounded-lg p-8 max-md:p-6 reveal">
                <h2 className="text-xl font-bold tracking-[-0.01em] mb-3 text-text">
                  {isZh
                    ? `从 ${format.displayName} 压缩包中提取单个文件`
                    : `Extract Individual Files from a ${format.displayName} Archive`}
                </h2>
                <p className="text-[15px] leading-[1.7] text-text-secondary">
                  {format.defaultMethod.supportsSelectiveExtraction
                    ? isZh
                      ? `虽然默认的 macOS 工具支持选择性提取，但过程通常涉及终端命令。MacPacker 通过可视化文件浏览器让这一切变得简单——只需浏览压缩包内容并拖出所需文件即可。`
                      : `While the default macOS tools support selective extraction, the process typically involves Terminal commands. MacPacker makes this effortless with a visual file browser — just browse the archive contents and drag out what you need.`
                    : isZh
                      ? `macOS 默认工具会提取所有内容，无法选择单个文件。MacPacker 让您可以浏览 ${format.displayName} 压缩包内容，预览文件，并只提取所需的文件——无需提取整个压缩包。`
                      : `The default macOS tools extract everything — there's no way to pick individual files. MacPacker lets you browse ${format.displayName} archive contents, preview files, and extract only what you need — without unpacking the entire archive.`}
                </p>
              </section>
            )}

            {/* ─── MACPACKER SECTION ─── */}
            <section className="max-w-[720px] mb-12 reveal">
              <h2 className="text-2xl font-bold tracking-[-0.02em] mb-4">
                {isZh
                  ? `使用 MacPacker 打开 ${format.displayName} 文件`
                  : `A Better Way: Open ${format.displayName} Files with MacPacker`}
              </h2>
              <p className="text-[15px] leading-[1.7] text-text-secondary mb-4">
                {isZh
                  ? `MacPacker 是一款免费的开源 macOS 压缩包管理器，支持 ${format.displayName} 以及 30 多种其他格式。与默认工具不同，MacPacker 让您可以：`
                  : `MacPacker is a free, open-source macOS archive manager that supports ${format.displayName} and 30+ other formats. Unlike the default tools, MacPacker lets you:`}
              </p>
              <ul className="article-features">
                <li>
                  {isZh
                    ? "像文件夹一样浏览压缩包内容"
                    : "Browse archive contents like a folder"}
                </li>
                <li>
                  {isZh
                    ? "使用 Quick Look 预览文件而无需提取"
                    : "Preview files with Quick Look without extracting"}
                </li>
                <li>
                  {isZh
                    ? "通过拖放提取单个文件"
                    : "Extract individual files via drag and drop"}
                </li>
                <li>
                  {isZh
                    ? "导航嵌套的压缩包（压缩包中的压缩包）"
                    : "Navigate nested archives (archives within archives)"}
                </li>
                <li>
                  {isZh
                    ? "以原生 SwiftUI 界面享受流畅体验"
                    : "Enjoy a native SwiftUI interface that feels right at home on macOS"}
                </li>
              </ul>
              <div className="flex gap-2.5 flex-wrap mt-2">
                <a
                  href="https://apps.apple.com/us/app/macpacker/id6473273874"
                  className="btn-primary"
                >
                  {isZh ? "从 Mac App Store 下载" : "Download from Mac App Store"}
                </a>
                <a
                  href="https://github.com/sarensw/MacPacker"
                  className="btn-outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {isZh ? "在 GitHub 上查看" : "View on GitHub"}
                </a>
              </div>
            </section>

            {/* ─── FAQ ─── */}
            {format.faqs.length > 0 && (
              <section className="max-w-[720px] mb-12 reveal">
                <h2 className="text-2xl font-bold tracking-[-0.02em] mb-6">
                  {isZh ? "常见问题" : "Frequently Asked Questions"}
                </h2>
                <div className="flex flex-col gap-5">
                  {format.faqs.map((faq, i) => (
                    <div key={i} className="bg-bg-white border border-border rounded p-6">
                      <h3 className="text-base font-bold mb-2 tracking-[-0.01em]">{faq.question}</h3>
                      <p className="text-sm leading-[1.65] text-text-secondary">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ─── RELATED FORMATS ─── */}
            {related.length > 0 && (
              <section className="max-w-[720px] mb-12 reveal">
                <h2 className="text-2xl font-bold tracking-[-0.02em] mb-5">
                  {isZh ? "相关格式" : "Related Formats"}
                </h2>
                <div className="grid grid-cols-2 gap-3.5 max-md:grid-cols-1">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/${locale}/docs/${r.slug}`}
                      className="p-5 bg-bg-white border border-border rounded no-underline text-inherit transition-all duration-[0.25s] hover:border-border-hover hover:-translate-y-[2px] hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
                    >
                      <span className="text-base font-bold mr-2">
                        {r.displayName}
                      </span>
                      <span className="text-xs text-text-dim font-mono">
                        {r.extensions[0]}
                      </span>
                      <p className="mt-2 text-[13px] leading-[1.55] text-text-secondary">{r.description}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </article>
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
