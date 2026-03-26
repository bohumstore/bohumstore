'use client';
import { useState } from 'react';
import CalculatorConsultModal from './components/CalculatorConsultModal';
import SloganSection from '@/components/product/SloganSection';
import SloganCardView from '@/components/product/SloganCardView';
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
      renderHero={({ onOpenPrivacy: _onOpenPrivacy, onModalStateChange }) => (
        <>
          <SloganSection
            backgroundColor="#e8ecf4"
            sloganTitle={
              <div>
                <div className="heading-2 break-keep text-text-primary leading-tight">
                  20년까지 연단리 7%
                </div>
                <div className="heading-2 break-keep text-text-primary leading-tight">
                  보증형 연금보험
                </div>
              </div>
            }
            illustrationSrc="/svgs/slogan/main/slogan-currency-cycle.svg"
            illustrationAlt="연금보험 일러스트"
            checkItems={[
              <>연단리 7% 최저연금기준금액 보증 <span className="text-text-muted">(20년까지)</span></>,
              <>가입 <span className="font-bold">15~70세</span>/연금개시 <span className="font-bold">55~80세</span></>,
              <>비과세 <span className="text-text-muted">(월 150만원 한도, 10년 유지 세법요건 충족시)</span></>,
              <><span className="font-bold">금액보증연금 보증</span> / <span className="font-bold">최저사망적립액 보증</span></>,
            ]}
            bottomNote="* 대표계약기준(40세 남자, 10년납, 연금개시 나이 65세), 복리이자율로 환산시 4.21%)"
            cardContent={
              <SloganCardView
                title=""
                transparentMobileBackground={true}
                onCalculate={() => { setModalType('calculate'); setIsModalOpen(true); onModalStateChange?.(true); }}
                onConsult={() => { setModalType('consult'); setIsModalOpen(true); onModalStateChange?.(true); }}
              >
                {/* 3열 특징 카드 (데스크탑) */}
                <div className="hidden md:grid grid-cols-3 gap-2 mb-4">
                  {/* 생존 시 100세까지 */}
                  <div className="flex flex-col w-[130px] h-[160px] px-2 py-4 shadow-lg rounded-lg items-center justify-center gap-3 bg-white">
                    <div className="bg-status-info text-white body-s font-bold rounded-md px-2 py-0.5 text-center">생존 시 100세까지</div>
                    <img src="/svgs/slogan/kdb-happy-plus/icon-100-years.svg" alt="" className="w-13 h-13" />
                    <p className="caption-s text-text-muted text-center">최대 100세까지<br />안정적인 연금 지급</p>
                    <p className="caption-s font-bold text-text-muted">피보험자 99세 계약 해당일</p>
                  </div>

                  {/* 보증금리 TOP */}
                  <div className="flex flex-col w-[130px] h-[160px] px-2 py-4 shadow-lg rounded-lg items-center justify-center gap-3 bg-white">
                    <div className="bg-status-info text-white body-s font-bold rounded-md px-2 py-0.5 text-center">보증금리 TOP</div>
                    <img src="/svgs/slogan/kdb-happy-plus/icon-top-rate.svg" alt="" className="w-13 h-13" />
                    <p className="caption-s text-text-muted text-center">20년 동안 <span className="font-bold">최대 연 7% 보증</span></p>
                    <p className="caption-s text-text-muted text-center">20년~만기까지 연 <span className="font-bold">5%</span></p>
                  </div>

                  {/* 사망 시에도 보장 */}
                  <div className="flex flex-col w-[130px] h-[160px] px-2 py-4 shadow-lg rounded-lg items-center justify-center gap-3 bg-white">
                    <div className="bg-status-info text-white body-s font-bold rounded-md px-2 py-0.5 text-center">사망 시에도 보장</div>
                    <img src="/svgs/slogan/kdb-happy-plus/icon-heart-shield.svg" alt="" className="w-14 h-14" />
                    <p className="caption-s text-text-muted text-center">최저사망적립액 <span className="font-bold">보장</span><br />장래 공시이율과 <span className="font-bold">관계없이</span></p>
                  </div>
                </div>

                {/* 2x1 특징 카드 (모바일) */}
                <div className="flex flex-wrap justify-center gap-2 mb-4 md:hidden w-full">
                  {/* 생존 시 100세까지 */}
                  <div className="relative w-[calc(50%-4px)] max-w-[176px] h-[124px] bg-white rounded-2xl flex flex-col justify-between p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden">
                    <div className="z-10 text-brand-primary body-s font-bold mb-2 tracking-tight">생존 시<br />최대 100세까지</div>
                    <img src="/svgs/slogan/kdb-happy-plus/icon-100-years.svg" alt="" className="absolute top-2.5 right-2 w-11 h-11 z-0" />
                    <div className="z-10 mt-auto flex flex-col gap-0.5">
                      <p className="text-[11px] xs:caption-s text-text-secondary leading-[1.3] truncate-lines-2">최대 100세까지<br />안정적인 연금 지급</p>
                      <p className="text-[11px] xs:caption-s text-text-secondary font-bold tracking-tight">피보험자 99세 계약 해당일</p>
                    </div>
                  </div>

                  {/* 보증금리 TOP */}
                  <div className="relative w-[calc(50%-4px)] max-w-[176px] h-[124px] bg-white rounded-2xl flex flex-col justify-between p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden">
                    <div className="z-10 text-brand-primary body-s font-bold mb-2 tracking-tight">보증금리<br />TOP</div>
                    <img src="/svgs/slogan/kdb-happy-plus/icon-top-rate.svg" alt="" className="absolute top-2.5 right-2 w-11 h-11 z-0" />
                    <div className="z-10 mt-auto flex flex-col gap-0.5">
                      <p className="text-[11px] xs:caption-s text-text-secondary leading-[1.3] truncate-lines-2">20년 동안 <span className="font-bold">최대 연 7% 보증</span></p>
                      <p className="text-[11px] xs:caption-s text-text-secondary font-bold tracking-tight">20년 ~ 만기까지 연 <span className="text-[#222222] font-bold">5%</span></p>
                    </div>
                  </div>

                  {/* 사망 시에도 보장 */}
                  <div className="relative w-[calc(50%-4px)] max-w-[176px] h-[124px] bg-white rounded-2xl flex flex-col justify-between p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden">
                    <div className="z-10 text-brand-primary body-s font-bold mb-2 tracking-tight">사망 시에도<br />보장</div>
                    <img src="/svgs/slogan/kdb-happy-plus/icon-heart-shield.svg" alt="" className="absolute top-2.5 right-2 w-11 h-11 z-0" />
                    <div className="z-10 mt-auto flex flex-col gap-0.5 justify-end flex-grow">
                      <p className="text-[11px] xs:caption-s text-text-secondary leading-[1.3] truncate-lines-2">최저사망적립액 <span className="text-[#222222] font-bold">보장</span><br />장래 공시이율과 <span className="text-[#222222] font-bold">관계없이</span></p>
                    </div>
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
