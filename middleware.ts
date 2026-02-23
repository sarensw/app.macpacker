import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales, type Locale } from "@/lib/i18n";

function parseAcceptLanguage(header: string): Locale | undefined {
  if (!header) return undefined;

  // Parse "zh-CN,zh;q=0.9,en;q=0.8" into sorted [{ lang: "zh-cn", q: 1 }, ...]
  const entries = header.split(",").map((part) => {
    const [lang, ...params] = part.trim().split(";");
    const qParam = params.find((p) => p.trim().startsWith("q="));
    const q = qParam ? parseFloat(qParam.trim().slice(2)) : 1;
    return { lang: lang.trim().toLowerCase(), q: isNaN(q) ? 0 : q };
  });

  entries.sort((a, b) => b.q - a.q);

  for (const { lang } of entries) {
    // Try exact match first (e.g. "en" matches "en")
    const exact = locales.find((l) => l === lang);
    if (exact) return exact;
    // Try prefix match (e.g. "zh-cn" starts with "zh")
    const prefix = locales.find((l) => lang.startsWith(l + "-"));
    if (prefix) return prefix;
  }
  return undefined;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    /\.\w+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Detect preferred locale from Accept-Language header
  // Parse properly: extract language tags and match against supported locales
  // in order of user preference (highest quality factor first)
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferredLocale = parseAcceptLanguage(acceptLanguage);
  const locale = preferredLocale ?? defaultLocale;

  // Redirect to locale-prefixed path
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon\\.ico|.*\\..*).*)"],
};
