export type STEEPC =
  | "social"
  | "tech"
  | "economic"
  | "environment"
  | "political"
  | "cultural";

export type ServiceId =
  | "brand-strategy"
  | "identity-systems"
  | "digital-experiences"
  | "next-gen-innovations";

export type EditorialTheme =
  | "ocean-environment"
  | "mental-health"
  | "local-commerce"
  | "culture"
  | "climate-resilience"
  | "ai-digital-access";

export type TeamMember = {
  name: string;
  role: string;
  avatar: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  tags: string[];
  category: STEEPC;
  editorialTheme: EditorialTheme;
  services: ServiceId[];
  servicesLabel: string;
  client: string;
  industry: string;
  scope: string;
  teamLabel: string;
  heroImage: string;
  thumbnailImage: string;
  gallery: string[];
  videoPoster: string;
  team: TeamMember[];
  summary: string;
  summary2: string;
  impactMetrics: string;
  description: string;
  order: number;
  publishedAt: string;
};

const placeholderSummary =
  "DeepSoCal used surf culture to connect California communities with global humanitarian causes. Documentary crews captured community stories that reflected local identity. Influencer partnerships expanded their reach, while community events turned narratives into action.";

const placeholderImpact =
  "We helped position the U.S. Surf Open as a platform for lasting community connection. Our research-driven storytelling and strategic engagement strengthened ties within California surf culture and secured the brand's presence in the community.";

// Seed data — replace with real content from Fas + Israel
const seed = (overrides: Partial<CaseStudy>): CaseStudy => ({
  slug: "tbd",
  title: "TBD",
  subtitle: "TBD",
  tag: "TBD",
  tags: ["DESIGN + RESEARCH", "DESIGN + RESEARCH", "DESIGN + RESEARCH"],
  category: "cultural",
  editorialTheme: "culture",
  services: [],
  servicesLabel: "Strategy + Branding",
  client: "CityLeaks",
  industry: "Culture & Music",
  scope: "Art direction, Print design, Editorial",
  teamLabel: "Ana Abreu",
  heroImage: "",
  thumbnailImage: "",
  gallery: [],
  videoPoster: "",
  team: [],
  summary: placeholderSummary,
  summary2: placeholderSummary,
  impactMetrics: placeholderImpact,
  description: "",
  order: 1,
  publishedAt: "2026-01-01",
  ...overrides,
});

export const caseStudies: CaseStudy[] = [
  // --- Category 1: Ocean & Environment ---
  seed({
    slug: "ocean-environment",
    title: "Ocean & Environment",
    subtitle: "The landscape, coast, and environmental wellbeing we design within",
    tag: "Theme",
    category: "environment",
    editorialTheme: "ocean-environment",
    services: ["brand-strategy", "identity-systems"],
    order: 1,
  }),
  seed({
    slug: "oc-navigator",
    title: "OC Resource Navigator",
    subtitle: "Public-interest systems design",
    tag: "Design + Research",
    tags: ["DESIGN + RESEARCH", "SYSTEMS DESIGN"],
    category: "cultural",
    editorialTheme: "culture",
    services: ["brand-strategy", "digital-experiences"],
    client: "Orange County Health Care Agency",
    industry: "Public Sector",
    scope: "Strategy, UX research, design systems",
    teamLabel: "Ana Abreu, Sam Carter",
    servicesLabel: "Strategy + Design + Research",
    thumbnailImage: "/images/case-studies/oc-navigator.png",
    heroImage: "/images/case-studies/oc-navigator.png",
    gallery: [
      "/images/oc-resource-navigator.png",
      "/images/slide-3-ocnavigator.jpg",
      "/images/oc-links.png",
    ],
    order: 2,
  }),
  seed({
    slug: "surf-magazine",
    title: "Surf Magazine",
    subtitle: "Editorial and growth storytelling",
    tag: "Strategy + Content",
    category: "cultural",
    editorialTheme: "ocean-environment",
    services: ["brand-strategy", "identity-systems"],
    thumbnailImage: "/images/case-studies/surf-magazine.png",
    heroImage: "/images/case-studies/surf-magazine.png",
    gallery: [
      "/images/works/surfer-1.jpg",
      "/images/works/surfer-2.jpg",
      "/images/works/surfer-3.jpg",
    ],
    order: 3,
  }),
  // --- Category 2: Mental Health Access ---
  seed({
    slug: "concrete-dreams",
    title: "Concrete Dreams",
    subtitle: "Issue card the landscape, coast, and environmental wellbeing",
    tag: "Brand + Content",
    category: "tech",
    editorialTheme: "ocean-environment",
    services: ["digital-experiences", "next-gen-innovations"],
    thumbnailImage: "/images/case-studies/concrete-dreams.png",
    heroImage: "/images/case-studies/concrete-dreams.png",
    order: 4,
  }),
  seed({
    slug: "mental-health-access",
    title: "Mental Health Access",
    subtitle: "Research, care, and transformation designing better pathways to healing",
    tag: "Theme",
    category: "social",
    editorialTheme: "mental-health",
    services: ["digital-experiences"],
    order: 5,
  }),
  seed({
    slug: "coral-health",
    title: "Coral Health",
    subtitle: "Human-centered growth design",
    tag: "Strategy + Influencers",
    category: "social",
    editorialTheme: "mental-health",
    services: ["brand-strategy", "digital-experiences"],
    thumbnailImage: "/images/case-studies/coral-health.png",
    heroImage: "/images/case-studies/coral-health.png",
    order: 6,
  }),
  // --- Category 3: Local Commerce ---
  seed({
    slug: "local-commerce",
    title: "Local Commerce",
    subtitle: "For entrepreneurs and community-rooted brands building something real",
    tag: "Theme",
    category: "economic",
    editorialTheme: "local-commerce",
    services: ["brand-strategy"],
    order: 7,
  }),
  seed({
    slug: "salt-and-sand",
    title: "Salt & Sand",
    subtitle: "Editorial and growth storytelling",
    tag: "Brand + Content",
    category: "economic",
    editorialTheme: "local-commerce",
    services: ["identity-systems", "brand-strategy"],
    thumbnailImage: "/images/case-studies/salt-and-sand.png",
    heroImage: "/images/case-studies/salt-and-sand.png",
    order: 8,
  }),
  seed({
    slug: "luku-watches",
    title: "Luku Watches",
    subtitle: "Editorial and growth storytelling",
    tag: "Brand + Content",
    category: "economic",
    editorialTheme: "local-commerce",
    services: ["identity-systems", "brand-strategy"],
    thumbnailImage: "/images/case-studies/luku-watches.png",
    heroImage: "/images/case-studies/luku-watches.png",
    order: 9,
  }),
  // --- Category 4: Creative Culture ---
  seed({
    slug: "creative-culture",
    title: "Creative Culture",
    subtitle: "Social innovation, community wellbeing, and the stories worth telling",
    tag: "Theme",
    category: "cultural",
    editorialTheme: "culture",
    services: ["brand-strategy", "identity-systems"],
    order: 10,
  }),
  seed({
    slug: "oc-navigator-2",
    title: "OC Navigator",
    subtitle: "Editorial and growth storytelling",
    tag: "Brand + Content",
    category: "cultural",
    editorialTheme: "culture",
    services: ["brand-strategy", "digital-experiences"],
    thumbnailImage: "/images/case-studies/oc-navigator-2.png",
    heroImage: "/images/case-studies/oc-navigator-2.png",
    order: 11,
  }),
  // --- Category 5: Climate Resilience ---
  seed({
    slug: "climate-resilience",
    title: "Climate Resilience",
    subtitle: "Social innovation, community wellbeing, and the stories worth telling",
    tag: "Theme",
    category: "environment",
    editorialTheme: "climate-resilience",
    services: ["next-gen-innovations"],
    order: 12,
  }),
];

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined =>
  caseStudies.find((cs) => cs.slug === slug);

export const getNextCaseStudy = (currentOrder: number): CaseStudy | undefined => {
  if (caseStudies.length === 0) return undefined;
  const sorted = [...caseStudies].sort((a, b) => a.order - b.order);
  const idx = sorted.findIndex((cs) => cs.order === currentOrder);
  if (idx === -1) return undefined;
  return sorted[(idx + 1) % sorted.length];
};

export const getPreviousCaseStudy = (currentOrder: number): CaseStudy | undefined => {
  if (caseStudies.length === 0) return undefined;
  const sorted = [...caseStudies].sort((a, b) => a.order - b.order);
  const idx = sorted.findIndex((cs) => cs.order === currentOrder);
  if (idx === -1) return undefined;
  return sorted[(idx - 1 + sorted.length) % sorted.length];
};

export const getCaseStudiesByService = (serviceId: ServiceId): CaseStudy[] =>
  caseStudies.filter((cs) => cs.services.includes(serviceId));

export const getCaseStudiesByTheme = (theme: EditorialTheme): CaseStudy[] =>
  caseStudies.filter((cs) => cs.editorialTheme === theme);
