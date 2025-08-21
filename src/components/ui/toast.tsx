/**
 * NEZA DESIGN SYSTEM - TOAST COMPONENT
 * 
 * Premium toast notification system with animations,
 * positioning, and comprehensive state management.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { Button } from "./button";

// ===== TOAST VARIANTS =====

const toastVariants = cva(
  [
    "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-lg border p-4 shadow-lg transition-all",
    "data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-border bg-background text-foreground",
        ],
        success: [
          "border-neza-success-200 bg-neza-success-50 text-neza-success-900",
          "dark:border-neza-success-800 dark:bg-neza-success-950 dark:text-neza-success-100",
        ],
        error: [
          "border-neza-error-200 bg-neza-error-50 text-neza-error-900",
          "dark:border-neza-error-800 dark:bg-neza-error-950 dark:text-neza-error-100",
        ],
        warning: [
          "border-neza-warning-200 bg-neza-warning-50 text-neza-warning-900",
          "dark:border-neza-warning-800 dark:bg-neza-warning-950 dark:text-neza-warning-100",
        ],
        info: [
          "border-blue-200 bg-blue-50 text-blue-900",
          "dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ===== TOAST COMPONENT =====

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  duration?: number;
  onClose?: () => void;
  closable?: boolean;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ 
    className, 
    variant, 
    title, 
    description, 
    action, 
    icon, 
    duration = 5000,
    onClose, 
    closable = true,
    children,
    ...props 
  }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true);

    // Auto dismiss
    React.useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);

        return () => clearTimeout(timer);
      }
    }, [duration]);

    const handleClose = () => {
      setIsVisible(false);
      setTimeout(() => {
        onClose?.();
      }, 150); // Wait for animation
    };

    const defaultIcons = {
      default: <Info className="h-5 w-5" />,
      success: <CheckCircle2 className="h-5 w-5" />,
      error: <AlertCircle className="h-5 w-5" />,
      warning: <AlertTriangle className="h-5 w-5" />,
      info: <Info className="h-5 w-5" />,
    };

    const displayIcon = icon !== null ? (icon || defaultIcons[variant || "default"]) : null;

    if (!isVisible) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(toastVariants({ variant }), className)}
        role="alert"
        aria-live="polite"
        aria-atomic="true"
        {...props}
      >
        {/* Icon */}
        {displayIcon && (
          <div className="flex-shrink-0">
            {displayIcon}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <div className="font-semibold text-sm mb-1">
              {title}
            </div>
          )}
          {description && (
            <div className="text-sm opacity-90">
              {description}
            </div>
          )}
          {children && !title && !description && (
            <div className="text-sm">
              {children}
            </div>
          )}
        </div>

        {/* Action */}
        {action && (
          <div className="flex-shrink-0">
            {action}
          </div>
        )}

        {/* Close Button */}
        {closable && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="flex-shrink-0 h-6 w-6 opacity-70 hover:opacity-100"
            aria-label="Close notification"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    );
  }
);
Toast.displayName = "Toast";

// ===== TOAST CONTAINER COMPONENT =====

export interface ToastContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
  maxToasts?: number;
}

const ToastContainer = React.forwardRef<HTMLDivElement, ToastContainerProps>(
  ({ className, position = "top-right", maxToasts = 5, children, ...props }, ref) => {
    const positionClasses = {
      "top-right": "fixed top-4 right-4 z-[100]",
      "top-left": "fixed top-4 left-4 z-[100]",
      "bottom-right": "fixed bottom-4 right-4 z-[100]",
      "bottom-left": "fixed bottom-4 left-4 z-[100]",
      "top-center": "fixed top-4 left-1/2 -translate-x-1/2 z-[100]",
      "bottom-center": "fixed bottom-4 left-1/2 -translate-x-1/2 z-[100]",
    };

    return (
      <div
        ref={ref}
        className={cn(
          positionClasses[position],
          "flex flex-col gap-2 w-full max-w-sm",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ToastContainer.displayName = "ToastContainer";

// ===== TOAST HOOK =====

export interface ToastOptions {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  duration?: number;
  variant?: ToastProps["variant"];
  position?: ToastContainerProps["position"];
}

export interface ToastItem extends ToastOptions {
  id: string;
  createdAt: number;
}

export function useToast() {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const addToast = React.useCallback((options: ToastOptions) => {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: ToastItem = {
      id,
      createdAt: Date.now(),
      duration: 5000,
      variant: "default",
      ...options,
    };

    setToasts(prev => [...prev, toast]);

    // Auto remove after duration
    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration);
    }

    return id;
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const removeAllToasts = React.useCallback(() => {
    setToasts([]);
  }, []);

  const updateToast = React.useCallback((id: string, options: Partial<ToastOptions>) => {
    setToasts(prev => prev.map(toast => 
      toast.id === id ? { ...toast, ...options } : toast
    ));
  }, []);

  // Convenience methods
  const success = React.useCallback((title: string, description?: string, options?: Omit<ToastOptions, "title" | "description" | "variant">) => {
    return addToast({ title, description, variant: "success", ...options });
  }, [addToast]);

  const error = React.useCallback((title: string, description?: string, options?: Omit<ToastOptions, "title" | "description" | "variant">) => {
    return addToast({ title, description, variant: "error", ...options });
  }, [addToast]);

  const warning = React.useCallback((title: string, description?: string, options?: Omit<ToastOptions, "title" | "description" | "variant">) => {
    return addToast({ title, description, variant: "warning", ...options });
  }, [addToast]);

  const info = React.useCallback((title: string, description?: string, options?: Omit<ToastOptions, "title" | "description" | "variant">) => {
    return addToast({ title, description, variant: "info", ...options });
  }, [addToast]);

  const promise = React.useCallback(<T,>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => {
    const toastId = addToast({
      title: options.loading,
      variant: "default",
      duration: 0, // Don't auto dismiss
    });

    promise
      .then((data) => {
        const successMessage = typeof options.success === "function" 
          ? options.success(data) 
          : options.success;
        
        updateToast(toastId, {
          title: successMessage,
          variant: "success",
          duration: 5000,
        });
      })
      .catch((error) => {
        const errorMessage = typeof options.error === "function" 
          ? options.error(error) 
          : options.error;
        
        updateToast(toastId, {
          title: errorMessage,
          variant: "error",
          duration: 5000,
        });
      });

    return toastId;
  }, [addToast, updateToast]);

  return {
    toasts,
    addToast,
    removeToast,
    removeAllToasts,
    updateToast,
    success,
    error,
    warning,
    info,
    promise,
  };
}

// ===== TOAST PROVIDER COMPONENT =====

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastContainerProps["position"];
  maxToasts?: number;
}

const ToastContext = React.createContext<ReturnType<typeof useToast> | null>(null);

export function ToastProvider({ children, position = "top-right", maxToasts = 5 }: ToastProviderProps) {
  const toast = useToast();

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer position={position} maxToasts={maxToasts}>
        {toast.toasts.slice(-maxToasts).map((toastItem) => (
          <Toast
            key={toastItem.id}
            variant={toastItem.variant}
            title={toastItem.title}
            description={toastItem.description}
            action={toastItem.action}
            icon={toastItem.icon}
            duration={0} // Handled by the hook
            onClose={() => toast.removeToast(toastItem.id)}
          />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
}

// ===== USE TOAST CONTEXT HOOK =====

export function useToastContext() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
}

// ===== EXPORTS =====

export {
  Toast,
  ToastContainer,
  ToastProvider,
  useToast,
  useToastContext,
  toastVariants,
};

export type {
  ToastProps,
  ToastContainerProps,
  ToastOptions,
  ToastItem,
  ToastProviderProps,
};
