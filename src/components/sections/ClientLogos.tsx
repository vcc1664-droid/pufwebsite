import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";
import zomato from "../../../public/Home/CompnayLogo/548122b6-676c-475f-a432-96e4c6d93d6e.jpg";
import amul from "../../../public/Home/CompnayLogo/69095cf9-0d05-48bf-9edf-5e71f6bcd91c.jpg";
import blinkit from "../../../public/Home/CompnayLogo/824d2ef9-1d0d-498c-9bfa-0e555c82a0ad.jpg";
import verka from "../../../public/Home/CompnayLogo/984fbac7-02a4-4962-b680-73761f6035b5.jpg";
import nestle from "../../../public/Home/CompnayLogo/d0134dc4-4f43-4f45-8b09-342aa84a5b47.jpg";

const LOGOS = [
  { src: zomato, name: "Zomato" },
  { src: amul, name: "Amul" },
  { src: blinkit, name: "Blinkit" },
  { src: verka, name: "Verka" },
  { src: nestle, name: "Nestlé" },
];

/** Row of client logos, all at one height, spread across the content width. */
/* Sizes (lg+) are cqw of the content width. */
export function ClientLogos() {
  return (
    <section className={cn(CONTAINER, SECTION_Y)}>
      <div className="@container">
        <ul
          aria-label="Our clients"
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:justify-between lg:gap-0"
        >
          {LOGOS.map((logo, i) => (
            <li key={logo.name}>
              <Reveal delay={i * 80}>
                <Image
                  src={logo.src}
                  alt={logo.name}
                  sizes="(min-width: 1024px) 14vw, 30vw"
                  className="h-[max(56px,5.5cqw)] w-auto rounded-[max(8px,0.6cqw)] border border-[#ececec]"
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
