import React from 'react';
import Image from 'next/image';
import Button from '@/components/shared/Button';
import IconButton from '@/components/IconButton';

export interface ProductFeature {
  icon: string;
  title: string;
  title_sub?: string;
  subtitle?: string;
  small?: boolean;
}

export interface ProductHeroProps {
  /** 히어로 배경색 (예: '#e8ecf4', 'var(--section-bg)' 등) */
  backgroundColor?: string;
  /** 피처 카드 배경색 (예: '#FEF3C7') – 미지정 시 기본 스타일 */
  featureCardColor?: string;
  /** 모바일 화면용 타이틀 (ReactNode 형태) */
  titleMobile: React.ReactNode;
  /** 데스크탑 화면용 타이틀 (ReactNode 형태) */
  titleDesktop: React.ReactNode;
  /** 메인 타이틀 아래에 들어갈 서브타이틀 (상풍명 등) */
  subtitle?: string;
  /** 상품명 (메인 타이틀 하단 서브타이틀) */
  productName?: string;
  /** 돼지/로고 등 메인 일러스트 이미지 경로 */
  mainImageSrc: string;
  /** 이미지 Alt 속성 */
  mainImageAlt?: string;
  /** 피처 카드(보장 특징 등) 리스트 */
  features: ProductFeature[];
  /** 왼쪽(Primary) 버튼 라벨 – 기본값 '보험료 계산하기' */
  calculateButtonLabel?: string;
  /** 왼쪽(Primary) 버튼 스타일 변형 (기본: primary, 카카오톡: kakao) */
  calculateButtonVariant?: 'primary' | 'kakao';
  /** 계산기 버튼 클릭 핸들러 */
  onCalculateClick: () => void;
  /** 상담 신청 버튼 클릭 핸들러 */
  onConsultClick: () => void;
}

export default function ProductHero({
  backgroundColor = 'var(--section-bg)',
  featureCardColor,
  titleMobile,
  titleDesktop,
  subtitle,
  productName,
  mainImageSrc,
  mainImageAlt = '',
  features,
  calculateButtonLabel = '보험료 계산하기',
  calculateButtonVariant = 'primary',
  onCalculateClick,
  onConsultClick,
}: ProductHeroProps) {
  // SSR 환경에서의 안전한 처리를 위해 두 가지 레이아웃을 모두 렌더링하고
  // 오직 CSS 미디어 쿼리(Tailwind의 md:hidden, md:flex)에만 의존하여 깜빡임을 원천 차단합니다.
  return (
    <div className="w-full">
      {/* ═══════════════════════════════════
       * 모바일 레이아웃 (md 미만에서 표시)
       * ═══════════════════════════════════ */}
      <section className="block md:hidden w-full px-6 py-8" style={{ backgroundColor }}>
        {/* 제목 */}
        <div className="mb-8">
          <div className="heading-2 text-text-primary leading-tight">
            {titleMobile}
          </div>
          {productName && (
            <p className="body-l text-text-muted mt-2 font-medium">{productName}</p>
          )}
          {subtitle && (
            <p className="body-l text-text-secondary mt-2">{subtitle}</p>
          )}
        </div>

        {/* CTA 버튼 + 메인 이미지 */}
        <div className="flex items-end justify-between mb-8">
          <div className="flex flex-col gap-2">
            {calculateButtonVariant === 'kakao' ? (
              <IconButton variant="kakao" size="m" onClick={onCalculateClick} className="w-[180px] min-h-[42px]" aria-label={calculateButtonLabel}>
                {calculateButtonLabel}
              </IconButton>
            ) : (
              <Button variant="primary" onClick={onCalculateClick} className="w-[180px]" aria-label={calculateButtonLabel}>
                {calculateButtonLabel}
              </Button>
            )}
            <Button variant="outline" onClick={onConsultClick} className="w-[180px]">
              상담 신청
            </Button>
          </div>
          {mainImageSrc && (
            <div className="relative w-[240px] h-[120px]">
              <Image
                src={mainImageSrc}
                alt={mainImageAlt}
                fill
                priority
                sizes="240px"
                className="object-contain"
              />
            </div>
          )}
        </div>

        {/* 피처 카드 (세로 리스트) */}
        <div className="flex flex-col gap-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-xl p-6 border border-border-default overflow-hidden relative"
              style={{ backgroundColor: featureCardColor || 'white' }}
            >
              <Image src={f.icon} alt="" width={64} height={64} priority={i < 2} />
              <div className="relative z-10">
                <div className="heading-5 text-text-primary">{f.title}</div>
                {f.small ? (
                  <div className="caption-r text-text-muted mt-0.5 leading-tight whitespace-pre-line">
                    {f.subtitle}
                  </div>
                ) : (
                  <div className="heading-5 text-text-secondary">{f.title_sub}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════
       * 데스크탑 레이아웃 (md 이상에서 표시)
       * ═══════════════════════════════════ */}
      <section
        className="hidden md:flex w-full h-[368px] items-center px-12"
        style={{ backgroundColor }}
      >
        <div className="w-full max-w-[960px] mx-auto flex items-center justify-between px-10">
          <div className="flex flex-col items-start w-[340px]">
            <div className="mb-4">
              {titleDesktop}
              {productName && (
                <p className="body-l text-text-muted mt-2 font-medium">{productName}</p>
              )}
              {subtitle && (
                <p className="body-l text-text-secondary mt-2">{subtitle}</p>
              )}
            </div>
            <div className="flex flex-row-reverse w-full mb-2">
              {mainImageSrc && (
                <div className="relative w-[160px] h-[100px]">
                  <Image
                    src={mainImageSrc}
                    alt={mainImageAlt}
                    fill
                    priority
                    sizes="160px"
                    className="object-contain"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-between w-full">
              {calculateButtonVariant === 'kakao' ? (
                <IconButton variant="kakao" size="m" onClick={onCalculateClick} className="w-[160px] min-h-[48px] text-[15px]" aria-label={calculateButtonLabel}>
                  {calculateButtonLabel}
                </IconButton>
              ) : (
                <Button variant="primary" size="lg" onClick={onCalculateClick} className="w-[160px] text-[15px]" aria-label={calculateButtonLabel}>
                  {calculateButtonLabel}
                </Button>
              )}
              <Button variant="outline" size="lg" onClick={onConsultClick} className="w-[160px] text-[15px]">
                상담 신청
              </Button>
            </div>
          </div>
          <div className="grid w-[417px] grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="relative flex flex-col rounded-xl p-5 h-[140px] shadow-md"
                style={{ backgroundColor: featureCardColor || 'var(--card-service)' }}
              >
                <div>
                  <div className="heading-5 text-text-primary">
                    {f.title}
                    {f.title_sub && (
                      <>
                        <br />
                        {f.title_sub}
                      </>
                    )}
                  </div>
                  {f.small && f.subtitle && (
                    <div className="caption-r text-text-muted mt-1 leading-tight whitespace-pre-line">
                      {f.subtitle}
                    </div>
                  )}
                </div>
                <div className="absolute bottom-4 right-4">
                  <Image src={f.icon} alt="" width={70} height={70} priority={i < 2} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
