import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER } from "@/constants/layout";
import { cn } from "@/lib/utils";

const iconProps = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "size-[60%]",
} as const;

const JOINTS: { name: string; icon: ReactNode }[] = [
  {
    name: "Roof Joints",
    icon: (
      <svg {...iconProps}>
        <path d="m5 15 7-7 7 7" />
      </svg>
    ),
  },
  {
    name: "M-Section",
    icon: (
      <svg {...iconProps}>
        <path d="M5 18V6l7 7 7-7v12" />
      </svg>
    ),
  },
  {
    name: "Double Tongue & Groove",
    icon: (
      <svg {...iconProps}>
        <path d="M5 5h9v14H5zM14 8h4v3h-4M14 13h4v3h-4" />
      </svg>
    ),
  },
  {
    name: "Single Tongue & Groove",
    icon: (
      <svg {...iconProps}>
        <path d="M5 5h9v14H5zM14 10.5h5v3h-5" />
      </svg>
    ),
  },
  {
    name: "Hidden Tongue & Groove",
    icon: (
      <svg {...iconProps}>
        <path d="M5 5h13v14H5zM12 10.5h6v3h-6" />
      </svg>
    ),
  },
];

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function PanelJoints() {
  return (
    <section className={cn(CONTAINER, "py-16 lg:py-24")}>
      <div className="@container">
        <Reveal>
          <h2 className="text-[max(28px,3.3cqw)] leading-tight font-medium tracking-[-0.02em] text-black">
            Available panel joints.
          </h2>
        </Reveal>

        <hr className="mt-6 border-[#bdbdbd] lg:mt-[4cqw]" />

        <Reveal delay={100} className="mt-6 lg:mt-[3.4cqw] lg:ml-[54.6%]">
          <p className="font-ui text-[max(15px,1.65cqw)] leading-[1.6] text-[#8a8a8a]">
            Innovative joinery for seamless connections, structural integrity and ease of installation.
          </p>
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-[4.6cqw] lg:grid-cols-5 lg:gap-[1.65cqw]">
          {JOINTS.map((joint, i) => (
            <li key={joint.name}>
              <Reveal
                delay={i * 80}
                className="flex aspect-[147/75] flex-col items-center justify-center gap-[max(8px,1cqw)] rounded-[max(8px,0.8cqw)] bg-black px-2 text-center text-white"
              >
                <span className="grid size-[max(28px,3cqw)] place-items-center rounded-[max(4px,0.45cqw)] bg-white text-black">
                  {joint.icon}
                </span>
                <span className="font-ui text-[max(12px,1.15cqw)] leading-tight">{joint.name}</span>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
