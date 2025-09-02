import React, { useState, useEffect, useRef } from 'react'
import { CalculatorIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import Modal from '@/app/components/Modal';
import request from '@/app/api/request';
import { getProductConfigByPath, getTemplateIdByPath, INSURANCE_COMPANIES, INSURANCE_PRODUCTS } from '@/app/constants/insurance';
import FireworksEffect from './FireworksEffect';
import { trackPremiumCheck } from "@/app/utils/visitorTracking";

// 현재 경로에 맞는 상품 정보 가져오기
const currentPath = '/insurance/whole-life/shinhan/more-the-dream';
const productConfig = getProductConfigByPath(currentPath);

const INSURANCE_COMPANY_ID = INSURANCE_COMPANIES.SHINHAN_LIFE; // 신한라이프
const INSURANCE_PRODUCT_ID = INSURANCE_PRODUCTS.SHINHAN_MORE_THE_DREAM; // 신한 모아더드림 Plus 종신보험

type SloganProps = {
  onOpenPrivacy: () => void
}

export default function Slogan({ onOpenPrivacy }: SloganProps) {
  const [counselType, setCounselType] = useState(1); // 1: 보험료 확인, 2: 상담신청
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

  const validateForm = () => {
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
        companyName: productConfig?.config.companyName || "신한라이프생명",
        productName: productConfig?.config.name || "모아더드림Plus종신보험"
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
      tenYearReturnRate: rate ? (rate * 100).toFixed(1) : '-', // 환급률 (소수점 첫째 자리까지)
      interestValue, // 확정이자(실제 값)
      refundValue,   // 예상해약환급금(실제 값)
      templateId: "UB_8712"
    });
    if (res.data.success) {
      // 방문자 추적: 보험료 확인
      try {
        await trackPremiumCheck(INSURANCE_PRODUCT_ID, INSURANCE_COMPANY_ID, {
          phone,
          name,
          counsel_type_id: 1, // 보험료 확인
          utm_source: 'direct',
          utm_campaign: 'premium_calculation'
        });
        console.log("[CLIENT] 방문자 추적 성공: 보험료 확인");
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
        tenYearReturnRate = rate ? (rate * 100).toFixed(1) : '-';
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
  // 연령 적합성 (15~70세)
  const isAgeKnown = insuranceAge !== '';
  const numericInsuranceAge = isAgeKnown ? Number(insuranceAge) : NaN;
  const isAgeEligible = isAgeKnown && numericInsuranceAge >= 15 && numericInsuranceAge <= 70;

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
  
  // 환급률 계산 (요구사항에 맞게 수정)
  let rate = 1.227, interestRate = 0.227; // 기본값: 5년납
  if (paymentPeriod.includes('5')) { 
    rate = 1.227; // 122.7%
    interestRate = 0.227; // 22.7%
  }
  else if (paymentPeriod.includes('7')) { 
    rate = 1.195; // 119.5%
    interestRate = 0.195; // 19.5%
  }
  else if (paymentPeriod.includes('10')) { 
    rate = 1.15; // 115%
    interestRate = 0.15; // 15%
  }
  
  const interestValue = total ? (total * interestRate).toLocaleString('en-US') : '-';
  const refundValue = total ? (total * rate).toLocaleString('en-US') : '-';

  return (
    <>
      <section
        className="w-full bg-[#fce7f3] py-6 md:py-10 lg:py-3"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(249, 168, 212, 0.1) 10px, rgba(249, 168, 212, 0.1) 12px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-col lg:flex-row items-center md:items-center lg:items-start justify-center lg:justify-between gap-4 md:gap-8 lg:gap-12 px-4 md:px-6 lg:px-4 md:py-4 lg:py-4">
          {/* 왼쪽: 상품 설명/이미지 */}
          <div className="flex-1 flex flex-col items-center md:items-center lg:items-start text-center md:text-center lg:text-left">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <img src="/shinhan-life-logo.png" alt="신한라이프 로고" className="h-6 w-auto" style={{minWidth:'24px'}} />
              <span>신한라이프생명</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 lg:mb-4 leading-tight">모아더드림Plus종신보험<br />(해약환급금 일부지급형)</h1>
            <ul className="mb-8 md:mb-10 lg:mb-8 space-y-2 md:space-y-3 lg:space-y-2">
              <li className="flex items-center text-lg md:text-xl lg:text-lg text-gray-800 justify-center md:justify-center lg:justify-start">
                <span className="text-xl md:text-2xl lg:text-xl mr-2 md:mr-3 lg:mr-2 text-[#0066cc]">✔</span>
                평생 든든한 종신보장
              </li>
              <li className="flex items-center text-lg md:text-xl lg:text-lg text-gray-800 justify-center md:justify-center lg:justify-start">
                <span className="text-xl md:text-2xl lg:text-xl mr-2 md:mr-3 lg:mr-2 text-[#0066cc]">✔</span>
                10년시점 해약환급금 122.7% <span className="text-[13px] text-gray-500"> (일반심사형 기준)</span>
              </li>
              <li className="flex items-center text-lg md:text-xl lg:text-lg text-gray-800 justify-center md:justify-center lg:justify-start">
                <span className="text-xl md:text-2xl lg:text-xl mr-2 md:mr-3 lg:mr-2 text-[#0066cc]">✔</span>
                설계·심사에 따라 가입금액 선택 가능
              </li>
              <li className="flex items-center text-lg md:text-xl lg:text-lg text-gray-800 justify-center md:justify-center lg:justify-start">
                <span className="text-xl md:text-2xl lg:text-xl mr-2 md:mr-3 lg:mr-2 text-[#0066cc]">✔</span>
                납입완료보너스·장기유지보너스 제공 <span className="text-[13px] text-gray-500"> (약관 기준)</span>
              </li>
              <li className="flex items-center text-lg md:text-xl lg:text-lg text-gray-800 justify-center md:justify-center lg:justify-start">
                <span className="text-xl md:text-2xl lg:text-xl mr-2 md:mr-3 lg:mr-2 text-[#0066cc]">✔</span>
                <span className="flex flex-col leading-tight">
                  <span>일반심사형: 만 15~70세 / 간편심사형: 만 30~69세</span>
                  <span className="text-[13px] text-gray-500"> (단, 성별 및 납입기간별 가입나이 상이)</span>
                </span>
              </li>
            </ul>
            {/* 환급률/보너스 안내 UI */}
            <div className="w-full max-w-full md:max-w-4xl mx-auto bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-2xl shadow-2xl mb-4 md:mb-6 p-6 md:p-8 lg:p-6 pt-12 md:pt-14 lg:pt-12 border border-white/50 backdrop-blur-sm relative overflow-hidden"
              style={{
                backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(147,197,253,0.1) 50%, rgba(196,181,253,0.1) 100%)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
            >
                {/* 상단 중앙 가이드 문구 */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20">
                  <span className="text-xs text-gray-500 font-medium whitespace-nowrap px-2 py-0.5 rounded">
                    [50세 남자 일반심사형, 5년납, 1억원 기준]
                  </span>
                </div>
                {/* 유리반사 효과 */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-60"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 lg:gap-4 relative z-10">
                {/* 1. 7년 시점 */}
                <div className="text-center p-3 md:p-4 lg:p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
                  <div>
                    <div className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-bold px-4 py-2 rounded-full mb-3 shadow-md">7년 시점</div>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-2xl md:text-3xl font-black text-blue-600 drop-shadow-lg">93.2%</div>
                  </div>
                  
                </div>

                {/* 2. 10년 시점 */}
                <div className="text-center p-3 md:p-4 lg:p-3 bg-gradient-to-br from-red-100 to-rose-100 rounded-xl shadow-lg border border-red-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-pulse"></div>
                  <div className="relative z-10">
                    <div className="inline-block bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-bold px-4 py-2 rounded-full mb-2 shadow-md">10년 시점</div>
                    <div className="flex items-center justify-center mb-2">
                      <div className="text-2xl md:text-3xl font-black text-red-600 drop-shadow-lg animate-jump-glow">122.7%</div>
                    </div>
                  </div>
                  
                </div>

                {/* 3. 보너스 */}
                <div className="text-center p-3 md:p-4 lg:p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl shadow-lg border border-emerald-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
                  <div>
                    <div className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-bold px-4 py-2 rounded-full mb-3 shadow-md">보너스</div>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                      <div className="text-sm md:text-base font-bold leading-tight">
                        <span className="text-emerald-700">납입완료보너스</span><br />
                        <span className="text-teal-700">장기유지보너스</span>
                      </div>
                       </div>
                  
                </div>
              </div>
              
          </div>
        </div>
          {/* 오른쪽: 보험료 확인 카드 */}
          <div className="flex-1 flex justify-center lg:justify-end w-full lg:ml-8 lg:self-end">
            <div id="calculator-box" className="w-full max-w-md bg-white rounded-3xl border-2 border-[#3a8094] shadow-xl p-8 md:p-10 lg:p-8 relative flex flex-col">
              {/* 새로운 헤더 디자인 */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#3a8094] flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
                  </svg>
                  보험료 계산하기
                </h3>
                <p className="text-gray-500 text-sm mt-1">간단한 정보 입력으로 예상 보험료를 확인하세요</p>
              </div>
              <form className="flex flex-col gap-4" onSubmit={handleInsuranceCostCalculate}>
                {/* 가입 정보 입력 */}
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1 cursor-pointer">성별</label>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2.5 cursor-pointer">
                    <input 
                      type="radio" 
                      name="gender" 
                            value="M"
                            checked={gender === "M"}
                            onChange={handleGenderChange}
                            className="w-5 h-5 text-blue-600 cursor-pointer"
                          />
                          <span className="text-base">남자</span>
                  </label>
                        <label className="flex items-center gap-2.5 cursor-pointer">
                    <input 
                      type="radio" 
                      name="gender" 
                            value="F"
                            checked={gender === "F"}
                            onChange={handleGenderChange}
                            className="w-5 h-5 text-blue-600 cursor-pointer"
                          />
                          <span className="text-base">여자</span>
                  </label>
                </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1 cursor-pointer">이름</label>
                  <input 
                    type="text" 
                    inputMode="text"
                    ref={nameInputRef}
                    value={name}
                        onChange={handleNameChange}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); birthInputRef.current?.focus(); } }}
                        onBlur={() => { if (name.trim()) { birthInputRef.current?.focus(); } }}
                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="홍길동"
                  />
                </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1 cursor-pointer">생년월일</label>
                  <input 
                    type="text" 
                    inputMode="numeric"
                    pattern="[0-9]*"
                    ref={birthInputRef}
                    value={birth}
                        onChange={handleBirthChange}
                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="19880818"
                        maxLength={8}
                  />
                </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1 cursor-pointer">연락처</label>
                  <input 
                    type="text" 
                    inputMode="numeric"
                    pattern="[0-9]*"
                    ref={phoneInputRef}
                    value={phone}
                    onChange={handlePhoneChange}
                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="01012345678"
                      />
                    </div>
                  </div>
                </div>

                {/* 납입 정보 선택 */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5 cursor-pointer">납입기간</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['5년', '7년', '10년'].map((period) => (
                        <label key={period} className="relative flex items-center justify-center cursor-pointer">
                          {/* 추천 배지 */}
                          {period === '5년' && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff8c1a] text-white text-xs font-bold px-2 py-0.5 rounded-full animate-bounce shadow z-10">
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
                          <div className="w-full text-center px-2 py-2 text-sm border-2 rounded-lg cursor-pointer
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
                    <label className="block text-sm font-medium text-gray-600 mb-1.5 cursor-pointer">월 납입금액</label>
                    <div className="grid grid-cols-3 gap-2">
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
                          <div className="w-full text-center px-2 py-2 text-sm border-2 rounded-lg cursor-pointer
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
                <div className="flex items-start gap-2 mb-6 justify-end">
                  <input 
                    type="checkbox" 
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="mt-0.5 w-3.5 h-3.5 text-blue-600 rounded border-gray-300 cursor-pointer"
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
                  <button
                    type="submit"
                    className="w-full bg-[#3a8094] text-white font-bold rounded-xl py-4 text-lg hover:opacity-90 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                  <CalculatorIcon className="w-6 h-6" />
                  보험료 확인하기
                </button>
                  <div className="flex flex-row gap-2">
                  <button 
                    type="button" 
                    onClick={handleOpenConsultModal}
                    className="flex-1 bg-[#fa5a5a] text-white font-bold rounded-xl py-4 text-lg flex items-center justify-center gap-2 hover:opacity-90 transition cursor-pointer"
                  >
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M2.25 12a9.75 9.75 0 1 1 19.5 0v3.375a2.625 2.625 0 0 1-2.625 2.625h-1.125a.375.375 0 0 1-.375-.375V15a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 0 .75-.75V12a8.25 8.25 0 1 0-16.5 0v1.5a.75.75 0 0 0 .75.75h.75A.75.75 0 0 1 6 15v2.625a.375.375 0 0 1-.375.375H4.5A2.625 2.625 0 0 1 1.875 15.375V12Z' />
                      </svg>
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
              보험료 확인하기
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
        <div className="space-y-4">
          {isAgeKnown && !isAgeEligible && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded p-2 text-sm">
              이 상품은 15세~70세까지만 가입 가능합니다. 현재 보험연령 {numericInsuranceAge}세는 가입 대상이 아닙니다.
              계산 기능은 이용하실 수 없습니다.
            </div>
          )}
          {/* 보험료 산출 완료 안내 박스 (인증 후) */}
          {isVerified && (
            <>
              <FireworksEffect show={true} />
              <div className="bg-[#f8f8ff] rounded p-3 mb-2 text-center">
                <div className="text-lg text-black font-bold">보험료 산출이 완료되었습니다.</div>
              </div>
              {/* 보험료 결과값 UI (상세 정보) */}
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
                <div className="bg-white p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>보험사</span>
                    <span className="font-bold text-[#3a8094]">신한라이프생명</span>
                  </div>
                </div>
                <div className="bg-white p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>상품명</span>
                    <span className="font-bold text-[#3a8094]">모아더드림Plus종신보험</span>
                  </div>
                </div>
                <div className="bg-white p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>납입기간 / 월보험료</span>
                    <span className="font-bold text-[#3a8094]">
                      {paymentPeriod && paymentAmount ? `${paymentPeriod} / ${paymentAmount}` : '-'}
                    </span>
                  </div>
                </div>
                {/* 총 납입액 */}
                <div className="bg-white p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>총 납입액</span>
                    <span className="font-bold">
                      <span className="text-[#3a8094]">{total ? total.toLocaleString('en-US') : '-'}</span>
                      <span className="text-[#3a8094]"> 원</span>
                    </span>
                  </div>
                </div>
                {/* 10년 시점 환급률 */}
                <div className="bg-white p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>10년 시점 환급률</span>
                    <span className="font-bold">
                      <span className="text-[#7c3aed]">{rate ? (rate * 100).toFixed(1) : '-'}</span>{' '}<span className="text-[#3a8094]">%</span>
                    </span>
                  </div>
                </div>
                {/* 10년 시점 이자 (총납입액과 해약환급금 차액) */}
                <div className="bg-white p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>10년 시점 이자</span>
                    <span className="font-bold">
                      <span className="text-[#3b82f6]">{interestValue}</span>{' '}<span className="text-[#3a8094]">원</span>
                    </span>
                  </div>
                </div>
                <div className="bg-white p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>10년 시점 예상 해약환급금</span>
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
              {/* 보험료 계산 결과 */}
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
                <div className="bg-white p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>보험사</span>
                    <span className="font-bold text-[#3a8094]">신한라이프생명</span>
                  </div>
                </div>
                <div className="bg-white p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>상품명</span>
                    <span className="font-bold text-[#3a8094]">모아더드림Plus종신보험</span>
                  </div>
                </div>
                <div className="bg-white p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>납입기간 / 월보험료</span>
                    <span className="font-bold text-[#3a8094]">
                      {paymentPeriod && paymentAmount ? `${paymentPeriod} / ${paymentAmount}` : '-'}
                    </span>
                  </div>
                </div>
                {/* 총 납입액 */}
                <div className="bg-white p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>총 납입액</span>
                    <span className="font-bold">
                      <span className="text-[#3a8094]">{total ? total.toLocaleString('en-US') : '-'}</span>
                      <span className="text-[#3a8094]"> 원</span>
                    </span>
                  </div>
                </div>
                {/* 10년 시점 환급률 */}
                <div className="bg-white p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>10년 시점 환급률</span>
                    <span className="font-bold">
                      <span className="text-[#7c3aed]">?</span>{' '}<span className="text-[#3a8094]">%</span>
                    </span>
                  </div>
                </div>
                {/* 10년 시점 이자 (총납입액과 해약환급금 차액) */}
                <div className="bg-white p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>10년 시점 이자</span>
                    <span className="font-bold">
                      <span className="text-[#3b82f6]">?</span>{' '}<span className="text-[#3a8094]">원</span>
                    </span>
                  </div>
                </div>
                <div className="bg-white p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>10년 시점 예상 해약환급금</span>
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
                <p className="text-sm text-gray-600 mb-1">
                  정확한 보험료 확인을 위해 휴대폰 인증이 필요합니다.
                </p>
                <div className="flex flex-col sm:flex-row gap-1 mb-1 items-stretch sm:items-center">
                  <input
                    type="text"
                    value={phone}
                    readOnly
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-base bg-gray-100"
                  />
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={!isAgeEligible}
                    className={`${!isAgeEligible ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#f97316] text-white hover:bg-[#ea580c]'} w-full sm:w-auto px-2 py-1 rounded-md text-sm font-medium transition-colors min-w-[80px]`}
                  >
                    {otpResendAvailable ? '인증번호 전송' : '재발송'}
                  </button>
                  {!otpResendAvailable && (
                    <div className="min-w-[60px] flex items-center justify-center text-[#3a8094] font-medium text-xs">
                      {formatTime(otpTimer)}
                    </div>
                  )}
                </div>
                <div className="flex gap-1 mb-1">
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
                    className="flex-1 px-2 py-2 border border-gray-300 rounded-md text-sm focus:ring-[#3a8094] focus:border-[#3a8094]"
                    placeholder="6자리 인증번호 입력"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleVerifyOTP}
                  disabled={!isAgeEligible}
                  className={`w-full px-2 py-2.5 rounded-md text-base font-semibold transition-colors mt-1 ${!isAgeEligible ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#3a8094] text-white hover:bg-[#2c6070]'}`}
                >
                  인증 및 보험료 계산
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
            <div className="grid grid-cols-1 gap-1.5">
              <div className="bg-white p-2.5 rounded border border-gray-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>이름</span>
                  <span className="font-bold text-[#3a8094] text-base">{name}</span>
                </div>
              </div>
              <div className="bg-white p-2.5 rounded border border-gray-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>연락처</span>
                  <span className="font-bold text-[#3a8094] text-base">{phone}</span>
                </div>
              </div>
              <div className={`bg-white p-2.5 rounded border border-gray-200 relative ${consultIsVerified ? '' : 'cursor-pointer select-none'}`}
                onClick={consultIsVerified ? undefined : () => setShowConsultTypeDropdown(v => !v)}
                tabIndex={consultIsVerified ? -1 : 0}
                onBlur={consultIsVerified ? undefined : () => setTimeout(() => setShowConsultTypeDropdown(false), 100)}
                aria-disabled={consultIsVerified}
              >
                <div className="flex justify-between items-center text-sm">
                  <span className="text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>상담종류</span>
                  <span className={`font-bold flex items-center gap-1 text-base ${consultIsVerified ? 'text-[#3a8094]' : 'text-[#7c3aed]'}`}>
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
              <div className={`bg-white p-2.5 rounded border border-gray-200 relative ${consultIsVerified ? '' : 'cursor-pointer select-none'}`}
                onClick={consultIsVerified ? undefined : () => setShowConsultTimeDropdown(v => !v)}
                tabIndex={consultIsVerified ? -1 : 0}
                onBlur={consultIsVerified ? undefined : () => setTimeout(() => setShowConsultTimeDropdown(false), 100)}
                aria-disabled={consultIsVerified}
              >
                <div className="flex justify-between items-center text-sm">
                  <span className="text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>상담시간대</span>
                  <span className={`font-bold flex items-center gap-1 text-base ${consultIsVerified ? 'text-[#3a8094]' : 'text-[#7c3aed]'}`}>
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
            <div className="bg-gray-50 rounded-lg p-2 mt-0">
              <h3 className="text-base font-bold text-gray-900 mb-1">휴대폰 인증</h3>
              <p className="text-sm text-gray-600 mb-1">상담신청을 위해 휴대폰 인증이 필요합니다.</p>
              <div className="flex flex-col sm:flex-row gap-1 mb-1 items-stretch sm:items-center">
                <input
                  type="text"
                  value={phone}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-base bg-gray-100"
                />
                <button
                  type="button"
                  onClick={handleConsultSendOTP}
                  className="w-full sm:w-auto px-2 py-1 bg-[#f97316] text-white rounded-md text-sm font-medium 
                           hover:bg-[#ea580c] transition-colors min-w-[80px]"
                >
                  {consultOtpResendAvailable ? '인증번호 전송' : '재발송'}
                </button>
                {!consultOtpResendAvailable && (
                  <div className="min-w-[60px] flex items-center justify-center text-[#3a8094] font-medium text-xs">
                    {formatTime(consultOtpTimer)}
                  </div>
                )}
              </div>
              <div className="flex gap-1 mb-1">
                <input
                  type="text"
                  value={consultOtpCode}
                  onChange={e => setConsultOtpCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                  maxLength={6}
                  className="flex-1 px-2 py-2 border border-gray-300 rounded-md text-sm focus:ring-[#3a8094] focus:border-[#3a8094]"
                  placeholder="6자리 인증번호 입력"
                />
              </div>
              <button
                type="button"
                onClick={handleConsultVerifyOTP}
                className="w-full px-2 py-2.5 bg-[#3a8094] text-white rounded-md text-base font-semibold hover:bg-[#2c6070] transition-colors mt-1"
              >
                인증 및 상담신청
              </button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
