import React, { ReactNode } from 'react';

interface TabContentWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function TabContentWrapper({
  children,
  className = '',
}: TabContentWrapperProps) {
  return (
    <div className={`space-y-8 px-2 py-4 sm:px-4 md:px-8 md:py-6 ${className}`}>
      {children}
    </div>
  );
}
