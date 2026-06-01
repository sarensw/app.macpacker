import type { Locale, Translations } from "@/lib/i18n";
import { AppleIcon, GitHubIcon, DownloadIcon } from "@/components/icons";
import BrewCopyButton from "@/components/client/BrewCopyButton";

interface HeroProps {
  locale: Locale;
  t: Translations;
  latestVersion: string;
  latestDmgUrl: string;
  latestZipUrl: string;
}

export default function Hero({
  t,
  latestVersion,
  latestDmgUrl,
  latestZipUrl,
}: HeroProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] gap-8 md:gap-10 items-center mb-16 max-md:mb-12">
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.04em] text-ink-secondary uppercase">
            <span
              className="w-1.5 h-1.5 rounded-full bg-accent-live"
              aria-hidden="true"
            />
            v{latestVersion}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-accent-success-bg text-accent-success-ink font-mono text-[10px] font-medium tracking-[0.06em] uppercase">
            {t.hero.eyebrowFree}
          </span>
        </div>

        <h1
          className="font-medium leading-[1.04] tracking-[-0.025em] mb-6 text-ink-primary"
          style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
        >
          {t.hero.title}
        </h1>

        <p className="text-[16px] leading-[1.6] text-ink-secondary mb-8 max-w-[460px]">
          {t.hero.sub}
        </p>

        <BrewCopyButton
          command={t.hero.brewCommand}
          copyLabel={t.hero.copy}
          copiedLabel={t.hero.copied}
        />

        <div className="flex flex-wrap items-center gap-2.5 mt-6">
          <a
            href={latestDmgUrl}
            className="inline-flex items-center gap-2 h-9 px-3.5 rounded-md bg-ink-primary text-ink-inverse text-[13px] font-medium hover:bg-[#2a2a2a] transition-colors"
          >
            <span className="w-[14px] h-[14px] inline-block">
              <DownloadIcon />
            </span>
            {t.hero.dmgCta}
          </a>
          <a
            href={latestZipUrl}
            className="inline-flex items-center gap-2 h-9 px-3.5 rounded-md bg-bg-surface text-ink-primary text-[13px] font-medium border-[0.5px] border-border-strong hover:bg-bg-page transition-colors"
          >
            <span className="w-[14px] h-[14px] inline-block">
              <DownloadIcon />
            </span>
            {t.hero.zipCta}
          </a>
          <a
            href="https://apps.apple.com/us/app/macpacker/id6473273874"
            className="inline-flex items-center gap-2 h-9 px-3.5 rounded-md bg-bg-surface text-ink-primary text-[13px] font-medium border-[0.5px] border-border-strong hover:bg-bg-page transition-colors"
          >
            <span className="w-[14px] h-[14px] inline-block">
              <AppleIcon />
            </span>
            {t.hero.appStore}
          </a>
          <a
            href="https://github.com/sarensw/MacPacker/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-9 px-3.5 rounded-md bg-bg-surface text-ink-primary text-[13px] font-medium border-[0.5px] border-border-strong hover:bg-bg-page transition-colors"
          >
            <span className="w-[14px] h-[14px] inline-block">
              <GitHubIcon />
            </span>
            {t.hero.releasesCta}
          </a>
        </div>
        <p className="font-mono text-[10px] tracking-[0.02em] text-ink-tertiary mt-2.5 mb-0 pl-0.5 max-w-[460px] leading-[1.5]">
          {t.hero.appStoreNote}
        </p>
      </div>

      <img
        src="/hero.png"
        alt={t.hero.screenshotPlaceholder}
        width={1824}
        height={1224}
        className="w-full h-auto block md:-mr-6"
      />
    </section>
  );
}
