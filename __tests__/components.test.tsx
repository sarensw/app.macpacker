import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import BrewCopyButton from "@/components/client/BrewCopyButton";
import LanguageSwitcher from "@/components/client/LanguageSwitcher";
import { GitHubIcon, AppleIcon, DownloadIcon, CopyIcon } from "@/components/icons";

// Mock next/navigation for LanguageSwitcher
vi.mock("next/navigation", () => ({
  usePathname: () => "/en",
}));

describe("BrewCopyButton", () => {
  beforeEach(() => {
    cleanup();
  });

  it("renders the brew command", () => {
    render(
      <BrewCopyButton
        command="brew install --cask macpacker"
        copiedLabel="Copied!"
      />
    );
    expect(
      screen.getByText("brew install --cask macpacker")
    ).toBeInTheDocument();
  });

  it("renders as a button with aria-label", () => {
    render(
      <BrewCopyButton
        command="brew install --cask macpacker"
        copiedLabel="Copied!"
      />
    );
    const button = screen.getByRole("button", {
      name: /copy command/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("renders the copied toast with status role", () => {
    render(
      <BrewCopyButton
        command="brew install --cask macpacker"
        copiedLabel="Copied!"
      />
    );
    const toast = screen.getByRole("status");
    expect(toast).toHaveTextContent("Copied!");
  });

  it("copies to clipboard on click", () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText },
    });

    render(
      <BrewCopyButton
        command="brew install --cask macpacker"
        copiedLabel="Copied!"
      />
    );

    const button = screen.getByRole("button", { name: /copy command/i });
    fireEvent.click(button);

    expect(writeText).toHaveBeenCalledWith("brew install --cask macpacker");
  });
});

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    cleanup();
  });

  it("renders EN and Chinese buttons", () => {
    render(<LanguageSwitcher locale="en" />);
    expect(screen.getByText("EN")).toBeInTheDocument();
    expect(screen.getByText("中文")).toBeInTheDocument();
  });

  it("has a group role with Language label", () => {
    render(<LanguageSwitcher locale="en" />);
    const group = screen.getByRole("group", { name: "Language" });
    expect(group).toBeInTheDocument();
  });

  it("marks EN as active when locale is en", () => {
    render(<LanguageSwitcher locale="en" />);
    const enBtn = screen.getByRole("button", { name: /english/i });
    expect(enBtn).toHaveClass("active");
    expect(enBtn).toHaveAttribute("aria-current", "true");
  });

  it("marks zh as active when locale is zh", () => {
    render(<LanguageSwitcher locale="zh" />);
    const zhBtn = screen.getByRole("button", { name: /中文/i });
    expect(zhBtn).toHaveClass("active");
    expect(zhBtn).toHaveAttribute("aria-current", "true");
  });
});

describe("Icon components", () => {
  beforeEach(() => {
    cleanup();
  });

  it("renders GitHubIcon as SVG with aria-hidden", () => {
    const { container } = render(<GitHubIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute("aria-hidden")).toBe("true");
  });

  it("renders AppleIcon as SVG with aria-hidden", () => {
    const { container } = render(<AppleIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute("aria-hidden")).toBe("true");
  });

  it("renders DownloadIcon as SVG with aria-hidden", () => {
    const { container } = render(<DownloadIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute("aria-hidden")).toBe("true");
  });

  it("renders CopyIcon as SVG with aria-hidden", () => {
    const { container } = render(<CopyIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute("aria-hidden")).toBe("true");
  });
});
