import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enforce no trailing slash for consistent canonical URLs
  trailingSlash: false,
  images: {
    qualities: [75, 95, 100],
    // Allow images to be indexed by search engines
    minimumCacheTTL: 31536000, // 1 year cache
  },
  // Headers for image SEO — let Google Image crawler index images properly
  async headers() {
    return [
      {
        // Allow all image assets to be indexed by Google Image Search
        source: '/stones/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large, max-snippet:-1',
          },
        ],
      },
      {
        source: '/quarry/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large',
          },
        ],
      },
      {
        source: '/factory/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large',
          },
        ],
      },
      {
        source: '/projects/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large',
          },
        ],
      },
      {
        // Allow Next.js optimized images to be indexed
        source: '/_next/image',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
