import Image, { type StaticImageData } from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";
import isoLogo from "../../../public/Home/ISOcertified/ISO.png";
import labLogo from "../../../public/Home/ISOcertified/National Soil Testing Research Logo-80kb.jpeg";

type Document = {
  /** Issuer's logo on the left; the space stays empty without one. */
  logo?: { src: StaticImageData; alt: string };
  title: string;
  body: string;
  /** Link text for the PDF. */
  linkLabel: string;
  /**
   * PDF in /public, e.g. "/certificates/iso-9001-2015.pdf". Left empty until the file is added;
   * the link only shows once it is set.
   */
  pdf?: string;
};

const DOCUMENTS: Document[] = [
  {
    logo: { src: isoLogo, alt: "ISO logo" },
    title: "ISO 9001:2015 Certified",
    body: "Quality management of our Nalagarh plant, certified by TCCPL. It covers design, manufacture, supply and installation, including cold store panels.",
    linkLabel: "View certificate (PDF)",
  },
  {
    logo: { src: labLogo, alt: "National Soil Testing & Research Lab, Panchkula logo" },
    title: "Tested at an Independent Lab",
    body: "A PUF panel sample tested at National Soil Testing & Research Lab in November 2024, including density and thermal conductivity. Results apply to that sample.",
    linkLabel: "View test report (PDF)",
  },
];

/** Certificates and lab reports, each with a space for the issuer's logos and a link to the PDF. */
/* Sizes (lg+) are cqw of the content width. */
export function Certificates() {
  return (
    <section className={cn(CONTAINER, SECTION_Y)}>
      <div className="@container">
        <Reveal>
          <h2 className="font-sans text-[26px] leading-[1.3] font-medium tracking-[-1.0752px] text-[#000000] lg:text-[41.8179px] lg:leading-[54.3633px]">
            Certificates and test reports you can read
          </h2>
          <p className="mt-3 font-ui text-[max(16px,1.3cqw)] leading-[1.6] text-[#3e3e3e] lg:mt-[1cqw]">
            Read the documents behind our quality, not just our word for it.
          </p>
        </Reveal>

        <ul className="mt-6 grid gap-4 lg:mt-[2cqw] lg:gap-[1.2cqw]">
          {DOCUMENTS.map((doc, i) => (
            <li key={doc.title}>
              <Reveal
                delay={100 + i * 100}
                className="flex flex-col gap-6 rounded-[max(12px,0.8cqw)] border border-[#dad8cf] bg-[#faf9f6] p-5 sm:flex-row sm:items-center sm:gap-0 lg:p-[1.6cqw]"
              >
                {/* Issuer's logo, or an empty space until one is added */}
                <div
                  aria-hidden={!doc.logo}
                  className="flex h-28 items-center justify-center sm:h-auto sm:min-h-[max(120px,9cqw)] sm:w-[36%] sm:shrink-0 sm:self-stretch"
                >
                  {doc.logo && (
                    <Image
                      src={doc.logo.src}
                      alt={doc.logo.alt}
                      sizes="(min-width: 640px) 20vw, 60vw"
                      className="h-full max-h-28 w-auto max-w-full object-contain sm:max-h-[max(110px,8cqw)]"
                    />
                  )}
                </div>

                <div aria-hidden className="hidden w-0.5 self-stretch bg-[#14213d] sm:mx-[max(16px,1.6cqw)] sm:my-[max(8px,0.6cqw)] sm:block" />

                <div className="sm:flex-1">
                  <h3 className="flex items-center gap-[0.5em] font-ui text-[max(18px,1.45cqw)] leading-tight font-bold text-black">
                    <svg aria-hidden viewBox="0 0 24 24" className="size-[1.05em] shrink-0">
                      <circle cx="12" cy="12" r="11" fill="#561A61" />
                      <path d="m7 12.5 3.2 3.2L17 9" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {doc.title}
                  </h3>
                  <p className="mt-3 font-ui text-[max(15px,1.15cqw)] leading-[1.6] text-[#555] lg:mt-[0.8cqw]">
                    {doc.body}
                  </p>
                  {doc.pdf && (
                    <a
                      href={encodeURI(doc.pdf)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block font-ui text-[max(15px,1.15cqw)] font-semibold text-[#14213d] underline underline-offset-[0.2em] transition-opacity duration-200 hover:opacity-70 lg:mt-[0.8cqw]"
                    >
                      {doc.linkLabel} →
                    </a>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
