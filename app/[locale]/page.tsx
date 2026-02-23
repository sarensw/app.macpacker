import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale, getTranslations } from "@/lib/i18n";
import { GitHubIcon, AppleIcon, DownloadIcon } from "@/components/icons";
import ScrollReveal from "@/components/client/ScrollReveal";
import BrewCopyButton from "@/components/client/BrewCopyButton";
import LanguageSwitcher from "@/components/client/LanguageSwitcher";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const t = await getTranslations(locale);

  return (
    <>
      <ScrollReveal />

      <a href="#main-content" className="skip-link">
        {locale === "zh" ? "跳到主要内容" : "Skip to main content"}
      </a>

      {/* ─── NAV ─── */}
      <nav
        className="fixed top-0 left-0 right-0 z-100 px-12 h-15 flex items-center justify-between bg-[rgba(250,250,248,0.85)] backdrop-blur-[20px] backdrop-saturate-[1.3] border-b border-border max-md:px-5"
        aria-label={locale === "zh" ? "主导航" : "Main navigation"}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-[26px] h-[26px] bg-gradient-to-br from-accent to-[#C06830] rounded-[6px] flex items-center justify-center font-bold text-[13px] text-white" aria-hidden="true">M</div>
          <span className="text-base font-bold text-text tracking-[-0.02em]">MacPacker</span>
        </div>
        <div className="flex items-center gap-7 max-md:hidden">
          <a href="#features" className="text-[13.5px] font-medium text-text-secondary no-underline transition-colors hover:text-text">{t.nav.features}</a>
          <a href="#formats" className="text-[13.5px] font-medium text-text-secondary no-underline transition-colors hover:text-text">{t.nav.formats}</a>
          <a href="#open-source" className="text-[13.5px] font-medium text-text-secondary no-underline transition-colors hover:text-text">{t.nav.openSource}</a>
          <Link href={`/${locale}/docs`} className="text-[13.5px] font-medium text-text-secondary no-underline transition-colors hover:text-text">{t.nav.docs}</Link>
          <Link href={`/${locale}/blog`} className="text-[13.5px] font-medium text-text-secondary no-underline transition-colors hover:text-text">{t.nav.blog}</Link>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher locale={locale} />
          <a
            href="https://github.com/sarensw/MacPacker"
            className="flex items-center justify-center min-w-[44px] min-h-[44px] text-[13px] font-semibold text-text-secondary no-underline transition-colors hover:text-text"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={locale === "zh" ? "GitHub 上的 MacPacker" : "MacPacker on GitHub"}
          >
            <GitHubIcon />
          </a>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <main id="main-content">
      <section className="min-h-screen flex flex-col items-center justify-center text-center pt-30 px-6 pb-15 max-md:pt-25 max-md:px-5 max-md:pb-10">
        <div className="inline-flex items-center gap-[7px] py-[5px] pl-[7px] pr-3.5 bg-bg-white border border-border rounded-full text-[13px] font-medium text-text-secondary mb-9 animate-fade-up">
          <span className="w-[7px] h-[7px] bg-[#34C759] rounded-full" aria-hidden="true"></span>
          {t.hero.badge}
        </div>
        <h1 className="text-[clamp(44px,6.5vw,80px)] font-bold leading-[1.06] tracking-[-0.035em] max-w-[750px] animate-fade-up [animation-delay:0.08s]">
          {t.hero.titlePre}
          <em className="font-accent italic font-normal text-accent">{t.hero.titleEm}</em>
          <br />
          {t.hero.titlePost}
        </h1>
        <p className="mt-6 text-[17px] leading-[1.65] text-text-secondary max-w-[480px] font-normal animate-fade-up [animation-delay:0.16s]">{t.hero.sub}</p>

        <div className="mt-11 flex flex-col items-center gap-4 animate-fade-up [animation-delay:0.24s]">
          <div className="flex gap-2.5 flex-wrap justify-center">
            <a
              href="https://apps.apple.com/us/app/macpacker/id6473273874"
              className="btn-primary"
            >
              <AppleIcon />
              {t.hero.appStore}
            </a>
            <a
              href="https://github.com/sarensw/MacPacker/releases"
              className="btn-outline"
            >
              <GitHubIcon />
              {t.hero.githubReleases}
            </a>
            <a
              href="https://github.com/sarensw/MacPacker/releases/latest/download/MacPacker.zip"
              className="btn-outline"
            >
              <DownloadIcon />
              {t.hero.directDownload}
            </a>
          </div>
          <BrewCopyButton
            command={t.hero.brewCommand}
            copiedLabel={t.hero.copied}
          />
        </div>

        {/* ─── APP WINDOW ─── */}
        <div className="mt-16 w-full max-w-[880px] animate-fade-up [animation-delay:0.4s]" aria-hidden="true">
          <div className="bg-bg-white border border-border rounded-[12px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_32px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-[7px] px-4 py-3 bg-bg-subtle border-b border-border">
              <div className="w-[11px] h-[11px] rounded-full bg-[#FF5F57]"></div>
              <div className="w-[11px] h-[11px] rounded-full bg-[#FEBC2E]"></div>
              <div className="w-[11px] h-[11px] rounded-full bg-[#28C840]"></div>
              <span className="flex-1 text-center text-xs text-text-dim font-medium mr-10">{t.window.title}</span>
            </div>
            <div className="flex min-h-[340px]">
              <div className="w-[210px] py-3.5 px-2.5 border-r border-border bg-bg-subtle max-md:hidden">
                <div className="flex items-center gap-2 py-[7px] px-2.5 rounded-[7px] text-[12.5px] bg-accent-bg text-accent font-semibold mb-px">
                  📦 {t.window.sidebar.archive}
                </div>
                <div className="flex items-center gap-2 py-[7px] px-2.5 pl-7 rounded-[7px] text-[12.5px] text-text-secondary mb-px">
                  📁 {t.window.sidebar.src}
                </div>
                <div className="flex items-center gap-2 py-[7px] px-2.5 pl-7 rounded-[7px] text-[12.5px] text-text-secondary mb-px">
                  📁 {t.window.sidebar.docs}
                </div>
                <div className="flex items-center gap-2 py-[7px] px-2.5 pl-7 rounded-[7px] text-[12.5px] text-text-secondary mb-px">
                  📁 {t.window.sidebar.assets}
                </div>
                <div className="flex items-center gap-2 py-[7px] px-2.5 pl-7 rounded-[7px] text-[12.5px] text-text-secondary mb-px">
                  📄 {t.window.sidebar.readme}
                </div>
                <div className="flex items-center gap-2 py-[7px] px-2.5 pl-7 rounded-[7px] text-[12.5px] text-text-secondary mb-px">
                  📄 {t.window.sidebar.package}
                </div>
              </div>
              <div className="flex-1 p-3.5">
                <div className="flex items-center gap-2.5 py-[9px] px-3 rounded-[7px] text-[13px] bg-accent-bg">
                  <span className="text-[15px] w-[18px] text-center">📁</span>
                  <span className="flex-1 font-medium">{t.window.files.src.name}</span>
                  <span className="text-text-dim text-xs">{t.window.files.src.size}</span>
                  <span className="text-text-dim text-xs w-[85px] text-right">{t.window.files.src.date}</span>
                </div>
                {[t.window.files.docs, t.window.files.assets, t.window.files.readme, t.window.files.package, t.window.files.tsconfig, t.window.files.credentials].map((file, i) => (
                  <div key={i} className="flex items-center gap-2.5 py-[9px] px-3 rounded-[7px] text-[13px] transition-[background] duration-[0.12s] hover:bg-bg-subtle">
                    <span className="text-[15px] w-[18px] text-center">{i < 2 ? "📁" : i < 5 ? "📄" : "🔒"}</span>
                    <span className="flex-1 font-medium">{file.name}</span>
                    <span className="text-text-dim text-xs">{file.size}</span>
                    <span className="text-text-dim text-xs w-[85px] text-right">{file.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FORMATS ─── */}
      <section className="py-30 reveal" id="formats">
        <div className="max-w-[1120px] mx-auto px-12 max-md:px-5">
          <div className="mb-12">
            <p className="section-eyebrow">{t.formats.eyebrow}</p>
            <h2 className="section-title">{t.formats.title}</h2>
            <p className="mt-4 text-[15px] text-text-secondary max-w-[460px] leading-[1.6]">{t.formats.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["ZIP","RAR","7z","TAR"].map(f => (
              <span key={f} className="py-2 px-4 bg-accent-bg border border-accent-border rounded-lg text-[13px] font-semibold text-accent tracking-[0.01em] transition-all hover:border-border-hover hover:text-text">{f}</span>
            ))}
            {["GZ","BZ2","XZ","LZ4","Z"].map(f => (
              <span key={f} className="py-2 px-4 bg-bg-white border border-border rounded-lg text-[13px] font-semibold text-text-secondary tracking-[0.01em] transition-all hover:border-border-hover hover:text-text">{f}</span>
            ))}
            {["DMG","ISO","PKG"].map(f => (
              <span key={f} className="py-2 px-4 bg-accent-bg border border-accent-border rounded-lg text-[13px] font-semibold text-accent tracking-[0.01em] transition-all hover:border-border-hover hover:text-text">{f}</span>
            ))}
            {["CAB","CPIO","XAR","SIT","SEA","ARJ","LHA","LZH","LZX","CHM","APFS","FAT","NTFS","VMDK","VHD","VHDX","VDI","QCOW2","SquashFS","TAR.Z"].map(f => (
              <span key={f} className="py-2 px-4 bg-bg-white border border-border rounded-lg text-[13px] font-semibold text-text-secondary tracking-[0.01em] transition-all hover:border-border-hover hover:text-text">{f}</span>
            ))}
          </div>
          <p className="mt-5 text-[13px] text-text-dim">
            {t.formats.note}{" "}
            <a href="https://github.com/sarensw/MacPacker" className="text-accent no-underline font-semibold">
              {t.formats.seeFullList}
            </a>
          </p>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-30 reveal" id="features">
        <div className="max-w-[1120px] mx-auto px-12 max-md:px-5">
          <p className="section-eyebrow">{t.features.eyebrow}</p>
          <h2 className="section-title">{t.features.title}</h2>
          <div className="grid grid-cols-3 gap-4 mt-14 max-md:grid-cols-1">
            {[
              { icon: "👁", t: t.features.peek },
              { icon: "🪆", t: t.features.nested },
              { icon: "🎯", t: t.features.selective },
              { icon: "⚡", t: t.features.native },
              { icon: "🔍", t: t.features.quicklook },
              { icon: "📂", t: t.features.finder },
            ].map((feat) => (
              <div key={feat.t.title} className="p-8 px-7 bg-bg-white border border-border rounded transition-all duration-[0.25s] hover:border-border-hover hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)]">
                <div className="w-10 h-10 bg-accent-bg border border-accent-border rounded-[10px] flex items-center justify-center text-lg mb-5" aria-hidden="true">{feat.icon}</div>
                <h3 className="text-[17px] font-bold tracking-[-0.01em] mb-2">{feat.t.title}</h3>
                <p className="text-sm leading-[1.6] text-text-secondary">{feat.t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-30 reveal" id="how-it-works">
        <div className="max-w-[1120px] mx-auto px-12 max-md:px-5">
          <p className="section-eyebrow">{t.howItWorks.eyebrow}</p>
          <h2 className="section-title">{t.howItWorks.title}</h2>
          <div className="grid grid-cols-3 gap-10 mt-14 max-md:grid-cols-1">
            {[
              { num: "1", t: t.howItWorks.open },
              { num: "2", t: t.howItWorks.browse },
              { num: "3", t: t.howItWorks.extract },
            ].map((step) => (
              <div key={step.num}>
                <div className="flex items-center justify-center w-9 h-9 bg-accent-bg border border-accent-border rounded-[10px] text-sm font-bold text-accent mb-5">{step.num}</div>
                <h3 className="text-lg font-bold mb-2 tracking-[-0.01em]">{step.t.title}</h3>
                <p className="text-sm leading-[1.6] text-text-secondary max-w-[300px]">{step.t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OPEN SOURCE ─── */}
      <section className="py-30 reveal" id="open-source">
        <div className="max-w-[1120px] mx-auto px-12 max-md:px-5">
          <div className="bg-bg-dark rounded-lg p-18 grid grid-cols-[1fr_auto] gap-16 items-center text-white relative overflow-hidden max-md:grid-cols-1 max-md:p-7 max-md:gap-10 os-card-glow">
            <div className="relative z-[1]">
              <p className="section-eyebrow">{t.openSource.eyebrow}</p>
              <h2 className="section-title !text-white mb-4">
                {t.openSource.title}
                <em>{t.openSource.titleEm}</em>
              </h2>
              <p className="text-[15px] leading-[1.65] text-white/60 max-w-[440px] mb-7">{t.openSource.description}</p>
              <a
                href="https://github.com/sarensw/MacPacker"
                className="inline-flex items-center gap-[7px] px-6 py-3 bg-white/10 text-white text-sm font-semibold border border-white/15 rounded-[10px] no-underline transition-all hover:bg-white/15 hover:border-white/25"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon />
                {t.openSource.viewOnGithub}
              </a>
            </div>
            <div className="flex flex-col gap-8 relative z-[1] max-md:flex-row max-md:gap-8">
              {[
                { v: t.openSource.stats.formats.value, l: t.openSource.stats.formats.label },
                { v: t.openSource.stats.stars.value, l: t.openSource.stats.stars.label },
                { v: t.openSource.stats.license.value, l: t.openSource.stats.license.label },
              ].map((stat) => (
                <div key={stat.l} className="text-right max-md:text-left">
                  <div className="text-4xl font-bold text-accent leading-none mb-1 tracking-[-0.02em]">{stat.v}</div>
                  <div className="text-[13px] text-white/40 font-medium">{stat.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── LANGUAGES ─── */}
      <section className="pb-30 reveal">
        <div className="max-w-[1120px] mx-auto px-12 max-md:px-5">
          <p className="section-eyebrow">{t.languages.eyebrow}</p>
          <h2 className="section-title">{t.languages.title}</h2>
          <div className="flex items-center gap-6 flex-wrap mt-6 max-md:gap-4">
            {t.languages.list.map((lang) => (
              <span className="text-[13px] font-medium text-text-secondary flex items-center gap-1.5" key={lang.name}>
                <span className="text-base leading-none">{lang.flag}</span> {lang.name}
              </span>
            ))}
          </div>
          <p className="mt-4 text-[13px] text-text-dim">
            {t.languages.helpText}{" "}
            <a
              href="https://poeditor.com/join/project/J2Qq2SUzYr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent no-underline font-semibold"
            >
              {t.languages.helpLink}
            </a>
          </p>
        </div>
      </section>

      {/* ─── TECH STRIP ─── */}
      <div className="py-16 border-t border-b border-border reveal">
        <div className="max-w-[1120px] mx-auto px-12 max-md:px-5">
          <div className="flex items-center justify-center gap-10 flex-wrap max-md:gap-5">
            {t.techStrip.items.flatMap((item, i) => {
              const els = [];
              if (i > 0) els.push(<span className="w-[3px] h-[3px] bg-text-dim rounded-full opacity-30" aria-hidden="true" key={`sep-${i}`}></span>);
              els.push(<span className="text-[13px] text-text-dim font-medium flex items-center gap-2" key={item}>{item}</span>);
              return els;
            })}
          </div>
        </div>
      </div>

      {/* ─── BLOG ─── */}
      <section className="py-30 reveal" id="blog">
        <div className="max-w-[1120px] mx-auto px-12 max-md:px-5">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-eyebrow">{t.blog.eyebrow}</p>
              <h2 className="section-title !mb-0">
                {t.blog.title}
              </h2>
            </div>
            <Link href={`/${locale}/blog`} className="text-sm font-semibold text-accent no-underline inline-flex items-center gap-[5px] transition-[gap] hover:gap-[9px]">{t.blog.viewAll}</Link>
          </div>
          <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            {t.blog.posts.map((post) => (
              <Link
                href={`/${locale}/blog`}
                className="bg-bg-white border border-border rounded p-7 no-underline text-inherit transition-all duration-[0.25s] flex flex-col hover:border-border-hover hover:-translate-y-[3px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)]"
                key={post.title}
              >
                <span className="text-xs text-text-dim font-semibold mb-3">{post.date}</span>
                <h3 className="text-lg font-bold leading-[1.3] tracking-[-0.01em] mb-2.5">{post.title}</h3>
                <p className="text-sm leading-[1.55] text-text-secondary flex-1">{post.description}</p>
                <span className="mt-4 text-[13px] font-semibold text-accent">{post.readMore}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="pt-30 pb-40 text-center reveal">
        <div className="max-w-[1120px] mx-auto px-12 max-md:px-5">
          <h2 className="text-[clamp(32px,4.5vw,56px)] font-bold leading-[1.1] tracking-[-0.03em] mb-4">
            {t.cta.titlePre}
            <em className="font-accent italic font-normal text-accent">{t.cta.titleEm}</em>
            {t.cta.titlePost}
          </h2>
          <p className="text-base text-text-secondary mb-9">{t.cta.sub}</p>
          <div className="flex justify-center gap-2.5 flex-wrap">
            <a
              href="https://apps.apple.com/us/app/macpacker/id6473273874"
              className="btn-primary"
            >
              <AppleIcon />
              {t.cta.downloadFree}
            </a>
            <a
              href="https://github.com/sarensw/MacPacker/releases"
              className="btn-outline"
            >
              <GitHubIcon />
              {t.cta.sourceCode}
            </a>
            <a
              href="https://github.com/sarensw/MacPacker/releases/latest/download/MacPacker.zip"
              className="btn-outline"
            >
              <DownloadIcon />
              {t.cta.directDownload}
            </a>
          </div>
        </div>
      </section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="py-10 border-t border-border">
        <div className="max-w-[1120px] mx-auto px-12 flex items-center justify-between max-md:flex-col max-md:gap-4 max-md:px-5">
          <div className="text-[13px] text-text-dim flex items-center gap-4">
            <span>{t.footer.copyright}</span>
            <span>·</span>
            <span>
              {t.footer.madeBy}{" "}
              <a href="https://sarensw.com" className="text-text-secondary no-underline">{t.footer.author}</a>
            </span>
          </div>
          <div className="flex gap-6">
            <Link href={`/${locale}/docs`} className="text-[13px] text-text-dim no-underline transition-colors hover:text-text-secondary">{t.footer.docs}</Link>
            <Link href={`/${locale}/blog`} className="text-[13px] text-text-dim no-underline transition-colors hover:text-text-secondary">{t.footer.blog}</Link>
            <a
              href="https://github.com/sarensw/MacPacker"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-text-dim no-underline transition-colors hover:text-text-secondary"
            >
              {t.footer.github}
            </a>
            <a
              href="https://github.com/sarensw/MacPacker/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-text-dim no-underline transition-colors hover:text-text-secondary"
            >
              {t.footer.reportBug}
            </a>
            <Link href={`/${locale}/privacy`} className="text-[13px] text-text-dim no-underline transition-colors hover:text-text-secondary">{t.footer.privacy}</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
