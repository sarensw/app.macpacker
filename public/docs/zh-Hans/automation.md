---
title: 使用 macOS 快捷指令自动化档案解压
description: 使用快捷指令应用、Automator、Shell 脚本和文件夹操作自动化 Mac 上档案解压的完整指南。通过智能解压自动化简化您的工作流程。
keywords: 自动化解压 mac, 快捷指令档案 mac, automator 解压, 自动解压 mac, 文件夹操作解压
canonical: https://macpacker.app/zh/docs/automation
---

# 使用 macOS 快捷指令自动化档案解压

当您定期下载压缩文件、处理电子邮件附件或管理媒体库时，手动档案解压会变得乏味。macOS 提供强大的自动化工具——快捷指令应用、Automator、Shell 脚本和文件夹操作——可以在档案到达时自动解压，消除重复的点击和等待。无论您想要自动解压下载、在后台处理电子邮件附件，还是将自定义解压工作流程集成到开发管道中，macOS 自动化都可以实现。

## 为什么要自动化档案解压？

自动化将档案处理从手动任务转变为不可见的后台进程：

**下载工作流程**——在下载后立即自动解压软件安装程序、文档包或媒体文件，保持下载文件夹井然有序。

**电子邮件处理**——无需手动干预即可从传入电子邮件中解压附件，非常适合自动化报告处理或数据摄取工作流程。

**开发管道**——将档案解压集成到构建脚本、CI/CD 系统或部署自动化中，确保依赖项始终准备就绪。

**媒体管理**——自动解压和组织作为压缩包交付的照片收藏、视频文件或音乐档案。

**备份恢复**——创建一键工作流程，将备份档案解压并恢复到具有正确文件权限的特定位置。

**批处理**——设置监视文件夹，在档案到达时自动[解压多个档案](./batch-extraction)，非常适合处理队列或服务器上传。

## 方法 1：使用 macOS 快捷指令应用自动化解压

**快捷指令应用**（内置于 macOS Monterey 12+）提供可视化的无代码界面，用于创建包括档案解压在内的强大自动化工作流程。

### 创建基本的档案解压快捷指令

1. 打开**快捷指令**应用（在应用程序中或通过 Spotlight）
2. 点击 **+** 按钮创建新快捷指令
3. 将其命名为"解压档案"
4. 添加这些操作：

**步骤 1：接收输入**
- 搜索并添加"从快速操作接收文件输入"
- 配置为接受"文件和文件夹"

**步骤 2：解压档案**
- 搜索并添加"解压档案"操作
- 此内置操作支持 ZIP、RAR、7z、TAR 和其他常见格式
- 配置解压目标（相同文件夹、特定文件夹或提示）

**步骤 3：显示结果**
- 添加"显示结果"操作以在解压完成时显示通知
- 配置消息文本："已解压 {输入名称}"

5. 保存快捷指令
6. 在访达中右键单击任何档案 → **快速操作** → **解压档案**

### 高级快捷指令：条件解压

创建更智能的快捷指令，以不同方式处理不同的档案类型：

```
1. 接收文件输入
2. 如果：文件扩展名是"rar"
   → 解压到桌面/RAR_Files/
3. 否则如果：文件扩展名是"zip"
   → 解压到桌面/ZIP_Files/
4. 否则
   → 解压到与档案相同的文件夹
5. 显示通知："档案已解压到 {目标}"
```

### 自动化下载文件夹

使下载的档案自动解压：

1. 创建快捷指令自动化：**自动化** → **文件夹操作**
2. 选择您的**下载**文件夹
3. 触发器："当添加文件时"
4. 添加条件："如果文件扩展名是 zip、rar、7z、tar.gz..."
5. 添加操作：**解压档案**到目标文件夹
6. 可选：添加操作**移动文件**将原始档案移动到"Archives"子文件夹

现在任何下载的档案都会自动解压到您首选的位置。

## 方法 2：使用 Automator 自动化解压

**Automator** 提供比快捷指令更高级的自动化功能，特别是对于需要 Shell 脚本或自定义逻辑的复杂工作流程。

### 创建 Automator 快速操作

1. 打开 **Automator**（应用程序文件夹或 Spotlight）
2. 选择**快速操作**作为模板
3. 配置工作流程：
   - "工作流程接收当前" → **访达中的文件或文件夹**
   - "位置" → **访达**

4. 添加**运行 Shell 脚本**操作：

```bash
for archive in "$@"; do
    # 获取不带扩展名的文件名
    basename="${archive%.*}"
    destination="$HOME/Desktop/Extracted"

    # 如果不存在则创建目标
    mkdir -p "$destination"

    # 根据文件扩展名解压
    case "$archive" in
        *.zip)
            unzip -o "$archive" -d "$destination/${basename}"
            ;;
        *.rar)
            unrar x "$archive" "$destination/${basename}/"
            ;;
        *.7z)
            7z x "$archive" -o"$destination/${basename}"
            ;;
        *.tar.gz|*.tgz)
            tar xzf "$archive" -C "$destination"
            ;;
        *.tar.bz2)
            tar xjf "$archive" -C "$destination"
            ;;
    esac

    # 发送通知
    osascript -e "display notification \"已解压到 $destination/${basename}\" with title \"档案解压完成\""
done
```

5. 保存为"解压档案到桌面"
6. 在访达中右键单击档案 → **快速操作** → **解压档案到桌面**

### Automator 文件夹操作

Automator 文件夹操作监视特定文件夹，并在添加文件时自动运行工作流程。

## 方法 3：用于高级自动化的 Shell 脚本

对于开发人员和高级用户，Shell 脚本提供最大的灵活性和与现有自动化工具的集成。

### 基本解压脚本

创建 `extract.sh`：

```bash
#!/bin/bash

# 用法: ./extract.sh <archive_file> [destination]

archive="$1"
destination="${2:-.}"  # 默认为当前目录

if [ ! -f "$archive" ]; then
    echo "错误：文件未找到：$archive"
    exit 1
fi

echo "解压中：$archive"

case "$archive" in
    *.zip)
        unzip -o "$archive" -d "$destination"
        ;;
    *.rar)
        unrar x "$archive" "$destination/"
        ;;
    *.7z)
        7z x "$archive" -o"$destination"
        ;;
    *.tar.gz|*.tgz)
        tar xzf "$archive" -C "$destination"
        ;;
    *)
        echo "不支持的档案格式：$archive"
        exit 1
        ;;
esac

echo "解压完成：$destination"
```

使其可执行：`chmod +x extract.sh`

使用：`./extract.sh archive.zip ~/Desktop/extracted/`

## 常见问题

### 我可以自动解压受密码保护的档案吗？

是的，但您必须在自动化脚本中提供密码。使用环境变量或安全存储（macOS 钥匙串）来存储密码，而不是硬编码它们。示例：`unrar x -p密码 archive.rar`。

### 如何暂时停止自动解压？

对于快捷指令自动化，打开快捷指令应用并关闭自动化。对于 Automator 文件夹操作，右键单击文件夹，选择文件夹操作设置，然后禁用该操作。

### 我可以在解压后自动删除档案吗？

是的，在成功解压后向脚本添加删除：`rm "$archive"`。但是，始终先验证解压是否成功以避免数据丢失。

### 如何处理具有不同解压目标的档案？

根据文件名模式、文件大小或源位置使用条件逻辑。示例：来自电子邮件的档案转到文档/Email_Attachments，下载转到桌面/Downloads_Extracted。

### 自动化可以处理嵌套档案吗？

标准命令行工具一次解压一层。对于[嵌套档案](./nested-archives)，创建检测和解压内部档案的递归脚本，或使用智能处理嵌套的 MacPacker。

---

**准备好自动化您的档案工作流程了吗？**[下载 MacPacker——Mac 的智能档案管理](https://macpacker.app/zh#download)

将 MacPacker 强大的解压功能与 macOS 自动化相结合，实现无缝、免提的档案工作流程。免费、开源，支持 30 多种格式。
