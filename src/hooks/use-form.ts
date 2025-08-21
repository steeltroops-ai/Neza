/**
 * NEZA DESIGN SYSTEM - FORM HOOKS
 * 
 * Advanced React Hook Form integration with Zod validation,
 * error handling, and premium form features.
 */

import { useForm as useReactHookForm, type UseFormProps, type FieldValues, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";

// ===== ENHANCED USE FORM HOOK =====

export interface UseFormOptions<T extends FieldValues> extends Omit<UseFormProps<T>, "resolver"> {
  schema?: z.ZodSchema<T>;
  onSubmit?: (data: T) => Promise<void> | void;
  onError?: (errors: Record<string, string>) => void;
  showToastOnSuccess?: boolean;
  showToastOnError?: boolean;
  successMessage?: string;
  resetOnSuccess?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export function useForm<T extends FieldValues>(options: UseFormOptions<T> = {}) {
  const {
    schema,
    onSubmit,
    onError,
    showToastOnSuccess = true,
    showToastOnError = true,
    successMessage = "Form submitted successfully!",
    resetOnSuccess = false,
    validateOnChange = true,
    validateOnBlur = true,
    ...formOptions
  } = options;

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  // Initialize React Hook Form
  const form = useReactHookForm<T>({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: validateOnChange ? "onChange" : validateOnBlur ? "onBlur" : "onSubmit",
    ...formOptions,
  });

  // Enhanced submit handler
  const handleSubmit = useCallback(
    async (data: T) => {
      if (!onSubmit) return;

      setIsSubmitting(true);
      setSubmitCount(prev => prev + 1);

      try {
        await onSubmit(data);
        
        if (showToastOnSuccess) {
          toast.success(successMessage);
        }
        
        if (resetOnSuccess) {
          form.reset();
        }
      } catch (error) {
        console.error("Form submission error:", error);
        
        if (showToastOnError) {
          const errorMessage = error instanceof Error ? error.message : "An error occurred";
          toast.error(errorMessage);
        }
        
        // Handle validation errors from server
        if (error && typeof error === "object" && "fieldErrors" in error) {
          const fieldErrors = error.fieldErrors as Record<string, string>;
          Object.entries(fieldErrors).forEach(([field, message]) => {
            form.setError(field as Path<T>, { message });
          });
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [onSubmit, showToastOnSuccess, showToastOnError, successMessage, resetOnSuccess, form]
  );

  // Handle form errors
  const handleError = useCallback(
    (errors: Record<string, any>) => {
      const errorMessages: Record<string, string> = {};
      
      Object.entries(errors).forEach(([field, error]) => {
        if (error?.message) {
          errorMessages[field] = error.message;
        }
      });
      
      onError?.(errorMessages);
      
      if (showToastOnError && Object.keys(errorMessages).length > 0) {
        toast.error("Please fix the errors in the form");
      }
    },
    [onError, showToastOnError]
  );

  // Get field error message
  const getFieldError = useCallback(
    (fieldName: Path<T>) => {
      const error = form.formState.errors[fieldName];
      return error?.message as string | undefined;
    },
    [form.formState.errors]
  );

  // Check if field has error
  const hasFieldError = useCallback(
    (fieldName: Path<T>) => {
      return !!form.formState.errors[fieldName];
    },
    [form.formState.errors]
  );

  // Get field props for easy integration
  const getFieldProps = useCallback(
    (fieldName: Path<T>) => {
      const error = getFieldError(fieldName);
      
      return {
        ...form.register(fieldName),
        error,
        "aria-invalid": hasFieldError(fieldName),
      };
    },
    [form.register, getFieldError, hasFieldError]
  );

  // Validate specific field
  const validateField = useCallback(
    async (fieldName: Path<T>) => {
      return await form.trigger(fieldName);
    },
    [form.trigger]
  );

  // Clear field error
  const clearFieldError = useCallback(
    (fieldName: Path<T>) => {
      form.clearErrors(fieldName);
    },
    [form.clearErrors]
  );

  // Set field value with validation
  const setFieldValue = useCallback(
    (fieldName: Path<T>, value: any, shouldValidate = true) => {
      form.setValue(fieldName, value, { shouldValidate, shouldDirty: true });
    },
    [form.setValue]
  );

  return {
    // React Hook Form methods
    ...form,
    
    // Enhanced methods
    handleSubmit: form.handleSubmit(handleSubmit, handleError),
    getFieldError,
    hasFieldError,
    getFieldProps,
    validateField,
    clearFieldError,
    setFieldValue,
    
    // Form state
    isSubmitting,
    submitCount,
    isValid: form.formState.isValid,
    isDirty: form.formState.isDirty,
    isValidating: form.formState.isValidating,
    
    // Computed properties
    canSubmit: form.formState.isValid && !isSubmitting,
    hasErrors: Object.keys(form.formState.errors).length > 0,
  };
}

// ===== FORM FIELD HOOK =====

export interface UseFormFieldOptions<T extends FieldValues> {
  form: ReturnType<typeof useForm<T>>;
  name: Path<T>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  transform?: {
    input?: (value: any) => any;
    output?: (value: any) => any;
  };
}

export function useFormField<T extends FieldValues>({
  form,
  name,
  validateOnChange = true,
  validateOnBlur = true,
  transform,
}: UseFormFieldOptions<T>) {
  const fieldState = form.getFieldState(name);
  const value = form.watch(name);
  
  const onChange = useCallback(
    (newValue: any) => {
      const transformedValue = transform?.output ? transform.output(newValue) : newValue;
      form.setValue(name, transformedValue, { 
        shouldValidate: validateOnChange,
        shouldDirty: true,
      });
    },
    [form, name, validateOnChange, transform]
  );

  const onBlur = useCallback(() => {
    if (validateOnBlur) {
      form.trigger(name);
    }
  }, [form, name, validateOnBlur]);

  const displayValue = transform?.input ? transform.input(value) : value;

  return {
    value: displayValue,
    onChange,
    onBlur,
    error: fieldState.error?.message,
    isDirty: fieldState.isDirty,
    isTouched: fieldState.isTouched,
    isValidating: fieldState.isValidating,
    hasError: !!fieldState.error,
    name,
    id: name,
    "aria-invalid": !!fieldState.error,
    "aria-describedby": fieldState.error ? `${name}-error` : undefined,
  };
}

// ===== FORM VALIDATION HOOK =====

export interface UseFormValidationOptions<T extends FieldValues> {
  schema: z.ZodSchema<T>;
  data: T;
  validateOnChange?: boolean;
  debounceMs?: number;
}

export function useFormValidation<T extends FieldValues>({
  schema,
  data,
  validateOnChange = true,
  debounceMs = 300,
}: UseFormValidationOptions<T>) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const validate = useCallback(
    async (dataToValidate: T) => {
      setIsValidating(true);
      
      try {
        await schema.parseAsync(dataToValidate);
        setErrors({});
        setIsValid(true);
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldErrors: Record<string, string> = {};
          error.errors.forEach((err) => {
            const path = err.path.join(".");
            fieldErrors[path] = err.message;
          });
          setErrors(fieldErrors);
          setIsValid(false);
        }
      } finally {
        setIsValidating(false);
      }
    },
    [schema]
  );

  // Debounced validation
  useEffect(() => {
    if (!validateOnChange) return;

    const timeoutId = setTimeout(() => {
      validate(data);
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [data, validate, validateOnChange, debounceMs]);

  const validateField = useCallback(
    async (fieldName: keyof T, value: any) => {
      try {
        const fieldSchema = schema.shape[fieldName as string];
        if (fieldSchema) {
          await fieldSchema.parseAsync(value);
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[fieldName as string];
            return newErrors;
          });
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrors(prev => ({
            ...prev,
            [fieldName as string]: error.errors[0]?.message || "Invalid value",
          }));
        }
      }
    },
    [schema]
  );

  return {
    errors,
    isValidating,
    isValid,
    validate,
    validateField,
    hasErrors: Object.keys(errors).length > 0,
    getFieldError: (fieldName: keyof T) => errors[fieldName as string],
    hasFieldError: (fieldName: keyof T) => !!errors[fieldName as string],
  };
}

// ===== FORM PERSISTENCE HOOK =====

export interface UseFormPersistenceOptions {
  key: string;
  storage?: Storage;
  exclude?: string[];
}

export function useFormPersistence<T extends FieldValues>(
  form: ReturnType<typeof useForm<T>>,
  options: UseFormPersistenceOptions
) {
  const { key, storage = localStorage, exclude = [] } = options;

  // Load persisted data on mount
  useEffect(() => {
    try {
      const saved = storage.getItem(key);
      if (saved) {
        const data = JSON.parse(saved);
        Object.entries(data).forEach(([fieldName, value]) => {
          if (!exclude.includes(fieldName)) {
            form.setValue(fieldName as Path<T>, value);
          }
        });
      }
    } catch (error) {
      console.warn("Failed to load persisted form data:", error);
    }
  }, [key, storage, exclude, form]);

  // Save data on change
  useEffect(() => {
    const subscription = form.watch((data) => {
      try {
        const dataToSave = { ...data };
        exclude.forEach(field => {
          delete dataToSave[field];
        });
        storage.setItem(key, JSON.stringify(dataToSave));
      } catch (error) {
        console.warn("Failed to persist form data:", error);
      }
    });

    return () => subscription.unsubscribe();
  }, [form, key, storage, exclude]);

  const clearPersistedData = useCallback(() => {
    try {
      storage.removeItem(key);
    } catch (error) {
      console.warn("Failed to clear persisted form data:", error);
    }
  }, [key, storage]);

  return {
    clearPersistedData,
  };
}

// ===== EXPORTS =====

export type { UseFormOptions, UseFormFieldOptions, UseFormValidationOptions, UseFormPersistenceOptions };
