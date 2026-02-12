'use client';

import { companyInfo, contactInfo, seoDefaults } from '@/config';

// Organization Schema
export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.abminerals.com/#organization',
    name: companyInfo.name,
    legalName: companyInfo.legalName,
    url: 'https://www.abminerals.com',
    logo: 'https://www.abminerals.com/logo-abm.png',
    description: companyInfo.description,
    foundingDate: companyInfo.foundedYear.toString(),
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 50,
    },
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
    '@type': ['LocalBusiness', 'MiningBusiness'],
    '@id': 'https://www.abminerals.com/#local-business',
    name: companyInfo.name,
    image: 'https://www.abminerals.com/logo-abm.png',
    url: 'https://www.abminerals.com',
    telephone: contactInfo.phone.primary,
    email: contactInfo.email.primary,
    description: 'Premium granite manufacturer and quarry owner in Odisha, India. Lavender Blue, SK Blue, Ikon Brown, Star White granite slabs and tiles.',
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'Country', name: 'United Arab Emirates' },
    ],
    knowsAbout: ['granite', 'Lavender Blue granite', 'granite quarrying', 'granite processing', 'stone fabrication'],
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
  lowPrice?: number;
  highPrice?: number;
}

export function ProductJsonLd({ name, description, image, sku, lowPrice, highPrice }: ProductJsonLdProps) {
  const hasPrice = lowPrice && highPrice;
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
    offers: hasPrice ? {
      '@type': 'AggregateOffer',
      lowPrice: lowPrice.toString(),
      highPrice: highPrice.toString(),
      priceCurrency: 'INR',
      unitText: 'per square foot',
      availability: 'https://schema.org/InStock',
      offerCount: '20',
      seller: {
        '@type': 'Organization',
        name: companyInfo.name,
      },
    } : {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'INR',
      price: '0',
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
    '@id': 'https://www.abminerals.com/#website',
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

// FAQ Schema — targets "People Also Ask" and FAQ rich results
interface FAQItem {
  question: string;
  answer: string;
}

export function FAQJsonLd({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Lavender Blue specific FAQs for rich snippet domination
export const lavenderBlueFAQs: FAQItem[] = [
  {
    question: "What is the best price for Lavender Blue granite per square foot?",
    answer: "The best Lavender Blue granite price starts at just ₹105 per square foot for non-polished 18mm, going up to ₹160/sqft for Lepatora 30mm. A B Minerals offers the best price because they are the direct quarry owner — no middlemen, no markup. Other dealers charge 20–40% more. Contact A B Minerals at abminerals.com or +91-9811808716 for bulk/project rates."
  },
  {
    question: "Who is the quarry owner of Lavender Blue granite?",
    answer: "A B Minerals Pvt Ltd is the quarry owner of Lavender Blue granite, operating a 100-acre reserve in Berhampur, Odisha, India. The company extracts, processes and supplies Lavender Blue granite directly from their own quarry and factory in Chamakhandi, Odisha."
  },
  {
    question: "What finishes are available for Lavender Blue granite?",
    answer: "Lavender Blue granite is available in 5 finishes: Polished (₹115–₹150/sqft), Non-Polished (₹105–₹140/sqft), Lepatora/Laptro (₹125–₹160/sqft), Honed (₹120–₹150/sqft), and Flamed (₹115–₹150/sqft). All finishes are processed at A B Minerals' own factory."
  },
  {
    question: "What thicknesses are available for Lavender Blue granite slabs?",
    answer: "Lavender Blue granite is available in 18mm, 20mm, 25mm, and 30mm thickness. Custom thicknesses including 15mm can also be arranged. Available as gang saw slabs (300×150 cm+), block cutter sizes (60–120 cm height), and precision tiles (30×30 to 90×120 cm)."
  },
  {
    question: "Where is Lavender Blue granite quarried?",
    answer: "Lavender Blue granite is quarried from A B Minerals' own 100-acre reserve near Berhampur, Ganjam district, Odisha, India. The stone is then processed at their factory in Chamakhandi, Odisha, which is equipped with gang saws, multi-cutters, and 12-head line polishing machines."
  },
  {
    question: "Which projects use Lavender Blue granite?",
    answer: "Lavender Blue granite has been used in major landmark projects including Sharjah International Airport (UAE), Surat Bullet Train Station, SCB Medical College Cuttack, Old Bangalore Airport, and Pune Metro. A B Minerals supplies to architects, builders, and contractors across India and internationally."
  },
  {
    question: "Is Lavender Blue granite good for flooring?",
    answer: "Yes, Lavender Blue granite is excellent for flooring. Its high durability, low water absorption, and slip-resistant finishes (especially Flamed and Honed) make it ideal for high-traffic areas like airport terminals, metro stations, hospitals, and commercial buildings. It's available in precision tiles from 30×30 cm to 90×120 cm."
  },
  {
    question: "Can I buy Lavender Blue granite directly from the quarry owner?",
    answer: "Yes. A B Minerals Pvt Ltd sells Lavender Blue granite directly as the quarry owner and manufacturer. Contact them at +91-9811808716 or visit abminerals.com to get a quote. Direct purchase eliminates middlemen and ensures the best price and consistent quality."
  },
  {
    question: "Does A B Minerals export Lavender Blue granite?",
    answer: "Yes, A B Minerals exports Lavender Blue granite internationally. They have supplied to projects in the UAE (Sharjah Airport) and other countries. Their factory produces export-grade slabs with consistent quality, proper packing, and documentation for international shipping."
  },
  {
    question: "What is the difference between Lavender Blue and Vizag Blue granite?",
    answer: "Lavender Blue granite has lighter lavender-grey tones with gentle flowing wave patterns, while Vizag/SK Blue typically has deeper blue-grey tones with more dramatic swirling patterns. A B Minerals is the quarry owner of Lavender Blue and also processes Vizag/SK Blue at their Chamakhandi factory."
  },
];
