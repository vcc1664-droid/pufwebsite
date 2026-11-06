"use client";

import Link from "next/link";
import { useState, type PointerEvent, type ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";

type Factor = {
  title: string;
  body: string;
  href: string;
  icon: ReactNode;
};

const iconProps = {
  "aria-hidden": true,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "h-full w-auto",
} as const;

const FACTORS: Factor[] = [
  {
    title: "Operating requirement",
    body: "Temperature, usage and environmental conditions define the starting point.",
    href: "/products",
    icon: (
      <svg viewBox="0 0 86 64" {...iconProps}>
        <path d="M2 8a5 5 0 0 1 10 0v48a5 5 0 0 0-10 0z" />
        <path d="M7 3h67M7 61h70a3 3 0 0 0 3-3V8M74 3v53M74 3a5 5 0 0 1 10 0v53a5 5 0 0 1-4 2" />
        <path d="M22 14v34h44M22 22h4M22 30h4M22 38h4M30 48v-4M38 48v-4M46 48v-4" />
        <path d="M54 46l10-12v12z" />
      </svg>
    ),
  },
  {
    title: "Panel specification",
    body: "Panel type, thickness and build-up should follow the application.",
    href: "/products",
    icon: (
      <svg viewBox="0 0 80 84" {...iconProps}>
        <path d="M26 12l14-8 14 8v54l-14 8-14-8z" />
        <path d="M26 12l14 8 14-8M40 20v54" />
        <path d="M46 28l3-2M46 36l3-2M46 44l3-2M46 52l3-2M46 60l3-2" />
        <path d="M26 54L4 66l36 16 36-16-22-12" />
      </svg>
    ),
  },
  {
    title: "Facing & surface condition",
    body: "The panel surface should suit the environment it will be exposed to.",
    href: "/products",
    icon: (
      <svg viewBox="0 0 116 58" {...iconProps}>
        <path d="M16 2h84l14 40H2z" />
        <path d="M37 2l-6 40M58 2v40M79 2l6 40M9 22h98" />
        <path d="M12 42v8h92v-8" />
      </svg>
    ),
  },
  {
    title: "Joints & installation",
    body: "Connections, sealing and interfaces affect how the complete enclosure performs.",
    href: "/products",
    icon: (
      <svg viewBox="0 0 80 80" {...iconProps}>
        <path d="M12 14v56M22 14v56M12 20l10 8-10 8 10 8-10 8 10 8-10 8" />
        <path d="M2 14h76l-6-8H22M12 14l6-10h4v10" />
        <path d="M24 14l6-8 6 8 6-8 6 8 6-8 6 8 6-8" />
        <path d="M70 14v20M70 34a3 3 0 1 1-3 3M66 42h8v6h-8z" />
        <path d="M6 70h22M4 76h26" />
      </svg>
    ),
  },
];

/** Largest tilt, in degrees, when the cursor is at a card's edge: left/right (rotateY) and up/down (rotateX). */
const MAX_TILT_Y = 35;
const MAX_TILT_X = 25;
/** Lower is a stronger 3D depth. */
const PERSPECTIVE = "700px";
// The tilt is set inline, so the card's own colour fade (Tailwind's transition-colors) is restated here.
const COLOR_FADE = "color 300ms cubic-bezier(0.4,0,0.2,1), background-color 300ms cubic-bezier(0.4,0,0.2,1)";

/**
 * Tilts the card towards the cursor in 3D. Mouse only, so touch devices keep the plain card.
 * Listens on the card's list item, which never rotates, so a strong tilt can't pull the card's
 * edge out from under the cursor and make it flicker.
 */
function tilt(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const card = event.currentTarget.querySelector("article");
  if (!card) return;
  const rect = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  card.style.transition = `transform 100ms ease-out, ${COLOR_FADE}`;
  card.style.transform = `perspective(${PERSPECTIVE}) rotateX(${-y * 2 * MAX_TILT_X}deg) rotateY(${x * 2 * MAX_TILT_Y}deg)`;
}

/** Eases the card back flat when the cursor leaves. */
function untilt(event: PointerEvent<HTMLElement>) {
  const card = event.currentTarget.querySelector("article");
  if (!card?.style.transform) return;
  card.style.transition = `transform 600ms cubic-bezier(0.22,1,0.36,1), ${COLOR_FADE}`;
  card.style.transform = `perspective(${PERSPECTIVE}) rotateX(0deg) rotateY(0deg)`;
}

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function RequirementFactors() {
  // The highlighted card follows hover/focus; the first one is highlighted by default.
  const [active, setActive] = useState(0);

  return (
    <section className={cn(CONTAINER, SECTION_Y)}>
      <ul className="@container grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[1.13cqw]">
        {FACTORS.map((factor, i) => {
          const isActive = active === i;

          return (
            <li
              key={factor.title}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onPointerMove={tilt}
              onPointerLeave={untilt}
            >
              <Reveal delay={i * 100} className="h-full">
                <article
                  className={cn(
                    // --r: notch corner radius, --btn: arrow button size, --gap: white gap around the button
                    "relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-[max(20px,1.9cqw)] px-6 pt-10 pb-[calc(var(--btn)+var(--gap)+24px)] transition-colors duration-300 [--btn:max(48px,3.9cqw)] [--gap:max(8px,0.7cqw)] [--r:max(12px,1cqw)] lg:min-h-[26.8cqw] lg:px-[1.5cqw] lg:pt-[3.1cqw]",
                    isActive ? "bg-brand text-white" : "bg-[#f4f4f4] text-black",
                  )}
                >
                  <div className="h-14 lg:h-[max(48px,5cqw)]">{factor.icon}</div>

                  <h3 className="mt-8 text-[max(22px,1.63cqw)] leading-tight font-bold tracking-[-0.01em] lg:mt-[3.1cqw]">
                    {factor.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-4 max-w-[22em] font-ui text-[max(15px,1cqw)] leading-normal transition-colors duration-300 lg:mt-[1.6cqw]",
                      isActive ? "text-white" : "text-[#1e1e1e]",
                    )}
                  >
                    {factor.body}
                  </p>

                  {/* White notch cut into the bottom-right corner, with concave corners on both sides */}
                  <div
                    aria-hidden
                    className="absolute right-0 bottom-0 size-[calc(var(--btn)+var(--gap))] rounded-tl-[var(--r)] bg-white before:absolute before:right-0 before:bottom-full before:size-[var(--r)] before:bg-[radial-gradient(circle_at_0_0,transparent_var(--r),white_calc(var(--r)+0.5px))] after:absolute after:right-full after:bottom-0 after:size-[var(--r)] after:bg-[radial-gradient(circle_at_0_0,transparent_var(--r),white_calc(var(--r)+0.5px))]"
                  />

                  <Link
                    href={factor.href}
                    aria-label={`Learn more: ${factor.title}`}
                    className={cn(
                      "group absolute right-0 bottom-0 grid size-[var(--btn)] place-items-center rounded-[max(8px,0.6cqw)] text-white transition-colors duration-300",
                      isActive ? "bg-black" : "bg-brand hover:bg-black",
                    )}
                  >
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      className="size-[max(14px,0.9cqw)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </Link>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
