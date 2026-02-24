'use client';
import React, { useState } from 'react';
import CalculatorConsultModal from './components/CalculatorConsultModal';
import ProductHero from '@/components/product/ProductHero';
import Notice from './components/Notice';
import ProductInfo from './components/BodyTabViews/ProductInfo';
import CoverageDetails from './components/BodyTabViews/CoverageDetails';
import Surrender from './components/BodyTabViews/Surrender';
import ProductDetailTemplate from '@/templates/Product/ProductDetailTemplate';

export default function KDBHappyPlusAnnuityPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'calculate' | 'consult'>('calculate');
  const tabs = [
    { label: '상품 정보', content: <ProductInfo /> },
    { label: '보장 내용', content: <CoverageDetails /> },
    { label: '가입시 알아두실 사항', content: <Surrender /> },
  ];

  return (
    <ProductDetailTemplate
      renderHero={({ onOpenPrivacy, onModalStateChange }) => (
        <>
          <ProductHero
            backgroundColor="#e8ecf4"
            titleMobile={
              <>
                <span className="text-status-red font-bold text-[24px]">20년까지 연단리 7%!</span>
                <br />
                <span className="text-text-primary">보증형 연금보험!</span>
              </>
            }
            titleDesktop={
              <>
                <div className="heading-2 text-text-primary">
                  20년까지 연단리 7%!
                </div>
                <div className="heading-2 text-text-primary">
                  보증형 연금보험!
                </div>
              </>
            }
            subtitle=""
            mainImageSrc="/svgs/slogan/slogan-pig.svg"
            mainImageAlt="연금보험 돼지 일러스트"
            features={[
              {
                icon: '/svgs/slogan/slogan-guarantee.svg',
                title: '연단리 7%',
                title_sub: '최저연금기준금액 보증',
              },
              {
                icon: '/svgs/slogan/slogan-age-range.svg',
                title: '가입 15~70세',
                title_sub: '연금개시 55~80세',
              },
              {
                icon: '/svgs/slogan/slogan-tax-exempt.svg',
                title: '비과세 혜택',
                subtitle: '(월 150만원 한도,\n10년 유지 시 세법 요건 충족)',
                small: true,
              },
              {
                icon: '/svgs/slogan/slogan-graph.svg',
                title: '금액보증연금 보증',
                title_sub: '최저사망적립액 보증',
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
            type={modalType}
            onClose={() => {
              setIsModalOpen(false);
              onModalStateChange?.(false);
            }}
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
      approvalNumber="25080086호 (2025.08.13~2026.08.12)"
    />
  );
}
