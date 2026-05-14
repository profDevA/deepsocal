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
  seed({
    slug: "oc-navigator",
    title: "OC Resource Navigator",
    subtitle: "Public-interest systems design",
    tag: "Brand + Content",
    tags: ["DESIGN + RESEARCH", "BRAND + CONTENT", "SYSTEMS DESIGN"],
    category: "cultural",
    editorialTheme: "culture",
    client: "Orange County Health Care Agency",
    industry: "Public Sector",
    scope: "Strategy, UX research, design systems",
    teamLabel: "Ana Abreu, Sam Carter",
    servicesLabel: "Strategy + Design + Research",
    order: 1,
  }),
  seed({ slug: "surf-magazine", title: "Surf Magazine", subtitle: "Editorial design", tag: "Brand + Editorial", category: "cultural", editorialTheme: "ocean-environment", order: 2 }),
  seed({ slug: "concrete-insights", title: "Concrete Insights", subtitle: "Research synthesis", tag: "Research", category: "tech", editorialTheme: "ai-digital-access", order: 3 }),
  seed({ slug: "coral-health", title: "Coral Health", subtitle: "Pathways to care, designed", tag: "Strategy + Design", category: "social", editorialTheme: "mental-health", order: 4 }),
  seed({ slug: "mental-health-access", title: "Mental Health Access", subtitle: "Care, navigation, community", tag: "Service Design", category: "social", editorialTheme: "mental-health", order: 5 }),
  seed({ slug: "salt-and-sand", title: "Salt & Sand", subtitle: "Coastal commerce identity", tag: "Brand", category: "economic", editorialTheme: "local-commerce", order: 6 }),
  seed({ slug: "land-watchers", title: "Land Watchers", subtitle: "Climate platform & app", tag: "Product + Design", category: "environment", editorialTheme: "climate-resilience", order: 7 }),
  seed({ slug: "creative-culture", title: "Creative Culture", subtitle: "Surf, skate, art, fashion", tag: "Brand + Content", category: "cultural", editorialTheme: "culture", order: 8 }),
  seed({ slug: "local-commerce", title: "Local Commerce", subtitle: "Small business growth", tag: "Strategy", category: "economic", editorialTheme: "local-commerce", order: 9 }),
  seed({ slug: "oc-navigator-2", title: "DC Navigator", subtitle: "Brand + content system", tag: "Brand + Content", category: "cultural", editorialTheme: "culture", order: 10 }),
  seed({ slug: "climate-resilience", title: "Climate Resilience", subtitle: "Adaptation across SoCal", tag: "Research + Design", category: "environment", editorialTheme: "climate-resilience", order: 11 }),
  seed({ slug: "ai-digital-access", title: "AI & Digital Access", subtitle: "Practical local tools", tag: "Tech", category: "tech", editorialTheme: "ai-digital-access", order: 12 }),
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
