import Link from "next/link";
import { Suspense } from "react";
import { CONTAINER } from "@/constants/layout";
import { QUOTE_CTA } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavLinks, NavList } from "./NavLinks";

const desktopList = "flex items-center gap-8 xl:gap-[66px]";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white header-dark:bg-black">
      {/* Logo, nav pill and CTA spread with equal gaps between them */}
      <div className={cn(CONTAINER, "flex items-center justify-between py-4 lg:py-6")}>
        <div className="justify-self-start">
          <Logo />
        </div>

        <nav
          aria-label="Main"
          className="hidden h-[66px] items-center rounded-xl bg-surface px-[44px] header-dark:bg-white text-[14px] text-ink lg:flex"
        >
          {/* usePathname may suspend under cacheComponents; fall back to the same list with no active item. */}
          <Suspense fallback={<NavList pathname={null} className={desktopList} />}>
            <NavLinks className={desktopList} />
          </Suspense>
        </nav>

        <Link
          href={QUOTE_CTA.href}
          className="hidden justify-self-end text-[14px] text-ink underline underline-offset-4 transition-opacity duration-200 hover:opacity-60 lg:block header-dark:text-white"
        >
          {QUOTE_CTA.label}
        </Link>

        <MobileMenu />
      </div>
    </header>
  );
}
