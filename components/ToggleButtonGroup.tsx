import React from 'react';

export interface ToggleOption {
  label: string;
  value: string;
}

export interface ToggleButtonGroupProps {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  size?: 's' | 'm';
}

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({ options, value, onChange, className = '', size = 'm' }) => {
  const heightClass = size === 's' ? 'h-[30px]' : 'h-[40px]';
  const textClass = size === 's' ? 'text-[14px]' : 'text-[15px]';

  return (
    <div className={`flex gap-2 ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`flex ${heightClass} flex-1 items-center justify-center rounded-[8px] ${textClass} font-medium transition-colors ${
            value === option.value
              ? 'bg-[#2F6BFF] text-white'
              : 'bg-[#E2E8F0] text-[#1E293B] hover:bg-[#CBD5E1]'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ToggleButtonGroup;
