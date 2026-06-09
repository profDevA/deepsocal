/**
 * Seed / sync the Sanity `category` documents — the parent layer over case
 * studies (2-layer hierarchy). Categories own the visual data that used to live
 * in src/data/socal-themes.ts: badge icon, carousel photo, bg color, STEEPC,
 * the work-grid card subtitle, and the carousel description.
 *
 * Run BEFORE seed-case-studies.mjs (case studies reference these docs).
 *
 * Usage (PowerShell):
 *   node --env-file=.env.local scripts/seed-categories.mjs
 *
 * Requires SANITY_API_WRITE_TOKEN (Editor) in .env.local.
 *
 * Idempotent: deterministic _ids (`category-<slug>`) + createOrReplace, local
 * assets are content-hash deduped by Sanity, and stray category docs not in this
 * set are deleted.
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, extname } from "node:path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-22";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Run with --env-file=.env.local");
  process.exit(1);
}
if (!token) {
  console.error(
    "Missing SANITY_API_WRITE_TOKEN.\n" +
      "Create a write token at https://www.sanity.io/manage/project/" +
      projectId +
      "/api#tokens (Editor) and add it to .env.local as SANITY_API_WRITE_TOKEN."
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, "..", "public");

// Keep in sync with src/data/categories.ts (the offline fallback).
const CATEGORIES = [
  {
    slug: "ocean-environment",
    name: "Ocean & Environment",
    subtitle: "The landscape, coast, and environmental wellbeing we design within",
    description: "Coast, climate, and ecological health",
    steepc: "environment",
    bgColor: "#D9DDD1",
    badge: "/images/badges/ocean-environment.svg",
    carouselImage: "/images/themes/ocean-environment.png",
    order: 1,
  },
  {
    slug: "mental-health",
    name: "Mental Health Access",
    subtitle: "Research, care, and transformation designing better pathways to healing",
    description: "Care, navigation, community support.",
    steepc: "social",
    bgColor: "#F5E4C6",
    badge: "/images/badges/mental-health.svg",
    carouselImage: "/images/themes/mental-health.png",
    order: 2,
  },
  {
    slug: "local-commerce",
    name: "Local Commerce",
    subtitle: "For entrepreneurs and community-rooted brands building something real",
    description: "Small business growth and resilience.",
    steepc: "economic",
    bgColor: "#F3D4C4",
    badge: "/images/badges/local-commerce.svg",
    carouselImage: "/images/themes/local-commerce.png",
    order: 3,
  },
  {
    slug: "culture",
    name: "Creative Culture",
    subtitle: "Social innovation, community wellbeing, and the stories worth telling",
    description: "Surf, skate, food, art, fashion",
    steepc: "cultural",
    bgColor: "#DBD3E7",
    badge: "/images/badges/creative-culture.svg",
    carouselImage: "/images/themes/creative-culture.png",
    order: 4,
  },
  {
    slug: "climate-resilience",
    name: "Climate Resilience",
    subtitle: "Social innovation, community wellbeing, and the stories worth telling",
    description: "Adaptation, recovery, long-term systems.",
    steepc: "environment",
    bgColor: "#D2DAE5",
    badge: "/images/badges/climate-resilience.svg",
    carouselImage: "/images/themes/climate-resilience.png",
    order: 5,
  },
  {
    slug: "ai-digital-access",
    name: "AI & Digital Access",
    subtitle: "Social innovation, community wellbeing, and the stories worth telling",
    description: "Practical tools for local terms.",
    steepc: "tech",
    bgColor: "#CCDCDB",
    badge: "/images/badges/ai-digital-access.svg",
    carouselImage: "/images/themes/ai-digital-access.png",
    order: 6,
  },
];

const docId = (slug) => `category-${slug}`;
const assetCache = new Map();

const CONTENT_TYPES = {
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

async function uploadLocal(relPath, label) {
  if (!relPath) return null;
  if (assetCache.has(relPath)) return assetCache.get(relPath);
  try {
    const buf = readFileSync(join(PUBLIC, relPath));
    const ext = extname(relPath).toLowerCase();
    const asset = await client.assets.upload("image", buf, {
      filename: `${label}${ext}`,
      contentType: CONTENT_TYPES[ext],
    });
    console.log(
      `  ↑ ${label} (${relPath}): ${(buf.byteLength / 1024).toFixed(0)}KB → ${asset._id}`
    );
    assetCache.set(relPath, asset._id);
    return asset._id;
  } catch (err) {
    console.warn(`  ! ${label}: upload failed (${err.message})`);
    assetCache.set(relPath, null);
    return null;
  }
}

const imageField = (assetId) =>
  assetId ? { _type: "image", asset: { _type: "reference", _ref: assetId } } : undefined;

async function run() {
  console.log(`Seeding ${CATEGORIES.length} categories → project ${projectId}/${dataset}\n`);

  const keepIds = CATEGORIES.map((c) => docId(c.slug));
  const existing = await client.fetch(`*[_type == "category"]{ _id }`);
  const stray = existing
    .map((d) => d._id)
    .filter((id) => !keepIds.includes(id) && !id.startsWith("drafts."));
  if (stray.length) {
    console.log(`Deleting ${stray.length} stray category doc(s): ${stray.join(", ")}`);
    const delTx = client.transaction();
    stray.forEach((id) => delTx.delete(id));
    await delTx.commit();
  }

  const tx = client.transaction();
  for (const cat of CATEGORIES) {
    const badgeId = await uploadLocal(cat.badge, `${cat.slug}-badge`);
    const carouselId = await uploadLocal(cat.carouselImage, `${cat.slug}-carousel`);
    const badge = imageField(badgeId);
    const carouselImage = imageField(carouselId);
    const doc = {
      _id: docId(cat.slug),
      _type: "category",
      name: cat.name,
      slug: { _type: "slug", current: cat.slug },
      subtitle: cat.subtitle,
      description: cat.description,
      steepc: cat.steepc,
      bgColor: cat.bgColor,
      order: cat.order,
      ...(badge ? { badge } : {}),
      ...(carouselImage ? { carouselImage } : {}),
    };
    tx.createOrReplace(doc);
    console.log(`  • #${cat.order} ${cat.name}`);
  }

  await tx.commit();
  console.log(`\nDone. ${CATEGORIES.length} category documents written.`);
}

run().catch((err) => {
  console.error("\nSeed failed:", err.message);
  process.exit(1);
});
