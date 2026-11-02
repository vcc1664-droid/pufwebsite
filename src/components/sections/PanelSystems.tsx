import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER } from "@/constants/layout";
import { cn } from "@/lib/utils";
// Uppercase .JPG has no static-import typings, so the wall photo is referenced by path.
import roofImage from "../../../public/Home/ChatGPT Image Aug 27, 2026, 04_36_06 PM.png";

type PanelSystem = {
  title: string;
  body: string;
  profile: string;
  cores: string[];
  link: { label: string; href: string };
  image: { src: StaticImageData | string; alt: string };
};

const SYSTEMS: PanelSystem[] = [
  {
    title: "Roof Panels",
    body: "Insulated roofing for cold stores, warehouses and industrial sheds.",
    profile: "Standing seam",
    cores: ["PUF", "PIR", "Rockwool"],
    link: { label: "Explore roof panels", href: "/products" },
    image: { src: roofImage, alt: "Aerial view of an industrial shed roofed with insulated panels" },
  },
  {
    title: "Wall Panels",
    body: "Insulated walls for cold stores, factories and commercial buildings.",
    profile: "Single skin · Micro-rib · Concealed fix",
    cores: ["PUF", "PIR", "Rockwool"],
    link: { label: "Explore wall panels", href: "/products" },
    image: {
      src: "/Home/DJI_20260908123834_0320_D.JPG",
      alt: "Cold storage building with insulated wall panels, seen from above",
    },
  },
];

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={cn("size-[1em] transition-transform duration-200", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function PanelSystems() {
  return (
    <section className="bg-[#f8f8f9]">
      {/* Grey band is full-bleed; content sits in the shared gutter (logo → Start Your Quote). */}
      <div className={CONTAINER}>
        <div className="@container py-16 lg:py-[9.5cqw]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal className="lg:w-[47.3%]">
              <h2 className="max-w-[12em] text-[max(28px,3.6cqw)] leading-[1.2] font-medium tracking-[-0.02em] text-black">
                Panel systems for different requirements.
              </h2>
            </Reveal>

            <Reveal delay={100} className="lg:w-[48.6%] lg:pb-[0.4cqw]">
              <p className="max-w-[36em] font-ui text-[max(14px,1.15cqw)] leading-[1.6] text-[#909090]">
                Roof, wall and cold-room panel systems manufactured for industrial, commercial and
                specialised environments.
              </p>
              <Link
                href="/products"
                className="group mt-3 inline-flex items-center gap-[0.3em] font-ui text-[max(13px,1cqw)] text-brand transition-opacity duration-200 hover:opacity-70 lg:mt-[1.4cqw]"
              >
                View all products
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="size-[0.9em] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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

          <div className="mt-14 flex flex-col gap-16 lg:mt-[8.5cqw] lg:gap-[4.5cqw]">
            {SYSTEMS.map((system, i) => {
              // Rows alternate: text left / image right, then image left / text right.
              const imageFirst = i % 2 === 1;

              return (
                <div
                  key={system.title}
                  className={cn(
                    "flex flex-col gap-8 lg:items-center lg:justify-between lg:gap-0",
                    imageFirst ? "lg:flex-row-reverse" : "lg:flex-row",
                  )}
                >
                  <Reveal className="lg:w-[47.2%]">
                    <h3 className="text-[max(22px,2.3cqw)] leading-tight font-medium tracking-[-0.01em] text-black">
                      {system.title}
                    </h3>
                    <p className="mt-3 font-ui text-[max(14px,1.2cqw)] leading-normal text-[#555] lg:mt-[1.2cqw]">
                      {system.body}
                    </p>

                    <dl className="mt-5 font-ui text-[max(13px,1.05cqw)] lg:mt-[1.8cqw]">
                      <div className="flex items-center justify-between gap-4 border-y border-[#dcdcdc] py-4 lg:py-[2.3cqw]">
                        <dt className="text-[#909090]">Profile</dt>
                        <dd className="text-right text-[#1e1e1e]">{system.profile}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-4 border-b border-[#dcdcdc] py-4 lg:py-[2.3cqw]">
                        <dt className="text-[#909090]">Cores</dt>
                        <dd>
                          <ul className="flex flex-wrap justify-end gap-2 lg:gap-[1cqw]">
                            {system.cores.map((core) => (
                              <li
                                key={core}
                                className="rounded-[4px] bg-brand/10 px-[0.75em] py-[0.3em] leading-snug text-brand"
                              >
                                {core}
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    </dl>

                    <Link
                      href={system.link.href}
                      className="group mt-5 inline-flex items-center gap-[0.5em] font-ui text-[max(13px,1cqw)] text-brand transition-opacity duration-200 hover:opacity-70 lg:mt-[2.6cqw]"
                    >
                      {system.link.label}
                      <Arrow className="group-hover:translate-x-0.5" />
                    </Link>
                  </Reveal>

                  <Reveal delay={100} className="lg:w-[48.6%]">
                    <div className="relative aspect-[356/212] overflow-hidden rounded-[max(10px,0.9cqw)]">
                      <Image
                        src={system.image.src}
                        alt={system.image.alt}
                        fill
                        placeholder={typeof system.image.src === "string" ? "empty" : "blur"}
                        sizes="(min-width: 1024px) 42vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
