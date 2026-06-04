/**
 * Seed / sync the Sanity `lookBookImage` documents that power the About page
 * "WE'RE SOCAL-LOCAL" look book grid (replaces the old Instagram-feed concept).
 *
 * Uploads the local images in `public/images/about/` to Sanity as assets and
 * creates one `lookBookImage` document per image.
 *
 * Usage (PowerShell):
 *   node --env-file=.env.local scripts/seed-look-book.mjs
 *
 * Requires a write token in .env.local:
 *   SANITY_API_WRITE_TOKEN=sk...   (Editor / Write permission)
 *
 * Idempotent:
 *   - Images are content-hash deduped by Sanity, so re-uploads are free.
 *   - Documents use deterministic _ids + createOrReplace.
 *   - Any pre-existing lookBookImage docs NOT in this set are deleted, so the
 *     grid always matches exactly.
 */

import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "..", "public");

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

/**
 * Look book images, in grid order. `file` is relative to `public/`.
 * `category` is optional (community | growth | impact) — left undefined here
 * so the team can tag them in the Studio if/when they want grouping.
 */
const IMAGES = [
  { key: "community-1", file: "images/about/grid-community-1.png", alt: "SoCal community moment", order: 1 },
  { key: "framed-print", file: "images/about/grid-instagram-slide.png", alt: "Framed SoCal print", order: 2 },
  { key: "community-2", file: "images/about/grid-community-2.png", alt: "SoCal community moment", order: 3 },
  { key: "handsome-man", file: "images/about/grid-handsome-man.png", alt: "Relaxing in a SoCal hammock", order: 4 },
  { key: "malibu", file: "images/about/grid-malibu.png", alt: "Malibu coastline experience", order: 5 },
  { key: "community-3", file: "images/about/grid-community-3.png", alt: "SoCal nightlife gathering", order: 6 },
];

const docId = (key) => `lookBookImage-${key}`;

async function uploadImage(relPath, label) {
  try {
    const abs = path.join(PUBLIC_DIR, relPath);
    const buf = await readFile(abs);
    const asset = await client.assets.upload("image", buf, {
      filename: path.basename(relPath),
    });
    console.log(`  ↑ ${label}: uploaded (${(buf.byteLength / 1024).toFixed(0)}KB) → ${asset._id}`);
    return asset._id;
  } catch (err) {
    console.warn(`  ! ${label}: upload failed (${err.message})`);
    return null;
  }
}

function imageField(assetId) {
  if (!assetId) return undefined;
  return { _type: "image", asset: { _type: "reference", _ref: assetId } };
}

async function run() {
  console.log(`Seeding ${IMAGES.length} look book images → project ${projectId}/${dataset}\n`);

  const keepIds = IMAGES.map((i) => docId(i.key));
  const existingDocs = await client.fetch(
    `*[_type == "lookBookImage"]{ _id, "imgRef": image.asset._ref }`
  );
  const existingById = new Map(existingDocs.map((d) => [d._id, d]));

  // 1) Remove stray docs not in our set so the grid matches exactly.
  const stray = existingDocs
    .map((d) => d._id)
    .filter((id) => !keepIds.includes(id) && !id.startsWith("drafts."));
  if (stray.length) {
    console.log(`Deleting ${stray.length} stray look book doc(s): ${stray.join(", ")}`);
    const delTx = client.transaction();
    stray.forEach((id) => delTx.delete(id));
    await delTx.commit();
  }

  // 2) Upload images + build documents.
  const tx = client.transaction();
  for (const img of IMAGES) {
    const assetId = await uploadImage(img.file, img.key);
    const prev = existingById.get(docId(img.key));
    const imgRef = assetId ?? prev?.imgRef ?? null;
    const image = imageField(imgRef);
    const doc = {
      _id: docId(img.key),
      _type: "lookBookImage",
      alt: img.alt ?? "",
      order: img.order,
      ...(img.category ? { category: img.category } : {}),
      ...(image ? { image } : {}),
    };
    tx.createOrReplace(doc);
    console.log(`  • #${String(img.order).padStart(2, "0")} ${img.key}`);
  }

  await tx.commit();
  console.log(`\nDone. ${IMAGES.length} documents written.`);
}

run().catch((err) => {
  console.error("\nSeed failed:", err.message);
  process.exit(1);
});
