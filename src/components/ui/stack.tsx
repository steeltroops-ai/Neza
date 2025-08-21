/**
 * NEZA DESIGN SYSTEM - STACK COMPONENT
 * 
 * Flexible layout component for arranging elements
 * with consistent spacing and alignment.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ===== STACK VARIANTS =====

const stackVariants = cva(
  "flex",
  {
    variants: {
      direction: {
        row: "flex-row",
        column: "flex-col",
        "row-reverse": "flex-row-reverse",
        "column-reverse": "flex-col-reverse",
      },
      spacing: {
        0: "gap-0",
        1: "gap-1",
        2: "gap-2",
        3: "gap-3",
        4: "gap-4",
        5: "gap-5",
        6: "gap-6",
        8: "gap-8",
        10: "gap-10",
        12: "gap-12",
        16: "gap-16",
        20: "gap-20",
        24: "gap-24",
      },
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
        baseline: "items-baseline",
      },
      justify: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly",
      },
      wrap: {
        true: "flex-wrap",
        false: "flex-nowrap",
        reverse: "flex-wrap-reverse",
      },
    },
    defaultVariants: {
      direction: "column",
      spacing: 4,
      align: "stretch",
      justify: "start",
      wrap: false,
    },
  }
);

// ===== STACK COMPONENT =====

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  as?: React.ElementType;
  divider?: React.ReactNode;
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ 
    className, 
    direction, 
    spacing, 
    align, 
    justify, 
    wrap, 
    as: Component = "div", 
    divider,
    children,
    ...props 
  }, ref) => {
    const childrenArray = React.Children.toArray(children);
    
    return (
      <Component
        ref={ref}
        className={cn(stackVariants({ direction, spacing, align, justify, wrap }), className)}
        {...props}
      >
        {divider
          ? childrenArray.map((child, index) => (
              <React.Fragment key={index}>
                {child}
                {index < childrenArray.length - 1 && (
                  <div className="flex-shrink-0" aria-hidden="true">
                    {divider}
                  </div>
                )}
              </React.Fragment>
            ))
          : children}
      </Component>
    );
  }
);
Stack.displayName = "Stack";

// ===== HSTACK COMPONENT (Horizontal Stack) =====

export interface HStackProps extends Omit<StackProps, "direction"> {}

const HStack = React.forwardRef<HTMLDivElement, HStackProps>(
  ({ ...props }, ref) => (
    <Stack ref={ref} direction="row" {...props} />
  )
);
HStack.displayName = "HStack";

// ===== VSTACK COMPONENT (Vertical Stack) =====

export interface VStackProps extends Omit<StackProps, "direction"> {}

const VStack = React.forwardRef<HTMLDivElement, VStackProps>(
  ({ ...props }, ref) => (
    <Stack ref={ref} direction="column" {...props} />
  )
);
VStack.displayName = "VStack";

// ===== CENTER COMPONENT =====

export interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  inline?: boolean;
}

const Center = React.forwardRef<HTMLDivElement, CenterProps>(
  ({ className, as: Component = "div", inline = false, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        inline ? "inline-flex" : "flex",
        "items-center justify-center",
        className
      )}
      {...props}
    />
  )
);
Center.displayName = "Center";

// ===== SPACER COMPONENT =====

export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: VariantProps<typeof stackVariants>["spacing"];
  direction?: "horizontal" | "vertical";
}

const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, size = 4, direction = "vertical", ...props }, ref) => {
    const sizeClasses = {
      0: "0",
      1: "0.25rem",
      2: "0.5rem", 
      3: "0.75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      8: "2rem",
      10: "2.5rem",
      12: "3rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
    };

    const sizeValue = sizeClasses[size as keyof typeof sizeClasses] || sizeClasses[4];

    return (
      <div
        ref={ref}
        className={cn("flex-shrink-0", className)}
        style={{
          [direction === "horizontal" ? "width" : "height"]: sizeValue,
        }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);
Spacer.displayName = "Spacer";

// ===== DIVIDER COMPONENT =====

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "dashed" | "dotted";
  thickness?: "thin" | "default" | "thick";
  color?: "default" | "muted" | "primary";
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ 
    className, 
    orientation = "horizontal", 
    variant = "solid", 
    thickness = "default",
    color = "default",
    ...props 
  }, ref) => {
    const isHorizontal = orientation === "horizontal";
    
    const variantClasses = {
      solid: "border-solid",
      dashed: "border-dashed",
      dotted: "border-dotted",
    };

    const thicknessClasses = {
      thin: isHorizontal ? "border-t" : "border-l",
      default: isHorizontal ? "border-t-2" : "border-l-2",
      thick: isHorizontal ? "border-t-4" : "border-l-4",
    };

    const colorClasses = {
      default: "border-neza-gray-200 dark:border-neza-gray-700",
      muted: "border-neza-gray-100 dark:border-neza-gray-800",
      primary: "border-neza-primary-200 dark:border-neza-primary-800",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex-shrink-0",
          isHorizontal ? "w-full" : "h-full",
          variantClasses[variant],
          thicknessClasses[thickness],
          colorClasses[color],
          className
        )}
        role="separator"
        aria-orientation={orientation}
        {...props}
      />
    );
  }
);
Divider.displayName = "Divider";

// ===== GRID COMPONENT =====

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  rows?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: VariantProps<typeof stackVariants>["spacing"];
  responsive?: boolean;
  as?: React.ElementType;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ 
    className, 
    columns = 1, 
    rows, 
    gap = 4, 
    responsive = true,
    as: Component = "div",
    ...props 
  }, ref) => {
    const gapClasses = {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
      16: "gap-16",
      20: "gap-20",
      24: "gap-24",
    };

    const columnClasses = responsive ? {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
      6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
      7: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7",
      8: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8",
      9: "grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-9",
      10: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-10",
      11: "grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-11",
      12: "grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-12",
    } : {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      7: "grid-cols-7",
      8: "grid-cols-8",
      9: "grid-cols-9",
      10: "grid-cols-10",
      11: "grid-cols-11",
      12: "grid-cols-12",
    };

    const rowClasses = rows ? {
      1: "grid-rows-1",
      2: "grid-rows-2",
      3: "grid-rows-3",
      4: "grid-rows-4",
      5: "grid-rows-5",
      6: "grid-rows-6",
    } : {};

    return (
      <Component
        ref={ref}
        className={cn(
          "grid",
          columnClasses[columns as keyof typeof columnClasses],
          rows && rowClasses[rows as keyof typeof rowClasses],
          gapClasses[gap as keyof typeof gapClasses],
          className
        )}
        {...props}
      />
    );
  }
);
Grid.displayName = "Grid";

// ===== EXPORTS =====

export { 
  Stack, 
  HStack, 
  VStack, 
  Center, 
  Spacer, 
  Divider, 
  Grid, 
  stackVariants 
};

export type { 
  StackProps, 
  HStackProps, 
  VStackProps, 
  CenterProps, 
  SpacerProps, 
  DividerProps, 
  GridProps 
};
