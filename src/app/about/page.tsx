import type { Metadata } from "next";
import { AboutImage } from "@/components/sections/about/AboutImage";
import { AboutStats } from "@/components/sections/about/AboutStats";
import { BuildingStory } from "@/components/sections/about/BuildingStory";
import { Manufacturing } from "@/components/sections/about/Manufacturing";
import { Milestones } from "@/components/sections/about/Milestones";
import { Mission } from "@/components/sections/about/Mission";
import { LetsTalk } from "@/components/sections/LetsTalk";
import { PageIntro } from "@/components/sections/PageIntro";

export const metadata: Metadata = {
  title: "About | Synergy PUF",
  description: "The people and process behind Synergy PUF insulated panels.",
};

export default function About() {
  return (
    <main className="flex-1">
      <PageIntro
        title="The People and Process Behind the Panels."
        titleClassName="font-sans text-[30px] leading-[1.3] font-normal tracking-normal text-[#171717] lg:text-[50.1815px] lg:leading-[65.2359px]"
        body="Industrial insulation expertise. A company built around your project. Delivering reliable solutions with precision, performance, and quality you can trust."
      />
      <AboutImage />
      <BuildingStory />
      <Milestones />
      <Manufacturing />
      <AboutStats />
      <Mission />
      {/* Same heading style as the rest of this page; white on the purple band. The ! overrides LetsTalk's own leading and tracking. */}
      <LetsTalk titleClassName="font-normal! tracking-normal! leading-[1.3]! lg:leading-[65.2359px]!" />
    </main>
  );
}
