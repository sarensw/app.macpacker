import fallback from "./release.fallback.json";
import type { Locale } from "./i18n";

export type ReleaseItemType = "feat" | "fix" | "core" | "lang";

export interface ReleaseItem {
  type: ReleaseItemType;
  title: string;
  pr?: number;
}

export interface Release {
  version: string;
  date?: string;
  items: ReleaseItem[];
}

export interface ReleaseData {
  latestVersion: string;
  latestDmgUrl: string;
  latestZipUrl: string;
  comingNext: string | null;
  releases: Release[];
}

const CHANGELOG_URL =
  "https://macpacker-releases.s3.eu-central-1.amazonaws.com/Changelog.json";
const APPCAST_URL =
  "https://macpacker-releases.s3.eu-central-1.amazonaws.com/appcast.xml";
const GITHUB_RELEASES_URL = "https://github.com/sarensw/MacPacker/releases";
const FETCH_TIMEOUT_MS = 5000;
const REVALIDATE_SECONDS = 3600;

interface ChangelogJsonItem {
  type: string;
  title: Record<string, string>;
  pr?: number;
}
interface ChangelogJsonVersion {
  version: string;
  items: ChangelogJsonItem[];
}
interface ChangelogJson {
  comingNext: Record<string, string>;
  versions: ChangelogJsonVersion[];
}

interface AppcastInfo {
  dateByVersion: Map<string, string>;
  topNonBetaVersion: string | null;
}

interface FallbackSchema {
  latestVersion: string;
  latestDmgUrl: string;
  latestZipUrl: string;
  comingNext: { en: string | null; zh: string | null };
  releases: { en: Release[]; zh: Release[] };
}

function localeKey(locale: Locale): "en" | "zh-Hans" {
  return locale === "zh" ? "zh-Hans" : "en";
}

function fallbackKey(locale: Locale): "en" | "zh" {
  return locale === "zh" ? "zh" : "en";
}

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, {
      signal: controller.signal,
      next: { revalidate: REVALIDATE_SECONDS },
    });
  } finally {
    clearTimeout(timer);
  }
}

function parseAppcast(xml: string): AppcastInfo {
  const dateByVersion = new Map<string, string>();
  let topNonBetaVersion: string | null = null;

  // Split on <item> — chunks[0] is the channel preamble (skipped), chunks[1+] are item bodies.
  // Splitting on </item> would mix the channel <title>MacPacker</title> into chunk 0
  // alongside the first item, causing the first release to be skipped.
  const chunks = xml.split("<item>");
  for (let i = 1; i < chunks.length; i++) {
    const chunk = chunks[i];
    const titleMatch = /<title>([^<]+)<\/title>/.exec(chunk);
    if (!titleMatch) continue;
    const title = titleMatch[1].trim();

    const pubMatch = /<pubDate>([^<]+)<\/pubDate>/.exec(chunk);
    if (pubMatch) dateByVersion.set(title, pubMatch[1].trim());

    const channelMatch = /<sparkle:channel>([^<]+)<\/sparkle:channel>/.exec(
      chunk,
    );
    const isBeta = channelMatch?.[1]?.trim() === "beta";

    if (!isBeta && !topNonBetaVersion) topNonBetaVersion = title;
  }

  return { dateByVersion, topNonBetaVersion };
}

function isReleaseItemType(t: string): t is ReleaseItemType {
  return t === "feat" || t === "fix" || t === "core" || t === "lang";
}

function buildReleases(
  changelog: ChangelogJson,
  dateByVersion: Map<string, string>,
  locale: Locale,
): Release[] {
  const key = localeKey(locale);
  return changelog.versions.map((v) => {
    const items: ReleaseItem[] = v.items.map((it) => ({
      type: isReleaseItemType(it.type) ? it.type : "feat",
      title: it.title[key] ?? it.title.en ?? "",
      ...(it.pr !== undefined ? { pr: it.pr } : {}),
    }));
    const date = dateByVersion.get(v.version);
    return { version: v.version, items, ...(date ? { date } : {}) };
  });
}

// Assets ship to GitHub Releases as tag `v{version}` / `MacPacker_v{version}.{dmg,zip}`.
// The appcast enclosure still points at S3 (Sparkle's own update channel) — the site
// links to GitHub so downloads don't come off the S3 bill.
function deriveUrls(version: string | null): { zip: string; dmg: string } | null {
  if (!version) return null;
  const base = `${GITHUB_RELEASES_URL}/download/v${version}/MacPacker_v${version}`;
  return { zip: `${base}.zip`, dmg: `${base}.dmg` };
}

function fallbackData(locale: Locale): ReleaseData {
  const fb = fallback as FallbackSchema;
  const lk = fallbackKey(locale);
  return {
    latestVersion: fb.latestVersion,
    latestDmgUrl: fb.latestDmgUrl,
    latestZipUrl: fb.latestZipUrl,
    comingNext: fb.comingNext[lk] ?? null,
    releases: fb.releases[lk] ?? [],
  };
}

export async function getReleaseData(locale: Locale): Promise<ReleaseData> {
  const fb = fallbackData(locale);

  const [changelogRes, appcastRes] = await Promise.allSettled([
    fetchWithTimeout(CHANGELOG_URL),
    fetchWithTimeout(APPCAST_URL),
  ]);

  let changelog: ChangelogJson | null = null;
  if (changelogRes.status === "fulfilled" && changelogRes.value.ok) {
    try {
      changelog = (await changelogRes.value.json()) as ChangelogJson;
    } catch (err) {
      console.warn("[release] Changelog.json parse failed:", err);
    }
  } else if (changelogRes.status === "rejected") {
    console.warn("[release] Changelog.json fetch failed:", changelogRes.reason);
  }

  let appcastXml: string | null = null;
  if (appcastRes.status === "fulfilled" && appcastRes.value.ok) {
    try {
      appcastXml = await appcastRes.value.text();
    } catch (err) {
      console.warn("[release] appcast.xml read failed:", err);
    }
  } else if (appcastRes.status === "rejected") {
    console.warn("[release] appcast.xml fetch failed:", appcastRes.reason);
  }

  if (!changelog && !appcastXml) return fb;

  const appcast = appcastXml
    ? parseAppcast(appcastXml)
    : { dateByVersion: new Map<string, string>(), topNonBetaVersion: null };

  const urls = deriveUrls(appcast.topNonBetaVersion);
  const latestDmgUrl = urls?.dmg ?? fb.latestDmgUrl;
  const latestZipUrl = urls?.zip ?? fb.latestZipUrl;

  if (!changelog) {
    return { ...fb, latestDmgUrl, latestZipUrl };
  }

  const releases = buildReleases(changelog, appcast.dateByVersion, locale);
  const comingNext =
    changelog.comingNext[localeKey(locale)] ?? changelog.comingNext.en ?? null;

  return {
    latestVersion: changelog.versions[0]?.version ?? fb.latestVersion,
    latestDmgUrl,
    latestZipUrl,
    comingNext,
    releases,
  };
}
