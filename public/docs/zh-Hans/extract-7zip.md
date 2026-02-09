---
title: 如何在 Mac 上解压 7z 文件（macOS 13.5+）
description: 在 macOS 上解压 7z 文件的完整指南。3种方法：MacPacker（最简单）、终端和其他工具。免费、快速、无广告。
keywords: 7zip mac, mac 解压 7z, 7-zip macos, 如何在 macos 上打开 7z 文件, p7zip mac, 7z 解压工具 mac, 最佳 7z 解压工具 mac, 免费 7z mac
canonical: https://macpacker.app/zh/docs/extract-7zip
---

# 如何在 Mac 上解压 7z 文件（macOS 13.5+）

macOS 没有内置的 7z 文件支持，但使用正确的工具在 Mac 上解压 7-Zip 档案非常简单。MacPacker 是一款免费的开源档案管理器，只需点击几下即可解压 7z 文件——无广告、无跟踪、无限制。7z 是一种高压缩格式，常用于开源软件分发，提供比 ZIP 更好的压缩率。

## 什么是 7z 文件，为什么 macOS 无法打开它们？

7z（7-Zip）是一种强大的开源压缩文件格式，可实现卓越的压缩率，广泛用于分发软件、大文件和多部分档案。与 macOS 可以使用归档实用程序原生打开的 ZIP 文件不同，7z 文件需要第三方应用程序，因为 Apple 没有在 macOS 中包含 7z 支持。

7z 文件特别常见于：
- 开源软件分发和开发者工具
- 需要最大压缩率的大文件传输
- 分割成多个文件的多部分档案
- 固实压缩以节省更多空间
- Windows、Mac 和 Linux 之间的跨平台文件共享

虽然 macOS 归档实用程序可以处理 ZIP、GZIP 和其他一些格式，但它根本无法打开 7z 档案。7z 格式使用先进的 LZMA 和 LZMA2 压缩算法，提供比 ZIP 显著更好的压缩效果，但需要像 MacPacker 这样的专业工具。

## 方法 1：使用 MacPacker 解压 7z 文件（推荐）

MacPacker 是在 macOS 上解压 7z 文件最简单、最快速的方法。它完全免费、开源，支持包括 7z 在内的 30 多种档案格式，完全支持 LZMA/LZMA2 压缩。

### 步骤 1：安装 MacPacker

安装 MacPacker 的最快方法是通过 [Homebrew](https://brew.sh)，这是流行的 macOS 包管理器：

```bash
brew install --cask macpacker
```

或者，您可以直接从 [MacPacker 网站](https://macpacker.app/zh#download)下载 MacPacker，或从 Mac App Store 安装。

![MacPacker 安装界面显示 Homebrew 命令](placeholder-800x450.png)

### 步骤 2：打开 7z 文件

安装 MacPacker 后，打开 7z 文件非常轻松：

1. **双击** Finder 中的任何 `.7z` 文件——macOS 将自动使用 MacPacker 打开它
2. **拖放** 7z 文件到应用程序文件夹或 Dock 中的 MacPacker 图标
3. **右键单击** 7z 文件，从上下文菜单中选择"打开方式 > MacPacker"

MacPacker 将立即显示档案的内容，允许您在解压之前预览文件。

![MacPacker 7z 解压界面显示文件预览](placeholder-800x600.png)

### 步骤 3：解压档案

在 MacPacker 中打开 7z 文件后：

1. 点击工具栏中的**解压**按钮
2. 选择要保存解压文件的目标文件夹
3. 点击**解压**开始解压过程

MacPacker 显示实时进度，并自动处理复杂场景：
- **多部分档案**——MacPacker 无缝组合分割的 7z 文件（`.7z.001`、`.7z.002` 等）
- **受密码保护的档案**——在提示时输入密码
- **嵌套档案**——浏览档案中的档案
- **固实档案**——MacPacker 高效解压固实压缩的 7z 文件
- **损坏的文件**——MacPacker 尝试尽可能多地解压并报告任何错误

**为什么选择 MacPacker 解压 7z 文件？**
- ✅ 支持 7z 格式的 LZMA/LZMA2 压缩
- ✅ 解压前预览文件
- ✅ 解压单个文件或整个档案
- ✅ 无广告、无跟踪、完全免费
- ✅ 原生 macOS 设计，完全支持深色模式
- ✅ 值得信赖的开源软件

[免费下载 MacPacker](https://macpacker.app/zh#download)

## 方法 2：使用终端解压 7z 文件（高级）

对于喜欢命令行的开发人员和高级用户，您可以使用终端中的 `p7zip` 实用程序解压 7z 文件。

### 通过 Homebrew 安装 p7zip

首先，安装 `p7zip` 命令行工具：

```bash
brew install p7zip
```

### 使用终端命令解压 7z 文件

要解压 7z 文件，请导航到包含档案的目录并运行：

```bash
7z x filename.7z
```

**常用 7z 命令：**
- `7z x archive.7z` — 使用完整路径解压文件
- `7z e archive.7z` — 将文件解压到当前目录（忽略路径）
- `7z l archive.7z` — 列出内容而不解压
- `7z t archive.7z` — 测试档案完整性

![使用 p7zip 在 Mac 上解压 7z 文件的终端命令](placeholder-800x400.png)

对于受密码保护的档案，添加 `-p` 标志：

```bash
7z x -p您的密码 archive.7z
```

**何时使用终端方法：**
- 在 shell 脚本中自动化 7z 解压
- 通过 SSH 在远程服务器上工作
- 批量处理多个 7z 文件
- 将 7z 解压集成到构建管道中

虽然功能强大，但终端方法缺少 MacPacker 提供的可视化预览和用户友好界面。对于大多数用户来说，MacPacker 是更好的选择。

## 方法 3：其他 Mac 版 7z 解压工具

有几种替代应用程序可以在 macOS 上解压 7z 文件，尽管与 MacPacker 相比，大多数都有局限性：

**The Unarchiver** — 免费且支持多种格式，但开发速度已放缓，缺少现代 macOS 功能，如 Apple Silicon 优化。

**Keka** — 支持 7z 的开源选项。不错的替代品，尽管界面不如 MacPacker 精致。

**p7zip（命令行）** — Unix 系统的官方 7-Zip 移植版。对于自动化来说很强大，但缺少 GUI 便利性。

**BetterZip** — 商业选项（24.95 美元），支持 7z，但需要付费才能使用完整功能。

对于大多数 Mac 用户来说，MacPacker 提供了功能、性能和易用性的最佳平衡——完全免费，没有任何限制。

## 常见 7z 解压问题故障排除

### "档案已损坏或损坏"

如果您看到此错误：
1. 验证 7z 文件已完整下载（检查文件大小与源文件对比）
2. 尝试从原始源重新下载文件
3. 在终端中使用 `7z t filename.7z` 测试档案完整性
4. 如果是多部分档案，请确保所有部分（`.7z.001`、`.7z.002` 等）都在同一文件夹中

### "密码错误"或受密码保护的档案

7z 档案可以使用密码加密：
1. 联系共享文件的人以获取正确的密码
2. 检查下载页面或自述文件中是否包含密码
3. 如果从公共来源下载，请尝试常见的默认密码
4. 当您尝试解压时，MacPacker 会提示输入密码

### 多部分 7z 文件无法解压

多部分档案被分割成多个文件（例如 `archive.7z.001`、`archive.7z.002`）：
1. 将档案的**所有部分**下载到同一文件夹
2. 打开 **.001** 文件（第一部分）
3. MacPacker 将在解压期间自动检测并组合所有部分

### 7z 文件根本无法打开

如果双击没有反应：
1. 确保 MacPacker 已安装并设置为 7z 文件的默认应用
2. 右键单击 7z 文件，选择"显示简介"，将"打开方式："更改为 MacPacker
3. 点击"全部更改..."使 MacPacker 成为所有 7z 文件的默认应用
4. 尝试直接从 MacPacker 中使用"文件 > 打开"打开文件

仍然有问题？[下载最新版本的 MacPacker](https://macpacker.app/zh#download) — 较新的版本通常会修复兼容性问题。

## 7z vs RAR vs ZIP：格式比较

了解档案格式之间的差异可以帮助您为自己的需求选择正确的工具和格式：

**7z 格式：**
- 开源且完全免费
- 最佳压缩率（LZMA/LZMA2 算法）
- 支持固实压缩以实现最大空间节省
- 常见于开源软件分发
- 在 macOS 和 Windows 上需要第三方软件

**RAR 格式：**
- WinRAR 拥有的专有格式
- 出色的压缩率（支持固实压缩）
- 广泛用于软件和媒体分发
- 在 macOS 上需要第三方软件
- 了解更多：[如何在 Mac 上解压 RAR 文件](https://macpacker.app/zh/docs/extract-rar)

**ZIP 格式：**
- 通用支持（内置于 macOS 和 Windows）
- 中等压缩率
- 快速压缩和解压
- 原生 macOS 支持中没有密码或高级功能
- 最适合所有平台的兼容性

MacPacker 支持所有三种格式以及 27 种以上其他格式，使其成为 macOS 完美的全能档案管理器。

## 常见问题

### macOS 可以原生打开 7z 文件吗？

不可以，macOS 没有内置的 7z 文件支持。内置的归档实用程序仅处理 ZIP、GZIP、BZIP2 和其他一些格式。您需要像 MacPacker 这样的第三方应用来在 Mac 上解压 7z 档案。

### Mac 上最好的免费 7z 解压工具是什么？

MacPacker 是 Mac 上最好的免费 7z 解压工具。它是开源的，支持包括 7z（带 LZMA/LZMA2 压缩）在内的 30 多种格式，处理受密码保护和多部分档案，并且没有广告或限制。与免费增值替代品不同，MacPacker 永久完全免费。

### 如何在 Mac 上解压受密码保护的 7z 文件？

当您在 MacPacker 中打开受密码保护的 7z 文件并点击"解压"时，系统会提示您输入密码。准确输入提供的密码（密码区分大小写）并点击"确定"。然后 MacPacker 将解密并解压档案内容。

### 7z 文件和 ZIP 文件有什么区别？

7z 使用 LZMA 压缩，可实现比 ZIP 更好的压缩率（更小的文件大小）。7z 还支持固实压缩和高级功能，如更强的加密。ZIP 得到更广泛的支持，因为 macOS 和 Windows 可以原生打开 ZIP 文件，而 7z 需要第三方软件。要获得最大压缩率，请使用 7z；要获得最大兼容性，请使用 ZIP。

### 我可以在不安装软件的情况下在 Mac 上解压 7z 文件吗？

不存在在不安装软件的情况下在 Mac 上解压 7z 文件的可靠选项，因为 macOS 缺少原生 7z 支持。您必须安装 GUI 应用程序（如 MacPacker）或命令行工具（如 `p7zip`）。在线 7z 解压工具确实存在，但存在安全风险——您的文件会上传到第三方服务器。

### 7z 比 RAR 好吗？

7z 和 RAR 都提供出色的压缩效果，但 7z 是开源和免费的，而 RAR 是专有的。由于 LZMA2 压缩，7z 通常可以实现稍好的压缩率。RAR 在某些社区（软件盗版、媒体分发）中有更广泛的采用，但在开源项目中首选 7z。对于 Mac 上的实际用途，MacPacker 同样处理这两种格式，因此格式选择不会影响您的解压体验。

### MacPacker 解压 7z 文件安全吗？

是的，MacPacker 完全安全。它是开源软件（您可以[在 GitHub 上查看源代码](https://github.com/sarensw/macpacker)），通过 Homebrew 和 Mac App Store 等可信渠道分发，并经过 Apple 公证。MacPacker 没有广告、没有跟踪、没有遥测——它只是在您的 Mac 本地解压档案。

---

**准备好在 Mac 上解压 7z 文件了吗？** [获取 MacPacker — Mac 上最快的 7z 解压工具](https://macpacker.app/zh#download)

MacPacker 免费、开源，支持 30 多种档案格式。无广告、无跟踪、无限制。
