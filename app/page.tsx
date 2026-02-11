"use client";

import React, { useEffect } from "react";
import { trackPageVisit } from "@/lib/visitorTracking";
import HeroSection from "@/components/home/HeroSection";
import RecommendSection from "@/components/home/RecommendSection";
import ReasonSection from "@/components/home/ReasonSection";
import RequiredNotice from "@/components/shared/RequiredNotice";
import Footer from "@/components/shared/Footer";
import FloatingButtons from "@/components/shared/FloatingButtons";

export default function HomePage() {
  useEffect(() => {
    // 페이지 방문 시 자동 추적
    trackPageVisit();
  }, []);

  return (
    <div className="font-sans min-h-screen bg-[#f8f8f8] flex flex-col items-center w-full">
      
      {/* 슬로건 캐러셀 섹션 - 화면 전체를 채우는 히어로 배너 */}
      <HeroSection />

      {/* 추천 상품 섹션 */}
      <RecommendSection />

      {/* 보험 특징 섹션 */}
      <ReasonSection />

      {/* 필수안내사항 박스 */}
      <RequiredNotice />

      {/* 푸터 */}
      <Footer />
      
      {/* 플로팅 버튼 모음 */}
      <FloatingButtons showConsult={true} />
    </div>
  );
}

