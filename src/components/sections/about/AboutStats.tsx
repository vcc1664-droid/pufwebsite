import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER } from "@/constants/layout";

const iconProps = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  className: "size-[55%]",
} as const;

const STATS: { value: string; label: string; icon: ReactNode }[] = [
  {
    value: "500+",
    label: "Projects Completed",
    icon: (
      <svg {...iconProps}>
        <path d="M7 3h10v2h3v3a4 4 0 0 1-4 4h-.3A5 5 0 0 1 13 14.9V17h3v3H8v-3h3v-2.1A5 5 0 0 1 8.3 12H8a4 4 0 0 1-4-4V5h3zm0 4H6v1a2 2 0 0 0 1 1.7zm10 0v2.7A2 2 0 0 0 18 8V7z" />
      </svg>
    ),
  },
  {
    value: "350+",
    label: "Workforce",
    icon: (
      <svg {...iconProps}>
        <path d="M12 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM5.5 6a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm13 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM12 11.5c3.3 0 6 1.8 6 4V19H6v-3.5c0-2.2 2.7-4 6-4zM5 12.5c.4 0 .8 0 1.2.1A5 5 0 0 0 4.5 15.5V19H1v-3c0-1.9 1.8-3.5 4-3.5zm14 0c2.2 0 4 1.6 4 3.5v3h-3.5v-3.5a5 5 0 0 0-1.7-2.9l1.2-.1z" />
      </svg>
    ),
  },
  {
    value: "5,00,000+",
    label: "Lakh Sq Ft Production Capacity / Month",
    icon: (
      <svg {...iconProps}>
        <path d="M3 21V10l5 3V10l5 3V4h4l1 6h3v11zm4-5v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2z" />
      </svg>
    ),
  },
  {
    value: "12+",
    label: "Years of Trust & Experience",
    icon: (
      <svg {...iconProps}>
        <path d="M7 2h2v2h6V2h2v2h2a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2zM5 9v10h14V9zm2 2h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zm-8 4h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z" />
      </svg>
    ),
  },
];

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function AboutStats() {
  return (
    <section className="bg-[#f8f8f8]">
      {/* Grey band is full-bleed; content sits in the shared gutter (logo → Start Your Quote). */}
      <div className={CONTAINER}>
        <ul className="@container grid gap-x-6 gap-y-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-[3.55cqw] lg:py-[7.5cqw]">
          {STATS.map((stat, i) => (
            <li key={stat.label}>
              <Reveal delay={i * 100} className="relative h-full">
                {/* Icon badge straddles the card's top edge */}
                <span className="absolute top-0 left-1/2 grid size-[max(40px,4cqw)] -translate-x-1/2 -translate-y-[42%] place-items-center rounded-[max(5px,0.45cqw)] bg-brand text-white">
                  {stat.icon}
                </span>
                <div className="flex h-full flex-col items-center justify-center rounded-[max(8px,0.7cqw)] bg-white px-4 pt-12 pb-8 text-center lg:aspect-[214/112] lg:px-[1cqw] lg:pt-[3cqw] lg:pb-[2cqw]">
                  <p className="text-[max(30px,2.75cqw)] leading-none font-semibold tracking-[-0.02em] text-black">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-ui text-[max(13px,1.05cqw)] leading-snug text-[#444] lg:mt-[0.6cqw]">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
