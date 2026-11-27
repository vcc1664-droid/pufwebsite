import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, RULE_GAP, SECTION_BOTTOM } from "@/constants/layout";
import { QUOTE_CTA } from "@/constants/navigation";
import { cn } from "@/lib/utils";

type PageIntroProps = {
  title: ReactNode;
  /** Copy under the divider; some pages end the intro at the divider. */
  body?: ReactNode;
  /** Short label shown left of the body copy, under the divider. */
  aside?: ReactNode;
  tone?: "light" | "dark";
  /** Left offset of the body copy on desktop when there is no aside. */
  bodyOffsetClassName?: string;
  /** Desktop width of the aside column, which sets where the body copy starts. */
  asideClassName?: string;
  /** Replaces the H1's default size and weight classes (colour still follows `tone`). */
  titleClassName?: string;
};

/** Opening block shared by inner pages: H1 + quote button, divider, then copy offset to the right. */
/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function PageIntro({
  title,
  body,
  aside,
  tone = "light",
  bodyOffsetClassName = "lg:ml-[46.4%]",
  asideClassName = "lg:w-[46.4%]",
  titleClassName = "text-[max(30px,3.6cqw)] leading-[1.2] font-normal tracking-[-0.02em]",
}: PageIntroProps) {
  const dark = tone === "dark";

  return (
    <section className={cn(CONTAINER, "pt-12 lg:pt-16", SECTION_BOTTOM)}>
      <div className="@container">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h1
            className={cn(
              "max-w-[12em]",
              titleClassName,
              dark ? "text-white" : "text-black",
            )}
          >
            {title}
          </h1>
          <Link
            href={QUOTE_CTA.href}
            className={cn(
              "group relative isolate inline-flex shrink-0 items-center gap-[0.4em] self-start overflow-hidden rounded-[max(5px,0.5cqw)] border px-[1.1em] py-[0.75em] font-ui text-[max(13px,1.05cqw)] leading-none transition-colors duration-300 sm:self-auto",
              // Hover fill sweeps in from the left
              "before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:transition-transform before:duration-300 before:ease-out before:content-[''] hover:before:scale-x-100",
              dark
                ? "border-white text-white before:bg-white hover:text-black"
                : "border-black text-black before:bg-black hover:text-white",
            )}
          >
            Get a Quote
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="size-[0.9em] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </Link>
        </Reveal>

        <hr className={cn(RULE_GAP, dark ? "border-[#5c5c5c]" : "border-[#bdbdbd]")} />

        {body && (
          <Reveal delay={100} className={cn(RULE_GAP, "flex flex-col gap-6 lg:flex-row lg:gap-0")}>
            {aside && (
              <p
                className={cn(
                  "flex items-center gap-[0.5em] font-ui text-[max(14px,1.35cqw)] lg:self-start lg:pt-[0.35em]",
                  asideClassName,
                  dark ? "text-white" : "text-black",
                )}
              >
                <span aria-hidden className="size-[0.4em] shrink-0 bg-current" />
                {aside}
              </p>
            )}
            <p
              className={cn(
                "font-ui text-[15.5324px] leading-[23.2985px] font-normal tracking-normal lg:flex-1",
                !aside && bodyOffsetClassName,
                dark ? "text-[#8a8a8a]" : "text-[#7a7a7a]",
              )}
            >
              {body}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
