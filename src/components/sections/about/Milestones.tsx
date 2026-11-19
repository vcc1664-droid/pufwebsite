import { Reveal } from "@/components/motion/Reveal";
import { BLOCK_GAP, CONTAINER, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";

type Milestone = { year: string; title: string };

// Years are still to be confirmed.
const MILESTONES: Milestone[] = [
  { year: "2022", title: "Capacity expanded" },
  { year: "2025", title: "Project Milestone" },
  { year: "1987", title: "Group founded" },
  { year: "2024", title: "First certification" },
  { year: "2018", title: "PUF plant commissioned" },
];

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
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

        {/* Cards scroll endlessly from right to left; hovering pauses them */}
        <Reveal delay={100} className={cn(BLOCK_GAP, "group overflow-hidden")}>
          <ul className="flex w-max animate-marquee py-6 group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:overflow-x-auto">
            {/* Two copies so the loop has no gap; the second is hidden from screen readers */}
            {[0, 1].map((copy) =>
              MILESTONES.map((milestone) => (
                <li
                  key={`${copy}-${milestone.title}`}
                  aria-hidden={copy === 1 || undefined}
                  // Grey tile: title top-right, year bottom-left (font sizes unchanged)
                  className="mr-[max(16px,1.6cqw)] flex aspect-[9/10] w-[max(150px,13cqw)] shrink-0 flex-col justify-between rounded-[max(10px,1cqw)] bg-[#e8e8e8] p-[max(14px,1.4cqw)]"
                >
                  <p className="text-right font-ui text-[max(14px,1.3cqw)] leading-snug text-brand">
                    {milestone.title}
                  </p>
                  <p className="font-ui text-[max(11px,0.8cqw)] text-black">{milestone.year}</p>
                </li>
              )),
            )}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
