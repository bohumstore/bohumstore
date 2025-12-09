import React, { useState, useEffect, useRef } from 'react'
import { CalculatorIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import Modal from '@/app/components/Modal';
import request from '@/app/api/request';
import { getProductConfigByPath, getTemplateIdByPath, INSURANCE_COMPANIES, INSURANCE_PRODUCTS } from '@/app/constants/insurance';
import FireworksEffect from './FireworksEffect';
import { trackPremiumCheck } from '@/app/utils/visitorTracking';

// 현재 경로에 맞는 상품 정보 가져오기
const currentPath = '/insurance/whole-life/hana/hanaro';
const productConfig = getProductConfigByPath(currentPath);

const INSURANCE_COMPANY_ID = INSURANCE_COMPANIES.HANA_LIFE; // 하나생명
const INSURANCE_PRODUCT_ID = INSURANCE_PRODUCTS.HANA_HANARO; // 하나 하나로 THE 연결된 종신보험

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
  const [consultType, setConsultType] = useState('종신보험');
  const [consultTime, setConsultTime] = useState('아무때나');
  const consultTypeOptions = ['종신보험'];
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
        companyName: productConfig?.config.companyName || "하나생명",
        productName: productConfig?.config.name || "하나로THE연결된종신보험"
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
    setTimeout(() => otpInputRef.current?.focus(), 0);
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
    if (!isChecked) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }
    if (!gender || !name || !birth || !phone) {
      alert('성별, 이름, 생년월일, 연락처를 모두 입력해 주세요.');
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
    await handlePostOTP()
  };

  const handleConsultVerifyOTP = async () => {
    if (verifying) return;
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
        tenYearReturnRate = rate ? (rate * 100).toFixed(2) : '-';
        interestValue = total ? (total * interestRate).toLocaleString('ko-KR') : '-';
        refundValue = total ? (total * rate).toLocaleString('ko-KR') : '-';
      }
      
      const res = await request.post("/api/verifyOTP", {
        phone,
        name,
        birth,
        gender,
        code: consultOtpCode,
        counselType: 2,
        companyId: INSURANCE_COMPANY_ID,
        productId: INSURANCE_PRODUCT_ID,
        consultType,
        counselTime: consultTime,
        mounthlyPremium: paymentAmount || '',
        paymentPeriod: paymentPeriod || '',
        tenYearReturnRate,
        interestValue,
        refundValue,
        templateId: "UB_8715"
      });
      if (res.data.success) {
        alert("인증이 완료되었습니다!");
        setConsultIsVerified(true);
        // 중복 발송 방지를 위해 추가 onlyClient 후속 발송 제거
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
        className="w-full bg-gradient-to-b from-emerald-50 to-teal-50 py-4 md:py-8 lg:py-3"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-col lg:flex-row items-center md:items-center lg:items-start justify-center lg:justify-between gap-3 md:gap-6 lg:gap-12 px-3 md:px-6 lg:px-4 md:py-4 lg:py-4">
          {/* 왼쪽: 상품 설명/이미지 */}
          <div className="flex-1 flex flex-col items-center md:items-center lg:items-start text-center md:text-center lg:text-left">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1.5">
              <img src="/hana-logo.png" alt="하나생명 로고" className="h-6 sm:h-8 w-auto" style={{minWidth:'24px'}} />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 sm:mb-1.5 md:mb-2.5 lg:mb-2 leading-tight">(무)하나로 THE 연결된<br />종신보험<span className="text-lg sm:text-xl md:text-3xl lg:text-4xl">(해약환급금 일부지급형)</span></h1>
            
            <p className="text-xs text-gray-500 mb-3 sm:mb-4 md:mb-5 lg:mb-5 text-center">
              * 이 상품은 사망을 보장하는 종신보험으로, 저축성보험(연금)이 아닙니다.
            </p>

            <ul className="mb-3 sm:mb-5 md:mb-8 lg:mb-8 space-y-1 sm:space-y-1.5 md:space-y-2.5 lg:space-y-2">
              <li className="flex items-center text-sm sm:text-base md:text-lg lg:text-lg text-gray-800 justify-center md:justify-center lg:justify-start">
                <span className="text-sm sm:text-base md:text-lg lg:text-xl mr-1 sm:mr-1.5 md:mr-2.5 lg:mr-2 text-[#22c55e] flex-shrink-0">✔</span>
                <span>병력 걱정 없이 <span className="text-emerald-600 font-semibold">간편심사형</span>으로도 가입 가능</span>
              </li>
              <li className="flex items-center text-sm sm:text-base md:text-lg lg:text-lg text-gray-800 justify-center md:justify-center lg:justify-start">
                <span className="text-sm sm:text-base md:text-lg lg:text-xl mr-1 sm:mr-1.5 md:mr-2.5 lg:mr-2 text-[#22c55e] flex-shrink-0">✔</span>
                <span className="leading-tight">3대질병 진단시 <span className="text-rose-600 font-semibold">보험료 환급·납입면제</span> 선택 <span className="text-[10px] sm:text-xs text-gray-500">(특약가입시)</span></span>
              </li>
              <li className="flex items-center text-sm sm:text-base md:text-lg lg:text-lg text-gray-800 justify-center md:justify-center lg:justify-start">
                <span className="text-sm sm:text-base md:text-lg lg:text-xl mr-1 sm:mr-1.5 md:mr-2.5 lg:mr-2 text-[#22c55e] flex-shrink-0">✔</span>
                <span className="leading-tight">10년 시점 환급금 <span className="text-orange-600 font-semibold">122.78%</span> <span className="text-[10px] sm:text-xs text-gray-500">(5년납,1형 기준)</span></span>
              </li>
              <li className="flex items-center text-sm sm:text-base md:text-lg lg:text-lg text-gray-800 justify-center md:justify-center lg:justify-start">
                <span className="text-sm sm:text-base md:text-lg lg:text-xl mr-1 sm:mr-1.5 md:mr-2.5 lg:mr-2 text-[#22c55e] flex-shrink-0">✔</span>
                <span><span className="text-teal-600 font-semibold">유지보너스</span> 제공 <span className="text-[10px] sm:text-xs text-gray-500">(약관 기준)</span></span>
              </li>
              <li className="flex items-center text-sm sm:text-base md:text-lg lg:text-lg text-gray-800 justify-center md:justify-center lg:justify-start">
                <span className="text-sm sm:text-base md:text-lg lg:text-xl mr-1 sm:mr-1.5 md:mr-2.5 lg:mr-2 text-[#22c55e] flex-shrink-0">✔</span>
                <span><span className="text-blue-600 font-semibold">일반심사형</span> / <span className="text-indigo-600 font-semibold">간편심사형</span> 선택 가능</span>
              </li>
              <li className="flex items-center text-sm sm:text-base md:text-lg lg:text-lg text-gray-800 justify-center md:justify-center lg:justify-start">
                <span className="text-sm sm:text-base md:text-lg lg:text-xl mr-1 sm:mr-1.5 md:mr-2.5 lg:mr-2 text-[#22c55e] flex-shrink-0">✔</span>
                <span>1형(일반심사형): <span className="text-xs sm:text-sm">만</span> <span className="text-blue-600 font-semibold">15~69세</span></span>
              </li>
              <li className="flex items-center text-sm sm:text-base md:text-lg lg:text-lg text-gray-800 justify-center md:justify-center lg:justify-start">
                <span className="text-sm sm:text-base md:text-lg lg:text-xl mr-1 sm:mr-1.5 md:mr-2.5 lg:mr-2 text-[#22c55e] flex-shrink-0">✔</span>
                <span>2형(간편심사형): <span className="text-indigo-600 font-semibold">30~65세</span></span>
              </li>
            </ul>
            {/* 환급률 안내 UI */}
            <div className="w-full max-w-2xl lg:max-w-3xl mx-auto bg-white rounded-xl shadow-lg mb-3 sm:mb-4 p-2.5 sm:p-3 md:p-5 lg:p-4 px-2.5 sm:px-3 md:px-5 lg:px-4 pt-3 sm:pt-4 md:pt-6 lg:pt-6 pb-3 sm:pb-4 md:pb-6 lg:pb-6">
                <div className="grid grid-cols-3 gap-1.5 sm:gap-3 md:gap-2 mb-1.5 sm:mb-2">
                  {/* 1. 7년 시점 */}
                  <div className="text-center px-0.5 sm:px-1">
                    <div className="inline-block bg-gradient-to-b from-[#10b981] via-[#059669] to-[#047857] text-white text-xs sm:text-sm md:text-base font-bold px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-lg mb-2 sm:mb-2.5 transform translate-y-0 hover:translate-y-[-2px] transition-transform whitespace-nowrap" style={{
                      boxShadow: '0 6px 12px rgba(4, 120, 87, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.1)'
                    }}>7년 시점</div>
                    <div className="flex flex-col items-center">
                      <div className="font-bold text-xs sm:text-sm mb-0.5 sm:mb-1">환급률</div>
                      <div className="text-base sm:text-lg md:text-xl font-extrabold text-[#10b981]">100%</div>
                      <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">유지보너스1</div>
                    </div>
                  </div>

                  {/* 2. 10년 시점 */}
                  <div className="text-center px-0.5 sm:px-1">
                    <div className="inline-block bg-gradient-to-b from-[#f59e0b] via-[#d97706] to-[#b45309] text-white text-xs sm:text-sm md:text-base font-bold px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-lg mb-2 sm:mb-2.5 transform translate-y-0 hover:translate-y-[-2px] transition-transform whitespace-nowrap" style={{
                      boxShadow: '0 6px 12px rgba(180, 83, 9, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.1)'
                    }}>10년 시점</div>
                    <div className="flex flex-col items-center">
                      <div className="font-bold text-xs sm:text-sm mb-0.5 sm:mb-1">환급률</div>
                      <div className="text-base sm:text-lg md:text-xl font-extrabold text-[#f59e0b] animate-[jump-glow_1.2s_ease-in-out_infinite]">122.78%</div>
                      <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">유지보너스2</div>
                    </div>
                  </div>

                  {/* 3. 15년 시점 */}
                  <div className="text-center px-0.5 sm:px-1">
                    <div className="inline-block bg-gradient-to-b from-[#14b8a6] via-[#0d9488] to-[#0f766e] text-white text-xs sm:text-sm md:text-base font-bold px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-lg mb-2 sm:mb-2.5 transform translate-y-0 hover:translate-y-[-2px] transition-transform whitespace-nowrap" style={{
                      boxShadow: '0 6px 12px rgba(15, 118, 110, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.1)'
                    }}>15년 시점</div>
                    <div className="flex flex-col items-center">
                      <div className="font-bold text-xs sm:text-sm mb-0.5 sm:mb-1">환급률</div>
                      <div className="text-base sm:text-lg md:text-xl font-extrabold text-[#14b8a6]">132.12%</div>
                      <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">유지보너스3</div>
                    </div>
                  </div>
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500 text-center mt-1.5 sm:mt-3">
                  <p>* 40세 남자, 1형(일반심사형), 5년납 기준</p>
                </div>
            </div>
          </div>
          {/* 오른쪽: 환급금 확인 카드 */}
          <div className="flex-1 flex justify-center lg:justify-end w-full lg:ml-8 lg:self-center">
            <div id="calculator-box" className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-2xl p-5 sm:p-6 md:p-7 relative flex flex-col">
              <div className="mb-5 sm:mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#14b8a6] to-[#0d9488] rounded-lg flex items-center justify-center">
                    <CalculatorIcon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">해약환급금 계산하기</h3>
                </div>
                <p className="text-gray-500 text-xs sm:text-sm ml-10">간단한 정보 입력으로 예상 환급금을 확인하세요</p>
              </div>
              <form className="flex flex-col gap-3 sm:gap-4" onSubmit={handleInsuranceCostCalculate}>
                {/* 가입 정보 입력 */}
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 cursor-pointer">성별</label>
                      <div className="flex gap-3 sm:gap-6">
                        <label className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer">
                    <input 
                      type="radio" 
                      name="gender" 
                            value="M"
                            checked={gender === "M"}
                            onChange={handleGenderChange}
                            className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 cursor-pointer flex-shrink-0"
                          />
                          <span className="text-base sm:text-lg whitespace-nowrap">남자</span>
                  </label>
                        <label className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer">
                    <input 
                      type="radio" 
                      name="gender" 
                            value="F"
                            checked={gender === "F"}
                            onChange={handleGenderChange}
                            className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 cursor-pointer flex-shrink-0"
                          />
                          <span className="text-base sm:text-lg whitespace-nowrap">여자</span>
                  </label>
                </div>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 cursor-pointer">이름</label>
                  <input 
                    type="text" 
                    inputMode="text"
                    ref={nameInputRef}
                    value={name}
                        onChange={handleNameChange}
                        onFocus={handleInputFocus}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); birthInputRef.current?.focus(); } }}
                        onBlur={() => { if (name.trim()) { birthInputRef.current?.focus(); } }}
                        className="w-full px-2 sm:px-2.5 py-1.5 sm:py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="홍길동"
                  />
                </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 cursor-pointer">생년월일</label>
                  <input 
                    type="text" 
                    inputMode="numeric"
                    pattern="[0-9]*"
                    ref={birthInputRef}
                    value={birth}
                        onChange={handleBirthChange}
                        onFocus={handleInputFocus}
                        className="w-full px-2 sm:px-2.5 py-1.5 sm:py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="19880818"
                        maxLength={8}
                  />
                </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1 cursor-pointer">연락처</label>
                  <input 
                    type="text" 
                    inputMode="numeric"
                    pattern="[0-9]*"
                    ref={phoneInputRef}
                    value={phone}
                    onChange={handlePhoneChange}
                    onFocus={handleInputFocus}
                        className="w-full px-2 sm:px-2.5 py-1.5 sm:py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="01012345678"
                      />
                    </div>
                  </div>
                </div>

                {/* 납입 정보 선택 */}
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1.5 cursor-pointer">납입기간</label>
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                      {['5년납', '7년납', '10년납'].map((period) => (
                        <label key={period} className="relative flex items-center justify-center cursor-pointer">
                          {/* 추천 배지 */}
                          {period === '5년납' && (
                            <span className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 bg-[#ff8c1a] text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full animate-bounce shadow z-10">
                              추천
                            </span>
                          )}
                          <input
                            type="radio"
                            name="paymentPeriod"
                            value={period}
                            checked={paymentPeriod === period}
                            onChange={handlePaymentPeriodChange}
                            className="peer sr-only cursor-pointer"
                          />
                          <div className="w-full text-center px-1.5 sm:px-2 py-2 text-xs sm:text-sm border-2 rounded-lg cursor-pointer
                                      transition-all duration-200 ease-in-out
                                      peer-checked:border-[#3a8094] peer-checked:bg-[#f0f9ff] peer-checked:text-[#3a8094] peer-checked:font-bold
                                      peer-checked:shadow-[0_0_10px_rgba(58,128,148,0.1)]
                                      hover:border-[#3a8094] hover:bg-gray-50
                                      border-gray-200">
                            {period}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1.5 cursor-pointer">월 납입금액</label>
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                      {['30만원', '50만원', '100만원'].map((amount) => (
                        <label key={amount} className="relative flex items-center justify-center cursor-pointer">
                          <input
                            type="radio"
                            name="paymentAmount"
                            value={amount}
                            checked={paymentAmount === amount}
                            onChange={handlePaymentAmountChange}
                            className="peer sr-only cursor-pointer"
                          />
                          <div className="w-full text-center px-1.5 sm:px-2 py-2 text-xs sm:text-sm border-2 rounded-lg cursor-pointer
                                      transition-all duration-200 ease-in-out
                                      peer-checked:border-[#3a8094] peer-checked:bg-[#f0f9ff] peer-checked:text-[#3a8094] peer-checked:font-bold
                                      peer-checked:shadow-[0_0_10px_rgba(58,128,148,0.1)]
                                      hover:border-[#3a8094] hover:bg-gray-50
                                      border-gray-200">
                            {amount}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 개인정보 동의 */}
                <div className="flex items-start gap-2 mb-4 sm:mb-6 justify-end">
                  <input 
                    type="checkbox" 
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="mt-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600 rounded border-gray-300 cursor-pointer"
                  />
                  <div className="text-xs text-gray-600">
                    <span>개인정보 수집 및 이용에 동의합니다. </span>
                    <button
                      type="button"
                      onClick={onOpenPrivacy}
                      className="text-blue-600 underline hover:text-blue-800 cursor-pointer"
                    >
                      자세히 보기
                    </button>
                  </div>
                </div>

                {/* 기존 버튼들 */}
                <div className="flex flex-col gap-2">
                  <button type="submit" className="w-full bg-gradient-to-r from-[#14b8a6] to-[#0d9488] text-white font-bold rounded-xl py-3.5 text-base hover:opacity-95 transition flex items-center justify-center gap-2 shadow-lg shadow-[#14b8a6]/25 cursor-pointer">
                    <CalculatorIcon className="w-5 h-5" />
                    해약환급금 확인하기
                  </button>
                  <div className="flex flex-row gap-2">
                  <button 
                    type="button" 
                    onClick={handleOpenConsultModal}
                    className="flex-1 bg-[#fa5a5a] text-white font-bold rounded-xl py-3 sm:py-4 text-base sm:text-lg flex items-center justify-center gap-1 sm:gap-2 hover:opacity-90 transition cursor-pointer min-w-0"
                  >
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M2.25 12a9.75 9.75 0 1 1 19.5 0v3.375a2.625 2.625 0 0 1-2.625 2.625h-1.125a.375.375 0 0 1-.375-.375V15a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 0 .75-.75V12a8.25 8.25 0 1 0-16.5 0v1.5a.75.75 0 0 0 .75.75h.75A.75.75 0 0 1 6 15v2.625a.375.375 0 0 1-.375.375H4.5A2.625 2.625 0 0 1 1.875 15.375V12Z' />
                      </svg>
                    <span className="whitespace-nowrap text-sm sm:text-base">상담신청</span>
                  </button>
                    <a 
                      href="https://pf.kakao.com/_lrubxb/chat" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#fee500] text-[#3d1e1e] font-bold rounded-xl py-3 sm:py-4 text-base sm:text-lg flex items-center justify-center gap-1 sm:gap-2 hover:opacity-90 transition cursor-pointer min-w-0"
                    >
                    <ChatBubbleLeftRightIcon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                    <span className="whitespace-nowrap text-sm sm:text-base">채팅상담</span>
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
                    disabled={verifying || !otpSent}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-md text-base sm:text-lg font-semibold transition-colors mt-1 sm:mt-2 ${(verifying || !otpSent) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#3a8094] text-white hover:bg-[#2c6070]'}`}
                  >
                    {verifying ? '인증 처리중...' : (otpSent ? '인증하고 결과 확인하기' : '인증번호를 먼저 전송하세요')}
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-[#fa5a5a]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.25a1 1 0 01-1 1A17.93 17.93 0 013 5a1 1 0 011-1h3.25a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z"/>
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
            <div className="grid grid-cols-1 gap-1.5">
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
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
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
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
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
                  value={consultOtpCode}
                  onChange={e => setConsultOtpCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                  maxLength={6}
                  className="flex-1 px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md text-sm sm:text-base focus:ring-[#3a8094] focus:border-[#3a8094]"
                  placeholder="6자리 인증번호 입력"
                />
              </div>
              <button
                type="button"
                onClick={handleConsultVerifyOTP}
                disabled={verifying}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-md text-base sm:text-lg font-semibold transition-colors mt-1 sm:mt-2 ${verifying ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#3a8094] text-white hover:bg-[#2c6070]'}`}
              >
                {verifying ? '인증 처리중...' : '인증 및 상담신청'}
              </button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
