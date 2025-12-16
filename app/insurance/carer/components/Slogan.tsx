import React, { useState, useEffect, useRef } from 'react'
import { CalculatorIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import Modal from '@/app/components/Modal';
import request from '@/app/api/request';
import { getProductConfigByPath, getTemplateIdByPath, INSURANCE_COMPANIES, INSURANCE_PRODUCTS } from '@/app/constants/insurance';
import FireworksEffect from './FireworksEffect';
import { trackPremiumCheck } from "@/app/utils/visitorTracking";

// 간병인보험 전용 설정
const currentPath = '/insurance/carer';
const productConfig = null; // 간병인보험은 별도 설정

const INSURANCE_COMPANY_ID = 'CARER_INSURANCE'; // 간병인보험
const INSURANCE_PRODUCT_ID = 'CARER_INSURANCE_PRODUCT'; // 간병인보험 상품

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
  const [consultType, setConsultType] = useState('간병인보험');
  const [consultTime, setConsultTime] = useState('아무때나');
  const consultTypeOptions = ['간병인보험'];
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
    const templateId = 'UA_7754'; // 임시로 기존 작동하는 템플릿 사용
    console.log(`[CLIENT] 인증번호 전송 시작: ${new Date().toISOString()}`);
    try {
      const response = await request.post('/api/postOTP', { 
        phone, 
        templateId,
        companyName: "간병인보험",
        productName: "간병인보험 상담"
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

  const handleConsultationRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setCounselType(1);
    setShowConsultModal(true);
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
      mounthlyPremium: paymentAmount, // 실제 선택값
      paymentPeriod: paymentPeriod,   // 실제 선택값
      tenYearReturnRate: rate ? (rate * 100).toFixed(2) : '-', // 환급률 (소수점 둘째 자리까지)
      interestValue, // 확정이자(실제 값)
      refundValue,   // 예상해약환급금(실제 값)
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
      alert("인증이 완료되었습니다!");
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

  // 생년월일 유효성 검사
  const validateBirth = (birthValue: string): boolean => {
    if (birthValue.length !== 8) return false;
    const year = parseInt(birthValue.substring(0, 4));
    const month = parseInt(birthValue.substring(4, 6));
    const day = parseInt(birthValue.substring(6, 8));
    if (year < 1900 || year > new Date().getFullYear()) return false;
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    return true;
  };

  // 연락처 유효성 검사
  const validatePhone = (phoneValue: string): boolean => {
    if (!phoneValue.startsWith('010')) return false;
    if (phoneValue.length < 10 || phoneValue.length > 11) return false;
    return true;
  };

  const handleOpenConsultModal = () => {
    if (!isChecked) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }
    if (!gender || !name || !birth || !phone) {
      alert('성별, 이름, 생년월일, 연락처를 모두 입력해 주세요.');
      return;
    }
    if (!validateBirth(birth)) {
      alert('생년월일을 올바르게 입력해 주세요. (예: 19880818)');
      birthInputRef.current?.focus();
      return;
    }
    if (!validatePhone(phone)) {
      alert('연락처를 올바르게 입력해 주세요. (예: 01012345678)');
      phoneInputRef.current?.focus();
      return;
    }
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
    if (verifying) return;
    if (consultOtpCode.length !== 6) {
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
        code: consultOtpCode,
        counselType: 2,
        companyId: null,
        productId: null,
        consultType,
        counselTime: consultTime,
        mounthlyPremium: '',
        paymentPeriod: '',
        tenYearReturnRate: '-',
        interestValue: '-',
        refundValue: '-',
        templateId: "UB_8715"
      });
      if (res.data.success) {
        alert("상담 신청이 완료되었습니다!");
        setConsultIsVerified(true);
      } else {
        alert("인증에 실패했습니다.");
        return;
      }
    } catch (e: any) {
      console.error("OTP 인증 오류:", e);
      alert(e.response?.data?.error || e.message || "인증에 실패했습니다.");
    } finally {
      setVerifying(false);
    }
  };

  // 보험연령 계산 함수
  const getInsuranceAge = (birth: string) => {
    if (!/^\d{8}$/.test(birth)) return '';
    const birthYear = parseInt(birth.substring(0, 4));
    const birthMonth = parseInt(birth.substring(4, 6));
    const birthDay = parseInt(birth.substring(6, 8));
    const today = new Date();
    let age = today.getFullYear() - birthYear;
    if (
      today.getMonth() + 1 < birthMonth ||
      (today.getMonth() + 1 === birthMonth && today.getDate() < birthDay)
    ) {
      age -= 1;
    }
    return age;
  };

  // 보험연령 계산
  const insuranceAge = getInsuranceAge(birth);
  // 연령 적합성 (납입기간별 연령 제한)
  const isAgeKnown = insuranceAge !== '';
  const numericInsuranceAge = isAgeKnown ? Number(insuranceAge) : NaN;
  
  // 납입기간별 가입 가능 연령 범위 (가장 넓은 범위 기준)
  const getAgeRange = (period: string) => {
    if (period.includes('5')) return { min: 15, max: 64 };
    if (period.includes('7')) return { min: 15, max: 66 };
    if (period.includes('10')) return { min: 15, max: 69 };
    return { min: 15, max: 70 }; // 기본값
  };
  
  const ageRange = getAgeRange(paymentPeriod);
  const isAgeEligible = isAgeKnown && numericInsuranceAge >= ageRange.min && numericInsuranceAge <= ageRange.max;
  
  // 가능한 납입기간 찾기
  const getAvailablePaymentPeriods = (age: number) => {
    const available = [];
    if (age >= 15 && age <= 64) available.push('5년납');
    if (age >= 15 && age <= 66) available.push('7년납');
    if (age >= 15 && age <= 69) available.push('10년납');
    return available;
  };
  
  const availablePaymentPeriods = isAgeKnown ? getAvailablePaymentPeriods(numericInsuranceAge) : [];

  // 총 납입액, 환급률, 확정이자, 해약환급금 계산
  let amount = 0;
  if (paymentAmount.includes('만원')) {
    const num = parseInt(paymentAmount.replace(/[^0-9]/g, ''));
    amount = num * 10000;
  } else {
    amount = parseInt(paymentAmount.replace(/[^0-9]/g, ''));
  }
  const months = parseInt(paymentPeriod.replace(/[^0-9]/g, '')) * 12;
  const total = (!isNaN(amount) && !isNaN(months) && amount > 0 && months > 0) ? amount * months : 0;
  
  // 환급률 계산 (10년 시점 기준)
  let rate = 1.2278, interestRate = 0.2278; // 기본값: 5년납
  if (paymentPeriod.includes('5')) { 
    rate = 1.2278; // 122.78%
    interestRate = 0.2278; // 22.78%
  }
  else if (paymentPeriod.includes('7')) { 
    rate = 1.1958; // 119.58%
    interestRate = 0.1958; // 19.58%
  }
  else if (paymentPeriod.includes('10')) { 
    rate = 1.1499; // 114.99%
    interestRate = 0.1499; // 14.99%
  }
  
  const interestValue = total ? (total * interestRate).toLocaleString('en-US') : '-';
  const refundValue = total ? (total * rate).toLocaleString('en-US') : '-';

  return (
    <>
      <section
        id="slogan-section"
        className="w-full bg-gradient-to-b from-slate-50 to-white py-6 md:py-10 lg:py-8"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-col lg:flex-row items-center md:items-center lg:items-start justify-center lg:justify-between gap-4 md:gap-6 lg:gap-16 px-4 md:px-8 lg:px-8 md:py-4 lg:py-6">
          {/* 왼쪽: 상품 설명/이미지 */}
          <div className="flex-1 flex flex-col items-center md:items-center lg:items-start text-center md:text-center lg:text-left lg:max-w-xl">
            <p className="text-gray-500 text-sm sm:text-base lg:text-lg mb-2 lg:mb-3">노후에 가장 무서운 건</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-5xl font-bold text-gray-900 mb-3 lg:mb-4 leading-tight lg:whitespace-nowrap">
              병원비가 아니라 <span className="text-blue-600">간병비</span>입니다
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-gray-500 mb-4 md:mb-6">실손보험으로는 해결되지 않는 간병비, 미리 준비하세요</p>
            

            <ul className="mb-5 sm:mb-6 lg:mb-8 space-y-2.5 sm:space-y-3 lg:space-y-4">
              <li className="flex items-center text-sm sm:text-base lg:text-lg text-gray-700 justify-center lg:justify-start">
                <span className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs lg:text-sm mr-2.5 lg:mr-3 flex-shrink-0">✓</span>
                <span>하루 <span className="font-semibold text-gray-900">최대 20만원</span> 간병인 사용료 지급</span>
              </li>
              <li className="flex items-center text-sm sm:text-base lg:text-lg text-gray-700 justify-center lg:justify-start">
                <span className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs lg:text-sm mr-2.5 lg:mr-3 flex-shrink-0">✓</span>
                <span>월 <span className="font-semibold text-gray-900">2~5만원</span>으로 간병비 걱정 해결</span>
              </li>
              <li className="flex items-center text-sm sm:text-base lg:text-lg text-gray-700 justify-center lg:justify-start">
                <span className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs lg:text-sm mr-2.5 lg:mr-3 flex-shrink-0">✓</span>
                <span><span className="font-semibold text-gray-900">가족간병</span>시에도 보험금 지급</span>
              </li>
            </ul>
            
            {/* 간병비 현실 카드 */}
            <div className="w-full max-w-lg lg:max-w-xl mx-auto lg:mx-0 bg-slate-50 rounded-2xl p-5 sm:p-6 lg:p-7 mb-4">
                <p className="text-center lg:text-left text-sm lg:text-base text-gray-500 mb-4 lg:mb-5">간병인 비용, 얼마나 드는지 아시나요?</p>
                
                {/* 핵심 금액 */}
                <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8 mb-4 lg:mb-5">
                  <div className="text-center lg:text-left">
                    <div className="text-xs lg:text-sm text-gray-400 mb-1">하루 평균</div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">12만원</div>
                  </div>
                  <div className="text-gray-300 text-xl lg:text-2xl">→</div>
                  <div className="text-center lg:text-left">
                    <div className="text-xs lg:text-sm text-gray-400 mb-1">한 달이면</div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 animate-pulse">360만원</div>
                  </div>
                </div>

                <div className="text-center lg:text-left">
                  <span className="inline-block bg-blue-600 text-white text-xs sm:text-sm lg:text-base font-medium px-4 lg:px-5 py-2 lg:py-2.5 rounded-full">
                    간병인보험으로 하루 최대 20만원 보장
                  </span>
                </div>
            </div>
            
            {/* 안내 문구 */}
            <p className="text-xs lg:text-sm text-gray-400 text-center lg:text-left">※ 보장내용은 보험사 및 상품에 따라 다를 수 있습니다</p>
          </div>
          {/* 오른쪽: 환급금 확인 카드 */}
          <div className="flex-1 flex justify-center lg:justify-end w-full lg:ml-8 lg:self-center">
            <div id="consultation-box" className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 p-5 sm:p-6 md:p-7 relative flex flex-col">
              <div className="mb-5 sm:mb-6">
                <div className="flex items-center gap-2.5 mb-1">
                  <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">무료 상담신청</h3>
                </div>
                <p className="text-gray-500 text-xs sm:text-sm ml-[46px]">간병인보험, 전문가가 쉽고 명쾌하게 알려드립니다</p>
              </div>
              
              {/* 간병인보험 보장 내용 박스 */}
              <div className="bg-slate-50 rounded-xl p-3 mb-4">
                <div className="text-xs font-semibold text-gray-700 mb-2">일일 보장금액</div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">간병인사용일당<span className="text-gray-400">(요양병원제외)</span></span>
                    <span className="font-semibold text-gray-900">15~20만원</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">요양병원</span>
                    <span className="font-semibold text-gray-900">5~6만원</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">간호간병통합서비스병실</span>
                    <span className="font-semibold text-gray-900">7만원</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">가족간병</span>
                    <span className="font-semibold text-blue-600">보장</span>
                  </div>
                </div>
                <div className="text-[10px] text-gray-400 mt-2">※ 보장내용은 보험사 및 상품에 따라 다를 수 있습니다</div>
              </div>

              <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleConsultationRequest}>
                {/* 성별/이름 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">성별 <span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                      <label className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border-2 cursor-pointer transition-all ${gender === "M" ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" name="gender" value="M" checked={gender === "M"} onChange={handleGenderChange} className="sr-only" />
                        <span className="text-sm font-medium">남자</span>
                      </label>
                      <label className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border-2 cursor-pointer transition-all ${gender === "F" ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" name="gender" value="F" checked={gender === "F"} onChange={handleGenderChange} className="sr-only" />
                        <span className="text-sm font-medium">여자</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">이름 <span className="text-red-500">*</span></label>
                    <input type="text" inputMode="text" ref={nameInputRef} value={name} onChange={handleNameChange} onFocus={handleInputFocus} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); birthInputRef.current?.focus(); } }} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="홍길동" />
                  </div>
                </div>

                {/* 생년월일/연락처 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">생년월일 <span className="text-red-500">*</span></label>
                    <input type="text" inputMode="numeric" pattern="[0-9]*" ref={birthInputRef} value={birth} onChange={handleBirthChange} onFocus={handleInputFocus} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="19880818" maxLength={8} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">연락처 <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      inputMode="numeric" 
                      pattern="[0-9]*" 
                      ref={phoneInputRef} 
                      value={phone} 
                      onChange={handlePhoneChange} 
                      onFocus={handleInputFocus} 
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
                      placeholder="01012345678" 
                    />
                  </div>
                </div>


                {/* 상담종류/상담시간대 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">상담종류</label>
                    <div className="w-full px-3 py-2.5 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700 font-semibold flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      간병인보험
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">상담시간대 <span className="text-red-500">*</span></label>
                    <select 
                      value={consultTime} 
                      onChange={(e) => setConsultTime(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    >
                      {consultTimeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 개인정보 동의 */}
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} className="w-4 h-4 text-blue-600 rounded border-gray-300 cursor-pointer focus:ring-blue-500" />
                  <span className="text-xs text-gray-600">
                    개인정보 수집 및 이용에 동의합니다. 
                    <button type="button" onClick={onOpenPrivacy} className="text-blue-600 underline ml-1 hover:text-blue-800">자세히 보기</button>
                  </span>
                </div>

                {/* 버튼들 */}
                <div className="flex gap-2 mt-1">
                  <button type="button" onClick={handleOpenConsultModal} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-3.5 text-base transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 cursor-pointer">
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M2.25 12a9.75 9.75 0 1 1 19.5 0v3.375a2.625 2.625 0 0 1-2.625 2.625h-1.125a.375.375 0 0 1-.375-.375V15a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 0 .75-.75V12a8.25 8.25 0 1 0-16.5 0v1.5a.75.75 0 0 0 .75.75h.75A.75.75 0 0 1 6 15v2.625a.375.375 0 0 1-.375.375H4.5A2.625 2.625 0 0 1 1.875 15.375V12Z' />
                    </svg>
                    상담신청
                  </button>
                  <a href="https://pf.kakao.com/_lrubxb/chat" target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#fee500] text-[#3d1e1e] font-bold rounded-xl py-3.5 text-base flex items-center justify-center gap-2 hover:opacity-95 transition cursor-pointer shadow-lg shadow-yellow-400/25">
                    <ChatBubbleLeftRightIcon className="w-5 h-5" />
                    카톡상담
                  </a>
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
              해약환급금 확인하기
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
            <div className="bg-red-50 border border-red-200 rounded p-1.5 sm:p-2 text-xs sm:text-sm">
              <p className="font-bold text-red-700 mb-0.5 sm:mb-1">⚠️ {paymentPeriod} 가입불가 (보험연령 {numericInsuranceAge}세)</p>
              {availablePaymentPeriods.length > 0 ? (
                <p className="text-blue-700">✓ 가입 가능: <span className="font-semibold">{availablePaymentPeriods.join(', ')}</span></p>
              ) : (
                <p className="text-orange-700">※ 상담신청을 통해 문의해주세요.</p>
              )}
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
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2 flex items-center">
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
                    <span className="font-bold text-[#3a8094]">하나생명</span>
                  </div>
                </div>
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>상품명</span>
                    <span className="font-bold text-[#3a8094]">하나로THE연결된종신보험</span>
                  </div>
                </div>
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>납입기간 / 월보험료</span>
                    <span className="font-bold text-[#3a8094]">
                      {paymentPeriod && paymentAmount ? `${paymentPeriod} / ${paymentAmount}` : '-'}
                    </span>
                  </div>
                </div>
                {/* 총 납입액 */}
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>총 납입액</span>
                    <span className="font-bold">
                      <span className="text-[#3a8094]">{total ? total.toLocaleString('en-US') : '-'}</span>
                      <span className="text-[#3a8094]"> 원</span>
                    </span>
                  </div>
                </div>
                {/* 10년 시점 환급률 */}
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>10년 시점 환급률</span>
                    <span className="font-bold">
                      <span className="text-[#7c3aed]">{rate ? (rate * 100).toFixed(2) : '-'}</span>{' '}<span className="text-[#3a8094]">%</span>
                    </span>
                  </div>
                </div>
                {/* 10년 시점 이자 (총납입액과 해약환급금 차액) */}
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>10년 시점 이자</span>
                    <span className="font-bold">
                      <span className="text-[#3b82f6]">{interestValue}</span>{' '}<span className="text-[#3a8094]">원</span>
                    </span>
                  </div>
                </div>
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>10년 시점 예상 해약환급금</span>
                    <span className="font-bold">
                      <span className="text-[#ef4444]">{refundValue}</span>{' '}<span className="text-[#3a8094]">원</span>
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 text-center mt-4">
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
                    <span className="font-bold text-[#3a8094]">하나생명</span>
                  </div>
                </div>
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>상품명</span>
                    <span className="font-bold text-[#3a8094]">하나로THE연결된종신보험</span>
                  </div>
                </div>
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>납입기간 / 월보험료</span>
                    <span className="font-bold text-[#3a8094]">
                      {paymentPeriod && paymentAmount ? `${paymentPeriod} / ${paymentAmount}` : '-'}
                    </span>
                  </div>
                </div>
                {/* 총 납입액 */}
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>총 납입액</span>
                    <span className="font-bold">
                      <span className="text-[#3a8094]">{total ? total.toLocaleString('en-US') : '-'}</span>
                      <span className="text-[#3a8094]"> 원</span>
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
                {/* 10년 시점 이자 (총납입액과 해약환급금 차액) */}
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>10년 시점 이자</span>
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
                <div className="text-xs text-gray-500 text-center mt-4">
                  * 실제 보험료 및 해약환급금은 가입시점 및 고객 정보에 따라 달라질 수 있습니다.
                  <div className="mt-0.5 text-[#3a8094]">* 휴대폰 인증 완료 후 상세 정보를 확인하실 수 있습니다.</div>
                </div>
              </div>
              {/* 휴대폰 인증 안내 및 인증번호 입력란 */}
              <div className="bg-gray-50 rounded-lg p-2 mt-0">
                <h3 className="text-base font-bold text-gray-900 mb-1">휴대폰 인증</h3>
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
                    className={`${!isAgeEligible ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#f97316] text-white hover:bg-[#ea580c]'} w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 rounded-md text-sm sm:text-base font-medium transition-colors min-w-[100px] sm:min-w-[120px]`}
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
                {isAgeEligible ? (
                  <button
                    type="button"
                    onClick={handleVerifyOTP}
                    disabled={verifying || otpCode.length !== 6}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-md text-base sm:text-lg font-semibold transition-colors mt-1 sm:mt-2 ${(verifying || otpCode.length !== 6) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#e11d48] text-white hover:bg-[#be185d]'}`}
                  >
                    {verifying ? '인증 처리중...' : '인증하고 결과 확인하기'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      handleCloseModal();
                      setTimeout(() => handleOpenConsultModal(), 100);
                    }}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-md text-base sm:text-lg font-semibold transition-colors mt-1 sm:mt-2 bg-[#fa5a5a] text-white hover:bg-[#e14949] flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.25a1 1 0 01-1 1A17.93 17.93 0 013 5a1 1 0 011-1h3.25a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z"/>
                    </svg>
                    상담 신청하기
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </Modal>
      {/* 상담신청 모달 */}
      <Modal
        title={
          <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-blue-600">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            상담 신청하기
          </span>
        }
        open={showConsultModal}
        onClose={handleCloseConsultModal}
      >
        <div className="space-y-2 sm:space-y-2.5">
          {/* 안내문구 */}
          {consultIsVerified ? (
            <>
              <FireworksEffect show={true} />
              <div className="bg-[#f8f8ff] rounded p-2 sm:p-2.5 mb-1 text-center">
                <div className="text-base sm:text-lg text-black font-bold">상담신청이 접수되었습니다.</div>
                <div className="text-sm text-gray-600 mt-1">담당자가 선택하신 상담 시간에 연락드릴 예정입니다.</div>
              </div>
            </>
          ) : (
            <div className="text-sm text-gray-700 bg-[#f8f8ff] rounded p-2 mb-1 text-center font-semibold">
              상담신청을 위해 아래 정보를 입력해 주세요.
            </div>
          )}
          <div className="bg-gray-50 rounded-lg p-1.5 sm:p-2 mb-0.5">
            <h3 className="mb-1.5 sm:mb-2 flex items-center">
              <span className="text-2xl text-blue-600 font-extrabold align-middle">{name}</span>
              <span className="text-lg text-blue-600 font-bold align-middle">&nbsp;님</span>
              {insuranceAge !== '' && (
                <span className="font-bold ml-2 flex items-center">
                  <span className="text-lg text-gray-500">보험연령 </span>
                  <span className="text-2xl font-extrabold text-red-500 mx-1">{insuranceAge}</span>
                  <span className="text-lg text-gray-500">세</span>
                </span>
              )}
            </h3>
            <div className="grid grid-cols-1 gap-1.5">
              <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-blue-600 mr-1'>▸</span>이름</span>
                  <span className="font-bold text-gray-900 text-sm sm:text-base">{name}</span>
                </div>
              </div>
              <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-blue-600 mr-1'>▸</span>연락처</span>
                  <span className="font-bold text-gray-900 text-sm sm:text-base">{phone}</span>
                </div>
              </div>
              <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-blue-600 mr-1'>▸</span>상담 종류</span>
                  {consultIsVerified ? (
                    <span className="font-bold text-gray-900 text-sm sm:text-base">{consultType}</span>
                  ) : (
                    <select
                      value={consultType}
                      onChange={(e) => setConsultType(e.target.value)}
                      className="font-bold text-blue-600 text-sm sm:text-base bg-transparent border-none focus:outline-none cursor-pointer text-right"
                    >
                      {consultTypeOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
              <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-blue-600 mr-1'>▸</span>상담 시간대</span>
                  {consultIsVerified ? (
                    <span className="font-bold text-gray-900 text-sm sm:text-base">{consultTime}</span>
                  ) : (
                    <select
                      value={consultTime}
                      onChange={(e) => setConsultTime(e.target.value)}
                      className="font-bold text-blue-600 text-sm sm:text-base bg-transparent border-none focus:outline-none cursor-pointer text-right"
                    >
                      {consultTimeOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  )}
                </div>
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
                  className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 bg-blue-600 text-white rounded-md text-sm sm:text-base font-medium 
                           hover:bg-blue-700 transition-colors min-w-[100px] sm:min-w-[120px]"
                >
                  {consultOtpResendAvailable ? '인증번호 전송' : '재발송'}
                </button>
                {!consultOtpResendAvailable && (
                  <div className="min-w-[60px] flex items-center justify-center text-blue-600 font-medium text-sm">
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
                  className="flex-1 px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md text-sm sm:text-base focus:ring-blue-500 focus:border-blue-600"
                  placeholder="6자리 인증번호 입력"
                />
              </div>
              <button
                type="button"
                onClick={handleConsultVerifyOTP}
                disabled={verifying || consultOtpCode.length !== 6}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-md text-base sm:text-lg font-semibold transition-colors mt-1 sm:mt-2 ${(verifying || consultOtpCode.length !== 6) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
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
