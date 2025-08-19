"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { trackPageVisit } from "@/app/utils/visitorTracking";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/* =========================
   데이터
========================= */

// 히어로(슬로건) 슬라이드 – 필요하면 색만 추가해 확장
const heroSlides = [
  { bg: "#D6E6FF" }, // 피그마 배경 톤
];

// 카테고리 버튼 (아이콘 파일명은 /public/images 기준)
const insuranceCategories = [
  { key: "종합", icon: "/images/clinic.png" },
  { key: "암", icon: "/images/medicine-bottle-3d.png" },
  { key: "3대진단", icon: "/images/first-aid.png" },
  { key: "어린이", icon: "/images/bandage-plaster-3d.png" },
  { key: "간병인", icon: "/images/heart.png" },
  { key: "유병자", icon: "/images/iv-drip-3d.png" },
  // 아래 세 개는 아이콘을 더 크게
  { key: "단기납종신", icon: "/images/hand-coins.png", big: true },
  { key: "연금", icon: "/images/hand-holding-cash-3d.png", big: true },
  { key: "변액연금", icon: "/images/chart-up.png", big: true },
];

// 추천 상품 카드 6개 (왼→오, 윗줄→아랫줄)
const recommendedProducts = [
  {
    id: 1,
    name: "KDB생명 행복플러스 연금보험(보증형)",
    description: "연단리 7% 보증으로 안정적인 노후 준비",
    badge: "HOT",
    badgeColor: "bg-red-100 text-red-800",
    bg: "rgba(254, 255, 214, 0.7)",
    icon: "/images/megaphone-3d.png",
  },
  {
    id: 2,
    name: "KDB생명 행복드림 변액연금보험",
    description: "연단리 7% 보증으로 안정성과 수익성 동시 확보",
    badge: "NEW",
    badgeColor: "bg-blue-100 text-blue-800",
    bg: "rgba(218, 214, 255, 0.7)",
    icon: "/images/discount-coupon-hands-3d.png",
  },
  {
    id: 3,
    name: "IBK연금보험 평생보증받는 변액연금보험",
    description: "연단리 8% 보증으로 평생 연금 보장",
    badge: "HOT",
    badgeColor: "bg-red-100 text-red-800",
    bg: "rgba(255, 214, 215, 0.7)",
    icon: "/images/travel-suitcase-3d.png",
  },
  {
    id: 4,
    name: "신한라이프 모아더드림 Plus 종신보험",
    description: "15세~70세 전연령 10년시점 122.7% 환급률",
    badge: "NEW",
    badgeColor: "bg-blue-100 text-blue-800",
    bg: "rgba(214, 253, 255, 0.7)",
    icon: "/images/keys-3d.png",
  },
  {
    id: 5,
    name: "동양생명 New 알뜰플러스 종신보험",
    description: "15세~65세 가입가능 10년시점 123.9% 환급률",
    badge: "BEST",
    badgeColor: "bg-yellow-100 text-yellow-800",
    bg: "rgba(220, 255, 214, 0.7)",
    icon: "/images/clock-3d.png",
  },
  {
    id: 6,
    name: "메트라이프생명 백만인을위한달러종신PLUS",
    description: "달러 또는 원화로 환급 10년시점 124.9% 환급률",
    badge: "BEST",
    badgeColor: "bg-yellow-100 text-yellow-800",
    bg: "rgba(250, 214, 255, 0.7)",
    // 파일명을 Layer%201.png 으로 사용
    icon: "/images/Layer%201.png",
  },
];

export default function HomePage() {
  // 페이지 방문 시 추적
  useEffect(() => {
    trackPageVisit();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* 헤더 */}
      <header className="w-full flex justify-center items-center py-6 px-4 bg-[#F8F8F8] border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Image
            src="/bohumstore-logo.png"
            alt="보험스토어"
            width={180}
            height={60}
            className="object-contain"
            unoptimized
          />
          <div className="w-px h-8 bg-[#D1D5DC]" />
          <Link
            href="/admin/visitor-tracking"
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            방문자 추적 관리
          </Link>
        </div>
      </header>

      {/* 히어로(슬로건): 방향키로만 이동, 폼/이미지 배치 고정 */}
      <section className="w-full">
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          loop
          speed={600}
          allowTouchMove={false} // 터치/드래그 금지 → 폼 작성 중 이동 방지
          navigation={{ nextEl: ".hero-next", prevEl: ".hero-prev" }}
          pagination={{ clickable: true, el: ".hero-pagination" }}
          className="w-full"
        >
          {heroSlides.map((s, idx) => (
            <SwiperSlide key={idx}>
              <div className="w-full" style={{ backgroundColor: s.bg }}>
                <div className="mx-auto max-w-[1920px] relative">
                  {/* 안쪽 컨테이너 1200px 고정 */}
                  <div className="mx-auto max-w-[1200px] px-4 py-10 md:py-12 lg:py-14">
                    <div className="grid lg:grid-cols-[1fr_520px] gap-10 items-center min-h-[560px]">
                      {/* 좌측: 텍스트 + 체크목록 + 돼지 일러스트(텍스트 쪽으로 배치) */}
                      <div className="order-2 lg:order-1">
                        <p className="text-[16px] md:text-[18px] text-[#4A5565] mb-2">
                          연단리 7% 보증형 연금보험
                        </p>
                        <h1 className="text-[28px] md:text-[36px] lg:text-[40px] leading-[1.25] font-extrabold text-[#1E293B]">
                          연단리 7% 보증, <br className="hidden md:block" />
                          연금액 높은 보증형 연금보험
                          <span className="align-top text-[13px] md:text-[14px] ml-1 text-[#64748B]">
                            (20년까지)
                          </span>
                        </h1>

                        <ul className="mt-6 space-y-3">
                          {[
                            "가입 20년 전까지 연 7%, 이후 연금개시 전까지 연 5% 기준으로 '금액보증연금' 보증",
                            "선지급행복자금 0%~30%까지 가능",
                            "보험연령 15세~70세 가입, 연금개시 55세~80세 신청 가능",
                          ].map((t, i) => (
                            <li
                              key={i}
                              className="flex gap-3 text-[15px] md:text-[16px] leading-[24px] text-[#334155] font-medium"
                            >
                              <Image
                                src="/images/checkmark-square-3d.png"
                                alt="체크"
                                width={20}
                                height={20}
                                className="w-5 h-5 flex-shrink-0"
                                unoptimized
                              />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>

                        {/* 돼지 일러스트 – 텍스트 영역 안쪽에 배치 */}
                        <div className="mt-6 hidden md:block">
                          <Image
                            src="/images/piggy-cluster.png"
                            alt="저금통 3D"
                            width={360}
                            height={360}
                            className="object-contain"
                            priority
                            unoptimized
                          />
                        </div>
                      </div>

                      {/* 우측: 무료 상담 신청 폼 (가운데로, 오른쪽 과붙음 방지) */}
                      <div className="order-1 lg:order-2 w-full flex justify-center lg:justify-start">
                        <div className="w-full max-w-[448px]">
                          <div className="bg-white rounded-2xl border-2 border-[#3A8094] shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-6">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-4 h-4 border-2 border-[#3A8094] rounded-sm" />
                              <h3 className="text-[18px] md:text-[20px] font-extrabold text-[#3A8094]">
                                무료 상담 신청
                              </h3>
                            </div>

                            <form className="space-y-4">
                              {/* 성별 */}
                              <div>
                                <label className="block text-[13px] font-medium text-[#4A5565] mb-2">
                                  성별
                                </label>
                                <div className="flex gap-6 text-[14px]">
                                  <label className="flex items-center gap-2">
                                    <input type="radio" name="gender" className="w-4 h-4" />
                                    남자
                                  </label>
                                  <label className="flex items-center gap-2">
                                    <input type="radio" name="gender" className="w-4 h-4" />
                                    여자
                                  </label>
                                </div>
                              </div>

                              {/* 이름 / 생년월일 */}
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-[13px] font-medium text-[#4A5565] mb-1">
                                    이름
                                  </label>
                                  <input
                                    className="w-full h-[38px] rounded-md border border-[#D1D5DC] px-3 text-[14px]"
                                    placeholder="홍길동"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[13px] font-medium text-[#4A5565] mb-1">
                                    생년월일
                                  </label>
                                  <input
                                    className="w-full h-[38px] rounded-md border border-[#D1D5DC] px-3 text-[14px]"
                                    placeholder="19880818"
                                  />
                                </div>
                              </div>

                              {/* 연락처 */}
                              <div>
                                <label className="block text-[13px] font-medium text-[#4A5565] mb-1">
                                  연락처
                                </label>
                                <input
                                  className="w-full h-[38px] rounded-md border border-[#D1D5DC] px-3 text-[14px]"
                                  placeholder="01012345678"
                                />
                              </div>

                              {/* 상담종류 */}
                              <div>
                                <label className="block text-[13px] font-medium text-[#4A5565] mb-1">
                                  상담 종류
                                </label>
                                <select className="w-full h-[40px] px-3 border-2 border-[#E5E7EB] rounded-lg text-[14px] text-center">
                                  <option>- 상담 종류 -</option>
                                </select>
                              </div>

                              {/* 상담 시간대 */}
                              <div>
                                <label className="block text-[13px] font-medium text-[#4A5565] mb-1">
                                  상담 시간대
                                </label>
                                <select className="w-full h-[40px] px-3 border-2 border-[#E5E7EB] rounded-lg text-[14px] text-center">
                                  <option>- 상담 시간대 -</option>
                                </select>
                              </div>

                              {/* 동의 – 오른쪽 정렬 */}
                              <div className="flex justify-end">
                                <label className="flex items-center gap-2 text-[12px] text-[#475569]">
                                  <input type="checkbox" className="w-3.5 h-3.5" />
                                  <span>개인정보 수집 및 이용에 동의합니다.</span>
                                  <button type="button" className="text-[#155DFC] underline">
                                    자세히 보기
                                  </button>
                                </label>
                              </div>

                              {/* 버튼 */}
                              <div className="flex gap-2 pt-1">
                                <button
                                  type="button"
                                  className="flex-1 h-[48px] rounded-xl bg-[#FA5A5A] text-white font-bold text-[16px] flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow transition"
                                >
                                  상담신청
                                  {/* SVG 화살표 – 폰트 깨짐 방지 */}
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12h14M13 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </button>
                                <button
                                  type="button"
                                  className="flex-1 h-[48px] rounded-xl bg-[#FEE500] text-[#3D1E1E] font-bold text-[16px] flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow transition"
                                >
                                  채팅 상담하기
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12h14M13 5l7 7-7 7" stroke="#3D1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 슬라이드 네비 버튼 */}
                  <button className="hero-prev absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M15 19L8 12L15 5" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button className="hero-next absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M9 5L16 12L9 19" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className="hero-pagination absolute bottom-4 left-1/2 -translate-x-1/2" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 카테고리 */}
      <section className="w-full bg-white py-12 md:py-16">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {insuranceCategories.map((c) => (
              <Link key={c.key} href="#" className="group">
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="w-20 h-20 md:w-[92px] md:h-[92px] rounded-[32px] flex items-center justify-center transition-transform group-hover:scale-110 bg-[#EEF4FE] shadow-sm"
                  >
                    <Image
                      src={c.icon}
                      alt={c.key}
                      width={c.big ? 68 : 56}
                      height={c.big ? 68 : 56}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <span className="text-[14.5px] md:text-[15.5px] leading-4 font-medium text-[#111111] text-center">
                    {c.key}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 이 달의 추천 상품 */}
      <section className="w-full bg-white py-12 md:py-16">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-[26px] md:text-[30px] leading-9 font-bold text-[#4A5565] mb-3">
              이 달의 추천 상품
            </h2>
            <p className="text-[15px] md:text-[16px] leading-6 text-[#4A5565]">
              지금 가장 반응 좋은 상품만 엄선했어요
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {recommendedProducts.map((p) => (
              <Link key={p.id} href="#" className="group">
                <div
                  className="h-[280px] md:h-[300px] rounded-2xl p-8 md:p-10 relative overflow-hidden transition-transform group-hover:-translate-y-1 group-hover:shadow-lg"
                  style={{ backgroundColor: p.bg }}
                >
                  {/* 배지 */}
                  <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-semibold ${p.badgeColor}`}>
                    {p.badge}
                  </div>

                  {/* 내용 */}
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-[14px] md:text-[15px] leading-4 font-normal text-[#333333] mb-6 md:mb-8">
                        {p.name}
                      </h3>
                      <p className="text-[20px] md:text-[22.5px] leading-[28px] md:leading-[30px] font-bold text-[#333333] mb-6 md:mb-8">
                        {p.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        className="flex items-center gap-2 text-[#656565] text-[14px] font-medium"
                        type="button"
                      >
                        <span>자세히 보기</span>
                        {/* SVG 화살표 */}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M9 5l7 7-7 7" stroke="#656565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>

                      <Image
                        src={p.icon}
                        alt={`${p.name} 아이콘`}
                        width={120}
                        height={120}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 어떤 보험이 궁금하세요? */}
      <section className="w-full bg-white py-12 md:py-16">
        <div className="mx-auto max-w-[1200px] px-4">
          <h2 className="text-[26px] md:text-[30px] leading-8 font-bold text-black text-center mb-8 md:mb-10">
            어떤 보험이 궁금하세요?
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* 전화상담 */}
            <div className="bg-white border border-[#DBDBDB] rounded-2xl p-8 md:p-10 relative overflow-hidden hover:shadow-md transition">
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-[18px] md:text-[20px] font-bold text-[#111111] mb-2">
                    전문상담원 연결하기
                  </h3>
                  <p className="text-[28px] md:text-[32px] leading-[34px] font-bold text-[#03519C]">
                    1533-3776
                  </p>
                  <p className="text-[14px] md:text-[15px] mt-2 text-[#656565]">상담 예약하기</p>
                </div>
                <Image
                  src="/images/support-agent-headset-3d.png"
                  alt="전문 상담원"
                  width={110}
                  height={110}
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>

            {/* 채팅상담 */}
            <div className="bg-white border border-[#DBDBDB] rounded-2xl p-8 md:p-10 relative overflow-hidden hover:shadow-md transition">
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-[18px] md:text-[20px] font-bold text-[#111111]">
                    실시간 상담은 <br /> 채팅으로 바로바로!
                  </h3>
                  <p className="text-[14px] md:text-[15px] mt-2 text-[#656565]">1:1 채팅상담</p>
                </div>
                <Image
                  src="/images/chat-bubble.png"
                  alt="채팅 아이콘"
                  width={110}
                  height={110}
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 구분선 */}
      <div className="w-full flex justify-center py-4 bg-white">
        <div className="w-full max-w-[1200px] px-6">
          <hr className="border-[#D1D5DC]" />
        </div>
      </div>

      {/* 필수안내사항 – 푸터와 동일 배경 */}
      <section className="w-full bg-[#F8F8F8] py-10">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="space-y-2 md:space-y-3">
            <h3 className="text-sm font-bold text-[#1E2939]">[ 필수안내사항 ]</h3>
            <p className="text-sm text-[#1E2939]">
              ※ 본 광고는 심의기준을 준수하였으며, 유효기간은 심의일로부터 1년입니다.
            </p>
            <p className="text-sm text-[#FB2C36]">
              ※ 본계약은 기존 보험계약을 해지하고 새로운 보험계약을 체결하는 과정에서
            </p>
            <p className="text-sm text-[#FB2C36]">① 진행이력, 연령등에 따라 가입이 거절되거나 보험료가 인상될 수 있습니다.</p>
            <p className="text-sm text-[#FB2C36]">② 가입 상품에 따라 새로운 면책기간 적용 및 보장 제한 등 기타 불이익이 발생할 수 있습니다.</p>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="w-full bg-[#F8F8F8] border-t border-[#E5E7EB] py-8">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="text-center space-y-6">
            {/* 로고들 */}
            <div className="flex justify-center items-center gap-6">
              <Image src="/metarich-logo1.png" alt="MetaRich 로고" width={120} height={40} />
              <div className="w-px h-8 bg-[#D1D5DC]" />
              <Image src="/bohumstore-logo.png" alt="보험스토어 로고" width={120} height={40} />
            </div>

            {/* 회사 정보 */}
            <div className="space-y-2 text-sm text-[#6A7282]">
              <p>(주)메타리치보험대리점 | 대리점등록번호: 제2023070016호</p>
              <p>보험스토어 | 서지후 | 등록번호: 제20060383110008호</p>
              <p>대표전화: 1533-3776 | 이메일: urisky1@naver.com</p>
            </div>

            <p className="text-sm text-[#6A7282]">© {new Date().getFullYear()} BohumStore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
