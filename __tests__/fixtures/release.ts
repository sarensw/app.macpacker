import type { ReleaseData } from "@/lib/release";

export const releaseFixture: ReleaseData = {
  latestVersion: "0.15.1",
  latestDmgUrl:
    "https://macpacker-releases.s3.eu-central-1.amazonaws.com/MacPacker_v0.15.dmg",
  latestZipUrl:
    "https://macpacker-releases.s3.eu-central-1.amazonaws.com/MacPacker_v0.15.zip",
  comingNext: "Support for deletion of files / folders from .zip archives",
  releases: [
    {
      version: "0.15.1",
      items: [
        { type: "feat", title: "Language support for Korean", pr: 95 },
        { type: "feat", title: "Language support for Mexican Spanish", pr: 95 },
      ],
    },
    {
      version: "0.15",
      date: "Fri, 22 May 2026 12:58:11 +0000",
      items: [
        { type: "feat", title: "wim support", pr: 70 },
        { type: "feat", title: "Open password protected / encrypted archives", pr: 6 },
        { type: "feat", title: "New Welcome & About dialogs", pr: 82 },
      ],
    },
    {
      version: "0.14.1",
      date: "Sun, 15 Feb 2026 08:43:17 +0100",
      items: [
        { type: "fix", title: "Wrong translations in settings" },
        { type: "lang", title: "Language update for several languages" },
        { type: "feat", title: "Language support for Polish" },
      ],
    },
  ],
};

export const releaseFixtureZh: ReleaseData = {
  ...releaseFixture,
  comingNext: "支持从 .zip 压缩包中删除文件 / 文件夹",
  releases: [
    {
      version: "0.15.1",
      items: [
        { type: "feat", title: "新增韩语支持", pr: 95 },
        { type: "feat", title: "新增墨西哥西班牙语支持", pr: 95 },
      ],
    },
    {
      version: "0.15",
      date: "Fri, 22 May 2026 12:58:11 +0000",
      items: [
        { type: "feat", title: "支持 WIM", pr: 70 },
        { type: "feat", title: "打开受密码保护/加密的压缩包", pr: 6 },
        { type: "feat", title: "新欢迎界面和关于界面", pr: 82 },
      ],
    },
    {
      version: "0.14.1",
      date: "Sun, 15 Feb 2026 08:43:17 +0100",
      items: [
        { type: "fix", title: "设置中翻译错误" },
        { type: "lang", title: "多种语言更新" },
        { type: "feat", title: "新增波兰语支持" },
      ],
    },
  ],
};
