"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Button } from "./button";

interface CTAButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  glow?: boolean;
  animated?: boolean;
  className?: string;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  href,
  onClick,
  disabled = false,
  loading = false,
  fullWidth = false,
  glow = false,
  animated = true,
  className = ""
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return `btn-primary ${glow ? 'shadow-glow' : ''}`;
      case "secondary":
        return `btn-secondary ${glow ? 'shadow-glow-secondary' : ''}`;
      case "accent":
        return `btn-accent`;
      case "outline":
        return `btn-outline`;
      case "ghost":
        return `btn-ghost`;
      default:
        return `btn-primary`;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-4 py-2 text-sm font-medium rounded-lg";
      case "md":
        return "px-6 py-3 text-base font-semibold rounded-xl";
      case "lg":
        return "px-8 py-4 text-lg font-bold rounded-xl";
      case "xl":
        return "px-10 py-5 text-xl font-bold rounded-2xl";
      default:
        return "px-6 py-3 text-base font-semibold rounded-xl";
    }
  };

  const buttonContent = (
    <>
      {icon && iconPosition === "left" && (
        <span className="mr-2 flex-shrink-0">{icon}</span>
      )}
      
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
      
      {icon && iconPosition === "right" && !loading && (
        <span className="ml-2 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200">
          {icon}
        </span>
      )}
    </>
  );

  const buttonClasses = `
    ${getVariantClasses()}
    ${getSizeClasses()}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
    group relative overflow-hidden
    transition-all duration-300
    transform hover:scale-105 active:scale-95
    focus:outline-none focus:ring-4 focus:ring-primary/20
  `;

  const AnimatedWrapper = ({ children }: { children: ReactNode }) => {
    if (!animated) return <>{children}</>;
    
    return (
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    );
  };

  const handleClick = () => {
    if (disabled || loading) return;
    
    if (href) {
      window.location.href = href;
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <AnimatedWrapper>
      <button
        className={buttonClasses}
        onClick={handleClick}
        disabled={disabled || loading}
      >
        {/* Shimmer Effect */}
        <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {/* Content */}
        <span className="relative z-10 flex items-center justify-center">
          {buttonContent}
        </span>

        {/* Glow Effect */}
        {glow && (
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
      </button>
    </AnimatedWrapper>
  );
};

// Pre-configured CTA buttons for common use cases
export const PrimaryCTA: React.FC<Omit<CTAButtonProps, 'variant'>> = (props) => (
  <CTAButton variant="primary" glow {...props} />
);

export const SecondaryCTA: React.FC<Omit<CTAButtonProps, 'variant'>> = (props) => (
  <CTAButton variant="secondary" {...props} />
);

export const OutlineCTA: React.FC<Omit<CTAButtonProps, 'variant'>> = (props) => (
  <CTAButton variant="outline" {...props} />
);

export const LargeCTA: React.FC<Omit<CTAButtonProps, 'size'>> = (props) => (
  <CTAButton size="lg" glow {...props} />
);

export const FullWidthCTA: React.FC<Omit<CTAButtonProps, 'fullWidth'>> = (props) => (
  <CTAButton fullWidth glow {...props} />
);

export default CTAButton;