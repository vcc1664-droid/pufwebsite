import type { NavItem } from "@/types/navigation";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Applications", href: "/applications" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

export const QUOTE_CTA: NavItem = { label: "Start Your Quote", href: "/contact" };
