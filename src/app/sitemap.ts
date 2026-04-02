import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://deepsocal.com";
  const now = new Date();

  return [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/works`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/works/forever-a-surfer`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/services/marketing-branding`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/services/research`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/services/design`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/services/ai-strategy`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/services/training-education`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
