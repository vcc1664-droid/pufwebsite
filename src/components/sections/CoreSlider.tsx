"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER } from "@/constants/layout";
import { cn } from "@/lib/utils";
import jointImage from "../../../public/Home/Interlocking Sandwich Panel Joint.png";

type Core = {
  name: string;
  body: string;
  href: string;
  image: { src: StaticImageData; alt: string };
};

// Every core uses the joint photo until core-specific photos are available.
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
    image: {
      src: jointImage,
      alt: "Interlocking joint between two PIR sandwich panels",
    },
  },
  {
    name: "Rockwool",
    body: "Non-combustible insulation with strong fire and acoustic performance.",
    href: "/products",
    image: {
      src: jointImage,
      alt: "Interlocking joint between two Rockwool sandwich panels",
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
  const step = (delta: number) => setIndex((i) => (i + delta + CORES.length) % CORES.length);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Insulation cores"
      className={cn(CONTAINER, "py-16 lg:py-24")}
    >
      <div className="@container">
        <Reveal>
          <div className="flex justify-end gap-3 lg:gap-[1.5cqw]">
            <ArrowButton direction="prev" onClick={() => step(-1)} />
            <ArrowButton direction="next" onClick={() => step(1)} />
          </div>

          <div className="mt-6 flex flex-col gap-10 lg:mt-[2cqw] lg:flex-row lg:items-start lg:justify-between lg:gap-0">
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
                className="mt-5 flex flex-wrap gap-2 lg:mt-[1.2cqw] lg:gap-[1cqw]"
              >
                {CORES.map((c, i) => (
                  <button
                    key={c.name}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    onClick={() => setIndex(i)}
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
                className="group mt-6 inline-flex items-center gap-[0.4em] rounded-[max(6px,0.6cqw)] bg-brand px-[1.1em] py-[0.8em] font-ui text-[max(13px,1.05cqw)] leading-none text-white transition-colors duration-200 hover:bg-black lg:mt-[2.3cqw]"
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
              <Image
                key={core.name}
                src={core.image.src}
                alt={core.image.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="animate-rise object-cover"
              />
            </div>
          </div>

          <p className="mt-6 text-center font-ui text-[max(14px,1.6cqw)] leading-snug text-[#1e1e1e] lg:mt-[2cqw] lg:ml-auto lg:w-[56.8%]">
            <span className="inline-block max-w-[16em]">Insulation selected around performance.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
