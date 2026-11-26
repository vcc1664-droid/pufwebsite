import Image, { type StaticImageData } from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { CONTAINER, SECTION_Y } from "@/constants/layout";
import { cn } from "@/lib/utils";
import isoLogo from "../../../public/Home/ISOcertified/ISO.png";
import grihaLogo from "../../../public/Home/ISOcertified/e0bfcbda0ecba02413ece654bed198d0a39e58a9.png";

type Document = {
  /** Issuer's logo on the left; the space stays empty without one. */
  logo?: { src: StaticImageData; alt: string };
  /** Issuer's name written as text, in two coloured bands like its letterhead (used without a logo). */
  issuerName?: [string, string];
  title: string;
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
    logo: { src: grihaLogo, alt: "GRIHA logo" },
    title: "GRIHA Certified",
    linkLabel: "View certificate (PDF)",
  },
  {
    logo: { src: isoLogo, alt: "ISO logo" },
    title: "ISO 9001:2015 Certified",
    linkLabel: "View certificate (PDF)",
  },
  {
    issuerName: ["National Soil Testing &", "Research Lab. Panchkula (Regd.)"],
    title: "Tested at an Independent Lab",
    linkLabel: "View test report (PDF)",
  },
];


// Scalloped edge of the badge: small circles round the medal (viewBox 0 0 120 150, centre 60,55)
const SCALLOPS = Array.from({ length: 18 }, (_, i) => {
  const a = (i / 18) * Math.PI * 2;
  return { cx: 60 + Math.cos(a) * 44, cy: 55 + Math.sin(a) * 44 };
});

/** Purple award badge (medal with two ribbon tails); the logo sits in its grey centre. */
function Rosette({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto aspect-[120/150] w-[max(120px,11cqw)]">
      <svg aria-hidden viewBox="0 0 120 150" className="absolute inset-0 size-full">
        {/* Ribbon tails behind the medal */}
        <path d="M38 80 62 92 50 148 41 134 28 141Z" fill="#561A61" />
        <path d="M82 80 58 92 70 148 79 134 92 141Z" fill="#561A61" />
        {/* Medal: scalloped purple edge, white ring, grey centre */}
        <circle cx="60" cy="55" r="44" fill="#561A61" />
        {SCALLOPS.map((c, i) => (
          <circle key={i} cx={c.cx} cy={c.cy} r="7" fill="#561A61" />
        ))}
        <circle cx="60" cy="55" r="40" fill="#ffffff" />
        <circle cx="60" cy="55" r="35" fill="#dcdcdc" />
      </svg>
      {/* Logo area: the grey centre (diameter 70 of 120, centred at 60,55) */}
      <div className="absolute top-[36.7%] left-1/2 flex aspect-square w-[50%] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        {children}
      </div>
    </div>
  );
}

/** Certificates and lab reports as award badges: issuer logo on a medal, then the name (plus a PDF link once added). */
/* Sizes (lg+) are cqw of the content width. */
export function Certificates() {
  return (
    // White band, full-bleed
    <section className="bg-white">
      <div className={cn(CONTAINER, SECTION_Y)}>
        <div className="@container">
          <Reveal className="text-center">
            <h2 className="font-sans text-[26px] leading-[1.3] font-normal tracking-normal text-[#171717] lg:text-[50.1815px] lg:leading-[65.2359px]">
              Certificates and Test Reports
            </h2>
            <p className="mt-3 font-ui text-[15.5324px] leading-[23.2985px] font-normal tracking-normal text-[#696969] lg:mt-[1cqw]">
              Read the documents behind our quality, not just our word for it.
            </p>
          </Reveal>

          <ul className="mx-auto mt-8 grid max-w-[max(320px,78cqw)] gap-4 sm:grid-cols-3 lg:mt-[3.4cqw] lg:gap-[3.6cqw]">
            {DOCUMENTS.map((doc, i) => (
              <li key={doc.title}>
                <Reveal
                  delay={100 + i * 100}
                  className="flex h-full flex-col items-center rounded-[max(12px,1cqw)] bg-[#F6F6F6] px-5 pt-7 pb-8 text-center lg:px-[1.6cqw] lg:pt-[2.2cqw] lg:pb-[2.6cqw]"
                >
                  <Rosette>
                    {doc.logo && (
                      <Image
                        src={doc.logo.src}
                        alt={doc.logo.alt}
                        sizes="(min-width: 1024px) 6vw, 80px"
                        className="max-h-[80%] w-auto max-w-[90%] object-contain"
                      />
                    )}
                    {!doc.logo && doc.issuerName && (
                      <p className="flex w-full flex-col text-center font-ui text-[max(6px,0.42cqw)] leading-tight font-semibold text-white">
                        <span className="bg-[#e01e1e] px-[0.4em] py-[0.3em]">{doc.issuerName[0]}</span>
                        <span className="bg-[#1e7a1e] px-[0.4em] py-[0.3em]">{doc.issuerName[1]}</span>
                      </p>
                    )}
                  </Rosette>

                  <h3 className="mt-5 max-w-[13em] font-ui text-balance text-[14px] leading-snug font-normal text-black lg:mt-[1.8cqw] lg:text-[max(13px,1.1cqw)]">
                    {doc.title}
                  </h3>
                  {doc.pdf && (
                    <a
                      href={encodeURI(doc.pdf)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block font-ui text-[12px] font-semibold text-[#561A61] underline underline-offset-[0.2em] transition-opacity duration-200 hover:opacity-70"
                    >
                      {doc.linkLabel} →
                    </a>
                  )}
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
