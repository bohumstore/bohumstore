'use client';
import React, { useState } from 'react';
import CalculatorConsultModal from './components/CalculatorConsultModal';
import ProductHero from '@/components/product/ProductHero';
import Notice from './components/Notice';
import ProductInfo from './components/BodyTabViews/ProductInfo';
import CoverageDetails from './components/BodyTabViews/CoverageDetails';
import Surrender from './components/BodyTabViews/Surrender';
import ProductDetailTemplate from '@/templates/Product/ProductDetailTemplate';

export default function IBKLifetimeAnnuityPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'calculate' | 'consult'>('calculate');
  const tabs = [
    { label: '상품 정보', content: <ProductInfo /> },
    { label: '보장 내용', content: <CoverageDetails /> },
    { label: '가입시 알아두실 사항', content: <Surrender /> },
  ];

  return (
    <ProductDetailTemplate
      renderHero={({ onOpenPrivacy: _onOpenPrivacy, onModalStateChange }) => (
        <>
          <ProductHero
            backgroundColor="#FFF8E8"
            featureCardColor="#FEF3C7"
            titleMobile={
              <>
                <span className="text-[#e23c3c] font-bold text-[24px]">20년까지 연단리 8%!</span>
                <br />
                <span className="text-text-primary">평생 연금받는 변액연금보험</span>
              </>
            }
            titleDesktop={
              <>
                <div className="heading-2 text-text-primary">
                  20년까지 연단리 8%!
                </div>
                <div className="heading-2 text-text-primary">
                  평생 연금받는 변액연금보험
                </div>
              </>
            }
            productName="(무)IBK 평생연금받는 변액연금보험"
            mainImageSrc="/svgs/slogan/main/slogan-sun-sofa.svg"
            mainImageAlt="연금보험 돼지 일러스트"
            features={[
              {
                icon: '/svgs/slogan/slogan-guarantee.svg',
                title: '연단리 8%',
                title_sub: '최대 20년 보증이율',
              },
              {
                icon: '/svgs/slogan/slogan-age-range.svg',
                title: '가입 0~68세',
                title_sub: '연금개시 30~80세',
              },
              {
                icon: '/svgs/slogan/slogan-graph.svg',
                title: '실적배당 종신연금',
                title_sub: '보증지급',
              },
              {
                icon: '/svgs/slogan/slogan-tax-exempt.svg',
                title: '최저사망적립액',
                title_sub: '보증',
              },
            ]}
            onCalculateClick={() => {
              setModalType('calculate');
              setIsModalOpen(true);
              onModalStateChange?.(true);
            }}
            onConsultClick={() => {
              setModalType('consult');
              setIsModalOpen(true);
              onModalStateChange?.(true);
            }}
          />
          <CalculatorConsultModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              onModalStateChange?.(false);
            }}
            type={modalType}
          />
        </>
      )}
      tabs={tabs}
      renderNotice={({ open, onClose }) => <Notice open={open} onClose={onClose} />}
      notices={[
        '보험사 및 상품별로 상이할 수 있으므로, 관련한 세부사항은 반드시 해당 약관을 참조하시기 바랍니다.',
        '위는 예시일 뿐 해당 납입기간이 끝나기 전에 해지를 할경우 해당 표와 실지급금액이 차이가 발생할수 있습니다.',
        '최저보증연금은 연금개시 이전 중도해지시에는 최저보증이 되지 않아 운용결과에 따라 해지환급금에 손실이 발생할 수 있습니다.',
      ]}
      approvalNumber="25080166호 (2025.08.21~2026.08.20)"
    />
  );
}
