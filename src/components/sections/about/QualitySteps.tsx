"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Time for the line to run from one checkpoint to the next. */
const STEP_MS = 1500;
/** Pause on the last checkpoint before the line starts again from the first. */
const HOLD_MS = 1600;

/**
 * Quality checkpoints on a line. In a loop, a purple line runs from the first dot to the last; each
 * dot glows as the line reaches it. Static for visitors who prefer reduced motion.
 */
export function QualitySteps({ steps }: { steps: string[] }) {
  // Index of the last checkpoint the line has reached (-1 = none yet)
  const [reached, setReached] = useState(-1);
  // True for one frame while everything snaps back to the start without animating
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    let current = -1;

    const next = () => {
      if (current >= steps.length - 1) {
        // Back to the start in one jump, then begin again
        setResetting(true);
        current = -1;
        setReached(-1);
        timer = window.setTimeout(() => {
          setResetting(false);
          current = 0;
          setReached(0);
          timer = window.setTimeout(next, STEP_MS);
        }, 60);
        return;
      }
      current += 1;
      setReached(current);
      timer = window.setTimeout(next, current >= steps.length - 1 ? HOLD_MS : STEP_MS);
    };

    timer = window.setTimeout(next, 400);
    return () => window.clearTimeout(timer);
  }, [steps.length]);

  return (
    <ol aria-label="Quality checkpoints" className="mt-10 flex lg:mt-[3.8cqw]">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        // Only the checkpoint the line has just reached glows (and blinks); earlier ones go back to normal
        const lit = reached === i;
        // The line leaving this dot starts filling as soon as the dot lights; it takes STEP_MS, so it
        // arrives just as the next dot lights up
        const filled = reached >= i;

        return (
          <li key={step} className={cn(isLast ? "shrink-0" : "flex-1")}>
            {/* Dot, plus the line that runs on to the next checkpoint */}
            <div aria-hidden className="flex items-center">
              <span
                className={cn(
                  "size-[max(7px,0.65cqw)] shrink-0 rounded-full bg-brand ring-[max(2px,0.2cqw)] ring-brand/15",
                  !resetting && "transition-[transform,box-shadow] duration-300",
                  lit &&
                    "scale-125 animate-pulse shadow-[0_0_0_4px_rgba(86,26,97,0.18),0_0_12px_2px_rgba(86,26,97,0.65)] motion-reduce:animate-none",
                )}
              />
              {!isLast && (
                <span className="relative h-px flex-1 bg-[#d9d9d9]">
                  <span
                    className={cn(
                      "absolute inset-0 origin-left bg-brand",
                      filled ? "scale-x-100" : "scale-x-0",
                      !resetting && "transition-transform ease-linear",
                    )}
                    style={resetting ? undefined : { transitionDuration: `${STEP_MS}ms` }}
                  />
                </span>
              )}
            </div>
            <p className="mt-2 max-w-[7em] pr-2 font-ui text-[max(12px,1.1cqw)] leading-snug text-[#1e1e1e] lg:mt-[1cqw]">
              {step}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
