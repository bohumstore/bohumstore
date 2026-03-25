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
      renderHero={({ onModalStateChange }) => (
        <>
          <SloganSection
            backgroundColor="#FFF8E8"
            sloganTitle={
              <div>
                <div className="heading-2 text-text-primary leading-tight">
                  20년까지 연단리 8%
                </div>
                <div className="heading-2 text-text-primary leading-tight">
                  보증되는 변액연금보험!
                </div>
              </div>
            }
            illustrationSrc="/svgs/slogan/main/slogan-moneybag.svg"
            illustrationAlt="연금보험 일러스트"
            checkItems={[
              <>연단리 8% 최저연금기준금액 보증 <span className="text-text-muted">(20년까지)</span></>,
              <>가입 <span className="font-bold">0~68세</span>/연금개시 <span className="font-bold">30~80세</span></>,
              <><span className="font-bold">실적배당</span> 종신연금 <span className="font-bold">보증지급</span></>,
              <>최저사망계약자적립액 <span className="font-bold">보증</span></>,
            ]}
            cardContent={
              <SloganCardView
                title={
                  <>
                    높고 안정적인 보장 혜택 <br className="md:hidden" /> <span className="font-normal tracking-[-0.01em]">시점별 환급 구조를 확인해보세요.</span>
                  </>
                }
                showDivider={false}
                onCalculate={() => { setModalType('calculate'); setIsModalOpen(true); onModalStateChange?.(true); }}
                onConsult={() => { setModalType('consult'); setIsModalOpen(true); onModalStateChange?.(true); }}
              >
                {/* 보장 카드 (모바일, 데스크탑 모두 3열 배치) */}
                <div className="grid grid-cols-3 gap-1 md:gap-2 mb-4 w-full px-1 justify-items-center [&>div]:w-full [&>div]:max-w-[130px]">
                  {/* 보장 1 */}
                  <div className="flex flex-col w-[130px] h-[160px] px-2 py-4 shadow-lg rounded-lg items-center justify-center gap-2">
                    <div className="w-[105px] text-center bg-status-info text-white body-s font-bold rounded-md px-2 py-0.5">보장 1</div>
                    <p className="body-m font-bold text-text-primary">높은 보증 이율</p>
                    <div className="flex items-center gap-2.5">
                      <img src="/svgs/slogan/ibk-lifetime/icon-magnifier.svg" alt="" className="w-10 h-10" />
                      <div>
                        <p className="caption-s text-text-muted">연 최대</p>
                        <p className="text-xl font-extrabold text-text-primary">8%</p>
                      </div>
                    </div>
                    <p className="caption-s text-text-muted">20년 이후 5% 보증</p>
                  </div>

                  {/* 보장 2 */}
                  <div className="flex flex-col w-[130px] h-[160px] px-2 py-4 shadow-lg rounded-lg items-center justify-center gap-2">
                    <div className="w-[105px] text-center bg-status-info text-white body-s font-bold rounded-md px-2 py-0.5">보장 2</div>
                    <p className="body-m font-bold text-text-primary">무심사 가입</p>
                    <p className="caption-s text-text-primary text-center">질병 여부와 관계 없이<br/>무진단·무심사</p>
                    <p className="caption-s text-text-muted text-center">당뇨, 암, 고혈압 등<br/>가입제한 없음</p>
                  </div>

                  {/* 보장 3 */}
                  <div className="flex flex-col w-[130px] h-[160px] px-2 py-4 shadow-lg rounded-lg items-center justify-center gap-2">
                    <div className="w-[105px] text-center bg-status-info text-white body-s font-bold rounded-md px-2 py-0.5">보장 3</div>
                    <p className="body-m font-bold text-text-primary">조기연금 개시</p>
                    <p className="caption-s text-text-primary text-center">30세부터 가능<br/>미보증형은 45세부터</p>
                    <p className="caption-s text-text-muted text-center">미보증형은<br/>45세부터 가능</p>
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
      approvalNumber="25080166호 (2025.08.21~2026.08.20)"
    />
  );
}
