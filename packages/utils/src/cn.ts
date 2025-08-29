import { type ClassValue, clsx } from 'clsx';

/**
 * Utility function to merge classes with clsx
 * Handles conditional classes efficiently
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
