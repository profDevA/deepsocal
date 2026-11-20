import type { MetadataRoute } from "next";
import { fetchAllCaseStudies } from "@/sanity/lib/fetch";
import { products } from "@/data/products";
import { services } from "@/data/services";
import { SHOP_ENABLED } from "@/lib/features";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://deepsocal.com";
  const now = new Date();
  const caseStudies = await fetchAllCaseStudies();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
  const shopRoutes: MetadataRoute.Sitemap = SHOP_ENABLED
    ? [
        { url: `${baseUrl}/shop`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
        ...products.map((p) => ({
          url: `${baseUrl}/shop/${p.slug}`,
          lastModified: now,
          changeFrequency: "monthly" as const,
          priority: 0.5,
        })),
      ]
    : [];

  return [
    ...staticRoutes,
    ...services.map((s) => ({
      url: `${baseUrl}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...caseStudies.map((cs) => ({
      url: `${baseUrl}/works/${cs.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...shopRoutes,
  ];
}
