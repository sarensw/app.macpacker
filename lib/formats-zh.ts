/**
 * Chinese (Simplified) translations for the format registry.
 *
 * Each entry mirrors the translatable fields of FormatEntry.
 * Non-translatable fields (slug, extensions, type, popular, keywords,
 * relatedFormats, command, supportsSelectiveExtraction, macpackerSelectiveExtraction)
 * are inherited from the base English entry.
 */

export interface FormatLocalization {
  fullName: string;
  description: string;
  articleTitle: string;
  articleIntro: string;
  defaultMethod: {
    tool: string;
    steps: string[];
    notes?: string;
  };
  faqs: { question: string; answer: string }[];
}

export const zhFormats: Record<string, FormatLocalization> = {
  // ── Popular Archives ──
  zip: {
    fullName: "ZIP 压缩包",
    description:
      "ZIP 是 macOS 上最常用的压缩格式，支持无损压缩，Finder 和 Archive Utility 均可原生处理。",
    articleTitle: "如何在 macOS 上从 ZIP 压缩包中提取文件",
    articleIntro:
      "ZIP 是 macOS 上最常见的压缩格式。无论是从网上下载的文件、收到的邮件附件，还是导出的项目，很大概率都是 .zip 文件。macOS 可以直接打开 ZIP 文件，但如果想从大型 ZIP 压缩包中提取特定文件，则需要功能更强大的工具。",
    defaultMethod: {
      tool: "Archive Utility（系统内置）",
      steps: [
        "在 Finder 中双击 .zip 文件。",
        "Archive Utility 会将所有内容解压到原文件旁的文件夹中。",
        "也可以右键点击文件，选择「打开方式 > Archive Utility」。",
      ],
      notes:
        "Archive Utility 始终解压整个压缩包，无法预览内容或提取单个文件。",
    },
    faqs: [
      {
        question: "如何在 Mac 上打开 ZIP 文件？",
        answer:
          "在 Finder 中双击 .zip 文件即可。macOS 会通过 Archive Utility 自动解压所有内容。如需选择性提取，可使用 MacPacker 浏览压缩包内容，仅拖出需要的文件。",
      },
      {
        question: "能否在 Mac 上从 ZIP 压缩包中提取单个文件？",
        answer:
          "系统内置的 Archive Utility 会一次性解压所有文件。如需提取单个文件，可使用 MacPacker —— 它可以浏览压缩包内容，通过拖拽提取指定文件。",
      },
      {
        question: "如何在 Mac 上通过 Terminal 解压 ZIP 文件？",
        answer:
          "打开 Terminal，运行：unzip archive.zip —— 即可解压所有文件。如需提取特定文件，运行：unzip archive.zip path/to/file.txt",
      },
    ],
  },

  rar: {
    fullName: "RAR 压缩包",
    description:
      "RAR 是一种专有压缩格式，以高压缩率和分卷压缩功能著称。macOS 不内置支持 RAR 格式。",
    articleTitle: "如何在 macOS 上从 RAR 压缩包中提取文件",
    articleIntro:
      "RAR 压缩包常见于大型文件下载、游戏模组和分卷压缩场景。与 ZIP 不同，macOS 无法原生打开 RAR 文件，需要借助 Keka 或 MacPacker 等第三方工具来解压。",
    defaultMethod: {
      tool: "Keka 或 unrar（第三方工具）",
      steps: [
        "通过 Homebrew 安装 unrar：brew install unrar",
        "打开 Terminal，进入 .rar 文件所在的文件夹。",
        "运行：unrar x archive.rar",
        "也可以从 App Store 安装 Keka，然后双击 .rar 文件即可解压。",
      ],
      notes:
        "macOS 不内置 RAR 支持。Keka 会解压整个压缩包。unrar 命令支持提取特定文件：unrar e archive.rar path/to/file",
    },
    faqs: [
      {
        question: "如何在 Mac 上打开 RAR 文件？",
        answer:
          "macOS 无法原生打开 RAR 文件。可以安装 MacPacker 或 Keka 等免费工具。使用 MacPacker 打开 .rar 文件后，可以浏览内容并提取所需文件。",
      },
      {
        question: "Mac 上有免费的 RAR 解压工具吗？",
        answer:
          "有的。MacPacker 是一款免费的开源压缩包管理器，支持 RAR 文件。也可以使用 Keka（开发者官网免费下载）或通过 Homebrew 安装 unrar。",
      },
      {
        question: "能否在 Mac 上从 RAR 压缩包中提取单个文件？",
        answer:
          "使用 MacPacker 可以做到 —— 打开 .rar 文件，浏览内容，仅拖出需要的文件即可。使用命令行的话，可运行：unrar e archive.rar path/to/file",
      },
    ],
  },

  "7z": {
    fullName: "7z (7-Zip) 压缩包",
    description:
      "7z 是一种开源压缩格式，拥有出色的压缩率。macOS 不内置支持 7z 格式。",
    articleTitle: "如何在 macOS 上从 7z 压缩包中提取文件",
    articleIntro:
      "7z 压缩包提供了当前最好的压缩率之一，因此被广泛用于分发大型文件。macOS 不原生支持 7z 格式，需要借助第三方工具来打开。",
    defaultMethod: {
      tool: "通过 Homebrew 安装 7zz（第三方工具）",
      steps: [
        "通过 Homebrew 安装 7-Zip：brew install 7zip",
        "打开 Terminal，进入 .7z 文件所在的文件夹。",
        "运行：7zz x archive.7z",
        "也可以安装 Keka，双击 .7z 文件即可解压。",
      ],
      notes:
        "macOS 不内置 7z 支持。可通过 7zz 命令查看内容：7zz l archive.7z，提取特定文件：7zz e archive.7z file.txt",
    },
    faqs: [
      {
        question: "如何在 Mac 上打开 7z 文件？",
        answer:
          "macOS 无法原生打开 .7z 文件。可使用 MacPacker（免费开源）来打开和浏览 7z 压缩包。也可以通过 Homebrew 安装 7-Zip：brew install 7zip，然后运行：7zz x archive.7z",
      },
      {
        question: "Mac 上最好的 7z 解压工具是什么？",
        answer:
          "MacPacker 是一款免费的 macOS 原生应用，可以通过可视化文件浏览器打开 7z 文件。它支持预览内容、浏览嵌套压缩包以及提取单个文件 —— 这些功能是命令行工具所不具备的。",
      },
      {
        question: "能否在 Mac 上从 7z 压缩包中提取特定文件？",
        answer:
          "可以。MacPacker 可以浏览 7z 压缩包并拖出指定文件。使用命令行的话，运行：7zz e archive.7z path/to/file",
      },
    ],
  },

  tar: {
    fullName: "TAR 压缩包",
    description:
      "TAR（磁带归档）格式用于将多个文件打包在一起，本身不进行压缩。通常与 GZ、BZ2 或 XZ 组合使用。macOS 通过 Terminal 原生支持。",
    articleTitle: "如何在 macOS 上从 TAR 压缩包中提取文件",
    articleIntro:
      "TAR 是 Unix 系统中打包文件的经典格式。TAR 本身不压缩数据，但几乎总是配合压缩算法（gzip、bzip2、xz）来创建 .tar.gz、.tar.bz2 或 .tar.xz 文件。macOS 通过 Terminal 原生支持 TAR 格式。",
    defaultMethod: {
      tool: "Terminal（系统内置）",
      steps: [
        "打开 Terminal。",
        "进入 .tar 文件所在的文件夹。",
        "运行：tar xf archive.tar",
        "对于压缩格式：tar xzf archive.tar.gz、tar xjf archive.tar.bz2 或 tar xJf archive.tar.xz",
      ],
      notes:
        "tar 命令支持提取特定文件：tar xf archive.tar path/to/file。可以先用 tar tf archive.tar 查看内容列表。",
    },
    faqs: [
      {
        question: "如何在 Mac 上解压 TAR 文件？",
        answer:
          "打开 Terminal，运行：tar xf archive.tar —— 所有文件将解压到当前目录。对于 .tar.gz 文件，使用：tar xzf archive.tar.gz",
      },
      {
        question: "能否在不解压的情况下预览 TAR 文件的内容？",
        answer:
          "在 Terminal 中运行：tar tf archive.tar 即可列出所有文件。如需可视化浏览并支持 Quick Look 预览，可使用 MacPacker —— 它能像浏览文件夹一样浏览压缩包。",
      },
      {
        question: "能否在 Mac 上从 TAR 压缩包中提取单个文件？",
        answer:
          "可以。在 Terminal 中运行：tar xf archive.tar path/to/file —— 只会提取指定的文件。MacPacker 也支持通过拖拽进行选择性提取。",
      },
    ],
  },

  // ── Compression Formats ──
  gz: {
    fullName: "Gzip 压缩包",
    description:
      "Gzip 是 Unix/macOS 上最常用的压缩格式，通常用于压缩 TAR 归档文件，生成 .tar.gz 文件。macOS 原生支持。",
    articleTitle: "如何在 macOS 上从 GZ (Gzip) 压缩包中提取文件",
    articleIntro:
      "GZ (Gzip) 是 Unix 世界中的标准压缩格式。在 macOS 上，最常见的形式是 .tar.gz 或 .tgz 文件 —— 即用 Gzip 压缩的 TAR 归档包。macOS 通过 Archive Utility 和 Terminal 均可原生处理 Gzip 文件。",
    defaultMethod: {
      tool: "Terminal（系统内置）",
      steps: [
        "对于单独的 .gz 文件：gunzip file.gz（原地解压）。",
        "对于 .tar.gz 压缩包：tar xzf archive.tar.gz",
        "在 Finder 中双击 .tar.gz 文件，也可以通过 Archive Utility 解压。",
      ],
      notes:
        "Archive Utility 会解压所有内容。Terminal 的 tar 命令支持从 .tar.gz 中选择性提取：tar xzf archive.tar.gz path/to/file",
    },
    faqs: [
      {
        question: "如何在 Mac 上解压 .gz 文件？",
        answer:
          "对于单独的 .gz 文件，打开 Terminal 运行：gunzip file.gz。对于 .tar.gz 压缩包，运行：tar xzf archive.tar.gz。也可以在 Finder 中直接双击 .tar.gz 文件。",
      },
      {
        question: "能否从 .tar.gz 压缩包中提取特定文件？",
        answer:
          "可以。在 Terminal 中运行：tar xzf archive.tar.gz path/to/file。使用 MacPacker，可以可视化浏览压缩包并拖出指定文件。",
      },
    ],
  },

  bz2: {
    fullName: "Bzip2 压缩包",
    description:
      "Bzip2 的压缩率优于 Gzip，但速度较慢。常见于源代码发行包和 Linux 软件包。",
    articleTitle: "如何在 macOS 上从 BZ2 (Bzip2) 压缩包中提取文件",
    articleIntro:
      "BZ2 (Bzip2) 的压缩率比 Gzip 更高，因此在发布源代码和大型数据集时颇受欢迎。macOS 通过 Terminal 原生支持 Bzip2 格式。",
    defaultMethod: {
      tool: "Terminal（系统内置）",
      steps: [
        "对于单独的 .bz2 文件：bunzip2 file.bz2（原地解压）。",
        "对于 .tar.bz2 压缩包：tar xjf archive.tar.bz2",
        "在 Finder 中双击 .tar.bz2 文件，也可以通过 Archive Utility 解压。",
      ],
      notes:
        "Terminal 的 tar 命令支持选择性提取：tar xjf archive.tar.bz2 path/to/file",
    },
    faqs: [
      {
        question: "如何在 Mac 上解压 .bz2 文件？",
        answer:
          "打开 Terminal，运行：bunzip2 file.bz2。对于 .tar.bz2 压缩包，运行：tar xjf archive.tar.bz2。也可以在 Finder 中通过 Archive Utility 解压 .tar.bz2 文件。",
      },
      {
        question: ".gz 和 .bz2 有什么区别？",
        answer:
          "两者都是压缩格式。Bzip2 (.bz2) 的压缩率更高，但速度比 Gzip (.gz) 慢。对于大多数用户来说，差异可以忽略不计 —— 两者在 macOS 上都能正常使用。",
      },
    ],
  },

  xz: {
    fullName: "XZ 压缩包",
    description:
      "XZ 采用 LZMA2 压缩算法，提供出色的压缩率。常见于 Linux 发行版和大型软件包。",
    articleTitle: "如何在 macOS 上从 XZ 压缩包中提取文件",
    articleIntro:
      "XZ 压缩采用 LZMA2 算法，能够实现当前最优秀的压缩率之一。它被广泛用于 Linux 包管理器和大型软件包的分发。macOS 通过 Terminal 支持 XZ 格式。",
    defaultMethod: {
      tool: "Terminal（系统内置）",
      steps: [
        "对于单独的 .xz 文件：xz -d file.xz（原地解压）。",
        "对于 .tar.xz 压缩包：tar xJf archive.tar.xz",
        "如果未安装 xz，可通过 Homebrew 安装：brew install xz",
      ],
      notes:
        "较新版本的 macOS 已预装 xz 命令。Terminal 的 tar 命令支持选择性提取：tar xJf archive.tar.xz path/to/file",
    },
    faqs: [
      {
        question: "如何在 Mac 上解压 .xz 文件？",
        answer:
          "打开 Terminal，运行：xz -d file.xz。对于 .tar.xz 压缩包：tar xJf archive.tar.xz。注意 xz 格式的 tar 压缩包使用大写 J 标志。",
      },
      {
        question: "macOS 支持 XZ 格式吗？",
        answer:
          "支持。较新版本的 macOS 已内置 xz 命令。也可以使用 MacPacker 打开 .xz 和 .tar.xz 文件，获得可视化浏览体验。",
      },
    ],
  },

  lz4: {
    fullName: "LZ4 压缩包",
    description:
      "LZ4 以速度优先，牺牲部分压缩率换取极快的压缩和解压速度。Apple 的 APFS 文件系统内部也使用了 LZ4。",
    articleTitle: "如何在 macOS 上从 LZ4 压缩包中提取文件",
    articleIntro:
      "LZ4 是一种极速压缩算法，以压缩率换取处理速度。Apple 在 APFS 文件系统内部使用了 LZ4，它也常见于实时数据处理场景。macOS 可通过 Homebrew 工具处理 LZ4 文件。",
    defaultMethod: {
      tool: "通过 Homebrew 安装 lz4（第三方工具）",
      steps: [
        "通过 Homebrew 安装 lz4：brew install lz4",
        "解压文件：lz4 -d file.lz4 file",
        "对于 .tar.lz4 文件：lz4 -d archive.tar.lz4 | tar xf -",
      ],
      notes: "macOS 默认不包含 lz4 命令行工具。",
    },
    faqs: [
      {
        question: "如何在 Mac 上打开 LZ4 文件？",
        answer:
          "通过 Homebrew 安装 lz4（brew install lz4），然后运行：lz4 -d file.lz4 output。如需可视化操作，MacPacker 可以直接打开 LZ4 文件。",
      },
      {
        question: "什么是 LZ4 压缩？",
        answer:
          "LZ4 是一种极速的无损压缩算法，以压缩率换取处理速度，非常适合实时应用场景。Apple 在 APFS 文件系统中使用了 LZ4 技术。",
      },
    ],
  },

  z: {
    fullName: "Unix Compress 压缩文件",
    description:
      "Z 是最早的 Unix 压缩格式，由 compress 工具创建。虽然已被 Gzip 等新格式取代，但在旧系统和历史归档中仍可见到。",
    articleTitle: "如何在 macOS 上从 Z (Unix Compress) 压缩包中提取文件",
    articleIntro:
      ".Z 格式是 Unix 系统上最早的压缩格式，由 compress 工具创建。尽管如今已被 Gzip 等更现代的格式取代，但在访问旧版 FTP 存档、历史软件发行版或遗留系统时，你仍然可能遇到 .Z 文件。macOS 自带的 Terminal 可以直接解压这种格式。",
    defaultMethod: {
      tool: "Terminal（系统自带）",
      steps: [
        "打开 Terminal。",
        "运行：uncompress file.Z（原地解压）。",
        "也可以使用：gzip -d file.Z（Gzip 兼容 Unix compress 格式）。",
      ],
      notes:
        "uncompress 命令在 macOS 上开箱即用。对于 .tar.Z 文件，可使用：uncompress -c archive.tar.Z | tar xf -",
    },
    faqs: [
      {
        question: "如何在 Mac 上打开 .Z 文件？",
        answer:
          "打开 Terminal，运行：uncompress file.Z 即可原地解压。也可以使用 gzip -d file.Z，因为 Gzip 向后兼容 Unix compress 格式。",
      },
    ],
  },

  dmg: {
    fullName: "Apple 磁盘镜像",
    description:
      "DMG 是 Apple 的原生磁盘镜像格式，也是分发 macOS 应用程序的标准方式。macOS 可以原生处理 DMG 文件。",
    articleTitle: "如何在 macOS 上从 DMG 磁盘镜像中提取文件",
    articleIntro:
      "DMG（Apple 磁盘镜像）是 macOS 软件分发的标准格式。从开发者网站下载应用时，几乎都会以 .dmg 文件的形式提供。macOS 可以原生挂载 DMG 文件，但从结构复杂的 DMG 镜像中提取特定文件可能需要额外的工具。",
    defaultMethod: {
      tool: "Finder / hdiutil（系统自带）",
      steps: [
        "在 Finder 中双击 .dmg 文件即可挂载。",
        "磁盘镜像会以卷宗形式出现在 Finder 侧边栏中。",
        "将应用或文件拖拽到目标位置。",
        "使用完毕后，点击推出图标卸载卷宗。",
        "也可在 Terminal 中运行：hdiutil attach image.dmg",
      ],
      notes:
        "macOS 会将 DMG 文件挂载为虚拟磁盘，你可以自由浏览和复制文件，但需要先挂载。加密的 DMG 文件会提示输入密码。",
    },
    faqs: [
      {
        question: "如何在 Mac 上打开 DMG 文件？",
        answer:
          "在 Finder 中双击 .dmg 文件，macOS 会将其挂载为虚拟磁盘，然后你可以拖拽其中的文件。使用 MacPacker，你可以直接浏览 DMG 内容而无需挂载。",
      },
      {
        question: "如何在不挂载的情况下提取 DMG 文件？",
        answer:
          "MacPacker 允许你像浏览文件夹一样查看 DMG 内容，无需挂载。也可以在 Terminal 中使用 hdiutil attach image.dmg 进行挂载，或使用 7zz 提取：7zz x image.dmg",
      },
      {
        question: "可以在 Windows 上打开 DMG 文件吗？",
        answer:
          "DMG 是 macOS 专用格式。在 macOS 上，使用 MacPacker 或 Finder 打开 DMG 文件。在其他平台上，7-Zip 等工具可以提取 DMG 内容。",
      },
    ],
  },

  iso: {
    fullName: "ISO 磁盘镜像",
    description:
      "ISO 是光盘介质的标准磁盘镜像格式，广泛用于操作系统安装程序、软件发行版和光盘备份。",
    articleTitle: "如何在 macOS 上从 ISO 磁盘镜像中提取文件",
    articleIntro:
      "ISO 文件是光盘的逐扇区副本，常用于操作系统安装程序、可引导介质和大型软件发行版。macOS 可以原生挂载 ISO 文件，但提取其中的单个文件需要一些额外步骤。",
    defaultMethod: {
      tool: "Finder / hdiutil（系统自带）",
      steps: [
        "在 Finder 中双击 .iso 文件即可挂载。",
        "ISO 会以只读卷宗的形式挂载。",
        "浏览并从挂载的卷宗中复制文件。",
        "使用完毕后，点击侧边栏的推出图标卸载。",
        "也可在 Terminal 中运行：hdiutil attach image.iso",
      ],
      notes:
        "macOS 会将 ISO 镜像挂载为只读卷宗，你可以自由复制其中的文件。某些使用特殊文件系统的 ISO 文件可能无法正常挂载。",
    },
    faqs: [
      {
        question: "如何在 Mac 上打开 ISO 文件？",
        answer:
          "在 Finder 中双击 .iso 文件即可将其挂载为虚拟磁盘，然后浏览和复制文件。使用 MacPacker，你可以直接浏览 ISO 内容而无需挂载。",
      },
      {
        question: "可以在不挂载的情况下从 ISO 中提取文件吗？",
        answer:
          "可以。MacPacker 允许你像浏览文件夹一样查看 ISO 内容，并提取单个文件而无需挂载。也可以使用命令行工具 7zz：7zz x image.iso",
      },
    ],
  },

  pkg: {
    fullName: "macOS 安装包",
    description:
      "PKG 是 Apple 的安装包格式，用于需要系统级安装的 macOS 软件。",
    articleTitle: "如何在 macOS 上从 PKG 安装包中提取文件",
    articleIntro:
      "PKG 文件是 macOS 安装包，用于需要系统级安装的软件，例如驱动程序、框架、系统工具和企业软件。虽然 macOS 可以原生处理 PKG 安装，但在运行之前检查 PKG 文件的内容是一种明智的安全做法。",
    defaultMethod: {
      tool: "Installer.app / pkgutil（系统自带）",
      steps: [
        "安装方式：双击 .pkg 文件并按照安装向导操作。",
        "安装前检查内容：pkgutil --payload-files package.pkg",
        "展开安装包：pkgutil --expand package.pkg output_dir",
        "提取 Payload：cd output_dir && cat Payload | cpio -id",
      ],
      notes:
        "pkgutil 可以列出和展开安装包，但操作流程较为复杂。MacPacker 提供了可视化的 PKG 内容浏览器。",
    },
    faqs: [
      {
        question: "如何在 Mac 上安装前检查 PKG 文件的内容？",
        answer:
          "使用 MacPacker 打开 .pkg 文件，可以在不安装的情况下浏览其内容。也可以在 Terminal 中运行：pkgutil --payload-files package.pkg 来列出安装包将要安装的文件。",
      },
      {
        question: "可以在不安装的情况下提取 PKG 文件吗？",
        answer:
          "可以。使用 MacPacker 可以可视化地浏览和提取特定文件。也可以在 Terminal 中运行：pkgutil --expand package.pkg output_dir 来展开安装包结构。",
      },
      {
        question: "在 Mac 上打开 PKG 文件安全吗？",
        answer:
          "PKG 文件会运行安装脚本，可能修改系统。请务必验证来源。使用 MacPacker 可以在安装前检查 PKG 内容，查看其中包含的所有文件。",
      },
    ],
  },

  cab: {
    fullName: "Windows Cabinet 压缩包",
    description:
      "CAB（Cabinet）是 Microsoft 的压缩包格式，用于 Windows 安装程序和系统更新。macOS 不内置 CAB 支持。",
    articleTitle: "如何在 macOS 上从 CAB (Windows Cabinet) 压缩包中提取文件",
    articleIntro:
      "CAB（Cabinet）文件是 Microsoft 的压缩包格式，常见于 Windows 安装包、驱动程序分发和 Windows Update 更新文件中。如果你在 Mac 上进行跨平台开发或需要处理 Windows 软件，可能会遇到需要提取 CAB 文件的情况。",
    defaultMethod: {
      tool: "cabextract（通过 Homebrew 安装的第三方工具）",
      steps: [
        "通过 Homebrew 安装 cabextract：brew install cabextract",
        "运行：cabextract archive.cab",
        "文件将提取到当前目录。",
      ],
      notes:
        "macOS 不内置 CAB 支持。cabextract 会提取所有文件。",
    },
    faqs: [
      {
        question: "如何在 Mac 上打开 CAB 文件？",
        answer:
          "macOS 无法原生打开 CAB 文件。使用 MacPacker 可以可视化地浏览和提取 CAB 压缩包。也可以通过 Homebrew 安装 cabextract：brew install cabextract，然后运行：cabextract archive.cab",
      },
    ],
  },

  cpio: {
    fullName: "CPIO 压缩包",
    description:
      "CPIO 是一种 Unix 归档格式，用于 RPM 软件包、initramfs 镜像和 macOS PKG 安装包的 Payload。macOS 通过 Terminal 原生支持此格式。",
    articleTitle: "如何在 macOS 上从 CPIO 压缩包中提取文件",
    articleIntro:
      "CPIO（Copy In/Copy Out）是一种 Unix 归档格式，被 macOS 安装包（PKG 文件）、Linux RPM 软件包和 initramfs 镜像在内部使用。虽然日常使用中不太常见，但对于开发者和系统管理员来说，了解如何处理 CPIO 文件非常有用。",
    defaultMethod: {
      tool: "Terminal（系统自带）",
      steps: [
        "打开 Terminal。",
        "切换到目标输出目录。",
        "运行：cpio -id < archive.cpio",
        "查看内容列表：cpio -it < archive.cpio",
      ],
      notes:
        "cpio 命令在 macOS 上开箱即用。该命令从标准输入读取数据，因此需要使用 < 重定向符。",
    },
    faqs: [
      {
        question: "如何在 Mac 上提取 CPIO 文件？",
        answer:
          "打开 Terminal，运行：cpio -id < archive.cpio。如需先查看内容列表，运行：cpio -it < archive.cpio。MacPacker 也支持 CPIO 文件的可视化浏览。",
      },
    ],
  },

  xar: {
    fullName: "XAR 压缩包",
    description:
      "XAR（eXtensible ARchive）是 Apple 开发的归档格式，在 PKG 安装包和 Xcode 分发中内部使用。",
    articleTitle: "如何在 macOS 上从 XAR 压缩包中提取文件",
    articleIntro:
      "XAR（eXtensible ARchive）是 Apple 设计的归档格式，主要用于 macOS 安装包（.pkg 文件）和 Xcode 组件的内部封装。虽然独立的 .xar 文件并不常见，但了解这种格式有助于你检查和分析 macOS 安装包的结构。",
    defaultMethod: {
      tool: "Terminal（系统自带）",
      steps: [
        "打开 Terminal。",
        "运行：xar -xf archive.xar",
        "查看内容列表：xar -tf archive.xar",
      ],
      notes:
        "xar 命令在 macOS 上开箱即用，是处理 XAR 归档的原生工具。",
    },
    faqs: [
      {
        question: "什么是 XAR 文件？",
        answer:
          "XAR（eXtensible ARchive）是 Apple 开发的归档格式，主要用于 macOS 安装包（.pkg）的内部封装。你可以使用 xar -xf archive.xar 提取 XAR 文件，也可以使用 MacPacker 进行可视化浏览。",
      },
    ],
  },

  sit: {
    fullName: "StuffIt 压缩包",
    description:
      "StuffIt 曾是 Classic Mac OS 时代最主流的压缩格式。这种遗留格式在旧归档文件中仍有出现。",
    articleTitle: "如何在 macOS 上从 SIT (StuffIt) 压缩包中提取文件",
    articleIntro:
      "StuffIt（.sit）是上世纪九十年代至两千年代初期 Classic Mac OS 上最流行的归档格式。虽然如今已被 ZIP 格式取代，但在访问旧版 Mac 软件、复古归档或早期 Mac 格式介质时，你仍可能遇到 SIT 文件。",
    defaultMethod: {
      tool: "The Unarchiver（第三方工具）",
      steps: [
        "从 App Store 免费安装 The Unarchiver。",
        "右键点击 .sit 文件，选择「打开方式 > The Unarchiver」。",
        "文件将被提取到原始文件旁边的文件夹中。",
        "也可以使用同样支持 StuffIt 格式的 MacPacker。",
      ],
      notes:
        "macOS 不内置 StuffIt 支持。原版 StuffIt Expander 已停止开发。可以使用 The Unarchiver 或 MacPacker 处理 .sit 文件。",
    },
    faqs: [
      {
        question: "如何在现代 macOS 上打开 StuffIt（.sit）文件？",
        answer:
          "macOS 已不再内置 StuffIt 支持。使用 MacPacker（免费开源）或 The Unarchiver 即可打开 .sit 文件。MacPacker 还支持在提取前浏览归档内容。",
      },
    ],
  },

  sea: {
    fullName: "自解压压缩包",
    description:
      "自解压压缩包 (SEA) 是经典 Mac OS 时代常见的格式，将压缩数据与解压代码捆绑在一起，无需额外软件即可解压。",
    articleTitle: "如何在 macOS 上从 SEA 压缩包中提取文件",
    articleIntro:
      "SEA（Self-Extracting Archive，自解压压缩包）是经典 Mac OS 时期广泛使用的格式。它将压缩数据和解压程序打包在一起，这样接收者不需要单独安装解压软件就可以提取文件。现代 macOS 已无法直接运行经典 SEA 文件，但 MacPacker 等工具可以读取并提取其中的内容。",
    defaultMethod: {
      tool: "MacPacker 或 The Unarchiver（第三方工具）",
      steps: [
        "安装 MacPacker 或 The Unarchiver。",
        "使用所选应用程序打开 .sea 文件。",
        "文件内容将被提取到一个文件夹中。",
      ],
      notes:
        "现代 macOS 无法执行经典 SEA 文件，必须将其作为普通压缩包处理，使用兼容的工具进行提取。",
    },
    faqs: [
      {
        question: "如何在现代 macOS 上打开 SEA 文件？",
        answer:
          "现代 macOS 无法运行经典自解压压缩包。请使用 MacPacker 将 .sea 文件当作普通压缩包打开，浏览其中的内容并提取所需文件。",
      },
    ],
  },

  arj: {
    fullName: "ARJ 压缩包",
    description:
      "ARJ 是 DOS 时代流行的压缩格式，如今已很少使用，但在老旧档案和复古计算领域仍然可以见到。",
    articleTitle: "如何在 macOS 上从 ARJ 压缩包中提取文件",
    articleIntro:
      "ARJ（Archived by Robert Jung）是 DOS 时代广受欢迎的压缩格式，以支持多卷压缩包著称。虽然现在已经很少使用，但在复古计算资源或老旧数据档案中仍有可能遇到 ARJ 文件。",
    defaultMethod: {
      tool: "通过 Homebrew 安装 7zz（第三方工具）",
      steps: [
        "通过 Homebrew 安装 7-Zip：brew install 7zip",
        "运行命令：7zz x archive.arj",
      ],
      notes:
        "macOS 不内置 ARJ 支持。可以使用 7-Zip 解压 ARJ 压缩包。",
    },
    faqs: [
      {
        question: "如何在 Mac 上打开 ARJ 文件？",
        answer:
          "macOS 原生不支持 ARJ 格式。您可以使用 MacPacker 以可视化方式浏览和提取 ARJ 压缩包，也可以通过 Homebrew 安装 7-Zip 后运行命令：7zz x archive.arj",
      },
    ],
  },

  lha: {
    fullName: "LHA 压缩包",
    description:
      "LHA（也称 LZH）是一种源自日本的压缩格式，在复古计算和 Amiga 社区中较为流行。",
    articleTitle: "如何在 macOS 上从 LHA/LZH 压缩包中提取文件",
    articleIntro:
      "LHA（也称为 LZH 或 LHarc）是一种在日本和 Amiga 计算社区中尤其流行的压缩格式。虽然现在已不常见，但在复古计算档案、日本软件发行包和 Amiga 保存项目中仍然可以找到 LHA 压缩包。",
    defaultMethod: {
      tool: "通过 Homebrew 安装 lha（第三方工具）",
      steps: [
        "通过 Homebrew 安装 lha：brew install lha",
        "运行命令：lha x archive.lha",
        "也可以使用 7-Zip：7zz x archive.lha",
      ],
      notes: "macOS 不内置 LHA 支持。",
    },
    faqs: [
      {
        question: "如何在 Mac 上打开 LHA 或 LZH 文件？",
        answer:
          "您可以使用 MacPacker 以可视化方式打开 LHA/LZH 文件。也可以通过 Homebrew 安装 lha（brew install lha）后运行命令：lha x archive.lha",
      },
    ],
  },

  lzh: {
    fullName: "LZH 压缩包",
    description:
      "LZH 是 LHA 压缩包的另一种扩展名，在日本计算领域尤为常见。",
    articleTitle: "如何在 macOS 上从 LZH 压缩包中提取文件",
    articleIntro:
      "LZH 文件使用与 LHA 相同的格式，扩展名只是一种在日本计算领域更常用的命名方式。如果您在 macOS 上遇到了 .lzh 文件，其提取方法与 LHA 完全一致。",
    defaultMethod: {
      tool: "通过 Homebrew 安装 lha（第三方工具）",
      steps: [
        "通过 Homebrew 安装 lha：brew install lha",
        "运行命令：lha x archive.lzh",
        "也可以使用 7-Zip：7zz x archive.lzh",
      ],
      notes: "LZH 和 LHA 是相同的格式，只是使用了不同的扩展名。",
    },
    faqs: [
      {
        question: "LHA 和 LZH 有什么区别？",
        answer:
          "LHA 和 LZH 是同一种压缩格式，.lzh 扩展名只是一种不同的命名方式。两者都可以用 MacPacker 打开，也可以使用 lha 命令行工具进行提取。",
      },
    ],
  },

  lzx: {
    fullName: "LZX 压缩包",
    description:
      "LZX 是 Amiga 平台的压缩格式，如今非常罕见，主要出现在 Amiga 软件保存项目中。",
    articleTitle: "如何在 macOS 上从 LZX 压缩包中提取文件",
    articleIntro:
      "LZX 是来自 Amiga 计算平台的压缩格式。在现代系统上极为少见，但在处理 Amiga 软件保存档案或复古计算收藏时可能会遇到。",
    defaultMethod: {
      tool: "通过 Homebrew 安装 7zz（第三方工具）",
      steps: [
        "通过 Homebrew 安装 7-Zip：brew install 7zip",
        "运行命令：7zz x archive.lzx",
      ],
      notes:
        "macOS 不内置 LZX 支持。可以使用 7-Zip 或 MacPacker 处理 LZX 压缩包。",
    },
    faqs: [
      {
        question: "如何在 Mac 上打开 LZX 文件？",
        answer:
          "LZX 是一种 Amiga 压缩格式。您可以使用 MacPacker 以可视化方式浏览和提取 LZX 文件，也可以通过 Homebrew 安装 7-Zip 后运行命令：7zz x archive.lzx",
      },
    ],
  },

  chm: {
    fullName: "编译 HTML 帮助文档",
    description:
      "CHM（编译 HTML 帮助）是微软的帮助文档格式，包含压缩的 HTML 页面、图片和索引。",
    articleTitle: "如何在 macOS 上从 CHM 压缩包中提取文件",
    articleIntro:
      "CHM（Compiled HTML Help，编译 HTML 帮助）是微软的文档格式，内含压缩的 HTML 页面、图片和搜索索引。在 Mac 上访问 Windows 软件文档、技术手册或编程参考资料时，您可能会遇到 CHM 文件。",
    defaultMethod: {
      tool: "通过 Homebrew 安装 7zz 或 extract-chm（第三方工具）",
      steps: [
        "通过 Homebrew 安装 7-Zip：brew install 7zip",
        "提取文件：7zz x file.chm -ooutput_dir",
        "在浏览器中打开提取出的 HTML 文件。",
        "如需直接阅读 CHM 文件，可从 App Store 安装 iCHM。",
      ],
      notes:
        "macOS 没有内置的 CHM 阅读器。使用 7-Zip 提取后会得到原始的 HTML 和图片文件。MacPacker 可以浏览 CHM 文件的内容。",
    },
    faqs: [
      {
        question: "如何在 Mac 上阅读 CHM 文件？",
        answer:
          "macOS 没有内置的 CHM 阅读器。您可以使用 MacPacker 浏览和提取 CHM 文件的内容，也可以从 App Store 安装 iCHM 作为专用阅读器。此外还可以使用命令提取 HTML 文件：7zz x file.chm",
      },
    ],
  },

  apfs: {
    fullName: "Apple 文件系统磁盘镜像",
    description:
      "APFS（Apple 文件系统）是苹果的现代文件系统。APFS 磁盘镜像用于 macOS 卷宗和备份。",
    articleTitle: "如何在 macOS 上从 APFS 磁盘镜像中提取文件",
    articleIntro:
      "APFS（Apple File System，Apple 文件系统）是苹果在 macOS High Sierra 中引入的现代文件系统。APFS 磁盘镜像用于 macOS 恢复卷宗、Time Machine 备份和容器化存储。在原始环境之外访问 APFS 镜像通常需要借助专业工具。",
    defaultMethod: {
      tool: "hdiutil / Disk Utility（系统内置）",
      steps: [
        "如果 APFS 镜像位于 DMG 容器中，双击即可挂载。",
        "对于独立的 APFS 容器，可尝试使用 Disk Utility 进行挂载。",
        "在 Terminal 中运行：hdiutil attach image.dmg（适用于 APFS 嵌套在 DMG 内的情况）。",
      ],
      notes:
        "独立的 APFS 镜像可能无法直接挂载。MacPacker 可以在不挂载的情况下浏览 APFS 容器的内容。",
    },
    faqs: [
      {
        question: "如何访问 APFS 磁盘镜像中的文件？",
        answer:
          "如果 APFS 镜像在 DMG 内部，双击即可挂载。对于独立的 APFS 镜像，可以使用 MacPacker 在不挂载的情况下浏览其内容。",
      },
    ],
  },

  fat: {
    fullName: "FAT 文件系统磁盘镜像",
    description:
      "FAT（文件分配表）文件系统镜像广泛用于 USB 驱动器、SD 卡和跨平台存储。",
    articleTitle: "如何在 macOS 上从 FAT 磁盘镜像中提取文件",
    articleIntro:
      "FAT（File Allocation Table，文件分配表）是一种兼容性极强的文件系统，广泛应用于 USB 驱动器、SD 卡和嵌入式系统。FAT 磁盘镜像（.img）在嵌入式开发、Raspberry Pi 系统镜像分发和跨平台文件共享中非常常见。",
    defaultMethod: {
      tool: "hdiutil（系统内置）",
      steps: [
        "在 Terminal 中运行：hdiutil attach image.img",
        "FAT 镜像会作为卷宗挂载到 Finder 中。",
        "自由浏览并复制所需文件。",
        "使用完毕后推出卷宗。",
      ],
      notes:
        "macOS 可以挂载 FAT 镜像。但原始磁盘镜像可能需要指定文件系统类型。",
    },
    faqs: [
      {
        question: "如何在 Mac 上打开 FAT 磁盘镜像？",
        answer:
          "在 Terminal 中运行 hdiutil attach image.img 即可挂载 FAT 镜像，然后在 Finder 中浏览文件。MacPacker 也可以在不挂载的情况下直接浏览 FAT 镜像的内容。",
      },
    ],
  },

  ntfs: {
    fullName: "NTFS 文件系统镜像",
    description:
      "NTFS 是 Windows 的默认文件系统。NTFS 镜像常见于 Windows 系统备份和磁盘取证分析。",
    articleTitle: "如何在 macOS 上从 NTFS 磁盘镜像中提取文件",
    articleIntro:
      "NTFS（New Technology File System）是 Windows 操作系统的标准文件系统。NTFS 磁盘镜像常见于数字取证分析、Windows 系统备份和虚拟机磁盘快照。macOS 对 NTFS 仅提供有限的只读支持。",
    defaultMethod: {
      tool: "有限的内置支持 / 第三方工具",
      steps: [
        "macOS 可以以只读模式挂载 NTFS 卷。",
        "对于磁盘镜像文件，可能需要使用第三方工具。",
        "使用 MacPacker 可以无需挂载直接浏览 NTFS 镜像内容。",
      ],
      notes:
        "macOS 对 NTFS 的支持仅限只读模式。如需完整的读写支持，需要安装 Paragon NTFS 等第三方驱动。MacPacker 可以直接浏览 NTFS 镜像。",
    },
    faqs: [
      {
        question: "Mac 能读取 NTFS 文件吗？",
        answer:
          "macOS 对已挂载的 NTFS 驱动器支持只读模式。对于 NTFS 磁盘镜像，可以使用 MacPacker 无需挂载即可浏览和提取文件。",
      },
    ],
  },

  vmdk: {
    fullName: "VMware 虚拟磁盘",
    description:
      "VMDK 是 VMware 的虚拟磁盘格式，包含虚拟机的完整文件系统。",
    articleTitle: "如何在 macOS 上从 VMDK (VMware) 磁盘镜像中提取文件",
    articleIntro:
      "VMDK（Virtual Machine Disk）是 VMware 的虚拟磁盘格式，广泛用于 VMware Fusion、Workstation 和 ESXi。如果你需要在不启动虚拟机的情况下从 VMware 虚拟机中提取文件，就需要一款能读取 VMDK 磁盘镜像的工具。",
    defaultMethod: {
      tool: "通过 Homebrew 安装 7zz（第三方）",
      steps: [
        "通过 Homebrew 安装 7-Zip：brew install 7zip",
        "运行：7zz x disk.vmdk",
        "VMware Fusion 用户也可以通过 VMware 直接挂载 VMDK。",
      ],
      notes:
        "macOS 无法原生挂载 VMDK 文件。7-Zip 可以提取文件系统内容。MacPacker 提供 VMDK 镜像的可视化浏览功能。",
    },
    faqs: [
      {
        question: "如何在 Mac 上从 VMDK 中提取文件？",
        answer:
          "使用 MacPacker 可以浏览 VMDK 内容并提取单个文件，无需启动虚拟机。也可以通过 Homebrew 安装 7-Zip 后运行：7zz x disk.vmdk",
      },
      {
        question: "不安装 VMware 可以打开 VMDK 文件吗？",
        answer:
          "可以。MacPacker 能够直接打开和浏览 VMDK 磁盘镜像，无需安装 VMware。你可以自由浏览文件系统并提取所需文件。",
      },
    ],
  },

  vhd: {
    fullName: "Hyper-V 虚拟磁盘",
    description:
      "VHD 是 Microsoft 的虚拟磁盘格式，用于 Hyper-V 和 Azure，包含完整的文件系统镜像。",
    articleTitle: "如何在 macOS 上从 VHD (Hyper-V) 磁盘镜像中提取文件",
    articleIntro:
      "VHD（Virtual Hard Disk）是 Microsoft 的虚拟磁盘格式，广泛用于 Hyper-V、Azure 和 Windows Virtual PC。如果你收到了 VHD 文件，或者需要在 Mac 上从 Windows 虚拟机中提取数据，就需要使用专门的工具。",
    defaultMethod: {
      tool: "通过 Homebrew 安装 7zz（第三方）",
      steps: [
        "通过 Homebrew 安装 7-Zip：brew install 7zip",
        "运行：7zz x disk.vhd",
      ],
      notes:
        "macOS 无法原生挂载 VHD 文件。7-Zip 或 MacPacker 可以提取其内容。",
    },
    faqs: [
      {
        question: "如何在 Mac 上打开 VHD 文件？",
        answer:
          "macOS 无法原生打开 VHD 文件。使用 MacPacker 可以浏览虚拟磁盘的文件系统并提取文件。也可以使用命令行：brew install 7zip && 7zz x disk.vhd",
      },
    ],
  },

  vhdx: {
    fullName: "Hyper-V 虚拟磁盘（扩展版）",
    description:
      "VHDX 是 Microsoft VHD 格式的新版本，支持更大的磁盘容量并具有更强的数据保护能力。",
    articleTitle: "如何在 macOS 上从 VHDX (Hyper-V) 磁盘镜像中提取文件",
    articleIntro:
      "VHDX 是 Microsoft VHD 虚拟磁盘格式的升级版本，支持最大 64 TB 的磁盘容量，并具备更好的数据损坏保护机制。VHDX 文件广泛用于现代 Hyper-V 和 Azure 部署，在 macOS 上需要使用专门的工具才能访问。",
    defaultMethod: {
      tool: "通过 Homebrew 安装 7zz（第三方）",
      steps: [
        "通过 Homebrew 安装 7-Zip：brew install 7zip",
        "运行：7zz x disk.vhdx",
      ],
      notes:
        "macOS 无法挂载 VHDX 文件。7-Zip 或 MacPacker 可以读取其文件系统内容。",
    },
    faqs: [
      {
        question: "VHD 和 VHDX 有什么区别？",
        answer:
          "VHDX 是较新的格式，支持更大的磁盘（最大 64 TB，VHD 仅支持 2 TB）并具有更强的数据保护能力。两种格式都可以在 macOS 上使用 MacPacker 或 7-Zip 打开。",
      },
    ],
  },

  vdi: {
    fullName: "VirtualBox 虚拟磁盘镜像",
    description:
      "VDI 是 VirtualBox 的原生虚拟磁盘格式，包含 VirtualBox 虚拟机的完整文件系统。",
    articleTitle: "如何在 macOS 上从 VDI (VirtualBox) 磁盘镜像中提取文件",
    articleIntro:
      "VDI（VirtualBox Disk Image）是 Oracle VirtualBox 的原生磁盘格式。如果你需要在不启动虚拟机的情况下从 VirtualBox 虚拟机中提取文件，或者需要在 Mac 上恢复 VDI 文件中的数据，就需要一款能读取 VDI 格式的工具。",
    defaultMethod: {
      tool: "通过 Homebrew 安装 7zz（第三方）",
      steps: [
        "通过 Homebrew 安装 7-Zip：brew install 7zip",
        "运行：7zz x disk.vdi",
      ],
      notes:
        "macOS 无法原生挂载 VDI 文件。VirtualBox 本身可以挂载，但 7-Zip 或 MacPacker 无需安装 VirtualBox 即可提取内容。",
    },
    faqs: [
      {
        question: "不安装 VirtualBox 如何从 VDI 中提取文件？",
        answer:
          "使用 MacPacker 可以浏览 VDI 文件系统并提取单个文件，无需安装 VirtualBox。也可以使用命令行：brew install 7zip && 7zz x disk.vdi",
      },
    ],
  },

  qcow2: {
    fullName: "QEMU 写时复制磁盘镜像",
    description:
      "QCOW2 是 QEMU 的磁盘镜像格式，支持写时复制、快照和压缩功能，广泛用于 KVM/QEMU 虚拟化环境。",
    articleTitle: "如何在 macOS 上从 QCOW2 (QEMU) 磁盘镜像中提取文件",
    articleIntro:
      "QCOW2（QEMU Copy-On-Write version 2）是 QEMU 和 KVM 虚拟化平台使用的磁盘镜像格式，支持快照、压缩和加密功能。如果你在 Mac 上处理 Linux 虚拟机或云镜像，可能会遇到 QCOW2 文件。",
    defaultMethod: {
      tool: "通过 Homebrew 安装 qemu-img（第三方）",
      steps: [
        "通过 Homebrew 安装 QEMU：brew install qemu",
        "转换为 raw 格式：qemu-img convert -f qcow2 -O raw disk.qcow2 disk.raw",
        "挂载 raw 镜像：hdiutil attach disk.raw",
        "也可以使用 MacPacker 直接浏览 QCOW2 内容。",
      ],
      notes:
        "直接访问 QCOW2 需要进行格式转换或使用专门的工具。MacPacker 可以直接浏览 QCOW2 镜像。",
    },
    faqs: [
      {
        question: "如何在 Mac 上打开 QCOW2 文件？",
        answer:
          "使用 MacPacker 可以直接浏览 QCOW2 文件系统内容。也可以安装 QEMU（brew install qemu）并转换为 raw 格式：qemu-img convert -f qcow2 -O raw disk.qcow2 disk.raw，然后使用 hdiutil 挂载。",
      },
    ],
  },

  squashfs: {
    fullName: "SquashFS 文件系统镜像",
    description:
      "SquashFS 是一种只读压缩文件系统，广泛用于 Linux Live CD、AppImage、snap 软件包和嵌入式系统。",
    articleTitle: "如何在 macOS 上从 SquashFS 磁盘镜像中提取文件",
    articleIntro:
      "SquashFS 是一种压缩的只读文件系统，常见于 Linux Live CD、AppImage 应用包、Ubuntu snap 软件包和嵌入式系统。如果你在 Mac 上从事 Linux 发行版相关工作或嵌入式开发，可能需要提取 SquashFS 镜像中的文件。",
    defaultMethod: {
      tool: "通过 Homebrew 安装 squashfuse（第三方）",
      steps: [
        "通过 Homebrew 安装 squashfs 工具：brew install squashfs",
        "提取：unsquashfs image.squashfs",
        "文件会被提取到 squashfs-root/ 目录。",
      ],
      notes:
        "macOS 没有内置的 SquashFS 支持。unsquashfs 命令会提取全部内容。MacPacker 可以浏览 SquashFS 镜像。",
    },
    faqs: [
      {
        question: "如何在 Mac 上提取 SquashFS 镜像？",
        answer:
          "安装 squashfs 工具（brew install squashfs）后运行：unsquashfs image.squashfs。MacPacker 也可以可视化浏览 SquashFS 镜像并提取单个文件。",
      },
    ],
  },

  "tar-z": {
    fullName: "TAR 归档文件（Unix 压缩）",
    description:
      "TAR.Z 是使用原始 Unix compress 工具压缩的 TAR 归档文件，常见于早期 Unix 系统的存档。",
    articleTitle: "如何在 macOS 上从 TAR.Z 压缩包中提取文件",
    articleIntro:
      "TAR.Z 文件是使用原始 Unix compress 工具压缩的 TAR 归档。虽然这种格式已基本被 .tar.gz 和 .tar.xz 取代，但你仍然可能在早期 Unix 存档、旧的 FTP 镜像站和历史软件发行版中遇到 TAR.Z 文件。",
    defaultMethod: {
      tool: "Terminal（内置）",
      steps: [
        "打开 Terminal。",
        "运行：uncompress -c archive.tar.Z | tar xf -",
        "也可以运行：tar xZf archive.tar.Z（在 tar 支持 -Z 选项的系统上）。",
      ],
      notes:
        "macOS 内置 uncompress 命令。通过管道传递给 tar 即可完成提取。",
    },
    faqs: [
      {
        question: "如何在 Mac 上提取 TAR.Z 文件？",
        answer:
          "打开 Terminal 运行：uncompress -c archive.tar.Z | tar xf - 即可一步完成解压和提取。MacPacker 也可以直接打开 TAR.Z 文件。",
      },
    ],
  },
};
