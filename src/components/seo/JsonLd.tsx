'use client';

import { companyInfo, contactInfo, seoDefaults } from '@/config';

// Organization Schema
export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyInfo.name,
    legalName: companyInfo.legalName,
    url: 'https://www.abminerals.com',
    logo: 'https://www.abminerals.com/logo-abm.png',
    description: companyInfo.description,
    foundingDate: companyInfo.foundedYear.toString(),
    address: {
      '@type': 'PostalAddress',
      streetAddress: contactInfo.address.line1,
      addressLocality: contactInfo.address.city,
      addressRegion: contactInfo.address.state,
      postalCode: contactInfo.address.pincode,
      addressCountry: 'IN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: contactInfo.phone.primary,
        contactType: 'sales',
        areaServed: ['IN', 'AE', 'US', 'GB', 'AU'],
        availableLanguage: ['English', 'Hindi'],
      },
    ],
    email: contactInfo.email.primary,
    sameAs: [
      // Add social media URLs when available
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Local Business Schema (for Google Maps / Local SEO)
export function LocalBusinessJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.abminerals.com',
    name: companyInfo.name,
    image: 'https://www.abminerals.com/logo-abm.png',
    url: 'https://www.abminerals.com',
    telephone: contactInfo.phone.primary,
    email: contactInfo.email.primary,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contactInfo.address.line1,
      addressLocality: contactInfo.address.city,
      addressRegion: contactInfo.address.state,
      postalCode: contactInfo.address.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: contactInfo.maps.coordinates.lat,
      longitude: contactInfo.maps.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: '$$',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Product Schema for Stone pages
interface ProductJsonLdProps {
  name: string;
  description: string;
  image: string;
  sku: string;
}

export function ProductJsonLd({ name, description, image, sku }: ProductJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: name,
    description: description,
    image: `https://www.abminerals.com${image}`,
    sku: sku,
    brand: {
      '@type': 'Brand',
      name: companyInfo.name,
    },
    manufacturer: {
      '@type': 'Organization',
      name: companyInfo.name,
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'INR',
      price: '0', // Contact for pricing
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      seller: {
        '@type': 'Organization',
        name: companyInfo.name,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// WebSite Schema with SearchAction
export function WebSiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seoDefaults.siteName,
    url: 'https://www.abminerals.com',
    description: seoDefaults.defaultDescription,
    publisher: {
      '@type': 'Organization',
      name: companyInfo.name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
