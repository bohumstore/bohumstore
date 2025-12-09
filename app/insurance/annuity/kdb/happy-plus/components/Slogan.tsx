import React, { useState, useEffect, useRef } from 'react'
import { CalculatorIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import Modal from '@/app/components/Modal';
import request from '@/app/api/request';
import { getProductConfigByPath, getTemplateIdByPath } from '@/app/constants/insurance';
import { calculateAnnuityStartAge } from '@/app/utils/annuityCalculator';
import { trackPremiumCheck, trackCounselRequest } from "@/app/utils/visitorTracking";

import FireworksEffect from './FireworksEffect';

// 현재 경로에 맞는 상품 정보 가져오기
const currentPath = '/insurance/annuity/kdb/happy-plus';
const productConfig = getProductConfigByPath(currentPath);

const INSURANCE_COMPANY_ID = 2; // KDB 생명보험
const INSURANCE_PRODUCT_ID = 3; // KDB 더!행복플러스연금보험(보증형) id 코드값

type SloganProps = {
  onOpenPrivacy: () => void
  onModalStateChange?: (isOpen: boolean) => void
}

export default function Slogan({ onOpenPrivacy, onModalStateChange }: SloganProps) {
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
  const [consultType, setConsultType] = useState('연금보험');
  const [consultTime, setConsultTime] = useState('아무때나');
  const [pensionAmounts, setPensionAmounts] = useState({ monthly: 0, guaranteed: 0, totalUntil100: 0, pensionStartAge: 0, notice: '' });
  const consultTypeOptions = ['연금보험'];
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
        companyName: "KDB생명",
        productName: "더!행복플러스연금보험(보증형)"
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
    alert("6자리 인증번호를 입력해 주세요.");
    return;
  }

  setVerifying(true);
  try {
    console.log("[CLIENT] 연금액 계산 인증 시작:", {
      phone,
      name,
      templateId: "UB_8705",
      adminTemplateId: "UA_8331"
    });
    console.log("[CLIENT] counselType:", counselType);
    console.log("[CLIENT] counselType 타입:", typeof counselType);
    console.log("[CLIENT] counselType === 1:", counselType === 1);
    console.log("[CLIENT] INSURANCE_COMPANY_ID:", INSURANCE_COMPANY_ID);
    console.log("[CLIENT] INSURANCE_PRODUCT_ID:", INSURANCE_PRODUCT_ID);

    // 연금액 계산 (비동기)
    const calculatedPensionAmounts = await calculatePensionAmount(Number(insuranceAge), paymentPeriod, paymentAmount, gender);
    setPensionAmounts(calculatedPensionAmounts);

    const requestData = {
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
      monthlyPension: calculatedPensionAmounts.monthly, // 월 연금액
      guaranteedPension: calculatedPensionAmounts.guaranteed, // 20년 보증기간 연금액
      pensionStartAge: calculatedPensionAmounts.pensionStartAge, // 연금개시연령 (카카오 메시지용)
      totalUntil100: calculatedPensionAmounts.totalUntil100,     // 100세까지 총 수령액 (카카오 메시지용)
      templateId: "UB_8705", // 고객용 연금액 계산 결과 전송용 템플릿
      adminTemplateId: "UA_8331" // 관리자용 연금액 계산 결과 전송용 템플릿
    };
    
    console.log("[CLIENT] API 요청 데이터:", requestData);
    
    const res = await request.post("/api/verifyOTP", requestData);
    
    console.log("[CLIENT] 연금액 계산 인증 응답:", res.data);
    
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
    console.error("[CLIENT] 연금액 계산 인증 에러:", e);
    if (e.response?.data?.error) {
      alert(`인증 에러: ${e.response.data.error}`);
    } else if (e.response?.status === 400) {
      alert("잘못된 요청입니다. 입력 정보를 확인해주세요.");
    } else if (e.response?.status === 500) {
      alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } else {
      alert("인증에 실패했습니다. 다시 시도해주세요.");
    }
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
    setPensionAmounts({ monthly: 0, guaranteed: 0, totalUntil100: 0, pensionStartAge: 0, notice: '' });
  };

  // 입력값 변경 시 인증상태 초기화
  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
    setIsVerified(false);
    setPensionAmounts({ monthly: 0, guaranteed: 0, totalUntil100: 0, pensionStartAge: 0, notice: '' });
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsVerified(false);
    setPensionAmounts({ monthly: 0, guaranteed: 0, totalUntil100: 0, pensionStartAge: 0, notice: '' });
  };
  const handlePaymentPeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentPeriod(e.target.value);
    setIsVerified(false);
    setPensionAmounts({ monthly: 0, guaranteed: 0, totalUntil100: 0, pensionStartAge: 0, notice: '' });
  };
  const handlePaymentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentAmount(e.target.value);
    setIsVerified(false);
    setPensionAmounts({ monthly: 0, guaranteed: 0, totalUntil100: 0, pensionStartAge: 0, notice: '' });
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
    await handlePostOTP();
    // 전송 후 상담 OTP 입력칸으로 포커스 이동
    setTimeout(() => consultOtpInputRef.current?.focus(), 0);
  };

  const handleConsultVerifyOTP = async () => {
    if (verifying) return;
    if (consultOtpCode.length !== 6) {
      alert("6자리 인증번호를 입력해주세요.");
      return;
    }
    
    // 기본 필수 데이터만 확인 (납입기간, 월납입금액 제외)
    if (!name || !birth || !gender || !phone) {
      alert("필수 정보가 누락되었습니다. 모든 정보를 입력해주세요.");
      return;
    }
    
    setVerifying(true);
    try {
      // 납입기간과 월납입금액이 있는 경우에만 연금액 계산
      let calculatedPensionAmounts = { monthly: 0, guaranteed: 0, totalUntil100: 0, pensionStartAge: 0, notice: '' };
      if (paymentPeriod && paymentAmount) {
        calculatedPensionAmounts = await calculatePensionAmount(Number(insuranceAge), paymentPeriod, paymentAmount, gender);
        setPensionAmounts(calculatedPensionAmounts);
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
        monthlyPension: calculatedPensionAmounts.monthly || 0,
        guaranteedPension: calculatedPensionAmounts.guaranteed || 0,
        templateId: "UB_8715", // 고객용 상담신청 완료 전송용 템플릿
        adminTemplateId: "UA_8332" // 관리자용 상담신청 접수 전송용 템플릿
      });
      
      if (res.data.success) {
        alert("인증이 완료되었습니다!");
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
  }

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

  // 연금개시연령 계산 함수 (기본 로직)
  const getPensionStartAge = (age: number, paymentPeriod: string) => {
    // 납입기간에서 년수 추출
    const years = parseInt(paymentPeriod.replace(/[^0-9]/g, ''));
    
    // 기본 연금개시연령 계산 로직
    const completionAge = age + years;
    let minStartAge = 65;
    if (completionAge >= 80) minStartAge = 80;
    else if (completionAge >= 75) minStartAge = 75;
    else if (completionAge >= 70) minStartAge = 70;
    else if (completionAge >= 65) minStartAge = 65;
    
    return Math.max(completionAge, minStartAge);
  };

  // 엑셀 데이터 기반 연금개시연령 계산 함수 (비동기)
  const getPensionStartAgeFromExcel = async (age: number, paymentPeriod: string, monthlyPayment: number) => {
    try {
      const years = parseInt(paymentPeriod.replace(/[^0-9]/g, ''));
      
      const response = await fetch('/api/calculate-pension/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: 'temp',
          gender,
          age,
          paymentPeriod: years,
          monthlyPayment,
          productType: 'happy-plus'
        })
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      
      if (data.error || !data.data) {
        return null;
      }

      return data.data.pensionStartAge || null;
    } catch (error) {
      console.error('엑셀 기반 연금개시연령 계산 오류:', error);
      return null;
    }
  };

  // 현재 선택된 납입기간에 대한 연금개시연령 (엑셀 데이터 기반)
  const [currentPensionStartAge, setCurrentPensionStartAge] = useState<number | null>(null);

  // 선택된 값이 변경될 때마다 엑셀 데이터 기반으로 연금개시연령 계산
  useEffect(() => {
    const calculateCurrentPensionStartAge = async () => {
      if (!paymentPeriod || !paymentAmount || !gender || !insuranceAge) {
        setCurrentPensionStartAge(null);
        return;
      }

      try {
        // 월 납입액 계산
        let monthlyPayment = 0;
        if (paymentAmount.includes('만원')) {
          const num = parseInt(paymentAmount.replace(/[^0-9]/g, ''));
          monthlyPayment = num * 10000;
        } else {
          monthlyPayment = parseInt(paymentAmount.replace(/[^0-9]/g, ''));
        }

        // 납입기간에서 년수 추출
        const paymentYears = parseInt(paymentPeriod.replace(/[^0-9]/g, ''));

        // 엑셀 데이터에서 연금개시연령 조회
        const excelPensionStartAge = await getPensionStartAgeFromExcel(
          Number(insuranceAge),
          paymentPeriod,
          monthlyPayment
        );

        if (excelPensionStartAge !== null) {
          setCurrentPensionStartAge(excelPensionStartAge);
        } else {
          // 엑셀 데이터에서 찾지 못한 경우 기본 로직 사용
          const fallbackAge = getPensionStartAge(Number(insuranceAge), paymentPeriod);
          setCurrentPensionStartAge(fallbackAge);
        }
      } catch (error) {
        console.error('연금개시연령 계산 오류:', error);
        // 오류 발생 시 기본 로직 사용
        const fallbackAge = getPensionStartAge(Number(insuranceAge), paymentPeriod);
        setCurrentPensionStartAge(fallbackAge);
      }
    };

    calculateCurrentPensionStartAge();
  }, [paymentPeriod, paymentAmount, gender, insuranceAge]);

  // 납입기간 버튼 비활성화 여부 확인 (연금개시연령이 80세를 초과하는 경우)
  const is15YearDisabled = Number(insuranceAge) + 15 > 80;
  const is20YearDisabled = Number(insuranceAge) + 20 > 80;

  // 엑셀 기반 연금액 계산 함수
  const calculatePensionAmount = async (age: number, paymentPeriod: string, paymentAmount: string, gender: string) => {
    if (!age || !paymentPeriod || !paymentAmount || !gender) {
      return { monthly: 0, guaranteed: 0, totalUntil100: 0, pensionStartAge: 0, notice: '' };
    }
    
    try {
      // 월 납입액 계산 (만원 단위 처리)
      let monthlyPayment = 0;
      if (paymentAmount.includes('만원')) {
        const num = parseInt(paymentAmount.replace(/[^0-9]/g, ''));
        monthlyPayment = num * 10000; // 만원을 원으로 변환
      } else {
        monthlyPayment = parseInt(paymentAmount.replace(/[^0-9]/g, ''));
      }
      
      // 납입기간에서 년수 추출
      const paymentYears = parseInt(paymentPeriod.replace(/[^0-9]/g, ''));
      
      console.log('[DEBUG] API 호출 데이터:', {
        customerName: name,
        gender,
        age,
        paymentPeriod: paymentYears,
        monthlyPayment
      });
      
      // API 호출
      const response = await fetch('/api/calculate-pension/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: name,
          gender,
          age,
          paymentPeriod: paymentYears,
          monthlyPayment,
          productType: 'happy-plus'
        })
      });
      
      console.log('[DEBUG] API 응답 상태:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('[DEBUG] API 오류 응답:', errorText);
        throw new Error(`연금액 계산에 실패했습니다. (${response.status})`);
      }
      
      const result = await response.json();
      console.log('[DEBUG] API 응답 데이터:', result);
      
      if (result.success) {
        return {
          monthly: result.data.monthlyPension,
          guaranteed: result.data.guaranteedAmount,
          totalUntil100: result.data.totalUntil100,
          pensionStartAge: result.data.pensionStartAge,
          notice: result.data.notice
        };
      } else {
        throw new Error(result.error || '연금액 계산에 실패했습니다.');
      }
    } catch (error) {
      console.error('[DEBUG] 연금액 계산 오류:', error);
      // 오류 발생 시 기본값 반환
      return { monthly: 0, guaranteed: 0, totalUntil100: 0, pensionStartAge: 0, notice: '' };
    }
  };

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
  


  return (
    <>
      <section
        className="w-full bg-green-600 py-6 md:py-10 lg:py-3"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 2px, transparent 2px)',
          backgroundSize: '20px 20px',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-col lg:flex-row items-center md:items-center lg:items-start justify-center lg:justify-between gap-4 md:gap-8 lg:gap-12 px-4 md:px-6 lg:px-4 md:py-4 lg:py-4">
          {/* 왼쪽: 상품 설명/이미지 */}
          <div className="flex-1 flex flex-col items-center md:items-center lg:items-start text-center md:text-center lg:text-left">
            <div className="flex items-center gap-2 text-sm text-white mb-2">
              {/* <img src="/kdb-logo.png" alt="KDB 로고" className="h-6 w-auto" style={{minWidth:'24px'}} /> */}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 lg:mb-4 leading-tight">
              20년까지 연단리 7%!<br />
              보증형 연금보험!
            </h1>
            <ul className="mb-3 sm:mb-5 md:mb-8 lg:mb-8 space-y-1 sm:space-y-1.5 md:space-y-2.5 lg:space-y-2">
              <li className="flex items-center text-sm sm:text-base md:text-lg lg:text-lg text-white justify-center md:justify-center lg:justify-start">
                <span className="text-sm sm:text-base md:text-lg lg:text-xl mr-1 sm:mr-1.5 md:mr-2.5 lg:mr-2 text-[#ffd700] flex-shrink-0">✔</span>
                <span className="leading-tight">연단리 7% 최저연금기준금액 보증 <span className="text-[10px] sm:text-xs text-gray-200">(20년까지)</span></span>
              </li>
              <li className="flex items-center text-sm sm:text-base md:text-lg lg:text-lg text-white justify-center md:justify-center lg:justify-start">
                <span className="text-sm sm:text-base md:text-lg lg:text-xl mr-1 sm:mr-1.5 md:mr-2.5 lg:mr-2 text-[#ffd700] flex-shrink-0">✔</span>
                <span>가입 15~70세 / 연금개시 55~80세</span>
              </li>
              <li className="flex items-center text-sm sm:text-base md:text-lg lg:text-lg text-white justify-center md:justify-center lg:justify-start">
                <span className="text-sm sm:text-base md:text-lg lg:text-xl mr-1 sm:mr-1.5 md:mr-2.5 lg:mr-2 text-[#ffd700] flex-shrink-0">✔</span>
                <span className="leading-tight">비과세 <span className="text-[10px] sm:text-xs text-gray-200">(월 150만원 한도, 10년유지 세법요건 충족시)</span></span>
              </li>
              <li className="flex items-center text-sm sm:text-base md:text-lg lg:text-lg text-white justify-center md:justify-center lg:justify-start">
                <span className="text-sm sm:text-base md:text-lg lg:text-xl mr-1 sm:mr-1.5 md:mr-2.5 lg:mr-2 text-[#ffd700] flex-shrink-0">✔</span>
                <span>금액보증연금 보증 / 최저사망적립액 보증</span>
              </li>
            </ul>
              {/* 보증 내용 박스 */}
              <div className="w-full max-w-2xl lg:max-w-3xl mx-auto bg-white rounded-xl shadow-lg mb-3 sm:mb-4 p-4 sm:p-5 md:p-6 lg:p-4 px-4 sm:px-5 md:px-6 lg:px-4 pt-5 sm:pt-6 md:pt-7 lg:pt-6 pb-5 sm:pb-6 md:pb-7 lg:pb-6">
                <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-3 mb-2 sm:mb-3">
                  {/* 1. 생존 시 최대 100세까지 */}
                  <div className="text-center p-1.5 sm:p-2 md:p-3 lg:p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg shadow-md border border-purple-200 transition-all duration-300 flex flex-col justify-between min-h-[120px] sm:min-h-[140px] md:min-h-[160px]">
                    <div>
                      <div className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 text-white text-[10px] sm:text-xs md:text-sm font-bold px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 rounded-full mb-1 sm:mb-2 shadow-md">생존 시 최대 100세까지</div>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-[10px] sm:text-xs text-gray-700 leading-tight font-medium">
                        (예시) 100세<br />최종연금지급일
                  </div>
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-600 leading-tight bg-white/50 rounded-lg p-1 sm:p-1.5">
                      = 피보험자의 99세<br />계약 해당일
                  </div>
                    </div>

                  {/* 2. 보증금리 Top */}
                  <div className="text-center p-1.5 sm:p-2 md:p-3 lg:p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg shadow-md border border-orange-200 transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[120px] sm:min-h-[140px] md:min-h-[160px]">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-shine-strong"></div>
                    <div className="relative z-10">
                      <div className="inline-block bg-gradient-to-r from-orange-600 to-orange-700 text-white text-[10px] sm:text-xs md:text-sm font-bold px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 rounded-full mb-1 sm:mb-2 shadow-md">보증금리 Top</div>
                      <div className="flex items-center justify-center mb-2">
                        <div className="text-[10px] sm:text-xs text-gray-700 mr-1 sm:mr-2 font-semibold leading-tight">
                          최대<br />연단리
                        </div>
                        <div className="text-2xl sm:text-3xl md:text-4xl font-black text-orange-600 drop-shadow-2xl animate-bounce">7%</div>
                      </div>
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-600 space-y-0.5 sm:space-y-1 leading-tight relative z-10 mt-auto">
                        <div className="bg-white/60 rounded-lg p-0.5 sm:p-1 font-medium">계약일로부터<br />20년: 7%</div>
                        <div className="bg-white/60 rounded-lg p-0.5 sm:p-1 font-medium">20년~연금개시까지: <span className="text-blue-600 font-bold">5%</span></div>
                      </div>
                  </div>

                  {/* 3. 사망 시에도 보장 */}
                  <div className="text-center p-1.5 sm:p-2 md:p-3 lg:p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg shadow-md border border-blue-200 transition-all duration-300 flex flex-col justify-between min-h-[120px] sm:min-h-[140px] md:min-h-[160px]">
                    <div>
                      <div className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white text-[10px] sm:text-xs md:text-sm font-bold px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 rounded-full mb-1 sm:mb-2 shadow-md">사망시에도<br />보장</div>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-[10px] sm:text-xs font-bold text-gray-800 leading-tight">
                        최저 사망적립액<br />보장
                      </div>
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-600 leading-tight bg-white/50 rounded-lg p-1 sm:p-1.5">
                      장래 공시이율과<br />관계없이
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 text-center mt-2 sm:mt-4">
                  <p>※ 대표계약기준(40세 남자, 10년납, 연금개시 나이 65세), 복리이자율로 환산시 4.21%</p>
                </div>
            </div>
          </div>
          {/* 오른쪽: 보험료 확인 카드 */}
          <div className="flex-1 flex justify-center lg:justify-end w-full lg:ml-8 lg:self-center">
            <div id="calculator-box" className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-2xl p-5 sm:p-6 md:p-7 relative flex flex-col">
              <div className="mb-5 sm:mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#f59e0b] to-[#d97706] rounded-lg flex items-center justify-center">
                    <CalculatorIcon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">연금액 계산하기</h3>
                </div>
                <p className="text-gray-500 text-xs sm:text-sm ml-10">간단한 정보 입력으로 예상 연금액을 확인하세요</p>
              </div>
              <form className="flex flex-col gap-3 sm:gap-4" onSubmit={handleInsuranceCostCalculate}>
                {/* 성별/이름 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">성별 <span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                      <label className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border-2 cursor-pointer transition-all ${gender === "M" ? 'border-[#f59e0b] bg-[#f59e0b]/5 text-[#f59e0b]' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" name="gender" value="M" checked={gender === "M"} onChange={handleGenderChange} className="sr-only" />
                        <span className="text-sm font-medium">남자</span>
                      </label>
                      <label className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border-2 cursor-pointer transition-all ${gender === "F" ? 'border-[#f59e0b] bg-[#f59e0b]/5 text-[#f59e0b]' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" name="gender" value="F" checked={gender === "F"} onChange={handleGenderChange} className="sr-only" />
                        <span className="text-sm font-medium">여자</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">이름 <span className="text-red-500">*</span></label>
                    <input type="text" inputMode="text" ref={nameInputRef} value={name} onChange={handleNameChange} onFocus={handleInputFocus} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); birthInputRef.current?.focus(); } }} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#f59e0b]/20 focus:border-[#f59e0b] transition-all" placeholder="홍길동" />
                  </div>
                </div>

                {/* 생년월일/연락처 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">생년월일 <span className="text-red-500">*</span></label>
                    <input type="text" inputMode="numeric" pattern="[0-9]*" ref={birthInputRef} value={birth} onChange={handleBirthChange} onFocus={handleInputFocus} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#f59e0b]/20 focus:border-[#f59e0b] transition-all" placeholder="19880818" maxLength={8} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">연락처 <span className="text-red-500">*</span></label>
                    <input type="text" inputMode="numeric" pattern="[0-9]*" ref={phoneInputRef} value={phone} onChange={handlePhoneChange} onFocus={handleInputFocus} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#f59e0b]/20 focus:border-[#f59e0b] transition-all" placeholder="01012345678" />
                  </div>
                </div>

                {/* 납입 정보 선택 */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5 cursor-pointer">납입기간</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['10년', '15년', '20년'].map((period) => {
                        const isDisabled = (period === '15년' && is15YearDisabled) || (period === '20년' && is20YearDisabled);
                        return (
                          <label key={period} className={`relative flex items-center justify-center ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                            {/* 추천 배지 */}
                            {period === '10년' && (
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
                              disabled={isDisabled}
                              className="peer sr-only cursor-pointer"
                            />
                            <div className={`w-full text-center py-2.5 text-sm border-2 rounded-lg transition-all ${isDisabled 
                                          ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed' 
                                          : 'cursor-pointer peer-checked:border-[#f59e0b] peer-checked:bg-[#f59e0b]/5 peer-checked:text-[#f59e0b] peer-checked:font-bold hover:border-[#f59e0b] hover:bg-gray-50 border-gray-200'
                                        }`}>
                              {period}
                              {isDisabled && (
                                <div className="text-xs text-red-500 mt-1">
                                  {Number(insuranceAge) >= 66 ? '가입불가' : 
                                   (period === '15년' && Number(insuranceAge) + 15 > 80) ? '개시연령초과' :
                                   (period === '20년' && Number(insuranceAge) + 20 > 80) ? '개시연령초과' : '가입불가'}
                                </div>
                              )}
                            </div>
                          </label>
                        );
                      })}
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
                          <div className="w-full text-center py-2.5 text-sm border-2 rounded-lg cursor-pointer transition-all peer-checked:border-[#f59e0b] peer-checked:bg-[#f59e0b]/5 peer-checked:text-[#f59e0b] peer-checked:font-bold hover:border-[#f59e0b] hover:bg-gray-50 border-gray-200">
                            {amount}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 개인정보 동의 */}
                <div className="flex items-center gap-2 mb-4">
                  <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} className="w-4 h-4 text-[#f59e0b] rounded border-gray-300 cursor-pointer focus:ring-[#f59e0b]" />
                  <span className="text-xs text-gray-600">
                    개인정보 수집 및 이용에 동의합니다. 
                    <button type="button" onClick={onOpenPrivacy} className="text-[#f59e0b] underline ml-1 hover:text-[#d97706]">자세히 보기</button>
                  </span>
                </div>

                {/* 버튼들 */}
                <div className="flex flex-col gap-2 mt-1">
                  <button type="submit" className="w-full bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white font-bold rounded-xl py-3.5 text-base hover:opacity-95 transition flex items-center justify-center gap-2 shadow-lg shadow-[#f59e0b]/25 cursor-pointer">
                    <CalculatorIcon className="w-5 h-5" />
                    연금액 확인하기
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
              연금액 확인하기
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
              이 상품은 15세~70세까지만 가입 가능합니다. 현재 보험연령 {numericInsuranceAge}세는 가입 대상이 아닙니다.
              계산 기능은 이용하실 수 없습니다.
            </div>
          )}
          {/* 보험료 산출 완료 안내 박스 (인증 후) */}
          {isVerified && (
            <>
              <FireworksEffect show={true} />
              <div className="bg-[#f8f8ff] rounded p-2 sm:p-2.5 mb-1.5 sm:mb-2 text-center">
                <div className="text-base sm:text-lg text-black font-bold">연금액 산출이 완료되었습니다.</div>
              </div>
              {/* 보험료 결과값 UI (상세 정보) */}
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
                    <span className="font-bold text-[#3a8094]">{isVerified ? "KDB생명" : "?"}</span>
                  </div>
                </div>
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>상품명</span>
                    <span className="font-bold text-[#3a8094]">{isVerified ? "더!행복플러스연금보험(보증형)" : "?"}</span>
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
                {/* 연금개시연령 */}
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>연금개시연령</span>
                    <span className="font-bold">
                      <span className="text-[#7c3aed]">{isVerified ? (pensionAmounts.pensionStartAge || currentPensionStartAge) : currentPensionStartAge || '?'}</span>{' '}<span className="text-[#3a8094]">세</span>
                    </span>
                  </div>
                </div>
                {/* 월 연금액 */}
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>월 연금액</span>
                    <span className="font-bold">
                      <span className="text-[#3b82f6]">
                        {isVerified ? (
                          pensionAmounts.monthly > 0 ? 
                            `약 ${pensionAmounts.monthly.toLocaleString('en-US')} 원` : 
                            '별도 상담 문의'
                        ) : "인증 후 확인가능"}
                      </span>
                    </span>
                  </div>
                </div>
                {/* 20년 보증기간 연금액 */}
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>20년 보증기간 연금액</span>
                    <span className="font-bold">
                      <span className="text-[#ef4444]">
                        {isVerified ? (
                          pensionAmounts.guaranteed > 0 ? 
                            `약 ${pensionAmounts.guaranteed.toLocaleString('en-US')} 원` : 
                            '별도 상담 문의'
                        ) : "인증 후 확인가능"}
                      </span>
                    </span>
                  </div>
                </div>
                {/* 100세까지 생존 시 총 받는 금액 */}
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>100세까지 생존 시 총 받는 금액</span>
                    <span className="font-bold">
                      <span className="text-[#10b981]">
                        {isVerified ? (
                          pensionAmounts.totalUntil100 > 0 ? 
                            `약 ${pensionAmounts.totalUntil100.toLocaleString('en-US')} 원` : 
                            '별도 상담 문의'
                        ) : "인증 후 확인가능"}
                      </span>
                    </span>
                  </div>
                </div>
                {/* 안내 메시지 */}
                {isVerified && pensionAmounts.notice && (
                  <div className="bg-yellow-50 p-2 rounded border border-yellow-200">
                    <div className="text-sm text-yellow-800">
                      <span className="font-medium">※ 안내:</span> {pensionAmounts.notice}
                    </div>
                  </div>
                )}
                <div className="text-xs text-gray-500 text-center mt-4">
                  * 실제 연금액은 가입시점 및 고객 정보에 따라 달라질 수 있습니다.
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
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>보험사</span>
                    {isVerified ? <span className="font-bold text-[#3a8094]">KDB생명</span> : <span className="font-medium text-[#7c3aed] text-xs">🔒 인증 후 확인</span>}
                  </div>
                </div>
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>상품명</span>
                    {isVerified ? <span className="font-bold text-[#3a8094]">더!행복플러스연금보험(보증형)</span> : <span className="font-medium text-[#7c3aed] text-xs">🔒 인증 후 확인</span>}
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
                {/* 연금개시연령 */}
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>연금개시연령</span>
                    <span className="font-bold">
                      <span className="text-[#7c3aed]">{currentPensionStartAge || '?'}</span>{' '}<span className="text-[#3a8094]">세</span>
                    </span>
                  </div>
                </div>
                {/* 월 연금액 */}
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>월 연금액</span>
                    <span className="font-bold">
                      <span className="text-[#3b82f6]">인증 후 확인가능</span>
                    </span>
                  </div>
                </div>
                {/* 20년 보증기간 연금액 */}
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>20년 보증기간 연금액</span>
                    <span className="font-bold">
                      <span className="text-[#ef4444]">인증 후 확인가능</span>
                    </span>
                  </div>
                </div>
                {/* 100세까지 생존 시 총 받는 금액 */}
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>100세까지 생존 시 총 받는 금액</span>
                    <span className="font-bold">
                      <span className="text-[#10b981]">인증 후 확인가능</span>
                    </span>
                  </div>
                </div>
                {/* 안내 메시지 */}
                {isVerified && pensionAmounts.notice && (
                  <div className="bg-yellow-50 p-2 rounded border border-yellow-200">
                    <div className="text-sm text-yellow-800">
                      <span className="font-medium">※ 안내:</span> {pensionAmounts.notice}
                    </div>
                  </div>
                )}
                <div className="text-xs text-gray-500 text-center mt-4">
                  * 실제 연금액은 가입시점 및 고객 정보에 따라 달라질 수 있습니다.
                  <div className="mt-0.5 text-[#3a8094]">* 휴대폰 인증 완료 후 상세 정보를 확인하실 수 있습니다.</div>
                </div>
              </div>
              {/* 휴대폰 인증 안내 및 인증번호 입력란 */}
              <div className="bg-gray-50 rounded-lg p-1.5 sm:p-2 mt-0">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">휴대폰 인증</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">
                  정확한 보험료 확인을 위해 휴대폰 인증이 필요합니다.
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
                <button
                  type="button"
                  onClick={handleVerifyOTP}
                  disabled={!isAgeEligible || verifying || !otpSent}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-md text-base sm:text-lg font-semibold transition-colors mt-1 sm:mt-2 ${(!isAgeEligible || verifying || !otpSent) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#3a8094] text-white hover:bg-[#2c6070]'}`}
                >
                  {verifying ? '인증 처리중...' : (otpSent ? '인증하고 결과 확인하기' : '인증번호를 먼저 전송하세요')}
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

