import React, { ReactNode, useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface ModalProps {
  title?: React.ReactNode;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

export default function Modal({ title, open, onClose, children, hideHeader, hideFooter }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // 모달이 열릴 때 배경 스크롤 완전 방지
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

      return () => {
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
  }, [open]);

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

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex touch-none items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity"
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div
        className="relative flex max-h-[90vh] w-[calc(100%-32px)] max-w-lg touch-auto flex-col overflow-hidden rounded-[20px] bg-white text-text-primary shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
        onTouchMove={(e) => e.stopPropagation()}
      >
        {!hideHeader && (
          <div className="flex flex-shrink-0 items-center justify-between border-b border-border-default px-5 pb-4 pt-5 md:px-6 md:pb-5 md:pt-6">
            <div className="heading-4 text-text-primary">{title}</div>
            <button 
              onClick={handleClose} 
              className="p-1 text-text-muted transition-colors hover:text-text-primary active:scale-95"
              aria-label="모달 닫기"
            >
              <XMarkIcon className="h-7 w-7" />
            </button>
          </div>
        )}
        <div
          ref={contentRef}
          className="flex-1 touch-auto overflow-y-auto overscroll-contain scroll-smooth"
        >
          {children}
        </div>
        {!hideFooter && (
          <div className="flex flex-shrink-0 px-5 pb-5 pt-3 md:px-6 md:pb-6 md:pt-4">
            <button
              onClick={handleClose}
              className="flex-1 rounded-xl bg-brand-primary py-3.5 text-center body-l font-bold text-white shadow-sm transition-colors hover:bg-brand-primary-hover active:scale-[0.98]"
            >
              닫기
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
