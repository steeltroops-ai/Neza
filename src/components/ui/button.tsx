/**
 * NEZA DESIGN SYSTEM - BUTTON COMPONENT
 * 
 * Premium button component with accessibility features,
 * animations, and comprehensive variant system.
 */

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

// ===== BUTTON VARIANTS =====

const buttonVariants = cva(
  // Base styles - accessibility and interaction focused
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium",
    "transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neza-primary-500 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "relative overflow-hidden",
    "active:scale-[0.98] transform-gpu",
  ],
  {
    variants: {
      variant: {
        // Primary - Main call-to-action
        primary: [
          "bg-neza-primary-500 text-white shadow-sm",
          "hover:bg-neza-primary-600 hover:shadow-md hover:-translate-y-0.5",
          "active:bg-neza-primary-700 active:shadow-sm active:translate-y-0",
          "dark:bg-neza-primary-600 dark:hover:bg-neza-primary-500",
        ],
        
        // Secondary - Alternative actions
        secondary: [
          "bg-neza-gray-100 text-neza-gray-900 border border-neza-gray-200 shadow-sm",
          "hover:bg-neza-gray-200 hover:border-neza-gray-300 hover:shadow-md hover:-translate-y-0.5",
          "active:bg-neza-gray-300 active:shadow-sm active:translate-y-0",
          "dark:bg-neza-gray-800 dark:text-neza-gray-100 dark:border-neza-gray-700",
          "dark:hover:bg-neza-gray-700 dark:hover:border-neza-gray-600",
        ],
        
        // Ghost - Subtle actions
        ghost: [
          "text-neza-gray-700 hover:bg-neza-gray-100 hover:text-neza-gray-900",
          "active:bg-neza-gray-200",
          "dark:text-neza-gray-300 dark:hover:bg-neza-gray-800 dark:hover:text-neza-gray-100",
          "dark:active:bg-neza-gray-700",
        ],
        
        // Outline - Bordered style
        outline: [
          "border border-neza-gray-300 bg-transparent text-neza-gray-700 shadow-sm",
          "hover:bg-neza-gray-50 hover:border-neza-gray-400 hover:shadow-md hover:-translate-y-0.5",
          "active:bg-neza-gray-100 active:shadow-sm active:translate-y-0",
          "dark:border-neza-gray-600 dark:text-neza-gray-300",
          "dark:hover:bg-neza-gray-800 dark:hover:border-neza-gray-500",
        ],
        
        // Destructive - Dangerous actions
        destructive: [
          "bg-neza-error-500 text-white shadow-sm",
          "hover:bg-neza-error-600 hover:shadow-md hover:-translate-y-0.5",
          "active:bg-neza-error-700 active:shadow-sm active:translate-y-0",
          "dark:bg-neza-error-600 dark:hover:bg-neza-error-500",
        ],
        
        // Success - Positive actions
        success: [
          "bg-neza-success-500 text-white shadow-sm",
          "hover:bg-neza-success-600 hover:shadow-md hover:-translate-y-0.5",
          "active:bg-neza-success-700 active:shadow-sm active:translate-y-0",
          "dark:bg-neza-success-600 dark:hover:bg-neza-success-500",
        ],
        
        // Link - Text-like appearance
        link: [
          "text-neza-primary-600 underline-offset-4 hover:underline",
          "active:text-neza-primary-700",
          "dark:text-neza-primary-400 dark:active:text-neza-primary-300",
        ],
        
        // Premium - Glass morphism effect
        premium: [
          "bg-gradient-to-r from-neza-primary-500 to-neza-primary-700 text-white shadow-lg",
          "hover:from-neza-primary-600 hover:to-neza-primary-800 hover:shadow-xl hover:-translate-y-1",
          "active:from-neza-primary-700 active:to-neza-primary-900 active:shadow-lg active:translate-y-0",
          "before:absolute before:inset-0 before:bg-white before:opacity-0 before:transition-opacity",
          "hover:before:opacity-10",
        ],
      },
      
      size: {
        xs: "h-7 px-2 text-xs",
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-4 py-2",
        lg: "h-11 px-6 text-base",
        xl: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
      
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      fullWidth: false,
    },
  }
);

// ===== BUTTON COMPONENT =====

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...props}
      >
        {/* Loading state */}
        {loading && (
          <Loader2 
            className="h-4 w-4 animate-spin" 
            aria-hidden="true"
          />
        )}
        
        {/* Left icon */}
        {!loading && leftIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        
        {/* Button content */}
        <span className={cn(loading && "opacity-70")}>
          {loading && loadingText ? loadingText : children}
        </span>
        
        {/* Right icon */}
        {!loading && rightIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
        
        {/* Screen reader loading text */}
        {loading && (
          <span className="sr-only">
            {loadingText || "Loading..."}
          </span>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

// ===== ICON BUTTON COMPONENT =====

export interface IconButtonProps
  extends Omit<ButtonProps, "leftIcon" | "rightIcon" | "children"> {
  icon: React.ReactNode;
  "aria-label": string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, className, size = "icon", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size={size}
        className={cn("flex-shrink-0", className)}
        {...props}
      >
        <span className="flex items-center justify-center" aria-hidden="true">
          {icon}
        </span>
      </Button>
    );
  }
);
IconButton.displayName = "IconButton";

// ===== BUTTON GROUP COMPONENT =====

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  spacing?: "none" | "sm" | "md";
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = "horizontal", spacing = "sm", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex",
          orientation === "horizontal" ? "flex-row" : "flex-col",
          spacing === "sm" && "gap-2",
          spacing === "md" && "gap-4",
          spacing === "none" && "gap-0",
          className
        )}
        role="group"
        {...props}
      >
        {children}
      </div>
    );
  }
);
ButtonGroup.displayName = "ButtonGroup";

// ===== EXPORTS =====

export { Button, IconButton, ButtonGroup, buttonVariants };
export type { ButtonProps, IconButtonProps, ButtonGroupProps };
