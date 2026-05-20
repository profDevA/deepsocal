import type { EditorialTheme } from "./case-studies";

export type STEEPC =
  | "social"
  | "tech"
  | "economic"
  | "environment"
  | "political"
  | "cultural";

export type SoCalTheme = {
  id: EditorialTheme;
  name: string;
  description: string;
  steepc: STEEPC;
  bgColor: string;
  /** Large photo card shown next to the theme card in the horizontal carousel. */
  carouselImage: string;
  /** Small circular badge/icon image for category cards. */
  badgeImage: string;
  /** Optional background color for the badge circle (used when the badge image is icon-only). */
  iconBgColor?: string;
};

export const socalThemes: SoCalTheme[] = [
  {
    id: "ocean-environment",
    name: "Ocean & Environment",
    description: "Coast, climate, and ecological health",
    steepc: "environment",
    bgColor: "#D9DDD1",
    carouselImage: "/images/themes/ocean-environment.png",
    badgeImage: "/images/badges/ocean-environment.svg",
  },
  {
    id: "mental-health",
    name: "Mental Health Access",
    description: "Care, navigation, community support.",
    steepc: "social",
    bgColor: "#F5E4C6",
    carouselImage: "/images/themes/mental-health.png",
    badgeImage: "/images/badges/mental-health.svg",
  },
  {
    id: "local-commerce",
    name: "Local Commerce",
    description: "Small business growth and resilience.",
    steepc: "economic",
    bgColor: "#F3D4C4",
    carouselImage: "/images/themes/local-commerce.png",
    badgeImage: "/images/badges/local-commerce.svg",
  },
  {
    id: "culture",
    name: "Creative Culture",
    description: "Surf, skate, food, art, fashion",
    steepc: "cultural",
    bgColor: "#DBD3E7",
    carouselImage: "/images/themes/creative-culture.png",
    badgeImage: "/images/badges/creative-culture.svg",
  },
  {
    id: "climate-resilience",
    name: "Climate Resilience",
    description: "Adaptation, recovery, long-term systems.",
    steepc: "environment",
    bgColor: "#D2DAE5",
    carouselImage: "/images/themes/climate-resilience.png",
    badgeImage: "/images/badges/climate-resilience.svg",
  },
  {
    id: "ai-digital-access",
    name: "AI & Digital Access",
    description: "Practical tools for local terms.",
    steepc: "tech",
    bgColor: "#CCDCDB",
    carouselImage: "/images/themes/ai-digital-access.png",
    badgeImage: "/images/badges/ai-digital-access.svg",
    iconBgColor: "#DEE8E9",
  },
];

export const getThemeById = (id: EditorialTheme): SoCalTheme | undefined =>
  socalThemes.find((t) => t.id === id);
