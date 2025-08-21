import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes with proper precedence
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Design System Utilities
 */

// Color utilities
export const colors = {
  primary: {
    50: "rgb(239 246 255)",
    100: "rgb(219 234 254)",
    200: "rgb(191 219 254)",
    300: "rgb(147 197 253)",
    400: "rgb(96 165 250)",
    500: "rgb(59 130 246)",
    600: "rgb(37 99 235)",
    700: "rgb(29 78 216)",
    800: "rgb(30 64 175)",
    900: "rgb(30 58 138)",
    950: "rgb(23 37 84)",
  },
  success: {
    50: "rgb(240 253 244)",
    100: "rgb(220 252 231)",
    200: "rgb(187 247 208)",
    300: "rgb(134 239 172)",
    400: "rgb(74 222 128)",
    500: "rgb(34 197 94)",
    600: "rgb(22 163 74)",
    700: "rgb(21 128 61)",
    800: "rgb(22 101 52)",
    900: "rgb(20 83 45)",
  },
  warning: {
    50: "rgb(255 251 235)",
    100: "rgb(254 243 199)",
    200: "rgb(253 230 138)",
    300: "rgb(252 211 77)",
    400: "rgb(251 191 36)",
    500: "rgb(245 158 11)",
    600: "rgb(217 119 6)",
    700: "rgb(180 83 9)",
    800: "rgb(146 64 14)",
    900: "rgb(120 53 15)",
  },
  error: {
    50: "rgb(254 242 242)",
    100: "rgb(254 226 226)",
    200: "rgb(254 202 202)",
    300: "rgb(252 165 165)",
    400: "rgb(248 113 113)",
    500: "rgb(239 68 68)",
    600: "rgb(220 38 38)",
    700: "rgb(185 28 28)",
    800: "rgb(153 27 27)",
    900: "rgb(127 29 29)",
  },
  neutral: {
    0: "rgb(255 255 255)",
    50: "rgb(250 250 250)",
    100: "rgb(245 245 245)",
    200: "rgb(229 229 229)",
    300: "rgb(212 212 212)",
    400: "rgb(163 163 163)",
    500: "rgb(115 115 115)",
    600: "rgb(82 82 82)",
    700: "rgb(64 64 64)",
    800: "rgb(38 38 38)",
    900: "rgb(23 23 23)",
    950: "rgb(10 10 10)",
  },
} as const;

// Spacing utilities based on 8px grid
export const spacing = {
  0: "0px",
  1: "0.125rem", // 2px
  2: "0.25rem",  // 4px
  3: "0.375rem", // 6px
  4: "0.5rem",   // 8px
  5: "0.625rem", // 10px
  6: "0.75rem",  // 12px
  8: "1rem",     // 16px
  10: "1.25rem", // 20px
  12: "1.5rem",  // 24px
  16: "2rem",    // 32px
  20: "2.5rem",  // 40px
  24: "3rem",    // 48px
  32: "4rem",    // 64px
  40: "5rem",    // 80px
  48: "6rem",    // 96px
  64: "8rem",    // 128px
  80: "10rem",   // 160px
  96: "12rem",   // 192px
} as const;

// Typography utilities
export const typography = {
  fontSizes: {
    xs: "0.75rem",    // 12px
    sm: "0.875rem",   // 14px
    base: "1rem",     // 16px
    lg: "1.125rem",   // 18px
    xl: "1.25rem",    // 20px
    "2xl": "1.5rem",  // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem",    // 48px
    "6xl": "3.75rem", // 60px
    "7xl": "4.5rem",  // 72px
    "8xl": "6rem",    // 96px
    "9xl": "8rem",    // 128px
  },
  fontWeights: {
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },
  lineHeights: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },
} as const;

// Animation utilities
export const animations = {
  durations: {
    instant: "0ms",
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
    slower: "750ms",
    slowest: "1000ms",
  },
  easings: {
    linear: "linear",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    spring: "cubic-bezier(0.22, 1, 0.36, 1)",
    bounce: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    elastic: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },
} as const;

// Breakpoint utilities
export const breakpoints = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

/**
 * Accessibility utilities
 */

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Check if user prefers dark mode
export function prefersDarkMode(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

// Generate accessible color contrast
export function getContrastRatio(color1: string, color2: string): number {
  // Simplified contrast ratio calculation
  // In production, use a proper color contrast library
  return 4.5; // Placeholder - implement proper calculation
}

/**
 * Performance utilities
 */

// Debounce function for performance optimization
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle function for performance optimization
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Validation utilities
 */

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone validation (basic)
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

/**
 * Format utilities
 */

// Format currency
export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

// Format date
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {},
  locale: string = "en-US"
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  }).format(dateObj);
}

// Format relative time
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return formatDate(dateObj, { month: "short", day: "numeric" });
}

/**
 * Component variant utilities
 */

// Generate component variants using class-variance-authority pattern
export function createVariants<T extends Record<string, Record<string, string>>>(
  base: string,
  variants: T
) {
  return (props: {
    [K in keyof T]?: keyof T[K];
  }) => {
    const classes = [base];
    
    for (const [key, value] of Object.entries(props)) {
      if (value && variants[key] && variants[key][value as string]) {
        classes.push(variants[key][value as string]);
      }
    }
    
    return cn(...classes);
  };
}

/**
 * Error handling utilities
 */

// Safe JSON parse
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

// Error boundary helper
export function createErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An unexpected error occurred";
}
