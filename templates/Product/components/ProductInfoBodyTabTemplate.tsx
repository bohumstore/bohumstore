import React, { ReactNode } from 'react';
import TabContentWrapper from '@/components/shared/TabContentWrapper';

interface ProductInfoBodyTabTemplateProps {
  children: ReactNode;
  title?: ReactNode;
  titleClassName?: string;
  className?: string;
}

export default function ProductInfoBodyTabTemplate({
  children,
  title,
  titleClassName = 'product-page-title',
  className,
}: ProductInfoBodyTabTemplateProps) {
  return (
    <TabContentWrapper className={className}>
      {title ? <h2 className={titleClassName}>{title}</h2> : null}
      {children}
    </TabContentWrapper>
  );
}
