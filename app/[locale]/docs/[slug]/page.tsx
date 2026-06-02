import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isValidLocale, locales, getTranslations } from "@/lib/i18n";
import {
  getLocalizedFormatBySlug,
  getLocalizedRelatedFormats,
  getAllFormatSlugs,
} from "@/lib/formats";
import { getReleaseData } from "@/lib/release";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DownloadCard from "@/components/DownloadCard";

export async function generateStaticParams() {
  const slugs = getAllFormatSlugs();
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
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
        locales.map((l) => [l, `https://macpacker.app/${l}/docs/${slug}`]),
      ),
    },
    openGraph: {
      title: format.articleTitle,
      description: format.articleIntro.slice(0, 160),
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "article",
      url: `https://macpacker.app/${locale}/docs/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: format.articleTitle,
      description: format.articleIntro.slice(0, 160),
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

  const t = await getTranslations(locale);
  const release = await getReleaseData(locale);
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
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    image: `${baseUrl}/logo.png`,
    datePublished: "2025-01-01",
    dateModified: "2026-05-23",
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

      <Header locale={locale} t={t} downloadUrl={release.latestDmgUrl} />

      <main className="max-w-[1120px] mx-auto px-6 max-md:px-5">
        {/* ─── BREADCRUMB ─── */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[12px] text-ink-tertiary mb-8 mt-2 font-mono uppercase tracking-[0.04em]"
        >
          <Link
            href={`/${locale}`}
            className="text-ink-secondary hover:text-ink-primary transition-colors"
          >
            {isZh ? "首页" : "Home"}
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href={`/${locale}/docs`}
            className="text-ink-secondary hover:text-ink-primary transition-colors"
          >
            {isZh ? "文档" : "Docs"}
          </Link>
          <span aria-hidden="true">/</span>
          <span>{format.displayName}</span>
        </nav>

        {/* ─── ARTICLE ─── */}
        <article className="pb-20">
          <div className="mb-8 max-w-[720px]">
            <div className="flex items-center gap-3 mb-5">
              <span className="py-[5px] px-2.5 rounded-md font-mono text-[12px] bg-bg-surface text-ink-secondary border-[0.5px] border-border-default">
                {format.displayName}
              </span>
              <span className="text-[12px] font-mono text-ink-tertiary">
                {format.extensions.join(" · ")}
              </span>
            </div>
            <h1
              className="font-medium leading-[1.15] tracking-[-0.025em] text-ink-primary mb-5"
              style={{ fontSize: "clamp(28px, 4vw, 40px)" }}
            >
              {format.articleTitle}
            </h1>
            <p className="text-[16px] leading-[1.7] text-ink-secondary">
              {format.articleIntro}
            </p>
          </div>

          {/* ─── ON THIS PAGE ─── */}
          <nav
            aria-label={isZh ? "本页目录" : "On this page"}
            className="mb-12 max-w-[720px] bg-bg-surface border-[0.5px] border-border-default rounded-md px-5 py-4"
          >
            <p className="font-mono text-[10px] tracking-[0.08em] text-ink-tertiary uppercase mb-2.5">
              {isZh ? "本页目录" : "On this page"}
            </p>
            <ol className="flex flex-col gap-1.5 m-0 p-0 list-none">
              <li>
                <a
                  href="#default-way"
                  className="text-[14px] text-ink-primary inline-flex items-center gap-2 hover:underline underline-offset-[3px] decoration-[0.5px] decoration-border-strong"
                >
                  <span className="text-ink-tertiary" aria-hidden="true">↓</span>
                  {isZh
                    ? `在 macOS 上打开 ${format.displayName} 文件的默认方法`
                    : `The default way to open ${format.displayName} files on macOS`}
                </a>
              </li>
              <li>
                <a
                  href="#better-way"
                  className="text-[14px] text-ink-primary inline-flex items-center gap-2 hover:underline underline-offset-[3px] decoration-[0.5px] decoration-border-strong"
                >
                  <span className="text-ink-tertiary" aria-hidden="true">↓</span>
                  {isZh
                    ? `使用 MacPacker 打开 ${format.displayName} 文件`
                    : `A better way: open ${format.displayName} files with MacPacker`}
                </a>
              </li>
            </ol>
          </nav>

          {/* ─── DEFAULT METHOD ─── */}
          <section id="default-way" className="max-w-[720px] mb-12 scroll-mt-8">
            <h2 className="text-[22px] font-medium tracking-[-0.015em] text-ink-primary mb-4">
              {isZh
                ? `在 macOS 上打开 ${format.displayName} 文件的默认方法`
                : `The default way to open ${format.displayName} files on macOS`}
            </h2>
            <p className="text-[14px] text-ink-secondary mb-4">
              <strong className="text-ink-primary font-medium">
                {isZh ? "工具：" : "Tool:"}
              </strong>{" "}
              {format.defaultMethod.tool}
            </p>

            {format.defaultMethod.command && (
              <div className="bg-[#1b1b1b] rounded-md border-[0.5px] border-border-default py-3 px-4 mb-5 overflow-x-auto">
                <code className="font-mono text-[13px] text-white/90 whitespace-pre">
                  <span className="text-white/40 select-none">$ </span>
                  {format.defaultMethod.command}
                </code>
              </div>
            )}

            <h3 className="text-[15px] font-medium text-ink-primary mb-3 mt-5">
              {isZh ? "步骤" : "Steps"}
            </h3>
            <ol className="list-decimal pl-6 mb-5 marker:text-ink-tertiary">
              {format.defaultMethod.steps.map((step, i) => (
                <li
                  key={i}
                  className="text-[14px] leading-[1.7] text-ink-secondary mb-2 pl-1"
                >
                  {step}
                </li>
              ))}
            </ol>

            {format.defaultMethod.notes && (
              <div className="bg-bg-surface border-[0.5px] border-border-default rounded-md p-4 text-[13px] leading-[1.6] text-ink-secondary">
                <strong className="text-ink-primary font-medium">
                  {isZh ? "注意：" : "Note:"}
                </strong>{" "}
                {format.defaultMethod.notes}
              </div>
            )}
          </section>

          {/* ─── SELECTIVE EXTRACTION CALLOUT ─── */}
          {format.macpackerSelectiveExtraction && (
            <section className="max-w-[720px] mb-12 bg-bg-surface border-[0.5px] border-border-default rounded-md p-6">
              <h2 className="text-[17px] font-medium tracking-[-0.01em] text-ink-primary mb-2">
                {isZh
                  ? `从 ${format.displayName} 压缩包中提取单个文件`
                  : `Extract individual files from a ${format.displayName} archive`}
              </h2>
              <p className="text-[14px] leading-[1.65] text-ink-secondary m-0">
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
          <section id="better-way" className="max-w-[720px] mb-12 scroll-mt-8">
            <h2 className="text-[22px] font-medium tracking-[-0.015em] text-ink-primary mb-4">
              {isZh
                ? `使用 MacPacker 打开 ${format.displayName} 文件`
                : `A better way: open ${format.displayName} files with MacPacker`}
            </h2>
            <p className="text-[15px] leading-[1.7] text-ink-secondary mb-4">
              {isZh
                ? `MacPacker 是一款免费的开源 macOS 压缩包管理器，支持 ${format.displayName} 以及 30 多种其他格式。与默认工具不同，MacPacker 让您可以：`
                : `MacPacker is a free, open-source macOS archive manager that supports ${format.displayName} and 30+ other formats. Unlike the default tools, MacPacker lets you:`}
            </p>
            <ul className="list-none p-0 mb-6">
              {(isZh
                ? [
                    "像文件夹一样浏览压缩包内容",
                    "使用 Quick Look 预览文件而无需提取",
                    "通过拖放提取单个文件",
                    "导航嵌套的压缩包（压缩包中的压缩包）",
                    "以原生 SwiftUI 界面享受流畅体验",
                  ]
                : [
                    "Browse archive contents like a folder",
                    "Preview files with Quick Look without extracting",
                    "Extract individual files via drag and drop",
                    "Navigate nested archives (archives within archives)",
                    "Enjoy a native SwiftUI interface that feels right at home on macOS",
                  ]
              ).map((item) => (
                <li
                  key={item}
                  className="text-[14px] leading-[1.7] text-ink-secondary pl-5 relative mb-1.5"
                >
                  <span
                    className="absolute left-1 top-[10px] w-1 h-1 rounded-full bg-ink-tertiary"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <DownloadCard
            t={t}
            latestVersion={release.latestVersion}
            latestDmgUrl={release.latestDmgUrl}
            latestZipUrl={release.latestZipUrl}
            className="mb-12 max-w-[720px]"
          />

          {/* ─── FAQ ─── */}
          {format.faqs.length > 0 && (
            <section className="max-w-[720px] mb-12">
              <h2 className="text-[22px] font-medium tracking-[-0.015em] text-ink-primary mb-5">
                {isZh ? "常见问题" : "Frequently asked questions"}
              </h2>
              <div className="flex flex-col gap-3">
                {format.faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="bg-bg-surface border-[0.5px] border-border-default rounded-md p-5 group"
                  >
                    <summary className="cursor-pointer text-[14px] font-medium text-ink-primary tracking-[-0.005em] flex items-center justify-between gap-3">
                      <span>{faq.question}</span>
                      <span
                        className="text-ink-tertiary text-[12px] font-mono shrink-0 group-open:rotate-45 transition-transform"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <p className="text-[13.5px] leading-[1.65] text-ink-secondary mt-3 m-0">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* ─── RELATED FORMATS ─── */}
          {related.length > 0 && (
            <section className="max-w-[720px] mb-12">
              <h2 className="text-[22px] font-medium tracking-[-0.015em] text-ink-primary mb-5">
                {isZh ? "相关格式" : "Related formats"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/${locale}/docs/${r.slug}`}
                    className="p-4 bg-bg-surface border-[0.5px] border-border-default rounded-md no-underline text-inherit transition-colors hover:border-border-strong"
                  >
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="text-[14px] font-medium text-ink-primary">
                        {r.displayName}
                      </span>
                      <span className="text-[11px] text-ink-tertiary font-mono">
                        {r.extensions[0]}
                      </span>
                    </div>
                    <p className="text-[12.5px] leading-[1.55] text-ink-secondary m-0">
                      {r.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>

      <Footer locale={locale} t={t} />
    </>
  );
}
