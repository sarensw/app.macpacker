import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import en from "@/lib/translations/en.json";
import { releaseFixture } from "./fixtures/release";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
  usePathname: () => "/en",
}));

vi.mock("@/lib/release", () => ({
  getReleaseData: vi.fn().mockResolvedValue(releaseFixture),
}));

import HomePage from "@/app/[locale]/page";

async function renderEnPage() {
  const paramsPromise = Promise.resolve({ locale: "en" });
  const jsx = await HomePage({ params: paramsPromise });
  return render(<>{jsx}</>);
}

afterEach(() => {
  cleanup();
});

describe("English page - header", () => {
  it("renders the MacPacker wordmark in the header", async () => {
    await renderEnPage();
    const header = screen.getByRole("banner");
    expect(header).toHaveTextContent("MacPacker");
  });

  it("renders nav links Features / Formats / Changelog", async () => {
    await renderEnPage();
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveTextContent("Features");
    expect(nav).toHaveTextContent("Formats");
    expect(nav).toHaveTextContent("Changelog");
  });

  it("renders the Download CTA in the header pointing at the DMG", async () => {
    await renderEnPage();
    const nav = screen.getByRole("navigation");
    const dl = nav.querySelector(`a[href="${releaseFixture.latestDmgUrl}"]`);
    expect(dl).not.toBeNull();
    expect(dl?.textContent).toContain("Download");
  });
});

describe("English page - hero", () => {
  it("renders the latest version in the eyebrow", async () => {
    await renderEnPage();
    expect(screen.getAllByText(/v0\.15\.1/).length).toBeGreaterThanOrEqual(1);
  });

  it("renders the brew command", async () => {
    await renderEnPage();
    expect(screen.getByText("brew")).toBeInTheDocument();
    expect(screen.getByText(/install/)).toBeInTheDocument();
    expect(screen.getByText(/--cask/)).toBeInTheDocument();
  });

  it("renders the Download .dmg button with DMG href", async () => {
    await renderEnPage();
    const buttons = screen.getAllByText(en.hero.downloadCta);
    const link = buttons[0].closest("a");
    expect(link).toHaveAttribute("href", releaseFixture.latestDmgUrl);
  });

  it("renders the .zip button with ZIP href", async () => {
    await renderEnPage();
    const link = screen.getByText(en.hero.zipCta).closest("a");
    expect(link).toHaveAttribute("href", releaseFixture.latestZipUrl);
  });

  it("renders the App Store button", async () => {
    await renderEnPage();
    const link = screen.getByText(en.hero.appStore).closest("a");
    expect(link).toHaveAttribute(
      "href",
      "https://apps.apple.com/us/app/macpacker/id6473273874",
    );
  });

  it("renders the Releases button", async () => {
    await renderEnPage();
    const link = screen.getByText(en.hero.releasesCta).closest("a");
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/sarensw/MacPacker/releases",
    );
  });
});

describe("English page - sections", () => {
  it("renders all 4 features", async () => {
    await renderEnPage();
    expect(screen.getByText(en.features.peek.title)).toBeInTheDocument();
    expect(screen.getByText(en.features.nested.title)).toBeInTheDocument();
    expect(screen.getByText(en.features.selective.title)).toBeInTheDocument();
    expect(screen.getByText(en.features.native.title)).toBeInTheDocument();
  });

  it("renders the formats chips", async () => {
    await renderEnPage();
    expect(screen.getByText("ZIP")).toBeInTheDocument();
    expect(screen.getByText("RAR")).toBeInTheDocument();
    expect(screen.getByText("7z")).toBeInTheDocument();
    expect(screen.getByText("DMG")).toBeInTheDocument();
  });

  it("renders the open source line", async () => {
    await renderEnPage();
    expect(screen.getByText(en.openSource.viewOnGithub)).toBeInTheDocument();
  });

  it("renders the translations line with POEditor link", async () => {
    await renderEnPage();
    const link = screen
      .getByText(en.translations.viewOnPoeditor)
      .closest("a");
    expect(link).toHaveAttribute(
      "href",
      "https://poeditor.com/join/project/J2Qq2SUzYr",
    );
  });

  it("renders the changelog rail with three versions", async () => {
    await renderEnPage();
    expect(screen.getAllByText(/v0\.15\.1/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/^v0\.15$/)).toBeInTheDocument();
    expect(screen.getByText(/v0\.14\.1/)).toBeInTheDocument();
  });

  it("renders the Latest badge on the top changelog entry", async () => {
    await renderEnPage();
    expect(screen.getByText(en.changelog.latestBadge)).toBeInTheDocument();
  });

  it("renders the coming next line", async () => {
    await renderEnPage();
    expect(
      screen.getByText(releaseFixture.comingNext as string),
    ).toBeInTheDocument();
  });
});

describe("English page - footer", () => {
  it("renders the privacy link with locale prefix", async () => {
    await renderEnPage();
    const link = screen.getByText(en.footer.links.privacy).closest("a");
    expect(link).toHaveAttribute("href", "/en/privacy");
  });

  it("renders the author name", async () => {
    await renderEnPage();
    expect(screen.getByText(en.footer.author)).toBeInTheDocument();
  });
});
