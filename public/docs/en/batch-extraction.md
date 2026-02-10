---
title: How to Extract Multiple Archives at Once on macOS
description: Complete guide to batch extracting archives on Mac. Learn Automator workflows, shell scripts, and MacPacker batch features to extract multiple ZIP, RAR, and 7z files simultaneously.
keywords: batch extract archives mac, extract multiple zip files mac, bulk unzip mac, automate extraction mac, batch unrar mac, extract all archives
canonical: https://macpacker.app/en/docs/batch-extraction
---

# How to Extract Multiple Archives at Once on macOS

Working with dozens or hundreds of archive files is tedious when you have to extract each one individually. Whether you're processing downloaded software collections, backing up extracted files, or organizing media libraries, batch extracting multiple archives at once on macOS saves enormous amounts of time. MacPacker makes bulk extraction effortless with drag-and-drop batch support for ZIP, RAR, 7z, and 30+ other formats — no manual scripting required.

## Why Batch Extract Archives on Mac?

Batch extraction becomes essential in several common scenarios:

**Software development** — Extracting multiple dependency archives, build artifacts, or release packages downloaded from repositories. Processing individual archives wastes development time.

**Media collections** — Unpacking large collections of compressed video files, image archives, or audio libraries often distributed as multiple compressed files for easier downloading.

**Document management** — Processing archived reports, scanned documents, or backup files that arrive as separate archives organized by date, department, or project.

**Data migration** — Moving archived data between systems often involves extracting numerous compressed files simultaneously to restore folder structures.

macOS's built-in Archive Utility can only process archives one at a time, forcing you to manually double-click each file or write custom scripts. MacPacker eliminates this friction with native batch extraction support.

## Method 1: Batch Extract Using MacPacker (Recommended)

MacPacker is the simplest solution for extracting multiple archives simultaneously on Mac. It handles mixed format batches — you can extract ZIP, RAR, 7z, and TAR files together in one operation.

### Step 1: Install MacPacker

Install MacPacker via [Homebrew](https://brew.sh):

```bash
brew install --cask macpacker
```

Or download directly from the [MacPacker website](https://macpacker.app/en#download) or Mac App Store.

### Step 2: Select Multiple Archives

In Finder, navigate to the folder containing your archives. Select all the archives you want to extract:

- **Select all files**: Press `Cmd + A` to select everything in the folder
- **Select specific files**: Hold `Cmd` and click individual archives
- **Select range**: Click the first archive, hold `Shift`, and click the last archive

MacPacker supports extracting mixed archive formats simultaneously — select any combination of `.zip`, `.rar`, `.7z`, `.tar.gz`, and other formats.

### Step 3: Drag and Drop to Extract

Once you've selected your archives, drag them onto the MacPacker application icon in your Dock or Applications folder. MacPacker will:

1. Open all selected archives simultaneously
2. Extract each archive to its own folder (or your chosen destination)
3. Show progress for all extraction operations in a unified interface
4. Handle errors gracefully, continuing with remaining archives if one fails

**Pro tip**: You can configure MacPacker's extraction preferences to automatically extract archives to the same folder as the source file, a specific destination folder, or prompt you for each batch.

### Batch Extraction Features in MacPacker

MacPacker's batch mode handles complex scenarios automatically:

- **Mixed formats** — Extract [ZIP](./password-protect-zip), [RAR](./extract-rar), and [7z files](./extract-7zip) in one batch
- **Password-protected archives** — Enter passwords once for all archives using the same password, or individually as needed
- **Multi-part archives** — MacPacker automatically detects and combines split archives (`.part1.rar`, `.part2.rar`)
- **Error handling** — Continues extracting remaining archives even if individual files fail
- **Preserve structure** — Maintains original folder organization when extracting to a destination

This makes MacPacker significantly more capable than Archive Utility or basic command-line tools for batch operations.

[Download MacPacker for Free](https://macpacker.app/en#download)

## Method 2: Batch Extract Using Terminal and Shell Scripts

For developers and advanced users, Terminal offers powerful automation options for batch extraction. This method is ideal when working on remote servers, integrating into build scripts, or processing archives programmatically.

### Basic Batch Extraction with unzip

To extract all ZIP files in a directory:

```bash
for file in *.zip; do
    unzip -d "${file%.zip}" "$file"
done
```

This script loops through all `.zip` files in the current directory and extracts each one to a folder named after the archive (without the `.zip` extension).

### Batch Extract RAR Files with unrar

First install `unrar` if not already available:

```bash
brew install unrar
```

Then extract all RAR archives:

```bash
for file in *.rar; do
    unrar x "$file" "${file%.rar}/"
done
```

### Batch Extract 7z Files with p7zip

Install the `p7zip` command-line tool:

```bash
brew install p7zip
```

Extract all 7z archives:

```bash
for file in *.7z; do
    7z x "$file" -o"${file%.7z}"
done
```

### Universal Batch Extraction Script

For mixed archive formats, use this comprehensive script that handles ZIP, RAR, 7z, and TAR formats:

```bash
#!/bin/bash
for archive in *.{zip,rar,7z,tar.gz,tar.bz2}; do
    [ -f "$archive" ] || continue

    case "$archive" in
        *.zip)     unzip -d "${archive%.zip}" "$archive" ;;
        *.rar)     unrar x "$archive" "${archive%.rar}/" ;;
        *.7z)      7z x "$archive" -o"${archive%.7z}" ;;
        *.tar.gz)  tar xzf "$archive" -C "${archive%.tar.gz}" ;;
        *.tar.bz2) tar xjf "$archive" -C "${archive%.tar.bz2}" ;;
    esac
done
```

Save this as `batch_extract.sh`, make it executable with `chmod +x batch_extract.sh`, and run it in any directory containing archives.

**When to use Terminal method:**
- Automating extraction in CI/CD pipelines
- Processing archives on remote servers via SSH
- Integrating extraction into existing shell scripts
- Batch processing with custom filtering or transformations

## Method 3: Batch Extract Using Automator Workflows

macOS Automator provides a GUI-based automation solution for batch extraction without writing code. Create a reusable workflow that you can invoke from Finder's right-click menu.

### Creating an Automator Batch Extraction Service

1. Open **Automator** (in Applications or via Spotlight)
2. Choose **Quick Action** (or "Service" in older macOS versions)
3. Set "Workflow receives current" to **files or folders** in **Finder**
4. Drag the **Run Shell Script** action into the workflow
5. Paste this script:

```bash
for file in "$@"; do
    case "$file" in
        *.zip)
            unzip -d "${file%.zip}" "$file"
            ;;
        *.rar)
            unrar x "$file" "${file%.rar}/"
            ;;
        *.7z)
            7z x "$file" -o"${file%.7z}"
            ;;
    esac
done
```

6. Save the workflow as "Batch Extract Archives"

Now you can right-click any selected files in Finder and choose **Quick Actions > Batch Extract Archives** to process them immediately.

### Automator vs MacPacker

While Automator workflows offer automation, MacPacker provides several advantages:

- **No setup required** — Works immediately after installation
- **Progress tracking** — Visual feedback for all extraction operations
- **Error handling** — User-friendly error messages instead of Terminal output
- **Format support** — Handles 30+ archive formats without installing additional command-line tools
- **Password support** — Interactive password prompts for encrypted archives

For occasional batch extraction, MacPacker is simpler. For integration into complex workflows or automation chains, Automator or shell scripts offer more flexibility.

## Troubleshooting Batch Extraction Issues

### Some archives fail to extract in batch mode

When processing large batches, some archives may be corrupted or password-protected:

1. Check MacPacker's extraction log to identify which files failed
2. Extract failed archives individually to see specific error messages
3. Verify corrupted archives by testing them with `unrar t filename.rar` or similar commands
4. For password-protected archives, extract them separately or ensure all use the same password

Learn more about handling problematic files: [How to Recover Files from Corrupted Archives](./corrupted-archives)

### Batch extraction runs out of disk space

Extracting many large archives simultaneously can consume significant storage:

1. Check available disk space before batch extraction: System Settings > General > Storage
2. Extract in smaller batches to manage disk usage incrementally
3. Delete source archives after successful extraction if space is limited
4. Use symbolic links or sparse files for disk images and ISO files when possible

### Archives extract to wrong locations

Different tools have different default extraction behaviors:

- **MacPacker**: Extracts each archive to a folder named after the archive file
- **Archive Utility**: Extracts to the same directory as the source archive
- **Command-line tools**: Behavior depends on flags used (`-d`, `-o`, etc.)

Configure extraction destination preferences in MacPacker settings, or use explicit output paths in shell scripts to control where files are extracted.

### Batch extraction is too slow

Extraction speed depends on several factors:

1. **Archive format**: [7z archives](./extract-7zip) extract slower than ZIP due to compression algorithm complexity
2. **File count**: Archives with thousands of small files take longer than single large files
3. **Disk speed**: Extracting to external drives or network locations is slower than local SSD storage
4. **Concurrent operations**: Extracting too many archives simultaneously can saturate disk I/O

For maximum speed, extract in batches of 10-20 archives at a time to local SSD storage. [RAR archives](./extract-rar) offer a good balance of compression and extraction speed.

## Frequently Asked Questions

### Can I batch extract different archive formats at the same time?

Yes, MacPacker handles mixed format batch extraction seamlessly. Select any combination of ZIP, RAR, 7z, TAR.GZ, and other supported formats and extract them together in one operation. MacPacker automatically detects each archive's format and uses the appropriate extraction method.

### How do I batch extract password-protected archives?

If all archives use the same password, MacPacker will prompt once and apply that password to all files. If archives use different passwords, MacPacker will prompt individually as needed. For command-line batch extraction, you can pass passwords directly in scripts using flags like `unrar x -pPassword archive.rar` or use an interactive loop that prompts for each password.

### Does batch extraction work with nested archives?

Yes, but nested archives (archives containing other archives) require multiple extraction passes. MacPacker can preview [nested archives](./nested-archives) before extracting and allows you to extract inner archives after extracting the outer ones. For automation, run your batch extraction script twice — once for outer archives, then again on the extracted contents.

### Can I batch extract only specific file types from archives?

MacPacker allows selective extraction — open archives individually and choose specific files to extract. For command-line automation, use tools like `unzip` with file patterns: `unzip archive.zip '*.pdf'` extracts only PDF files. For batch operations, incorporate file filtering into your shell scripts after extraction.

### What's the fastest way to extract hundreds of archives?

Use MacPacker for mixed formats with a graphical interface, or write a shell script using parallel processing for maximum speed:

```bash
find . -name "*.zip" -print0 | xargs -0 -P 4 -I {} unzip -d "{}" "{}"
```

This extracts up to 4 ZIP files simultaneously. Adjust `-P 4` to match your CPU core count. Be cautious with very high parallelism as it can saturate disk I/O and actually slow down overall extraction.

### How do I automatically extract archives when downloading them?

macOS doesn't provide built-in download auto-extraction for all archive types. For browsers, configure download settings or use browser extensions. For automated workflows, create a folder action in Automator that watches your Downloads folder and automatically extracts new archives. Alternatively, use command-line tools like `fswatch` to monitor directories and trigger extraction scripts when new archives appear.

### Can I extract archives directly to a network drive or external storage?

Yes, both MacPacker and command-line tools support extracting to any mounted volume. However, network drives and external storage are significantly slower than local SSD storage. For large batch operations, consider extracting to local storage first, then moving the extracted files to network storage afterward for better performance.

### How do I handle multi-part archives in batch extraction?

Multi-part archives (`.part1.rar`, `.part2.rar`, etc.) must have all parts present in the same directory. When batch extracting, only select the first part of each multi-part archive — MacPacker and command-line tools automatically detect and combine all parts. Selecting all parts individually may cause errors or duplicate extraction attempts.

---

**Ready to batch extract archives efficiently?** [Download MacPacker — The Fastest Batch Archive Extractor for Mac](https://macpacker.app/en#download)

MacPacker is free, open-source, and supports batch extraction of 30+ archive formats. No scripts, no setup, no limitations.
