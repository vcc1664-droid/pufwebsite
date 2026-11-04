"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, RULE_GAP, SECTION_Y, STACK_GAP } from "@/constants/layout";
import { cn } from "@/lib/utils";
import testimonialImage from "../../../public/Home/homePageVideo/a41800a3-269d-4e7c-9f4b-52d7a429688c.jpg";

const TESTIMONIAL_VIDEO = "https://www.instagram.com/reel/De4I8FFtbS6/";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
};

// Add more entries here; the dots appear once there are two or more.
const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sukhdev Singh",
    role: "Head of Infrastructure",
    quote:
      "The smooth implementation exceeded expectations. Multi-stage quality inspection ensured zero panel defect across 12,000 m² dispatch.",
    rating: 5,
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div role="img" aria-label={`${rating} out of 5 stars`} className="flex gap-[0.15em] text-[#f5b301]">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          aria-hidden
          viewBox="0 0 24 24"
          className={cn("size-[1em]", i >= rating && "opacity-25")}
          fill="currentColor"
        >
          <path d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
        </svg>
      ))}
    </div>
  );
}

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const testimonial = TESTIMONIALS[index];

  return (
    <section className="bg-[#f8f8f9]">
      {/* Grey band is full-bleed; content sits in the shared gutter (logo → Start Your Quote). */}
      <div className={CONTAINER}>
        <div
          className={cn(
            "@container flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-0",
            SECTION_Y,
          )}
        >
          {/* Testimonial photo; opens the video testimonial on Instagram */}
          <Reveal className="aspect-[325/287] overflow-hidden rounded-[max(10px,1cqw)] lg:w-[43.6%]">
            <a
              href={TESTIMONIAL_VIDEO}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Watch the video testimonial on Instagram (opens in a new tab)"
              className="group relative block h-full w-full"
            >
              <Image
                src={testimonialImage}
                alt=""
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span
                aria-hidden
                className="absolute top-1/2 left-1/2 grid size-[max(56px,5.6cqw)] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-black transition-transform duration-200 group-hover:scale-110"
              >
                <svg viewBox="0 0 24 24" className="ml-[8%] size-[38%]" fill="currentColor">
                  <path d="M7 4.5v15l13-7.5z" />
                </svg>
              </span>
            </a>
          </Reveal>

          <Reveal delay={100} className="lg:w-[48.5%]">
            <h2 className="max-w-[13em] text-[max(28px,3.5cqw)] leading-[1.3] font-medium tracking-[-0.02em] text-black">
              Trusted by Leaders Across the Industry
            </h2>
            <p className="mt-4 max-w-[34em] font-ui text-[max(14px,1.25cqw)] leading-normal text-[#909090] lg:mt-[1.6cqw]">
              See how our high-performance PUF panel systems and operational software transform facility
              performance.
            </p>

            {/* Re-keyed so the quote rises in again on every change */}
            <figure key={index} aria-live="polite" className={cn(RULE_GAP, "animate-rise")}>
              <figcaption>
                <p className="text-[max(17px,1.6cqw)] leading-tight font-medium text-black">
                  {testimonial.name}
                </p>
                <p className="mt-1 font-ui text-[max(12px,1.05cqw)] text-[#1e1e1e] lg:mt-[0.3cqw]">
                  {testimonial.role}
                </p>
              </figcaption>
              <blockquote
                className={cn(
                  STACK_GAP,
                  "max-w-[30em] font-ui text-[max(14px,1.2cqw)] leading-[1.6] text-[#1e1e1e]",
                )}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-3 text-[max(16px,1.7cqw)] lg:mt-[0.8cqw]">
                <Stars rating={testimonial.rating} />
              </div>
            </figure>

            {TESTIMONIALS.length > 1 && (
              <div className={cn(RULE_GAP, "flex gap-[max(6px,0.5cqw)]")}>
                {TESTIMONIALS.map((t, i) => (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show testimonial from ${t.name}`}
                    aria-current={i === index}
                    className={cn(
                      "size-[max(8px,0.75cqw)] rounded-full transition-colors duration-200",
                      i === index ? "bg-[#555]" : "bg-[#d0d0d0] hover:bg-[#aaa]",
                    )}
                  />
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
