import Link from "next/link";
import type { Locale, Translations } from "@/lib/i18n";
import LanguageSwitcher from "@/components/client/LanguageSwitcher";

interface HeaderProps {
  locale: Locale;
  t: Translations;
  downloadUrl: string;
}

export default function Header({ locale, t, downloadUrl }: HeaderProps) {
  const navLinks: { name: string; href: string; external?: boolean }[] = [
    { name: t.nav.features, href: "#features" },
    { name: t.nav.formats, href: "#formats" },
    { name: t.nav.changelog, href: "#changelog" },
    { name: t.nav.docs, href: `/${locale}/docs`, external: true },
    { name: t.nav.blog, href: `/${locale}/blog`, external: true },
  ];

  return (
    <header className="bg-bg-page">
      <nav
        aria-label={
          locale === "zh" ? "主导航" : "Main navigation"
        }
        className="max-w-[1120px] mx-auto flex items-center justify-between px-6 pt-8 pb-16 max-md:px-5 max-md:pt-6 max-md:pb-10"
      >
        <Link href={`/${locale}`} className="flex items-center gap-2.5">
          <span className="sr-only">MacPacker</span>
          <img
            src="/logo.png"
            alt=""
            aria-hidden="true"
            width={26}
            height={26}
            className="w-[26px] h-[26px] rounded-md"
          />
          <span className="text-[15px] font-medium tracking-[-0.01em] text-ink-primary">
            MacPacker
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((l) =>
            l.external ? (
              <Link
                key={l.name}
                href={l.href}
                className="text-[13px] text-ink-secondary hover:text-ink-primary transition-colors"
              >
                {l.name}
              </Link>
            ) : (
              <a
                key={l.name}
                href={l.href}
                className="text-[13px] text-ink-secondary hover:text-ink-primary transition-colors"
              >
                {l.name}
              </a>
            ),
          )}
          <LanguageSwitcher locale={locale} />
          <a
            href={downloadUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-ink-primary text-ink-inverse text-[13px] font-medium hover:bg-[#2a2a2a] transition-colors"
          >
            {t.nav.downloadCta}
          </a>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <LanguageSwitcher locale={locale} />
          <a
            href={downloadUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-ink-primary text-ink-inverse text-[13px] font-medium"
          >
            {t.nav.downloadCta}
          </a>
        </div>
      </nav>
    </header>
  );
}
