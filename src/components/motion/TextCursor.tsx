"use client";

import { useEffect, useRef } from "react";

/** Text that makes the circle grow when the pointer is over it. */
const TEXT = "h1, h2, h3, h4, p, blockquote, dt, dd";
const SMALL = 11;
const LARGE = 60;

/**
 * A circle that follows the mouse (home page only). Over text it grows, and its difference blend
 * flips the colours underneath, so the text inside the circle stands out clearly. Mouse devices only;
 * it never blocks clicks.
 */
export function TextCursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dot.current;
    if (!el) return;
    // Only for a real mouse: touch screens have no hover
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let x = -100;
    let y = -100;
    let cx = x;
    let cy = y;
    let size = SMALL;
    let target = SMALL;
    let visible = false;
    let frame = 0;

    const tick = () => {
      // Eases towards the pointer and the target size for a smooth trail
      const k = reducedMotion ? 1 : 0.2;
      cx += (x - cx) * k;
      cy += (y - cy) * k;
      size += (target - size) * (reducedMotion ? 1 : 0.18);
      el.style.transform = `translate3d(${cx - size / 2}px, ${cy - size / 2}px, 0)`;
      el.style.width = el.style.height = `${size}px`;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        cx = x;
        cy = y;
        el.style.opacity = "1";
      }
      const over = e.target instanceof Element ? e.target.closest(TEXT) : null;
      target = over ? LARGE : SMALL;
    };
    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[70] rounded-full bg-white opacity-0 mix-blend-difference transition-opacity duration-200"
      style={{ width: SMALL, height: SMALL }}
    />
  );
}
