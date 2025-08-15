"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon, StarIcon, ShieldCheckIcon, HeartIcon, UserIcon } from "@heroicons/react/24/outline";

// 종신보험 상품 데이터
const wholeLifeProducts = [
  {
    id: 'shinhan-more-dream',
    name: '신한 더더림 종신보험',
    company: '신한생명',
    logo: '/shinhan-life-logo.png',
    path: '/insurance/whole-life/shinhan/more-the-dream',
    description: '평생 보장과 사망보험금을 한번에',
    features: [
      '평생 보장',
      '사망보험금',
      '해지환급금',
      '다양한 특약'
    ],
    rating: 4.6,
    reviewCount: 89,
    badge: 'TOP',
    price: '월 8만원부터',
    category: '종신보험'
  }
];

// 종신보험 특징
const wholeLifeFeatures = [
  {
    icon: <ShieldCheckIcon className="w-8 h-8 text-green-600" />,
    title: '평생 보장',
    description: '가입 후 평생 동안 보장을 받을 수 있습니다.'
  },
  {
    icon: <HeartIcon className="w-8 h-8 text-red-600" />,
    title: '가족 보장',
    description: '사망 시 가족에게 안전한 미래를 제공합니다.'
  },
  {
    icon: <UserIcon className="w-8 h-8 text-blue-600" />,
    title: '자산 형성',
    description: '장기적으로 안정적인 자산을 형성할 수 있습니다.'
  }
];

export default function WholeLifePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Link href="/" className="flex items-center text-gray-600 hover:text-green-600">
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              메인으로 돌아가기
            </Link>
            <div className="ml-8">
              <Image 
                src="/bohumstore-logo.png" 
                alt="보험스토어" 
                width={150} 
                height={40} 
                className="h-8 w-auto"
              />
            </div>
          </div>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            종신보험
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100">
            평생 보장과 가족을 위한 안전한 미래를 준비하세요
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-green-500 px-4 py-2 rounded-full text-sm">종신보험</span>
            <span className="bg-green-500 px-4 py-2 rounded-full text-sm">사망보장</span>
            <span className="bg-green-500 px-4 py-2 rounded-full text-sm">가족보장</span>
            <span className="bg-green-500 px-4 py-2 rounded-full text-sm">자산형성</span>
          </div>
        </div>
      </section>

      {/* 종신보험 특징 섹션 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            종신보험의 특징
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {wholeLifeFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 종신보험 상품 리스트 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            추천 종신보험 상품
          </h2>
          <div className="space-y-6">
            {wholeLifeProducts.map((product) => (
              <Link key={product.id} href={product.path} className="block">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-green-300">
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* 상품 로고 및 기본 정보 */}
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
                            <p className="text-lg text-gray-600 mb-3">{product.company}</p>
                            <p className="text-gray-700 mb-4">{product.description}</p>
                            
                            {/* 특징 리스트 */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                              {product.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                  {feature}
                                </div>
                              ))}
                            </div>
                            
                            {/* 카테고리 및 가격 */}
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                                {product.category}
                              </span>
                              <span className="text-gray-600">
                                {product.price}
                              </span>
                            </div>
                          </div>
                          
                          {/* 평점 및 버튼 */}
                          <div className="flex flex-col items-end gap-4">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1 text-yellow-500">
                                <StarIcon className="w-5 h-5 fill-current" />
                                <span className="font-medium">{product.rating}</span>
                              </div>
                              <span className="text-gray-500 text-sm">({product.reviewCount})</span>
                            </div>
                            
                            <div className="flex items-center text-green-600 font-medium group-hover:text-green-700">
                              상품 자세히 보기
                              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 종신보험 가이드 섹션 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            종신보험 가이드
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">종신보험 가입 시 고려사항</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>보험료 납입 기간과 보장 금액</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>사망보험금과 특약 보장</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>해지환급금과 중도해지</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>가족 구성원과 보장 필요성</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">종신보험의 장점</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>평생 보장으로 안심</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>가족을 위한 안전한 미래</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>장기적인 자산 형성</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>세제 혜택</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            &copy; 2024 보험스토어. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
