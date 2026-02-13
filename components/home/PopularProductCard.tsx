'use client';

import { UnifiedProduct } from '@/data/products';
import Link from 'next/link';

interface PopularProductCardProps {
  product: UnifiedProduct;
}

export default function PopularProductCard({ product }: PopularProductCardProps) {
  let categoryName = '기타보험';
  let badgeColorClass = 'bg-card-service text-text-muted';

  if (product.category === 'annuity') {
    if (product.name.includes('변액')) {
      categoryName = '변액연금';
      badgeColorClass = 'bg-category-variable text-text-inverse';
    } else {
      categoryName = '연금보험';
      badgeColorClass = 'bg-brand-primary text-text-inverse';
    }
  } else if (product.category === 'whole-life') {
    categoryName = '종신보험';
    badgeColorClass = 'bg-category-purple text-text-inverse';
  } else if (product.category === 'health' || product.id === 'health') {
    categoryName = '건강보험';
    badgeColorClass = 'bg-category-life text-text-inverse';
  }
  const title = product.slogan?.title || product.mainPage?.highlight || product.name;
  const subtitle = product.slogan?.subtitle || product.mainPage?.description || '';

  return (
    <Link 
      href={product.path}
      className="flex w-[250px] flex-col rounded-l border border-border-default bg-background shadow-sm transition-transform hover:translate-y-1 hover:shadow-md cursor-pointer"
    >
      {/* Top Section */}
      <div className="flex h-[166px] flex-col bg-brand-primary-soft p-4">
        <div className={`flex w-[58px] rounded-tl-[6px] rounded-br-[6px] px-2 py-1 heading-h5 mb-1.5 ${badgeColorClass}`}>
          {categoryName}
        </div>
        <div className="heading-h3 text-text-primary mb-2.5">{title}</div>
        <p className="body-s text-text-primary underline decoration-text-muted/40 underline-offset-2">
          {subtitle}
        </p>
      </div>

      {/* Bottom Section */}
      <div className="flex h-[74px] flex-col justify-center bg-background px-4">
        <div className="heading-h4 text-text-primary">{product.company}</div>
        <div className="body-m text-text-primary">
          {product.name}
        </div>
      </div>
    </Link>
  );
}
