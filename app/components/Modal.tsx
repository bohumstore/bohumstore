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
      window.history.pushState({ modal: true }, '');
      
      const handlePopState = () => {
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
    const focusDelayMs = isIOS ? 120 : isAndroid ? 60 : 40;
    const extraOffsetPx = isIOS ? 64 : 24; // iOS는 주소/바텀바 변동 고려해 더 크게 보정

    const handleFocusIn = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const tag = target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.getAttribute('contenteditable') === 'true') {
        // 약간의 지연 후 스크롤(키패드가 열리면서 레이아웃 변동 고려)
        setTimeout(() => {
          try {
            // 1차: 중앙 정렬
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // 2차: 플랫폼별 추가 오프셋 보정(컨테이너 기준 상단으로 조금 더 끌어올림)
            const scrollBy = () => {
              try {
                container.scrollBy({ top: -extraOffsetPx, left: 0, behavior: 'smooth' });
              } catch {}
            };
            // iOS는 키패드 전환이 더 늦게 반영되어 한 번 더 보정
            setTimeout(scrollBy, isIOS ? 140 : 80);
          } catch {}
        }, focusDelayMs);
      }
    };

    return () => {
    };
  }, [open]);

  if (!open) return null;
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-1 sm:p-4 touch-none"
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] sm:max-h-[92vh] overflow-hidden flex flex-col relative touch-auto"
        onTouchMove={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-3 sm:px-6 pt-2 sm:pt-4 pb-1.5 sm:pb-2 border-b border-gray-200 flex-shrink-0">
          <div className="text-sm sm:text-lg md:text-xl font-bold">{title}</div>
          <button onClick={handleClose} className="p-1 text-gray-400 hover:text-gray-700">
            <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
        <div ref={contentRef} className="px-2.5 sm:px-4 md:px-6 py-1.5 sm:py-3 md:py-4 overflow-y-auto flex-1 scroll-smooth overscroll-contain touch-auto">
          {children}
        </div>
        <div className="flex border-t border-gray-200 flex-shrink-0">
          <button onClick={handleClose} className="flex-1 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-bold bg-[#ffe15a] text-gray-900 border-r border-gray-200 hover:bg-yellow-200 transition">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}