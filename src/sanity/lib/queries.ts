import { groq } from "next-sanity";

export const ALL_CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    subtitle,
    description,
    steepc,
    bgColor,
    badge,
    carouselImage,
    order,
  }
`;

export const ALL_CASE_STUDIES_QUERY = groq`
  *[_type == "caseStudy"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    tag,
    tags,
    "categorySlug": category->slug.current,
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
    "categorySlug": category->slug.current,
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

export const LOOK_BOOK_QUERY = groq`
  *[_type == "lookBookImage" && defined(image)] | order(order asc) {
    _id,
    image,
    alt,
    category,
    order,
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
    "categorySlug": category->slug.current,
    services,
    servicesLabel,
    order,
    heroImage,
    thumbnailImage,
  }
`;
