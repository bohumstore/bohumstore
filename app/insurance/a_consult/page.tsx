'use client';
import { useState, useEffect } from 'react';
import React from 'react';
import Slogan from './components/Slogan';
import Footer from '@/components/shared/Footer';
import RequiredNotice from '@/components/shared/RequiredNotice';

export default function ConsultPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);

  // 햄버거 메뉴 상태 수신
  useEffect(() => {
    const handleMenuChange = (e: CustomEvent<{ isOpen: boolean }>) => {
      setIsHeaderMenuOpen(e.detail.isOpen);
    };
    window.addEventListener('headerMenuChange', handleMenuChange as EventListener);
    return () => window.removeEventListener('headerMenuChange', handleMenuChange as EventListener);
  }, []);

  const handleFocus = (e: React.FocusEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      setIsInputFocused(true);
    }
  };

  const handleBlur = (_e: React.FocusEvent) => {
    setTimeout(() => {
      const active = document.activeElement as HTMLElement;
      if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
        return;
      }
      setIsInputFocused(false);
    }, 100);
  };

  return (
    <>
      <div
        className="flex min-h-screen w-full flex-col items-center bg-[#f8f8f8] font-sans"
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <Slogan onModalStateChange={setIsModalOpen} />
        <RequiredNotice approvalNumber="25120029호 (2025.12.04~2026.12.03)" />
        <Footer />

        {!isModalOpen && !isInputFocused && !isHeaderMenuOpen && (
          <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 sm:bottom-6 sm:right-6 sm:gap-3">
            <button
              onClick={() => window.open('https://pf.kakao.com/_lrubxb/chat', '_blank')}
              className="flex flex-col items-center gap-1 rounded-2xl border border-border-default bg-white px-2 py-2 text-text-secondary shadow-lg transition-all duration-200 hover:bg-page-bg hover:shadow-xl sm:px-3 sm:py-3"
              aria-label="카톡상담"
            >
              <span className="text-xs font-semibold">카톡</span>
              <img
                src="/images/icons/icon-kakaotalk.png"
                alt="카톡상담"
                className="h-5 w-5 sm:h-6 sm:w-6"
              />
            </button>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="rounded-full border border-border-default bg-white p-3 text-text-secondary shadow-lg transition-all duration-200 hover:bg-page-bg hover:shadow-xl sm:p-4"
              aria-label="맨 위로"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5 sm:h-6 sm:w-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
