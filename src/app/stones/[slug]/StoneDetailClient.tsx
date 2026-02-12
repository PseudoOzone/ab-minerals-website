"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MessageCircle, Download, Share2, Check } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Heading, Text, SectionHeader } from "@/components/ui/Typography";
import { stones, getStoneBySlug, Stone } from "@/config/stones.config";
import { openChatBot } from "@/lib/chatbot-events";
import { FAQJsonLd, lavenderBlueFAQs, ProductJsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { use, useState } from "react";

// ═══════════════════════════════════════════════════════════════════════
// DYNAMIC IMPORT FOR 3D VIEWER
// ═══════════════════════════════════════════════════════════════════════

import dynamic from "next/dynamic";

const SlabViewer = dynamic(
  () => import("@/components/3d/SlabViewer").then((mod) => mod.SlabViewer),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="animate-pulse" style={{ color: '#A0A0A0' }}>Loading 3D Viewer...</div>
      </div>
    )
  }
);

// ═══════════════════════════════════════════════════════════════════════
// ANIMATION VARIANTS
// ═══════════════════════════════════════════════════════════════════════

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  },
};

// ═══════════════════════════════════════════════════════════════════════
// PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function StoneDetailClient({ params }: PageProps) {
  const { slug } = use(params);
  const stone = getStoneBySlug(slug);
  const [activeImage, setActiveImage] = useState(0);
  const [show3D, setShow3D] = useState(true);

  if (!stone) {
    notFound();
  }

  // Get adjacent stones for navigation
  const currentIndex = stones.findIndex((s) => s.slug === slug);
  const prevStone = currentIndex > 0 ? stones[currentIndex - 1] : null;
  const nextStone = currentIndex < stones.length - 1 ? stones[currentIndex + 1] : null;

  const handleRequestQuote = () => {
    const stoneStepMap: Record<string, string> = {
      'lavender-blue': 'quote_stone_lavender',
      'sk-blue': 'quote_stone_skblue',
      'ikon-brown': 'quote_stone_ikon',
      'star-white': 'quote_stone_star',
    };
    openChatBot(stoneStepMap[stone.slug] || 'quote_start');
  };

  return (
    <>
      {/* Product JSON-LD Schema for rich search results */}
      <ProductJsonLd
        name={`${stone.name} Granite`}
        description={stone.shortDescription}
        image={stone.images.hero}
        sku={stone.id}
        {...(stone.slug === 'lavender-blue' ? { lowPrice: 105, highPrice: 160 } : {})}
      />

      {/* ═══════════════════════════════════════════════════════════════
          HERO / PRODUCT VIEW
          ═══════════════════════════════════════════════════════════════ */}
      <section 
        className="relative pt-24 pb-16 min-h-screen"
        style={{ backgroundColor: '#0A0A0A' }}
      >
        <Container>
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link href="/stones" className="inline-flex items-center gap-2 transition-colors hover:opacity-80" style={{ color: '#A0A0A0' }}>
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Collection</span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Product Viewer */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {/* Main Viewer */}
              <motion.div 
                variants={fadeInUp}
                className="relative aspect-square rounded-xl overflow-hidden mb-4"
                style={{ 
                  backgroundColor: '#0A0A0A',
                  border: '1px solid rgba(201, 169, 98, 0.2)'
                }}
              >
                {show3D ? (
                  <SlabViewer 
                    albedoUrl={stone.textures?.albedo || stone.images.hero}
                    normalUrl={stone.textures?.normal}
                    roughnessUrl={stone.textures?.roughness}
                  />
                ) : (
                  <Image
                    src={stone.images.gallery[activeImage] || stone.images.hero}
                    alt={stone.name}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
                
                {/* View toggle */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setShow3D(true)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      show3D ? 'opacity-100' : 'opacity-60 hover:opacity-80'
                    }`}
                    style={{ 
                      backgroundColor: show3D ? '#C9A962' : 'rgba(10, 10, 10, 0.8)',
                      color: show3D ? '#0A0A0A' : '#F5F5F0'
                    }}
                  >
                    3D View
                  </button>
                  <button
                    onClick={() => setShow3D(false)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      !show3D ? 'opacity-100' : 'opacity-60 hover:opacity-80'
                    }`}
                    style={{ 
                      backgroundColor: !show3D ? '#C9A962' : 'rgba(10, 10, 10, 0.8)',
                      color: !show3D ? '#0A0A0A' : '#F5F5F0'
                    }}
                  >
                    Photos
                  </button>
                </div>
              </motion.div>

              {/* Thumbnail Gallery */}
              {!show3D && stone.images.gallery.length > 1 && (
                <motion.div variants={fadeInUp} className="flex gap-3">
                  {stone.images.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all ${
                        activeImage === idx ? 'ring-2 ring-gold' : 'opacity-60 hover:opacity-100'
                      }`}
                      style={{ border: '1px solid rgba(201, 169, 98, 0.2)' }}
                    >
                      <Image
                        src={img}
                        alt={`${stone.name} view ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Right: Product Info */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col"
            >
              {/* Eyebrow */}
              <motion.span 
                variants={fadeInUp}
                className="text-sm uppercase tracking-widest mb-2"
                style={{ color: '#C9A962' }}
              >
                {stone.priceCategory} Collection
              </motion.span>

              {/* Title */}
              <motion.div variants={fadeInUp}>
                <Heading as="h1" size="display-md" className="mb-4">
                  {stone.name} Granite
                </Heading>
              </motion.div>

              {/* Tagline */}
              <motion.p 
                variants={fadeInUp}
                className="text-xl mb-6"
                style={{ color: '#A0A0A0' }}
              >
                {stone.tagline}
              </motion.p>

              {/* Description */}
              <motion.div variants={fadeInUp} className="mb-8">
                <Text muted className="leading-relaxed">
                  {stone.description}
                </Text>
              </motion.div>

              {/* Specifications */}
              <motion.div 
                variants={fadeInUp}
                className="mb-8 p-6 rounded-xl"
                style={{ 
                  backgroundColor: '#141414',
                  border: '1px solid rgba(245, 245, 240, 0.05)'
                }}
              >
                <h3 className="font-serif text-lg mb-4" style={{ color: '#F5F5F0' }}>
                  Specifications
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider" style={{ color: '#A0A0A0' }}>
                      Origin
                    </span>
                    <p className="font-medium" style={{ color: '#F5F5F0' }}>{stone.specs.origin}</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider" style={{ color: '#A0A0A0' }}>
                      Slab Size
                    </span>
                    <p className="font-medium" style={{ color: '#F5F5F0' }}>{stone.specs.slabSize}</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider" style={{ color: '#A0A0A0' }}>
                      Finishes
                    </span>
                    <p className="font-medium" style={{ color: '#F5F5F0' }}>{stone.specs.finishes.join(", ")}</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider" style={{ color: '#A0A0A0' }}>
                      Thicknesses
                    </span>
                    <p className="font-medium" style={{ color: '#F5F5F0' }}>{stone.specs.thicknesses.join(", ")}</p>
                  </div>
                </div>
              </motion.div>

              {/* Applications */}
              <motion.div variants={fadeInUp} className="mb-8">
                <h3 className="font-serif text-lg mb-3" style={{ color: '#F5F5F0' }}>
                  Ideal Applications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {stone.applications.map((app) => (
                    <span
                      key={app}
                      className="px-3 py-1.5 rounded-full text-sm"
                      style={{ 
                        backgroundColor: 'rgba(201, 169, 98, 0.1)',
                        color: '#C9A962',
                        border: '1px solid rgba(201, 169, 98, 0.2)'
                      }}
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Stock Status */}
              <motion.div variants={fadeInUp} className="mb-8 flex items-center gap-2">
                {stone.inStock ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span style={{ color: '#A0A0A0' }}>In Stock • Ready for dispatch</span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span style={{ color: '#A0A0A0' }}>Limited availability</span>
                  </>
                )}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Button
                  variant="gold"
                  size="lg"
                  onClick={handleRequestQuote}
                  leftIcon={<MessageCircle className="w-5 h-5" />}
                  className="flex-1"
                >
                  Get a Quote
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  leftIcon={<Download className="w-5 h-5" />}
                >
                  Download Spec Sheet
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              LAVENDER BLUE FAQ SECTION (SEO Rich Snippets)
              ═══════════════════════════════════════════════════════════════ */}
          {stone.slug === 'lavender-blue' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 pt-8"
              style={{ borderTop: '1px solid rgba(245, 245, 240, 0.05)' }}
            >
              <FAQJsonLd faqs={lavenderBlueFAQs} />
              <h2 className="font-serif text-2xl md:text-3xl mb-8" style={{ color: '#F5F5F0' }}>
                Frequently Asked Questions — Lavender Blue Granite
              </h2>
              <div className="space-y-4">
                {lavenderBlueFAQs.map((faq, i) => (
                  <details
                    key={i}
                    className="group rounded-xl p-1"
                    style={{
                      backgroundColor: '#141414',
                      border: '1px solid rgba(245, 245, 240, 0.05)',
                    }}
                  >
                    <summary
                      className="flex items-center justify-between cursor-pointer px-5 py-4 text-base md:text-lg font-medium select-none"
                      style={{ color: '#F5F5F0' }}
                    >
                      {faq.question}
                      <span className="ml-4 shrink-0 text-xl transition-transform group-open:rotate-45" style={{ color: '#C9A962' }}>+</span>
                    </summary>
                    <div className="px-5 pb-4 leading-relaxed" style={{ color: '#A0A0A0' }}>
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </motion.div>
          )}

          {/* Navigation between stones */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-between items-center mt-16 pt-8"
            style={{ borderTop: '1px solid rgba(245, 245, 240, 0.05)' }}
          >
            {prevStone ? (
              <Link 
                href={`/stones/${prevStone.slug}`}
                className="flex items-center gap-3 group transition-colors"
                style={{ color: '#A0A0A0' }}
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <span className="text-xs uppercase tracking-wider block" style={{ color: '#666' }}>Previous</span>
                  <span className="font-serif" style={{ color: '#F5F5F0' }}>{prevStone.name}</span>
                </div>
              </Link>
            ) : <div />}

            {nextStone ? (
              <Link 
                href={`/stones/${nextStone.slug}`}
                className="flex items-center gap-3 group text-right transition-colors"
                style={{ color: '#A0A0A0' }}
              >
                <div>
                  <span className="text-xs uppercase tracking-wider block" style={{ color: '#666' }}>Next</span>
                  <span className="font-serif" style={{ color: '#F5F5F0' }}>{nextStone.name}</span>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <div />}
          </motion.div>
        </Container>
      </section>
    </>
  );
}
