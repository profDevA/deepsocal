import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    loader: "custom",
    loaderFile: "./src/sanity/lib/image-loader.ts",
  },
};

export default nextConfig;
