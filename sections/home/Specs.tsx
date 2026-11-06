import Link from "next/link";
import type { Locale, Translations } from "@/lib/i18n";
import { extensionCount, extensionsByCategory, formatCount } from "@/lib/format-chips";

interface SpecsProps {
  locale: Locale;
  t: Translations;
}

// The app's 22 languages, each named in itself. Catalan takes Andorra's flag
// (there is no Catalonia emoji); Traditional Chinese is the app's zh-TW.
const LANGUAGES = [
  ["en", "🇺🇸", "English"],
  ["ar", "🇸🇦", "العربية"],
  ["ca", "🇦🇩", "Català"],
  ["de", "🇩🇪", "Deutsch"],
  ["el", "🇬🇷", "Ελληνικά"],
  ["es-MX", "🇲🇽", "Español (México)"],
  ["fa", "🇮🇷", "فارسی"],
  ["fr", "🇫🇷", "Français"],
  ["hi", "🇮🇳", "हिन्दी"],
  ["it", "🇮🇹", "Italiano"],
  ["ja", "🇯🇵", "日本語"],
  ["ko", "🇰🇷", "한국어"],
  ["nl", "🇳🇱", "Nederlands"],
  ["no", "🇳🇴", "Norsk"],
  ["pl", "🇵🇱", "Polski"],
  ["pt-BR", "🇧🇷", "Português (Brasil)"],
  ["ru", "🇷🇺", "Русский"],
  ["tr", "🇹🇷", "Türkçe"],
  ["uk", "🇺🇦", "Українська"],
  ["vi", "🇻🇳", "Tiếng Việt"],
  ["zh-Hans", "🇨🇳", "简体中文"],
  ["zh-Hant-TW", "🇹🇼", "繁體中文"],
] as const;

// Formats and languages: what it reads (every format, from the registry), what
// it writes (ZIP and 7z), and the languages, as one data sheet.
export default function Specs({ locale, t }: SpecsProps) {
  const h = t.home;
  const readSum = h.readSum
    .replace("{formats}", String(formatCount))
    .replace("{extensions}", String(extensionCount));

  return (
    <section id="specs" className="b-wrap b-section">
      <h2 className="b-h2">{h.specsTitle}</h2>
      <dl className="b-spec">
        <div>
          <dt>{h.supported}</dt>
          <dd className="b-caps">
            <div>
              <p className="b-cap-head">
                <b>{h.read}</b>
                <span>{readSum}</span>
              </p>
              <div className="b-ext-groups">
                {extensionsByCategory.map((group) => (
                  <div key={group.key}>
                    <span className="b-ext-label">{h[group.key]}</span>
                    <ul className="b-ext-grid">
                      {group.extensions.map((extension) => (
                        <li key={extension}>{extension}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Link className="b-spec-more" href={`/${locale}/docs`}>
                {h.allFormats}
              </Link>
            </div>
            <div>
              <p className="b-cap-head">
                <b>{h.write}</b>
                <span>{h.writeSum}</span>
              </p>
              <div className="b-ext-groups">
                <div>
                  <span className="b-ext-label">{h.create}</span>
                  <p>{h.createVal}</p>
                </div>
                <div>
                  <span className="b-ext-label">{h.edit}</span>
                  <p>{h.editVal}</p>
                </div>
              </div>
            </div>
          </dd>
        </div>
        <div>
          <dt>{h.languages}</dt>
          <dd>
            <p>{h.languagesSum}</p>
            <ul className="b-langs">
              {LANGUAGES.map(([lang, flag, name]) => (
                <li key={lang} lang={lang}>
                  <span className="b-flag" aria-hidden="true">
                    {flag}
                  </span>
                  {name}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </section>
  );
}
