"use client";

import { useEffect, useRef, useState } from "react";

/** How long the count takes from start to final value. */
const DURATION_MS = 1600;
/** Share of the number that must be on screen before it can start. */
const VISIBLE_SHARE = 0.6;

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/**
 * Counts from `from` (0 by default) up to `value` once: as soon as the number is on screen (while
 * scrolling or not), it rises smoothly to `value` and then stays there. It never counts down.
 * With `replay`, it resets once it has fully left the screen and counts up again on the next visit.
 * The final number reserves the space, so surrounding text never shifts; screen readers and the
 * first render get the real value.
 */
export function CountUp({
  value,
  from = 0,
  locale,
  replay = false,
}: {
  value: number;
  from?: number;
  /** Count up again each time the number comes back into view. */
  replay?: boolean;
  /** Adds digit grouping in this locale's style, e.g. "en-IN" shows 5,00,000. Plain digits without it. */
  locale?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(value);
  const show = (n: number) => (locale ? n.toLocaleString(locale) : String(n));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reduced motion: the real value from the first render simply stays
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let inView = false;
    let started = false;
    // Show the starting number until the count begins
    let frame = requestAnimationFrame(() => {
      if (!started) setCurrent(from);
    });

    const run = () => {
      started = true;
      // Counting once: nothing more to watch. Replaying keeps watching for the next visit.
      if (!replay) cleanup();
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION_MS);
        setCurrent(Math.round(from + (value - from) * easeOutCubic(t)));
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    // Starts as soon as enough of the number is on screen
    const maybeStart = () => {
      if (inView && !started) run();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.intersectionRatio >= VISIBLE_SHARE;
        if (replay && !entry.isIntersecting) {
          // Fully off screen: stop and reset, so the next visit counts up from the start again
          cancelAnimationFrame(frame);
          started = false;
          setCurrent(from);
          return;
        }
        maybeStart();
      },
      { threshold: [0, VISIBLE_SHARE] },
    );
    observer.observe(el);

    function cleanup() {
      observer.disconnect();
    }

    return () => {
      cleanup();
      cancelAnimationFrame(frame);
    };
  }, [value, from, replay]);

  return (
    <span ref={ref} className="relative inline-block">
      <span aria-hidden className="invisible">
        {show(value)}
      </span>
      {/* Anchored right: an in-between number wider than the final one grows left, never past the edge */}
      <span aria-hidden className="absolute top-0 right-0 whitespace-nowrap">
        {show(current)}
      </span>
      <span className="sr-only">{show(value)}</span>
    </span>
  );
}
