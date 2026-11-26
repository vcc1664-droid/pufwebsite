import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { BLOCK_GAP, CONTAINER, RULE_GAP, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";
import panelsImage from "../../../../public/about/BiggerBuilding/Modern Industrial Cold Storage Interior-100kb.jpeg";
import roofingImage from "../../../../public/about/BiggerBuilding/43a9a6dd-c5cf-4f76-866d-be31ad9698cb-100kb.jpeg";
import factoryImage from "../../../../public/about/BiggerBuilding/Golden Hour Industrial Warehouse 1-100kb.jpeg";
import buildingImage from "../../../../public/about/BiggerBuilding/ChatGPT Image Nov 26 2026 04_52_40 PM-100kb.jpeg";

// Two rows as in the design: wide + narrow, then narrow + wide (see the grid below).
const IMAGES = [
  { src: roofingImage, alt: "Close-up of interlocking PUF sandwich panels showing the foam core" },
  { src: buildingImage, alt: "Insulated wall and roof panels fixed to a steel frame, seen from inside" },
  { src: factoryImage, alt: "Industrial warehouse clad with insulated panels at golden hour" },
  { src: panelsImage, alt: "Cold storage room lined with insulated wall and ceiling panels" },
];

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function BuildingStory() {
  return (
    <section className={cn(CONTAINER, SECTION_Y)}>
      <div className="@container">
        <Reveal>
          <h2 className="font-sans text-[28px] leading-[1.3] font-normal tracking-normal text-[#171717] lg:text-[50.1815px] lg:leading-[65.2359px]">
            Part of a Bigger Building Story.
          </h2>
        </Reveal>

        <hr className={cn(RULE_GAP, "border-[#bdbdbd]")} />

        <Reveal
          delay={100}
          className={cn(
            RULE_GAP,
            "space-y-4 font-ui text-[max(15px,1.6cqw)] leading-[1.6] text-[#7a7a7a] lg:space-y-[2cqw]",
          )}
        >
          <p>
            Founded in 2002, Synergy PUF is part of Synergy Group, with a focus on insulated panel
            manufacturing and installation.
          </p>
          <p>
            We manufacture PUF, PIR and Rockwool sandwich panels for industrial buildings, cold storage
            facilities, pharmaceutical plants and cleanrooms. Our work supports developers, EPC contractors,
            architects, consultants and industrial clients across India.
          </p>
          <p>
            From specification support to manufacturing, delivery and installation, we connect the panel with
            the requirements of the project—and the space it becomes part of.
          </p>
        </Reveal>

        {/* Two rows: wide + narrow, then narrow + wide. Hovering a photo widens it to the wide
            size and narrows the other one in its row; both ease back when the pointer leaves. */}
        <div className={cn(BLOCK_GAP, "space-y-4 lg:space-y-[1.6cqw]")}>
          {[IMAGES.slice(0, 2), IMAGES.slice(2, 4)].map((row, r) => (
            <ul key={r} className="group/row flex flex-col gap-4 lg:flex-row lg:gap-[1.6cqw]">
              {row.map((image, j) => {
                const wide = r === 0 ? j === 0 : j === 1;
                return (
                  <li
                    key={image.alt}
                    className={cn(
                      "transition-[flex-grow] duration-500 ease-out lg:basis-0 lg:hover:grow-[59] lg:group-has-[li:hover]/row:[&:not(:hover)]:grow-[41]",
                      wide ? "lg:grow-[59]" : "lg:grow-[41]",
                    )}
                  >
                    <Reveal delay={(r * 2 + j) * 100}>
                      <div className="relative aspect-video overflow-hidden rounded-[max(12px,1.6cqw)] lg:aspect-auto lg:h-[max(200px,24cqw)]">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          placeholder="blur"
                          sizes="(min-width: 1024px) 59vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
