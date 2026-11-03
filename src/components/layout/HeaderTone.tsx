"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// True when what sits behind the element is a photo/video or a dark fill.
function isOnDark(target: HTMLElement) {
  const rect = target.getBoundingClientRect();
  const stack = document.elementsFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
  for (const el of stack) {
    if (target.contains(el)) continue;
    const style = getComputedStyle(el);
    if (style.visibility === "hidden" || Number(style.opacity) === 0) continue;
    if (el instanceof HTMLImageElement || el instanceof HTMLVideoElement) return true;
    const rgba = style.backgroundColor.match(/[\d.]+/g)?.map(Number);
    if (!rgba || (rgba[3] ?? 1) < 0.5) continue;
    const [r, g, b] = rgba;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b < 128;
  }
  return false;
}

/** Flags the logo and quote link with `data-on-dark` while the page behind them is dark. */
export function HeaderTone() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("header [data-tone]");
    let frame = 0;

    const update = () => {
      frame = 0;
      targets.forEach((el) => el.toggleAttribute("data-on-dark", isOnDark(el)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return null;
}
