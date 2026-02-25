import React from 'react';
import Image from 'next/image';
import { useResponsive } from '@/hooks/useResponsive';
import Button from '@/components/shared/Button';

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
  /** 계산기 버튼 클릭 핸들러 */
  onCalculateClick: () => void;
  /** 상담 신청 버튼 클릭 핸들러 */
  onConsultClick: () => void;
}

export default function ProductHero({
  backgroundColor = 'var(--section-bg)',
  titleMobile,
  titleDesktop,
  subtitle,
  productName,
  mainImageSrc,
  mainImageAlt = '',
  features,
  onCalculateClick,
  onConsultClick,
}: ProductHeroProps) {
  const { isMobile } = useResponsive();

  return (
    <>
      {isMobile ? (
        /* ═══════════════════════════════════
         * 모바일 레이아웃
         * ═══════════════════════════════════ */
        <section className="w-full px-6 py-8" style={{ backgroundColor }}>
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
              <Button variant="primary" onClick={onCalculateClick} className="w-[180px]">
                보험료 계산하기
              </Button>
              <Button variant="outline" onClick={onConsultClick} className="w-[180px]">
                상담 신청
              </Button>
            </div>
            {mainImageSrc && (
              <Image
                src={mainImageSrc}
                alt={mainImageAlt}
                width={120}
                height={60}
                className="object-contain"
              />
            )}
          </div>

          {/* 피처 카드 (세로 리스트) */}
          <div className="flex flex-col gap-3">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-xl bg-white p-6 border border-border-default overflow-hidden relative"
              >
                <Image src={f.icon} alt="" width={64} height={64} />
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
      ) : (
        /* ═══════════════════════════════════
         * 데스크탑 레이아웃 (기존 유지)
         * ═══════════════════════════════════ */
        <section
          className="w-full h-[368px] flex items-center px-12"
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
                  <Image
                    src={mainImageSrc}
                    alt={mainImageAlt}
                    width={160}
                    height={100}
                    className="object-contain"
                  />
                )}
              </div>
              <div className="flex justify-between w-full">
                <Button variant="primary" size="lg" onClick={onCalculateClick} className="w-[160px] text-[15px]">
                  보험료 계산하기
                </Button>
                <Button variant="outline" size="lg" onClick={onConsultClick} className="w-[160px] text-[15px]">
                  상담 신청
                </Button>
              </div>
            </div>
            <div className="grid w-[417px] grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="relative flex flex-col rounded-xl bg-card-service p-5 h-[140px] shadow-md"
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
                    <Image src={f.icon} alt="" width={70} height={70} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
