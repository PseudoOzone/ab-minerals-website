import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enforce no trailing slash for consistent canonical URLs
  trailingSlash: false,
  images: {
    qualities: [75, 95, 100],
  },
};

export default nextConfig;
