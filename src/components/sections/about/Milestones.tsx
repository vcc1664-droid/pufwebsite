"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { BLOCK_GAP, CONTAINER, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";
import groupImage from "../../../../public/about/Milestones/1d40dd4a-cd6d-4c2c-91af-aee8f0336ad5-80kb.jpeg";
import plantImage from "../../../../public/Home/PIR/WhatsApp Image 2026-11-25 at 11.57.30-100kb.jpeg";
import capacityImage from "../../../../public/about/Insulation/Factoryyy-100kb.jpeg";
import certificationImage from "../../../../public/Home/ISOcertified/Group 2085662833-100kb.jpeg";
import projectImage from "../../../../public/about/Insulation/WhatsApp Image 2026-11-13 at 22.26.00-60kb.jpeg";

type Milestone = { year: string; title: string; body: string; image: StaticImageData; alt: string };

// Descriptions and photos are placeholders until each milestone's details are confirmed.
const MILESTONES: Milestone[] = [
  {
    year: "1987",
    title: "Group founded",
    body: "Details for this milestone to be confirmed.",
    image: groupImage,
    alt: "Early steel-sheet rolling machines in an old factory hall",
  },
  {
    year: "2018",
    title: "PUF Plant Commissioned",
    body: "Details for this milestone to be confirmed.",
    image: plantImage,
    alt: "PUF insulated panels on the factory floor",
  },
  {
    year: "2022",
    title: "Capacity Expanded",
    body: "Details for this milestone to be confirmed.",
    image: capacityImage,
    alt: "PUF panels in production at the Synergy PUF plant",
  },
  {
    year: "2024",
    title: "First Certification",
    body: "Details for this milestone to be confirmed.",
    image: certificationImage,
    alt: "Synergy PUF insulated panel manufacturing facility",
  },
  {
    year: "2025",
    title: "Project Milestone",
    body: "Details for this milestone to be confirmed.",
    image: projectImage,
    alt: "Synergy PUF truck being loaded with insulated panels",
  },
];

/** Ruler-like tick marks under each year, fading downwards. */
function Ticks({ active }: { active: boolean }) {
  return (
    <div aria-hidden className="mt-4 flex h-[max(40px,3.6cqw)] justify-between pr-[max(12px,1.2cqw)] lg:mt-[1.2cqw]">
      {Array.from({ length: 12 }, (_, i) => (
        <span
          key={i}
          className={cn(
            "w-px bg-linear-to-b to-transparent",
            active ? "from-[#8a8a8a]" : "from-[#d4d4d4]",
          )}
        />
      ))}
    </div>
  );
}

/* Sizes (lg+) are cqw of the content width, measured from the design. */
export function Milestones() {
  // The highlighted milestone; hover, focus or click picks another. Starts on 2018, as in the design.
  const [active, setActive] = useState(1);

  return (
    <section className={cn(CONTAINER, SECTION_Y)}>
      <div className="@container">
        <Reveal>
          <h2 className="font-sans text-[26px] leading-[1.3] font-normal tracking-normal text-[#171717] lg:text-[50.1815px] lg:leading-[65.2359px]">
            The Milestones Behind our Growth
          </h2>
          <p className="mt-2 font-ui text-[15.5324px] leading-[23.2985px] font-normal tracking-normal text-[#909090] lg:mt-[0.8cqw]">
            Timeline structure. Years and events to confirm.
          </p>
        </Reveal>

        {/* Years move endlessly from right to left; hovering pauses the row so a year can be picked.
            The list is doubled for a gapless loop; the copy is hidden from screen readers and Tab. */}
        <Reveal delay={100} className={cn(BLOCK_GAP, "group overflow-hidden")}>
          <ol className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:w-full motion-reduce:overflow-x-auto">
            {[...MILESTONES, ...MILESTONES].map((milestone, n) => {
              const i = n % MILESTONES.length;
              const copy = n >= MILESTONES.length;
              const isActive = active === i;
              return (
                <li
                  key={n}
                  aria-hidden={copy || undefined}
                  className={cn(
                    "w-[max(220px,25cqw)] shrink-0 border-l pl-[max(12px,1.2cqw)] transition-colors duration-300 first:border-l-0 first:pl-0",
                    isActive ? "border-black first:border-l first:pl-[max(12px,1.2cqw)]" : "border-[#d9d9d9]",
                  )}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    tabIndex={copy ? -1 : undefined}
                    aria-expanded={isActive}
                    className="block w-full text-left"
                  >
                    <span
                      className={cn(
                        // Line height above 1 keeps the digits inside the sideways-scrolling row, which clips anything outside it
                        "block font-sans text-[32px] leading-[1.25] font-normal transition-colors duration-300 lg:text-[max(32px,2.6cqw)]",
                        isActive ? "text-black" : "text-[#9a9a9a]",
                      )}
                    >
                      {milestone.year}
                    </span>
                    <span
                      className={cn(
                        "mt-2 block font-ui text-[13px] transition-colors duration-300 lg:mt-[0.6cqw] lg:text-[max(12px,0.9cqw)]",
                        isActive ? "text-black" : "text-[#9a9a9a]",
                      )}
                    >
                      {milestone.title}
                    </span>
                    <Ticks active={isActive} />
                  </button>

                  {/* Details under the highlighted year. Every column keeps this space, so the
                      section's height never changes; only the fade and rise animate. */}
                  <div
                    aria-hidden={!isActive}
                    className={cn(
                      "transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
                      isActive ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
                    )}
                  >
                    <div className="pr-[max(12px,1.2cqw)]">
                      <p className="mt-8 font-ui text-[15.5324px] leading-[23.2985px] font-normal tracking-normal text-black lg:mt-[2.6cqw]">
                        {milestone.body}
                      </p>
                      <div className="relative mt-4 aspect-[2/1] overflow-hidden lg:mt-[1.2cqw]">
                        <Image
                          src={milestone.image}
                          alt={milestone.alt}
                          fill
                          placeholder="blur"
                          sizes="(min-width: 1024px) 25vw, 220px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
