import React, { forwardRef } from 'react';

export interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ className = '', error, children, ...props }, ref) => {
    return (
      <div className={`relative inline-block w-[140px] ${className}`}>
        <select
          ref={ref}
          className={`h-[36px] w-full appearance-none rounded-[4px] border-[0.5px] border-[#E5E7EB] bg-white pl-3 pr-8 text-[14px] font-normal leading-normal text-[#6B7280] outline-none transition-colors focus:border-border-focus ${
            error ? 'border-status-red focus:border-status-red' : ''
          }`}
          {...props}
        >
          {children}
        </select>
        {/* Custom Dropdown Icon (Triangle Fill) */}
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1.5 3L8.5 3L5 8L1.5 3Z" />
          </svg>
        </div>
      </div>
    );
  }
);

SelectField.displayName = 'SelectField';

export default SelectField;
