import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock NextRequest and NextResponse
vi.mock("next/server", () => {
  class MockNextRequest {
    nextUrl: URL;
    headers: Map<string, string>;

    constructor(url: string, opts?: { headers?: Record<string, string> }) {
      this.nextUrl = new URL(url);
      this.headers = new Map(Object.entries(opts?.headers ?? {}));
    }
  }

  const MockNextResponse = {
    next: vi.fn(() => ({ type: "next" })),
    redirect: vi.fn((url: URL) => ({ type: "redirect", url: url.toString() })),
  };

  return { NextRequest: MockNextRequest, NextResponse: MockNextResponse };
});

import { NextResponse } from "next/server";
import { middleware } from "@/middleware";

function createRequest(
  path: string,
  headers: Record<string, string> = {}
) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { NextRequest } = require("next/server");
  return new NextRequest(`https://macpacker.app${path}`, { headers });
}

describe("middleware", () => {
  beforeEach(() => {
    vi.mocked(NextResponse.next).mockClear();
    vi.mocked(NextResponse.redirect).mockClear();
  });

  it("redirects / to /en by default (no Accept-Language)", () => {
    const req = createRequest("/");
    middleware(req);
    expect(NextResponse.redirect).toHaveBeenCalled();
    const redirectUrl = vi.mocked(NextResponse.redirect).mock.calls[0][0] as URL;
    expect(redirectUrl.pathname).toBe("/en/");
  });

  it("redirects / to /zh when Accept-Language prefers zh over en", () => {
    const req = createRequest("/", {
      "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
    });
    middleware(req);
    expect(NextResponse.redirect).toHaveBeenCalled();
    const redirectUrl = vi.mocked(NextResponse.redirect).mock.calls[0][0] as URL;
    expect(redirectUrl.pathname).toBe("/zh/");
  });

  it("redirects / to /en when Accept-Language prefers en over zh", () => {
    const req = createRequest("/", {
      "accept-language": "en-US,en;q=0.9,zh;q=0.5",
    });
    middleware(req);
    expect(NextResponse.redirect).toHaveBeenCalled();
    const redirectUrl = vi.mocked(NextResponse.redirect).mock.calls[0][0] as URL;
    expect(redirectUrl.pathname).toBe("/en/");
  });

  it("does not redirect /en", () => {
    const req = createRequest("/en");
    middleware(req);
    expect(NextResponse.next).toHaveBeenCalled();
    expect(NextResponse.redirect).not.toHaveBeenCalled();
  });

  it("does not redirect /zh", () => {
    const req = createRequest("/zh");
    middleware(req);
    expect(NextResponse.next).toHaveBeenCalled();
    expect(NextResponse.redirect).not.toHaveBeenCalled();
  });

  it("does not redirect /en/blog", () => {
    const req = createRequest("/en/blog");
    middleware(req);
    expect(NextResponse.next).toHaveBeenCalled();
    expect(NextResponse.redirect).not.toHaveBeenCalled();
  });

  it("skips static files", () => {
    const req = createRequest("/favicon.ico");
    middleware(req);
    expect(NextResponse.next).toHaveBeenCalled();
    expect(NextResponse.redirect).not.toHaveBeenCalled();
  });

  it("skips _next paths", () => {
    const req = createRequest("/_next/static/chunk.js");
    middleware(req);
    expect(NextResponse.next).toHaveBeenCalled();
    expect(NextResponse.redirect).not.toHaveBeenCalled();
  });

  it("skips API routes", () => {
    const req = createRequest("/api/test");
    middleware(req);
    expect(NextResponse.next).toHaveBeenCalled();
    expect(NextResponse.redirect).not.toHaveBeenCalled();
  });
});
