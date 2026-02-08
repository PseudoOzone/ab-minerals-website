"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site.config";
import { contactInfo } from "@/config/company.config";

// ═══════════════════════════════════════════════════════════════════════
// HEADER COMPONENT
// ═══════════════════════════════════════════════════════════════════════

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change or resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "backdrop-blur-md py-3"
            : "bg-transparent py-5"
        )}
        style={{
          backgroundColor: isScrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
          borderBottom: isScrolled ? '1px solid rgba(245, 245, 240, 0.05)' : 'none',
        }}
      >
        <Container>
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Logo size="lg" variant="full" />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {siteConfig.navigation.main.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-sans text-sm uppercase tracking-wider transition-colors duration-300"
                  style={{ color: 'rgba(245, 245, 240, 0.8)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#C9A962'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(245, 245, 240, 0.8)'}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${contactInfo.phone.primary}`}
                className="flex items-center gap-2 transition-colors"
                style={{ color: 'rgba(245, 245, 240, 0.8)' }}
              >
                <Phone className="w-4 h-4" />
                <span className="font-sans text-sm">{contactInfo.phone.display}</span>
              </a>
              <Button variant="outline" size="sm">
                Request Quote
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-cream hover:text-gold transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-charcoal/98 backdrop-blur-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative h-full flex flex-col items-center justify-center gap-8 p-8"
            >
              {siteConfig.navigation.main.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-serif text-3xl text-cream hover:text-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="mt-8 flex flex-col items-center gap-4"
              >
                <a
                  href={`tel:${contactInfo.phone.primary}`}
                  className="flex items-center gap-2 text-gold"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-sans text-lg">{contactInfo.phone.display}</span>
                </a>
                <Button
                  variant="gold"
                  size="lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Request Quote
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
