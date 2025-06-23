"use client";
import { useState } from "react";
import Image from "next/image";
import { CalculatorIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

export default function HelloPage() {
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [activeTab, setActiveTab] = useState('상품정보');

  return (
    <div className="font-sans min-h-screen bg-[#f8f8f8] flex flex-col items-center w-full">
      {/* 상단 네비 - 로고만 가운데, 배경색 #f8f8f8, 연회색 경계선 */}
      <header className="w-full flex items-center justify-center py-6 px-4 md:px-12 bg-[#f8f8f8] border-b border-gray-200">
        <Image src="/bohumstore-logo.png" alt="보험스토어 로고" width={220} height={60} priority />
      </header>

      {/* 브랜드 슬로건/보험료 확인 영역 (이미지 스타일) */}
      <section className="w-full bg-[#ffe15a] py-4 md:py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-8 md:gap-12 px-4 md:py-4">
          {/* 왼쪽: 상품 설명/이미지 */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-sm text-gray-500 mb-2">무배당 KB 연금보험2501(맞춤플랜)</div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">KB 연금보험<br />노후를 위한 든든한 선택</h1>
            <ul className="mb-8 space-y-2">
              <li className="flex items-center text-lg text-gray-800 justify-center md:justify-start"><span className="text-xl mr-2">✔</span>월납 연금보험, 중도인출/추가납입 가능</li>
              <li className="flex items-center text-lg text-gray-800 justify-center md:justify-start"><span className="text-xl mr-2">✔</span>다양한 연금 지급 옵션, 맞춤형 설계</li>
              <li className="flex items-center text-lg text-gray-800 justify-center md:justify-start"><span className="text-xl mr-2">✔</span>가입/상담 간편 신청</li>
            </ul>
            <div className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] flex items-center justify-center mx-auto md:mx-0">
              <div className="absolute inset-0 rounded-full bg-[#ffe1e1] opacity-80" />
              <img
                src="https://via.placeholder.com/300x300.png?text=연금보험"
                alt="연금보험 일러스트"
                className="relative rounded-full w-[80px] h-[80px] md:w-[100px] md:h-[100px] object-cover border-8 border-white shadow-lg"
              />
            </div>
            <div className="text-xs text-gray-400 mt-4">준법감시인 심의필 제2025-광고-1168호(2025.06.05~2026.06.04)</div>
          </div>
          {/* 오른쪽: 보험료 확인 카드 */}
          <div className="flex-1 flex justify-center md:justify-end w-full md:ml-8 md:self-end">
            <div className="w-full max-w-md bg-white rounded-3xl border-2 border-[#3a8094] shadow-xl p-8 relative flex flex-col">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className="bg-[#3a8094] text-white text-base font-bold rounded-full px-6 py-2 shadow-lg">간편 계산</div>
              </div>
              <form className="flex flex-col gap-4 mt-8">
                <div className="flex gap-4 items-center">
                  <span className="text-base font-bold text-gray-700">성별</span>
                  <label className="flex items-center gap-2 text-base font-semibold">
                    <input type="radio" name="gender" className="accent-[#3a8094] w-5 h-5" /> 남자
                  </label>
                  <label className="flex items-center gap-2 text-base font-semibold">
                    <input type="radio" name="gender" className="accent-[#3a8094] w-5 h-5" /> 여자
                  </label>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base font-bold text-gray-700">이름</label>
                  <input type="text" placeholder="이름을 입력하세요." className="border rounded px-3 py-2 text-base" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base font-bold text-gray-700">생년월일</label>
                  <input type="text" placeholder="예) 900101" maxLength={6} className="border rounded px-3 py-2 text-base" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base font-bold text-gray-700">연락처</label>
                  <input type="text" placeholder="010 - 없이 입력하세요." className="border rounded px-3 py-2 text-base" />
                </div>
                <div className="flex justify-end items-center gap-2 mt-2">
                  <input type="checkbox" id="agree" className="w-4 h-4" />
                  <label htmlFor="agree" className="text-sm text-gray-700 select-none">
                    개인정보수집 및 활용동의
                  </label>
                  <button type="button" className="ml-2 text-sm text-[#fa5a5a] underline hover:opacity-80 cursor-pointer">보기</button>
                </div>
                <button type="submit" className="w-full bg-[#3a8094] text-white font-bold rounded-xl py-4 text-lg hover:opacity-90 transition flex items-center justify-center gap-2 mt-2">
                  보험료 확인하기
                </button>
                <div className="flex flex-row gap-2 mt-2">
                  <button type="button" className="flex-1 bg-[#fa5a5a] text-white font-bold rounded-xl py-4 text-lg flex items-center justify-center gap-2 hover:opacity-90 transition">
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' d='M2.25 12a9.75 9.75 0 1 1 19.5 0v3.375a2.625 2.625 0 0 1-2.625 2.625h-1.125a.375.375 0 0 1-.375-.375V15a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 0 .75-.75V12a8.25 8.25 0 1 0-16.5 0v1.5a.75.75 0 0 0 .75.75h.75A.75.75 0 0 1 6 15v2.625a.375.375 0 0 1-.375.375H4.5A2.625 2.625 0 0 1 1.875 15.375V12Z' /></svg>
                    상담신청
                  </button>
                  <button type="button" className="flex-1 bg-[#fee500] text-[#3d1e1e] font-bold rounded-xl py-4 text-lg flex items-center justify-center gap-2 hover:opacity-90 transition">
                    <ChatBubbleLeftRightIcon className="w-6 h-6" />
                    채팅 상담하기
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 상품 상세 영역 (탭/강조타이틀/설명/특약/일러스트/하단버튼) */}
      <section className="w-full bg-white py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          {/* 탭 네비게이션 */}
          <div className="flex border-b border-gray-200 mb-10">
            {['상품정보', '보장 내용'].map(tab => (
              <button
                key={tab}
                className={`flex-1 text-2xl md:text-3xl font-extrabold pb-4 border-b-4 transition-colors duration-200 ${activeTab === tab ? 'border-[#3a8094] text-[#3a8094]' : 'border-transparent text-[#333] hover:text-[#3a8094]'}`}
                onClick={() => setActiveTab(tab)}
                style={{ minWidth: 0 }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 탭별 내용 */}
          {activeTab === '상품정보' && (
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="flex-1">
                <div className="text-2xl md:text-3xl font-bold text-[#3a8094] mb-4">곧 만날 우리 아이를 위한 신생아플랜, 출생부터 100세까지</div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">성장단계별 발생할 수 있는<br />상해사고, 질병에 대비하세요.</div>
                <div className="text-lg text-gray-700 mb-2">(특약)</div>
                <div className="text-base text-gray-500 mb-6">성인 암 진단비, 뇌혈관질환진단비, 심장질환진단비, 각종 수술비 보장 (특약)</div>
              </div>
              <div className="flex-1 flex justify-center items-center">
                <img src="https://via.placeholder.com/240x180.png?text=일러스트" alt="특약 일러스트" className="w-[240px] h-[180px] object-contain" />
              </div>
            </div>
          )}
          {activeTab === '보장 내용' && (
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="flex-1">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">보험료가 부담된다면,<br />해약환급금 미지급형으로 선택하세요</div>
                <div className="text-base text-gray-500 mb-6">납입기간 중에 보험을 해지할 경우 해약환급금이 없는 대신, 월 납입 보험료를 더 절약할 수 있습니다.</div>
              </div>
              <div className="flex-1 flex justify-center items-center">
                <img src="https://via.placeholder.com/220x160.png?text=해약환급금+일러스트" alt="해약환급금 일러스트" className="w-[220px] h-[160px] object-contain" />
              </div>
            </div>
          )}

          {/* 하단 버튼 */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
            <button className="flex-1 md:flex-none border border-[#e0e0e0] rounded-md px-8 py-4 text-lg font-semibold text-gray-700 bg-white hover:bg-gray-100 transition">가입예시</button>
            <button className="flex-1 md:flex-none border border-[#e0e0e0] rounded-md px-8 py-4 text-lg font-semibold text-gray-700 bg-white hover:bg-gray-100 transition">해약환급률예시</button>
            <button className="flex-1 md:flex-none border border-[#e0e0e0] rounded-md px-8 py-4 text-lg font-semibold text-gray-700 bg-white hover:bg-gray-100 transition">꼭 알아두실 사항</button>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="w-full bg-[#f8f8f8] border-t border-gray-200 py-8 mt-4">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-500 text-sm flex flex-col gap-2">
          <div className="font-bold text-gray-700">보험스토어</div>
          <div>대표: 홍길동 | 사업자등록번호: 123-45-67890 | 이메일: info@bohumstore.com</div>
          <div>주소: 서울특별시 강남구 테헤란로 123, 10층</div>
          <div className="mt-2">© {new Date().getFullYear()} BohumStore. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
} 