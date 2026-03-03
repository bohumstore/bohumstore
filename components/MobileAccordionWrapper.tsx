'use client';

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { useResponsive } from '@/hooks/useResponsive';

interface AccordionSection {
  title: string;
  container: HTMLElement;
  header: HTMLElement;
  contentWrapper: HTMLElement;
}

/**
 * 모바일 화면에서만 '.product-section-title' 클래스를 가진 요소를 찾아
 * 해당 부모 컨테이너를 아코디언 형태로 변환하는 범용 Wrapper 컴포넌트입니다.
 */
export default function MobileAccordionWrapper({ children }: { children: ReactNode }) {
  const { isMobile } = useResponsive();
  const contentRef = useRef<HTMLDivElement>(null);
  const [sections, setSections] = useState<AccordionSection[]>([]);
  const [openIndex, setOpenIndex] = useState<number>(0); // 첫 번째 섹션 기본 열림

  // 1️⃣ DOM 구조 분석 및 초기 래퍼(Wrapper) 구성
  useEffect(() => {
    if (!isMobile || !contentRef.current) return;

    const titles = contentRef.current.querySelectorAll('.product-section-title');

    if (titles.length === 0) {
      return;
    }

    const foundSections: AccordionSection[] = [];

    titles.forEach((headerEl) => {
      const h3 = headerEl as HTMLElement;
      const container = h3.parentElement;
      if (!container) return;

      // 이미 컨텐츠를 감싼 wrapper가 있는지 확인 (React 재렌더링 방어)
      let contentWrapper = container.querySelector('[data-accordion-content]') as HTMLElement | null;

      if (!contentWrapper) {
        contentWrapper = document.createElement('div');
        contentWrapper.setAttribute('data-accordion-content', 'true');

        // 헤더(h3) 이후의 모든 형제 노드를 contentWrapper 안으로 이동
        const siblings: ChildNode[] = [];
        let nextNode = h3.nextSibling;
        while (nextNode) {
          siblings.push(nextNode);
          nextNode = nextNode.nextSibling;
        }
        siblings.forEach((node) => contentWrapper!.appendChild(node));

        container.appendChild(contentWrapper);
      }

      foundSections.push({
        title: h3.textContent || '',
        container,
        header: h3,
        contentWrapper,
      });
    });

    setTimeout(() => setSections(foundSections), 0);
  }, [isMobile, children]);

  // 2️⃣ 아코디언 상태(openIndex)에 따른 스타일 및 DOM 조작
  useEffect(() => {
    if (!isMobile || sections.length === 0) return;

    sections.forEach((section, idx) => {
      const { header, contentWrapper, container } = section;
      const isOpen = idx === openIndex;

      /* ── 컨텐츠 영역 애니메이션 ── */
      contentWrapper.style.transition = 'max-height 0.35s ease, opacity 0.25s ease';
      contentWrapper.style.overflow = 'hidden';

      if ((contentWrapper as any)._onTransitionEnd) {
        contentWrapper.removeEventListener('transitionend', (contentWrapper as any)._onTransitionEnd);
      }

      const onTransitionEnd = (e: Event) => {
        const tEvent = e as TransitionEvent;
        if (tEvent.propertyName === 'max-height' && tEvent.target === contentWrapper) {
          if (isOpen) {
            contentWrapper.style.maxHeight = 'none';
          }
        }
      };
      (contentWrapper as any)._onTransitionEnd = onTransitionEnd;
      contentWrapper.addEventListener('transitionend', onTransitionEnd);

      if (isOpen) {
        contentWrapper.style.maxHeight = contentWrapper.scrollHeight + 50 + 'px';
        contentWrapper.style.opacity = '1';
      } else {
        // 닫힐 때는 현재 높이가 none일 경우 실제 픽셀 높이로 먼저 고정
        if (contentWrapper.style.maxHeight === 'none') {
          contentWrapper.style.maxHeight = contentWrapper.scrollHeight + 'px';
        }
        void contentWrapper.offsetHeight; // 리플로우(reflow) 강제 발생시켜 다음 줄의 애니메이션이 동작하도록 함
        contentWrapper.style.maxHeight = '0px';
        contentWrapper.style.opacity = '0';
      }

      /* ── 헤더(타이틀) 영역 스타일 ── */
      header.style.cssText = `
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--text-primary);
        gap: 12px;
        border-left: none;
        padding-left: 0;
        font-size: 1rem;
        font-weight: 700;
        margin: 0;
        transition: margin-bottom 0.3s ease, padding-bottom 0.3s ease;
        margin-bottom: ${isOpen ? '12px' : '0'};
        padding-bottom: ${isOpen ? '12px' : '0'};
        border-bottom: ${isOpen ? '1px solid var(--border-default)' : 'none'};
      `;

      // 말줄임 텍스트 영역 렌더링 (재렌더링 방지 속성 사용)
      if (!header.querySelector('[data-title-text]')) {
        const titleText = header.textContent || '';
        header.innerHTML = '';

        const textSpan = document.createElement('span');
        textSpan.setAttribute('data-title-text', 'true');
        textSpan.style.flex = '1';
        textSpan.textContent = titleText;
        header.appendChild(textSpan);

        const chevron = document.createElement('span');
        chevron.setAttribute('data-accordion-icon', 'true');
        chevron.style.cssText = 'flex-shrink: 0; display: flex; align-items: center;';
        header.appendChild(chevron);
      }

      // 말줄임 vs 전체 보기 상태 업데이트
      const titleSpan = header.querySelector('[data-title-text]') as HTMLElement | null;
      if (titleSpan) {
        titleSpan.style.whiteSpace = isOpen ? 'normal' : 'nowrap';
        titleSpan.style.overflow = isOpen ? 'visible' : 'hidden';
        titleSpan.style.textOverflow = isOpen ? 'unset' : 'ellipsis';
      }

      // 셰브론 SVG 아이콘 업데이트
      const chevronIcon = header.querySelector('[data-accordion-icon]') as HTMLElement | null;
      if (chevronIcon) {
        chevronIcon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" 
               style="width:20px;height:20px;color:var(--brand-primary);transition:transform 0.3s;transform:${isOpen ? 'rotate(0deg)' : 'rotate(-90deg)'}">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        `;
      }

      /* ── 컨테이너 래퍼 스타일 ── */
      container.style.cssText = `
        background-color: var(--page-bg);
        border-radius: 12px;
        padding: 12px 20px;
        border: 1px solid var(--border-default);
      `;
      // 기존 레이아웃을 망가뜨릴 수 있는 space-y 클래스 완전 제거
      container.classList.remove('space-y-2', 'space-y-4', 'space-y-6', 'space-y-8');
    });
  }, [isMobile, sections, openIndex]);

  // 3️⃣ 이벤트 리스너 등록 (클릭 시 토글)
  useEffect(() => {
    if (!isMobile || sections.length === 0) return;

    const activeHandlers: { el: HTMLElement; handler: () => void }[] = [];

    sections.forEach(({ header }, idx) => {
      const handler = () => {
        setOpenIndex((prev) => (prev === idx ? -1 : idx));
      };
      header.addEventListener('click', handler);
      activeHandlers.push({ el: header, handler });
    });

    return () => {
      activeHandlers.forEach(({ el, handler }) => el.removeEventListener('click', handler));
    };
  }, [isMobile, sections]);

  /* ── 데스크탑 화면에서는 원본 그대로 렌더링 ── */
  if (!isMobile) {
    return <>{children}</>;
  }

  /* ── 모바일 화면: DOM 가공 전까지 깜빡임 방지 (visibility: hidden) ── */
  return (
    <div ref={contentRef}>
      {children}
    </div>
  );
}
