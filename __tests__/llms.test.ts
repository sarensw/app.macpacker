import { describe, it, expect } from "vitest";
import { buildLlmsTxt, buildLlmsFullTxt } from "@/lib/llms";
import { getAllFormatSlugs } from "@/lib/formats";
import { getCompetitorSlugs, getPairComparison } from "@/lib/compare";
import { SITE_URL } from "@/lib/seo";
import { releaseFixture } from "./fixtures/release";

describe("llms.txt builders", () => {
  it("llms.txt reflects the live version and download URLs", () => {
    const txt = buildLlmsTxt(releaseFixture);
    expect(txt).toContain(`Version: ${releaseFixture.latestVersion} (latest)`);
    expect(txt).toContain(releaseFixture.latestDmgUrl);
    expect(txt).toContain(releaseFixture.latestZipUrl);
    expect(txt).toContain("https://macpacker.app/llms-full.txt");
  });

  it("llms-full.txt contains every format guide with its canonical URL", () => {
    const txt = buildLlmsFullTxt(releaseFixture);
    for (const slug of getAllFormatSlugs()) {
      expect(txt).toContain(`https://macpacker.app/en/docs/${slug}`);
    }
    expect(txt).toContain("Q: Is MacPacker free?");
  });

  it("llms-full.txt carries the comparison matrix for the hub and every head-to-head", () => {
    const txt = buildLlmsFullTxt(releaseFixture);

    expect(txt).toContain(`${SITE_URL}/en/compare`);
    for (const slug of getCompetitorSlugs()) {
      expect(txt).toContain(`${SITE_URL}/en/compare/${slug}`);
      const name = getPairComparison("en", slug)!.competitor.name;
      expect(txt).toContain(`### MacPacker vs ${name}`);
    }

    // Rows are stated as read/write per app, not as glyphs.
    expect(txt).toContain("MacPacker yes/yes");
    expect(txt).not.toMatch(/[●◑○]/);
  });

  it("llms-full.txt states MacPacker's write support as ZIP only", () => {
    const txt = buildLlmsFullTxt(releaseFixture);

    // The ZIP row is the one place MacPacker writes; 7z is read-only for it.
    expect(txt).toMatch(/^ZIP \(\.zip[^)]*\): MacPacker yes\/yes/m);
    expect(txt).toMatch(/^7z \(\.7z\): MacPacker yes\/no/m);
  });
});
