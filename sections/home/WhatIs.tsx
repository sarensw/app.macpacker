import type { Translations } from "@/lib/i18n";

interface WhatIsProps {
  t: Translations;
}

// A self-contained "What is MacPacker?" passage. It gives first-time visitors
// (and AI answer engines) one quotable paragraph that defines the product, its
// key differentiator, supported formats, platform, and license.
export default function WhatIs({ t }: WhatIsProps) {
  return (
    <section id="what-is" className="mb-12">
      <h2 className="text-[20px] font-medium tracking-[-0.015em] text-ink-primary mb-3">
        {t.whatIs.title}
      </h2>
      <p className="text-[15px] leading-[1.7] text-ink-secondary m-0">
        {t.whatIs.body}
      </p>
    </section>
  );
}
