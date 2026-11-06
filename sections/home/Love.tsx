import type { Locale, Translations } from "@/lib/i18n";

interface LoveProps {
  locale: Locale;
  t: Translations;
}

// Real App Store reviews, verbatim and in the language they were written in.
const QUOTES = [
  {
    text: "great modern/native app for archive preview. It has improved a lot compared to early days. quicklook integration is nice too.",
    who: "hi362846",
    where: "App Store, US",
    lang: "en",
  },
  { text: "I hope this becomes the 7zip gui of macos", who: "Jae_gone", where: "App Store", lang: "en" },
  {
    text: "Useful functionality. Thanks for your dev time, and good luck with moving this forward!",
    who: "Sevikha",
    where: "App Store, US",
    lang: "en",
  },
  { text: "可以用 Quicklook 预览压缩包内容了", who: "秀才ｘ一笑倾城", where: "App Store, CN", lang: "zh" },
];

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M7 4.5v15l12.5-7.5z" />
  </svg>
);

// What people say: the Snazzy Labs video as the big tile, the reviews beside it,
// the written press as one line underneath.
export default function Love({ locale, t }: LoveProps) {
  const h = t.home;

  return (
    <section id="love" className="b-wrap b-section">
      <h2 className="b-h2">{h.sayTitle}</h2>
      <div className="b-grid">
        <a className="b-tile b-video b-wide" href="https://www.youtube.com/watch?v=Aea2DUX4fsQ&t=26s" {...external}>
          <span className="b-play" aria-hidden="true">
            <PlayIcon />
          </span>
          <small>{h.videoBy}</small>
          <b lang="en">Open Source Is Beating Paid Mac Apps</b>
          <span className="b-note">{h.videoNote}</span>
        </a>
        {QUOTES.map((quote) => (
          <figure key={quote.who} className="b-tile b-quote">
            <blockquote lang={quote.lang}>“{quote.text}”</blockquote>
            <figcaption>
              <b>{quote.who}</b> · {quote.where}
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="b-press">
        <span>{h.pressLead}</span>
        <a href="https://www.ifun.de/macpacker-neuer-archivmanager-fuer-den-mac-256949/" {...external}>
          iFun.de
        </a>
        <a href="https://taoofmac.com/space/apps/macpacker" {...external}>
          Tao of Mac
        </a>
        <a
          href={`https://hellogithub.com/${locale === "zh" ? "" : "en/"}periodical/volume/125`}
          {...external}
        >
          HelloGitHub
        </a>
      </p>
    </section>
  );
}
