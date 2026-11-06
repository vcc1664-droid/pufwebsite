import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, SECTION_BOTTOM } from "@/constants/layout";
import { cn } from "@/lib/utils";

export type LegalSection = { title: string; body: ReactNode };

/** Numbered legal sections: heading on the left, copy on the right (stacked below lg). */
/* Column split matches PageIntro's aside/body so the copy lines up with the intro text. */
export function LegalSections({ sections }: { sections: LegalSection[] }) {
  return (
    <section className={cn(CONTAINER, SECTION_BOTTOM)}>
      <div className="@container">
        {sections.map((section, i) => (
          <Reveal
            key={section.title}
            className="flex flex-col gap-4 border-b border-[#dcdcdc] py-8 first:pt-0 lg:flex-row lg:gap-0 lg:py-[2.6cqw] lg:first:pt-0"
          >
            <h2 className="flex gap-[0.6em] text-[max(19px,1.75cqw)] leading-[1.3] font-medium tracking-[-0.01em] text-black lg:w-[46.4%] lg:pr-[4cqw]">
              <span className="text-[#9a9a9a]">{String(i + 1).padStart(2, "0")}</span>
              {section.title}
            </h2>
            <div className="flex flex-col gap-4 font-ui text-[max(15px,1.2cqw)] leading-[1.7] text-[#5c5c5c] lg:flex-1 [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2 [&_li]:ml-5 [&_li]:list-disc [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2">
              {section.body}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
