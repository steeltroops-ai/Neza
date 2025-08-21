/**
 * NEZA DESIGN SYSTEM - TOOLTIP COMPONENT
 * 
 * Premium tooltip component with animations, positioning,
 * and accessibility features.
 */

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ===== TOOLTIP VARIANTS =====

const tooltipContentVariants = cva(
  [
    "z-50 overflow-hidden rounded-md px-3 py-1.5 text-xs",
    "animate-in fade-in-0 zoom-in-95",
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
    "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
    "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-neza-gray-900 text-neza-gray-50 shadow-md",
          "dark:bg-neza-gray-50 dark:text-neza-gray-900",
        ],
        inverse: [
          "bg-neza-gray-50 text-neza-gray-900 border border-neza-gray-200 shadow-md",
          "dark:bg-neza-gray-900 dark:text-neza-gray-50 dark:border-neza-gray-700",
        ],
        primary: [
          "bg-neza-primary-600 text-white shadow-md",
          "dark:bg-neza-primary-500",
        ],
        success: [
          "bg-neza-success-600 text-white shadow-md",
          "dark:bg-neza-success-500",
        ],
        warning: [
          "bg-neza-warning-600 text-white shadow-md",
          "dark:bg-neza-warning-500",
        ],
        error: [
          "bg-neza-error-600 text-white shadow-md",
          "dark:bg-neza-error-500",
        ],
      },
      size: {
        sm: "px-2 py-1 text-xs",
        default: "px-3 py-1.5 text-xs",
        lg: "px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// ===== TOOLTIP PROVIDER COMPONENT =====

const TooltipProvider = TooltipPrimitive.Provider;

// ===== TOOLTIP ROOT COMPONENT =====

const Tooltip = TooltipPrimitive.Root;

// ===== TOOLTIP TRIGGER COMPONENT =====

const TooltipTrigger = TooltipPrimitive.Trigger;

// ===== TOOLTIP CONTENT COMPONENT =====

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipContentVariants> {}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, variant, size, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(tooltipContentVariants({ variant, size }), className)}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// ===== TOOLTIP ARROW COMPONENT =====

const TooltipArrow = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <TooltipPrimitive.Arrow
    ref={ref}
    className={cn("fill-current", className)}
    {...props}
  />
));
TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName;

// ===== SIMPLE TOOLTIP COMPONENT =====

export interface SimpleTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  variant?: TooltipContentProps["variant"];
  size?: TooltipContentProps["size"];
  delayDuration?: number;
  skipDelayDuration?: number;
  disabled?: boolean;
  showArrow?: boolean;
  className?: string;
}

const SimpleTooltip = React.forwardRef<HTMLDivElement, SimpleTooltipProps>(
  ({
    content,
    children,
    side = "top",
    align = "center",
    variant = "default",
    size = "default",
    delayDuration = 700,
    skipDelayDuration = 300,
    disabled = false,
    showArrow = true,
    className,
  }, ref) => {
    if (disabled || !content) {
      return <>{children}</>;
    }

    return (
      <Tooltip delayDuration={delayDuration} skipDelayDuration={skipDelayDuration}>
        <TooltipTrigger asChild>
          <div ref={ref}>{children}</div>
        </TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          variant={variant}
          size={size}
          className={className}
        >
          {content}
          {showArrow && <TooltipArrow />}
        </TooltipContent>
      </Tooltip>
    );
  }
);
SimpleTooltip.displayName = "SimpleTooltip";

// ===== RICH TOOLTIP COMPONENT =====

export interface RichTooltipProps extends SimpleTooltipProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
}

const RichTooltip = React.forwardRef<HTMLDivElement, RichTooltipProps>(
  ({
    title,
    description,
    icon,
    actions,
    children,
    content,
    size = "lg",
    ...props
  }, ref) => {
    const tooltipContent = content || (
      <div className="space-y-2">
        {(title || icon) && (
          <div className="flex items-center gap-2">
            {icon && (
              <span className="flex-shrink-0" aria-hidden="true">
                {icon}
              </span>
            )}
            {title && (
              <div className="font-medium">{title}</div>
            )}
          </div>
        )}
        
        {description && (
          <div className="text-xs opacity-90">
            {description}
          </div>
        )}
        
        {actions && (
          <div className="flex gap-2 pt-1">
            {actions}
          </div>
        )}
      </div>
    );

    return (
      <SimpleTooltip
        ref={ref}
        content={tooltipContent}
        size={size}
        {...props}
      >
        {children}
      </SimpleTooltip>
    );
  }
);
RichTooltip.displayName = "RichTooltip";

// ===== TOOLTIP WRAPPER COMPONENT =====

export interface TooltipWrapperProps {
  tooltip: string | React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  side?: SimpleTooltipProps["side"];
  variant?: SimpleTooltipProps["variant"];
  className?: string;
}

const TooltipWrapper = React.forwardRef<HTMLDivElement, TooltipWrapperProps>(
  ({ tooltip, children, disabled, side, variant, className }, ref) => {
    if (disabled || !tooltip) {
      return <>{children}</>;
    }

    return (
      <SimpleTooltip
        ref={ref}
        content={tooltip}
        side={side}
        variant={variant}
        className={className}
      >
        {children}
      </SimpleTooltip>
    );
  }
);
TooltipWrapper.displayName = "TooltipWrapper";

// ===== KEYBOARD SHORTCUT TOOLTIP =====

export interface KeyboardShortcutTooltipProps extends Omit<SimpleTooltipProps, "content"> {
  shortcut: string | string[];
  description?: string;
}

const KeyboardShortcutTooltip = React.forwardRef<HTMLDivElement, KeyboardShortcutTooltipProps>(
  ({ shortcut, description, children, ...props }, ref) => {
    const shortcuts = Array.isArray(shortcut) ? shortcut : [shortcut];
    
    const content = (
      <div className="space-y-1">
        {description && (
          <div className="text-xs">{description}</div>
        )}
        <div className="flex items-center gap-1">
          {shortcuts.map((key, index) => (
            <React.Fragment key={key}>
              {index > 0 && <span className="text-xs opacity-60">+</span>}
              <kbd className="px-1.5 py-0.5 text-xs font-mono bg-black/10 dark:bg-white/10 rounded border">
                {key}
              </kbd>
            </React.Fragment>
          ))}
        </div>
      </div>
    );

    return (
      <SimpleTooltip
        ref={ref}
        content={content}
        {...props}
      >
        {children}
      </SimpleTooltip>
    );
  }
);
KeyboardShortcutTooltip.displayName = "KeyboardShortcutTooltip";

// ===== TOOLTIP HOOK =====

export function useTooltip() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [content, setContent] = React.useState<React.ReactNode>(null);

  const show = React.useCallback((newContent: React.ReactNode) => {
    setContent(newContent);
    setIsOpen(true);
  }, []);

  const hide = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = React.useCallback((newContent?: React.ReactNode) => {
    if (newContent) {
      setContent(newContent);
    }
    setIsOpen(prev => !prev);
  }, []);

  return {
    isOpen,
    content,
    show,
    hide,
    toggle,
    setContent,
  };
}

// ===== CONTROLLED TOOLTIP COMPONENT =====

export interface ControlledTooltipProps extends Omit<SimpleTooltipProps, "children"> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const ControlledTooltip = React.forwardRef<HTMLDivElement, ControlledTooltipProps>(
  ({ open, onOpenChange, children, ...props }, ref) => (
    <Tooltip open={open} onOpenChange={onOpenChange}>
      <TooltipTrigger asChild>
        <div ref={ref}>{children}</div>
      </TooltipTrigger>
      <TooltipContent {...props}>
        {props.content}
        {props.showArrow !== false && <TooltipArrow />}
      </TooltipContent>
    </Tooltip>
  )
);
ControlledTooltip.displayName = "ControlledTooltip";

// ===== EXPORTS =====

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipArrow,
  SimpleTooltip,
  RichTooltip,
  TooltipWrapper,
  KeyboardShortcutTooltip,
  ControlledTooltip,
  useTooltip,
  tooltipContentVariants,
};

export type {
  TooltipContentProps,
  SimpleTooltipProps,
  RichTooltipProps,
  TooltipWrapperProps,
  KeyboardShortcutTooltipProps,
  ControlledTooltipProps,
};
