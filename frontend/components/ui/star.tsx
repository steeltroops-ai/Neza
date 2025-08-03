import React from 'react';
import { Star as StarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarProps extends React.HTMLAttributes<HTMLDivElement> {
  filled?: boolean;
  half?: boolean;
  size?: number;
  color?: string;
}

export function Star({
  filled = false,
  half = false,
  size = 20,
  color = 'text-yellow-400',
  className,
  ...props
}: StarProps) {
  return (
    <div className={cn('relative inline-block', className)} {...props}>
      <StarIcon
        size={size}
        className={cn(
          'transition-colors',
          filled ? color : 'text-gray-300',
          half && 'text-gray-300'
        )}
        fill={filled || half ? 'currentColor' : 'none'}
      />
      {half && (
        <div className="absolute inset-0 overflow-hidden w-1/2">
          <StarIcon
            size={size}
            className={cn('transition-colors', color)}
            fill="currentColor"
          />
        </div>
      )}
    </div>
  );
}

interface StarRatingProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  maxRating?: number;
  size?: number;
  color?: string;
  showEmpty?: boolean;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 20,
  color = 'text-yellow-400',
  showEmpty = true,
  className,
  ...props
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn('flex', className)} {...props}>
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} filled size={size} color={color} />
      ))}

      {/* Half star */}
      {hasHalfStar && <Star half size={size} color={color} />}

      {/* Empty stars */}
      {showEmpty &&
        Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} size={size} color={color} />
        ))}
    </div>
  );
}