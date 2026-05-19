import type { EditorialTheme, STEEPC } from "./case-studies";

export type SoCalTheme = {
  id: EditorialTheme;
  name: string;
  description: string;
  steepc: STEEPC;
  bgColor: string;
  /** Large photo card shown next to the theme card in the horizontal carousel. */
  carouselImage: string;
};

export const socalThemes: SoCalTheme[] = [
  {
    id: "ocean-environment",
    name: "Ocean & Environment",
    description: "Coast, climate, and ecological health",
    steepc: "environment",
    bgColor: "#D9DDD1",
    carouselImage: "/images/slide-4-surf.jpg",
  },
  {
    id: "mental-health",
    name: "Mental Health Access",
    description: "Care, navigation, community support.",
    steepc: "social",
    bgColor: "#F5E4C6",
    carouselImage: "/images/case-studies/coral-health.png",
  },
  {
    id: "local-commerce",
    name: "Local Commerce",
    description: "Small business growth and resilience.",
    steepc: "economic",
    bgColor: "#F3D4C4",
    carouselImage: "/images/about/community.png",
  },
  {
    id: "culture",
    name: "Creative Culture",
    description: "Surf, skate, food, art, fashion",
    steepc: "cultural",
    bgColor: "#DBD3E7",
    carouselImage: "/images/works/surfer-3.jpg",
  },
  {
    id: "climate-resilience",
    name: "Climate Resilience",
    description: "Climate adaptation across SoCal.",
    steepc: "environment",
    bgColor: "#D2DAE5",
    carouselImage: "/images/case-studies/concrete-dreams.png",
  },
  {
    id: "ai-digital-access",
    name: "AI & Digital Access",
    description: "Practical tools for local terms.",
    steepc: "tech",
    bgColor: "#CCDCDB",
    carouselImage: "/images/case-studies/surf-magazine.png",
  },
];

export const getThemeById = (id: EditorialTheme): SoCalTheme | undefined =>
  socalThemes.find((t) => t.id === id);
