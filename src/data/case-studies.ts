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
  category: STEEPC;
  editorialTheme: EditorialTheme;
  services: ServiceId[];
  heroImage: string;
  thumbnailImage: string;
  gallery: string[];
  team: TeamMember[];
  summary: string;
  description: string;
  order: number;
  publishedAt: string;
};

export const caseStudies: CaseStudy[] = [];

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined =>
  caseStudies.find((cs) => cs.slug === slug);

export const getNextCaseStudy = (currentOrder: number): CaseStudy | undefined => {
  if (caseStudies.length === 0) return undefined;
  return (
    caseStudies.find((cs) => cs.order === currentOrder + 1) ?? caseStudies[0]
  );
};

export const getCaseStudiesByService = (serviceId: ServiceId): CaseStudy[] =>
  caseStudies.filter((cs) => cs.services.includes(serviceId));

export const getCaseStudiesByTheme = (theme: EditorialTheme): CaseStudy[] =>
  caseStudies.filter((cs) => cs.editorialTheme === theme);
