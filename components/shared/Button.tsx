'use client';

import React from 'react';

interface ButtonProps {
  className?: string;
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  className = '',
  text,
  onClick,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center justify-center rounded-[6px] bg-brand-primary px-[16.5px] py-[9.5px] shadow-[0_4px_12px_rgba(31,111,235,0.25)] transition-all hover:bg-brand-primary-hover hover:shadow-[0_6px_16px_rgba(31,111,235,0.35)] ${className}`}
    >
      <span className="body-xl text-white">
        {text}
      </span>
    </button>
  );
}
