/**
 * NEZA DESIGN SYSTEM - MODAL COMPONENT
 * 
 * Premium modal component with animations, focus management,
 * and comprehensive accessibility features.
 */

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "./button";

// ===== MODAL VARIANTS =====

const modalOverlayVariants = cva(
  [
    "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  ]
);

const modalContentVariants = cva(
  [
    "fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
    "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
  ],
  {
    variants: {
      size: {
        sm: "max-w-sm",
        default: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        "2xl": "max-w-6xl",
        full: "max-w-[95vw] max-h-[95vh]",
      },
      variant: {
        default: "rounded-lg border-border",
        glass: "rounded-xl bg-white/10 border-white/20 backdrop-blur-xl dark:bg-black/10 dark:border-white/10",
        centered: "rounded-lg border-border",
        fullscreen: "rounded-none border-0 w-screen h-screen max-w-none max-h-none",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

// ===== MODAL ROOT COMPONENT =====

const Modal = DialogPrimitive.Root;

// ===== MODAL TRIGGER COMPONENT =====

const ModalTrigger = DialogPrimitive.Trigger;

// ===== MODAL PORTAL COMPONENT =====

const ModalPortal = DialogPrimitive.Portal;

// ===== MODAL OVERLAY COMPONENT =====

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(modalOverlayVariants(), className)}
    {...props}
  />
));
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName;

// ===== MODAL CONTENT COMPONENT =====

export interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof modalContentVariants> {
  showCloseButton?: boolean;
  closeButtonProps?: React.ComponentProps<typeof Button>;
}

const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(({ className, size, variant, showCloseButton = true, closeButtonProps, children, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(modalContentVariants({ size, variant }), className)}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 h-6 w-6 opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neza-primary-500 focus:ring-offset-2 disabled:pointer-events-none"
            aria-label="Close modal"
            {...closeButtonProps}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Content>
  </ModalPortal>
));
ModalContent.displayName = DialogPrimitive.Content.displayName;

// ===== MODAL HEADER COMPONENT =====

const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props}
  />
));
ModalHeader.displayName = "ModalHeader";

// ===== MODAL FOOTER COMPONENT =====

const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
));
ModalFooter.displayName = "ModalFooter";

// ===== MODAL TITLE COMPONENT =====

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
ModalTitle.displayName = DialogPrimitive.Title.displayName;

// ===== MODAL DESCRIPTION COMPONENT =====

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-neza-gray-600 dark:text-neza-gray-400", className)}
    {...props}
  />
));
ModalDescription.displayName = DialogPrimitive.Description.displayName;

// ===== MODAL BODY COMPONENT =====

const ModalBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-y-auto", className)}
    {...props}
  />
));
ModalBody.displayName = "ModalBody";

// ===== CONFIRMATION MODAL COMPONENT =====

export interface ConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  loading?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
}

const ConfirmationModal = React.forwardRef<HTMLDivElement, ConfirmationModalProps>(
  ({
    open,
    onOpenChange,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "default",
    loading = false,
    onConfirm,
    onCancel,
  }, ref) => {
    const [isLoading, setIsLoading] = React.useState(false);

    const handleConfirm = async () => {
      setIsLoading(true);
      try {
        await onConfirm();
        onOpenChange(false);
      } catch (error) {
        console.error("Confirmation action failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const handleCancel = () => {
      onCancel?.();
      onOpenChange(false);
    };

    return (
      <Modal open={open} onOpenChange={onOpenChange}>
        <ModalContent ref={ref} size="sm">
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            {description && (
              <ModalDescription>{description}</ModalDescription>
            )}
          </ModalHeader>
          
          <ModalFooter>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading || loading}
            >
              {cancelText}
            </Button>
            <Button
              variant={variant === "destructive" ? "destructive" : "primary"}
              onClick={handleConfirm}
              loading={isLoading || loading}
              disabled={isLoading || loading}
            >
              {confirmText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
);
ConfirmationModal.displayName = "ConfirmationModal";

// ===== FORM MODAL COMPONENT =====

export interface FormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  size?: ModalContentProps["size"];
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const FormModal = React.forwardRef<HTMLDivElement, FormModalProps>(
  ({ open, onOpenChange, title, description, size = "default", children, footer }, ref) => (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent ref={ref} size={size}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          {description && (
            <ModalDescription>{description}</ModalDescription>
          )}
        </ModalHeader>
        
        <ModalBody>
          {children}
        </ModalBody>
        
        {footer && (
          <ModalFooter>
            {footer}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  )
);
FormModal.displayName = "FormModal";

// ===== DRAWER MODAL COMPONENT =====

export interface DrawerModalProps extends ModalContentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: "left" | "right" | "top" | "bottom";
  title?: string;
  description?: string;
}

const DrawerModal = React.forwardRef<HTMLDivElement, DrawerModalProps>(
  ({ 
    open, 
    onOpenChange, 
    side = "right", 
    title, 
    description, 
    className,
    children, 
    ...props 
  }, ref) => {
    const sideClasses = {
      left: "left-0 top-0 h-full w-80 max-w-[90vw] translate-x-[-100%] data-[state=open]:translate-x-0",
      right: "right-0 top-0 h-full w-80 max-w-[90vw] translate-x-[100%] data-[state=open]:translate-x-0",
      top: "top-0 left-0 w-full h-80 max-h-[90vh] translate-y-[-100%] data-[state=open]:translate-y-0",
      bottom: "bottom-0 left-0 w-full h-80 max-h-[90vh] translate-y-[100%] data-[state=open]:translate-y-0",
    };

    return (
      <Modal open={open} onOpenChange={onOpenChange}>
        <ModalPortal>
          <ModalOverlay />
          <DialogPrimitive.Content
            ref={ref}
            className={cn(
              "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:duration-300 data-[state=open]:duration-500",
              sideClasses[side],
              side === "left" || side === "right" 
                ? "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left"
                : "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
              className
            )}
            {...props}
          >
            {(title || description) && (
              <ModalHeader>
                {title && <ModalTitle>{title}</ModalTitle>}
                {description && <ModalDescription>{description}</ModalDescription>}
              </ModalHeader>
            )}
            
            <ModalBody>
              {children}
            </ModalBody>
            
            <DialogPrimitive.Close asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 h-6 w-6 opacity-70 hover:opacity-100"
                aria-label="Close drawer"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </ModalPortal>
      </Modal>
    );
  }
);
DrawerModal.displayName = "DrawerModal";

// ===== USE MODAL HOOK =====

export function useModal() {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);
  const toggle = React.useCallback(() => setIsOpen(prev => !prev), []);

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen,
  };
}

// ===== EXPORTS =====

export {
  Modal,
  ModalTrigger,
  ModalPortal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ConfirmationModal,
  FormModal,
  DrawerModal,
  useModal,
  modalOverlayVariants,
  modalContentVariants,
};

export type {
  ModalContentProps,
  ConfirmationModalProps,
  FormModalProps,
  DrawerModalProps,
};
