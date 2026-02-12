"use client";

import { motion } from "framer-motion";
import { ArrowRight, Filter, Grid, List } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Heading, Text, SectionHeader } from "@/components/ui/Typography";
import { stones } from "@/config/stones.config";
import { StoneItemListJsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

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

export function StonesClient() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <>
      {/* Stone Collection ItemList Schema for rich search results */}
      <StoneItemListJsonLd
        items={stones.map((stone, idx) => ({
          name: `${stone.name} Granite`,
          url: `https://www.abminerals.com/stones/${stone.slug}`,
          image: stone.images.hero,
          position: idx + 1,
        }))}
      />

      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-16"
        style={{ backgroundColor: '#0A0A0A' }}
      >
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.span 
              variants={fadeInUp}
              className="text-sm uppercase tracking-widest mb-4 block"
              style={{ color: '#C9A962' }}
            >
              Our Collection
            </motion.span>
            <motion.div variants={fadeInUp}>
              <Heading as="h1" size="display-lg" className="mb-6">
                Premium Granite Slabs
              </Heading>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Text size="lg" muted className="max-w-2xl">
                Our signature Lavender Blue from our own quarry, plus a variety of 
                premium granites factory-finished to perfection.
              </Text>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Stones Grid */}
      <Section padding="lg" background="charcoal-light">
        <Container>
          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center mb-12"
          >
            <Text muted>
              Showing {stones.length} stones
            </Text>
            
            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div 
                className="flex rounded-lg overflow-hidden"
                style={{ border: '1px solid rgba(245, 245, 240, 0.1)' }}
              >
                <button
                  onClick={() => setViewMode("grid")}
                  className="p-2 transition-colors"
                  style={{ 
                    backgroundColor: viewMode === "grid" ? '#C9A962' : 'transparent',
                    color: viewMode === "grid" ? '#0A0A0A' : '#A0A0A0'
                  }}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className="p-2 transition-colors"
                  style={{ 
                    backgroundColor: viewMode === "list" ? '#C9A962' : 'transparent',
                    color: viewMode === "list" ? '#0A0A0A' : '#A0A0A0'
                  }}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Grid View */}
          {viewMode === "grid" && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {stones.map((stone) => (
                <motion.div key={stone.id} variants={fadeInUp}>
                  <Link href={`/stones/${stone.slug}`} className="group block">
                    <div 
                      className="relative aspect-[3/4] overflow-hidden rounded-xl transition-all duration-500 group-hover:shadow-2xl"
                      style={{ 
                        backgroundColor: '#0A0A0A', 
                        border: '1px solid rgba(245, 245, 240, 0.05)' 
                      }}
                    >
                      {/* Stone Image */}
                      <Image
                        src={stone.images.thumbnail}
                        alt={stone.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      
                      {/* Stock badge */}
                      {stone.inStock && (
                        <div 
                          className="absolute top-4 left-4 px-2 py-1 rounded text-xs font-medium"
                          style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22C55E' }}
                        >
                          In Stock
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <span 
                          className="text-xs uppercase tracking-wider mb-1 block"
                          style={{ color: '#C9A962' }}
                        >
                          {stone.priceCategory}
                        </span>
                        <h3 
                          className="font-serif text-2xl mb-2 transition-colors"
                          style={{ color: '#F5F5F0' }}
                        >
                          {stone.name}
                        </h3>
                        <p 
                          className="text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ color: '#A0A0A0' }}
                        >
                          {stone.shortDescription}
                        </p>
                        <div 
                          className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ color: '#C9A962' }}
                        >
                          <span className="text-sm font-medium">View Details</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* List View */}
          {viewMode === "list" && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-6"
            >
              {stones.map((stone) => (
                <motion.div key={stone.id} variants={fadeInUp}>
                  <Link href={`/stones/${stone.slug}`} className="group block">
                    <div 
                      className="flex flex-col md:flex-row gap-6 p-6 rounded-xl transition-all duration-300 group-hover:shadow-xl"
                      style={{ 
                        backgroundColor: '#0A0A0A', 
                        border: '1px solid rgba(245, 245, 240, 0.05)' 
                      }}
                    >
                      {/* Image */}
                      <div className="relative w-full md:w-64 aspect-video md:aspect-[4/3] rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={stone.images.thumbnail}
                          alt={stone.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-2">
                          <span 
                            className="text-xs uppercase tracking-wider"
                            style={{ color: '#C9A962' }}
                          >
                            {stone.priceCategory}
                          </span>
                          {stone.inStock && (
                            <span 
                              className="px-2 py-0.5 rounded text-xs"
                              style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22C55E' }}
                            >
                              In Stock
                            </span>
                          )}
                        </div>
                        <h3 
                          className="font-serif text-2xl mb-2"
                          style={{ color: '#F5F5F0' }}
                        >
                          {stone.name}
                        </h3>
                        <p 
                          className="text-sm mb-4"
                          style={{ color: '#A0A0A0' }}
                        >
                          {stone.shortDescription}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {stone.specs.finishes.map((finish) => (
                            <span
                              key={finish}
                              className="px-2 py-1 rounded text-xs"
                              style={{ 
                                backgroundColor: 'rgba(245, 245, 240, 0.05)',
                                color: '#A0A0A0'
                              }}
                            >
                              {finish}
                            </span>
                          ))}
                        </div>
                        <div 
                          className="flex items-center gap-2"
                          style={{ color: '#C9A962' }}
                        >
                          <span className="text-sm font-medium">View Details</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </Container>
      </Section>
    </>
  );
}
