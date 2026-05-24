"use client";

import { useEffect } from "react";
import { formats, searchFormats } from "@/lib/formats";
import release from "@/lib/release.fallback.json";

// ─── DRAFT NAVIGATOR.MODELCONTEXT TYPE DECLARATIONS ───

interface ModelContextTool {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  handler: (params: Record<string, unknown>) => unknown;
}

interface ModelContext {
  addTool: (tool: ModelContextTool) => void;
}

declare global {
  interface Navigator {
    readonly modelContext?: ModelContext;
  }
}

interface ReleaseSnapshot {
  latestVersion: string;
  latestDmgUrl: string;
  latestZipUrl: string;
  comingNext: { en: string | null; zh: string | null };
  releases: {
    en: Array<{
      version: string;
      date?: string;
      items: Array<{ type: string; title: string; pr?: number }>;
    }>;
    zh: Array<{
      version: string;
      date?: string;
      items: Array<{ type: string; title: string; pr?: number }>;
    }>;
  };
}

const r = release as ReleaseSnapshot;

// ─── TOOL HANDLERS ───

function handleGetInstallOptions() {
  return {
    app_store: {
      name: "Mac App Store",
      url: "https://apps.apple.com/us/app/macpacker/id6473273874",
      method: "Click to install from the Mac App Store",
    },
    homebrew: {
      command: "brew install --cask macpacker",
      method: "Install via Homebrew package manager",
    },
    direct_download_dmg: {
      url: r.latestDmgUrl,
      method: "Download the latest .dmg directly",
    },
    direct_download_zip: {
      url: r.latestZipUrl,
      method: "Download the latest .zip directly",
    },
    github_releases: {
      url: "https://github.com/sarensw/MacPacker/releases",
      method: "Browse all releases on GitHub",
    },
  };
}

function handleGetLatestRelease() {
  return {
    version: r.latestVersion,
    download_dmg: r.latestDmgUrl,
    download_zip: r.latestZipUrl,
    releases_page: "https://github.com/sarensw/MacPacker/releases",
    app_store: "https://apps.apple.com/us/app/macpacker/id6473273874",
    platform: "macOS 14+",
    architecture: "Apple Silicon native (Universal)",
    license: "GPL-3.0",
    price: "Free",
    repository: "https://github.com/sarensw/MacPacker",
  };
}

function handleGetChangelog(params: Record<string, unknown>) {
  const locale = params.locale === "zh" ? "zh" : "en";
  const limit = typeof params.limit === "number" ? params.limit : 5;
  const releases = (r.releases[locale] ?? r.releases.en).slice(0, limit);
  return {
    locale,
    total: releases.length,
    releases: releases.map((rel) => ({
      version: rel.version,
      date: rel.date ?? null,
      items: rel.items,
    })),
  };
}

function handleGetComingNext(params: Record<string, unknown>) {
  const locale = params.locale === "zh" ? "zh" : "en";
  return {
    locale,
    coming_next: r.comingNext[locale] ?? r.comingNext.en ?? null,
  };
}

function handleGetSupportedFormats(params: Record<string, unknown>) {
  const type = typeof params.type === "string" ? params.type : "all";
  const filtered =
    type === "all" ? formats : formats.filter((f) => f.type === type);

  return {
    total: filtered.length,
    formats: filtered.map((f) => ({
      slug: f.slug,
      name: f.displayName,
      fullName: f.fullName,
      extensions: f.extensions,
      type: f.type,
      popular: f.popular,
      description: f.description,
      selectiveExtraction: f.macpackerSelectiveExtraction,
      docsUrl: `https://macpacker.app/en/docs/${f.slug}`,
    })),
  };
}

function handleSearchDocs(params: Record<string, unknown>) {
  const query = typeof params.query === "string" ? params.query : "";
  if (!query) {
    return { results: [], query: "", message: "No query provided." };
  }

  const matches = searchFormats(query);
  return {
    query,
    results: matches.map((f) => ({
      title: f.articleTitle,
      url: `https://macpacker.app/en/docs/${f.slug}`,
      description: f.description,
      format: f.displayName,
      extensions: f.extensions,
      type: f.type,
    })),
    total: matches.length,
  };
}

function handleOpenIssueTemplate(params: Record<string, unknown>) {
  const type = typeof params.type === "string" ? params.type : "bug";
  const title = typeof params.title === "string" ? params.title : "";

  const labels: Record<string, string> = {
    bug: "bug",
    feature: "enhancement",
    question: "question",
  };

  const baseUrl = "https://github.com/sarensw/MacPacker/issues/new";
  const searchParams = new URLSearchParams();

  if (labels[type]) {
    searchParams.set("labels", labels[type]);
  }
  if (title) {
    searchParams.set("title", title);
  }
  if (type === "bug") {
    searchParams.set("template", "bug_report.md");
  } else if (type === "feature") {
    searchParams.set("template", "feature_request.md");
  }

  const query = searchParams.toString();
  const url = query ? `${baseUrl}?${query}` : baseUrl;

  return {
    url,
    type,
    confirmation_required: true,
    message: `Open this URL to file a ${type} report for MacPacker.`,
  };
}

// ─── COMPONENT ───

export default function WebMCP() {
  useEffect(() => {
    const ctx = navigator.modelContext;
    if (!ctx) return;

    ctx.addTool({
      name: "get_install_options",
      description:
        "Get all available installation methods for MacPacker on macOS (App Store, Homebrew, direct DMG/ZIP, GitHub releases)",
      parameters: {},
      handler: handleGetInstallOptions,
    });

    ctx.addTool({
      name: "get_latest_release",
      description:
        "Get information about the latest MacPacker release: version, download URLs, platform, license",
      parameters: {},
      handler: handleGetLatestRelease,
    });

    ctx.addTool({
      name: "get_changelog",
      description:
        "Get MacPacker changelog entries with version, date, and items (features/fixes/core/lang). Returns the most recent releases.",
      parameters: {
        type: "object",
        properties: {
          locale: {
            type: "string",
            enum: ["en", "zh"],
            description: "Localized release titles. Default: en",
          },
          limit: {
            type: "number",
            description: "Maximum number of releases to return. Default: 5",
          },
        },
      },
      handler: handleGetChangelog,
    });

    ctx.addTool({
      name: "get_coming_next",
      description:
        "Get the next-up feature MacPacker is currently working on, in the requested locale",
      parameters: {
        type: "object",
        properties: {
          locale: {
            type: "string",
            enum: ["en", "zh"],
            description: "Localized text. Default: en",
          },
        },
      },
      handler: handleGetComingNext,
    });

    ctx.addTool({
      name: "get_supported_formats",
      description:
        "Get all archive and disk image formats supported by MacPacker, with names, extensions, and docs URLs",
      parameters: {
        type: "object",
        properties: {
          type: {
            type: "string",
            enum: [
              "archive",
              "disk-image",
              "compression",
              "installer",
              "all",
            ],
            description: "Filter by format type. Default: all",
          },
        },
      },
      handler: handleGetSupportedFormats,
    });

    ctx.addTool({
      name: "search_docs",
      description:
        "Search MacPacker documentation for format-specific guides by name, extension, or keyword",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Search query (format name, extension, or topic)",
          },
        },
        required: ["query"],
      },
      handler: handleSearchDocs,
    });

    ctx.addTool({
      name: "open_issue_template",
      description:
        "Get a URL to open a GitHub issue for MacPacker with a pre-filled template (bug, feature, or question)",
      parameters: {
        type: "object",
        properties: {
          type: {
            type: "string",
            enum: ["bug", "feature", "question"],
            description: "Type of issue to create",
          },
          title: {
            type: "string",
            description: "Issue title",
          },
        },
        required: ["type"],
      },
      handler: handleOpenIssueTemplate,
    });
  }, []);

  return null;
}
