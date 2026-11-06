import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import groupLogo from "../../../public/logo/Group-Logo.png";
import { CONTAINER } from "@/constants/layout";
import { cn } from "@/lib/utils";

type FooterLink = { label: string; href?: string };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Popular Searches",
    links: [
      { label: "PUF Wall Panel", href: "/products" },
      { label: "Roof Panels", href: "/products" },
      { label: "PUF Panels", href: "/products" },
      { label: "Sandwich Panels", href: "/products" },
      { label: "Heat Insulated Panels", href: "/products" },
    ],
  },
  {
    title: "Group Companies",
    links: [
      { label: "Synergy Thrislington", href: "https://www.synergythrislington.in/" },
      { label: "Synergy LGSF", href: "https://synergylgsf.com/" },
      { label: "Synergy PEB", href: "https://www.synergypeb.com/" },
      { label: "Synergy Construction", href: "https://www.synergyconstruction.in/" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "All Panels", href: "/products" },
      { label: "Applications", href: "/applications" },
      { label: "Case Studies", href: "/projects" },
      // No link until the blog page exists
      { label: "Technical Blog" },
    ],
  },
];

const iconProps = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  className: "size-[1em] shrink-0",
} as const;

const PhoneIcon = () => (
  <svg {...iconProps}>
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
  </svg>
);

const MailIcon = () => (
  <svg {...iconProps}>
    <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4 7.3V8l8 4.9L20 8v-.7z" />
  </svg>
);

const PinIcon = () => (
  <svg {...iconProps}>
    <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
  </svg>
);

const SOCIALS: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/synergypuf",
    icon: (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="size-[55%]"
      >
        <rect x="4" y="4" width="16" height="16" rx="4.5" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17" cy="7" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@Synergypuf",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="size-[60%]">
        <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/synergy-puf/",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="size-[50%]">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-4.98c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.92 1.3-1.92 2.63V21h-4z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Synergy-PUF/61593245264043/",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="size-[55%]">
        <path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.2A21 21 0 0 0 14.6 2C12.2 2 10.6 3.5 10.6 6.2v2.3H8V12h2.6v10H14V12h2.7l.4-3.5z" />
      </svg>
    ),
  },
];

const heading = "text-[max(15px,1.45cqw)] font-medium text-black";
const body = "text-[max(14px,1.3cqw)] text-[#1e1e1e]";
const fine = "text-[max(12px,1.05cqw)] leading-[1.6] text-[#1e1e1e]";

/* Sizes (lg+) are cqw of the content width, measured from the Figma frame. */
export function Footer() {
  return (
    <footer className="bg-[#e8e8ea]">
      <div className={CONTAINER}>
        <div className="@container pt-10 pb-6 lg:pt-[4.5cqw] lg:pb-[2cqw]">
          <p
            aria-hidden
            className="text-center text-[max(48px,10.5cqw)] leading-none font-medium tracking-[-0.02em] whitespace-nowrap text-brand"
          >
            Synergy PUF
          </p>

          <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:mt-[3.5cqw] lg:grid-cols-[30.2%_30.2%_25.8%_1fr] lg:gap-0">
            {COLUMNS.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className={heading}>{column.title}</h2>
                <ul className="mt-4 space-y-1.5 lg:mt-[1.7cqw] lg:space-y-[0.5cqw]">
                  {column.links.map((link) => (
                    <li key={link.label} className="text-[max(13px,1.2cqw)] text-[#1e1e1e]">
                      {link.href?.startsWith("http") ? (
                        // Sister-company sites open in a new tab
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors duration-200 hover:text-brand"
                        >
                          {link.label}
                        </a>
                      ) : link.href ? (
                        <Link href={link.href} className="transition-colors duration-200 hover:text-brand">
                          {link.label}
                        </Link>
                      ) : (
                        link.label
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div>
              <h2 className={heading}>A venture by</h2>
              <a
                href="https://www.thesynergygroup.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Synergy Group website (opens in a new tab)"
                className="mt-4 inline-block transition-opacity duration-200 hover:opacity-75 lg:mt-[1.9cqw]"
              >
                <Image
                  src={groupLogo}
                  alt="Synergy Group"
                  sizes="(min-width: 1024px) 14vw, 160px"
                  className="h-auto w-[max(140px,13.5cqw)]"
                />
              </a>
            </div>
          </div>

          <address className="mt-8 grid gap-8 not-italic sm:grid-cols-2 lg:mt-[3.5cqw] lg:grid-cols-[30.2%_30.2%_25.8%_1fr] lg:gap-0">
            <a
              href="tel:+919988118888"
              className={cn(body, "flex items-center gap-2 self-start transition-colors hover:text-brand")}
            >
              <span className="text-brand">
                <PhoneIcon />
              </span>
              +91 9988118888
            </a>
            <a
              href="mailto:sales@synergypuf.com"
              className={cn(
                body,
                "flex items-center gap-2 self-start transition-colors hover:text-brand lg:pl-[0.8cqw]",
              )}
            >
              <span className="text-brand">
                <MailIcon />
              </span>
              sales@synergypuf.com
            </a>
            <div>
              <p className={cn(body, "flex items-center gap-2")}>
                <span className="text-brand">
                  <PinIcon />
                </span>
                Corporate Office
              </p>
              <p className={cn(fine, "mt-1.5 max-w-[17em] pl-[calc(1em+0.5rem)] lg:mt-[0.6cqw]")}>
                C-148, Phase 7, Industrial Area Sector 73, SAS Nagar Punjab 160055
              </p>
            </div>
            <div>
              <p className={cn(body, "flex items-center gap-2")}>
                <span className="text-brand">
                  <PinIcon />
                </span>
                Manufacturing Unit
              </p>
              <p className={cn(fine, "mt-1.5 max-w-[15em] pl-[calc(1em+0.5rem)] lg:mt-[0.6cqw]")}>
                VPO Manjholi, Tehsil Nalagarh District Solan HP 174010, India
              </p>
            </div>
          </address>

          <ul className="mt-6 flex gap-2 lg:mt-[2.5cqw] lg:gap-[0.8cqw]">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Synergy PUF on ${social.label} (opens in a new tab)`}
                  className="grid size-[max(24px,1.75cqw)] place-items-center rounded-full bg-brand text-white transition-colors duration-200 hover:bg-black"
                >
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-col gap-3 border-t border-[#b9b9bc] pt-4 sm:flex-row sm:items-center sm:justify-between lg:mt-[1.6cqw] lg:pt-[1.8cqw]">
            <p className={fine}>© 2026 Synergy PUF. All Rights Reserved.</p>
            <p className={cn(fine, "flex items-center gap-2")}>
              <Link href="/terms" className="transition-colors hover:text-brand">
                Terms of Service
              </Link>
              <span aria-hidden>|</span>
              <Link href="/privacy" className="transition-colors hover:text-brand">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
