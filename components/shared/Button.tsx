'use client';

import React, { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'full';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  text?: string;
  children?: ReactNode;
  asChild?: boolean; // For future implementation if needed
}

export default function Button({
  className = '',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  text,
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex flex-shrink-0 items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50';

  const variantClasses = {
    // Large Chip / Primary Action
    primary: 'bg-[#2F6BFF] text-[#E5E7EB] hover:bg-[#2559d6] active:scale-[0.98]',
    // Small Chip / Secondary Action
    secondary:
      'bg-[#1F6FEB] border-[0.5px] border-[#2F6BFF] text-[#E5E7EB] hover:bg-[#165edb] active:scale-[0.98]',
    // Outline / Consultant style
    outline:
      'bg-white border border-border-default text-text-primary hover:bg-page-bg active:scale-[0.98]',
    // Ghost
    ghost: 'hover:bg-page-bg text-text-primary',
  };

  const sizeClasses = {
    // Small Chip: H 36px, min W 120px, text 14px reg
    sm: 'h-[36px] min-w-[120px] rounded-[4px] text-[14px] font-normal px-4',
    // Medium
    md: 'h-[42px] px-6 rounded-md text-[15px] font-bold',
    // Large Header/Hero
    lg: 'h-[48px] px-8 rounded-lg text-[16px] font-bold',
    // Large Chip (Full Width default max 500): H 40px, text 16px bold
    full: 'h-[40px] rounded-[4px] text-[16px] font-bold w-full max-w-[500px]',
  };

  const containerWidthClass = fullWidth ? '!w-full !max-w-none' : '';

  const displayContent = children || text;

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${containerWidthClass} ${className}`}
      {...props}
    >
      {displayContent}
    </button>
  );
}
