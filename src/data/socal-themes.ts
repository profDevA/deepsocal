import type { EditorialTheme, STEEPC } from "./case-studies";

export type SoCalTheme = {
  id: EditorialTheme;
  name: string;
  description: string;
  steepc: STEEPC;
  bgColor: string;
  image: string;
};

export const socalThemes: SoCalTheme[] = [
  {
    id: "ocean-environment",
    name: "Ocean & Environment",
    description: "Coast, climate, and ecological health",
    steepc: "environment",
    bgColor: "#D9DDD1",
    image: "/img/themes/ocean.jpg",
  },
  {
    id: "mental-health",
    name: "Mental Health Access",
    description: "Care, navigation, community support.",
    steepc: "social",
    bgColor: "#F5B086",
    image: "/img/themes/mental-health.jpg",
  },
  {
    id: "local-commerce",
    name: "Local Commerce",
    description: "Small business growth and resilience.",
    steepc: "economic",
    bgColor: "#F3D4C4",
    image: "/img/themes/local-commerce.jpg",
  },
  {
    id: "culture",
    name: "Creative Culture",
    description: "Surf, skate, food, art, fashion",
    steepc: "cultural",
    bgColor: "#DBD3E7",
    image: "/img/themes/culture.jpg",
  },
  {
    id: "climate-resilience",
    name: "Climate Resilience",
    description: "Climate adaptation across SoCal.",
    steepc: "environment",
    bgColor: "#D2DAE5",
    image: "/img/themes/climate.jpg",
  },
  {
    id: "ai-digital-access",
    name: "AI & Digital Access",
    description: "Practical tools for local terms.",
    steepc: "tech",
    bgColor: "#CCDCDB",
    image: "/img/themes/digital-access.jpg",
  },
];

export const getThemeById = (id: EditorialTheme): SoCalTheme | undefined =>
  socalThemes.find((t) => t.id === id);
