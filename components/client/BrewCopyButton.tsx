"use client";

import { useState, useCallback } from "react";

interface BrewCopyButtonProps {
  command: string;
  copyLabel: string;
  copiedLabel: string;
}

function tokenize(command: string) {
  const parts = command.split(/(\s+)/);
  return parts.map((part, i) => {
    if (/^\s+$/.test(part)) return { kind: "ws" as const, text: part, key: i };
    if (i === 0) return { kind: "cmd" as const, text: part, key: i };
    if (i === 2) return { kind: "arg" as const, text: part, key: i };
    if (part.startsWith("--") || part.startsWith("-"))
      return { kind: "flag" as const, text: part, key: i };
    return { kind: "name" as const, text: part, key: i };
  });
}

export default function BrewCopyButton({
  command,
  copyLabel,
  copiedLabel,
}: BrewCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(command).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      },
      () => {
        // Clipboard unavailable — ignore silently
      },
    );
  }, [command]);

  const tokens = tokenize(command);
  const colorFor = (kind: "cmd" | "arg" | "flag" | "name" | "ws") =>
    ({
      cmd: "text-[#7dd3fc]",
      arg: "text-[#86efac]",
      flag: "text-[#fcd34d]",
      name: "text-white/90",
      ws: "text-white/90",
    })[kind];

  return (
    <div
      className="flex items-center justify-between gap-3 px-4 py-1.5 rounded-md bg-[#1b1b1b] border-[0.5px] border-border-default max-w-[460px]"
      aria-label={`Install command: ${command}`}
    >
      <code className="font-mono text-[13px] truncate">
        <span className="text-white/40 select-none">$ </span>
        {tokens.map((tok) =>
          tok.kind === "ws" ? (
            <span key={tok.key}>{tok.text}</span>
          ) : (
            <span key={tok.key} className={colorFor(tok.kind)}>
              {tok.text}
            </span>
          ),
        )}
      </code>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? copiedLabel : copyLabel}
        className="inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-mono text-white/70 hover:text-white hover:bg-white/5 transition-colors shrink-0"
      >
        {copied ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {copiedLabel}
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            {copyLabel}
          </>
        )}
      </button>
    </div>
  );
}
