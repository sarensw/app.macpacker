import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import en from "@/lib/translations/en.json";

// Mock next/link
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

// Mock next/navigation
vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
  usePathname: () => "/en",
}));

// Mock next/font/google
vi.mock("next/font/google", () => ({
  Newsreader: () => ({ variable: "mock-newsreader-variable" }),
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

describe("English page - hero and nav", () => {
  it("renders the nav with MacPacker wordmark", async () => {
    await renderEnPage();
    expect(screen.getByText("MacPacker")).toBeInTheDocument();
  });

  it("renders navigation links", async () => {
    await renderEnPage();
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveTextContent("Features");
    expect(nav).toHaveTextContent("Formats");
    expect(nav).toHaveTextContent("Open Source");
    expect(nav).toHaveTextContent("Blog");
  });

  it("renders the hero badge", async () => {
    await renderEnPage();
    expect(screen.getByText(en.hero.badge)).toBeInTheDocument();
  });

  it("renders hero heading with emphasis", async () => {
    await renderEnPage();
    expect(screen.getByText(en.hero.titleEm)).toBeInTheDocument();
  });

  it("renders hero subtitle", async () => {
    await renderEnPage();
    expect(screen.getByText(en.hero.sub)).toBeInTheDocument();
  });

  it("renders download buttons", async () => {
    await renderEnPage();
    expect(screen.getByText("Mac App Store")).toBeInTheDocument();
    expect(screen.getByText("GitHub Releases")).toBeInTheDocument();
  });

  it("renders the brew copy button", async () => {
    await renderEnPage();
    expect(
      screen.getByText("brew install --cask macpacker")
    ).toBeInTheDocument();
  });
});

describe("English page - sections", () => {
  it("renders the formats section", async () => {
    await renderEnPage();
    expect(screen.getByText(en.formats.eyebrow)).toBeInTheDocument();
    expect(screen.getByText(en.formats.title)).toBeInTheDocument();
    expect(screen.getByText("ZIP")).toBeInTheDocument();
    expect(screen.getByText("RAR")).toBeInTheDocument();
    expect(screen.getByText("7z")).toBeInTheDocument();
    expect(screen.getByText("DMG")).toBeInTheDocument();
  });

  it("renders all 6 features", async () => {
    await renderEnPage();
    expect(screen.getByText(en.features.peek.title)).toBeInTheDocument();
    expect(screen.getByText(en.features.nested.title)).toBeInTheDocument();
    expect(screen.getByText(en.features.selective.title)).toBeInTheDocument();
    expect(screen.getByText(en.features.native.title)).toBeInTheDocument();
    expect(screen.getByText(en.features.quicklook.title)).toBeInTheDocument();
    expect(screen.getByText(en.features.finder.title)).toBeInTheDocument();
  });

  it("renders the how-it-works section", async () => {
    await renderEnPage();
    expect(screen.getByText(en.howItWorks.open.title)).toBeInTheDocument();
    expect(screen.getByText(en.howItWorks.browse.title)).toBeInTheDocument();
    expect(screen.getByText(en.howItWorks.extract.title)).toBeInTheDocument();
  });

  it("renders the open source section", async () => {
    await renderEnPage();
    expect(screen.getByText(en.openSource.viewOnGithub)).toBeInTheDocument();
  });

  it("renders the languages section", async () => {
    await renderEnPage();
    expect(screen.getByText(en.languages.title)).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Deutsch")).toBeInTheDocument();
  });

  it("renders all tech strip items", async () => {
    await renderEnPage();
    for (const item of en.techStrip.items) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });

  it("renders 3 blog posts", async () => {
    await renderEnPage();
    for (const post of en.blog.posts) {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    }
  });

  it("renders the CTA section", async () => {
    await renderEnPage();
    expect(screen.getByText(en.cta.sub)).toBeInTheDocument();
  });

  it("renders the footer", async () => {
    await renderEnPage();
    expect(screen.getByText(en.footer.copyright)).toBeInTheDocument();
    expect(screen.getByText(en.footer.author)).toBeInTheDocument();
  });
});

describe("English page - links", () => {
  it("has correct anchor links for sections", async () => {
    await renderEnPage();
    const nav = screen.getByRole("navigation");
    const links = nav.querySelectorAll("a");
    const hrefs = Array.from(links).map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("#features");
    expect(hrefs).toContain("#formats");
    expect(hrefs).toContain("#open-source");
  });

  it("has locale-prefixed blog link in nav", async () => {
    await renderEnPage();
    const blogLinks = screen.getAllByText(en.nav.blog);
    const navBlogLink = blogLinks[0].closest("a");
    expect(navBlogLink).toHaveAttribute("href", "/en/blog");
  });

  it("has locale-prefixed privacy link in footer", async () => {
    await renderEnPage();
    const privacyLink = screen.getByText(en.footer.privacy).closest("a");
    expect(privacyLink).toHaveAttribute("href", "/en/privacy");
  });

  it("has correct App Store link", async () => {
    await renderEnPage();
    const appStoreLink = screen.getByText("Mac App Store").closest("a");
    expect(appStoreLink).toHaveAttribute(
      "href",
      "https://apps.apple.com/us/app/macpacker/id6473273874"
    );
  });

  it("has correct GitHub releases link", async () => {
    await renderEnPage();
    const githubLink = screen.getByText("GitHub Releases").closest("a");
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/sarensw/MacPacker/releases"
    );
  });
});
