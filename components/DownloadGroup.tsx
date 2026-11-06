import type { Locale, Translations } from "@/lib/i18n";
import DownloadMenu from "@/components/client/DownloadMenu";
import { GitHubIcon } from "@/components/icons";
import { downloadEvent } from "@/lib/analytics";

const APP_STORE_URL = "https://apps.apple.com/us/app/macpacker/id6473273874";
const REPO_URL = "https://github.com/sarensw/MacPacker";

// Apple's own badge, unaltered and 40px tall (its artwork is per language)
const BADGE = {
  en: { src: "/img/badges/mac-app-store-black-en-us.svg", width: 156 },
  zh: { src: "/img/badges/mac-app-store-black-zh-cn.svg", width: 140 },
} as const;

interface DownloadGroupProps {
  locale: Locale;
  t: Translations;
  dmgUrl: string;
  zipUrl: string;
  /** the hero adds a GitHub "Fork me" button, so the source is one click away */
  withFork?: boolean;
}

// The App Store badge first, every other way to get the app behind one button.
export default function DownloadGroup({ locale, t, dmgUrl, zipUrl, withFork = false }: DownloadGroupProps) {
  const h = t.home;
  const badge = BADGE[locale];

  return (
    <div className="dl-group">
      <a className={`appstore-badge ${downloadEvent("appstore")}`} href={APP_STORE_URL}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Apple's badge, served as-is */}
        <img src={badge.src} alt={h.appStoreAlt} width={badge.width} height={40} />
      </a>
      <DownloadMenu
        dmgUrl={dmgUrl}
        zipUrl={zipUrl}
        labels={{
          more: h.more,
          dmgTitle: h.dmgTitle,
          dmgSub: h.dmgSub,
          zipTitle: h.zipTitle,
          zipSub: h.zipSub,
          copy: t.hero.copy,
          copied: t.hero.copied,
          githubTitle: h.githubTitle,
          githubSub: h.githubSub,
          note: h.storeNote,
        }}
      />
      {withFork && (
        <a className="gh-fork" href={REPO_URL} target="_blank" rel="noopener noreferrer">
          <GitHubIcon />
          {h.fork}
        </a>
      )}
    </div>
  );
}
