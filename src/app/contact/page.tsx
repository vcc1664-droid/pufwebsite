import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { Offices } from "@/components/sections/contact/Offices";

export const metadata: Metadata = {
  title: "Contact | Synergy PUF",
  description: "Share your project details with the Synergy PUF engineering and sales team.",
};

export default function Contact() {
  return (
    <main className="flex-1">
      <ContactHero />
      <ContactForm />
      <Offices />
    </main>
  );
}
