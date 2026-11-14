import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";
import requirementImage from "../../../public/Home/checking-100kb.jpeg";

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function RightRequirement() {
  return (
    <section className={cn(CONTAINER, SECTION_Y)}>
      <div className="@container flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
        <Reveal className="relative aspect-[820/293] overflow-hidden rounded-[max(12px,1.1cqw)] max-lg:aspect-video lg:w-[50.5%]">
          <Image
            src={requirementImage}
            alt="Stacks of insulated PUF panels inside the Synergy PUF facility"
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 51vw, 100vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={100} className="lg:w-[44.5%]">
          <h2 className="font-sans text-[28px] leading-[1] font-medium tracking-[-1.29024px] text-[#000000] lg:text-[50.1815px] lg:leading-[50.1815px]">
            The Right Panel Starts With the Right Requirement.
          </h2>
          <p className="mt-5 font-ui text-[15.5324px] leading-[23.2985px] font-normal tracking-normal text-[#696969] lg:mt-[1.6cqw]">
            A cold room, industrial roof and controlled environment may all use insulated panels, but they do
            not need the same specification. The right solution depends on how the space is expected to
            perform.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
