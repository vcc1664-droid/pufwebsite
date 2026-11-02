"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/utils";

type NavListProps = {
  pathname: string | null;
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
};

function isActive(href: string, pathname: string | null) {
  if (!pathname) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/** Pure list, so it can also render as a Suspense fallback with no active item. */
export function NavList({ pathname, className, linkClassName, onNavigate }: NavListProps) {
  return (
    <ul className={className}>
      {NAV_ITEMS.map((item) => {
        const active = isActive(item.href, pathname);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "transition-opacity duration-200 hover:opacity-60",
                active && "font-bold",
                linkClassName,
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function NavLinks(props: Omit<NavListProps, "pathname">) {
  return <NavList pathname={usePathname()} {...props} />;
}
