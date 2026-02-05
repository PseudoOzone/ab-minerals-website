"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// ═══════════════════════════════════════════════════════════════════════
// DYNAMIC IMPORT FOR CLIENT-SIDE ONLY RENDERING
// Three.js components must be loaded client-side only
// ═══════════════════════════════════════════════════════════════════════

const SlabViewer = dynamic(
  () => import("./SlabViewer").then((mod) => mod.SlabViewer),
  { 
    ssr: false,
    loading: () => <SlabViewerFallback />
  }
);

// ═══════════════════════════════════════════════════════════════════════
// LOADING FALLBACK
// ═══════════════════════════════════════════════════════════════════════

function SlabViewerFallback() {
  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
      {/* Glow effect */}
      <div 
        className="absolute inset-0 blur-[80px] opacity-30" 
        style={{ background: 'radial-gradient(ellipse at center, rgba(201, 169, 98, 0.4) 0%, rgba(123, 143, 180, 0.2) 50%, transparent 70%)' }}
      />
      
      {/* Placeholder slab - proper 2:1 ratio */}
      <div 
        className="relative flex items-center justify-center"
        style={{ 
          width: '100%',
          maxWidth: '500px',
          aspectRatio: '2/1'
        }}
      >
        {/* Animated loading slab */}
        <div 
          className="w-full h-full rounded-sm transform rotate-3 shadow-2xl animate-pulse"
          style={{ 
            background: 'linear-gradient(135deg, rgba(123, 143, 180, 0.4) 0%, rgba(100, 120, 160, 0.2) 100%)',
            border: '1px solid rgba(201, 169, 98, 0.3)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        />
        <p 
          className="absolute text-sm animate-pulse"
          style={{ color: '#A0A0A0' }}
        >
          Loading 3D Viewer...
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// HERO SLAB COMPONENT
// ═══════════════════════════════════════════════════════════════════════

interface HeroSlabProps {
  textureUrl?: string;
  albedoUrl?: string;
  normalUrl?: string;
  roughnessUrl?: string;
  className?: string;
}

export function HeroSlab({ 
  textureUrl,
  albedoUrl = "/stones/lavender-blue/albedo.png",
  normalUrl = "/stones/lavender-blue/normal.png",
  roughnessUrl = "/stones/lavender-blue/roughness.png",
  className = ""
}: HeroSlabProps) {
  return (
    <div className={`relative w-full h-full ${className}`} style={{ minHeight: '450px' }}>
      <Suspense fallback={<SlabViewerFallback />}>
        <SlabViewer 
          textureUrl={textureUrl}
          albedoUrl={albedoUrl}
          normalUrl={normalUrl}
          roughnessUrl={roughnessUrl}
        />
      </Suspense>
    </div>
  );
}

export default HeroSlab;
