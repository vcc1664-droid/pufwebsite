"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { BLOCK_GAP, CONTAINER, RULE_GAP, SECTION_Y } from "@/constants/layout";
import { QUOTE_CTA } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import teamImage from "../../../../public/about/team_building_story.jpg";
import factoryImage from "../../../../public/about/Insulation/Factoryyy-100kb.jpeg";
import deliveryImage from "../../../../public/about/Insulation/fatoryyyyyyyyy-100kb.jpeg";
import installImage from "../../../../public/about/5d7e15a6-9861-40ff-8d30-934fb34b2b97.jpg";

type Step = {
  stage: string;
  title: string;
  body: string;
  image: { src: StaticImageData; alt: string };
};

// Only step 01 comes from the design; 02–04 follow the process named on this page.
const STEPS: Step[] = [
  {
    stage: "Design",
    title: "Specification support",
    body: "Our engineering and sales team helps you choose the right panel for the space before anything is made.",
    image: { src: teamImage, alt: "Engineers reviewing building plans on a construction site" },
  },
  {
    stage: "Manufacture",
    title: "Panel production",
    body: "Panels are produced at our Nalagarh plant with quality checks from raw material to dispatch.",
    image: { src: factoryImage, alt: "PUF panels being produced at the Synergy PUF plant" },
  },
  {
    stage: "Delivery",
    title: "Logistics to site",
    body: "Panels are packed and scheduled to reach the site in the order the installation needs them.",
    image: { src: deliveryImage, alt: "Synergy PUF delivery truck on a highway" },
  },
  {
    stage: "Installation",
    title: "On-site installation",
    body: "Our installation team builds the finished enclosure, sealing joints and interfaces as specified.",
    image: { src: installImage, alt: "Installers fixing insulated wall panels on site" },
  },
];

/** Time each photo stays before the next slides up. */
const AUTOPLAY_MS = 4000;

const button =
  "inline-flex items-center justify-center rounded-[max(6px,0.42cqw)] px-[max(20px,2.1cqw)] py-[max(12px,1cqw)] font-ui text-[max(14px,0.95cqw)] leading-none transition-colors duration-200";

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function Mission() {
  const [index, setIndex] = useState(0);
  // The photo that was showing before `index`; it slides out through the top.
  const [previous, setPrevious] = useState<number | null>(null);
  const step = STEPS[index];

  const goTo = (next: number) => {
    if (next === index) return;
    setPrevious(index);
    setIndex(next);
  };

  // Steps advance on their own; the timer restarts whenever the step changes (dot clicks too).
  useEffect(() => {
    const timer = setTimeout(() => {
      setPrevious(index);
      setIndex((index + 1) % STEPS.length);
    }, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <section className="rounded-t-[max(28px,5.5vw)] bg-black text-white">
      {/* Black band is full-bleed; content sits in the shared gutter (logo → Start Your Quote). */}
      <div className={CONTAINER}>
        <div className={cn("@container", SECTION_Y)}>
          <div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal className="flex flex-wrap gap-3 lg:gap-[1.4cqw]">
              <Link href={QUOTE_CTA.href} className={cn(button, "bg-white text-black hover:bg-[#e6e6e6]")}>
                Get a Quote
              </Link>
              <Link
                href="/projects"
                className={cn(button, "border border-white text-white hover:bg-white hover:text-black")}
              >
                View Projects
              </Link>
            </Reveal>

            <Reveal delay={100} className="lg:w-[42.3%] lg:pb-[1.6cqw]">
              <h2 className="max-w-[11em] text-[max(32px,3.55cqw)] leading-[1.27] font-medium tracking-[-0.02em]">
                Insulation shaped by your space.
              </h2>
            </Reveal>
          </div>

          <hr className={cn(RULE_GAP, "border-[#5c5c5c]")} />

          <Reveal delay={100} className={RULE_GAP}>
            <p className="max-w-[32em] font-ui text-[max(17px,1.72cqw)] leading-[1.55]">
              Our mission is to manufacture and install insulated panel systems suited to the spaces they
              serve - from panel selection to the finished enclosure.
            </p>
          </Reveal>

          <Reveal delay={150} className={BLOCK_GAP}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[max(16px,3.2cqw)] sm:aspect-[1595/765]">
              {/* All photos stay stacked; the active one slides in diagonally from the bottom-right while
                  the previous one slides out towards the top-left */}
              {STEPS.map((s, i) => (
                <Image
                  key={s.title}
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1920px) 1594px, 100vw"
                  aria-hidden={i !== index}
                  // Always moves diagonally, bottom-right to top-left, whichever photo comes next: the photo
                  // just left slides out past the top-left corner, every other one waits beyond the
                  // bottom-right, and only those two animate (the rest jump back unseen).
                  className={cn(
                    "object-cover motion-reduce:transition-none",
                    i === index
                      ? "translate-0 transition-transform duration-900 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      : i === previous
                        ? "-translate-x-full -translate-y-full transition-transform duration-900 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        : "translate-x-full translate-y-full",
                  )}
                />
              ))}

              <div className="absolute inset-x-0 bottom-[max(14px,1.8cqw)] flex justify-center gap-[max(6px,0.45cqw)]">
                {STEPS.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show step ${i + 1}: ${s.title}`}
                    aria-current={i === index}
                    className={cn(
                      "size-[max(8px,0.75cqw)] rounded-full transition-colors duration-200",
                      i === index ? "bg-white" : "bg-white/45 hover:bg-white/70",
                    )}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Re-keyed so the step copy rises in again on every change */}
          <div
            key={index}
            aria-live="polite"
            className={cn(BLOCK_GAP, "flex animate-rise flex-col gap-6 lg:flex-row lg:items-center lg:gap-0")}
          >
            <div className="flex items-center gap-[max(14px,2cqw)] lg:w-[44.9%] lg:border-r lg:border-white/60 lg:py-[0.6cqw]">
              <p className="text-[max(64px,8.4cqw)] leading-[0.8] font-light tracking-[-0.04em]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-light">
                <span className="block text-[max(20px,2.25cqw)] leading-tight">{step.stage}</span>
                <span className="block text-[max(24px,2.65cqw)] leading-tight font-normal tracking-[-0.01em]">
                  {step.title}
                </span>
              </h3>
            </div>
            <p className="font-ui text-[max(16px,1.72cqw)] leading-[1.55] lg:flex-1 lg:pl-[4.6cqw]">
              {step.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
