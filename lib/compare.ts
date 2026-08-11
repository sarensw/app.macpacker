/**
 * Mac archiver comparison — MacPacker vs 7-Zip vs The Unarchiver vs Keka vs BetterZip.
 *
 * Compiled 10 August 2026 against the app versions listed in `apps`.
 *
 * This is a customer- and AI-facing page: keep every string here publishable.
 * No internal file or symbol names, no unreleased roadmap, no notes on how a
 * competitor's build was inspected. State what an app does, not how we found out.
 *
 * Deliberately NOT derived from `format-registry.json`: that registry lists which
 * formats MacPacker knows about but carries no read/write capability flags, and the
 * other four apps are not in it at all.
 *
 * Prose fields use a three-token mini-markdown rendered by `RichText`:
 * `**bold**`, `\`code\`` and `[text](url)`.
 */

import { zhCompare } from "./compare-zh";

/** One character per cell: y = yes, p = partial, n = no. */
export type Support = "yes" | "partial" | "no";

export interface CompareApp {
  id: string;
  name: string;
  version: string;
  price: string;
  licence: string;
  requires: string;
  shape: string;
}

export interface FormatRow {
  label: string;
  ext: string;
  /** One "RW" pair per app, in `apps` order, e.g. "yy pn yn yn yn". */
  cells: string;
  /** Cell index (0-based, whitespace ignored) → footnote number. */
  fn?: Record<number, number>;
}

export interface FormatBand {
  id: string;
  label: string;
  rows: FormatRow[];
}

export interface CapabilityRow {
  id: string;
  label: string;
  note: string;
  /** One character per app, in `apps` order. */
  cells: string;
  /** Cell index (0-based) → footnote number, same convention as `FormatRow`. */
  fn?: Record<number, number>;
}

export const apps: CompareApp[] = [
  {
    id: "macpacker",
    name: "MacPacker",
    version: "0.19.0",
    price: "Free",
    licence: "GPL-3.0, open source",
    requires: "macOS 14.6+",
    shape: "Archive browser",
  },
  {
    id: "sevenzip",
    name: "7-Zip",
    version: "26.02 · macOS console build",
    price: "Free",
    licence: "LGPL + BSD, open source",
    requires: "64-bit macOS",
    shape: "Command line only",
  },
  {
    id: "unarchiver",
    name: "The Unarchiver",
    version: "4.3.9 · Mar 2025",
    price: "Free",
    licence: "Proprietary (MacPaw)",
    requires: "macOS 10.13+",
    shape: "Extractor",
  },
  {
    id: "keka",
    name: "Keka",
    version: "1.6.7 · Jun 2026",
    price: "Free; $6.49 App Store",
    licence: "Proprietary",
    requires: "macOS 10.10+",
    shape: "Compressor / extractor",
  },
  {
    id: "betterzip",
    name: "BetterZip",
    version: "6.0.4 · 2026",
    price: "$35 one-time",
    licence: "Proprietary",
    requires: "macOS 13.5+",
    shape: "Archive manager",
  },
];

export const bands: FormatBand[] = [
  {
    id: "everyday-archives",
    label: "Everyday archives",
    rows: [
      { label: "ZIP", ext: ".zip .jar .war .apk .ipa .appx .xpi .epub .cbz", cells: "yy yy yn yy yy", fn: {0: 6, 1: 9, 3: 9, 7: 9, 9: 9} },
      { label: "ZIPX", ext: ".zipx", cells: "yn pn yn yn yn", fn: {2: 1, 8: 2} },
      { label: "7z", ext: ".7z", cells: "yn yy yn yy yy" },
      { label: "RAR / RAR5", ext: ".rar .cbr .r00", cells: "yn yn yn yn yp", fn: {9: 3} },
      { label: "TAR", ext: ".tar", cells: "yn yy yn yy yy" },
      { label: "ARJ", ext: ".arj", cells: "yn yn pn nn yn", fn: {4: 4} },
      { label: "LHA / LZH", ext: ".lha .lzh", cells: "yn yn yn yn yn", fn: {6: 2} },
      { label: "CAB", ext: ".cab", cells: "yn yn yn yn yn" },
      { label: "CHM", ext: ".chm", cells: "yn yn nn nn yn" },
      { label: "CPIO", ext: ".cpio .cpgz", cells: "yn yn yn yn yn" },
      { label: "ACE", ext: ".ace", cells: "nn nn pn yn nn", fn: {4: 5, 6: 2} },
      { label: "ALZip", ext: ".alz", cells: "nn nn yn nn nn" },
      { label: "ARC / PAK", ext: ".arc .pak", cells: "nn nn yn nn nn" },
      { label: "Zoo", ext: ".zoo", cells: "nn nn yn nn nn" },
    ],
  },
  {
    id: "platform-package-formats",
    label: "Platform & package formats",
    rows: [
      { label: "AR", ext: ".ar .a .lib", cells: "yn yn yn nn nn" },
      { label: "Debian package", ext: ".deb", cells: "yn yn yn nn yn" },
      { label: "RPM package", ext: ".rpm", cells: "yn yn yn nn yn" },
      { label: "XAR", ext: ".xar", cells: "yn yn yn yn yy", fn: {6: 2} },
      { label: "Apple installer package", ext: ".pkg", cells: "yn yn yn nn yn", fn: {4: 2, 8: 2} },
      { label: "Apple signed archive", ext: ".xip", cells: "yn yn yn yn yn", fn: {0: 7, 4: 2, 8: 2} },
      { label: "MSI / OLE compound", ext: ".msi .doc .xls", cells: "yn yn yn yn nn" },
      { label: "Self-extracting EXE / NSIS", ext: ".exe .nsis", cells: "yn yn pn yn pn" },
      { label: "Windows imaging", ext: ".wim .swm .esd", cells: "yn yy nn yy yn" },
      { label: "Apple Archive", ext: ".aar .yaa .aea", cells: "nn nn nn yy nn", fn: {6: 10, 7: 10} },
    ],
  },
  {
    id: "legacy-mac-classic-and-long-tail",
    label: "Legacy, Mac-classic and long tail",
    rows: [
      { label: "StuffIt", ext: ".sit", cells: "yn nn yn nn yn" },
      { label: "StuffIt X", ext: ".sitx", cells: "yn nn pn nn yn", fn: {8: 2} },
      { label: "StuffIt self-extracting", ext: ".sea", cells: "yn nn yn nn yn", fn: {4: 2, 8: 2} },
      { label: "Compact Pro", ext: ".cpt", cells: "nn nn yn yn nn" },
      { label: "DiskDoubler / PackIt", ext: ".dd .pit", cells: "nn nn yn nn nn" },
      { label: "BinHex / MacBinary", ext: ".hqx .bin", cells: "nn nn yn nn yn", fn: {4: 2} },
      { label: "LZX", ext: ".lzx", cells: "yn nn yn nn nn" },
      { label: "Amiga ADF / DMS / PowerPacker", ext: ".adf .dms .pp", cells: "nn nn yn nn nn" },
      { label: "CP/M LBR / Squeeze / Crunch", ext: ".lbr", cells: "nn nn yn nn nn" },
      { label: "TNEF mail attachment", ext: "winmail.dat", cells: "nn nn nn nn yn" },
      { label: "WARC web archive", ext: ".warc", cells: "nn nn yn nn nn" },
      { label: "Game data (NDS, NSA, SAR)", ext: ".nds .nsa .sar", cells: "nn nn yn nn nn" },
      { label: "SWF media extraction", ext: ".swf", cells: "nn yn yn nn yn" },
      { label: "PDF image extraction", ext: ".pdf", cells: "nn nn yn nn yn" },
    ],
  },
  {
    id: "single-stream-compression",
    label: "Single-stream compression",
    rows: [
      { label: "GZIP", ext: ".gz", cells: "yn yy yn yy yy" },
      { label: "BZIP2", ext: ".bz2", cells: "yn yy yn yy yy" },
      { label: "XZ", ext: ".xz", cells: "yn yy yn yy yy" },
      { label: "LZMA (raw)", ext: ".lzma", cells: "nn yn yn yn nn" },
      { label: "Unix compress", ext: ".Z", cells: "yn yn yn yn yy", fn: {6: 2} },
      { label: "LZ4", ext: ".lz4", cells: "yn nn nn yn nn", fn: {6: 2} },
      { label: "Zstandard", ext: ".zst", cells: "nn yn nn yy yy" },
      { label: "Brotli", ext: ".br", cells: "nn nn nn yy yy" },
      { label: "lzip", ext: ".lz", cells: "nn nn nn yy nn" },
      { label: "lrzip", ext: ".lrz", cells: "nn nn nn yy nn" },
      { label: "LZO / Snappy", ext: ".lzo .sz", cells: "nn nn nn yn nn", fn: {6: 2} },
    ],
  },
  {
    id: "compound-tar-streams",
    label: "Compound tar streams",
    rows: [
      { label: "tar.gz / tar.bz2 / tar.xz / tar.Z", ext: ".tgz .tbz2 .txz .taz", cells: "yn yp yn yy yy", fn: {3: 8} },
      { label: "tar.lz4", ext: ".tlz4", cells: "yn nn nn yn nn", fn: {6: 2} },
      { label: "tar.zst / tar.br", ext: ".tzst .tbr", cells: "nn pp nn yy yy", fn: {2: 8, 3: 8} },
    ],
  },
  {
    id: "disk-images-and-filesystems",
    label: "Disk images and filesystems",
    rows: [
      { label: "Apple Disk Image", ext: ".dmg .smi", cells: "yn yn nn yy yy" },
      { label: "ISO 9660", ext: ".iso", cells: "yn yn yn yy yy" },
      { label: "Raw disc images", ext: ".bin .mdf .nrg .cdi", cells: "nn nn yn nn nn" },
      { label: "UDF", ext: ".udf .iso", cells: "nn yn nn nn nn" },
      { label: "SquashFS", ext: ".squashfs .sfs", cells: "yn yn nn yn nn", fn: {6: 2} },
      { label: "FAT", ext: ".fat .img", cells: "yn yn nn nn nn" },
      { label: "NTFS", ext: ".ntfs .img", cells: "yn yn nn nn nn" },
      { label: "HFS / HFS+", ext: ".hfs .hfsx", cells: "nn yn nn nn nn" },
      { label: "ext2 / ext3 / ext4", ext: ".ext .img", cells: "nn yn nn nn nn" },
      { label: "APFS", ext: ".apfs .img", cells: "nn yn nn nn nn" },
      { label: "CramFS", ext: ".cramfs", cells: "nn yn nn nn nn" },
      { label: "VirtualBox VDI", ext: ".vdi", cells: "yn yn nn nn nn" },
      { label: "Hyper-V VHD / VHDX", ext: ".vhd .vhdx", cells: "yn yn nn nn nn" },
      { label: "VMware VMDK", ext: ".vmdk", cells: "yn yn nn nn nn" },
      { label: "QEMU QCOW2", ext: ".qcow2", cells: "yn yn nn nn nn" },
      { label: "MBR / GPT partition maps", ext: ".mbr .gpt", cells: "nn yn nn nn nn" },
    ],
  },
];

export const capabilities: CapabilityRow[] = [
  { id: "open-split-multi-volume-sets", label: "Open split / multi-volume sets", note: "Joining archives that arrive as .001, .z01 or .r00 parts.", cells: "p y y y y", fn: {0: 11} },
  { id: "create-split-volumes", label: "Create split volumes", note: "Writing an archive across several sized parts.", cells: "n y n y y" },
  { id: "open-password-protected-archives", label: "Open password-protected archives", note: "Prompting for a password and decrypting on read.", cells: "y y y y y" },
  { id: "write-encrypted-archives", label: "Write encrypted archives", note: "AES-256 on output. MacPacker's save panel exposes format and compression level only.", cells: "n y n y y" },
  { id: "modify-an-archive-in-place", label: "Modify an archive in place", note: "Adding, deleting or renaming entries without a full unpack-and-repack.", cells: "p y n n y", fn: {0: 12} },
  { id: "archive-browser", label: "Archive browser", note: "A window that lists an archive's contents before you extract anything.", cells: "y p n n y", fn: {1: 13} },
  { id: "browse-nested-archives", label: "Browse nested archives", note: "Opening an archive that sits inside another, without extracting the outer one first.", cells: "y n n n n" },
  { id: "finder-quick-look-extensions", label: "Finder / Quick Look extensions", note: "System integration beyond the app window.", cells: "y n n y y" },
  { id: "command-line-interface", label: "Command-line interface", note: "Scriptable from a shell.", cells: "n y p y y", fn: {2: 14} },
];

/** Referenced by number: footnote 1 is `footnotes[0]`. */
export const footnotes: string[] = [
  "7-Zip's ZIP handler registers the `.zipx` extension and decodes the LZMA, PPMd and BZip2 methods WinZip uses, but 7-Zip does not advertise ZIPX as an output format.",
  "Supported in practice, but not listed on the vendor's own published format page.",
  "RAR writing needs the external `rar` command-line tool, which BetterZip can download and install; the RAR licence is bought separately from win.rar GmbH.",
  "The Unarchiver reads ARJ but not multi-part ARJ sets (vendor's own annotation: “No multi-part”).",
  "The Unarchiver reads only pre-2.0 ACE archives — no WinAce (vendor's annotation: “Only old files”).",
  "MacPacker identifies formats by content rather than extension, so any ZIP-based container opens as ZIP whatever it is called.",
  "`.xip` is a XAR container, so MacPacker opens it as one.",
  "Two passes: the tar is built first, then compressed. There is no single command for it.",
  "Writing a JAR, APK, IPA or similar means writing a ZIP container: none of these apps produce the signing or manifests that make a valid platform package.",
  "Keka's AAR is the Apple Archive format (`.aar`, `.yaa`). MacPacker's `.aar` is the unrelated ZIP-based Android Archive.",
  "MacPacker joins split ZIP sets only — spanned (`.z01`…) and numeric (`.zip.001`…). Split RAR or 7z sets are not recognised.",
  "ZIP only.",
  "The macOS build of 7-Zip is a console binary: `7zz l` lists an archive, but there is no window.",
  "The `unar` and `lsar` tools are a separate download from the app.",
];

/** Page chrome + prose. Mirrored key-for-key by `zhCompare`. */
export const copy = {
  eyebrow: "Comparison",
  headline: "How MacPacker compares to 7-Zip, The Unarchiver, Keka and BetterZip",
  deck: "Every archive, package and disk-image format the five macOS archivers handle, side by side — which ones each app can open, and which ones it can create.",
  metaDate: "10 August 2026",
  scope: { formats: "formats", capabilities: "capabilities" },
  /** Head-to-head pages: `pairHeadline` takes the competitor's name. */
  pairHeadline: "MacPacker vs ",
  pairDeck:
    "Which archive, package and disk-image formats each app can open on macOS, and which ones it can create.",
  method: "The read and write totals count the rows of the table below, where one row can stand for a family of formats. Every app counts its own formats differently, so the totals are for orientation and the table is the comparison.",
  matrixIntro: "**Read** means the app can list an archive's contents and extract from it. **Write** means the app can produce that format — creating it, and where noted updating it. A format appears here if at least one of the five supports it.",
  matrixIntroPair: "**Read** means the app can list an archive's contents and extract from it. **Write** means the app can produce that format — creating it, and where noted updating it. Formats neither app handles are left out.",
  capsIntro: "Format coverage is half the picture. These rows cover what you can do with an archive once it opens.",
  compiled: "Compiled 10 August 2026, against the versions listed above.",
  sections: {
    contenders: "The apps",
    matrix: "Format matrix",
    capabilities: "Beyond the format list",
    more: "More comparisons",
    notes: "Notes",
  },
  columns: { read: "Read", write: "Write", format: "Format", capability: "Capability" },
  legend: { yes: "Yes", partial: "Partial", no: "No" },
  reads: "read",
  writes: "write",
  facts: {
    price: "Price",
    licence: "Licence",
    requires: "Needs",
    shape: "Shape",
  },
};

export type CompareCopy = typeof copy;

export interface LocalizedComparison {
  copy: CompareCopy;
  apps: CompareApp[];
  bands: FormatBand[];
  capabilities: CapabilityRow[];
  footnotes: string[];
}

/**
 * English data with the Chinese strings layered on top. Anything zh has not
 * translated falls back to English, the same way `getLocalizedFormat` works.
 */
export function getComparison(locale: string): LocalizedComparison {
  if (locale !== "zh") {
    return { copy, apps, bands, capabilities, footnotes };
  }

  return {
    copy: { ...copy, ...zhCompare.copy },
    apps: apps.map((a) => ({ ...a, ...zhCompare.apps[a.id] })),
    bands: bands.map((b) => ({ ...b, label: zhCompare.bands[b.id] ?? b.label })),
    capabilities: capabilities.map((c) => ({ ...c, ...zhCompare.capabilities[c.id] })),
    footnotes: footnotes.map((f, i) => zhCompare.footnotes[i] ?? f),
  };
}

/**
 * Read / write totals for one app column, counted from the matrix itself so the
 * numbers on the cards always agree with the dots below them. Vendors count
 * formats in incompatible units; the table is the only shared unit we have.
 */
export function countSupport(
  bands: FormatBand[],
  appIndex: number,
): { reads: number; writes: number } {
  let reads = 0;
  let writes = 0;

  for (const band of bands) {
    for (const row of band.rows) {
      const cells = decodeCells(row.cells);
      if (cells[appIndex * 2] !== "no") reads++;
      if (cells[appIndex * 2 + 1] !== "no") writes++;
    }
  }

  return { reads, writes };
}

/** Decode a cells string into one `Support` per cell, ignoring the grouping spaces. */
export function decodeCells(cells: string): Support[] {
  return [...cells.replace(/\s/g, "")].map(
    (c) => (({ y: "yes", p: "partial", n: "no" }) as Record<string, Support>)[c],
  );
}

const CODE: Record<Support, string> = { yes: "y", partial: "p", no: "n" };

/**
 * URL slug → app id for the head-to-head pages. MacPacker is always the other
 * side, so it is not a slug of its own.
 */
const COMPETITOR_SLUGS: Record<string, string> = {
  keka: "keka",
  "the-unarchiver": "unarchiver",
  betterzip: "betterzip",
  "7-zip": "sevenzip",
};

export function getCompetitorSlugs(): string[] {
  return Object.keys(COMPETITOR_SLUGS);
}

export interface PairComparison extends LocalizedComparison {
  /** The app MacPacker is being held against on this page. */
  competitor: CompareApp;
  slug: string;
}

/**
 * MacPacker against one competitor: the same data narrowed to two columns.
 *
 * Rows neither app touches are dropped — on a two-app page they are noise, not
 * information — and the surviving footnotes are renumbered so the Notes list
 * reads 1, 2, 3 instead of keeping the gaps left by the removed columns.
 */
export function getPairComparison(locale: string, slug: string): PairComparison | null {
  const appId = COMPETITOR_SLUGS[slug];
  if (!appId) return null;

  const full = getComparison(locale);
  const other = full.apps.findIndex((a) => a.id === appId);
  if (other < 1) return null;

  // MacPacker is column 0 by construction; keep its pair and the competitor's.
  const keep = [0, 1, other * 2, other * 2 + 1];
  const renumbered: number[] = [];
  const renumber = (old: number) => {
    const seen = renumbered.indexOf(old);
    if (seen >= 0) return seen + 1;
    renumbered.push(old);
    return renumbered.length;
  };

  const pairBands = full.bands
    .map((band) => ({
      ...band,
      rows: band.rows.flatMap((row) => {
        const states = decodeCells(row.cells);
        const kept = keep.map((i) => states[i]);
        if (kept.every((s) => s === "no")) return [];

        const fn: Record<number, number> = {};
        keep.forEach((from, to) => {
          const note = row.fn?.[from];
          if (note) fn[to] = renumber(note);
        });

        return [
          {
            ...row,
            cells: `${CODE[kept[0]]}${CODE[kept[1]]} ${CODE[kept[2]]}${CODE[kept[3]]}`,
            fn: Object.keys(fn).length ? fn : undefined,
          },
        ];
      }),
    }))
    .filter((band) => band.rows.length > 0);

  // Capabilities render after the matrix, so they renumber after it too.
  const pairCapabilities = full.capabilities.flatMap((row) => {
    const states = decodeCells(row.cells);
    const kept = [states[0], states[other]];
    if (kept.every((s) => s === "no")) return [];

    const fn: Record<number, number> = {};
    [0, other].forEach((from, to) => {
      const note = row.fn?.[from];
      if (note) fn[to] = renumber(note);
    });

    return [
      {
        ...row,
        cells: `${CODE[kept[0]]} ${CODE[kept[1]]}`,
        fn: Object.keys(fn).length ? fn : undefined,
      },
    ];
  });

  return {
    ...full,
    slug,
    competitor: full.apps[other],
    apps: [full.apps[0], full.apps[other]],
    bands: pairBands,
    capabilities: pairCapabilities,
    footnotes: renumbered.map((old) => full.footnotes[old - 1]),
  };
}
