import { categories, getCategoryBySlug, type Category } from "./categories";

export type ServiceId =
  | "brand-strategy"
  | "identity-systems"
  | "digital-experiences"
  | "next-gen-innovations";

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  tags: string[];
  /** Slug of the parent category (see src/data/categories.ts). */
  categorySlug: string;
  services: ServiceId[];
  servicesLabel: string;
  client: string;
  industry: string;
  scope: string;
  teamLabel: string;
  heroImage: string;
  thumbnailImage: string;
  gallery: string[];
  carouselImages: string[];
  summary: string;
  summary2: string;
  impactMetrics: string;
  /** Position WITHIN the case study's category (ascending). */
  order: number;
};

// OFFLINE FALLBACK only. Sanity is the source of truth (see
// src/sanity/lib/fetch.ts). Keep in sync with scripts/seed-case-studies.mjs.
// Each case study belongs to a category (categorySlug) and is ordered within it;
// the work grid is derived by buildWorkGrid() below (category card, then its
// studies), which reproduces the Figma diagonal cascade automatically.
export const caseStudies: CaseStudy[] = [
  {
    slug: "oc-navigator",
    title: "OC Resource Navigator",
    subtitle: "Public-interest systems design",
    tag: "Design + Research",
    tags: ["Design + Research", "Design + Research", "Design + Research"],
    categorySlug: "ocean-environment",
    services: ["brand-strategy", "digital-experiences"],
    servicesLabel: "Strategy + Branding +",
    client: "CityLeaks",
    industry: "Culture & Music",
    scope: "Art direction Print design Editorial",
    teamLabel: "Ana Abreu",
    heroImage: "/images/case-studies/detail-hero-family.png",
    thumbnailImage: "/images/case-studies/oc-resource-navigator.png",
    gallery: [
      "/images/case-studies/detail-gallery-2.png",
      "/images/slide-4-surf.jpg",
    ],
    carouselImages: [
      "/images/slide-4-surf.jpg",
      "/images/case-studies/detail-gallery-2.png",
      "/images/case-studies/detail-hero-family.png",
      "/images/case-studies/surf-magazine.png",
      "/images/case-studies/concrete-dreams.png",
      "/images/case-studies/coral-health.png",
      "/images/case-studies/luku-watches.png",
    ],
    summary:
      "DeepSoCal used surf culture to connect California communities with global humanitarian causes. Documentary crews captured community stories that reflected local identity. Influencer partnerships expanded their reach, while community events turned narratives into action.",
    summary2:
      "DeepSoCal used surf culture to connect California communities with global humanitarian causes. Documentary crews captured community stories that reflected local identity. Influencer partnerships expanded their reach, while community events turned narratives into action.",
    impactMetrics:
      "We helped position the U.S. Surf Open as a platform for lasting community connection. Our research-driven storytelling and strategic engagement strengthened ties within California surf culture and secured the brand's presence in the community.",
    order: 1,
  },
  {
    slug: "surf-magazine",
    title: "Surf Magazine",
    subtitle: "Editorial and growth storytelling",
    tag: "Strategy + Content",
    tags: ["Strategy + Content"],
    categorySlug: "ocean-environment",
    services: ["brand-strategy", "identity-systems"],
    servicesLabel: "Strategy + Branding",
    client: "",
    industry: "",
    scope: "",
    teamLabel: "",
    heroImage: "/images/case-studies/surf-magazine.png",
    thumbnailImage: "/images/case-studies/surf-magazine.png",
    gallery: ["/images/case-studies/surf-magazine.png"],
    carouselImages: [],
    summary: "",
    summary2: "",
    impactMetrics: "",
    order: 2,
  },
  {
    slug: "concrete-dreams",
    title: "Concrete Dreams",
    subtitle: "Issue card the landscape, coast, and environmental wellbeing",
    tag: "Brand + Content",
    tags: ["Brand + Content"],
    categorySlug: "ocean-environment",
    services: ["digital-experiences", "next-gen-innovations"],
    servicesLabel: "Strategy + Branding",
    client: "",
    industry: "",
    scope: "",
    teamLabel: "",
    heroImage: "/images/case-studies/concrete-dreams.png",
    thumbnailImage: "/images/case-studies/concrete-dreams.png",
    gallery: ["/images/case-studies/concrete-dreams.png"],
    carouselImages: [],
    summary: "",
    summary2: "",
    impactMetrics: "",
    order: 3,
  },
  {
    slug: "coral-health",
    title: "Coral Health",
    subtitle: "Human-centered growth design",
    tag: "Strategy + Influencers",
    tags: ["Strategy + Influencers"],
    categorySlug: "mental-health",
    services: ["brand-strategy", "digital-experiences"],
    servicesLabel: "Strategy + Branding",
    client: "",
    industry: "",
    scope: "",
    teamLabel: "",
    heroImage: "/images/case-studies/coral-health.png",
    thumbnailImage: "/images/case-studies/coral-health.png",
    gallery: ["/images/case-studies/coral-health.png"],
    carouselImages: [],
    summary: "",
    summary2: "",
    impactMetrics: "",
    order: 1,
  },
  {
    slug: "salt-and-sand",
    title: "Salt & Sand",
    subtitle: "Editorial and growth storytelling",
    tag: "Strategy + Influencers",
    tags: ["Strategy + Influencers"],
    categorySlug: "mental-health",
    services: ["identity-systems", "brand-strategy"],
    servicesLabel: "Strategy + Branding",
    client: "",
    industry: "",
    scope: "",
    teamLabel: "",
    heroImage: "/images/case-studies/salt-and-sand.png",
    thumbnailImage: "/images/case-studies/salt-and-sand.png",
    gallery: ["/images/case-studies/salt-and-sand.png"],
    carouselImages: [],
    summary: "",
    summary2: "",
    impactMetrics: "",
    order: 2,
  },
  {
    slug: "luku-watches",
    title: "Luku Watches",
    subtitle: "Editorial and growth storytelling",
    tag: "Design + Research",
    tags: ["Design + Research"],
    categorySlug: "mental-health",
    services: ["identity-systems", "brand-strategy"],
    servicesLabel: "Strategy + Branding",
    client: "",
    industry: "",
    scope: "",
    teamLabel: "",
    heroImage: "/images/case-studies/luku-watches.png",
    thumbnailImage: "/images/case-studies/luku-watches.png",
    gallery: ["/images/case-studies/luku-watches.png"],
    carouselImages: [],
    summary: "",
    summary2: "",
    impactMetrics: "",
    order: 3,
  },
  {
    slug: "harbor-market",
    title: "Harbor Market",
    subtitle: "Brand and growth for a coastal marketplace",
    tag: "Design + Research",
    tags: ["Design + Research"],
    categorySlug: "local-commerce",
    services: ["brand-strategy", "identity-systems"],
    servicesLabel: "Strategy + Branding",
    client: "",
    industry: "",
    scope: "",
    teamLabel: "",
    heroImage: "/images/case-studies/oc-navigator-2.png",
    thumbnailImage: "/images/case-studies/oc-navigator-2.png",
    gallery: ["/images/case-studies/oc-navigator-2.png"],
    carouselImages: [],
    summary: "",
    summary2: "",
    impactMetrics: "",
    order: 1,
  },
  {
    slug: "press-play",
    title: "Press Play",
    subtitle: "Editorial and growth storytelling",
    tag: "Brand + Content",
    tags: ["Brand + Content"],
    categorySlug: "culture",
    services: ["brand-strategy", "digital-experiences"],
    servicesLabel: "Strategy + Branding",
    client: "",
    industry: "",
    scope: "",
    teamLabel: "",
    heroImage: "/images/case-studies/surf-magazine.png",
    thumbnailImage: "/images/case-studies/surf-magazine.png",
    gallery: ["/images/case-studies/surf-magazine.png"],
    carouselImages: [],
    summary: "",
    summary2: "",
    impactMetrics: "",
    order: 1,
  },
  {
    slug: "tide-line",
    title: "Tide Line",
    subtitle: "Resilience storytelling for coastal communities",
    tag: "Design + Research",
    tags: ["Design + Research"],
    categorySlug: "climate-resilience",
    services: ["brand-strategy", "digital-experiences"],
    servicesLabel: "Strategy + Branding",
    client: "",
    industry: "",
    scope: "",
    teamLabel: "",
    heroImage: "/images/case-studies/coral-health.png",
    thumbnailImage: "/images/case-studies/coral-health.png",
    gallery: ["/images/case-studies/coral-health.png"],
    carouselImages: [],
    summary: "",
    summary2: "",
    impactMetrics: "",
    order: 1,
  },
  {
    slug: "solar-coast",
    title: "Solar Coast",
    subtitle: "Clean-energy brand and growth design",
    tag: "Strategy + Content",
    tags: ["Strategy + Content"],
    categorySlug: "climate-resilience",
    services: ["brand-strategy", "next-gen-innovations"],
    servicesLabel: "Strategy + Branding",
    client: "",
    industry: "",
    scope: "",
    teamLabel: "",
    heroImage: "/images/case-studies/salt-and-sand.png",
    thumbnailImage: "/images/case-studies/salt-and-sand.png",
    gallery: ["/images/case-studies/salt-and-sand.png"],
    carouselImages: [],
    summary: "",
    summary2: "",
    impactMetrics: "",
    order: 2,
  },
  {
    slug: "cocoon-malibu",
    title: "Cocoon Malibu",
    subtitle: "Sustainable hospitality brand design",
    tag: "Design + Research",
    tags: ["Design + Research"],
    categorySlug: "climate-resilience",
    services: ["identity-systems", "brand-strategy"],
    servicesLabel: "Strategy + Branding",
    client: "",
    industry: "",
    scope: "",
    teamLabel: "",
    heroImage: "/images/case-studies/concrete-dreams.png",
    thumbnailImage: "/images/case-studies/concrete-dreams.png",
    gallery: ["/images/case-studies/concrete-dreams.png"],
    carouselImages: [],
    summary: "",
    summary2: "",
    impactMetrics: "",
    order: 3,
  },
  {
    slug: "access-oc",
    title: "Access OC",
    subtitle: "Practical AI tools for local orgs",
    tag: "Design + Research",
    tags: ["Design + Research"],
    categorySlug: "ai-digital-access",
    services: ["next-gen-innovations", "digital-experiences"],
    servicesLabel: "Strategy + Branding",
    client: "",
    industry: "",
    scope: "",
    teamLabel: "",
    heroImage: "/images/case-studies/luku-watches.png",
    thumbnailImage: "/images/case-studies/luku-watches.png",
    gallery: ["/images/case-studies/luku-watches.png"],
    carouselImages: [],
    summary: "",
    summary2: "",
    impactMetrics: "",
    order: 1,
  },
];

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined =>
  caseStudies.find((cs) => cs.slug === slug);

export const getCaseStudiesByService = (serviceId: ServiceId): CaseStudy[] =>
  caseStudies.filter((cs) => cs.services.includes(serviceId));

export const getCaseStudiesByCategory = (categorySlug: string): CaseStudy[] =>
  caseStudies
    .filter((cs) => cs.categorySlug === categorySlug)
    .sort((a, b) => a.order - b.order);

// A flattened work-grid item: either a category card or a case study card.
export type WorkGridItem =
  | { kind: "category"; category: Category }
  | { kind: "caseStudy"; caseStudy: CaseStudy };

/**
 * Build the ordered work-grid list: for each category (by order), emit the
 * category card followed by its case studies (by their within-category order).
 * This reproduces the Figma diagonal cascade without manual global ordering.
 */
export function buildWorkGrid(
  cats: Category[],
  studies: CaseStudy[]
): WorkGridItem[] {
  const sortedCats = [...cats].sort((a, b) => a.order - b.order);
  const knownSlugs = new Set(sortedCats.map((c) => c.slug));
  const items: WorkGridItem[] = [];
  for (const category of sortedCats) {
    items.push({ kind: "category", category });
    const studiesInCat = studies
      .filter((cs) => cs.categorySlug === category.slug)
      .sort((a, b) => a.order - b.order);
    for (const caseStudy of studiesInCat) {
      items.push({ kind: "caseStudy", caseStudy });
    }
  }
  // Never silently drop a study whose category is unset/typo'd — surface it at
  // the end (without a category card) so it's visible and fixable.
  const orphans = studies
    .filter((cs) => !knownSlugs.has(cs.categorySlug))
    .sort((a, b) => a.order - b.order);
  for (const caseStudy of orphans) {
    items.push({ kind: "caseStudy", caseStudy });
  }
  return items;
}

// Re-export so existing imports of category helpers keep working.
export { categories, getCategoryBySlug, type Category };
