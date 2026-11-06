import Image from "next/image";
import type { Translations } from "@/lib/i18n";
import { GitHubIcon } from "@/components/icons";

interface ProofProps {
  t: Translations;
}

// The app window on a lit stage (the product video takes its place later),
// then the two trending awards, drawn to the same size so they read as a pair.
// Awards checked 2026-11-03 against Trendshift and the GitHub Trending archives.
// The window is the English capture on both locales, like the feature tiles.
export default function Proof({ t }: ProofProps) {
  const h = t.home;

  return (
    <>
      <div className="b-wrap">
        <figure className="b-stage">
          <Image
            src="/img/en/stage-window.webp"
            alt={h.screenshotAlt}
            width={2338}
            height={1463}
            sizes="(min-width: 1160px) 900px, 90vw"
            priority
          />
        </figure>
      </div>

      <section className="b-wrap b-awards" aria-label={h.awardsLabel}>
        <a href="https://trendshift.io/repositories/118621" target="_blank" rel="noopener noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element -- Trendshift's own badge, served as-is */}
          <img src="/img/badges/trendshift-swift-daily.svg" alt={h.trendshiftAlt} width={250} height={55} />
        </a>
        <div className="b-ghbadge">
          <GitHubIcon />
          <span>
            <small>{h.ghTrendingLabel}</small>
            <b>{h.ghTrendingRank}</b>
          </span>
        </div>
      </section>
    </>
  );
}
