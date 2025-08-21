/**
 * NEZA DESIGN SYSTEM - BADGE COMPONENT
 * 
 * Premium badge component with variants, sizes,
 * and accessibility features.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

// ===== BADGE VARIANTS =====

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1 rounded-full border font-medium",
    "transition-all duration-200 ease-out",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-neza-gray-200 bg-neza-gray-100 text-neza-gray-800",
          "dark:border-neza-gray-700 dark:bg-neza-gray-800 dark:text-neza-gray-200",
        ],
        primary: [
          "border-neza-primary-200 bg-neza-primary-100 text-neza-primary-800",
          "dark:border-neza-primary-800 dark:bg-neza-primary-900 dark:text-neza-primary-200",
        ],
        secondary: [
          "border-neza-gray-300 bg-neza-gray-200 text-neza-gray-700",
          "dark:border-neza-gray-600 dark:bg-neza-gray-700 dark:text-neza-gray-300",
        ],
        success: [
          "border-neza-success-200 bg-neza-success-100 text-neza-success-800",
          "dark:border-neza-success-800 dark:bg-neza-success-900 dark:text-neza-success-200",
        ],
        warning: [
          "border-neza-warning-200 bg-neza-warning-100 text-neza-warning-800",
          "dark:border-neza-warning-800 dark:bg-neza-warning-900 dark:text-neza-warning-200",
        ],
        error: [
          "border-neza-error-200 bg-neza-error-100 text-neza-error-800",
          "dark:border-neza-error-800 dark:bg-neza-error-900 dark:text-neza-error-200",
        ],
        info: [
          "border-blue-200 bg-blue-100 text-blue-800",
          "dark:border-blue-800 dark:bg-blue-900 dark:text-blue-200",
        ],
        outline: [
          "border-neza-gray-300 bg-transparent text-neza-gray-700",
          "dark:border-neza-gray-600 dark:text-neza-gray-300",
        ],
        solid: [
          "border-neza-primary-500 bg-neza-primary-500 text-white",
          "dark:border-neza-primary-600 dark:bg-neza-primary-600",
        ],
        gradient: [
          "border-transparent bg-gradient-to-r from-neza-primary-500 to-neza-primary-700 text-white",
          "dark:from-neza-primary-600 dark:to-neza-primary-800",
        ],
      },
      size: {
        xs: "px-2 py-0.5 text-xs",
        sm: "px-2.5 py-0.5 text-xs",
        default: "px-3 py-1 text-sm",
        lg: "px-3.5 py-1.5 text-sm",
        xl: "px-4 py-2 text-base",
      },
      interactive: {
        true: "cursor-pointer hover:opacity-80 active:scale-95",
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

// ===== BADGE COMPONENT =====

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  dot?: boolean;
  pulse?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({
    className,
    variant,
    size,
    interactive,
    leftIcon,
    rightIcon,
    removable,
    onRemove,
    dot,
    pulse,
    children,
    onClick,
    ...props
  }, ref) => {
    const isInteractive = interactive || onClick || removable;

    return (
      <div
        ref={ref}
        className={cn(
          badgeVariants({ 
            variant, 
            size, 
            interactive: isInteractive 
          }),
          pulse && "animate-pulse",
          className
        )}
        onClick={onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick(e as any);
          }
        } : undefined}
        {...props}
      >
        {/* Dot indicator */}
        {dot && (
          <span
            className={cn(
              "h-2 w-2 rounded-full",
              variant === "primary" && "bg-neza-primary-500",
              variant === "success" && "bg-neza-success-500",
              variant === "warning" && "bg-neza-warning-500",
              variant === "error" && "bg-neza-error-500",
              variant === "info" && "bg-blue-500",
              (variant === "default" || variant === "secondary" || variant === "outline") && "bg-neza-gray-500",
              pulse && "animate-pulse"
            )}
            aria-hidden="true"
          />
        )}

        {/* Left icon */}
        {leftIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {/* Badge content */}
        {children && (
          <span className="truncate">
            {children}
          </span>
        )}

        {/* Right icon */}
        {rightIcon && !removable && (
          <span className="flex-shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}

        {/* Remove button */}
        {removable && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            className={cn(
              "flex-shrink-0 rounded-full p-0.5 transition-colors",
              "hover:bg-black/10 dark:hover:bg-white/10",
              "focus:outline-none focus:ring-1 focus:ring-current"
            )}
            aria-label="Remove"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    );
  }
);
Badge.displayName = "Badge";

// ===== BADGE GROUP COMPONENT =====

export interface BadgeGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: "tight" | "default" | "loose";
  wrap?: boolean;
  max?: number;
  showMore?: boolean;
}

const BadgeGroup = React.forwardRef<HTMLDivElement, BadgeGroupProps>(
  ({ 
    className, 
    children, 
    spacing = "default", 
    wrap = true,
    max,
    showMore = true,
    ...props 
  }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const visibleChildren = max ? childrenArray.slice(0, max) : childrenArray;
    const remainingCount = max ? childrenArray.length - max : 0;

    const spacingClasses = {
      tight: "gap-1",
      default: "gap-2",
      loose: "gap-3",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          spacingClasses[spacing],
          wrap && "flex-wrap",
          className
        )}
        {...props}
      >
        {visibleChildren}
        
        {/* More indicator */}
        {remainingCount > 0 && showMore && (
          <Badge variant="outline" size="sm">
            +{remainingCount} more
          </Badge>
        )}
      </div>
    );
  }
);
BadgeGroup.displayName = "BadgeGroup";

// ===== STATUS BADGE COMPONENT =====

export interface StatusBadgeProps extends Omit<BadgeProps, "variant" | "dot"> {
  status: "online" | "offline" | "away" | "busy" | "pending" | "active" | "inactive";
}

const StatusBadge = React.forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ status, ...props }, ref) => {
    const statusConfig = {
      online: { variant: "success" as const, dot: true, children: "Online" },
      offline: { variant: "default" as const, dot: true, children: "Offline" },
      away: { variant: "warning" as const, dot: true, children: "Away" },
      busy: { variant: "error" as const, dot: true, children: "Busy" },
      pending: { variant: "warning" as const, dot: true, children: "Pending" },
      active: { variant: "success" as const, dot: true, children: "Active" },
      inactive: { variant: "default" as const, dot: true, children: "Inactive" },
    };

    const config = statusConfig[status];

    return (
      <Badge
        ref={ref}
        variant={config.variant}
        dot={config.dot}
        {...props}
      >
        {props.children || config.children}
      </Badge>
    );
  }
);
StatusBadge.displayName = "StatusBadge";

// ===== NOTIFICATION BADGE COMPONENT =====

export interface NotificationBadgeProps extends Omit<BadgeProps, "children"> {
  count?: number;
  max?: number;
  showZero?: boolean;
}

const NotificationBadge = React.forwardRef<HTMLDivElement, NotificationBadgeProps>(
  ({ count = 0, max = 99, showZero = false, ...props }, ref) => {
    if (count === 0 && !showZero) {
      return null;
    }

    const displayCount = count > max ? `${max}+` : count.toString();

    return (
      <Badge
        ref={ref}
        variant="error"
        size="xs"
        {...props}
      >
        {displayCount}
      </Badge>
    );
  }
);
NotificationBadge.displayName = "NotificationBadge";

// ===== EXPORTS =====

export { 
  Badge, 
  BadgeGroup, 
  StatusBadge, 
  NotificationBadge, 
  badgeVariants 
};

export type { 
  BadgeProps, 
  BadgeGroupProps, 
  StatusBadgeProps, 
  NotificationBadgeProps 
};
