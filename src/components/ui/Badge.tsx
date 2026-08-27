import React from 'react';
import { cn } from './Button';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bio' | 'maths' | 'physics' | 'chemistry' | 'outline';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors break-words text-center min-h-[32px] max-w-full overflow-hidden text-ellipsis',
        {
          'border-transparent bg-gray-100 text-gray-900': variant === 'default',
          'border-transparent bg-bio/15 text-bio': variant === 'bio',
          'border-transparent bg-maths/15 text-maths': variant === 'maths',
          'border-transparent bg-physics/15 text-physics': variant === 'physics',
          'border-transparent bg-chemistry/15 text-chemistry': variant === 'chemistry',
          'border-gray-200 text-gray-900': variant === 'outline',
        },
        className
      )}
      {...props}
    />
  );
}
