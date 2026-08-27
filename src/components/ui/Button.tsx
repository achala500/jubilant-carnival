import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', fullWidth, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none break-words whitespace-normal break-words truncate',
          {
            'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm focus-visible:ring-blue-600':
              variant === 'primary',
            'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 focus-visible:ring-gray-500':
              variant === 'secondary',
            'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-600':
              variant === 'danger',
            'border-2 border-gray-200 bg-transparent hover:border-gray-300 hover:bg-gray-50 text-gray-900':
              variant === 'outline',
            'hover:bg-gray-100 text-gray-700': variant === 'ghost',

            // Sizes ensuring min 44px-48px height for ergonomics
            'min-h-[48px] px-6 py-3': size === 'default',
            'min-h-[44px] px-4 py-2 text-sm': size === 'sm',
            'min-h-[56px] px-8 py-4 text-lg': size === 'lg',
            'min-h-[48px] min-w-[48px] w-12 h-12 p-0': size === 'icon',

            'w-full': fullWidth,
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
