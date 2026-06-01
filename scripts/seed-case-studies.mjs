/**
 * Seed / sync the Sanity `caseStudy` documents so the homepage "All Works" grid
 * renders the diagonal category cascade from Figma (node 672:5322).
 *
 * Grid layout (3 columns) — category cards land on the diagonal at slots
 * 1, 5, 9, 11, 13, 17. Case studies per category block: 3 / 3 / 1 / 1 / 3 / 1.
 *
 * Usage (PowerShell):
 *   node --env-file=.env.local scripts/seed-case-studies.mjs
 *
 * Requires a write token in .env.local:
 *   SANITY_API_WRITE_TOKEN=sk...   (Editor / Write permission)
 *
 * The script is idempotent:
 *   - Images are content-hash deduped by Sanity, so re-uploads are free.
 *   - Documents use deterministic _ids and createOrReplace.
 *   - Any pre-existing caseStudy docs NOT in this set are deleted, so the grid
 *     always matches exactly.
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

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const A = (id) => `https://www.figma.com/api/mcp/asset/${id}`;

/**
 * Card data, in grid order. `image` is a Figma MCP asset URL (uploaded once).
 * Category cards have image=null (they render the grayscale theme badge).
 */
const CARDS = [
  // ── Block 1: Ocean & Environment (category + 3 case studies) ──
  {
    slug: "ocean-environment",
    order: 1,
    category: true,
    title: "Ocean & Environment",
    subtitle: "The landscape, coast, and environmental wellbeing we design within",
    editorialTheme: "ocean-environment",
    tag: "Theme",
    services: ["brand-strategy", "identity-systems"],
  },
  {
    slug: "oc-navigator",
    order: 2,
    title: "OC Resource Navigator",
    subtitle: "Public-interest systems design",
    editorialTheme: "ocean-environment",
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
    order: 3,
    title: "Surf Magazine",
    subtitle: "Editorial and growth storytelling",
    editorialTheme: "ocean-environment",
    tag: "Strategy + Content",
    tags: ["Strategy + Content"],
    services: ["brand-strategy", "identity-systems"],
    servicesLabel: "Strategy + Branding",
    image: A("4efda017-ccd2-458d-96c9-30311356cf42"),
  },
  {
    slug: "concrete-dreams",
    order: 4,
    title: "Concrete Dreams",
    subtitle: "Issue card the landscape, coast, and environmental wellbeing",
    editorialTheme: "ocean-environment",
    tag: "Brand + Content",
    tags: ["Brand + Content"],
    services: ["digital-experiences", "next-gen-innovations"],
    servicesLabel: "Strategy + Branding",
    image: A("79cad216-7a6e-433f-ada0-be2fef11c42d"),
  },

  // ── Block 2: Mental Health Access (category + 3 case studies) ──
  {
    slug: "mental-health-access",
    order: 5,
    category: true,
    title: "Mental Health Access",
    subtitle: "Research, care, and transformation designing better pathways to healing",
    editorialTheme: "mental-health",
    tag: "Theme",
    services: ["digital-experiences"],
  },
  {
    slug: "coral-health",
    order: 6,
    title: "Coral Health",
    subtitle: "Human-centered growth design",
    editorialTheme: "mental-health",
    tag: "Strategy + Influencers",
    tags: ["Strategy + Influencers"],
    services: ["brand-strategy", "digital-experiences"],
    servicesLabel: "Strategy + Branding",
    image: A("5f9c1cb5-9f2a-4337-9b34-83418aa2bf4b"),
  },
  {
    slug: "salt-and-sand",
    order: 7,
    title: "Salt & Sand",
    subtitle: "Editorial and growth storytelling",
    editorialTheme: "mental-health",
    tag: "Strategy + Influencers",
    tags: ["Strategy + Influencers"],
    services: ["identity-systems", "brand-strategy"],
    servicesLabel: "Strategy + Branding",
    image: A("915e2fed-0667-406e-8cbc-9a089f407b3d"),
  },
  {
    slug: "luku-watches",
    order: 8,
    title: "Luku Watches",
    subtitle: "Editorial and growth storytelling",
    editorialTheme: "mental-health",
    tag: "Design + Research",
    tags: ["Design + Research"],
    services: ["identity-systems", "brand-strategy"],
    servicesLabel: "Strategy + Branding",
    image: A("242a2e28-b1d2-42a2-b830-419ca33811fd"),
  },

  // ── Block 3: Local Commerce (category + 1 case study) ──
  {
    slug: "local-commerce",
    order: 9,
    category: true,
    title: "Local Commerce",
    subtitle: "For entrepreneurs and community-rooted brands building something real",
    editorialTheme: "local-commerce",
    tag: "Theme",
    services: ["brand-strategy"],
  },
  {
    slug: "harbor-market",
    order: 10,
    title: "Harbor Market",
    subtitle: "Brand and growth for a coastal marketplace",
    editorialTheme: "local-commerce",
    tag: "Design + Research",
    tags: ["Design + Research"],
    services: ["brand-strategy", "identity-systems"],
    servicesLabel: "Strategy + Branding",
    image: A("cb9b576c-4201-4383-a6e9-4b1b6a89cefc"),
  },

  // ── Block 4: Creative Culture (category + 1 case study) ──
  {
    slug: "creative-culture",
    order: 11,
    category: true,
    title: "Creative Culture",
    subtitle: "Social innovation, community wellbeing, and the stories worth telling",
    editorialTheme: "culture",
    tag: "Theme",
    services: ["brand-strategy", "identity-systems"],
  },
  {
    slug: "press-play",
    order: 12,
    title: "Press Play",
    subtitle: "Editorial and growth storytelling",
    editorialTheme: "culture",
    tag: "Brand + Content",
    tags: ["Brand + Content"],
    services: ["brand-strategy", "digital-experiences"],
    servicesLabel: "Strategy + Branding",
    image: A("cb9b576c-4201-4383-a6e9-4b1b6a89cefc"),
  },

  // ── Block 5: Climate Resilience (category + 3 case studies) ──
  {
    slug: "climate-resilience",
    order: 13,
    category: true,
    title: "Climate Resilience",
    subtitle: "Social innovation, community wellbeing, and the stories worth telling",
    editorialTheme: "climate-resilience",
    tag: "Theme",
    services: ["next-gen-innovations"],
  },
  {
    slug: "tide-line",
    order: 14,
    title: "Tide Line",
    subtitle: "Resilience storytelling for coastal communities",
    editorialTheme: "climate-resilience",
    tag: "Design + Research",
    tags: ["Design + Research"],
    services: ["brand-strategy", "digital-experiences"],
    servicesLabel: "Strategy + Branding",
    image: A("cb9b576c-4201-4383-a6e9-4b1b6a89cefc"),
  },
  {
    slug: "solar-coast",
    order: 15,
    title: "Solar Coast",
    subtitle: "Clean-energy brand and growth design",
    editorialTheme: "climate-resilience",
    tag: "Strategy + Content",
    tags: ["Strategy + Content"],
    services: ["brand-strategy", "next-gen-innovations"],
    servicesLabel: "Strategy + Branding",
    image: A("cb9b576c-4201-4383-a6e9-4b1b6a89cefc"),
  },
  {
    slug: "cocoon-malibu",
    order: 16,
    title: "Cocoon Malibu",
    subtitle: "Sustainable hospitality brand design",
    editorialTheme: "climate-resilience",
    tag: "Design + Research",
    tags: ["Design + Research"],
    services: ["identity-systems", "brand-strategy"],
    servicesLabel: "Strategy + Branding",
    image: A("80138665-3146-4538-8587-14663bb6a8ee"),
  },

  // ── Block 6: AI & Digital Access (category + 1 case study) ──
  {
    slug: "ai-digital-access",
    order: 17,
    category: true,
    title: "AI & Digital Access",
    subtitle: "Social innovation, community wellbeing, and the stories worth telling",
    editorialTheme: "ai-digital-access",
    tag: "Theme",
    services: ["next-gen-innovations"],
  },
  {
    slug: "access-oc",
    order: 18,
    title: "Access OC",
    subtitle: "Practical AI tools for local orgs",
    editorialTheme: "ai-digital-access",
    tag: "Design + Research",
    tags: ["Design + Research"],
    services: ["next-gen-innovations", "digital-experiences"],
    servicesLabel: "Strategy + Branding",
    image: A("a8c931a2-44aa-4d34-a4ec-d96873feee76"),
  },
];

const docId = (slug) => `caseStudy-${slug}`;
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
    const asset = await client.assets.upload("image", buf, {
      filename: `${label}.png`,
    });
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

  // Snapshot existing docs so we can (a) detect strays and (b) preserve an
  // already-set image if a fresh Figma upload fails (never wipe good data).
  const keepIds = CARDS.map((c) => docId(c.slug));
  const existingDocs = await client.fetch(
    `*[_type == "caseStudy"]{ _id, "thumbRef": thumbnailImage.asset._ref, "heroRef": heroImage.asset._ref }`
  );
  const existingById = new Map(existingDocs.map((d) => [d._id, d]));

  // 1) Remove any stray caseStudy docs not in our set so the grid matches exactly.
  const stray = existingDocs
    .map((d) => d._id)
    .filter((id) => !keepIds.includes(id) && !id.startsWith("drafts."));
  if (stray.length) {
    console.log(`Deleting ${stray.length} stray case study doc(s): ${stray.join(", ")}`);
    const delTx = client.transaction();
    stray.forEach((id) => delTx.delete(id));
    await delTx.commit();
  }

  // 2) Upload images + build documents.
  const tx = client.transaction();
  for (const card of CARDS) {
    const assetId = await uploadImage(card.image, card.slug);
    const prev = existingById.get(docId(card.slug));
    // Prefer the freshly-uploaded asset; otherwise keep whatever was already set.
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
      editorialTheme: card.editorialTheme,
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
    console.log(`  • #${String(card.order).padStart(2, "0")} ${card.title}${card.category ? "  [category]" : ""}`);
  }

  await tx.commit();
  console.log(`\nDone. ${CARDS.length} documents written.`);
}

run().catch((err) => {
  console.error("\nSeed failed:", err.message);
  process.exit(1);
});
