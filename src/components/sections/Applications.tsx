import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER } from "@/constants/layout";
import coldRoomImage from "../../../public/Home/Chilled Freezer Warehouse Aisle.png";

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function Applications() {
  return (
    <section className="my-16 rounded-t-[max(28px,5.5vw)] bg-black text-white lg:my-24">
      {/* Black band is full-bleed; content sits in the shared gutter (logo → Start Your Quote). */}
      <div className={CONTAINER}>
        <div className="@container pt-14 pb-16 lg:pt-[6.6cqw] lg:pb-[7cqw]">
          <Reveal>
            <h2 className="max-w-[10em] text-[max(26px,4.2cqw)] leading-[1.3] font-medium tracking-[-0.01em]">
              Different spaces. Different insulation demands.
            </h2>
          </Reveal>

          <Reveal delay={100} className="relative mt-10 lg:mt-[5.9cqw] lg:ml-[15.9cqw] lg:w-[77.3cqw]">
            <div className="relative aspect-[537/277] overflow-hidden rounded-[max(12px,2cqw)]">
              <Image
                src={coldRoomImage}
                alt="Cold storage warehouse aisle lined with insulated PUF panels"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 78vw, 100vw"
                className="object-cover"
              />
            </div>
            <span
              aria-hidden
              className="absolute -right-2 -bottom-[0.18em] text-[max(72px,20.5cqw)] leading-none font-medium tracking-[-0.04em] lg:-right-[6.8cqw] lg:-bottom-[0.45em]"
            >
              01
            </span>
          </Reveal>

          <Reveal delay={150} className="mt-12 lg:mt-[3.4cqw]">
            <h3 className="max-w-[9em] text-[max(24px,4.2cqw)] leading-[1.3] font-medium tracking-[-0.01em]">
              Temperature-Controlled Spaces
            </h3>
            <p className="mt-3 font-ui text-[max(14px,1.36cqw)] leading-snug text-[#555050] lg:mt-[1.6cqw]">
              For cold rooms, freezer areas and temperature-sensitive facilities.
            </p>
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
    </section>
  );
}
