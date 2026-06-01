import type { Translations } from "@/lib/i18n";

interface FeatureStripProps {
  t: Translations;
}

export default function FeatureStrip({ t }: FeatureStripProps) {
  const features = [
    { num: "01", title: t.features.peek.title, body: t.features.peek.description },
    { num: "02", title: t.features.nested.title, body: t.features.nested.description },
    { num: "03", title: t.features.selective.title, body: t.features.selective.description },
    { num: "04", title: t.features.editing.title, body: t.features.editing.description },
  ];

  return (
    <section
      id="features"
      className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border-subtle border-[0.5px] border-border-subtle rounded-md overflow-hidden mb-12"
    >
      {features.map((f) => (
        <div key={f.num} className="bg-bg-surface p-6">
          <div className="font-mono text-[10px] tracking-[0.08em] text-ink-tertiary mb-[10px]">
            {f.num}
          </div>
          <h3 className="text-[14px] font-medium text-ink-primary mb-[6px]">
            {f.title}
          </h3>
          <p className="text-[12px] leading-[1.5] text-ink-secondary m-0">
            {f.body}
          </p>
        </div>
      ))}
    </section>
  );
}
