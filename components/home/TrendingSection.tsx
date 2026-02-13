'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

// 슬라이더 데이터 타입 정의
interface FeaturedProduct {
  id: string;
  badge: string;
  marketingText: string;
  title: string;
  features: string[];
  image: string;
  path: string;
}

// 목 데이터 (추후 실제 데이터로 교체 가능)
const featuredProducts: FeaturedProduct[] = [
  {
    id: 'kb-triple',
    badge: 'NEW',
    marketingText: '트리플 레벨업 보증으로 7년/10년/연금 개시시점 적립액 보증',
    title: 'KB 트리플 레벨업 연금보험 무배당(보증형)',
    features: [
      '가입 0~70세 | 연금개시시점 45~85세',
      '비과세 (월 150만원 한도, 10년 유지 세법 충족 시)',
      '병력 무심사/전건 가입가능',
    ],
    image: '/svgs/kb-triple-main-slider.svg',
    path: '/insurance/annuity/kb/triple-level-up',
  },
  {
    id: 'kb-triple-2', // 슬라이더 동작 확인을 위한 더미 데이터 1
    badge: 'BEST',
    marketingText: '안정적인 수익률과 비과세 혜택을 동시에',
    title: 'KB 알뜰 연금보험 무배당',
    features: [
      '가입 0~80세 누구나 가능',
      '최저보증이율 적용으로 안전성 확보',
      '자유로운 추가납입 및 중도인출',
    ],
    image: '/svgs/kb-triple-main-slider.svg',
    path: '/insurance/annuity/kb/triple-level-up',
  },
   {
    id: 'kb-triple-3', // 슬라이더 동작 확인을 위한 더미 데이터 2
    badge: 'HOT',
    marketingText: '노후 준비를 위한 최고의 선택',
    title: 'KB 평생 든든 연금보험',
    features: [
      '평생토록 연금 수령 가능',
      '업계 최고 수준 환급률',
      '건강검진 없이 간편 가입',
    ],
    image: '/svgs/kb-triple-main-slider.svg',
    path: '/insurance/annuity/kb/triple-level-up',
  },
];

export default function TrendingSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 자동 슬라이드 기능
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 5000); // 5초마다 전환

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center max-w-[800px] pt-10 pb-5">
      {/* 섹션 헤더 */}
      <div className="flex flex-col items-center justify-center mb-8 gap-2">
        <div className="action-l text-[20px] text-text-muted">보장과 보험료 균형이 좋아 요즘 가장 주목받는 보험이에요.</div>
        <div className="heading-hero text-text-primary">요즘 뜨는 보험</div>
      </div>

      {/* 슬라이더 컨테이너 */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {featuredProducts.map((product) => (
            <div key={product.id} className="min-w-full">
              <Link href={product.path} className="flex w-[800px] bg-white rounded-lg border border-border-default shadow-sm p-10 flex-row items-center gap-12 relative overflow-hidden transition-all hover:shadow-md cursor-pointer">
                <div className="absolute top-0 left-0">
                  <span className="bg-brand-primary text-white heading-h5 px-2 py-1 rounded-br-lg">
                    {product.badge}
                  </span>
                </div>
                <div className="relative flex-shrink-0 w-[160px] h-[160px]">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                  />
                </div>

                <div className="flex flex-col items-start text-left w-full">
                  <div className="text-brand-primary heading-h2 mb-2">
                    {product.marketingText}
                  </div>
                  <h3 className="heading-h1 text-3xl text-text-primary mb-7">
                    {product.title}
                  </h3>
                  <div className="flex flex-col gap-1">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircleIcon className="w-6 h-6 text-brand-primary flex-shrink-0" />
                        <span className="text-text-primary body-l">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center gap-2 mt-4">
          {featuredProducts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'w-8 bg-[#3B82F6]' : 'w-2 bg-gray-300'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
