"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, ChevronLeftIcon, ShieldCheckIcon, CurrencyDollarIcon, ChartBarIcon, ChatBubbleLeftRightIcon, MagnifyingGlassIcon, ScaleIcon, ClipboardDocumentCheckIcon, PlayIcon, PauseIcon, CalendarDaysIcon, MegaphoneIcon } from "@heroicons/react/24/outline";
import { trackPageVisit } from "./utils/visitorTracking";

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
    animation: fadeIn 0.8s ease-out both;
  }
  
  .animate-slide-in-left {
    animation: slideInLeft 0.8s ease-out both;
  }
  
  .animate-slide-in-up {
    animation: slideInUp 0.6s ease-out both;
  }
`;

// 슬로건 데이터
const slogans = [
  {
    id: 'consult-main',
    title: '나에게 딱 맞는 보험,\n찾기 어려우신가요?',
    subtitle: '전문가가 객관적으로 분석해 드리는\n1:1 맞춤 무료 상담',
    description: '복잡한 보험, 더 이상 고민하지 마세요. 내 보험 분석부터 맞춤 추천까지 한번에 해결해 드립니다.',
    path: '/insurance/a_consult',
    color: 'from-blue-600 to-indigo-600',
    bgColor: 'bg-blue-50',
    features: [
      '내 보험료가 적절한지 궁금할 때',
      '불필요한 특약이 있는지 확인할 때',
      '여러 보험사의 상품을 비교하고 싶을 때',
      '전문가의 객관적인 조언이 필요할 때'
    ],
    company: '' // 로고 없음
  },
  {
    id: 'kb-triple-level-up',
    title: '트리플 레벨업 보장',
    subtitle: '10년시점 130% 해약환급률 보증',
    description: 'KB 트리플 레벨업 연금보험으로 단기간에 높은 보장을 받으세요.',
    path: '/insurance/annuity/kb/triple-level-up',
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-50',
    features: [
      '10년시점 130% 해약환급률 보증 (5년납)',
      '가입 0~70세 / 연금개시 45~85세',
      '비과세 혜택 (월 150만원 한도)',
      '병력 무심사 / 전건 가입가능'
    ],
    company: 'KB라이프생명',
    logo: '/KB라이프.png'
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
    company: '신한라이프생명',
    logo: '/shinhan-life-logo.png'
  },
  {
    id: 'hana-hanaro',
    title: '간편심사형 종신보험',
    subtitle: '병력 걱정 없이 가입 가능',
    description: '하나생명 하나로 THE 연결된 종신보험으로 높은 환급률과 간편한 가입을 경험하세요.',
    path: '/insurance/whole-life/hana/hanaro',
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50',
    features: [
      '10년시점 122.78% 환급률 (5년납)',
      '간편심사형으로도 가입 가능',
      '3대질병 진단시 보험료 환급',
      '유지보너스 제공'
    ],
    company: '하나생명',
    logo: '/hana-logo.png'
  }
];

// 메인 상품 데이터
const mainProducts = [
  {
    id: 'kb-triple-level-up',
    name: 'KB 트리플 레벨업 연금보험(보증형)',
    company: 'KB라이프생명',
    logo: '/KB라이프.png',
    path: '/insurance/annuity/kb/triple-level-up',
    description: '10년시점 130% 해약환급률 보증으로 단기간 높은 보장',
    badge: 'BEST',
    category: '연금보험',
    highlight: '10년시점 130% 보증'
  },
  {
    id: 'ibk-lifetime',
    name: 'IBK 평생보증받는 변액연금보험',
    company: 'IBK연금보험',
    logo: '/IBK-logo.png',
    path: '/insurance/annuity/ibk/lifetime',
    description: '연단리 8% 보증으로 평생 연금 보장',
    badge: 'HOT',
    category: '변액연금',
    highlight: '연단리 8% 보증'
  },
  {
    id: 'kdb-happy-plus',
    name: 'KDB 행복플러스 연금보험(보증형)',
    company: 'KDB생명',
    logo: '/kdb-logo.png',
    path: '/insurance/annuity/kdb/happy-plus',
    description: '연단리 7% 보증으로 안정적인 노후 준비',
    badge: '',
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
    badge: '추천',
    category: '변액연금',
    highlight: '연단리 7% 보증'
  },
  {
    id: 'shinhan-more-the-dream',
    name: '신한 모아더드림 Plus 종신보험',
    company: '신한라이프생명',
    logo: '/shinhan-life-logo.png',
    path: '/insurance/whole-life/shinhan/more-the-dream',
    description: '15~70세 전연령 10년시점 122.7%로 단기납 완료 후 높은 환급률',
    badge: '',
    category: '종신보험',
    highlight: '10년시점 122.7%'
  },
  {
    id: 'hana-hanaro',
    name: '하나생명 하나로 THE 연결된 종신보험',
    company: '하나생명',
    logo: '/hana-logo.png',
    path: '/insurance/whole-life/hana/hanaro',
    description: '간편심사형 가능, 10년시점 122.78% 환급률로 병력 걱정 없이',
    badge: 'NEW',
    category: '종신보험',
    highlight: '간편심사형 가능'
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

// 채팅 시나리오 데이터
const chatScenarios = [
  [
    { role: "customer", text: "다음 달부터 실손보험료가 많이 오른다던데 사실인가요? 😥" },
    { role: "expert", text: "네, 맞습니다. 연령 증가와 손해율 상승으로 인상 예정입니다." },
    { role: "customer", text: "아이고... 그럼 지금이라도 어떻게 해야 할까요?" },
    { role: "expert", text: "아직 늦지 않았습니다! 현재 조건으로 미리 대비하실 수 있게 도와드릴게요." }
  ],
  [
    { role: "customer", text: "이번에 추천해주신 암보험 정말 든든하네요! 감사합니다 😊" },
    { role: "expert", text: "고객님께 딱 맞는 상품을 찾아드릴 수 있어 저도 기쁩니다." },
    { role: "customer", text: "주변 지인들에게도 많이 소개할게요!" },
    { role: "expert", text: "감사합니다! 언제든 편하게 문의주세요." }
  ],
  [
    { role: "customer", text: "한도 축소되기 전에 막차 탈 수 있게 도와주셔서 감사해요!" },
    { role: "expert", text: "네, 다행히 좋은 조건으로 가입되셨네요 ^^" },
    { role: "expert", text: "앞으로 보장 받으실 일만 남았습니다! 든든하시죠?" },
    { role: "customer", text: "네!! 진짜 안심돼요 ㅎㅎ 감사합니다!" }
  ],
  [
    { role: "customer", text: "기존 보험이 너무 비싸서 부담이었는데..." },
    { role: "expert", text: "불필요한 특약은 줄이고 핵심 보장만 남겨드렸습니다." },
    { role: "customer", text: "덕분에 보험료가 확 줄었네요! 진작 상담받을 걸 그랬어요." },
    { role: "expert", text: "만족하셔서 다행입니다. 절약된 비용으로 맛있는 거 드세요! 🍚" }
  ],
  [
    { role: "customer", text: "부모님 치매 보험 알아보고 있는데 상담 가능할까요?" },
    { role: "expert", text: "물론이죠. 치매 단계별로 보장되는 상품들이 있습니다." },
    { role: "customer", text: "간병비도 같이 보장되면 좋겠어요." },
    { role: "expert", text: "네, 간병인 지원까지 포함된 든든한 효도 플랜으로 설계해 드릴게요." }
  ]
];

export default function HomePage() {
  const [currentSloganIndex, setCurrentSloganIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentScenario, setCurrentScenario] = useState(chatScenarios[0]);
  const dragStartXRef = useRef<number | null>(null);
  const lastXRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const resumeTimerRef = useRef<any>(null);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  useEffect(() => {
    // 페이지 방문 시 자동 추적
    trackPageVisit();
  }, []);

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
        setCurrentSloganIndex((prevIndex) => 
          prevIndex === slogans.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentSloganIndex((prev) => (prev - 1 + slogans.length) % slogans.length);
  };

  const goToNext = () => {
    setCurrentSloganIndex((prev) => (prev + 1) % slogans.length);
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
    <div className="font-sans min-h-screen bg-[#f8f8f8] flex flex-col items-center w-full">
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
      
      {/* 슬로건 캐러셀 섹션 - 화면 전체를 채우는 히어로 배너 */}
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
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSloganIndex * 100}%)` }}
          >
            {slogans.map((slogan, index) => {
              const isActive = index === currentSloganIndex;
              return (
                <div key={slogan.id} className="w-full flex-shrink-0 relative">
                  <div className={`w-full min-h-[540px] md:min-h-[680px] lg:h-[480px] ${slogan.id === 'consult-main' ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50' :
                                                                 slogan.id === 'kb-triple-level-up' ? 'bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50' :
                                                                 slogan.id === 'ibk-lifetime' ? 'bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50' : 
                                                                 slogan.id === 'kdb-happy-plus' ? 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50' : 
                                                                 slogan.id === 'kdb-happy-dream' ? 'bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50' : 
                                                                 slogan.id === 'hana-hanaro' ? 'bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50' :
                                                                 'bg-gradient-to-br from-red-50 via-pink-50 to-purple-50'} relative overflow-hidden`} 
                       style={{
                         backgroundImage: slogan.id === 'consult-main' ?
                           `radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(79, 70, 229, 0.1) 0%, transparent 50%)` :
                           slogan.id === 'kb-triple-level-up' ? 
                           `radial-gradient(circle at 20% 80%, rgba(251, 191, 36, 0.15) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)` :
                           slogan.id === 'ibk-lifetime' ? 
                           `radial-gradient(circle at 20% 80%, rgba(251, 191, 36, 0.15) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)` :
                           slogan.id === 'kdb-happy-plus' ? 
                           `radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.15) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)` :
                           slogan.id === 'kdb-happy-dream' ? 
                           `radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(14, 165, 233, 0.15) 0%, transparent 50%)` :
                           slogan.id === 'hana-hanaro' ? 
                           `radial-gradient(circle at 20% 80%, rgba(20, 184, 166, 0.15) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(13, 148, 136, 0.15) 0%, transparent 50%)` :
                           `radial-gradient(circle at 20% 80%, rgba(239, 68, 68, 0.15) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)`
                       }}>
                    {/* 슬로건 내용 */}
                    <div className="relative z-10 h-full flex items-center">
                      <div className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-8">
                        {slogan.id === 'consult-main' ? (
                          /* 상담 신청 전용 슬라이드 디자인 - 이달의 이슈 & 채팅 상담 컨셉 */
                          <div className="w-full h-full flex items-center justify-center relative overflow-hidden py-8 md:py-0">
                            
                            <div className="relative z-10 max-w-6xl w-full mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center h-full">
                              {/* 텍스트 영역 (왼쪽) */}
                              <div className="text-center lg:text-left order-1 flex flex-col justify-center">
                                <div className={`inline-flex mx-auto lg:mx-0 items-center gap-2 px-3 py-1 rounded-full bg-white border border-blue-100 text-slate-700 text-xs md:text-sm font-bold mb-3 md:mb-6 shadow-sm w-fit ${isActive ? 'animate-slide-in-up' : 'opacity-0'}`}>
                                  <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                  </span>
                                  <span>{currentYear}년 {currentMonth}월 <span className="text-red-500 animate-pulse font-bold ml-2">실시간</span>
                                    <span className="relative inline-flex h-2 w-2 ml-2">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                    </span>
                                  </span>
                                </div>
                                
                                <h2 className={`text-2xl sm:text-4xl lg:text-6xl font-bold text-slate-900 leading-tight mb-3 md:mb-6 ${isActive ? 'animate-slide-in-up' : 'opacity-0'}`} style={{animationDelay: '0.1s'}}>
                                  {currentMonth}월 보험 이슈,<br />
                                  <span className="text-blue-600">확인하셨나요?</span>
                                </h2>
                                
                                <p className={`text-sm sm:text-lg text-slate-600 mb-4 md:mb-8 leading-relaxed ${isActive ? 'animate-slide-in-up' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
                                  <span className="md:hidden">
                                    매달 달라지는 보험,<br/>
                                    전문가가 꼼꼼히 챙겨드려요.
                                  </span>
                                  <span className="hidden md:block">
                                    매달 달라지는 보험 정보,<br/>
                                    전문가와 함께 꼼꼼하게 점검해보세요.
                                  </span>
                                </p>
                                
                                <div className={`flex flex-col sm:flex-row gap-3 justify-center lg:justify-start ${isActive ? 'animate-slide-in-up' : 'opacity-0'}`} style={{animationDelay: '0.3s'}}>
                                  <Link 
                                    href="/insurance/a_consult"
                                    className="px-6 py-3 md:px-8 md:py-4 bg-blue-600 text-white text-base md:text-lg font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 group"
                                  >
                                    <span>{currentMonth}월 보험 상담신청</span>
                                    <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                                  </Link>
                                </div>
                              </div>

                              {/* 비주얼 영역 (오른쪽) - 채팅 UI 컨셉 (이슈 관련 대화) */}
                              <div className={`order-2 flex justify-center lg:justify-end items-center ${isActive ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
                                 <div className="relative w-[300px] md:w-[360px] bg-slate-50 rounded-2xl md:rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                                    {/* 채팅방 헤더 */}
                                    <div className="bg-white p-3 md:p-4 border-b border-slate-100 flex items-center gap-3 shadow-sm relative z-10">
                                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 flex items-center justify-center text-lg md:text-xl border border-blue-50">👨‍💼</div>
                                      <div>
                                        <div className="font-bold text-slate-800 text-xs md:text-sm">보험스토어 전문가</div>
                                        <div className="text-[10px] md:text-xs text-green-500 flex items-center gap-1">
                                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                          실시간 답변 중
                                        </div>
                                      </div>
                                    </div>
                                    
                                    {/* 채팅 내용 */}
                                    <div className="p-3 md:p-5 space-y-3 md:space-y-4 bg-slate-50 h-[240px] md:h-[340px] flex flex-col justify-center overflow-y-auto scrollbar-hide">
                                      {Array.isArray(currentScenario) && currentScenario.map((msg, idx) => (
                                        <div key={idx} className={`flex ${msg.role === 'customer' ? 'justify-end' : 'justify-start'} ${isActive ? 'animate-slide-in-up' : 'opacity-0'}`} style={{animationDelay: `${0.3 + idx * 0.5}s`}}>
                                          <div className={`${msg.role === 'customer' 
                                            ? 'bg-yellow-100 text-slate-800 rounded-tr-none' 
                                            : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'} 
                                            px-3 py-2 md:px-4 md:py-2.5 rounded-2xl text-xs md:text-sm shadow-sm max-w-[85%] break-keep`}>
                                            {msg.text}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                    
                                    {/* 입력창 데코 */}
                                    <div className="bg-white p-2 md:p-3 border-t border-slate-100 flex gap-2">
                                      <div className="flex-1 bg-slate-100 rounded-full h-7 md:h-9 flex items-center px-3 md:px-4 text-[10px] md:text-xs text-gray-400">궁금한 점을 입력하세요...</div>
                                      <div className="w-7 h-7 md:w-9 md:h-9 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs md:text-base">↑</div>
                                    </div>
                                 </div>

                                 
                                 {/* 장식용 요소 - 모바일에서는 숨김 */}
                                 <div className="absolute -right-4 bottom-10 bg-white p-3 rounded-xl shadow-lg animate-bounce border border-slate-100 hidden md:block" style={{animationDuration: '3s'}}>
                                    <div className="flex items-center gap-2">
                                      <span className="text-2xl">📅</span>
                                      <div>
                                        <div className="text-xs text-slate-500">변경 예정 D-Day</div>
                                        <div className="text-sm font-bold text-red-500">놓치지 마세요!</div>
                                      </div>
                                    </div>
                                 </div>
                              </div>
                            </div>
                          </div>
                        ) : (/* 일반 상품 슬라이드 디자인 */
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
                          {/* 텍스트 내용 */}
                          <div className="text-center lg:text-left">
                            <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                              {slogan.logo && (
                                <div className="relative group">
                                  <Image 
                                    src={slogan.logo} 
                                    alt={slogan.company} 
                                    width={60} 
                                    height={60} 
                                    className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain drop-shadow-lg transition-all duration-700 group-hover:rotate-12 group-hover:scale-110"
                                  />
                                </div>
                              )}
                              <span className={`text-base md:text-lg lg:text-xl font-medium text-gray-700 drop-shadow-sm ${isActive ? 'animate-fade-in' : 'opacity-0'}`}>{slogan.company}</span>
                            </div>
                            
                            <h2 className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight drop-shadow-sm whitespace-pre-line ${isActive ? 'animate-slide-in-left' : 'opacity-0'}`}>
                              {slogan.title}
                            </h2>
                            <p className={`text-lg md:text-xl lg:text-2xl font-semibold text-gray-700 mb-4 md:mb-6 leading-tight drop-shadow-sm whitespace-pre-line ${isActive ? 'animate-slide-in-left' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
                              {slogan.subtitle}
                            </p>
                            <p className={`text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0 drop-shadow-sm ${isActive ? 'animate-slide-in-left' : 'opacity-0'}`} style={{animationDelay: '0.4s'}}>
                              {slogan.description}
                            </p>
                            
                            {/* 자세히 보기 버튼 */}
                            <div className="text-center lg:text-left">
                              <Link 
                                href={slogan.path}
                                className={`inline-flex items-center px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm md:text-base lg:text-lg transition-all duration-300 bg-gradient-to-r ${slogan.color} hover:scale-105 ${isActive ? 'animate-slide-in-left' : 'opacity-0'}`} style={{animationDelay: '0.8s'}}
                              >
                                <span className="flex items-center">
                                  {slogan.id === 'consult-main' ? '무료 상담 신청하기' : '자세히 보기'}
                                  <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </span>
                              </Link>
                            </div>

                          </div>

                          {/* 특징 리스트 - 상담 신청 슬라이드일 때는 다르게 표시 */}
                          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">
                              {slogan.id === 'consult-main' ? '이런 분들께 추천해요' : '주요 특징'}
                            </h3>
                            <div className="space-y-3 md:space-y-4">
                              {slogan.features.map((feature, index) => (
                                <div key={index} className={`flex items-start gap-3 group hover:bg-white/60 p-3 rounded-lg transition-all duration-200 bg-white/40 backdrop-blur-sm ${isActive ? 'animate-slide-in-up' : 'opacity-0'}`} style={{animationDelay: `${0.6 + index * 0.1}s`}}>
                                  <div className={`w-2 h-2 rounded-full mt-2 bg-gradient-to-r ${slogan.color} group-hover:scale-125 transition-transform duration-200`}></div>
                                  <span className="text-sm md:text-base text-gray-700 leading-tight group-hover:text-gray-900 transition-colors duration-200 font-medium">{feature}</span>
                                </div>
                              ))}
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
          </div>    {/* 네비게이션 버튼 */}
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
                  onClick={() => setCurrentSloganIndex(index)}
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
                    {product.badge && (
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        product.badge === 'BEST' ? 'bg-yellow-100 text-yellow-800' :
                        product.badge === 'NEW' ? 'bg-green-100 text-green-800' :
                        product.badge === 'HOT' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {product.badge}
                      </span>
                    )}
                  </div>
                  
                  {/* 상품 정보 */}
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 mb-2 text-lg leading-tight">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">{product.description}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        product.id === 'kb-triple-level-up' ? 'text-yellow-600 bg-yellow-50' :
                        product.id === 'kdb-happy-plus' ? 'text-green-600 bg-green-50' :
                        product.id === 'kdb-happy-dream' ? 'text-purple-600 bg-purple-50' :
                        product.id === 'ibk-lifetime' ? 'text-orange-600 bg-orange-50' :
                        product.id === 'hana-hanaro' ? 'text-teal-600 bg-teal-50' :
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
          <div className="mt-2">  BohumStore. All rights reserved.</div>
        </div>
      </footer>
      {/* 플로팅 버튼 모음 */}
      <div className="fixed bottom-6 right-4 sm:right-8 z-50 flex flex-col gap-2 sm:gap-3">
        {/* 상담 신청 버튼 */}
        <Link
          href="/insurance/a_consult"
          className="bg-white text-blue-600 rounded-2xl px-2 py-2 sm:px-3 sm:py-3 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_25px_rgba(0,0,0,0.2)] transition-all duration-300 hover:bg-blue-50 border border-blue-100 flex flex-col items-center gap-1 min-w-[50px] group"
          aria-label="상담 신청"
        >
          <span className="text-xs font-bold text-gray-600 group-hover:text-blue-600 transition-colors">상담</span>
          <ChatBubbleLeftRightIcon className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse text-blue-500" />
        </Link>

        {/* 카톡 상담 버튼 */}
        <button 
          onClick={() => window.open('http://pf.kakao.com/_lrubxb/chat', '_blank')}
          className="bg-white text-gray-600 rounded-2xl px-2 py-2 sm:px-3 sm:py-3 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_25px_rgba(0,0,0,0.2)] transition-all duration-300 hover:bg-gray-50 border border-gray-200 flex flex-col items-center gap-1 min-w-[50px]"
          aria-label="카톡상담"
        >
          <span className="text-xs font-semibold">카톡</span>
          <img src="/kakaotalk.png" alt="카톡상담" className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* 맨 위로 버튼 */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-white text-gray-600 rounded-full p-2 sm:p-3 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_25px_rgba(0,0,0,0.2)] transition-all duration-300 hover:bg-gray-50 border border-gray-200"
          aria-label="맨 위로"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

