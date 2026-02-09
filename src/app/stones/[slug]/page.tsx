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

  return {
    title: stone.metaTitle || stone.name,
    description: stone.metaDescription || stone.shortDescription,
    keywords: [
      `${stone.name.toLowerCase()} granite`,
      `${stone.name.toLowerCase()} granite price`,
      `${stone.name.toLowerCase()} granite supplier`,
      `${stone.name.toLowerCase()} granite slab`,
      'granite supplier India',
      'premium granite',
    ],
    alternates: {
      canonical: `https://www.abminerals.com/stones/${stone.slug}`,
    },
    openGraph: {
      title: `${stone.name} Granite | A B Minerals`,
      description: stone.shortDescription,
      url: `https://www.abminerals.com/stones/${stone.slug}`,
      images: stone.images.hero ? [
        {
          url: stone.images.hero,
          width: 1200,
          height: 630,
          alt: `${stone.name} granite slab`,
        },
      ] : undefined,
    },
  };
}

export default function StonePage({ params }: { params: Promise<{ slug: string }> }) {
  return <StoneDetailClient params={params} />;
}
