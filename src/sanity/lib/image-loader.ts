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
    const [base] = src.split("?");
    return `${base}?w=${width}&q=${quality || 80}&fit=max`;
  }
  // Local images: serve directly with width hint to satisfy Next.js loader contract
  return `${src}?w=${width}`;
}
