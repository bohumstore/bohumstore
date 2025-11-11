import React, { ReactNode, useEffect, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface ModalProps {
  title: React.ReactNode;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ title, open, onClose, children }: ModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // 모달이 열릴 때 배경 스크롤 방지
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // 컴포넌트 언마운트 시 스크롤 복원
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[95vh] sm:max-h-[92vh] overflow-hidden flex flex-col relative">
        <div className="flex items-center justify-between px-4 sm:px-6 pt-3 sm:pt-4 pb-2 border-b border-gray-200 flex-shrink-0">
          <div className="text-base sm:text-lg md:text-xl font-bold">{title}</div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-700">
            <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
        <div ref={contentRef} className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 overflow-y-auto flex-1 scroll-smooth">
          {children}
        </div>
        <div className="flex border-t border-gray-200 flex-shrink-0">
          <button onClick={onClose} className="flex-1 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-bold bg-[#ffe15a] text-gray-900 border-r border-gray-200 hover:bg-yellow-200 transition">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}