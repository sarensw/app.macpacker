import Link from "next/link";
import type { Locale, Translations } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
  t: Translations;
}

export default function Footer({ locale, t }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-[0.5px] border-border-subtle mt-8 bg-bg-page">
      <div className="max-w-[1120px] mx-auto px-6 pt-10 pb-6 max-md:px-5">
        <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))] gap-10 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <img
                src="/logo.png"
                alt=""
                aria-hidden="true"
                width={22}
                height={22}
                className="w-[22px] h-[22px] rounded-md"
              />
              <span className="text-[15px] font-medium tracking-[-0.01em] text-ink-primary">
                MacPacker
              </span>
            </div>
            <p className="text-[12px] leading-[1.6] text-ink-secondary max-w-[280px] m-0">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <div className="font-mono text-[10px] tracking-[0.08em] text-ink-tertiary uppercase mb-3">
              {t.footer.sections.product}
            </div>
            <div className="flex flex-col gap-2 text-[13px] text-ink-secondary">
              <a href="#features" className="hover:text-ink-primary transition-colors">
                {t.nav.features}
              </a>
              <a href="#formats" className="hover:text-ink-primary transition-colors">
                {t.nav.formats}
              </a>
              <a href="#changelog" className="hover:text-ink-primary transition-colors">
                {t.nav.changelog}
              </a>
              <Link href={`/${locale}/docs`} className="hover:text-ink-primary transition-colors">
                {t.footer.links.docs}
              </Link>
              <Link href={`/${locale}/blog`} className="hover:text-ink-primary transition-colors">
                {t.footer.links.blog}
              </Link>
            </div>
          </div>

          <div>
            <div className="font-mono text-[10px] tracking-[0.08em] text-ink-tertiary uppercase mb-3">
              {t.footer.sections.openSource}
            </div>
            <div className="flex flex-col gap-2 text-[13px] text-ink-secondary">
              <a
                href="https://github.com/sarensw/MacPacker"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink-primary transition-colors"
              >
                {t.footer.links.github}
              </a>
              <a
                href="https://github.com/sarensw/MacPacker/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink-primary transition-colors"
              >
                {t.footer.links.reportBug}
              </a>
              <a
                href="https://poeditor.com/join/project/J2Qq2SUzYr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink-primary transition-colors"
              >
                {t.footer.links.translate}
              </a>
            </div>
          </div>

          <div>
            <div className="font-mono text-[10px] tracking-[0.08em] text-ink-tertiary uppercase mb-3">
              {t.footer.sections.legal}
            </div>
            <div className="flex flex-col gap-2 text-[13px] text-ink-secondary">
              <Link
                href={`/${locale}/privacy`}
                className="hover:text-ink-primary transition-colors"
              >
                {t.footer.links.privacy}
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t-[0.5px] border-border-subtle pt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-center sm:text-left font-mono text-[10px] tracking-[0.03em] text-ink-tertiary uppercase">
          <span>
            © {year}{" "}
            <a
              href="https://sarensw.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink-primary transition-colors"
            >
              {t.footer.author}
            </a>
          </span>
          <span>{t.footer.madeFor}</span>
        </div>
      </div>
    </footer>
  );
}
