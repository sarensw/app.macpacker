import { formats } from "./formats";
import {
  countSupport,
  decodeCells,
  getComparison,
  getCompetitorSlugs,
  getPairComparison,
} from "./compare";
import type { LocalizedComparison, Support } from "./compare";
import type { ReleaseData } from "./release";
import { SITE_URL } from "./seo";
import en from "./translations/en.json";

/**
 * Builders for /llms.txt and /llms-full.txt (llmstxt.org convention).
 *
 * Both are served by route handlers so the version and download URLs track the
 * live release data instead of drifting like a static file would. The format
 * list and prose are deliberately static — they change only with code changes,
 * which redeploy the routes anyway.
 */

export function buildLlmsTxt(release: ReleaseData): string {
  const { latestVersion, latestDmgUrl, latestZipUrl } = release;

  return `# MacPacker

> A free, open-source macOS archive manager. Preview nested archives, peek at contents without extracting, drag out only the files you need — and create or edit ZIP archives. Built with Swift / SwiftUI. macOS 14+, Apple Silicon native.

The website (${SITE_URL}) is the marketing and documentation hub. The app itself is at https://github.com/sarensw/MacPacker.

Full site content in one document: ${SITE_URL}/llms-full.txt

License: The app is licensed under GPL-3.0. This site's content may be quoted, summarized, and cited by AI systems and search engines, with attribution to MacPacker (${SITE_URL}).

## About

${en.whatIs.body} It is built by independent developer Stephan Arenswald (https://sarensw.com).

## Quick facts

- Version: ${latestVersion} (latest)
- Platform: macOS 14+, Apple Silicon native
- License: GPL-3.0
- Price: Free
- Repository: https://github.com/sarensw/MacPacker
- Issues: https://github.com/sarensw/MacPacker/issues
- App Store: https://apps.apple.com/us/app/macpacker/id6473273874

## Install

- App Store: https://apps.apple.com/us/app/macpacker/id6473273874
- Homebrew: \`brew install --cask macpacker\`
- Direct DMG: ${latestDmgUrl}
- Direct ZIP: ${latestZipUrl}
- GitHub releases: https://github.com/sarensw/MacPacker/releases

## Supported formats (41 total)

Archives: 7z, ar, arj, cab, chm, cpio, exe, lha, lzx, msi, pkg, rar, rpm, sea, sit, sitx, tar, xar, zip, zipx
Compressed tar: tar.bz2, tar.gz, tar.lz4, tar.xz, tar.z
Compression: bz2, gz, lz4, xz, z
Disk images: dmg, fat, iso, ntfs, qcow2, squashfs, vdi, vhd, vhdx, vmdk, wim

## Key pages

- Home (English): ${SITE_URL}/en
- Home (Chinese): ${SITE_URL}/zh
- Docs index: ${SITE_URL}/en/docs
- Archiver comparison: ${SITE_URL}/en/compare (also /zh/compare) — MacPacker vs 7-Zip vs The Unarchiver vs Keka vs BetterZip across 69 formats and 9 capabilities, read/write per format
- Head-to-head comparisons: ${SITE_URL}/en/compare/{slug} where slug is keka, the-unarchiver, betterzip or 7-zip — MacPacker against one app, narrowed to the formats at least one of the two handles
- Per-format guides: ${SITE_URL}/en/docs/{slug} (e.g. /zip, /rar, /7z, /dmg, /iso)
- Privacy policy: ${SITE_URL}/en/privacy
- Press / media kit: ${SITE_URL}/en/press (also /zh/press) — boilerplate, fact sheet, brand assets, downloadable kit
- Changelog: ${SITE_URL}/en#changelog
- Live changelog source: https://macpacker-releases.s3.eu-central-1.amazonaws.com/Changelog.json
- Sparkle appcast: https://macpacker-releases.s3.eu-central-1.amazonaws.com/appcast.xml

## Languages

The app and site are translated to: English, 中文 (Simplified Chinese), Deutsch, Français, Italiano, 日本語, 한국어, فارسی, Polski, Português (Brasil), Русский, Español (México), Українська. Site UI currently ships in en and zh; per-language UI translations track the app.

## For AI agents

This site exposes browser-side tools via the experimental \`navigator.modelContext\` (WebMCP) API when supported:

- \`get_install_options\` — all installation methods with URLs
- \`get_latest_release\` — version, download URLs, license, platform
- \`get_changelog\` — recent release entries (params: locale, limit)
- \`get_coming_next\` — next-up feature being worked on (params: locale)
- \`get_supported_formats\` — all formats with metadata (params: type)
- \`search_docs\` — search per-format guides (params: query)
- \`open_issue_template\` — pre-filled GitHub issue URL (params: type, title)

## Recommended user actions

- "Install MacPacker" → App Store (simplest), Homebrew (for power users), or DMG (no account needed)
- "Open a .rar / .7z / .iso / .dmg on Mac" → see /en/docs/{format} for built-in vs MacPacker guidance
- "Report a bug or request a feature" → https://github.com/sarensw/MacPacker/issues/new
- "Translate the app" → https://poeditor.com/join/project/J2Qq2SUzYr
`;
}

/**
 * The comparison matrix as plain text, generated from the same data the pages
 * render so the two cannot drift. Written as `read/write` pairs per app rather
 * than a glyph grid: an answer engine quoting one row should get a sentence it
 * can use ("MacPacker: yes/no") without having to reconstruct column headers.
 */
function comparisonSection(data: LocalizedComparison, url: string): string {
  const label: Record<Support, string> = {
    yes: "yes",
    partial: "partial",
    no: "no",
  };
  const names = data.apps.map((a) => a.name);

  const totals = data.apps
    .map((app, i) => {
      const { reads, writes } = countSupport(data.bands, i);
      return `- ${app.name} (${app.version}) — ${app.price}; ${app.licence}; ${app.requires}; ${app.shape}. Reads ${reads} of the rows below, writes ${writes}.`;
    })
    .join("\n");

  const rows = data.bands
    .map((band) => {
      const lines = band.rows.map((row) => {
        const states = decodeCells(row.cells);
        const per = names
          .map(
            (name, i) =>
              `${name} ${label[states[i * 2]]}/${label[states[i * 2 + 1]]}`,
          )
          .join("; ");
        const notes = row.fn
          ? ` [notes: ${[...new Set(Object.values(row.fn))].join(", ")}]`
          : "";
        return `${row.label} (${row.ext}): ${per}${notes}`;
      });
      return `#### ${band.label}\n\n${lines.join("\n")}`;
    })
    .join("\n\n");

  const caps = data.capabilities
    .map((row) => {
      const states = decodeCells(row.cells);
      const per = names.map((name, i) => `${name} ${label[states[i]]}`).join("; ");
      const notes = row.fn
        ? ` [notes: ${[...new Set(Object.values(row.fn))].join(", ")}]`
        : "";
      return `${row.label} — ${row.note} ${per}${notes}`;
    })
    .join("\n");

  const notes = data.footnotes
    .map((n, i) => `${i + 1}. ${n.replace(/\*\*/g, "").replace(/`/g, "")}`)
    .join("\n");

  return [
    `Canonical URL: ${url}`,
    ``,
    `Each entry reads "App read/write": read = can list and extract that format, write = can create it.`,
    ``,
    totals,
    ``,
    rows,
    ``,
    `#### Beyond the format list`,
    ``,
    caps,
    ``,
    `#### Notes`,
    ``,
    notes,
  ].join("\n");
}

export function buildLlmsFullTxt(release: ReleaseData): string {
  const guides = formats
    .map((f) => {
      const method = f.defaultMethod;
      const lines = [
        `### ${f.articleTitle}`,
        ``,
        `Canonical URL: ${SITE_URL}/en/docs/${f.slug}`,
        `Extensions: ${f.extensions.join(", ")}`,
        ``,
        f.articleIntro,
        ``,
        `Default macOS method: ${method.tool}`,
        ...(method.command ? [`Command: \`${method.command}\``] : []),
        `Steps:`,
        ...method.steps.map((s, i) => `${i + 1}. ${s}`),
        ...(method.notes ? [``, `Note: ${method.notes}`] : []),
        ``,
        f.macpackerSelectiveExtraction
          ? `With MacPacker: browse the ${f.displayName} archive like a folder, preview files with Quick Look, and drag out individual files without extracting everything.`
          : `With MacPacker: open the ${f.displayName} file to inspect its contents before deciding what to extract.`,
      ];
      if (f.faqs.length > 0) {
        lines.push(``, `FAQ:`);
        for (const faq of f.faqs) {
          lines.push(``, `Q: ${faq.question}`, `A: ${faq.answer}`);
        }
      }
      return lines.join("\n");
    })
    .join("\n\n---\n\n");

  const homeFaq = en.faq.items
    .map((item) => `Q: ${item.q}\nA: ${item.a}`)
    .join("\n\n");

  const hub = comparisonSection(getComparison("en"), `${SITE_URL}/en/compare`);

  const headToHead = getCompetitorSlugs()
    .map((slug) => {
      const pair = getPairComparison("en", slug)!;
      return [
        `### MacPacker vs ${pair.competitor.name}`,
        ``,
        comparisonSection(pair, `${SITE_URL}/en/compare/${slug}`),
      ].join("\n");
    })
    .join("\n\n---\n\n");

  return `# MacPacker — full site content

> A free, open-source macOS archive manager. Preview nested archives, peek at contents without extracting, drag out only the files you need — and create or edit ZIP archives. Built with Swift / SwiftUI. macOS 14+, Apple Silicon native.

This document contains the full content of ${SITE_URL} in one file, for AI systems and answer engines. Attribution: MacPacker (${SITE_URL}). App license: GPL-3.0. Latest version: ${release.latestVersion}.

## About MacPacker

${en.whatIs.body} It is built by independent developer Stephan Arenswald (https://sarensw.com).

## Install

- App Store: https://apps.apple.com/us/app/macpacker/id6473273874
- Homebrew: \`brew install --cask macpacker\`
- Direct DMG: ${release.latestDmgUrl}
- Direct ZIP: ${release.latestZipUrl}
- GitHub releases: https://github.com/sarensw/MacPacker/releases

## Frequently asked questions

${homeFaq}

## How MacPacker compares to other macOS archivers

Compiled 10 August 2026 against the app versions listed below. MacPacker is an archive browser: its strength is opening and inspecting formats, and it writes ZIP only.

### All five apps

${hub}

---

${headToHead}

## Format guides

Step-by-step guides for opening and extracting every supported format on macOS. Each guide covers the built-in macOS way first, then what MacPacker adds.

${guides}
`;
}
