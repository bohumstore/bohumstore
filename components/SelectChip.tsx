import React from 'react';

export interface SelectChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: React.ReactNode;
}

const SelectChip = React.forwardRef<HTMLButtonElement, SelectChipProps>(
  ({ active = false, children, className = '', ...props }, ref) => {
    // 활성화 상태: Bg #2F6BFF, Text #FFFFFF
    // 비활성화 상태: Bg #F3F4F6, Text #6B7280
    const activeStyle = active
      ? 'bg-[#2F6BFF] text-[#FFFFFF]'
      : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]';

    return (
      <button
        ref={ref}
        type="button"
        className={`inline-flex h-[30px] w-[45px] items-center justify-center rounded-[4px] text-[12px] font-normal leading-none transition-colors ${activeStyle} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

SelectChip.displayName = 'SelectChip';

export default SelectChip;
