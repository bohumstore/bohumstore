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
    logo: '/kb-life.png'
  },
  {
    id: 'metlife-usd',
    title: '10년시점 124.9% 환급률',
    subtitle: '달러로 준비하는 미래 자산',
    description: '메트라이프 달러종신보험으로 환율 변동에도 안정적인 자산을 설계하세요.',
    path: '/insurance/whole-life/metlife/usd',
    color: 'from-[#00529b] to-[#003d7a]',
    bgColor: 'bg-blue-50',
    features: [
      '달러/원화 선택 수령 가능',
      '원화고정납입으로 환율 걱정 無',
      '15~70세 가입 가능'
    ],
    company: '메트라이프생명',
    logo: '/metlife-logo.png'
  },
  {
    id: 'ibk-lifetime',
    title: '연단리 8% 보증',
    subtitle: '평생 연금으로 안정적인 노후',
    description: 'IBK 평생연금받는 변액연금보험으로 평생 동안 안정적인 연금을 받으세요.',
    path: '/insurance/annuity/ibk/lifetime',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    features: [
      '업계 최고 연단리 8% 보증',
      '평생 연금 지급',
      '변액형 연금의 수익성'
    ],
    company: 'IBK연금보험',
    logo: '/IBK-logo.png'
  },
  {
    id: 'kdb-happy-plus',
    title: '연단리 7% 보증',
    subtitle: '보증형 연금으로 확실한 노후',
    description: 'KDB 행복플러스 연금보험으로 안전하고 안정적인 노후를 준비하세요.',
    path: '/insurance/annuity/kdb/happy-plus',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    features: [
      '연단리 7% 보증 수익',
      '보증형 연금으로 확실한 보장',
      '안정적인 노후 준비'
    ],
    company: 'KDB생명',
    logo: '/kdb-logo.png'
  },
  {
    id: 'kdb-happy-dream',
    title: '연단리 7% 보증',
    subtitle: '변액형으로 더 높은 수익 기대',
    description: 'KDB 행복드림 변액연금보험으로 높은 수익과 안정성을 동시에 누리세요.',
    path: '/insurance/annuity/kdb/happy-dream',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    features: [
      '연단리 7% 보증 + 추가 수익',
      '변액형 연금의 성장성',
      '유연한 연금 수령 방식'
    ],
    company: 'KDB생명',
    logo: '/kdb-logo.png'
  },
  {
    id: 'shinhan-more-the-dream',
    title: '10년시점 122.7% 환급률',
    subtitle: '단기납으로 빠른 완납',
    description: '신한 모아더드림 Plus 종신보험으로 짧은 기간에 높은 보장을 받으세요.',
    path: '/insurance/whole-life/shinhan/more-the-dream',
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    features: [
      '15~70세 전연령 가입 가능',
      '단기납으로 빠른 완납',
      '종신보장으로 평생 보호'
    ],
    company: '신한라이프생명',
    logo: '/shinhan-life-logo.png'
  },
  {
    id: 'hana-hanaro',
    title: '10년시점 122.78% 환급률',
    subtitle: '간편심사형 가입 가능',
    description: '하나생명 하나로 THE 연결된 종신보험으로 높은 환급률과 간편한 가입을 경험하세요.',
    path: '/insurance/whole-life/hana/hanaro',
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50',
    features: [
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
    logo: '/kb-life.png',
    path: '/insurance/annuity/kb/triple-level-up',
    description: '5년납 단기완납, 병력 무심사 가입 가능',
    badge: 'BEST',
    category: '연금보험',
    highlight: '10년시점 130% 보증'
  },
  {
    id: 'metlife-usd',
    name: '메트라이프 달러종신보험Plus',
    company: '메트라이프생명',
    logo: '/metlife-logo.png',
    path: '/insurance/whole-life/metlife/usd',
    description: '달러/원화 선택 수령, 원화고정납입옵션으로 환율 걱정 無',
    badge: 'TOP',
    category: '달러종신보험',
    highlight: '10년시점 124.9%'
  },
  {
    id: 'ibk-lifetime',
    name: 'IBK 평생보증받는 변액연금보험',
    company: 'IBK연금보험',
    logo: '/IBK-logo.png',
    path: '/insurance/annuity/ibk/lifetime',
    description: '업계 최고 연단리 8% 보증, 100세까지 평생 연금 수령',
    badge: 'HOT',
    category: '변액연금',
    highlight: '연단리 8% 보증'
  },
  {
    id: 'kdb-happy-dream',
    name: 'KDB 행복드림 변액연금보험',
    company: 'KDB생명',
    logo: '/kdb-logo.png',
    path: '/insurance/annuity/kdb/happy-dream',
    description: '연단리 7% 보증으로 안정성과 수익성 동시 확보',
    badge: '',
    category: '변액연금',
    highlight: '연단리 7% 보증'
  },
  {
    id: 'shinhan-more-the-dream',
    name: '신한 모아더드림 Plus 종신보험',
    company: '신한라이프생명',
    logo: '/shinhan-life-logo.png',
    path: '/insurance/whole-life/shinhan/more-the-dream',
    description: '15~70세 전연령 가입 가능, 단기납 완료 후 높은 환급률',
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
    description: '간편심사형 가입 가능, 3대질병 진단시 보험료 환급',
    descriptionNote: '(※특약 가입시)',
    badge: '',
    category: '종신보험',
    highlight: '10년시점 122.78%'
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

// 채팅 시나리오 - 고객(오른쪽 파란색)과 전문가(왼쪽 흰색) 대화
const chatScenarios = [
  // 1. 실손보험 인상 관련
  [
    { role: "customer", text: "실손보험료가 다음달에 또 오른다고 들었는데요 😥" },
    { role: "expert", text: "네 맞아요. 연령 증가분도 있고, 손해율 때문에 전체적으로 인상됩니다." },
    { role: "customer", text: "지금 갈아타면 좀 낫나요?" },
    { role: "expert", text: "현재 조건이 더 유리해요! 지금 미리 점검해드릴게요 👍" }
  ],
  // 2. 종신보험 환급률
  [
    { role: "customer", text: "종신보험 10년 유지하면 130% 환급된다는거 진짜에요?" },
    { role: "expert", text: "네! KB 트리플레벨업이요. 5년납 기준 10년 유지시 130% 보증됩니다." },
    { role: "customer", text: "와 진짜요? 다른데는 그정도 안되던데" },
    { role: "expert", text: "맞아요, 현재 업계 최고 수준이에요. 자세한 설계 보내드릴까요?" }
  ],
  // 3. 암보험 가입 후기
  [
    { role: "customer", text: "저번에 추천해주신 암보험으로 가입했어요!" },
    { role: "expert", text: "오~ 잘 결정하셨어요! 보장 내용 다시 안내드릴까요?" },
    { role: "customer", text: "아뇨 괜찮아요! 주변에도 소개하려구요 ㅎㅎ" },
    { role: "expert", text: "감사해요 😊 궁금한거 있으시면 언제든 연락주세요!" }
  ],
  // 4. 간병인보험 문의
  [
    { role: "customer", text: "부모님이 70대신데 간병인보험 가입 가능한가요?" },
    { role: "expert", text: "네 가능해요! 간편심사형으로 가입 가능한 상품 있습니다." },
    { role: "customer", text: "간병비가 하루에 12만원이라던데 그것도 보장되나요?" },
    { role: "expert", text: "네, 하루 최대 20만원까지 보장되는 상품으로 설계해드릴게요!" }
  ],
  // 5. 보험료 절감
  [
    { role: "customer", text: "보험료가 너무 많이 나가서요... 월 40만원 넘게 내고 있어요" },
    { role: "expert", text: "어머, 좀 많으시네요. 보장 내용 한번 분석해볼까요?" },
    { role: "customer", text: "네 부탁드려요. 뭐가 뭔지 모르겠어서요 ㅠ" },
    { role: "expert", text: "걱정마세요! 꼭 필요한 보장만 남기고 정리해드릴게요 💪" }
  ],
  // 6. 연금보험 문의
  [
    { role: "customer", text: "연금보험 들려고 하는데 IBK랑 KDB 뭐가 나아요?" },
    { role: "expert", text: "IBK는 연단리 8%, KDB는 7% 보증이에요. 목적에 따라 달라요!" },
    { role: "customer", text: "평생 연금으로 받고 싶은데요" },
    { role: "expert", text: "그럼 IBK 평생연금이 더 맞으실 것 같아요. 설계서 보내드릴게요!" }
  ],
  // 7. 달러보험 문의
  [
    { role: "customer", text: "달러로 보험 들면 환율 때문에 손해볼 수도 있지 않나요?" },
    { role: "expert", text: "원화고정납입 옵션 있어요! 매달 동일한 원화로 납입 가능해요." },
    { role: "customer", text: "오 그런게 있어요? 그럼 환율 걱정 없겠네요" },
    { role: "expert", text: "네! 그리고 나중에 달러로 받으면 오히려 이득이 될 수도 있어요 👍" }
  ],
  // 8. 변액연금 문의
  [
    { role: "customer", text: "변액연금은 위험하다고 들었는데 괜찮은가요?" },
    { role: "expert", text: "요즘 상품은 최저보증이 있어서 안전해요! 연단리 7~8% 보증됩니다." },
    { role: "customer", text: "진짜요? 그럼 원금은 보장되는거에요?" },
    { role: "expert", text: "네, 보증형으로 가입하시면 원금 이상 보장돼요. 안심하세요!" }
  ],
  // 9. 종신보험 비교
  [
    { role: "customer", text: "신한이랑 하나 종신보험 중에 고민이에요" },
    { role: "expert", text: "환급률은 비슷한데, 하나는 간편심사가 가능해서 병력 있으시면 유리해요!" },
    { role: "customer", text: "아 저 고혈압 약 먹는데 가능할까요?" },
    { role: "expert", text: "네! 간편심사형으로 가입 가능하세요. 걱정마세요 😊" }
  ],
  // 10. 보장분석 후기
  [
    { role: "customer", text: "보장분석 받아보니까 중복되는게 엄청 많았어요 ㄷㄷ" },
    { role: "expert", text: "많이들 그러세요 ㅠ 정리하니까 어떠세요?" },
    { role: "customer", text: "월 15만원이나 줄었어요!! 진작 할 걸 그랬어요" },
    { role: "expert", text: "다행이에요! 절약한 돈으로 맛있는거 드세요 🍽️" }
  ]
];

export default function HomePage() {
  // 무한 루프를 위해 실제 인덱스는 1부터 시작 (앞에 마지막 슬라이드 복제본이 있음)
  const [displayIndex, setDisplayIndex] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentScenario, setCurrentScenario] = useState(chatScenarios[0]);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const dragStartXRef = useRef<number | null>(null);
  const lastXRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const resumeTimerRef = useRef<any>(null);

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
                                  보험, <span className="text-blue-600">제대로</span> 알고<br className="hidden sm:block" /> 가입하고 계신가요?
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
                                <div className={`${isActive ? 'animate-slide-in-up' : 'opacity-0'}`} style={{animationDelay: '0.4s'}}>
                                  <Link 
                                    href="/insurance/a_consult"
                                    className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm md:text-base transition-all shadow-lg shadow-blue-500/25"
                                  >
                                    무료 상담 신청하기
                                    <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                                  </Link>
                                </div>
                              </div>
                              
                              {/* 오른쪽: 채팅 UI */}
                              <div className={`w-full max-w-xs md:max-w-sm lg:max-w-md ${isActive ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
                                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                                  {/* 채팅 헤더 */}
                                  <div className="bg-blue-600 p-3 md:p-4 flex items-center gap-3">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center text-white text-lg">💬</div>
                                    <div>
                                      <div className="font-bold text-white text-sm md:text-base">보험스토어 전문가</div>
                                      <div className="text-[10px] md:text-xs text-blue-100 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                        실시간 답변 중
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* 채팅 내용 - 전문가 입장에서 보는 화면 (전문가=오른쪽, 고객=왼쪽) */}
                                  <div className="p-3 md:p-4 space-y-2 md:space-y-2.5 bg-gray-50 h-[200px] md:h-[240px] overflow-y-auto">
                                    {Array.isArray(currentScenario) && currentScenario.map((msg, idx) => (
                                      <div key={idx} className={`flex ${msg.role === 'expert' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`${msg.role === 'expert' 
                                          ? 'bg-blue-500 text-white rounded-br-sm' 
                                          : 'bg-white text-gray-800 rounded-bl-sm border border-gray-100'} 
                                          px-2.5 py-1.5 md:px-3 md:py-2 rounded-xl text-[11px] md:text-xs shadow-sm max-w-[85%]`}>
                                          {msg.text}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  
                                  {/* 입력창 */}
                                  <div className="bg-white p-2 md:p-3 border-t border-gray-100 flex gap-2">
                                    <div className="flex-1 bg-gray-100 rounded-full h-8 md:h-9 flex items-center px-3 text-[10px] md:text-xs text-gray-400">메시지를 입력하세요...</div>
                                    <div className="w-8 h-8 md:w-9 md:h-9 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">↑</div>
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
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-500 text-xs flex flex-col gap-1.5">
          <div className="flex justify-center items-center gap-4 mb-2">
            <Image src="/metarich-logo1.png" alt="MetaRich 로고" width={100} height={32} style={{objectFit:'contain',height:'32px'}} />
            <span className="h-6 w-px bg-gray-300 mx-1 inline-block" />
            <Image src="/bohumstore-logo.png" alt="보험스토어 로고" width={100} height={32} style={{objectFit:'contain',height:'32px'}} />
          </div>
          <div>(주)메타리치보험대리점 | 대리점등록번호: 제2023070016호</div>
          <div>보험스토어 | 서지후 | 등록번호: 제20060383110008호</div>
          <div>대표전화: 1533-3776 | 이메일: urisky1@naver.com</div>
          <div className="mt-1">BohumStore. All rights reserved.</div>
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
          onClick={() => window.open('https://pf.kakao.com/_lrubxb/chat', '_blank')}
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

