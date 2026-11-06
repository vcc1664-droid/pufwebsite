"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { BLOCK_GAP, CONTAINER, RULE_GAP, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";
import agricultureImage from "../../../../public/Applications/Servicestailored/Agriculture.jpg";
import coldChainImage from "../../../../public/Applications/Servicestailored/cold-chain-food-processing.jpg";
import dataImage from "../../../../public/Applications/Servicestailored/data-technology.jpg";
import healthcareImage from "../../../../public/Applications/Servicestailored/healthcare-pharmaceuticals.jpg";
import hospitalityImage from "../../../../public/Applications/Servicestailored/Hospitality.jpg";
import industrialImage from "../../../../public/Applications/Servicestailored/industrial-manufacturing.jpg";
import infrastructureImage from "../../../../public/Applications/Servicestailored/infrastructure-utilities.jpg";
import logisticsImage from "../../../../public/Applications/Servicestailored/logistics-warehousing.jpg";
import retailImage from "../../../../public/Applications/Servicestailored/Mall-100kb.jpeg";

type Sector = { name: string; body: string; image: StaticImageData; alt: string };

// Only the cold-chain copy comes from the design; the other descriptions are drafts to confirm.
const SECTORS: Sector[] = [
  {
    name: "Cold Chain & Food Processing",
    body: "Strict temperature preservation down to -35°C for blast freezers, dairy processing, and perishable food logistics compliant with food-safety norms.",
    image: coldChainImage,
    alt: "Cold storage warehouse aisle with tall racking",
  },
  {
    name: "Healthcare & Pharmaceuticals",
    body: "Hygienic, easy-to-clean enclosures for pharma plants, cleanrooms and medical storage that need stable, controlled conditions.",
    image: healthcareImage,
    alt: "Pharmaceutical facility with insulated cleanroom panels",
  },
  {
    name: "Industrial & Manufacturing",
    body: "Insulated roofing, walls and partitions for factories and process plants, built for heavy use and steady working temperatures.",
    image: industrialImage,
    alt: "Manufacturing plant interior with insulated panels",
  },
  {
    name: "Logistics & Warehousing",
    body: "Large-span roof and wall panels for warehouses and distribution centres, keeping goods protected and energy costs down.",
    image: logisticsImage,
    alt: "Logistics warehouse built with insulated panels",
  },
  {
    name: "Data & Technology",
    body: "Thermally stable, fire-conscious enclosures for data centres and equipment rooms where temperature control is critical.",
    image: dataImage,
    alt: "Data centre with rows of server racks",
  },
  {
    name: "Infrastructure & Utilities",
    body: "Durable insulated buildings for utility, transport and public infrastructure projects that must perform for decades.",
    image: infrastructureImage,
    alt: "Infrastructure and utilities facility",
  },
  {
    name: "Agriculture",
    body: "Insulated storage for produce, ripening and post-harvest handling, close to where crops are grown.",
    image: agricultureImage,
    alt: "Agricultural storage facility among fields",
  },
  {
    name: "Hospitality",
    body: "Cold rooms and insulated kitchens for hotels and restaurants that need dependable storage behind the scenes.",
    image: hospitalityImage,
    alt: "Hospitality building interior",
  },
  {
    name: "Shopping Centres",
    body: "Insulated envelopes and cold rooms for malls and retail spaces, keeping large public areas comfortable and efficient.",
    image: retailImage,
    alt: "Shopping centre interior",
  },
];

/** Space between the header and the slider while the section is pinned. */
const PHOTO_GAP = 32;

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function SectorServices() {
  const [index, setIndex] = useState(0);
  const sector = SECTORS[index];
  const track = useRef<HTMLDivElement>(null);
  const pinned = useRef<HTMLDivElement>(null);

  // Pin so the slider's top edge sits PHOTO_GAP below the header
  const pinTop = (pinEl: HTMLElement) => {
    const photo = pinEl.querySelector<HTMLElement>("[data-photo]");
    const photoOffset = photo ? photo.getBoundingClientRect().top - pinEl.getBoundingClientRect().top : 0;
    return (document.querySelector("header")?.offsetHeight ?? 0) + PHOTO_GAP - photoOffset;
  };

  // While pinned, scrolling through the stretch steps through the sectors.
  useEffect(() => {
    const trackEl = track.current;
    const pinEl = pinned.current;
    if (!trackEl || !pinEl) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const top = pinTop(pinEl);
      pinEl.style.top = `${top}px`;
      const travel = trackEl.offsetHeight - pinEl.offsetHeight;
      const scrolled = top - trackEl.getBoundingClientRect().top;
      const progress = travel > 0 ? Math.min(1, Math.max(0, scrolled / travel)) : 0;
      setIndex(Math.min(SECTORS.length - 1, Math.floor(progress * SECTORS.length)));
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

  // Dots scroll to that sector's stretch, so clicking and scrolling always agree.
  const goTo = (i: number) => {
    const trackEl = track.current;
    const pinEl = pinned.current;
    if (!trackEl || !pinEl) return setIndex(i);
    const travel = trackEl.offsetHeight - pinEl.offsetHeight;
    const trackTop = trackEl.getBoundingClientRect().top + window.scrollY;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: trackTop - pinTop(pinEl) + (travel * (i + 0.5)) / SECTORS.length,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <section className="rounded-t-[max(28px,5.5vw)] bg-black text-white">
      <div ref={track}>
        <div ref={pinned} className="sticky">
          {/* Black band is full-bleed; content sits in the shared gutter (logo → Start Your Quote). */}
          <div className={CONTAINER}>
            <div className={cn("@container", SECTION_Y)}>
              <Reveal>
                <h2 className="max-w-[11em] text-[max(28px,3.4cqw)] leading-[1.33] font-medium tracking-[-0.01em]">
                  Services tailored to <br />
                  every sector
                </h2>
              </Reveal>

              <hr className={cn(RULE_GAP, "border-[#3a3a3a]")} />

              <Reveal delay={100} className={cn(RULE_GAP, "lg:ml-[49.5%]")}>
                <p className="max-w-[31em] font-ui text-[max(15px,1.63cqw)] leading-[1.6] text-white">
                  Select an industry below to discover how our PUF panels are engineered to meet its specific
                  requirements.
                </p>
              </Reveal>

              <Reveal delay={150} className={BLOCK_GAP}>
                <div
                  data-photo
                  aria-roledescription="carousel"
                  aria-label="Application sectors"
                  className="relative aspect-[3/4] overflow-hidden rounded-[max(16px,3.7cqw)] sm:aspect-[534/270]"
                >
                  {/* All photos stay mounted so each is already loaded when its sector comes up */}
                  {SECTORS.map((s, i) => (
                    <Image
                      key={s.name}
                      src={s.image}
                      alt={s.alt}
                      fill
                      placeholder="blur"
                      sizes="(min-width: 1920px) 1594px, 100vw"
                      aria-hidden={i !== index}
                      className={cn(
                        "object-cover transition-opacity duration-500",
                        i === index ? "opacity-100" : "opacity-0",
                      )}
                    />
                  ))}
                  {/* Darkens the photo so the overlaid copy stays legible */}
                  <div aria-hidden className="absolute inset-0 bg-black/45" />

                  <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-[3.6cqw]">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <p className="flex items-center gap-[0.4em] font-ui text-[max(12px,1.38cqw)]">
                        <span aria-hidden className="size-[0.35em] rounded-[1px] bg-current" />
                        Application Sector
                      </p>
                      <div key={index} aria-live="polite" className="animate-rise">
                        <h3 className="font-ui text-[max(17px,1.75cqw)] leading-tight">{sector.name}</h3>
                        <Link
                          href="/products"
                          className="mt-3 inline-flex rounded-[max(5px,0.6cqw)] border border-white px-[1.5em] py-[0.8em] font-ui text-[max(12px,1cqw)] leading-none transition-colors duration-200 hover:bg-white hover:text-black lg:mt-[2cqw]"
                        >
                          Explore Sector
                        </Link>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                      <p
                        key={index}
                        className="max-w-[27em] animate-rise font-ui text-[max(14px,1.75cqw)] leading-[1.5]"
                      >
                        {sector.body}
                      </p>
                      <div className="flex gap-[max(4px,0.45cqw)]">
                        {SECTORS.map((s, i) => (
                          <button
                            key={s.name}
                            type="button"
                            onClick={() => goTo(i)}
                            aria-label={`Show ${s.name}`}
                            aria-current={i === index}
                            className={cn(
                              "size-[max(7px,0.75cqw)] rounded-full transition-colors duration-200",
                              i === index ? "bg-white" : "bg-white/45 hover:bg-white/70",
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
        {/* Scroll room while the block is pinned: one stretch per extra sector */}
        <div aria-hidden className="h-[280svh]" />
      </div>
    </section>
  );
}
