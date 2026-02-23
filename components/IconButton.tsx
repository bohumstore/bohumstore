import React from 'react';

type IconButtonVariant = 'primary' | 'kakao';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: IconButtonVariant;
  size?: 's' | 'm';
  children: React.ReactNode;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant, size = 's', children, className = '', ...props }, ref) => {
    const isPrimary = variant === 'primary';

    const sizeStyle = size === 'm' ? 'h-[44px] min-w-[134px] text-[15px]' : 'h-[36px] min-w-[134px] text-[14px]';
    const baseStyle = `inline-flex items-center justify-center gap-[4px] rounded-[4px] ${sizeStyle} font-bold transition-opacity hover:opacity-90 flex-shrink-0`;
    const variantStyle = isPrimary
      ? 'bg-[#2F6BFF] text-[#FFFFFF]' // primary (상담신청)
      : 'bg-[#FEE500] text-[#111827]'; // kakao (채팅상담)

    const icon = isPrimary ? (
      <img
        src="/svgs/slogan/slogan-counsel-apply.svg"
        alt="상담 신청 아이콘"
        className="w-[16px] h-[16px] object-contain"
      />
    ) : (
      <img
        src="/svgs/slogan/slogan-counsel-kakaotalk.svg"
        alt="채팅 상담 아이콘"
        className="w-[16px] h-[14px] object-contain"
      />
    );

    return (
      <button
        ref={ref}
        className={`${baseStyle} ${variantStyle} ${className}`}
        {...props}
      >
        {icon}
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
