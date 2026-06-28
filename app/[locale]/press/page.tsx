import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isValidLocale, getTranslations } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { getReleaseData } from "@/lib/release";
import { pageMetadata } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GitHubIcon, DownloadIcon } from "@/components/icons";
import CopyTextButton from "@/components/client/CopyTextButton";
import { formatsByCategory } from "@/lib/format-chips";

export const revalidate = 3600;

const PRESS_EMAIL = "stephan@sarensw.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = await getTranslations(locale);

  return pageMetadata({
    locale,
    path: "/press",
    title: t.press.metaTitle,
    description: t.press.metaDescription,
  });
}

export default async function PressPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const t = await getTranslations(locale);
  const release = await getReleaseData(locale as Locale);
  const p = t.press;

  const kitUrl = `/press/macpacker-press-kit-${locale}.zip`;
  const factSheetUrl = `/press/fact-sheet-${locale}.md`;

  const facts: { label: string; value: string }[] = [
    { label: p.fName, value: "MacPacker" },
    { label: p.fDeveloper, value: "Stephan Arenswald" },
    { label: p.fPrice, value: p.fPriceValue },
    { label: p.fLicense, value: "GPL-3.0" },
    { label: p.fPlatform, value: p.fPlatformValue },
    { label: p.fBuiltWith, value: "Swift / SwiftUI" },
    { label: p.fVersion, value: `v${release.latestVersion}` },
    { label: p.fCategory, value: p.fCategoryValue },
    { label: p.fFormats, value: p.fFormatsValue },
    { label: p.fLanguages, value: p.fLanguagesValue },
    { label: p.fWebsite, value: "macpacker.app" },
  ];

  const features = [
    { num: "01", title: p.feat1Title, description: p.feat1Desc },
    { num: "02", title: p.feat2Title, description: p.feat2Desc },
    { num: "03", title: p.feat3Title, description: p.feat3Desc },
    { num: "04", title: p.feat4Title, description: p.feat4Desc },
  ];

  const formatCategoryLabel: Record<string, string> = {
    archives: p.fmtArchives,
    compressedTar: p.fmtCompressedTar,
    compression: p.fmtCompression,
    diskImages: p.fmtDiskImages,
  };

  const swatches = [
    { name: p.colorOrange, hex: "#F06C3C" },
    { name: p.colorAmber, hex: "#F09C3C" },
    { name: p.colorCharcoal, hex: "#3C3C3C" },
    { name: p.colorBg, hex: "#FFFFFF" },
  ];

  const shots = [
    { src: `/press/screenshots/${locale}/01-browse.jpg`, caption: p.screenshotBrowse },
    { src: `/press/screenshots/${locale}/02-nested.jpg`, caption: p.screenshotNested },
    { src: `/press/screenshots/${locale}/03-extract.jpg`, caption: p.screenshotExtract },
    { src: `/press/screenshots/${locale}/04-preview.jpg`, caption: p.screenshotPreview },
  ];

  // ── Shared classes, lifted from the home redesign sections ──
  const eyebrow = "font-mono text-[11px] tracking-[0.08em] text-ink-tertiary uppercase mb-1";
  const h2cls = "text-[20px] font-medium tracking-[-0.015em] text-ink-primary m-0";
  const surface = "bg-bg-surface border-[0.5px] border-border-default rounded-md";
  const monoLabel = "font-mono text-[10px] tracking-[0.08em] text-ink-tertiary uppercase";
  const btnPrimary = "inline-flex items-center gap-2 h-9 px-3.5 rounded-md bg-ink-primary text-ink-inverse text-[13px] font-medium hover:bg-[#2a2a2a] transition-colors";
  const btnOutline = "inline-flex items-center gap-2 h-9 px-3.5 rounded-md bg-bg-surface text-ink-primary text-[13px] font-medium border-[0.5px] border-border-strong hover:bg-bg-page transition-colors";

  return (
    <>
      <a href="#press-content" className="skip-link">
        {locale === "zh" ? "跳到主要内容" : "Skip to main content"}
      </a>

      <Header locale={locale} t={t} downloadUrl={release.latestDmgUrl} />

      <main id="press-content" className="max-w-[1120px] mx-auto px-6 max-md:px-5">
        {/* ─── HERO ─── */}
        <section className="mb-16 max-md:mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.04em] text-ink-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-live" aria-hidden="true" />
              v{release.latestVersion}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-accent-success-bg text-accent-success-ink font-mono text-[10px] font-medium tracking-[0.06em] uppercase">
              {t.hero.eyebrowFree}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-bg-muted text-ink-secondary font-mono text-[10px] font-medium tracking-[0.06em] uppercase">
              EN · 中文
            </span>
          </div>

          <p className={eyebrow}>{p.eyebrow}</p>
          <h1
            className="font-medium leading-[1.04] tracking-[-0.025em] text-ink-primary mb-5"
            style={{ fontSize: "clamp(32px, 4.5vw, 48px)" }}
          >
            {p.title}
          </h1>
          <p className="text-[16px] leading-[1.6] text-ink-secondary max-w-[480px] mb-7">
            {p.intro}
          </p>

          <div className="flex flex-wrap items-center gap-2.5">
            <a href={kitUrl} download className={btnPrimary}>
              <span className="w-[14px] h-[14px] inline-block">
                <DownloadIcon />
              </span>
              {p.downloadKit}
            </a>
            <a href={factSheetUrl} download className={btnOutline}>
              {p.factSheetCta}
            </a>
          </div>
          <p className="font-mono text-[10px] tracking-[0.02em] text-ink-tertiary mt-2.5 mb-0">
            {p.kitNote}
          </p>
        </section>

        {/* ─── FACT SHEET ─── */}
        <section className="mb-12" id="facts">
          <p className={eyebrow}>{p.factsEyebrow}</p>
          <h2 className={`${h2cls} mb-5`}>{p.factsTitle}</h2>
          <dl className="grid grid-cols-2 max-md:grid-cols-1 gap-x-12 max-w-[760px] m-0">
            {facts.map((f) => (
              <div
                key={f.label}
                className="grid grid-cols-[120px_1fr] gap-4 py-2.5 border-b-[0.5px] border-border-subtle"
              >
                <dt className={monoLabel}>{f.label}</dt>
                <dd className="m-0 text-[14px] text-ink-primary">{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ─── BOILERPLATE ─── */}
        <section className="mb-12" id="boilerplate">
          <p className={eyebrow}>{p.boilerEyebrow}</p>
          <h2 className={`${h2cls} mb-2`}>{p.boilerTitle}</h2>
          <p className="text-[14px] leading-[1.55] text-ink-secondary max-w-[560px] mb-5">
            {p.boilerIntro}
          </p>
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3">
            {[
              { label: p.boilerShortLabel, body: p.boilerShort },
              { label: p.boilerLongLabel, body: p.boilerLong },
            ].map((b) => (
              <div key={b.label} className={`${surface} p-5`}>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className={monoLabel}>{b.label}</span>
                  <CopyTextButton text={b.body} copyLabel={p.copy} copiedLabel={p.copied} />
                </div>
                <p className="m-0 text-[13.5px] leading-[1.6] text-ink-secondary">{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FEATURES ─── */}
        <section className="mb-12" id="features">
          <p className={eyebrow}>{p.featuresEyebrow}</p>
          <h2 className={`${h2cls} mb-5`}>{p.featuresTitle}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border-subtle border-[0.5px] border-border-subtle rounded-md overflow-hidden">
            {features.map((f) => (
              <div key={f.num} className="bg-bg-surface p-6">
                <div className="font-mono text-[10px] tracking-[0.08em] text-ink-tertiary mb-[10px]">
                  {f.num}
                </div>
                <h3 className="text-[14px] font-medium text-ink-primary mb-[6px]">{f.title}</h3>
                <p className="text-[12px] leading-[1.5] text-ink-secondary m-0">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SCOPE ─── */}
        <section className="mb-12" id="scope">
          <p className={eyebrow}>{p.scopeEyebrow}</p>
          <h2 className={`${h2cls} mb-5`}>{p.scopeTitle}</h2>
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3">
            <div className={`${surface} p-5`}>
              <div className={`${monoLabel} mb-3`}>{p.scopeIsLabel}</div>
              <ul className="list-none m-0 p-0 flex flex-col gap-2">
                {p.scopeIs.map((item) => (
                  <li key={item} className="relative pl-4 text-[13.5px] leading-[1.5] text-ink-secondary">
                    <span className="absolute left-0 top-[7px] w-1.5 h-1.5 rounded-full bg-accent-live" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={`${surface} p-5`}>
              <div className={`${monoLabel} mb-3`}>{p.scopeFutureLabel}</div>
              <ul className="list-none m-0 p-0 flex flex-col gap-2">
                {p.scopeFuture.map((item) => (
                  <li key={item} className="relative pl-4 text-[13.5px] leading-[1.5] text-ink-secondary">
                    <span className="absolute left-0 top-[7px] w-1.5 h-1.5 rounded-full border-[1px] border-ink-tertiary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-[13.5px] leading-[1.6] text-ink-secondary mt-4 max-w-[640px]">
            {p.scopeNote}
          </p>
        </section>

        {/* ─── FORMATS ─── */}
        <section className="mb-12" id="formats">
          <p className={eyebrow}>{p.formatsEyebrow}</p>
          <h2 className={`${h2cls} mb-6`}>41 {p.formatsTitle}</h2>
          <div className="flex flex-col gap-5">
            {formatsByCategory.map((cat) => (
              <div key={cat.key}>
                <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink-tertiary mb-2">
                  {formatCategoryLabel[cat.key]}
                  <span className="text-ink-tertiary/70"> · {cat.labels.length}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.labels.map((label) => (
                    <span
                      key={label}
                      className="py-[5px] px-2.5 rounded-md font-mono text-[12px] bg-bg-surface text-ink-secondary border-[0.5px] border-border-default"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── BRAND ASSETS ─── */}
        <section className="mb-12" id="assets">
          <p className={eyebrow}>{p.assetsEyebrow}</p>
          <h2 className={`${h2cls} mb-2`}>{p.assetsTitle}</h2>
          <p className="text-[14px] leading-[1.55] text-ink-secondary max-w-[560px] mb-5">
            {p.assetsIntro}
          </p>

          <div className="max-w-[280px]">
            {/* App icon — real, downloadable */}
            <div className={`${surface} overflow-hidden`}>
              <div className="aspect-[16/10] grid place-items-center bg-bg-surface border-b-[0.5px] border-border-subtle">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="MacPacker app icon" width={120} height={120} className="w-[40%] h-auto" />
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="text-[13px] font-medium text-ink-primary">{p.assetIcon}</div>
                  <div className="font-mono text-[10px] text-ink-tertiary">PNG · 1024×1024</div>
                </div>
                <a
                  href="/logo.png"
                  download
                  className="font-mono text-[10px] tracking-[0.03em] uppercase text-ink-secondary border-[0.5px] border-border-default rounded-md px-2.5 py-1 hover:text-ink-primary hover:border-border-strong transition-colors"
                >
                  PNG
                </a>
              </div>
            </div>
          </div>

          {/* Demo */}
          <div className="mt-8 mb-3">
            <h3 className="text-[16px] font-medium tracking-[-0.01em] text-ink-primary mb-1">
              {p.demoTitle}
            </h3>
            <p className="font-mono text-[11px] text-ink-tertiary">{p.demoCaption}</p>
          </div>
          <figure className="m-0 max-w-[760px] border-[0.5px] border-border-default rounded-md overflow-hidden bg-bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/press/demo/macpacker-demo.gif"
              alt={p.demoCaption}
              width={1720}
              height={1120}
              loading="lazy"
              className="w-full h-auto block"
            />
          </figure>
          <p className="font-mono text-[10px] tracking-[0.03em] text-ink-tertiary mt-2">
            <a href="/press/demo/macpacker-demo.mp4" download className="hover:text-ink-primary transition-colors">
              MP4
            </a>
            <span className="mx-1.5" aria-hidden="true">·</span>
            <a href="/press/demo/macpacker-demo.gif" download className="hover:text-ink-primary transition-colors">
              GIF
            </a>
          </p>

          {/* Screenshots */}
          <div className="mt-8 mb-4">
            <h3 className="text-[16px] font-medium tracking-[-0.01em] text-ink-primary mb-1">
              {p.screenshotsTitle}
            </h3>
            <p className="font-mono text-[11px] text-ink-tertiary">{p.screenshotsNote}</p>
          </div>
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3">
            {shots.map((s) => (
              <figure key={s.src} className="m-0 border-[0.5px] border-border-default rounded-md overflow-hidden bg-bg-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  alt={s.caption}
                  width={1600}
                  height={1074}
                  loading="lazy"
                  className="w-full h-auto block"
                />
                <figcaption className="px-3 py-2 text-[12px] text-ink-secondary border-t-[0.5px] border-border-subtle">
                  {s.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ─── BRAND GUIDE ─── */}
        <section className="mb-12" id="brand">
          <p className={eyebrow}>{p.brandEyebrow}</p>
          <h2 className={`${h2cls} mb-5`}>{p.brandTitle}</h2>
          <div className="flex flex-wrap gap-3">
            {swatches.map((s) => (
              <div key={s.hex} className="w-[120px]">
                <div
                  className="h-14 rounded-md border-[0.5px] border-border-default"
                  style={{ backgroundColor: s.hex }}
                />
                <div className="text-[12px] font-medium text-ink-primary mt-2">{s.name}</div>
                <div className="font-mono text-[11px] text-ink-tertiary">{s.hex}</div>
              </div>
            ))}
          </div>
          <p className="text-[13px] leading-[1.6] text-ink-secondary mt-5 max-w-[600px]">
            {p.appNote}
          </p>
          <p className="font-mono text-[11px] text-ink-tertiary mt-3 max-w-[600px] leading-[1.6]">
            {p.typeNote}
          </p>
          <p className="font-mono text-[11px] text-ink-tertiary mt-2 max-w-[560px] leading-[1.6]">
            {p.clearSpace}
          </p>
        </section>

        {/* ─── USAGE + CONTACT ─── */}
        <section className="mb-12" id="contact">
          <div className={`${surface} px-6 py-5 mb-8`}>
            <h3 className="text-[14px] font-medium text-ink-primary m-0 mb-1.5">{p.usageTitle}</h3>
            <p className="m-0 text-[13.5px] leading-[1.6] text-ink-secondary">{p.usageBody}</p>
          </div>

          <p className={eyebrow}>{p.contactEyebrow}</p>
          <h2 className={`${h2cls} mb-5`}>{p.contactTitle}</h2>
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3 max-w-[640px]">
            <a href={`mailto:${PRESS_EMAIL}`} className={`${surface} px-5 py-4 no-underline hover:border-border-strong transition-colors`}>
              <span className={monoLabel}>{p.contactEmailLabel}</span>
              <p className="m-0 mt-1.5 text-[14px] text-ink-primary">{PRESS_EMAIL}</p>
            </a>
            <a
              href="https://github.com/sarensw/MacPacker"
              target="_blank"
              rel="noopener noreferrer"
              className={`${surface} px-5 py-4 no-underline hover:border-border-strong transition-colors`}
            >
              <span className={`${monoLabel} inline-flex items-center gap-1.5`}>
                <span className="w-3 h-3 inline-block fill-current">
                  <GitHubIcon />
                </span>
                GitHub
              </span>
              <p className="m-0 mt-1.5 text-[14px] text-ink-primary">github.com/sarensw/MacPacker</p>
            </a>
          </div>

          <div className="mt-8">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 h-9 px-3.5 rounded-md bg-bg-surface text-ink-primary text-[13px] font-medium border-[0.5px] border-border-strong hover:bg-bg-page transition-colors"
            >
              ← {p.backToHome}
            </Link>
          </div>
        </section>
      </main>

      <Footer locale={locale} t={t} />
    </>
  );
}
