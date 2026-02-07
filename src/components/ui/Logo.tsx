import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

// ═══════════════════════════════════════════════════════════════════════
// LOGO COMPONENT
// Uses the ornate diamond-shaped A B Minerals logo
// ═══════════════════════════════════════════════════════════════════════

interface LogoProps {
  className?: string;
  variant?: "full" | "icon" | "text";
  size?: "sm" | "md" | "lg";
  linkToHome?: boolean;
}

const sizeConfig = {
  sm: {
    iconWidth: 32,
    iconHeight: 32,
    text: "text-lg",
  },
  md: {
    iconWidth: 44,
    iconHeight: 44,
    text: "text-xl",
  },
  lg: {
    iconWidth: 56,
    iconHeight: 56,
    text: "text-2xl",
  },
};

export function Logo({
  className,
  variant = "full",
  size = "md",
  linkToHome = true,
}: LogoProps) {
  const sizes = sizeConfig[size];
  
  const content = (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Icon/Monogram - Diamond shaped logo */}
      {(variant === "full" || variant === "icon") && (
        <div className="relative flex-shrink-0">
          <Image
            src="/logo-abm.png"
            alt="A B Minerals"
            width={sizes.iconWidth}
            height={sizes.iconHeight}
            className="object-contain"
            priority
          />
        </div>
      )}
      
      {/* Text */}
      {(variant === "full" || variant === "text") && (
        <span
          className={cn(
            "font-serif font-medium tracking-wider",
            sizes.text
          )}
          style={{ color: '#F5F5F0' }}
        >
          <span style={{ color: '#C9A962' }}>A B</span>{" "}
          <span>MINERALS</span>
        </span>
      )}
    </div>
  );
  
  if (linkToHome) {
    return (
      <Link
        href="/"
        className="transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-gold/50 rounded"
      >
        {content}
      </Link>
    );
  }
  
  return content;
}

// ═══════════════════════════════════════════════════════════════════════
// TEXT LOGO (Fallback when image not available)
// ═══════════════════════════════════════════════════════════════════════

export function TextLogo({
  className,
  size = "md",
  linkToHome = true,
}: Omit<LogoProps, "variant">) {
  const logoSizes = {
    sm: { width: 36, height: 36 },
    md: { width: 48, height: 48 },
    lg: { width: 60, height: 60 },
  };
  
  const content = (
    <div className={cn("flex items-center gap-3", className)}>
      {/* ABM Diamond Logo */}
      <div className="relative flex-shrink-0">
        <Image
          src="/logo-abm.png"
          alt="A B Minerals"
          width={logoSizes[size].width}
          height={logoSizes[size].height}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
  
  if (linkToHome) {
    return (
      <Link
        href="/"
        className="transition-opacity hover:opacity-80 focus:outline-none"
      >
        {content}
      </Link>
    );
  }
  
  return content;
}
