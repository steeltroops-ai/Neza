/**
 * NEZA DESIGN SYSTEM - FORM VALIDATION
 * 
 * Advanced form validation utilities with Zod integration,
 * custom validators, and error handling.
 */

import { z } from "zod";

// ===== CUSTOM VALIDATION MESSAGES =====

export const validationMessages = {
  required: "This field is required",
  email: "Please enter a valid email address",
  phone: "Please enter a valid phone number",
  url: "Please enter a valid URL",
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be no more than ${max} characters`,
  min: (min: number) => `Must be at least ${min}`,
  max: (max: number) => `Must be no more than ${max}`,
  password: "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character",
  passwordMatch: "Passwords do not match",
  strongPassword: "Password must be at least 12 characters with mixed case, numbers, and symbols",
  zipCode: "Please enter a valid ZIP code",
  creditCard: "Please enter a valid credit card number",
  ssn: "Please enter a valid Social Security Number",
  date: "Please enter a valid date",
  time: "Please enter a valid time",
  dateRange: "End date must be after start date",
  fileSize: (maxSize: string) => `File size must be less than ${maxSize}`,
  fileType: (types: string[]) => `File must be one of: ${types.join(", ")}`,
} as const;

// ===== CUSTOM ZOD VALIDATORS =====

// Email validation with custom message
export const emailSchema = z
  .string()
  .min(1, validationMessages.required)
  .email(validationMessages.email);

// Phone number validation (US format)
export const phoneSchema = z
  .string()
  .min(1, validationMessages.required)
  .regex(
    /^(\+1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/,
    validationMessages.phone
  );

// URL validation
export const urlSchema = z
  .string()
  .min(1, validationMessages.required)
  .url(validationMessages.url);

// Password validation (basic)
export const passwordSchema = z
  .string()
  .min(1, validationMessages.required)
  .min(8, validationMessages.minLength(8))
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    validationMessages.password
  );

// Strong password validation
export const strongPasswordSchema = z
  .string()
  .min(1, validationMessages.required)
  .min(12, validationMessages.minLength(12))
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    validationMessages.strongPassword
  );

// ZIP code validation (US format)
export const zipCodeSchema = z
  .string()
  .min(1, validationMessages.required)
  .regex(/^\d{5}(-\d{4})?$/, validationMessages.zipCode);

// Credit card validation (basic Luhn algorithm)
export const creditCardSchema = z
  .string()
  .min(1, validationMessages.required)
  .regex(/^\d{13,19}$/, validationMessages.creditCard)
  .refine((val) => {
    // Luhn algorithm implementation
    let sum = 0;
    let isEven = false;
    
    for (let i = val.length - 1; i >= 0; i--) {
      let digit = parseInt(val.charAt(i), 10);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  }, validationMessages.creditCard);

// Date validation
export const dateSchema = z
  .string()
  .min(1, validationMessages.required)
  .refine((val) => !isNaN(Date.parse(val)), validationMessages.date);

// File validation
export const createFileSchema = (
  maxSizeBytes: number,
  allowedTypes: string[],
  maxSizeLabel: string
) => {
  return z
    .instanceof(File)
    .refine((file) => file.size <= maxSizeBytes, validationMessages.fileSize(maxSizeLabel))
    .refine(
      (file) => allowedTypes.includes(file.type),
      validationMessages.fileType(allowedTypes)
    );
};

// ===== COMMON FORM SCHEMAS =====

// User registration schema
export const userRegistrationSchema = z
  .object({
    firstName: z
      .string()
      .min(1, validationMessages.required)
      .min(2, validationMessages.minLength(2))
      .max(50, validationMessages.maxLength(50)),
    lastName: z
      .string()
      .min(1, validationMessages.required)
      .min(2, validationMessages.minLength(2))
      .max(50, validationMessages.maxLength(50)),
    email: emailSchema,
    phone: phoneSchema.optional(),
    password: passwordSchema,
    confirmPassword: z.string().min(1, validationMessages.required),
    agreeToTerms: z.boolean().refine((val) => val === true, "You must agree to the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: validationMessages.passwordMatch,
    path: ["confirmPassword"],
  });

// User login schema
export const userLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, validationMessages.required),
  rememberMe: z.boolean().optional(),
});

// Contact form schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, validationMessages.required)
    .min(2, validationMessages.minLength(2))
    .max(100, validationMessages.maxLength(100)),
  email: emailSchema,
  phone: phoneSchema.optional(),
  subject: z
    .string()
    .min(1, validationMessages.required)
    .max(200, validationMessages.maxLength(200)),
  message: z
    .string()
    .min(1, validationMessages.required)
    .min(10, validationMessages.minLength(10))
    .max(1000, validationMessages.maxLength(1000)),
  category: z.enum(["general", "support", "sales", "feedback"], {
    required_error: "Please select a category",
  }),
});

// Address schema
export const addressSchema = z.object({
  street: z
    .string()
    .min(1, validationMessages.required)
    .max(100, validationMessages.maxLength(100)),
  city: z
    .string()
    .min(1, validationMessages.required)
    .max(50, validationMessages.maxLength(50)),
  state: z
    .string()
    .min(1, validationMessages.required)
    .length(2, "State must be 2 characters"),
  zipCode: zipCodeSchema,
  country: z.string().min(1, validationMessages.required).default("US"),
});

// Payment schema
export const paymentSchema = z.object({
  cardNumber: creditCardSchema,
  expiryMonth: z
    .string()
    .min(1, validationMessages.required)
    .regex(/^(0[1-9]|1[0-2])$/, "Invalid month"),
  expiryYear: z
    .string()
    .min(1, validationMessages.required)
    .regex(/^\d{4}$/, "Invalid year")
    .refine((year) => parseInt(year) >= new Date().getFullYear(), "Year cannot be in the past"),
  cvv: z
    .string()
    .min(1, validationMessages.required)
    .regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
  cardholderName: z
    .string()
    .min(1, validationMessages.required)
    .max(100, validationMessages.maxLength(100)),
  billingAddress: addressSchema,
});

// Service booking schema
export const serviceBookingSchema = z.object({
  serviceId: z.string().min(1, validationMessages.required),
  providerId: z.string().min(1, validationMessages.required),
  date: dateSchema,
  time: z
    .string()
    .min(1, validationMessages.required)
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, validationMessages.time),
  duration: z.number().min(30, "Minimum duration is 30 minutes"),
  notes: z.string().max(500, validationMessages.maxLength(500)).optional(),
  address: addressSchema,
  contactPhone: phoneSchema,
});

// ===== VALIDATION UTILITIES =====

// Extract error messages from Zod validation result
export function getValidationErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  
  error.errors.forEach((err) => {
    const path = err.path.join(".");
    errors[path] = err.message;
  });
  
  return errors;
}

// Validate a single field
export function validateField<T>(
  schema: z.ZodSchema<T>,
  value: unknown
): { success: boolean; error?: string; data?: T } {
  try {
    const data = schema.parse(value);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0]?.message };
    }
    return { success: false, error: "Validation failed" };
  }
}

// Async validation wrapper
export async function validateAsync<T>(
  schema: z.ZodSchema<T>,
  value: unknown
): Promise<{ success: boolean; errors?: Record<string, string>; data?: T }> {
  try {
    const data = await schema.parseAsync(value);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: getValidationErrors(error) };
    }
    return { success: false, errors: { _root: "Validation failed" } };
  }
}

// Create a validation function for React Hook Form
export function createValidator<T>(schema: z.ZodSchema<T>) {
  return (value: unknown) => {
    const result = validateField(schema, value);
    return result.success ? true : result.error;
  };
}

// ===== FORM FIELD VALIDATORS =====

export const fieldValidators = {
  required: (message = validationMessages.required) => (value: any) => {
    if (!value || (typeof value === "string" && !value.trim())) {
      return message;
    }
    return true;
  },
  
  minLength: (min: number, message?: string) => (value: string) => {
    if (value && value.length < min) {
      return message || validationMessages.minLength(min);
    }
    return true;
  },
  
  maxLength: (max: number, message?: string) => (value: string) => {
    if (value && value.length > max) {
      return message || validationMessages.maxLength(max);
    }
    return true;
  },
  
  email: (message = validationMessages.email) => (value: string) => {
    if (value && !emailSchema.safeParse(value).success) {
      return message;
    }
    return true;
  },
  
  phone: (message = validationMessages.phone) => (value: string) => {
    if (value && !phoneSchema.safeParse(value).success) {
      return message;
    }
    return true;
  },
  
  url: (message = validationMessages.url) => (value: string) => {
    if (value && !urlSchema.safeParse(value).success) {
      return message;
    }
    return true;
  },
  
  pattern: (regex: RegExp, message: string) => (value: string) => {
    if (value && !regex.test(value)) {
      return message;
    }
    return true;
  },
} as const;

// ===== EXPORTS =====

export type {
  z as ZodType,
};

export {
  z,
  userRegistrationSchema,
  userLoginSchema,
  contactFormSchema,
  addressSchema,
  paymentSchema,
  serviceBookingSchema,
};
