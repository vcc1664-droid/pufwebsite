import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER } from "@/constants/layout";
import { cn } from "@/lib/utils";
import wallsImage from "../../../public/Home/3.2.png";
import coldStoreImage from "../../../public/Home/ChatGPT Image Aug 27, 2026, 04_36_06 PM.png";

type Project = {
  title: string;
  scope: string;
  location: string;
  client: string;
  image: { src: StaticImageData | string; alt: string };
};

const PROJECTS: Project[] = [
  {
    title: "Mega Cold Storage Distributions Hub",
    scope: "PUF wall and ceiling panels, deep blast freezer enclosure",
    location: "Noida, Uttar Pradesh",
    client: "Apex Cold Chain Logistics",
    image: { src: coldStoreImage, alt: "Aerial view of a large cold storage hub surrounded by fields" },
  },
  {
    title: "Multi-Temperature Cold Store",
    scope: "Insulated wall and ceiling panels, airtight industrial cold doors",
    location: "Bengaluru, Karnataka",
    client: "Fresh Fields Food Logistics",
    image: { src: wallsImage, alt: "White insulated wall panels on a steel-framed cold store" },
  },
  {
    title: "Temperature-Controlled",
    scope: "PUF cold-room enclosure, sterile modular panels & insulated roofing",
    location: "Hyderabad, Telangana",
    client: "BioMed Pharma Logistics",
    // Uppercase .JPG has no static-import typings, so this photo is referenced by path.
    image: {
      src: "/Home/DJI_20260908123834_0320_D.JPG",
      alt: "Aerial view of a temperature-controlled facility with insulated panels",
    },
  },
];

function PinIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="size-[1.1em] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const meta = (
    <p className="flex items-center gap-[0.4em] text-white/85">
      <PinIcon />
      <span>
        {project.location}
        <span aria-hidden className="mx-[0.6em]">
          •
        </span>
        {project.client}
      </span>
    </p>
  );

  return (
    <article
      className={cn(
        "relative h-full overflow-hidden rounded-[max(12px,1.6cqw)] text-white",
        featured ? "aspect-[4/3] sm:aspect-[641/277]" : "aspect-[4/3] lg:aspect-[313/278]",
      )}
    >
      <Image
        src={project.image.src}
        alt={project.image.alt}
        fill
        placeholder={typeof project.image.src === "string" ? "empty" : "blur"}
        sizes={featured ? "(min-width: 1920px) 1594px, 100vw" : "(min-width: 1024px) 42vw, 100vw"}
        className="object-cover"
      />
      {/* Darkens the bottom so the white copy stays legible on bright photos */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 p-5 lg:p-[2.3cqw]">
        <h3 className="text-[max(18px,1.95cqw)] leading-tight font-medium tracking-[-0.01em]">
          {project.title}
        </h3>
        <div
          className={cn(
            "mt-2 font-ui text-[max(12px,1.2cqw)] leading-snug lg:mt-[0.9cqw]",
            featured
              ? "flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-6"
              : "space-y-1",
          )}
        >
          <p className="text-white/85">
            <span className="text-white">Scope:</span> {project.scope}
          </p>
          {meta}
        </div>
      </div>
    </article>
  );
}

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function SelectedProjects() {
  const [featured, ...rest] = PROJECTS;

  return (
    <section className={cn(CONTAINER, "py-16 lg:py-24")}>
      <div className="@container">
        <Reveal className="lg:ml-[50%]">
          <h2 className="text-[max(28px,3.4cqw)] leading-[1.25] font-medium tracking-[-0.02em] text-black">
            Selected <br />
            Synergy PUF projects.
          </h2>
        </Reveal>

        <hr className="mt-8 border-[#d9d9d9] lg:mt-[3.7cqw]" />

        <Reveal delay={100} className="mt-8 lg:mt-[4.2cqw] lg:w-[55%]">
          <p className="font-ui text-[max(15px,1.7cqw)] leading-[1.6] text-black">
            A look at insulated panel systems delivered across cold storage and temperature-controlled
            facilities.
          </p>
          <Link
            href="/projects"
            className="group mt-3 inline-flex items-center gap-[0.3em] font-ui text-[max(13px,1cqw)] text-brand transition-opacity duration-200 hover:opacity-70 lg:mt-[1.4cqw]"
          >
            View all projects
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

        <div className="mt-10 grid gap-4 lg:mt-[6cqw] lg:grid-cols-2 lg:gap-[2.3cqw]">
          <Reveal className="lg:col-span-2">
            <ProjectCard project={featured} featured />
          </Reveal>
          {rest.map((project, i) => (
            <Reveal key={project.title} delay={(i + 1) * 100}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
