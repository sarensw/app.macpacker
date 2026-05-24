import type { Translations } from "@/lib/i18n";
import { GitHubIcon } from "@/components/icons";

interface OpenSourceLineProps {
  t: Translations;
}

export default function OpenSourceLine({ t }: OpenSourceLineProps) {
  return (
    <section
      id="open-source"
      className="bg-bg-surface border-[0.5px] border-border-default rounded-md px-6 py-5 flex flex-wrap items-center justify-between gap-4 mb-12"
    >
      <p className="text-[14px] text-ink-secondary m-0">
        <strong className="text-ink-primary font-medium">{t.openSource.lead}</strong>{" "}
        {t.openSource.body}
      </p>
      <a
        href="https://github.com/sarensw/MacPacker"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[13px] text-ink-primary underline underline-offset-[3px] decoration-[0.5px] decoration-border-strong hover:decoration-ink-primary"
      >
        <span className="w-[14px] h-[14px] inline-block">
          <GitHubIcon />
        </span>
        {t.openSource.viewOnGithub}
      </a>
    </section>
  );
}
