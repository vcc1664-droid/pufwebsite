import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER } from "@/constants/layout";
import { QUOTE_CTA } from "@/constants/navigation";
import { cn } from "@/lib/utils";

// TODO: point at the brochure PDF once it is added to /public.
const BROCHURE_HREF = "#";

const button =
  "inline-flex items-center justify-center rounded-[max(6px,0.5cqw)] px-[max(20px,2.1cqw)] py-[max(12px,1.05cqw)] font-ui text-[max(14px,0.95cqw)] leading-none transition-colors duration-200";

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
        <div className="@container py-14 lg:pt-[5.3cqw] lg:pb-[4.7cqw]">
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <h2 className={cn("text-[max(44px,5cqw)] leading-none tracking-[-0.02em]", titleClassName)}>
              {title}
            </h2>
            <div className="flex flex-wrap gap-3 lg:gap-[1.4cqw]">
              <Link href={QUOTE_CTA.href} className={cn(button, "bg-white text-black hover:bg-[#e6e6e6]")}>
                Get a Quote
              </Link>
              <a
                href={BROCHURE_HREF}
                className={cn(button, "border border-white text-white hover:bg-white hover:text-brand")}
              >
                Download Brochure
              </a>
            </div>
          </Reveal>

          <hr className="mt-8 border-white/70 lg:mt-[3.4cqw]" />

          <Reveal delay={100} className="mt-8 lg:mt-[3.4cqw]">
            <p className={cn("font-ui text-[max(17px,1.4cqw)] leading-normal", bodyClassName)}>{body}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
