import React, { useState } from 'react';
import CalculatorConsultModal from './CalculatorConsultModal';
import Image from 'next/image';

type SloganProps = {
  onOpenPrivacy: () => void;
  onModalStateChange?: (isOpen: boolean) => void;
};

export default function Slogan({ onOpenPrivacy, onModalStateChange }: SloganProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'calculate' | 'consult'>('calculate');

  const openModal = (type: 'calculate' | 'consult') => {
    setModalType(type);
    setIsModalOpen(true);
    onModalStateChange?.(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    onModalStateChange?.(false);
  };

  return (
    <>
      <section className="w-full h-[368px] bg-[#e8ecf4] flex items-center px-12">
        <div className="w-full max-w-[960px] mx-auto flex items-center justify-between px-10">
          <div className="flex flex-col items-start w-[340px]">
            <div className="mb-10">
              <div className="heading-2 text-text-primary">
                20년까지 연단리 7%!
              </div>
              <div className="heading-2 text-text-primary">
                보증형 연금보험!
              </div>
            </div>
            <div className="flex flex-row-reverse w-full mb-2 ">
              <Image
                src="/svgs/slogan/slogan-pig.svg"
                alt="연금보험 돼지 일러스트"
                width={160}
                height={100}
                className="object-contain"
              />
            </div>
            <div className="flex justify-between w-full">
              <button
                onClick={() => openModal('calculate')}
                className="w-[160px] h-[48px] rounded-lg bg-[#3b6cf5] text-[15px] font-bold text-white shadow-sm transition hover:bg-[#2f5ed8] flex items-center justify-center"
              >
                보험료 계산하기
              </button>
              <button
                onClick={() => openModal('consult')}
                className="w-[160px] h-[48px] rounded-lg bg-white text-[15px] font-bold text-text-primary shadow-sm border border-border-default transition hover:bg-gray-50 flex items-center justify-center"
              >
                상담 신청
              </button>
            </div>
          </div>
          <div className="grid w-[417px] grid-cols-2 gap-4">
            <div className="relative flex flex-col rounded-xl bg-card-service p-5 h-[140px] shadow-md">
              <div>
                <div className="heading-5 text-text-primary">연단리 7%<br></br>최저연금기준금액 보증</div>
              </div>
              <div className="absolute bottom-1 right-1">
                <Image src="/svgs/slogan/slogan-guarantee.svg" alt="" width={100} height={67} />
              </div>
            </div>
            <div className="relative flex flex-col rounded-xl bg-card-service p-5 h-[140px] shadow-md">
              <div>
                <div className="heading-5 text-text-primary">가입 15~70세<br></br>연금개시 55~80세</div>
              </div>
              <div className="absolute bottom-1 right-1">
                <Image src="/svgs/slogan/slogan-age-range.svg" alt="" width={100} height={67} />
              </div>
            </div>
            <div className="relative flex flex-col rounded-xl bg-card-service p-5 h-[140px] shadow-md">
              <div>
                <div className="heading-5 text-text-primary">비과세 혜택</div>
                <div className="caption-r text-text-muted mt-1 leading-tight">
                  (월 150만원 한도,<br />10년 유지 시 세법 요건 충족)
                </div>
              </div>
              <div className="absolute bottom-1 right-1">
                <Image src="/svgs/slogan/slogan-tax-exempt.svg" alt="" width={100} height={67} />
              </div>
            </div>
            <div className="relative flex flex-col rounded-xl bg-card-service p-5 h-[140px] shadow-md">
              <div>
                <div className="heading-5 text-text-primary">금액보증연금 보증<br></br>최저사망적립액 보증</div>
              </div>
              <div className="absolute bottom-1 right-1">
                <Image src="/svgs/slogan/slogan-graph.svg" alt="" width={100} height={67} />
              </div>
            </div>

          </div>
        </div>
      </section>
      <CalculatorConsultModal
        isOpen={isModalOpen}
        onClose={closeModal}
        type={modalType}
      />
    </>
  );
}
