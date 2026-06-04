import type { SanityImageSource } from "@sanity/image-url";

import { client } from "./client";
import { urlFor } from "./image";
import {
  caseStudies as localCaseStudies,
  getCaseStudyBySlug as localGetBySlug,
  getCaseStudiesByService as localGetByService,
  type CaseStudy,
  type ServiceId,
} from "@/data/case-studies";
import {
  lookBookImages as localLookBook,
  type LookBookImage,
  type LookBookCategory,
} from "@/data/look-book";
import {
  ALL_CASE_STUDIES_QUERY,
  CASE_STUDY_BY_SLUG_QUERY,
  CASE_STUDY_SLUGS_QUERY,
  CASE_STUDIES_BY_SERVICE_QUERY,
  LOOK_BOOK_QUERY,
} from "./queries";

// The GROQ queries return raw Sanity image objects (asset ref + crop + hotspot)
// for the image fields so `urlFor` can bake the Studio crop into the URL.
type SanityCaseStudy = Omit<
  CaseStudy,
  "heroImage" | "thumbnailImage" | "gallery" | "carouselImages"
> & {
  _id: string;
  heroImage?: SanityImageSource | null;
  thumbnailImage?: SanityImageSource | null;
  gallery?: (SanityImageSource | null)[] | null;
  carouselImages?: (SanityImageSource | null)[] | null;
};

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

type SanityLookBookImage = {
  _id: string;
  image?: SanityImageSource | null;
  alt?: string | null;
  category?: string | null;
};

// Look book images for the About page community grid. Managed in the Studio as
// `lookBookImage` documents; falls back to the static set in
// `src/data/look-book.ts` when none exist yet (or Sanity is unreachable).
export async function fetchLookBookImages(): Promise<LookBookImage[]> {
  try {
    const results: SanityLookBookImage[] = await client.fetch(
      LOOK_BOOK_QUERY,
      {},
      REVALIDATE
    );
    const mapped = results
      .map((r) => ({
        src: imageUrl(r.image),
        alt: r.alt ?? "",
        category: (r.category ?? undefined) as LookBookCategory | undefined,
      }))
      .filter((img) => img.src);
    return mapped.length > 0 ? mapped : localLookBook;
  } catch (err) {
    logSanityFallback("fetchLookBookImages", err);
    return localLookBook;
  }
}

// Build a Sanity CDN URL from a raw image object. `urlFor` reads the field's
// `crop` + `hotspot` and bakes them into the URL as a `rect=` param, so the
// crop set in the Studio is honoured. The per-width resize is handled later by
// the custom image loader (src/sanity/lib/image-loader.ts).
function imageUrl(source: SanityImageSource | null | undefined): string {
  if (!source) return "";
  try {
    return urlFor(source).auto("format").url();
  } catch {
    return "";
  }
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
    heroImage: imageUrl(raw.heroImage),
    thumbnailImage: imageUrl(raw.thumbnailImage),
    gallery: (raw.gallery ?? []).map((img) => imageUrl(img)).filter(Boolean),
    carouselImages: (raw.carouselImages ?? [])
      .map((img) => imageUrl(img))
      .filter(Boolean),
    summary: raw.summary ?? "",
    summary2: raw.summary2 ?? "",
    impactMetrics: raw.impactMetrics ?? "",
    order: raw.order ?? 0,
  };
}
