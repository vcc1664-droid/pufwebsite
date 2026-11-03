"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, SECTION_Y, STACK_GAP } from "@/constants/layout";
import { cn } from "@/lib/utils";
import rockwoolImage from "../../../public/Home/PIR/45adfe6c-aa00-48be-9cd7-9f48b74b0e10.jpg";
import pirImage from "../../../public/Home/PIR/54ab58aa-4217-405d-b85b-c7a7b9bdd6f0.jpg";
import jointImage from "../../../public/Home/PIR/Interlocking Sandwich Panel Joint.png";

type Core = {
  name: string;
  body: string;
  href: string;
  image: { src: StaticImageData | string; alt: string };
};

// PUF uses the joint photo until its own photo is available.
const CORES: Core[] = [
  {
    name: "PUF",
    body: "Reliable thermal insulation for cold storage and enclosed spaces.",
    href: "/products",
    image: {
      src: jointImage,
      alt: "Interlocking joint between two PUF sandwich panels",
    },
  },
  {
    name: "PIR",
    body: "Improved fire performance with high thermal efficiency for demanding facilities.",
    href: "/products",
    image: { src: pirImage, alt: "PIR insulated panels" },
  },
  {
    name: "Rockwool",
    body: "Non-combustible insulation with strong fire and acoustic performance.",
    href: "/products",
    image: {
      src: rockwoolImage,
      alt: "Rockwool insulated panels",
    },
  },
];

function ArrowButton({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  const isNext = direction === "next";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isNext ? "Next insulation core" : "Previous insulation core"}
      className={cn(
        "grid size-[max(40px,3.9cqw)] place-items-center rounded-[max(6px,0.6cqw)] transition-colors duration-200",
        isNext ? "bg-brand text-white hover:bg-black" : "bg-brand/10 text-black hover:bg-brand/20",
      )}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className={cn("size-[45%]", !isNext && "rotate-180")}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12h16M14 6l6 6-6 6" />
      </svg>
    </button>
  );
}

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function CoreSlider() {
  const [index, setIndex] = useState(0);
  const core = CORES[index];
  const track = useRef<HTMLDivElement>(null);
  const pinned = useRef<HTMLDivElement>(null);

  // Where the pinned block sticks: its content just under the header, or bottom-aligned when it is
  // taller than the screen. Scrolling through the pinned stretch steps through the cores.
  const pinTop = (pinEl: HTMLElement) => {
    const content = pinEl.firstElementChild as HTMLElement;
    const { paddingTop, paddingBottom } = getComputedStyle(content);
    const header = document.querySelector("header")?.offsetHeight ?? 0;
    return Math.min(
      header - parseFloat(paddingTop),
      window.innerHeight - pinEl.offsetHeight + parseFloat(paddingBottom),
    );
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
      setIndex(Math.min(CORES.length - 1, Math.floor(progress * CORES.length)));
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

  // Arrows and tabs scroll to that core's stretch, so clicking and scrolling always agree.
  const goTo = (i: number) => {
    const trackEl = track.current;
    const pinEl = pinned.current;
    if (!trackEl || !pinEl) return setIndex(i);
    const travel = trackEl.offsetHeight - pinEl.offsetHeight;
    const trackTop = trackEl.getBoundingClientRect().top + window.scrollY;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: trackTop - pinTop(pinEl) + (travel * (i + 0.5)) / CORES.length,
      behavior: reduced ? "auto" : "smooth",
    });
  };
  const step = (delta: number) => goTo((index + delta + CORES.length) % CORES.length);

  return (
    <section aria-roledescription="carousel" aria-label="Insulation cores">
      <div ref={track}>
        <div ref={pinned} className="sticky bg-white">
          <div className={cn(CONTAINER, SECTION_Y)}>
            <div className="@container">
              <Reveal>
                <div className="flex justify-end gap-3 lg:gap-[1.5cqw]">
                  <ArrowButton direction="prev" onClick={() => step(-1)} />
                  <ArrowButton direction="next" onClick={() => step(1)} />
                </div>

                <div
                  className={cn(
                    STACK_GAP,
                    "flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-0",
                  )}
                >
                  <div className="lg:mt-[2cqw] lg:w-[34%]">
                    {/* Re-keyed so the copy rises in again on every change */}
                    <div key={core.name} aria-live="polite" className="animate-rise">
                      <h2 className="text-[max(36px,4.2cqw)] leading-tight font-medium tracking-[-0.02em] text-black">
                        {core.name}
                      </h2>
                      <p className="mt-3 max-w-[24em] font-ui text-[max(15px,1.5cqw)] leading-normal text-[#909090] lg:mt-[0.8cqw]">
                        {core.body}
                      </p>
                    </div>

                    <div
                      role="tablist"
                      aria-label="Insulation core"
                      className={cn(STACK_GAP, "flex flex-wrap gap-2 lg:gap-[1cqw]")}
                    >
                      {CORES.map((c, i) => (
                        <button
                          key={c.name}
                          type="button"
                          role="tab"
                          aria-selected={i === index}
                          onClick={() => goTo(i)}
                          className={cn(
                            "rounded-[4px] px-[0.75em] py-[0.3em] font-ui text-[max(14px,1.4cqw)] leading-snug transition-colors duration-200",
                            i === index ? "bg-brand text-white" : "bg-brand/10 text-brand hover:bg-brand/20",
                          )}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>

                    <Link
                      href={core.href}
                      className={cn(
                        STACK_GAP,
                        "group inline-flex items-center gap-[0.4em] rounded-[max(6px,0.6cqw)] bg-brand px-[1.1em] py-[0.8em] font-ui text-[max(13px,1.05cqw)] leading-none text-white transition-colors duration-200 hover:bg-black",
                      )}
                    >
                      Learn more
                      <svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        className="size-[1em] transition-transform duration-200 group-hover:translate-x-0.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 6 6 6-6 6" />
                      </svg>
                    </Link>
                  </div>

                  <div className="relative aspect-[417/289] overflow-hidden rounded-[max(10px,1.1cqw)] lg:w-[56.8%]">
                    {/* All photos stay mounted so each is already loaded when its core comes up */}
                    {CORES.map((c, i) => (
                      <Image
                        key={c.name}
                        src={c.image.src}
                        alt={c.image.alt}
                        fill
                        placeholder={typeof c.image.src === "string" ? "empty" : "blur"}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        aria-hidden={i !== index}
                        className={cn(
                          "object-cover transition-opacity duration-500",
                          i === index ? "opacity-100" : "opacity-0",
                        )}
                      />
                    ))}
                  </div>
                </div>

                <p
                  className={cn(
                    STACK_GAP,
                    "text-center font-ui text-[max(14px,1.6cqw)] leading-snug text-[#1e1e1e] lg:ml-auto lg:w-[56.8%]",
                  )}
                >
                  <span className="inline-block max-w-[16em]">Insulation selected around performance.</span>
                </p>
              </Reveal>
            </div>
          </div>
        </div>
        {/* Scroll room while the block is pinned: one stretch per extra core */}
        <div aria-hidden className="h-[120svh]" />
      </div>
    </section>
  );
}
