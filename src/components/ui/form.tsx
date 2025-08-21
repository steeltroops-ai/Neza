/**
 * NEZA DESIGN SYSTEM - FORM COMPONENTS
 * 
 * Advanced form components with React Hook Form integration,
 * Zod validation, error states, and premium animations.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Label } from "./label";
import { Input, type InputProps } from "./input";
import { Textarea, type TextareaProps } from "./input";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";

// ===== FORM FIELD VARIANTS =====

const formFieldVariants = cva(
  "space-y-2",
  {
    variants: {
      variant: {
        default: "",
        inline: "flex items-center space-x-4 space-y-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ===== FORM FIELD COMPONENT =====

export interface FormFieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formFieldVariants> {
  label?: string;
  description?: string;
  error?: string;
  success?: string;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({
    className,
    variant,
    label,
    description,
    error,
    success,
    required,
    optional,
    disabled,
    children,
    ...props
  }, ref) => {
    const fieldId = React.useId();
    const descriptionId = `${fieldId}-description`;
    const errorId = `${fieldId}-error`;
    const successId = `${fieldId}-success`;

    return (
      <div
        ref={ref}
        className={cn(formFieldVariants({ variant }), className)}
        {...props}
      >
        {/* Label */}
        {label && (
          <Label
            htmlFor={fieldId}
            required={required}
            optional={optional}
            variant={error ? "error" : success ? "success" : "default"}
            className={disabled ? "opacity-50" : ""}
          >
            {label}
          </Label>
        )}

        {/* Description */}
        {description && (
          <p
            id={descriptionId}
            className="text-sm text-neza-gray-600 dark:text-neza-gray-400"
          >
            {description}
          </p>
        )}

        {/* Form Control */}
        <div className="relative">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                id: fieldId,
                "aria-describedby": cn(
                  description && descriptionId,
                  error && errorId,
                  success && successId
                ),
                "aria-invalid": error ? "true" : "false",
                disabled: disabled || child.props.disabled,
                ...child.props,
              });
            }
            return child;
          })}
        </div>

        {/* Error Message */}
        {error && (
          <div
            id={errorId}
            className="flex items-center gap-2 text-sm text-neza-error-600 dark:text-neza-error-400"
            role="alert"
            aria-live="polite"
          >
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Message */}
        {success && !error && (
          <div
            id={successId}
            className="flex items-center gap-2 text-sm text-neza-success-600 dark:text-neza-success-400"
            role="status"
            aria-live="polite"
          >
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}
      </div>
    );
  }
);
FormField.displayName = "FormField";

// ===== FORM INPUT FIELD COMPONENT =====

export interface FormInputProps extends FormFieldProps {
  inputProps?: Omit<InputProps, "error" | "success">;
  type?: InputProps["type"];
  placeholder?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ inputProps, type, placeholder, children, ...fieldProps }, ref) => (
    <FormField {...fieldProps}>
      <Input
        ref={ref}
        type={type}
        placeholder={placeholder}
        error={fieldProps.error}
        success={fieldProps.success}
        {...inputProps}
      />
      {children}
    </FormField>
  )
);
FormInput.displayName = "FormInput";

// ===== FORM TEXTAREA FIELD COMPONENT =====

export interface FormTextareaProps extends FormFieldProps {
  textareaProps?: Omit<TextareaProps, "error" | "success">;
  placeholder?: string;
  rows?: number;
}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ textareaProps, placeholder, rows, children, ...fieldProps }, ref) => (
    <FormField {...fieldProps}>
      <Textarea
        ref={ref}
        placeholder={placeholder}
        rows={rows}
        error={fieldProps.error}
        success={fieldProps.success}
        {...textareaProps}
      />
      {children}
    </FormField>
  )
);
FormTextarea.displayName = "FormTextarea";

// ===== FORM SELECT COMPONENT =====

export interface FormSelectProps extends FormFieldProps {
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  placeholder?: string;
  selectProps?: React.SelectHTMLAttributes<HTMLSelectElement>;
}

const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ options, placeholder, selectProps, children, ...fieldProps }, ref) => {
    const fieldId = React.useId();

    return (
      <FormField {...fieldProps}>
        <select
          ref={ref}
          id={fieldId}
          className={cn(
            "flex h-10 w-full rounded-lg border border-neza-gray-300 bg-background px-3 py-2 text-sm",
            "transition-all duration-200 ease-out",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neza-primary-500/20 focus-visible:ring-offset-2",
            "focus-visible:border-neza-primary-500",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "dark:border-neza-gray-600 dark:focus-visible:border-neza-primary-400",
            fieldProps.error && "border-neza-error-500 focus-visible:border-neza-error-500 focus-visible:ring-neza-error-500/20",
            fieldProps.success && "border-neza-success-500 focus-visible:border-neza-success-500 focus-visible:ring-neza-success-500/20"
          )}
          aria-invalid={fieldProps.error ? "true" : "false"}
          {...selectProps}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        {children}
      </FormField>
    );
  }
);
FormSelect.displayName = "FormSelect";

// ===== FORM CHECKBOX COMPONENT =====

export interface FormCheckboxProps extends Omit<FormFieldProps, "children"> {
  checkboxProps?: React.InputHTMLAttributes<HTMLInputElement>;
  children?: React.ReactNode;
}

const FormCheckbox = React.forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ checkboxProps, children, ...fieldProps }, ref) => {
    const fieldId = React.useId();

    return (
      <FormField variant="inline" {...fieldProps}>
        <div className="flex items-center space-x-2">
          <input
            ref={ref}
            type="checkbox"
            id={fieldId}
            className={cn(
              "h-4 w-4 rounded border-neza-gray-300 text-neza-primary-600",
              "focus:ring-2 focus:ring-neza-primary-500/20 focus:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "dark:border-neza-gray-600 dark:bg-neza-gray-800",
              fieldProps.error && "border-neza-error-500 text-neza-error-600",
              fieldProps.success && "border-neza-success-500 text-neza-success-600"
            )}
            aria-invalid={fieldProps.error ? "true" : "false"}
            {...checkboxProps}
          />
          {children && (
            <div className="flex-1">
              {children}
            </div>
          )}
        </div>
      </FormField>
    );
  }
);
FormCheckbox.displayName = "FormCheckbox";

// ===== FORM RADIO GROUP COMPONENT =====

export interface FormRadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface FormRadioGroupProps extends Omit<FormFieldProps, "children"> {
  options: FormRadioOption[];
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  orientation?: "vertical" | "horizontal";
}

const FormRadioGroup = React.forwardRef<HTMLDivElement, FormRadioGroupProps>(
  ({ 
    options, 
    name, 
    value, 
    onChange, 
    orientation = "vertical",
    ...fieldProps 
  }, ref) => {
    return (
      <FormField {...fieldProps}>
        <div
          ref={ref}
          className={cn(
            "space-y-3",
            orientation === "horizontal" && "flex space-x-6 space-y-0"
          )}
          role="radiogroup"
          aria-invalid={fieldProps.error ? "true" : "false"}
        >
          {options.map((option) => {
            const optionId = `${name}-${option.value}`;
            
            return (
              <div key={option.value} className="flex items-start space-x-3">
                <input
                  type="radio"
                  id={optionId}
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange?.(e.target.value)}
                  disabled={option.disabled || fieldProps.disabled}
                  className={cn(
                    "mt-1 h-4 w-4 border-neza-gray-300 text-neza-primary-600",
                    "focus:ring-2 focus:ring-neza-primary-500/20 focus:ring-offset-2",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "dark:border-neza-gray-600 dark:bg-neza-gray-800",
                    fieldProps.error && "border-neza-error-500 text-neza-error-600",
                    fieldProps.success && "border-neza-success-500 text-neza-success-600"
                  )}
                />
                <div className="flex-1">
                  <label
                    htmlFor={optionId}
                    className={cn(
                      "text-sm font-medium text-neza-gray-900 dark:text-neza-gray-100",
                      (option.disabled || fieldProps.disabled) && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {option.label}
                  </label>
                  {option.description && (
                    <p className="text-sm text-neza-gray-600 dark:text-neza-gray-400">
                      {option.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </FormField>
    );
  }
);
FormRadioGroup.displayName = "FormRadioGroup";

// ===== FORM SECTION COMPONENT =====

export interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  ({ className, title, description, icon, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("space-y-6", className)}
      {...props}
    >
      {(title || description || icon) && (
        <div className="space-y-2">
          {(title || icon) && (
            <div className="flex items-center gap-3">
              {icon && (
                <div className="text-neza-primary-600 dark:text-neza-primary-400">
                  {icon}
                </div>
              )}
              {title && (
                <h3 className="text-lg font-semibold text-neza-gray-900 dark:text-neza-gray-100">
                  {title}
                </h3>
              )}
            </div>
          )}
          {description && (
            <p className="text-sm text-neza-gray-600 dark:text-neza-gray-400">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
);
FormSection.displayName = "FormSection";

// ===== FORM MESSAGE COMPONENT =====

export interface FormMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error";
  icon?: React.ReactNode;
}

const FormMessage = React.forwardRef<HTMLDivElement, FormMessageProps>(
  ({ className, variant = "info", icon, children, ...props }, ref) => {
    const variantStyles = {
      info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200",
      success: "bg-neza-success-50 border-neza-success-200 text-neza-success-800 dark:bg-neza-success-950 dark:border-neza-success-800 dark:text-neza-success-200",
      warning: "bg-neza-warning-50 border-neza-warning-200 text-neza-warning-800 dark:bg-neza-warning-950 dark:border-neza-warning-800 dark:text-neza-warning-200",
      error: "bg-neza-error-50 border-neza-error-200 text-neza-error-800 dark:bg-neza-error-950 dark:border-neza-error-800 dark:text-neza-error-200",
    };

    const defaultIcons = {
      info: <Info className="h-4 w-4" />,
      success: <CheckCircle2 className="h-4 w-4" />,
      warning: <AlertCircle className="h-4 w-4" />,
      error: <AlertCircle className="h-4 w-4" />,
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-start gap-3 rounded-lg border p-4 text-sm",
          variantStyles[variant],
          className
        )}
        role={variant === "error" ? "alert" : "status"}
        aria-live="polite"
        {...props}
      >
        <div className="flex-shrink-0">
          {icon || defaultIcons[variant]}
        </div>
        <div className="flex-1">
          {children}
        </div>
      </div>
    );
  }
);
FormMessage.displayName = "FormMessage";

// ===== EXPORTS =====

export {
  FormField,
  FormInput,
  FormTextarea,
  FormSelect,
  FormCheckbox,
  FormRadioGroup,
  FormSection,
  FormMessage,
  formFieldVariants,
};

export type {
  FormFieldProps,
  FormInputProps,
  FormTextareaProps,
  FormSelectProps,
  FormCheckboxProps,
  FormRadioGroupProps,
  FormRadioOption,
  FormSectionProps,
  FormMessageProps,
};
