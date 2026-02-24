'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import { useResponsive } from '@/hooks/useResponsive';
import { useRef, useEffect } from 'react';
import { Bars3Icon, XMarkIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const { isMobile } = useResponsive();
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [isMobile]);

  const menuItems = [
    {
      title: '건강보험',
      id: 'health',
      subItems: [{ name: '간병인보험', path: '/insurance/carer' }],
    },
    {
      title: '종신보험',
      id: 'whole-life',
      subItems: [
        { name: '메트라이프달러종신보험Plus', path: '/insurance/whole-life/metlife/usd' },
        {
          name: '신한모아더드림Plus종신보험',
          path: '/insurance/whole-life/shinhan/more-the-dream',
        },
        { name: '하나로THE연결된종신보험', path: '/insurance/whole-life/hana/hanaro' },
      ],
    },
    {
      title: '연금보험',
      id: 'annuity',
      subItems: [
        { name: 'KB트리플레벨업연금보험(보증형)', path: '/insurance/annuity/kb/triple-level-up' },
        { name: 'KDB행복플러스연금보험(보증형)', path: '/insurance/annuity/kdb/happy-plus' },
      ],
    },
    {
      title: '변액연금보험',
      id: 'variable-annuity',
      subItems: [
        { name: 'IBK평생보증받는변액연금보험', path: '/insurance/annuity/ibk/lifetime' },
        { name: 'KDB행복드림변액연금보험', path: '/insurance/annuity/kdb/happy-dream' },
      ],
    },
  ];

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-40 flex w-full items-center justify-between bg-[var(--background)] ${isMobile ? 'px-6 py-3' : 'px-[73px] py-[24px]'}`}
        onMouseLeave={() => {
          if (!isMobile) {
            setHoveredCategory(null);
            setIsMegaMenuOpen(false);
          }
        }}
      >
        <Link href="/" className="cursor-pointer">
          <Image
            src="/images/logos/bohumstore-logo.png"
            alt="보험스토어 로고"
            width={isMobile ? 100 : 130}
            height={isMobile ? 24 : 32}
          />
        </Link>

        {/* 데스크탑: 메뉴 아이템 */}
        {!isMobile && (
          <div className='flex justify-between gap-6 items-center'>
            {menuItems.filter(item => item.subItems.length > 0).map((item) => (
              <div
                key={item.id}
                className={`flex items-center w-24 justify-center heading-5 cursor-pointer transition-colors duration-200 ${hoveredCategory === item.id ? 'text-brand-primary' : 'text-text-primary'}`}
                onMouseEnter={() => {
                  setHoveredCategory(item.id);
                  setIsMegaMenuOpen(true);
                }}
              >
                {item.title}
              </div>
            ))}
          </div>
        )}

        {/* 모바일: 햄버거/X 토글 버튼 */}
        {isMobile ? (
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-lg hover:bg-page-bg transition-colors"
            aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-7 h-7 text-text-secondary" />
            ) : (
              <Bars3Icon className="w-7 h-7 text-text-secondary" />
            )}
          </button>
        ) : (
          <Link href="/insurance/a_consult">
            <Button text="상담 신청" />
          </Link>
        )}

        {/* 데스크탑: 메가메뉴 */}
        {!isMobile && (
          <div
            className={`absolute left-0 top-full w-full bg-white shadow-xl border-t border-border-default transition-all duration-300 ease-in-out overflow-hidden z-[-1] ${
              isMegaMenuOpen ? 'max-h-[500px] opacity-100 visible' : 'max-h-0 opacity-0 invisible'
            }`}
          >
            <div className="mx-auto w-full max-w-[1440px] px-[73px] py-10">
              <div className="flex gap-8">
                <div className="flex-1 grid grid-cols-4 gap-4">
                  {menuItems.filter(item => item.subItems.length > 0).map((category) => (
                    <div
                      key={category.id}
                      className={`p-6 rounded-xl transition-all duration-200 ${
                        hoveredCategory === category.id
                          ? 'bg-brand-primary-soft scale-[1.02] shadow-sm'
                          : 'hover:bg-page-bg'
                      }`}
                      onMouseEnter={() => setHoveredCategory(category.id)}
                    >
                      <h3 className={`text-lg font-bold mb-4 ${
                        hoveredCategory === category.id ? 'text-brand-primary' : 'text-text-primary'
                      }`}>
                        {category.title}
                      </h3>
                      <ul className="space-y-3">
                        {category.subItems.map((subItem, idx) => (
                          <li key={idx}>
                            <Link
                              href={subItem.path}
                              onClick={() => {
                                setHoveredCategory(null);
                                setIsMegaMenuOpen(false);
                              }}
                              className={`text-sm block py-1 transition-colors ${
                                hoveredCategory === category.id
                                  ? 'text-text-secondary font-medium hover:text-brand-primary'
                                  : 'text-text-muted hover:text-text-primary'
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="w-[420px] shrink-0">
                  <div className="h-full rounded-2xl bg-brand-primary-soft p-10 relative overflow-hidden group cursor-pointer border border-brand-primary-soft">
                    <div className="relative z-10">
                      <h3 className="text-[28px] font-extrabold text-brand-primary tracking-tight mb-3">
                        보험이 어렵다면
                      </h3>
                      <p className="text-text-muted text-lg mb-8 leading-snug font-medium">
                        보험스토어 보험 전문가에게<br/>
                        부담없이 물어보세요!
                      </p>
                      <Link href="/insurance/a_consult">
                        <Button variant="primary" size="lg" className="rounded-xl shadow-[0_4px_12px_rgba(31,111,235,0.25)] hover:shadow-[0_6px_16px_rgba(31,111,235,0.35)]">
                          상담하기
                        </Button>
                      </Link>
                    </div>
                    <div className="absolute right-0 bottom-0 w-[240px] h-[220px]">
                      <Image
                        src="/svgs/header-expanded-counsel.svg"
                        alt="상담 캐릭터"
                        fill
                        className="object-contain object-right-bottom transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ============================================= */}
      {/* 모바일: 좌측 슬라이드 드로어 메뉴              */}
      {/* ============================================= */}
      {isMobile && (
        <>
          {/* 드로어 패널 (헤더 아래에서 좌→우 슬라이드) */}
          <div
            className={`fixed left-0 z-30 w-full bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            style={{ top: `${headerHeight}px`, height: `calc(100dvh - ${headerHeight}px)` }}
          >

            {/* 드로어 메뉴 목록 (아코디언) */}
            <div className="flex-1 overflow-y-auto">
              {menuItems.map((category) => {
                const isExpanded = expandedCategory === category.id;
                const hasSubItems = category.subItems.length > 0;
                return (
                  <div key={category.id} className="border-b border-border-default">
                    <button
                      onClick={() => hasSubItems && toggleCategory(category.id)}
                      className={`flex items-center justify-between w-full px-5 py-4 text-left transition-colors ${
                        isExpanded ? 'bg-brand-primary-soft border-l-4 border-brand-primary' : 'hover:bg-page-bg border-l-4 border-transparent'
                      }`}
                    >
                      <span className={`text-base font-semibold ${isExpanded ? 'text-brand-primary' : 'text-text-primary'}`}>
                        {category.title}
                      </span>
                      {hasSubItems && (
                        isExpanded ? (
                          <ChevronDownIcon className="w-5 h-5 text-brand-primary" />
                        ) : (
                          <ChevronRightIcon className="w-5 h-5 text-text-disabled" />
                        )
                      )}
                    </button>

                    {/* 서브 아이템 (아코디언 펼침) */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                      style={isExpanded ? { borderLeft: '4px solid var(--brand-primary, #3B82F6)' } : {}}
                    >
                      <div className={`pb-3 ${isExpanded ? 'bg-brand-primary-soft' : ''}`}>
                        {category.subItems.map((subItem, idx) => (
                          <Link
                            key={idx}
                            href={subItem.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-2 px-8 py-2 text-sm text-text-muted hover:text-brand-primary transition-colors"
                          >
                            <span className="w-1 h-1 rounded-full bg-text-disabled flex-shrink-0" />
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 드로어 하단 CTA */}
            <div className="p-5 border-t border-border-default">
              <Link
                href="/insurance/a_consult"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full"
              >
                <Button variant="primary" size="lg" fullWidth>
                  상담신청
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
