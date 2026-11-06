import Image from "next/image";
import type { Translations } from "@/lib/i18n";
import { extensionCount, formatCount } from "@/lib/format-chips";

interface FeaturesProps {
  t: Translations;
}

// ponytail: English screenshots on both locales until Chinese ones exist;
// then cut them into public/img/zh and pick the folder by locale here.
const SHOTS = {
  // name: CSS size, exactly half the cut's pixels (scripts/cutouts.py), so the
  // capture is shown 1:1 on Retina screens and served as cut, not re-encoded
  browse: [350, 547],
  nested: [715, 547],
  preview: [350, 498],
  finder: [715, 504],
  extract: [350, 430],
  compress: [710, 430],
} as const;

function Shot({ name, alt, look }: { name: keyof typeof SHOTS; alt: string; look: "window" | "card" | "free" }) {
  const [width, height] = SHOTS[name];
  return <Image className={`b-shot-${look}`} src={`/img/en/tile-${name}.webp`} alt={alt} width={width} height={height} unoptimized />;
}

// Each tile shows its own piece of the real app at its real size. Every row pairs
// a single tile with a wide one; the three numbers close the grid as a row of their own.
export default function Features({ t }: FeaturesProps) {
  const h = t.home;

  return (
    <section id="features" className="b-wrap b-section">
      <h2 className="b-h2">{h.featuresTitle}</h2>
      <div className="b-grid b-feats">
        <article className="b-tile b-feat">
          <div>
            <h3>{h.browseTitle}</h3>
            <p>{h.browseBody}</p>
          </div>
          <div className="b-shot">
            <Shot name="browse" alt={h.browseAlt} look="window" />
          </div>
        </article>

        <article className="b-tile b-feat b-wide">
          <div>
            <h3>{h.nestedTitle}</h3>
            <p>{h.nestedBody}</p>
          </div>
          <div className="b-shot">
            <Shot name="nested" alt={h.nestedAlt} look="card" />
          </div>
        </article>

        <article className="b-tile b-feat">
          <div>
            <h3>{h.previewTitle}</h3>
            <p>{h.previewBody}</p>
          </div>
          <div className="b-shot">
            <kbd className="b-key" aria-hidden="true">
              {h.spaceKey}
            </kbd>
            <Shot name="preview" alt={h.previewAlt} look="window" />
          </div>
        </article>

        <article className="b-tile b-feat b-wide">
          <div>
            <h3>{h.finderTitle}</h3>
            <p>{h.finderBody}</p>
          </div>
          <div className="b-shot">
            <Shot name="finder" alt={h.finderAlt} look="card" />
          </div>
        </article>

        <article className="b-tile b-feat">
          <div>
            <h3>{h.extractTitle}</h3>
            <p>{h.extractBody}</p>
          </div>
          <div className="b-shot">
            <Shot name="extract" alt={h.extractAlt} look="card" />
          </div>
        </article>

        <article className="b-tile b-feat b-wide">
          <div>
            <h3>{h.compressTitle}</h3>
            <p>{h.compressBody}</p>
          </div>
          <div className="b-shot b-shot-compress">
            <Shot name="compress" alt={h.compressAlt} look="free" />
          </div>
        </article>

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
