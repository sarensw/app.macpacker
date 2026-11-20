import Image from "next/image";
import type { Locale, Translations } from "@/lib/i18n";
import { GitHubIcon } from "@/components/icons";

interface ProofProps {
  locale: Locale;
  t: Translations;
}

// HelloGitHub's magazine featured MacPacker; the big curated Mac lists and CurlShip
// list it. Stars are each one's own on GitHub, checked 2026-11-19 and written the way
// GitHub's Star button shows them.
const FEATURED = [
  {
    name: "HelloGitHub",
    stars: "190k",
    href: "https://hellogithub.com/en/repository/sarensw/MacPacker",
    zh: "https://hellogithub.com/repository/sarensw/MacPacker",
  },
];

const LISTINGS = [
  {
    name: "Awesome Mac",
    stars: "119k",
    href: "https://github.com/jaywcjlove/awesome-mac",
    zh: "https://github.com/jaywcjlove/awesome-mac/blob/master/README-zh.md",
  },
  { name: "Open Source Mac OS Apps", stars: "51.5k", href: "https://github.com/serhii-londar/open-source-mac-os-apps" },
  { name: "Awesome macOS", stars: "19.5k", href: "https://github.com/iCHAIT/awesome-macOS" },
  // CurlShip's link to us is dofollow only while https://macpacker.app/ links back
  // (their bot checks hourly). Any plain link counts, their badge is optional, but
  // never with rel="nofollow", "ugc" or "sponsored".
  { name: "CurlShip", href: "https://curlship.com" },
];

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

// The app window on a lit stage (the product video takes its place later),
// then the two trending awards, drawn to the same size so they read as a pair,
// and where it is featured and listed as two quiet lines, the look of the press line.
// Awards checked 2026-11-03 against Trendshift and the GitHub Trending archives.
// The window is the English capture on both locales, like the feature tiles.
export default function Proof({ locale, t }: ProofProps) {
  const h = t.home;
  const line = (lead: string, listings: typeof LISTINGS) => (
    <p className="b-wrap b-press">
      <span>{lead}</span>
      {listings.map((listing) => (
        <a key={listing.name} href={(locale === "zh" && listing.zh) || listing.href} {...external}>
          {listing.name}
          {listing.stars && <small>{h.listedStars.replace("{n}", listing.stars)}</small>}
        </a>
      ))}
    </p>
  );

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
            unoptimized
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

      {line(h.featuredLead, FEATURED)}
      {line(h.listedLead, LISTINGS)}
    </>
  );
}
