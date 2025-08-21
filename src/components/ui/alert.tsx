/**
 * NEZA DESIGN SYSTEM - ALERT COMPONENT
 * 
 * Premium alert component with variants, animations,
 * and accessibility features.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info, X, AlertTriangle } from "lucide-react";
import { Button } from "./button";

// ===== ALERT VARIANTS =====

const alertVariants = cva(
  [
    "relative w-full rounded-lg border px-4 py-3 text-sm",
    "transition-all duration-300 ease-out",
    "animate-in fade-in-50 slide-in-from-top-1",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-background text-foreground border-border",
        ],
        info: [
          "bg-blue-50 text-blue-900 border-blue-200",
          "dark:bg-blue-950 dark:text-blue-100 dark:border-blue-800",
        ],
        success: [
          "bg-neza-success-50 text-neza-success-900 border-neza-success-200",
          "dark:bg-neza-success-950 dark:text-neza-success-100 dark:border-neza-success-800",
        ],
        warning: [
          "bg-neza-warning-50 text-neza-warning-900 border-neza-warning-200",
          "dark:bg-neza-warning-950 dark:text-neza-warning-100 dark:border-neza-warning-800",
        ],
        error: [
          "bg-neza-error-50 text-neza-error-900 border-neza-error-200",
          "dark:bg-neza-error-950 dark:text-neza-error-100 dark:border-neza-error-800",
        ],
      },
      size: {
        sm: "px-3 py-2 text-xs",
        default: "px-4 py-3 text-sm",
        lg: "px-6 py-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// ===== ALERT COMPONENT =====

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode;
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  actions?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ 
    className, 
    variant, 
    size, 
    icon, 
    title, 
    dismissible = false, 
    onDismiss, 
    actions,
    children, 
    ...props 
  }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true);

    const handleDismiss = () => {
      setIsVisible(false);
      setTimeout(() => {
        onDismiss?.();
      }, 300); // Wait for animation to complete
    };

    const defaultIcons = {
      default: <Info className="h-4 w-4" />,
      info: <Info className="h-4 w-4" />,
      success: <CheckCircle2 className="h-4 w-4" />,
      warning: <AlertTriangle className="h-4 w-4" />,
      error: <AlertCircle className="h-4 w-4" />,
    };

    const displayIcon = icon !== null ? (icon || defaultIcons[variant || "default"]) : null;

    if (!isVisible) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        className={cn(
          alertVariants({ variant, size }),
          !isVisible && "animate-out fade-out-50 slide-out-to-top-1",
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          {displayIcon && (
            <div className="flex-shrink-0 mt-0.5">
              {displayIcon}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            {title && (
              <h5 className="font-medium mb-1">
                {title}
              </h5>
            )}
            <div className="text-sm opacity-90">
              {children}
            </div>
            
            {/* Actions */}
            {actions && (
              <div className="mt-3 flex gap-2">
                {actions}
              </div>
            )}
          </div>

          {/* Dismiss Button */}
          {dismissible && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDismiss}
              className="flex-shrink-0 h-6 w-6 -mt-1 -mr-1 opacity-70 hover:opacity-100"
              aria-label="Dismiss alert"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
    );
  }
);
Alert.displayName = "Alert";

// ===== ALERT TITLE COMPONENT =====

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

// ===== ALERT DESCRIPTION COMPONENT =====

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

// ===== ALERT ACTIONS COMPONENT =====

const AlertActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-3 flex gap-2", className)}
    {...props}
  />
));
AlertActions.displayName = "AlertActions";

// ===== BANNER ALERT COMPONENT =====

export interface BannerAlertProps extends Omit<AlertProps, "size"> {
  position?: "top" | "bottom";
  fullWidth?: boolean;
}

const BannerAlert = React.forwardRef<HTMLDivElement, BannerAlertProps>(
  ({ 
    className, 
    position = "top", 
    fullWidth = true, 
    dismissible = true,
    ...props 
  }, ref) => (
    <Alert
      ref={ref}
      dismissible={dismissible}
      className={cn(
        "rounded-none border-x-0",
        position === "top" && "border-t-0",
        position === "bottom" && "border-b-0",
        fullWidth && "w-full",
        className
      )}
      {...props}
    />
  )
);
BannerAlert.displayName = "BannerAlert";

// ===== TOAST ALERT COMPONENT =====

export interface ToastAlertProps extends AlertProps {
  duration?: number;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
}

const ToastAlert = React.forwardRef<HTMLDivElement, ToastAlertProps>(
  ({ 
    className, 
    duration = 5000, 
    position = "top-right",
    onDismiss,
    ...props 
  }, ref) => {
    React.useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(() => {
          onDismiss?.();
        }, duration);

        return () => clearTimeout(timer);
      }
    }, [duration, onDismiss]);

    const positionClasses = {
      "top-right": "fixed top-4 right-4 z-50",
      "top-left": "fixed top-4 left-4 z-50",
      "bottom-right": "fixed bottom-4 right-4 z-50",
      "bottom-left": "fixed bottom-4 left-4 z-50",
      "top-center": "fixed top-4 left-1/2 -translate-x-1/2 z-50",
      "bottom-center": "fixed bottom-4 left-1/2 -translate-x-1/2 z-50",
    };

    return (
      <Alert
        ref={ref}
        dismissible
        onDismiss={onDismiss}
        className={cn(
          positionClasses[position],
          "max-w-md shadow-lg",
          className
        )}
        {...props}
      />
    );
  }
);
ToastAlert.displayName = "ToastAlert";

// ===== INLINE ALERT COMPONENT =====

export interface InlineAlertProps extends Omit<AlertProps, "size"> {
  compact?: boolean;
}

const InlineAlert = React.forwardRef<HTMLDivElement, InlineAlertProps>(
  ({ className, compact = false, ...props }, ref) => (
    <Alert
      ref={ref}
      size={compact ? "sm" : "default"}
      className={cn(
        compact && "py-2",
        className
      )}
      {...props}
    />
  )
);
InlineAlert.displayName = "InlineAlert";

// ===== ALERT HOOK =====

export interface UseAlertOptions {
  duration?: number;
  position?: ToastAlertProps["position"];
}

export function useAlert(options: UseAlertOptions = {}) {
  const [alerts, setAlerts] = React.useState<Array<{
    id: string;
    variant: AlertProps["variant"];
    title?: string;
    message: string;
    duration?: number;
  }>>([]);

  const showAlert = React.useCallback((
    variant: AlertProps["variant"],
    message: string,
    title?: string,
    duration?: number
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    const alert = {
      id,
      variant,
      title,
      message,
      duration: duration ?? options.duration ?? 5000,
    };

    setAlerts(prev => [...prev, alert]);

    // Auto dismiss
    if (alert.duration > 0) {
      setTimeout(() => {
        setAlerts(prev => prev.filter(a => a.id !== id));
      }, alert.duration);
    }

    return id;
  }, [options.duration]);

  const dismissAlert = React.useCallback((id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  }, []);

  const dismissAll = React.useCallback(() => {
    setAlerts([]);
  }, []);

  const success = React.useCallback((message: string, title?: string, duration?: number) => {
    return showAlert("success", message, title, duration);
  }, [showAlert]);

  const error = React.useCallback((message: string, title?: string, duration?: number) => {
    return showAlert("error", message, title, duration);
  }, [showAlert]);

  const warning = React.useCallback((message: string, title?: string, duration?: number) => {
    return showAlert("warning", message, title, duration);
  }, [showAlert]);

  const info = React.useCallback((message: string, title?: string, duration?: number) => {
    return showAlert("info", message, title, duration);
  }, [showAlert]);

  return {
    alerts,
    showAlert,
    dismissAlert,
    dismissAll,
    success,
    error,
    warning,
    info,
  };
}

// ===== EXPORTS =====

export {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertActions,
  BannerAlert,
  ToastAlert,
  InlineAlert,
  useAlert,
  alertVariants,
};

export type {
  AlertProps,
  BannerAlertProps,
  ToastAlertProps,
  InlineAlertProps,
  UseAlertOptions,
};
