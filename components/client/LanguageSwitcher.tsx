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

  return (
    <div className="flex items-center bg-bg-white rounded-lg border border-border overflow-hidden" role="group" aria-label="Language">
      <button
        type="button"
        className={`bg-none border-none font-sans text-xs font-semibold py-2.5 px-3.5 cursor-pointer transition-all ${locale === "en" ? "active bg-accent-bg text-accent" : "text-text-dim hover:text-text-secondary"}`}
        onClick={() => switchTo("en")}
        aria-label="Switch to English"
        aria-current={locale === "en" ? "true" : undefined}
      >
        EN
      </button>
      <button
        type="button"
        className={`bg-none border-none font-sans text-xs font-semibold py-2.5 px-3.5 cursor-pointer transition-all ${locale === "zh" ? "active bg-accent-bg text-accent" : "text-text-dim hover:text-text-secondary"}`}
        onClick={() => switchTo("zh")}
        aria-label="切换到中文"
        aria-current={locale === "zh" ? "true" : undefined}
      >
        中文
      </button>
    </div>
  );
}
