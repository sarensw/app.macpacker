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
  topNonBetaZipUrl: string | null;
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
  let topNonBetaZipUrl: string | null = null;

  // Split on </item> — well-formed Sparkle feed, regex is sufficient.
  const chunks = xml.split("</item>");
  for (const chunk of chunks) {
    const titleMatch = /<title>([^<]+)<\/title>/.exec(chunk);
    if (!titleMatch) continue;
    const title = titleMatch[1].trim();
    if (title === "MacPacker") continue; // channel-level title

    const pubMatch = /<pubDate>([^<]+)<\/pubDate>/.exec(chunk);
    if (pubMatch) dateByVersion.set(title, pubMatch[1].trim());

    const channelMatch = /<sparkle:channel>([^<]+)<\/sparkle:channel>/.exec(
      chunk,
    );
    const isBeta = channelMatch?.[1]?.trim() === "beta";

    if (!isBeta && !topNonBetaZipUrl) {
      const encMatch = /<enclosure[^>]*url="([^"]+)"/.exec(chunk);
      if (encMatch) topNonBetaZipUrl = encMatch[1];
    }
  }

  return { dateByVersion, topNonBetaZipUrl };
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

function deriveUrls(topZipUrl: string | null): {
  zip: string;
  dmg: string;
} | null {
  if (!topZipUrl) return null;
  // Top non-beta enclosure is the .zip; derive the .dmg sibling by extension swap.
  // Note: hero eyebrow shows Changelog.json[0].version (e.g. 0.15.1), while these
  // URLs point at the most recent appcast-published binary (e.g. 0.15). The download
  // button says just "Download" — no version — to avoid mismatch confusion.
  const base = topZipUrl.replace(/\.zip$/i, "");
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
    : { dateByVersion: new Map<string, string>(), topNonBetaZipUrl: null };

  const urls = deriveUrls(appcast.topNonBetaZipUrl);
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
