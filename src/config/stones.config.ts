/**
 * ═══════════════════════════════════════════════════════════════════════
 * STONES CONFIGURATION
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * Edit this file to update stone information, specs, and images.
 * Changes here will reflect on all stone listings and detail pages.
 * 
 * PLACEHOLDER MARKERS: Search for "PLACEHOLDER" to find values to update
 */

export interface Stone {
  // Identification
  id: string;
  slug: string;
  name: string;
  
  // Display
  tagline: string;
  description: string;
  shortDescription: string;
  
  // Visual
  color: string; // Primary color for UI accents
  images: {
    hero: string;      // Main display image
    thumbnail: string; // Card thumbnail
    texture: string;   // For 3D viewer (backwards compat)
    gallery: string[]; // Additional images
  };
  
  // PBR Textures for 3D Viewer
  textures?: {
    albedo: string;
    normal: string;
    roughness: string;
  };
  
  // Technical Specifications
  specs: {
    finishes: string[];
    thicknesses: string[];
    slabSize: string;
    origin: string;
  };
  
  // Business
  applications: string[];
  priceCategory: "Premium" | "Standard" | "Contact for rates";
  inStock: boolean;
  fromOwnQuarry?: boolean; // true if from A B Minerals' own quarry
  
  // SEO
  metaTitle: string;
  metaDescription: string;
}

// ═══════════════════════════════════════════════════════════════════════
// STONE CATALOG
// ═══════════════════════════════════════════════════════════════════════

export const stones: Stone[] = [
  {
    id: "lavender-blue",
    slug: "lavender-blue",
    name: "Lavender Blue",
    
    tagline: "India's Finest Lavender Blue — Direct from Quarry Owner",
    description: "Lavender Blue granite features a mesmerizing blend of lavender-grey tones with flowing wave patterns. Quarried from our own 100-acre reserve in Berhampur, Odisha, this is our signature stone — the only granite we extract ourselves. Prices start at ₹105/sqft for non-polished 18mm and go up to ₹160/sqft for lepatora 30mm finish. Used in landmark projects including Sharjah International Airport, Surat Bullet Train Station, SCB Medical College Cuttack, Old Bangalore Airport, and Pune Metro. Available in gang saw slabs (300×150 cm+), block cutter sizes (60–120 cm height), and precision tiles (30×30, 45×45, 30×60, 60×60, 90×90, 90×120 cm) — processed at our own factory in Chamakhandi, Odisha. As quarry owners and manufacturers, we offer the best Lavender Blue granite price in India with direct supply, no middlemen.",
    shortDescription: "Premium Lavender Blue granite from ₹105/sqft — quarry owner, factory-finished, pan-India delivery",
    
    color: "#7B8FA0",
    images: {
      hero: "/stones/lavender-blue/slab-1.jpg",
      thumbnail: "/stones/lavender-blue/slab-1.jpg",
      texture: "/stones/lavender-blue/slab-1.jpg",
      gallery: [
        "/stones/lavender-blue/slab-1.jpg",
      ],
    },
    textures: {
      albedo: "/stones/lavender-blue/albedo.png",
      normal: "/stones/lavender-blue/normal.png",
      roughness: "/stones/lavender-blue/roughness.png",
    },
    
    specs: {
      finishes: ["Polished", "Honed", "Laptro / Lepatora", "Flamed"],
      thicknesses: ["15mm", "18mm", "20mm", "30mm", "Custom"],
      slabSize: "Gang Saw: 300×150 cm+ | Block Cutter: 60–120 cm height | Tiles: 30×30 to 90×120 cm",
      origin: "Own Quarry — Berhampur, Odisha",
    },
    
    applications: ["Airport Terminals", "Metro Stations", "Building Facades", "Flooring", "Interior Cladding", "Hospital Exteriors", "Countertops"],
    priceCategory: "Premium",
    inStock: true,
    fromOwnQuarry: true, // Our exclusive quarry in Odisha
    
    metaTitle: "Lavender Blue Granite Best Price ₹105/sqft — Quarry Owner Direct | A B Minerals",
    metaDescription: "Best Lavender Blue granite price in India — ₹105 to ₹160/sqft direct from quarry owner. No middlemen, no markup. A B Minerals Pvt Ltd, Odisha. Polished, honed, flamed, lepatora. 18mm–30mm slabs & tiles. Sharjah Airport, Surat Bullet Train supplier. Pan-India & export.",
  },
  {
    id: "sk-blue",
    slug: "sk-blue",
    name: "Vizag/SK Blue",
    
    // ← PLACEHOLDER: Update these descriptions
    tagline: "Deep lavender-blue with dramatic movement",
    description: "SK Blue granite showcases stunning grey-white tones with dramatic swirling patterns. Factory-processed at our Chamakhandi facility using multi-cutters and 12-head line polishers, this statement stone transforms spaces with its bold, contemporary character. Used in IGI Delhi Airport international terminal. Available in gang saw slabs, block cutter sizes, and precision tiles with all four finishes — Polished, Honed, Laptro, and Flamed.",
    shortDescription: "Grey-white granite with dramatic swirling patterns",
    
    color: "#9EAAB8",
    images: {
      hero: "/stones/sk-blue/slab-1.png",
      thumbnail: "/stones/sk-blue/slab-1.png",
      texture: "/stones/sk-blue/slab-1.png",
      gallery: [
        "/stones/sk-blue/slab-1.png",
      ],
    },
    textures: {
      albedo: "/stones/sk-blue/albedo.png",
      normal: "/stones/sk-blue/normal.png",
      roughness: "/stones/sk-blue/roughness.png",
    },
    
    specs: {
      finishes: ["Polished", "Honed", "Laptro / Lepatora", "Flamed"],
      thicknesses: ["15mm", "18mm", "20mm", "30mm", "Custom"],
      slabSize: "Gang Saw: 300×150 cm+ | Block Cutter: 60–120 cm height | Tiles: 30×30 to 90×120 cm",
      origin: "Factory-processed — Chamakhandi, Odisha",
    },
    
    applications: ["Airport Terminals", "Building Facades", "Flooring", "Feature Walls", "Reception Areas"],
    priceCategory: "Premium",
    inStock: true,
    
    metaTitle: "Vizag/SK Blue Granite | A B Minerals Pvt Ltd",
    metaDescription: "Premium Vizag/SK Blue granite slabs from A B Minerals Pvt Ltd. Bold lavender-blue tones with dramatic patterns. Factory-finished and quality assured. Pan-India delivery.",
  },
  {
    id: "ikon-brown",
    slug: "ikon-brown",
    name: "Ikon Brown",
    
    // ← PLACEHOLDER: Update these descriptions
    tagline: "Rich brown with linear elegance",
    description: "Ikon Brown granite presents a sophisticated palette of deep warm brown tones with distinctive linear grain patterns. Factory-processed at our Chamakhandi facility with multi-cutters and precision polishing, its earthy elegance brings warmth to both traditional and contemporary designs. Used in IGI Delhi Airport. Available in all four finishes — Polished, Honed, Laptro, and Flamed — with custom thickness options.",
    shortDescription: "Warm brown granite with distinctive linear patterns",
    
    color: "#5C4A3D",
    images: {
      hero: "/stones/ikon-brown/slab-1.jpg",
      thumbnail: "/stones/ikon-brown/slab-1.jpg",
      texture: "/stones/ikon-brown/slab-1.jpg",
      gallery: [
        "/stones/ikon-brown/slab-1.jpg",
      ],
    },
    textures: {
      albedo: "/stones/ikon-brown/albedo.png",
      normal: "/stones/ikon-brown/normal.png",
      roughness: "/stones/ikon-brown/roughness.png",
    },
    
    specs: {
      finishes: ["Polished", "Honed", "Laptro / Lepatora", "Flamed"],
      thicknesses: ["15mm", "18mm", "20mm", "30mm", "Custom"],
      slabSize: "Gang Saw: 300×150 cm+ | Block Cutter: 60–120 cm height | Tiles: 30×30 to 90×120 cm",
      origin: "Factory-processed — Chamakhandi, Odisha",
    },
    
    applications: ["Airport Terminals", "Hotel Interiors", "Flooring", "Lobby Areas", "Staircases"],
    priceCategory: "Premium",
    inStock: true,
    
    metaTitle: "Ikon Brown Granite | A B Minerals Pvt Ltd",
    metaDescription: "Premium Ikon Brown granite slabs from A B Minerals Pvt Ltd. Rich brown tones with linear patterns. Factory-finished and quality assured. Pan-India delivery.",
  },
  {
    id: "star-white",
    slug: "star-white",
    name: "Star White",
    
    tagline: "Pristine white with garnet stars",
    description: "Star White granite features a stunning white-grey base adorned with distinctive garnet crystal inclusions that sparkle like stars. Factory-processed at our Chamakhandi facility with 12-head polishing line for maximum luster. Used in Old Bangalore Airport alongside Lavender Blue. Available in all finishes — Polished, Honed, Laptro, and Flamed — with custom thickness and size options.",
    shortDescription: "White-grey granite with sparkling garnet inclusions",
    
    color: "#D8D8D8",
    images: {
      hero: "/stones/star-white/slab-1.jpg",
      thumbnail: "/stones/star-white/slab-1.jpg",
      texture: "/stones/star-white/slab-1.jpg",
      gallery: [
        "/stones/star-white/slab-1.jpg",
      ],
    },
    textures: {
      albedo: "/stones/star-white/albedo.png",
      normal: "/stones/star-white/normal.png",
      roughness: "/stones/star-white/roughness.png",
    },
    
    specs: {
      finishes: ["Polished", "Honed", "Laptro / Lepatora", "Flamed"],
      thicknesses: ["15mm", "18mm", "20mm", "30mm", "Custom"],
      slabSize: "Gang Saw: 300×150 cm+ | Block Cutter: 60–120 cm height | Tiles: 30×30 to 90×120 cm",
      origin: "Factory-processed — Chamakhandi, Odisha",
    },
    
    applications: ["Airport Terminals", "Government Buildings", "Corporate Offices", "Flooring", "Countertops"],
    priceCategory: "Premium",
    inStock: true,
    
    metaTitle: "Star White Granite | A B Minerals Pvt Ltd",
    metaDescription: "Premium Star White granite slabs from A B Minerals Pvt Ltd. Unique white granite with garnet inclusions. Factory-finished and quality assured. Pan-India delivery.",
  },
];

// ═══════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════

export const getStoneBySlug = (slug: string): Stone | undefined => {
  return stones.find((stone) => stone.slug === slug);
};

export const getStoneById = (id: string): Stone | undefined => {
  return stones.find((stone) => stone.id === id);
};

export const getAllStoneSlugs = (): string[] => {
  return stones.map((stone) => stone.slug);
};

export const getInStockStones = (): Stone[] => {
  return stones.filter((stone) => stone.inStock);
};
