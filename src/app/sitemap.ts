import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** Date the page content last changed; update it when pages are edited. */
const LAST_MODIFIED = new Date("2026-11-14");

type Page = { path: string; changeFrequency: "weekly" | "monthly" | "yearly"; priority: number };

// Every public page. There are no dynamic product or project routes yet; add them here when they exist.
// API routes are left out on purpose.
const PAGES: Page[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/products", changeFrequency: "monthly", priority: 0.8 },
  { path: "/applications", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.5 },
  { path: "/disclaimer", changeFrequency: "yearly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
