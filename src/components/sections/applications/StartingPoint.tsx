"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, RULE_GAP, SECTION_Y, STACK_GAP } from "@/constants/layout";
import { QUOTE_CTA } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import coldRoomImage from "../../../../public/Applications/modular_coldroom_enclosure.jpg";

type Panel = {
  title: string;
  body: string;
  image: { src: StaticImageData; alt: string };
  specs: { label: string; value: string }[];
  explore: { label: string; href: string };
};

// Only the first category has content in the design so far; the others show nothing until it is added.
const CATEGORIES: { name: string; panel?: Panel }[] = [
  {
    name: "Temperature-Controlled Spaces",
    panel: {
      title: "Cold storage & cold-room enclosures",
      body: "Insulated walls and ceilings form the enclosure. Specify them alongside refrigeration, doors and the operating conditions.",
      image: { src: coldRoomImage, alt: "Cold storage enclosure with racking either side of the aisle" },
      specs: [
        { label: "Operating temperature", value: "-40°C to +15°C" },
        { label: "Door use", value: "Sliding & hinged insulated doors" },
        { label: "Joints & penetrations", value: "Airtight tongue & groove camlocks" },
      ],
      explore: { label: "Explore Cold Room Panels", href: "/products" },
    },
  },
  { name: "Industrial Roofing & Cladding" },
  { name: "Controlled & Modular Environments" },
];

const link =
  "group inline-flex items-center gap-[0.25em] text-[max(14px,1.07cqw)] font-medium text-brand transition-opacity duration-200 hover:opacity-70";

function Arrow() {
  return (
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
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function StartingPoint() {
  const [active, setActive] = useState(0);
  const panel = CATEGORIES[active].panel;

  return (
    <section className={cn(CONTAINER, SECTION_Y)}>
      <div className="@container">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-[max(28px,3.3cqw)] leading-[1.2] font-medium tracking-[-0.02em] text-black">
            Find the <br />
            right starting point.
          </h2>

          <div role="tablist" aria-label="Application type" className="flex flex-wrap gap-2 lg:gap-[1.6cqw]">
            {CATEGORIES.map((category, i) => (
              <button
                key={category.name}
                type="button"
                role="tab"
                id={`starting-point-tab-${i}`}
                aria-selected={active === i}
                aria-controls="starting-point-panel"
                onClick={() => setActive(i)}
                className={cn(
                  "rounded-[max(5px,0.5cqw)] border px-[1.3em] py-[0.8em] font-ui text-[max(12px,0.95cqw)] leading-none transition-colors duration-200",
                  active === i
                    ? "border-black bg-black text-white"
                    : "border-[#8c8c8c] bg-white text-black hover:border-black",
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </Reveal>

        <hr className={cn(RULE_GAP, "border-[#bdbdbd]")} />

        <div
          id="starting-point-panel"
          role="tabpanel"
          aria-labelledby={`starting-point-tab-${active}`}
          className={RULE_GAP}
        >
          {panel && (
            // Re-keyed so the panel rises in again on every tab change
            <div
              key={active}
              className="flex animate-rise flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0"
            >
              <div className="relative aspect-[624/281] overflow-hidden rounded-[max(12px,2.1cqw)] lg:w-[39.1%]">
                <Image
                  src={panel.image.src}
                  alt={panel.image.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 39vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="lg:w-[55.6%]">
                <h3 className="font-ui text-[max(20px,2cqw)] leading-tight font-semibold tracking-[-0.01em] text-black">
                  {panel.title}
                </h3>
                <p className="mt-3 max-w-[30em] font-ui text-[max(15px,1.75cqw)] leading-[1.5] text-[#8a8a8a] lg:mt-[1.1cqw]">
                  {panel.body}
                </p>

                <dl className={cn(STACK_GAP, "grid gap-4 sm:flex sm:gap-0")}>
                  {panel.specs.map((spec, i) => (
                    <div
                      key={spec.label}
                      className={cn(
                        "sm:px-[2.25cqw]",
                        i === 0 ? "sm:pl-0" : "sm:border-l sm:border-[#bdbdbd]",
                      )}
                    >
                      <dt className="font-ui text-[max(13px,1cqw)] font-medium text-black">{spec.label}</dt>
                      <dd className="mt-1 font-ui text-[max(12px,0.95cqw)] text-[#8a8a8a]">{spec.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className={cn(STACK_GAP, "flex flex-wrap gap-x-[max(32px,5.6cqw)] gap-y-3")}>
                  <Link href={panel.explore.href} className={link}>
                    {panel.explore.label}
                    <Arrow />
                  </Link>
                  <Link href={QUOTE_CTA.href} className={link}>
                    Discuss This Application
                    <Arrow />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
