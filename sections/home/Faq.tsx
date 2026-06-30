import type { Translations } from "@/lib/i18n";

interface FaqProps {
  t: Translations;
}

// Homepage FAQ: visible Q&A plus matching FAQPage JSON-LD. The questions are
// phrased the way people (and AI answer engines) actually ask them, and each
// answer is self-contained so it can be cited on its own.
export default function Faq({ t }: FaqProps) {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <section id="faq" className="mb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink-tertiary mb-2">
        {t.faq.eyebrow}
      </p>
      <h2 className="text-[20px] font-medium tracking-[-0.015em] text-ink-primary mb-5">
        {t.faq.title}
      </h2>
      <div className="flex flex-col gap-3">
        {t.faq.items.map((item, i) => (
          <details
            key={item.q}
            open={i === 0}
            className="bg-bg-surface border-[0.5px] border-border-default rounded-md p-5 group"
          >
            <summary className="cursor-pointer text-[14px] font-medium text-ink-primary tracking-[-0.005em] flex items-center justify-between gap-3">
              <span>{item.q}</span>
              <span
                className="text-ink-tertiary text-[12px] font-mono shrink-0 group-open:rotate-45 transition-transform"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <p className="text-[13.5px] leading-[1.65] text-ink-secondary mt-3 m-0">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
