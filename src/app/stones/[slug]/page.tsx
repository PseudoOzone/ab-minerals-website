import type { Metadata } from 'next';
import { stones, getStoneBySlug } from '@/config/stones.config';
import { StoneDetailClient } from './StoneDetailClient';

// Generate static params for all stone slugs
export async function generateStaticParams() {
  return stones.map((stone) => ({
    slug: stone.slug,
  }));
}

// Generate dynamic metadata based on the stone
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const stone = getStoneBySlug(slug);
  
  if (!stone) {
    return {
      title: 'Stone Not Found',
      description: 'The requested granite variety was not found.',
    };
  }

  // Build rich keywords — extra long-tail for Lavender Blue
  const baseKeywords = [
    `${stone.name.toLowerCase()} granite`,
    `${stone.name.toLowerCase()} granite price`,
    `${stone.name.toLowerCase()} granite supplier`,
    `${stone.name.toLowerCase()} granite slab`,
    `${stone.name.toLowerCase()} granite manufacturer`,
    'granite supplier India',
    'premium granite',
  ];

  const lavenderBlueKeywords = stone.slug === 'lavender-blue' ? [
    // Correct spellings — long-tail
    'lavender blue granite price per square foot',
    'lavender blue granite price India',
    'lavender blue granite quarry owner',
    'lavender blue granite Odisha',
    'lavender blue granite supplier',
    'lavender blue granite manufacturer',
    'lavender blue granite slab price',
    'lavender blue granite tiles',
    'lavender blue granite polished',
    'lavender blue granite honed',
    'lavender blue granite flamed',
    'lavender blue granite lepatora',
    'lavender blue granite countertop',
    'lavender blue granite flooring',
    'lavender blue granite facade',
    'lavender blue granite airport',
    'lavender blue granite exporters India',
    'blue granite India price',
    'best lavender blue granite',
    'cheapest lavender blue granite',
    'lavender blue granite factory',
    'lavender blue granite direct from quarry',
    'buy lavender blue granite online',
    'lavender blue granite near me',
    'lavender blue granite wholesale',
    // Common misspellings
    'lavendar blue granite', 'lavendar blue granite price',
    'lavander blue granite', 'lavander blue granite price',
    'lavender blu granite', 'lavendor blue granite',
    'lavnder blue granite', 'lavender blue granit',
    'lavendar blue granit', 'lavander blue',
    'lavendar blue', 'lavendar blue granite supplier',
    'lavander blue granite supplier',
    'lavendar blue granite quarry owner',
  ] : [];

  const keywords = [...baseKeywords, ...lavenderBlueKeywords];

  return {
    title: stone.metaTitle || stone.name,
    description: stone.metaDescription || stone.shortDescription,
    keywords,
    alternates: {
      canonical: `https://www.abminerals.com/stones/${stone.slug}`,
    },
    openGraph: {
      title: stone.slug === 'lavender-blue'
        ? 'Lavender Blue Granite — Lowest Price Direct from Quarry Owner | A B Minerals'
        : `${stone.name} Granite | A B Minerals Pvt Ltd`,
      description: stone.slug === 'lavender-blue'
        ? 'Lavender Blue granite at lowest price — direct from quarry owner A B Minerals. No middlemen. Polished, honed, flamed, lepatora. Pan-India & export.'
        : stone.shortDescription,
      url: `https://www.abminerals.com/stones/${stone.slug}`,
      images: stone.images.hero ? [
        {
          url: stone.images.hero,
          width: 1200,
          height: 630,
          alt: stone.slug === 'lavender-blue'
            ? 'Lavender Blue granite slab — polished finish by A B Minerals quarry owner Odisha'
            : `${stone.name} granite slab`,
        },
      ] : undefined,
    },
  };
}

export default function StonePage({ params }: { params: Promise<{ slug: string }> }) {
  return <StoneDetailClient params={params} />;
}
