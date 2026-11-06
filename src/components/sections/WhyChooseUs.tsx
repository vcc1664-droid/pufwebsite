"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";
import truckImage from "../../../public/Home/e9e3d87b-f844-43f4-9a2d-5898277b404b-80kb.jpeg";
import factoryImage from "../../../public/Home/WHYCHOOSE/fd3ce45c-e3d8-43b8-abab-692b6f22bdd5 1-100kb.jpeg";
import isoImage from "../../../public/Home/ISOcertified/Group 2085662833-100kb.jpeg";
import installImage from "../../../public/about/Webbb-100kb.jpeg";

const REASONS: { title: string; body: string; image: StaticImageData; alt: string }[] = [
  {
    title: "ISO certified",
    body: "Our management systems are ISO certified, with certificates available on request.",
    image: isoImage,
    alt: "Synergy PUF insulated panel manufacturing facility",
  },
  {
    title: "Made at our own facility",
    body: "Insulated panels are manufactured at our Nalagarh facility, so production stays in our hands.",
    image: factoryImage,
    alt: "Stacks of finished insulated panels in the Synergy PUF facility yard",
  },
  {
    title: "One team, factory to site",
    body: "We manufacture, dispatch and install insulated panel systems, so one team stays accountable.",
    image: installImage,
    alt: "Insulated panels being installed on site",
  },
  {
    title: "Delivery you can plan around",
    body: "Production and dispatch are planned together. Share your site timeline and we’ll confirm dates.",
    image: truckImage,
    alt: "Synergy PUF delivery truck outside the panel warehouse",
  },
];

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function WhyChooseUs() {
  // Which reason is highlighted on the left and pictured on the right
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);

  // On desktop the section pins in place; how far the page has scrolled through the pinned
  // stretch decides which reason is active.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const desktop = window.matchMedia("(min-width: 64rem)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!desktop.matches) return;
      const pinned = el.firstElementChild as HTMLElement;
      // Distance the page scrolls while the block stays pinned
      const travel = el.offsetHeight - pinned.offsetHeight;
      const headerHeight = document.querySelector("header")?.offsetHeight ?? 0;
      const scrolled = headerHeight - el.getBoundingClientRect().top;
      const progress = travel > 0 ? Math.min(1, Math.max(0, scrolled / travel)) : 0;
      setActive(Math.min(REASONS.length - 1, Math.floor(progress * REASONS.length)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    desktop.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      desktop.removeEventListener("change", update);
    };
  }, []);

  return (
    <section className={cn(CONTAINER, SECTION_Y)}>
      {/* Tall track on desktop: the inner block sticks under the header while the page scrolls
          through it, one stretch per reason */}
      <div ref={track} className="lg:h-[calc(100svh-114px+200svh)]">
        <div className="lg:sticky lg:top-[114px] lg:flex lg:h-[calc(100svh-114px)] lg:items-center">
          <div className="@container flex w-full flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
            <div className="lg:w-[39.2%]">
              <Reveal>
                <h2 className="text-[max(26px,3.5cqw)] leading-none tracking-[-0.02em] text-black uppercase">
                  Why Choose Us?
                </h2>
              </Reveal>

              <ul className="mt-8 lg:mt-[3.6cqw]">
                {REASONS.map((reason, i) => (
                  <li
                    key={reason.title}
                    className={cn(
                      "border-b border-[#616161] py-6 last:border-b-0 transition-opacity duration-500 first:pt-0 lg:pt-[3.3cqw] lg:pb-[2.2cqw] lg:first:pt-0",
                      // The reason whose photo is showing stays full strength; the others fade back
                      active !== i && "lg:opacity-35",
                    )}
                  >
                    <Reveal delay={100 + i * 100}>
                      <h3 className="font-ui text-[max(17px,1.5cqw)] leading-tight font-medium text-black">
                        {reason.title}
                      </h3>
                      <p className="mt-3 font-ui text-[max(14px,1.16cqw)] leading-[1.58] text-[#909090] lg:mt-[1.4cqw]">
                        {reason.body}
                      </p>
                      {/* Below lg there is no side column, so each reason carries its own photo */}
                      <Image
                        src={reason.image}
                        alt={reason.alt}
                        placeholder="blur"
                        sizes="100vw"
                        className="mt-5 h-auto w-full rounded-[16px] lg:hidden"
                      />
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>

            {/* Photo for the active reason; same frame size as before, capped to fit the pinned screen */}
            <Reveal delay={150} className="hidden lg:block lg:w-[54%]">
              <div className="relative h-[min(59.4cqw,calc(100svh-114px-48px))] overflow-hidden rounded-[max(16px,1.8cqw)]">
                {REASONS.map((reason, i) => (
                  <Image
                    key={reason.title}
                    src={reason.image}
                    alt={reason.alt}
                    fill
                    placeholder="blur"
                    sizes="54vw"
                    aria-hidden={active !== i}
                    className={cn(
                      "object-cover transition-opacity duration-500",
                      active === i ? "opacity-100" : "opacity-0",
                    )}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
