'use client';

import React, { useEffect } from 'react';
import { trackPageVisit } from '@/lib/visitorTracking';
import HeroSection from '@/components/home/HeroSection';
import PopularSection from '@/components/home/PopularSection';
import TrendingSection from '@/components/home/TrendingSection';
import AboutSection from '@/components/home/AboutSection';
import ReviewSection from '@/components/home/ReviewSection';
import ContactSection from '@/components/home/ContactSection';
import RequiredNotice from '@/components/shared/RequiredNotice';
import Footer from '@/components/shared/Footer';

export default function HomePage() {
  useEffect(() => {
    // 페이지 방문 시 자동 추적
    trackPageVisit();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-page-bg">
      {/* 슬로건 캐러셀 섹션 - 화면 전체를 채우는 히어로 배너 */}
      <HeroSection />

      {/* 추천 상품 섹션 */}
      <PopularSection />

      {/* 보험 특징 섹션 */}
      <TrendingSection />

      {/* 보험스토어 소개 섹션 */}
      <AboutSection />

      {/* 고객 후기 섹션 */}
      <ReviewSection />

      {/* 문의 섹션 */}
      <ContactSection />

      {/* 필수안내사항 박스 */}
      <RequiredNotice />

      {/* 푸터 */}
      <Footer />

    </div>
  );
}
