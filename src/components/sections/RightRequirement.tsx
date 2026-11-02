import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER } from "@/constants/layout";
import { cn } from "@/lib/utils";

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function RightRequirement() {
  return (
    <section className={cn(CONTAINER, "py-16 lg:py-24")}>
      <div className="@container flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
        <Reveal className="relative aspect-[820/293] overflow-hidden rounded-[max(12px,1.1cqw)] max-lg:aspect-video lg:w-[50.5%]">
          <Image
            src="/Home/C0049T01.JPG"
            alt="PUF panels on the production line in the Synergy PUF manufacturing facility"
            fill
            sizes="(min-width: 1024px) 51vw, 100vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={100} className="lg:w-[44.5%]">
          <h2 className="text-[max(28px,3.45cqw)] leading-[1.27] font-medium tracking-[-0.02em] text-black">
            The right panel starts with the right requirement.
          </h2>
          <p className="mt-5 font-ui text-[max(15px,1.05cqw)] leading-[1.7] text-[#909090] lg:mt-[1.6cqw]">
            A cold room, industrial roof and controlled environment may all use insulated panels, but
            they do not need the same specification. The right solution depends on how the space is
            expected to perform.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
