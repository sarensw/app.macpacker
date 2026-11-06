import Image from "next/image";
import type { Locale, Translations } from "@/lib/i18n";
import { extensionCount, formatCount } from "@/lib/format-chips";

interface FeaturesProps {
  locale: Locale;
  t: Translations;
}

// Each tile shows its own piece of the app instead of one big screenshot: a
// crop of the real window, or the app's UI drawn (nested boxes, Finder's menu).
export default function Features({ locale, t }: FeaturesProps) {
  const h = t.home;
  const shot = (name: string) => `/img/${locale}/${name}.webp`;

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
            <Image src={shot("detail-list")} alt={h.browseAlt} width={590} height={246} sizes="(min-width: 700px) 560px, 90vw" />
          </div>
        </article>

        <article className="b-tile b-feat">
          <div>
            <h3>{h.previewTitle}</h3>
            <p>{h.previewBody}</p>
          </div>
          <div className="b-bleed b-ql">
            <kbd className="b-key" aria-hidden="true">
              {h.spaceKey}
            </kbd>
            <Image src={shot("detail-preview")} alt={h.previewAlt} width={863} height={542} sizes="480px" />
          </div>
        </article>

        <article className="b-tile b-feat">
          <div>
            <h3>{h.nestedTitle}</h3>
            <p>{h.nestedBody}</p>
          </div>
          {/* a .zip inside a .tar.gz inside a .dmg, drawn */}
          <div className="b-art" aria-hidden="true">
            <div className="b-box">
              <span className="b-name">Tools.dmg</span>
              <div className="b-box">
                <span className="b-name">src.tar.gz</span>
                <div className="b-box">
                  <span className="b-name">assets.zip</span>
                  <div className="b-file">logo.png</div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article className="b-tile b-feat">
          <div>
            <h3>{h.extractTitle}</h3>
            <p>{h.extractBody}</p>
          </div>
          <div className="b-bleed">
            <Image src={shot("detail-drag")} alt={h.extractAlt} width={590} height={260} sizes="(min-width: 700px) 440px, 90vw" />
          </div>
        </article>

        <article className="b-tile b-feat">
          <div>
            <h3>{h.finderTitle}</h3>
            <p>{h.finderBody}</p>
          </div>
          {/* Finder's context menu with the MacPacker submenu, in the app's own words */}
          <div className="b-art b-menus" aria-hidden="true">
            <div className="b-menu b-menu-main">
              <span>{h.menuOpen}</span>
              <span>{h.menuInfo}</span>
              <hr />
              <span className="b-on">
                MacPacker <span>›</span>
              </span>
            </div>
            <div className="b-menu b-menu-sub">
              <span>{h.menuZip}</span>
              <span>{h.menu7z}</span>
              <span>{h.menuAdd}</span>
            </div>
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
