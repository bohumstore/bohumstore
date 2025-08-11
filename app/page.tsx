"use client";
import Image from "next/image";
import React from "react";
import { HomeIcon, UserGroupIcon, FireIcon, HeartIcon, UserIcon, BriefcaseIcon, CurrencyDollarIcon, ScaleIcon, ChartBarIcon, AcademicCapIcon, ShieldCheckIcon, SparklesIcon, ChatBubbleLeftRightIcon, MagnifyingGlassIcon, DocumentIcon, CalculatorIcon, HandRaisedIcon } from "@heroicons/react/24/outline";

const navItems = [
  { label: "종합", icon: <HomeIcon className="w-5 h-5 text-pink-300" />, mobileIcon: "📦", subItems: ["실손의료보험", "질병보험", "상해보험", "입원보험"] },
  { label: "어린이", icon: <UserGroupIcon className="w-5 h-5 text-yellow-300" />, mobileIcon: "��", subItems: ["어린이보험", "교육보험", "어린이실손보험"] },
  { label: "암·뇌·심장", icon: <FireIcon className="w-5 h-5 text-orange-300" />, mobileIcon: "🫀", subItems: ["화재보험", "재물보험", "배상책임보험"] },
  { label: "수술비", icon: <HeartIcon className="w-5 h-5 text-red-300" />, mobileIcon: "💉", subItems: ["암보험", "뇌혈관보험", "심장질환보험"] },
  { label: "유병자", icon: <UserIcon className="w-5 h-5 text-green-300" />, mobileIcon: "🏥", subItems: ["정기보험", "종신보험", "연금보험"] },
  { label: "간병인", icon: <BriefcaseIcon className="w-5 h-5 text-blue-300" />, mobileIcon: "👨‍⚕️", subItems: ["운전자보험", "자동차보험", "교통사고보험"] },
  { label: "종신", icon: <AcademicCapIcon className="w-5 h-5 text-purple-300" />, mobileIcon: "🦷", subItems: ["치아보험", "치과보험", "치아교정보험"] },
  { label: "연금", icon: <CurrencyDollarIcon className="w-5 h-5 text-yellow-200" />, mobileIcon: "💰", subItems: ["유병자보험", "만성질환보험", "장애인보험"] },
  { label: "배상책임", icon: <ScaleIcon className="w-5 h-5 text-indigo-300" />, mobileIcon: "⚖️", subItems: ["반려동물보험", "애완동물보험", "수의사비용보험"] },
  { label: "보장분석", icon: <ChartBarIcon className="w-5 h-5 text-cyan-300" />, mobileIcon: "📊", subItems: ["보험료계산", "보장내용분석", "보험가입가이드"] }
];

const mainCategories = [
  { icon: "📦", label: "종합" },
  { icon: "🦠", label: "암" },
  { icon: "🏥", label: "건강" },
  { icon: "🚗", label: "운전자" },
  { icon: "🩺", label: "유병자" },
  { icon: "⏰", label: "정기" },
  { icon: "🦷", label: "치아" },
  { icon: "🚙", label: "자동차" },
  { icon: "🐾", label: "펫" },
  { icon: "📈", label: "보장분석" },
];

export default function Home() {
  const [hoveredMenu, setHoveredMenu] = React.useState<number | null>(null);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = React.useState(false);
  const [currentBanner, setCurrentBanner] = React.useState(0);
  const [animateIn, setAnimateIn] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  // 햄버거 메뉴 오픈 상태
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  // 탭 상태: '보장별' 또는 '보험사별'
  const [activeTab, setActiveTab] = React.useState<'보장별' | '보험사별'>('보장별');
  // 메인 탭 상태: '보장별' 또는 '보험사별'
  const [mainTab, setMainTab] = React.useState<'보장별' | '보험사별'>('보장별');

  const bannerData = [
    {
      category: '암보험',
      bgColor: '#C23B22',
      title: '암 진단 시 100% 보장',
      subtitle: '암 진단비 최대 1억원',
      features: [
        '암 진단비 최대 1억원',
        '암 수술비 최대 5천만원',
        '암 입원비 일일 20만원'
      ]
    },
    {
      category: '종합보험',
      bgColor: '#5F9EA0',
      title: '다양한 보장을 한번에',
      subtitle: '실손의료 + 상해보험',
      features: [
        '실손의료비 최대 1억원',
        '상해치료비 최대 3천만원',
        '입원비 일일 15만원'
      ]
    },
    {
      category: '어린이보험',
      bgColor: '#79C7C7',
      title: '우리 아이의 건강한 미래',
      subtitle: '어린이 특화 보장',
      features: [
        '어린이 특화 보장',
        '교육자금 보장',
        '입원비 일일 10만원'
      ]
    },
    {
      category: '치아보험',
      bgColor: '#800080',
      title: '건강한 치아 관리',
      subtitle: '치과 치료비 보장',
      features: [
        '치과 치료비 최대 1천만원',
        '임플란트 보장',
        '정기 검진 보장'
      ]
    },
    {
      category: '태아보험',
      bgColor: '#FFD700',
      title: '태아부터 시작하는 건강',
      subtitle: '태아 특화 보장',
      features: [
        '태아 특화 보장',
        '출산비 보장',
        '신생아 특약'
      ]
    },
    {
      category: '운전자보험',
      bgColor: '#6B8E23',
      title: '안전한 운전을 위한 선택',
      subtitle: '운전자 특화 보장',
      features: [
        '교통사고 특화 보장',
        '자동차 수리비 보장',
        '법적 책임 보장'
      ]
    }
  ];

  // 보장별 상품 리스트 예시 (Outline SVG 아이콘, 파스텔톤 컬러, 20개 이상)
  const coverageList = [
    { label: '추천 원클릭 비교', icon: <HandRaisedIcon className="w-6 h-6 text-[#B4E197]" /> },
    { label: '내보험찾기', icon: <MagnifyingGlassIcon className="w-6 h-6 text-[#A7C7E7]" /> },
    { label: '유병자보험', icon: <UserIcon className="w-6 h-6 text-[#F7B267]" />, badge: 'HOT' },
    { label: '무해지 건강보험', icon: <DocumentIcon className="w-6 h-6 text-[#B4AEE8]" /> },
    { label: '수술·입원비보험', icon: <DocumentIcon className="w-6 h-6 text-[#B4E197]" /> },
    { label: '암보험', icon: <FireIcon className="w-6 h-6 text-[#F4845F]" />, shimmer: true },
    { label: '어린이보험', icon: <UserGroupIcon className="w-6 h-6 text-[#F7B267]" /> },
    { label: '운전자보험', icon: <HomeIcon className="w-6 h-6 text-[#A7C7E7]" /> },
    { label: '간호간병보험', icon: <BriefcaseIcon className="w-6 h-6 text-[#B4E197]" /> },
    { label: '치매간병보험', icon: <ScaleIcon className="w-6 h-6 text-[#B4AEE8]" /> },
    { label: '종신·정기보험', icon: <UserIcon className="w-6 h-6 text-[#B4E197]" /> },
    { label: '연금보험', icon: <CurrencyDollarIcon className="w-6 h-6 text-[#B4E197]" /> },
    { label: '치아보험', icon: <AcademicCapIcon className="w-6 h-6 text-[#A7C7E7]" /> },
    { label: '골프·주택화재보험', icon: <ShieldCheckIcon className="w-6 h-6 text-[#B4E197]" /> },
    { label: '6월 추천보험', icon: <SparklesIcon className="w-6 h-6 text-[#F7B267]" /> },
    { label: '보험리모델링', icon: <ChartBarIcon className="w-6 h-6 text-[#B4E197]" /> },
    { label: '보험나이계산기', icon: <CalculatorIcon className="w-6 h-6 text-[#A7C7E7]" /> },
    { label: '뉴스&칼럼', icon: <ChatBubbleLeftRightIcon className="w-6 h-6 text-[#B4AEE8]" /> },
  ];
  // 보험사별 상품 리스트 예시 (아이콘 포함)
  const companyList = [
    { label: '삼성화재', icon: '🏢' },
    { label: 'DB손해보험', icon: '🏢' },
    { label: 'KB손해보험', icon: '🏢' },
    { label: 'MG손해보험', icon: '🏢' },
    { label: 'NH농협손해보험', icon: '🏢' },
    { label: '롯데손해보험', icon: '🏢' },
    { label: '메리츠화재', icon: '🏢' },
    { label: '한화손해보험', icon: '🏢' },
    { label: '현대해상', icon: '🏢' },
    { label: '흥국화재', icon: '🏢' },
    { label: 'AIA생명', icon: '🏢' },
    { label: 'IBK연금보험', icon: '🏢' },
    { label: '교보생명', icon: '🏢' },
    { label: '동양생명', icon: '🏢' },
    { label: '라이프생명', icon: '🏢' },
    { label: '미래에셋생명', icon: '🏢' },
    { label: '삼성생명', icon: '🏢' },
    { label: '흥국생명', icon: '🏢' },
  ];

  // 5초마다 배너 자동 전환
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isPaused) {
      timer = setInterval(() => {
        setCurrentBanner((prev) => (prev + 1) % bannerData.length);
      }, 5000);
    }

    return () => clearInterval(timer);
  }, [isPaused]);

  // Animation trigger for banner content
  React.useEffect(() => {
    setAnimateIn(false); // Reset animation state
    const timeoutId = setTimeout(() => {
      setAnimateIn(true); // Trigger slide-in animation
    }, 50); // Small delay to allow initial state to render
    return () => clearTimeout(timeoutId);
  }, [currentBanner]);

  // Debugging log
  React.useEffect(() => {
    console.log("Current Banner Index:", currentBanner);
    console.log("Current Banner Color:", bannerData[currentBanner].bgColor);
  }, [currentBanner]);

  // 메뉴에 마우스 올리면 메가메뉴 열림, 나가면 닫힘
  const handleMenuEnter = (idx: number) => {
    setHoveredMenu(idx);
    setIsMegaMenuOpen(true);
  };
  const handleMenuLeave = () => {
    setHoveredMenu(null);
    setIsMegaMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <style jsx>{`
        /* Hide scrollbar for Webkit browsers */
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .overflow-x-auto {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
      {/* 상단 네비게이션 */}
      <header className={`sticky top-0 z-50 bg-white border-b border-gray-200 ${isMegaMenuOpen ? "shadow-lg" : ""}`}>
        {/* 모바일: 로고+햄버거만 */}
        <div className="flex items-center justify-between px-4 py-4 md:hidden border-b">
          <button
            className="p-2"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="메뉴 열기"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-700">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-1 flex justify-center">
            <Image src="/bohumstore-logo.png" alt="보험스토어 로고" height={40} width={120} className="h-10 w-auto md:h-[60px] md:w-[220px]" priority />
          </div>
          <div className="w-10" /> {/* 우측 여백 맞춤 */}
        </div>
        {/* 데스크탑: 네비게이션, 메가메뉴 등 */}
        <div className="hidden md:block">
          <div className="flex items-center justify-center w-full py-6 border-b border-gray-200">
            <Image src="/bohumstore-logo.png" alt="보험스토어 로고" height={60} width={220} priority />
          </div>
          {/* 모바일 메뉴 (md 미만에서만 보임) */}
          <nav className="w-full border-b border-gray-200 bg-white md:hidden px-2 py-2">
            <div className="grid grid-cols-5 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  className="flex flex-col items-center justify-center rounded-xl bg-white shadow-sm py-2 px-1 text-xs font-semibold transition hover:bg-blue-50"
                >
                  <span>{item.icon}</span>
                  <span className="mt-1">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>
          {/* 웹 메뉴 (md 이상에서만 보임) */}
          <nav className="w-full border-b border-gray-200 bg-white hidden md:block">
            <ul className="flex justify-center items-center gap-6">
              {navItems.map((item, idx) => (
                <li key={item.label}>
                  <a
                    href="#"
                    className={`flex items-center gap-2 px-3 py-5 text-[1.1875rem] font-semibold border-b-2 border-transparent transition-colors duration-150
                      ${hoveredMenu === idx && isMegaMenuOpen ? "text-[#3a8094] !border-[#3a8094]" : "hover:text-[#3a8094] hover:!border-[#3a8094]"}
                    `}
                    onMouseEnter={() => handleMenuEnter(idx)}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* 메가 메뉴 */}
        {isMegaMenuOpen && (
          <div
            className="absolute left-0 top-full w-full bg-white border-t border-gray-200 shadow-xl z-50 px-0 py-4 animate-fadeIn"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={handleMenuLeave}
          >
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
              {navItems.map((item, idx) => (
                <div
                  key={item.label}
                  className={`px-3 py-2 rounded-lg transition ${
                    hoveredMenu === idx ? "bg-blue-50" : ""
                  }`}
                >
                  <div
                    className={`font-bold mb-1 text-sm md:text-base flex items-center gap-1 transition-all duration-200 ${
                      hoveredMenu === idx ? "text-[#3a8094]" : "text-gray-800"
                    }`}
                  >
                    {item.icon} {item.label}
                  </div>
                  <ul className="space-y-0.5">
                    {item.subItems.map((sub, subIdx) => (
                      <li key={subIdx}>
                        <a
                          href="#"
                          className={`block px-1 py-0.5 rounded text-gray-700 text-xs md:text-sm transition-all duration-150 hover:font-bold hover:scale-105 hover:text-blue-700 ${
                            hoveredMenu === idx ? "font-semibold" : ""
                          }`}
                        >
                          {sub}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* 햄버거 메뉴 오버레이 (모바일) */}
        {isDrawerOpen && (
          <div className="fixed inset-0 z-[999] bg-gradient-to-b from-orange-100 to-white flex flex-col md:hidden animate-fadeIn">
            {/* 상단 닫기 및 주요 아이콘 */}
            <div className="flex items-center justify-between px-4 py-4 border-b bg-gradient-to-r from-orange-400 to-orange-300">
              <span className="font-bold text-lg text-white">회원가입/로그인</span>
              <button onClick={() => setIsDrawerOpen(false)} aria-label="닫기">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* 주요 아이콘 메뉴 */}
            <div className="grid grid-cols-4 gap-2 px-4 py-3 bg-white border-b">
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 text-2xl mb-1">24h</div>
                <span className="text-xs font-semibold text-gray-700 text-center">24시간 상담신청</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 text-2xl mb-1">50D</div>
                <span className="text-xs font-semibold text-gray-700 text-center">내보험찾기</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 text-2xl mb-1">4AC</div>
                <span className="text-xs font-semibold text-gray-700 text-center">상담게시판</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 text-2xl mb-1">697</div>
                <span className="text-xs font-semibold text-gray-700 text-center">자동차보험비교</span>
              </div>
            </div>
            {/* 탭 UI */}
            <div className="flex border-b bg-white">
              <button
                className={`flex-1 py-3 text-base font-semibold ${activeTab === '보장별' ? 'border-b-2 border-orange-500 text-orange-600 bg-orange-50' : 'text-gray-700 bg-white'}`}
                onClick={() => setActiveTab('보장별')}
              >
                보장별 상품비교
              </button>
              <button
                className={`flex-1 py-3 text-base font-semibold ${activeTab === '보험사별' ? 'border-b-2 border-orange-500 text-orange-600 bg-orange-50' : 'text-gray-700 bg-white'}`}
                onClick={() => setActiveTab('보험사별')}
              >
                보험사별 상품비교
              </button>
            </div>
            {/* 탭별 리스트 */}
            <div className="flex-1 overflow-y-auto p-4 bg-white">
              {activeTab === '보장별' ? (
                <div className="grid grid-cols-2 gap-2">
                  {coverageList.map((item) => (
                    <button
                      key={item.label}
                      className={`flex flex-row items-center justify-start gap-2 py-2 px-2 pl-3 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition font-medium text-gray-800 min-h-[44px] text-left relative overflow-hidden`}
                    >
                      {item.badge && (
                        <span className="absolute top-2 right-3 px-1 py-0 rounded-full text-[10px] font-bold bg-red-500 text-white z-10 shadow animate-pulse">{item.badge}</span>
                      )}
                      {item.label === '연금보험' && (
                        <span className="absolute top-2 right-3 px-1 py-0 rounded-full text-[10px] font-bold bg-[#2563eb] text-white z-10 shadow animate-pulse">NEW</span>
                      )}
                      {item.icon}
                      <span className="text-sm whitespace-nowrap ml-2">{item.label}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {companyList.map((item) => (
                    <button
                      key={item.label}
                      className="flex items-center gap-2 py-4 px-3 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition font-medium text-gray-800"
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-xs">{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* 하단 프로모션 영역 */}
            <div className="bg-orange-50 border-t px-4 py-3">
              <div className="font-bold text-orange-700 mb-2">6월 추천 간호간병보험</div>
              <div className="bg-white rounded-lg shadow p-3 mb-2 text-xs text-gray-700">(무)A예게맞춘간편 3.5.5건강보험2307·무해지(납입중60%납입후50%)_간병인플랜</div>
              <div className="font-bold text-orange-700 mb-2">6월 추천 실손의료보험</div>
              <div className="bg-white rounded-lg shadow p-3 text-xs text-gray-700">(무)프로미라이프 실손의료비보험2404</div>
            </div>
          </div>
        )}
      </header>

      {/* 모바일 전용 탭+리스트 (헤더 아래) */}
      <section className="md:hidden w-full bg-white border-b">
        <div className="flex">
          <button
            className={`flex-1 py-3 text-base font-semibold ${mainTab === '보장별' ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50' : 'text-gray-700 bg-white'}`}
            onClick={() => setMainTab('보장별')}
          >
            보장별 상품비교
          </button>
          <button
            className={`flex-1 py-3 text-base font-semibold ${mainTab === '보험사별' ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50' : 'text-gray-700 bg-white'}`}
            onClick={() => setMainTab('보험사별')}
          >
            보험사별 상품비교
          </button>
        </div>
        <div className="p-3">
          {mainTab === '보장별' ? (
            <div className="grid grid-cols-2 gap-2">
              {coverageList.map((item) => (
                <button
                  key={item.label}
                  className={`flex flex-row items-center justify-start gap-2 py-2 px-2 pl-3 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition font-medium text-gray-800 min-h-[44px] text-left relative overflow-hidden`}
                >
                  {item.badge && (
                    <span className="absolute top-2 right-3 px-1 py-0 rounded-full text-[10px] font-bold bg-red-500 text-white z-10 shadow animate-pulse">{item.badge}</span>
                  )}
                  {item.label === '연금보험' && (
                    <span className="absolute top-2 right-3 px-1 py-0 rounded-full text-[10px] font-bold bg-[#2563eb] text-white z-10 shadow animate-pulse">NEW</span>
                  )}
                  {item.icon}
                  <span className="text-sm whitespace-nowrap ml-2">{item.label}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {companyList.map((item) => (
                <button
                  key={item.label}
                  className="flex items-center gap-2 py-4 px-3 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition font-medium text-gray-800"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-xs">{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 메인 프로모션 섹션 */}
      <main className={`w-full py-12 md:py-20 relative overflow-hidden transition-colors duration-500 ${isMegaMenuOpen ? 'blur-sm' : ''}`} style={{ backgroundColor: bannerData[currentBanner].bgColor }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center md:items-start gap-8 px-4 relative z-10 min-h-[60vh] md:min-h-0">
          {/* 상품 검색/상담 폼 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md order-1">
            <h2 className="text-lg font-bold mb-4 text-gray-800">어떤 상품을 찾으세요?</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {bannerData.map((banner, index) => (
                <button
                  key={banner.category}
                  onClick={() => setCurrentBanner(index)}
                  className={`${
                    currentBanner === index
                      ? 'bg-[#3a8094] text-white'
                      : 'bg-gray-100 text-gray-700'
                  } px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-200`}
                >
                  {banner.category}
                </button>
              ))}
            </div>
            <form className="flex flex-col gap-3">
              <div className="flex gap-4 items-center">
                <span className="text-sm text-gray-700">성별</span>
                <label className="flex items-center gap-1 text-sm">
                  <input type="radio" name="gender" className="accent-[#4ba1b7]" /> 남자
                </label>
                <label className="flex items-center gap-1 text-sm">
                  <input type="radio" name="gender" className="accent-[#4ba1b7]" /> 여자
                </label>
              </div>
              <input type="text" placeholder="생년월일 (6자리)" className="border rounded px-3 py-2 text-sm" maxLength={6} />
              <input type="text" placeholder="연락처 - 없이 입력하세요." className="border rounded px-3 py-2 text-sm" />
              <input type="text" placeholder="이름을 입력하세요." className="border rounded px-3 py-2 text-sm" />
              <button type="submit" className="bg-[#3a8094] text-white font-bold rounded-full py-3 mt-2 text-base hover:opacity-90 transition">보험료 확인하기</button>
            </form>
          </div>
          {/* 프로모션 텍스트 & 이미지 */}
          <div 
            key={currentBanner}
            className={`
              flex-1 flex flex-col items-center md:items-start text-white relative pl-0 md:pl-8 text-center md:text-left order-2 md:order-2
              transition-all duration-500 ease-out
              ${
                animateIn ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
              }
            `}
          >
            <p className="text-base md:text-lg font-semibold mb-2" style={{color: bannerData[currentBanner].bgColor}}>{bannerData[currentBanner].category}</p>
            <p className="text-2xl md:text-3xl font-bold mb-1">{bannerData[currentBanner].title}</p>
            <p className="text-xl md:text-2xl font-bold mb-4">{bannerData[currentBanner].subtitle}</p>
            <ul className="list-disc pl-4 space-y-2 text-base md:text-lg">
              {bannerData[currentBanner].features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            {/* 이미지 (강아지, 고양이, 구급상자, 보장확대) */}
            <div className="absolute bottom-[-100px] right-[-150px] w-[500px] h-[400px] md:w-[750px] md:h-[550px] hidden md:block z-0">
                <Image 
                    src={`https://via.placeholder.com/750x550?text=${bannerData[currentBanner].category}`}
                    alt={`${bannerData[currentBanner].category} 이미지`}
                    layout="fill"
                    objectFit="contain"
                    objectPosition="bottom right"
                    unoptimized
                />
            </div>
          </div>
        </div>
        {/* 슬라이드 인디케이터 및 재생/일시정지 버튼 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20 items-center">
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className="text-white opacity-80 hover:opacity-100 transition-opacity duration-200 p-1 rounded-full bg-black/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
            </svg>
          </button>
          {bannerData.map((_, index) => (
            <div
              key={index}
              onClick={() => {
                setCurrentBanner(index);
                setIsPaused(true); // Pause on manual selection
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentBanner === index ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        <div className="text-center absolute bottom-2 left-1/2 -translate-x-1/2 text-white text-xs opacity-80 z-20">보험스토어 공식 보험상품몰</div>
      </main>

      {/* 하단 주요 상품 아이콘 메뉴 */}
      <section className={`bg-white py-8 border-t border-gray-200 transition-all duration-300 ${isMegaMenuOpen ? 'blur-sm' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <div
            className="grid grid-cols-5 md:grid-cols-10 gap-4 justify-items-center"
          >
            {mainCategories.map((cat) => (
              <div 
                key={cat.label} 
                className="flex flex-col items-center gap-2 w-full max-w-[100px] group cursor-pointer transition-all duration-300 hover:scale-105"
              >
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100 text-4xl mb-1 transition-all duration-300 group-hover:bg-blue-100 group-hover:shadow-lg">
                  {cat.icon}
                </div>
                <span className="text-sm font-semibold text-gray-700 text-center whitespace-nowrap transition-colors duration-300 group-hover:text-blue-600">{cat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* 푸터 */}
      <footer className={`bg-[#f8f8f8] border-t border-gray-200 py-8 mt-4 transition-all duration-300 ${isMegaMenuOpen ? 'blur-sm' : ''}`}>
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-500 text-sm flex flex-col gap-2">
          <div className="font-bold text-gray-700">보험스토어</div>
          <div>대표: 홍길동 | 사업자등록번호: 123-45-67890 | 이메일: info@bohumstore.com</div>
          <div>주소: 서울특별시 강남구 테헤란로 123, 10층</div>
          <div className="mt-2">© {new Date().getFullYear()} BohumStore. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
