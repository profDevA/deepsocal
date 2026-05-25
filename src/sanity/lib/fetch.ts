import { client } from "./client";
import type { CaseStudy, ServiceId } from "@/data/case-studies";
import {
  ALL_CASE_STUDIES_QUERY,
  CASE_STUDY_BY_SLUG_QUERY,
  CASE_STUDY_SLUGS_QUERY,
  CASE_STUDIES_BY_SERVICE_QUERY,
} from "./queries";

type SanityCaseStudy = CaseStudy & { _id: string };

export async function fetchAllCaseStudies(): Promise<CaseStudy[]> {
  const results: SanityCaseStudy[] = await client.fetch(ALL_CASE_STUDIES_QUERY);
  return results.map(normalizeCaseStudy);
}

export async function fetchCaseStudyBySlug(
  slug: string
): Promise<CaseStudy | undefined> {
  const result: SanityCaseStudy | null = await client.fetch(
    CASE_STUDY_BY_SLUG_QUERY,
    { slug }
  );
  return result ? normalizeCaseStudy(result) : undefined;
}

export async function fetchCaseStudySlugs(): Promise<string[]> {
  const results: { slug: string }[] = await client.fetch(CASE_STUDY_SLUGS_QUERY);
  return results.map((r) => r.slug);
}

export async function fetchCaseStudiesByService(
  serviceId: ServiceId
): Promise<CaseStudy[]> {
  const results: SanityCaseStudy[] = await client.fetch(
    CASE_STUDIES_BY_SERVICE_QUERY,
    { serviceId }
  );
  return results.map(normalizeCaseStudy);
}

/** Cap Sanity CDN images so Next.js optimizer doesn't time out on huge originals. */
function capImageUrl(url: string | undefined | null, maxWidth = 1920): string {
  if (!url) return "";
  if (url.startsWith("https://cdn.sanity.io/")) {
    return `${url}?w=${maxWidth}&q=80&auto=format`;
  }
  return url;
}

function normalizeCaseStudy(raw: SanityCaseStudy): CaseStudy {
  return {
    slug: raw.slug ?? "",
    title: raw.title ?? "",
    subtitle: raw.subtitle ?? "",
    tag: raw.tag ?? "",
    tags: raw.tags ?? [],
    editorialTheme: raw.editorialTheme ?? "ocean-environment",
    services: raw.services ?? [],
    servicesLabel: raw.servicesLabel ?? "",
    client: raw.client ?? "",
    industry: raw.industry ?? "",
    scope: raw.scope ?? "",
    teamLabel: raw.teamLabel ?? "",
    heroImage: capImageUrl(raw.heroImage),
    thumbnailImage: capImageUrl(raw.thumbnailImage),
    gallery: (raw.gallery ?? []).map((url) => capImageUrl(url)),
    carouselImages: (raw.carouselImages ?? []).map((url) => capImageUrl(url)),
    summary: raw.summary ?? "",
    summary2: raw.summary2 ?? "",
    impactMetrics: raw.impactMetrics ?? "",
    order: raw.order ?? 0,
  };
}
