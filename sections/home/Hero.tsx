import Image from "next/image";
import type { Locale, Translations } from "@/lib/i18n";
import DownloadGroup from "@/components/DownloadGroup";

interface HeroProps {
  locale: Locale;
  t: Translations;
  version: string;
  dmgUrl: string;
  zipUrl: string;
}

// Centred: the icon, the claim, the download row, and the one line that says
// what it costs and what it runs on.
export default function Hero({ locale, t, version, dmgUrl, zipUrl }: HeroProps) {
  const h = t.home;

  return (
    <section className="b-wrap b-hero">
      <Image className="b-icon" src="/logo.png" alt="" width={88} height={88} priority />
      <h1>{t.hero.title}</h1>
      <p className="b-lede">{t.hero.sub}</p>
      <DownloadGroup locale={locale} t={t} dmgUrl={dmgUrl} zipUrl={zipUrl} withFork />
      <p className="b-meta">
        <span className="b-pair">
          <span className="b-dot" aria-hidden="true" />
          <span className="b-ver">v{version}</span>
        </span>
        <span className="b-oss">{h.free}</span>
        <span>{h.platform}</span>
      </p>
    </section>
  );
}
