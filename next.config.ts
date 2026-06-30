import type { NextConfig } from "next";

// Baseline security + privacy headers applied to every response. These are
// SEO/best-practice signals (and harmless for a static marketing site):
// nosniff prevents MIME confusion, Referrer-Policy keeps referrers lean,
// and a minimal Permissions-Policy disables APIs the site never uses.
// Content-Security-Policy for a static marketing site. 'unsafe-inline' on
// script-src is required for Next.js's inline hydration bootstrap and the
// inline JSON-LD blocks (the site uses no nonce). The only third party is
// Ahrefs Web Analytics (script + beacon endpoint). Everything else is same
// origin; next/image and next/font are self-hosted under /_next.
//
// Dev caveat: `next dev` evaluates webpack modules via eval() and hot-reloads
// over a websocket. The hardened production CSP blocks both (no 'unsafe-eval',
// connect-src locked to 'self'), which silently breaks client hydration when
// running locally — Chromium reports the eval violation in a way most tools
// don't surface. So we relax script-src/connect-src and drop
// upgrade-insecure-requests in development only; production stays strict.
const isProd = process.env.NODE_ENV === "production";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://analytics.ahrefs.com${
    isProd ? "" : " 'unsafe-eval'"
  }`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self'",
  `connect-src 'self' https://analytics.ahrefs.com${
    isProd ? "" : " ws: wss:"
  }`,
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isProd ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    // Prefer AVIF (then WebP) for the optimized images, and let browsers cache
    // the optimized variants for 30 days instead of revalidating every visit.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
