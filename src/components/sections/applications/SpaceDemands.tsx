import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER } from "@/constants/layout";
import { cn } from "@/lib/utils";
import coldImage from "../../../../public/Applications/Chilled Freezer Warehouse Aisle.png";
import fireImage from "../../../../public/Applications/Industrial Warehouse Partition Wall.png";
import airtightImage from "../../../../public/Applications/Interlocking Insulated Panel Joint.png";
import weatherImage from "../../../../public/Applications/Rainy Industrial Warehouse at Dusk.png";
import hygieneImage from "../../../../public/Applications/Sterile Stainless Steel Food Production Line.png";
import heatImage from "../../../../public/Applications/Sunlit Desert Warehouse Rooftop.png";

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

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function SpaceDemands() {
  return (
    <section className={cn(CONTAINER, "py-16 lg:py-24")}>
      <div className="@container">
        <Reveal className="lg:ml-[60.6%]">
          <h2 className="max-w-[11em] text-[max(28px,3.8cqw)] leading-[1.2] font-medium tracking-[-0.02em] text-black">
            What does the space demand?
          </h2>
        </Reveal>

        <hr className="mt-6 border-[#d9d9d9] lg:mt-[2.6cqw]" />

        <Reveal delay={100} className="mt-6 lg:mt-[3cqw]">
          <p className="max-w-[26em] font-ui text-[max(14px,1.75cqw)] leading-normal text-[#7a7a7a]">
            Every application starts with the conditions the panel has to handle.
          </p>
        </Reveal>

        <ul className="mt-8 grid grid-cols-2 gap-3 lg:mt-[4cqw] lg:grid-cols-3 lg:gap-[2.9cqw]">
          {DEMANDS.map((demand, i) => (
            <li key={demand.label}>
              <Reveal delay={(i % 3) * 100}>
                <div className="relative aspect-[107/124] overflow-hidden rounded-[max(10px,1.8cqw)]">
                  <Image
                    src={demand.image}
                    alt={demand.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 31vw, 50vw"
                    className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                  <span className="absolute bottom-[max(8px,1.6cqw)] left-[max(8px,1.6cqw)] flex items-center gap-[0.5em] rounded-[max(3px,0.4cqw)] bg-white px-[0.7em] py-[0.4em] font-ui text-[max(11px,1.2cqw)] leading-none text-black">
                    {demand.label}
                    <span aria-hidden className="h-[0.9em] w-px bg-[#bdbdbd]" />
                    {demand.icon}
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
