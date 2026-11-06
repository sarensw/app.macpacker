import Image from "next/image";
import type { Locale, Translations } from "@/lib/i18n";
import DownloadGroup from "@/components/DownloadGroup";

interface GetBandProps {
  locale: Locale;
  t: Translations;
  dmgUrl: string;
  zipUrl: string;
}

// The page closes where the header's Download button points.
export default function GetBand({ locale, t, dmgUrl, zipUrl }: GetBandProps) {
  const h = t.home;

  return (
    <section id="get" className="b-wrap b-section b-get">
      <Image className="b-icon" src="/logo.png" alt="" width={77} height={77} />
      <h2 className="b-h2">{h.getTitle}</h2>
      <p className="b-lede">{h.getBody}</p>
      <DownloadGroup locale={locale} t={t} dmgUrl={dmgUrl} zipUrl={zipUrl} />
    </section>
  );
}
