'use client';

import React, { ReactNode, useState } from 'react';
import MobileAccordionWrapper from '@/components/MobileAccordionWrapper';

interface Tab {
  label: string;
  content: ReactNode;
}

export default function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0].label);

  return (
    <div>
      {/* ── 모바일: 필 버튼 스타일 탭 (md 이하) ── */}
      <nav className="flex md:hidden bg-brand-primary-soft -mx-3 sm:-mx-4">
        {tabs.map(({ label }) => (
          <button
            key={label}
            onClick={() => setActive(label)}
            className={`flex-1 py-3 text-center transition-all duration-200 heading-5 text-[0.9rem] ${
              active === label
                ? 'bg-brand-primary text-text-inverse shadow-sm'
                : 'text-text-primary hover:bg-white/50'
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* ── 데스크탑: 언더라인 탭 (md 이상) ── */}
      <nav className="hidden md:flex border-b">
        {tabs.map(({ label }) => (
          <button
            key={label}
            onClick={() => setActive(label)}
            className={`relative flex-1 cursor-pointer whitespace-nowrap outline-none pb-4 heading-3 transition after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-full after:content-[''] ${
              active === label
                ? 'text-brand-primary after:bg-brand-primary'
                : 'text-brand-primary/60 after:bg-transparent hover:text-brand-primary hover:after:bg-brand-primary/30'
            } `}
          >
            {label}
          </button>
        ))}
      </nav>

      <div>
        {tabs.map((tab) =>
          tab.label === active ? (
            <div key={tab.label} className="px-4 py-4 animate-fade-in">
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
