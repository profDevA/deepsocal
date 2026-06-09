export type STEEPC =
  | "social"
  | "tech"
  | "economic"
  | "environment"
  | "political"
  | "cultural";

export type Category = {
  /** Stable id / slug, e.g. "ocean-environment". */
  slug: string;
  name: string;
  /** Long line shown on the category card in the work grid. */
  subtitle: string;
  /** Short line shown next to the theme card in the WhyAreWeDifferent carousel. */
  description: string;
  steepc: STEEPC;
  bgColor: string;
  /** Large photo card shown next to the theme card in the carousel. */
  carouselImage: string;
  /** Circular badge/icon image for the category card. */
  badgeImage: string;
  order: number;
};

// OFFLINE FALLBACK only. Sanity is the source of truth (see
// src/sanity/lib/fetch.ts -> fetchCategories). Keep in sync with
// scripts/seed-categories.mjs.
export const categories: Category[] = [
  {
    slug: "ocean-environment",
    name: "Ocean & Environment",
    subtitle: "The landscape, coast, and environmental wellbeing we design within",
    description: "Coast, climate, and ecological health",
    steepc: "environment",
    bgColor: "#D9DDD1",
    carouselImage: "/images/themes/ocean-environment.png",
    badgeImage: "/images/badges/ocean-environment.svg",
    order: 1,
  },
  {
    slug: "mental-health",
    name: "Mental Health Access",
    subtitle: "Research, care, and transformation designing better pathways to healing",
    description: "Care, navigation, community support.",
    steepc: "social",
    bgColor: "#F5E4C6",
    carouselImage: "/images/themes/mental-health.png",
    badgeImage: "/images/badges/mental-health.svg",
    order: 2,
  },
  {
    slug: "local-commerce",
    name: "Local Commerce",
    subtitle: "For entrepreneurs and community-rooted brands building something real",
    description: "Small business growth and resilience.",
    steepc: "economic",
    bgColor: "#F3D4C4",
    carouselImage: "/images/themes/local-commerce.png",
    badgeImage: "/images/badges/local-commerce.svg",
    order: 3,
  },
  {
    slug: "culture",
    name: "Creative Culture",
    subtitle: "Social innovation, community wellbeing, and the stories worth telling",
    description: "Surf, skate, food, art, fashion",
    steepc: "cultural",
    bgColor: "#DBD3E7",
    carouselImage: "/images/themes/creative-culture.png",
    badgeImage: "/images/badges/creative-culture.svg",
    order: 4,
  },
  {
    slug: "climate-resilience",
    name: "Climate Resilience",
    subtitle: "Social innovation, community wellbeing, and the stories worth telling",
    description: "Adaptation, recovery, long-term systems.",
    steepc: "environment",
    bgColor: "#D2DAE5",
    carouselImage: "/images/themes/climate-resilience.png",
    badgeImage: "/images/badges/climate-resilience.svg",
    order: 5,
  },
  {
    slug: "ai-digital-access",
    name: "AI & Digital Access",
    subtitle: "Social innovation, community wellbeing, and the stories worth telling",
    description: "Practical tools for local terms.",
    steepc: "tech",
    bgColor: "#CCDCDB",
    carouselImage: "/images/themes/ai-digital-access.png",
    badgeImage: "/images/badges/ai-digital-access.svg",
    order: 6,
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined =>
  categories.find((c) => c.slug === slug);
