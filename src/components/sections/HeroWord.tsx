"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const word = "fill-brand font-sans";

/**
 * The hero's big word: "PUF" at the top of the page; once the page is scrolled it smoothly slides up and
 * fades out while "PIR" rises gracefully into its place with a smooth easing and fade-in.
 * Each viewBox is the cap-height ink box of its word (Plus Jakarta Sans 600, 1000 units), sharing
 * the same top and height so both words have the same letter size.
 */
export function HeroWord({ className }: { className?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const box = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const desktop = window.matchMedia("(min-width: 64rem)");
    const getSwitchThreshold = () => {
      if (desktop.matches) return Math.max(180, Math.round((window.innerHeight || 800) * 0.28));
      // Small screens: switch halfway to the point where the word would reach the header, so the
      // change happens while the word is still in view (it scrolls normally there, nothing pins it).
      const el = box.current;
      const headerHeight = document.querySelector("header")?.offsetHeight ?? 0;
      if (!el) return 120;
      const wordTop = el.getBoundingClientRect().top + window.scrollY;
      return Math.max(40, Math.round((wordTop - headerHeight) * 0.5));
    };

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

  // The outgoing word fades out almost at once and the incoming one fades in just after, so the
  // two never show together (no ghost of one behind the other) on any screen size.
  const fade = (visible: boolean) =>
    `transform 1000ms cubic-bezier(0.25, 1, 0.5, 1), opacity ${visible ? "600ms cubic-bezier(0.25, 1, 0.5, 1) 150ms" : "150ms linear"}`;

  return (
    <span ref={box} className={cn("relative block overflow-hidden", className)}>
      <span className="sr-only">{scrolled ? "PIR" : "PUF"}</span>
      {/* "PUF" smoothly slides up and fades out */}
      <svg
        aria-hidden
        viewBox="77 -745 1843 757"
        className="block w-full motion-reduce:transition-none"
        style={{
          transition: fade(!scrolled),
          willChange: "transform, opacity",
          transform: scrolled ? "translateY(-40%)" : "translateY(0)",
          opacity: scrolled ? 0 : 1,
          pointerEvents: scrolled ? "none" : "auto",
        }}
      >
        <text x="0" y="0" fontSize="1000" fontWeight="600" className={word}>
          PUF
        </text>
      </svg>
      {/*
        "PIR" rises in smoothly from below with a gentle fade-in, filling the same box as "PUF".
      */}
      <svg
        aria-hidden
        viewBox="77 -745 1843 757"
        className="absolute inset-0 block size-full motion-reduce:transition-none"
        style={{
          transition: fade(scrolled),
          willChange: "transform, opacity",
          transform: scrolled ? "translateY(0)" : "translateY(40%)",
          opacity: scrolled ? 1 : 0,
          pointerEvents: scrolled ? "auto" : "none",
        }}
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
