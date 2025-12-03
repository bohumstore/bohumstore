"use client";
import { useState } from "react";
import React from "react";
import Header from "./components/Header";
import Slogan from "./components/Slogan";
import Footer from "./components/Footer";
import PrivacyConsent from "@/app/components/PrivacyConsent";
import Modal from "@/app/components/Modal";

export default function ConsultPage() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Modal title="개인정보 수집 및 이용 동의" open={showPrivacy} onClose={() => setShowPrivacy(false)}>
        <PrivacyConsent />
      </Modal>
      <div className="font-sans min-h-screen bg-[#f8f8f8] flex flex-col items-center w-full">
        <Header />
        <Slogan onOpenPrivacy={() => setShowPrivacy(true)} onModalStateChange={setIsModalOpen} />
        {/* 필수안내사항 박스 */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-5xl my-10 px-6 text-sm text-gray-800">
            <div className="mb-1 font-bold">[ 필수안내사항 ]</div>
            <div>※ 본 광고는 심의기준을 준수하였으며, 유효기간은 심의일로부터 1년입니다.</div>
            <div className="text-red-500">※ 본계약은 기존 보험계약을 해지하고 새로운 보험계약을 체결하는 과정에서</div>
            <div className="text-red-500">① 진행이력, 연령등에 따라 가입이 거절되거나 보험료가 인상될 수 있습니다.</div>
            <div className="text-red-500">② 가입 상품에 따라 새로운 면책기간 적용 및 보장 제한 등 기타 불이익이 발생할 수 있습니다.</div>
            <div>※ ㈜메타리치 심의필 00000000호 (2000.00.00~2000.00.00)</div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
