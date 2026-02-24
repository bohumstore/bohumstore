'use client';

import Image from 'next/image';
import { useResponsive } from '@/hooks/useResponsive';

const reviews = [
  {
    id: 1,
    name: 'Sarah L.',
    text: '"보험스토어 덕분에 보장이 정확히 필요한 만큼인지 알 수 있었어요."',
  },
  {
    id: 2,
    name: 'James T.',
    text: '상담이 친절했고 설명이 명확해서 믿음이 갔습니다.',
  },
  {
    id: 3,
    name: 'Emily R.',
    text: '연금보험 비교 설명이 이해하기 쉬웠어요.',
  },
];

export default function ReviewSection() {
  const { isMobile } = useResponsive();

  return (
    <div className={`flex flex-col items-center gap-8 pt-10 pb-5 ${isMobile ? 'w-full px-6' : 'min-w-[782px]'}`}>
      {/* Header */}
      <div className="flex flex-col items-center gap-2">
        <div className={`text-text-muted ${isMobile ? 'body-m' : 'body-xl'}`}>실제 가입자 후기만 모아봤어요.</div>
        <div className="flex items-center">
          <Image
            src="/svgs/main-review-title-star.svg"
            alt="Review Star Icon"
            width={isMobile ? 50 : 70}
            height={isMobile ? 50 : 70}
          />
          <h2 className={`text-text-primary ${isMobile ? 'heading-3' : 'heading-1'}`}>고객 후기</h2>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className={`w-full ${isMobile ? 'flex flex-col gap-4' : 'grid grid-cols-3 gap-6'}`}>
        {reviews.map((review) => (
          <div
            key={review.id}
            className={`flex flex-col gap-2 bg-card-review rounded-s p-4 shadow-md ${
              isMobile ? 'w-full' : 'w-[250px] h-[152px]'
            }`}
          >
            {/* User Info & Rating */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D1D5DB]" />
                <span className="text-text-primary body-m">{review.name}</span>
              </div>
              <Image
                src="/svgs/main-review-client-star.svg"
                alt="5 Stars"
                width={80}
                height={16}
              />
            </div>
            {/* Review Text */}
            <p className="body-l text-text-primary leading-relaxed">
              {review.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
