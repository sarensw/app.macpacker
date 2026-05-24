import type { Locale, Translations } from "@/lib/i18n";
import type { Release } from "@/lib/release";

interface ChangelogRailProps {
  locale: Locale;
  t: Translations;
  releases: Release[];
  comingNext: string | null;
}

function formatDate(iso: string, locale: Locale): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ChangelogRail({
  locale,
  t,
  releases,
  comingNext,
}: ChangelogRailProps) {
  const recent = releases.slice(0, 3);

  return (
    <section id="changelog" className="mb-12">
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <p className="font-mono text-[11px] tracking-[0.08em] text-ink-tertiary uppercase mb-1">
            {t.changelog.eyebrow}
          </p>
          <h2 className="text-[20px] font-medium tracking-[-0.015em] text-ink-primary m-0">
            {t.changelog.heading}
          </h2>
        </div>
        <a
          href="https://github.com/sarensw/MacPacker/releases"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-ink-secondary hover:text-ink-primary transition-colors"
        >
          {t.changelog.viewAll}
        </a>
      </div>

      {comingNext && (
        <p className="font-mono text-[11px] tracking-[0.02em] text-ink-tertiary m-0 mb-3">
          <span className="text-ink-secondary">
            {t.changelog.comingNextEyebrow} ›
          </span>{" "}
          {comingNext}
        </p>
      )}

      <div className="border-[0.5px] border-border-default rounded-md overflow-hidden">
        {recent.map((entry, idx) => {
          const [head, ...rest] = entry.items;
          const bodyParts = rest.map((i) => i.title);
          return (
            <article
              key={entry.version}
              className={`grid grid-cols-1 md:grid-cols-[160px_1fr] gap-3 md:gap-8 px-6 py-5 bg-bg-surface ${
                idx > 0 ? "border-t-[0.5px] border-border-default" : ""
              }`}
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[12px] font-medium text-ink-primary">
                    v{entry.version}
                  </span>
                  {idx === 0 && (
                    <span className="bg-accent-success-bg text-accent-success-ink font-mono text-[9px] px-1.5 py-0.5 rounded-[3px] tracking-[0.04em] uppercase">
                      {t.changelog.latestBadge}
                    </span>
                  )}
                </div>
                {entry.date && (
                  <div className="font-mono text-[10px] tracking-[0.04em] text-ink-tertiary uppercase">
                    {formatDate(entry.date, locale)}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                {head && (
                  <h3 className="text-[14px] font-medium text-ink-primary m-0 mb-1.5">
                    {head.title}
                  </h3>
                )}
                {bodyParts.length > 0 && (
                  <p className="text-[13px] leading-[1.55] text-ink-secondary m-0">
                    {bodyParts.join(" · ")}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
