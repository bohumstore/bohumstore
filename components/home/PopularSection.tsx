'use client';

import React from 'react';
import { getMainPageProducts } from '@/data/products';
import PopularProductCard from './PopularProductCard';

export default function PopularSection() {
  const unifiedProducts = getMainPageProducts();
  const duplicatedProducts = [...unifiedProducts, ...unifiedProducts, ...unifiedProducts];

  return (
    <div className="w-full pt-10 pb-5">
      <div className="flex flex-col items-center justify-center mb-6 gap-2">
        <div className="body-xl text-text-muted">지금 가장 많이 클릭한 보험만 모아봤어요.</div>
        <div className="heading-1 text-text-primary">이 달의 인기 상품</div>
      </div>
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
