import React from 'react';
import Image from 'next/image';

export interface SloganCardViewProps {
  /** 카드 상단 질문 텍스트 */
  title?: React.ReactNode;
  /** 카드 내부 커스텀 콘텐츠 (cards 배열이 없을 때 사용) */
  children?: React.ReactNode;
  /** 템플릿용 카드 데이터 (자동으로 그리드 렌더링) */
  cards?: {
    title: string;
    image: React.ReactNode | string;
    descriptions?: React.ReactNode[];
  }[];
  /** 하단 정보 바 아이콘 경로 */
  bottomInfoIcon?: string;
  /** 하단 정보 바 텍스트 */
  bottomInfoText?: string;
  /** 보험료 계산하기 클릭 핸들러 */
  onCalculate?: () => void;
  /** 상담 신청 클릭 핸들러 */
  onConsult?: () => void;
  /** 가로 구분선 표시 여부 (기본값: true) */
  showDivider?: boolean;
  /** 모바일에서 2+1 그리드로 배치 */
  mobileGridLayout?: boolean;
  /** 모바일에서 카드 배경과 패딩/그림자를 제거하여 투명하게 표시 */
  transparentMobileBackground?: boolean;
}

export default function SloganCardView({
  title,
  children,
  cards,
  bottomInfoIcon,
  bottomInfoText,
  onCalculate,
  onConsult,
  showDivider = true,
  mobileGridLayout = false,
  transparentMobileBackground = false,
}: SloganCardViewProps) {
  // 버튼 액션이 있는지 여부
  const hasActions = !!(onCalculate || onConsult);

  return (
    <div className="flex flex-col items-center">
      {/* 카드 본체 */}
      <div
        className={`flex w-full max-w-[440px] flex-col items-center justify-center rounded-xl ${
          mobileGridLayout
            ? ''
            : transparentMobileBackground
              ? 'bg-transparent p-0 shadow-none md:bg-white md:p-4 md:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_2px_3px_rgba(0,0,0,0.04)]'
              : 'bg-white p-4 shadow-none md:p-4 md:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_2px_3px_rgba(0,0,0,0.04)]'
        }`}
      >
        {/* 상단 제목 */}
        {title && <div className="heading-5 text-center text-text-primary">{title}</div>}

        {title && showDivider && <div className="my-3 h-0.5 w-full bg-product-primary-soft"></div>}

        {/* 커스텀 콘텐츠 영역 또는 자동 템플릿 렌더링 */}
        <div className={`flex w-full flex-col items-center justify-center ${mobileGridLayout ? 'block' : ''}`}>
          {cards ? (
            <div className={`grid w-full gap-4 ${mobileGridLayout ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {cards.map((card, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center gap-2 rounded-xl bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${
                    mobileGridLayout && idx === 2 ? 'col-span-2' : ''
                  }`}
                >
                  {typeof card.image === 'string' ? (
                    <img src={card.image} alt={card.title} className="h-12 w-12" />
                  ) : (
                    card.image
                  )}
                  <p className="text-center text-sm font-bold text-text-primary">{card.title}</p>
                  {card.descriptions && (
                    <div className="flex flex-col items-center text-xs text-text-secondary">
                      {card.descriptions.map((desc, i) => (
                        <div key={i}>{desc}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            children
          )}
        </div>

        {/* 하단 정보 바 */}
        {bottomInfoText && (
          <div className="relative my-2 flex h-[26px] min-w-[313px] items-center justify-center rounded-lg bg-brand-secondary px-1">
            {bottomInfoIcon && (
              <Image
                src={bottomInfoIcon}
                alt=""
                width={64}
                height={64}
                className="absolute -top-5 left-0 object-contain"
              />
            )}
            <span className="caption-s text-center text-text-secondary md:body-s">{bottomInfoText}</span>
          </div>
        )}
      </div>

      {hasActions && (
        <div className="flex w-full justify-center" data-hero-actions-anchor>
          {/* 데스크탑 버튼 */}
          <div className="mt-4 hidden flex-wrap items-center justify-center gap-5 md:flex">
            <button
              onClick={onCalculate}
              className="inline-flex h-[40px] w-[132px] items-center justify-center gap-2 rounded-lg bg-brand-primary text-white transition-colors hover:bg-brand-primary-hover active:scale-[0.98]"
              data-floating-calculate
            >
              <img src="/svgs/common/actions/calculate.svg" alt="" className="h-[18px] w-[18px]" />
              <span className="body-s font-bold">보험료 계산하기</span>
            </button>
            <button
              onClick={onConsult}
              className="inline-flex h-[40px] w-[132px] items-center justify-center gap-2 rounded-lg border border-border-default bg-white text-text-primary transition-colors hover:bg-page-bg active:scale-[0.98]"
              data-floating-consult
            >
              <img src="/svgs/common/actions/consult.svg" alt="" className="h-[18px] w-[18px]" />
              <span className="body-s font-bold">상담 신청</span>
            </button>
            <button
              onClick={() => window.open('https://pf.kakao.com/_lrubxb/chat', '_blank')}
              className="inline-flex h-[40px] w-[132px] items-center justify-center gap-2 rounded-lg bg-[#FEE500] text-[#111827] shadow-sm transition-opacity hover:opacity-90 active:scale-[0.98]"
            >
              <img src="/svgs/common/actions/kakao.svg" alt="" className="h-[18px] w-[18px]" />
              <span className="body-s font-bold">카카오톡 상담하기</span>
            </button>
          </div>

          {/* 모바일 pill 바 */}
          <div className="mt-4 flex w-full max-w-96 overflow-hidden rounded-2xl border border-border-default bg-white flex-row shadow-[0_2px_12px_rgba(0,0,0,0.08)] md:hidden">
            <MobilePillButton
              label="보험료 계산"
              icon="/svgs/common/actions/calculate.svg"
              onClick={onCalculate}
              floatingTarget="calculate"
            />
            <div className="my-3 w-px shrink-0 bg-border-default" />
            <MobilePillButton
              label="상담 신청"
              icon="/svgs/common/actions/consult.svg"
              onClick={onConsult}
              floatingTarget="consult"
            />
            <div className="my-3 w-px shrink-0 bg-border-default" />
            <MobilePillButton
              label="카카오톡 상담"
              icon="/svgs/common/actions/kakao.svg"
              onClick={() => window.open('https://pf.kakao.com/_lrubxb/chat', '_blank')}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function MobilePillButton({
  label,
  icon,
  onClick,
  floatingTarget,
}: {
  label: string;
  icon: string;
  onClick?: () => void;
  floatingTarget?: 'calculate' | 'consult';
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2 transition-transform active:scale-95 active:bg-page-bg"
      aria-label={label}
      data-floating-calculate={floatingTarget === 'calculate' ? true : undefined}
      data-floating-consult={floatingTarget === 'consult' ? true : undefined}
    >
      <div
        className="h-6 w-6 bg-text-secondary"
        style={{
          maskImage: `url(${icon})`,
          WebkitMaskImage: `url(${icon})`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
        }}
      />
      <span className="body-m text-text-secondary">{label}</span>
    </button>
  );
}
