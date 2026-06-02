import type { Translations } from "@/lib/i18n";
import { AppleIcon, GitHubIcon, DownloadIcon } from "@/components/icons";
import BrewCopyButton from "@/components/client/BrewCopyButton";

interface DownloadCardProps {
  t: Translations;
  latestVersion: string;
  latestDmgUrl: string;
  latestZipUrl: string;
  className?: string;
}

export default function DownloadCard({
  t,
  latestVersion,
  latestDmgUrl,
  latestZipUrl,
  className = "",
}: DownloadCardProps) {
  return (
    <section
      className={`bg-bg-muted border-[0.5px] border-border-default rounded-md p-6 ${className}`}
      aria-label={t.download.heading}
    >
      <div className="flex items-baseline justify-between gap-4 mb-5 flex-wrap">
        <h2 className="text-[18px] font-medium tracking-[-0.01em] text-ink-primary m-0">
          {t.download.heading}
        </h2>
        <span className="font-mono text-[11px] tracking-[0.04em] text-ink-tertiary">
          v{latestVersion} · {t.download.platformNote}
        </span>
      </div>

      <BrewCopyButton
        command={t.hero.brewCommand}
        copyLabel={t.hero.copy}
        copiedLabel={t.hero.copied}
      />

      <div className="flex flex-wrap items-center gap-2.5 mt-5">
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

      <p className="font-mono text-[10px] tracking-[0.02em] text-ink-tertiary mt-2.5 mb-0 pl-0.5 leading-[1.5]">
        {t.hero.appStoreNote}
      </p>
    </section>
  );
}
