import React, { useState, useEffect, useRef } from 'react'
import { CalculatorIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import Modal from '@/app/components/Modal';
import request from '@/app/api/request';
import { getProductConfigByPath, getTemplateIdByPath } from '@/app/constants/insurance';
import FireworksEffect from '@/app/components/shared/FireworksEffect';
import { trackPremiumCheck } from "@/app/utils/visitorTracking";

// 현재 경로에 맞는 상품 정보 가져오기
const currentPath = '/insurance/annuity/metlife/only-dollar';
const productConfig = getProductConfigByPath(currentPath);

const INSURANCE_COMPANY_ID = 9; // 메트라이프생명
const INSURANCE_PRODUCT_ID = 13; // (무)오로지연금을위한 달러연금보험

// 기준환율 (원/달러)
const BASE_EXCHANGE_RATE = 1500;

type SloganProps = {
  onOpenPrivacy: () => void
  onModalStateChange?: (isOpen: boolean) => void
}

export default function Slogan({ onOpenPrivacy, onModalStateChange }: SloganProps) {
  const [counselType, setCounselType] = useState(1); // 1: 환급금 확인, 2: 상담신청
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentPeriod, setPaymentPeriod] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [isChecked, setIsChecked] = useState(true);

  const [showResultModal, setShowResultModal] = useState(false)
  const [otpSent, setOtpSent]   = useState(false)
  const [otpCode, setOtpCode]   = useState("")
  const [verifying, setVerifying] = useState(false)
  const [errorMsg, setErrorMsg]  = useState("")
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpResendAvailable, setOtpResendAvailable] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  const [showConsultModal, setShowConsultModal] = useState(false);
  const [consultOtpCode, setConsultOtpCode] = useState('');
  const [consultOtpTimer, setConsultOtpTimer] = useState(180);
  const [consultOtpResendAvailable, setConsultOtpResendAvailable] = useState(true);
  const [consultIsVerified, setConsultIsVerified] = useState(false);

  const [showConsultTypeDropdown, setShowConsultTypeDropdown] = useState(false);
  const [showConsultTimeDropdown, setShowConsultTimeDropdown] = useState(false);
  const [consultType, setConsultType] = useState('오로지연금을위한달러연금보험');
  const [consultTime, setConsultTime] = useState('아무때나');
  const consultTypeOptions = ['오로지연금을위한달러연금보험'];
  const consultTimeOptions = [
    '아무때나',
    '오전 09:00 ~ 10:00',
    '오전 10:00 ~ 11:00',
    '오전 11:00 ~ 12:00',
    '오후 12:00 ~ 01:00',
    '오후 01:00 ~ 02:00',
    '오후 02:00 ~ 03:00',
    '오후 03:00 ~ 04:00',
    '오후 04:00 ~ 05:00',
    '오후 05:00 ~ 06:00',
    '오후 06:00 이후'
  ];

  // 입력 포커스 제어용 Ref
  const nameInputRef = useRef<HTMLInputElement>(null);
  const birthInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const otpInputRef = useRef<HTMLInputElement>(null);
  const consultOtpInputRef = useRef<HTMLInputElement>(null);

  // 입력 필드 포커스 시 스크롤 조정
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const target = e.target;
    // 모바일 환경에서 키보드가 올라올 때 입력창이 가려지지 않도록 중앙으로 스크롤
    if (window.innerWidth < 768 && target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  };


  // 타이머 효과
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpTimer > 0) {
      timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
    } else if (otpTimer === 0 && !otpResendAvailable) {
      setOtpResendAvailable(true);
    }
    return () => clearTimeout(timer);
  }, [otpTimer, otpResendAvailable]);

  // 상담신청 타이머 효과
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (consultOtpTimer > 0) {
      timer = setTimeout(() => setConsultOtpTimer(consultOtpTimer - 1), 1000);
    } else if (consultOtpTimer === 0 && !consultOtpResendAvailable) {
      setConsultOtpResendAvailable(true);
    }
    return () => clearTimeout(timer);
  }, [consultOtpTimer, consultOtpResendAvailable]);

  // 모달 상태 변경 시 부모에게 알림
  useEffect(() => {
    const isAnyModalOpen = showResultModal || showConsultModal;
    onModalStateChange?.(isAnyModalOpen);
  }, [showResultModal, showConsultModal, onModalStateChange]);

  const validateForm = () => {
    if (!isChecked) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return false;
    }
    if (!gender) { 
      alert('성별을 선택해주세요.'); 
      return false;
    }
    if (!name) { 
      alert('이름을 입력해주세요.'); 
      return false;
    }
    if (!birth) { 
      alert('생년월일을 입력해주세요.'); 
      return false;
    }
    if (!/^\d{8}$/.test(birth)) {
      alert('생년월일을 8자리 숫자로 입력해주세요. (예: 19880818)');
      return false;
    }
    const birthYear = parseInt(birth.substring(0, 4));
    const birthMonth = parseInt(birth.substring(4, 6));
    const birthDay = parseInt(birth.substring(6, 8));
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
    
    if (birthYear < 1900 || birthYear > new Date().getFullYear() ||
        birthMonth < 1 || birthMonth > 12 ||
        birthDay < 1 || birthDay > 31 ||
        birthDate.getFullYear() !== birthYear ||
        birthDate.getMonth() !== birthMonth - 1 ||
        birthDate.getDate() !== birthDay) {
      alert('올바른 생년월일을 입력해주세요.');
      return false;
    }

    // 보험연령 안내는 모달에서 처리 (이 상품: 15~70세)
    const formInsuranceAge = Number(getInsuranceAge(birth));

    if (!phone) { 
      alert('연락처를 입력해주세요.'); 
      return false;
    }
    if (!/^\d{11}$/.test(phone)) {
      alert('연락처를 11자리 숫자로 입력해주세요. (예: 01012345678)');
      return false;
    }
    if (!phone.startsWith('010')) {
      alert('올바른 휴대폰 번호를 입력해주세요. (010으로 시작)');
      return false;
    }

    if (!paymentPeriod) {
      alert('납입기간을 선택해주세요.');
      return false;
    }
    if (!paymentAmount) {
      alert('월 납입금액을 선택해주세요.');
      return false;
    }
    return true;
  }

  const handlePostOTP = async () => {
    const templateId = getTemplateIdByPath(currentPath)
    console.log(`[CLIENT] 인증번호 전송 시작: ${new Date().toISOString()}`);
    try {
      const response = await request.post('/api/postOTP', { 
        phone, 
        templateId,
        companyName: "메트라이프생명",
        productName: "오로지연금을위한달러연금보험"
      })
      console.log(`[CLIENT] 인증번호 전송 성공: ${new Date().toISOString()}`);
      setOtpSent(true)
      alert('인증번호가 전송되었습니다.')
    } catch (e: any) {
      console.error(`[CLIENT] 인증번호 전송 실패:`, e);
      if (e.code === 'ECONNABORTED') {
        alert('인증번호 전송 시간이 초과되었습니다. 다시 시도해주세요.');
      } else if (e.response?.status === 502) {
        alert('알림톡 전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        alert('인증번호 전송에 실패했습니다.');
      }
    }
  }

  const handleInsuranceCostCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setCounselType(1);
    setShowResultModal(true);
  }


  const handleVerifyAndShowInfo = () => {
    // if (!otpSent) {
    //   alert('인증번호를 먼저 전송해 주세요.');
    //   return;
    // }
    if (otpCode.length !== 6) {
      alert('6자리 인증번호를 입력해주세요.');
      return;
    }
    setIsVerified(true);
    alert('인증이 완료되었습니다!');
  };

  const handleVerifyOTP = async () => {
  const ageForVerify = insuranceAge !== '' ? Number(insuranceAge) : NaN;
  if (isNaN(ageForVerify) || ageForVerify < 15 || ageForVerify > 70) return;
  if (otpCode.length !== 6) {
    alert("6자리 인증번호를 입력해주세요.");
    return;
  }

  setVerifying(true);
  try {
    const res = await request.post("/api/verifyOTP", {
      phone,
      name,
      birth,
      gender,
      code: otpCode,
      counselType: counselType,
      companyId: INSURANCE_COMPANY_ID,
      productId: INSURANCE_PRODUCT_ID,
      counselTime: consultTime,
      mounthlyPremium: monthlyPremiumForAlimtalk, // 달러(약 원화)
      paymentPeriod: paymentPeriod,   // 실제 선택값
      tenYearReturnRate: rate ? Math.round(rate * 100) : '-', // 환급률
      interestValue: interestValueForAlimtalk, // 달러(약 원화)
      refundValue: refundValueForAlimtalk,    // 달러(약 원화)
      templateId: "UB_8712"
    });
    if (res.data.success) {
      // 방문자 추적: 환급금 확인
      try {
        await trackPremiumCheck(INSURANCE_PRODUCT_ID, INSURANCE_COMPANY_ID, {
          phone,
          name,
          counsel_type_id: 1, // 환급금 확인
          utm_source: 'direct',
          utm_campaign: 'premium_calculation'
        });
        console.log("[CLIENT] 방문자 추적 성공: 환급금 확인");
      } catch (trackingError) {
        console.warn("[CLIENT] 방문자 추적 실패 (무시됨):", trackingError);
      }
      
      setIsVerified(true);
      setOtpSent(false);
      // alert 제거: 바로 결과 표시
    } else {
      alert("인증에 실패했습니다.");
    }
  } catch (e: any) {
    alert(e.error || "인증에 실패했습니다.");
  } finally {
    setVerifying(false);
  }
};


  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 숫자만 추출하고 8자리로 제한
    const numbers = value.replace(/[^0-9]/g, '').slice(0, 8);
    setBirth(numbers);
    setIsVerified(false);
    if (numbers.length === 8) {
      setTimeout(() => phoneInputRef.current?.focus(), 0);
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 숫자만 추출하고 11자리로 제한
    const numbers = value.replace(/[^0-9]/g, '').slice(0, 11);
    setPhone(numbers);
    setIsVerified(false);
  };

  const handleSendOTP = async () => {
    const ageForOtp = insuranceAge !== '' ? Number(insuranceAge) : NaN;
    if (isNaN(ageForOtp) || ageForOtp < 15 || ageForOtp > 70) return;
    setOtpTimer(180); // 3분
    setOtpResendAvailable(false);
    await handlePostOTP(); // 인증번호 전송 및 otpSent true 처리
    setTimeout(() => {
      otpInputRef.current?.focus();
      otpInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // 모달 닫힐 때 인증상태 초기화
  const handleCloseModal = () => {
    setIsVerified(false);
    setShowResultModal(false);
    setOtpTimer(0);
    setOtpResendAvailable(true);
  };

  // 입력값 변경 시 인증상태 초기화
  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
    setIsVerified(false);
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsVerified(false);
  };
  const handlePaymentPeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentPeriod(e.target.value);
    setIsVerified(false);
  };
  const handlePaymentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentAmount(e.target.value);
    setIsVerified(false);
  };

  const handleOpenConsultModal = () => {
    if (!validateForm()) return;
    setConsultIsVerified(false);
    setConsultOtpCode("");
    setConsultOtpTimer(0);
    setConsultOtpResendAvailable(true);
    setShowConsultModal(true);
  };
  const handleCloseConsultModal = () => {
    setConsultIsVerified(false);
    setShowConsultModal(false);
    setConsultOtpTimer(0);
    setConsultOtpResendAvailable(true);
  };
  const handleConsultSendOTP = async () => {
    setConsultOtpTimer(180);
    setConsultOtpResendAvailable(false);
    await handlePostOTP();
    setTimeout(() => {
      consultOtpInputRef.current?.focus();
      consultOtpInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  };

  const handleConsultVerifyOTP = async () => {
    if (consultOtpCode.length !== 6) {
      alert("6자리 인증번호를 입력해주세요.");
      return;
    }
    setVerifying(true);
    try {
      // 납입기간과 월납입금액이 있는 경우에만 계산값 사용
      let tenYearReturnRate = '-';
      let interestValue = '-';
      let refundValue = '-';
      
      if (paymentPeriod && paymentAmount) {
        tenYearReturnRate = rate ? Math.round(rate * 100).toString() : '-';
        interestValue = interestValueForAlimtalk;
        refundValue = refundValueForAlimtalk;
      }
      
      const res = await request.post("/api/verifyOTP", {
        phone,
        name,
        birth,
        gender, // 추가: 성별도 함께 전달
        code: consultOtpCode,
        counselType: 2,
        companyId: INSURANCE_COMPANY_ID,
        productId: INSURANCE_PRODUCT_ID,
        consultType,
        counselTime: consultTime,
        mounthlyPremium: monthlyPremiumForAlimtalk || '',
        paymentPeriod: paymentPeriod || '',
        tenYearReturnRate,
        interestValue,
        refundValue,
        templateId: "UB_8715"
      });
      if (res.data.success) {
        // alert 제거: 바로 결과 표시
        setConsultIsVerified(true);
      } else {
        alert("인증에 실패했습니다.");
        return;
      }
    } catch (e: any) {
      alert(e.error || "인증에 실패했습니다.");
    } finally {
      setVerifying(false);
    }
  };

  // 보험연령 계산 함수 (생년월일 + 6개월 기준)
  const getInsuranceAge = (birth: string) => {
    if (!/^\d{8}$/.test(birth)) return '';
    const birthYear = parseInt(birth.substring(0, 4));
    const birthMonth = parseInt(birth.substring(4, 6));
    const birthDay = parseInt(birth.substring(6, 8));
    
    // 생년월일에 6개월을 더한 날짜 계산
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
    const insuranceBaseDate = new Date(birthDate);
    insuranceBaseDate.setMonth(insuranceBaseDate.getMonth() + 6);
    
    // 현재 날짜와 보험기준일(생년월일+6개월)의 차이로 보험연령 계산
    const today = new Date();
    let insuranceAge = today.getFullYear() - insuranceBaseDate.getFullYear();
    if (
      today.getMonth() < insuranceBaseDate.getMonth() ||
      (today.getMonth() === insuranceBaseDate.getMonth() && today.getDate() < insuranceBaseDate.getDate())
    ) {
      insuranceAge -= 1;
    }
    
    return insuranceAge + 1;
  };

  // 보험연령 계산
  const insuranceAge = getInsuranceAge(birth);
  // 연령 적합성 (0~70세)
  const isAgeKnown = insuranceAge !== '';
  const numericInsuranceAge = isAgeKnown ? Number(insuranceAge) : NaN;
  const isAgeEligible = isAgeKnown && numericInsuranceAge >= 0 && numericInsuranceAge <= 70;

  // 납입기간별 10년시점 환급률 (보증형 기준)
  const getRefundRate = (period: string) => {
    if (period === '5년납') return 1.30; // 130%
    if (period === '7년납') return 1.27; // 127%
    if (period === '10년납') return 1.20; // 120%
    return 1.30; // 기본값
  };

  // 월 납입금액 (달러 기준)
  const paymentAmountUSD = paymentAmount ? parseFloat(paymentAmount.replace(/[^0-9.]/g, '')) : 0;
  const months = parseInt(paymentPeriod.replace(/[^0-9]/g, '')) * 12;
  const totalUSD = (!isNaN(paymentAmountUSD) && !isNaN(months) && paymentAmountUSD > 0 && months > 0) ? paymentAmountUSD * months : 0;
  
  // 환급률 계산 (납입기간별)
  const rate = getRefundRate(paymentPeriod);
  const interestRate = rate - 1; // 이자율 = 환급률 - 100%
  
  // 달러 기준 계산
  const interestValueUSD = totalUSD ? parseFloat((totalUSD * interestRate).toFixed(2)) : 0;
  const refundValueUSD = totalUSD ? parseFloat((totalUSD * rate).toFixed(2)) : 0;
  
  // 원화 환산 값
  const totalKRW = totalUSD ? Math.round(totalUSD * BASE_EXCHANGE_RATE) : 0;
  const interestValueKRW = interestValueUSD ? Math.round(interestValueUSD * BASE_EXCHANGE_RATE) : 0;
  const refundValueKRW = refundValueUSD ? Math.round(refundValueUSD * BASE_EXCHANGE_RATE) : 0;
  
  // 표시용 값
  const interestValue = interestValueUSD ? interestValueUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '-';
  const refundValue = refundValueUSD ? refundValueUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '-';
  
  // 알림톡용 달러 환산 포함 값
  const totalForAlimtalk = totalUSD 
    ? `$${totalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (약 ${totalKRW.toLocaleString('ko-KR')}원)` 
    : '-';
  const interestValueForAlimtalk = interestValueUSD 
    ? `$${interestValue} (약 ${interestValueKRW.toLocaleString('ko-KR')}원)` 
    : '-';
  const refundValueForAlimtalk = refundValueUSD 
    ? `$${refundValue} (약 ${refundValueKRW.toLocaleString('ko-KR')}원)` 
    : '-';
  const monthlyPremiumForAlimtalk = paymentAmount 
    ? `$${paymentAmount} (약 ${Math.round(paymentAmountUSD * BASE_EXCHANGE_RATE).toLocaleString('ko-KR')}원)` 
    : '-';

  return (
    <>
      <section
        className="w-full bg-gradient-to-br from-[#e0f2fe] via-[#bae6fd] to-[#7dd3fc] py-6 md:py-6 lg:py-3 lg:min-h-[600px] lg:flex lg:items-center relative overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(circle at 18% 22%, rgba(14, 165, 233, 0.14) 0%, transparent 42%),
            radial-gradient(circle at 82% 78%, rgba(56, 189, 248, 0.16) 0%, transparent 46%),
            radial-gradient(circle at 50% 50%, rgba(125, 211, 252, 0.1) 0%, transparent 55%),
            radial-gradient(2px 2px at 25% 35%, rgba(2, 132, 199, 0.25) 0%, transparent 100%),
            radial-gradient(2px 2px at 65% 65%, rgba(2, 132, 199, 0.25) 0%, transparent 100%),
            radial-gradient(2px 2px at 85% 25%, rgba(2, 132, 199, 0.25) 0%, transparent 100%)
          `,
          backgroundSize: '100% 100%, 100% 100%, 100% 100%, 90px 90px, 90px 90px, 90px 90px',
          backgroundPosition: '0 0, 0 0, 0 0, 0 0, 45px 45px, 22px 68px',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-col lg:flex-row items-center md:items-center lg:items-start justify-center lg:justify-between gap-4 md:gap-8 lg:gap-12 px-4 md:px-6 lg:px-4 md:py-4 lg:py-4">
          {/* 왼쪽: 상품 설명/이미지 */}
          <div className="flex-1 flex flex-col items-center md:items-center lg:items-start text-center md:text-center lg:text-left max-w-2xl">
            {/* 상품명 텍스트 영역 */}
            <div className="mb-3">
              <div className="text-sm font-bold text-gray-800 mb-1">메트라이프생명</div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-1">
                (무)오로지연금을위한 달러연금보험
              </h1>
              <div className="text-base font-semibold text-blue-600">(보증비용부과형)(보증형)</div>
              <p className="text-xs text-gray-700 mt-1">7년/10년/min(30년, 연금개시시점)<br className="sm:hidden" /> 최저계약자적립액을 보증하는 달러연금보험</p>
            </div>

            {/* 핵심 정보 박스 */}
            <div className="w-full bg-white rounded-xl shadow-lg p-3 sm:p-4 mb-3 border-2 border-blue-100">
              {/* 공시이율 */}
              <div className="flex flex-col sm:flex-row items-center justify-between mb-3 pb-3 border-b border-gray-200 gap-2">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center sm:justify-start">
                  <div className="text-xs sm:text-sm">
                    <span className="bg-blue-500 text-white font-bold px-2 py-0.5 rounded">공시이율</span>
                    <span className="text-gray-600 text-[10px] sm:text-xs ml-1">(2026.6월)</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-blue-600">4.69</span>
                    <span className="text-xl sm:text-2xl font-bold text-blue-600">%</span>
                  </div>
                  <p className="text-[10px] text-gray-600 whitespace-nowrap">※ 공시이율은 매월 변동됩니다.</p>
                </div>
              </div>

              {/* 추가 혜택 */}
              <div className="space-y-2">
                <div>
                  <div className="font-bold text-xs sm:text-sm text-gray-900 mb-0.5">✓ 최저계약자적립액 <span className="text-blue-600">7년/10년/min(30년, 연금개시시점) 보증!</span></div>
                  <div className="text-[10px] sm:text-xs text-gray-600 pl-3 sm:pl-4">7년 100%, 10년 130%,<br className="sm:hidden" /> min(30년, 연금개시시점) 130%+매년 2.5% 보증<br className="sm:hidden" />(5년납 보증형 기준)</div>
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-gray-900 mb-0.5">✓ 가입 <span className="text-blue-600">0~70세</span> / 전건 <span className="text-blue-600">무진단·무심사!</span></div>
                  <div className="text-[10px] sm:text-xs text-gray-600 pl-3 sm:pl-4">건강 상태와 무관하게 누구나 가입 가능</div>
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-gray-900 mb-0.5">✓ <span className="text-blue-600">추가납입 & 중도인출 & 연금전환</span> 가능!</div>
                  <div className="text-[10px] sm:text-xs text-gray-600 pl-3 sm:pl-4">유연한 자금 운용으로 생활 설계에 맞춰 활용</div>
                </div>
              </div>
            </div>

            {/* 시점별 환급률 비교표 */}
            <div className="w-full bg-white rounded-xl shadow-lg p-4 sm:p-5 border border-gray-200">
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 sm:p-4">
                  <div className="flex justify-center mb-2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-blue-700 font-medium mb-1 text-center">7년 경과시점</div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 text-center mb-1">100%</div>
                  <div className="text-xs text-gray-600 text-center">환급률 보증</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 sm:p-4 relative">
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg animate-pulse">HOT</div>
                  <div className="flex justify-center mb-2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-purple-700 font-medium mb-1 text-center">10년 경과시점</div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 text-center mb-1">
                    <span className="animate-pulse-scale">130%</span>
                  </div>
                  <style jsx>{`
                    @keyframes pulse-scale {
                      0%, 100% {
                        transform: scale(1);
                      }
                      50% {
                        transform: scale(1.1);
                      }
                    }
                    .animate-pulse-scale {
                      animation: pulse-scale 2s ease-in-out infinite;
                      display: inline-block;
                    }
                  `}</style>
                  <div className="text-xs text-gray-600 text-center">환급률 보증</div>
                </div>
                
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-3 sm:p-4">
                  <div className="flex justify-center mb-2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-pink-700 font-medium mb-1 text-center leading-tight">연금개시 or<br />30년 경과</div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-600 text-center mb-1">130%+</div>
                  <div className="text-xs text-gray-600 text-center">매년 2.5%씩</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 text-center mt-3">
                *5년납 보증형 최저계약자 적립액 보증 비율 예시<br />
                (단, 연금개시시점 보증은 연금개시하는 경우에만 보증)
              </div>
            </div>

          </div>
          {/* 오른쪽: 환급금 확인 카드 */}
          <div className="flex-1 flex justify-center lg:justify-end w-full lg:ml-8 lg:self-center">
            <div id="calculator-box" className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-2xl p-5 sm:p-6 md:p-7 relative flex flex-col">
              <div className="mb-5 sm:mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] rounded-lg flex items-center justify-center">
                    <CalculatorIcon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">해약환급금 계산하기</h3>
                </div>
                <p className="text-gray-700 text-xs sm:text-sm ml-10">간단한 정보 입력으로 예상 해약환급금을 확인하세요</p>
              </div>
              <form className="flex flex-col gap-3 sm:gap-4" onSubmit={handleInsuranceCostCalculate}>
                {/* 성별/이름 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">성별 <span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                      <label className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border-2 cursor-pointer transition-all ${gender === "M" ? 'border-[#0ea5e9] bg-[#0ea5e9]/5 text-[#0ea5e9]' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" name="gender" value="M" checked={gender === "M"} onChange={handleGenderChange} className="sr-only" />
                        <span className="text-sm font-medium">남자</span>
                      </label>
                      <label className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border-2 cursor-pointer transition-all ${gender === "F" ? 'border-[#0ea5e9] bg-[#0ea5e9]/5 text-[#0ea5e9]' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" name="gender" value="F" checked={gender === "F"} onChange={handleGenderChange} className="sr-only" />
                        <span className="text-sm font-medium">여자</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">이름 <span className="text-red-500">*</span></label>
                    <input type="text" inputMode="text" ref={nameInputRef} value={name} onChange={handleNameChange} onFocus={handleInputFocus} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); birthInputRef.current?.focus(); } }} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#0ea5e9]/20 focus:border-[#0ea5e9] transition-all" placeholder="홍길동" />
                  </div>
                </div>

                {/* 생년월일/연락처 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">생년월일 <span className="text-red-500">*</span></label>
                    <input type="text" inputMode="numeric" pattern="[0-9]*" ref={birthInputRef} value={birth} onChange={handleBirthChange} onFocus={handleInputFocus} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#0ea5e9]/20 focus:border-[#0ea5e9] transition-all" placeholder="19880818" maxLength={8} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">연락처 <span className="text-red-500">*</span></label>
                    <input type="text" inputMode="numeric" pattern="[0-9]*" ref={phoneInputRef} value={phone} onChange={handlePhoneChange} onFocus={handleInputFocus} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#0ea5e9]/20 focus:border-[#0ea5e9] transition-all" placeholder="01012345678" />
                  </div>
                </div>

                {/* 납입기간 */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">납입기간</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['5년납', '7년납', '10년납'].map((period) => (
                      <label key={period} className="relative cursor-pointer">
                        {period === '5년납' && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-lg z-10 animate-bounce">추천</span>
                        )}
                        <input type="radio" name="paymentPeriod" value={period} checked={paymentPeriod === period} onChange={handlePaymentPeriodChange} className="peer sr-only" />
                        <div className={`w-full text-center py-2.5 text-sm border-2 rounded-lg transition-all ${paymentPeriod === period ? 'border-[#0ea5e9] bg-[#0ea5e9]/5 text-[#0ea5e9] font-bold' : 'border-gray-200 hover:border-gray-300'}`}>
                          {period}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 월 납입금액 */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">월 납입금액 <span className="text-gray-600 font-normal">(원화 기준)</span></label>
                  <div className="grid grid-cols-3 gap-2">
                    {(() => {
                      // 원화 기준 옵션 (30/50/70/100/130/150만원)
                      const krwOptions = [300000, 500000, 700000, 1000000, 1300000, 1500000];
                      
                      // 납입기간별 최소 금액 필터링
                      let filteredOptions = krwOptions;
                      if (paymentPeriod === '5년납') {
                        // 최소 $200 = 약 30만원
                        filteredOptions = krwOptions.filter(krw => krw >= 300000);
                      } else if (paymentPeriod === '7년납') {
                        // 최소 $150 = 약 22.5만원
                        filteredOptions = krwOptions;
                      } else if (paymentPeriod === '10년납') {
                        // 최소 $100 = 약 15만원
                        filteredOptions = krwOptions;
                      }
                      
                      return filteredOptions.map((krw) => {
                        const usd = Math.round(krw / BASE_EXCHANGE_RATE);
                        const usdStr = usd.toString();
                        return (
                          <label key={krw} className="cursor-pointer">
                            <input type="radio" name="paymentAmount" value={usdStr} checked={paymentAmount === usdStr} onChange={handlePaymentAmountChange} className="peer sr-only" />
                            <div className={`w-full text-center py-2 text-sm border-2 rounded-lg transition-all ${paymentAmount === usdStr ? 'border-[#0ea5e9] bg-[#0ea5e9]/5 text-[#0ea5e9] font-bold' : 'border-gray-200 hover:border-gray-300'}`}>
                              <div className="font-bold">${usd}</div>
                              <div className={`text-xs ${paymentAmount === usdStr ? 'text-[#0ea5e9]/70' : 'text-gray-600'}`}>약 {(krw / 10000).toLocaleString()}만원</div>
                            </div>
                          </label>
                        );
                      });
                    })()}
                  </div>
                  <p className="text-[10px] text-[#0ea5e9] mt-2 text-center">※ 달러 환산은 기준환율 {BASE_EXCHANGE_RATE.toLocaleString()}원 적용 / 실제 환율에 따라 변동됩니다.</p>
                  {paymentPeriod && (
                    <p className="text-[10px] text-gray-600 mt-1 text-center">
                      {paymentPeriod === '5년납' && '※ 최소 납입액: 약 30만원 ($200)'}
                      {paymentPeriod === '7년납' && '※ 최소 납입액: 약 22.5만원 ($150)'}
                      {paymentPeriod === '10년납' && '※ 최소 납입액: 약 15만원 ($100)'}
                    </p>
                  )}
                </div>

                {/* 개인정보 동의 */}
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} className="w-4 h-4 text-[#0ea5e9] rounded border-gray-300 cursor-pointer focus:ring-[#0ea5e9]" />
                  <span className="text-xs text-gray-600">
                    개인정보 수집 및 이용에 동의합니다. 
                    <button type="button" onClick={onOpenPrivacy} className="text-[#0ea5e9] underline ml-1 hover:text-[#0284c7]">자세히 보기</button>
                  </span>
                </div>

                {/* 버튼들 */}
                <div className="flex flex-col gap-2 mt-1">
                  <button type="submit" className="w-full bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white font-bold rounded-xl py-3.5 text-base hover:opacity-95 transition flex items-center justify-center gap-2 shadow-lg shadow-[#0ea5e9]/25 cursor-pointer">
                    <CalculatorIcon className="w-5 h-5" />
                    해약환급금 확인하기
                  </button>
                  <div className="flex gap-2">
                    <button type="button" onClick={handleOpenConsultModal} className="flex-1 bg-[#fa5a5a] text-white font-bold rounded-xl py-3 text-sm flex items-center justify-center gap-1.5 hover:opacity-95 transition cursor-pointer">
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M2.25 12a9.75 9.75 0 1 1 19.5 0v3.375a2.625 2.625 0 0 1-2.625 2.625h-1.125a.375.375 0 0 1-.375-.375V15a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 0 .75-.75V12a8.25 8.25 0 1 0-16.5 0v1.5a.75.75 0 0 0 .75.75h.75A.75.75 0 0 1 6 15v2.625a.375.375 0 0 1-.375.375H4.5A2.625 2.625 0 0 1 1.875 15.375V12Z' />
                      </svg>
                      상담신청
                    </button>
                    <a href="https://pf.kakao.com/_lrubxb/chat" target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#fee500] text-[#3d1e1e] font-bold rounded-xl py-3 text-sm flex items-center justify-center gap-1.5 hover:opacity-95 transition cursor-pointer">
                      <ChatBubbleLeftRightIcon className="w-4 h-4" />
                      채팅상담
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Modal 
        title={
          counselType === 1 ? (
            <span className="flex items-center gap-2">
              <CalculatorIcon className="w-6 h-6 text-[#3a8094]" />
              환급금 확인하기
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-[#fa5a5a]">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.25a1 1 0 01-1 1A17.93 17.93 0 013 5a1 1 0 011-1h3.25a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z"/>
              </svg>
              상담 신청하기
            </span>
          )
        }
        open={showResultModal}
        onClose={handleCloseModal}
      >
        <div className="space-y-2 sm:space-y-3">
          {isAgeKnown && !isAgeEligible && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded p-1.5 sm:p-2 text-xs sm:text-sm">
              이 상품은 0세~70세까지만 가입 가능합니다. 현재 보험연령 {numericInsuranceAge}세는 가입 대상이 아닙니다.
              계산 기능은 이용하실 수 없습니다.
            </div>
          )}
          {/* 환급금 산출 완료 안내 박스 (인증 후) */}
          {isVerified && (
            <>
              <FireworksEffect show={true} />
              <div className="bg-[#f8f8ff] rounded p-2 sm:p-2.5 mb-1.5 sm:mb-2 text-center">
                <div className="text-base sm:text-lg text-black font-bold">환급금 산출이 완료되었습니다.</div>
              </div>
              {/* 환급금 결과값 UI (상세 정보) */}
              <div className="bg-gray-50 rounded-lg p-1.5 sm:p-2">
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                  <span className="text-2xl text-[#7c3aed] font-extrabold align-middle">{name}</span>
                  <span className="text-lg text-[#7c3aed] font-bold align-middle">&nbsp;님</span>
                  {insuranceAge !== '' && (
                    <span className="font-bold ml-2 flex items-center">
                      <span className="text-lg text-[#3a8094]">보험연령 </span>
                      <span className="text-2xl font-extrabold text-[#ef4444] mx-1">{insuranceAge}</span>
                      <span className="text-lg text-[#3a8094]">세</span>
                    </span>
                  )}
                </h3>
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>보험사</span>
                    <span className="font-bold text-[#3a8094]">메트라이프생명</span>
                  </div>
                </div>
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>상품명</span>
                    <span className="font-bold text-[#3a8094] text-xs sm:text-sm">오로지연금을위한달러연금보험</span>
                  </div>
                </div>
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>납입기간 / 월보험료</span>
                    <span className="font-bold text-[#3a8094]">
                      {paymentPeriod && paymentAmount ? `${paymentPeriod} / $${paymentAmount}` : '-'}
                    </span>
                  </div>
                </div>
                {/* 총 납입액 */}
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>총 납입액</span>
                    <span className="font-bold">
                      <div className="text-[#3a8094]">${totalUSD ? totalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '-'}</div>
                      <div className="text-xs text-gray-600">약 {totalKRW ? totalKRW.toLocaleString('ko-KR') : '-'}원</div>
                    </span>
                  </div>
                </div>
                {/* 10년 시점 환급률 */}
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>10년 시점 환급률</span>
                    <span className="font-bold">
                      <span className="text-[#7c3aed]">{rate ? Math.round(rate * 100) : '-'}</span>{' '}<span className="text-[#3a8094]">%</span>
                    </span>
                  </div>
                </div>
                {/* 10년 확정이자 */}
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>10년 확정이자</span>
                    <span className="font-bold">
                      <div className="text-[#3b82f6]">${interestValue}</div>
                      <div className="text-xs text-gray-600">약 {interestValueKRW ? interestValueKRW.toLocaleString('ko-KR') : '-'}원</div>
                    </span>
                  </div>
                </div>
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>10년 시점 예상 해약환급금</span>
                    <span className="font-bold">
                      <div className="text-[#ef4444]">${refundValue}</div>
                      <div className="text-xs text-gray-600">약 {refundValueKRW ? refundValueKRW.toLocaleString('ko-KR') : '-'}원</div>
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-700 text-center mt-4">
                  * 실제 보험료 및 해약환급금은 가입시점 및 고객 정보에 따라 달라질 수 있습니다.
                  <br />
                  * 본 계산 결과는 참고용이며, 실제 계약 시 보험사 약관 및 상품설명서를 확인 바랍니다.
                </div>
              </div>
            </>
          )}
          {!isVerified && (
            <>
              {/* 환급금 계산 결과 */}
              <div className="bg-gray-50 rounded-lg p-2">
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                  <span className="text-2xl text-[#7c3aed] font-extrabold align-middle">{name}</span>
                  <span className="text-lg text-[#7c3aed] font-bold align-middle">&nbsp;님</span>
                  {insuranceAge !== '' && (
                    <span className="font-bold ml-2 flex items-center">
                      <span className="text-lg text-[#3a8094]">보험연령 </span>
                      <span className="text-2xl font-extrabold text-[#ef4444] mx-1">{insuranceAge}</span>
                      <span className="text-lg text-[#3a8094]">세</span>
                    </span>
                  )}
                </h3>
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>보험사</span>
                    <span className="font-bold text-[#3a8094]">메트라이프생명</span>
                  </div>
                </div>
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>상품명</span>
                    <span className="font-bold text-[#3a8094] text-xs sm:text-sm">오로지연금을위한달러연금보험</span>
                  </div>
                </div>
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>납입기간 / 월보험료</span>
                    <span className="font-bold text-[#3a8094]">
                      {paymentPeriod && paymentAmount ? `${paymentPeriod} / $${paymentAmount}` : '-'}
                    </span>
                  </div>
                </div>
                {/* 총 납입액 */}
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>총 납입액</span>
                    <span className="font-bold">
                      <div className="text-[#3a8094]">${totalUSD ? totalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '-'}</div>
                      <div className="text-xs text-gray-600">약 {totalKRW ? totalKRW.toLocaleString('ko-KR') : '-'}원</div>
                    </span>
                  </div>
                </div>
                {/* 10년 시점 환급률 */}
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>10년 시점 환급률</span>
                    <span className="font-bold">
                      <span className="text-[#7c3aed]">?</span>{' '}<span className="text-[#3a8094]">%</span>
                    </span>
                  </div>
                </div>
                {/* 10년 확정이자 */}
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>10년 확정이자</span>
                    <span className="font-bold">
                      <span className="text-[#3b82f6]">?</span>{' '}<span className="text-[#3a8094]">원</span>
                    </span>
                  </div>
                </div>
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>10년 시점 예상 해약환급금</span>
                    <span className="font-bold">
                      <span className="text-[#ef4444]">?</span>{' '}<span className="text-[#3a8094]">원</span>
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-700 text-center mt-4">
                  * 실제 보험료 및 해약환급금은 가입시점 및 고객 정보에 따라 달라질 수 있습니다.
                  <div className="mt-0.5 text-[#3a8094]">* 휴대폰 인증 완료 후 상세 정보를 확인하실 수 있습니다.</div>
                </div>
              </div>
              {/* 휴대폰 인증 안내 및 인증번호 입력란을 항상 노출 */}
              <div className="bg-gray-50 rounded-lg p-1.5 sm:p-2 mt-0">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">휴대폰 인증</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">
                  정확한 환급금 확인을 위해 휴대폰 인증이 필요합니다.
                </p>
                <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2 mb-2 sm:mb-3 items-stretch sm:items-center">
                  <input
                    type="text"
                    value={phone}
                    readOnly
                    className="flex-1 px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md text-sm sm:text-base bg-gray-100"
                  />
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={!isAgeEligible}
                    className={`${!isAgeEligible ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-[#f97316] text-white hover:bg-[#ea580c]'} w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 rounded-md text-sm sm:text-base font-medium transition-colors min-w-[100px] sm:min-w-[120px]`}
                  >
                    {otpResendAvailable ? '인증번호 전송' : '재발송'}
                  </button>
                  {!otpResendAvailable && (
                    <div className="min-w-[60px] flex items-center justify-center text-[#3a8094] font-medium text-sm">
                      {formatTime(otpTimer)}
                    </div>
                  )}
                </div>
                <div className="flex gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    ref={otpInputRef}
                    value={otpCode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
                      setOtpCode(val);
                    }}
                    maxLength={6}
                    className="flex-1 px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md text-sm sm:text-base focus:ring-[#3a8094] focus:border-[#3a8094]"
                    placeholder="6자리 인증번호 입력"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleVerifyOTP}
                  disabled={!isAgeEligible || verifying || otpCode.length !== 6}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-md text-base sm:text-lg font-semibold transition-colors mt-1 sm:mt-2 ${(!isAgeEligible || verifying || otpCode.length !== 6) ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-[#3a8094] text-white hover:bg-[#2c6070]'}`}
                >
                  {verifying ? '인증 처리중...' : '인증하고 결과 확인하기'}
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
      {/* 상담신청 모달 */}
      <Modal
        title={
          <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-[#fa5a5a]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.25a1 1 0 01-1 1A17.93 17.93 0 013 5a1 1 0 011-1h3.25a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z"/>
            </svg>
            상담 신청하기
          </span>
        }
        open={showConsultModal}
        onClose={handleCloseConsultModal}
      >
        <div className="space-y-3">
          {/* 안내문구 */}
          {consultIsVerified ? (
            <>
              <FireworksEffect show={true} />
              <div className="bg-[#f8f8ff] rounded p-3 mb-1 text-center">
                <div className="text-lg text-black font-bold">상담신청이 접수되었습니다.</div>
                <div className="text-sm text-gray-600 mt-1">담당자가 선택하신 상담 시간에 연락드릴 예정입니다.</div>
              </div>
            </>
          ) : (
            <div className="text-sm text-gray-700 bg-[#f8f8ff] rounded p-2 mb-1 text-center font-semibold">
              상담신청을 위해 아래 정보를 입력해 주세요.
            </div>
          )}
          <div className="bg-gray-50 rounded-lg p-2.5 mb-0.5">
            <h3 className="mb-2 flex items-center">
              <span className="text-2xl text-[#7c3aed] font-extrabold align-middle">{name}</span>
              <span className="text-lg text-[#7c3aed] font-bold align-middle">&nbsp;님</span>
              {insuranceAge !== '' && (
                <span className="font-bold ml-2 flex items-center">
                  <span className="text-lg text-[#3a8094]">보험연령 </span>
                  <span className="text-2xl font-extrabold text-[#ef4444] mx-1">{insuranceAge}</span>
                  <span className="text-lg text-[#3a8094]">세</span>
                </span>
              )}
            </h3>
            <div className="grid grid-cols-1 gap-1 sm:gap-1.5">
              <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>이름</span>
                  <span className="font-bold text-[#3a8094] text-sm sm:text-base">{name}</span>
                </div>
              </div>
              <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>연락처</span>
                  <span className="font-bold text-[#3a8094] text-sm sm:text-base">{phone}</span>
                </div>
              </div>
              <div className={`bg-white p-1.5 sm:p-2 rounded border border-gray-200 relative ${consultIsVerified ? '' : 'cursor-pointer select-none'}`}
                onClick={consultIsVerified ? undefined : () => setShowConsultTypeDropdown(v => !v)}
                tabIndex={consultIsVerified ? -1 : 0}
                onBlur={consultIsVerified ? undefined : () => setTimeout(() => setShowConsultTypeDropdown(false), 100)}
                aria-disabled={consultIsVerified}
              >
                <div className="flex justify-between items-center text-sm">
                  <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>상담종류</span>
                  <span className={`font-bold flex items-center gap-1 text-sm sm:text-base ${consultIsVerified ? 'text-[#3a8094]' : 'text-[#7c3aed]'}`}>
                    {consultType}
                    {!consultIsVerified && (
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    )}
                  </span>
                </div>
                {!consultIsVerified && showConsultTypeDropdown && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded shadow z-10">
                    {consultTypeOptions.map(opt => (
                      <div
                        key={opt}
                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 ${consultType === opt ? 'text-[#7c3aed] font-bold' : 'text-gray-700'}`}
                        onClick={e => { e.stopPropagation(); setConsultType(opt); setShowConsultTypeDropdown(false); }}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className={`bg-white p-1.5 sm:p-2 rounded border border-gray-200 relative ${consultIsVerified ? '' : 'cursor-pointer select-none'}`}
                onClick={consultIsVerified ? undefined : () => setShowConsultTimeDropdown(v => !v)}
                tabIndex={consultIsVerified ? -1 : 0}
                onBlur={consultIsVerified ? undefined : () => setTimeout(() => setShowConsultTimeDropdown(false), 100)}
                aria-disabled={consultIsVerified}
              >
                <div className="flex justify-between items-center text-sm">
                  <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>상담시간대</span>
                  <span className={`font-bold flex items-center gap-1 text-sm sm:text-base ${consultIsVerified ? 'text-[#3a8094]' : 'text-[#7c3aed]'}`}>
                    {consultTime}
                    {!consultIsVerified && (
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    )}
                  </span>
                </div>
                {!consultIsVerified && showConsultTimeDropdown && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded shadow z-10 max-h-48 overflow-y-auto overscroll-contain">
                    {consultTimeOptions.map(opt => (
                      <div
                        key={opt}
                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 ${consultTime === opt ? 'text-[#7c3aed] font-bold' : 'text-gray-700'}`}
                        onClick={e => { e.stopPropagation(); setConsultTime(opt); setShowConsultTimeDropdown(false); }}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* 상담 안내 박스 */}
          <div className="bg-[#f8f8ff] rounded p-2 text-xs text-gray-600 text-center mb-1">
            📢 상담 중 궁금한 점은 언제든 말씀해 주세요.
          </div>
          {/* 휴대폰 인증 안내 */}
          {!consultIsVerified && (
            <div className="bg-gray-50 rounded-lg p-1.5 sm:p-2 mt-0">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">휴대폰 인증</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">상담신청을 위해 휴대폰 인증이 필요합니다.</p>
              <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2 mb-2 sm:mb-2.5 items-stretch sm:items-center">
                <input
                  type="text"
                  value={phone}
                  readOnly
                  className="flex-1 px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md text-sm sm:text-base bg-gray-100"
                />
                <button
                  type="button"
                  onClick={handleConsultSendOTP}
                  className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 bg-[#f97316] text-white rounded-md text-sm sm:text-base font-medium 
                           hover:bg-[#ea580c] transition-colors min-w-[100px] sm:min-w-[120px]"
                >
                  {consultOtpResendAvailable ? '인증번호 전송' : '재발송'}
                </button>
                {!consultOtpResendAvailable && (
                  <div className="min-w-[60px] flex items-center justify-center text-[#3a8094] font-medium text-sm">
                    {formatTime(consultOtpTimer)}
                  </div>
                )}
              </div>
              <div className="flex gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  ref={consultOtpInputRef}
                  value={consultOtpCode}
                  onChange={e => setConsultOtpCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                  onFocus={(e) => {
                    if (window.innerWidth < 768) {
                      setTimeout(() => {
                        e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }, 300);
                    }
                  }}
                  maxLength={6}
                  className="flex-1 px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md text-sm sm:text-base focus:ring-[#3a8094] focus:border-[#3a8094]"
                  placeholder="6자리 인증번호 입력"
                />
              </div>
              <button
                type="button"
                onClick={handleConsultVerifyOTP}
                disabled={verifying || consultOtpCode.length !== 6}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-md text-base sm:text-lg font-semibold transition-colors mt-1 sm:mt-2 ${(verifying || consultOtpCode.length !== 6) ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-[#3a8094] text-white hover:bg-[#2c6070]'}`}
              >
                {verifying ? '인증 처리중...' : '인증하고 상담신청'}
              </button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
