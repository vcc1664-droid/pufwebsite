/**
 * The site's one canonical origin (www or non-www, never both), e.g. "https://www.synergypuf.com".
 * Set NEXT_PUBLIC_SITE_URL in the host's environment; the sitemap, robots.txt, metadataBase and the
 * www/non-www redirect in next.config.ts all follow it.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.synergypuf.com").replace(/\/+$/, "");
