/**
 * ═══════════════════════════════════════════════════════════════════════
 * SITE CONFIGURATION
 * ═══════════════════════════════════════════════════════════════════════
 * 
 * Global site settings and feature flags.
 */

export const siteConfig = {
  // Site URL
  url: "https://abminerals.com",
  
  // Feature flags
  features: {
    // 3D viewer (disable on low-end devices)
    enable3D: true,
    
    // Google Sheets lead logging
    enableLeadLogging: false,  // ← Set to true when webhook is configured
    
    // Analytics
    enableAnalytics: true,
    
    // Cookie consent banner
    enableCookieConsent: true,
  },
  
  // Navigation
  navigation: {
    main: [
      { name: "Stones", href: "/stones" },
      { name: "Capabilities", href: "/capabilities" },
      { name: "Projects", href: "/projects" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
    footer: {
      stones: [
        { name: "Lavender Blue", href: "/stones/lavender-blue" },
        { name: "SK Blue", href: "/stones/sk-blue" },
        { name: "Ikon Brown", href: "/stones/ikon-brown" },
        { name: "Star White", href: "/stones/star-white" },
      ],
      company: [
        { name: "About Us", href: "/about" },
        { name: "Capabilities", href: "/capabilities" },
        { name: "Projects", href: "/projects" },
        { name: "Contact", href: "/contact" },
      ],
      legal: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
      ],
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════
// ANALYTICS CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════

export const analyticsConfig = {
  // Google Analytics
  googleAnalytics: {
    measurementId: "G-XXXXXXXXXX",     // ← PLACEHOLDER: Add GA4 measurement ID
  },
  
  // Facebook Pixel
  facebookPixel: {
    pixelId: "XXXXXXXXXXXXXXXXX",      // ← PLACEHOLDER: Add FB Pixel ID
  },
  
  // Microsoft Clarity (heatmaps)
  clarity: {
    projectId: "XXXXXXXXXX",           // ← PLACEHOLDER: Add Clarity project ID
  },
};
