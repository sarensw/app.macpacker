import Link from "next/link";
import { allFormatChips } from "@/lib/format-chips";
import type { Locale, Translations } from "@/lib/i18n";

interface FormatsChipsProps {
  locale: Locale;
  t: Translations;
}

export default function FormatsChips({ locale, t }: FormatsChipsProps) {
  return (
    <section id="formats" className="mb-12">
      <div className="flex items-baseline justify-between mb-5">
        <div>
          <p className="font-mono text-[11px] tracking-[0.08em] text-ink-tertiary uppercase mb-1">
            {t.formats.eyebrow}
          </p>
          <h2 className="text-[20px] font-medium tracking-[-0.015em] text-ink-primary m-0">
            {t.formats.title}
          </h2>
        </div>
        <Link
          href={`/${locale}/docs`}
          className="text-[13px] text-ink-secondary hover:text-ink-primary transition-colors"
        >
          {t.formats.fullListLink}
        </Link>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {allFormatChips.map((chip) => (
          <span
            key={chip.id}
            className="py-[5px] px-2.5 rounded-md font-mono text-[12px] bg-bg-surface text-ink-secondary border-[0.5px] border-border-default"
          >
            {chip.label}
          </span>
        ))}
      </div>

      <p className="mt-3 text-[12px] text-ink-tertiary">{t.formats.note}</p>
    </section>
  );
}
