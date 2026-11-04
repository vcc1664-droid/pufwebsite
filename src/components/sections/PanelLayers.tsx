import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";import { ScrollGrow } from "@/components/motion/ScrollGrow";
import { ScrollRise } from "@/components/motion/ScrollRise";
import { CONTAINER, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";
import panelImage from "../../../public/Home/puf-3d-panel-exploded.png";

const LayersIcon = (
  <path d="M12 3.5 3.5 8 12 12.5 20.5 8 12 3.5ZM3.5 12 12 16.5 20.5 12M3.5 16 12 20.5 20.5 16" />
);

const GridIcon = (
  <>
    <rect x="4" y="4" width="7" height="7" rx="1.5" />
    <rect x="13" y="4" width="7" height="7" rx="1.5" />
    <rect x="4" y="13" width="7" height="7" rx="1.5" />
    <rect x="13" y="13" width="7" height="7" rx="1.5" />
  </>
);

/* Positions (lg+) are % / cqw of the content width, measured from the Figma frame. */
const LAYERS: { title: string; body: string; icon: ReactNode; position: string }[] = [
  {
    title: "Steel Face",
    body: "A protective inner surface that completes the panel system.",
    icon: LayersIcon,
    position: "lg:left-[76.8%] lg:top-[0.3cqw] lg:max-w-[22cqw]",
  },
  {
    title: "Steel Face",
    body: "Durable outer protection designed for demanding environments.",
    icon: LayersIcon,
    position: "lg:left-0 lg:top-[26.3cqw] lg:max-w-[27cqw]",
  },
  {
    title: "PUF Core",
    body: "The high-performance insulation core responsible for thermal efficiency.",
    icon: GridIcon,
    position: "lg:left-[71.8%] lg:top-[32.3cqw] lg:max-w-[27cqw]",
  },
];

export function PanelLayers() {
  return (
    <section className={cn(CONTAINER, SECTION_Y)}>
      <div className="@container">
        <Reveal className="text-center">
          <h2 className="text-[max(26px,4cqw)] leading-none tracking-[-0.02em] text-ink uppercase">
            What&apos;s Inside Matters
          </h2>
          <p className="mx-auto mt-[max(14px,1.73cqw)] max-w-[66cqw] font-ui text-[max(14px,1.3cqw)] leading-[1.5] text-muted max-lg:max-w-xl">
            A PUF panel is more than two metal faces. At its core is a high-performance insulation layer,
            engineered between them to deliver exceptional thermal performance.
          </p>
        </Reveal>

        <div className="mt-10 lg:relative lg:mt-[4.5cqw] lg:h-[43.2cqw]">
          {/* Starts hidden behind the panel image and slides up into place on scroll */}
          <ScrollRise from="15cqw" className="relative z-0 text-center lg:absolute lg:inset-x-0 lg:top-0">
            <h3 className="inline-block text-[max(12px,1.45cqw)] leading-none font-semibold tracking-[-0.01em] text-brand uppercase underline decoration-[max(1px,0.15cqw)] underline-offset-[0.35em]">
              Three Layers. One Engineered Panel
            </h3>
          </ScrollRise>

          <Reveal
            delay={100}
            className="relative z-10 mx-auto mt-4 max-w-xl lg:absolute lg:top-[1.35cqw] lg:left-[19.46%] lg:mt-0 lg:w-[58.1%] lg:max-w-none"
          >
            {/* Starts small and grows to its normal size as it scrolls into view */}
            <ScrollGrow>
              <Image
                src={panelImage}
                alt="Exploded view of a PUF panel: two steel faces with an insulating PUF core between them"
                sizes="(min-width: 1024px) 58vw, (min-width: 640px) 576px, 100vw"
                className="h-auto w-full"
              />
            </ScrollGrow>
          </Reveal>

          <ul className="mt-10 grid gap-8 sm:grid-cols-3 lg:contents">
            {LAYERS.map((layer, i) => (
              <li key={layer.body} className={cn("lg:absolute", layer.position)}>
                <Reveal delay={150 + i * 100}>
                  <span className="flex size-[max(32px,3.1cqw)] items-center justify-center rounded-[max(6px,0.7cqw)] bg-[#ededed]">
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      className="size-[60%]"
                      fill="none"
                      stroke="#2e2e2e"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    >
                      {layer.icon}
                    </svg>
                  </span>
                  <h4 className="mt-[max(10px,1.04cqw)] text-[max(15px,1.6cqw)] leading-none font-medium tracking-[-0.02em] text-[#312d2d] uppercase">
                    {layer.title}
                  </h4>
                  <p className="mt-[max(8px,1cqw)] text-[max(14px,1.5cqw)] leading-[1.25] font-light text-[#909090]">
                    {layer.body}
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
