import { groq } from "next-sanity";

export const ALL_CASE_STUDIES_QUERY = groq`
  *[_type == "caseStudy"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    tag,
    tags,
    editorialTheme,
    services,
    servicesLabel,
    client,
    industry,
    scope,
    teamLabel,
    summary,
    summary2,
    impactMetrics,
    order,
    heroImage,
    thumbnailImage,
    gallery,
    carouselImages,
  }
`;

export const CASE_STUDY_BY_SLUG_QUERY = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    tag,
    tags,
    editorialTheme,
    services,
    servicesLabel,
    client,
    industry,
    scope,
    teamLabel,
    summary,
    summary2,
    impactMetrics,
    order,
    heroImage,
    thumbnailImage,
    gallery,
    carouselImages,
  }
`;

export const CASE_STUDY_SLUGS_QUERY = groq`
  *[_type == "caseStudy" && defined(slug.current)]{
    "slug": slug.current,
  }
`;

export const CASE_STUDIES_BY_SERVICE_QUERY = groq`
  *[_type == "caseStudy" && $serviceId in services] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    tag,
    tags,
    editorialTheme,
    services,
    servicesLabel,
    order,
    heroImage,
    thumbnailImage,
  }
`;
