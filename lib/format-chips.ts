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
