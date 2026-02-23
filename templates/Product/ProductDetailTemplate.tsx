'use client';

import React, { useEffect, useState, ReactNode } from 'react';
import Footer from '@/components/shared/Footer';
import Modal from '@/components/Modal';
import Tabs from '@/components/Tabs';
import RequiredNotice from '@/components/shared/RequiredNotice';
import FloatingButtons from '@/components/shared/FloatingButtons';
import { trackPageVisit } from '@/lib/visitorTracking';

interface Tab {
  label: string;
  content: ReactNode;
}

interface DocumentLink {
  label: string;
  url: string;
}

interface ProductDetailTemplateProps {
  /**
   * 상품 히어로 섹션 (계산기 포함)
   * - render prop 패턴: 개인정보 모달 열기 함수와 모달 상태 변경 함수를 전달받음
   * - 기존 Slogan 컴포넌트를 그대로 넘기면 됨
   */
  renderHero: (props: {
    onOpenPrivacy: () => void;
    onModalStateChange: (isOpen: boolean) => void;
  }) => ReactNode;
  /** 탭 데이터 배열 */
  tabs: Tab[];
  /** 하단 문서 버튼 (상품설명서, 약관 등) */
  documents?: DocumentLink[];
  /** 유의사항 텍스트 배열 */
  notices?: string[];
  /** 심의필 번호 */
  approvalNumber?: string;
  /**
   * 가입시 알아두실 사항 (Notice 컴포넌트 렌더링)
   * - Notice 컴포넌트가 이미 자체 Modal을 감싸고 있으므로 render prop으로 전달
   * - open/onClose를 받아서 기존 Notice 컴포넌트를 그대로 렌더링
   */
  renderNotice?: (props: { open: boolean; onClose: () => void }) => ReactNode;
  /** 추가 CSS keyframes (jsx global) */
  globalStyles?: string;
}

/**
 * 상품 상세 페이지 공통 템플릿
 *
 * ─ 기존 product 페이지에서 반복되던 구조를 통합:
 *   - 개인정보 동의 모달
 *   - 가입시 알아두실 사항 모달
 *   - Hero/Calculator (Slogan) — renderHero로 주입
 *   - 탭 영역
 *   - 문서 버튼 (상품설명서/약관)
 *   - 유의사항 + 필수안내사항
 *   - Footer + FloatingButtons
 *
 * ─ 디자인: 기존 코드의 디자인을 그대로 유지
 */
export default function ProductDetailTemplate({
  renderHero,
  tabs,
  documents = [],
  notices,
  approvalNumber,
  renderNotice,
  globalStyles,
}: ProductDetailTemplateProps) {
  const [showNotice, setShowNotice] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);

  useEffect(() => {
    trackPageVisit();
  }, []);

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

  const handleBlur = () => {
    setTimeout(() => {
      const active = document.activeElement as HTMLElement;
      if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
        return;
      }
      setIsInputFocused(false);
    }, 100);
  };

  // 플로팅 버튼 표시 여부
  const showFloating =
    !isModalOpen && !showPrivacy && !showNotice && !isInputFocused && !isHeaderMenuOpen;

  return (
    <>
      {/* 추가 글로벌 CSS가 필요한 경우 */}
      {globalStyles && (
        <style jsx global>
          {globalStyles}
        </style>
      )}

      {/* 가입시 알아두실 사항 모달 (Notice 컴포넌트가 자체 Modal 포함) */}
      {renderNotice && renderNotice({ open: showNotice, onClose: () => setShowNotice(false) })}      <div
        className="flex min-h-screen w-full flex-col items-center bg-[#f8f8f8] font-sans"
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {/* Hero / Calculator (Slogan) */}
        {renderHero({
          onOpenPrivacy: () => setShowPrivacy(true),
          onModalStateChange: setIsModalOpen,
        })}

        {/* 상품 상세 영역 (탭) */}
        <section className="w-full bg-white py-6 sm:py-8 lg:py-10">
          <div className="mx-auto max-w-3xl px-3 sm:px-4 md:max-w-4xl md:px-6 lg:max-w-5xl lg:px-8">
            <Tabs tabs={tabs} />

            {/* 문서 버튼 (상품설명서, 약관 등) */}
            {documents.length > 0 && (
              <div className="flex flex-col justify-center gap-4 md:mt-10 md:flex-row">
                {documents.map((doc) => (
                  <button
                    key={doc.label}
                    type="button"
                    onClick={() => window.open(doc.url, '_blank')}
                    className="flex-1 cursor-pointer rounded-md border border-[#e0e0e0] bg-white px-8 py-4 text-lg font-bold text-gray-700 transition hover:bg-gray-100 md:flex-none"
                  >
                    {doc.label}
                  </button>
                ))}

                {/* 가입시 알아두실 사항 버튼 (renderNotice가 있을 때만) */}
                {renderNotice && (
                  <button
                    type="button"
                    onClick={() => setShowNotice(true)}
                    className="flex-1 cursor-pointer rounded-md border border-[#e0e0e0] bg-white px-8 py-4 text-lg font-bold text-gray-700 transition hover:bg-gray-100 md:flex-none"
                  >
                    가입시 알아두실 사항
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* 유의사항 + 필수안내사항 */}
        <RequiredNotice extraNotices={notices} approvalNumber={approvalNumber} />

        <Footer />

        {/* 플로팅 버튼 */}
        <FloatingButtons visible={showFloating} showCalculator={true} />
      </div>
    </>
  );
}
