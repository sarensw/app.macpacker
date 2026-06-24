"use client";

import { useState, useCallback } from "react";

interface CopyTextButtonProps {
  /** Text copied to the clipboard. */
  text: string;
  copyLabel: string;
  copiedLabel: string;
}

export default function CopyTextButton({
  text,
  copyLabel,
  copiedLabel,
}: CopyTextButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      },
      () => {
        // Clipboard unavailable — ignore silently
      },
    );
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? copiedLabel : copyLabel}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border-[0.5px] border-border-default bg-bg-page font-mono text-[10px] tracking-[0.04em] uppercase text-ink-secondary hover:text-ink-primary hover:border-border-strong transition-colors shrink-0"
    >
      {copied ? (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {copiedLabel}
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          {copyLabel}
        </>
      )}
    </button>
  );
}
