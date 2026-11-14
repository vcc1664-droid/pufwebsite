"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";
import coilImage from "../../../public/Home/Whereyour/WhatsApp Image 2026-11-13 at 12.22.19-60kb.jpeg";
import formingImage from "../../../public/Home/Whereyour/Industrial Roll Forming Line-60kb.jpeg";
import foamImage from "../../../public/Home/Whereyour/Precision Adhesive Dispensing Machine-60kb.jpeg";
import cuttingImage from "../../../public/Home/Whereyour/Industrial Band Saw in a Bright Workshop-60kb.jpeg";
import labImage from "../../../public/Home/Whereyour/lab-50kb.jpeg";
import dispatchImage from "../../../public/Home/Whereyour/Forklift Moving Insulated Panels-50kb.jpeg";

type Stage = { name: string; title: string; body: string; image?: StaticImageData; alt?: string };

// Stages along the Nalagarh line, in order. Stages without a photo yet show an empty box.
const STAGES: Stage[] = [
  {
    name: "Coil",
    title: "Steel coil.",
    body: "The coil is loaded on the uncoiler at the start of the line.",
    image: coilImage,
    alt: "Steel coil loaded on the uncoiler at the start of the panel line",
  },
  {
    name: "Forming",
    title: "Forming.",
    body: "Rollers shape the flat steel sheet into the panel profile.",
    image: formingImage,
    alt: "Industrial roll forming line shaping steel sheet into the panel profile",
  },
  {
    name: "Foam",
    title: "Foam.",
    body: "Foam is dispensed onto the steel sheet and becomes the insulation core.",
    image: foamImage,
    alt: "Dispensing machine applying foam onto the steel sheet",
  },
  {
    name: "Cutting",
    title: "Cutting.",
    body: "The finished panel is cut to length on a band saw.",
    image: cuttingImage,
    alt: "Industrial band saw used to cut finished panels to length",
  },
  {
    name: "Lab",
    title: "Lab.",
    body: "Test equipment at the plant.",
    image: labImage,
    alt: "Test equipment in the lab at the plant",
  },
  {
    name: "Dispatch",
    title: "Dispatch.",
    body: "Panels are stacked at the loading point, ready for the truck.",
    image: dispatchImage,
    alt: "Forklift moving insulated panels to the loading point",
  },
];

/* Sizes (lg+) are cqw of the content width, measured from the design. */
export function WherePanelsAreMade() {
  const track = useRef<HTMLDivElement>(null);
  const pinned = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);

  // The block pins under the header while the page scrolls; that vertical scroll slides the
  // stage cards from right to left, one pixel across per pixel down.
  useEffect(() => {
    const trackEl = track.current;
    const pinEl = pinned.current;
    const viewEl = viewport.current;
    const listEl = list.current;
    if (!trackEl || !pinEl || !viewEl || !listEl) return;
    const header = document.querySelector("header");
    let frame = 0;

    const update = () => {
      frame = 0;
      const distance = Math.max(0, listEl.scrollWidth - viewEl.clientWidth);
      trackEl.style.height = `${pinEl.offsetHeight + distance}px`;

      // Content just under the header, or bottom-aligned when the block is taller than the screen
      const content = pinEl.firstElementChild as HTMLElement;
      const { paddingTop, paddingBottom } = getComputedStyle(content);
      const top = Math.min(
        (header?.offsetHeight ?? 0) - parseFloat(paddingTop),
        window.innerHeight - pinEl.offsetHeight + parseFloat(paddingBottom),
      );
      pinEl.style.top = `${top}px`;

      const scrolled = top - trackEl.getBoundingClientRect().top;
      const progress = distance > 0 ? Math.min(1, Math.max(0, scrolled / distance)) : 0;
      listEl.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    const observer = new ResizeObserver(onScroll);
    observer.observe(pinEl);
    observer.observe(listEl);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section aria-labelledby="where-panels-made">
      {/* Tall track: its extra height is the scroll room for the sideways slide */}
      <div ref={track}>
        <div ref={pinned} className="sticky bg-white">
          <div className={cn(CONTAINER, SECTION_Y)}>
            <div className="@container">
              <Reveal>
                <h2
                  id="where-panels-made"
                  className="font-sans text-[max(26px,4.2cqw)] leading-[1.3] font-medium tracking-[-0.01em] text-black"
                >
                  Where your panels are made
                </h2>
                <p className="mt-3 font-ui text-[15.5324px] lg:whitespace-nowrap leading-[23.2985px] font-normal tracking-normal text-[#696969] lg:mt-[1cqw]">
                  Every panel is made at our own plant in Nalagarh, Himachal Pradesh. Follow the line,
                  one stage at a time.
                </p>
              </Reveal>

              {/* Cards are clipped at the content edges; the next one peeks in from the right */}
              <Reveal delay={100} className="mt-6 lg:mt-[2cqw]">
                <div ref={viewport} className="overflow-hidden">
                  <ol
                    ref={list}
                    aria-label="Production stages"
                    className="flex gap-4 will-change-transform lg:gap-[1.6cqw]"
                  >
                    {STAGES.map((stage, i) => (
                      <li
                        key={stage.name}
                        className="w-[82%] shrink-0 rounded-[max(12px,0.8cqw)] border border-[#dad8cf] bg-[#faf9f6] p-3 sm:w-[60%] lg:w-[40%] lg:p-[0.8cqw]"
                      >
                        <span className="inline-block rounded-[5px] bg-[#561A61] px-[0.8em] py-[0.3em] font-ui text-[max(13px,0.95cqw)] leading-none font-semibold text-white">
                          {i + 1} {stage.name}
                        </span>
                        {/* Stage photo, or an empty box until one is supplied */}
                        <div
                          aria-hidden={!stage.image}
                          className="relative mt-3 aspect-[591/277] overflow-hidden rounded-[max(8px,0.5cqw)] border border-[#e6e3dc] bg-[#f1efea] lg:mt-[0.8cqw]"
                        >
                          {stage.image && (
                            <Image
                              src={stage.image}
                              alt={stage.alt ?? ""}
                              fill
                              placeholder="blur"
                              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 82vw"
                              className="object-cover"
                            />
                          )}
                        </div>
                        <p className="mt-3 font-ui text-[15.5324px] leading-[23.2985px] font-normal tracking-normal text-[#696969] lg:mt-[0.8cqw]">
                          <strong className="font-bold">{stage.title}</strong> {stage.body}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
