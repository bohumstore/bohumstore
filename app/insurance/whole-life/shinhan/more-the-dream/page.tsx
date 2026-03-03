'use client';
import React, { useState } from 'react';
import CalculatorConsultModal from './components/CalculatorConsultModal';
import ProductHero from '@/components/product/ProductHero';
import Notice from './components/Notice';
import ProductInfo from './components/BodyTabViews/ProductInfo';
import CoverageDetails from './components/BodyTabViews/CoverageDetails';
import Surrender from './components/BodyTabViews/Surrender';
import ProductDetailTemplate from '@/templates/Product/ProductDetailTemplate';

export default function ShinhanMoreTheDreamPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'calculate' | 'consult'>('calculate');
  const tabs = [
    { label: '상품 정보', content: <ProductInfo /> },
    { label: '보장 내용', content: <CoverageDetails /> },
    { label: '해약환급금 예시표', content: <Surrender /> },
  ];

  return (
    <ProductDetailTemplate
      renderHero={({ onOpenPrivacy: _onOpenPrivacy, onModalStateChange }) => (
        <>
          <ProductHero
            backgroundColor="#F5F3FF"
            featureCardColor="#EDE9FE"
            titleMobile={
              <>
                <span className="text-[#8b5cf6] font-bold text-[24px]">해약환급금 122.7%!</span>
                <br />
                <span className="text-text-primary">평생 든든한 종신보장</span>
              </>
            }
            titleDesktop={
              <>
                <div className="heading-2 text-text-primary">
                  해약환급금 122.7%!
                </div>
                <div className="heading-2 text-text-primary">
                  평생 든든한 종신보장
                </div>
              </>
            }
            productName="모아더드림Plus종신보험"
            mainImageSrc="/svgs/slogan/main/slogan-payout.svg"
            mainImageAlt="종신보험 일러스트"
            features={[
              {
                icon: '/svgs/slogan/slogan-guarantee.svg',
                title: '10년 환급률',
                title_sub: '122.7% (5년납 기준)',
              },
              {
                icon: '/svgs/slogan/slogan-age-range.svg',
                title: '가입연령',
                title_sub: '일반 15~70세 / 간편 30~69세',
              },
              {
                icon: '/svgs/slogan/slogan-graph.svg',
                title: '납입완료보너스',
                title_sub: '약관 기준 제공',
              },
              {
                icon: '/svgs/slogan/slogan-tax-exempt.svg',
                title: '장기유지보너스',
                title_sub: '약관 기준 제공',
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
      documents={[
        { label: '상품설명서', url: '/resources/guides/shinhan-morethedream-guide.pdf' },
        { label: '약관', url: '/resources/guides/shinhan-morethedream-terms.pdf' },
      ]}
      renderNotice={({ open, onClose }) => <Notice open={open} onClose={onClose} />}
      notices={[
        '가입 시 보험계약의 기본사항(보험 상품명, 보험기간, 보험료, 보험료 납입기간 등)을 반드시 확인하시기 바랍니다.',
        '피보험자의 과거 건강상태, 직업 등 계약 전 알릴 의무를 사실대로 고지하지 않으면 보험금 지급이 제한되거나 계약이 해지될 수 있습니다.',
        '일반사망보험금은 고의적 사고 및 가입 후 2년 이내 자살의 경우 지급이 제한됩니다.',
        '본 상품은 사망보험금을 지급하는 보장성보험으로, 저축성보험과 비교하여 위험보험료(사망 등 보장) 및 사업비가 더 많이 차감되므로 저축 목적에는 적합하지 않습니다.',
        '해약환급금은 경과기간 및 해약공제에 따라 납입보험료보다 적거나 없을 수 있습니다.',
        '해약환급금 일부지급형 상품이므로, 중도 해지 시 일반형보다 해약환급금이 적게 지급됩니다.',
        '본 상품은 무배당 상품으로, 배당금이 지급되지 않습니다.',
      ]}
      approvalNumber="준법감시인 심의필 43149호 (2025.08.26~2026.08.25)"
    />
  );
}
