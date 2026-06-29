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
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://analytics.ahrefs.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self'",
  "connect-src 'self' https://analytics.ahrefs.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
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
