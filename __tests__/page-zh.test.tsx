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
    expect(nav).toHaveTextContent("更新日志");
  });

  it("renders Chinese hero subtitle", async () => {
    await renderZhPage();
    expect(screen.getByText(zh.hero.sub)).toBeInTheDocument();
  });

  it("renders the 4 Chinese features", async () => {
    await renderZhPage();
    expect(screen.getByText(zh.features.peek.title)).toBeInTheDocument();
    expect(screen.getByText(zh.features.nested.title)).toBeInTheDocument();
    expect(screen.getByText(zh.features.selective.title)).toBeInTheDocument();
    expect(screen.getByText(zh.features.native.title)).toBeInTheDocument();
  });

  it("renders Chinese open source line", async () => {
    await renderZhPage();
    expect(screen.getByText(zh.openSource.viewOnGithub)).toBeInTheDocument();
  });

  it("renders the changelog rail with Chinese release titles", async () => {
    await renderZhPage();
    expect(screen.getByText("支持 WIM")).toBeInTheDocument();
  });

  it("renders Chinese footer privacy link with locale prefix", async () => {
    await renderZhPage();
    const link = screen.getByText(zh.footer.links.privacy).closest("a");
    expect(link).toHaveAttribute("href", "/zh/privacy");
  });
});
