import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { BLOCK_GAP, CONTAINER, RULE_GAP, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";
import panelsImage from "../../../../public/about/4.png";
import roofingImage from "../../../../public/about/industrial_roofing_hero.jpg";
import factoryImage from "../../../../public/about/puf_factory_1786340180982.png";

const IMAGES = [
  { src: roofingImage, alt: "Industrial building with insulated roofing panels" },
  { src: factoryImage, alt: "Synergy PUF panel manufacturing facility" },
  { src: panelsImage, alt: "Installers fixing insulated wall panels on site" },
];

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function BuildingStory() {
  return (
    <section className={cn(CONTAINER, SECTION_Y)}>
      <div className="@container">
        <Reveal>
          <h2 className="text-[max(28px,3.3cqw)] leading-[1.2] font-medium tracking-[-0.02em] text-black">
            Part of a bigger building story.
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
            Founded in 2012, Synergy PUF is part of Synergy Group, with a focus on insulated panel
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

        <ul className={cn(BLOCK_GAP, "grid gap-4 sm:grid-cols-3 lg:gap-[2.85cqw]")}>
          {IMAGES.map((image, i) => (
            <li key={image.alt}>
              <Reveal delay={i * 100}>
                <div className="relative aspect-[501/688] overflow-hidden rounded-[max(12px,1.6cqw)]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
