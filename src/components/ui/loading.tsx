/**
 * NEZA DESIGN SYSTEM - LOADING COMPONENTS
 * 
 * Premium loading components with smooth animations,
 * skeleton loaders, and progress indicators.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

// ===== SPINNER VARIANTS =====

const spinnerVariants = cva(
  "animate-spin",
  {
    variants: {
      size: {
        xs: "h-3 w-3",
        sm: "h-4 w-4",
        default: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-12 w-12",
        "2xl": "h-16 w-16",
      },
      variant: {
        default: "text-neza-primary-600 dark:text-neza-primary-400",
        muted: "text-neza-gray-400 dark:text-neza-gray-500",
        white: "text-white",
        current: "text-current",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

// ===== SPINNER COMPONENT =====

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, variant, label = "Loading...", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("inline-flex items-center justify-center", className)}
      role="status"
      aria-label={label}
      {...props}
    >
      <Loader2 className={cn(spinnerVariants({ size, variant }))} />
      <span className="sr-only">{label}</span>
    </div>
  )
);
Spinner.displayName = "Spinner";

// ===== LOADING OVERLAY COMPONENT =====

export interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  loading: boolean;
  spinner?: React.ReactNode;
  text?: string;
  backdrop?: boolean;
  blur?: boolean;
}

const LoadingOverlay = React.forwardRef<HTMLDivElement, LoadingOverlayProps>(
  ({ 
    className, 
    loading, 
    spinner, 
    text, 
    backdrop = true, 
    blur = true,
    children, 
    ...props 
  }, ref) => (
    <div ref={ref} className={cn("relative", className)} {...props}>
      {children}
      
      {loading && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center z-50",
            backdrop && "bg-white/80 dark:bg-neza-gray-900/80",
            blur && "backdrop-blur-sm"
          )}
          role="status"
          aria-label={text || "Loading..."}
        >
          <div className="flex flex-col items-center gap-3">
            {spinner || <Spinner size="lg" />}
            {text && (
              <p className="text-sm font-medium text-neza-gray-600 dark:text-neza-gray-400">
                {text}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
);
LoadingOverlay.displayName = "LoadingOverlay";

// ===== SKELETON VARIANTS =====

const skeletonVariants = cva(
  [
    "animate-pulse bg-neza-gray-200 dark:bg-neza-gray-700 rounded",
    "relative overflow-hidden",
    "before:absolute before:inset-0",
    "before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
    "before:animate-shimmer before:bg-[length:200%_100%]",
  ],
  {
    variants: {
      variant: {
        default: "",
        text: "rounded-md",
        circular: "rounded-full",
        rectangular: "rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ===== SKELETON COMPONENT =====

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(skeletonVariants({ variant }), className)}
      {...props}
    />
  )
);
Skeleton.displayName = "Skeleton";

// ===== SKELETON PRESETS =====

export interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
  lastLineWidth?: string;
}

const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ className, lines = 3, lastLineWidth = "75%", ...props }, ref) => (
    <div ref={ref} className={cn("space-y-2", className)} {...props}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          className={cn(
            "h-4",
            index === lines - 1 ? `w-[${lastLineWidth}]` : "w-full"
          )}
        />
      ))}
    </div>
  )
);
SkeletonText.displayName = "SkeletonText";

export interface SkeletonAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "default" | "lg" | "xl";
}

const SkeletonAvatar = React.forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ className, size = "default", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 w-8",
      default: "h-10 w-10",
      lg: "h-12 w-12",
      xl: "h-16 w-16",
    };

    return (
      <Skeleton
        ref={ref}
        variant="circular"
        className={cn(sizeClasses[size], className)}
        {...props}
      />
    );
  }
);
SkeletonAvatar.displayName = "SkeletonAvatar";

export interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  showAvatar?: boolean;
  showImage?: boolean;
  textLines?: number;
}

const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonCardProps>(
  ({ className, showAvatar = false, showImage = true, textLines = 3, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-4 p-4", className)} {...props}>
      {showImage && (
        <Skeleton variant="rectangular" className="h-48 w-full" />
      )}
      
      <div className="space-y-3">
        {showAvatar && (
          <div className="flex items-center space-x-3">
            <SkeletonAvatar />
            <div className="space-y-2 flex-1">
              <Skeleton variant="text" className="h-4 w-1/4" />
              <Skeleton variant="text" className="h-3 w-1/3" />
            </div>
          </div>
        )}
        
        <SkeletonText lines={textLines} />
        
        <div className="flex space-x-2">
          <Skeleton variant="rectangular" className="h-8 w-20" />
          <Skeleton variant="rectangular" className="h-8 w-16" />
        </div>
      </div>
    </div>
  )
);
SkeletonCard.displayName = "SkeletonCard";

// ===== PROGRESS COMPONENT =====

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "success" | "warning" | "error";
  showValue?: boolean;
  animated?: boolean;
  indeterminate?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    className, 
    value = 0, 
    max = 100, 
    size = "default", 
    variant = "default", 
    showValue = false,
    animated = false,
    indeterminate = false,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const sizeClasses = {
      sm: "h-1",
      default: "h-2",
      lg: "h-3",
    };

    const variantClasses = {
      default: "bg-neza-primary-600 dark:bg-neza-primary-400",
      success: "bg-neza-success-600 dark:bg-neza-success-400",
      warning: "bg-neza-warning-600 dark:bg-neza-warning-400",
      error: "bg-neza-error-600 dark:bg-neza-error-400",
    };

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <div
          className={cn(
            "w-full bg-neza-gray-200 dark:bg-neza-gray-700 rounded-full overflow-hidden",
            sizeClasses[size]
          )}
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={indeterminate ? "Loading..." : `${percentage.toFixed(0)}% complete`}
        >
          <div
            className={cn(
              "h-full transition-all duration-300 ease-out rounded-full",
              variantClasses[variant],
              animated && "animate-pulse",
              indeterminate && "animate-progress-indeterminate"
            )}
            style={{
              width: indeterminate ? "100%" : `${percentage}%`,
              transform: indeterminate ? "translateX(-100%)" : undefined,
            }}
          />
        </div>
        
        {showValue && !indeterminate && (
          <div className="mt-1 text-xs text-neza-gray-600 dark:text-neza-gray-400 text-right">
            {percentage.toFixed(0)}%
          </div>
        )}
      </div>
    );
  }
);
Progress.displayName = "Progress";

// ===== CIRCULAR PROGRESS COMPONENT =====

export interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  variant?: "default" | "success" | "warning" | "error";
  showValue?: boolean;
  indeterminate?: boolean;
}

const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
  ({ 
    className, 
    value = 0, 
    max = 100, 
    size = 40, 
    strokeWidth = 4,
    variant = "default", 
    showValue = false,
    indeterminate = false,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const variantClasses = {
      default: "stroke-neza-primary-600 dark:stroke-neza-primary-400",
      success: "stroke-neza-success-600 dark:stroke-neza-success-400",
      warning: "stroke-neza-warning-600 dark:stroke-neza-warning-400",
      error: "stroke-neza-error-600 dark:stroke-neza-error-400",
    };

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex items-center justify-center", className)}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-neza-gray-200 dark:text-neza-gray-700"
          />
          
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            className={cn(
              "transition-all duration-300 ease-out",
              variantClasses[variant],
              indeterminate && "animate-spin"
            )}
            style={{
              strokeDasharray: indeterminate ? `${circumference * 0.25} ${circumference}` : strokeDasharray,
              strokeDashoffset: indeterminate ? 0 : strokeDashoffset,
            }}
          />
        </svg>
        
        {showValue && !indeterminate && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-neza-gray-700 dark:text-neza-gray-300">
              {percentage.toFixed(0)}%
            </span>
          </div>
        )}
      </div>
    );
  }
);
CircularProgress.displayName = "CircularProgress";

// ===== EXPORTS =====

export {
  Spinner,
  LoadingOverlay,
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  Progress,
  CircularProgress,
  spinnerVariants,
  skeletonVariants,
};

export type {
  SpinnerProps,
  LoadingOverlayProps,
  SkeletonProps,
  SkeletonTextProps,
  SkeletonAvatarProps,
  SkeletonCardProps,
  ProgressProps,
  CircularProgressProps,
};
