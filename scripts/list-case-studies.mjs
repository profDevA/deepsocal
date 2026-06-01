import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-22",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const rows = await client.fetch(
  `*[_type == "caseStudy"] | order(order asc){ _id, order, title, "slug": slug.current, "hasThumb": defined(thumbnailImage) }`
);
console.log("count:", rows.length);
for (const r of rows) {
  console.log(
    String(r.order ?? "?").padStart(3),
    "|",
    (r.slug ?? "(no slug)").padEnd(24),
    "| thumb:",
    r.hasThumb ? "yes" : "no ",
    "|",
    r.title,
    "|",
    r._id
  );
}
