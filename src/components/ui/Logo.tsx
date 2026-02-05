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
            src="/logo/ab-minerals-logo.png"
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
  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };
  
  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };
  
  const content = (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Diamond icon with AB */}
      <div className={cn("relative flex-shrink-0", iconSizes[size])}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4BC7E"/>
              <stop offset="50%" stopColor="#C9A962"/>
              <stop offset="100%" stopColor="#8B7355"/>
            </linearGradient>
          </defs>
          <rect x="15" y="15" width="70" height="70" rx="2" fill="none" stroke="url(#goldGrad)" strokeWidth="3" transform="rotate(45 50 50)"/>
          <text x="50" y="58" fontFamily="Georgia, serif" fontSize="24" fontWeight="500" fill="url(#goldGrad)" textAnchor="middle">AB</text>
        </svg>
      </div>
      
      {/* Company name */}
      <span
        className={cn(
          "font-serif font-medium tracking-widest",
          textSizes[size]
        )}
        style={{ color: '#F5F5F0' }}
      >
        A B MINERALS
      </span>
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
