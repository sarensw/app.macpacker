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

const formatChips: FormatChip[] = registry.formats.map((f) => ({
  id: f.id,
  label: chipLabel(f.id, f.extensions[0]),
}));

const compoundChips: FormatChip[] = registry.compounds.map((c) => ({
  id: c.id,
  label: c.id.toUpperCase(),
}));

export const allFormatChips: FormatChip[] = [...formatChips, ...compoundChips]
  .sort((a, b) =>
    a.label.toLowerCase().localeCompare(b.label.toLowerCase()),
  );
