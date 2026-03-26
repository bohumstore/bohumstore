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

export default function KBTripleLevelUpAnnuityPage() {
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
            backgroundColor="#e8ecf4"
            brandLogo={
              <div className="flex items-center gap-2">
                <Image src="/images/logos/kb-life-logo-new.png" alt="KB 생명보험" width={100} height={40} />
              </div>
            }
            sloganTitle={
              <div>
                <div className="heading-2 break-keep text-text-primary leading-tight">
                  KB 트리플 레벨업
                </div>
                <div className="heading-2 break-keep text-text-primary leading-tight">
                  연금보험 무배당(보증형)
                </div>
              </div>
            }
            checkItems={[
              <><span className="font-bold">트리플 레벨업 보증</span>으로 <span className="font-bold">7년/10년/연금개시시점</span> 적립액 보증 <span className="text-text-muted body-s">(보증형에 한함)</span></>,
              <>가입 <span className="font-bold">0~70세</span>/연금개시 <span className="font-bold">45~85세</span></>,
              <><span className="font-bold">비과세</span> <span className="text-text-muted body-s">(월 150만원 한도, 10년 유지 세법요건 충족시)</span></>,
              <><span className="font-bold">병력 무심사/전건 가입가능!</span></>,
            ]}
            bottomNote="* 트리플 레벨업 보증률 반영(보증형에 한함)"
            cardContent={
              <SloganCardView
                title=""
                onCalculate={() => { setModalType('calculate'); setIsModalOpen(true); onModalStateChange?.(true); }}
                onConsult={() => { setModalType('consult'); setIsModalOpen(true); onModalStateChange?.(true); }}
              >
                {/* 보증률 헤더 */}
                <div className="my-3 flex h-6 w-full max-w-80 justify-center rounded-md bg-status-info text-center text-white body-m font-bold">
                  보증률
                </div>

                {/* 2열 비교 + 화살표 */}
                <div className="flex items-center justify-center gap-4 md:gap-8 mb-5">
                  <div className="text-center flex flex-col gap-1.5">
                    <p className="body-l text-text-muted">7년 시점</p>
                    <p className="heading-4 text-text-primary">100%</p>
                  </div>
                  <span className="text-text-muted text-2xl">→</span>
                  <div className="text-center flex flex-col gap-1.5">
                    <p className="body-l text-text-muted">10년 시점</p>
                    <p className="heading-4 text-brand-primary">130%</p>
                  </div>
                </div>

                {/* 연금개시시점 */}
                <div className="flex flex-col gap-2 items-center w-64 border-t border-border-default pt-4">
                  <p className="text-xl text-text-primary">연금개시시점 <span className="font-bold">2.0%</span></p>
                  <p className="caption-r text-text-muted">계약자적립액 (연금을 개시하는 경우에 한함)</p>
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
        { label: '상품설명서', url: '/resources/guides/kb-product-guide.pdf' },
        { label: '약관', url: '/resources/guides/kb-product-terms.pdf' },
      ]}
      renderNotice={({ open, onClose }) => <Notice open={open} onClose={onClose} />}
      notices={[
        '보험사 및 상품별로 상이할 수 있으므로, 관련한 세부사항은 반드시 해당 약관 및 상품설명서를 참조하시기 바랍니다.',
        '위는 예시일 뿐 해당 납입기간이 끝나기 전에 해지를 할경우 해당 표와 실지급금액이 차이가 발생할수 있습니다.',
        '최저보증연금은 연금개시 이전 중도해지시에는 최저보증이 되지 않아 운용결과에 따라 해지환급금에 손실이 발생할 수 있습니다.',
      ]}
      approvalNumber="준법감시인확인필-SM-2509006(2025.09.05~2026.09.04)"
    />
  );
}
