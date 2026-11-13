"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { BLOCK_GAP, CONTAINER, RULE_GAP, SECTION_Y, STACK_GAP } from "@/constants/layout";
import { cn } from "@/lib/utils";
import { SpecsDialog } from "./SpecsDialog";

export type PanelType = { tab: string; label: string; name: string; video: string };
export type PerformanceRow = { label: string; value: string };

type PanelRangeProps = {
  title: string;
  body: string;
  types: PanelType[];
  /** Two columns of technical values. */
  performance: [PerformanceRow[], PerformanceRow[]];
  /** Full spec sheet shown when "Technical Performance" is clicked; defaults to the values above. */
  specs?: PerformanceRow[];
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
  specs,
  tone = "light",
  roundedTop = false,
}: PanelRangeProps) {
  const [active, setActive] = useState(0);
  const id = useId();
  const type = types[active];
  const dark = tone === "dark";
  const video = useRef<HTMLVideoElement>(null);
  const specsDialog = useRef<HTMLDialogElement>(null);

  // React leaves `muted` out of the server HTML, so the browser can block autoplay; and with three
  // panel videos on the page, loading them all at once can stall one. So each video is muted here
  // and only loads and plays while its section is on screen.
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    el.muted = true;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.play().catch(() => {});
      else el.pause();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [type.video]);

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
              ref={video}
              key={type.video}
              src={encodeURI(type.video)}
              muted
              preload="none"
              loop
              playsInline
              aria-label={`${type.name} animation`}
              className="absolute inset-0 size-full animate-rise object-cover"
            />
            <p className="absolute top-[max(14px,3cqw)] left-[max(14px,3cqw)] bg-[#6b6b6b] px-[1.4em] py-[0.6em] font-ui text-[max(12px,1cqw)] leading-none text-white">
              {type.label}
            </p>
          </div>

          <Reveal
            className={cn(
              STACK_GAP,
              "rounded-[max(10px,1cqw)] p-6 lg:p-[2.2cqw]",
              dark ? "bg-[#0b0b0b]" : "bg-[#f7f7f7]",
            )}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="font-ui text-[max(17px,1.5cqw)]">
                {/* Opens the full spec sheet */}
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={() => specsDialog.current?.showModal()}
                  className={cn(
                    "group inline-flex cursor-pointer items-center gap-2 rounded-[max(6px,0.5cqw)] border px-[1.2em] py-[0.65em] font-ui text-[max(13px,1.05cqw)] font-medium leading-none transition-all duration-200 shadow-sm",
                    dark
                      ? "border-white/80 bg-white/10 text-white hover:border-white hover:bg-white hover:text-black"
                      : "border-black/80 bg-black/5 text-black hover:border-black hover:bg-black hover:text-white",
                  )}
                >
                  <span className="font-semibold tracking-[-0.01em]">Technical Performance</span>
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-[1em] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </button>
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

          <SpecsDialog ref={specsDialog} name={type.name} rows={specs ?? performance.flat()} />
        </div>
      </div>
    </section>
  );
}
