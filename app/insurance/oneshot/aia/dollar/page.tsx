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
import { trackPageVisit } from "../../../../utils/visitorTracking";
import TerminationNoticePopup from "@/app/components/TerminationNoticePopup";

export default function IMPlusPROAnnuityPage() {
  const tabs = [
    { label: '상품 정보', content: <ProductInfo /> },
    { label: '보장 내용', content: <CoverageDetails /> },
    { label: '해약환급금 예시표', content: <Surrender /> }
  ];

  const [showNotice, setShowNotice] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);

  useEffect(() => {
    // 페이지 방문 시 자동 추적
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

  const handleBlur = (e: React.FocusEvent) => {
    // 포커스가 다른 입력 필드로 이동했는지 확인하기 위해 잠시 대기
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
      {/* 판매 종료 팝업 */}
      <TerminationNoticePopup 
        productName="IM Plus PRO 연금보험"
        endDate="2026-05-15"
      />

      <Notice open={showNotice} onClose={() => setShowNotice(false)} />
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
        <section className="w-full bg-white py-6 sm:py-8 lg:py-10">
          <div className="max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
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
            <div className="mb-1 font-bold">[ 유의사항 ]</div>
            <div>- 위 내용은 계약자의 이해를 돕기 위해 요약한 내용으로, 자세한 내용은 반드시 상품설명서 또는 상품요약서 및 약관을 참고하시기 바랍니다.</div>
            <div>- 외화보험은 환테크를 위한 금융상품이 아닙니다.</div>
            <div>- 외화(달러 등)로 표시된 보험료, 보험금, 해약환급금 등의 원화 가치는 환율 변동에 따라 변동되고, 보험료를 납입할 때의 환율이 높고, 보험금을 받을 때의 환율이 낮으면, (원화 기준) 납입보험료보다 적은 보험금을 지급받게 되어 손실이 발생할 수 있습니다.</div>
            <div>- 본 상품의 공시이율은 미국 국채 및 회사채 등의 금리를 참조하여 공시되는 바, 해외 금리 변동에 따라서 보험금/해약환급금 등이 변동할 수 있습니다.</div>
            <div>- 이율확정기간 중 중도 해지 시 가입시점의 공시이율이 아닌, 해지 시점의 공시이율을 적용하여 MVA가 반영되며, 해지 시점 공시이율에 따라 손실이 발생할 수 있습니다.</div>
            <div>- 외화보험은 보험료 납부 혹은 보험금 수령을 위해 원화를 외화로 환전하기 때문에 환전 수수료 등 거래 비용이 발생할 수 있습니다.</div>
            <div>- 외화보험상품의 경우 한국은행 외국환거래업무 취급세칙에 따라 보험계약대출이 제한될 수 있습니다.</div>
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
            <div>※ AIA생명 준법감시인확인필 : COM-2026-06-0068(2026.06.23~2027.06.22)</div>
          </div>
        </div>
        <Footer />
        
        {/* 맨 위로 & 계산하기 버튼 - 모달이 열렸을 때는 숨김 */}
        {!isModalOpen && !showPrivacy && !showNotice && !isInputFocused && !isHeaderMenuOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 sm:gap-3">
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