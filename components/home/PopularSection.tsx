'use client';

import React from 'react';
import { getMainPageProducts } from '@/data/products';
import PopularProductCard from './PopularProductCard';
import { useResponsive } from '@/hooks/useResponsive';

export default function PopularSection() {
  const unifiedProducts = getMainPageProducts();
  const duplicatedProducts = [...unifiedProducts, ...unifiedProducts, ...unifiedProducts];
  const { isMobile } = useResponsive();

  return (
    <div className="w-full pt-10 pb-5">
      <div className={`flex flex-col items-center justify-center mb-6 gap-2 ${isMobile ? 'px-6' : ''}`}>
        <div className={`text-text-muted ${isMobile ? 'body-m text-center' : 'body-xl'}`}>지금 가장 많이 클릭한 보험만 모아봤어요.</div>
        <div className={`text-text-primary ${isMobile ? 'heading-3' : 'heading-1'}`}>이 달의 인기 상품</div>
      </div>

      {/* 모바일/데스크탑 모두 동일한 마키(무한 롤링) */}
      <div className="relative w-full overflow-hidden bg-transparent">
        <style jsx global>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.33%);
            }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
        <div className="flex w-max animate-marquee gap-4 py-4">
          {duplicatedProducts.map((product, idx) => (
            <PopularProductCard key={`${product.id}-${idx}`} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
