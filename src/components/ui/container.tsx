/**
 * NEZA DESIGN SYSTEM - CONTAINER COMPONENT
 * 
 * Responsive container component with consistent
 * max-widths and padding across breakpoints.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ===== CONTAINER VARIANTS =====

const containerVariants = cva(
  "mx-auto w-full",
  {
    variants: {
      size: {
        sm: "max-w-screen-sm", // 640px
        md: "max-w-screen-md", // 768px
        lg: "max-w-screen-lg", // 1024px
        xl: "max-w-screen-xl", // 1280px
        "2xl": "max-w-screen-2xl", // 1536px
        full: "max-w-full",
        prose: "max-w-prose", // ~65ch for optimal reading
      },
      padding: {
        none: "",
        sm: "px-4 sm:px-6",
        default: "px-4 sm:px-6 lg:px-8",
        lg: "px-6 sm:px-8 lg:px-12",
        xl: "px-8 sm:px-12 lg:px-16",
      },
      center: {
        true: "mx-auto",
        false: "",
      },
    },
    defaultVariants: {
      size: "xl",
      padding: "default",
      center: true,
    },
  }
);

// ===== CONTAINER COMPONENT =====

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, center, as: Component = "div", ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(containerVariants({ size, padding, center }), className)}
      {...props}
    />
  )
);
Container.displayName = "Container";

// ===== SECTION CONTAINER COMPONENT =====

export interface SectionContainerProps extends ContainerProps {
  spacing?: "none" | "sm" | "default" | "lg" | "xl";
}

const SectionContainer = React.forwardRef<HTMLElement, SectionContainerProps>(
  ({ className, spacing = "default", as = "section", ...props }, ref) => {
    const spacingClasses = {
      none: "",
      sm: "py-8 sm:py-12",
      default: "py-12 sm:py-16 lg:py-20",
      lg: "py-16 sm:py-20 lg:py-24",
      xl: "py-20 sm:py-24 lg:py-32",
    };

    return (
      <Container
        ref={ref}
        as={as}
        className={cn(spacingClasses[spacing], className)}
        {...props}
      />
    );
  }
);
SectionContainer.displayName = "SectionContainer";

// ===== CONTENT CONTAINER COMPONENT =====

export interface ContentContainerProps extends ContainerProps {
  prose?: boolean;
}

const ContentContainer = React.forwardRef<HTMLDivElement, ContentContainerProps>(
  ({ className, prose = false, size, ...props }, ref) => (
    <Container
      ref={ref}
      size={prose ? "prose" : size}
      className={cn(
        prose && [
          "prose prose-neza max-w-none",
          "prose-headings:text-neza-gray-900 dark:prose-headings:text-neza-gray-100",
          "prose-p:text-neza-gray-700 dark:prose-p:text-neza-gray-300",
          "prose-a:text-neza-primary-600 dark:prose-a:text-neza-primary-400",
          "prose-strong:text-neza-gray-900 dark:prose-strong:text-neza-gray-100",
          "prose-code:text-neza-gray-900 dark:prose-code:text-neza-gray-100",
          "prose-pre:bg-neza-gray-900 dark:prose-pre:bg-neza-gray-800",
        ],
        className
      )}
      {...props}
    />
  )
);
ContentContainer.displayName = "ContentContainer";

// ===== EXPORTS =====

export { 
  Container, 
  SectionContainer, 
  ContentContainer, 
  containerVariants 
};

export type { 
  ContainerProps, 
  SectionContainerProps, 
  ContentContainerProps 
};
