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
    
    tagline: "Elegant waves of blue and grey",
    description: "Lavender Blue granite features a mesmerizing blend of lavender-grey tones with flowing wave patterns. Quarried from our own reserves in Odisha, this premium stone brings sophistication to any architectural project.",
    shortDescription: "Premium blue-grey granite with flowing wave patterns",
    
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
      finishes: ["Polished", "Flamed", "Leather"],
      thicknesses: ["18mm", "20mm", "30mm"],
      slabSize: "260×160 cm to 300×180 cm",
      origin: "Berhampur, Odisha",
    },
    
    applications: ["Building Facades", "Flooring", "Interior Cladding", "Countertops"],
    priceCategory: "Premium",
    inStock: true,
    fromOwnQuarry: true, // Our exclusive quarry in Odisha
    
    metaTitle: "Lavender Blue Granite | A B Minerals",
    metaDescription: "Premium Lavender Blue granite slabs from A B Minerals. Quarry-owned, factory-finished. Perfect for facades, flooring, and luxury interiors. Pan-India delivery.",
  },
  {
    id: "sk-blue",
    slug: "sk-blue",
    name: "SK Blue",
    
    // ← PLACEHOLDER: Update these descriptions
    tagline: "Deep lavender-blue with dramatic movement",
    description: "SK Blue granite showcases stunning grey-white tones with dramatic swirling patterns. This statement stone transforms spaces with its bold, contemporary character while maintaining timeless elegance.",
    shortDescription: "Grey-white granite with dramatic swirling patterns",
    
    color: "#9EAAB8",
    images: {
      hero: "/stones/sk-blue/slab-1.jpg",
      thumbnail: "/stones/sk-blue/slab-1.jpg",
      texture: "/stones/sk-blue/slab-1.jpg",
      gallery: [
        "/stones/sk-blue/slab-1.jpg",
      ],
    },
    textures: {
      albedo: "/stones/sk-blue/albedo.png",
      normal: "/stones/sk-blue/normal.png",
      roughness: "/stones/sk-blue/roughness.png",
    },
    
    specs: {
      finishes: ["Polished", "Flamed", "Leather"],
      thicknesses: ["18mm", "20mm", "30mm"],
      slabSize: "260×160 cm to 300×180 cm",
      origin: "Berhampur, Odisha",
    },
    
    applications: ["Building Facades", "Flooring", "Feature Walls", "Reception Areas"],
    priceCategory: "Premium",
    inStock: true,
    
    metaTitle: "SK Blue Granite | A B Minerals",
    metaDescription: "Premium SK Blue granite slabs from A B Minerals. Bold lavender-blue tones with dramatic patterns. Quarry-owned, factory-finished. Pan-India delivery.",
  },
  {
    id: "ikon-brown",
    slug: "ikon-brown",
    name: "Ikon Brown",
    
    // ← PLACEHOLDER: Update these descriptions
    tagline: "Rich brown with linear elegance",
    description: "Ikon Brown granite presents a sophisticated palette of deep warm brown tones with distinctive linear grain patterns. Its earthy elegance brings warmth and character to both traditional and contemporary designs.",
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
      finishes: ["Polished", "Flamed", "Leather"],
      thicknesses: ["18mm", "20mm", "30mm"],
      slabSize: "260×160 cm to 300×180 cm",
      origin: "Berhampur, Odisha",
    },
    
    applications: ["Hotel Interiors", "Flooring", "Lobby Areas", "Staircases"],
    priceCategory: "Premium",
    inStock: true,
    
    metaTitle: "Ikon Brown Granite | A B Minerals",
    metaDescription: "Premium Ikon Brown granite slabs from A B Minerals. Rich brown tones with linear patterns. Quarry-owned, factory-finished. Pan-India delivery.",
  },
  {
    id: "star-white",
    slug: "star-white",
    name: "Star White",
    
    tagline: "Pristine white with garnet stars",
    description: "Star White granite features a stunning white-grey base adorned with distinctive garnet crystal inclusions that sparkle like stars. This unique stone creates bright, airy spaces with natural visual interest.",
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
      finishes: ["Polished", "Flamed", "Leather"],
      thicknesses: ["18mm", "20mm", "30mm"],
      slabSize: "260×160 cm to 300×180 cm",
      origin: "Berhampur, Odisha",
    },
    
    applications: ["Government Buildings", "Corporate Offices", "Flooring", "Countertops"],
    priceCategory: "Premium",
    inStock: true,
    
    metaTitle: "Star White Granite | A B Minerals",
    metaDescription: "Premium Star White granite slabs from A B Minerals. Unique white granite with garnet inclusions. Quarry-owned, factory-finished. Pan-India delivery.",
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
