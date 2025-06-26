import React, { useState } from 'react'
import { CalculatorIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import Modal from '@/app/components/Modal';
import request from '@/app/api/request';

const INSURANCE_COMPANY_ID = 1; // KB 손해보험
const INSURANCE_PRODUCT_ID = 1; // KB 트리플 레벨업 연금보험 무배당 id 코드값

type SloganProps = {
  onOpenPrivacy: () => void
}

export default function Slogan({ onOpenPrivacy }: SloganProps) {
  const [counselType, setCounselType] = useState(1); // 1: 보험료 확인, 2: 상담신청
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [isChecked, setIsChecked] = useState(true);

  const [showResultModal, setShowResultModal] = useState(false)
  const [otpSent, setOtpSent]   = useState(false)
  const [otpCode, setOtpCode]   = useState("")
  const [verifying, setVerifying] = useState(false)
  const [errorMsg, setErrorMsg]  = useState("")


  const validateForm = () => {
    if (!gender) { alert('성별을 선택해주세요.'); return false }
    if (!name)   { alert('이름을 입력해주세요.'); return false }
    if (!birth)  { alert('생년월일을 입력해주세요.'); return false }
    if (!phone)  { alert('연락처를 입력해주세요.'); return false }
    if (!/^010\d{8}$/.test(phone)) { alert('올바른 휴대폰 번호를 입력해주세요.'); return false }
    return true
  }

  const handlePostOTP = async () => {
    try {
      await request.post('/api/postOTP', { phone })
      setOtpSent(true)
      setShowResultModal(true)
    } catch (e: any) {
      console.error(e)
      alert('인증번호 전송에 실패했습니다.')
    }
  }

  const handleInsuranceCostCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setCounselType(1);
    handlePostOTP();
  }

  const handleRequestInsuranceCounsel = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setCounselType(2);
    handlePostOTP();
  }


  const handleVerifyOTP = async () => {
    if (!otpCode) {
      setErrorMsg('인증번호를 입력해주세요.')
      return
    }
    setVerifying(true)
    try {
      // verifyOTP 에 name, birth, gender, code 추가로 전달해서
      // 유저 없으면 insert, 있으면 select 후 userId 를 리턴하도록 서버 수정 필요
      const res = await request.post('/api/verifyOTP', { phone, code: otpCode, name, birth, gender })
      if (res.data.userId) {
        // 상담 신청
        await request.post('/api/postCounsel', {
          userId: res.data.userId,
          phone,
          counselTypeId: counselType,
          companyId: INSURANCE_COMPANY_ID,
          productId: INSURANCE_PRODUCT_ID
        })
      }
      alert('상담 신청이 완료되었습니다!')
      setShowResultModal(false)
    } catch (e: any) {
      console.error(e)
      setErrorMsg(e.response?.data?.error || '인증에 실패했습니다.')
    } finally {
      setVerifying(false)
    }
  }

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

  return (
    <>
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
              <form className="flex flex-col gap-4 mt-8" onSubmit={handleInsuranceCostCalculate}>
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
                    onFocus={() => {
                        if (!phone || phone === '010') {
                        setPhone('010');
                      }
                    }}
                      onBlur={() => {
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
                    <button type="button" className="ml-2 text-sm text-[#fa5a5a] underline hover:opacity-80 cursor-pointer" onClick={onOpenPrivacy}>보기</button>
                </div>
                <button onClick={handleInsuranceCostCalculate} type="submit" className="w-full bg-[#3a8094] text-white font-bold rounded-xl py-4 text-lg hover:opacity-90 transition flex items-center justify-center gap-2 mt-2 cursor-pointer">
                  <CalculatorIcon className="w-6 h-6" />
                  보험료 확인하기
                </button>
                <div className="flex flex-row gap-2 mt-2">
                  <button 
                    type="button" 
                    onClick={handleRequestInsuranceCounsel}
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
      <Modal title="보험료 계산 결과" open={showResultModal} onClose={() => setShowResultModal(false)}>
        여기!!
      </Modal>
    </>
  );
}
