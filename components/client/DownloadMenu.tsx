"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowDownIcon, ChevronDownIcon, GitHubIcon, HomebrewIcon } from "@/components/icons";
import { downloadEvent } from "@/lib/analytics";

const BREW_COMMAND = "brew install --cask macpacker";
const RELEASES_URL = "https://github.com/sarensw/MacPacker/releases";

export interface DownloadMenuLabels {
  more: string;
  dmgTitle: string;
  dmgSub: string;
  zipTitle: string;
  zipSub: string;
  copy: string;
  copied: string;
  githubTitle: string;
  githubSub: string;
  note: string;
}

interface DownloadMenuProps {
  dmgUrl: string;
  zipUrl: string;
  labels: DownloadMenuLabels;
}

// "More download options": everything but the App Store, behind one button, like
// a macOS pull-down button. The button names what is behind it with three icons.
export default function DownloadMenu({ dmgUrl, zipUrl, labels }: DownloadMenuProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  // close on a click outside or on Escape, while open
  useEffect(() => {
    if (!open) return;
    const onClick = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function copyCommand() {
    navigator.clipboard.writeText(BREW_COMMAND).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      },
      () => {
        // clipboard blocked: the command stays on screen to select by hand
      },
    );
  }

  return (
    <div className="dl-more-wrap" ref={wrapRef}>
      <button
        ref={buttonRef}
        type="button"
        className="b-btn b-btn-outline dl-more"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{labels.more}</span>
        <span className="dl-hint" aria-hidden="true">
          <ArrowDownIcon />
          <i />
          <HomebrewIcon />
          <i />
          <GitHubIcon />
        </span>
        <ChevronDownIcon />
      </button>

      <div className="dl-menu" id={menuId} hidden={!open}>
        <a className={`dl-item ${downloadEvent("dmg")}`} href={dmgUrl}>
          <ArrowDownIcon />
          <span>
            <b>{labels.dmgTitle}</b>
            <small>{labels.dmgSub}</small>
          </span>
        </a>
        <a className={`dl-item ${downloadEvent("zip")}`} href={zipUrl}>
          <ArrowDownIcon />
          <span>
            <b>{labels.zipTitle}</b>
            <small>{labels.zipSub}</small>
          </span>
        </a>
        <div className="dl-item">
          <HomebrewIcon />
          <span>
            <b>Homebrew</b>
            <span className="dl-shell">
              <code>
                <span className="sh-cmd">brew</span> install{" "}
                <span className="sh-flag">--cask</span>{" "}
                <span className="sh-arg">macpacker</span>
              </code>
              <button type="button" className={`dl-copy ${downloadEvent("brew")}`} onClick={copyCommand}>
                {copied ? labels.copied : labels.copy}
              </button>
            </span>
          </span>
        </div>
        <a
          className={`dl-item ${downloadEvent("github")}`}
          href={RELEASES_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon />
          <span>
            <b>{labels.githubTitle}</b>
            <small>{labels.githubSub}</small>
          </span>
        </a>
        <p className="dl-note">{labels.note}</p>
      </div>
    </div>
  );
}
