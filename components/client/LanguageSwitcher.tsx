"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

// Segmented EN | 中文 switch: same page, other locale.
export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  function switchTo(target: Locale) {
    const segments = pathname.split("/");
    segments[1] = target;
    window.location.href = segments.join("/") + window.location.hash;
  }

  return (
    <div className="b-lang" role="group" aria-label="Language">
      <button
        type="button"
        onClick={() => switchTo("en")}
        aria-label="Switch to English"
        aria-current={locale === "en" ? "true" : undefined}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => switchTo("zh")}
        aria-label="切换到中文"
        aria-current={locale === "zh" ? "true" : undefined}
      >
        中文
      </button>
    </div>
  );
}
