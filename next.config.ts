import type { NextConfig } from "next";

// Canonical origin (keep in sync with src/lib/site.ts). The other www/non-www variant redirects to it.
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.synergypuf.com").replace(/\/+$/, "");
const canonicalHost = new URL(SITE_URL).host;
const otherHost = canonicalHost.startsWith("www.") ? canonicalHost.slice(4) : `www.${canonicalHost}`;

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        // www ↔ non-www: 301 to the one canonical domain, keeping the path
        source: "/:path*",
        has: [{ type: "host", value: otherHost }],
        destination: `${SITE_URL}/:path*`,
        statusCode: 301,
      },
    ];
  },
  experimental: {
    agentFeedback: true,
    agentUpgrade: "security",
  },
  devIndicators: false,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
