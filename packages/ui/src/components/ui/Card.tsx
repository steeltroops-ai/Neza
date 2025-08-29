import { motion } from 'framer-motion';
import React from 'react';

import { cn } from '../../utils/cn';

export interface CardProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
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
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  animate?: boolean;
}

const cardVariants = {
  default: 'bg-white border border-neutral-200 shadow-sm',
  elevated: 'bg-white border border-neutral-200 shadow-md',
  outlined: 'bg-white border-2 border-neutral-300',
  ghost: 'bg-transparent',
};

const cardPadding = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      padding = 'md',
      hover = false,
      animate = true,
      children,
      ...props
    },
    ref
  ) => {
    const CardComponent = animate ? motion.div : 'div';

    const motionProps = animate
      ? {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3 },
          ...(hover && {
            whileHover: { y: -2, transition: { duration: 0.2 } },
          }),
        }
      : {};

    return (
      <CardComponent
        ref={ref}
        className={cn(
          // Base styles
          'rounded-xl transition-all duration-200',
          // Variant styles
          cardVariants[variant],
          // Padding styles
          cardPadding[padding],
          // Hover effects
          hover && 'hover:border-neutral-300 hover:shadow-lg',
          className
        )}
        {...motionProps}
        {...props}
      >
        {children}
      </CardComponent>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5', className)} {...props} />
  )
);

CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight text-neutral-900', className)}
    {...props}
  />
));

CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-neutral-600', className)} {...props} />
));

CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('pt-0', className)} {...props} />
);

CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center pt-6', className)} {...props} />
  )
);

CardFooter.displayName = 'CardFooter';
