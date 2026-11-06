import Image from "next/image";
import Link from "next/link";
import type { Locale, Translations } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
  t: Translations;
}

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function Footer({ locale, t }: FooterProps) {
  const home = `/${locale}`;
  const { links, sections } = t.footer;
  const compare = [
    ["keka", links.vsKeka],
    ["the-unarchiver", links.vsUnarchiver],
    ["betterzip", links.vsBetterZip],
    ["7-zip", links.vsSevenZip],
    ["", links.compareAll],
  ] as const;

  return (
    <footer className="b-footer">
      <div className="b-wrap b-footer-grid">
        <div>
          <Link href={home} className="b-brand">
            <Image src="/logo.png" alt="" width={26} height={26} />
            MacPacker
          </Link>
          <p className="b-tagline">{t.footer.tagline}</p>
        </div>

        <div className="b-fcol">
          <span className="b-fcol-label">{sections.product}</span>
          <Link href={`${home}#features`}>{t.nav.features}</Link>
          <Link href={`${home}#specs`}>{t.nav.formats}</Link>
          <Link href={`${home}/docs`}>{links.docs}</Link>
          <Link href={`${home}/changelog`}>{t.nav.changelog}</Link>
          <Link href={`${home}/blog`}>{links.blog}</Link>
        </div>

        <div className="b-fcol">
          <span className="b-fcol-label">{sections.compare}</span>
          {compare.map(([slug, label]) => (
            <Link key={label} href={`${home}/compare${slug ? `/${slug}` : ""}`}>
              {label}
            </Link>
          ))}
        </div>

        <div className="b-fcol">
          <span className="b-fcol-label">{sections.openSource}</span>
          <a href="https://github.com/sarensw/MacPacker" {...external}>{links.github}</a>
          <a href="https://github.com/sarensw/MacPacker/issues" {...external}>{links.reportBug}</a>
          <Link href={`${home}#support`}>{links.donate}</Link>
          <a href="https://poeditor.com/join/project/J2Qq2SUzYr" {...external}>{links.translate}</a>
          <Link href={`${home}/press`}>{links.press}</Link>
        </div>

        <div className="b-fcol">
          <span className="b-fcol-label">{sections.legal}</span>
          <Link href={`${home}/privacy`}>{links.privacy}</Link>
          <Link href={`${home}/imprint`}>{links.imprint}</Link>
        </div>
      </div>

      <div className="b-wrap b-copyright">
        © {new Date().getFullYear()}{" "}
        <a href="https://sarensw.com" {...external}>
          {t.footer.author}
        </a>{" "}
        · {t.footer.madeFor} · GPL-3.0
      </div>
    </footer>
  );
}
