import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, RULE_GAP, SECTION_Y } from "@/constants/layout";
import { QUOTE_CTA } from "@/constants/navigation";
import { cn } from "@/lib/utils";

// TODO: point at the brochure PDF once it is added to /public.
const BROCHURE_HREF = "#";

const button =
  "relative isolate inline-flex items-center justify-center overflow-hidden rounded-[max(6px,0.5cqw)] px-[max(20px,2.1cqw)] py-[max(12px,1.05cqw)] font-ui text-[max(14px,0.95cqw)] leading-none transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:transition-transform before:duration-300 before:ease-out before:content-[''] hover:before:scale-x-100";

type LetsTalkProps = {
  title?: string;
  body?: string;
  /** Max width of the body copy, so it breaks where the design does. */
  bodyClassName?: string;
  /** Heading weight; designs vary between light and regular. */
  titleClassName?: string;
};

/** Purple closing CTA band shared by inner pages. */
/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function LetsTalk({
  title = "Let’s Talk",
  body = "Discuss your requirements with our engineering and sales team.",
  bodyClassName = "max-w-[14.7em]",
  titleClassName = "font-light",
}: LetsTalkProps) {
  return (
    <section className="bg-brand text-white">
      {/* Purple band is full-bleed; content sits in the shared gutter (logo → Start Your Quote). */}
      <div className={CONTAINER}>
        <div className={cn("@container", SECTION_Y)}>
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <h2 className={cn("font-sans text-[32px] leading-[1] font-normal tracking-[-1.29024px] lg:text-[50.1815px] lg:leading-[50.1815px]", titleClassName)}>
              {title}
            </h2>
            <div className="flex flex-wrap gap-3 lg:gap-[1.4cqw]">
              <Link href={QUOTE_CTA.href} className={cn(button, "bg-white text-black before:bg-black hover:text-white")}>
                Get a Quote
              </Link>
              <a
                href={BROCHURE_HREF}
                className={cn(button, "border border-white text-white before:bg-white hover:text-brand")}
              >
                Download Brochure
              </a>
            </div>
          </Reveal>

          <hr className={cn(RULE_GAP, "border-white/70")} />

          <Reveal delay={100} className={RULE_GAP}>
            <p className={cn("font-ui text-[15.5324px] leading-[23.2985px] font-normal tracking-normal", bodyClassName)}>{body}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
