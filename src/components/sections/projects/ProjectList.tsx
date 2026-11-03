"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { BLOCK_GAP, CONTAINER, SECTION_Y, STACK_GAP } from "@/constants/layout";
import { QUOTE_CTA } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import wallsImage from "../../../../public/Home/3.2.png";
import dayalImage from "../../../../public/Home/ChatGPT Image Aug 27, 2026, 04_36_06 PM.png";

type ProjectImage = { src: StaticImageData | string; alt: string };

type Project = {
  name: string;
  date: string;
  location: string;
  body: string;
  /** Add more photos to show the gallery dots. */
  images: ProjectImage[];
  specs: { label: string; value: string }[];
};

const specs = (area: string) => [
  { label: "Panel", value: "PUF Wall & Ceiling" },
  { label: "Thickness", value: "100 mm" },
  { label: "Core Density", value: "40 kg/m³" },
  { label: "Area", value: area },
];

// "[Village]" is a placeholder from the design until exact locations are confirmed.
const PROJECTS: Project[] = [
  {
    name: "Dayal Cold Store",
    date: "Jul 2024",
    location: "[Village], Punjab",
    body: "Synergy PUF supplied and installed insulated wall and ceiling panels for Dayal Cold Store. The long storage building has green-and-white panel walls and an attached storage shed, with a covered loading area at the front. This open-sided area lets produce be loaded and unloaded under cover, close to the chamber doors.",
    images: [{ src: dayalImage, alt: "Aerial view of Dayal Cold Store among green fields" }],
    specs: specs("45,000 sq ft"),
  },
  {
    name: "Dholan Cold Store",
    date: "Apr 2024",
    location: "[Village], Punjab",
    body: "Synergy PUF supplied and installed insulated wall and ceiling panels for Dholan Cold Store. The facility sits among open farmland, with a wide covered loading area along its front. The panels wrap the storage chambers in a continuous insulated layer, helping them hold a steady low temperature.",
    // Uppercase .JPG has no static-import typings, so this photo is referenced by path.
    images: [
      {
        src: "/Home/DJI_20260908123834_0320_D.JPG",
        alt: "Aerial view of Dholan Cold Store in open farmland",
      },
    ],
    specs: specs("25,000 sq ft"),
  },
  {
    name: "Jasswal Cold Store",
    date: "May 2024",
    location: "[Village], Punjab",
    body: "Synergy PUF supplied and installed insulated wall and ceiling panels for Jasswal Cold Store. The tall storage building is joined to a large open-sided shed for loading. Its height allows produce to be stacked high inside the insulated chambers.",
    images: [{ src: wallsImage, alt: "Insulated panel walls of Jasswal Cold Store" }],
    specs: specs("35,000 sq ft"),
  },
];

// Projects shown before "View All Projects"; the button appears once the list is longer.
const INITIAL_COUNT = 3;

function ProjectGallery({ project }: { project: Project }) {
  const [index, setIndex] = useState(0);
  const image = project.images[index];

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[max(14px,2cqw)] sm:aspect-[670/250]">
      <Image
        key={index}
        src={image.src}
        alt={image.alt}
        fill
        placeholder={typeof image.src === "string" ? "empty" : "blur"}
        sizes="(min-width: 1920px) 1594px, 100vw"
        className="animate-rise object-cover"
      />

      <p className="absolute bottom-[max(12px,2.2cqw)] left-[max(12px,2.2cqw)] rounded-[3px] border border-white/40 bg-black/35 px-[0.8em] py-[0.45em] font-ui text-[max(11px,1.05cqw)] leading-none text-white backdrop-blur-sm">
        {project.date} • {project.location}
      </p>

      {project.images.length > 1 && (
        <div className="absolute inset-x-0 bottom-[max(10px,1.3cqw)] flex justify-center gap-[max(5px,0.4cqw)]">
          {project.images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show photo ${i + 1} of ${project.name}`}
              aria-current={i === index}
              className={cn(
                "size-[max(7px,0.75cqw)] rounded-full transition-colors duration-200",
                i === index ? "bg-white" : "bg-white/45 hover:bg-white/70",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function ProjectList() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? PROJECTS : PROJECTS.slice(0, INITIAL_COUNT);

  return (
    // Black behind the white panel's rounded top corners, continuing the dark band above
    <section className="bg-black">
      <div className="rounded-t-[max(28px,5.5vw)] bg-white">
        <div className={CONTAINER}>
          <div className={cn("@container", SECTION_Y)}>
            {visible.map((project, i) => (
              <article
                key={project.name}
                className={cn(i > 0 && BLOCK_GAP, i > 0 && "border-t border-[#8c8c8c] pt-12 lg:pt-[6cqw]")}
              >
                <Reveal>
                  <h2 className="text-center text-[max(34px,6.7cqw)] leading-[1.1] font-medium tracking-[-0.02em] text-[#1e1e1e]">
                    {project.name}
                  </h2>
                </Reveal>

                <Reveal delay={100} className={STACK_GAP}>
                  <ProjectGallery project={project} />
                </Reveal>

                <Reveal delay={150}>
                  <p
                    className={cn(STACK_GAP, "font-ui text-[max(14px,1.2cqw)] leading-[1.6] text-[#7a7a7a]")}
                  >
                    {project.body}
                  </p>

                  <dl className={cn(STACK_GAP, "grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-[2.2cqw]")}>
                    {project.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="rounded-[max(6px,0.8cqw)] bg-[#f5f5f5] p-4 lg:p-[2.2cqw]"
                      >
                        <dt className="font-ui text-[max(12px,1.1cqw)] text-[#7a7a7a]">{spec.label}</dt>
                        <dd className="mt-1 font-ui text-[max(13px,1.2cqw)] font-medium text-black lg:mt-[0.5cqw]">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className={cn(STACK_GAP, "flex justify-center")}>
                    <Link
                      href={QUOTE_CTA.href}
                      className="group inline-flex items-center gap-[0.5em] rounded-[max(5px,0.6cqw)] bg-brand px-[max(20px,4cqw)] py-[max(10px,0.9cqw)] font-ui text-[max(13px,1.35cqw)] leading-none text-white transition-colors duration-200 hover:bg-black"
                    >
                      Build Something Similar
                      <svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        className="size-[1em] transition-transform duration-200 group-hover:translate-x-0.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </div>
                </Reveal>
              </article>
            ))}

            {!showAll && PROJECTS.length > INITIAL_COUNT && (
              <div className={cn(BLOCK_GAP, "flex justify-center")}>
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  className="group flex flex-col items-center gap-3 font-ui text-[max(14px,1.35cqw)] text-black lg:gap-[1.2cqw]"
                >
                  <span className="grid size-[max(40px,4cqw)] place-items-center rounded-full bg-black text-white transition-transform duration-200 group-hover:translate-y-0.5">
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      className="size-[45%]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                  View All Projects
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
