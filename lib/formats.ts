/**
 * MacPacker Format Registry
 *
 * Central data source for all supported archive and disk-image formats.
 * Used by the landing page, docs/article pages, sitemap, and WebMCP tools.
 */

export type FormatType = "archive" | "disk-image" | "compression" | "installer";

export interface FormatEntry {
  /** URL slug, e.g. "zip", "7z", "tar-gz" */
  slug: string;
  /** Display name shown in tags & titles, e.g. "ZIP", "7z" */
  displayName: string;
  /** Full descriptive name, e.g. "ZIP Archive" */
  fullName: string;
  /** File extension(s) */
  extensions: string[];
  /** Primary classification */
  type: FormatType;
  /** Whether it appears highlighted in the landing page grid */
  popular: boolean;
  /** One-line format description for meta/intro */
  description: string;
  /** SEO title — follows the required pattern */
  articleTitle: string;
  /** Brief intro paragraph for the article */
  articleIntro: string;
  /** Default macOS extraction method (Terminal, built-in, third-party) */
  defaultMethod: {
    tool: string;
    command?: string;
    steps: string[];
    supportsSelectiveExtraction: boolean;
    notes?: string;
  };
  /** Whether MacPacker supports extracting individual files from this format */
  macpackerSelectiveExtraction: boolean;
  /** High-intent SEO keywords for this format */
  keywords: string[];
  /** FAQ entries for schema markup */
  faqs: { question: string; answer: string }[];
  /** Related format slugs for internal linking */
  relatedFormats: string[];
}

// ─── HELPERS ───

function archiveTitle(name: string): string {
  return `How to Extract Files from a ${name} Archive on macOS`;
}

function diskImageTitle(name: string): string {
  return `How to Extract Files from a ${name} Disk Image on macOS`;
}

function compressionTitle(name: string): string {
  return `How to Extract Files from a ${name} Archive on macOS`;
}

function installerTitle(name: string): string {
  return `How to Extract Files from a ${name} Archive on macOS`;
}

// ─── FORMAT REGISTRY ───

export const formats: FormatEntry[] = [
  // ── Popular Archives ──
  {
    slug: "zip",
    displayName: "ZIP",
    fullName: "ZIP Archive",
    extensions: [".zip"],
    type: "archive",
    popular: true,
    description:
      "ZIP is the most widely used archive format on macOS. It supports lossless compression and is natively handled by Finder and Archive Utility.",
    articleTitle: archiveTitle("ZIP"),
    articleIntro:
      "ZIP is by far the most common archive format you'll encounter on macOS. Whether you downloaded a file from the web, received an email attachment, or exported a project, there's a good chance it arrived as a .zip file. macOS can open ZIP files natively — but extracting specific files from a large ZIP archive requires a more capable tool.",
    defaultMethod: {
      tool: "Archive Utility (built-in)",
      steps: [
        "Double-click the .zip file in Finder.",
        "Archive Utility extracts all contents into a folder next to the original file.",
        "Alternatively, right-click the file and choose \"Open With > Archive Utility\".",
      ],
      supportsSelectiveExtraction: false,
      notes:
        "Archive Utility always extracts the entire archive. There is no built-in way to preview contents or extract individual files.",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "extract zip mac",
      "open zip file macos",
      "unzip specific file mac",
      "extract single file from zip macos",
      "zip archive mac terminal",
      "how to unzip on mac",
    ],
    faqs: [
      {
        question: "How do I open a ZIP file on Mac?",
        answer:
          "Double-click the .zip file in Finder. macOS will automatically extract all contents using Archive Utility. For selective extraction, use MacPacker to browse the archive and drag out only the files you need.",
      },
      {
        question: "Can I extract a single file from a ZIP archive on Mac?",
        answer:
          "The built-in Archive Utility extracts everything at once. To extract individual files, use MacPacker — it lets you browse the archive contents and extract specific files by dragging them out.",
      },
      {
        question: "How do I unzip a file using Terminal on Mac?",
        answer:
          "Open Terminal and run: unzip archive.zip — this extracts all files. To extract a specific file, run: unzip archive.zip path/to/file.txt",
      },
    ],
    relatedFormats: ["7z", "rar", "tar"],
  },
  {
    slug: "rar",
    displayName: "RAR",
    fullName: "RAR Archive",
    extensions: [".rar"],
    type: "archive",
    popular: true,
    description:
      "RAR is a proprietary archive format known for high compression ratios and multi-part archives. macOS has no built-in RAR support.",
    articleTitle: archiveTitle("RAR"),
    articleIntro:
      "RAR archives are common for large file downloads, game mods, and multi-part archives. Unlike ZIP, macOS cannot open RAR files natively — you need a third-party tool like Keka or MacPacker to extract them.",
    defaultMethod: {
      tool: "Keka or unrar (third-party)",
      command: "unrar x archive.rar",
      steps: [
        "Install unrar via Homebrew: brew install unrar",
        "Open Terminal and navigate to the folder containing the .rar file.",
        "Run: unrar x archive.rar",
        "Alternatively, install Keka from the App Store and double-click the .rar file.",
      ],
      supportsSelectiveExtraction: false,
      notes:
        "macOS has no built-in RAR support. Keka extracts the entire archive. The unrar command supports extracting specific files with: unrar e archive.rar path/to/file",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "open rar file mac",
      "extract rar macos",
      "rar extractor mac free",
      "how to open rar on mac",
      "unrar mac terminal",
      "rar archive macos",
    ],
    faqs: [
      {
        question: "How do I open a RAR file on Mac?",
        answer:
          "macOS cannot open RAR files natively. Install a free tool like MacPacker or Keka. With MacPacker, simply open the .rar file to browse its contents and extract what you need.",
      },
      {
        question: "Is there a free RAR extractor for Mac?",
        answer:
          "Yes. MacPacker is a free, open-source archive manager that supports RAR files. You can also use Keka (free from the developer's site) or install unrar via Homebrew.",
      },
      {
        question: "Can I extract a single file from a RAR archive on Mac?",
        answer:
          "With MacPacker, yes — open the .rar file, browse the contents, and drag out only the files you need. With the command line, use: unrar e archive.rar path/to/file",
      },
    ],
    relatedFormats: ["zip", "7z", "tar"],
  },
  {
    slug: "7z",
    displayName: "7z",
    fullName: "7z (7-Zip) Archive",
    extensions: [".7z"],
    type: "archive",
    popular: true,
    description:
      "7z is an open-source archive format with excellent compression. macOS has no built-in 7z support.",
    articleTitle: archiveTitle("7z"),
    articleIntro:
      "7z archives offer some of the best compression ratios available, making them popular for distributing large files. macOS doesn't support 7z natively, so you'll need a third-party tool to open them.",
    defaultMethod: {
      tool: "7zz via Homebrew (third-party)",
      command: "7zz x archive.7z",
      steps: [
        "Install 7-Zip via Homebrew: brew install 7zip",
        "Open Terminal and navigate to the folder containing the .7z file.",
        "Run: 7zz x archive.7z",
        "Alternatively, install Keka and double-click the .7z file.",
      ],
      supportsSelectiveExtraction: false,
      notes:
        "macOS has no built-in 7z support. The 7zz command can list contents with: 7zz l archive.7z, and extract specific files with: 7zz e archive.7z file.txt",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "open 7z file mac",
      "extract 7z macos",
      "7zip mac",
      "how to open 7z on mac",
      "7z extractor macos",
      "7-zip archive mac",
    ],
    faqs: [
      {
        question: "How do I open a 7z file on Mac?",
        answer:
          "macOS cannot open .7z files natively. Use MacPacker (free, open-source) to open and browse 7z archives. Alternatively, install 7-Zip via Homebrew: brew install 7zip, then run: 7zz x archive.7z",
      },
      {
        question: "What is the best 7z extractor for Mac?",
        answer:
          "MacPacker is a free, native macOS app that opens 7z files with a visual file browser. It lets you preview contents, navigate nested archives, and extract individual files — features that command-line tools don't offer.",
      },
      {
        question: "Can I extract specific files from a 7z archive on Mac?",
        answer:
          "Yes. MacPacker lets you browse the 7z archive and drag out specific files. With the command line, use: 7zz e archive.7z path/to/file",
      },
    ],
    relatedFormats: ["zip", "rar", "xz"],
  },
  {
    slug: "tar",
    displayName: "TAR",
    fullName: "TAR Archive",
    extensions: [".tar"],
    type: "archive",
    popular: true,
    description:
      "TAR (tape archive) bundles files without compression. Often combined with GZ, BZ2, or XZ for compressed archives. Natively supported via Terminal on macOS.",
    articleTitle: archiveTitle("TAR"),
    articleIntro:
      "TAR is a Unix staple for bundling files together. While TAR itself doesn't compress data, it's almost always paired with a compression algorithm (gzip, bzip2, xz) to create .tar.gz, .tar.bz2, or .tar.xz files. macOS supports TAR natively through Terminal.",
    defaultMethod: {
      tool: "Terminal (built-in)",
      command: "tar xf archive.tar",
      steps: [
        "Open Terminal.",
        "Navigate to the folder containing the .tar file.",
        "Run: tar xf archive.tar",
        "For compressed variants: tar xzf archive.tar.gz, tar xjf archive.tar.bz2, or tar xJf archive.tar.xz",
      ],
      supportsSelectiveExtraction: true,
      notes:
        "The tar command supports extracting specific files: tar xf archive.tar path/to/file. You can list contents first with: tar tf archive.tar",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "extract tar mac",
      "open tar file macos",
      "tar command mac",
      "untar mac terminal",
      "extract tar.gz macos",
      "tar archive mac",
    ],
    faqs: [
      {
        question: "How do I extract a TAR file on Mac?",
        answer:
          "Open Terminal and run: tar xf archive.tar — this extracts all files into the current directory. For .tar.gz files, use: tar xzf archive.tar.gz",
      },
      {
        question: "Can I preview the contents of a TAR file without extracting?",
        answer:
          "In Terminal, run: tar tf archive.tar to list all files. For a visual file browser with Quick Look support, use MacPacker — it lets you navigate the archive like a folder.",
      },
      {
        question: "Can I extract a single file from a TAR archive on Mac?",
        answer:
          "Yes. In Terminal, run: tar xf archive.tar path/to/file — this extracts only the specified file. MacPacker also supports selective extraction via drag and drop.",
      },
    ],
    relatedFormats: ["gz", "bz2", "xz", "tar-z"],
  },

  // ── Compression Formats ──
  {
    slug: "gz",
    displayName: "GZ",
    fullName: "Gzip Compressed Archive",
    extensions: [".gz", ".tar.gz", ".tgz"],
    type: "compression",
    popular: false,
    description:
      "Gzip is the most common compression format on Unix/macOS. Usually wraps a TAR archive to create .tar.gz files. Natively supported on macOS.",
    articleTitle: compressionTitle("GZ (Gzip)"),
    articleIntro:
      "GZ (Gzip) is the standard compression format in the Unix world. On macOS, you'll most often encounter it as .tar.gz or .tgz files — a TAR archive compressed with Gzip. macOS handles Gzip natively through both Archive Utility and Terminal.",
    defaultMethod: {
      tool: "Terminal (built-in)",
      command: "gunzip file.gz",
      steps: [
        "For standalone .gz files: gunzip file.gz (decompresses in place).",
        "For .tar.gz archives: tar xzf archive.tar.gz",
        "Double-clicking a .tar.gz in Finder will also extract it via Archive Utility.",
      ],
      supportsSelectiveExtraction: false,
      notes:
        "Archive Utility extracts everything. Terminal's tar command supports selective extraction from .tar.gz: tar xzf archive.tar.gz path/to/file",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "extract gz mac",
      "open gz file macos",
      "gunzip mac",
      "tar.gz extract macos",
      "gzip macos terminal",
    ],
    faqs: [
      {
        question: "How do I extract a .gz file on Mac?",
        answer:
          "For a standalone .gz file, open Terminal and run: gunzip file.gz. For .tar.gz archives, run: tar xzf archive.tar.gz. You can also double-click .tar.gz files in Finder.",
      },
      {
        question: "Can I extract specific files from a .tar.gz archive?",
        answer:
          "Yes. In Terminal: tar xzf archive.tar.gz path/to/file. With MacPacker, browse the archive visually and drag out individual files.",
      },
    ],
    relatedFormats: ["tar", "bz2", "xz"],
  },
  {
    slug: "bz2",
    displayName: "BZ2",
    fullName: "Bzip2 Compressed Archive",
    extensions: [".bz2", ".tar.bz2", ".tbz2"],
    type: "compression",
    popular: false,
    description:
      "Bzip2 offers better compression than Gzip at the cost of speed. Common for source code distributions and Linux packages.",
    articleTitle: compressionTitle("BZ2 (Bzip2)"),
    articleIntro:
      "BZ2 (Bzip2) provides higher compression ratios than Gzip, making it popular for distributing source code and large datasets. macOS supports Bzip2 natively through Terminal.",
    defaultMethod: {
      tool: "Terminal (built-in)",
      command: "bunzip2 file.bz2",
      steps: [
        "For standalone .bz2 files: bunzip2 file.bz2 (decompresses in place).",
        "For .tar.bz2 archives: tar xjf archive.tar.bz2",
        "Double-clicking a .tar.bz2 in Finder will also extract it via Archive Utility.",
      ],
      supportsSelectiveExtraction: false,
      notes:
        "Terminal's tar command supports selective extraction: tar xjf archive.tar.bz2 path/to/file",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "extract bz2 mac",
      "open bz2 file macos",
      "bunzip2 mac",
      "tar.bz2 extract macos",
      "bzip2 macos",
    ],
    faqs: [
      {
        question: "How do I extract a .bz2 file on Mac?",
        answer:
          "Open Terminal and run: bunzip2 file.bz2. For .tar.bz2 archives, run: tar xjf archive.tar.bz2. Finder can also handle .tar.bz2 via Archive Utility.",
      },
      {
        question: "What is the difference between .gz and .bz2?",
        answer:
          "Both are compression formats. Bzip2 (.bz2) achieves better compression ratios but is slower than Gzip (.gz). For most users, the difference is negligible — both work on macOS.",
      },
    ],
    relatedFormats: ["tar", "gz", "xz"],
  },
  {
    slug: "xz",
    displayName: "XZ",
    fullName: "XZ Compressed Archive",
    extensions: [".xz", ".tar.xz", ".txz"],
    type: "compression",
    popular: false,
    description:
      "XZ uses LZMA2 compression for excellent compression ratios. Common in Linux distributions and large software packages.",
    articleTitle: compressionTitle("XZ"),
    articleIntro:
      "XZ compression uses the LZMA2 algorithm to achieve some of the best compression ratios available. It's widely used in Linux package managers and for distributing large software packages. macOS supports XZ through Terminal.",
    defaultMethod: {
      tool: "Terminal (built-in)",
      command: "xz -d file.xz",
      steps: [
        "For standalone .xz files: xz -d file.xz (decompresses in place).",
        "For .tar.xz archives: tar xJf archive.tar.xz",
        "If xz is not installed, get it via Homebrew: brew install xz",
      ],
      supportsSelectiveExtraction: false,
      notes:
        "The xz command comes pre-installed on recent macOS versions. Terminal's tar command supports selective extraction: tar xJf archive.tar.xz path/to/file",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "extract xz mac",
      "open xz file macos",
      "tar.xz extract macos",
      "xz decompress mac",
      "lzma2 macos",
    ],
    faqs: [
      {
        question: "How do I extract a .xz file on Mac?",
        answer:
          "Open Terminal and run: xz -d file.xz. For .tar.xz archives: tar xJf archive.tar.xz. Note the capital J flag for xz-compressed tar archives.",
      },
      {
        question: "Is XZ supported on macOS?",
        answer:
          "Yes. Recent macOS versions include the xz command. You can also open .xz and .tar.xz files with MacPacker for a visual browsing experience.",
      },
    ],
    relatedFormats: ["tar", "gz", "bz2", "7z"],
  },
  {
    slug: "lz4",
    displayName: "LZ4",
    fullName: "LZ4 Compressed Archive",
    extensions: [".lz4", ".tar.lz4"],
    type: "compression",
    popular: false,
    description:
      "LZ4 prioritizes speed over compression ratio. Used in real-time applications and Apple's own APFS filesystem.",
    articleTitle: compressionTitle("LZ4"),
    articleIntro:
      "LZ4 is an extremely fast compression algorithm that trades compression ratio for speed. Apple uses LZ4 internally in APFS, and it's common in real-time data processing. macOS can handle LZ4 via Homebrew tools.",
    defaultMethod: {
      tool: "lz4 via Homebrew (third-party)",
      command: "lz4 -d file.lz4 file",
      steps: [
        "Install lz4 via Homebrew: brew install lz4",
        "Decompress: lz4 -d file.lz4 file",
        "For .tar.lz4: lz4 -d archive.tar.lz4 | tar xf -",
      ],
      supportsSelectiveExtraction: false,
      notes: "macOS does not include lz4 command-line tools by default.",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "extract lz4 mac",
      "open lz4 file macos",
      "lz4 decompress mac",
      "lz4 macos terminal",
    ],
    faqs: [
      {
        question: "How do I open an LZ4 file on Mac?",
        answer:
          "Install lz4 via Homebrew (brew install lz4), then run: lz4 -d file.lz4 output. For a visual approach, MacPacker can open LZ4 files directly.",
      },
      {
        question: "What is LZ4 compression?",
        answer:
          "LZ4 is an extremely fast lossless compression algorithm. It's optimized for speed rather than compression ratio, making it ideal for real-time applications. Apple uses LZ4 in APFS.",
      },
    ],
    relatedFormats: ["gz", "xz", "bz2"],
  },
  {
    slug: "z",
    displayName: "Z",
    fullName: "Unix Compress Archive",
    extensions: [".Z"],
    type: "compression",
    popular: false,
    description:
      "The original Unix compress format. Largely superseded by Gzip but still found in legacy systems and old archives.",
    articleTitle: compressionTitle("Z (Unix Compress)"),
    articleIntro:
      "The .Z format is the original Unix compression format, created by the compress utility. While largely replaced by Gzip and newer formats, you may still encounter .Z files in legacy systems, old FTP archives, and historical software distributions.",
    defaultMethod: {
      tool: "Terminal (built-in)",
      command: "uncompress file.Z",
      steps: [
        "Open Terminal.",
        "Run: uncompress file.Z (decompresses in place).",
        "Alternatively: gzip -d file.Z (Gzip can decompress .Z files).",
      ],
      supportsSelectiveExtraction: false,
      notes: "The uncompress command is available on macOS. For .tar.Z files, use: uncompress -c archive.tar.Z | tar xf -",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "extract Z file mac",
      "uncompress mac",
      "unix compress macos",
      ".Z file mac",
    ],
    faqs: [
      {
        question: "How do I open a .Z file on Mac?",
        answer:
          "Open Terminal and run: uncompress file.Z — this decompresses the file in place. You can also use: gzip -d file.Z since Gzip is backwards-compatible with Unix compress.",
      },
    ],
    relatedFormats: ["gz", "tar-z", "tar"],
  },

  // ── Disk Images (Popular) ──
  {
    slug: "dmg",
    displayName: "DMG",
    fullName: "Apple Disk Image",
    extensions: [".dmg"],
    type: "disk-image",
    popular: true,
    description:
      "DMG is Apple's native disk image format. It's the standard way to distribute macOS applications. macOS handles DMG files natively.",
    articleTitle: diskImageTitle("DMG"),
    articleIntro:
      "DMG (Apple Disk Image) is the standard format for distributing macOS software. When you download an app from a developer's website, it almost always comes as a .dmg file. macOS mounts DMG files natively, but extracting specific files from complex DMG images can be challenging.",
    defaultMethod: {
      tool: "Finder / hdiutil (built-in)",
      command: "hdiutil attach image.dmg",
      steps: [
        "Double-click the .dmg file in Finder to mount it.",
        "The disk image appears as a volume in Finder's sidebar.",
        "Drag the app or files to your desired location.",
        "Eject the volume when done by clicking the eject icon.",
        "From Terminal: hdiutil attach image.dmg",
      ],
      supportsSelectiveExtraction: true,
      notes:
        "macOS mounts DMG files as virtual drives. You can browse and copy files freely, but this requires mounting. Encrypted DMG files will prompt for a password.",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "open dmg file mac",
      "extract dmg macos",
      "dmg to folder mac",
      "mount dmg terminal",
      "apple disk image extract",
      "dmg file macos",
    ],
    faqs: [
      {
        question: "How do I open a DMG file on Mac?",
        answer:
          "Double-click the .dmg file in Finder. macOS will mount it as a virtual drive. You can then drag files from the mounted volume. With MacPacker, you can browse DMG contents directly without mounting.",
      },
      {
        question: "How do I extract a DMG file without mounting it?",
        answer:
          "MacPacker lets you browse DMG contents like a folder — no mounting required. From Terminal, you can use: hdiutil attach image.dmg to mount, or use 7zz to extract: 7zz x image.dmg",
      },
      {
        question: "Can I open a DMG file on Windows?",
        answer:
          "DMG is a macOS-specific format. On macOS, use MacPacker or Finder to open DMG files. On other platforms, specialized tools like 7-Zip can extract DMG contents.",
      },
    ],
    relatedFormats: ["iso", "pkg", "apfs"],
  },
  {
    slug: "iso",
    displayName: "ISO",
    fullName: "ISO Disk Image",
    extensions: [".iso"],
    type: "disk-image",
    popular: true,
    description:
      "ISO is the standard disk image format for optical media. Used for OS installers, software distributions, and disc backups.",
    articleTitle: diskImageTitle("ISO"),
    articleIntro:
      "ISO files are sector-by-sector copies of optical discs. They're commonly used for operating system installers, bootable media, and large software distributions. macOS can mount ISO files natively, but extracting individual files requires additional steps.",
    defaultMethod: {
      tool: "Finder / hdiutil (built-in)",
      command: "hdiutil attach image.iso",
      steps: [
        "Double-click the .iso file in Finder to mount it.",
        "The ISO mounts as a read-only volume.",
        "Browse and copy files from the mounted volume.",
        "Eject when done using the sidebar eject icon.",
        "From Terminal: hdiutil attach image.iso",
      ],
      supportsSelectiveExtraction: true,
      notes:
        "macOS mounts ISO images as read-only volumes. You can copy files out freely. Some ISO files may not mount if they use unusual filesystems.",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "open iso file mac",
      "extract iso macos",
      "mount iso terminal mac",
      "iso to folder macos",
      "iso image extract mac",
    ],
    faqs: [
      {
        question: "How do I open an ISO file on Mac?",
        answer:
          "Double-click the .iso file in Finder to mount it as a virtual drive. You can then browse and copy files. With MacPacker, you can browse ISO contents directly without mounting.",
      },
      {
        question: "Can I extract files from an ISO without mounting?",
        answer:
          "Yes. MacPacker lets you browse ISO contents like a folder and extract individual files without mounting. Alternatively, use 7zz from the command line: 7zz x image.iso",
      },
    ],
    relatedFormats: ["dmg", "vmdk", "vhd"],
  },
  {
    slug: "pkg",
    displayName: "PKG",
    fullName: "macOS Installer Package",
    extensions: [".pkg"],
    type: "installer",
    popular: true,
    description:
      "PKG is Apple's installer package format. Used for macOS software that requires system-level installation.",
    articleTitle: installerTitle("PKG"),
    articleIntro:
      "PKG files are macOS installer packages used for software that needs system-level installation — drivers, frameworks, system utilities, and enterprise software. While macOS handles PKG installation natively, inspecting the contents of a PKG file before running it is a smart security practice.",
    defaultMethod: {
      tool: "Installer.app / pkgutil (built-in)",
      command: "pkgutil --expand package.pkg output_dir",
      steps: [
        "To install: double-click the .pkg file and follow the installer wizard.",
        "To inspect contents before installing: pkgutil --payload-files package.pkg",
        "To expand the package: pkgutil --expand package.pkg output_dir",
        "To extract payload: cd output_dir && cat Payload | cpio -id",
      ],
      supportsSelectiveExtraction: false,
      notes:
        "pkgutil can list and expand packages, but the workflow is complex. MacPacker provides a visual browser for PKG contents.",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "open pkg file mac",
      "inspect pkg macos",
      "extract pkg without installing",
      "pkgutil extract mac",
      "view pkg contents mac",
      "pkg file mac inspect",
    ],
    faqs: [
      {
        question: "How do I inspect a PKG file before installing on Mac?",
        answer:
          "Use MacPacker to open the .pkg file and browse its contents without installing. From Terminal, run: pkgutil --payload-files package.pkg to list the files it would install.",
      },
      {
        question: "Can I extract a PKG file without installing it?",
        answer:
          "Yes. Use MacPacker to browse and extract specific files visually. From Terminal: pkgutil --expand package.pkg output_dir to expand the package structure.",
      },
      {
        question: "Is it safe to open a PKG file on Mac?",
        answer:
          "PKG files run installer scripts that can modify your system. Always verify the source. Use MacPacker to inspect PKG contents before installing — you can see exactly what files it contains.",
      },
    ],
    relatedFormats: ["dmg", "xar", "zip"],
  },

  // ── Other Archive Formats ──
  {
    slug: "cab",
    displayName: "CAB",
    fullName: "Windows Cabinet Archive",
    extensions: [".cab"],
    type: "archive",
    popular: false,
    description:
      "CAB (Cabinet) is Microsoft's archive format used in Windows installers and updates. macOS has no built-in CAB support.",
    articleTitle: archiveTitle("CAB (Windows Cabinet)"),
    articleIntro:
      "CAB (Cabinet) files are Microsoft's archive format, commonly found in Windows installer packages, driver distributions, and Windows Update files. If you're working cross-platform or dealing with Windows software on your Mac, you may need to extract CAB files.",
    defaultMethod: {
      tool: "cabextract via Homebrew (third-party)",
      command: "cabextract archive.cab",
      steps: [
        "Install cabextract via Homebrew: brew install cabextract",
        "Run: cabextract archive.cab",
        "Files are extracted to the current directory.",
      ],
      supportsSelectiveExtraction: false,
      notes: "macOS has no built-in CAB support. cabextract always extracts all files.",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "open cab file mac",
      "extract cab macos",
      "cabinet archive mac",
      "cab extractor macos",
      "windows cab file mac",
    ],
    faqs: [
      {
        question: "How do I open a CAB file on Mac?",
        answer:
          "macOS cannot open CAB files natively. Use MacPacker to browse and extract CAB archives visually. Alternatively, install cabextract via Homebrew: brew install cabextract, then run: cabextract archive.cab",
      },
    ],
    relatedFormats: ["zip", "7z"],
  },
  {
    slug: "cpio",
    displayName: "CPIO",
    fullName: "CPIO Archive",
    extensions: [".cpio"],
    type: "archive",
    popular: false,
    description:
      "CPIO is a Unix archive format used in RPM packages, initramfs images, and macOS PKG payloads. Supported natively on macOS via Terminal.",
    articleTitle: archiveTitle("CPIO"),
    articleIntro:
      "CPIO (Copy In/Copy Out) is a Unix archive format used internally by macOS installer packages (PKG files), Linux RPM packages, and initramfs images. While not commonly encountered directly, knowing how to handle CPIO files can be useful for developers and system administrators.",
    defaultMethod: {
      tool: "Terminal (built-in)",
      command: "cpio -id < archive.cpio",
      steps: [
        "Open Terminal.",
        "Navigate to the desired output directory.",
        "Run: cpio -id < archive.cpio",
        "To list contents: cpio -it < archive.cpio",
      ],
      supportsSelectiveExtraction: false,
      notes: "The cpio command is available on macOS. It reads from stdin, so use < redirection.",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "extract cpio mac",
      "open cpio file macos",
      "cpio command mac",
      "cpio archive extract",
    ],
    faqs: [
      {
        question: "How do I extract a CPIO file on Mac?",
        answer:
          "Open Terminal and run: cpio -id < archive.cpio. To list contents first: cpio -it < archive.cpio. MacPacker also supports CPIO files with visual browsing.",
      },
    ],
    relatedFormats: ["tar", "pkg", "xar"],
  },
  {
    slug: "xar",
    displayName: "XAR",
    fullName: "XAR Archive",
    extensions: [".xar"],
    type: "archive",
    popular: false,
    description:
      "XAR (eXtensible ARchive) is Apple's archive format used internally for PKG installers and Xcode distributions.",
    articleTitle: archiveTitle("XAR"),
    articleIntro:
      "XAR (eXtensible ARchive) is an archive format designed by Apple, used internally for macOS installer packages (.pkg files) and Xcode components. While you rarely encounter standalone .xar files, understanding the format helps when inspecting macOS packages.",
    defaultMethod: {
      tool: "Terminal (built-in)",
      command: "xar -xf archive.xar",
      steps: [
        "Open Terminal.",
        "Run: xar -xf archive.xar",
        "To list contents: xar -tf archive.xar",
      ],
      supportsSelectiveExtraction: false,
      notes: "The xar command is available on macOS. It's the native tool for XAR archives.",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "extract xar mac",
      "open xar file macos",
      "xar archive mac",
      "apple xar format",
    ],
    faqs: [
      {
        question: "What is a XAR file?",
        answer:
          "XAR (eXtensible ARchive) is Apple's archive format. It's used internally by macOS installer packages (.pkg). You can extract XAR files with: xar -xf archive.xar or browse them visually with MacPacker.",
      },
    ],
    relatedFormats: ["pkg", "cpio", "tar"],
  },
  {
    slug: "sit",
    displayName: "SIT",
    fullName: "StuffIt Archive",
    extensions: [".sit", ".sitx"],
    type: "archive",
    popular: false,
    description:
      "StuffIt was the dominant Mac compression format in the Classic Mac OS era. Legacy format still found in old archives.",
    articleTitle: archiveTitle("SIT (StuffIt)"),
    articleIntro:
      "StuffIt (.sit) was the dominant archive format on classic Mac OS throughout the 1990s and early 2000s. While largely replaced by ZIP, you may encounter SIT files when accessing legacy Mac software, vintage archives, or old Mac-formatted media.",
    defaultMethod: {
      tool: "The Unarchiver (third-party)",
      steps: [
        "Install The Unarchiver from the Mac App Store (free).",
        "Right-click the .sit file and choose \"Open With > The Unarchiver\".",
        "Files are extracted to a folder next to the original.",
        "Alternatively, use MacPacker which also supports StuffIt archives.",
      ],
      supportsSelectiveExtraction: false,
      notes:
        "macOS has no built-in StuffIt support. The original StuffIt Expander is discontinued. The Unarchiver or MacPacker can handle .sit files.",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "open sit file mac",
      "stuffit archive macos",
      "extract sit file mac",
      "stuffit expander mac",
      "legacy mac archive",
    ],
    faqs: [
      {
        question: "How do I open a StuffIt (.sit) file on modern macOS?",
        answer:
          "macOS no longer includes StuffIt support. Use MacPacker (free, open-source) or The Unarchiver to open .sit files. MacPacker lets you browse the archive contents before extracting.",
      },
    ],
    relatedFormats: ["sea", "zip", "rar"],
  },
  {
    slug: "sea",
    displayName: "SEA",
    fullName: "Self-Extracting Archive",
    extensions: [".sea"],
    type: "archive",
    popular: false,
    description:
      "Self-Extracting Archives were common in the Classic Mac OS era. They contain both the archive data and extraction code.",
    articleTitle: archiveTitle("SEA (Self-Extracting)"),
    articleIntro:
      "SEA (Self-Extracting Archive) files were common in the classic Mac OS era. They bundle the archive data with extraction code, so the recipient didn't need separate decompression software. Modern macOS cannot run classic SEA files, but tools like MacPacker can extract their contents.",
    defaultMethod: {
      tool: "The Unarchiver or MacPacker (third-party)",
      steps: [
        "Install MacPacker or The Unarchiver.",
        "Open the .sea file with the chosen application.",
        "The contents are extracted to a folder.",
      ],
      supportsSelectiveExtraction: false,
      notes:
        "Modern macOS cannot execute classic SEA files. They must be treated as archives and extracted with a compatible tool.",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "open sea file mac",
      "self extracting archive macos",
      "extract sea file mac",
      "classic mac archive",
    ],
    faqs: [
      {
        question: "How do I open a SEA file on modern macOS?",
        answer:
          "Modern macOS cannot run classic self-extracting archives. Use MacPacker to open .sea files as regular archives — browse the contents and extract what you need.",
      },
    ],
    relatedFormats: ["sit", "zip"],
  },
  {
    slug: "arj",
    displayName: "ARJ",
    fullName: "ARJ Archive",
    extensions: [".arj"],
    type: "archive",
    popular: false,
    description:
      "ARJ was a popular DOS-era archive format. Rarely used today but still found in legacy archives and retro computing.",
    articleTitle: archiveTitle("ARJ"),
    articleIntro:
      "ARJ (Archived by Robert Jung) was a popular archive format in the DOS era, known for multi-volume archive support. While rarely used today, you may encounter ARJ files when working with retro computing resources or legacy data archives.",
    defaultMethod: {
      tool: "7zz via Homebrew (third-party)",
      command: "7zz x archive.arj",
      steps: [
        "Install 7-Zip via Homebrew: brew install 7zip",
        "Run: 7zz x archive.arj",
      ],
      supportsSelectiveExtraction: false,
      notes: "macOS has no built-in ARJ support. 7-Zip can extract ARJ archives.",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "open arj file mac",
      "extract arj macos",
      "arj archive mac",
      "arj extractor mac",
    ],
    faqs: [
      {
        question: "How do I open an ARJ file on Mac?",
        answer:
          "macOS doesn't support ARJ natively. Use MacPacker to browse and extract ARJ archives visually, or install 7-Zip via Homebrew and run: 7zz x archive.arj",
      },
    ],
    relatedFormats: ["zip", "rar", "lha"],
  },
  {
    slug: "lha",
    displayName: "LHA",
    fullName: "LHA Archive",
    extensions: [".lha", ".lzh"],
    type: "archive",
    popular: false,
    description:
      "LHA (also known as LZH) is a Japanese archive format popular in retro computing and the Amiga community.",
    articleTitle: archiveTitle("LHA/LZH"),
    articleIntro:
      "LHA (also known as LZH or LHarc) is an archive format that was especially popular in Japan and the Amiga computing community. While uncommon today, LHA archives are still found in retro computing archives, Japanese software distributions, and Amiga preservation projects.",
    defaultMethod: {
      tool: "lha via Homebrew (third-party)",
      command: "lha x archive.lha",
      steps: [
        "Install lha via Homebrew: brew install lha",
        "Run: lha x archive.lha",
        "Alternatively, use 7-Zip: 7zz x archive.lha",
      ],
      supportsSelectiveExtraction: false,
      notes: "macOS has no built-in LHA support.",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "open lha file mac",
      "extract lha macos",
      "lzh file mac",
      "lha archive extractor mac",
    ],
    faqs: [
      {
        question: "How do I open an LHA or LZH file on Mac?",
        answer:
          "Use MacPacker to open LHA/LZH files with a visual browser. Alternatively, install lha via Homebrew (brew install lha) and run: lha x archive.lha",
      },
    ],
    relatedFormats: ["lzh", "arj", "zip"],
  },
  {
    slug: "lzh",
    displayName: "LZH",
    fullName: "LZH Archive",
    extensions: [".lzh"],
    type: "archive",
    popular: false,
    description:
      "LZH is an alternative extension for LHA archives, particularly common in Japanese computing.",
    articleTitle: archiveTitle("LZH"),
    articleIntro:
      "LZH files use the same format as LHA — the extension is simply an alternative naming convention that was particularly popular in Japanese computing. If you've encountered a .lzh file on macOS, the extraction process is identical to LHA.",
    defaultMethod: {
      tool: "lha via Homebrew (third-party)",
      command: "lha x archive.lzh",
      steps: [
        "Install lha via Homebrew: brew install lha",
        "Run: lha x archive.lzh",
        "Alternatively, use 7-Zip: 7zz x archive.lzh",
      ],
      supportsSelectiveExtraction: false,
      notes: "LZH and LHA are the same format with different extensions.",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "open lzh file mac",
      "extract lzh macos",
      "lzh archive mac",
    ],
    faqs: [
      {
        question: "What is the difference between LHA and LZH?",
        answer:
          "LHA and LZH are the same archive format. The .lzh extension is an alternative naming convention. Both can be opened with MacPacker or extracted with the lha command-line tool.",
      },
    ],
    relatedFormats: ["lha", "arj", "zip"],
  },
  {
    slug: "lzx",
    displayName: "LZX",
    fullName: "LZX Archive",
    extensions: [".lzx"],
    type: "archive",
    popular: false,
    description:
      "LZX is an Amiga archive format. Very rare today, primarily found in Amiga software preservation.",
    articleTitle: archiveTitle("LZX"),
    articleIntro:
      "LZX is a compression format from the Amiga computing platform. It's extremely rare on modern systems but may be encountered when working with Amiga software preservation archives or retro computing collections.",
    defaultMethod: {
      tool: "7zz via Homebrew (third-party)",
      command: "7zz x archive.lzx",
      steps: [
        "Install 7-Zip via Homebrew: brew install 7zip",
        "Run: 7zz x archive.lzx",
      ],
      supportsSelectiveExtraction: false,
      notes: "macOS has no built-in LZX support. 7-Zip or MacPacker can handle LZX archives.",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "open lzx file mac",
      "extract lzx macos",
      "lzx amiga archive mac",
    ],
    faqs: [
      {
        question: "How do I open an LZX file on Mac?",
        answer:
          "LZX is an Amiga archive format. Use MacPacker to browse and extract LZX files visually, or install 7-Zip via Homebrew and run: 7zz x archive.lzx",
      },
    ],
    relatedFormats: ["lha", "arj"],
  },
  {
    slug: "chm",
    displayName: "CHM",
    fullName: "Compiled HTML Help Archive",
    extensions: [".chm"],
    type: "archive",
    popular: false,
    description:
      "CHM (Compiled HTML Help) is Microsoft's help documentation format. Contains compressed HTML, images, and an index.",
    articleTitle: archiveTitle("CHM"),
    articleIntro:
      "CHM (Compiled HTML Help) files are Microsoft's documentation format, containing compressed HTML pages, images, and a search index. You may encounter CHM files when accessing Windows software documentation, technical manuals, or programming references on your Mac.",
    defaultMethod: {
      tool: "7zz via Homebrew or extract-chm (third-party)",
      command: "7zz x file.chm -ooutput_dir",
      steps: [
        "Install 7-Zip via Homebrew: brew install 7zip",
        "Extract: 7zz x file.chm -ooutput_dir",
        "Open the extracted HTML files in a browser.",
        "For reading CHM directly, install iCHM from the App Store.",
      ],
      supportsSelectiveExtraction: false,
      notes:
        "macOS has no built-in CHM viewer. Extracting with 7-Zip gives you the raw HTML/image files. MacPacker can browse CHM contents.",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "open chm file mac",
      "chm reader macos",
      "extract chm mac",
      "chm viewer mac",
      "compiled html help mac",
    ],
    faqs: [
      {
        question: "How do I read a CHM file on Mac?",
        answer:
          "macOS has no built-in CHM reader. Use MacPacker to browse and extract CHM contents, or install iCHM from the App Store for a dedicated reader. You can also extract the HTML with: 7zz x file.chm",
      },
    ],
    relatedFormats: ["zip", "cab"],
  },

  // ── Filesystem / Disk Image Formats ──
  {
    slug: "apfs",
    displayName: "APFS",
    fullName: "Apple File System Image",
    extensions: [".apfs"],
    type: "disk-image",
    popular: false,
    description:
      "APFS (Apple File System) is Apple's modern filesystem. APFS disk images are used for macOS volumes and backups.",
    articleTitle: diskImageTitle("APFS"),
    articleIntro:
      "APFS (Apple File System) is Apple's modern filesystem, introduced in macOS High Sierra. APFS disk images are used for macOS recovery volumes, Time Machine backups, and containerized storage. Accessing APFS images outside of their original context typically requires specialized tools.",
    defaultMethod: {
      tool: "hdiutil / Disk Utility (built-in)",
      command: "hdiutil attach image.apfs",
      steps: [
        "If the APFS image is within a DMG container, double-click to mount.",
        "For standalone APFS containers, use Disk Utility to attempt mounting.",
        "From Terminal: hdiutil attach image.dmg (if APFS is inside a DMG).",
      ],
      supportsSelectiveExtraction: false,
      notes:
        "Standalone APFS images may not mount directly. MacPacker can browse APFS container contents without mounting.",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "open apfs image mac",
      "apfs disk image macos",
      "extract apfs mac",
      "apple file system image",
    ],
    faqs: [
      {
        question: "How do I access files in an APFS disk image?",
        answer:
          "If the APFS image is inside a DMG, double-click to mount it. For standalone APFS images, use MacPacker to browse the contents without mounting.",
      },
    ],
    relatedFormats: ["dmg", "fat", "ntfs"],
  },
  {
    slug: "fat",
    displayName: "FAT",
    fullName: "FAT Filesystem Image",
    extensions: [".fat", ".img"],
    type: "disk-image",
    popular: false,
    description:
      "FAT (File Allocation Table) filesystem images are used for USB drives, SD cards, and cross-platform storage.",
    articleTitle: diskImageTitle("FAT"),
    articleIntro:
      "FAT (File Allocation Table) is a widely compatible filesystem used in USB drives, SD cards, and embedded systems. FAT disk images (.img) are common in embedded development, Raspberry Pi distributions, and cross-platform file sharing.",
    defaultMethod: {
      tool: "hdiutil (built-in)",
      command: "hdiutil attach image.img",
      steps: [
        "From Terminal: hdiutil attach image.img",
        "The FAT image mounts as a volume in Finder.",
        "Browse and copy files freely.",
        "Eject when done.",
      ],
      supportsSelectiveExtraction: true,
      notes:
        "macOS can mount FAT images. However, raw disk images may require specifying the filesystem type.",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "open fat image mac",
      "fat disk image macos",
      "mount img file mac",
      "fat filesystem extract mac",
    ],
    faqs: [
      {
        question: "How do I open a FAT disk image on Mac?",
        answer:
          "From Terminal, run: hdiutil attach image.img to mount the FAT image. You can then browse files in Finder. MacPacker can also browse FAT images directly without mounting.",
      },
    ],
    relatedFormats: ["ntfs", "apfs", "dmg"],
  },
  {
    slug: "ntfs",
    displayName: "NTFS",
    fullName: "NTFS Filesystem Image",
    extensions: [".ntfs"],
    type: "disk-image",
    popular: false,
    description:
      "NTFS is Windows' default filesystem. NTFS images are found in Windows backups and forensic disk captures.",
    articleTitle: diskImageTitle("NTFS"),
    articleIntro:
      "NTFS (New Technology File System) is the standard filesystem on Windows. NTFS disk images are common in forensic analysis, Windows system backups, and virtual machine disk captures. macOS has limited read-only NTFS support.",
    defaultMethod: {
      tool: "Limited built-in support / third-party tools",
      steps: [
        "macOS can mount NTFS volumes in read-only mode.",
        "For disk images, third-party tools may be needed.",
        "Use MacPacker to browse NTFS image contents without mounting.",
      ],
      supportsSelectiveExtraction: false,
      notes:
        "macOS NTFS support is read-only. Full read-write requires third-party drivers like Paragon NTFS. MacPacker can browse NTFS images.",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "open ntfs image mac",
      "ntfs disk image macos",
      "extract ntfs mac",
      "read ntfs mac",
    ],
    faqs: [
      {
        question: "Can I read NTFS files on Mac?",
        answer:
          "macOS supports NTFS in read-only mode for mounted drives. For NTFS disk images, use MacPacker to browse and extract files without needing to mount the image.",
      },
    ],
    relatedFormats: ["fat", "apfs", "vhd"],
  },

  // ── Virtual Machine Disk Images ──
  {
    slug: "vmdk",
    displayName: "VMDK",
    fullName: "VMware Virtual Disk",
    extensions: [".vmdk"],
    type: "disk-image",
    popular: false,
    description:
      "VMDK is VMware's virtual disk format. Contains the filesystem of a virtual machine.",
    articleTitle: diskImageTitle("VMDK (VMware)"),
    articleIntro:
      "VMDK (Virtual Machine Disk) is VMware's virtual disk format, used by VMware Fusion, Workstation, and ESXi. If you need to extract files from a VMware virtual machine without booting it, you'll need a tool that can read VMDK disk images.",
    defaultMethod: {
      tool: "7zz via Homebrew (third-party)",
      command: "7zz x disk.vmdk",
      steps: [
        "Install 7-Zip via Homebrew: brew install 7zip",
        "Run: 7zz x disk.vmdk",
        "For VMware Fusion users: you can also mount the VMDK through VMware.",
      ],
      supportsSelectiveExtraction: false,
      notes:
        "macOS cannot mount VMDK files natively. 7-Zip can extract filesystem contents. MacPacker provides visual browsing of VMDK images.",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "open vmdk file mac",
      "extract vmdk macos",
      "vmware disk image mac",
      "vmdk to files mac",
      "browse vmdk without booting",
    ],
    faqs: [
      {
        question: "How do I extract files from a VMDK on Mac?",
        answer:
          "Use MacPacker to browse VMDK contents and extract individual files without booting the virtual machine. Alternatively, install 7-Zip via Homebrew and run: 7zz x disk.vmdk",
      },
      {
        question: "Can I open a VMDK file without VMware?",
        answer:
          "Yes. MacPacker can open and browse VMDK disk images directly — no VMware installation required. You can navigate the filesystem and extract files you need.",
      },
    ],
    relatedFormats: ["vhd", "vhdx", "vdi", "qcow2"],
  },
  {
    slug: "vhd",
    displayName: "VHD",
    fullName: "Hyper-V Virtual Disk",
    extensions: [".vhd"],
    type: "disk-image",
    popular: false,
    description:
      "VHD is Microsoft's virtual disk format used by Hyper-V and Azure. Contains a complete filesystem image.",
    articleTitle: diskImageTitle("VHD (Hyper-V)"),
    articleIntro:
      "VHD (Virtual Hard Disk) is Microsoft's virtual disk format, used by Hyper-V, Azure, and Windows Virtual PC. If you've received a VHD file or need to extract data from a Windows virtual machine on your Mac, you'll need specialized tools.",
    defaultMethod: {
      tool: "7zz via Homebrew (third-party)",
      command: "7zz x disk.vhd",
      steps: [
        "Install 7-Zip via Homebrew: brew install 7zip",
        "Run: 7zz x disk.vhd",
      ],
      supportsSelectiveExtraction: false,
      notes: "macOS cannot mount VHD files natively. 7-Zip or MacPacker can extract contents.",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "open vhd file mac",
      "extract vhd macos",
      "hyper-v disk image mac",
      "vhd to files mac",
    ],
    faqs: [
      {
        question: "How do I open a VHD file on Mac?",
        answer:
          "macOS cannot open VHD files natively. Use MacPacker to browse the virtual disk's filesystem and extract files. Alternatively: brew install 7zip && 7zz x disk.vhd",
      },
    ],
    relatedFormats: ["vhdx", "vmdk", "vdi", "qcow2"],
  },
  {
    slug: "vhdx",
    displayName: "VHDX",
    fullName: "Hyper-V Virtual Disk (Extended)",
    extensions: [".vhdx"],
    type: "disk-image",
    popular: false,
    description:
      "VHDX is the newer version of Microsoft's VHD format with support for larger disks and improved resilience.",
    articleTitle: diskImageTitle("VHDX (Hyper-V)"),
    articleIntro:
      "VHDX is the updated version of Microsoft's VHD virtual disk format, supporting disks up to 64 TB with better data corruption protection. Used by modern Hyper-V and Azure deployments, VHDX files require specialized tools on macOS.",
    defaultMethod: {
      tool: "7zz via Homebrew (third-party)",
      command: "7zz x disk.vhdx",
      steps: [
        "Install 7-Zip via Homebrew: brew install 7zip",
        "Run: 7zz x disk.vhdx",
      ],
      supportsSelectiveExtraction: false,
      notes: "macOS cannot mount VHDX files. 7-Zip or MacPacker can read the filesystem contents.",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "open vhdx file mac",
      "extract vhdx macos",
      "vhdx to files mac",
      "hyper-v vhdx mac",
    ],
    faqs: [
      {
        question: "What is the difference between VHD and VHDX?",
        answer:
          "VHDX is the newer format supporting larger disks (up to 64 TB vs 2 TB for VHD) and better resilience. Both can be opened on macOS with MacPacker or 7-Zip.",
      },
    ],
    relatedFormats: ["vhd", "vmdk", "vdi", "qcow2"],
  },
  {
    slug: "vdi",
    displayName: "VDI",
    fullName: "VirtualBox Disk Image",
    extensions: [".vdi"],
    type: "disk-image",
    popular: false,
    description:
      "VDI is VirtualBox's native virtual disk format. Contains the filesystem of a VirtualBox virtual machine.",
    articleTitle: diskImageTitle("VDI (VirtualBox)"),
    articleIntro:
      "VDI (VirtualBox Disk Image) is the native disk format for Oracle VirtualBox. If you need to extract files from a VirtualBox VM without booting it, or recover data from a VDI file on your Mac, you'll need a tool that can read the VDI format.",
    defaultMethod: {
      tool: "7zz via Homebrew (third-party)",
      command: "7zz x disk.vdi",
      steps: [
        "Install 7-Zip via Homebrew: brew install 7zip",
        "Run: 7zz x disk.vdi",
      ],
      supportsSelectiveExtraction: false,
      notes: "macOS cannot mount VDI files natively. VirtualBox itself can mount them, but 7-Zip or MacPacker can extract without VirtualBox.",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "open vdi file mac",
      "extract vdi macos",
      "virtualbox disk image mac",
      "vdi to files mac",
    ],
    faqs: [
      {
        question: "How do I extract files from a VDI without VirtualBox?",
        answer:
          "Use MacPacker to browse the VDI filesystem and extract individual files — no VirtualBox needed. Alternatively: brew install 7zip && 7zz x disk.vdi",
      },
    ],
    relatedFormats: ["vmdk", "vhd", "vhdx", "qcow2"],
  },
  {
    slug: "qcow2",
    displayName: "QCOW2",
    fullName: "QEMU Copy-on-Write Disk Image",
    extensions: [".qcow2", ".qcow"],
    type: "disk-image",
    popular: false,
    description:
      "QCOW2 is QEMU's disk image format with copy-on-write support, snapshots, and compression. Used in KVM/QEMU virtualization.",
    articleTitle: diskImageTitle("QCOW2 (QEMU)"),
    articleIntro:
      "QCOW2 (QEMU Copy-On-Write version 2) is the disk image format used by QEMU and KVM virtualization. It supports snapshots, compression, and encryption. If you're working with Linux virtual machines or cloud images on your Mac, you may encounter QCOW2 files.",
    defaultMethod: {
      tool: "qemu-img via Homebrew (third-party)",
      command: "qemu-img convert -f qcow2 -O raw disk.qcow2 disk.raw",
      steps: [
        "Install QEMU via Homebrew: brew install qemu",
        "Convert to raw: qemu-img convert -f qcow2 -O raw disk.qcow2 disk.raw",
        "Mount the raw image: hdiutil attach disk.raw",
        "Alternatively, use MacPacker to browse QCOW2 contents directly.",
      ],
      supportsSelectiveExtraction: false,
      notes:
        "Direct QCOW2 access requires conversion or specialized tools. MacPacker can browse QCOW2 images directly.",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "open qcow2 file mac",
      "extract qcow2 macos",
      "qemu disk image mac",
      "qcow2 to files mac",
      "browse qcow2 without qemu",
    ],
    faqs: [
      {
        question: "How do I open a QCOW2 file on Mac?",
        answer:
          "Use MacPacker to browse QCOW2 filesystem contents directly. Alternatively, install QEMU (brew install qemu) and convert to raw: qemu-img convert -f qcow2 -O raw disk.qcow2 disk.raw, then mount with hdiutil.",
      },
    ],
    relatedFormats: ["vmdk", "vhd", "vdi"],
  },
  {
    slug: "squashfs",
    displayName: "SquashFS",
    fullName: "SquashFS Filesystem Image",
    extensions: [".squashfs", ".sqfs", ".sfs"],
    type: "disk-image",
    popular: false,
    description:
      "SquashFS is a read-only compressed filesystem used in Linux live CDs, AppImages, snap packages, and embedded systems.",
    articleTitle: diskImageTitle("SquashFS"),
    articleIntro:
      "SquashFS is a compressed, read-only filesystem commonly used in Linux live CDs, AppImage packages, Ubuntu snap packages, and embedded systems. If you work with Linux distributions or embedded development on your Mac, you may need to extract SquashFS images.",
    defaultMethod: {
      tool: "squashfuse via Homebrew (third-party)",
      command: "unsquashfs image.squashfs",
      steps: [
        "Install squashfs tools via Homebrew: brew install squashfs",
        "Extract: unsquashfs image.squashfs",
        "Contents are extracted to a squashfs-root/ directory.",
      ],
      supportsSelectiveExtraction: false,
      notes:
        "macOS has no built-in SquashFS support. The unsquashfs command extracts everything. MacPacker can browse SquashFS images.",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "open squashfs mac",
      "extract squashfs macos",
      "squashfs linux image mac",
      "unsquashfs mac",
    ],
    faqs: [
      {
        question: "How do I extract a SquashFS image on Mac?",
        answer:
          "Install squashfs tools (brew install squashfs) and run: unsquashfs image.squashfs. MacPacker can also browse SquashFS images visually and extract individual files.",
      },
    ],
    relatedFormats: ["iso", "dmg"],
  },
  {
    slug: "tar-z",
    displayName: "TAR.Z",
    fullName: "TAR Archive (Unix Compressed)",
    extensions: [".tar.Z", ".taz"],
    type: "compression",
    popular: false,
    description:
      "TAR.Z is a TAR archive compressed with the original Unix compress utility. Found in legacy Unix archives.",
    articleTitle: compressionTitle("TAR.Z"),
    articleIntro:
      "TAR.Z files are TAR archives compressed with the original Unix compress utility. While the format is largely obsolete (replaced by .tar.gz and .tar.xz), you may encounter TAR.Z files in legacy Unix archives, old FTP mirrors, and historical software distributions.",
    defaultMethod: {
      tool: "Terminal (built-in)",
      command: "uncompress -c archive.tar.Z | tar xf -",
      steps: [
        "Open Terminal.",
        "Run: uncompress -c archive.tar.Z | tar xf -",
        "Alternatively: tar xZf archive.tar.Z (on systems where tar supports -Z).",
      ],
      supportsSelectiveExtraction: false,
      notes: "The uncompress command is available on macOS. Pipe to tar for extraction.",
    },
    macpackerSelectiveExtraction: true,
    keywords: [
      "extract tar.Z mac",
      "open tar.Z file macos",
      "unix compress tar macos",
      "tar.Z extract mac",
    ],
    faqs: [
      {
        question: "How do I extract a TAR.Z file on Mac?",
        answer:
          "Open Terminal and run: uncompress -c archive.tar.Z | tar xf — this decompresses and extracts in one step. MacPacker can also open TAR.Z files directly.",
      },
    ],
    relatedFormats: ["tar", "gz", "z"],
  },
];

// ─── LOOKUP HELPERS ───

/** Get a format entry by slug */
export function getFormatBySlug(slug: string): FormatEntry | undefined {
  return formats.find((f) => f.slug === slug);
}

/** Get all format slugs (for static path generation) */
export function getAllFormatSlugs(): string[] {
  return formats.map((f) => f.slug);
}

/** Get popular formats */
export function getPopularFormats(): FormatEntry[] {
  return formats.filter((f) => f.popular);
}

/** Get formats by type */
export function getFormatsByType(type: FormatType): FormatEntry[] {
  return formats.filter((f) => f.type === type);
}

/** Get related formats for a given format */
export function getRelatedFormats(slug: string): FormatEntry[] {
  const format = getFormatBySlug(slug);
  if (!format) return [];
  return format.relatedFormats
    .map((s) => getFormatBySlug(s))
    .filter((f): f is FormatEntry => f !== undefined);
}

/** Get a localized format entry */
export function getLocalizedFormat(
  format: FormatEntry,
  locale: string
): FormatEntry {
  if (locale !== "zh") return format;
  // Lazy-load to avoid circular deps and keep the English bundle lean
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { zhFormats } = require("./formats-zh") as typeof import("./formats-zh");
  const zh = zhFormats[format.slug];
  if (!zh) return format;
  return {
    ...format,
    fullName: zh.fullName,
    description: zh.description,
    articleTitle: zh.articleTitle,
    articleIntro: zh.articleIntro,
    defaultMethod: {
      ...format.defaultMethod,
      tool: zh.defaultMethod.tool,
      steps: zh.defaultMethod.steps,
      notes: zh.defaultMethod.notes ?? format.defaultMethod.notes,
    },
    faqs: zh.faqs,
  };
}

/** Get localized format by slug */
export function getLocalizedFormatBySlug(
  slug: string,
  locale: string
): FormatEntry | undefined {
  const format = getFormatBySlug(slug);
  if (!format) return undefined;
  return getLocalizedFormat(format, locale);
}

/** Get localized popular formats */
export function getLocalizedPopularFormats(locale: string): FormatEntry[] {
  return getPopularFormats().map((f) => getLocalizedFormat(f, locale));
}

/** Get localized formats by type */
export function getLocalizedFormatsByType(
  type: FormatType,
  locale: string
): FormatEntry[] {
  return getFormatsByType(type).map((f) => getLocalizedFormat(f, locale));
}

/** Get localized related formats */
export function getLocalizedRelatedFormats(
  slug: string,
  locale: string
): FormatEntry[] {
  return getRelatedFormats(slug).map((f) => getLocalizedFormat(f, locale));
}

/** Search formats by query (for WebMCP search_docs) */
export function searchFormats(query: string): FormatEntry[] {
  const q = query.toLowerCase();
  return formats.filter(
    (f) =>
      f.displayName.toLowerCase().includes(q) ||
      f.fullName.toLowerCase().includes(q) ||
      f.description.toLowerCase().includes(q) ||
      f.extensions.some((ext) => ext.toLowerCase().includes(q)) ||
      f.keywords.some((kw) => kw.toLowerCase().includes(q))
  );
}
