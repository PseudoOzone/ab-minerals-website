import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Linkedin, Youtube } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { companyInfo, contactInfo, socialLinks } from "@/config/company.config";
import { siteConfig } from "@/config/site.config";

// ═══════════════════════════════════════════════════════════════════════
// COLORS - Inline styles for Tailwind v4 compatibility
// ═══════════════════════════════════════════════════════════════════════
const COLORS = {
  charcoalDark: '#050505',
  cream: '#F5F5F0',
  creamMuted: '#A0A0A0',
  gold: '#C9A962',
  borderLight: 'rgba(245, 245, 240, 0.05)',
};

// ═══════════════════════════════════════════════════════════════════════
// FOOTER COMPONENT
// ═══════════════════════════════════════════════════════════════════════

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      style={{ 
        backgroundColor: COLORS.charcoalDark, 
        borderTop: `1px solid ${COLORS.borderLight}` 
      }}
    >
      {/* Main Footer */}
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Logo size="md" variant="icon" linkToHome={false} className="mb-6" />
            <p className="text-sm leading-relaxed mb-6" style={{ color: COLORS.creamMuted }}>
              {companyInfo.tagline}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:opacity-80"
                  style={{ color: COLORS.creamMuted }}
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:opacity-80"
                  style={{ color: COLORS.creamMuted }}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:opacity-80"
                  style={{ color: COLORS.creamMuted }}
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Stones Column */}
          <div>
            <h4 className="font-serif text-lg mb-6" style={{ color: COLORS.cream }}>Our Stones</h4>
            <ul className="space-y-3">
              {siteConfig.navigation.footer.stones.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="transition-colors text-sm hover:opacity-80"
                    style={{ color: COLORS.creamMuted }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-serif text-lg mb-6" style={{ color: COLORS.cream }}>Company</h4>
            <ul className="space-y-3">
              {siteConfig.navigation.footer.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="transition-colors text-sm hover:opacity-80"
                    style={{ color: COLORS.creamMuted }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-serif text-lg mb-6" style={{ color: COLORS.cream }}>Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={contactInfo.maps.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 transition-colors text-sm group hover:opacity-80"
                  style={{ color: COLORS.creamMuted }}
                >
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>{contactInfo.address.full}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactInfo.phone.primary}`}
                  className="flex items-center gap-3 transition-colors text-sm hover:opacity-80"
                  style={{ color: COLORS.creamMuted }}
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{contactInfo.phone.display}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactInfo.email.primary}`}
                  className="flex items-center gap-3 transition-colors text-sm hover:opacity-80"
                  style={{ color: COLORS.creamMuted }}
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>{contactInfo.email.primary}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div style={{ borderTop: `1px solid ${COLORS.borderLight}` }}>
        <Container className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs" style={{ color: COLORS.creamMuted }}>
              © {currentYear} {companyInfo.name}. All rights reserved.
            </p>
            
            <div className="flex gap-6">
              {siteConfig.navigation.footer.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="transition-colors text-xs hover:opacity-80"
                  style={{ color: COLORS.creamMuted }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
