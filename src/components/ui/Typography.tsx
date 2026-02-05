import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// Color constants
const COLORS = {
  gold: '#C9A962',
  cream: '#F5F5F0',
  creamMuted: '#A0A0A0',
};

// ═══════════════════════════════════════════════════════════════════════
// HEADING COMPONENT
// ═══════════════════════════════════════════════════════════════════════

interface HeadingProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "display-xl" | "display-lg" | "display-md" | "display-sm" | "xl" | "lg" | "md" | "sm";
  className?: string;
  accent?: boolean;
}

const sizeClasses = {
  "display-xl": "text-4xl md:text-5xl lg:text-6xl",
  "display-lg": "text-3xl md:text-4xl lg:text-5xl",
  "display-md": "text-2xl md:text-3xl lg:text-4xl",
  "display-sm": "text-xl md:text-2xl lg:text-3xl",
  "xl": "text-3xl md:text-4xl",
  "lg": "text-2xl md:text-3xl",
  "md": "text-xl md:text-2xl",
  "sm": "text-lg md:text-xl",
};

export function Heading({
  children,
  as: Component = "h2",
  size = "lg",
  className,
  accent = false,
}: HeadingProps) {
  return (
    <Component
      className={cn(
        "font-serif font-medium tracking-tight",
        sizeClasses[size],
        className
      )}
      style={{ color: accent ? COLORS.gold : COLORS.cream }}
    >
      {children}
    </Component>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// TEXT COMPONENT
// ═══════════════════════════════════════════════════════════════════════

interface TextProps {
  children: ReactNode;
  as?: "p" | "span" | "div";
  size?: "lg" | "md" | "sm" | "xs";
  className?: string;
  muted?: boolean;
  lead?: boolean;
}

const textSizeClasses = {
  lg: "text-lg",
  md: "text-base",
  sm: "text-sm",
  xs: "text-xs",
};

export function Text({
  children,
  as: Component = "p",
  size = "md",
  className,
  muted = false,
  lead = false,
}: TextProps) {
  return (
    <Component
      className={cn(
        "font-sans leading-relaxed",
        textSizeClasses[size],
        lead && "text-lg font-light",
        className
      )}
      style={{ color: muted ? COLORS.creamMuted : COLORS.cream }}
    >
      {children}
    </Component>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SECTION HEADER COMPONENT
// ═══════════════════════════════════════════════════════════════════════

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  const alignClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };
  
  return (
    <div
      className={cn(
        "max-w-3xl mb-12 md:mb-16",
        alignClasses[align],
        className
      )}
    >
      {eyebrow && (
        <span 
          className="inline-block font-sans text-sm uppercase tracking-widest mb-4"
          style={{ color: COLORS.gold }}
        >
          {eyebrow}
        </span>
      )}
      <Heading as="h2" size="display-sm" className="mb-4">
        {title}
      </Heading>
      {description && (
        <Text size="lg" muted className="max-w-2xl mx-auto">
          {description}
        </Text>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// GOLD ACCENT TEXT
// ═══════════════════════════════════════════════════════════════════════

interface GoldTextProps {
  children: ReactNode;
  className?: string;
}

export function GoldText({ children, className }: GoldTextProps) {
  return (
    <span className={cn(className)} style={{ color: COLORS.gold }}>
      {children}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// UNIFIED TYPOGRAPHY COMPONENT
// ═══════════════════════════════════════════════════════════════════════

interface TypographyProps {
  children: ReactNode;
  variant?: 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'label' | 'small';
  className?: string;
  style?: React.CSSProperties;
}

const variantStyles: Record<string, { tag: keyof JSX.IntrinsicElements; className: string }> = {
  display: { tag: 'h1', className: 'text-4xl md:text-5xl lg:text-6xl font-light tracking-tight' },
  h1: { tag: 'h1', className: 'text-3xl md:text-4xl lg:text-5xl font-light tracking-tight' },
  h2: { tag: 'h2', className: 'text-2xl md:text-3xl lg:text-4xl font-light tracking-tight' },
  h3: { tag: 'h3', className: 'text-xl md:text-2xl font-medium' },
  h4: { tag: 'h4', className: 'text-lg md:text-xl font-medium' },
  body: { tag: 'p', className: 'text-base leading-relaxed' },
  label: { tag: 'span', className: 'text-sm uppercase tracking-widest font-medium' },
  small: { tag: 'span', className: 'text-sm' },
};

export function Typography({ children, variant = 'body', className, style }: TypographyProps) {
  const { tag: Tag, className: variantClass } = variantStyles[variant];
  const isLabel = variant === 'label';
  
  return (
    <Tag
      className={cn(variantClass, className)}
      style={{ 
        color: isLabel ? COLORS.gold : COLORS.cream,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
