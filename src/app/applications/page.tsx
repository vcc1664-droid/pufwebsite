import type { Metadata } from "next";
import { SectorServices } from "@/components/sections/applications/SectorServices";
import { SpaceDemands } from "@/components/sections/applications/SpaceDemands";
import { StartingPoint } from "@/components/sections/applications/StartingPoint";
import { HighlightsMedia } from "@/components/sections/HighlightsMedia";
import { LetsTalk } from "@/components/sections/LetsTalk";
import { PageIntro } from "@/components/sections/PageIntro";
import { PROJECT_CONDITION_ITEMS, TrustStrip } from "@/components/sections/TrustStrip";
import loadingDocksImage from "../../../public/Applications/WhatsApp Image 2026-11-04 at 17.55.56-100kb.jpeg";

export const metadata: Metadata = {
  title: "Applications | Synergy PUF",
  description: "High density PUF insulated panels for India's industrial and commercial infrastructure.",
};

export default function Applications() {
  return (
    <main className="flex-1">
      <PageIntro
        title={
          <>
            High Density <br />
            PUF Insulated Panels
          </>
        }
        body="Roofing, wall and cold storage panels engineered for India's industrial and commercial infrastructure."
        bodyOffsetClassName="lg:ml-[38%] lg:max-w-[30em]"
      />
      <HighlightsMedia
        items={[
          "Precision Cold Room & Thermal Enclosures",
          "Certified Fire Safety & Rigid Insulation",
          "Rapid Pan-India Manufacturing & Logistics",
        ]}
        image={{ src: loadingDocksImage, alt: "Insulated warehouse with trucks parked at the loading docks" }}
        listClassName="lg:w-[32%]"
        imageClassName="lg:w-[61.6%]"
        aspectClassName="aspect-[413/226]"
        priority
      />
      <SpaceDemands />
      <StartingPoint />
      <SectorServices />
      <TrustStrip
        title="Start with your project conditions."
        items={PROJECT_CONDITION_ITEMS}
        iconTone="light"
      />
      <LetsTalk
        title="Need panel help?"
        titleClassName="font-normal"
        body="Share your temperature, sector and area. Our engineers can recommend a system and prepare a quote."
        bodyClassName="max-w-[37em]"
      />
    </main>
  );
}
