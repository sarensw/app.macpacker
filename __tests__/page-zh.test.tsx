import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import zh from "@/lib/translations/zh.json";

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
  usePathname: () => "/zh",
}));

// Mock next/font/google
vi.mock("next/font/google", () => ({
  Newsreader: () => ({ variable: "mock-newsreader-variable" }),
}));

import HomePage from "@/app/[locale]/page";

async function renderZhPage() {
  const paramsPromise = Promise.resolve({ locale: "zh" });
  const jsx = await HomePage({ params: paramsPromise });
  return render(<>{jsx}</>);
}

afterEach(() => {
  cleanup();
});

describe("Chinese page - sections", () => {
  it("renders Chinese nav links", async () => {
    await renderZhPage();
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveTextContent("功能");
    expect(nav).toHaveTextContent("格式");
    expect(nav).toHaveTextContent("开源");
    expect(nav).toHaveTextContent(zh.nav.blog);
  });

  it("renders Chinese hero badge", async () => {
    await renderZhPage();
    expect(screen.getByText(zh.hero.badge)).toBeInTheDocument();
  });

  it("renders Chinese hero emphasis", async () => {
    await renderZhPage();
    expect(screen.getByText(zh.hero.titleEm)).toBeInTheDocument();
  });

  it("renders Chinese hero subtitle", async () => {
    await renderZhPage();
    expect(screen.getByText(zh.hero.sub)).toBeInTheDocument();
  });

  it("renders Chinese direct download button", async () => {
    await renderZhPage();
    // The hero and CTA both have direct download; just check at least one exists
    const directDownloads = screen.getAllByText(zh.hero.directDownload);
    expect(directDownloads.length).toBeGreaterThanOrEqual(1);
  });

  it("renders brew command (same in both locales)", async () => {
    await renderZhPage();
    expect(
      screen.getByText("brew install --cask macpacker")
    ).toBeInTheDocument();
  });

  it("renders Chinese formats section", async () => {
    await renderZhPage();
    expect(screen.getByText(zh.formats.eyebrow)).toBeInTheDocument();
    expect(screen.getByText(zh.formats.title)).toBeInTheDocument();
  });

  it("renders all 6 Chinese features", async () => {
    await renderZhPage();
    expect(screen.getByText(zh.features.peek.title)).toBeInTheDocument();
    expect(screen.getByText(zh.features.nested.title)).toBeInTheDocument();
    expect(screen.getByText(zh.features.selective.title)).toBeInTheDocument();
    expect(screen.getByText(zh.features.native.title)).toBeInTheDocument();
    expect(screen.getByText(zh.features.quicklook.title)).toBeInTheDocument();
    expect(screen.getByText(zh.features.finder.title)).toBeInTheDocument();
  });

  it("renders Chinese how-it-works section", async () => {
    await renderZhPage();
    expect(screen.getByText(zh.howItWorks.open.title)).toBeInTheDocument();
    expect(screen.getByText(zh.howItWorks.browse.title)).toBeInTheDocument();
    expect(screen.getByText(zh.howItWorks.extract.title)).toBeInTheDocument();
  });

  it("renders Chinese open source section", async () => {
    await renderZhPage();
    expect(screen.getByText(zh.openSource.viewOnGithub)).toBeInTheDocument();
  });

  it("renders Chinese blog posts", async () => {
    await renderZhPage();
    for (const post of zh.blog.posts) {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    }
  });

  it("renders Chinese CTA", async () => {
    await renderZhPage();
    expect(screen.getByText(zh.cta.sub)).toBeInTheDocument();
  });

  it("renders Chinese footer", async () => {
    await renderZhPage();
    expect(screen.getByText(zh.footer.copyright)).toBeInTheDocument();
    expect(screen.getByText(zh.footer.author)).toBeInTheDocument();
  });
});

describe("Chinese page - links", () => {
  it("has locale-prefixed blog links for zh", async () => {
    await renderZhPage();
    const blogLinks = screen.getAllByText(zh.nav.blog);
    const navBlogLink = blogLinks[0].closest("a");
    expect(navBlogLink).toHaveAttribute("href", "/zh/blog");
  });

  it("has locale-prefixed privacy link for zh", async () => {
    await renderZhPage();
    const privacyLink = screen.getByText(zh.footer.privacy).closest("a");
    expect(privacyLink).toHaveAttribute("href", "/zh/privacy");
  });
});
