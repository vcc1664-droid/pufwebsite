"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";

type Stage = { name: string; title: string; body: string };

// Stages along the Nalagarh line, in order. Add each stage's photo in place of the empty box.
const STAGES: Stage[] = [
  { name: "Coil", title: "Steel coil.", body: "The coil is loaded on the uncoiler at the start of the line." },
  { name: "Forming", title: "Forming.", body: "Rollers shape the flat steel sheet into the panel profile." },
  { name: "Foam", title: "Foam.", body: "Foam is dispensed onto the steel sheet and becomes the insulation core." },
  { name: "Cutting", title: "Cutting.", body: "The finished panel is cut to length on a band saw." },
  { name: "Lab", title: "Lab.", body: "Test equipment at the plant." },
  { name: "Dispatch", title: "Dispatch.", body: "Panels are stacked at the loading point, ready for the truck." },
];

/* Sizes (lg+) are cqw of the content width, measured from the design. */
export function WherePanelsAreMade() {
  const track = useRef<HTMLDivElement>(null);
  const pinned = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);

  // The block pins under the header while the page scrolls; that vertical scroll slides the
  // stage cards from right to left, one pixel across per pixel down.
  useEffect(() => {
    const trackEl = track.current;
    const pinEl = pinned.current;
    const viewEl = viewport.current;
    const listEl = list.current;
    if (!trackEl || !pinEl || !viewEl || !listEl) return;
    const header = document.querySelector("header");
    let frame = 0;

    const update = () => {
      frame = 0;
      const distance = Math.max(0, listEl.scrollWidth - viewEl.clientWidth);
      trackEl.style.height = `${pinEl.offsetHeight + distance}px`;

      // Content just under the header, or bottom-aligned when the block is taller than the screen
      const content = pinEl.firstElementChild as HTMLElement;
      const { paddingTop, paddingBottom } = getComputedStyle(content);
      const top = Math.min(
        (header?.offsetHeight ?? 0) - parseFloat(paddingTop),
        window.innerHeight - pinEl.offsetHeight + parseFloat(paddingBottom),
      );
      pinEl.style.top = `${top}px`;

      const scrolled = top - trackEl.getBoundingClientRect().top;
      const progress = distance > 0 ? Math.min(1, Math.max(0, scrolled / distance)) : 0;
      listEl.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    const observer = new ResizeObserver(onScroll);
    observer.observe(pinEl);
    observer.observe(listEl);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section aria-labelledby="where-panels-made">
      {/* Tall track: its extra height is the scroll room for the sideways slide */}
      <div ref={track}>
        <div ref={pinned} className="sticky bg-white">
          <div className={cn(CONTAINER, SECTION_Y)}>
            <div className="@container">
              <Reveal>
                <h2
                  id="where-panels-made"
                  className="text-[max(26px,2.4cqw)] leading-tight font-bold tracking-[-0.01em] text-[#14213d]"
                >
                  Where your panels are made
                </h2>
                <p className="mt-3 max-w-[46em] font-ui text-[max(16px,1.3cqw)] leading-[1.6] text-[#575657] lg:mt-[1cqw]">
                  Every panel is made at our own plant in Nalagarh, Himachal Pradesh. Follow the line,
                  one stage at a time.
                </p>
              </Reveal>

              {/* Cards are clipped at the content edges; the next one peeks in from the right */}
              <Reveal delay={100} className="mt-6 lg:mt-[2cqw]">
                <div ref={viewport} className="overflow-hidden">
                  <ol
                    ref={list}
                    aria-label="Production stages"
                    className="flex gap-4 will-change-transform lg:gap-[1.6cqw]"
                  >
                    {STAGES.map((stage, i) => (
                      <li
                        key={stage.name}
                        className="w-[82%] shrink-0 rounded-[max(12px,0.8cqw)] border border-[#dad8cf] bg-[#faf9f6] p-3 sm:w-[60%] lg:w-[40%] lg:p-[0.8cqw]"
                      >
                        <span className="inline-block rounded-full bg-[#14213d] px-[0.8em] py-[0.3em] font-ui text-[max(13px,0.95cqw)] leading-none font-bold text-white">
                          {i + 1} {stage.name}
                        </span>
                        {/* Stage photo goes here once supplied */}
                        <div
                          aria-hidden
                          className="mt-3 aspect-[591/277] rounded-[max(8px,0.5cqw)] border border-[#e6e3dc] bg-[#f1efea] lg:mt-[0.8cqw]"
                        />
                        <p className="mt-3 font-ui text-[max(15px,1.15cqw)] leading-[1.6] text-[#3e3e3e] lg:mt-[0.8cqw]">
                          <strong className="font-bold text-black">{stage.title}</strong> {stage.body}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
