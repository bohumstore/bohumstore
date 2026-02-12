import React, { ReactNode, useEffect, useRef, useCallback } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface ModalProps {
  title: React.ReactNode;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ title, open, onClose, children }: ModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const isClosingByBackRef = useRef(false);

  // 닫기 버튼 클릭 시 히스토리도 함께 정리
  const handleClose = useCallback(() => {
    if (isClosingByBackRef.current) {
      // 뒤로가기로 닫히는 경우 onClose만 호출
      onClose();
    } else {
      // 닫기 버튼으로 닫는 경우 히스토리도 뒤로
      isClosingByBackRef.current = true;
      window.history.back();
    }
  }, [onClose]);

  // 모달이 열릴 때 배경 스크롤 완전 방지 및 뒤로가기 버튼 처리
  useEffect(() => {
    if (open) {
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      // body 고정하여 배경 스크롤 완전 차단
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = `-${scrollX}px`;
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      document.body.style.width = '100%';

      isClosingByBackRef.current = false;

      // 히스토리에 모달 상태 추가 (뒤로가기 시 모달만 닫히도록)
      // 히스토리 중복 추가 방지
      if (!window.history.state?.modal) {
        window.history.pushState({ modal: true }, '');
      }

      const handlePopState = (e: PopStateEvent) => {
        isClosingByBackRef.current = true;
        onClose();
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
        // body 스타일 복원
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        document.body.style.width = '';
        // 스크롤 위치 복원
        window.scrollTo(scrollX, scrollY);
      };
    }
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const container = contentRef.current;
    if (!container) return;

    // 플랫폼 탐지 및 지연 시간/오프셋 튜닝
    const ua = (typeof navigator !== 'undefined' ? navigator.userAgent || '' : '').toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua) && !/windows/.test(ua);
    const isAndroid = /android/.test(ua);
    const isMobile = isIOS || isAndroid || window.innerWidth < 768;

    const scrollToElement = (target: HTMLElement) => {
      if (!isMobile) return;

      // 모달 컨테이너 내에서의 상대 위치 계산
      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      // 타겟이 컨테이너 중앙에 오도록 스크롤 위치 계산
      const targetCenterY = targetRect.top + targetRect.height / 2;
      const containerCenterY = containerRect.top + containerRect.height / 2;
      const scrollOffset = targetCenterY - containerCenterY;

      container.scrollBy({ top: scrollOffset, behavior: 'smooth' });
    };

    const handleFocusIn = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const tag = target.tagName;
      if (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        target.getAttribute('contenteditable') === 'true'
      ) {
        // 키패드가 열리면서 레이아웃 변동 고려해 지연 후 스크롤
        setTimeout(() => scrollToElement(target), isIOS ? 350 : 300);
        // 키패드 완전 표시 후 한 번 더 보정
        setTimeout(() => scrollToElement(target), isIOS ? 600 : 500);
      }
    };

    container.addEventListener('focusin', handleFocusIn);

    return () => {
      container.removeEventListener('focusin', handleFocusIn);
    };
  }, [open]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex touch-none items-center justify-center bg-black/40 p-1 sm:p-4"
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-lg touch-auto flex-col overflow-hidden rounded-xl bg-white text-text-primary shadow-2xl sm:max-h-[92vh]"
        onTouchMove={(e) => e.stopPropagation()}
      >
        <div className="flex flex-shrink-0 items-center justify-between border-b border-gray-200 px-3 pb-1.5 pt-2 sm:px-6 sm:pb-2 sm:pt-4">
          <div className="text-sm font-bold sm:text-lg md:text-xl">{title}</div>
          <button onClick={handleClose} className="p-1 text-gray-400 hover:text-gray-700">
            <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
        <div
          ref={contentRef}
          className="flex-1 touch-auto overflow-y-auto overscroll-contain scroll-smooth px-2.5 py-1.5 sm:px-4 sm:py-3 md:px-6 md:py-4"
        >
          {children}
        </div>
        <div className="flex flex-shrink-0 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="flex-1 border-r border-gray-200 bg-[#ffe15a] py-3 text-sm font-bold text-gray-900 transition hover:bg-yellow-200 sm:py-4 sm:text-base md:text-lg"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
