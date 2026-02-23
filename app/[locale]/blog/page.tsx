import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, getTranslations } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const t = await getTranslations(locale);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-100 px-12 h-15 flex items-center justify-between bg-[rgba(250,250,248,0.85)] backdrop-blur-[20px] backdrop-saturate-[1.3] border-b border-border max-md:px-5">
        <div className="nav-left">
          <Link href={`/${locale}`} className="no-underline flex items-center gap-2.5">
            <div className="w-[26px] h-[26px] bg-gradient-to-br from-accent to-[#C06830] rounded-[6px] flex items-center justify-center font-bold text-[13px] text-white">M</div>
            <span className="text-base font-bold text-text tracking-[-0.02em]">MacPacker</span>
          </Link>
        </div>
        <div className="flex items-center gap-7 max-md:hidden">
          <Link href={`/${locale}#features`} className="text-[13.5px] font-medium text-text-secondary no-underline transition-colors hover:text-text">
            {locale === "zh" ? "功能" : "Features"}
          </Link>
          <Link href={`/${locale}#formats`} className="text-[13.5px] font-medium text-text-secondary no-underline transition-colors hover:text-text">
            {locale === "zh" ? "格式" : "Formats"}
          </Link>
          <Link href={`/${locale}#open-source`} className="text-[13.5px] font-medium text-text-secondary no-underline transition-colors hover:text-text">
            {locale === "zh" ? "开源" : "Open Source"}
          </Link>
          <Link href={`/${locale}/docs`} className="text-[13.5px] font-medium text-text-secondary no-underline transition-colors hover:text-text">
            {locale === "zh" ? "文档" : "Docs"}
          </Link>
          <Link href={`/${locale}/blog`} className="nav-active text-[13.5px] font-medium no-underline transition-colors">
            {locale === "zh" ? "博客" : "Blog"}
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/sarensw/MacPacker"
            className="flex items-center justify-center min-w-[44px] min-h-[44px] text-[13px] font-semibold text-text-secondary no-underline transition-colors hover:text-text"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </nav>

      <main>
        <section className="min-h-[60vh] flex flex-col items-center justify-center text-center pt-30 px-6 pb-15">
          <p className="section-eyebrow">{t.blog.eyebrow}</p>
          <h1 className="section-title">{t.blog.title}</h1>
          <p className="mt-4 text-[17px] leading-[1.65] text-text-secondary max-w-[480px]">
            {locale === "zh"
              ? "博客内容即将上线。敬请期待！"
              : "Blog posts coming soon. Stay tuned!"}
          </p>
          <div className="mt-8">
            <Link href={`/${locale}`} className="btn-outline">
              ← {locale === "zh" ? "返回首页" : "Back to home"}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
