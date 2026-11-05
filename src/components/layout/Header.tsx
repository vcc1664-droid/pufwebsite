import Link from "next/link";
import { Suspense } from "react";
import { CONTAINER } from "@/constants/layout";
import { QUOTE_CTA } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { HeaderTone } from "./HeaderTone";
import { MobileMenu } from "./MobileMenu";
import { NavLinks, NavList } from "./NavLinks";

const desktopList = "flex items-center gap-8 xl:h-[32px] xl:gap-10";

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className={cn(CONTAINER, "py-4 lg:py-6")}>
        {/* One light bar spanning the gutter: logo left, links centred, CTA right */}
        <div className="flex h-16 items-center justify-between rounded-xl bg-surface px-4 lg:grid lg:h-[79px] lg:grid-cols-[1fr_auto_1fr] lg:px-[38px]">
          <div className="justify-self-start">
            <Logo />
          </div>

          <nav aria-label="Main" className="hidden text-[16px] text-ink lg:block">
            {/* usePathname may suspend under cacheComponents; fall back to the same list with no active item. */}
            <Suspense fallback={<NavList pathname={null} className={desktopList} />}>
              <NavLinks className={desktopList} />
            </Suspense>
          </nav>

          <Link
            href={QUOTE_CTA.href}
            data-tone
            className="hidden justify-self-end text-[16px] text-ink underline underline-offset-4 transition-opacity duration-200 hover:opacity-60 lg:block on-dark:text-white"
          >
            {QUOTE_CTA.label}
          </Link>

          <MobileMenu />
        </div>
      </div>

      {/* Logo and quote link turn white over dark parts of the page */}
      <Suspense>
        <HeaderTone />
      </Suspense>
    </header>
  );
}
