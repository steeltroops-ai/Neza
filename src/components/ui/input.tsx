/**
 * NEZA DESIGN SYSTEM - INPUT COMPONENT
 * 
 * Premium input component with accessibility features,
 * validation states, and comprehensive styling.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, AlertCircle, CheckCircle2, Search, X } from "lucide-react";

// ===== INPUT VARIANTS =====

const inputVariants = cva(
  [
    "flex w-full rounded-lg border bg-background px-3 py-2 text-sm",
    "transition-all duration-200 ease-out",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
    "placeholder:text-neza-gray-400 dark:placeholder:text-neza-gray-500",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "read-only:cursor-default read-only:focus-visible:ring-0",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-neza-gray-300 text-neza-gray-900",
          "focus-visible:border-neza-primary-500 focus-visible:ring-neza-primary-500/20",
          "dark:border-neza-gray-600 dark:text-neza-gray-100",
          "dark:focus-visible:border-neza-primary-400 dark:focus-visible:ring-neza-primary-400/20",
        ],
        error: [
          "border-neza-error-500 text-neza-gray-900",
          "focus-visible:border-neza-error-500 focus-visible:ring-neza-error-500/20",
          "dark:border-neza-error-400 dark:text-neza-gray-100",
          "dark:focus-visible:border-neza-error-400 dark:focus-visible:ring-neza-error-400/20",
        ],
        success: [
          "border-neza-success-500 text-neza-gray-900",
          "focus-visible:border-neza-success-500 focus-visible:ring-neza-success-500/20",
          "dark:border-neza-success-400 dark:text-neza-gray-100",
          "dark:focus-visible:border-neza-success-400 dark:focus-visible:ring-neza-success-400/20",
        ],
        ghost: [
          "border-transparent bg-neza-gray-50 text-neza-gray-900",
          "focus-visible:border-neza-primary-500 focus-visible:ring-neza-primary-500/20 focus-visible:bg-background",
          "dark:bg-neza-gray-800 dark:text-neza-gray-100",
          "dark:focus-visible:border-neza-primary-400 dark:focus-visible:ring-neza-primary-400/20",
        ],
      },
      inputSize: {
        sm: "h-8 px-2 text-xs",
        default: "h-10 px-3 py-2",
        lg: "h-12 px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

// ===== BASE INPUT COMPONENT =====

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  success?: string;
  helperText?: string;
  label?: string;
  required?: boolean;
  clearable?: boolean;
  onClear?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      variant,
      inputSize,
      leftIcon,
      rightIcon,
      error,
      success,
      helperText,
      label,
      required,
      clearable,
      onClear,
      value,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();
    const helperTextId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;
    
    // Determine variant based on validation state
    const computedVariant = error ? "error" : success ? "success" : variant;
    
    // Show clear button if clearable and has value
    const showClearButton = clearable && value && !props.disabled && !props.readOnly;

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "mb-2 block text-sm font-medium text-neza-gray-700 dark:text-neza-gray-300",
              required && "after:ml-1 after:text-neza-error-500 after:content-['*']"
            )}
          >
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neza-gray-400 dark:text-neza-gray-500">
              {leftIcon}
            </div>
          )}

          {/* Input Element */}
          <input
            type={type}
            className={cn(
              inputVariants({ variant: computedVariant, inputSize }),
              leftIcon && "pl-10",
              (rightIcon || showClearButton || error || success) && "pr-10",
              className
            )}
            ref={ref}
            id={inputId}
            value={value}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={cn(
              helperText && helperTextId,
              error && errorId
            )}
            {...props}
          />

          {/* Right Icons */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {/* Clear Button */}
            {showClearButton && (
              <button
                type="button"
                onClick={onClear}
                className="text-neza-gray-400 hover:text-neza-gray-600 dark:text-neza-gray-500 dark:hover:text-neza-gray-300 transition-colors"
                aria-label="Clear input"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* Validation Icons */}
            {error && (
              <AlertCircle className="h-4 w-4 text-neza-error-500 dark:text-neza-error-400" />
            )}
            {success && !error && (
              <CheckCircle2 className="h-4 w-4 text-neza-success-500 dark:text-neza-success-400" />
            )}

            {/* Custom Right Icon */}
            {rightIcon && !error && !success && (
              <span className="text-neza-gray-400 dark:text-neza-gray-500">
                {rightIcon}
              </span>
            )}
          </div>
        </div>

        {/* Helper Text / Error Message */}
        {(error || success || helperText) && (
          <div className="mt-2 text-sm">
            {error && (
              <p id={errorId} className="text-neza-error-600 dark:text-neza-error-400">
                {error}
              </p>
            )}
            {success && !error && (
              <p className="text-neza-success-600 dark:text-neza-success-400">
                {success}
              </p>
            )}
            {helperText && !error && !success && (
              <p id={helperTextId} className="text-neza-gray-500 dark:text-neza-gray-400">
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

// ===== PASSWORD INPUT COMPONENT =====

export interface PasswordInputProps extends Omit<InputProps, "type" | "rightIcon"> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <Input
        {...props}
        ref={ref}
        type={showPassword ? "text" : "password"}
        rightIcon={
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="text-neza-gray-400 hover:text-neza-gray-600 dark:text-neza-gray-500 dark:hover:text-neza-gray-300 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        }
      />
    );
  }
);
PasswordInput.displayName = "PasswordInput";

// ===== SEARCH INPUT COMPONENT =====

export interface SearchInputProps extends Omit<InputProps, "type" | "leftIcon"> {
  onSearch?: (value: string) => void;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onSearch, onClear, ...props }, ref) => {
    const handleClear = () => {
      onClear?.();
      onSearch?.("");
    };

    return (
      <Input
        {...props}
        ref={ref}
        type="search"
        leftIcon={<Search className="h-4 w-4" />}
        clearable
        onClear={handleClear}
        placeholder={props.placeholder || "Search..."}
      />
    );
  }
);
SearchInput.displayName = "SearchInput";

// ===== TEXTAREA COMPONENT =====

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    Pick<InputProps, "variant" | "error" | "success" | "helperText" | "label" | "required"> {
  resize?: "none" | "vertical" | "horizontal" | "both";
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      error,
      success,
      helperText,
      label,
      required,
      resize = "vertical",
      id,
      ...props
    },
    ref
  ) => {
    const textareaId = id || React.useId();
    const helperTextId = `${textareaId}-helper`;
    const errorId = `${textareaId}-error`;
    
    // Determine variant based on validation state
    const computedVariant = error ? "error" : success ? "success" : variant;

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "mb-2 block text-sm font-medium text-neza-gray-700 dark:text-neza-gray-300",
              required && "after:ml-1 after:text-neza-error-500 after:content-['*']"
            )}
          >
            {label}
          </label>
        )}

        {/* Textarea Element */}
        <textarea
          className={cn(
            inputVariants({ variant: computedVariant }),
            "min-h-[80px]",
            resize === "none" && "resize-none",
            resize === "vertical" && "resize-y",
            resize === "horizontal" && "resize-x",
            resize === "both" && "resize",
            className
          )}
          ref={ref}
          id={textareaId}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={cn(
            helperText && helperTextId,
            error && errorId
          )}
          {...props}
        />

        {/* Helper Text / Error Message */}
        {(error || success || helperText) && (
          <div className="mt-2 text-sm">
            {error && (
              <p id={errorId} className="text-neza-error-600 dark:text-neza-error-400">
                {error}
              </p>
            )}
            {success && !error && (
              <p className="text-neza-success-600 dark:text-neza-success-400">
                {success}
              </p>
            )}
            {helperText && !error && !success && (
              <p id={helperTextId} className="text-neza-gray-500 dark:text-neza-gray-400">
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

// ===== EXPORTS =====

export { Input, PasswordInput, SearchInput, Textarea, inputVariants };
export type { InputProps, PasswordInputProps, SearchInputProps, TextareaProps };
