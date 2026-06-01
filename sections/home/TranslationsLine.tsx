import type { Translations } from "@/lib/i18n";

interface TranslationsLineProps {
  t: Translations;
}

const GlobeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default function TranslationsLine({ t }: TranslationsLineProps) {
  return (
    <section
      id="translations"
      className="bg-bg-surface border-[0.5px] border-border-default rounded-md px-6 py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 mb-12"
    >
      <div className="flex flex-col gap-2 min-w-0 flex-1">
        <div
          className="flex flex-wrap items-center gap-1.5 text-[15px] leading-none"
          aria-hidden="true"
        >
          {t.translations.languages.map((lang) => (
            <span key={lang.name} title={lang.name}>
              {lang.flag}
            </span>
          ))}
        </div>
        <p className="text-[14px] text-ink-secondary m-0 leading-[1.55]">
          <strong className="text-ink-primary font-medium">
            {t.translations.lead}
          </strong>{" "}
          {t.translations.body}
        </p>
      </div>
      <a
        href="https://poeditor.com/join/project/J2Qq2SUzYr"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[13px] text-ink-primary underline underline-offset-[3px] decoration-[0.5px] decoration-border-strong hover:decoration-ink-primary shrink-0"
      >
        <span className="w-[14px] h-[14px] inline-block">
          <GlobeIcon />
        </span>
        {t.translations.viewOnPoeditor}
      </a>
    </section>
  );
}
