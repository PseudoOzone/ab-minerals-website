/**
 * ═══════════════════════════════════════════════════════════════════════
 * COMPANY CONFIGURATION
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * Central configuration for all company information.
 * Edit this file to update contact details, addresses, and leadership info.
 * 
 * PLACEHOLDER MARKERS: Search for "PLACEHOLDER" to find values to update
 */

// ═══════════════════════════════════════════════════════════════════════
// BASIC COMPANY INFO
// ═══════════════════════════════════════════════════════════════════════

export const companyInfo = {
  name: "A B Minerals Pvt Ltd",
  legalName: "A B Minerals Pvt Ltd",   // Legal company name
  tagline: "Lavender Blue Quarry-Owner. Factory-Finished. Premium Granite Slabs.",
  description: "Premium granite supplier with own quarry and factory finishing. Pan-India dispatch and export-ready.",
  
  // Founding
  foundedYear: 2000,                   // ← PLACEHOLDER: Update founding year
  yearsOfExperience: 25,               // ← PLACEHOLDER: Update years
  
  // Key stats
  stats: {
    monthlyCapacity: "250,000+",       // sqft
    capacityUnit: "sqft",
    yearsExperience: 25,               // ← PLACEHOLDER: Update years of experience
    projectsCompleted: 500,            // ← PLACEHOLDER: Update projects count
    quarriesOwned: 1,                  // 1 own quarry (Lavender Blue), variety stones processed at factory
    quarryAcres: 100,                  // 100 acres Lavender Blue quarry
  },
};

// ═══════════════════════════════════════════════════════════════════════
// CONTACT INFORMATION
// ═══════════════════════════════════════════════════════════════════════

export const contactInfo = {
  // Phone numbers
  phone: {
    primary: "+919811808716",          // A. N. Bakshi - Founder
    display: "+91 98118 08716",        // Display format for website
    secondary: "+919437073030",        // Operations line
  },
  
  // Email
  email: {
    primary: "office@abminerals.com",
    sales: "office@abminerals.com",
  },
  
  // Address
  address: {
    line1: "Gajapati Nagar, 8th Lane",
    line2: "",                         // ← PLACEHOLDER: Add if needed
    city: "Berhampur",
    district: "Ganjam",
    state: "Odisha",
    pincode: "760010",
    country: "India",
    
    // For display
    full: "Gajapati Nagar, 8th Lane, Berhampur, Ganjam, Odisha – 760010, India",
    short: "Berhampur, Odisha, India",
  },
  
  // Google Maps
  maps: {
    // Embed URL for contact page map display - A B Minerals Factory (Satellite view)
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1900.0!2d84.9316355!3d19.3459893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3d57001d29c99d%3A0x17e8898dab6d2652!2sAb%20Minerals!5e1!3m2!1sen!2sin!4v1707100000000!5m2!1sen!2sin",
    // Factory location - redirects customers here
    link: "https://maps.app.goo.gl/i8YRib6VGsY4743Q7",
    coordinates: {
      lat: 19.3459893,
      lng: 84.9316355,
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════
// SOCIAL MEDIA
// ═══════════════════════════════════════════════════════════════════════

export const socialLinks = {
  instagram: "",                       // ← PLACEHOLDER: Add Instagram URL
  linkedin: "",                        // ← PLACEHOLDER: Add LinkedIn URL
  youtube: "",                         // ← PLACEHOLDER: Add YouTube URL
  facebook: "",                        // ← PLACEHOLDER: Add Facebook URL
};

// ═══════════════════════════════════════════════════════════════════════
// LEADERSHIP
// ═══════════════════════════════════════════════════════════════════════

export const leadership = [
  {
    id: "founder",
    name: "A. N. Bakshi",
    fullName: "Achyuta Narayan Bakshi",
    role: "Founder & Managing Director",
    bio: "With over 25 years of experience in the granite industry, A. N. Bakshi has built A B Minerals from a single quarry into a vertically integrated operation serving landmark projects across India. His philosophy of uncompromising quality control and execution discipline has earned the trust of architects, builders, and government contractors nationwide.",
    shortBio: "Legacy, integrity, and execution discipline in every slab.",
    image: "/team/an-bakshi.jpg",
    experience: "25+ years",
    expertise: [
      "Senior Operations & Market Relationships",
      "Quality Control & Consistency Standards",
      "Tender & Bulk Project Reliability",
      "Strategic Business Development",
    ],
    phone: "+919811808716",
    isPublicFacing: true,
  },
  {
    id: "director",
    name: "Ananta Narayan Bakshi",
    fullName: "Ananta Narayan Bakshi",
    role: "Director",
    bio: "Ananta Narayan Bakshi oversees the strategic direction and operational excellence of A B Minerals. With a focus on scaling capabilities while maintaining quality standards, he leads initiatives across quarry operations, factory modernization, and market expansion.",
    shortBio: "Driving operational excellence and strategic growth.",
    image: "/team/ananta-bakshi.jpg",
    experience: "Industry veteran",
    expertise: [
      "Strategic Leadership",
      "Quarry & Factory Operations",
      "Financial Oversight",
      "Sales & Business Development",
    ],
    isPublicFacing: true,
  },
  {
    id: "director-strategy",
    name: "Anshuman Bakshi",
    fullName: "Anshuman Bakshi",
    role: "Director - Strategy & Digital",
    bio: "Anshuman Bakshi represents the next generation of leadership at A B Minerals. Combining a modern business perspective with deep industry knowledge inherited from the founding family, he spearheads digital transformation, client experience innovation, and strategic growth initiatives to position A B Minerals for the future.",
    shortBio: "Next-gen leadership driving digital innovation and strategic growth.",
    image: "/team/anshuman-bakshi.jpg",
    experience: "Next Generation",
    expertise: [
      "Digital Strategy & Technology",
      "Client Experience & Partnerships",
      "Strategic Growth Initiatives",
      "Brand & Market Positioning",
    ],
    isPublicFacing: true,
  },
];

// ═══════════════════════════════════════════════════════════════════════
// CERTIFICATIONS & MEMBERSHIPS
// ═══════════════════════════════════════════════════════════════════════

export const certifications = [
  // ← PLACEHOLDER: Add certifications
  // Example:
  // { name: "ISO 9001:2015", logo: "/certifications/iso.png" },
];

// ═══════════════════════════════════════════════════════════════════════
// BENCHMARK PROJECTS
// ═══════════════════════════════════════════════════════════════════════

export const benchmarkProjects = [
  {
    id: "scb-medical-cuttack",
    name: "SCB Medical College & Hospital",
    type: "Healthcare",
    status: "Ongoing",
    description: "Massive granite exterior cladding for Odisha's premier medical institution.",
    image: "/projects/cuttack-medical/1.jpg",
    stoneUsed: ["Lavender Blue"],
    quantity: "Large-scale cladding",
    featured: true,
    images: [
      "/projects/cuttack-medical/1.jpg",
      "/projects/cuttack-medical/2.jpg",
      "/projects/cuttack-medical/3.jpg",
      "/projects/cuttack-medical/4.jpg",
      "/projects/cuttack-medical/5.jpg",
      "/projects/cuttack-medical/6.jpg",
      "/projects/cuttack-medical/7.jpg",
    ],
  },
  {
    id: "surat-bullet-train",
    name: "Surat Bullet Train Station",
    type: "High-Speed Rail",
    status: "Ongoing",
    description: "Premium Lavender Blue granite flooring with geometric black and cream pattern for India's first bullet train station.",
    image: "/projects/surat-bullet-train/1.jpg",
    stoneUsed: ["Lavender Blue", "Absolute Black"],
    quantity: "Station flooring",
    featured: true,
    images: [
      "/projects/surat-bullet-train/1.jpg",
      "/projects/surat-bullet-train/2.jpg",
      "/projects/surat-bullet-train/3.jpg",
    ],
  },
  {
    id: "sharjah-airport",
    name: "Sharjah International Airport",
    type: "Airport",
    status: "Completed",
    description: "Elegant Lavender Blue granite flooring for the UAE's third busiest airport terminal.",
    image: "/projects/sharjah-airport/video.mp4",
    stoneUsed: ["Lavender Blue"],
    quantity: "Terminal flooring",
    featured: true,
    video: "/projects/sharjah-airport/video.mp4",
  },
  {
    id: "old-bangalore-airport",
    name: "Old Bangalore Airport",
    type: "Airport",
    status: "Completed",
    description: "Premium Lavender Blue granite flooring across terminal areas — polished finish, high-traffic rated.",
    image: "/textures/lavender-blue-hero.jpg",
    stoneUsed: ["Lavender Blue"],
    quantity: "50,000+ sqft",
    images: ["/textures/lavender-blue-hero.jpg"],
  },
  {
    id: "igi-delhi-airport",
    name: "IGI T3 Delhi Airport Food Court",
    type: "Airport",
    status: "Completed",
    description: "Lavender Blue granite flooring for the IGI Terminal 3 food court — lepatora and polished finishes.",
    image: "/textures/lavender-blue-hero.jpg",
    stoneUsed: ["Lavender Blue"],
    quantity: "75,000+ sqft",
    images: ["/textures/lavender-blue-hero.jpg"],
  },
  {
    id: "pune-metro",
    name: "Pune Metro",
    type: "Metro Rail",
    status: "Ongoing",
    description: "Lavender Blue granite flooring and platform cladding across multiple stations — flamed and polished finishes.",
    image: "/textures/lavender-blue-hero.jpg",
    stoneUsed: ["Lavender Blue"],
    quantity: "40,000+ sqft",
    images: ["/textures/lavender-blue-hero.jpg"],
  },
];

export const projectDisclaimer = "Project names used for reference; specific scope available on request.";

// ═══════════════════════════════════════════════════════════════════════
// CAPABILITIES
// ═══════════════════════════════════════════════════════════════════════

export const capabilities = [
  {
    id: "quarry",
    title: "Own Quarry",
    shortTitle: "Lavender Blue Quarry-Owner",
    description: "Secure, traceable supply from our own granite reserves in Odisha",
    icon: "Mountain",
  },
  {
    id: "factory",
    title: "Factory Processing",
    shortTitle: "Factory-Finished",
    description: "In-house cutting, shaping, and processing with modern machinery",
    icon: "Factory",
  },
  {
    id: "polishing",
    title: "Line Polishing",
    shortTitle: "Line-Polished",
    description: "Premium finish with automated line polishing for consistent quality",
    icon: "Sparkles",
  },
  {
    id: "qc",
    title: "Quality Control",
    shortTitle: "Project-Grade QC",
    description: "Rigorous shade matching and quality checks for project consistency",
    icon: "CheckCircle",
  },
  {
    id: "packing",
    title: "Packing & Dispatch",
    shortTitle: "Pan-India Dispatch",
    description: "Professional packing and logistics for safe delivery across India",
    icon: "Package",
  },
  {
    id: "export",
    title: "Export Ready",
    shortTitle: "Export-Ready",
    description: "Documentation and packaging standards for international shipping",
    icon: "Globe",
  },
];

// ═══════════════════════════════════════════════════════════════════════
// SEO DEFAULTS
// ═══════════════════════════════════════════════════════════════════════

export const seoDefaults = {
  siteName: "A B Minerals Pvt Ltd",
  titleTemplate: "%s | A B Minerals Pvt Ltd",
  defaultTitle: "A B Minerals Pvt Ltd | Premium Granite Slabs | Lavender Blue Quarry-Owner, Factory-Finished",
  defaultDescription: "Premium granite slabs from A B Minerals Pvt Ltd. Lavender Blue Quarry-Owner, factory-finished granite for architects, builders, and contractors. Lavender Blue, SK Blue, Ikon Brown, Star White. Pan-India delivery.",
  keywords: [
    "granite slabs",
    "premium granite",
    "lavender blue granite",
    "sk blue granite",
    "ikon brown granite",
    "star white granite",
    "granite supplier india",
    "odisha granite",
    "building granite",
    "project granite",
  ],
  ogImage: "/og-image.jpg",            // ← PLACEHOLDER: Add OG image
  twitterHandle: "",                   // ← PLACEHOLDER: Add Twitter handle
};
