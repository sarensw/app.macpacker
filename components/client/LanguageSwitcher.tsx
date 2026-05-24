"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  function switchTo(target: Locale) {
    const segments = pathname.split("/");
    segments[1] = target;
    window.location.href = segments.join("/");
  }

  const baseClass =
    "bg-transparent border-none font-sans text-[11px] font-medium py-1.5 px-2.5 cursor-pointer transition-colors";
  const activeClass = "text-ink-primary bg-bg-muted";
  const idleClass = "text-ink-tertiary hover:text-ink-secondary";

  return (
    <div
      className="flex items-center bg-bg-surface rounded-md border-[0.5px] border-border-default overflow-hidden"
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        className={`${baseClass} ${locale === "en" ? activeClass : idleClass}`}
        onClick={() => switchTo("en")}
        aria-label="Switch to English"
        aria-current={locale === "en" ? "true" : undefined}
      >
        EN
      </button>
      <button
        type="button"
        className={`${baseClass} ${locale === "zh" ? activeClass : idleClass}`}
        onClick={() => switchTo("zh")}
        aria-label="切换到中文"
        aria-current={locale === "zh" ? "true" : undefined}
      >
        中文
      </button>
    </div>
  );
}
