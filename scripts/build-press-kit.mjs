// Builds the downloadable MacPacker media kit from the translation files and
// brand assets. Runs before `dev` and `build` (see package.json pre-scripts).
//
// Outputs (git-ignored, regenerated every build) into public/press/:
//   macpacker-press-kit-<locale>.zip   — the full kit
//   fact-sheet-<locale>.md             — standalone fact sheet (linked from the page)
//
// Text (fact sheet, boilerplate, README) is generated per locale from the same
// `press` namespace that powers /press, so the kit can never drift from the site.
// Visual assets are shared. Screenshots prefer press-kit/assets/screenshots/<locale>/
// and fall back to .../en/ — the "localized text, shared visuals, top-languages
// screenshots" model. Missing optional assets are warnings, not errors.

import { readFile, writeFile, mkdir, readdir, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import JSZip from "jszip";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "press");
const SRC_ASSETS = path.join(ROOT, "press-kit", "assets");
const LOCALES = ["en", "zh"];
// Fixed entry date → deterministic archives (no spurious diffs / rebuilds).
const FIXED_DATE = new Date("2020-01-01T00:00:00Z");

const LINKS = {
  appStore: "https://apps.apple.com/us/app/macpacker/id6473273874",
  github: "https://github.com/sarensw/MacPacker",
  releases: "https://github.com/sarensw/MacPacker/releases",
  homebrew: "brew install --cask macpacker",
  website: "https://macpacker.app",
};
const EMAIL = "stephan@sarensw.com";

async function readJson(rel) {
  return JSON.parse(await readFile(path.join(ROOT, rel), "utf8"));
}

// Group every supported format into the four human-facing categories, mirroring
// lib/format-chips.ts (LHA/LZH stays one entry so the total reads 41).
const LABEL_OVERRIDES = { "7zip": "7z", squashfs: "SquashFS" };
const KIND_TO_CATEGORY = { archive: "archives", compression: "compression", image: "diskImages" };

function categoryLabel(id, firstExt) {
  if (id === "lha") return "LHA/LZH";
  return LABEL_OVERRIDES[id] ?? firstExt.toUpperCase();
}

function formatCategories(registry) {
  const buckets = { archives: [], compressedTar: [], compression: [], diskImages: [] };
  for (const f of registry.formats) {
    const cat = KIND_TO_CATEGORY[f.kind];
    if (cat) buckets[cat].push(categoryLabel(f.id, f.extensions[0]));
  }
  for (const c of registry.compounds) buckets.compressedTar.push(c.id.toUpperCase());
  const byLabel = (a, b) => a.toLowerCase().localeCompare(b.toLowerCase());
  return [
    { key: "archives", labels: buckets.archives.sort(byLabel) },
    { key: "compressedTar", labels: buckets.compressedTar.sort(byLabel) },
    { key: "compression", labels: buckets.compression.sort(byLabel) },
    { key: "diskImages", labels: buckets.diskImages.sort(byLabel) },
  ];
}

function factSheetMarkdown(locale, t, version, categories) {
  const p = t.press;
  const rows = [
    [p.fName, "MacPacker"],
    [p.fDeveloper, "Stephan Arenswald"],
    [p.fPrice, p.fPriceValue],
    [p.fLicense, "GPL-3.0"],
    [p.fPlatform, p.fPlatformValue],
    [p.fBuiltWith, "Swift / SwiftUI"],
    [p.fVersion, `v${version}`],
    [p.fCategory, p.fCategoryValue],
    [p.fFormats, p.fFormatsValue],
    [p.fLanguages, p.fLanguagesValue],
    [p.fWebsite, "macpacker.app"],
  ];
  const features = [
    [p.feat1Title, p.feat1Desc],
    [p.feat2Title, p.feat2Desc],
    [p.feat3Title, p.feat3Desc],
    [p.feat4Title, p.feat4Desc],
  ]
    .map(([title, desc]) => `- **${title}** — ${desc}`)
    .join("\n");

  const catLabel = {
    archives: p.fmtArchives,
    compressedTar: p.fmtCompressedTar,
    compression: p.fmtCompression,
    diskImages: p.fmtDiskImages,
  };
  const formatList = categories
    .map((c) => `- **${catLabel[c.key]}** (${c.labels.length}): ${c.labels.join(", ")}`)
    .join("\n");

  const scopeIs = p.scopeIs.map((s) => `- ${s}`).join("\n");
  const scopeFuture = p.scopeFuture.map((s) => `- ${s}`).join("\n");

  return `# MacPacker — ${p.factsTitle}

${p.boilerShort}

| | |
| --- | --- |
${rows.map(([k, v]) => `| ${k} | ${v} |`).join("\n")}

## ${p.featuresTitle}

${features}

## ${p.scopeTitle}

**${p.scopeIsLabel}**

${scopeIs}

**${p.scopeFutureLabel}**

${scopeFuture}

${p.scopeNote}

## ${p.formatsEyebrow}

${formatList}

## ${p.boilerTitle}

${p.boilerLong}

## Links

- Website: ${LINKS.website}/${locale}
- App Store: ${LINKS.appStore}
- GitHub: ${LINKS.github}
- Homebrew: \`${LINKS.homebrew}\`
- Releases: ${LINKS.releases}

## ${p.contactTitle}

${EMAIL}
`;
}

function boilerplateText(t) {
  const p = t.press;
  return `${p.boilerShortLabel}\n\n${p.boilerShort}\n\n${p.boilerLongLabel}\n\n${p.boilerLong}\n`;
}

function brandText(t) {
  const p = t.press;
  return `MacPacker — ${p.brandTitle}

Colors (from the app icon and page background)
  ${p.colorOrange}  #F06C3C
  ${p.colorAmber}  #F09C3C
  ${p.colorCharcoal}  #3C3C3C
  ${p.colorBg}  #FFFFFF

${p.appNote}

${p.typeNote}

${p.clearSpace}
`;
}

function readmeText(locale, t, version) {
  const p = t.press;
  return `${p.metaTitle} — MacPacker (${locale.toUpperCase()}, v${version})

${p.intro}

Contents
  fact-sheet.md             ${p.factsTitle}
  boilerplate.txt           ${p.boilerTitle}
  LICENSE-AND-USAGE.txt      GPL-3.0 + ${p.usageTitle}
  assets/icon/              ${p.assetIcon} (PNG 1024x1024)
  assets/screenshots/       ${p.screenshotsTitle}
  assets/brand/             ${p.brandTitle}

${p.usageTitle}
${p.usageBody}

${p.contactTitle}: ${EMAIL}
${LINKS.website}/${locale}
`;
}

function licenseText(t) {
  const p = t.press;
  return `MacPacker is free software released under GPL-3.0.
License: https://www.gnu.org/licenses/gpl-3.0.html
Source:  ${LINKS.github}

${p.usageTitle}
${p.usageBody}
`;
}

/** List files in a dir (non-recursive), or [] if it doesn't exist. */
async function listFiles(dir) {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  return entries.filter((e) => e.isFile() && !e.name.startsWith(".")).map((e) => e.name);
}

async function buildLocale(locale, translations, version, categories) {
  const t = translations[locale];
  const zip = new JSZip();
  const root = zip.folder("macpacker-press-kit");
  const opts = { date: FIXED_DATE };

  // ── Text (localized) ──
  const factSheet = factSheetMarkdown(locale, t, version, categories);
  root.file("README.txt", readmeText(locale, t, version), opts);
  root.file("fact-sheet.md", factSheet, opts);
  root.file("boilerplate.txt", boilerplateText(t), opts);
  root.file("LICENSE-AND-USAGE.txt", licenseText(t), opts);
  root.folder("assets/brand").file("colors-and-type.txt", brandText(t), opts);

  // ── Icon (shared) ──
  const icon = await readFile(path.join(ROOT, "public", "logo.png"));
  root.folder("assets/icon").file("macpacker-icon-1024.png", icon, opts);

  // ── Screenshots: prefer this locale, fall back to en, then to hero.png ──
  const ssDir = path.join(SRC_ASSETS, "screenshots", locale);
  const ssFallback = path.join(SRC_ASSETS, "screenshots", "en");
  let ssNames = await listFiles(ssDir);
  let ssSource = ssDir;
  if (ssNames.length === 0 && locale !== "en") {
    ssNames = await listFiles(ssFallback);
    ssSource = ssFallback;
  }
  const ssFolder = root.folder("assets/screenshots");
  if (ssNames.length > 0) {
    for (const name of ssNames) {
      ssFolder.file(name, await readFile(path.join(ssSource, name)), opts);
    }
  } else {
    // No dedicated screenshots yet — seed with the marketing hero so the kit
    // is never empty. Replaced automatically once real screenshots are added.
    const hero = await readFile(path.join(ROOT, "public", "hero.png"));
    ssFolder.file("01-browsing-an-archive.png", hero, opts);
  }

  // ── Demo clip (shared, optional) ──
  const demoDir = path.join(SRC_ASSETS, "demo");
  for (const name of await listFiles(demoDir)) {
    root.folder("assets/demo").file(name, await readFile(path.join(demoDir, name)), opts);
  }

  // ── Emit ──
  const buf = await zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });
  await writeFile(path.join(OUT_DIR, `macpacker-press-kit-${locale}.zip`), buf);
  await writeFile(path.join(OUT_DIR, `fact-sheet-${locale}.md`), factSheet, "utf8");

  return {
    locale,
    screenshots: ssNames.length || 1,
    seeded: ssNames.length === 0,
    bytes: buf.length,
  };
}

async function loadSharp() {
  try {
    return (await import("sharp")).default;
  } catch {
    return null;
  }
}

// Mirror screenshots + demo into public/press/ so the /press page can serve them
// (git-ignored, regenerated each build; source of truth stays in press-kit/assets/).
// Screenshots are downscaled for the web with sharp when available; the kit keeps the
// full-resolution originals.
async function copyPageMedia() {
  const sharp = await loadSharp();
  const toWeb = async (src, dest) => {
    if (sharp) {
      try {
        await sharp(src)
          .resize({ width: 1600, withoutEnlargement: true })
          .jpeg({ quality: 80, mozjpeg: true })
          .toFile(dest);
        return;
      } catch {
        // fall through to a straight copy
      }
    }
    await copyFile(src, dest);
  };

  for (const locale of LOCALES) {
    let dir = path.join(SRC_ASSETS, "screenshots", locale);
    let names = await listFiles(dir);
    if (names.length === 0 && locale !== "en") {
      dir = path.join(SRC_ASSETS, "screenshots", "en"); // English fallback
      names = await listFiles(dir);
    }
    const dest = path.join(OUT_DIR, "screenshots", locale);
    await mkdir(dest, { recursive: true });
    for (const name of names) await toWeb(path.join(dir, name), path.join(dest, name));
  }

  const demoDir = path.join(SRC_ASSETS, "demo");
  const demoNames = await listFiles(demoDir);
  if (demoNames.length) {
    const dest = path.join(OUT_DIR, "demo");
    await mkdir(dest, { recursive: true });
    for (const name of demoNames) {
      await copyFile(path.join(demoDir, name), path.join(dest, name));
    }
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const fallback = await readJson("lib/release.fallback.json");
  const version = fallback.latestVersion ?? "0.15.1";
  const translations = {};
  for (const l of LOCALES) translations[l] = await readJson(`lib/translations/${l}.json`);
  const categories = formatCategories(await readJson("lib/format-registry.json"));

  const results = [];
  for (const locale of LOCALES) {
    results.push(await buildLocale(locale, translations, version, categories));
  }
  await copyPageMedia();

  for (const r of results) {
    const kb = (r.bytes / 1024).toFixed(0);
    const note = r.seeded ? "screenshots: hero placeholder (add real ones to press-kit/assets/screenshots/)" : `screenshots: ${r.screenshots}`;
    console.log(`[press-kit] ${r.locale}: ${kb} KB · ${note}`);
  }
}

main().catch((err) => {
  // Never break `next dev` / `next build` over the press kit. Warn and continue.
  console.warn("[press-kit] skipped:", err?.message ?? err);
});
