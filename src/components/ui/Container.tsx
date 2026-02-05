import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// ═══════════════════════════════════════════════════════════════════════
// COLORS - Inline styles for Tailwind v4 compatibility
// ═══════════════════════════════════════════════════════════════════════
const COLORS = {
  charcoal: '#0A0A0A',
  charcoalLight: '#141414',
};

// ═══════════════════════════════════════════════════════════════════════
// CONTAINER COMPONENT
// ═══════════════════════════════════════════════════════════════════════

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  padding?: boolean;
}

const sizeClasses = {
  sm: "max-w-4xl",
  md: "max-w-6xl",
  lg: "max-w-7xl",
  xl: "max-w-8xl",
  full: "max-w-full",
};

export function Container({
  children,
  className,
  size = "lg",
  padding = true,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        sizeClasses[size],
        padding && "px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION COMPONENT
// ═══════════════════════════════════════════════════════════════════════

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  padding?: "none" | "sm" | "md" | "lg";
  background?: "charcoal" | "charcoal-light" | "gradient" | "transparent";
}

const paddingClasses = {
  none: "",
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
};

const backgroundInlineStyles: Record<string, React.CSSProperties> = {
  charcoal: { backgroundColor: COLORS.charcoal },
  "charcoal-light": { backgroundColor: COLORS.charcoalLight },
  gradient: { background: `linear-gradient(to bottom, ${COLORS.charcoal}, ${COLORS.charcoalLight})` },
  transparent: { backgroundColor: 'transparent' },
};

export function Section({
  children,
  className,
  id,
  padding = "md",
  background = "charcoal",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(paddingClasses[padding], className)}
      style={backgroundInlineStyles[background]}
    >
      {children}
    </section>
  );
}
