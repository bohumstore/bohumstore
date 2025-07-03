"use client";
import { useEffect, useState } from "react";
import React from "react";
import Header from "./components/Header";
import Slogan from "./components/Slogan";
import Footer from "./components/Footer";
import PrivacyConsent from "../components/PrivacyConsent";
import Modal from "../components/Modal";
import Notice from "./components/Notice";
import Tabs from "../components/Tabs";
import ProductInfo from "./components/BodyTabViews/ProductInfo";
import CoverageDetails from "./components/BodyTabViews/CoverageDetails";
import Surrender from "./components/BodyTabViews/Surrender";
import { supabase } from "../api/supabase";

export default function KBTripleLevelupAnnuityPage() {
  const tabs = [
    { label: '상품 정보',      content: <ProductInfo /> },
    { label: '보장 내용',      content: <CoverageDetails /> },
    { label: '해약환급금 예시표', content: <Surrender /> },
  ];

  const [showNotice, setShowNotice] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  useEffect(() => {
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
        <Slogan onOpenPrivacy={() => setShowPrivacy(true)} />
        {/* 상품 상세 영역 (탭/강조타이틀/설명/특약/일러스트/하단버튼) */}
        <section className="w-full bg-white py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
            <Tabs tabs={tabs} />
            {/* 하단 버튼 */}
            <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
                <a href="/kb-guide.pdf" target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-none border border-[#e0e0e0] rounded-md px-8 py-4 text-lg font-semibold text-gray-700 bg-white hover:bg-gray-100 transition text-center cursor-pointer">
                상품안내장
              </a>
                <a href="/kb-guide2.pdf" target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-none border border-[#e0e0e0] rounded-md px-8 py-4 text-lg font-semibold text-gray-700 bg-white hover:bg-gray-100 transition text-center cursor-pointer">
                약관
              </a>
              <button type="button" onClick={() => setShowNotice(true)} className="flex-1 md:flex-none border border-[#e0e0e0] rounded-md px-8 py-4 text-lg font-semibold text-gray-700 bg-white hover:bg-gray-100 transition cursor-pointer">
                꼭 알아두실 사항
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}