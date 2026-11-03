"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Share of the page's scroll speed the pinned block keeps once the content starts covering it. */
const DRIFT = 0.35;

/**
 * Keeps its children behind the content that follows, so the rest of the page scrolls over them.
 * It pins once its bottom reaches the bottom of the viewport (or just under the header when it
 * fits), then keeps drifting up slowly while the next content slides over it.
 */
export function PinBehind({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const header = document.querySelector("header");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Scroll position at which the block starts to stick
    let pinStart = 0;
    let frame = 0;

    const drift = () => {
      frame = 0;
      const past = reducedMotion.matches ? 0 : Math.max(0, window.scrollY - pinStart);
      el.style.transform = past ? `translate3d(0, ${-past * DRIFT}px, 0)` : "";
    };

    const layout = () => {
      const headerHeight = header?.offsetHeight ?? 0;
      const top = Math.min(headerHeight, window.innerHeight - el.offsetHeight);
      el.style.top = `${top}px`;
      // Its untouched page position is right under the header, at the top of <main>
      pinStart = Math.max(0, (el.parentElement?.offsetTop ?? headerHeight) - top);
      drift();
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(drift);
    };

    layout();
    const observer = new ResizeObserver(layout);
    observer.observe(el);
    if (header) observer.observe(header);
    window.addEventListener("resize", layout);
    window.addEventListener("scroll", onScroll, { passive: true });
    reducedMotion.addEventListener("change", drift);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", layout);
      window.removeEventListener("scroll", onScroll);
      reducedMotion.removeEventListener("change", drift);
    };
  }, []);

  return (
    <div ref={ref} className="sticky z-0 will-change-transform">
      {children}
    </div>
  );
}
