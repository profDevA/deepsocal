import { readdirSync, readFileSync, unlinkSync } from "node:fs";
import { join, relative, extname, basename } from "node:path";

const DELETE = process.argv.includes("--delete");

const ROOT = process.cwd();
const PUBLIC = join(ROOT, "public");

// Directories whose text we scan for references.
const SCAN_DIRS = [join(ROOT, "src"), PUBLIC];
const SCAN_ROOT_FILES = [
  "next.config.ts",
  "next.config.js",
  "next.config.mjs",
  "package.json",
];
const TEXT_EXT = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
  ".css", ".scss", ".json", ".webmanifest", ".html", ".md",
]);
const IMG_EXT = new Set([
  ".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".avif", ".mp4", ".webm", ".ico",
]);

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

// 1) Gather candidate asset files under public/.
const assets = walk(PUBLIC).filter((p) => IMG_EXT.has(extname(p).toLowerCase()));

// 2) Build the haystack of all source text.
let haystack = "";
for (const dir of SCAN_DIRS) {
  for (const f of walk(dir)) {
    if (!TEXT_EXT.has(extname(f).toLowerCase())) continue;
    // don't let an asset reference itself
    try {
      haystack += "\n" + readFileSync(f, "utf8");
    } catch {}
  }
}
for (const f of SCAN_ROOT_FILES) {
  try {
    haystack += "\n" + readFileSync(join(ROOT, f), "utf8");
  } catch {}
}

// 3) Decide used/unused. Match by web path (without /public) and by basename.
const used = [];
const unused = [];
for (const abs of assets) {
  const webPath = "/" + relative(PUBLIC, abs).replace(/\\/g, "/");
  const base = basename(abs);
  // also a URL-encoded form (spaces -> %20) in case referenced encoded
  const encoded = encodeURI(webPath);
  const isUsed =
    haystack.includes(webPath) ||
    haystack.includes(encoded) ||
    haystack.includes(base) ||
    haystack.includes(encodeURIComponent(base));
  (isUsed ? used : unused).push(webPath);
}

unused.sort();
used.sort();

console.log(`Total assets: ${assets.length}`);
console.log(`Referenced:   ${used.length}`);
console.log(`UNUSED:       ${unused.length}\n`);
console.log("---- UNUSED (candidates for deletion) ----");
for (const u of unused) console.log(u);

if (DELETE) {
  console.log("\nDeleting unused assets…");
  let n = 0;
  for (const webPath of unused) {
    const abs = join(PUBLIC, webPath.replace(/^\//, ""));
    try {
      unlinkSync(abs);
      n++;
    } catch (err) {
      console.warn(`  ! could not delete ${webPath}: ${err.message}`);
    }
  }
  console.log(`Deleted ${n} file(s).`);
} else {
  console.log("\n(dry run — re-run with --delete to remove them)");
}
