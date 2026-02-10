"use client";
import React from "react";
import Slogan from "./components/Slogan";
import ProductInfo from "./components/BodyTabViews/ProductInfo";
import CoverageDetails from "./components/BodyTabViews/CoverageDetails";
import Surrender from "./components/BodyTabViews/Surrender";
import ProductDetailTemplate from "@/templates/Product/ProductDetailTemplate";

export default function MetLifeUSDWholeLifePage() {
  const tabs = [
    { label: '상품 정보',      content: <ProductInfo /> },
    { label: '보장 내용',      content: <CoverageDetails /> },
    { label: '해약환급금 예시표', content: <Surrender /> },
  ];

  return (
    <ProductDetailTemplate
      renderHero={({ onOpenPrivacy, onModalStateChange }) => (
        <Slogan onOpenPrivacy={onOpenPrivacy} onModalStateChange={onModalStateChange} />
      )}
      tabs={tabs}
      notices={[
        '본 안내물은 지면관계상 상품의 개략적인 내용을 요약·정리한 것이오니 가입 전에 상품의 약관 및 상품설명서를 자세히 읽어보시기 바랍니다.',
        '본 상품은 사망을 보장하는 종신보험으로, 은행의 예·적금과는 다른 상품이며 저축·연금보험이 아닙니다.',
        '이 보험계약은 예금자보호법에 따라 해약환급금(또는 만기 시 보험금)에 기타지급금을 합한 금액이 1인당 "1억원까지"(본 보험회사의 여타 보호상품과 합산)보호됩니다.',
        '이와 별도로 본 보험회사보호상품의 사고보험금을 합산한 금액이 1인당 "1억원까지" 보호됩니다. 단, 보험계약자 및 보험료 납부자가 법인이면 보호되지 않습니다.',
        '본 상품은 피보험자의 사망을 보장하는 보장성보험으로 저축(연금) 목적에는 적합하지 않습니다.',
        '일반사망보험금은 고의적 사고 및 2년 이내 자살의 경우 지급이 제한됩니다.',
        '중도해약시 환급금이 이미 납부한 보험료보다 적거나 없을 수 있습니다.',
        '단기납 종신보험은 동일한 보장내용의 일반 종신보험에 비해 보험료가 비쌀 수 있습니다.',
        '체증형 종신보험은 동일한내용의 표준형 종신보험에 비해 사망보험금이 증가하는 만큼 보험료가 비쌀 수 있습니다.',
        '저해약환급금형 종신보험은 해약환급금이 표준상품보다 적거나 없을 수 있습니다.',
        '공시이율은 현재 공시이율에서 시장금리를 반영하여 매월 변동할 수 있습니다.',
      ]}
      approvalNumber="25120061호(2025.12.10~2026.12.09)"
      globalStyles={`
        @keyframes jump-glow {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 #dc2626); }
          30% { transform: scale(1.18) translateY(-6px); filter: drop-shadow(0 0 8px #fca5a5); }
          60% { transform: scale(0.95) translateY(2px); filter: drop-shadow(0 0 0 #dc2626); }
        }
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); text-shadow: 0 0 0 transparent; }
          50% { transform: scale(1.05); text-shadow: 0 0 20px rgba(234, 88, 12, 0.5); }
        }`}
    />
  );
}