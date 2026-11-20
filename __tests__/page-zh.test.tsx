import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import zh from "@/lib/translations/zh.json";
import { releaseFixtureZh } from "./fixtures/release";

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
  usePathname: () => "/zh",
}));

vi.mock("@/lib/release", () => ({
  getReleaseData: vi.fn().mockResolvedValue(releaseFixtureZh),
}));

import HomePage from "@/app/[locale]/page";
import ChangelogPage from "@/app/[locale]/changelog/page";

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
    expect(nav).toHaveTextContent(zh.nav.features);
    expect(nav).toHaveTextContent(zh.nav.docs);
    expect(nav).toHaveTextContent(zh.nav.changelog);
    expect(nav.querySelector('a[href="/zh/changelog"]')).not.toBeNull();
  });

  it("renders the Chinese hero subtitle and the Chinese App Store badge", async () => {
    await renderZhPage();
    expect(screen.getByText(zh.hero.sub)).toBeInTheDocument();
    expect(screen.getAllByAltText(zh.home.appStoreAlt)[0]).toHaveAttribute(
      "src",
      "/img/badges/mac-app-store-black-zh-cn.svg",
    );
  });

  it("renders the Chinese feature tiles", async () => {
    await renderZhPage();
    expect(screen.getByText(zh.home.browseTitle)).toBeInTheDocument();
    expect(screen.getByText(zh.home.finderTitle)).toBeInTheDocument();
    expect(screen.getByAltText(zh.home.finderAlt)).toBeInTheDocument();
  });

  it("renders the Chinese open source section", async () => {
    await renderZhPage();
    expect(screen.getByText(zh.home.ossTitle)).toBeInTheDocument();
  });

  it("renders Chinese footer privacy link with locale prefix", async () => {
    await renderZhPage();
    const link = screen.getByText(zh.footer.links.privacy).closest("a");
    expect(link).toHaveAttribute("href", "/zh/privacy");
  });

  it("renders Chinese footer imprint link with locale prefix", async () => {
    await renderZhPage();
    const link = screen.getByText(zh.footer.links.imprint).closest("a");
    expect(link).toHaveAttribute("href", "/zh/imprint");
  });
});

describe("Chinese changelog page", () => {
  it("renders the release titles in Chinese", async () => {
    const jsx = await ChangelogPage({ params: Promise.resolve({ locale: "zh" }) });
    render(<>{jsx}</>);
    expect(screen.getByText("支持 WIM")).toBeInTheDocument();
  });
});
