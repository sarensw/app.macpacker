import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// The whole site is public, so every crawler is allowed. AI search/answer
// crawlers are named explicitly (in addition to the wildcard) so the intent
// is unambiguous and survives any future rule added above the wildcard.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
