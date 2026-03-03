import React, { ReactNode } from 'react';

interface ModalScrollBodyProps {
  children: ReactNode;
  className?: string;
  maxHeight?: string;
}

interface StepSectionProps {
  title: ReactNode;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
}

interface PreviewCardProps {
  icon?: ReactNode;
  title: ReactNode;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  titleClassName?: string;
  hintClassName?: string;
}

export function ModalScrollBody({ children, className = '', maxHeight }: ModalScrollBodyProps) {
  return (
    <div className={className} style={maxHeight ? { maxHeight } : undefined}>
      {children}
    </div>
  );
}

export function StepSection({
  title,
  children,
  className = '',
  titleClassName = 'text-lg font-bold text-text-primary',
}: StepSectionProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className={titleClassName}>{title}</div>
      {children}
    </div>
  );
}

export function PreviewCard({
  icon,
  title,
  hint,
  children,
  className = '',
  headerClassName = 'mb-2 flex items-center gap-2',
  bodyClassName = 'space-y-1',
  titleClassName = 'font-semibold text-text-primary',
  hintClassName = 'mt-3 text-sm text-text-secondary',
}: PreviewCardProps) {
  return (
    <div className={`rounded-lg bg-brand-primary/10 p-4 ${className}`}>
      <div className={headerClassName}>
        {icon}
        <span className={titleClassName}>{title}</span>
      </div>
      <div className={bodyClassName}>{children}</div>
      {hint && <p className={hintClassName}>{hint}</p>}
    </div>
  );
}
