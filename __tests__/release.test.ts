import { describe, it, expect, vi, afterEach } from "vitest";
import { getReleaseData } from "@/lib/release";

const appcast = `<?xml version="1.0" encoding="utf-8"?>
<rss xmlns:sparkle="http://www.andymatuschak.org/xml-namespaces/sparkle" version="2.0">
  <channel>
    <title>MacPacker</title>
    <item>
      <title>0.22.0-beta.2</title>
      <pubDate>Fri, 04 Sep 2026 21:57:31 +0000</pubDate>
      <sparkle:channel>beta</sparkle:channel>
      <enclosure url="https://macpacker-releases.s3.eu-central-1.amazonaws.com/MacPacker_v0.22.0-beta.2.zip" />
    </item>
    <item>
      <title>0.21.0</title>
      <pubDate>Mon, 24 Aug 2026 23:49:32 +0000</pubDate>
      <enclosure url="https://macpacker-releases.s3.eu-central-1.amazonaws.com/MacPacker_v0.21.0.zip" />
    </item>
  </channel>
</rss>`;

const changelog = {
  comingNext: { en: "next", "zh-Hans": "下一步" },
  versions: [{ version: "0.21.0", items: [{ type: "feat", title: { en: "cbz support" } }] }],
};

afterEach(() => vi.unstubAllGlobals());

function stubFetch() {
  vi.stubGlobal("fetch", async (url: string) =>
    url.endsWith("appcast.xml")
      ? new Response(appcast, { status: 200 })
      : new Response(JSON.stringify(changelog), { status: 200 }),
  );
}

describe("getReleaseData", () => {
  it("links downloads to the latest non-beta GitHub release", async () => {
    stubFetch();
    const r = await getReleaseData("en");
    expect(r.latestDmgUrl).toBe(
      "https://github.com/sarensw/MacPacker/releases/download/v0.21.0/MacPacker_v0.21.0.dmg",
    );
    expect(r.latestZipUrl).toBe(
      "https://github.com/sarensw/MacPacker/releases/download/v0.21.0/MacPacker_v0.21.0.zip",
    );
    expect(r.releases[0].date).toBe("Mon, 24 Aug 2026 23:49:32 +0000");
  });

  it("falls back when both feeds fail", async () => {
    vi.stubGlobal("fetch", async () => {
      throw new Error("offline");
    });
    const r = await getReleaseData("en");
    expect(r.latestDmgUrl).toContain("github.com/sarensw/MacPacker/releases/download/");
  });
});
