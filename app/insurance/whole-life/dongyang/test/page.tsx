"use client";
import { useEffect, useState } from "react";
import React from "react";
import Header from "./components/Header";
import Slogan from "./components/Slogan";
import Footer from "./components/Footer";
import PrivacyConsent from "@/app/components/PrivacyConsent";
import Modal from "@/app/components/Modal";
import Notice from "./components/Notice";
import Tabs from "@/app/components/Tabs";
import ProductInfo from "./components/BodyTabViews/ProductInfo";
import CoverageDetails from "./components/BodyTabViews/CoverageDetails";
import Surrender from "./components/BodyTabViews/Surrender";
import { supabase } from "@/app/api/supabase";
import { trackSimplifiedVisitor } from "@/app/utils/visitorTracking";

export default function DongyangTestPage() {
  const tabs = [
    { label: '상품 정보',      content: <ProductInfo /> },
    { label: '보장 내용',      content: <CoverageDetails /> },
    { label: '가입시 알아두실 사항', content: <Surrender /> },
  ];

  const [showNotice, setShowNotice] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 페이지 방문 시 자동 추적
    trackSimplifiedVisitor();
    // getProduct()
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

  return (
    <>
      <style jsx global>{`
        @keyframes jump-glow {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 #3a80e0); }
          30% { transform: scale(1.18) translateY(-6px); filter: drop-shadow(0 0 8px #87b7f0); }
          60% { transform: scale(0.95) translateY(2px); filter: drop-shadow(0 0 0 #3a80e0); }
        }`}</style>
      <Notice open={showNotice} onClose={() => setShowNotice(false)} />
      <Modal title="개인정보 수집 및 이용 동의" open={showPrivacy} onClose={() => setShowPrivacy(false)}>
        <PrivacyConsent />
      </Modal>
      <div className="font-sans min-h-screen bg-[#f8f8f8] flex flex-col items-center w-full">
        <Header />
        <Slogan onOpenPrivacy={() => setShowPrivacy(true)} onModalStateChange={setIsModalOpen} />
        {/* 상품 상세 영역 (탭/강조타이틀/설명/특약/일러스트/하단버튼) */}
        <section className="w-full bg-white py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
            <Tabs tabs={tabs} />
            {/* 하단 버튼 */}
            <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
              <button type="button" onClick={() => setShowNotice(true)} className="flex-1 md:flex-none border border-[#e0e0e0] rounded-md px-8 py-4 text-lg font-semibold text-gray-700 bg-white hover:bg-gray-100 transition cursor-pointer">
                상품가입전 알아두실 사항
          </button>
        </div>
        )}
      </div>
        </section>
        {/* 필수안내사항 박스 */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl mb-2 md:mb-4 lg:mb-6 mt-6 md:mt-8 lg:mt-10 px-6 py-0 text-xs md:text-sm text-gray-800">
            <div className="mb-1 font-bold">[ 필수안내사항 ]</div>
            <div>※ 본 광고는 심의기준을 준수하였으며, 유효기간은 심의일로부터 1년입니다.</div>
            <div className="text-red-500">※ 본계약은 기존 보험계약을 해지하고 새로운 보험계약을 체결하는 과정에서</div>
            <div className="text-red-500">① 진행이력, 연령등에 따라 가입이 거절되거나 보험료가 인상될 수 있습니다.</div>
            <div className="text-red-500">② 가입 상품에 따라 새로운 면책기간 적용 및 보장 제한 등 기타 불이익이 발생할 수 있습니다.</div>
          </div>
        </div>
        {/* 오른쪽 하단 플로팅 액션 버튼들 - 모달이 열렸을 때는 숨김 */}
        {!isModalOpen && !showPrivacy && !showNotice && (
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
          {/* 계산하기 버튼 */}
          <button
            onClick={() => {
              const calculatorBox = document.getElementById('calculator-box');
              if (calculatorBox) {
                calculatorBox.scrollIntoView({ behavior: 'smooth' });
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
        <Footer />
      </div>
    </>
  );
}