/**
 * NEZA DESIGN SYSTEM - LABEL COMPONENT
 * 
 * Accessible label component with proper form association
 * and premium styling.
 */

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ===== LABEL VARIANTS =====

const labelVariants = cva(
  [
    "text-sm font-medium leading-none",
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    "transition-colors duration-200",
  ],
  {
    variants: {
      variant: {
        default: "text-neza-gray-700 dark:text-neza-gray-300",
        primary: "text-neza-primary-700 dark:text-neza-primary-300",
        secondary: "text-neza-gray-600 dark:text-neza-gray-400",
        muted: "text-neza-gray-500 dark:text-neza-gray-500",
        error: "text-neza-error-700 dark:text-neza-error-300",
        success: "text-neza-success-700 dark:text-neza-success-300",
        warning: "text-neza-warning-700 dark:text-neza-warning-300",
      },
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      weight: "medium",
    },
  }
);

// ===== LABEL COMPONENT =====

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  required?: boolean;
  optional?: boolean;
  tooltip?: string;
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, variant, size, weight, required, optional, children, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ variant, size, weight }), className)}
    {...props}
  >
    {children}
    {required && (
      <span 
        className="ml-1 text-neza-error-500 dark:text-neza-error-400" 
        aria-label="required"
      >
        *
      </span>
    )}
    {optional && !required && (
      <span 
        className="ml-1 text-neza-gray-400 dark:text-neza-gray-500 font-normal text-xs" 
        aria-label="optional"
      >
        (optional)
      </span>
    )}
  </LabelPrimitive.Root>
));
Label.displayName = LabelPrimitive.Root.displayName;

// ===== FIELD LABEL COMPONENT =====

export interface FieldLabelProps extends LabelProps {
  description?: string;
  error?: string;
  success?: string;
  helperText?: string;
}

const FieldLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  FieldLabelProps
>(({ 
  className, 
  description, 
  error, 
  success, 
  helperText, 
  children, 
  ...props 
}, ref) => {
  const computedVariant = error ? "error" : success ? "success" : props.variant;

  return (
    <div className="space-y-1">
      <Label
        ref={ref}
        className={className}
        variant={computedVariant}
        {...props}
      >
        {children}
      </Label>
      
      {description && (
        <p className="text-xs text-neza-gray-500 dark:text-neza-gray-400">
          {description}
        </p>
      )}
      
      {error && (
        <p className="text-xs text-neza-error-600 dark:text-neza-error-400">
          {error}
        </p>
      )}
      
      {success && !error && (
        <p className="text-xs text-neza-success-600 dark:text-neza-success-400">
          {success}
        </p>
      )}
      
      {helperText && !error && !success && (
        <p className="text-xs text-neza-gray-500 dark:text-neza-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
});
FieldLabel.displayName = "FieldLabel";

// ===== FORM LABEL COMPONENT =====

export interface FormLabelProps extends LabelProps {
  htmlFor: string;
}

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  FormLabelProps
>(({ className, children, ...props }, ref) => (
  <Label
    ref={ref}
    className={cn("cursor-pointer", className)}
    {...props}
  >
    {children}
  </Label>
));
FormLabel.displayName = "FormLabel";

// ===== EXPORTS =====

export { Label, FieldLabel, FormLabel, labelVariants };
export type { LabelProps, FieldLabelProps, FormLabelProps };
