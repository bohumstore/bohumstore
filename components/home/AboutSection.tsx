'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

export default function AboutSection() {
  return (
    <div className="w-full max-w-[740px] mx-auto flex flex-col gap-6 pt-10 pb-5">
      <div className="flex flex-row gap-8 items-center">
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <Image
            src="/svgs/main-about-shield.svg"
            alt="보험스토어 로고"
            width={200}
            height={200}
          />
          <div className="heading-h1 text-[32px] text-text-primary mb-2">
            <span className="text-brand-primary">보험스토어</span>는요
          </div>
          <div className="body-m text-text-muted">
            꼭 필요한 보험만 다루는<br />
            보험 비교 서비스
          </div>
        </div>

        <div className="bg-white rounded-[16px] px-5 py-6 shadow-md flex flex-col gap-3 w-[360px]">
          <div className="flex items-center gap-4">
            <Image
              src="/svgs/main-about-check.svg"
              alt="점검 아이콘"
              width={66}
              height={66}
            />
            <div className="flex flex-col">
              <div className="heading-h1 text-[24px] text-text-primary mb-1">
                내 보험, <span className="text-brand-primary">3분</span> 점검하기
              </div>
              <div className="body-m text-text-muted">지금 내 보험, 제대로 준비되어 있을까요?</div>
            </div>
          </div>

          <div className="bg-brand-primary-soft rounded-md px-5 py-3">
            <p className="heading-h4 text-text-primary mb-2">
              <span className="text-brand-primary">3분</span> 만에 내 보험을 간편하게 점검해보세요.
            </p>
            <Link
            href="/insurance/check"
            className="flex items-center justify-between w-full bg-brand-primary hover:bg-brand-primary-hover text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
                <span className="action-l">무료 점검 시작하기</span>
                <ArrowRightIcon className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>
      </div>
      {/* Bottom Section: Features Grid */}
      <div className="grid grid-cols-2 gap-6">

        {/* Feature 1 */}
        <div className="bg-card-service rounded-[24px] px-5 py-6 flex items-center justify-between w-[360px] h-[130px]">
          <div className="flex flex-col gap-2">
            <h3 className="heading-h1 text-text-primary text-[24px]">전문 상담사의 보장 분석</h3>
            <p className="body-m text-text-muted">내 보험, 지금 상태를 한 번에 정리해줘요.</p>
          </div>
          <div className="relative w-20 h-20 shrink-0">
            <Image
              src="/svgs/main-about-analyze.svg"
              alt="분석 아이콘"
              fill
              className="object-contain"
            />
          </div>
        </div>
        {/* Feature 2 */}
        <div className="bg-card-service rounded-[24px] px-5 py-6 flex items-center justify-between w-[360px] h-[130px]">
          <div className="flex flex-col gap-2">
            <h3 className="heading-h1 text-text-primary text-[24px]">딱 맞는 보험 추천</h3>
            <p className="body-m text-text-muted">가입 전 꼭 비교 할 부분만 콕 집어 안내해요.</p>
          </div>
          <div className="relative w-20 h-20 shrink-0">
            <Image
              src="/svgs/main-about-recommend.svg"
              alt="추천 아이콘"
              fill
              className="object-contain"
            />
          </div>
        </div>
        {/* Feature 3 */}
        <div className="bg-card-service rounded-[24px] px-5 py-6 flex items-center justify-between w-[360px] h-[130px]">
          <div className="flex flex-col gap-2">
            <h3 className="heading-h1 text-text-primary text-[24px]">불필요한 보험은 빼기</h3>
            <p className="body-m text-text-muted">내 상황에 맞춰 제안해드려요.</p>
          </div>
          <div className="relative w-20 h-20 shrink-0">
            <Image
              src="/svgs/main-about-cut.svg"
              alt="절감 아이콘"
              fill
              className="object-contain"
            />
          </div>
        </div>
        {/* Feature 4 */}
        <div className="bg-card-service rounded-[24px] px-5 py-6 flex items-center justify-between w-[360px] h-[130px]">
          <div className="flex flex-col gap-2">
            <h3 className="heading-h1 text-text-primary text-[24px]">실시간 채팅 상담</h3>
            <p className="body-m text-text-muted">궁금한 건 바로 물어볼 수 있어요.</p>
          </div>
          <div className="relative w-20 h-20 shrink-0">
            <Image
              src="/svgs/main-about-chat.svg"
              alt="채팅 아이콘"
              fill
              className="object-contain"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
