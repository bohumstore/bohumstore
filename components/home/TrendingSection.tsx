'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useResponsive } from '@/hooks/useResponsive';

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
    id: 'ibk-lifetime',
    badge: 'BEST',
    marketingText: '평생 보증받는 변액연금! 실적배당으로 수익, 보증으로 안심',
    title: 'IBK 평생보증받는 변액연금보험',
    features: [
      '가입 0~75세 | 연금개시 55~85세',
      '평생 연금 수령 보증',
      '실적배당형 + 최저연금 적립액 보증',
    ],
    image: '/svgs/slogan/main/slogan-sun-sofa.svg',
    path: '/insurance/annuity/ibk/lifetime',
  },
  {
    id: 'metlife-usd',
    badge: 'HOT',
    marketingText: '달러 vs 원화, 골라 받으세요!',
    title: '(무)백만인을위한달러종신보험Plus',
    features: [
      '달러·원화 통화 선택 수령',
      '10년+1일 환급률 124.9% (40세 남 기준)',
      '환전수수료 최저 1$당 2원',
    ],
    image: '/svgs/slogan/main/slogan-currency-cycle.svg',
    path: '/insurance/whole-life/metlife/usd',
  },
];

export default function TrendingSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isMobile } = useResponsive();

  // 자동 슬라이드 기능
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 5000); // 5초마다 전환

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`flex flex-col items-center pt-10 pb-5 ${isMobile ? 'w-full px-6' : 'max-w-[800px]'}`}>
      {/* 섹션 헤더 */}
      <div className={`flex flex-col items-center justify-center mb-8 gap-2 ${isMobile ? 'text-center' : ''}`}>
        <div className={`text-text-muted ${isMobile ? 'body-m' : 'body-xl'}`}>보장과 보험료 균형이 좋아 요즘 가장 주목받는 보험이에요.</div>
        <div className={`text-text-primary ${isMobile ? 'heading-3' : 'heading-1'}`}>요즘 뜨는 보험</div>
      </div>

      {/* 슬라이더 컨테이너 */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {featuredProducts.map((product) => (
            <div key={product.id} className="min-w-full">
              <Link
                href={product.path}
                className={`flex bg-white rounded-lg border border-border-default shadow-sm relative overflow-hidden transition-all hover:shadow-md cursor-pointer ${
                  isMobile
                    ? 'flex-col w-full p-5 gap-4'
                    : 'flex-row w-[800px] p-10 items-center gap-12'
                }`}
              >
                <div className="absolute top-0 left-0">
                  <span className="bg-brand-primary text-white button-s px-2 py-1 rounded-br-lg">
                    {product.badge}
                  </span>
                </div>
                <div className={`relative flex-shrink-0 ${isMobile ? 'w-[100px] h-[100px] mx-auto mt-4' : 'w-[160px] h-[160px]'}`}>
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                  />
                </div>

                <div className="flex flex-col items-start text-left w-full">
                  <div className={`text-brand-primary heading-5 mb-2 ${isMobile ? 'text-xs' : ''}`}>
                    {product.marketingText}
                  </div>
                  <h3 className={`heading-2 text-text-primary ${isMobile ? 'mb-3 text-base' : 'mb-7'}`}>
                    {product.title}
                  </h3>
                  <div className="flex flex-col gap-1">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircleIcon className={`text-brand-primary flex-shrink-0 ${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
                        <span className={`text-text-primary ${isMobile ? 'body-s' : 'body-l'}`}>{feature}</span>
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
