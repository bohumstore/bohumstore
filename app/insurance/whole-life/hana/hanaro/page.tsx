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

export default function HanaHanaroWholeLifePage() {
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
              <Image src="/images/logos/hana-logo.png" alt="하나생명" width={88} height={40} />
            }
            sloganTitle={
              <div>
                <div className="heading-2 break-keep text-text-primary leading-tight">
                  (무)하나로 THE 연결된 종신보험
                </div>
                <div className="heading-2 break-keep text-text-primary leading-tight">
                  (해약환급금 일부지급형)
                </div>
              </div>
            }
            checkItems={[
              <>병력 걱정 없이 <span className="font-bold">간편심사형으로도 가입 가능</span></>,
              <>3대 질병 진단시 <span className="font-bold">보험료 환급·납입면제</span> 선택</>,
              <>10년 시점 환급금 <span className="font-bold">122.78%</span></>,
              '유지보너스 제공',
              '일반심사형/간편심사형 선택 가능',
              <>1형(일반심사형): 만 <span className="font-bold">15~69세</span> / 2형(간편심사형): 만 <span className="font-bold">30~65세</span></>,
            ]}
            bottomNote="* 이 상품은 사망을 보장하는 종신보험으로, 저축성보험(연금)이 아닙니다."
            cardContent={
              <SloganCardView
                title=""
                bottomInfoText="40세 남자 1형(일반심사형), 5년납 기준"
                onCalculate={() => { setModalType('calculate'); setIsModalOpen(true); onModalStateChange?.(true); }}
                onConsult={() => { setModalType('consult'); setIsModalOpen(true); onModalStateChange?.(true); }}
              >
                {/* 환급률 헤더 */}
                <div className="my-3 flex h-6 w-full max-w-80 justify-center rounded-md bg-status-info text-center text-white body-m font-bold">
                  환급률
                </div>

                {/* 3열 비교 */}
                <div className="zfold-compact-compare zfold-compact-grid mb-4 grid w-full grid-cols-3 gap-3 sm:gap-6">
                  <div className="text-center flex flex-col gap-1">
                    <p className="body-l text-text-muted">7년 시점</p>
                    <p className="heading-4 text-text-primary">100%</p>
                    <p className="body-m text-text-muted">유지보너스 1</p>
                  </div>
                  <div className="text-center flex flex-col gap-1">
                    <p className="body-l text-text-muted">10년 시점</p>
                    <p className="heading-4 text-text-primary">122.78%</p>
                    <p className="body-m text-text-muted">유지보너스 2</p>
                  </div>
                  <div className="text-center flex flex-col gap-1">
                    <p className="body-l text-text-muted">10년 시점</p>
                    <p className="heading-4 text-brand-primary">132.12%</p>
                    <p className="body-m text-text-muted">유지보너스 3</p>
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
        '가입 시 보험계약의 기본사항(보험 상품명, 보험기간, 보험료, 보험료 납입기간 등)을 반드시 확인하시기 바랍니다.',
        '피보험자의 과거 건강상태, 직업 등 계약 전 알릴 의무를 사실대로 고지하지 않으면 보험금 지급이 제한되거나 계약이 해지될 수 있습니다.',
        '일반사망보험금은 고의적 사고 및 가입 후 2년 이내 자살의 경우 지급이 제한됩니다.',
        '본 상품은 사망보험금을 지급하는 보장성보험으로, 저축성보험과 비교하여 위험보험료(사망 등 보장) 및 사업비가 더 많이 차감되므로 저축 목적에는 적합하지 않습니다.',
        '해약환급금은 경과기간 및 해약공제에 따라 납입보험료보다 적거나 없을 수 있습니다.',
        '해약환급금 일부지급형 상품이므로, 중도 해지 시 일반형보다 해약환급금이 적게 지급됩니다.',
        '본 상품은 무배당 상품으로, 배당금이 지급되지 않습니다.',
      ]}
      approvalNumber="준법감시인 심의필 하생 2025-1048(2025.11.20~2026.11.19)"
    />
  );
}
