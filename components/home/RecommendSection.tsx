'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { mainProducts } from '@/data/home-data';

export default function RecommendSection() {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-5xl px-4 md:px-12">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">이 달의 추천 상품</h2>
          <p className="text-gray-600">지금 가장 반응 좋은 상품만 엄선했어요</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {mainProducts.map((product) => (
            <Link key={product.id} href={product.path} className="group">
              <div className="rounded-xl border border-gray-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
                {/* 상품 헤더 */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={product.logo}
                      alt={product.company}
                      width={48}
                      height={48}
                      className="h-12 w-12 object-contain"
                    />
                    <div>
                      <p className="text-sm text-gray-500">{product.company}</p>
                      <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-400">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  {product.badge && (
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        product.badge === 'BEST'
                          ? 'bg-yellow-100 text-yellow-800'
                          : product.badge === 'NEW'
                            ? 'bg-green-100 text-green-800'
                            : product.badge === 'HOT'
                              ? 'bg-red-100 text-red-800'
                              : product.badge === 'TOP'
                                ? 'bg-[#00529b]/10 text-[#00529b]'
                                : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* 상품 정보 */}
                <div className="mb-4">
                  <h3 className="mb-2 text-lg font-bold leading-tight text-gray-900">
                    {product.name}
                  </h3>
                  <p className="mb-3 text-sm leading-relaxed text-gray-600">
                    {product.description}
                    {product.descriptionNote && (
                      <span className="ml-1 text-xs text-gray-400">{product.descriptionNote}</span>
                    )}
                  </p>
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      className={`rounded px-2 py-1 text-xs font-medium ${
                        product.id === 'kb-triple-level-up'
                          ? 'bg-yellow-50 text-yellow-600'
                          : product.id === 'kdb-happy-plus'
                            ? 'bg-green-50 text-green-600'
                            : product.id === 'kdb-happy-dream'
                              ? 'bg-purple-50 text-purple-600'
                              : product.id === 'ibk-lifetime'
                                ? 'bg-orange-50 text-orange-600'
                                : product.id === 'hana-hanaro'
                                  ? 'bg-teal-50 text-teal-600'
                                  : product.id === 'metlife-usd'
                                    ? 'bg-[#00529b]/10 text-[#00529b]'
                                    : 'bg-red-50 text-red-600'
                      }`}
                    >
                      {product.highlight}
                    </span>
                  </div>
                </div>

                {/* 자세히 보기 버튼 */}
                <div className="flex justify-end">
                  <div className="flex items-center text-sm font-medium text-gray-600 transition-colors duration-200 group-hover:text-gray-800">
                    자세히 보기
                    <ArrowRightIcon className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
