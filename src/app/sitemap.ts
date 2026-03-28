import { MetadataRoute } from 'next';
import { stones } from '@/config/stones.config';
import { locales } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.abminerals.com';

  const staticPaths = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/stones', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/quarry', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/factory', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/projects', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/capabilities', changeFrequency: 'monthly' as const, priority: 0.6 },
  ];

  // Generate entries for each locale
  const staticPages = staticPaths.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }))
  );

  // Dynamic stone pages for each locale
  const stonePages = stones.flatMap((stone) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/stones/${stone.slug}`,
      lastModified: new Date(),
      changeFrequency: stone.slug === 'lavender-blue' ? 'weekly' as const : 'monthly' as const,
      priority: stone.slug === 'lavender-blue' ? 0.95 : 0.8,
    }))
  );

  return [...staticPages, ...stonePages];
}
