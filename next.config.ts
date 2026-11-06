import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't advertise the framework in every response.
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    loader: "custom",
    loaderFile: "./src/sanity/lib/image-loader.ts",
  },
  // URLs from the previous deepsocal.com site that people and search engines
  // still request. Each points to the closest page on the current site.
  async redirects() {
    return [
      { source: "/works", destination: "/#work", permanent: true },
      { source: "/services/ai-strategy", destination: "/services/next-gen-innovations", permanent: true },
      { source: "/services/design", destination: "/services/digital-experiences", permanent: true },
      { source: "/services/research", destination: "/services/digital-experiences", permanent: true },
      { source: "/services/marketing-branding", destination: "/services/brand-strategy", permanent: true },
      { source: "/services/training-education", destination: "/", permanent: true },
      // Case study from the old site that isn't in the current work grid.
      { source: "/works/forever-a-surfer", destination: "/#work", permanent: true },
      { source: "/works/forever-a-surfer.html", destination: "/#work", permanent: true },
      // The original static site (.html pages, linked with the extension).
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/about-us.html", destination: "/about", permanent: true },
      { source: "/works.html", destination: "/#work", permanent: true },
      { source: "/services/ai-strategy.html", destination: "/services/next-gen-innovations", permanent: true },
      { source: "/services/design.html", destination: "/services/digital-experiences", permanent: true },
      { source: "/services/research.html", destination: "/services/digital-experiences", permanent: true },
      { source: "/services/training-education.html", destination: "/", permanent: true },
      // "strategy-inetgration" (sic) was the Marketing + Branding page.
      { source: "/services/strategy-inetgration", destination: "/services/brand-strategy", permanent: true },
      { source: "/services/strategy-inetgration.html", destination: "/services/brand-strategy", permanent: true },
    ];
  },
};

export default nextConfig;
