/**
 * Seed / sync the Sanity `caseStudy` documents. With the 2-layer hierarchy each
 * case study references a `category` document (see seed-categories.mjs) and is
 * ordered WITHIN that category. The work-grid diagonal cascade is derived on the
 * frontend by buildWorkGrid() (category card, then its studies) — no global
 * order numbers, and no "Theme" placeholder case studies anymore.
 *
 * Run AFTER seed-categories.mjs (these docs reference the category docs).
 *
 * Usage (PowerShell):
 *   node --env-file=.env.local scripts/seed-categories.mjs
 *   node --env-file=.env.local scripts/seed-case-studies.mjs
 *
 * Requires SANITY_API_WRITE_TOKEN (Editor) in .env.local.
 *
 * Idempotent: deterministic _ids, createOrReplace, content-hash deduped assets,
 * and stray caseStudy docs (including the old "Theme" cards) are deleted.
 */

import { createClient } from "@sanity/client";

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

const A = (id) => `https://www.figma.com/api/mcp/asset/${id}`;

/**
 * Real case studies only. `categorySlug` references the parent category doc;
 * `order` is the position WITHIN that category (ascending).
 */
const CARDS = [
  // ── Ocean & Environment ──
  {
    slug: "oc-navigator",
    categorySlug: "ocean-environment",
    order: 1,
    title: "OC Resource Navigator",
    subtitle: "Public-interest systems design",
    tag: "Design + Research",
    tags: ["Design + Research", "Design + Research", "Design + Research"],
    services: ["brand-strategy", "digital-experiences"],
    servicesLabel: "Strategy + Branding +",
    client: "CityLeaks",
    industry: "Culture & Music",
    scope: "Art direction Print design Editorial",
    teamLabel: "Ana Abreu",
    summary:
      "DeepSoCal used surf culture to connect California communities with global humanitarian causes. Documentary crews captured community stories that reflected local identity. Influencer partnerships expanded their reach, while community events turned narratives into action.",
    summary2:
      "DeepSoCal used surf culture to connect California communities with global humanitarian causes. Documentary crews captured community stories that reflected local identity. Influencer partnerships expanded their reach, while community events turned narratives into action.",
    impactMetrics:
      "We helped position the U.S. Surf Open as a platform for lasting community connection. Our research-driven storytelling and strategic engagement strengthened ties within California surf culture and secured the brand's presence in the community.",
    image: A("068e560a-4a90-4d1d-a21a-074224ec8270"),
  },
  {
    slug: "surf-magazine",
    categorySlug: "ocean-environment",
    order: 2,
    title: "Surf Magazine",
    subtitle: "Editorial and growth storytelling",
    tag: "Strategy + Content",
    tags: ["Strategy + Content"],
    services: ["brand-strategy", "identity-systems"],
    servicesLabel: "Strategy + Branding",
    image: A("4efda017-ccd2-458d-96c9-30311356cf42"),
  },
  {
    slug: "concrete-dreams",
    categorySlug: "ocean-environment",
    order: 3,
    title: "Concrete Dreams",
    subtitle: "Issue card the landscape, coast, and environmental wellbeing",
    tag: "Brand + Content",
    tags: ["Brand + Content"],
    services: ["digital-experiences", "next-gen-innovations"],
    servicesLabel: "Strategy + Branding",
    image: A("79cad216-7a6e-433f-ada0-be2fef11c42d"),
  },

  // ── Mental Health Access ──
  {
    slug: "coral-health",
    categorySlug: "mental-health",
    order: 1,
    title: "Coral Health",
    subtitle: "Human-centered growth design",
    tag: "Strategy + Influencers",
    tags: ["Strategy + Influencers"],
    services: ["brand-strategy", "digital-experiences"],
    servicesLabel: "Strategy + Branding",
    image: A("5f9c1cb5-9f2a-4337-9b34-83418aa2bf4b"),
  },
  {
    slug: "salt-and-sand",
    categorySlug: "mental-health",
    order: 2,
    title: "Salt & Sand",
    subtitle: "Editorial and growth storytelling",
    tag: "Strategy + Influencers",
    tags: ["Strategy + Influencers"],
    services: ["identity-systems", "brand-strategy"],
    servicesLabel: "Strategy + Branding",
    image: A("915e2fed-0667-406e-8cbc-9a089f407b3d"),
  },
  {
    slug: "luku-watches",
    categorySlug: "mental-health",
    order: 3,
    title: "Luku Watches",
    subtitle: "Editorial and growth storytelling",
    tag: "Design + Research",
    tags: ["Design + Research"],
    services: ["identity-systems", "brand-strategy"],
    servicesLabel: "Strategy + Branding",
    image: A("242a2e28-b1d2-42a2-b830-419ca33811fd"),
  },

  // ── Local Commerce ──
  {
    slug: "harbor-market",
    categorySlug: "local-commerce",
    order: 1,
    title: "Harbor Market",
    subtitle: "Brand and growth for a coastal marketplace",
    tag: "Design + Research",
    tags: ["Design + Research"],
    services: ["brand-strategy", "identity-systems"],
    servicesLabel: "Strategy + Branding",
    image: A("cb9b576c-4201-4383-a6e9-4b1b6a89cefc"),
  },

  // ── Creative Culture ──
  {
    slug: "press-play",
    categorySlug: "culture",
    order: 1,
    title: "Press Play",
    subtitle: "Editorial and growth storytelling",
    tag: "Brand + Content",
    tags: ["Brand + Content"],
    services: ["brand-strategy", "digital-experiences"],
    servicesLabel: "Strategy + Branding",
    image: A("cb9b576c-4201-4383-a6e9-4b1b6a89cefc"),
  },

  // ── Climate Resilience ──
  {
    slug: "tide-line",
    categorySlug: "climate-resilience",
    order: 1,
    title: "Tide Line",
    subtitle: "Resilience storytelling for coastal communities",
    tag: "Design + Research",
    tags: ["Design + Research"],
    services: ["brand-strategy", "digital-experiences"],
    servicesLabel: "Strategy + Branding",
    image: A("cb9b576c-4201-4383-a6e9-4b1b6a89cefc"),
  },
  {
    slug: "solar-coast",
    categorySlug: "climate-resilience",
    order: 2,
    title: "Solar Coast",
    subtitle: "Clean-energy brand and growth design",
    tag: "Strategy + Content",
    tags: ["Strategy + Content"],
    services: ["brand-strategy", "next-gen-innovations"],
    servicesLabel: "Strategy + Branding",
    image: A("cb9b576c-4201-4383-a6e9-4b1b6a89cefc"),
  },
  {
    slug: "cocoon-malibu",
    categorySlug: "climate-resilience",
    order: 3,
    title: "Cocoon Malibu",
    subtitle: "Sustainable hospitality brand design",
    tag: "Design + Research",
    tags: ["Design + Research"],
    services: ["identity-systems", "brand-strategy"],
    servicesLabel: "Strategy + Branding",
    image: A("80138665-3146-4538-8587-14663bb6a8ee"),
  },

  // ── AI & Digital Access ──
  {
    slug: "access-oc",
    categorySlug: "ai-digital-access",
    order: 1,
    title: "Access OC",
    subtitle: "Practical AI tools for local orgs",
    tag: "Design + Research",
    tags: ["Design + Research"],
    services: ["next-gen-innovations", "digital-experiences"],
    servicesLabel: "Strategy + Branding",
    image: A("a8c931a2-44aa-4d34-a4ec-d96873feee76"),
  },
];

const docId = (slug) => `caseStudy-${slug}`;
const categoryRef = (slug) => ({ _type: "reference", _ref: `category-${slug}` });
const assetCache = new Map();

async function uploadImage(url, label) {
  if (!url) return null;
  if (assetCache.has(url)) return assetCache.get(url);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.byteLength < 5000) {
      console.warn(`  ! ${label}: image looks blank (${buf.byteLength}B), skipping`);
      assetCache.set(url, null);
      return null;
    }
    const asset = await client.assets.upload("image", buf, { filename: `${label}.png` });
    console.log(`  ↑ ${label}: uploaded (${(buf.byteLength / 1024).toFixed(0)}KB) → ${asset._id}`);
    assetCache.set(url, asset._id);
    return asset._id;
  } catch (err) {
    console.warn(`  ! ${label}: upload failed (${err.message}); leaving image empty`);
    assetCache.set(url, null);
    return null;
  }
}

function imageField(assetId) {
  if (!assetId) return undefined;
  return { _type: "image", asset: { _type: "reference", _ref: assetId } };
}

async function run() {
  console.log(`Seeding ${CARDS.length} case studies → project ${projectId}/${dataset}\n`);

  // Verify the category docs exist (case studies reference them).
  const cats = await client.fetch(`*[_type == "category"]{ "slug": slug.current }`);
  const catSlugs = new Set(cats.map((c) => c.slug));
  const missing = [...new Set(CARDS.map((c) => c.categorySlug))].filter(
    (s) => !catSlugs.has(s)
  );
  if (missing.length) {
    console.error(
      `Missing category docs: ${missing.join(", ")}.\n` +
        "Run seed-categories.mjs first."
    );
    process.exit(1);
  }

  // Snapshot existing docs so we can detect strays and preserve good images.
  const keepIds = CARDS.map((c) => docId(c.slug));
  const existingDocs = await client.fetch(
    `*[_type == "caseStudy"]{ _id, "thumbRef": thumbnailImage.asset._ref, "heroRef": heroImage.asset._ref }`
  );
  const existingById = new Map(existingDocs.map((d) => [d._id, d]));

  // Remove strays (includes the old "Theme" category-as-caseStudy docs).
  const stray = existingDocs
    .map((d) => d._id)
    .filter((id) => !keepIds.includes(id) && !id.startsWith("drafts."));
  if (stray.length) {
    console.log(`Deleting ${stray.length} stray case study doc(s): ${stray.join(", ")}`);
    const delTx = client.transaction();
    stray.forEach((id) => delTx.delete(id));
    await delTx.commit();
  }

  const tx = client.transaction();
  for (const card of CARDS) {
    const assetId = await uploadImage(card.image, card.slug);
    const prev = existingById.get(docId(card.slug));
    const thumbRef = assetId ?? prev?.thumbRef ?? null;
    const heroRef = assetId ?? prev?.heroRef ?? prev?.thumbRef ?? null;
    const thumb = imageField(thumbRef);
    const hero = imageField(heroRef);
    const doc = {
      _id: docId(card.slug),
      _type: "caseStudy",
      title: card.title,
      slug: { _type: "slug", current: card.slug },
      subtitle: card.subtitle ?? "",
      tag: card.tag ?? "",
      tags: card.tags ?? [],
      category: categoryRef(card.categorySlug),
      services: card.services ?? [],
      servicesLabel: card.servicesLabel ?? "",
      client: card.client ?? "",
      industry: card.industry ?? "",
      scope: card.scope ?? "",
      teamLabel: card.teamLabel ?? "",
      summary: card.summary ?? "",
      summary2: card.summary2 ?? "",
      impactMetrics: card.impactMetrics ?? "",
      order: card.order,
      ...(thumb ? { thumbnailImage: thumb } : {}),
      ...(hero ? { heroImage: hero } : {}),
    };
    tx.createOrReplace(doc);
    console.log(`  • ${card.categorySlug} #${card.order}  ${card.title}`);
  }

  await tx.commit();
  console.log(`\nDone. ${CARDS.length} documents written.`);
}

run().catch((err) => {
  console.error("\nSeed failed:", err.message);
  process.exit(1);
});
