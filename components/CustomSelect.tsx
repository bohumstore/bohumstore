import React, { useState, useRef } from 'react';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

export interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface CustomSelectProps {
  value: string;
  onChange: (_value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = '선택',
  className = '',
  disabled = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useOnClickOutside(containerRef, () => setIsOpen(false));

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md border border-border-default bg-white px-3 py-2.5 text-left body-m outline-none transition-colors hover:border-border-focus focus:border-border-focus focus:ring-1 focus:ring-brand-primary disabled:hover:border-border-default"
      >
        <span className={selectedOption ? 'text-text-primary' : 'text-text-muted'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`h-4 w-4 text-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[calc(100%)] z-50 w-full overflow-hidden rounded-md border border-border-default bg-white shadow-lg">
          <ul className="max-h-60 overflow-y-auto overscroll-contain py-1">
            {options.map((opt) => {
              const isSelected = opt.value === value;
              const isOptDisabled = opt.disabled;
              return (
                <li
                  key={opt.value}
                  onClick={() => {
                    if (isOptDisabled) return;
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 body-m transition-colors ${
                    isOptDisabled
                      ? 'text-text-muted bg-white cursor-not-allowed'
                      : isSelected
                      ? 'bg-brand-primary-soft text-text-primary font-medium cursor-pointer'
                      : 'text-text-secondary hover:bg-bg-blue hover:text-text-primary cursor-pointer'
                  }`}
                >
                  {opt.label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
