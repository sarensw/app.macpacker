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
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section id="faq" className="b-wrap b-section b-faq">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <h2 className="b-h2">{t.home.faqTitle}</h2>
      <div className="b-faqlist">
        {t.faq.items.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
