export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (src.startsWith("https://cdn.sanity.io/")) {
    const [base, query] = src.split("?");
    // Keep any params baked in by `urlFor` (notably `rect=` for the Studio crop
    // and `auto=format`); only override the responsive width + quality.
    const params = new URLSearchParams(query);
    params.set("w", String(width));
    params.set("q", String(quality || 80));
    params.set("fit", "max");
    return `${base}?${params.toString()}`;
  }
  // Local images: serve directly with width hint to satisfy Next.js loader contract
  return `${src}?w=${width}`;
}
