import type { Metadata } from "next";

export const SITE_NAME = "DeepSoCal";
export const SITE_DESCRIPTION =
  "DeepSoCal is a regional strategic design agency building transformative experiences for Southern California's brands.";

type ShareImage = { url: string; width?: number; height?: number; alt?: string };

// Default 1200×630 link-preview image for pages without one of their own.
export const DEFAULT_SHARE_IMAGE: ShareImage = {
  url: "/images/og/deepsocal-share.jpg",
  width: 1200,
  height: 630,
  alt: "DeepSoCal — Designing useful futures for Southern California",
};

// Per-page metadata: canonical URL, og:url, share title/description and image.
// Next replaces (rather than merges) a parent's `openGraph` / `twitter` objects,
// so each page sets the full set here instead of inheriting the home page's.
export function pageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path,
  image = DEFAULT_SHARE_IMAGE,
}: {
  title?: string;
  description?: string;
  path: string;
  image?: ShareImage;
}): Metadata {
  const shareTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      url: path,
      title: shareTitle,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [image.url],
    },
  };
}

// Sanity hero → 1200×630 JPEG share image. JPEG rather than `auto=format`
// because some link-preview crawlers can't read WebP/AVIF. Local fallback
// images aren't sized for previews, so those fall back to the default.
export function sanityShareImage(src: string | undefined, alt: string): ShareImage {
  if (!src || !src.startsWith("https://cdn.sanity.io/")) return DEFAULT_SHARE_IMAGE;
  const url = new URL(src);
  url.searchParams.delete("auto");
  url.searchParams.set("w", "1200");
  url.searchParams.set("h", "630");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("fm", "jpg");
  url.searchParams.set("q", "80");
  return { url: url.toString(), width: 1200, height: 630, alt };
}
