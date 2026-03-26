'use client';
import { useState } from 'react';
import Image from 'next/image';
import CalculatorConsultModal from './components/CalculatorConsultModal';
import SloganSection from '@/components/product/SloganSection';
import SloganCardView from '@/components/product/SloganCardView';
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
      renderHero={({ onModalStateChange }) => (
        <>
          <SloganSection
            backgroundColor="#F5F3FF"
            brandLogo={
              <div className="flex items-center gap-3">
                <Image src="/images/logos/shinhan-life-logo.png" alt="신한라이프" width={88} height={40} />
                <span className="body-m text-text-muted">신한라이프생명</span>
              </div>
            }
            sloganTitle={
              <div>
                <div className="heading-2 break-keep text-text-primary leading-tight">
                  모아더드림PLUS종신보험
                </div>
                <div className="heading-2 break-keep text-text-primary leading-tight">
                  (해약환급금 일부 지급형)
                </div>
              </div>
            }
            checkItems={[
              <>평생 든든한 <span className="font-bold">종신보장</span></>,
              <>10년시점 해약환급금 <span className="font-bold">122.7%</span> <span className="text-text-muted body-s">(일반심사형 기준)</span></>,
              <>설계·심사에 따라 가입금액 선택 가능</>,
              <>납입완료보너스·장기유지보너스 제공 <span className="text-text-muted body-s">(약관기준)</span></>,
              <>일반심사형: <span className="font-bold">만 15~70세</span> / 간편심사형: <span className="font-bold">만 30~69세</span><br /><span className="text-text-muted body-s">(단, 성별 및 납입기간별 가입나이 상이)</span></>,
            ]}
            cardContent={
              <SloganCardView
                title="10년 뒤, 환급률은 얼마나 될까요?"
                bottomInfoText="50세 남자 일반 심사형, 5년납, 1억원 기준"
                onCalculate={() => { setModalType('calculate'); setIsModalOpen(true); onModalStateChange?.(true); }}
                onConsult={() => { setModalType('consult'); setIsModalOpen(true); onModalStateChange?.(true); }}
              >
                {/* 비용 비교 영역 */}
                <div className="zfold-compact-compare mb-4 flex items-end justify-center gap-4 md:gap-10">
                  {/* 7년 시점 */}
                  <div className="text-center flex flex-col gap-1.5">
                    <p className="body-l text-text-muted">7년 시점</p>
                    <p className="heading-4 text-text-primary">93.2%</p>
                  </div>
                  {/* 10년 시점 */}
                  <div className="text-center flex flex-col gap-1.5">
                    <p className="body-l text-text-muted">10년 시점</p>
                    <p className="heading-4 text-brand-primary">122.7%</p>
                  </div>
                  {/* 보너스 */}
                  <div className="text-center flex min-w-0 flex-col items-center gap-1.5">
                    <span className="bg-status-green text-white body-s font-bold px-2.5 py-0.5 rounded-full">
                      보너스
                    </span>
                    <p className="body-m break-keep font-bold text-status-green leading-tight">
                      납입완료 보너스<br />장기유지 보너스
                    </p>
                  </div>
                </div>
              </SloganCardView>
            }
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
