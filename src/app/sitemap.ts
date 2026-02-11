import { MetadataRoute } from 'next';
import { stones } from '@/config/stones.config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.abminerals.com';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/stones`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/quarry`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/factory`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/capabilities`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  // Dynamic stone pages — Lavender Blue gets highest priority
  const stonePages = stones.map((stone) => ({
    url: `${baseUrl}/stones/${stone.slug}`,
    lastModified: new Date(),
    changeFrequency: stone.slug === 'lavender-blue' ? 'weekly' as const : 'monthly' as const,
    priority: stone.slug === 'lavender-blue' ? 0.95 : 0.8,
  }));

  return [...staticPages, ...stonePages];
}
