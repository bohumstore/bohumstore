import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, StarIcon } from "@heroicons/react/24/outline";
import { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
  /** 테마 컬러 (border hover, dot 색상 등) */
  accentColor?: string;
  /** 추가 className */
  className?: string;
}

/**
 * 상품 카드 (카테고리 리스트에서 사용)
 * - 기존 annuity/page.tsx, whole-life/page.tsx에서 반복되던 상품 카드를 공통화
 * - 디자인: 기존 코드 그대로 유지
 */
export default function ProductCard({
  product,
  accentColor = "blue",
  className = "",
}: ProductCardProps) {
  return (
    <Link href={product.path} className={`block ${className}`}>
      <div
        className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-${accentColor}-300`}
      >
        <div className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* 상품 로고 */}
            <div className="flex-shrink-0">
              <Image
                src={product.logo}
                alt={product.company}
                width={80}
                height={80}
                className="w-20 h-20 object-contain"
              />
            </div>

            {/* 상품 상세 정보 */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {product.name}
                    </h3>
                    {product.badge && (
                      <span className="px-3 py-1 text-sm font-bold text-white bg-red-500 rounded-full">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-lg text-gray-600 mb-3">
                    {product.company}
                  </p>
                  <p className="text-gray-700 mb-4">{product.description}</p>

                  {/* 특징 리스트 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {product.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <div
                          className={`w-1.5 h-1.5 bg-${accentColor}-500 rounded-full`}
                        />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* 카테고리 및 가격 */}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span
                      className={`px-3 py-1 bg-${accentColor}-100 text-${accentColor}-800 rounded-full font-medium`}
                    >
                      {product.category}
                    </span>
                    {product.price && (
                      <span className="text-gray-600">{product.price}</span>
                    )}
                  </div>
                </div>

                {/* 평점 및 버튼 */}
                <div className="flex flex-col items-end gap-4">
                  {product.rating && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <StarIcon className="w-5 h-5 fill-current" />
                        <span className="font-medium">{product.rating}</span>
                      </div>
                      {product.reviewCount && (
                        <span className="text-gray-500 text-sm">
                          ({product.reviewCount})
                        </span>
                      )}
                    </div>
                  )}

                  <div
                    className={`flex items-center text-${accentColor}-600 font-medium`}
                  >
                    상품 자세히 보기
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
