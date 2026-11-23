import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/sections/PageIntro";
import { type LegalSection, LegalSections } from "@/components/sections/legal/LegalSections";

export const metadata: Metadata = {
  title: "Cookie Policy | Synergy PUF",
  description: "Information about cookie usage and tracking policies on the Synergy PUF website.",
};

const SECTIONS: LegalSection[] = [
  {
    title: "Our cookie philosophy",
    body: (
      <p>
        At Synergy PUF, we respect your privacy. This website is designed to be informative and
        functional without tracking you across the web. We do not use third-party advertising cookies
        or sell your browsing habits.
      </p>
    ),
  },
  {
    title: "Essential technical cookies",
    body: (
      <p>
        Our website may use strictly necessary cookies or session tokens solely to ensure that the site
        operates securely, loads quickly, and retains essential preferences during your visit. These
        do not track personal information across third-party websites.
      </p>
    ),
  },
  {
    title: "Analytics and third-party links",
    body: (
      <p>
        We do not employ intrusive analytics or surveillance scripts. When you click external links to
        our partners, WhatsApp, or social media pages, those third-party services operate under their
        own cookie and privacy terms.
      </p>
    ),
  },
  {
    title: "Managing cookie settings",
    body: (
      <p id="settings">
        You can control or disable cookies through your web browser settings at any time. For more
        details about how we protect your personal data, please read our{" "}
        <Link href="/privacy" className="text-brand hover:underline font-medium">
          Privacy Policy
        </Link>
        .
      </p>
    ),
  },
];

export default function CookiePolicy() {
  return (
    <main className="flex-1">
      <PageIntro title="Cookie Policy" aside="Last updated" body="November 2026" />
      <LegalSections sections={SECTIONS} />
    </main>
  );
}
