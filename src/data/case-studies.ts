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

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  tags: string[];
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
  carouselImages: string[];
  summary: string;
  summary2: string;
  impactMetrics: string;
  order: number;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "ocean-environment",
    title: "Ocean & Environment",
    subtitle: "The landscape, coast, and environmental wellbeing we design within",
    tag: "Theme",
    tags: [],
    editorialTheme: "ocean-environment",
    services: ["brand-strategy", "identity-systems"],
    servicesLabel: "",
    client: "",
    industry: "",
    scope: "",
    teamLabel: "",
    heroImage: "",
    thumbnailImage: "",
    gallery: [],
    carouselImages: [],
    summary: "",
    summary2: "",
    impactMetrics: "",
    order: 1,
  },
  {
    slug: "oc-navigator",
    title: "OC Resource Navigator",
    subtitle: "Public-interest systems design",
    tag: "Design + Research",
    tags: ["DESIGN + RESEARCH", "DESIGN + RESEARCH", "DESIGN + RESEARCH"],
    editorialTheme: "culture",
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
    order: 2,
  },
  {
    slug: "surf-magazine",
    title: "Surf Magazine",
    subtitle: "Editorial and growth storytelling",
    tag: "Strategy + Content",
    tags: ["STRATEGY + CONTENT"],
    editorialTheme: "ocean-environment",
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
    order: 3,
  },
  {
    slug: "concrete-dreams",
    title: "Concrete Dreams",
    subtitle: "Issue card the landscape, coast, and environmental wellbeing",
    tag: "Brand + Content",
    tags: ["BRAND + CONTENT"],
    editorialTheme: "ocean-environment",
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
    order: 4,
  },
  {
    slug: "mental-health-access",
    title: "Mental Health Access",
    subtitle: "Research, care, and transformation designing better pathways to healing",
    tag: "Theme",
    tags: [],
    editorialTheme: "mental-health",
    services: ["digital-experiences"],
    servicesLabel: "",
    client: "",
    industry: "",
    scope: "",
    teamLabel: "",
    heroImage: "",
    thumbnailImage: "",
    gallery: [],
    carouselImages: [],
    summary: "",
    summary2: "",
    impactMetrics: "",
    order: 5,
  },
  {
    slug: "coral-health",
    title: "Coral Health",
    subtitle: "Human-centered growth design",
    tag: "Strategy + Influencers",
    tags: ["STRATEGY + INFLUENCERS"],
    editorialTheme: "mental-health",
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
    order: 6,
  },
  {
    slug: "local-commerce",
    title: "Local Commerce",
    subtitle: "For entrepreneurs and community-rooted brands building something real",
    tag: "Theme",
    tags: [],
    editorialTheme: "local-commerce",
    services: ["brand-strategy"],
    servicesLabel: "",
    client: "",
    industry: "",
    scope: "",
    teamLabel: "",
    heroImage: "",
    thumbnailImage: "",
    gallery: [],
    carouselImages: [],
    summary: "",
    summary2: "",
    impactMetrics: "",
    order: 7,
  },
  {
    slug: "salt-and-sand",
    title: "Salt & Sand",
    subtitle: "Editorial and growth storytelling",
    tag: "Brand + Content",
    tags: ["BRAND + CONTENT"],
    editorialTheme: "local-commerce",
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
    order: 8,
  },
  {
    slug: "luku-watches",
    title: "Luku Watches",
    subtitle: "Editorial and growth storytelling",
    tag: "Brand + Content",
    tags: ["BRAND + CONTENT"],
    editorialTheme: "local-commerce",
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
    order: 9,
  },
  {
    slug: "creative-culture",
    title: "Creative Culture",
    subtitle: "Social innovation, community wellbeing, and the stories worth telling",
    tag: "Theme",
    tags: [],
    editorialTheme: "culture",
    services: ["brand-strategy", "identity-systems"],
    servicesLabel: "",
    client: "",
    industry: "",
    scope: "",
    teamLabel: "",
    heroImage: "",
    thumbnailImage: "",
    gallery: [],
    carouselImages: [],
    summary: "",
    summary2: "",
    impactMetrics: "",
    order: 10,
  },
  {
    slug: "oc-navigator-2",
    title: "OC Navigator",
    subtitle: "Editorial and growth storytelling",
    tag: "Brand + Content",
    tags: ["BRAND + CONTENT"],
    editorialTheme: "culture",
    services: ["brand-strategy", "digital-experiences"],
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
    order: 11,
  },
  {
    slug: "climate-resilience",
    title: "Climate Resilience",
    subtitle: "Social innovation, community wellbeing, and the stories worth telling",
    tag: "Theme",
    tags: [],
    editorialTheme: "climate-resilience",
    services: ["next-gen-innovations"],
    servicesLabel: "",
    client: "",
    industry: "",
    scope: "",
    teamLabel: "",
    heroImage: "",
    thumbnailImage: "",
    gallery: [],
    carouselImages: [],
    summary: "",
    summary2: "",
    impactMetrics: "",
    order: 12,
  },
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
