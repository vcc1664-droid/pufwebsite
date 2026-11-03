"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { BLOCK_GAP, CONTAINER, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";
import worldDots from "../../../../public/about/world-dots.svg";

type Milestone = {
  year: string;
  title: string;
  /** Position on the map, in % of its width and height. */
  x: number;
  y: number;
};

// Years and events are still to be confirmed; positions come from the map's projection.
const MILESTONES: Milestone[] = [
  { year: "Year to confirm", title: "Project Milestone", x: 5.14, y: 11.76 },
  { year: "Year to confirm", title: "Project Milestone", x: 37.14, y: 5.88 },
  { year: "Year to confirm", title: "Project Milestone", x: 18.57, y: 41.91 },
  { year: "Year to confirm", title: "Project Milestone", x: 28.29, y: 95.59 },
  { year: "Year to confirm", title: "Project Milestone", x: 69.43, y: 44.85 },
  { year: "Year to confirm", title: "Project Milestone", x: 77.14, y: 5.88 },
  { year: "Year to confirm", title: "Project Milestone", x: 93.71, y: 17.65 },
  { year: "Year to confirm", title: "Project Milestone", x: 86.86, y: 77.21 },
];

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function Milestones() {
  // India is highlighted by default, as in the design.
  const [active, setActive] = useState(4);

  return (
    <section className={cn(CONTAINER, SECTION_Y)}>
      <div className="@container">
        <Reveal className="text-center">
          <h2 className="text-[max(26px,2.95cqw)] leading-tight font-medium tracking-[-0.02em] text-black">
            The milestones behind our growth
          </h2>
          <p className="mt-2 font-ui text-[max(14px,1.4cqw)] text-[#909090] lg:mt-[0.8cqw]">
            Timeline structure. Years and events to confirm.
          </p>
        </Reveal>

        <Reveal delay={100} className={cn(BLOCK_GAP, "relative mx-auto w-full lg:w-[72.5%]")}>
          <Image src={worldDots} alt="" className="h-auto w-full" />

          <ul>
            {MILESTONES.map((milestone, i) => {
              const isActive = active === i;
              // Pins near the map edges open their tooltip inwards so it stays on screen.
              const align = milestone.x < 15 ? "start" : milestone.x > 85 ? "end" : "center";

              return (
                <li
                  key={i}
                  className={cn("absolute -translate-x-1/2 -translate-y-1/2", isActive && "z-10")}
                  style={{ left: `${milestone.x}%`, top: `${milestone.y}%` }}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-label={`${milestone.title}, ${milestone.year}`}
                    aria-pressed={isActive}
                    className={cn(
                      "block size-[max(10px,1.25cqw)] rounded-full bg-brand transition-shadow duration-200",
                      isActive &&
                        "ring-[max(2px,0.25cqw)] ring-white ring-offset-0 outline outline-[max(1.5px,0.15cqw)] outline-brand",
                    )}
                  />

                  {isActive && (
                    <div
                      role="status"
                      className={cn(
                        "absolute bottom-[calc(100%+max(10px,1cqw))] w-max animate-rise rounded-[max(8px,0.8cqw)] bg-white px-[max(12px,1.5cqw)] py-[max(8px,0.9cqw)] text-center shadow-[0_6px_24px_rgba(0,0,0,0.12)] after:absolute after:top-full after:-translate-x-1/2 after:border-[max(5px,0.5cqw)] after:border-transparent after:border-t-white",
                        align === "center" && "left-1/2 -translate-x-1/2 after:left-1/2",
                        align === "start" && "left-0 after:left-[max(5px,0.625cqw)]",
                        align === "end" && "right-0 after:left-[calc(100%-max(5px,0.625cqw))]",
                      )}
                    >
                      <p className="font-ui text-[max(11px,1.1cqw)] text-black">{milestone.year}</p>
                      <p className="mt-0.5 font-ui text-[max(13px,1.45cqw)] text-brand">{milestone.title}</p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
