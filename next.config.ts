import type { NextConfig } from "next";

// Baseline security + privacy headers applied to every response. These are
// SEO/best-practice signals (and harmless for a static marketing site):
// nosniff prevents MIME confusion, Referrer-Policy keeps referrers lean,
// and a minimal Permissions-Policy disables APIs the site never uses.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
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
