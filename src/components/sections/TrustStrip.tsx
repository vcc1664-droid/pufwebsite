import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER } from "@/constants/layout";
import { cn } from "@/lib/utils";

export type TrustItem = { title: string; body: string; icon: ReactNode };

const iconProps = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  className: "size-[55%]",
} as const;

const SERVICE_ITEMS: TrustItem[] = [
  {
    title: "Pan-India Dispatch",
    body: "Delivered to your site in 30 days",
    icon: (
      <svg {...iconProps}>
        <path d="M2 5h12v10H2zm13 3h3.5L22 11.5V15h-7zM6 19a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm12 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
      </svg>
    ),
  },
  {
    title: "Multi-Certified",
    body: "FM, UL, BIS, ISO & more",
    icon: (
      <svg {...iconProps}>
        <path d="M12 2a7 7 0 0 1 4.2 12.6L17.5 22 12 19.5 6.5 22l1.3-7.4A7 7 0 0 1 12 2zm0 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
      </svg>
    ),
  },
  {
    title: "End-to-End Service",
    body: "From design to installation support",
    icon: (
      <svg {...iconProps}>
        <path d="M12 3a5 5 0 0 1 5 5v1h1a2 2 0 0 1 0 4h-1.3a5 5 0 0 1-9.4 0H6a2 2 0 0 1 0-4h1V8a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0V8a3 3 0 0 0-3-3zM5 21a7 7 0 0 1 14 0z" />
      </svg>
    ),
  },
];

/** The project details a quote starts from. */
export const PROJECT_CONDITION_ITEMS: TrustItem[] = [
  {
    title: "Temperature range",
    body: "Operating conditions and target temperatures",
    icon: (
      <svg {...iconProps}>
        <path d="M9 3a3 3 0 0 1 3 3v8.3a4.5 4.5 0 1 1-6 0V6a3 3 0 0 1 3-3zm5 2h4v2h-4zm0 4h4v2h-4zm0 4h3v2h-3z" />
      </svg>
    ),
  },
  {
    title: "Industry & use",
    body: "Your process and compliance requirements",
    icon: (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-[60%]"
      >
        <rect x="6" y="5" width="12" height="6" rx="3" />
        <rect x="6" y="13" width="12" height="6" rx="3" />
        <path d="M2 8h4M18 16h4M20 14l2 2-2 2M4 6 2 8l2 2" />
      </svg>
    ),
  },
  {
    title: "Area & layout",
    body: "Dimensions, openings and project scale.",
    icon: (
      <svg {...iconProps}>
        <path d="M3 3h8v10H3zm10 0h8v6h-8zm0 8h8v10h-8zM3 15h8v6H3z" />
      </svg>
    ),
  },
];

type TrustStripProps = {
  title?: string;
  items?: TrustItem[];
  /** "brand": white icon on purple; "light": black icon on white. */
  iconTone?: "brand" | "light";
};

/** Dark strip of short promises with icons; optionally headed. */
/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function TrustStrip({ title, items = SERVICE_ITEMS, iconTone = "brand" }: TrustStripProps) {
  return (
    <section className="bg-[#0b0b0b] text-white">
      {/* Dark band is full-bleed; content sits in the shared gutter (logo → Start Your Quote). */}
      <div className={CONTAINER}>
        <div className={cn("@container py-12", title ? "lg:pt-[2.3cqw] lg:pb-[6cqw]" : "lg:py-[6.5cqw]")}>
          {title && (
            <Reveal>
              <h2 className="text-center text-[max(28px,3.75cqw)] leading-tight font-medium tracking-[-0.01em]">
                {title}
              </h2>
            </Reveal>
          )}

          <ul
            className={cn(
              "flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:justify-between",
              title && "mt-10 lg:mt-[4.8cqw] lg:grid lg:grid-cols-[39%_38.2%_1fr] lg:gap-0",
            )}
          >
            {items.map((item, i) => (
              <li key={item.title}>
                <Reveal
                  delay={i * 100}
                  className={cn("flex gap-4 lg:gap-[1.2cqw]", title ? "items-start" : "items-center")}
                >
                  <span
                    className={cn(
                      "grid size-[max(44px,4cqw)] shrink-0 place-items-center rounded-[max(6px,0.6cqw)]",
                      iconTone === "light" ? "bg-white text-black" : "bg-brand text-white",
                    )}
                  >
                    {item.icon}
                  </span>
                  <span>
                    <span className="block text-[max(17px,1.8cqw)] leading-tight font-medium">
                      {item.title}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 block font-ui text-[max(13px,1.38cqw)] text-[#8a8a8a]",
                        title && "mt-2 max-w-[15.5em] leading-[1.45] lg:mt-[0.9cqw]",
                      )}
                    >
                      {item.body}
                    </span>
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
