import { Reveal } from "@/components/motion/Reveal";
import { BLOCK_GAP, CONTAINER, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";

type Milestone = { year: string; title: string };

// Years are still to be confirmed.
const MILESTONES: Milestone[] = [
  { year: "Year of confirm", title: "Capacity expanded" },
  { year: "Year of confirm", title: "Project Milestone" },
  { year: "Year of confirm", title: "Group founded" },
  { year: "Year of confirm", title: "First certification" },
  { year: "Year of confirm", title: "PUF plant commissioned" },
];

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function Milestones() {
  return (
    <section className={cn(CONTAINER, SECTION_Y)}>
      <div className="@container">
        <Reveal className="text-center">
          <h2 className="text-[max(26px,2.95cqw)] leading-tight font-medium tracking-[-0.02em] text-black">
            The milestones behind our growth
          </h2>
          <p className="mt-2 font-ui text-[max(14px,1.4cqw)] text-[#909090] lg:mt-[0.8cqw]">
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
                  className="mr-[max(16px,1.6cqw)] shrink-0 rounded-[max(10px,1cqw)] bg-white px-[max(20px,2.2cqw)] py-[max(14px,1.6cqw)] text-center shadow-[0_6px_24px_rgba(98,28,112,0.12)]"
                >
                  <p className="font-ui text-[max(11px,0.8cqw)] text-black">{milestone.year}</p>
                  <p className="mt-1 font-ui text-[max(14px,1.3cqw)] whitespace-nowrap text-brand">
                    {milestone.title}
                  </p>
                </li>
              )),
            )}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
