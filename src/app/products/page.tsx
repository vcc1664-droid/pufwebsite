import type { Metadata } from "next";
import { LetsTalk } from "@/components/sections/LetsTalk";
import { PageIntro } from "@/components/sections/PageIntro";
import { ManufacturingStrengths } from "@/components/sections/products/ManufacturingStrengths";
import { PanelJoints } from "@/components/sections/products/PanelJoints";
import { PanelRange } from "@/components/sections/products/PanelRange";
import { PIR_PANELS, PUF_PANELS } from "@/components/sections/products/panels";
import { ProductShowcase } from "@/components/sections/products/ProductShowcase";

export const metadata: Metadata = {
  title: "Products | Synergy PUF",
  description: "PUF, PIR and Rockwool insulated panels for roofs, walls and cold rooms.",
};

export default function Products() {
  return (
    <main className="flex-1">
      <PageIntro
        title={
          <>
            The right panel. <br />A stronger build.
          </>
        }
        aside="Our Products"
        asideClassName="lg:w-[67.2%]"
        body="Roof, wall, cold storage and cleanroom panel systems."
      />
      <ProductShowcase />
      <PanelRange tone="dark" roundedTop {...PUF_PANELS} />
      <PanelRange {...PIR_PANELS} />
      <PanelJoints />
      <ManufacturingStrengths />
      <LetsTalk
        title="Discuss Your Project?"
        titleClassName="font-normal"
        body="Share your project requirements with our team, discuss your ideas and let’s bring your vision to life with innovative solutions tailored to your needs."
        bodyClassName="max-w-[39.5em]"
      />
    </main>
  );
}
