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
import ImprintPage from "@/app/[locale]/imprint/page";
import ChangelogPage from "@/app/[locale]/changelog/page";
import { formatCount, extensionCount } from "@/lib/format-chips";

async function renderEnPage() {
  const paramsPromise = Promise.resolve({ locale: "en" });
  const jsx = await HomePage({ params: paramsPromise });
  return render(<>{jsx}</>);
}

const linkOf = (text: string) => screen.getByText(text).closest("a");

afterEach(() => {
  cleanup();
});

describe("English page - header", () => {
  it("renders the MacPacker wordmark in the header", async () => {
    await renderEnPage();
    expect(screen.getByRole("banner")).toHaveTextContent("MacPacker");
  });

  it("links Features, Docs, Changelog and Blog", async () => {
    await renderEnPage();
    const nav = screen.getByRole("navigation");
    for (const [label, href] of [
      ["Features", "/en#features"],
      ["Docs", "/en/docs"],
      ["Changelog", "/en/changelog"],
      ["Blog", "/en/blog"],
    ]) {
      expect(nav.querySelector(`a[href="${href}"]`)?.textContent).toBe(label);
    }
  });

  it("sends the Download button to the download section", async () => {
    await renderEnPage();
    const dl = screen.getByRole("navigation").querySelector('a[href="/en#get"]');
    expect(dl?.textContent).toBe(en.nav.downloadCta);
  });
});

describe("English page - hero", () => {
  it("renders the title, the lede and the latest version", async () => {
    await renderEnPage();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(en.hero.title);
    expect(screen.getByText(en.hero.sub)).toBeInTheDocument();
    expect(screen.getByText("v0.15.1")).toBeInTheDocument();
  });

  it("links the App Store badge, in the hero and the download section", async () => {
    await renderEnPage();
    const badges = screen.getAllByAltText(en.home.appStoreAlt);
    expect(badges).toHaveLength(2);
    for (const badge of badges) {
      expect(badge.closest("a")).toHaveAttribute("href", "https://apps.apple.com/us/app/macpacker/id6473273874");
    }
  });

  it("links Fork me to the repository", async () => {
    await renderEnPage();
    expect(linkOf(en.home.fork)).toHaveAttribute("href", "https://github.com/sarensw/MacPacker");
  });

  it("puts the DMG, ZIP, Homebrew and GitHub Releases in the download menu", async () => {
    await renderEnPage();
    expect(screen.getAllByText(en.home.dmgTitle)[0].closest("a")).toHaveAttribute("href", releaseFixture.latestDmgUrl);
    expect(screen.getAllByText(en.home.zipTitle)[0].closest("a")).toHaveAttribute("href", releaseFixture.latestZipUrl);
    expect(screen.getAllByText(en.home.githubTitle)[0].closest("a")).toHaveAttribute(
      "href",
      "https://github.com/sarensw/MacPacker/releases",
    );
    expect(screen.getAllByText("brew").length).toBeGreaterThan(0);
    expect(screen.getAllByText("--cask").length).toBeGreaterThan(0);
  });
});

describe("English page - plausible download events", () => {
  it.each(["dmg", "zip", "brew", "appstore", "github"])(
    "tags a %s CTA with the Download event classes",
    async (method) => {
      const { container } = await renderEnPage();
      const tagged = container.querySelectorAll(
        `.plausible-event-name\\=Download.plausible-event-method\\=${method}`,
      );
      expect(tagged.length).toBeGreaterThan(0);
    },
  );
});

describe("English page - sections", () => {
  it("renders the feature tiles", async () => {
    await renderEnPage();
    for (const title of [en.home.browseTitle, en.home.previewTitle, en.home.nestedTitle, en.home.extractTitle, en.home.finderTitle, en.home.compressTitle, en.home.createTitle]) {
      expect(screen.getByText(title)).toBeInTheDocument();
    }
  });

  it("states the format counts from the registry", async () => {
    await renderEnPage();
    expect(screen.getByText(String(formatCount))).toBeInTheDocument();
    expect(screen.getByText(`${formatCount} formats under ${extensionCount} file extensions`)).toBeInTheDocument();
    expect(linkOf(en.home.allFormats)).toHaveAttribute("href", "/en/docs");
  });

  it("lists every extension group and the 22 languages", async () => {
    await renderEnPage();
    for (const ext of ["7z", "rar", "tar.gz", "lzma", "dmg", "iso"]) {
      expect(screen.getAllByText(ext).length).toBeGreaterThan(0);
    }
    expect(screen.getByText("Tiếng Việt")).toBeInTheDocument();
    expect(screen.getByText("繁體中文").closest("li")).toHaveAttribute("lang", "zh-Hant-TW");
  });

  it("links the donation buttons to the app's own accounts", async () => {
    await renderEnPage();
    expect(screen.getByAltText(en.home.bmcAlt).closest("a")).toHaveAttribute("href", "https://www.buymeacoffee.com/sarensw");
    expect(screen.getByLabelText(en.home.paypal)).toHaveAttribute(
      "href",
      "https://www.paypal.com/donate/?hosted_button_id=KM8GA7MJMYNQN",
    );
    expect(screen.getByLabelText(en.home.sponsorLabel)).toHaveAttribute("href", "https://github.com/sponsors/sarensw");
  });

  it("renders every FAQ item with matching FAQPage JSON-LD", async () => {
    const { container } = await renderEnPage();
    expect(container.querySelectorAll("#faq details")).toHaveLength(en.faq.items.length);
    const ld = JSON.parse(container.querySelector('#faq script[type="application/ld+json"]')?.textContent ?? "{}");
    expect(ld.mainEntity).toHaveLength(en.faq.items.length);
  });
});

describe("English page - footer", () => {
  it("links every page with the locale prefix", async () => {
    await renderEnPage();
    const footer = screen.getByRole("contentinfo");
    for (const href of ["/en/privacy", "/en/imprint", "/en/changelog", "/en/docs", "/en/press", "/en#specs", "/en/compare/keka"]) {
      expect(footer.querySelector(`a[href="${href}"]`)).not.toBeNull();
    }
  });

  it("renders the author name", async () => {
    await renderEnPage();
    expect(screen.getByText(en.footer.author)).toBeInTheDocument();
  });
});

describe("English changelog page", () => {
  async function renderChangelog() {
    const jsx = await ChangelogPage({ params: Promise.resolve({ locale: "en" }) });
    return render(<>{jsx}</>);
  }

  it("lists every release, newest first, with the Latest badge", async () => {
    await renderChangelog();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(en.changelog.heading);
    expect(screen.getAllByText(/v0\.15\.1/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/^v0\.15$/)).toBeInTheDocument();
    expect(screen.getByText(/v0\.14\.1/)).toBeInTheDocument();
    expect(screen.getByText(en.changelog.latestBadge)).toBeInTheDocument();
  });

  it("renders the coming next line", async () => {
    await renderChangelog();
    expect(screen.getByText(releaseFixture.comingNext as string)).toBeInTheDocument();
  });
});

// The app's "Legal Notice" button opens /imprint in every shipped version.
describe("English imprint page", () => {
  it("names the service provider", async () => {
    const jsx = await ImprintPage({ params: Promise.resolve({ locale: "en" }) });
    render(<>{jsx}</>);
    expect(screen.getByText(/Goldmühlestraße 65/)).toBeInTheDocument();
    expect(screen.getByText("DE452469174")).toBeInTheDocument();
  });
});
