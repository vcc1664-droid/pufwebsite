import Image, { type StaticImageData } from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, SECTION_Y } from "@/constants/layout";
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

type Tile = { label: string; image: StaticImageData; alt: string };

// Same sectors and photos as the Applications page ("Services tailored to every sector").
const TILES: Tile[] = [
  { label: "Cold Chain & Food Processing", image: coldChainImage, alt: "Cold storage warehouse aisle with tall racking" },
  { label: "Healthcare & Pharmaceuticals", image: healthcareImage, alt: "Pharmaceutical facility with insulated cleanroom panels" },
  { label: "Industrial & Manufacturing", image: industrialImage, alt: "Manufacturing plant interior with insulated panels" },
  { label: "Logistics & Warehousing", image: logisticsImage, alt: "Logistics warehouse built with insulated panels" },
  { label: "Data & Technology", image: dataImage, alt: "Data centre with rows of server racks" },
  { label: "Infrastructure & Utilities", image: infrastructureImage, alt: "Infrastructure and utilities facility" },
  { label: "Agriculture", image: agricultureImage, alt: "Agricultural storage facility among fields" },
  { label: "Hospitality", image: hospitalityImage, alt: "Hospitality building interior" },
  { label: "Shopping Centres", image: retailImage, alt: "Shopping centre interior" },
];

/* Sizes (lg+) are cqw of the content width, measured from the design. */
export function SpaceTiles() {
  return (
    <section className={cn(CONTAINER, SECTION_Y)}>
      <div className="@container">
        {/* Tiles scroll endlessly from right to left; hovering pauses them */}
        <Reveal className="group overflow-hidden">
          <ul className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:overflow-x-auto">
            {/* Two copies so the loop has no gap; the second is hidden from screen readers */}
            {[0, 1].map((copy) =>
              TILES.map((tile) => (
                <li
                  key={`${copy}-${tile.label}`}
                  aria-hidden={copy === 1 || undefined}
                  className="mr-4 w-[max(160px,45cqw)] shrink-0 lg:mr-[2.4cqw] lg:w-[22.7cqw]"
                >
                  <div className="relative flex aspect-[164/146] items-end overflow-hidden rounded-[max(10px,1.5cqw)] bg-[#9a6a6a] p-3 lg:px-[2cqw] lg:pb-[2.4cqw]">
                    <Image
                      src={tile.image}
                      alt={copy === 1 ? "" : tile.alt}
                      fill
                      placeholder="blur"
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover"
                    />
                    {/* Darkens the lower half so the label stays legible */}
                    <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                    <p className="relative font-ui text-[max(14px,1.55cqw)] leading-tight text-white">
                      {tile.label}
                    </p>
                  </div>
                </li>
              )),
            )}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
