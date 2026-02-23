"use client";

import { useState, useCallback } from "react";
import { CopyIcon } from "@/components/icons";

export default function BrewCopyButton({
  command,
  copiedLabel,
}: {
  command: string;
  copiedLabel: string;
}) {
  const [toastVisible, setToastVisible] = useState(false);

  const copyBrew = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 1500);
    } catch {
      // Clipboard API unavailable or permission denied — ignore silently
    }
  }, [command]);

  return (
    <button
      type="button"
      className="flex items-center gap-2.5 py-2.5 px-4 bg-bg-dark rounded-[10px] font-mono text-[13px] text-white/70 cursor-pointer transition-all relative border-none hover:text-white/90"
      onClick={copyBrew}
      aria-label={`Copy command: ${command}`}
    >
      <span className="text-accent select-none" aria-hidden="true">$</span>
      <code className="text-white font-medium">{command}</code>
      <CopyIcon />
      <span
        className={`absolute -top-8 left-1/2 -translate-x-1/2 bg-text text-white font-sans text-[11px] font-semibold py-1 px-2.5 rounded-md pointer-events-none transition-opacity ${toastVisible ? "opacity-100" : "opacity-0"}`}
        role="status"
        aria-live="polite"
      >
        {copiedLabel}
      </span>
    </button>
  );
}
