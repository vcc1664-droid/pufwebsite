import Image, { type StaticImageData } from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER } from "@/constants/layout";
import { cn } from "@/lib/utils";

type HighlightsMediaProps = {
  items: string[];
  image: { src: StaticImageData | string; alt: string };
  tone?: "light" | "dark";
  /** Desktop widths of the list and image columns, and the image aspect ratio, from the Figma frame. */
  listClassName: string;
  imageClassName: string;
  aspectClassName: string;
  priority?: boolean;
};

/** Ruled list of highlights beside a large rounded photo. */
/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function HighlightsMedia({
  items,
  image,
  tone = "light",
  listClassName,
  imageClassName,
  aspectClassName,
  priority,
}: HighlightsMediaProps) {
  const dark = tone === "dark";

  return (
    <section className={cn(CONTAINER, "pb-16 lg:pb-24")}>
      <div className="@container flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-0">
        <Reveal className={cn("lg:pt-[0.4cqw]", listClassName)}>
          <ul className={cn("font-ui text-[max(15px,1.4cqw)]", dark ? "text-white" : "text-black")}>
            {items.map((item) => (
              <li
                key={item}
                className={cn("border-b py-4 lg:py-[1.6cqw]", dark ? "border-[#3d3d3d]" : "border-[#bdbdbd]")}
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100} className={imageClassName}>
          <div className={cn("relative overflow-hidden rounded-[max(14px,2.5cqw)]", aspectClassName)}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={priority}
              placeholder={typeof image.src === "string" ? "empty" : "blur"}
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
