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

/**
 * [추가] 모달 각 단계의 헤더 (타이틀 + 설명)
 */
interface StepHeaderProps {
  title: string;
  description?: string;
  className?: string;
}
export function StepHeader({ title, description, className = 'mb-5' }: StepHeaderProps) {
  return (
    <div className={className}>
      <h2 className="heading-4 text-text-primary">{title}</h2>
      {description && <p className="body-l text-text-muted mt-1">{description}</p>}
    </div>
  );
}

/**
 * [추가] 결과/미리보기 리스트 아이템
 */
interface InfoItemProps {
  label: string;
  value: string;
  color?: string;
  blur?: boolean;
  className?: string;
}
export function InfoItem({ label, value, color = 'text-brand-primary', blur = false, className = '' }: InfoItemProps) {
  return (
    <div className={`flex justify-between items-center bg-white border border-border-default rounded-lg p-3 body-m ${className}`}>
      <span className="text-text-secondary font-medium flex items-center shrink-0 mr-2">
        <span className="text-brand-primary mr-1.5">▸</span>{label}
      </span>
      <span className={`font-bold ${color} ${blur ? 'blur-sm select-none' : ''}`}>
        {value}
      </span>
    </div>
  );
}
