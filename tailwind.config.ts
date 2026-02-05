import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ═══════════════════════════════════════════════════════════════
      // A B MINERALS - LUXURY COLOR PALETTE
      // ═══════════════════════════════════════════════════════════════
      colors: {
        // Primary backgrounds
        charcoal: {
          DEFAULT: "#0A0A0A",
          light: "#141414",
          medium: "#1A1A1A",
          dark: "#050505",
        },
        // Gold accent system
        gold: {
          DEFAULT: "#C9A962",
          light: "#D4BC7E",
          dark: "#8B7355",
          muted: "#A08B5B",
        },
        // Text colors
        cream: {
          DEFAULT: "#F5F5F0",
          dark: "#E8E8E0",
          muted: "#A0A0A0",
        },
        // Stone-specific accents
        stone: {
          blue: "#6B7B8C",
          lavender: "#8B7B9C",
          brown: "#6B5B4B",
          white: "#E0E0E0",
        },
      },
      // ═══════════════════════════════════════════════════════════════
      // TYPOGRAPHY
      // ═══════════════════════════════════════════════════════════════
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Display sizes for headlines
        "display-xl": ["5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["4rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["3rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-sm": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        // Body sizes
        "body-lg": ["1.25rem", { lineHeight: "1.7" }],
        "body-md": ["1.125rem", { lineHeight: "1.7" }],
        "body-sm": ["1rem", { lineHeight: "1.6" }],
        "body-xs": ["0.875rem", { lineHeight: "1.5" }],
      },
      // ═══════════════════════════════════════════════════════════════
      // SPACING & LAYOUT
      // ═══════════════════════════════════════════════════════════════
      spacing: {
        "section": "8rem",
        "section-sm": "5rem",
        "container": "1.5rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      // ═══════════════════════════════════════════════════════════════
      // ANIMATIONS
      // ═══════════════════════════════════════════════════════════════
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        "shimmer": "shimmer 2s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(201, 169, 98, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(201, 169, 98, 0.6)" },
        },
      },
      // ═══════════════════════════════════════════════════════════════
      // TRANSITIONS
      // ═══════════════════════════════════════════════════════════════
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },
      transitionTimingFunction: {
        "luxury": "cubic-bezier(0.4, 0, 0.2, 1)",
        "smooth": "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      // ═══════════════════════════════════════════════════════════════
      // BACKDROP & EFFECTS
      // ═══════════════════════════════════════════════════════════════
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-gold": "linear-gradient(135deg, #C9A962 0%, #8B7355 100%)",
        "gradient-dark": "linear-gradient(180deg, #0A0A0A 0%, #141414 100%)",
        "noise": "url('/textures/noise.png')",
      },
    },
  },
  plugins: [],
};

export default config;
