import React, { useState, useEffect, useRef } from 'react'
import { CalculatorIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import Modal from '@/app/components/Modal';
import request from '@/app/api/request';
import { supabase } from '@/app/api/supabase';
import { queryUsers, createUser, queryCounsel, createCounsel } from '@/app/utils/mcpClient';
import { getProductConfigByPath, getTemplateIdByPath } from '@/app/constants/insurance';
import { calculateAnnuityStartAge } from '@/app/utils/annuityCalculator';
import FireworksEffect from './FireworksEffect';
import { trackSimplifiedVisitor } from "@/app/utils/visitorTracking";

// 현재 경로에 맞는 상품 정보 가져오기
const currentPath = '/insurance/annuity/ibk/lifetime';
const productConfig = getProductConfigByPath(currentPath);

const INSURANCE_COMPANY_ID = 3; // IBK 연금보험
const INSURANCE_PRODUCT_ID = 4; // IBK 평생연금받는 변액연금보험 id 코드값

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

  // ====== 엑셀 기반 계산/적격성 상태 ======
  const [excelResult, setExcelResult] = useState<{
    pensionStartAge: number;
    monthlyPension: number;
    performancePension: number;
    guaranteedAmount: number;
    totalUntil100: number;
    notice?: string;
  } | null>(null);
  const [eligibility, setEligibility] = useState<{ [key: string]: boolean }>({});

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

    // 보험연령 안내는 모달에서 처리 (이 상품: 0~68세)
    // 여기서는 형식 검증까지만 수행하고 나이로 차단하지 않음
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
        companyName: "IBK연금보험",
        productName: "IBK연금액 평생보증받는변액연금보험"
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
    // 연령(0~68) 외는 계산 차단
    if (verifying) return;
    const ageForVerify = insuranceAge !== '' ? Number(insuranceAge) : NaN;
    if (isNaN(ageForVerify) || ageForVerify < 0 || ageForVerify > 68) return;
    if (otpCode.length !== 6) {
      alert("6자리 인증번호를 입력해주세요.");
      return;
    }

    setVerifying(true);
    try {
      // 엑셀 기반 연금액 계산 (서버 API) - 항상 최신 입력값으로 재조회
      let currentExcel = null as typeof excelResult;
      try {
        let monthlyPayment = 0;
        if (paymentAmount.includes('만원')) {
          const num = parseInt(paymentAmount.replace(/[^0-9]/g, ''));
          monthlyPayment = num * 10000;
        } else {
          monthlyPayment = parseInt(paymentAmount.replace(/[^0-9]/g, ''));
        }
        const years = parseInt(paymentPeriod.replace(/[^0-9]/g, ''));
        const resp = await fetch('/api/calculate-pension/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerName: name,
            gender,
            age: Number(insuranceAge),
            paymentPeriod: years,
            monthlyPayment,
            productType: 'ibk-lifetime'
          })
        });
        if (resp.ok) {
          const data = await resp.json();
          if (data.success) {
            currentExcel = {
              pensionStartAge: data.data.pensionStartAge || 0,
              monthlyPension: data.data.monthlyPension || 0,
              performancePension: data.data.performancePension || 0,
              guaranteedAmount: data.data.guaranteedAmount || 0,
              totalUntil100: data.data.totalUntil100 || 0,
              notice: data.data.notice || ''
            };
            setExcelResult(currentExcel);
          }
        }
      } catch (e) {
        // ignore
      }

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
        monthlyPension: currentExcel?.monthlyPension || 0,
        performancePension: currentExcel?.performancePension || 0,
        guaranteedPension: currentExcel?.guaranteedAmount || 0,
        pensionStartAge: currentExcel?.pensionStartAge || getPensionStartAge(Number(insuranceAge), paymentPeriod),
        totalUntil100: currentExcel?.totalUntil100 || 0,
        templateId: "UB_8705", // 고객용 연금액 계산 결과 전송용 템플릿 (요청에 따라 고정)
        adminTemplateId: "UA_8331" // 관리자용 연금액 계산 결과 전송용 템플릿
      };
      
      console.log("[CLIENT] API 요청 데이터:", requestData);
      
      const res = await request.post("/api/verifyOTP", requestData);
      if (res.data.success) {
        // 방문자 추적: 보험료 확인
        try {
          await trackSimplifiedVisitor({
            phone,
            name,
            counsel_type_id: 1 // 보험료 확인
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
    setExcelResult(null);
    if (numbers.length === 8) {
      // 생년월일 8자리 입력 시 연락처로 이동
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
    // 연령(0~68) 외는 OTP 전송 차단
    const ageForOtp = insuranceAge !== '' ? Number(insuranceAge) : NaN;
    if (isNaN(ageForOtp) || ageForOtp < 0 || ageForOtp > 68) return;
    setOtpTimer(180); // 3분
    setOtpResendAvailable(false);
    await handlePostOTP(); // 인증번호 전송 및 otpSent true 처리
    // 전송 후 인증번호 입력으로 포커스 이동
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
    // 입력 재계산 시 이전 엑셀 결과 잔존 방지
    setExcelResult(null);
  };

  // 입력값 변경 시 인증상태 초기화
  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
    setIsVerified(false);
    setExcelResult(null);
    // 성별 선택 후 이름으로 포커스 이동
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsVerified(false);
    setExcelResult(null);
  };
  const handlePaymentPeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentPeriod(e.target.value);
    setIsVerified(false);
    setExcelResult(null);
  };
  const handlePaymentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentAmount(e.target.value);
    setIsVerified(false);
    setExcelResult(null);
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

  // Supabase에 사용자 생성 및 상담 기록 저장
  const saveToSupabase = async (counselType: number) => {
    try {
      // 1. 사용자 생성 또는 조회
      let userId: number;
      
      // 기존 사용자 조회
      const { data: existingUser, error: userError } = await supabase
        .from('user')
        .select('id')
        .eq('phone', phone)
        .single();
      
      if (existingUser) {
        userId = existingUser.id;
        console.log('기존 사용자 발견:', userId);
      } else {
        // 새 사용자 생성
        const { data: newUser, error: createError } = await supabase
          .from('user')
          .insert({
            name,
            phone,
            birth,
            gender
          })
          .select('id')
          .single();
        
        if (createError) {
          console.error('사용자 생성 오류:', createError);
          return;
        }
        
        userId = newUser.id;
        console.log('새 사용자 생성:', userId);
      }
      
      // 2. 상담 기록 생성
      const { data: counselRecord, error: counselError } = await supabase
        .from('counsel')
        .insert({
          user_id: userId,
          company_id: INSURANCE_COMPANY_ID,
          product_id: INSURANCE_PRODUCT_ID,
          counsel_type_id: counselType
        })
        .select()
        .single();
      
      if (counselError) {
        console.error('상담 기록 생성 오류:', counselError);
        return;
      }
      
      console.log('상담 기록 생성 완료:', counselRecord);
      return { userId, counselId: counselRecord.id };
      
    } catch (error) {
      console.error('Supabase 저장 오류:', error);
    }
  };

  // MCP를 사용한 데이터 조회 함수들
  const handleQueryUsers = async () => {
    try {
      const result = await queryUsers(10);
      console.log('MCP 사용자 조회 결과:', result);
      alert(`사용자 조회 완료: ${JSON.stringify(result, null, 2)}`);
    } catch (error) {
      console.error('MCP 사용자 조회 오류:', error);
      alert('사용자 조회에 실패했습니다.');
    }
  };

  const handleQueryCounsel = async () => {
    try {
      const result = await queryCounsel(10);
      console.log('MCP 상담 조회 결과:', result);
      alert(`상담 조회 완료: ${JSON.stringify(result, null, 2)}`);
    } catch (error) {
      console.error('MCP 상담 조회 오류:', error);
      alert('상담 조회에 실패했습니다.');
    }
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
      let pensionAmounts = { monthly: 0, performance: 0 } as any;
      if (paymentPeriod && paymentAmount) {
        pensionAmounts = calculatePensionAmount(Number(insuranceAge), paymentPeriod, paymentAmount);
      }
      const payload = {
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
        monthlyPension: pensionAmounts.monthly, // 월 연금액
        performancePension: pensionAmounts.performance, // 실적배당 연금액
        templateId: "UB_8715", // 고객용 상담신청 완료 전송용 템플릿
        adminTemplateId: "UA_8332" // 관리자용 상담신청 접수 전송용 템플릿
      };
      console.log('[IBK][CONSULT] verifyOTP payload', payload);
      
      const res = await request.post("/api/verifyOTP", payload);
      if (res.data.success) {
        // Supabase에 데이터 저장
        const supabaseResult = await saveToSupabase(2); // 2: 상담신청
        
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
  // 연령 적합성 (0~68세)
  const isAgeKnown = insuranceAge !== '';
  const numericInsuranceAge = isAgeKnown ? Number(insuranceAge) : NaN;
  const isAgeEligible = isAgeKnown && numericInsuranceAge >= 0 && numericInsuranceAge <= 68;

  // 엑셀 적격성 조회: 성별/연령 입력 시 호출
  useEffect(() => {
    const fetchEligibility = async () => {
      if (!gender || !isAgeEligible) {
        setEligibility({});
        return;
      }
      try {
        const resp = await fetch('/api/calculate-pension/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerName: name || '-',
            gender,
            age: Number(insuranceAge),
            paymentPeriod: 10, // dummy
            monthlyPayment: 300000, // 적격성 모드에서는 30만원 시트를 기준으로 판정
            productType: 'ibk-lifetime',
            mode: 'eligibility'
          })
        });
        if (!resp.ok) {
          setEligibility({});
          return;
        }
        const data = await resp.json();
        if (data.success && data.eligibility) {
          setEligibility(data.eligibility);
        } else {
          setEligibility({});
        }
      } catch (e) {
        setEligibility({});
      }
    };
    fetchEligibility();
  }, [gender, insuranceAge, isAgeEligible, name]);

  // 연금개시연령 계산 함수 (정확한 로직)
  const getPensionStartAge = (age: number, paymentPeriod: string) => {
    // 납입기간에서 년수 추출
    const years = parseInt(paymentPeriod.replace(/[^0-9]/g, ''));
    
    // 고객 연령 + 납입기간 = 납입완료 시점
    const completionAge = age + years;
    
    // 최소 연금개시연령 (65세, 70세, 75세, 80세 중 선택)
    let minStartAge = 65;
    if (completionAge >= 80) minStartAge = 80;
    else if (completionAge >= 75) minStartAge = 75;
    else if (completionAge >= 70) minStartAge = 70;
    else if (completionAge >= 65) minStartAge = 65;
    
    // 최종 연금개시연령: 납입완료 시점과 최소 연금개시연령 중 더 늦은 시점
    return Math.max(completionAge, minStartAge);
  };

  // 현재 선택된 납입기간에 대한 연금개시연령 (우선순위: Excel > 계산식)
  const currentPensionStartAge = paymentPeriod
    ? (excelResult && typeof excelResult.pensionStartAge === 'number' && excelResult.pensionStartAge > 0
        ? excelResult.pensionStartAge
        : getPensionStartAge(Number(insuranceAge), paymentPeriod))
    : null;

  // 입력 완료 시(성별/생년월일/납입기간/월납입) Excel 기반 연금개시연령을 선반영
  useEffect(() => {
    let canceled = false;
    const prefetchExcel = async () => {
      if (!gender || !/^\d{8}$/.test(birth) || !paymentPeriod || !paymentAmount) return;
      const age = Number(getInsuranceAge(birth));
      if (isNaN(age)) return;
      try {
        // 월 납입액 계산 (만원 처리)
        let monthlyPayment = 0;
        if (paymentAmount.includes('만원')) {
          const num = parseInt(paymentAmount.replace(/[^0-9]/g, ''));
          monthlyPayment = isNaN(num) ? 0 : num * 10000;
        } else {
          monthlyPayment = parseInt(paymentAmount.replace(/[^0-9]/g, '')) || 0;
        }
        const years = parseInt(paymentPeriod.replace(/[^0-9]/g, '')) || 0;
        if (age < 0 || age > 68 || years <= 0 || monthlyPayment <= 0) return;

        const resp = await fetch('/api/calculate-pension/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerName: name,
            gender,
            age,
            paymentPeriod: years,
            monthlyPayment,
            productType: 'ibk-lifetime'
          })
        });
        if (!resp.ok) return;
        const data = await resp.json();
        if (!canceled && data?.success && data?.data?.pensionStartAge) {
          setExcelResult(prev => ({
            pensionStartAge: data.data.pensionStartAge || 0,
            monthlyPension: data.data.monthlyPension || 0,
            performancePension: data.data.performancePension || 0,
            guaranteedAmount: data.data.guaranteedAmount || 0,
            totalUntil100: data.data.totalUntil100 || 0,
            notice: data.data.notice || ''
          }));
        }
      } catch (e) {
        // ignore
      }
    };
    prefetchExcel();
    return () => { canceled = true; };
  }, [gender, birth, paymentPeriod, paymentAmount]);

  // 납입기간 버튼 비활성화 여부 확인 (연금개시연령이 80세를 초과하는 경우)
  const ageLimit10 = Number(insuranceAge) + 10 > 80;
  const ageLimit15 = Number(insuranceAge) + 15 > 80;
  const ageLimit20 = Number(insuranceAge) + 20 > 80;

  // 연금액 계산 함수 (변액연금용 - 실적배당 포함)
  const calculatePensionAmount = (age: number, paymentPeriod: string, paymentAmount: string): { monthly: number; performance: number; totalUntil100: number } => {
    if (!age || !paymentPeriod || !paymentAmount) return { monthly: 0, performance: 0, totalUntil100: 0 };
    
    // 월 납입액 계산 (만원 단위 처리)
    let monthlyPayment = 0;
    if (paymentAmount.includes('만원')) {
      const num = parseInt(paymentAmount.replace(/[^0-9]/g, ''));
      monthlyPayment = num * 10000; // 만원을 원으로 변환
    } else {
      monthlyPayment = parseInt(paymentAmount.replace(/[^0-9]/g, ''));
    }
    
    const paymentYears = parseInt(paymentPeriod.replace(/[^0-9]/g, ''));
    const pensionStartAge = getPensionStartAge(age, paymentPeriod);
    
    if (!pensionStartAge) return { monthly: 0, performance: 0, totalUntil100: 0 };
    
    // 총 납입액
    const totalPayment = monthlyPayment * 12 * paymentYears;
    
    // 20년간 7% 단리 이자 계산 (복리 4.32% 환산 - 변액연금은 약간 높음)
    const simpleInterest = totalPayment * 0.07 * 20;
    const compoundRate = 0.0432; // 복리 4.32%
    
    // 복리로 환산된 총액
    const compoundTotal = totalPayment * Math.pow(1 + compoundRate, 20);
    
    // 연금개시연령에 따른 연금 지급기간 (남성 기준)
    const lifeExpectancy = 82; // 남성 평균수명
    const pensionYears = Math.max(1, lifeExpectancy - pensionStartAge);
    
    // 월 연금액 계산 (총액을 연금 지급기간으로 나누고 12로 나눔)
    const monthlyPension = Math.round(compoundTotal / pensionYears / 12);
    
    // 실적배당 연금액 (기본 연금액 + 실적배당)
    const performanceBonus = Math.round(monthlyPension * 0.15); // 15% 실적배당 가정
    const performancePension = monthlyPension + performanceBonus;
    
    // 100세까지 생존 시 총 받는 금액
    const totalPensionUntil100 = monthlyPension * 12 * (100 - pensionStartAge);
    
    return {
      monthly: monthlyPension,
      performance: performancePension,
      totalUntil100: totalPensionUntil100
    };
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
  
  // 연금액 계산
  const pensionAmounts = {
    monthly: excelResult?.monthlyPension || 0,
    performance: excelResult?.performancePension || 0,
    totalUntil100: excelResult?.totalUntil100 || 0
  };
  const guaranteedAmount = excelResult?.guaranteedAmount || (pensionAmounts.monthly ? pensionAmounts.monthly * 12 * 20 : 0);

  return (
    <>
      <section
        className="w-full bg-[#1e293b] py-6 md:py-10 lg:py-3"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 2px, transparent 2px)',
          backgroundSize: '20px 20px',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-col lg:flex-row items-center md:items-center lg:items-start justify-center lg:justify-between gap-4 md:gap-8 lg:gap-12 px-4 md:px-6 lg:px-4 md:py-4 lg:py-4">
          {/* 왼쪽: 간단한 슬로건 디자인 */}
          <div className="flex-1 flex flex-col items-center md:items-center lg:items-start text-center md:text-center lg:text-left">
            {/* 메인 슬로건 */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 lg:mb-4 leading-tight">
              20년까지 연단리 8%!<br />
              보증되는 변액연금보험!
            </h1>
            
            {/* 간단한 특징 설명 */}
            <ul className="mb-6 sm:mb-8 md:mb-10 lg:mb-8 space-y-1.5 sm:space-y-2 md:space-y-3 lg:space-y-2">
              <li className="flex items-center text-base sm:text-lg md:text-xl lg:text-lg text-white justify-center md:justify-center lg:justify-start">
                <span className="text-lg sm:text-xl md:text-2xl lg:text-xl mr-1.5 sm:mr-2 md:mr-3 lg:mr-2 text-[#ffd700]">✔</span>
                최대 20년동안 연단리 8%!
              </li>
              <li className="flex items-center text-base sm:text-lg md:text-xl lg:text-lg text-white justify-center md:justify-center lg:justify-start">
                <span className="text-lg sm:text-xl md:text-2xl lg:text-xl mr-1.5 sm:mr-2 md:mr-3 lg:mr-2 text-[#ffd700]">✔</span>
                가입 0~68세 / 연금개시 30~80세
              </li>
              <li className="flex items-center text-base sm:text-lg md:text-xl lg:text-lg text-white justify-center md:justify-center lg:justify-start">
                <span className="text-lg sm:text-xl md:text-2xl lg:text-xl mr-1.5 sm:mr-2 md:mr-3 lg:mr-2 text-[#ffd700]">✔</span>
                실적배당 종신연금 보증지급
              </li>
              <li className="flex items-center text-base sm:text-lg md:text-xl lg:text-lg text-white justify-center md:justify-center lg:justify-start">
                <span className="text-lg sm:text-xl md:text-2xl lg:text-xl mr-1.5 sm:mr-2 md:mr-3 lg:mr-2 text-[#ffd700]">✔</span>
                최저사망계약자적립액 보증
              </li>
            </ul>
            
            {/* 간단한 보증 내용 박스 */}
            <div className="w-full max-w-full md:max-w-4xl mx-auto bg-white rounded-xl shadow-md mb-3 sm:mb-4 md:mb-6 p-3 sm:p-6 md:p-8 lg:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 lg:gap-4">
                {/* 1. 높은 보증이율 */}
                <div className="text-center p-3 md:p-4 lg:p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden">
                  {/* 유리 반사 효과 1 */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent transform -skew-x-12 -translate-x-full pointer-events-none"
                    style={{
                      animation: 'shine1 4s ease-in-out infinite'
                    }}
                  ></div>
                  
                  <div className="relative z-10">
                    <div className="inline-block bg-gradient-to-r from-orange-600 to-orange-700 text-white text-sm font-bold px-4 py-2 rounded-full mb-3 shadow-md">높은 보증이율</div>
                  </div>
                  <div className="flex items-center justify-center mb-2 relative z-10">
                    <div className="text-xs text-gray-700 mr-3 font-semibold leading-tight">
                      최대<br />연단리
                    </div>
                    <div className="text-3xl md:text-4xl font-extrabold text-orange-600 animate-[jump-glow_1.2s_ease-in-out_infinite]">8%</div>
                  </div>
                  <div className="text-xs text-gray-600 leading-tight bg-white/50 rounded-lg p-2 relative z-10">
                    20년까지 연단리 8%<br />이후 5% 보증
                  </div>
                </div>

                {/* 2. 무심사 가입 */}
                <div className="text-center p-3 md:p-4 lg:p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-xl shadow-lg border border-green-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden">
                  {/* 유리 반사 효과 2 */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent transform -skew-x-12 -translate-x-full pointer-events-none"
                    style={{
                      animation: 'shine2 4s ease-in-out infinite'
                    }}
                  ></div>
                  
                  <div className="relative z-10">
                    <div className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white text-sm font-bold px-4 py-2 rounded-full mb-3 shadow-md">무심사 가입</div>
                  </div>
                  <div className="flex-1 flex items-center justify-center relative z-10">
                    <div className="text-xs text-gray-700 leading-tight font-medium">
                      질병여부 상관없이<br />무진단·무심사
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 leading-tight bg-white/50 rounded-lg p-2 relative z-10">
                    당뇨, 암, 고혈압 등<br />가입제한 없음
                  </div>
                </div>

                {/* 3. 조기연금개시 */}
                <div className="text-center p-3 md:p-4 lg:p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden">
                  {/* 유리 반사 효과 3 */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent transform -skew-x-12 -translate-x-full pointer-events-none"
                    style={{
                      animation: 'shine3 4s ease-in-out infinite'
                    }}
                  ></div>
                  
                  <div className="relative z-10">
                    <div className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-bold px-4 py-2 rounded-full mb-3 shadow-md">조기연금개시</div>
                  </div>
                  <div className="flex-1 flex items-center justify-center relative z-10">
                    <div className="text-xs text-gray-700 leading-tight font-medium">
                      30세부터<br />연금개시 가능
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 leading-tight bg-white/50 rounded-lg p-2 relative z-10">
                    미보증형은<br />45세부터 가능
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 text-center mt-4">
                <p>※ 대표계약기준(40세, 10년납, 65세 연금개시), 복리이자율로 환산시 연복리 4.5%</p>
              </div>
              
              {/* CSS 애니메이션 스타일 */}
              <style jsx>{`
                @keyframes shine1 {
                  0% { transform: translateX(-100%) skewX(-12deg); }
                  25% { transform: translateX(100%) skewX(-12deg); }
                  100% { transform: translateX(100%) skewX(-12deg); }
                }
                
                @keyframes shine2 {
                  0% { transform: translateX(-100%) skewX(-12deg); }
                  25% { transform: translateX(100%) skewX(-12deg); }
                  100% { transform: translateX(100%) skewX(-12deg); }
                }
                
                @keyframes shine3 {
                  0% { transform: translateX(-100%) skewX(-12deg); }
                  25% { transform: translateX(100%) skewX(-12deg); }
                  100% { transform: translateX(100%) skewX(-12deg); }
                }
                
                /* 1→2→3 순서로 이어지는 효과 */
                .shine2 {
                  animation-delay: 1.33s;
                }
                
                .shine3 {
                  animation-delay: 2.66s;
                }
              `}</style>
            </div>
          </div>
          {/* 오른쪽: 보험료 확인 카드 */}
          <div className="flex-1 flex justify-center lg:justify-end w-full lg:ml-8 lg:self-center">
            <div id="calculator-box" className="w-full max-w-md sm:max-w-lg bg-white rounded-3xl border-2 border-[#3a8094] shadow-xl p-6 sm:p-6 md:p-8 lg:p-8 relative flex flex-col">
              {/* 새로운 헤더 디자인 */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#3a8094] flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
                  </svg>
                  연금액 계산하기
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">간단한 정보 입력으로 예상 연금액을 확인하세요</p>
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
                      {['10년', '15년', '20년'].map((period) => (
                        <label key={period} className="relative flex items-center justify-center cursor-pointer">
                          {/* 추천 배지 */}
                          {period === '10년' && (
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
                  <button
                    type="submit"
                    className="w-full bg-[#3a8094] text-white font-bold rounded-xl py-3 sm:py-4 text-base sm:text-lg hover:opacity-90 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                  <CalculatorIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  연금액 확인하기
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
              이 상품은 0세~68세까지만 가입 가능합니다. 현재 보험연령 {numericInsuranceAge}세는 가입 대상이 아닙니다.
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
                    <span className="font-bold text-[#3a8094]">IBK연금보험</span>
                  </div>
                </div>
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>상품명</span>
                    <span className="font-bold text-[#3a8094]">IBK연금액 평생보증받는변액연금보험</span>
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
                      <span className="text-[#7c3aed]">{currentPensionStartAge || '-'}</span>{' '}<span className="text-[#3a8094]">세</span>
                    </span>
                  </div>
                </div>
                {/* 월 연금액 */}
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>월 연금액</span>
                    <span className="font-bold">
                      <span className="text-[#3b82f6]">{isVerified ? `약 ${pensionAmounts.monthly.toLocaleString('en-US')}` : "인증 후 확인가능"}</span>
                      {isVerified && <span className="text-[#3a8094]"> 원</span>}
                    </span>
                  </div>
                </div>
                {/* 20년 보증기간 연금액 */}
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>20년 보증기간 연금액</span>
                    <span className="font-bold">
                      <span className="text-[#ef4444]">{isVerified ? `약 ${guaranteedAmount.toLocaleString('en-US')}` : "인증 후 확인가능"}</span>
                      {isVerified && <span className="text-[#3a8094]"> 원</span>}
                    </span>
                  </div>
                </div>
                {/* 100세까지 생존 시 총 받는 금액 */}
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>100세까지 생존 시 총 받는 금액</span>
                    <span className="font-bold">
                      <span className="text-[#10b981]">{isVerified ? `약 ${pensionAmounts.totalUntil100?.toLocaleString('en-US')}` : "인증 후 확인가능"}</span>
                      {isVerified && <span className="text-[#3a8094]"> 원</span>}
                    </span>
                  </div>
                </div>
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
                    <span className="font-bold text-[#3a8094]">{isVerified ? "IBK연금보험" : "인증 후 확인가능"}</span>
                  </div>
                </div>
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>상품명</span>
                    <span className="font-bold text-[#3a8094]">{isVerified ? "더!행복드림변액연금보험" : "인증 후 확인가능"}</span>
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
                    <span className="font-bold"><span className="text-[#ef4444]">인증 후 확인가능</span></span>
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
                <div className="text-xs text-gray-500 text-center mt-4">
                  * 실제 연금액은 가입시점 및 고객 정보에 따라 달라질 수 있습니다.
                  <div className="mt-0.5 text-[#3a8094]">* 휴대폰 인증 완료 후 상세 정보를 확인하실 수 있습니다.</div>
                </div>
              </div>
              {/* 휴대폰 인증 안내 및 인증번호 입력란을 항상 노출 */}
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
                  disabled={!isAgeEligible || verifying}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-md text-base sm:text-lg font-semibold transition-colors mt-1 sm:mt-2 ${(!isAgeEligible || verifying) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#3a8094] text-white hover:bg-[#2c6070]'}`}
                >
                  {verifying ? '인증 처리중...' : '예상연금액 확인하기'}
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

