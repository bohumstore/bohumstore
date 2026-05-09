"use client";

import { useEffect, useState } from 'react';
import { XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface TerminationNoticePopupProps {
  productName: string;
  endDate: string; // YYYY-MM-DD 형식
}

export default function TerminationNoticePopup({ productName, endDate }: TerminationNoticePopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    // 로컬스토리지에서 "다시 보지 않기" 체크 확인
    const dontShowAgain = localStorage.getItem(`termination-notice-${productName}`);
    
    // 팝업 종료 시간 체크 (2026년 5월 15일 오후 6시 KST)
    const now = new Date();
    // UTC+9 (한국 시간) 기준 2026-05-15 18:00:00
    const popupEndTime = new Date('2026-05-15T18:00:00+09:00');
    
    if (!dontShowAgain && now < popupEndTime) {
      setIsOpen(true);
    }

    // D-day 계산
    const calculateDaysLeft = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const end = new Date(endDate);
      end.setHours(0, 0, 0, 0);
      
      const diffTime = end.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setDaysLeft(diffDays);
    };

    calculateDaysLeft();
  }, [productName, endDate]);

  // ESC 키로 닫기 기능 추가
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // 팝업 열릴 때 body 스크롤 방지
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // 팝업 닫힐 때 body 스크롤 복원
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDontShowAgain = () => {
    localStorage.setItem(`termination-notice-${productName}`, 'true');
    setIsOpen(false);
  };

  // 배경 클릭 시 닫기 (실수 방지를 위해 비활성화)
  const handleBackgroundClick = (e: React.MouseEvent) => {
    // 배경 클릭해도 닫히지 않도록 함 (중요한 공지이므로)
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 배경 오버레이 */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-60 z-[9999] flex items-center justify-center p-3 sm:p-4"
        onClick={handleBackgroundClick}
      >
        {/* 팝업 컨테이너 - 모바일 최적화 */}
        <div 
          className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-sm sm:max-w-md w-full relative animate-fade-in max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 닫기 버튼 - 클릭 영역 확대 */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 z-[100] text-white transition-all duration-200 bg-red-600 bg-opacity-70 hover:bg-opacity-100 rounded-full p-2.5 sm:p-3 cursor-pointer hover:scale-110 hover:rotate-90 shadow-lg"
            aria-label="닫기"
            type="button"
          >
            <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>

          {/* 헤더 */}
          <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-4 py-4 sm:px-6 sm:py-5 rounded-t-xl sm:rounded-t-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
            <div className="flex items-center gap-2 sm:gap-3 relative z-[1]">
              <ExclamationTriangleIcon className="w-7 h-7 sm:w-8 sm:h-8 animate-pulse flex-shrink-0" />
              <h2 className="text-lg sm:text-xl font-bold">판매 종료 예정</h2>
            </div>
          </div>

          {/* 본문 */}
          <div className="px-4 py-5 sm:px-6 sm:py-6">
            {/* D-day 표시 */}
            <div className="text-center mb-5 sm:mb-6">
              {daysLeft > 0 ? (
                <div className="inline-block bg-red-50 border-2 border-red-500 rounded-xl px-5 py-2.5 sm:px-6 sm:py-3 animate-bounce-subtle">
                  <div className="text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1">판매 종료까지</div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-red-600 animate-pulse">
                    D-{daysLeft}
                  </div>
                </div>
              ) : daysLeft === 0 ? (
                <div className="inline-block bg-red-50 border-2 border-red-500 rounded-xl px-5 py-2.5 sm:px-6 sm:py-3 animate-pulse">
                  <div className="text-2xl sm:text-3xl font-extrabold text-red-600">
                    오늘 마감!
                  </div>
                </div>
              ) : (
                <div className="inline-block bg-gray-50 border-2 border-gray-500 rounded-xl px-5 py-2.5 sm:px-6 sm:py-3">
                  <div className="text-xl sm:text-2xl font-extrabold text-gray-600">
                    판매 종료
                  </div>
                </div>
              )}
            </div>

            {/* 상품명 */}
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-1 leading-tight">
              im라이프<br />
              Plus PRO 연금보험
            </h3>
            
            {/* 상품 강조 문구 */}
            <div className="bg-gradient-to-r from-orange-100 to-amber-100 border-2 border-orange-500 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 mb-4 mt-3 shadow-md">
              <p className="text-center text-orange-700 font-extrabold text-sm sm:text-base">
                10년시점 133% 환급!
              </p>
            </div>

            {/* 안내 내용 */}
            <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-5 sm:mb-6 space-y-2.5 sm:space-y-3">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-center">
                본 상품은 <span className="font-bold text-red-600">2026년 5월 15일(금)</span>까지만 판매됩니다.
              </p>
              <div className="border-t border-gray-200 pt-2.5 sm:pt-3">
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600">
                  <span className="text-blue-600 font-semibold">•</span>
                  <span>마감일: <span className="font-semibold">2026.05.15 (금)</span></span>
                </div>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400 text-center mt-2 leading-relaxed">
                ※ 해당 보험사에 따라 변경 또는 조기마감 될 수 있습니다.
              </p>
            </div>

            {/* 버튼 영역 */}
            <div className="space-y-2">
              <button
                onClick={handleClose}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-2.5 sm:py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg active:scale-[0.98] text-sm sm:text-base"
              >
                확인했어요
              </button>
              <button
                onClick={handleDontShowAgain}
                className="w-full bg-gray-100 text-gray-600 font-medium py-2 sm:py-2.5 rounded-lg hover:bg-gray-200 transition-colors text-xs sm:text-sm active:scale-[0.98]"
              >
                다시 보지 않기
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
