import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about-us.html", destination: "/about", permanent: true },
      { source: "/works.html", destination: "/works", permanent: true },
      {
        source: "/works/forever-a-surfer.html",
        destination: "/works/forever-a-surfer",
        permanent: true,
      },
      {
        source: "/services/strategy-inetgration.html",
        destination: "/services/marketing-branding",
        permanent: true,
      },
      {
        source: "/services/research.html",
        destination: "/services/research",
        permanent: true,
      },
      {
        source: "/services/design.html",
        destination: "/services/design",
        permanent: true,
      },
      {
        source: "/services/ai-strategy.html",
        destination: "/services/ai-strategy",
        permanent: true,
      },
      {
        source: "/services/training-education.html",
        destination: "/services/training-education",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
