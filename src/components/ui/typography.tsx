/**
 * NEZA DESIGN SYSTEM - TYPOGRAPHY COMPONENTS
 * 
 * Comprehensive typography system with mathematical scaling,
 * accessibility features, and responsive behavior.
 */

import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// ===== HEADING COMPONENT =====

const headingVariants = cva(
  "font-sans tracking-tight text-foreground scroll-m-20",
  {
    variants: {
      level: {
        1: "text-5xl font-bold leading-tight lg:text-6xl xl:text-7xl",
        2: "text-4xl font-bold leading-tight lg:text-5xl xl:text-6xl",
        3: "text-3xl font-semibold leading-snug lg:text-4xl xl:text-5xl",
        4: "text-2xl font-semibold leading-snug lg:text-3xl xl:text-4xl",
        5: "text-xl font-medium leading-normal lg:text-2xl xl:text-3xl",
        6: "text-lg font-medium leading-normal lg:text-xl xl:text-2xl",
      },
      color: {
        default: "text-neza-gray-900 dark:text-neza-gray-50",
        primary: "text-neza-primary-600 dark:text-neza-primary-400",
        secondary: "text-neza-gray-600 dark:text-neza-gray-400",
        muted: "text-neza-gray-500 dark:text-neza-gray-500",
        gradient: "bg-gradient-to-r from-neza-primary-600 to-neza-primary-800 bg-clip-text text-transparent",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      level: 1,
      color: "default",
      align: "left",
    },
  }
);

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 1, as, color, align, children, ...props }, ref) => {
    const Component = as || (`h${level}` as const);
    
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ level, color, align }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Heading.displayName = "Heading";

// ===== TEXT COMPONENT =====

const textVariants = cva(
  "font-sans text-foreground",
  {
    variants: {
      size: {
        xs: "text-xs leading-normal",
        sm: "text-sm leading-normal",
        base: "text-base leading-normal",
        lg: "text-lg leading-relaxed",
        xl: "text-xl leading-relaxed",
        "2xl": "text-2xl leading-relaxed",
      },
      weight: {
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      color: {
        default: "text-neza-gray-900 dark:text-neza-gray-100",
        primary: "text-neza-primary-600 dark:text-neza-primary-400",
        secondary: "text-neza-gray-600 dark:text-neza-gray-400",
        muted: "text-neza-gray-500 dark:text-neza-gray-500",
        success: "text-neza-success-600 dark:text-neza-success-400",
        warning: "text-neza-warning-600 dark:text-neza-warning-400",
        error: "text-neza-error-600 dark:text-neza-error-400",
        inverse: "text-white dark:text-neza-gray-900",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
        justify: "text-justify",
      },
      transform: {
        none: "normal-case",
        uppercase: "uppercase",
        lowercase: "lowercase",
        capitalize: "capitalize",
      },
    },
    defaultVariants: {
      size: "base",
      weight: "normal",
      color: "default",
      align: "left",
      transform: "none",
    },
  }
);

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div" | "label" | "strong" | "em" | "small";
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, weight, color, align, transform, as = "p", children, ...props }, ref) => {
    const Component = as;
    
    return (
      <Component
        ref={ref}
        className={cn(textVariants({ size, weight, color, align, transform }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Text.displayName = "Text";

// ===== CODE COMPONENT =====

const codeVariants = cva(
  "font-mono rounded-md border px-2 py-1 text-sm",
  {
    variants: {
      variant: {
        inline: "bg-neza-gray-100 text-neza-gray-900 dark:bg-neza-gray-800 dark:text-neza-gray-100",
        block: "bg-neza-gray-50 text-neza-gray-900 dark:bg-neza-gray-900 dark:text-neza-gray-100 p-4 overflow-x-auto",
      },
    },
    defaultVariants: {
      variant: "inline",
    },
  }
);

export interface CodeProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof codeVariants> {
  as?: "code" | "pre";
}

const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, variant, as = "code", children, ...props }, ref) => {
    const Component = as;
    
    return (
      <Component
        ref={ref}
        className={cn(codeVariants({ variant }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Code.displayName = "Code";

// ===== BLOCKQUOTE COMPONENT =====

const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  React.HTMLAttributes<HTMLQuoteElement>
>(({ className, children, ...props }, ref) => (
  <blockquote
    ref={ref}
    className={cn(
      "border-l-4 border-neza-primary-500 pl-6 italic text-neza-gray-700 dark:text-neza-gray-300",
      className
    )}
    {...props}
  >
    {children}
  </blockquote>
));
Blockquote.displayName = "Blockquote";

// ===== LIST COMPONENTS =====

const List = React.forwardRef<
  HTMLUListElement | HTMLOListElement,
  React.HTMLAttributes<HTMLUListElement | HTMLOListElement> & {
    as?: "ul" | "ol";
    variant?: "default" | "none";
  }
>(({ className, as = "ul", variant = "default", children, ...props }, ref) => {
  const Component = as;
  
  return (
    <Component
      ref={ref}
      className={cn(
        "space-y-2",
        variant === "default" && as === "ul" && "list-disc list-inside",
        variant === "default" && as === "ol" && "list-decimal list-inside",
        variant === "none" && "list-none",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});
List.displayName = "List";

const ListItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, children, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("text-neza-gray-700 dark:text-neza-gray-300", className)}
    {...props}
  >
    {children}
  </li>
));
ListItem.displayName = "ListItem";

// ===== LINK COMPONENT =====

const linkVariants = cva(
  "font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neza-primary-500 focus-visible:ring-offset-2 rounded-sm",
  {
    variants: {
      variant: {
        default: "text-neza-primary-600 hover:text-neza-primary-700 dark:text-neza-primary-400 dark:hover:text-neza-primary-300",
        subtle: "text-neza-gray-600 hover:text-neza-gray-900 dark:text-neza-gray-400 dark:hover:text-neza-gray-100",
        underline: "text-neza-primary-600 hover:text-neza-primary-700 dark:text-neza-primary-400 dark:hover:text-neza-primary-300 underline underline-offset-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  external?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, external, children, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(linkVariants({ variant }), className)}
      {...(external && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
      {...props}
    >
      {children}
      {external && (
        <span className="sr-only"> (opens in new tab)</span>
      )}
    </a>
  )
);
Link.displayName = "Link";

// ===== LEAD TEXT COMPONENT =====

const Lead = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-xl text-neza-gray-700 dark:text-neza-gray-300 leading-relaxed",
      className
    )}
    {...props}
  >
    {children}
  </p>
));
Lead.displayName = "Lead";

// ===== MUTED TEXT COMPONENT =====

const Muted = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-neza-gray-500 dark:text-neza-gray-500",
      className
    )}
    {...props}
  >
    {children}
  </p>
));
Muted.displayName = "Muted";

// ===== SMALL TEXT COMPONENT =====

const Small = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, children, ...props }, ref) => (
  <small
    ref={ref}
    className={cn(
      "text-xs text-neza-gray-500 dark:text-neza-gray-500",
      className
    )}
    {...props}
  >
    {children}
  </small>
));
Small.displayName = "Small";

// ===== EXPORTS =====

export {
  Heading,
  Text,
  Code,
  Blockquote,
  List,
  ListItem,
  Link,
  Lead,
  Muted,
  Small,
  headingVariants,
  textVariants,
  codeVariants,
  linkVariants,
};

// ===== TYPOGRAPHY UTILITIES =====

export const typographyUtils = {
  // Fluid typography using clamp()
  fluidText: {
    xs: "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
    sm: "clamp(0.875rem, 0.8rem + 0.375vw, 1rem)",
    base: "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
    lg: "clamp(1.125rem, 1rem + 0.625vw, 1.25rem)",
    xl: "clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)",
    "2xl": "clamp(1.5rem, 1.3rem + 1vw, 1.875rem)",
    "3xl": "clamp(1.875rem, 1.6rem + 1.375vw, 2.25rem)",
    "4xl": "clamp(2.25rem, 1.9rem + 1.75vw, 3rem)",
    "5xl": "clamp(3rem, 2.5rem + 2.5vw, 3.75rem)",
    "6xl": "clamp(3.75rem, 3rem + 3.75vw, 4.5rem)",
  },
  
  // Reading optimized line heights
  readingLineHeight: {
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.75",
  },
  
  // Optimal character counts for readability
  readingWidth: {
    narrow: "45ch",
    optimal: "65ch",
    wide: "75ch",
  },
};
