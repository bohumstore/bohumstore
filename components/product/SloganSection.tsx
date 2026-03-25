import React from 'react';
import Image from 'next/image';

export interface SloganSectionProps {
  /** 섹션 배경색 */
  backgroundColor?: string;
  /** ── 좌측 영역 ── */
  /** 브랜드 로고 (이미지 경로 or ReactNode) */
  brandLogo?: React.ReactNode;
  /** 대형 슬로건 텍스트 (ReactNode) */
  sloganTitle: React.ReactNode;
  /** 슬로건 아래 설명 텍스트 */
  descriptionText?: React.ReactNode;
  /** ✅ 체크리스트 항목들 (string 또는 ReactNode) */
  checkItems: React.ReactNode[];
  /** 일러스트 이미지 경로 (생략 가능) */
  illustrationSrc?: string;
  /** 일러스트 alt */
  illustrationAlt?: string;
  /** 좌측 하단 태그 배열 (예: MetLife의 "위기속 달러강세" 등) */
  bottomTags?: { title: string; subtitle: string }[];
  /** 하단 주석 텍스트 (예: "* 트리플 레벨업 보증률 반영(보증형에 한함)") */
  bottomNote?: string;
  /** ── 우측 카드뷰 ── */
  /** 카드뷰 내부 콘텐츠 (SloganCardView 등) */
  cardContent: React.ReactNode;
}

export default function SloganSection({
  backgroundColor = '#F0F6FF',
  brandLogo,
  sloganTitle,
  descriptionText,
  checkItems,
  illustrationSrc,
  illustrationAlt = '',
  bottomTags,
  bottomNote,
  cardContent,
}: SloganSectionProps) {
  const hasMobileBottomVisual = Boolean(illustrationSrc || (bottomTags && bottomTags.length > 0));

  /* ── 좌측 콘텐츠 렌더 함수 (모바일/데스크탑 공용) ── */
  const renderLeftContent = (isMobile: boolean) => (
    <>
      {/* 브랜드 로고 */}
      {brandLogo && <div className="mb-0">{brandLogo}</div>}

      {/* 슬로건 타이틀 */}
      <div className={isMobile ? 'mb-3' : 'mb-3'}>{sloganTitle}</div>

      {/* 설명 텍스트 */}
      {descriptionText && (
        <div className={`${isMobile ? 'body-m' : 'body-l'} text-text-secondary mb-4`}>
          {descriptionText}
        </div>
      )}

      {/* 체크리스트 */}
      <ul className={`${isMobile ? 'mb-4' : 'mb-4'}`}>
        {checkItems.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <img
              src="/svgs/common/check/check-circle.svg"
              alt=""
              className="mt-0.5 flex-shrink-0 w-5 h-5"
            />
            <span className={`body-m text-text-secondary`}>
              {item}
            </span>
          </li>
        ))}
      </ul>

    </>
  );

  /* ── 하단 주석 (데스크탑용 절대 위치) ── */
  const renderBottomNoteDesktop = () =>
    bottomNote ? <p className="caption-r text-text-muted absolute bottom-0">{bottomNote}</p> : null;

  /* ── 하단 태그 렌더 함수 ── */
  const renderBottomTags = () => {
    if (!bottomTags || bottomTags.length === 0) return null;
    return (
      <div className="inline-flex items-stretch bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        {bottomTags.map((tag, i) => (
          <div key={i} className="flex items-center">
            {i > 0 && (
              <div className="w-[2px] h-4 bg-brand-secondary-hover rounded-full" />
            )}
            <div className="px-4 py-2">
              <div className="body-m text-[15px] font-bold text-text-primary">{tag.title}</div>
              <div className="body-m text-text-secondary">{tag.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full" style={{ backgroundColor }}>
      {/* ═══════════════════════════════════
       * 모바일 레이아웃 (md 미만)
       * ═══════════════════════════════════ */}
      <section className="block md:hidden w-full px-5 py-8">
        <div className={`relative ${hasMobileBottomVisual ? 'pb-16' : ''}`}>
          {renderLeftContent(true)}
          {/* 하단 태그 (모바일: 좌하단) */}
          <div className="absolute bottom-0 left-0 z-20">
            {renderBottomTags()}
          </div>
          {/* 일러스트 (모바일: 우하단) */}
          {illustrationSrc && (
            <div className="pointer-events-none absolute -bottom-5 -right-5 z-10 h-[124px] w-[146px]">
              <Image
                src={illustrationSrc}
                alt={illustrationAlt}
                fill
                priority
                sizes="146px"
                className="object-contain"
              />
            </div>
          )}
        </div>

        {/* 카드뷰 + 버튼 */}
        <div className="mt-4">{cardContent}</div>

        {/* 하단 주석 (모바일: 카드 아래) */}
        {bottomNote && (
          <p className="text-center caption-r text-text-muted mt-3 px-1">{bottomNote}</p>
        )}
      </section>

      {/* ═══════════════════════════════════
       * 데스크탑 레이아웃 (md 이상)
       * ═══════════════════════════════════ */}
      <section className="hidden md:flex w-full h-[368px] pt-10 pb-12 justify-center overflow-hidden">
        <div className="flex w-full max-w-[1040px] mx-auto px-8">
          {/* 상단: 좌측 슬로건 + 우측 카드뷰 */}
          <div className="flex items-start justify-between gap-2 w-full">
            {/* ── 좌측 ── */}
            <div className="relative w-full h-full">
              {renderLeftContent(false)}
              {/* 하단 주석 (데스크탑: 절대 위치 하단) */}
              {renderBottomNoteDesktop()}
              {/* 하단 태그 (데스크탑: 좌하단) */}
              <div className="absolute bottom-8 left-0">
                {renderBottomTags()}
              </div>
              {/* 일러스트 (데스크탑: 우하단) */}
              {illustrationSrc && (
                <div className="absolute bottom-2 right-8 w-[160px] h-[120px]">
                  <Image
                    src={illustrationSrc}
                    alt={illustrationAlt}
                    fill
                    priority
                    sizes="160px"
                    className="object-contain"
                  />
                </div>
              )}
            </div>

            {/* ── 우측 카드뷰 + 버튼 ── */}
            <div className="w-full">{cardContent}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
