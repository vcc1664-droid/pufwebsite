"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Viewport positions (share of its height from the top) where the reveal starts and finishes. */
const START_AT = 0.85;
const FINISH_AT = 0.35;

/**
 * Shows the text faded, then darkens it word by word as it scrolls up the screen: no words when
 * the block's top reaches START_AT, every word once its bottom reaches FINISH_AT. Scrolling back
 * fades them again. Only colour changes, so wrapping and layout stay exactly as plain text.
 */
export function ScrollRevealText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");
  const [shown, setShown] = useState(words.length);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reducedMotion.matches) {
        setShown(words.length);
        return;
      }
      const viewport = window.innerHeight;
      const rect = el.getBoundingClientRect();
      const begin = viewport * START_AT;
      const span = begin - viewport * FINISH_AT + rect.height;
      const progress = Math.min(1, Math.max(0, (begin - rect.top) / span));
      setShown(Math.round(progress * words.length));
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
  }, [words.length]);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className={cn("transition-colors duration-300", i < shown && "text-black")}>
          {word}
          {i < words.length - 1 && " "}
        </span>
      ))}
    </p>
  );
}
