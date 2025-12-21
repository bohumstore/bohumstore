"use client";
import { useEffect, useState } from "react";
import React from "react";
import Slogan from "./components/Slogan";
import Footer from "@/app/components/shared/Footer";
import PrivacyConsent from "../../../../components/PrivacyConsent";
import Modal from "../../../../components/Modal";
import Tabs from "../../../../components/Tabs";
import ProductInfo from "./components/BodyTabViews/ProductInfo";
import CoverageDetails from "./components/BodyTabViews/CoverageDetails";
import Surrender from "./components/BodyTabViews/Surrender";
import { supabase } from "../../../../api/supabase";
import { trackPageVisit } from "../../../../utils/visitorTracking";

export default function ShinhanMoreTheDreamPage() {
  const tabs = [
    { label: '상품 정보',      content: <ProductInfo /> },
    { label: '보장 내용',      content: <CoverageDetails /> },
    { label: '해약환급금 예시표', content: <Surrender /> },
  ];

  const [showPrivacy, setShowPrivacy] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);

  useEffect(() => {
    // 페이지 방문 시 자동 추적
    trackPageVisit();
    // getProduct()
  }, []);

  // 햄버거 메뉴 상태 수신
  useEffect(() => {
    const handleMenuChange = (e: CustomEvent<{ isOpen: boolean }>) => {
      setIsHeaderMenuOpen(e.detail.isOpen);
    };
    window.addEventListener('headerMenuChange', handleMenuChange as EventListener);
    return () => window.removeEventListener('headerMenuChange', handleMenuChange as EventListener);
  }, []);

  const getProduct = async () => {
    const { data, error } = await supabase.from('product').select('*');
    if (error) {
      console.error("Error fetching product data:", error);
      return null;
    }
    console.log(data);
    return data;
  }

  const handleFocus = (e: React.FocusEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      setIsInputFocused(true);
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
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
      <style jsx global>{`
        @keyframes jump-glow {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 #dc2626); }
          30% { transform: scale(1.18) translateY(-6px); filter: drop-shadow(0 0 8px #fca5a5); }
          60% { transform: scale(0.95) translateY(2px); filter: drop-shadow(0 0 0 #dc2626); }
        }
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); text-shadow: 0 0 0 transparent; }
          50% { transform: scale(1.05); text-shadow: 0 0 20px rgba(234, 88, 12, 0.5); }
        }`}</style>
      <Modal title="개인정보 수집 및 이용 동의" open={showPrivacy} onClose={() => setShowPrivacy(false)}>
        <PrivacyConsent />
      </Modal>
      <div 
        className="font-sans min-h-screen bg-[#f8f8f8] flex flex-col items-center w-full"
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <Slogan onOpenPrivacy={() => setShowPrivacy(true)} onModalStateChange={setIsModalOpen} />
        {/* 상품 상세 영역 (탭/강조타이틀/설명/특약/일러스트/하단버튼) */}
        <section className="w-full bg-white py-8 sm:py-6 md:py-8 lg:py-10">
          <div className="max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
            <Tabs tabs={tabs} />
          </div>
        </section>
        {/* 유의사항 박스 */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl mb-2 md:mb-4 lg:mb-6 mt-6 md:mt-8 lg:mt-10 px-6 py-0 text-xs md:text-sm text-gray-800">
            <div className="mb-1 font-bold">[ 유의사항 ]</div>
            <div className="text-red-500">※ 본 안내물은 지면관계상 상품의 개략적인 내용을 요약·정리한 것이오니 가입 전에 상품의 약관 및 상품설명서를 자세히 읽어보시기 바랍니다.</div>
            <div className="text-red-500">※ 본 상품은 사망을 보장하는 종신보험으로, 은행의 예·적금과는 다른 상품이며 저축·연금보험이 아닙니다.</div>
            <div>※ 이 보험계약은 예금자보호법에 따라 해약환급금(또는 만기 시 보험금)에 기타지급금을 합한 금액이 1인당 "1억원까지"(본 보험회사의 여타 보호상품과 합산)보호됩니다.</div>
            <div>※ 이와 별도로 본 보험회사보호상품의 사고보험금을 합산한 금액이 1인당 "1억원까지" 보호됩니다. 단, 보험계약자 및 보험료 납부자가 법인이면 보호되지 않습니다.</div>
            <div>※ 본 상품은 피보험자의 사망을 보장하는 보장성보험으로 저축(연금) 목적에는 적합하지 않습니다.</div>
            <div>※ 일반사망보험금은 고의적 사고 및 2년 이내 자살의 경우 지급이 제한됩니다.</div>
            <div>※ 중도해약시 환급금이 이미 납부한 보험료보다 적거나 없을 수 있습니다.</div>
            <div>※ 단기납 종신보험은 동일한 보장내용의 일반 종신보험에 비해 보험료가 비쌀 수 있습니다.</div>
            <div>※ 체증형 종신보험은 동일한내용의 표준형 종신보험에 비해 사망보험금이 증가하는 만큼 보험료가 비쌀 수 있습니다.</div>
            <div>※ 저해약환급금형 종신보험은 해약환급금이 표준상품보다 적거나 없을 수 있습니다.</div>
            <div>※ 공시이율은 현재 공시이율에서 시장금리를 반영하여 매월 변동할 수 있습니다.</div>
          </div>
        </div>
        {/* 구분선 */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl px-6">
            <hr className="border-gray-300 my-4" />
          </div>
        </div>
        {/* 필수안내사항 박스 */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl mb-2 md:mb-4 lg:mb-6 mt-6 md:mt-8 lg:mt-10 px-6 py-0 text-xs md:text-sm text-gray-800">
            <div className="mb-1 font-bold">[ 필수안내사항 ]</div>
            <div>※ 본 광고는 심의기준을 준수하였으며, 유효기간은 심의일로부터 1년입니다.</div>
            <div className="text-red-500">※ 본계약은 기존 보험계약을 해지하고 새로운 보험계약을 체결하는 과정에서</div>
            <div className="text-red-500">① 진행이력, 연령등에 따라 가입이 거절되거나 보험료가 인상될 수 있습니다.</div>
            <div className="text-red-500">② 가입 상품에 따라 새로운 면책기간 적용 및 보장 제한 등 기타 불이익이 발생할 수 있습니다.</div>
            <div>※ ㈜메타리치 심의필 25120061호(2025.12.10~2026.12.09)</div>
          </div>
        </div>
        <Footer />
        
        {/* 오른쪽 하단 플로팅 액션 버튼들 - 모달이 열렸을 때는 숨김 */}
        {!isModalOpen && !showPrivacy && !isInputFocused && !isHeaderMenuOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 flex flex-col gap-2 sm:gap-3 z-50">
          {/* 계산하기 버튼 */}
          <button
            onClick={() => {
              const calculatorBox = document.getElementById('calculator-box');
              if (calculatorBox) {
                calculatorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
            className="bg-white text-gray-600 rounded-2xl px-2 py-2 sm:px-3 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-50 border border-gray-200 flex flex-col items-center gap-1"
            aria-label="계산하기"
          >
            <span className="text-xs font-semibold">계산</span>
            <img src="/Calculator.png" alt="계산하기" className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          {/* 카톡상담 버튼 */}
          <button 
            onClick={() => window.open('https://pf.kakao.com/_lrubxb/chat', '_blank')}
            className="bg-white text-gray-600 rounded-2xl px-2 py-2 sm:px-3 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-50 border border-gray-200 flex flex-col items-center gap-1"
            aria-label="카톡상담"
          >
            <span className="text-xs font-semibold">카톡</span>
            <img src="/kakaotalk.png" alt="카톡상담" className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          {/* 맨 위로 버튼 */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-gray-600 rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-50 border border-gray-200"
            aria-label="맨 위로"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </button>
        </div>
        )}
      </div>
    </>
  );
}