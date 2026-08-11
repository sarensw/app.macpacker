/**
 * Chinese (Simplified) strings for the archiver comparison.
 *
 * Mirrors the translatable fields of `lib/compare.ts`. Non-translatable data
 * (support cells, footnote refs, format names, extensions, version strings) is
 * inherited from the English source, the same way `formats-zh.ts` layers over
 * `formats.ts`. Same publishing rule as `compare.ts`: every string here ships
 * to customers, so keep internals and research notes out of it.
 */

import type { CompareApp, CompareCopy, CapabilityRow } from "./compare";

export const zhCompare: {
  copy: Partial<CompareCopy>;
  apps: Record<string, Partial<CompareApp>>;
  bands: Record<string, string>;
  capabilities: Record<string, Partial<CapabilityRow>>;
  footnotes: string[];
} = {
  copy: {
    eyebrow: "对比",
    headline: "MacPacker 与 7-Zip、The Unarchiver、Keka、BetterZip 的对比",
    deck: "五款 macOS 压缩工具支持的压缩包、安装包与磁盘镜像格式逐项对照 —— 每款能打开哪些，又能创建哪些。",
    metaDate: "2026 年 8 月 10 日",
    scope: { formats: "种格式", capabilities: "项能力" },
    pairHeadline: "MacPacker 对比 ",
    pairDeck: "在 macOS 上，两款应用各自能打开哪些压缩包、安装包与磁盘镜像格式，又能创建哪些。",
    method:
      "读写总数按下方表格的行数统计，其中一行可能代表一整族格式。各家统计格式的口径互不相同，因此总数仅供参考，真正的比较在表格里。",
    matrixIntro:
      "**读取**指应用能列出压缩包内容并从中提取。**写入**指应用能生成该格式 —— 创建它，以及在注明处更新它。只要五款中至少一款支持，该格式就会出现在表中。",
    matrixIntroPair:
      "**读取**指应用能列出压缩包内容并从中提取。**写入**指应用能生成该格式 —— 创建它，以及在注明处更新它。两款都不支持的格式不会列出。",
    capsIntro: "格式覆盖只是一半。下面这些行关乎压缩包打开之后你能对它做什么。",
    compiled: "编译于 2026 年 8 月 10 日，对应上方列出的版本。",
    sections: {
      contenders: "参与对比的应用",
      matrix: "格式对照表",
      capabilities: "格式清单之外",
      more: "更多对比",
      notes: "注释",
    },
    columns: { read: "读", write: "写", format: "格式", capability: "能力" },
    legend: { yes: "支持", partial: "部分支持", no: "不支持" },
    reads: "可读",
    writes: "可写",
    facts: { price: "价格", licence: "许可", requires: "系统要求", shape: "形态" },
  },

  apps: {
    macpacker: {
      price: "免费",
      licence: "GPL-3.0，开源",
      requires: "macOS 14.6+",
      shape: "压缩包浏览器",
    },
    sevenzip: {
      price: "免费",
      licence: "LGPL + BSD，开源",
      requires: "64 位 macOS",
      shape: "仅命令行",
    },
    unarchiver: {
      price: "免费",
      licence: "专有（MacPaw）",
      requires: "macOS 10.13+",
      shape: "解压工具",
    },
    keka: {
      price: "免费；App Store 6.49 美元",
      licence: "专有",
      requires: "macOS 10.10+",
      shape: "压缩 / 解压工具",
    },
    betterzip: {
      price: "35 美元买断",
      licence: "专有",
      requires: "macOS 13.5+",
      shape: "压缩包管理器",
    },
  },

  bands: {
    "everyday-archives": "日常压缩包",
    "platform-package-formats": "平台与安装包格式",
    "legacy-mac-classic-and-long-tail": "老旧格式、Mac 经典格式与长尾",
    "single-stream-compression": "单流压缩",
    "compound-tar-streams": "复合 tar 流",
    "disk-images-and-filesystems": "磁盘镜像与文件系统",
  },

  capabilities: {
    "open-split-multi-volume-sets": {
      label: "打开分卷压缩包",
      note: "合并以 .001、.z01 或 .r00 分片形式送达的压缩包。",
    },
    "create-split-volumes": {
      label: "创建分卷",
      note: "把压缩包按指定大小写成若干分片。",
    },
    "open-password-protected-archives": {
      label: "打开加密压缩包",
      note: "读取时提示输入密码并解密。",
    },
    "write-encrypted-archives": {
      label: "写入加密压缩包",
      note: "输出时使用 AES-256。MacPacker 的保存面板只提供格式与压缩级别。",
    },
    "modify-an-archive-in-place": {
      label: "就地修改压缩包",
      note: "增删或重命名条目，无需整包解压再重新打包。",
    },
    "archive-browser": {
      label: "压缩包浏览器",
      note: "在提取任何东西之前，先用窗口列出压缩包内容。",
    },
    "browse-nested-archives": {
      label: "浏览嵌套压缩包",
      note: "直接打开位于另一个压缩包内部的压缩包，无需先解出外层。",
    },
    "finder-quick-look-extensions": {
      label: "Finder / 快速查看扩展",
      note: "应用窗口之外的系统级集成。",
    },
    "command-line-interface": {
      label: "命令行接口",
      note: "可在 shell 中脚本化调用。",
    },
  },

  footnotes: [
    "7-Zip 的 ZIP 处理器注册了 `.zipx` 扩展名，也能解码 WinZip 使用的 LZMA、PPMd 与 BZip2 方法，但 7-Zip 并未把 ZIPX 列为输出格式。",
    "实际可用，但厂商自己公开的格式页面上并未列出。",
    "写入 RAR 需要外部的 `rar` 命令行工具，BetterZip 可以代为下载安装；RAR 许可需另行向 win.rar GmbH 购买。",
    "The Unarchiver 能读 ARJ，但不支持分卷 ARJ（厂商自己的标注：“No multi-part”）。",
    "The Unarchiver 只能读 2.0 之前的 ACE 压缩包 —— 不支持 WinAce（厂商标注：“Only old files”）。",
    "MacPacker 按文件内容而非扩展名识别格式，因此任何基于 ZIP 的容器无论叫什么名字都会作为 ZIP 打开。",
    "`.xip` 本身就是 XAR 容器，所以 MacPacker 会按 XAR 打开它。",
    "分两步：先打包 tar，再压缩。没有一条命令能一次完成。",
    "写入 JAR、APK、IPA 之类，写的就是一个 ZIP 容器：这些应用都不会生成让平台安装包真正合法所需的签名或清单。",
    "Keka 的 AAR 指 Apple Archive 格式（`.aar`、`.yaa`）。MacPacker 的 `.aar` 是与之无关的、基于 ZIP 的 Android Archive。",
    "MacPacker 只合并分卷 ZIP —— 跨卷（`.z01`…）与数字编号（`.zip.001`…）。分卷 RAR 或 7z 不被识别。",
    "仅限 ZIP。",
    "7-Zip 的 macOS 版本是控制台程序：`7zz l` 能列出压缩包内容，但没有窗口。",
    "`unar` 与 `lsar` 命令行工具需要单独下载，不随应用提供。",
  ],

};
