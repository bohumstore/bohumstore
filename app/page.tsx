"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, ChevronLeftIcon, ShieldCheckIcon, CurrencyDollarIcon, ChartBarIcon } from "@heroicons/react/24/outline";

// CSS 애니메이션 스타일
const animationStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideInLeft {
    from { 
      opacity: 0; 
      transform: translateX(-30px); 
    }
    to { 
      opacity: 1; 
      transform: translateX(0); 
    }
  }
  
  @keyframes slideInUp {
    from { 
      opacity: 0; 
      transform: translateY(20px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  
  .animate-fade-in {
    animation: fadeIn 0.8s ease-out forwards;
  }
  
  .animate-slide-in-left {
    animation: slideInLeft 0.8s ease-out forwards;
  }
  
  .animate-slide-in-up {
    animation: slideInUp 0.6s ease-out forwards;
  }
`;

// 슬로건 데이터
const slogans = [
  {
    id: 'kdb-happy-plus',
    title: '안정적인 노후 준비',
    subtitle: '연단리 7% 보증으로 확실한 보장',
    description: 'KDB 행복플러스 연금보험으로 안전하고 안정적인 노후를 준비하세요.',
    path: '/insurance/annuity/kdb/happy-plus',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    features: [
      '연단리 7% 보증으로 안정적인 수익',
      '보증형 연금으로 확실한 보장',
      '노후 준비를 위한 최적의 선택',
      'KDB생명의 신뢰할 수 있는 상품'
    ],
    company: 'KDB생명',
    logo: '/kdb-logo.png'
  },
  {
    id: 'kdb-happy-dream',
    title: '투자형 연금의 장점',
    subtitle: '연단리 7% 보증으로 성장과 안정',
    description: 'KDB 행복드림 변액연금보험으로 높은 수익과 안정성을 동시에 누리세요.',
    path: '/insurance/annuity/kdb/happy-dream',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    features: [
      '연단리 7% 보증으로 기본 안정성 확보',
      '변액형 연금으로 높은 수익 기대',
      '투자와 보장의 균형',
      '유연한 연금 수령 방식'
    ],
    company: 'KDB생명',
    logo: '/kdb-logo.png'
  },
  {
    id: 'ibk-lifetime',
    title: '평생 연금 보장',
    subtitle: '연단리 8% 보증으로 끝없는 보장',
    description: 'IBK 평생연금받는 변액연금보험으로 평생 동안 안정적인 연금을 받으세요.',
    path: '/insurance/annuity/ibk/lifetime',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    features: [
      '연단리 8% 보증으로 높은 보장',
      '평생 연금으로 지속적인 수입',
      '변액형 연금의 수익성',
      'IBK연금보험의 전문성'
    ],
    company: 'IBK연금보험',
    logo: '/IBK-logo.png'
  },
  {
    id: 'shinhan-more-the-dream',
    title: '단기납 완료 후 높은 환급률',
    subtitle: '10년시점 122.7%로 빠른 완납',
    description: '신한 모아더드림 Plus 종신보험으로 짧은 기간에 높은 보장을 받으세요.',
    path: '/insurance/whole-life/shinhan/more-the-dream',
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    features: [
      '10년시점 122.7% 환급률',
      '15~70세 전연령 가입 가능',
      '단기납으로 빠른 완납',
      '종신보장으로 평생 보호'
    ],
    company: '신한라이프',
    logo: '/shinhan-life-logo.png'
  }
];

// 메인 상품 데이터
const mainProducts = [
  {
    id: 'kdb-happy-plus',
    name: 'KDB 행복플러스 연금보험(보증형)',
    company: 'KDB생명',
    logo: '/kdb-logo.png',
    path: '/insurance/annuity/kdb/happy-plus',
    description: '연단리 7% 보증으로 안정적인 노후 준비',
    badge: 'BEST',
    category: '연금보험',
    highlight: '연단리 7% 보증'
  },
  {
    id: 'kdb-happy-dream',
    name: 'KDB 행복드림 변액연금보험',
    company: 'KDB생명',
    logo: '/kdb-logo.png',
    path: '/insurance/annuity/kdb/happy-dream',
    description: '연단리 7% 보증으로 안정성과 수익성 동시 확보',
    badge: 'NEW',
    category: '변액연금',
    highlight: '연단리 7% 보증'
  },
  {
    id: 'ibk-lifetime',
    name: 'IBK 평생연금받는 변액연금보험',
    company: 'IBK연금보험',
    logo: '/IBK-logo.png',
    path: '/insurance/annuity/ibk/lifetime',
    description: '연단리 8% 보증으로 평생 연금 보장',
    badge: 'HOT',
    category: '변액연금',
    highlight: '연단리 8% 보증'
  },
  {
    id: 'shinhan-more-the-dream',
    name: '신한 모아더드림 Plus 종신보험',
    company: '신한라이프',
    logo: '/shinhan-life-logo.png',
    path: '/insurance/whole-life/shinhan/more-the-dream',
    description: '15~70세 전연령 10년시점 122.7%로 단기납 완료 후 높은 환급률',
    badge: '추천',
    category: '종신보험',
    highlight: '10년시점 122.7%'
  }
];

// 보험 특징
const insuranceFeatures = [
  {
    icon: <ShieldCheckIcon className="w-6 h-6 text-blue-600" />,
    title: '안전한 보장',
    description: '신뢰할 수 있는 보험사와 함께 안전한 보장을 제공합니다.'
  },
  {
    icon: <CurrencyDollarIcon className="w-6 h-6 text-green-600" />,
    title: '합리적인 가격',
    description: '고객을 위한 최적의 보험료와 보장을 제공합니다.'
  },
  {
    icon: <ChartBarIcon className="w-6 h-6 text-purple-600" />,
    title: '전문 상담',
    description: '보험 전문가의 맞춤형 상담으로 최적의 보험을 선택하세요.'
  }
];

export default function HomePage() {
  const [currentSloganIndex, setCurrentSloganIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSloganIndex((prev) => (prev + 1) % slogans.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentSloganIndex((prev) => (prev - 1 + slogans.length) % slogans.length);
  };

  const goToNext = () => {
    setCurrentSloganIndex((prev) => (prev + 1) % slogans.length);
  };

  const currentSlogan = slogans[currentSloganIndex];

  return (
    <div className="font-sans min-h-screen bg-[#f8f8f8] flex flex-col items-center w-full">
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
      
      {/* 헤더 */}
      <header className="w-full flex items-center justify-center py-6 px-4 md:px-12 bg-[#f8f8f8] border-b border-gray-200">
        <Image src="/bohumstore-logo.png" alt="보험스토어 로고" width={220} height={60} priority />
      </header>

      {/* 슬로건 캐러셀 섹션 - 화면 전체를 채우는 히어로 배너 */}
      <section className="w-full relative overflow-hidden">
        {/* 슬로건 캐러셀 */}
        <div className="relative w-full">
          {/* 메인 슬로건 카드 */}
          <div className="relative w-full">
            <div className={`w-full h-[600px] md:h-[750px] lg:h-[450px] ${currentSlogan.id === 'ibk-lifetime' ? 'bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50' : 
                                                           currentSlogan.id === 'kdb-happy-plus' ? 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50' : 
                                                           currentSlogan.id === 'kdb-happy-dream' ? 'bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50' : 
                                                           'bg-gradient-to-br from-red-50 via-pink-50 to-purple-50'} relative overflow-hidden`} 
                 style={{
                   backgroundImage: currentSlogan.id === 'ibk-lifetime' ? 
                     `radial-gradient(circle at 20% 80%, rgba(251, 191, 36, 0.15) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)` :
                     currentSlogan.id === 'kdb-happy-plus' ? 
                     `radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.15) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)` :
                     currentSlogan.id === 'kdb-happy-dream' ? 
                     `radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(14, 165, 233, 0.15) 0%, transparent 50%)` :
                     `radial-gradient(circle at 20% 80%, rgba(239, 68, 68, 0.15) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)`
                 }}>
              
              {/* 슬로건 내용 */}
              <div className="relative z-10 h-full flex items-center">
                <div className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
                    {/* 텍스트 내용 */}
                    <div className="text-center lg:text-left">
                      <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                        <div className="relative group">
                          <Image 
                            src={currentSlogan.logo} 
                            alt={currentSlogan.company} 
                            width={60} 
                            height={60} 
                            className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain drop-shadow-lg transition-all duration-700 group-hover:rotate-12 group-hover:scale-110"
                          />
                        </div>
                        <span className="text-base md:text-lg lg:text-xl font-medium text-gray-700 drop-shadow-sm animate-fade-in">{currentSlogan.company}</span>
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight drop-shadow-sm animate-slide-in-left">
                        {currentSlogan.title}
                      </h2>
                      <p className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-700 mb-4 md:mb-6 leading-tight drop-shadow-sm animate-slide-in-left" style={{animationDelay: '0.2s'}}>
                        {currentSlogan.subtitle}
                      </p>
                      <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0 drop-shadow-sm animate-slide-in-left" style={{animationDelay: '0.4s'}}>
                        {currentSlogan.description}
                      </p>
                      
                      {/* 자세히 보기 버튼 */}
                      <div className="text-center lg:text-left">
                        <Link 
                          href={currentSlogan.path}
                          className={`inline-flex items-center px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm md:text-base lg:text-lg transition-all duration-300 bg-gradient-to-r ${currentSlogan.color} hover:scale-105 animate-slide-in-left`} style={{animationDelay: '0.8s'}}
                        >
                          <span className="flex items-center">
                            자세히 보기
                            <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </Link>
                      </div>

                    </div>

                    {/* 특징 리스트 */}
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">주요 특징</h3>
                      <div className="space-y-3 md:space-y-4">
                        {currentSlogan.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-3 group hover:bg-white/60 p-3 rounded-lg transition-all duration-200 animate-slide-in-up bg-white/40 backdrop-blur-sm" style={{animationDelay: `${0.6 + index * 0.1}s`}}>
                            <div className={`w-2 h-2 rounded-full mt-2 bg-gradient-to-r ${currentSlogan.color} group-hover:scale-125 transition-transform duration-200`}></div>
                            <span className="text-sm md:text-base text-gray-700 leading-tight group-hover:text-gray-900 transition-colors duration-200 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 네비게이션 버튼 */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 md:left-4 lg:left-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 p-2 md:p-3 rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-110 z-20 border border-white/20"
          >
            <ChevronLeftIcon className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-2 md:right-4 lg:right-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 p-2 md:p-3 rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-110 z-20 border border-white/20"
          >
            <ArrowRightIcon className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* 인디케이터 */}
          <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex justify-center space-x-2 md:space-x-3 z-20">
            {slogans.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSloganIndex(index)}
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                  index === currentSloganIndex
                    ? `bg-gradient-to-r ${currentSlogan.color} w-8 md:w-12 shadow-lg`
                    : 'bg-white/60 hover:bg-white/80 hover:scale-110'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 추천 상품 섹션 */}
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
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      product.badge === 'BEST' ? 'bg-yellow-100 text-yellow-800' :
                      product.badge === 'NEW' ? 'bg-green-100 text-green-800' :
                      product.badge === 'HOT' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {product.badge}
                    </span>
                  </div>
                  
                  {/* 상품 정보 */}
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 mb-2 text-lg leading-tight">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">{product.description}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        product.id === 'kdb-happy-plus' ? 'text-green-600 bg-green-50' :
                        product.id === 'kdb-happy-dream' ? 'text-purple-600 bg-purple-50' :
                        product.id === 'ibk-lifetime' ? 'text-orange-600 bg-orange-50' :
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

      {/* 보험 특징 섹션 */}
      <section className="w-full bg-[#f8f8f8] py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">왜 보험스토어인가요?</h2>
            <p className="text-gray-600">고객을 위한 특별한 서비스를 제공합니다</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {insuranceFeatures.map((feature, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 구분선 */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl px-6">
          <hr className="border-gray-300 my-4" />
        </div>
      </div>

      {/* 필수안내사항 박스 - KDB 해피플러스와 동일한 스타일 */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl mb-2 md:mb-4 lg:mb-6 mt-6 md:mt-8 lg:mt-10 px-6 py-0 text-xs md:text-sm text-gray-800">
          <div className="mb-1 font-bold">[ 필수안내사항 ]</div>
          <div>※ 본 광고는 심의기준을 준수하였으며, 유효기간은 심의일로부터 1년입니다.</div>
          <div className="text-red-500">※ 본계약은 기존 보험계약을 해지하고 새로운 보험계약을 체결하는 과정에서</div>
          <div className="text-red-500">① 진행이력, 연령등에 따라 가입이 거절되거나 보험료가 인상될 수 있습니다.</div>
          <div className="text-red-500">② 가입 상품에 따라 새로운 면책기간 적용 및 보장 제한 등 기타 불이익이 발생할 수 있습니다.</div>
        </div>
      </div>

      {/* 푸터 - KDB 해피플러스와 동일한 스타일 */}
      <footer className="w-full bg-[#f8f8f8] border-t border-gray-200 py-8 mt-4">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-500 text-sm flex flex-col gap-2">
          <div className="flex justify-center items-center gap-6 mb-2">
            <Image src="/metarich-logo1.png" alt="MetaRich 로고" width={120} height={40} style={{objectFit:'contain',height:'40px'}} />
            <span className="h-8 w-px bg-gray-300 mx-2 inline-block" />
            <Image src="/bohumstore-logo.png" alt="보험스토어 로고" width={120} height={40} style={{objectFit:'contain',height:'40px'}} />
          </div>
          <div>(주)메타리치보험대리점 | 대리점등록번호: 제2023070016호</div>
          <div>보험스토어 | 서지후 | 등록번호: 제20060383110008호</div>
          <div>대표전화: 1533-3776 | 이메일: urisky1@naver.com</div>
          <div className="mt-2">© {new Date().getFullYear()} BohumStore. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

