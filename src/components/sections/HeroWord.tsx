"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Scroll distance after which "PUF" gives way to "PIR".
 * Set high enough so "High Density PUF" remains properly visible during initial scrolling.
 */
const DEFAULT_SWITCH_AT = 240;

const word = "fill-brand font-sans";
const slide = "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

/**
 * The hero's big word: "PUF" at the top of the page; once the page is scrolled it slides up and
 * out while "PIR" rises into its place, and scrolling back to the top brings "PUF" back.
 * Each viewBox is the cap-height ink box of its word (Plus Jakarta Sans 600, 1000 units), sharing
 * the same top and height so both words have the same letter size.
 */
export function HeroWord({ className }: { className?: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const getSwitchThreshold = () =>
      Math.max(180, Math.round((window.innerHeight || 800) * 0.28));

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > getSwitchThreshold());
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <span className={cn("relative block overflow-hidden", className)}>
      <span className="sr-only">{scrolled ? "PIR" : "PUF"}</span>
      {/* "PUF" sets the size of the box */}
      <svg
        aria-hidden
        viewBox="77 -745 1843 757"
        className={cn("block w-full", slide, scrolled && "-translate-y-[105%]")}
      >
        <text x="0" y="0" fontSize="1000" fontWeight="600" className={word}>
          PUF
        </text>
      </svg>
      {/*
        "PIR" waits just below (105%, so no sliver shows) and rises in. It fills the same box as
        "PUF": P on the left edge, R on the right edge, I in between with equal gaps (letters keep
        their shape; only the spacing differs). x positions come from each letter's ink box.
      */}
      <svg
        aria-hidden
        viewBox="77 -745 1843 757"
        className={cn("absolute inset-0 block size-full", slide, !scrolled && "translate-y-[105%]")}
      >
        <text y="0" fontSize="1000" fontWeight="600" className={word}>
          <tspan x="0">P</tspan>
          <tspan x="843.1">I</tspan>
          <tspan x="1279.9">R</tspan>
        </text>
      </svg>
    </span>
  );
}
