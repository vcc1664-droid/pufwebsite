"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Share of the viewport height scrolled (from entering at the bottom) to reach its place. */
const RISE_DISTANCE = 0.7;

/**
 * Starts its children pushed down by `from` (any CSS length) and slides them up into their
 * normal place as they scroll into view, then holds them there. Layout is untouched.
 */
export function ScrollRise({
  children,
  className,
  from,
}: {
  children: ReactNode;
  className?: string;
  from: string;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reducedMotion.matches) {
        inner.style.transform = "";
        inner.style.opacity = "";
        return;
      }
      const viewport = window.innerHeight;
      // Measured on the untransformed wrapper so the slide doesn't feed back into progress.
      const progress = Math.min(
        1,
        Math.max(0, (viewport - outer.getBoundingClientRect().top) / (viewport * RISE_DISTANCE)),
      );
      inner.style.transform = `translateY(calc(${from} * ${1 - progress}))`;
      inner.style.opacity = String(progress);
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
  }, [from]);

  return (
    <div ref={outerRef} className={className}>
      <div ref={innerRef} style={{ willChange: "transform, opacity" }}>
        {children}
      </div>
    </div>
  );
}
