/**
 * NEZA DESIGN SYSTEM - CARD COMPONENT
 * 
 * Premium card component with glassmorphism effects,
 * elevation system, and responsive behavior.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ===== CARD VARIANTS =====

const cardVariants = cva(
  [
    "rounded-xl border transition-all duration-300 ease-out",
    "focus-within:ring-2 focus-within:ring-neza-primary-500/20 focus-within:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-white border-neza-gray-200 shadow-sm",
          "dark:bg-neza-gray-900 dark:border-neza-gray-800",
        ],
        elevated: [
          "bg-white border-neza-gray-200 shadow-lg",
          "hover:shadow-xl hover:-translate-y-1",
          "dark:bg-neza-gray-900 dark:border-neza-gray-800",
        ],
        outline: [
          "bg-transparent border-neza-gray-300",
          "dark:border-neza-gray-700",
        ],
        ghost: [
          "bg-neza-gray-50/50 border-transparent",
          "dark:bg-neza-gray-800/50",
        ],
        glass: [
          "bg-white/10 border-white/20 backdrop-blur-xl shadow-glass",
          "dark:bg-black/10 dark:border-white/10",
        ],
        gradient: [
          "bg-gradient-to-br from-white to-neza-gray-50 border-neza-gray-200",
          "dark:from-neza-gray-900 dark:to-neza-gray-800 dark:border-neza-gray-700",
        ],
        premium: [
          "bg-gradient-to-br from-neza-primary-50 to-white border-neza-primary-200",
          "shadow-lg shadow-neza-primary-500/10",
          "dark:from-neza-primary-950 dark:to-neza-gray-900 dark:border-neza-primary-800",
        ],
      },
      size: {
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
      interactive: {
        true: "cursor-pointer hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.99]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      interactive: false,
    },
  }
);

// ===== CARD COMPONENT =====

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, interactive, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "div";
    
    if (asChild) {
      return <>{props.children}</>;
    }

    return (
      <Comp
        ref={ref}
        className={cn(cardVariants({ variant, size, interactive }), className)}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

// ===== CARD HEADER COMPONENT =====

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// ===== CARD TITLE COMPONENT =====

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight text-neza-gray-900 dark:text-neza-gray-100",
      className
    )}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = "CardTitle";

// ===== CARD DESCRIPTION COMPONENT =====

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-neza-gray-600 dark:text-neza-gray-400",
      className
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// ===== CARD CONTENT COMPONENT =====

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-neza-gray-700 dark:text-neza-gray-300", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

// ===== CARD FOOTER COMPONENT =====

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// ===== FEATURE CARD COMPONENT =====

export interface FeatureCardProps extends CardProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ icon, title, description, action, children, className, ...props }, ref) => (
    <Card
      ref={ref}
      className={cn("text-center", className)}
      {...props}
    >
      {icon && (
        <div className="mb-4 flex justify-center">
          <div className="rounded-lg bg-neza-primary-100 p-3 text-neza-primary-600 dark:bg-neza-primary-900 dark:text-neza-primary-400">
            {icon}
          </div>
        </div>
      )}
      
      {title && (
        <CardTitle className="mb-2 text-center">
          {title}
        </CardTitle>
      )}
      
      {description && (
        <CardDescription className="mb-4 text-center">
          {description}
        </CardDescription>
      )}
      
      {children && (
        <CardContent className="mb-4">
          {children}
        </CardContent>
      )}
      
      {action && (
        <CardFooter className="justify-center pt-4">
          {action}
        </CardFooter>
      )}
    </Card>
  )
);
FeatureCard.displayName = "FeatureCard";

// ===== STAT CARD COMPONENT =====

export interface StatCardProps extends CardProps {
  label?: string;
  value?: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: React.ReactNode;
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ 
    label, 
    value, 
    change, 
    changeType = "neutral", 
    icon, 
    className, 
    ...props 
  }, ref) => {
    const changeColorClasses = {
      positive: "text-neza-success-600 dark:text-neza-success-400",
      negative: "text-neza-error-600 dark:text-neza-error-400",
      neutral: "text-neza-gray-600 dark:text-neza-gray-400",
    };

    return (
      <Card
        ref={ref}
        className={className}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {label && (
              <p className="text-sm font-medium text-neza-gray-600 dark:text-neza-gray-400">
                {label}
              </p>
            )}
            {value && (
              <p className="text-2xl font-bold text-neza-gray-900 dark:text-neza-gray-100">
                {value}
              </p>
            )}
            {change && (
              <p className={cn("text-xs", changeColorClasses[changeType])}>
                {change}
              </p>
            )}
          </div>
          
          {icon && (
            <div className="text-neza-gray-400 dark:text-neza-gray-500">
              {icon}
            </div>
          )}
        </div>
      </Card>
    );
  }
);
StatCard.displayName = "StatCard";

// ===== CARD GRID COMPONENT =====

export interface CardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: "sm" | "default" | "lg";
  responsive?: boolean;
}

const CardGrid = React.forwardRef<HTMLDivElement, CardGridProps>(
  ({ 
    className, 
    columns = 3, 
    gap = "default", 
    responsive = true, 
    ...props 
  }, ref) => {
    const columnClasses = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
      6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
    };

    const gapClasses = {
      sm: "gap-4",
      default: "gap-6",
      lg: "gap-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          responsive ? columnClasses[columns] : `grid-cols-${columns}`,
          gapClasses[gap],
          className
        )}
        {...props}
      />
    );
  }
);
CardGrid.displayName = "CardGrid";

// ===== EXPORTS =====

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  FeatureCard,
  StatCard,
  CardGrid,
  cardVariants,
};

export type {
  CardProps,
  FeatureCardProps,
  StatCardProps,
  CardGridProps,
};
