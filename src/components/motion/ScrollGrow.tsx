"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Scale the content starts from as it enters the screen. */
const START_SCALE = 0.5;
/** Share of the viewport height scrolled (from entering at the bottom) to reach full size. */
const GROW_DISTANCE = 0.7;

/**
 * Grows its children from small to their normal size as they scroll into view, then holds
 * them at full size. Layout is untouched: only a transform is applied.
 */
export function ScrollGrow({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reducedMotion.matches) {
        el.style.transform = "";
        return;
      }
      const viewport = window.innerHeight;
      const progress = Math.min(
        1,
        Math.max(0, (viewport - el.getBoundingClientRect().top) / (viewport * GROW_DISTANCE)),
      );
      el.style.transform = `scale(${START_SCALE + (1 - START_SCALE) * progress})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reducedMotion.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
