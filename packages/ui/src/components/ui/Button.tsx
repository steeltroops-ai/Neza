import { motion } from 'framer-motion';
import React from 'react';

import { cn } from '../../utils/cn';

export interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    | 'onDrag'
    | 'onDragEnd'
    | 'onDragEnter'
    | 'onDragExit'
    | 'onDragLeave'
    | 'onDragOver'
    | 'onDragStart'
    | 'onDrop'
    | 'onAnimationStart'
    | 'onAnimationEnd'
    | 'onAnimationIteration'
  > {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  animate?: boolean;
}

const buttonVariants = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-sm',
  secondary:
    'bg-primary-50 text-primary-700 hover:bg-primary-100 focus:ring-primary-500 border border-primary-200',
  outline:
    'bg-white text-neutral-700 hover:bg-neutral-50 focus:ring-primary-500 border border-neutral-300 shadow-sm',
  ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100 focus:ring-primary-500',
  destructive: 'bg-error-500 text-white hover:bg-error-600 focus:ring-error-500 shadow-sm',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      animate = true,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const ButtonComponent = animate ? motion.button : 'button';

    const motionProps = animate
      ? {
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.98 },
          transition: { duration: 0.1 },
        }
      : {};

    return (
      <ButtonComponent
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center rounded-lg font-medium',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'transition-all duration-200 ease-in-out',
          // Variant styles
          buttonVariants[variant],
          // Size styles
          buttonSizes[size],
          // Full width
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || loading}
        {...motionProps}
        {...props}
      >
        {loading && (
          <svg
            className="-ml-1 mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {!loading && leftIcon && <span className="mr-2 flex-shrink-0">{leftIcon}</span>}

        <span className="flex-1">{children}</span>

        {!loading && rightIcon && <span className="ml-2 flex-shrink-0">{rightIcon}</span>}
      </ButtonComponent>
    );
  }
);

Button.displayName = 'Button';
