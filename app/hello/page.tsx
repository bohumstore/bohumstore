"use client";
import { useState } from "react";
import Image from "next/image";
import { CalculatorIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { coverageData } from '../data/coverageData';
import React from "react";

// 커스텀 애니메이션 keyframes (점프+반짝임)
const style = (
  <style jsx global>{`
    @keyframes jump-glow {
      0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 #3a80e0); }
      30% { transform: scale(1.18) translateY(-6px); filter: drop-shadow(0 0 8px #87b7f0); }
      60% { transform: scale(0.95) translateY(2px); filter: drop-shadow(0 0 0 #3a80e0); }
    }
  `}</style>
);

export default function HelloPage() {
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [activeTab, setActiveTab] = useState('상품 정보');
  const [showNotice, setShowNotice] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const validateForm = () => {
    if (!gender) {
      alert("성별을 선택해주세요.");
      return false;
    }
    if (!name) {
      alert("이름을 입력해주세요.");
      return false;
    }
    if (!birth) {
      alert("생년월일을 입력해주세요.");
      return false;
    }
    if (!phone) {
      alert("연락처를 입력해주세요.");
      return false;
    }
    if (!/^010\d{8}$/.test(phone)) {
      alert("올바른 휴대폰 번호를 입력해주세요.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // 폼이 유효한 경우의 처리
      console.log("Form submitted:", { gender, name, birth, phone });
    }
  };

  const handleConsult = () => {
    if (validateForm()) {
      // 상담신청 처리
      console.log("Consultation requested:", { gender, name, birth, phone });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 숫자만 추출
    const numbers = value.replace(/[^0-9]/g, '');
    
    // 010 이후 8자리만 입력 가능하도록
    if (numbers.startsWith('010')) {
      const remainingNumbers = numbers.slice(3);
      if (remainingNumbers.length <= 8) {
        setPhone('010' + remainingNumbers);
      }
      } else {
        // 010이 아닌 다른 번호로 시작하려고 할 경우 010으로 강제
      setPhone('010');
    }
  };

  // 개인정보 동의 전문 (모달용)
  const privacyText = (
    <div className="overflow-y-auto px-6 py-4 text-[15px] leading-relaxed" style={{maxHeight:'60vh'}}>
      <div className="mb-4 font-bold text-lg">[개인 정보 수집 및 이용 동의]</div>
      <div className="mb-4">㈜ 메타리치 보험스토어는 상담신청 및 보험상품 소개를 위해 고객님의 개인정보 수집, 이용 및 제공에 대한 동의를 받고 있습니다.</div>
      <div className="mb-2 font-bold">▣ 개인정보 수집ㆍ이용 동의</div>
      <div className="mb-2">당사 및 당사 업무수탁자는 「개인정보보호법」, 「정보통신망 이용촉진 및 정보 보호 등에 관한 법률」에 따라 귀하의 개인정보를 다음과 같이 수집·이용하고자 합니다.</div>
      <div className="mb-2 font-semibold">1. 개인정보 수집 및 이용 목적</div>
      <div className="mb-2">- 보험 상담 및 상품소개, 보험 리모델링 및 가입 권유를 위한 안내 및 서비스 제공</div>
      <div className="mb-2 font-semibold">2. 개인정보 수집 및 이용 항목</div>
      <div className="mb-2">- 이름, 성별, 생년월일, 연락처, IP주소</div>
      <div className="mb-2 font-semibold">3. 개인정보 보유 및 이용기간</div>
      <div className="mb-2">- 동의일로부터 5년</div>
      <div className="mb-2 font-semibold">4. 동의를 거부할 권리 및 동의를 거부할 경우의 불이익</div>
      <div className="mb-2">- 귀하는 개인정보 수집, 이용에 대한 동의를 거부할 권리가 있습니다.<br/>- 동의 거부시 보험계약 상담 등의 서비스를 받으실 수 없습니다.</div>
      <div className="mb-2 font-bold">▣ 개인정보 제공에 관한 동의</div>
      <div className="mb-2 font-semibold">1. 제공 받는 자</div>
      <div className="mb-2">- 당사 소속 설계사, 당사의 모집 위탁 계약을 체결한 자 (대리점, 설계사)</div>
      <div className="mb-2 font-semibold">2. 개인정보를 제공받는 자의 이용 목적</div>
      <div className="mb-2">- 보험 상품/서비스 소개 및 상담</div>
      <div className="mb-2 font-semibold">3. 제공하는 정보</div>
      <div className="mb-2">- 이름, 성별, 생년월일, 연락처</div>
      <div className="mb-2 font-semibold">4. 제공받는 자의 개인정보 보유 및 이용 기간</div>
      <div className="mb-2">- 동의일로부터 5년</div>
      <div className="mb-2 font-semibold">5. 동의를 거부할 권리 및 동의를 거부할 경우의 불이익</div>
      <div className="mb-2">- 귀하는 개인정보 수집, 이용에 대한 동의를 거부할 권리가 있습니다.<br/>- 동의 거부 시 보험계약 상담 등의 서비스를 받으실 수 없습니다.</div>
      <div className="mb-2 font-bold">▣ 개인정보 활용에 관한 동의</div>
      <div className="mb-2">㈜메타리치  보험스토어는 「개인정보보호법」및「신용정보의 이용 및 보호에 관한 법률」에 따라 당사 상품소개 및 홍보 등을 위하여 귀하의 개인(신용)정보를 다음과 같이 수집ㆍ이용하고자 합니다.</div>
      <div className="mb-2">* 동의 후 언제든지 동의 철회 중단을 요청하실 수 있습니다.</div>
      <div className="mb-2 font-semibold">1. 수집항목</div>
      <div className="mb-2">- 이름, 성별, 생년월일, 연락처, IP주소</div>
      <div className="mb-2 font-semibold">2. 보유·이용기간</div>
      <div className="mb-2">- 정보동의고객 : 동의일로부터 5년</div>
      <div className="mb-2 font-semibold">3. 수집목적</div>
      <div className="mb-2">상담신청에 대한 응대, 우편 · 전화 · 인터넷 · 방문 등을 통한 유익한 정보의 제공, 금융상품 소개 및 가입 권유, 재무설계서비스 및 기타 서비스의 제공 안내, 이벤트 · 행사의 안내 등 회사의 정상적인 영업에 관계된 행위</div>
      <div className="mb-2">* 상담신청은 개인정보 활용 동의를 거부하셔도 전화로 상담을 진행할 수 있습니다.</div>
      <div className="mb-2 font-bold">※ 동의 철회를 위한 안내</div>
      <div>본 동의를 하시더라도 당사 고객센터를 통해 동의를 철회하거나 가입 권유 목적의 연락에 대한 중단을 요청하실 수 있습니다.</div>
    </div>
  );

  return (
    <>
      {style}
    <div className="font-sans min-h-screen bg-[#f8f8f8] flex flex-col items-center w-full">
      {/* 상단 네비 - 로고만 가운데, 배경색 #f8f8f8, 연회색 경계선 */}
      <header className="w-full flex items-center justify-center py-6 px-4 md:px-12 bg-[#f8f8f8] border-b border-gray-200">
        <Image src="/bohumstore-logo.png" alt="보험스토어 로고" width={220} height={60} priority />
      </header>

      {/* 브랜드 슬로건/보험료 확인 영역 (이미지 스타일) */}
        <section 
          className="w-full bg-[#ffe15a] py-4 md:py-6"
          style={{
            backgroundImage: 'radial-gradient(#f8d34a 2px, transparent 2px)',
            backgroundSize: '20px 20px',
          }}
        >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-8 md:gap-12 px-4 md:py-4">
          {/* 왼쪽: 상품 설명/이미지 */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-sm text-gray-500 mb-2">KB 트리플 레벨업 연금보험 무배당(보증형)</div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">KB 연금보험<br />노후를 위한 든든한 선택</h1>
            <ul className="mb-8 space-y-2">
              <li className="flex items-center text-lg text-gray-800 justify-center md:justify-start"><span className="text-xl mr-2">✔</span>월납 연금보험, 중도인출/추가납입 가능</li>
              <li className="flex items-center text-lg text-gray-800 justify-center md:justify-start"><span className="text-xl mr-2">✔</span>다양한 연금 지급 옵션, 맞춤형 설계</li>
              <li className="flex items-center text-lg text-gray-800 justify-center md:justify-start"><span className="text-xl mr-2">✔</span>가입/상담 간편 신청</li>
            </ul>
              {/* 환급률/적립액 안내 UI */}
              <div className="w-full max-w-full md:max-w-lg mx-auto bg-white rounded-xl shadow-md mb-6 p-4 px-2 md:px-0 md:py-8">
                <div className="flex flex-row justify-between items-stretch md:items-end gap-4 md:gap-0 mb-2">
                  <div className="flex-1 text-center min-w-[110px] md:min-w-[160px]">
                    <div className="inline-block bg-[#ff8c1a] text-white text-xs font-bold px-4 py-1 rounded-full mb-2">7년 시점</div>
                    <div className="flex flex-col items-center">
                      <span className="text-2xl md:text-5xl mb-1">💰</span>
                      <div className="font-bold text-xs md:text-xl">환급률</div>
                      <div className="text-xl md:text-4xl font-extrabold text-[#ff8c1a]">100%</div>
                      <div className="text-xs text-gray-500 mt-1">* 5년납</div>
                    </div>
                  </div>
                  <div className="flex-1 text-center min-w-[110px] md:min-w-[160px]">
                    <div className="inline-block bg-[#3a80e0] text-white text-xs font-bold px-4 py-1 rounded-full mb-2">10년 시점</div>
                    <div className="flex flex-col items-center">
                      <span className="text-2xl md:text-5xl mb-1">💰</span>
                      <div className="font-bold text-xs md:text-xl">환급률</div>
                      <div className="text-xl md:text-4xl font-extrabold text-[#3a80e0] animate-[jump-glow_1.2s_ease-in-out_infinite]">130%</div>
                      <div className="text-xs text-gray-500 mt-1 whitespace-nowrap">* 5년납</div>
                    </div>
                  </div>
                  <div className="flex-1 text-center min-w-[110px] md:min-w-[160px]">
                    <div className="inline-block bg-[#e23c3c] text-white text-xs font-bold px-4 py-1 rounded-full mb-2">연금개시 시점</div>
                    <div className="flex flex-col items-center">
                      <span className="text-2xl md:text-5xl mb-1">🐷</span>
                      <div className="font-bold text-xs md:text-xl">계약자적립액</div>
                      <div className="text-lg md:text-4xl font-extrabold text-[#e23c3c]">2.0%</div>
                      <div className="text-xs text-gray-500 mt-1">* 10년 이후 매년 2% 증가</div>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 text-center mt-4">
                  * 환급률은 트리플 레벨업 보증률 반영한 금액 입니다.
                </div>
            </div>
            <div className="text-xs text-gray-400 mt-4">준법감시인 심의필 제2025-광고-1168호(2025.06.05~2026.06.04)</div>
          </div>
          {/* 오른쪽: 보험료 확인 카드 */}
          <div className="flex-1 flex justify-center md:justify-end w-full md:ml-8 md:self-end">
            <div className="w-full max-w-md bg-white rounded-3xl border-2 border-[#3a8094] shadow-xl p-8 relative flex flex-col">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className="bg-[#3a8094] text-white text-base font-bold rounded-full px-6 py-2 shadow-lg">간편 계산</div>
              </div>
              <form className="flex flex-col gap-4 mt-8" onSubmit={handleSubmit}>
                <div className="flex gap-4 items-center">
                  <span className="text-base font-bold text-gray-700">성별</span>
                  <label className="flex items-center gap-2 text-base font-semibold cursor-pointer">
                    <input 
                      type="radio" 
                      name="gender" 
                      value="male"
                      checked={gender === "male"}
                      onChange={(e) => setGender(e.target.value)}
                      className="accent-[#3a8094] w-5 h-5 cursor-pointer" 
                    /> 남자
                  </label>
                  <label className="flex items-center gap-2 text-base font-semibold cursor-pointer">
                    <input 
                      type="radio" 
                      name="gender" 
                      value="female"
                      checked={gender === "female"}
                      onChange={(e) => setGender(e.target.value)}
                      className="accent-[#3a8094] w-5 h-5 cursor-pointer" 
                    /> 여자
                  </label>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base font-bold text-gray-700">이름</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름을 입력하세요." 
                    className="border rounded px-3 py-2 text-base" 
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base font-bold text-gray-700">생년월일</label>
                  <input 
                    type="text" 
                    value={birth}
                    onChange={(e) => setBirth(e.target.value)}
                      placeholder="예) 880818" 
                    maxLength={6} 
                    className="border rounded px-3 py-2 text-base" 
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base font-bold text-gray-700">연락처</label>
                  <input 
                    type="text" 
                    value={phone}
                    onChange={handlePhoneChange}
                      placeholder="010 전화번호 8자리" 
                    className="border rounded px-3 py-2 text-base"
                    maxLength={11}
                    onFocus={(e) => {
                        if (!phone || phone === '010') {
                        setPhone('010');
                      }
                    }}
                      onBlur={(e) => {
                        if (phone === '010') {
                          setPhone('');
                      }
                    }}
                  />
                </div>
                <div className="flex justify-end items-center gap-2 mt-2">
                  <input 
                    type="checkbox" 
                    id="agree" 
                    className="w-4 h-4 cursor-pointer accent-gray-200" 
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                  <label htmlFor="agree" className="text-sm text-gray-700 select-none">
                    개인정보수집 및 활용동의
                  </label>
                    <button type="button" className="ml-2 text-sm text-[#fa5a5a] underline hover:opacity-80 cursor-pointer" onClick={() => setShowPrivacy(true)}>보기</button>
                </div>
                <button type="submit" className="w-full bg-[#3a8094] text-white font-bold rounded-xl py-4 text-lg hover:opacity-90 transition flex items-center justify-center gap-2 mt-2 cursor-pointer">
                  <CalculatorIcon className="w-6 h-6" />
                  보험료 확인하기
                </button>
                <div className="flex flex-row gap-2 mt-2">
                  <button 
                    type="button" 
                    onClick={handleConsult}
                    className="flex-1 bg-[#fa5a5a] text-white font-bold rounded-xl py-4 text-lg flex items-center justify-center gap-2 hover:opacity-90 transition cursor-pointer"
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'><path strokeLinecap='round' strokeLinejoin='round' d='M2.25 12a9.75 9.75 0 1 1 19.5 0v3.375a2.625 2.625 0 0 1-2.625 2.625h-1.125a.375.375 0 0 1-.375-.375V15a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 0 .75-.75V12a8.25 8.25 0 1 0-16.5 0v1.5a.75.75 0 0 0 .75.75h.75A.75.75 0 0 1 6 15v2.625a.375.375 0 0 1-.375.375H4.5A2.625 2.625 0 0 1 1.875 15.375V12Z' /></svg>
                    상담신청
                  </button>
                    <a 
                      href="http://pf.kakao.com/_lrubxb/chat" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#fee500] text-[#3d1e1e] font-bold rounded-xl py-4 text-lg flex items-center justify-center gap-2 hover:opacity-90 transition cursor-pointer"
                    >
                    <ChatBubbleLeftRightIcon className="w-6 h-6" />
                    채팅 상담하기
                    </a>
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
              {['상품 정보', '보장 내용', '해약환급금 예시표'].map(tab => (
              <button
                key={tab}
                  className={`flex-1 text-lg md:text-3xl font-extrabold pb-4 border-b-4 transition-colors duration-200 ${activeTab === tab ? 'border-[#3a8094] text-[#3a8094]' : 'border-transparent text-[#333] hover:text-[#3a8094]'} cursor-pointer`}
                onClick={() => setActiveTab(tab)}
                style={{ minWidth: 0 }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 탭별 내용 */}
            {activeTab === '상품 정보' && (
              <div className="space-y-8 px-4 py-6">
                {/* 가입안내 제목 */}
                <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">가입안내</h2>

                {/* 상품 구성 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">상품 구성</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center border-b border-gray-200 pb-4">
                        <div className="w-32 font-bold text-[#1e3a8a]">주계약</div>
                        <div className="flex-1 space-y-1">
                          <div>KB 트리플 레벨업 연금보험 무배당(보증형)</div>
                          <div>KB 트리플 레벨업 연금보험 무배당(미보증형)</div>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center">
                        <div className="w-32 font-bold text-[#1e3a8a]">제도성특약</div>
                        <div>지정대리 청구서비스특약</div>
              </div>
              </div>
            </div>
                </div>

                {/* 연금지급형태, 연금개시나이, 보험기간 및 납입주기 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">연금지급형태, 연금개시나이, 보험기간 및 납입주기</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row border-b border-gray-200 pb-4">
                        <div className="w-32 font-bold text-[#1e3a8a]">연금지급형태</div>
                        <div className="flex-1">
                          종신연금형<br />
                          ~ 20년보증, 100세보증 또는 기대여명보증
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row border-b border-gray-200 pb-4">
                        <div className="w-32 font-bold text-[#1e3a8a]">연금개시나이</div>
                        <div>45세 ~ 85세</div>
                      </div>
                      <div className="flex flex-col md:flex-row border-b border-gray-200 pb-4">
                        <div className="w-32 font-bold text-[#1e3a8a]">보험기간</div>
                        <div className="flex-1 space-y-4">
                          <div>
                            <div className="font-bold">연금개시전 보험기간</div>
                            <div>보험가입일부터 연금지급개시 계약해당일 전일까지</div>
                          </div>
                          <div>
                            <div className="font-bold">연금개시후 보험기간</div>
                            <div>연금지급개시 계약해당일부터 종신까지</div>
                  </div>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row">
                        <div className="w-32 font-bold text-[#1e3a8a]">보험료납입주기</div>
                        <div>월납</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg space-y-2 text-sm">
                    <p>주1) 보험가입시점의 연금지급형태는 종신연금형으로 정해지며, 계약자는 연금지급개시전까지 약관에 따라 연금지급형태를 변경할 수 있습니다.</p>
                    <p>주2) '기대여명'은 통계청 제18호(통계청장의 승인)에 의해 통계청장이 승인하여 고시하는 기대사망 통계표에 따른 만나이별의 성별·연령별 기대여명연수(소수점 이하는 버림)를 말하며, 피보험자의 연금개시나이를 기준으로 산정합니다. 단만, 기대여명이 5년 미만인 경우 기대여명은 5년으로 하며, 이 경우에는 관련 세제혜택에 제한될 수 있습니다.</p>
                </div>
              </div>

                {/* 보험료 납입기간, 최소거치기간 및 가입나이 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">보험료 납입기간, 최소거치기간 및 가입나이</h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#1e3a8a] text-white">
                        <th className="border border-gray-300 p-3">보험료납입기간</th>
                        <th className="border border-gray-300 p-3">최소거치기간</th>
                        <th className="border border-gray-300 p-3">가입나이</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-3 text-center">5년납</td>
                        <td className="border border-gray-300 p-3 text-center">10년</td>
                        <td className="border border-gray-300 p-3 text-center" rowSpan={3}>
                          0세 ~ MIN [연금개시나이- 15, 70] 세
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3 text-center">7년납</td>
                        <td className="border border-gray-300 p-3 text-center">8년</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3 text-center">10년납</td>
                        <td className="border border-gray-300 p-3 text-center">5년</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-sm text-gray-600">※ 최소거치기간 : 보험료 납입완료후 연금지급개시시점까지의 최소기간</p>
                </div>

                {/* 보험료에 관한 사항 */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">보험료에 관한 사항</h3>
                  
                  {/* 기본보험료 */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-[#1e3a8a] border-b border-[#1e3a8a] pb-2">기본보험료</h4>
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-[#1e3a8a] text-white">
                          <th className="border border-gray-300 p-3">보험료납입기간</th>
                          <th className="border border-gray-300 p-3">가입나이</th>
                          <th className="border border-gray-300 p-3">최소보험료(1구좌당)</th>
                          <th className="border border-gray-300 p-3">최대보험료(1구좌당)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-3 text-center">5년납</td>
                          <td className="border border-gray-300 p-3 text-center">0세 ~ 70세</td>
                          <td className="border border-gray-300 p-3 text-center">30만원</td>
                          <td className="border border-gray-300 p-3 text-center" rowSpan={3}>100만원</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 text-center">7년납</td>
                          <td className="border border-gray-300 p-3 text-center">0세 ~ 70세</td>
                          <td className="border border-gray-300 p-3 text-center">20만원</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 text-center">10년납</td>
                          <td className="border border-gray-300 p-3 text-center">0세 ~ 70세</td>
                          <td className="border border-gray-300 p-3 text-center">10만원</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="text-sm text-gray-600">※ 구좌란 보험금과 보험료를 동일 금액비로 위한 계약의 단위를 의미하며, 구좌당 최소·최대 보험료 등은 보험 상품마다 차이가 있으므로 자세한 내용은 약관을 참고해 주시길 바랍니다.</p>
                  </div>

                  {/* 추가납입보험료 */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-[#1e3a8a] border-b border-[#1e3a8a] pb-2">추가납입보험료</h4>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
                      <p>(1) 추가납입보험료는 해당월까지 납입 가능한 기본보험료 납입총액(선납 포함)의 200%를 한도로 납입할 수 있으며, 중도인출에 관한 사항에 의한 인출금액이 있을 경우에는 그 금액만큼 추가로 납입이 가능합니다.</p>
                      <p>(2) 추가납입보험료는 해당월까지 기본보험료가 납입된 경우에 한하여 납입할 수 있으며, 기본보험료와 같이 자동이체 서비스를 이용하여 추가납입을 하는 경우에는 기본보험료의 200%를 한도로 납입하실 수 있습니다.</p>
                      <p>(3) 중도인출에 관한 사항에 의한 인출금액이 있을 경우, 그 금액만큼 해당월에는 추가납입보험료로 합니다.</p>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg space-y-3">
                      <div className="text-red-600">[보험료 추가납입제도 안내]</div>
                      <div className="text-red-600 space-y-2">
                        <p>- 이 보험계약은 기본보험료 이외에 보험기간중에 추가로 납입할 수 있는 추가적립보험료 납입제도를 운영하고 있으며, 이미 납입하고 있는 저축성보험에 추가납입 하실 경우 사업비 절감효과로 새로운 저축성보험에 추가가입하는 것 보다 해약환급률 및 만기환급금을 높일 수 있습니다.</p>
                        <p>- 다만, 추가납입제도 및 횟수, 납입가능 기간 등은 해당상품에 따라 제한될 수 있습니다.</p>
                        <p>- 자세한 사항은 약관내용을 참조하시기 바랍니다.</p>
                      </div>
                    </div>
                  </div>

                  {/* 중도인출에 관한 사항 */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-[#1e3a8a] border-b border-[#1e3a8a] pb-2">중도인출에 관한 사항</h4>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
                      <p>(1) 연금개시전 보험기간 중 보험년도 기준 년12회(단 또는 월 첫수 제한 없음)에 한하여 1회당 인출수령시점 계약자적립금(보험계약대출원금과 이자를 차감한 금액)의 80%범위 이내에서 연금계약 계약자적립금의 일부를 인출할 수 있습니다. 단, 인출금액은 10만원 이상 만원단위로 인출할 수 있습니다.</p>
                      <p>(2) 연금계약 계약자적립금의 일부를 인출하기 위해서는 인출후 연금계약 계약자적립금(보험계약대출원금과 이자를 차감한 금액)이 1구좌당 300만원 이상이어야 합니다.</p>
                      <p>(3) 계약일로부터 10년 이내에 연금계약 계약자적립금의 일부를 인출하는 경우 각 인출시점까지의 인출금액 총합계는 이미 납입한 보험료를 초과할 수 없습니다.</p>
                      <p>(4) 중도인출은 추가납입보험료 계약자적립금에서 우선적으로 가능하며, 추가납입보험료 계약자적립금이 부족한 경우에 한하여 기본보험료 계약자적립금에서 인출할 수 있습니다.</p>
                      <p>(5) 연금계약 계약자적립금의 일부를 인출하는 경우 수수료는 없으며, 인출된 금액은 연금계약의 계약자적립금에서 차감합니다.</p>
                      <p className="text-red-600">(6) 연금계약 계약자적립금 인출 시 인출금액 및 인출금액에 적립되는 이자만큼 연금계약 계약자적립금에서 차감하여 지급하므로 연금액 및 해약환급금이 감소할 수 있습니다.</p>
                    </div>
                  </div>
                </div>

                {/* 최저사망적립금에 관한 사항 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">최저사망적립금에 관한 사항</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <p>최저사망적립금이라 함은 "연금개시전 보험기간, 동안 피보험자 사망시 공시이율로 부리한 계약자적립금액과 관계없이 보장하는 최저한도의 계약자적립금"으로서 사망시점의 이미 납입한 보험료를 말합니다.</p>
                  </div>
                </div>

                {/* 트리플 레벨업 보증에 관한 사항 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">트리플 레벨업 보증에 관한 사항(보증형에 한함)</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <p className="mb-6">트리플 레벨업 보증이라 함은 공시이율로 부리한 계약자적립금액과 관계없이 트리플 레벨업 보증시점에 보장하는 최저한도의 기본보험료 계약자적립금 보증으로서, 이 보험의 '보험료 및 해약환급금 산출방법서'에서 정한 방법에 따라 계산한 금액으로 합니다.</p>
                  
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <div className="text-center font-bold mb-4 text-[#1e3a8a]">트리플 레벨업 보증금액 = 트리플 레벨업 보증 기준금액 X 트리플 레벨업 보증비율</div>
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-[#1e3a8a] text-white">
                            <th className="border border-gray-300 p-3">트리플 레벨업<br />보증시점</th>
                            <th className="border border-gray-300 p-3">트리플 레벨업<br />보증 기준금액</th>
                            <th className="border border-gray-300 p-3" colSpan={3}>트리플 레벨업 보증비율</th>
                          </tr>
                          <tr className="bg-[#1e3a8a] text-white">
                            <th className="border border-gray-300 p-3" colSpan={2}></th>
                            <th className="border border-gray-300 p-3">5년납</th>
                            <th className="border border-gray-300 p-3">7년납</th>
                            <th className="border border-gray-300 p-3">10년납</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 p-3">계약일부터 7년<br />경과시점의 연계약해당일</td>
                            <td className="border border-gray-300 p-3" rowSpan={2}>보증시점 전일까지의<br />"기초 기본보험료"</td>
                            <td className="border border-gray-300 p-3 text-center">100%</td>
                            <td className="border border-gray-300 p-3 text-center">100%</td>
                            <td className="border border-gray-300 p-3 text-center">100%</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-3">계약일부터 10년<br />경과시점의 연계약해당일</td>
                            <td className="border border-gray-300 p-3 text-center">130%</td>
                            <td className="border border-gray-300 p-3 text-center">125%</td>
                            <td className="border border-gray-300 p-3 text-center">120%</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-3">연금개시시점</td>
                            <td className="border border-gray-300 p-3 text-center" colSpan={4}>
                              계약일부터 10년 경과시점의 트리플 레벨업 보증비율<br />
                              + ("연금개시전 보험기간" - 10(년)) × 2%
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 space-y-2 text-sm">
                      <p>단, "트리플 레벨업 보증시점" 마다 각 시점까지 납입하기로 약정된 기본보험료 납입이 완료되지 않은 경우, "트리플 레벨업 보증시점"은 해당 기본보험료의 납입이 완료된 날까지 "기초 기본보험료"를 말합니다.</p>
                      <p className="text-red-500">※ 트리플 레벨업 보증 기준금액은 갱신 또는 중도인출이 발생한 경우 기본보험료 계약자적립금에 비례하여 감소하며, 중도인출금액을 재납입하더라도 원복되지 않습니다.</p>
                      <p className="text-red-600">※ 연금개시시점의 트리플 레벨업 보증은 연금을 개시할 경우에만 적용되며, 연금을 시작하지 않을 경우 보증되지 않습니다.</p>
                    </div>
                  </div>
                </div>

                {/* 연금지급개시시점의 연금계약 계약자적립금에 관한 사항 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold border-l-4 border-[#1e3a8a] pl-3">연금지급개시시점의 연금계약 계약자적립금에 관한 사항</h3>
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
                    <p>(1) 보증형 : 연금지급개시시점의 기본보험료 계약자적립금이 트리플 레벨업 보증에 관한 사항(보증형에 한함)에 의한 연금개시시점 트리플 레벨업 보증금액을 어떠한 경우 연금개시시점 트리플 레벨업 보증금액을 기본보험료 계약자적립금의 최저한도로 하여 연금계약 계약자적립금을 구합니다.</p>
                    <p>(2) 미보증형 : 연금지급개시시점의 연금계약 계약자적립금이 '이미 납입한 보험료(연금계약 계약자적립금의 인출이 있었을 때에는 이를 차감한 금액) + 1,000원'이하일 경우 '이미 납입한 보험료(연금계약 계약자적립금의 인출이 있었을 때에는 이를 차감한 금액) + 1,000원'으로 합니다.</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === '보장 내용' && (
              <div className="space-y-8 px-4 py-6">
                {/* 연금개시전 보험기간 */}
                <div className="space-y-4">
                  <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">1. 연금개시전 보험기간</h2>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#1e3a8a]">
                        <th className="border border-gray-300 p-3 text-white">급부명</th>
                        <th className="border border-gray-300 p-3 text-white">지급사유</th>
                        <th className="border border-gray-300 p-3 text-white">지급금액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-3">고도재해장해 급여금</td>
                        <td className="border border-gray-300 p-3">"연금개시전 보험기간" 중 피보험자가 장해분류표 중 동일한 재해로 여러 신체부위의 장해지급률을 더하여 80% 이상인 장해상태가 되었을 경우(단만, 최초 1회에 한하여 지급)</td>
                        <td className="border border-gray-300 p-3 text-center">매월 <span className="font-bold text-[#1e3a8a]">40</span>만원(36회 지급)</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>주1) 고도재해장해급여금은 매월 보험금 지급사유 발생해당일에 드리며, 최초의 보험금 지급사유 발생해당일부터 3년을 고도재해장해급여금의 지급기간으로 합니다. 단만, 해당월에 보험금 지급사유 발생해당일이 없는 경우 해당월의 마지막 날을 보험금 지급사유 발생해당일로 합니다.</p>
                    <p>주2) 피보험자가 연금개시전 보험기간 중 사망하였을 경우에는 사망신의의 연금계약 계약자적립액과 최저사망적립액 중 큰 금액을 지급하여 드립니다.</p>
                  </div>
                </div>

                {/* 연금개시후 보험기간 */}
                <div className="space-y-4">
                  <h2 className="text-[#1e3a8a] text-2xl font-bold border-b-2 border-[#1e3a8a] pb-2">2. 연금개시후 보험기간</h2>
                  <p className="text-gray-600 mb-4">- 계약자는 해당 약관에 따라 연금지급개시전에 연금지급형태 및 연금지급형태의 구성비율, 생활설계자금선택비율을 변경할 수 있습니다.</p>
                  
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-[#1e3a8a]">
                        <th className="border border-gray-300 p-3 text-white">급부명</th>
                        <th className="border border-gray-300 p-3 text-white">지급사유</th>
                        <th className="border border-gray-300 p-3 text-white">지급금액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-3">생활설계자금</td>
                        <td className="border border-gray-300 p-3">피보험자가 연금지급개시일에 살아 있을 때</td>
                        <td className="border border-gray-300 p-3">연금지급개시시점의 연금계약 계약자적립액에 "생활설계자금 선택비율"을 곱한 금액을 기준으로 계산한 금액</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">종신연금형</td>
                        <td className="border border-gray-300 p-3">피보험자가 매년 보험계약해당일에 살아 있을 때 (20년보증, 100세보증 또는 기대여명보증시)</td>
                        <td className="border border-gray-300 p-3">연금지급개시시점의 연금계약 계약자적립액에 (1-생활설계자금 선택비율)을 곱한 금액을 기준으로 계산한 연금액 지급</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">확정연금형</td>
                        <td className="border border-gray-300 p-3">"연금개시후 보험기간" 중 매년 보험계약 해당일</td>
                        <td className="border border-gray-300 p-3">연금지급개시시점의 연금계약 계약자적립액에 (1-생활설계자금 선택비율)을 곱한 금액을 기준으로 계산한 연금액을 확정 연금지급기간 (5년, 10년, 15년, 20년) 동안 지급</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">상속연금형</td>
                        <td className="border border-gray-300 p-3">"연금개시후 보험기간" 중 피보험자가 매년 보험계약해당일에 살아있을 때</td>
                        <td className="border border-gray-300 p-3">연금지급개시시점의 연금계약 계약자적립액에 (1-생활설계자금 선택비율)을 곱한 금액을 기준으로 공시이율에 의하여 계산한 연금액을 지급 (단만, 피보험자 사망시에는 사망시점의 연금계약 계약자적립액을 연금수익자에게 지급)</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="space-y-2 text-sm text-gray-600">
                    <p>주1) "생활설계자금 선택비율"이란 생활설계자금의 인출을 위해 계약자가 직자가 정하는 비율 이내에서 선택한 비율을 말합니다. 단만, "생활설계자금 선택비율"을 별도로 지정하지 않은 경우에는 "생활설계자금 선택비율"을 0%로 하며, 이 경우 생활설계자금을 인출할 수 없고, 연금지급개시시점의 연금계약 계약자적립액 전액을 기준으로 보험료 및 해약환급금 산출방법서에 따라 연금액적 산출합니다. 단만, 기본보험료를 5년(60회)이상 납입하지 않은 경우에는 "생활설계자금 선택비율"을 0%로 합니다.</p>
                    <p>주2) 종신연금형의 경우 연금지급개시 후 보증지급기간 안에 피보험자가 사망하더라도 보증지급기간까지의 미지급된 각 연금액을 연금지급일에 드립니다.</p>
                    <p>주3) 종신연금형(100세 보증)은 "100세-연금개시나이"를 보증기간 연금액에서 보증지급합니다.</p>
                    <p>주4) 확정연금형으로 변경한 경우 연금개시시 후 해당 확정 연금지급기간(5년, 10년, 15년, 20년) 동안에 피보험자가 사망하더라도 각 확정 연금지급기간(5년, 10년, 15년, 20년)까지의 지급되지 않은 각 연금액을 연금지급일에 드립니다.</p>
                    <p>주5) 연금액은 "공시이율"을 적용하여 계산되므로 "공시이율"이 변경되면 매년 지급되는 연금액도 변경됩니다.</p>
                    <p>주6) 종신연금형의 경우 연금지급 계시전 연금지급률의 계정 등에 따라 생존연금의 증가에게 되는 경우 연금개시 당시의 연금사망률 및 연금계약 계약자적립액을 기준으로 산출한 새로운금을 지급하여 드립니다.</p>
                    <p>주7) 상속연금형의 "계약자적립액"이란 연금개시시점의 연금계약 계약자적립액에 "공시이율"로 적립한 금액에서 상속연금형의 연금액 발생분(연금액 계약관리비용 포함)을 뺀 나머지 금액을 공시이율로 적립한 금액으로 "보험료 및 해약환급금 산출방법서"에 정한 바에 따라 계산됩니다.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === '해약환급금 예시표' && (
              <div className="space-y-8 px-4 py-6">
                {/* 해약환급금 예시표 내용 */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p>해약환급금 예시표 내용이 여기에 들어갈 것으로 가정합니다.</p>
              </div>
            </div>
          )}

          {/* 하단 버튼 */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
              <a href="/kb-guide.pdf" target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-none border border-[#e0e0e0] rounded-md px-8 py-4 text-lg font-semibold text-gray-700 bg-white hover:bg-gray-100 transition text-center cursor-pointer">
              상품안내장
            </a>
              <a href="/kb-guide2.pdf" target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-none border border-[#e0e0e0] rounded-md px-8 py-4 text-lg font-semibold text-gray-700 bg-white hover:bg-gray-100 transition text-center cursor-pointer">
              약관
            </a>
            <button type="button" onClick={() => setShowNotice(true)} className="flex-1 md:flex-none border border-[#e0e0e0] rounded-md px-8 py-4 text-lg font-semibold text-gray-700 bg-white hover:bg-gray-100 transition cursor-pointer">꼭 알아두실 사항</button>
          </div>
        </div>
      </section>

      {showNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col relative">
            <div className="flex items-center justify-between px-6 pt-6 pb-2 border-b border-gray-200">
              <div className="text-xl font-bold">꼭 알아두실 사항</div>
              <button onClick={() => setShowNotice(false)} className="p-1 text-gray-400 hover:text-gray-700"><XMarkIcon className="w-7 h-7" /></button>
            </div>
            <div className="overflow-y-auto px-6 py-4 text-[15px] leading-relaxed" style={{maxHeight:'60vh'}}>
              <div className="mb-4">
                <div className="text-[#d32f2f]">보험계약자는 회사 등으로부터 상품에 대해 충분한 설명을 받을 권리가 있으며, 가입에 앞서 그 설명을 이해한 후 거래하시기 바랍니다.</div>
                <div className="text-[#d32f2f]">이 자료는 요약된 내용으로 자세한 사항은 상품설명서 및 약관을 통해 반드시 확인하시기 바랍니다.</div>
                <div className="text-[#d32f2f]">연금보험은 은행의 예·적금 및 펀드등과 다른 상품입니다. 계약자가 납입한 보험료 중 일부는 불의의 사고를 당한 가입자에게 보험금으로 지급되며, 또 다른 일부는 보험회사의 운영에 필요한 경비로 사용되는 상품으로 중도해지시 납입한 보험료보다 환급금이 매우 적거나 없을 수 있습니다.</div>
              </div>
              <div className="mb-4">
                <div className="font-bold mb-1">기존계약 해지 후 신규 계약 가입에 관한 사항</div>
                <div>보험계약자가 기존 보험계약을 해지하고, 새로운 보험계약을 체결할 경우 인수거절, 보험료 인상, 보장내용 축소 등 불이익이 생길 수 있습니다.</div>
              </div>
              <div className="mb-4">
                <div className="font-bold mb-1">기존계약 이동에 따른 비교안내에 관한 사항</div>
                <div>보험계약 이동시 나이, 위험률의 증가 등에 따라 보험료가 인상되거나, 계약 초기 사업비 공제로 인하여 해약환급금이 과소지급 될 수 있으니 반드시 비교설명을 받으시기 바랍니다.</div>
              </div>
              <div className="mb-4">
                <div className="font-bold mb-1">가입자의 계약 전 알릴의무에 관한 사항</div>
                <div>계약을 청약할 때는 과거의 병력과 현재의 건강상태, 신체의 장해상태, 종사하는 직업 및 환경 등 청약서 상의 질문사항에 대하여 사실대로 회사에 알려야만 보험금 지급이 보장됩니다. 만일 사실대로 알리지 않았을 경우에는 계약이 해지되거나 회사가 별도로 정하는 방법에 따라 보장이 제한될 수 있으며 구두로 알리신 것은 효력이 없습니다.</div>
              </div>
              <div className="mb-4">
                <div className="font-bold mb-1">보험 가입의 제한 등에 관한 사항</div>
                <div>과거의 병력과 현재의 건강상태, 연령, 직업, 운전, 취미 등에 따라 가입이 제한되거나 보장금액 등이 제한될 수 있습니다.</div>
              </div>
              <div className="mb-4">
                <div className="font-bold mb-1">보험금 지급의 제한에 관한 사항</div>
                <div>회사는 다음 중 어느 한 가지로 보험금 지급사유가 발생한 때에는 보험금을 지급하지 않거나 보험료의 납입을 면제하지 않습니다.</div>
                <div className="mt-2">
                  1. 피보험자가 고의로 자신을 해친 경우. 다만, 다음 중 어느 하나에 해당하면 보험금을 지급하거나 보험료의 납입을 면제합니다.<br/>
                  가. 피보험자가 심신상실 등으로 자유로운 의사결정을 할 수 없는 상태에서 자신을 해친 경우<br/>
                  나. 계약의 보장개시일(부활(효력회복)계약의 경우는 부활(효력회복)청약일)부터 2년이 경과된 후에 자살한 경우<br/>
                  2. 보험수익자가 고의로 피보험자를 해친 경우. 다만, 그 보험수익자가 보험금의 일부 보험수익자인 경우에는 다른 보험수익자에 대한 보험금은 지급합니다.<br/>
                  3. 계약자가 고의로 피보험자를 해친 경우
                </div>
              </div>
              <div className="mb-4">
                <div className="font-bold mb-1">청약 철회에 관한 사항</div>
                  <div>보험계약자는 보험증권을 받은 날부터 15일 이내에 청약을 철회할 수 있으며, 청약의 철회를 접수한 날부터 3영업일 이내에 보험료를 돌려드립니다. 단, 회사가 건강상태 진단을 지원하는 계약, 보험기간이 90일 이내인 계약이거나, 청약을 한 날부터 30일(다만, 청약시점에 만 65세 이상인 보험계약자가 전화를 이용하여 계약을 체결한 경우 청약한 날부터 45일)을 초과한 경우는 청약철회가 제한됩니다.</div>
              </div>
              <div className="mb-4">
                <div className="mb-1">[일반금융소비자] 전문금융소비자가 아닌 보험계약자를 말합니다.</div>
                <div className="mb-1">[전문금융소비자] 보험계약에 관한 전문성, 자산규모 등에 비추어 보험계약에 따른 위험감수 능력이 있는 자로서, 국가, 지방자치단체, 한국은행, 금융회사, 주권상장법인 등을 포함하며,「금융소비자보호에 관한 법률」 제2호제9호에서 정하는 전문금융소비자인 보험계약자를 말합니다.</div>
              </div>
              <div className="mb-4">
                <div className="font-bold mb-1">보험계약 품질보증에 관한 사항</div>
                <div>아래 3가지 중 1개라도 해당하는 경우 계약자는 계약이 성립한 날부터 3개월 이내에 계약을 취소할 수 있으며 이 경우 회사는 계약자에게 납입한 보험료 전액과 정해진 이자를 지급하여 드립니다.</div>
                <div className="mt-2">
                  약관 및 청약서를 받지 못한 경우<br/>
                  청약시 약관의 중요내용을 설명받지 못한 경우<br/>
                  청약서에 자필서명(전자서명 포함)이 없는 경우
                </div>
              </div>
              <div className="mb-4">
                <div className="font-bold mb-1">위법계약의 해지에 관한 사항</div>
                <div>계약자는 금융소비자보호에 관한 법률 제47조 및 관련 규정이 정하는바에 따라 계약체결일부터 5년을 초과하지 않는 범위내에서 계약체결에 대한 위반사항을 안날부터 1년 이내에 서면 등으로 해당 계약의 해지를 요구 할 수 있습니다.</div>
              </div>
              <div className="mb-4">
                <div className="font-bold mb-1">해약환급금에 관한 사항</div>
                <div>보험계약을 중도 해지 시 해약환급금은 이미 납입한 보험료보다 적거나 없을 수 있습니다. 그 이유는 납입한 보험료 중 위험보장을 위한 보험료, 사업비를 차감한 후 운용ㆍ적립되고, 해지 시에는 계약자적립액에서 이미 지출한 사업비 해당액을 차감하는 경우가 있기 때문입니다.</div>
              </div>
              <div className="mb-4">
                <div className="font-bold mb-1">예금자보호에 관한 사항</div>
                <div>이 보험계약은 예금자보호법에 따라 해약환급금(또는 만기 시 보험금)에 기타지급금을 합한 금액이 1인당 "5천만원까지"(본 보험회사의 여타 보호상품과 합산) 보호됩니다. 이와 별도로 본 보험회사 보호상품의 사고보험금을 합산한 금액이 1인당 "5천만원까지" 보호됩니다.<br/>단, 보험계약자 및 보험료 납부자가 법인인 보험계약 등은 예금자보호법에 의해 보호되지 않습니다.</div>
              </div>
            </div>
            <div className="flex border-t border-gray-200">
              <button onClick={() => setShowNotice(false)} className="flex-1 py-4 text-lg font-bold bg-[#ffe15a] text-gray-900 border-r border-gray-200 hover:bg-yellow-200 transition">확인</button>
              <button onClick={() => setShowNotice(false)} className="flex-1 py-4 text-lg font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 transition">취소</button>
            </div>
          </div>
        </div>
      )}

        {showPrivacy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col relative">
              <div className="flex items-center justify-between px-6 pt-6 pb-2 border-b border-gray-200">
                <div className="text-xl font-bold">개인정보 수집 및 이용 동의</div>
                <button onClick={() => setShowPrivacy(false)} className="p-1 text-gray-400 hover:text-gray-700"><XMarkIcon className="w-7 h-7" /></button>
              </div>
              {privacyText}
              <div className="flex border-t border-gray-200">
                <button onClick={() => setShowPrivacy(false)} className="flex-1 py-4 text-lg font-bold bg-[#ffe15a] text-gray-900 border-r border-gray-200 hover:bg-yellow-200 transition">확인</button>
            </div>
          </div>
        </div>
      )}

      {/* 푸터 */}
      <footer className="w-full bg-[#f8f8f8] border-t border-gray-200 py-8 mt-4">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-500 text-sm flex flex-col gap-2">
          <div className="font-bold text-gray-700">보험스토어</div>
          <div>(주)메타리치보험대리점 | 대리점등록번호: 제2023070016호</div>
          <div>대표: 서지후 | 등록번호: 제20060383110008호</div>
          <div>주소: 경기도 고양시 덕양구 꽃마을로 44, 4층(향동동,서원DMC타워)</div>
          <div className="mt-2">© {new Date().getFullYear()} BohumStore. All rights reserved.</div>
        </div>
      </footer>
    </div>
    </>
  );
} 