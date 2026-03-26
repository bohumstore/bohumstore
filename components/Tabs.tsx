'use client';

import React, { ReactNode, useRef, useState } from 'react';
import MobileAccordionWrapper from '@/components/MobileAccordionWrapper';

interface Tab {
  label: string;
  content: ReactNode;
}

export default function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0].label);
  const contentRef = useRef<HTMLDivElement>(null);

  function handleTabClick(label: string) {
    setActive(label);
    // 모바일에서 탭 전환 시 nav 바로 아래(콘텐츠 시작)로 스크롤
    if (window.innerWidth < 1024 && contentRef.current) {
      const navHeight = 64 + 48; // 헤더(64px) + 탭 nav(48px)
      const top = contentRef.current.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  return (
    <div>
      {/* ── 모바일: 필 버튼 스타일 탭 (lg 이하) - sticky ── */}
      <nav className="zfold-tabs scrollbar-hide flex overflow-x-auto lg:hidden bg-brand-secondary-hover -mx-3 sm:-mx-4 sticky top-[64px] z-30">
        {tabs.map(({ label }) => (
          <button
            key={label}
            onClick={() => handleTabClick(label)}
            className={`zfold-tab-button flex-1 py-3 text-center transition-all duration-200 heading-5 break-keep leading-snug ${
              active === label
                ? 'bg-brand-primary text-text-inverse'
                : 'text-text-primary'
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* ── 데스크탑: 언더라인 탭 (md 이상) ── */}
      <nav className="hidden lg:flex border-b">
        {tabs.map(({ label }) => (
          <button
            key={label}
            onClick={() => setActive(label)}
            className={`relative flex-1 cursor-pointer whitespace-nowrap outline-none pb-4 heading-3 transition after:absolute after:bottom-0 after:left-0 after:h-[4px] rounded-full after:w-full after:content-[''] ${
              active === label
                ? 'text-brand-primary after:bg-brand-primary-disabled'
                : 'text-brand-primary/60 after:bg-transparent hover:text-brand-primary hover:after:bg-brand-primary/30'
            } `}
          >
            {label}
          </button>
        ))}
      </nav>

      <div ref={contentRef}>
        {tabs.map((tab) =>
          tab.label === active ? (
            <div key={tab.label} className="bg-white lg:bg-[--page-bg] px-4 py-4 animate-fade-in lg:shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)]">
              <MobileAccordionWrapper>
                {tab.content}
              </MobileAccordionWrapper>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
