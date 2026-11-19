"use client";

import { useState, type ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { BLOCK_GAP, CONTAINER, RULE_GAP, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";

/*
 * Joint profiles as line drawings in a 100 × 112 box (the tile's shape). They sit at the bottom of
 * each tile and run off its edges, as in the design.
 */
const JOINTS: { name: ReactNode; label: string; drawing: ReactNode }[] = [
  {
    name: "Roof Joints",
    label: "Roof Joints",
    drawing: (
      <>
        {/* House outline: walls up to a pitched roof */}
        <path d="M29 114V91l27-26 27 26v23" />
        {/* Second roof line, lower and wider, crossing the walls and running off the right edge */}
        <path d="M16 113l40-39 48 46" />
      </>
    ),
  },
  {
    name: "M-Section",
    label: "M-Section",
    drawing: <path d="M30 112V70l16 34 14-24 14 24 16-34v42" />,
  },
  {
    name: (
      <>
        Double Tongue
        <br />& Groove
      </>
    ),
    label: "Double Tongue & Groove",
    drawing: (
      <>
        <path d="M34 112V70h26v8h44" />
        <path d="M60 78v34" />
        <path d="M60 88h44M60 96h44M60 106h44" />
        <path d="M80 78v10M80 96v10" />
      </>
    ),
  },
  {
    name: (
      <>
        Single Tongue &
        <br />
        Groove
      </>
    ),
    label: "Single Tongue & Groove",
    drawing: (
      <>
        <path d="M30 112V74h32v12h42" />
        <path d="M62 86v26" />
        <path d="M62 100h42" />
        <path d="M86 86v14" />
      </>
    ),
  },
  {
    name: (
      <>
        Hidden Tongue &
        <br />
        Groove
      </>
    ),
    label: "Hidden Tongue & Groove",
    drawing: (
      <>
        <path d="M30 112V78h30V68" />
        <path d="M45 78v-6" />
        <path d="M60 78h16v12h28" />
        <path d="M76 90v12h28" />
        <path d="M60 78v34" />
      </>
    ),
  },
];

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function PanelJoints() {
  // Highlighted tile: M-Section by default, as in the design; follows the pointer or keyboard focus
  const [active, setActive] = useState(1);

  return (
    <section className={cn(CONTAINER, SECTION_Y)}>
      <div className="@container">
        <Reveal>
          <h2 className="font-sans text-[28px] leading-[1.3] font-normal tracking-normal text-[#171717] lg:text-[50.1815px] lg:leading-[65.2359px]">
            Available Panel Joints.
          </h2>
        </Reveal>

        <hr className={cn(RULE_GAP, "border-[#bdbdbd]")} />

        <Reveal delay={100} className={cn(RULE_GAP, "lg:ml-[54.6%]")}>
          <p className="font-ui text-[15.5324px] leading-[23.2985px] font-normal tracking-normal text-[#8a8a8a]">
            Innovative joinery for seamless connections, structural integrity and ease of installation.
          </p>
        </Reveal>

        <ul
          className={cn(BLOCK_GAP, "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-[1.65cqw]")}
        >
          {JOINTS.map((joint, i) => {
            const on = active === i;
            return (
              <li key={joint.label}>
                <Reveal delay={i * 80}>
                  <div
                    tabIndex={0}
                    aria-label={joint.label}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={cn(
                      "relative aspect-[100/112] overflow-hidden rounded-[max(10px,1cqw)] transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
                      on ? "bg-brand text-white" : "bg-[#e3e3e3] text-black",
                    )}
                  >
                    <span className="absolute top-[max(14px,1.5cqw)] left-[max(14px,1.5cqw)] font-ui text-[max(12px,1.15cqw)] leading-tight">
                      {joint.name}
                    </span>
                    <svg
                      aria-hidden
                      viewBox="0 0 100 112"
                      preserveAspectRatio="xMidYMax meet"
                      fill="none"
                      strokeWidth="2.6"
                      strokeLinecap="square"
                      className={cn(
                        "absolute inset-0 size-full transition-colors duration-300",
                        on ? "stroke-white" : "stroke-[#8e4a9c]",
                      )}
                    >
                      {joint.drawing}
                    </svg>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
