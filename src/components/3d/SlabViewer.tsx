"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Float, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";
import { motion } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════
// GRANITE SLAB WITH PBR TEXTURES - PREMIUM LIGHTING
// ═══════════════════════════════════════════════════════════════════════

interface GraniteSlabProps {
  albedoUrl: string;
  normalUrl?: string;
  roughnessUrl?: string;
  isHovered: boolean;
}

function GraniteSlab({ albedoUrl, normalUrl, roughnessUrl, isHovered }: GraniteSlabProps) {
  const meshRef = useRef<THREE.Group>(null);
  
  // Load all PBR textures
  const albedoTexture = useLoader(TextureLoader, albedoUrl);
  const normalTexture = normalUrl ? useLoader(TextureLoader, normalUrl) : null;
  const roughnessTexture = roughnessUrl ? useLoader(TextureLoader, roughnessUrl) : null;
  
  // Configure textures
  useEffect(() => {
    const configureTexture = (tex: THREE.Texture | null, isSRGB = false) => {
      if (tex) {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(1, 1);
        tex.anisotropy = 16;
        tex.generateMipmaps = true;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        if (isSRGB) tex.colorSpace = THREE.SRGBColorSpace;
        tex.needsUpdate = true;
      }
    };
    
    configureTexture(albedoTexture, true);
    configureTexture(normalTexture, false);
    configureTexture(roughnessTexture, false);
  }, [albedoTexture, normalTexture, roughnessTexture]);

  // Smooth rotation animation
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle continuous rotation
      meshRef.current.rotation.y += delta * 0.05;
      
      // Hover tilt effect
      const targetRotationX = isHovered ? 0.08 : 0.2;
      meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.02;
    }
  });

  // Slab dimensions: proper 2:1 granite slab ratio
  const slabWidth = 3.5;
  const slabDepth = 1.75;
  const slabThickness = 0.1;

  return (
    <Float 
      speed={1} 
      rotationIntensity={0.08} 
      floatIntensity={0.3}
      floatingRange={[-0.08, 0.08]}
    >
      <group ref={meshRef} rotation={[0.2, 0, 0]}>
        {/* Main slab with premium PBR materials */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[slabWidth, slabThickness, slabDepth]} />
          <meshPhysicalMaterial
            map={albedoTexture}
            normalMap={normalTexture}
            roughnessMap={roughnessTexture}
            roughness={0.15}
            metalness={0.0}
            clearcoat={0.3}
            clearcoatRoughness={0.2}
            reflectivity={0.5}
            envMapIntensity={1.5}
            normalScale={new THREE.Vector2(2, 2)}
          />
        </mesh>
        
        {/* Polished beveled edge - top */}
        <mesh position={[0, slabThickness / 2 + 0.003, 0]}>
          <boxGeometry args={[slabWidth + 0.015, 0.006, slabDepth + 0.015]} />
          <meshPhysicalMaterial
            color="#d4b87a"
            emissive="#C9A962"
            emissiveIntensity={0.15}
            transparent
            opacity={0.2}
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// LOADING PLACEHOLDER
// ═══════════════════════════════════════════════════════════════════════

function LoadingFallback() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });
  
  return (
    <mesh ref={meshRef} rotation={[0.2, 0, 0]}>
      <boxGeometry args={[3.5, 0.1, 1.75]} />
      <meshStandardMaterial 
        color="#1a1a1a" 
        emissive="#C9A962"
        emissiveIntensity={0.05}
      />
    </mesh>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// CINEMATIC LIGHTING SETUP
// ═══════════════════════════════════════════════════════════════════════

function CinematicLighting() {
  return (
    <>
      {/* Custom environment with lightformers for premium look */}
      <Environment resolution={512}>
        {/* Main key light - warm white from top right */}
        <Lightformer
          form="rect"
          intensity={3}
          position={[5, 5, 2]}
          rotation={[-Math.PI / 4, Math.PI / 4, 0]}
          scale={[10, 10, 1]}
          color="#fff8f0"
        />
        
        {/* Fill light - cooler from left */}
        <Lightformer
          form="rect"
          intensity={1.5}
          position={[-5, 3, 2]}
          rotation={[-Math.PI / 6, -Math.PI / 4, 0]}
          scale={[8, 8, 1]}
          color="#e0e8f0"
        />
        
        {/* Rim light - golden accent from behind */}
        <Lightformer
          form="rect"
          intensity={2}
          position={[0, 2, -5]}
          rotation={[0, Math.PI, 0]}
          scale={[15, 5, 1]}
          color="#C9A962"
        />
        
        {/* Top soft fill */}
        <Lightformer
          form="circle"
          intensity={1}
          position={[0, 8, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[6, 6, 1]}
          color="#ffffff"
        />
        
        {/* Bottom bounce - subtle */}
        <Lightformer
          form="rect"
          intensity={0.5}
          position={[0, -3, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[10, 10, 1]}
          color="#1a1a1a"
        />
      </Environment>
      
      {/* Additional direct lights for highlights */}
      <spotLight
        position={[4, 8, 6]}
        angle={0.35}
        penumbra={1}
        intensity={50}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      
      <spotLight
        position={[-3, 4, 4]}
        angle={0.5}
        penumbra={1}
        intensity={20}
        color="#f0f4ff"
      />
      
      {/* Golden accent light */}
      <pointLight
        position={[0, 3, -4]}
        intensity={15}
        color="#C9A962"
        distance={12}
        decay={2}
      />
      
      {/* Subtle ambient for fill */}
      <ambientLight intensity={0.1} color="#1a1a1a" />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SCENE
// ═══════════════════════════════════════════════════════════════════════

interface SceneProps {
  albedoUrl: string;
  normalUrl?: string;
  roughnessUrl?: string;
  isHovered: boolean;
}

function Scene({ albedoUrl, normalUrl, roughnessUrl, isHovered }: SceneProps) {
  return (
    <>
      <CinematicLighting />
      
      {/* Main slab */}
      <Suspense fallback={<LoadingFallback />}>
        <GraniteSlab 
          albedoUrl={albedoUrl}
          normalUrl={normalUrl}
          roughnessUrl={roughnessUrl}
          isHovered={isHovered} 
        />
      </Suspense>
      
      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate
        autoRotateSpeed={0.25}
        dampingFactor={0.05}
        rotateSpeed={0.4}
      />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════

interface SlabViewerProps {
  textureUrl?: string;  // Backwards compatible - uses as albedo
  albedoUrl?: string;
  normalUrl?: string;
  roughnessUrl?: string;
  className?: string;
}

export function SlabViewer({ 
  textureUrl,
  albedoUrl,
  normalUrl,
  roughnessUrl,
  className = ""
}: SlabViewerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Use albedoUrl if provided, fallback to textureUrl for backwards compatibility
  const finalAlbedoUrl = albedoUrl || textureUrl || "/stones/lavender-blue/albedo.png";

  // If WebGL fails, show a fallback image
  if (hasError) {
    return (
      <div className={`relative w-full h-full min-h-[400px] flex items-center justify-center ${className}`}>
        <img 
          src={finalAlbedoUrl} 
          alt="Granite Slab" 
          className="max-w-full max-h-full object-contain rounded-lg"
          style={{ 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 60px rgba(201, 169, 98, 0.2)' 
          }}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`relative w-full h-full min-h-[400px] ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Canvas - Pure black transparent background */}
      <Canvas
        shadows
        camera={{ position: [0, 2.5, 6], fov: 35 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
        dpr={[1, 2]}
        style={{ 
          width: '100%', 
          height: '100%',
          background: 'transparent'
        }}
        onCreated={(state) => {
          state.scene.background = null;
        }}
        onError={() => setHasError(true)}
      >
        <Scene 
          albedoUrl={finalAlbedoUrl}
          normalUrl={normalUrl}
          roughnessUrl={roughnessUrl}
          isHovered={isHovered} 
        />
      </Canvas>
      
      {/* Interaction hint */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.4, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs px-4 py-2 rounded-full transition-opacity hover:opacity-80"
        style={{ 
          backgroundColor: 'rgba(10, 10, 10, 0.7)', 
          color: '#707070',
          border: '1px solid rgba(201, 169, 98, 0.1)',
          backdropFilter: 'blur(8px)'
        }}
      >
        Drag to rotate
      </motion.div>
    </motion.div>
  );
}

export default SlabViewer;
