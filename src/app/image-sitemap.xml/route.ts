import { stones } from '@/config/stones.config';

/**
 * IMAGE SITEMAP — Critical for Google Image Search ranking
 * 
 * Google uses image sitemaps to discover and index images.
 * This generates /image-sitemap.xml with all stone images.
 * 
 * @see https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps
 */
export async function GET() {
  const baseUrl = 'https://www.abminerals.com';

  const imageEntries = stones.map((stone) => {
    const pageUrl = `${baseUrl}/stones/${stone.slug}`;
    const isLavenderBlue = stone.slug === 'lavender-blue';

    // Collect all images for this stone
    const allImages = [
      stone.images.hero,
      ...stone.images.gallery.filter((img) => img !== stone.images.hero),
    ];

    const imageXml = allImages
      .map((img) => {
        const title = isLavenderBlue
          ? `Lavender Blue Granite slab — polished finish by A B Minerals quarry owner Odisha India`
          : `${stone.name} Granite slab — ${stone.specs.finishes[0]} finish by A B Minerals`;

        const caption = stone.imageAlt || `${stone.name} Granite by A B Minerals Pvt Ltd`;

        const geoLocation = isLavenderBlue
          ? 'Berhampur, Odisha, India'
          : 'Chamakhandi, Odisha, India';

        return `
      <image:image>
        <image:loc>${baseUrl}${img}</image:loc>
        <image:title>${escapeXml(title)}</image:title>
        <image:caption>${escapeXml(caption)}</image:caption>
        <image:geo_location>${geoLocation}</image:geo_location>
        <image:license>https://www.abminerals.com/contact</image:license>
      </image:image>`;
      })
      .join('');

    return `
  <url>
    <loc>${pageUrl}</loc>${imageXml}
  </url>`;
  });

  // Also add images from the main stones listing page
  const stonesListingImages = stones
    .map((stone) => {
      return `
      <image:image>
        <image:loc>${baseUrl}${stone.images.thumbnail}</image:loc>
        <image:title>${escapeXml(`${stone.name} Granite — A B Minerals Pvt Ltd`)}</image:title>
        <image:caption>${escapeXml(stone.imageAlt || `${stone.name} Granite by A B Minerals`)}</image:caption>
      </image:image>`;
    })
    .join('');

  const stonesListingEntry = `
  <url>
    <loc>${baseUrl}/stones</loc>${stonesListingImages}
  </url>`;

  // Home page with hero images
  const homeImages = stones
    .slice(0, 2) // Feature top stones on home
    .map((stone) => {
      return `
      <image:image>
        <image:loc>${baseUrl}${stone.images.hero}</image:loc>
        <image:title>${escapeXml(`${stone.name} Granite — A B Minerals Premium Granite`)}</image:title>
        <image:caption>${escapeXml(stone.imageAlt || `${stone.name} Granite`)}</image:caption>
      </image:image>`;
    })
    .join('');

  const homeEntry = `
  <url>
    <loc>${baseUrl}</loc>${homeImages}
  </url>`;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${homeEntry}
${stonesListingEntry}
${imageEntries.join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
