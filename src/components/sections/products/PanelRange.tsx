"use client";

import { useId, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { BLOCK_GAP, CONTAINER, RULE_GAP, SECTION_Y, STACK_GAP } from "@/constants/layout";
import { cn } from "@/lib/utils";

export type PanelType = { tab: string; label: string; name: string; video: string };
export type PerformanceRow = { label: string; value: string };

type PanelRangeProps = {
  title: string;
  body: string;
  types: PanelType[];
  /** Two columns of technical values. */
  performance: [PerformanceRow[], PerformanceRow[]];
  tone?: "dark" | "light";
  /** Round the top corners, for a dark band that opens on white. */
  roundedTop?: boolean;
};

/** One panel family: type tabs, an animation of the selected type and its technical values. */
/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function PanelRange({
  title,
  body,
  types,
  performance,
  tone = "light",
  roundedTop = false,
}: PanelRangeProps) {
  const [active, setActive] = useState(0);
  const id = useId();
  const type = types[active];
  const dark = tone === "dark";

  return (
    <section
      className={cn(
        dark ? "bg-black text-white" : "bg-white text-black",
        roundedTop && "rounded-t-[max(28px,5.5vw)]",
      )}
    >
      {/* Band is full-bleed; content sits in the shared gutter (logo → Start Your Quote). */}
      <div className={CONTAINER}>
        <div className={cn("@container", SECTION_Y)}>
          <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-0">
            <h2 className="text-[max(32px,3.55cqw)] leading-tight font-normal tracking-[-0.02em] lg:w-[59.2%]">
              {title}
            </h2>
            <div
              role="tablist"
              aria-label={`${title} type`}
              className="flex flex-wrap gap-2 lg:shrink-0 lg:flex-nowrap lg:gap-[1.3cqw]"
            >
              {types.map((t, i) => (
                <button
                  key={t.tab}
                  type="button"
                  role="tab"
                  id={`${id}-tab-${i}`}
                  aria-selected={active === i}
                  aria-controls={`${id}-panel`}
                  onClick={() => setActive(i)}
                  className={cn(
                    "rounded-[max(6px,0.5cqw)] border px-[1.1em] py-[0.95em] font-ui text-[max(13px,1cqw)] leading-none transition-colors duration-200",
                    dark ? "border-white" : "border-black",
                    active === i
                      ? dark
                        ? "bg-white text-black"
                        : "bg-black text-white"
                      : dark
                        ? "text-white hover:bg-white/10"
                        : "text-black hover:bg-black/5",
                  )}
                >
                  {t.tab}
                </button>
              ))}
            </div>
          </Reveal>

          <hr className={cn(RULE_GAP, dark ? "border-[#4a4a4a]" : "border-[#8c8c8c]")} />

          <Reveal delay={100} className={cn(RULE_GAP, "lg:ml-[59.2%]")}>
            <p className={cn("font-ui text-[max(16px,1.75cqw)] leading-[1.5]", !dark && "text-[#1e1e1e]")}>
              {body}
            </p>
          </Reveal>

          <div
            id={`${id}-panel`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${active}`}
            className={cn(
              BLOCK_GAP,
              "relative aspect-[4/3] overflow-hidden rounded-[max(16px,2.8cqw)] bg-[#d9d9d9] sm:aspect-[1594/560]",
            )}
          >
            <video
              key={type.video}
              src={type.video}
              autoPlay
              muted
              loop
              playsInline
              aria-label={`${type.name} animation`}
              className="absolute inset-0 size-full animate-rise object-cover"
            />
            <p className="absolute top-[max(14px,3cqw)] left-[max(14px,3cqw)] bg-[#6b6b6b] px-[1.4em] py-[0.6em] font-ui text-[max(12px,1cqw)] leading-none text-white">
              {type.label}
            </p>
            <p className="absolute bottom-[max(14px,3cqw)] left-[max(14px,3cqw)] font-ui text-[max(17px,1.75cqw)] text-black">
              {type.name}
            </p>
          </div>

          <Reveal
            className={cn(
              STACK_GAP,
              "rounded-[max(10px,1cqw)] p-6 lg:p-[2.2cqw]",
              dark ? "bg-[#0b0b0b]" : "bg-[#f7f7f7]",
            )}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="flex items-center gap-[0.35em] font-ui text-[max(17px,1.5cqw)]">
                <span aria-hidden className="size-[0.3em] rounded-[1px] bg-current" />
                Technical Performance
              </h3>
              <p
                className={cn(
                  "font-ui text-[max(12px,0.88cqw)] italic",
                  dark ? "text-white/85" : "text-black",
                )}
              >
                Typical industry values - see datasheets below
              </p>
            </div>

            <div className="mt-4 grid items-start gap-x-[4.3cqw] lg:mt-[1.6cqw] lg:grid-cols-2">
              {performance.map((column, c) => (
                <dl
                  key={c}
                  className={cn(
                    c === 0
                      ? dark
                        ? "text-[#9a9a9a]"
                        : "text-[#8a8a8a]"
                      : dark
                        ? "text-white"
                        : "text-black",
                  )}
                >
                  {column.map((row) => (
                    <div
                      key={row.label}
                      className={cn(
                        "flex items-center justify-between gap-4 border-b py-4 font-ui text-[max(14px,1.2cqw)] lg:py-[1.45cqw]",
                        dark ? "border-[#333]" : "border-[#d0d0d0]",
                      )}
                    >
                      <dt>{row.label}</dt>
                      <dd className="text-right">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
