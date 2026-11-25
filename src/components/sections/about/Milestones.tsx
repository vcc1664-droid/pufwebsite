import { Reveal } from "@/components/motion/Reveal";
import { BLOCK_GAP, CONTAINER, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";

type Milestone = { year: string; title: string };

// In order along the timeline; cards alternate above and below the line, starting above.
const MILESTONES: Milestone[] = [
  { year: "1987", title: "Group founded" },
  { year: "2018", title: "PUF Plant Commissioned" },
  { year: "2022", title: "Capacity Expanded" },
  { year: "2024", title: "First Certification" },
  { year: "2025", title: "Project Milestone" },
];

/** Darker purple for milestones above the line, lighter for those below, as in the design. */
const DARK = "#561A61";
const LIGHT = "#843894";

function Card({ milestone, tone }: { milestone: Milestone; tone: string }) {
  return (
    <div
      className="rounded-[4px] border bg-white px-[max(14px,1.4cqw)] py-[max(10px,0.9cqw)] text-center"
      style={{ borderColor: `${tone}99` }}
    >
      <p className="font-ui text-[22px] leading-tight font-bold text-black lg:text-[max(18px,1.6cqw)]">
        {milestone.year}
      </p>
      <p className="mt-1 font-ui text-[13px] leading-snug whitespace-nowrap lg:text-[max(12px,0.95cqw)]" style={{ color: tone }}>
        {milestone.title}
      </p>
    </div>
  );
}

/** Line with a dot at its far end, joining a card to its marker on the timeline. */
function Stem({ tone, dotAt }: { tone: string; dotAt: "top" | "bottom" }) {
  return (
    <div className={cn("flex flex-col items-center", dotAt === "bottom" && "flex-col-reverse")}>
      <span className="size-[max(8px,0.7cqw)] rounded-full" style={{ backgroundColor: tone }} />
      <span className="h-[max(48px,5.6cqw)] w-[2px]" style={{ backgroundColor: tone }} />
    </div>
  );
}

/* Sizes (lg+) are cqw of the content width, measured from the design. */
export function Milestones() {
  return (
    <section className={cn(CONTAINER, SECTION_Y)}>
      <div className="@container">
        <Reveal className="text-center">
          <h2 className="font-sans text-[26px] leading-[1.3] font-normal tracking-normal text-[#171717] lg:text-[50.1815px] lg:leading-[65.2359px]">
            The Milestones Behind our Growth
          </h2>
          <p className="mt-2 font-ui text-[15.5324px] leading-[23.2985px] font-normal tracking-normal text-[#909090] lg:mt-[0.8cqw]">
            Timeline structure. Years and events to confirm.
          </p>
        </Reveal>

        {/* Desktop: horizontal timeline, cards alternating above and below, moving endlessly from
            right to left (hovering pauses it). One loop is the list twice (10 steps) so above/below
            keeps alternating across the seam; the loop is then doubled for a gapless marquee. Only
            the first five are read out by screen readers. */}
        <Reveal delay={100} className={cn(BLOCK_GAP, "group hidden overflow-hidden lg:block")}>
          <ol className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:overflow-x-auto">
            {[...MILESTONES, ...MILESTONES, ...MILESTONES, ...MILESTONES].map((milestone, i) => {
              const above = i % 2 === 0;
              const tone = above ? DARK : LIGHT;
              return (
                <li
                  key={`${i}-${milestone.year}`}
                  aria-hidden={i >= MILESTONES.length || undefined}
                  className="grid w-[20cqw] shrink-0 grid-rows-[1fr_auto_1fr] justify-items-center"
                >
                  {/* Top half: card and stem for milestones above the line */}
                  <div className="flex flex-col items-center justify-end">
                    {above && (
                      <>
                        <Card milestone={milestone} tone={tone} />
                        <div className="mt-[max(10px,1cqw)]">
                          <Stem tone={tone} dotAt="top" />
                        </div>
                      </>
                    )}
                  </div>

                  {/* The line: grey segments either side of this milestone's marker */}
                  <div className="flex w-full items-center gap-[max(10px,1.5cqw)]">
                    <span className="h-[4px] flex-1 bg-[#d9d9d9]" />
                    <span
                      className="h-[max(12px,1.35cqw)] w-[max(30px,3.6cqw)] rounded-full"
                      style={{ backgroundColor: tone }}
                    />
                    <span className="h-[4px] flex-1 bg-[#d9d9d9]" />
                  </div>

                  {/* Bottom half: stem and card for milestones below the line */}
                  <div className="flex flex-col items-center justify-start">
                    {!above && (
                      <>
                        <Stem tone={tone} dotAt="bottom" />
                        <div className="mt-[max(10px,1cqw)]">
                          <Card milestone={milestone} tone={tone} />
                        </div>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </Reveal>

        {/* Mobile and tablet: the same timeline, running top to bottom */}
        <Reveal delay={100} className={cn(BLOCK_GAP, "lg:hidden")}>
          <ol className="relative mx-auto max-w-sm space-y-6 pl-10">
            <span aria-hidden className="absolute top-2 bottom-2 left-[13px] w-[4px] bg-[#d9d9d9]" />
            {MILESTONES.map((milestone, i) => {
              const tone = i % 2 === 0 ? DARK : LIGHT;
              return (
                <li key={milestone.year} className="relative">
                  <span
                    aria-hidden
                    className="absolute top-1/2 -left-10 h-[28px] w-[12px] -translate-y-1/2 translate-x-[9px] rounded-full"
                    style={{ backgroundColor: tone }}
                  />
                  <Card milestone={milestone} tone={tone} />
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
