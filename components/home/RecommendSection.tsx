"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { mainProducts } from "@/data/home-data";

export default function RecommendSection() {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-5xl mx-auto px-4 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">이 달의 추천 상품</h2>
          <p className="text-gray-600">지금 가장 반응 좋은 상품만 엄선했어요</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mainProducts.map((product) => (
            <Link key={product.id} href={product.path} className="group">
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all hover:-translate-y-1 hover:border-blue-200">
                {/* 상품 헤더 */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Image 
                      src={product.logo} 
                      alt={product.company} 
                      width={48} 
                      height={48} 
                      className="w-12 h-12 object-contain"
                    />
                    <div>
                      <p className="text-sm text-gray-500">{product.company}</p>
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  {product.badge && (
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      product.badge === 'BEST' ? 'bg-yellow-100 text-yellow-800' :
                      product.badge === 'NEW' ? 'bg-green-100 text-green-800' :
                      product.badge === 'HOT' ? 'bg-red-100 text-red-800' :
                      product.badge === 'TOP' ? 'bg-[#00529b]/10 text-[#00529b]' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {product.badge}
                    </span>
                  )}
                </div>
                
                {/* 상품 정보 */}
                <div className="mb-4">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg leading-tight">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                    {product.description}
                    {product.descriptionNote && (
                      <span className="text-xs text-gray-400 ml-1">{product.descriptionNote}</span>
                    )}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      product.id === 'kb-triple-level-up' ? 'text-yellow-600 bg-yellow-50' :
                      product.id === 'kdb-happy-plus' ? 'text-green-600 bg-green-50' :
                      product.id === 'kdb-happy-dream' ? 'text-purple-600 bg-purple-50' :
                      product.id === 'ibk-lifetime' ? 'text-orange-600 bg-orange-50' :
                      product.id === 'hana-hanaro' ? 'text-teal-600 bg-teal-50' :
                      product.id === 'metlife-usd' ? 'text-[#00529b] bg-[#00529b]/10' :
                      'text-red-600 bg-red-50'
                    }`}>
                      {product.highlight}
                    </span>
                  </div>
                </div>
                
                {/* 자세히 보기 버튼 */}
                <div className="flex justify-end">
                  <div className="flex items-center text-gray-600 text-sm font-medium group-hover:text-gray-800 transition-colors duration-200">
                    자세히 보기
                    <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
