"use client";

import Link from "next/link";
import { useState } from "react";
import { QUOTE_CTA } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { NavLinks } from "./NavLinks";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-surface"
      >
        <span
          className={cn(
            "absolute h-[2px] w-5 bg-ink transition-transform duration-300",
            open ? "rotate-45" : "-translate-y-[6px]",
          )}
        />
        <span
          className={cn("absolute h-[2px] w-5 bg-ink transition-opacity duration-300", open && "opacity-0")}
        />
        <span
          className={cn(
            "absolute h-[2px] w-5 bg-ink transition-transform duration-300",
            open ? "-rotate-45" : "translate-y-[6px]",
          )}
        />
      </button>

      <div
        id="mobile-menu"
        className={cn(
          "absolute inset-x-4 top-full grid rounded-xl bg-surface transition-[grid-template-rows,opacity] duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-1 p-4 text-[15px] text-ink">
            <NavLinks onNavigate={close} className="flex flex-col" linkClassName="block py-3" />
            <Link
              href={QUOTE_CTA.href}
              onClick={close}
              className="mt-2 block py-3 underline underline-offset-4"
            >
              {QUOTE_CTA.label}
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
