"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";
import coldRoomImage from "../../../public/Home/FACILITYTYPES/Chilled Freezer Warehouse Aisle.png";
import roofingImage from "../../../public/Home/Aerial View of Industrial Warehouse and Fields-150kb.jpeg";
import modularImage from "../../../public/Home/modular_environment_hero.webp";
import dataCentreImage from "../../../public/Home/Different/Data Center-100kb.jpeg";
import pharmaImage from "../../../public/Home/Different/Pharma-100kb.jpeg";
import infrastructureImage from "../../../public/Home/Different/Infrastructure-100kb.jpeg";

const SPACES: { title: string; body: string; image: StaticImageData; alt: string }[] = [
  {
    title: "Temperature-Controlled Spaces",
    body: "For cold rooms, freezer areas and temperature-sensitive facilities.",
    image: coldRoomImage,
    alt: "Cold storage warehouse aisle lined with insulated PUF panels",
  },
  {
    title: "Industrial Roofing & Cladding",
    body: "For factories, warehouses and industrial buildings.",
    image: roofingImage,
    alt: "Industrial building roofed and clad with insulated panels",
  },
  {
    // "\n" sets the line break: this title always shows on two lines
    title: "Controlled & Modular\nEnvironments",
    body: "For specialised enclosed spaces built with insulated panel systems.",
    image: modularImage,
    alt: "Modular enclosure built from insulated panel systems",
  },
  {
    title: "Data Centres",
    body: "For data halls and equipment rooms that need a sealed, thermally stable enclosure.",
    image: dataCentreImage,
    alt: "Data centre hall with server racks inside an insulated enclosure",
  },
  {
    title: "Healthcare & Pharmaceuticals",
    body: "For pharma plants, cleanrooms and medical storage that need hygienic, easy-to-clean enclosures.",
    image: pharmaImage,
    alt: "Pharmaceutical cleanroom built with hygienic insulated panels",
  },
  {
    title: "Infrastructure & Utilities",
    body: "For utility, transport and public infrastructure buildings made with insulated panel systems.",
    image: infrastructureImage,
    alt: "Infrastructure building made with insulated panel systems",
  },
];

/** Space between the header and the photo while the section is pinned. */
const PHOTO_GAP = 32;

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function Applications() {
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const pinned = useRef<HTMLDivElement>(null);

  // The block pins with the photo fully in view just under the header; scrolling through the
  // pinned stretch steps through the spaces.
  useEffect(() => {
    const trackEl = track.current;
    const pinEl = pinned.current;
    if (!trackEl || !pinEl) return;
    const header = document.querySelector("header");
    let frame = 0;

    const update = () => {
      frame = 0;
      // Pin so the photo's top edge sits PHOTO_GAP below the header
      const photo = pinEl.querySelector<HTMLElement>("[data-photo]");
      const photoOffset = photo ? photo.getBoundingClientRect().top - pinEl.getBoundingClientRect().top : 0;
      const top = (header?.offsetHeight ?? 0) + PHOTO_GAP - photoOffset;
      pinEl.style.top = `${top}px`;
      const travel = trackEl.offsetHeight - pinEl.offsetHeight;
      const scrolled = top - trackEl.getBoundingClientRect().top;
      const progress = travel > 0 ? Math.min(1, Math.max(0, scrolled / travel)) : 0;
      setActive(Math.min(SPACES.length - 1, Math.floor(progress * SPACES.length)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    const observer = new ResizeObserver(onScroll);
    observer.observe(pinEl);
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
    <section className="rounded-t-[max(28px,5.5vw)] bg-black text-white">
      <div ref={track}>
        <div ref={pinned} className="sticky">
          {/* Black band is full-bleed; content sits in the shared gutter (logo → Start Your Quote). */}
          <div className={CONTAINER}>
            <div className={cn("@container", SECTION_Y)}>
              <Reveal>
                {/* Two lines on desktop: one sentence per line */}
                <h2 className="max-w-[10em] text-[max(26px,4.2cqw)] leading-[1.3] font-medium tracking-[-0.01em] lg:max-w-none">
                  <span className="lg:block lg:whitespace-nowrap">Different spaces.</span>{" "}
                  <span className="lg:block lg:whitespace-nowrap">Different insulation demands.</span>
                </h2>
              </Reveal>

              <Reveal delay={100} className="relative mt-10 lg:mt-[5.9cqw] lg:ml-[15.9cqw] lg:w-[77.3cqw]">
                <div
                  data-photo
                  className="relative aspect-[537/277] overflow-hidden rounded-[max(12px,2cqw)]"
                >
                  {SPACES.map((s, i) => (
                    <Image
                      key={s.title}
                      src={s.image}
                      alt={s.alt}
                      fill
                      placeholder="blur"
                      sizes="(min-width: 1024px) 78vw, 100vw"
                      aria-hidden={active !== i}
                      className={cn(
                        "object-cover transition-opacity duration-500",
                        active === i ? "opacity-100" : "opacity-0",
                      )}
                    />
                  ))}
                </div>
                <span
                  key={active}
                  aria-hidden
                  data-space-number
                  className="absolute -right-2 -bottom-[0.18em] animate-rise text-[max(72px,20.5cqw)] leading-none font-medium tracking-[-0.04em] lg:-right-[6.8cqw] lg:-bottom-[0.45em]"
                >
                  {String(active + 1).padStart(2, "0")}
                </span>
              </Reveal>

              <Reveal delay={150} className="mt-12 lg:mt-[3.4cqw]">
                {/* All three sit in one cell so the block keeps the tallest height and never jumps */}
                <div aria-live="polite" className="grid">
                  {SPACES.map((s, i) => (
                    <div
                      key={s.title}
                      aria-hidden={active !== i}
                      className={cn("col-start-1 row-start-1", active === i ? "animate-rise" : "invisible")}
                    >
                      <h3 className="max-w-[9em] text-[max(24px,4.2cqw)] leading-[1.3] font-medium tracking-[-0.01em]">
                        {s.title.includes("\n")
                          ? s.title.split("\n").map((line) => (
                              <span key={line} className="block whitespace-nowrap">
                                {line}
                              </span>
                            ))
                          : s.title}
                      </h3>
                      <p className="mt-3 font-ui text-[max(14px,1.36cqw)] leading-snug text-[#555050] lg:mt-[1.6cqw]">
                        {s.body}
                      </p>
                    </div>
                  ))}
                </div>
                <Link
                  href="/applications"
                  className="group mt-6 inline-flex items-center gap-[0.5em] rounded-[max(5px,0.45cqw)] bg-white px-[1.2em] py-[0.7em] font-ui text-[max(12px,1.25cqw)] leading-none text-black transition-colors duration-200 hover:bg-[#e6e6e6] lg:mt-[2cqw]"
                >
                  Explore application
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="size-[1em] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
            </div>
          </div>
        </div>
        {/* Scroll room while the block is pinned: one stretch per extra space */}
        <div aria-hidden className="h-[300svh]" />
      </div>
    </section>
  );
}
