"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Bars3Icon, XMarkIcon, ChevronDownIcon, ChevronUpIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  // 메뉴 상태 변경 시 커스텀 이벤트 발생 (플로팅 버튼 숨김용)
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('headerMenuChange', { detail: { isOpen: isMenuOpen } }));
  }, [isMenuOpen]);

  // 모바일 메뉴 뒤로가기 버튼 지원
  React.useEffect(() => {
    if (isMenuOpen) {
      // 메뉴가 열릴 때 현재 상태를 히스토리에 추가
      window.history.pushState({ menuOpen: true }, '');

      const handlePopState = () => {
        // 뒤로가기 실행 시 메뉴 닫기
        setIsMenuOpen(false);
        setExpandedMenu(null);
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleSubMenu = (menu: string) => {
    if (expandedMenu === menu) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(menu);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setExpandedMenu(null);
  };

  const menuItems = [
    {
      title: "종신보험",
      titleMain: "종신보험",
      titleSub: "환급률↑",
      titleSubColor: "text-rose-500",
      id: "whole-life",
      subItems: [
        { name: "메트라이프달러종신보험Plus", path: "/insurance/whole-life/metlife/usd", badge: "달러" },
        { name: "신한모아더드림Plus종신보험", path: "/insurance/whole-life/shinhan/more-the-dream", badge: null },
        { name: "하나로THE연결된종신보험", path: "/insurance/whole-life/hana/hanaro", badge: null }
      ]
    },
    {
      title: "연금보험",
      titleMain: "연금보험",
      titleSub: "연금액↑",
      titleSubColor: "text-sky-600",
      id: "annuity-pension",
      subItems: [
        { name: "IBK평생보증받는변액연금보험", path: "/insurance/annuity/ibk/lifetime", badge: null },
        { name: "KDB행복드림변액연금보험", path: "/insurance/annuity/kdb/happy-dream", badge: null },
        { name: "KDB행복플러스연금보험(보증형)", path: "/insurance/annuity/kdb/happy-plus", badge: null }
      ]
    },
    {
      title: "연금보험",
      titleMain: "연금보험",
      titleSub: "환급률↑",
      titleSubColor: "text-rose-500",
      id: "annuity-refund",
      subItems: [
        { name: "오로지연금을위한달러연금보험", path: "/insurance/annuity/metlife/only-dollar", badge: "달러" },
        { name: "PlusPRO연금보험(보증형)", path: "/insurance/annuity/im/plus-pro", badge: null },
        { name: "KB트리플레벨업연금보험(보증형)", path: "/insurance/annuity/kb/triple-level-up", badge: null }
      ]
    },
    {
      title: "일시납연금",
      titleMain: "일시납연금",
      titleSub: "달러",
      titleSubColor: "text-orange-500",
      id: "oneshot-annuity",
      subItems: [
        { name: "AIA달러로받는연금보험II", path: "/insurance/oneshot/aia/dollar", badge: "달러" }
      ]
    },
    {
      title: "건강보험",
      titleMain: "건강보험",
      titleSub: null,
      id: "health",
      subItems: [
        { name: "간병인보험", path: "/insurance/carer", badge: null }
      ]
    }
  ];

  return (
    <>
      <header className="w-full flex items-center justify-center py-6 px-4 md:px-12 bg-[#f8f8f8] border-b border-gray-200 sticky top-0 z-40 shadow-sm relative">
        {/* 로고 (중앙 정렬) */}
        <Link href="/" className="cursor-pointer">
          <Image src="/bohumstore-logo.png" alt="보험스토어 로고" width={220} height={60} priority className="w-[180px] md:w-[220px] h-auto" />
        </Link>

        {/* 햄버거 메뉴 버튼 (우측 끝) */}
        <button
          onClick={toggleMenu}
          className="absolute right-4 md:right-12 p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex flex-col items-center"
          aria-label="메뉴 열기"
        >
          <Bars3Icon className="w-6 h-6 md:w-7 md:h-7" />
          <span className="text-[10px] md:text-xs font-medium mt-0.5">메뉴</span>
        </button>
      </header>

      {/* 사이드바 메뉴 오버레이 */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* 배경 dim 처리 (클릭 시 닫힘) */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={closeMenu}
          ></div>

          {/* 사이드바 패널 */}
          <div className="relative w-[80%] max-w-[320px] h-full bg-white shadow-2xl flex flex-col animate-slide-in-right">
            {/* 사이드바 헤더 */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <span className="font-bold text-lg text-gray-800">전체 메뉴</span>
              <button
                onClick={closeMenu}
                className="p-2 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* 메뉴 목록 */}
            <div className="flex-1 overflow-y-auto py-4">
              <ul className="flex flex-col">
                {/* 상품 메뉴들 */}
                {menuItems.map((item, index) => (
                  <li key={item.id}>
                    {/* 구분선 (첫 번째 항목 제외) */}
                    {index > 0 && (
                      <div className="mx-6 my-3">
                        <div className="border-t-2 border-gray-200"></div>
                      </div>
                    )}

                    <button
                      onClick={() => toggleSubMenu(item.id)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                          {item.titleMain}
                        </span>
                        {item.titleSub && (
                          <span className={`px-2 py-0.5 text-[11px] font-semibold rounded ${item.titleSubColor === 'text-rose-500'
                            ? 'bg-red-50 text-red-600'
                            : item.titleSubColor === 'text-sky-600'
                              ? 'bg-blue-50 text-blue-600'
                              : 'bg-orange-50 text-orange-600'
                            }`}>
                            {item.titleSub}
                          </span>
                        )}
                      </div>
                      {expandedMenu === item.id ? (
                        <ChevronUpIcon className="w-5 h-5 text-blue-600" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                      )}
                    </button>

                    {/* 서브 메뉴 */}
                    <div
                      className={`bg-gray-50 overflow-hidden transition-all duration-100 ${expandedMenu === item.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                      <ul className="py-2 px-6 space-y-1">
                        {item.subItems.map((subItem, idx) => (
                          <li key={idx}>
                            <Link
                              href={subItem.path}
                              onClick={closeMenu}
                              className="flex items-center gap-2 py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:font-medium transition-colors pl-2 border-l-2 border-transparent hover:border-blue-300"
                            >
                              <span>{subItem.name}</span>
                              {subItem.badge && (
                                <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-orange-50 text-orange-600">
                                  {subItem.badge}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}

                {/* 상담신청 메뉴 (단독) */}
                <li className="mt-6 px-6">
                  <div className="space-y-2">
                    <div className="relative">
                      <div className="absolute -top-3 sm:-top-4 left-0 right-0 flex justify-center z-10">
                        <span className="bg-gradient-to-r from-red-500 to-rose-500 text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-lg animate-bounce whitespace-nowrap">
                          무료 상담
                        </span>
                      </div>
                      <Link
                        href="/insurance/a_consult"
                        onClick={closeMenu}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-3.5 text-base transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
                      >
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
                          <path strokeLinecap='round' strokeLinejoin='round' d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                        </svg>
                        상담신청
                      </Link>
                    </div>
                    <a
                      href="https://pf.kakao.com/_lrubxb/chat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#fee500] text-[#3d1e1e] font-bold rounded-xl py-3.5 text-base flex items-center justify-center gap-2 hover:opacity-95 transition cursor-pointer shadow-lg shadow-[#fee500]/25"
                    >
                      <ChatBubbleLeftRightIcon className="w-5 h-5" />
                      채팅상담
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* 하단 간결한 문구 */}
            <div className="p-4 text-center border-t border-gray-100">
              <div className="text-[10px] text-gray-500">© 보험스토어</div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.1s ease-out forwards;
        }
      `}</style>
    </>
  )
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  )
}
