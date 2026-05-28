import { client } from "./client";
import {
  caseStudies as localCaseStudies,
  getCaseStudyBySlug as localGetBySlug,
  getCaseStudiesByService as localGetByService,
  type CaseStudy,
  type ServiceId,
} from "@/data/case-studies";
import {
  ALL_CASE_STUDIES_QUERY,
  CASE_STUDY_BY_SLUG_QUERY,
  CASE_STUDY_SLUGS_QUERY,
  CASE_STUDIES_BY_SERVICE_QUERY,
} from "./queries";

type SanityCaseStudy = CaseStudy & { _id: string };

const REVALIDATE = { next: { revalidate: 30 } } as const;

// If Sanity is unreachable (network, VPN, outage) we degrade to the local
// `src/data/case-studies.ts` snapshot so the site keeps rendering instead of
// 500-ing. Logged once so the dev terminal makes the fallback obvious.
function logSanityFallback(scope: string, err: unknown) {
  const msg = err instanceof Error ? err.message : String(err);
  console.warn(`[sanity] ${scope} failed — using local data. ${msg}`);
}

export async function fetchAllCaseStudies(): Promise<CaseStudy[]> {
  try {
    const results: SanityCaseStudy[] = await client.fetch(
      ALL_CASE_STUDIES_QUERY,
      {},
      REVALIDATE
    );
    return results.map(normalizeCaseStudy);
  } catch (err) {
    logSanityFallback("fetchAllCaseStudies", err);
    return localCaseStudies;
  }
}

export async function fetchCaseStudyBySlug(
  slug: string
): Promise<CaseStudy | undefined> {
  try {
    const result: SanityCaseStudy | null = await client.fetch(
      CASE_STUDY_BY_SLUG_QUERY,
      { slug },
      REVALIDATE
    );
    return result ? normalizeCaseStudy(result) : undefined;
  } catch (err) {
    logSanityFallback("fetchCaseStudyBySlug", err);
    return localGetBySlug(slug);
  }
}

export async function fetchCaseStudySlugs(): Promise<string[]> {
  try {
    const results: { slug: string }[] = await client.fetch(
      CASE_STUDY_SLUGS_QUERY,
      {},
      REVALIDATE
    );
    return results.map((r) => r.slug);
  } catch (err) {
    logSanityFallback("fetchCaseStudySlugs", err);
    return localCaseStudies.map((cs) => cs.slug);
  }
}

export async function fetchCaseStudiesByService(
  serviceId: ServiceId
): Promise<CaseStudy[]> {
  try {
    const results: SanityCaseStudy[] = await client.fetch(
      CASE_STUDIES_BY_SERVICE_QUERY,
      { serviceId },
      REVALIDATE
    );
    return results.map(normalizeCaseStudy);
  } catch (err) {
    logSanityFallback("fetchCaseStudiesByService", err);
    return localGetByService(serviceId);
  }
}

/** Cap Sanity CDN images so Next.js optimizer doesn't time out on huge originals. */
function capImageUrl(url: string | undefined | null, maxWidth = 1920): string {
  if (!url) return "";
  if (url.startsWith("https://cdn.sanity.io/")) {
    return `${url}?w=${maxWidth}&q=80&fit=max`;
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
