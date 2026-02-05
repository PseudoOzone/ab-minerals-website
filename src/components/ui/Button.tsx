"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════
// BUTTON COMPONENT - With inline styles for reliable gold colors
// ═══════════════════════════════════════════════════════════════════════

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "gold";
type ButtonSize = "sm" | "md" | "lg" | "xl";

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
  xl: "px-10 py-5 text-xl",
};

// Variant-specific inline styles for reliable color rendering
const variantInlineStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: '#C9A962',
    color: '#0A0A0A',
  },
  secondary: {
    backgroundColor: '#141414',
    color: '#F5F5F0',
    border: '1px solid rgba(245, 245, 240, 0.1)',
  },
  outline: {
    backgroundColor: 'transparent',
    color: '#C9A962',
    border: '2px solid #C9A962',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: '#F5F5F0',
  },
  gold: {
    background: 'linear-gradient(to right, #C9A962, #8B7355)',
    color: '#0A0A0A',
    boxShadow: '0 10px 25px -5px rgba(201, 169, 98, 0.3)',
  },
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        style={{ ...variantInlineStyles[variant], ...style }}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center gap-2",
          "font-sans font-medium",
          "rounded-sm",
          "transition-all duration-300",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "hover:opacity-90 active:opacity-80",
          // Size
          sizeStyles[size],
          // Variant-specific classes
          variant === "gold" && "font-semibold",
          // Full width
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
