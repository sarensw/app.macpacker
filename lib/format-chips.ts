import registry from "./format-registry.json";

export interface FormatChip {
  id: string;
  label: string;
}

const labelOverrides: Record<string, string> = {
  "7zip": "7z",
  squashfs: "SquashFS",
};

function chipLabel(id: string, firstExtension: string): string {
  return labelOverrides[id] ?? firstExtension.toUpperCase();
}

// One chip per format, except LHA which surfaces both .lha and .lzh extensions
// — they're file-format peers in practice and worth listing separately.
const formatChips: FormatChip[] = registry.formats.flatMap((f) => {
  if (f.id === "lha") {
    return [
      { id: "lha", label: "LHA" },
      { id: "lzh", label: "LZH" },
    ];
  }
  return [{ id: f.id, label: chipLabel(f.id, f.extensions[0]) }];
});

const compoundChips: FormatChip[] = registry.compounds.map((c) => ({
  id: c.id,
  label: c.id.toUpperCase(),
}));

export const allFormatChips: FormatChip[] = [...formatChips, ...compoundChips]
  .sort((a, b) =>
    a.label.toLowerCase().localeCompare(b.label.toLowerCase()),
  );

// ─── COUNTS ───
// The headline numbers ("43 formats under 66 file extensions") come from here,
// so the site never states a count the registry doesn't back.
const everyFormat = [...registry.formats, ...registry.compounds];
export const formatCount = everyFormat.length;
export const extensionCount = everyFormat.reduce((n, f) => n + f.extensions.length, 0);

// ─── CATEGORIZED LIST (for the press kit's full formats breakdown) ───
// Groups every supported format under the four human-facing categories. LHA/LZH
// stays a single entry here so the total matches formatCount (the chip list
// splits it into two). Labels reuse the same overrides as the chips.

export type FormatCategoryKey =
  | "archives"
  | "compressedTar"
  | "compression"
  | "diskImages";

export interface FormatCategory {
  key: FormatCategoryKey;
  labels: string[];
}

const kindToCategory: Record<string, FormatCategoryKey> = {
  archive: "archives",
  compression: "compression",
  image: "diskImages",
};

function categoryLabel(id: string, firstExtension: string): string {
  if (id === "lha") return "LHA/LZH";
  return labelOverrides[id] ?? firstExtension.toUpperCase();
}

const byLabel = (a: string, b: string) =>
  a.toLowerCase().localeCompare(b.toLowerCase());

export const formatsByCategory: FormatCategory[] = (() => {
  const buckets: Record<FormatCategoryKey, string[]> = {
    archives: [],
    compressedTar: [],
    compression: [],
    diskImages: [],
  };
  for (const f of registry.formats) {
    const category = kindToCategory[f.kind];
    if (category) buckets[category].push(categoryLabel(f.id, f.extensions[0]));
  }
  for (const c of registry.compounds) {
    buckets.compressedTar.push(c.id.toUpperCase());
  }
  return [
    { key: "archives", labels: buckets.archives.sort(byLabel) },
    { key: "compressedTar", labels: buckets.compressedTar.sort(byLabel) },
    { key: "compression", labels: buckets.compression.sort(byLabel) },
    { key: "diskImages", labels: buckets.diskImages.sort(byLabel) },
  ];
})();

// ─── EXTENSION GROUPS (home spec sheet, llms.txt) ───
// Same four categories, one entry per format: its first extension, lower case,
// the way it appears on a file name (7z, tar.gz, dmg).
export const extensionsByCategory: { key: FormatCategoryKey; extensions: string[] }[] = (() => {
  const buckets: Record<FormatCategoryKey, string[]> = {
    archives: [],
    compressedTar: [],
    compression: [],
    diskImages: [],
  };
  for (const f of registry.formats) {
    const category = kindToCategory[f.kind];
    if (category) buckets[category].push(f.extensions[0]);
  }
  for (const c of registry.compounds) buckets.compressedTar.push(c.id);
  return (Object.keys(buckets) as FormatCategoryKey[]).map((key) => ({
    key,
    extensions: buckets[key].sort(byLabel),
  }));
})();
