import type { EditorialTheme, STEEPC } from "./case-studies";

export type SoCalTheme = {
  id: EditorialTheme;
  name: string;
  description: string;
  steepc: STEEPC;
  image: string;
};

export const socalThemes: SoCalTheme[] = [
  {
    id: "ocean-environment",
    name: "Ocean & Environment",
    description: "Coast, climate, and ecological health",
    steepc: "environment",
    image: "/img/themes/ocean.jpg",
  },
  {
    id: "mental-health",
    name: "Mental Health Access",
    description:
      "Research, care, and transformative design building better pathways to healing",
    steepc: "social",
    image: "/img/themes/mental-health.jpg",
  },
  {
    id: "local-commerce",
    name: "Local Commerce",
    description:
      "For entrepreneurs and community-rooted brands building with purpose",
    steepc: "economic",
    image: "/img/themes/local-commerce.jpg",
  },
  {
    id: "culture",
    name: "Culture",
    description: "TBD",
    steepc: "cultural",
    image: "/img/themes/culture.jpg",
  },
  {
    id: "climate-resilience",
    name: "Climate Resilience",
    description: "TBD",
    steepc: "environment",
    image: "/img/themes/climate.jpg",
  },
  {
    id: "ai-digital-access",
    name: "AI & Digital Access",
    description: "TBD",
    steepc: "tech",
    image: "/img/themes/digital-access.jpg",
  },
];

export const getThemeById = (id: EditorialTheme): SoCalTheme | undefined =>
  socalThemes.find((t) => t.id === id);
