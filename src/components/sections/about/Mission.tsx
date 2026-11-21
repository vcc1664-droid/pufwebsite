"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { BLOCK_GAP, CONTAINER, RULE_GAP, SECTION_Y } from "@/constants/layout";
import { QUOTE_CTA } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import teamImage from "../../../../public/about/Insulation/PUF FACTORYY-100kb.jpeg";
import factoryImage from "../../../../public/about/Insulation/Factoryyy-100kb.jpeg";
import deliveryImage from "../../../../public/about/Insulation/WhatsApp Image 2026-11-13 at 22.26.00-60kb.jpeg";
import installImage from "../../../../public/about/Insulation/5af39614-3f60-474b-af2a-39d4b60c93bf-100kb.jpeg";

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
    image: { src: deliveryImage, alt: "Synergy PUF truck being loaded with insulated panels at the loading point" },
  },
  {
    stage: "Installation",
    title: "On-site installation",
    body: "Our installation team builds the finished enclosure, sealing joints and interfaces as specified.",
    image: { src: installImage, alt: "Installers fixing insulated wall panels on site" },
  },
];

/** Space kept between the header and the pinned photo/step block. */
const PIN_GAP = 16;

const button =
  "inline-flex items-center justify-center rounded-[max(6px,0.42cqw)] px-[max(20px,2.1cqw)] py-[max(12px,1cqw)] font-ui text-[max(14px,0.95cqw)] leading-none transition-colors duration-200";

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function Mission() {
  const [index, setIndex] = useState(0);
  // The photo that was showing before `index`; it slides out through the top.
  const [previous, setPrevious] = useState<number | null>(null);
  const step = STEPS[index];
  // The photo/step block pins while the page scrolls through `track`; how far it has scrolled
  // decides the step, so scrolling down moves 01 → 04 and scrolling up moves back.
  const track = useRef<HTMLDivElement>(null);
  const pinned = useRef<HTMLDivElement>(null);
  const current = useRef(0);

  // Where the block sticks: centred below the header when it fits, else bottom-aligned
  const pinTop = (pinEl: HTMLElement) => {
    const header = document.querySelector("header")?.offsetHeight ?? 0;
    const room = window.innerHeight - header - PIN_GAP * 2;
    const height = pinEl.offsetHeight;
    return height <= room
      ? Math.max(header + PIN_GAP, (window.innerHeight - height) / 2)
      : window.innerHeight - height - PIN_GAP;
  };

  useEffect(() => {
    const trackEl = track.current;
    const pinEl = pinned.current;
    if (!trackEl || !pinEl) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const top = pinTop(pinEl);
      pinEl.style.top = `${top}px`;
      const travel = trackEl.offsetHeight - pinEl.offsetHeight;
      const progress =
        travel > 0 ? Math.min(1, Math.max(0, (top - trackEl.getBoundingClientRect().top) / travel)) : 0;
      const next = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));
      if (next !== current.current) {
        setPrevious(current.current);
        setIndex(next);
        current.current = next;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    const observer = new ResizeObserver(onScroll);
    observer.observe(pinEl);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Dots scroll the page to that step's stretch, so clicking and scrolling always agree
  const goTo = (i: number) => {
    const trackEl = track.current;
    const pinEl = pinned.current;
    if (!trackEl || !pinEl) return;
    const travel = trackEl.offsetHeight - pinEl.offsetHeight;
    const trackTop = trackEl.getBoundingClientRect().top + window.scrollY;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: trackTop - pinTop(pinEl) + (travel * (i + 0.5)) / STEPS.length,
      behavior: reduced ? "auto" : "smooth",
    });
  };

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
              <h2 className="max-w-[11em] font-sans text-[32px] leading-[1.3] font-normal tracking-normal lg:text-[50.1815px] lg:leading-[65.2359px]">
                Insulation Shaped by your Space.
              </h2>
            </Reveal>
          </div>

          <hr className={cn(RULE_GAP, "border-[#5c5c5c]")} />

          <Reveal delay={100} className={RULE_GAP}>
            <p className="max-w-[32em] font-ui text-[15.5324px] leading-[23.2985px] font-normal tracking-normal">
              Our mission is to manufacture and install insulated panel systems suited to the spaces they
              serve - from panel selection to the finished enclosure.
            </p>
          </Reveal>

          {/* Pins while scrolling: one stretch of scroll per step (spacer below) */}
          <div ref={track} className={BLOCK_GAP}>
          {/* Desktop: smaller photo on the left, the active step's copy beside it on the right */}
          <div ref={pinned} className="sticky flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-[4cqw]">
          <Reveal delay={150} className="lg:w-[58%] lg:shrink-0">
            <div
              className="relative aspect-[3/2] overflow-hidden rounded-[max(16px,3.2cqw)] sm:aspect-[1595/690] lg:aspect-[16/10]">
              {/* All photos stay stacked; the active one slides in from the bottom while
                  the previous one slides out towards the top */}
              {STEPS.map((s, i) => (
                <Image
                  key={s.title}
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1920px) 925px, (min-width: 1024px) 58vw, 100vw"
                  aria-hidden={i !== index}
                  // Moves vertically from bottom to top: the active photo slides in from the bottom,
                  // the previous photo slides out towards the top, and waiting photos stay below.
                  className={cn(
                    "object-cover motion-reduce:transition-none",
                    i === index
                      ? "translate-y-0 transition-transform duration-900 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      : i === previous
                        ? "-translate-y-full transition-transform duration-900 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        : "translate-y-full",
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
            className="flex animate-rise flex-col gap-6 lg:flex-1 lg:gap-[2.4cqw]"
          >
            <div className="flex items-center gap-[max(14px,2cqw)] lg:border-b lg:border-white/60 lg:pb-[2.4cqw]">
              <p className="text-[max(64px,8.4cqw)] leading-[0.8] font-normal tracking-[-0.04em]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-normal">
                <span className="block text-[max(20px,2.25cqw)] leading-tight">{step.stage}</span>
                <span className="block text-[max(24px,2.65cqw)] leading-tight font-normal tracking-[-0.01em]">
                  {step.title}
                </span>
              </h3>
            </div>
            <p className="font-ui text-[15.5324px] leading-[23.2985px] font-normal tracking-normal">
              {step.body}
            </p>
          </div>
          </div>
          {/* Scroll room while pinned: one stretch per extra step */}
          <div aria-hidden className="h-[300svh]" />
          </div>
        </div>
      </div>
    </section>
  );
}
