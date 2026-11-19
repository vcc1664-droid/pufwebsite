import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";
import panelImage from "../../../../public/Home/21937329-9225-4a24-a7ce-e400225ff293.png";

const NAVY = "#14213d";
const ACCENT = "#561A61";
const THERMO_ACCENT = "#561A61";

/* Line icons: navy outline with an orange accent, as in the design. */
const ThermometerIcon = (
  <>
    <path d="M14 30V9a4 4 0 0 1 8 0v21a7 7 0 1 1-8 0Z" stroke={NAVY} />
    <path d="M18 18v15" stroke={THERMO_ACCENT} strokeWidth="3" />
    <circle cx="18" cy="35" r="3.5" fill={THERMO_ACCENT} stroke="none" />
    <path d="M27 12h7M27 17h5M27 22h7" stroke={THERMO_ACCENT} />
  </>
);

const HeatIcon = (
  <>
    <path d="M22 6l10 5v28l-10-5V6Z" stroke={NAVY} />
    <path d="M22 6l-3 2v28l3-2" stroke={NAVY} />
    <path d="M4 15c2-1.5 4 1.5 6 0s4 1.5 6 0M4 21c2-1.5 4 1.5 6 0s4 1.5 6 0M4 27c2-1.5 4 1.5 6 0s4 1.5 6 0" stroke={ACCENT} />
    <path d="M14 13l2 2-2 2M14 19l2 2-2 2M14 25l2 2-2 2" stroke={ACCENT} />
  </>
);

const LayersIcon = (
  <>
    <path d="M20 6 4 14l16 8 16-8-16-8Z" stroke={NAVY} />
    <path d="M4 20l16 8 16-8" stroke={ACCENT} />
    <path d="M4 26l16 8 16-8" stroke={NAVY} />
  </>
);

const EnergyIcon = (
  <>
    <path d="M20 30V18" stroke={ACCENT} />
    <path d="M20 20c-5 0-8-3-8-8 5 0 8 3 8 8ZM20 18c0-6 4-9 9-9 0 6-4 9-9 9Z" stroke={ACCENT} />
    <path d="M4 18v8l6 6v4M10 36h5v-5l-4-5M8 24l4 4" stroke={NAVY} />
    <path d="M36 18v8l-6 6v4M30 36h-5v-5l4-5M32 24l-4 4" stroke={NAVY} />
  </>
);

const BENEFITS: { title: [string, string]; body: string; icon: ReactNode }[] = [
  {
    title: ["Optimal", "Temperature Control"],
    body: "Maintain a stable indoor environment with precise temperature regulation.",
    icon: ThermometerIcon,
  },
  {
    title: ["Heat", "Insulation"],
    body: "Reduce external heat impact, keeping indoor spaces cooler in summer and warmer in winter.",
    icon: HeatIcon,
  },
  {
    title: ["High", "Thermal Insulation"],
    body: "Enhance energy efficiency with superior thermal resistance.",
    icon: LayersIcon,
  },
  {
    title: ["Energy", "Efficiency"],
    body: "Enhances energy efficiency, helping to lower energy costs.",
    icon: EnergyIcon,
  },
];

/** One benefit: icon tile above a two-line title and a short description. */
function Benefit({ benefit, align, delay }: { benefit: (typeof BENEFITS)[number]; align: "start" | "end"; delay: number }) {
  const end = align === "end";
  return (
    <li>
      <Reveal delay={delay} className={cn("flex flex-col items-start", end && "lg:items-end lg:text-right")}>
        <span className="grid size-[max(36px,2.4cqw)] place-items-center rounded-[max(6px,0.4cqw)] bg-white">
          <svg
            aria-hidden
            viewBox="0 0 40 40"
            fill="none"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-[78%]"
          >
            {benefit.icon}
          </svg>
        </span>
        <h3 className="mt-3 text-[max(18px,1.45cqw)] leading-[1.15] font-normal tracking-[-0.01em] text-black lg:mt-[0.9cqw]">
          {benefit.title[0]}
          <br />
          {benefit.title[1]}
        </h3>
        <p className="mt-2 max-w-[22em] font-ui text-[15.5324px] leading-[23.2985px] font-normal tracking-normal text-[#3e3e3e] lg:mt-[0.6cqw]">
          {benefit.body}
        </p>
      </Reveal>
    </li>
  );
}

/** What the panels do: the panel render in the middle, two benefits on each side. */
/* Sizes (lg+) are cqw of the content width, measured from the design. Text sizes are unchanged. */
export function PanelBenefits() {
  // Left column: 1st and 3rd benefit (text aligned towards the panel); right column: 2nd and 4th
  const left = [BENEFITS[0], BENEFITS[2]];
  const right = [BENEFITS[1], BENEFITS[3]];

  return (
    // Light grey band, full-bleed
    <section className="bg-[#f2f2f2]">
      <div className={cn(CONTAINER, SECTION_Y)}>
        <div className="@container">
          <div className="grid gap-10 lg:grid-cols-[1fr_32%_1fr] lg:items-center lg:gap-[3cqw]">
            <ul className="order-2 grid gap-8 sm:grid-cols-2 lg:order-none lg:grid-cols-1 lg:gap-[4.5cqw]">
              {left.map((benefit, i) => (
                <Benefit key={benefit.title.join(" ")} benefit={benefit} align="end" delay={100 + i * 200} />
              ))}
            </ul>

            <Reveal className="order-1 mx-auto w-full max-w-md lg:order-none lg:max-w-none">
              <Image
                src={panelImage}
                alt="PUF insulated panel: two steel faces with an insulating core between them"
                sizes="(min-width: 1024px) 30vw, 448px"
                className="h-auto w-full"
              />
            </Reveal>

            <ul className="order-3 grid gap-8 sm:grid-cols-2 lg:order-none lg:grid-cols-1 lg:gap-[4.5cqw]">
              {right.map((benefit, i) => (
                <Benefit key={benefit.title.join(" ")} benefit={benefit} align="start" delay={200 + i * 200} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
