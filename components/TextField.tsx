import React, { forwardRef } from 'react';

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className = '', error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-[193px] h-[30px] rounded-[4px] border-[0.5px] border-[#E5E7EB] bg-white px-3 text-[#6B7280] text-[14px] font-normal leading-normal outline-none transition-colors placeholder:text-[#6B7280] focus:border-border-focus ${
          error ? 'border-status-red focus:border-status-red' : ''
        } ${className}`}
        {...props}
      />
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
