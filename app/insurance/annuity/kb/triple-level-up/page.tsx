"use client";
import React from "react";
import Slogan from "./components/Slogan";
import Notice from "./components/Notice";
import ProductInfo from "./components/BodyTabViews/ProductInfo";
import CoverageDetails from "./components/BodyTabViews/CoverageDetails";
import Surrender from "./components/BodyTabViews/Surrender";
import ProductDetailTemplate from "@/templates/Product/ProductDetailTemplate";

export default function KBTripleLevelUpAnnuityPage() {
  const tabs = [
    { label: '상품 정보', content: <ProductInfo /> },
    { label: '보장 내용', content: <CoverageDetails /> },
    { label: '해약환급금 예시표', content: <Surrender /> }
  ];

  return (
    <ProductDetailTemplate
      renderHero={({ onOpenPrivacy, onModalStateChange }) => (
        <Slogan onOpenPrivacy={onOpenPrivacy} onModalStateChange={onModalStateChange} />
      )}
      tabs={tabs}
      documents={[
        { label: '상품설명서', url: '/kb-guide.pdf' },
        { label: '약관', url: '/kb-guide2.pdf' },
      ]}
      renderNotice={({ open, onClose }) => (
        <Notice open={open} onClose={onClose} />
      )}
      notices={[
        '보험사 및 상품별로 상이할 수 있으므로, 관련한 세부사항은 반드시 해당 약관 및 상품설명서를 참조하시기 바랍니다.',
        '위는 예시일 뿐 해당 납입기간이 끝나기 전에 해지를 할경우 해당 표와 실지급금액이 차이가 발생할수 있습니다.',
        '최저보증연금은 연금개시 이전 중도해지시에는 최저보증이 되지 않아 운용결과에 따라 해지환급금에 손실이 발생할 수 있습니다.',
      ]}
      approvalNumber="준법감시인확인필-SM-2509006(2025.09.05~2026.09.04)"
    />
  );
}