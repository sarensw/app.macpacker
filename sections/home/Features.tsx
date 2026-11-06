import Image from "next/image";
import type { Translations } from "@/lib/i18n";
import { extensionCount, formatCount } from "@/lib/format-chips";

interface FeaturesProps {
  t: Translations;
}

// ponytail: English screenshots on both locales until Chinese ones exist;
// then export them into public/img/zh and pick the folder by locale here.
function Shot({ name, alt }: { name: string; alt: string }) {
  // the whole capture (2655 x 1783, transparent); app/site.css sizes and places it
  return (
    <Image
      className={`b-cap b-cap-${name}`}
      src={`/img/en/shot-${name}.webp`}
      alt={alt}
      width={2655}
      height={1783}
      unoptimized
    />
  );
}

// Each tile holds a whole window capture, placed so the part that shows the feature
// is in view and the tile's own edge does the cutting. Captures that matter at
// their top come in from the bottom of the tile; the nested callout and Finder's
// menu hang from the top, with their text below.
export default function Features({ t }: FeaturesProps) {
  const h = t.home;

  return (
    <section id="features" className="b-wrap b-section">
      <h2 className="b-h2">{h.featuresTitle}</h2>
      <div className="b-grid b-grid-2">
        <article className="b-tile b-feat">
          <div>
            <h3>{h.browseTitle}</h3>
            <p>{h.browseBody}</p>
          </div>
          <div className="b-shot b-shot-row1">
            <Shot name="browse" alt={h.browseAlt} />
          </div>
        </article>

        <article className="b-tile b-feat">
          <div>
            <h3>{h.previewTitle}</h3>
            <p>{h.previewBody}</p>
          </div>
          <div className="b-shot b-shot-row1">
            <Shot name="preview" alt={h.previewAlt} />
            <kbd className="b-key" aria-hidden="true">
              {h.spaceKey}
            </kbd>
          </div>
        </article>

        <article className="b-tile b-feat b-feat-top">
          <div>
            <h3>{h.nestedTitle}</h3>
            <p>{h.nestedBody}</p>
          </div>
          <div className="b-shot b-shot-row2">
            <Shot name="nested" alt={h.nestedAlt} />
          </div>
        </article>

        <article className="b-tile b-feat b-feat-top">
          <div>
            <h3>{h.finderTitle}</h3>
            <p>{h.finderBody}</p>
          </div>
          <div className="b-shot b-shot-row2">
            <Shot name="finder" alt={h.finderAlt} />
          </div>
        </article>

        <article className="b-tile b-feat">
          <div>
            <h3>{h.extractTitle}</h3>
            <p>{h.extractBody}</p>
          </div>
          <div className="b-shot b-shot-row3">
            <Shot name="extract" alt={h.extractAlt} />
          </div>
        </article>

        <article className="b-tile b-feat">
          <div>
            <h3>{h.compressTitle}</h3>
            <p>{h.compressBody}</p>
          </div>
          <div className="b-shot b-shot-row3">
            <Shot name="compress" alt={h.compressAlt} />
          </div>
        </article>
      </div>

      <div className="b-grid b-stats">
        <article className="b-tile b-feat b-stat">
          <p className="b-exts" aria-hidden="true">
            <span>.zip</span>
            <span>.7z</span>
          </p>
          <div>
            <h3>{h.createTitle}</h3>
            <p>{h.createBody}</p>
            <p className="b-mono">AES-256 · ZipCrypto · .zip.001 · .7z.001</p>
          </div>
        </article>

        <article className="b-tile b-feat b-stat">
          <p className="b-num">{formatCount}</p>
          <div>
            <h3>{h.formatsTitle}</h3>
            <p>{h.formatsBody.replace("{extensions}", String(extensionCount))}</p>
          </div>
          <a className="b-more" href="#specs">
            {h.formatsLink}
          </a>
        </article>

        <article className="b-tile b-feat b-stat">
          <p className="b-num">22</p>
          <div>
            <h3>{h.langsTitle}</h3>
            <p lang="mul">
              English · Deutsch · Français · Español · Italiano · Português · 日本語 · 한국어 · 简体中文 · 繁體中文 · العربية · Русский
            </p>
          </div>
          <a className="b-more" href="#specs">
            {h.langsLink}
          </a>
        </article>
      </div>
    </section>
  );
}
