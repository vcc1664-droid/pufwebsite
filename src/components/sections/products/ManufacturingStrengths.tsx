import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { BLOCK_GAP, CONTAINER, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";

const iconProps = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "size-[60%]",
} as const;

const STRENGTHS: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "11-Acre Integrated Facility",
    body: "Entire production ecosystem under one roof from raw material receipt to finished panel dispatch",
    icon: (
      <svg {...iconProps}>
        <path d="M4 20V10l5 3V10l5 3V5h4l2 15zM8 17h1M12 17h1M16 17h1" />
      </svg>
    ),
  },
  {
    title: "7,200 m² Panels Per Day",
    body: "High-throughput continuous lamination lines delivering precision panels at industrial scale",
    icon: (
      <svg {...iconProps}>
        <path d="M13 3 5 14h6l-1 7 8-11h-6z" />
      </svg>
    ),
  },
  {
    title: "Steel Fabrication & Punching",
    body: "In-house steel processing for full traceability and quality control from coil to finished panel",
    icon: (
      <svg {...iconProps}>
        <path d="m12 3 9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5" />
      </svg>
    ),
  },
  {
    title: "Advanced Powder Coating",
    body: "Premium coating lines for superior surface durability, corrosion resistance, and custom finishes",
    icon: (
      <svg {...iconProps}>
        <path d="M14 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1zM6 12l1 2 2 1-2 1-1 2-1-2-2-1 2-1zM15 15l4 4M13 17l2-2" />
      </svg>
    ),
  },
  {
    title: "Stringent Quality Control",
    body: "Multi-stage QC at every production step zero compromises before a single panel leaves the facility",
    icon: (
      <svg {...iconProps}>
        <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6zM9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Pan-India Supply & Support",
    body: "Nationwide logistics network and dedicated technical teams from design consultation to installation",
    icon: (
      <svg {...iconProps}>
        <path d="M3 6h11v10H3zM14 9h4l3 3v4h-7M7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
      </svg>
    ),
  },
];

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function ManufacturingStrengths() {
  return (
    <section className="bg-[#f6f6f6]">
      {/* Grey band is full-bleed; content sits in the shared gutter (logo → Start Your Quote). */}
      <div className={CONTAINER}>
        <div className={cn("@container", SECTION_Y)}>
          <Reveal className="text-center">
            <h2 className="text-[max(28px,3.8cqw)] leading-tight font-medium tracking-[-0.02em] text-black">
              Manufacturing that delivers
            </h2>
            {/* Copy as given in the design; it reads like a placeholder carried over from the About page. */}
            <p className="mt-2 font-ui text-[max(14px,1.8cqw)] text-[#7a7a7a] lg:mt-[0.6cqw]">
              Timeline structure. Years and events to confirm.
            </p>
          </Reveal>

          <ul className={cn(BLOCK_GAP, "grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[0.9cqw]")}>
            {STRENGTHS.map((item, i) => (
              <li key={item.title}>
                <Reveal
                  delay={(i % 3) * 100}
                  className="h-full rounded-[max(10px,1cqw)] bg-white p-6 lg:min-h-[18.8cqw] lg:p-[2.5cqw]"
                >
                  <span className="grid size-[max(30px,3cqw)] place-items-center rounded-[max(5px,0.6cqw)] border-[1.5px] border-black text-black">
                    {item.icon}
                  </span>
                  <h3 className="mt-5 text-[max(17px,1.6cqw)] leading-tight font-medium text-black lg:mt-[2cqw]">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-ui text-[max(14px,1.35cqw)] leading-[1.55] text-[#6b6b6b] lg:mt-[0.8cqw]">
                    {item.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
