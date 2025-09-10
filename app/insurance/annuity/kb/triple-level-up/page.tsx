"use client";
import { useEffect, useState } from "react";
import React from "react";
import Header from "./components/Header";
import Slogan from "./components/Slogan";
import Footer from "./components/Footer";
import PrivacyConsent from "../../../../components/PrivacyConsent";
import Modal from "../../../../components/Modal";
import Notice from "./components/Notice";
import Tabs from "../../../../components/Tabs";
import ProductInfo from "./components/BodyTabViews/ProductInfo";
import CoverageDetails from "./components/BodyTabViews/CoverageDetails";
import Surrender from "./components/BodyTabViews/Surrender";
import { supabase } from "../../../../api/supabase";
import { trackPageVisit } from "../../../../utils/visitorTracking";

export default function KBTripleLevelUpAnnuityPage() {
  const tabs = [
    { label: '상품 정보', content: <ProductInfo /> },
    { label: '보장 내용', content: <CoverageDetails /> },
    { label: '해약환급금 예시표', content: <Surrender /> }
  ];

  const [showNotice, setShowNotice] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 페이지 방문 시 자동 추적
    trackPageVisit();
    // getProduct()
  }, []);

  const trackPageVisit = async () => {
    // 방문 추적 로직
  };

  const getProduct = async () => {
    const { data, error } = await supabase.from('product').select('*');
    if (error) {
      console.error('Error fetching product:', error);
      return null;
    }
    console.log(data);
    return data;
  }

  return (
    <>

      <Notice open={showNotice} onClose={() => setShowNotice(false)} />
      <Modal title="개인정보 수집 및 이용 동의" open={showPrivacy} onClose={() => setShowPrivacy(false)}>
        <PrivacyConsent />
      </Modal>
      <div className="font-sans min-h-screen bg-[#f8f8f8] flex flex-col items-center w-full">
        <Header />
        <Slogan onOpenPrivacy={() => setShowPrivacy(true)} onModalStateChange={setIsModalOpen} />
        {/* 상품 상세 영역 (탭/강조타이틀/설명/특약/일러스트/하단버튼) */}
        <section className="w-full bg-white py-6 sm:py-8 lg:py-10">
          <div className="max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <Tabs tabs={tabs} />
            {/* 하단 버튼 */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center mt-4 sm:mt-6">
              <button type="button" onClick={() => window.open('/kb-guide.pdf', '_blank')} className="flex-1 sm:flex-none border border-[#e0e0e0] rounded-md px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold text-gray-700 bg-white hover:bg-gray-100 transition cursor-pointer">
                상품설명서
              </button>
              <button type="button" onClick={() => window.open('/kb-guide2.pdf', '_blank')} className="flex-1 sm:flex-none border border-[#e0e0e0] rounded-md px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold text-gray-700 bg-white hover:bg-gray-100 transition cursor-pointer">
                약관
              </button>
              <button type="button" onClick={() => setShowNotice(true)} className="flex-1 sm:flex-none border border-[#e0e0e0] rounded-md px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold text-gray-700 bg-white hover:bg-gray-100 transition cursor-pointer">
                가입시 알아두실 사항
              </button>
            </div>
          </div>
        </section>
        {/* 유의사항 박스 */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl mb-2 md:mb-4 lg:mb-6 mt-4 sm:mt-6 md:mt-8 lg:mt-10 px-3 sm:px-4 md:px-6 lg:px-8 py-0 text-xs md:text-sm text-gray-800
                      leading-5 md:leading-6 bg-white border border-gray-300 rounded-lg shadow-sm">
            <div className="px-2 sm:px-4 py-3 sm:py-4">
              <div className="font-bold mb-2 sm:mb-3 text-center text-gray-800 text-sm sm:text-base">유의사항</div>
              <div className="space-y-1 sm:space-y-2">
                <div>• 상기 내용은 KB트리플레벨업연금보험 무배당(보증형) 상품의 주요 내용을 요약한 것이므로 반드시 상품설명서, 약관을 참조하시기 바랍니다.</div>
                <div>• 보험계약 체결 전에 상품설명서 및 약관을 읽어보시기 바랍니다.</div>
                <div>• 이 보험계약은 예금자보호법에 따라 예금보험공사가 보호하되, 보호 한도는 본 보험회사에 있는 귀하의 모든 예금보호 대상 금융상품의 해약환급금(또는 만기시 보험금이나 사고보험금)에 기타지급금을 합하여 1인당 "최고 5천만원"이고, 5천만원을 초과하는 나머지 금액은 보호하지 않습니다.</div>
                <div>• 만기시 환급금은 납입한 보험료보다 적을 수 있습니다.</div>
              </div>
            </div>
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
            <div>※ 준법감시인확인필-SM-2509006(2025.09.05~2026.09.04)</div>
          </div>
        </div>
        <Footer />
        
        {/* 맨 위로 & 계산하기 버튼 - 모달이 열렸을 때는 숨김 */}
        {!isModalOpen && !showPrivacy && !showNotice && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          {/* 계산하기 버튼 */}
          <button 
            onClick={() => {
              const calculatorBox = document.getElementById('calculator-box');
              if (calculatorBox) {
                calculatorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
            className="bg-white text-gray-600 rounded-2xl px-3 py-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-50 border border-gray-200 flex flex-col items-center gap-1"
            aria-label="계산하기"
          >
            <span className="text-xs font-semibold">계산</span>
            <img src="/Calculator.png" alt="계산하기" className="w-6 h-6" />
          </button>
          
          {/* 맨 위로 버튼 */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-white text-gray-600 rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-50 border border-gray-200"
            aria-label="맨 위로"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </button>
        </div>
        )}
      </div>
    </>
  );
}