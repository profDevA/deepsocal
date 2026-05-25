import type { MetadataRoute } from "next";
import { fetchAllCaseStudies } from "@/sanity/lib/fetch";
import { products } from "@/data/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://deepsocal.com";
  const now = new Date();
  const caseStudies = await fetchAllCaseStudies();

  return [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...caseStudies.map((cs) => ({
      url: `${baseUrl}/works/${cs.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...products.map((p) => ({
      url: `${baseUrl}/shop/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
