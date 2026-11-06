import Image from "next/image";
import type { Translations } from "@/lib/i18n";
import { extensionCount, formatCount } from "@/lib/format-chips";

interface FeaturesProps {
  t: Translations;
}

// ponytail: English screenshots on both locales until Chinese ones exist;
// then cut them into public/img/zh and pick the folder by locale here.
const shot = (name: string) => `/img/en/${name}.webp`;

// Each tile shows its own piece of the app instead of one big screenshot: a crop
// of a real window capture (scripts/cutouts.py), bleeding off the tile's edge.
export default function Features({ t }: FeaturesProps) {
  const h = t.home;

  return (
    <section id="features" className="b-wrap b-section">
      <h2 className="b-h2">{h.featuresTitle}</h2>
      <div className="b-grid">
        <article className="b-tile b-feat b-browse b-wide">
          <div>
            <h3>{h.browseTitle}</h3>
            <p>{h.browseBody}</p>
          </div>
          <div className="b-bleed">
            <Image src={shot("tile-browse")} alt={h.browseAlt} width={1185} height={621} sizes="(min-width: 700px) 560px, 90vw" />
          </div>
        </article>

        <article className="b-tile b-feat">
          <div>
            <h3>{h.previewTitle}</h3>
            <p>{h.previewBody}</p>
          </div>
          <div className="b-bleed b-bleed-left">
            <kbd className="b-key" aria-hidden="true">
              {h.spaceKey}
            </kbd>
            <Image className="b-shot-ql" src={shot("tile-preview")} alt={h.previewAlt} width={2005} height={993} sizes="480px" />
          </div>
        </article>

        <article className="b-tile b-feat">
          <div>
            <h3>{h.nestedTitle}</h3>
            <p>{h.nestedBody}</p>
          </div>
          <div className="b-bleed b-shot-free">
            <Image src={shot("tile-nested")} alt={h.nestedAlt} width={1330} height={1082} sizes="(min-width: 1000px) 350px, (min-width: 700px) 45vw, 90vw" />
          </div>
        </article>

        <article className="b-tile b-feat">
          <div>
            <h3>{h.extractTitle}</h3>
            <p>{h.extractBody}</p>
          </div>
          <div className="b-bleed">
            <Image src={shot("tile-extract")} alt={h.extractAlt} width={1180} height={590} sizes="(min-width: 700px) 440px, 90vw" />
          </div>
        </article>

        <article className="b-tile b-feat">
          <div>
            <h3>{h.finderTitle}</h3>
            <p>{h.finderBody}</p>
          </div>
          <div className="b-bleed b-bleed-left b-shot-free">
            <Image className="b-shot-finder" src={shot("tile-finder")} alt={h.finderAlt} width={1236} height={688} sizes="380px" />
          </div>
        </article>

        <article className="b-tile b-feat">
          <div>
            <h3>{h.createTitle}</h3>
            <p>{h.createBody}</p>
            <p className="b-mono">AES-256 · ZipCrypto · .zip.001 · .7z.001</p>
          </div>
          <div className="b-bleed b-bleed-left b-shot-free">
            <Image className="b-shot-compress" src={shot("tile-compress")} alt={h.createAlt} width={1370} height={700} sizes="420px" />
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

        <article className="b-tile b-feat b-stat b-wide-md">
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
