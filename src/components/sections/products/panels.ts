import type { StaticImageData } from "next/image";
import pufWallImage from "../../../../public/Products/Technical Performance/8c628ca0-e188-48f8-bb38-f6391e1f642c.jpg";
import type { PanelType, PerformanceRow } from "./PanelRange";

const VIDEOS = {
  wall1: "/Products/RoofVideo/Wall 1.mp4",
  wall2: "/Products/RoofVideo/Wall 2.mp4",
  wall3: "/Products/RoofVideo/Wall 3.mp4",
  roof: "/Products/RoofVideo/Roof.mp4",
};

// Only each family's Wall Type 1 name comes from the design; the others are placeholders to confirm.
const types = (core: string, wall1Name: string, wall1Image?: StaticImageData): PanelType[] => [
  { tab: "Wall Type 1", label: "Wall Type -1", name: wall1Name, video: VIDEOS.wall1, specsImage: wall1Image },
  { tab: "Wall Type 2", label: "Wall Type -2", name: `${core} Wall Panel`, video: VIDEOS.wall2 },
  { tab: "Wall Type 3", label: "Wall Type -3", name: `${core} Wall Panel`, video: VIDEOS.wall3 },
  { tab: "Roof Panel", label: "Roof Panel", name: `${core} Roof Panel`, video: VIDEOS.roof },
];

type PanelFamily = {
  title: string;
  body: string;
  types: PanelType[];
  performance: [PerformanceRow[], PerformanceRow[]];
  /** Full spec sheet for the "Technical Performance" popup. */
  specs?: PerformanceRow[];
};

// Performance figures are the typical industry values from the design.
export const PUF_PANELS: PanelFamily = {
  title: "PUF Panels",
  body: "Lightweight sandwich panels offering superior thermal insulation for industrial and temperature-controlled spaces.",
  types: types("PUF", "PUF Single Skin Wall Panel", pufWallImage),
  performance: [
    [
      { label: "Core Density", value: "40–42 kg/m³" },
      { label: "Temperature Range", value: "-40°C to +110°C" },
      { label: "Water Vapour Permeability", value: "0.11 gm/hr/m²" },
    ],
    [
      { label: "Thermal Conductivity", value: "0.021 W/m·K" },
      { label: "Water Absorption", value: "< 0.2%" },
      { label: "Fire Performance", value: "Self-extinguishing" },
    ],
  ],
  // From the PUF Wall Panel spec sheet in the design.
  specs: [
    { label: "Panel thickness available", value: "40 mm, 50 mm, 60 mm, 80 mm, 100 mm, 120 mm, 150 mm" },
    { label: "Core density", value: "40 – 42 kg/m³" },
    { label: "Thermal conductivity", value: "0.021 W/m·K" },
    { label: "Temperature range", value: "-40 °C to +110 °C" },
    { label: "Water vapour permeability", value: "0.11 gm/hr/m²" },
    { label: "Water absorption", value: "< 0.2%" },
    { label: "Compressive strength @ 10% deformation", value: "0.11 – 0.21 N/mm²" },
    { label: "Tensile strength", value: "1.1 – 2.5 kg/cm²" },
    { label: "Hot dimensional stability @ 85 ± 2 °C / 100 ± 2 °C for 24 hrs (max)", value: "± 2%" },
    { label: "Cold dimensional stability @ -25 ± 2 °C for 24 hrs (max)", value: "± 2%" },
    { label: "Fire performance", value: "Self-extinguishing" },
    { label: "Type of foam", value: "Polyurethane" },
    { label: "Free from CFC", value: "CFC, HFC & HCFC free" },
  ],
};

export const PIR_PANELS: PanelFamily = {
  title: "PIR Panels",
  body: "High-performance panels offering superior fire resistance and thermal efficiency.",
  types: types("PIR", "PIR Fire-Rated Wall Panel", pufWallImage),
  performance: [
    [
      { label: "Core Density", value: "40–45 kg/m³" },
      { label: "Temperature Range", value: "-60°C to +120°C" },
      { label: "Compressive Strength", value: "> 150 kPa" },
      { label: "Panel Thickness", value: "30–200 mm" },
    ],
    [
      { label: "Thermal Conductivity", value: "< 0.020 W/m·K" },
      { label: "Fire Performance", value: "PIR / EN standard (config. dep.)" },
      { label: "Closed Cell Content", value: "> 90%" },
    ],
  ],
};

// The design paired some of these values with labels copied from the PUF table; labels here match the values.
export const ROCKWOOL_PANELS: PanelFamily = {
  title: "Rockwool Panels",
  body: "Non-combustible mineral wool panels offering Class A1 fire protection and superior acoustic performance.",
  types: types("Rockwool", "Rockwool A1 Wall Panel"),
  performance: [
    [
      { label: "Core Density", value: "100–120 kg/m³" },
      { label: "Temperature Range", value: "Up to 750°C" },
      { label: "Fire Resistance", value: "Up to 4 Hours" },
      { label: "Panel Thickness", value: "50–200 mm" },
    ],
    [
      { label: "Thermal Conductivity", value: "0.040–0.045 W/m·K" },
      { label: "Fire Classification", value: "Non-combustible (Euroclass A1)" },
      { label: "Acoustic Reduction", value: "Up to 35 dB" },
    ],
  ],
};
