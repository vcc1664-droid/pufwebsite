import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER } from "@/constants/layout";
import { cn } from "@/lib/utils";

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
const CARD_BG = "#fef6ff";
const CUT_R = "max(10px,1.25cqw)";

/** Quarter-circle filler that rounds the card edge where it meets a white cut-out. */
function InverseCorner({ className, at }: { className: string; at: string }) {
  return (
    <span
      aria-hidden
      className={cn("absolute size-(--cut-r)", className)}
      style={{ background: `radial-gradient(circle at ${at}, transparent var(--cut-r), #fff calc(var(--cut-r) + 0.5px))` }}
    />
  );
}

function Stat({ value, mark, children }: { value: string; mark: string; children: ReactNode }) {
  return (
    <>
      <p className="flex items-start text-[max(52px,5.9cqw)] leading-none font-bold tracking-[-0.04em] text-black">
        {value}
        <span className="ml-[0.06em] text-[0.36em] leading-none font-semibold">{mark}</span>
      </p>
      <p className="max-w-[12.6em] font-ui text-[max(15px,1.45cqw)] leading-[1.55] text-[#6c6262]">{children}</p>
    </>
  );
}

const label = "text-[max(14px,1.35cqw)] leading-none font-semibold tracking-[-0.03em] text-black uppercase";

export function Stats() {
  return (
    <section className={cn(CONTAINER, "py-16 lg:py-24")}>
      <Reveal className="@container">
        <div
          className="relative overflow-hidden rounded-[max(14px,1.8cqw)] px-6 pt-20 pb-24 sm:px-10 lg:pt-[3.1cqw] lg:pr-0 lg:pb-[8.4cqw] lg:pl-[8.9cqw]"
          style={{ backgroundColor: CARD_BG, "--cut-r": CUT_R } as CSSProperties}
        >
          {/* Top-left cut-out with the brand bars */}
          <div
            aria-hidden
            className="absolute top-0 left-0 flex h-[max(48px,4.8cqw)] w-[max(64px,6.4cqw)] items-center justify-center rounded-br-(--cut-r) bg-white"
          >
            <span className="flex w-[max(18px,1.75cqw)] flex-col gap-[max(4px,0.4cqw)]">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-[max(4px,0.4cqw)] bg-brand" />
              ))}
            </span>
          </div>
          <InverseCorner at="100% 100%" className="top-0 left-[max(64px,6.4cqw)]" />
          <InverseCorner at="100% 100%" className="top-[max(48px,4.8cqw)] left-0" />

          <div className="grid gap-6 lg:grid-cols-2 lg:gap-x-[3.3cqw] lg:gap-y-0">
            <h2 className={cn(label, "lg:col-span-2")}>Launched Projects</h2>

            <div className="border-t border-[#7c797c] pt-8 max-lg:mt-6 lg:mt-[1.85cqw] lg:grid lg:grid-cols-[47%_1fr] lg:pt-[2.6cqw] max-lg:flex max-lg:flex-col max-lg:gap-4">
              <Stat value="150" mark="+">
                Projects launched successfully since 2012.
              </Stat>
            </div>

            <div className="border-t border-[#7c797c] pt-8 max-lg:mt-6 lg:mt-[1.85cqw] lg:flex lg:justify-between lg:pt-[2.6cqw] max-lg:flex max-lg:flex-col max-lg:gap-4">
              <Stat value="98" mark="%">
                Percentage of our fully satisfied clients.
              </Stat>
            </div>
          </div>

          <h2 className={cn(label, "mt-14 lg:mt-[4.1cqw]")}>Year of Establishment</h2>
          <div className="mt-6 flex flex-col-reverse gap-4 border-t border-[#b0abb0] pt-8 lg:mt-[1.85cqw] lg:flex-row lg:items-start lg:justify-between lg:pt-[2.6cqw]">
            <p className="max-w-[12.6em] font-ui text-[max(15px,1.45cqw)] leading-[1.55] text-[#6c6262]">
              The year the founders launched the first project.
            </p>
            <p className="text-[max(52px,5.5cqw)] leading-none font-bold tracking-[-0.04em] text-black">2007</p>
          </div>

          {/* Bottom-right cut-out with the projects link */}
          <div className="absolute right-0 bottom-0 h-[max(62px,6.3cqw)] w-[max(64px,6.4cqw)] rounded-tl-(--cut-r) bg-white">
            <Link
              href="/projects"
              aria-label="View our projects"
              className="group absolute right-0 bottom-0 flex size-[max(48px,5cqw)] items-center justify-center rounded-[max(8px,0.9cqw)] bg-brand text-white transition-colors duration-200 hover:bg-ink"
            >
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="size-[40%] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </Link>
          </div>
          <InverseCorner at="0 0" className="right-0 bottom-[max(62px,6.3cqw)]" />
          <InverseCorner at="0 0" className="right-[max(64px,6.4cqw)] bottom-0" />
        </div>
      </Reveal>
    </section>
  );
}
