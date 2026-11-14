import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Only /api/ exists among private routes (there is no /admin or /thank-you in this app).
// CSS, JS and images under /_next/ stay crawlable.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
