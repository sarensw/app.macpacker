---
title: How to Extract RAR Files on macOS
description: Learn how to open and extract RAR archives on your Mac using MacPacker, a free and open-source archive manager.
---

# How to Extract RAR Files on macOS

RAR is one of the most popular archive formats, but macOS doesn't support it natively. MacPacker makes it easy to extract RAR files on your Mac.

## Prerequisites

- macOS 13.5 or later
- MacPacker installed via [Homebrew](https://brew.sh) or direct download

## Step-by-Step Guide

### 1. Install MacPacker

The easiest way to install MacPacker is via Homebrew:

```bash
brew install --cask macpacker
```

### 2. Open Your RAR File

Simply double-click any `.rar` file, and MacPacker will open it automatically. You can also drag and drop files onto the MacPacker icon.

### 3. Extract the Contents

Once the archive is open, you can:

- **Extract all files** by clicking the Extract button
- **Preview individual files** before extracting
- **Navigate nested archives** — MacPacker supports archives within archives

## Supported RAR Features

| Feature | Supported |
|---------|-----------|
| RAR 5.0 | Yes |
| RAR 4.x | Yes |
| Password-protected | Yes |
| Multi-part archives | Yes |
| Solid archives | Yes |

## Troubleshooting

If you encounter issues extracting RAR files:

1. Make sure you have the latest version of MacPacker
2. Check if the archive is corrupted
3. For password-protected archives, ensure you have the correct password

> **Tip:** MacPacker also supports many other formats including 7zip, tar, gzip, and more.
