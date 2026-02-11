"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, ChevronLeftIcon, PlayIcon, PauseIcon } from "@heroicons/react/24/outline";
import { slogans, chatScenarios } from "@/data/home-data";

export default function HeroSection() {
  // 무한 루프를 위해 실제 인덱스는 1부터 시작 (앞에 마지막 슬라이드 복제본이 있음)
  const [displayIndex, setDisplayIndex] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentScenario, setCurrentScenario] = useState(chatScenarios[0]);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const dragStartXRef = useRef<number | null>(null);
  const lastXRef = useRef<number | null>(null);
  const draggingRef = useRef(false);

  // 무한 루프용 슬라이드 배열: [마지막복제, ...원본들..., 첫번째복제]
  const extendedSlogans = [slogans[slogans.length - 1], ...slogans, slogans[0]];
  
  // 실제 슬라이드 인덱스 (0 ~ slogans.length - 1)
  const currentSloganIndex = displayIndex === 0 
    ? slogans.length - 1 
    : displayIndex === extendedSlogans.length - 1 
      ? 0 
      : displayIndex - 1;

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  // 슬라이드가 변경될 때마다 시나리오 랜덤 변경 (첫 번째 슬라이드일 때)
  useEffect(() => {
    if (currentSloganIndex === 0) {
      setCurrentScenario(chatScenarios[Math.floor(Math.random() * chatScenarios.length)]);
    }
  }, [currentSloganIndex]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlaying) {
      interval = setInterval(() => {
        goToNext();
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, displayIndex]);

  // 경계에서 실제 위치로 점프
  useEffect(() => {
    if (!isTransitioning) return;
    
    const handleTransitionEnd = () => {
      if (displayIndex === 0) {
        // 첫번째 복제본(마지막 슬라이드)에서 실제 마지막 슬라이드로 점프
        setIsTransitioning(false);
        setDisplayIndex(slogans.length);
        setTimeout(() => setIsTransitioning(true), 50);
      } else if (displayIndex === extendedSlogans.length - 1) {
        // 마지막 복제본(첫번째 슬라이드)에서 실제 첫번째 슬라이드로 점프
        setIsTransitioning(false);
        setDisplayIndex(1);
        setTimeout(() => setIsTransitioning(true), 50);
      }
    };

    const timer = setTimeout(handleTransitionEnd, 500);
    return () => clearTimeout(timer);
  }, [displayIndex, isTransitioning]);

  const goToPrevious = () => {
    setIsTransitioning(true);
    setDisplayIndex((prev) => prev - 1);
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setDisplayIndex((prev) => prev + 1);
  };

  // Swipe / Drag support
  const startDrag = (x: number) => {
    draggingRef.current = true;
    dragStartXRef.current = x;
    lastXRef.current = x;
  };

  const moveDrag = (x: number) => {
    if (!draggingRef.current) return;
    lastXRef.current = x;
  };

  const endDrag = () => {
    if (!draggingRef.current) return;
    const startX = dragStartXRef.current;
    const lastX = lastXRef.current;
    draggingRef.current = false;
    dragStartXRef.current = null;
    lastXRef.current = null;
    if (startX == null || lastX == null) return;
    const dx = lastX - startX;
    const threshold = 40; // px
    if (Math.abs(dx) >= threshold) {
      if (dx < 0) goToNext();
      else goToPrevious();
    }
  };

  const currentSlogan = slogans[currentSloganIndex];

  return (
    <section
      className="w-full relative overflow-hidden"
      onTouchStart={(e) => startDrag(e.touches[0].clientX)}
      onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
      onTouchEnd={endDrag}
      onMouseDown={(e) => startDrag(e.clientX)}
      onMouseMove={(e) => moveDrag(e.clientX)}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
    >
      {/* 슬로건 캐러셀 */}
      <div className="relative w-full overflow-hidden group">
        <div 
          className={`flex h-full ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
          style={{ transform: `translateX(-${displayIndex * 100}%)` }}
        >
          {extendedSlogans.map((slogan, index) => {
            const isActive = index === displayIndex;
            return (
              <div key={`${slogan.id}-${index}`} className="w-full flex-shrink-0 relative">
                <div className={`w-full ${slogan.id === 'consult-main' ? 'min-h-[500px] md:min-h-[560px]' : 'min-h-[480px] md:min-h-[520px]'} lg:min-h-[520px] ${slogan.id === 'consult-main' ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50' :
                                                               'bg-gradient-to-b from-slate-50 to-white'} relative overflow-hidden`} 
                     style={{
                       backgroundImage: slogan.id === 'consult-main' ?
                         `radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.1) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(79, 70, 229, 0.1) 0%, transparent 50%)` :
'none'
                     }}>
                  {/* 슬로건 내용 */}
                  <div className="relative z-10 h-full flex items-center">
                    <div className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-8">
                      {slogan.id === 'consult-main' ? (
                        /* 상담 신청 슬라이드 - 하이브리드 스타일 */
                        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2 md:py-0">
                          <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-10 lg:gap-20">
                            {/* 왼쪽: 메인 콘텐츠 */}
                            <div className="flex-1 text-center lg:text-left">
                              {/* 실시간 배지 */}
                              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-blue-100 text-xs md:text-sm font-medium mb-3 md:mb-4 ${isActive ? 'animate-fade-in' : 'opacity-0'}`}>
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                                <span className="text-gray-600">{currentYear}년 {currentMonth}월</span>
                              </div>
                              
                              {/* 타이틀 */}
                              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-2 md:mb-4 leading-tight ${isActive ? 'animate-slide-in-up' : 'opacity-0'}`} style={{animationDelay: '0.1s'}}>
                                보험, <span className="text-blue-600">제대로</span> 알고<br /> 가입하고 계신가요?
                              </h2>
                              <p className={`text-sm md:text-base lg:text-lg text-gray-500 mb-4 md:mb-6 ${isActive ? 'animate-slide-in-up' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
                                복잡한 보험, 전문가가 쉽게 설명해드립니다
                              </p>
                              
                              {/* 체크리스트 */}
                              <ul className={`space-y-2 md:space-y-3 mb-4 md:mb-6 ${isActive ? 'animate-slide-in-up' : 'opacity-0'}`} style={{animationDelay: '0.3s'}}>
                                <li className="flex items-center justify-center lg:justify-start text-xs md:text-sm lg:text-base text-gray-700">
                                  <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mr-2 md:mr-3 flex-shrink-0">✓</span>
                                  <span>내 보험료가 적절한지 <span className="font-semibold text-gray-900">무료 분석</span></span>
                                </li>
                                <li className="flex items-center justify-center lg:justify-start text-xs md:text-sm lg:text-base text-gray-700">
                                  <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mr-2 md:mr-3 flex-shrink-0">✓</span>
                                  <span>여러 보험사 상품 <span className="font-semibold text-gray-900">객관적 비교</span></span>
                                </li>
                                <li className="flex items-center justify-center lg:justify-start text-xs md:text-sm lg:text-base text-gray-700">
                                  <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mr-2 md:mr-3 flex-shrink-0">✓</span>
                                  <span>불필요한 특약 <span className="font-semibold text-gray-900">정리 컨설팅</span></span>
                                </li>
                              </ul>
                              
                              {/* 버튼 */}
                              <div className={`${isActive ? 'animate-slide-in-up' : 'opacity-0'} relative inline-block`} style={{animationDelay: '0.4s'}}>
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full shadow-md z-10 animate-bounce whitespace-nowrap">
                                  📢 {currentMonth}월 이슈 확인!
                                </span>
                                <Link 
                                  href="/insurance/a_consult"
                                  className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-orange-400 to-rose-400 hover:from-orange-500 hover:to-rose-500 text-white font-bold rounded-xl text-sm md:text-base transition-all shadow-lg shadow-orange-400/25"
                                >
                                  무료 상담 신청하기
                                  <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                                </Link>
                              </div>
                            </div>
                            
                            {/* 오른쪽: 채팅 UI */}
                            <div className={`w-full max-w-xs md:max-w-sm lg:max-w-lg ${isActive ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
                              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                {/* 채팅 헤더 */}
                                <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-3 md:p-4 flex items-center gap-3">
                                  <Image src="/favicon/favicon-96x96.png" alt="보험스토어" width={40} height={40} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-white/30" />
                                  <div>
                                    <div className="font-bold text-white text-sm md:text-base">보험스토어 전문가</div>
                                    <div className="text-[10px] md:text-xs text-slate-300 flex items-center gap-1">
                                      <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                      실시간 답변 중
                                    </div>
                                  </div>
                                </div>
                                
                                {/* 채팅 내용 - 전문가 입장에서 보는 화면 (전문가=오른쪽, 고객=왼쪽) */}
                                <div className="p-3 md:p-4 lg:p-5 space-y-2 md:space-y-2.5 lg:space-y-3 bg-gray-50 md:min-h-[180px]">
                                  {Array.isArray(currentScenario) && currentScenario.map((msg: any, idx) => (
                                    <div key={idx} className={`flex ${msg.role === 'expert' ? 'justify-end' : 'justify-start'}`}>
                                      <div className={`${msg.role === 'expert' 
                                        ? 'bg-amber-100 text-amber-900 rounded-br-sm' 
                                        : 'bg-white text-gray-800 rounded-bl-sm border border-gray-100'} 
                                        px-2.5 py-1.5 md:px-3 md:py-2 rounded-xl text-[11px] md:text-xs lg:text-sm shadow-sm max-w-[85%]`}>
                                        {msg.text}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                
                                {/* 입력창 */}
                                <div className="bg-white p-2 md:p-3 border-t border-gray-100 flex gap-2">
                                  <div className="flex-1 bg-gray-100 rounded-full h-8 md:h-9 flex items-center px-3 text-[10px] md:text-xs text-gray-400">메시지를 입력하세요...</div>
                                  <div className="w-8 h-8 md:w-9 md:h-9 bg-[#FEE500] rounded-full flex items-center justify-center text-[#3A1D1D] text-sm font-bold">↑</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : slogan.id === 'kb-triple-level-up' ? (
                        /* KB 트리플 레벨업 - 하이브리드 스타일 */
                        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2 md:py-0">
                          <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-10 lg:gap-20">
                            {/* 왼쪽: 메인 콘텐츠 */}
                            <div className="flex-1 text-center lg:text-left">
                              {/* 로고 + 회사명 */}
                              <div className={`flex items-center justify-center lg:justify-start gap-2 md:gap-3 mb-2 md:mb-3 ${isActive ? 'animate-fade-in' : 'opacity-0'}`}>
                                {slogan.logo && (
                                  <Image src={slogan.logo} alt={slogan.company} width={48} height={48} className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain" />
                                )}
                                <span className="text-sm md:text-base lg:text-lg text-gray-500 font-medium">{slogan.company}</span>
                              </div>
                              
                              {/* 핵심 숫자 강조 */}
                              <p className={`text-gray-500 text-xs md:text-sm lg:text-base mb-1 md:mb-2 ${isActive ? 'animate-slide-in-up' : 'opacity-0'}`}>5년납 연금보험</p>
                              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-2 md:mb-4 leading-tight ${isActive ? 'animate-slide-in-up' : 'opacity-0'}`} style={{animationDelay: '0.1s'}}>
                                10년시점 <span className="text-yellow-500">130%</span> 환급률
                              </h2>
                              <p className={`text-sm md:text-base lg:text-lg text-gray-600 mb-3 md:mb-5 ${isActive ? 'animate-slide-in-up' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
                                트리플 레벨업 연금보험으로 단기간에 높은 보장
                              </p>
                              
                              {/* 체크리스트 */}
                              <ul className={`space-y-2 md:space-y-3 mb-4 md:mb-6 ${isActive ? 'animate-slide-in-up' : 'opacity-0'}`} style={{animationDelay: '0.3s'}}>
                                {slogan.features.slice(0, 3).map((feature, idx) => (
                                  <li key={idx} className="flex items-center justify-center lg:justify-start text-xs md:text-sm lg:text-base text-gray-700">
                                    <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-xs mr-2 md:mr-3 flex-shrink-0">✓</span>
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                              
                              {/* 버튼 */}
                              <div className={`${isActive ? 'animate-slide-in-up' : 'opacity-0'}`} style={{animationDelay: '0.4s'}}>
                                <Link 
                                  href={slogan.path}
                                  className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl text-sm md:text-base transition-all shadow-lg shadow-yellow-500/25"
                                >
                                  자세히 보기
                                  <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                                </Link>
                              </div>
                            </div>
                            
                            {/* 오른쪽: 핵심 정보 카드 */}
                            <div className={`w-full max-w-sm md:max-w-md lg:max-w-lg ${isActive ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
                              <div className="bg-white rounded-2xl shadow-xl p-5 md:p-6 lg:p-8 border border-gray-100">
                                <div className="text-center mb-4 md:mb-5">
                                  <div className="inline-block bg-yellow-100 text-yellow-700 text-xs md:text-sm font-bold px-3 py-1 rounded-full mb-2">BEST 상품</div>
                                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900">해약환급률 (5년납 기준)</h3>
                                </div>
                                
                                <div className="space-y-3 md:space-y-4">
                                  <div className="flex justify-between items-center py-2 md:py-3 border-b border-gray-100">
                                    <span className="text-gray-500 text-sm md:text-base">5년 납입완료</span>
                                    <span className="text-base md:text-lg font-bold text-gray-900">44.1%</span>
                                  </div>
                                  <div className="flex justify-between items-center py-2 md:py-3 border-b border-gray-100">
                                    <span className="text-gray-500 text-sm md:text-base">7년시점 <span className="text-yellow-600">(보증)</span></span>
                                    <span className="text-base md:text-lg font-bold text-gray-900">100%</span>
                                  </div>
                                  <div className="flex justify-between items-center py-3 md:py-4 bg-yellow-50 rounded-xl px-3 md:px-4 -mx-2">
                                    <span className="text-yellow-700 text-sm md:text-base font-medium">10년시점 <span className="text-yellow-600">(보증)</span></span>
                                    <span className="text-2xl md:text-3xl font-black text-yellow-600">130%</span>
                                  </div>
                                </div>
                                
                                <p className="text-xs md:text-sm text-gray-400 text-center mt-4">※ 남자 40세, 월 50만원, 60세 연금개시 기준</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (/* 일반 상품 슬라이드 - 하이브리드 스타일 */
                        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2 md:py-0">
                          <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-10 lg:gap-20">
                            {/* 왼쪽: 메인 콘텐츠 */}
                            <div className="flex-1 text-center lg:text-left">
                              {/* 로고 + 회사명 */}
                              <div className={`flex items-center justify-center lg:justify-start gap-2 md:gap-3 mb-2 md:mb-3 ${isActive ? 'animate-fade-in' : 'opacity-0'}`}>
                                {slogan.logo && (
                                  <Image src={slogan.logo} alt={slogan.company} width={48} height={48} className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain" />
                                )}
                                <span className="text-sm md:text-base lg:text-lg text-gray-500 font-medium">{slogan.company}</span>
                              </div>
                              
                              {/* 타이틀 */}
                              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-2 md:mb-4 leading-tight whitespace-pre-line ${isActive ? 'animate-slide-in-up' : 'opacity-0'}`} style={{animationDelay: '0.1s'}}>
                                {slogan.title}
                              </h2>
                              <p className={`text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 mb-3 md:mb-5 ${isActive ? 'animate-slide-in-up' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
                                {slogan.subtitle}
                              </p>
                              
                              {/* 체크리스트 */}
                              <ul className={`space-y-2 md:space-y-3 mb-4 md:mb-6 ${isActive ? 'animate-slide-in-up' : 'opacity-0'}`} style={{animationDelay: '0.3s'}}>
                                {slogan.features.slice(0, 3).map((feature, idx) => (
                                  <li key={idx} className="flex items-center justify-center lg:justify-start text-xs md:text-sm lg:text-base text-gray-700">
                                    <span className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-xs mr-2 md:mr-3 flex-shrink-0 ${
                                      slogan.id === 'metlife-usd' ? 'bg-blue-100 text-blue-600' :
                                      slogan.id === 'ibk-lifetime' ? 'bg-orange-100 text-orange-600' :
                                      slogan.id === 'kdb-happy-plus' ? 'bg-green-100 text-green-600' :
                                      slogan.id === 'kdb-happy-dream' ? 'bg-purple-100 text-purple-600' :
                                      slogan.id === 'shinhan-more-the-dream' ? 'bg-red-100 text-red-600' :
                                      slogan.id === 'hana-hanaro' ? 'bg-teal-100 text-teal-600' :
                                      'bg-gray-100 text-gray-600'
                                    }`}>✓</span>
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                              
                              {/* 버튼 */}
                              <div className={`${isActive ? 'animate-slide-in-up' : 'opacity-0'}`} style={{animationDelay: '0.4s'}}>
                                <Link 
                                  href={slogan.path}
                                  className={`inline-flex items-center px-6 md:px-8 py-3 md:py-4 text-white font-bold rounded-xl text-sm md:text-base transition-all shadow-lg ${
                                    slogan.id === 'metlife-usd' ? 'bg-[#00529b] hover:bg-[#003d7a] shadow-blue-500/25' :
                                    slogan.id === 'ibk-lifetime' ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/25' :
                                    slogan.id === 'kdb-happy-plus' ? 'bg-green-500 hover:bg-green-600 shadow-green-500/25' :
                                    slogan.id === 'kdb-happy-dream' ? 'bg-purple-500 hover:bg-purple-600 shadow-purple-500/25' :
                                    slogan.id === 'shinhan-more-the-dream' ? 'bg-red-500 hover:bg-red-600 shadow-red-500/25' :
                                    slogan.id === 'hana-hanaro' ? 'bg-teal-500 hover:bg-teal-600 shadow-teal-500/25' :
                                    'bg-gray-700 hover:bg-gray-800 shadow-gray-500/25'
                                  }`}
                                >
                                  자세히 보기
                                  <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                                </Link>
                              </div>
                            </div>
                            
                            {/* 오른쪽: 핵심 정보 카드 */}
                            <div className={`w-full max-w-sm md:max-w-md lg:max-w-lg ${isActive ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
                              <div className="bg-white rounded-2xl shadow-xl p-5 md:p-6 lg:p-8 border border-gray-100">
                                <div className="text-center mb-4 md:mb-5">
                                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900">주요 특징</h3>
                                </div>
                                
                                <div className="space-y-3 md:space-y-4">
                                  {slogan.features.map((feature, idx) => (
                                    <div key={idx} className={`flex items-center py-2 md:py-3 ${idx < slogan.features.length - 1 ? 'border-b border-gray-100' : ''}`}>
                                      <span className={`w-2 h-2 rounded-full mr-3 flex-shrink-0 ${
                                        slogan.id === 'metlife-usd' ? 'bg-blue-500' :
                                        slogan.id === 'ibk-lifetime' ? 'bg-orange-500' :
                                        slogan.id === 'kdb-happy-plus' ? 'bg-green-500' :
                                        slogan.id === 'kdb-happy-dream' ? 'bg-purple-500' :
                                        slogan.id === 'shinhan-more-the-dream' ? 'bg-red-500' :
                                        slogan.id === 'hana-hanaro' ? 'bg-teal-500' :
                                        'bg-gray-500'
                                      }`}></span>
                                      <span className="text-sm md:text-base text-gray-700">{feature}</span>
                                    </div>
                                  ))}
                                </div>
                                
                                <p className="text-xs md:text-sm text-gray-400 text-center mt-4">※ 상세 내용은 상품 페이지에서 확인하세요</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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

        {/* 인디케이터 및 재생/멈춤 버튼 */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 z-20">
          {/* 재생/멈춤 버튼 */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="p-1.5 rounded-full bg-white/60 hover:bg-white/80 backdrop-blur-sm transition-all hover:scale-110 text-gray-700"
            aria-label={isAutoPlaying ? "슬라이드 멈춤" : "슬라이드 재생"}
          >
            {isAutoPlaying ? (
              <PauseIcon className="w-4 h-4 md:w-5 md:h-5" />
            ) : (
              <PlayIcon className="w-4 h-4 md:w-5 md:h-5" />
            )}
          </button>

          {/* 페이지 점들 */}
          <div className="flex space-x-2 md:space-x-3">
            {slogans.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setDisplayIndex(index + 1);
                }}
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                  index === currentSloganIndex
                    ? `bg-gradient-to-r ${currentSlogan.color} w-8 md:w-12 shadow-lg`
                    : 'bg-white/60 hover:bg-white/80 hover:scale-110'
                }`}
                aria-label={`${index + 1}번 슬라이드로 이동`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
