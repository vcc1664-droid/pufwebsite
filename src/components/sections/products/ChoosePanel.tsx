import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER } from "@/constants/layout";
import { cn } from "@/lib/utils";

const iconProps = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "size-[58%]",
} as const;

const PANELS: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "Roof panels",
    body: "Standing seam. Cores: PUF or PIR.",
    // Ridged roof sheet
    icon: (
      <svg {...iconProps}>
        <path d="M2 17 6.5 8l3 6 2.5-5 2.5 5 3-6L22 17" />
        <path d="M2 17h20" />
      </svg>
    ),
  },
  {
    title: "Wall panels",
    body: "Single skin, micro-rib and concealed fix.",
    // Upright ribbed wall panel
    icon: (
      <svg {...iconProps}>
        <rect x="4" y="3" width="16" height="18" rx="1.5" />
        <path d="M8 3v18M12 3v18M16 3v18" />
      </svg>
    ),
  },
  {
    title: "PIR panels",
    body: "Foam core, chosen where fire behaviour matters more.",
    // Panel with its core showing
    icon: (
      <svg {...iconProps}>
        <rect x="4" y="3" width="16" height="18" rx="1.5" />
        <path d="M9 3v18M15 3v18" />
        <path d="M11 8h2M11 12h2M11 16h2" />
      </svg>
    ),
  },
];

/** Quick overview of the panel families, shown before the detailed ranges. */
/* Sizes (lg+) are cqw of the content width, measured from the design. Text sizes are unchanged. */
export function ChoosePanel() {
  return (
    // Soft purple glow behind the cards, as in the design
    <section className="bg-[radial-gradient(ellipse_65%_60%_at_50%_62%,rgba(98,28,112,0.22),rgba(98,28,112,0.08)_55%,transparent_82%)]">
      <div className={cn(CONTAINER, "pt-2 pb-16 lg:pt-[1cqw] lg:pb-24")}>
        <div className="@container">
          <Reveal>
            <h2 className="text-center font-sans text-[26px] leading-[1.3] font-normal tracking-normal text-[#171717] lg:text-[50.1815px] lg:leading-[65.2359px]">
              Choose your Panel
            </h2>
          </Reveal>

          <ul className="mt-6 grid gap-4 sm:grid-cols-3 lg:mt-[2.6cqw] lg:gap-[1.6cqw]">
            {PANELS.map((panel, i) => (
              <li key={panel.title}>
                <Reveal
                  delay={100 + i * 100}
                  className="flex h-full items-start gap-4 rounded-[max(12px,1cqw)] bg-white p-5 shadow-[0_4px_24px_rgba(98,28,112,0.06)] lg:gap-[1.1cqw] lg:p-[1.4cqw]"
                >
                  <span className="grid size-[max(40px,2.9cqw)] shrink-0 place-items-center rounded-[max(6px,0.5cqw)] bg-brand text-white">
                    {panel.icon}
                  </span>
                  <div>
                    <h3 className="font-ui text-[max(20px,1.6cqw)] leading-tight font-semibold text-brand">
                      {panel.title}
                    </h3>
                    <p className="mt-2 font-ui text-[15.5324px] leading-[23.2985px] font-normal tracking-normal text-[#1e1e1e] lg:mt-[0.6cqw]">
                      {panel.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
