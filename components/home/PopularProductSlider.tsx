'use client';

import React from 'react';
import { UnifiedProduct } from '@/data/products';
import PopularProductCard from './PopularProductCard';

interface PopularProductSliderProps {
  products: UnifiedProduct[];
}

export default function PopularProductSlider({ products }: PopularProductSliderProps) {
  const duplicatedProducts = [...products, ...products, ...products];

  return (
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
  );
}
