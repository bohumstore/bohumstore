"use client";
import { useEffect, useState } from "react";
import React from "react";
import Slogan from "./components/Slogan";
import Footer from "@/app/components/shared/Footer";
import PrivacyConsent from "../../../../components/PrivacyConsent";
import Modal from "../../../../components/Modal";
import Notice from "./components/Notice";
import Tabs from "../../../../components/Tabs";
import ProductInfo from "./components/BodyTabViews/ProductInfo";
import CoverageDetails from "./components/BodyTabViews/CoverageDetails";
import Surrender from "./components/BodyTabViews/Surrender";
import { supabase } from "../../../../api/supabase";
import { trackPageVisit } from "../../../../utils/visitorTracking";

export default function HanaOnlyPage() {
  const tabs = [
    { label: '상품 정보', content: <ProductInfo /> },
    { label: '보장 내용', content: <CoverageDetails /> },
    { label: '해약환급금 예시표', content: <Surrender /> },
  ];

  const [showNotice, setShowNotice] = useState(false);
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
        @keyframes jump-simple {
          0%, 100% { transform: scale(1); }
          30% { transform: scale(1.18) translateY(-6px); }
          60% { transform: scale(0.95) translateY(2px); }
        }`}</style>
      <Notice open={showNotice} onClose={() => setShowNotice(false)} />
      <Modal title="개인정보 수집 및 이용 동의" open={showPrivacy} onClose={() => setShowPrivacy(false)}>
        <PrivacyConsent />
      </Modal>
      <div
        className="font-sans bg-[#f8f8f8] flex flex-col items-center w-full"
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <Slogan onOpenPrivacy={() => setShowPrivacy(true)} onModalStateChange={setIsModalOpen} />
        {/* 상품 상세 영역 (탭/강조타이틀/설명/특약/일러스트/하단버튼) */}
        <section className="w-full bg-white py-8 sm:py-6 md:py-8 lg:py-10">
          <div className="max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
            <Tabs tabs={tabs} />
            {/* 하단 버튼 */}
            <div className="flex justify-center mt-6">
              <button type="button" onClick={() => setShowNotice(true)} className="border border-[#e0e0e0] rounded-md px-8 py-4 text-lg font-bold text-gray-700 bg-white hover:bg-gray-100 transition cursor-pointer">
                가입시 알아두실 사항
              </button>
            </div>
          </div>
        </section>
        {/* 유의사항 박스 */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl mb-2 md:mb-4 lg:mb-6 mt-6 md:mt-8 lg:mt-10 px-6 py-0 text-xs md:text-sm text-gray-800">
            <div className="mb-2 font-bold">[ 유의사항 ]</div>
            <div className="mb-2">※ 이 상품은 운용실적에 따라 납입원금의 이익 또는 손실이 발생할 수 있으며, 그 손실은 계약자 및 보험수익자에게 귀속되는 실적배당형 상품입니다.</div>
            <div className="mb-2">※ 자세한 사항은 본 상품의 약관, 상품설명서 및 운용설명서를 참조하시기 바랍니다. 가입하시기 전에 (선택하신 펀드, 운용수수료 등에 관하여)운용설명서를 반드시 읽어보시기 바랍니다.</div>
            <div>※ 특별계정의 운용실적에 따라 해약(만기)환급금이 매일 변동되며, 운용실적이 악화될 경우 중도해지 또는 만기시 납입한 보험료 원금을 보장받지 못할 수 있습니다.</div>
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
            <div>※ 준법감시인 심의필 하생 2026-629(2026.07.24~2027.07.23)</div>
          </div>
        </div>
        <Footer />

        {/* 오른쪽 하단 플로팅 액션 버튼들 - 모달이 열렸을 때는 숨김 */}
        {!isModalOpen && !showPrivacy && !showNotice && !isInputFocused && !isHeaderMenuOpen && (
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