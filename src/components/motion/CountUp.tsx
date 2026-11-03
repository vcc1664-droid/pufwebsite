"use client";

import { useEffect, useRef, useState } from "react";

/** Viewport position (from the top, as a share of its height) where the count reaches its final value. */
const FINISH_AT = 0.4;

/**
 * Counts from `from` (0 by default) up to `value` in step with the page scroll: `from` as it enters
 * at the bottom of the screen, the full value once it has risen to FINISH_AT, and back down when
 * scrolling up.
 * The final number reserves the space, so surrounding text never shifts; screen readers and the
 * first render get the real value.
 */
export function CountUp({ value, from = 0 }: { value: number; from?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reducedMotion.matches) {
        setCurrent(value);
        return;
      }
      const viewport = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      const progress = Math.min(1, Math.max(0, (viewport - top) / (viewport * (1 - FINISH_AT))));
      setCurrent(Math.round(from + (value - from) * progress));
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
  }, [value, from]);

  return (
    <span ref={ref} className="relative inline-block">
      <span aria-hidden className="invisible">
        {value}
      </span>
      {/* Anchored right: an in-between number wider than the final one grows left, never past the edge */}
      <span aria-hidden className="absolute top-0 right-0 whitespace-nowrap">
        {current}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
