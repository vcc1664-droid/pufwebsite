"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { BLOCK_GAP, CONTAINER, RULE_GAP, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";
import coldImage from "../../../../public/Applications/Chilled Freezer Warehouse Aisle.jpg";
import fireImage from "../../../../public/Applications/Industrial Warehouse Partition Wall.jpg";
import airtightImage from "../../../../public/Applications/Interlocking Insulated Panel Joint.jpg";
import weatherImage from "../../../../public/Applications/Rainy Industrial Warehouse at Dusk.jpg";
import hygieneImage from "../../../../public/Applications/Sterile Stainless Steel Food Production Line.jpg";
import heatImage from "../../../../public/Applications/Sunlit Desert Warehouse Rooftop.jpg";

const iconProps = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "size-[1.1em]",
} as const;

const DEMANDS: { label: string; image: StaticImageData; alt: string; icon: ReactNode }[] = [
  {
    label: "Cold",
    image: coldImage,
    alt: "Chilled freezer warehouse aisle with insulated walls",
    icon: (
      <svg {...iconProps}>
        <path d="M12 2v20M4.9 7l14.2 10M4.9 17 19.1 7M9 4l3 2 3-2M9 20l3-2 3 2" />
      </svg>
    ),
  },
  {
    label: "Heat",
    image: heatImage,
    alt: "Sunlit warehouse rooftop clad in insulated roof panels",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
  {
    label: "Fire",
    image: fireImage,
    alt: "Industrial partition wall with a fire-rated door",
    icon: (
      <svg {...iconProps}>
        <path d="M12 22a7 7 0 0 0 7-7c0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-2 2-5 5-5 8a7 7 0 0 0 7 7z" />
      </svg>
    ),
  },
  {
    label: "Hygiene",
    image: hygieneImage,
    alt: "Sterile stainless steel food production line",
    icon: (
      <svg {...iconProps}>
        <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8zM18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9z" />
      </svg>
    ),
  },
  {
    label: "Airtight",
    image: airtightImage,
    alt: "Interlocking joint between insulated panels",
    icon: (
      <svg {...iconProps}>
        <path d="M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7" />
      </svg>
    ),
  },
  {
    label: "Weather",
    image: weatherImage,
    alt: "Insulated industrial warehouse in the rain at dusk",
    icon: (
      <svg {...iconProps}>
        <path d="M7 15a4 4 0 1 1 1-7.9A5 5 0 0 1 18 9a3 3 0 0 1 0 6zM9 18l-1 3M13 18l-1 3M17 18l-1 3" />
      </svg>
    ),
  },
];

/** Scale and sideways shift (in card widths) for a card 0, 1 or 2 places from the centre. */
const STACK = [
  { scale: 1, shift: 0, z: 30 },
  { scale: 0.86, shift: 0.85, z: 20 },
  { scale: 0.8, shift: 1.62, z: 10 },
];

/** Time each condition card stays in the centre before automatically advancing. */
const AUTOPLAY_MS = 2000;

function Arrow({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  const next = direction === "next";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={next ? "Next condition" : "Previous condition"}
      className={cn(
        "grid size-[max(40px,2.6cqw)] place-items-center rounded-[max(6px,0.4cqw)] transition-colors duration-200",
        next ? "bg-brand text-white hover:bg-black" : "bg-brand/10 text-black hover:bg-brand/20",
      )}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className={cn("size-[45%]", !next && "rotate-180")}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12h16M14 6l6 6-6 6" />
      </svg>
    </button>
  );
}

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function SpaceDemands() {
  // Card in the middle of the stack; the arrows (or a click on a side card) move it
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);
  const count = DEMANDS.length;
  const go = (delta: number) => setActive((i) => (i + delta + count) % count);

  // Autoplay runs only while the section is on screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.15,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Advances automatically every AUTOPLAY_MS, pausing on user hover or interaction
  useEffect(() => {
    if (!inView || paused) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const timer = setInterval(() => {
      setActive((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [count, active, inView, paused]);

  return (
    <section ref={sectionRef} className={cn(CONTAINER, SECTION_Y)}>
      <div className="@container">
        <Reveal className="lg:ml-[60.6%]">
          <h2 className="max-w-[11em] font-sans text-[28px] leading-[1.3] font-normal tracking-normal text-[#171717] lg:text-[50.1815px] lg:leading-[65.2359px]">
            What Does the Space Demand?
          </h2>
        </Reveal>

        <hr className={cn(RULE_GAP, "border-[#d9d9d9]")} />

        <Reveal delay={100} className={RULE_GAP}>
          <p className="max-w-[26em] font-ui text-[15.5324px] leading-[23.2985px] font-normal tracking-normal text-[#7a7a7a]">
            Every application starts with the conditions the panel has to handle.
          </p>
        </Reveal>

        {/* Cover-flow: the active card in front, two smaller ones on each side running off the edges */}
        <Reveal delay={150} className={BLOCK_GAP}>
          <div
            aria-roledescription="carousel"
            aria-label="Space conditions"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
          >
            {/* Full screen width: breaks out of the content gutter so the stack runs to both edges */}
            <ul className="relative mx-[calc(50%-50vw)] aspect-[100/66] w-screen overflow-x-clip lg:aspect-[100/32]">
              {DEMANDS.map((demand, i) => {
                // Shortest way round the loop from the active card: -2 … 2 are shown
                let offset = (i - active + count) % count;
                if (offset > count / 2) offset -= count;
                const depth = Math.abs(offset);
                const place = STACK[Math.min(depth, 2)];
                const shown = depth <= 2;
                return (
                  <li
                    key={demand.label}
                    aria-hidden={depth !== 0}
                    onClick={() => depth !== 0 && setActive(i)}
                    className={cn(
                      "absolute top-1/2 left-1/2 aspect-[235/275] w-[54%] transition-[transform,opacity] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] lg:w-[25%]",
                      depth !== 0 && "cursor-pointer",
                      !shown && "pointer-events-none opacity-0",
                    )}
                    style={{
                      transform: `translate(-50%, -50%) translateX(${Math.sign(offset) * (shown ? place.shift : 2) * 100}%) scale(${shown ? place.scale : 0.7})`,
                      zIndex: shown ? place.z : 0,
                    }}
                  >
                    <div className="relative size-full overflow-hidden rounded-[max(10px,1.2cqw)]">
                      <Image
                        src={demand.image}
                        alt={demand.alt}
                        fill
                        placeholder="blur"
                        sizes="(min-width: 1024px) 25vw, 54vw"
                        className="object-cover"
                      />
                      <span className="absolute bottom-[max(8px,1.6cqw)] left-[max(8px,1.6cqw)] flex items-center gap-[0.5em] rounded-[max(3px,0.4cqw)] bg-white px-[0.7em] py-[0.4em] font-ui text-[max(11px,1.2cqw)] leading-none text-black">
                        {demand.label}
                        <span aria-hidden className="h-[0.9em] w-px bg-[#bdbdbd]" />
                        {demand.icon}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex justify-center gap-3 lg:mt-[2.4cqw] lg:gap-[1.2cqw]">
              <Arrow direction="prev" onClick={() => go(-1)} />
              <Arrow direction="next" onClick={() => go(1)} />
            </div>
            <p aria-live="polite" className="sr-only">
              {DEMANDS[active].label}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
