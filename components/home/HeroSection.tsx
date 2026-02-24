'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon, ChevronLeftIcon, PlayIcon, PauseIcon } from '@heroicons/react/24/outline';
import { slogans, chatScenarios } from '@/data/home-data';
import { useResponsive } from '@/hooks/useResponsive';

export default function HeroSection() {
  // 무한 루프를 위해 실제 인덱스는 1부터 시작 (앞에 마지막 슬라이드 복제본이 있음)
  const [displayIndex, setDisplayIndex] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentScenario, setCurrentScenario] = useState(chatScenarios[0]);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const dragStartXRef = useRef<number | null>(null);
  const lastXRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const { isMobile } = useResponsive();

  // 무한 루프용 슬라이드 배열: [마지막복제, ...원본들..., 첫번째복제]
  const extendedSlogans = [slogans[slogans.length - 1], ...slogans, slogans[0]];

  // 실제 슬라이드 인덱스 (0 ~ slogans.length - 1)
  const currentSloganIndex =
    displayIndex === 0
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
      className="relative w-full overflow-hidden"
      onTouchStart={(e) => startDrag(e.touches[0].clientX)}
      onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
      onTouchEnd={endDrag}
      onMouseDown={(e) => startDrag(e.clientX)}
      onMouseMove={(e) => moveDrag(e.clientX)}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
    >
      {/* 슬로건 캐러셀 */}
      <div className="group relative w-full overflow-hidden">
        <div
          className={`flex h-full ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
          style={{ transform: `translateX(-${displayIndex * 100}%)` }}
        >
          {extendedSlogans.map((slogan, index) => {
            const isActive = index === displayIndex;
            return (
              <div key={`${slogan.id}-${index}`} className="relative w-full flex-shrink-0">
                <div
                  className={`w-full ${isMobile ? (slogan.id === 'consult-main' ? 'min-h-[380px]' : 'min-h-[360px]') : (slogan.id === 'consult-main' ? 'min-h-[500px] md:min-h-[560px]' : 'min-h-[480px] md:min-h-[520px]')} lg:min-h-[520px] ${
                    slogan.id === 'consult-main'
                      ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
                      : 'bg-gradient-to-b from-slate-50 to-white'
                  } relative overflow-hidden`}
                  style={{
                    backgroundImage:
                      slogan.id === 'consult-main'
                        ? `radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.1) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(79, 70, 229, 0.1) 0%, transparent 50%)`
                        : 'none',
                  }}
                >
                  {/* 슬로건 내용 */}
                  <div className="relative z-10 flex h-full items-center">
                    <div className="w-full px-4 py-6 md:px-8 md:py-8 lg:px-12">
                      {slogan.id === 'consult-main' ? (
                        /* 상담 신청 슬라이드 - 하이브리드 스타일 */
                        <div className="mx-auto max-w-7xl px-4 py-2 md:py-0 lg:px-8">
                          <div className="flex flex-col items-center gap-6 md:gap-10 lg:flex-row lg:gap-20">
                            {/* 왼쪽: 메인 콘텐츠 */}
                            <div className="flex-1 text-center lg:text-left">
                              {/* 실시간 배지 */}
                              <div
                                className={`mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-medium md:mb-4 md:text-sm ${isActive ? 'animate-fade-in' : 'opacity-0'}`}
                              >
                                <span className="relative flex h-2 w-2">
                                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                                </span>
                                <span className="text-gray-600">
                                  {currentYear}년 {currentMonth}월
                                </span>
                              </div>

                              {/* 타이틀 */}
                              <h2
                                className={`mb-2 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:mb-4 md:text-4xl lg:text-5xl xl:text-6xl ${isActive ? 'animate-slide-in-up' : 'opacity-0'}`}
                                style={{ animationDelay: '0.1s' }}
                              >
                                보험, <span className="text-blue-600">제대로</span> 알고
                                <br /> 가입하고 계신가요?
                              </h2>
                              <p
                                className={`mb-4 text-sm text-gray-500 md:mb-6 md:text-base lg:text-lg ${isActive ? 'animate-slide-in-up' : 'opacity-0'}`}
                                style={{ animationDelay: '0.2s' }}
                              >
                                복잡한 보험, 전문가가 쉽게 설명해드립니다
                              </p>

                              {/* 체크리스트 */}
                              <ul
                                className={`mb-4 space-y-2 md:mb-6 md:space-y-3 ${isActive ? 'animate-slide-in-up' : 'opacity-0'}`}
                                style={{ animationDelay: '0.3s' }}
                              >
                                <li className="flex items-center justify-center text-xs text-gray-700 md:text-sm lg:justify-start lg:text-base">
                                  <span className="mr-2 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-600 md:mr-3 md:h-6 md:w-6">
                                    ✓
                                  </span>
                                  <span>
                                    내 보험료가 적절한지{' '}
                                    <span className="font-semibold text-gray-900">무료 분석</span>
                                  </span>
                                </li>
                                <li className="flex items-center justify-center text-xs text-gray-700 md:text-sm lg:justify-start lg:text-base">
                                  <span className="mr-2 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-600 md:mr-3 md:h-6 md:w-6">
                                    ✓
                                  </span>
                                  <span>
                                    여러 보험사 상품{' '}
                                    <span className="font-semibold text-gray-900">객관적 비교</span>
                                  </span>
                                </li>
                                <li className="flex items-center justify-center text-xs text-gray-700 md:text-sm lg:justify-start lg:text-base">
                                  <span className="mr-2 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-600 md:mr-3 md:h-6 md:w-6">
                                    ✓
                                  </span>
                                  <span>
                                    불필요한 특약{' '}
                                    <span className="font-semibold text-gray-900">정리 컨설팅</span>
                                  </span>
                                </li>
                              </ul>

                              {/* 버튼 */}
                              <div
                                className={`${isActive ? 'animate-slide-in-up' : 'opacity-0'} relative inline-block`}
                                style={{ animationDelay: '0.4s' }}
                              >
                                <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 animate-bounce whitespace-nowrap rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-md sm:text-xs lg:left-0 lg:translate-x-0">
                                  📢 {currentMonth}월 이슈 확인!
                                </span>
                                <Link
                                  href="/insurance/a_consult"
                                  className="inline-flex items-center rounded-xl bg-gradient-to-r from-orange-400 to-rose-400 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-400/25 transition-all hover:from-orange-500 hover:to-rose-500 md:px-8 md:py-4 md:text-base"
                                >
                                  무료 상담 신청하기
                                  <ArrowRightIcon className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                                </Link>
                              </div>
                            </div>

                            {/* 오른쪽: 채팅 UI (데스크탑만) */}
                            {!isMobile && (
                            <div
                              className={`w-full max-w-xs md:max-w-sm lg:max-w-lg ${isActive ? 'animate-fade-in' : 'opacity-0'}`}
                              style={{ animationDelay: '0.2s' }}
                            >
                              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                                {/* 채팅 헤더 */}
                                <div className="flex items-center gap-3 bg-gradient-to-r from-slate-700 to-slate-800 p-3 md:p-4">
                                  <Image
                                    src="/favicon/favicon-96x96.png"
                                    alt="보험스토어"
                                    width={40}
                                    height={40}
                                    className="h-8 w-8 rounded-full border-2 border-white/30 object-cover md:h-10 md:w-10"
                                  />
                                  <div>
                                    <div className="text-sm font-bold text-white md:text-base">
                                      보험스토어 전문가
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] text-slate-300 md:text-xs">
                                      <span className="h-1.5 w-1.5 rounded-full bg-green-400"></span>
                                      실시간 답변 중
                                    </div>
                                  </div>
                                </div>

                                {/* 채팅 내용 - 전문가 입장에서 보는 화면 (전문가=오른쪽, 고객=왼쪽) */}
                                <div className="space-y-2 bg-gray-50 p-3 md:min-h-[180px] md:space-y-2.5 md:p-4 lg:space-y-3 lg:p-5">
                                  {Array.isArray(currentScenario) &&
                                    currentScenario.map((msg: any, idx) => (
                                      <div
                                        key={idx}
                                        className={`flex ${msg.role === 'expert' ? 'justify-end' : 'justify-start'}`}
                                      >
                                        <div
                                          className={`${
                                            msg.role === 'expert'
                                              ? 'rounded-br-sm bg-amber-100 text-amber-900'
                                              : 'rounded-bl-sm border border-gray-100 bg-white text-gray-800'
                                          } max-w-[85%] rounded-xl px-2.5 py-1.5 text-[11px] shadow-sm md:px-3 md:py-2 md:text-xs lg:text-sm`}
                                        >
                                          {msg.text}
                                        </div>
                                      </div>
                                    ))}
                                </div>

                                {/* 입력창 */}
                                <div className="flex gap-2 border-t border-gray-100 bg-white p-2 md:p-3">
                                  <div className="flex h-8 flex-1 items-center rounded-full bg-gray-100 px-3 text-[10px] text-gray-400 md:h-9 md:text-xs">
                                    메시지를 입력하세요...
                                  </div>
                                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FEE500] text-sm font-bold text-[#3A1D1D] md:h-9 md:w-9">
                                    ↑
                                  </div>
                                </div>
                              </div>
                            </div>
                            )}
                          </div>
                        </div>
                      ) : slogan.id === 'kb-triple-level-up' ? (
                        /* KB 트리플 레벨업 - 하이브리드 스타일 */
                        <div className="mx-auto max-w-7xl px-4 py-2 md:py-0 lg:px-8">
                          <div className="flex flex-col items-center gap-6 md:gap-10 lg:flex-row lg:gap-20">
                            {/* 왼쪽: 메인 콘텐츠 */}
                            <div className="flex-1 text-center lg:text-left">
                              {/* 로고 + 회사명 */}
                              <div
                                className={`mb-2 flex items-center justify-center gap-2 md:mb-3 md:gap-3 lg:justify-start ${isActive ? 'animate-fade-in' : 'opacity-0'}`}
                              >
                                {slogan.logo && (
                                  <Image
                                    src={slogan.logo}
                                    alt={slogan.company}
                                    width={48}
                                    height={48}
                                    className="h-10 w-10 object-contain md:h-12 md:w-12 lg:h-14 lg:w-14"
                                  />
                                )}
                                <span className="text-sm font-medium text-gray-500 md:text-base lg:text-lg">
                                  {slogan.company}
                                </span>
                              </div>

                              {/* 핵심 숫자 강조 */}
                              <p
                                className={`mb-1 text-xs text-gray-500 md:mb-2 md:text-sm lg:text-base ${isActive ? 'animate-slide-in-up' : 'opacity-0'}`}
                              >
                                5년납 연금보험
                              </p>
                              <h2
                                className={`mb-2 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:mb-4 md:text-4xl lg:text-5xl xl:text-6xl ${isActive ? 'animate-slide-in-up' : 'opacity-0'}`}
                                style={{ animationDelay: '0.1s' }}
                              >
                                10년시점 <span className="text-yellow-500">130%</span> 환급률
                              </h2>
                              <p
                                className={`mb-3 text-sm text-gray-600 md:mb-5 md:text-base lg:text-lg ${isActive ? 'animate-slide-in-up' : 'opacity-0'}`}
                                style={{ animationDelay: '0.2s' }}
                              >
                                트리플 레벨업 연금보험으로 단기간에 높은 보장
                              </p>

                              {/* 체크리스트 */}
                              <ul
                                className={`mb-4 space-y-2 md:mb-6 md:space-y-3 ${isActive ? 'animate-slide-in-up' : 'opacity-0'}`}
                                style={{ animationDelay: '0.3s' }}
                              >
                                {slogan.features.slice(0, 3).map((feature, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-center justify-center text-xs text-gray-700 md:text-sm lg:justify-start lg:text-base"
                                  >
                                    <span className="mr-2 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 text-xs text-yellow-600 md:mr-3 md:h-6 md:w-6">
                                      ✓
                                    </span>
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>

                              {/* 버튼 */}
                              <div
                                className={`${isActive ? 'animate-slide-in-up' : 'opacity-0'}`}
                                style={{ animationDelay: '0.4s' }}
                              >
                                <Link
                                  href={slogan.path}
                                  className="inline-flex items-center rounded-xl bg-yellow-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-yellow-500/25 transition-all hover:bg-yellow-600 md:px-8 md:py-4 md:text-base"
                                >
                                  자세히 보기
                                  <ArrowRightIcon className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                                </Link>
                              </div>
                            </div>

                            {/* 오른쪽: 핵심 정보 카드 (데스크탑만) */}
                            {!isMobile && (
                            <div
                              className={`w-full max-w-sm md:max-w-md lg:max-w-lg ${isActive ? 'animate-fade-in' : 'opacity-0'}`}
                              style={{ animationDelay: '0.2s' }}
                            >
                              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xl md:p-6 lg:p-8">
                                <div className="mb-4 text-center md:mb-5">
                                  <div className="mb-2 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700 md:text-sm">
                                    BEST 상품
                                  </div>
                                  <h3 className="text-base font-bold text-gray-900 md:text-lg lg:text-xl">
                                    해약환급률 (5년납 기준)
                                  </h3>
                                </div>

                                <div className="space-y-3 md:space-y-4">
                                  <div className="flex items-center justify-between border-b border-gray-100 py-2 md:py-3">
                                    <span className="text-sm text-gray-500 md:text-base">
                                      5년 납입완료
                                    </span>
                                    <span className="text-base font-bold text-gray-900 md:text-lg">
                                      44.1%
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between border-b border-gray-100 py-2 md:py-3">
                                    <span className="text-sm text-gray-500 md:text-base">
                                      7년시점 <span className="text-yellow-600">(보증)</span>
                                    </span>
                                    <span className="text-base font-bold text-gray-900 md:text-lg">
                                      100%
                                    </span>
                                  </div>
                                  <div className="-mx-2 flex items-center justify-between rounded-xl bg-yellow-50 px-3 py-3 md:px-4 md:py-4">
                                    <span className="text-sm font-medium text-yellow-700 md:text-base">
                                      10년시점 <span className="text-yellow-600">(보증)</span>
                                    </span>
                                    <span className="text-2xl font-black text-yellow-600 md:text-3xl">
                                      130%
                                    </span>
                                  </div>
                                </div>

                                <p className="mt-4 text-center text-xs text-gray-400 md:text-sm">
                                  ※ 남자 40세, 월 50만원, 60세 연금개시 기준
                                </p>
                              </div>
                            </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        /* 일반 상품 슬라이드 - 하이브리드 스타일 */
                        <div className="mx-auto max-w-7xl px-4 py-2 md:py-0 lg:px-8">
                          <div className="flex flex-col items-center gap-6 md:gap-10 lg:flex-row lg:gap-20">
                            {/* 왼쪽: 메인 콘텐츠 */}
                            <div className="flex-1 text-center lg:text-left">
                              {/* 로고 + 회사명 */}
                              <div
                                className={`mb-2 flex items-center justify-center gap-2 md:mb-3 md:gap-3 lg:justify-start ${isActive ? 'animate-fade-in' : 'opacity-0'}`}
                              >
                                {slogan.logo && (
                                  <Image
                                    src={slogan.logo}
                                    alt={slogan.company}
                                    width={48}
                                    height={48}
                                    className="h-10 w-10 object-contain md:h-12 md:w-12 lg:h-14 lg:w-14"
                                  />
                                )}
                                <span className="text-sm font-medium text-gray-500 md:text-base lg:text-lg">
                                  {slogan.company}
                                </span>
                              </div>

                              {/* 타이틀 */}
                              <h2
                                className={`mb-2 whitespace-pre-line text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:mb-4 md:text-4xl lg:text-5xl xl:text-6xl ${isActive ? 'animate-slide-in-up' : 'opacity-0'}`}
                                style={{ animationDelay: '0.1s' }}
                              >
                                {slogan.title}
                              </h2>
                              <p
                                className={`mb-3 text-sm text-gray-600 md:mb-5 md:text-base lg:text-lg xl:text-xl ${isActive ? 'animate-slide-in-up' : 'opacity-0'}`}
                                style={{ animationDelay: '0.2s' }}
                              >
                                {slogan.subtitle}
                              </p>

                              {/* 체크리스트 */}
                              <ul
                                className={`mb-4 space-y-2 md:mb-6 md:space-y-3 ${isActive ? 'animate-slide-in-up' : 'opacity-0'}`}
                                style={{ animationDelay: '0.3s' }}
                              >
                                {slogan.features.slice(0, 3).map((feature, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-center justify-center text-xs text-gray-700 md:text-sm lg:justify-start lg:text-base"
                                  >
                                    <span
                                      className={`mr-2 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs md:mr-3 md:h-6 md:w-6 ${
                                        slogan.id === 'metlife-usd'
                                          ? 'bg-blue-100 text-blue-600'
                                          : slogan.id === 'ibk-lifetime'
                                            ? 'bg-orange-100 text-orange-600'
                                            : slogan.id === 'kdb-happy-plus'
                                              ? 'bg-green-100 text-green-600'
                                              : slogan.id === 'kdb-happy-dream'
                                                ? 'bg-purple-100 text-purple-600'
                                                : slogan.id === 'shinhan-more-the-dream'
                                                  ? 'bg-red-100 text-red-600'
                                                  : slogan.id === 'hana-hanaro'
                                                    ? 'bg-teal-100 text-teal-600'
                                                    : 'bg-gray-100 text-gray-600'
                                      }`}
                                    >
                                      ✓
                                    </span>
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>

                              {/* 버튼 */}
                              <div
                                className={`${isActive ? 'animate-slide-in-up' : 'opacity-0'}`}
                                style={{ animationDelay: '0.4s' }}
                              >
                                <Link
                                  href={slogan.path}
                                  className={`inline-flex items-center rounded-xl px-6 py-3 text-sm font-bold text-white shadow-lg transition-all md:px-8 md:py-4 md:text-base ${
                                    slogan.id === 'metlife-usd'
                                      ? 'bg-[#00529b] shadow-blue-500/25 hover:bg-[#003d7a]'
                                      : slogan.id === 'ibk-lifetime'
                                        ? 'bg-orange-500 shadow-orange-500/25 hover:bg-orange-600'
                                        : slogan.id === 'kdb-happy-plus'
                                          ? 'bg-green-500 shadow-green-500/25 hover:bg-green-600'
                                          : slogan.id === 'kdb-happy-dream'
                                            ? 'bg-purple-500 shadow-purple-500/25 hover:bg-purple-600'
                                            : slogan.id === 'shinhan-more-the-dream'
                                              ? 'bg-red-500 shadow-red-500/25 hover:bg-red-600'
                                              : slogan.id === 'hana-hanaro'
                                                ? 'bg-teal-500 shadow-teal-500/25 hover:bg-teal-600'
                                                : 'bg-gray-700 shadow-gray-500/25 hover:bg-gray-800'
                                  }`}
                                >
                                  자세히 보기
                                  <ArrowRightIcon className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                                </Link>
                              </div>
                            </div>

                            {/* 오른쪽: 핵심 정보 카드 (데스크탑만) */}
                            {!isMobile && (
                            <div
                              className={`w-full max-w-sm md:max-w-md lg:max-w-lg ${isActive ? 'animate-fade-in' : 'opacity-0'}`}
                              style={{ animationDelay: '0.2s' }}
                            >
                              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xl md:p-6 lg:p-8">
                                <div className="mb-4 text-center md:mb-5">
                                  <h3 className="text-base font-bold text-gray-900 md:text-lg lg:text-xl">
                                    주요 특징
                                  </h3>
                                </div>

                                <div className="space-y-3 md:space-y-4">
                                  {slogan.features.map((feature, idx) => (
                                    <div
                                      key={idx}
                                      className={`flex items-center py-2 md:py-3 ${idx < slogan.features.length - 1 ? 'border-b border-gray-100' : ''}`}
                                    >
                                      <span
                                        className={`mr-3 h-2 w-2 flex-shrink-0 rounded-full ${
                                          slogan.id === 'metlife-usd'
                                            ? 'bg-blue-500'
                                            : slogan.id === 'ibk-lifetime'
                                              ? 'bg-orange-500'
                                              : slogan.id === 'kdb-happy-plus'
                                                ? 'bg-green-500'
                                                : slogan.id === 'kdb-happy-dream'
                                                  ? 'bg-purple-500'
                                                  : slogan.id === 'shinhan-more-the-dream'
                                                    ? 'bg-red-500'
                                                    : slogan.id === 'hana-hanaro'
                                                      ? 'bg-teal-500'
                                                      : 'bg-gray-500'
                                        }`}
                                      ></span>
                                      <span className="text-sm text-gray-700 md:text-base">
                                        {feature}
                                      </span>
                                    </div>
                                  ))}
                                </div>

                                <p className="mt-4 text-center text-xs text-gray-400 md:text-sm">
                                  ※ 상세 내용은 상품 페이지에서 확인하세요
                                </p>
                              </div>
                            </div>
                            )}
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
          className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-white/90 p-2 text-gray-700 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white hover:text-gray-900 md:left-4 md:p-3 lg:left-8"
        >
          <ChevronLeftIcon className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-white/90 p-2 text-gray-700 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white hover:text-gray-900 md:right-4 md:p-3 lg:right-8"
        >
          <ArrowRightIcon className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        {/* 인디케이터 및 재생/멈춤 버튼 */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center gap-4 md:bottom-8">
          {/* 재생/멈춤 버튼 */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="rounded-full bg-white/60 p-1.5 text-gray-700 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/80"
            aria-label={isAutoPlaying ? '슬라이드 멈춤' : '슬라이드 재생'}
          >
            {isAutoPlaying ? (
              <PauseIcon className="h-4 w-4 md:h-5 md:w-5" />
            ) : (
              <PlayIcon className="h-4 w-4 md:h-5 md:w-5" />
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
                className={`h-3 w-3 rounded-full transition-all duration-300 md:h-4 md:w-4 ${
                  index === currentSloganIndex
                    ? `bg-gradient-to-r ${currentSlogan.color} w-8 shadow-lg md:w-12`
                    : 'bg-white/60 hover:scale-110 hover:bg-white/80'
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
