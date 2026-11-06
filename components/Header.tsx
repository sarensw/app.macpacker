import Image from "next/image";
import Link from "next/link";
import type { Locale, Translations } from "@/lib/i18n";
import LanguageSwitcher from "@/components/client/LanguageSwitcher";

interface HeaderProps {
  locale: Locale;
  t: Translations;
}

// Glass header, sticky on every page. Download leads to the home page's download
// section, where the App Store badge comes first and every other way follows.
export default function Header({ locale, t }: HeaderProps) {
  const home = `/${locale}`;
  const links = [
    { name: t.nav.features, href: `${home}#features` },
    { name: t.nav.docs, href: `${home}/docs` },
    { name: t.nav.changelog, href: `${home}/changelog` },
    { name: t.nav.blog, href: `${home}/blog` },
  ];

  return (
    <header className="b-header">
      <div className="b-wrap b-header-row">
        <Link href={home} className="b-brand">
          <Image src="/logo.png" alt="" width={26} height={26} priority />
          MacPacker
        </Link>
        <nav className="b-nav" aria-label={locale === "zh" ? "主导航" : "Main navigation"}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="b-nav-link">
              {link.name}
            </Link>
          ))}
          <LanguageSwitcher locale={locale} />
          <Link href={`${home}#get`} className="b-btn b-btn-sm">
            {t.nav.downloadCta}
          </Link>
        </nav>
      </div>
    </header>
  );
}
