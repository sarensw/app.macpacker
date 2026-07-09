import { describe, it, expect } from "vitest";
import { buildLlmsTxt, buildLlmsFullTxt } from "@/lib/llms";
import { getAllFormatSlugs } from "@/lib/formats";
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
});
