/**
 * NEZA DESIGN SYSTEM - AVATAR COMPONENT
 * 
 * Premium avatar component with fallback handling,
 * status indicators, and accessibility features.
 */

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

// ===== AVATAR VARIANTS =====

const avatarVariants = cva(
  [
    "relative flex shrink-0 overflow-hidden rounded-full",
    "transition-all duration-200 ease-out",
  ],
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-xs",
        sm: "h-8 w-8 text-sm",
        default: "h-10 w-10 text-base",
        lg: "h-12 w-12 text-lg",
        xl: "h-16 w-16 text-xl",
        "2xl": "h-20 w-20 text-2xl",
        "3xl": "h-24 w-24 text-3xl",
      },
      variant: {
        default: "bg-neza-gray-100 text-neza-gray-600 dark:bg-neza-gray-800 dark:text-neza-gray-400",
        primary: "bg-neza-primary-100 text-neza-primary-700 dark:bg-neza-primary-900 dark:text-neza-primary-300",
        success: "bg-neza-success-100 text-neza-success-700 dark:bg-neza-success-900 dark:text-neza-success-300",
        warning: "bg-neza-warning-100 text-neza-warning-700 dark:bg-neza-warning-900 dark:text-neza-warning-300",
        error: "bg-neza-error-100 text-neza-error-700 dark:bg-neza-error-900 dark:text-neza-error-300",
      },
      border: {
        none: "",
        default: "ring-2 ring-white dark:ring-neza-gray-800",
        primary: "ring-2 ring-neza-primary-500",
        success: "ring-2 ring-neza-success-500",
        warning: "ring-2 ring-neza-warning-500",
        error: "ring-2 ring-neza-error-500",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
      border: "none",
    },
  }
);

const avatarImageVariants = cva("aspect-square h-full w-full object-cover");

const avatarFallbackVariants = cva(
  "flex h-full w-full items-center justify-center font-medium"
);

// ===== AVATAR COMPONENT =====

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
  showFallbackIcon?: boolean;
  status?: "online" | "offline" | "away" | "busy";
  statusPosition?: "top-right" | "bottom-right" | "top-left" | "bottom-left";
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ 
  className, 
  size, 
  variant, 
  border, 
  src, 
  alt, 
  fallback, 
  showFallbackIcon = true,
  status,
  statusPosition = "bottom-right",
  ...props 
}, ref) => {
  // Generate initials from fallback text
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const statusPositionClasses = {
    "top-right": "top-0 right-0",
    "bottom-right": "bottom-0 right-0",
    "top-left": "top-0 left-0",
    "bottom-left": "bottom-0 left-0",
  };

  const statusColorClasses = {
    online: "bg-neza-success-500 ring-white dark:ring-neza-gray-800",
    offline: "bg-neza-gray-400 ring-white dark:ring-neza-gray-800",
    away: "bg-neza-warning-500 ring-white dark:ring-neza-gray-800",
    busy: "bg-neza-error-500 ring-white dark:ring-neza-gray-800",
  };

  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(avatarVariants({ size, variant, border }), className)}
      {...props}
    >
      {/* Avatar Image */}
      {src && (
        <AvatarPrimitive.Image
          src={src}
          alt={alt || "Avatar"}
          className={avatarImageVariants()}
        />
      )}
      
      {/* Avatar Fallback */}
      <AvatarPrimitive.Fallback
        className={avatarFallbackVariants()}
        delayMs={600}
      >
        {fallback ? (
          getInitials(fallback)
        ) : showFallbackIcon ? (
          <User className="h-1/2 w-1/2" />
        ) : null}
      </AvatarPrimitive.Fallback>

      {/* Status Indicator */}
      {status && (
        <span
          className={cn(
            "absolute h-3 w-3 rounded-full ring-2",
            statusPositionClasses[statusPosition],
            statusColorClasses[status]
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </AvatarPrimitive.Root>
  );
});
Avatar.displayName = AvatarPrimitive.Root.displayName;

// ===== AVATAR GROUP COMPONENT =====

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  spacing?: "tight" | "default" | "loose";
  size?: VariantProps<typeof avatarVariants>["size"];
  showMore?: boolean;
  moreText?: string;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ 
    className, 
    children, 
    max = 5, 
    spacing = "default", 
    size = "default",
    showMore = true,
    moreText,
    ...props 
  }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const visibleChildren = childrenArray.slice(0, max);
    const remainingCount = childrenArray.length - max;

    const spacingClasses = {
      tight: "-space-x-1",
      default: "-space-x-2",
      loose: "-space-x-1",
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-center", spacingClasses[spacing], className)}
        {...props}
      >
        {visibleChildren.map((child, index) => (
          <div key={index} className="relative">
            {child}
          </div>
        ))}
        
        {/* More indicator */}
        {remainingCount > 0 && showMore && (
          <Avatar
            size={size}
            variant="default"
            fallback={moreText || `+${remainingCount}`}
            showFallbackIcon={false}
            className="border-2 border-white dark:border-neza-gray-800"
          />
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";

// ===== AVATAR WITH TEXT COMPONENT =====

export interface AvatarWithTextProps extends AvatarProps {
  name?: string;
  description?: string;
  textPosition?: "right" | "bottom";
}

const AvatarWithText = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarWithTextProps
>(({ 
  name, 
  description, 
  textPosition = "right", 
  className,
  ...avatarProps 
}, ref) => {
  const isVertical = textPosition === "bottom";

  return (
    <div
      className={cn(
        "flex items-center",
        isVertical ? "flex-col space-y-2" : "space-x-3",
        className
      )}
    >
      <Avatar ref={ref} {...avatarProps} />
      
      {(name || description) && (
        <div className={cn("min-w-0", isVertical && "text-center")}>
          {name && (
            <p className="text-sm font-medium text-neza-gray-900 dark:text-neza-gray-100 truncate">
              {name}
            </p>
          )}
          {description && (
            <p className="text-xs text-neza-gray-500 dark:text-neza-gray-400 truncate">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
});
AvatarWithText.displayName = "AvatarWithText";

// ===== EXPORTS =====

export { 
  Avatar, 
  AvatarGroup, 
  AvatarWithText, 
  avatarVariants,
  avatarImageVariants,
  avatarFallbackVariants,
};

export type { 
  AvatarProps, 
  AvatarGroupProps, 
  AvatarWithTextProps,
};
