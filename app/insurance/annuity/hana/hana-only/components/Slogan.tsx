import React, { useState, useEffect, useRef } from 'react'
import { CalculatorIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import Modal from '@/app/components/Modal';
import request from '@/app/api/request';
import { supabase } from '@/app/api/supabase';
import { queryUsers, createUser, queryCounsel, createCounsel } from '@/app/utils/mcpClient';
import { getProductConfigByPath, getTemplateIdByPath } from '@/app/constants/insurance';
import { calculateAnnuityStartAge } from '@/app/utils/annuityCalculator';
import FireworksEffect from '@/app/components/shared/FireworksEffect';
import { trackSimplifiedVisitor } from "@/app/utils/visitorTracking";

// 현재 경로에 맞는 상품 정보 가져오기
const currentPath = '/insurance/annuity/hana/hana-only';
const productConfig = getProductConfigByPath(currentPath);

const INSURANCE_COMPANY_ID = 6; // 하나생명
const INSURANCE_PRODUCT_ID = 14; // 하나생명 하나온리 연금보험

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
  const [otpSent, setOtpSent] = useState(false)
  const [otpCode, setOtpCode] = useState("")
  const [verifying, setVerifying] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
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
  const [consultType, setConsultType] = useState('(무)하나뿐인 변액연금보험');
  const [consultTime, setConsultTime] = useState('아무때나');
  const consultTypeOptions = ['(무)하나뿐인 변액연금보험'];
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
        companyName: "하나생명",
        productName: "(무)하나뿐인 변액연금보험"
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
        monthlyPension: excelResult?.monthlyPension || 0, // 월 연금액
        performancePension: excelResult?.performancePension || 0, // 실적배당 연금액
        guaranteedPension: excelResult?.guaranteedAmount || 0, // 20년 보증기간 총액
        pensionStartAge: excelResult?.pensionStartAge || getPensionStartAge(Number(insuranceAge), paymentPeriod), // 연금개시연령
        totalUntil100: excelResult?.totalUntil100 || 0, // 100세까지 총 수령액
        templateId: "UB_8715", // 고객용 상담신청 완료 전송용 템플릿
        adminTemplateId: "UA_8332" // 관리자용 상담신청 접수 전송용 템플릿
      };
      console.log('[IBK][CONSULT] verifyOTP payload', payload);

      const res = await request.post("/api/verifyOTP", payload);
      if (res.data.success) {
        // Supabase에 데이터 저장
        const supabaseResult = await saveToSupabase(2); // 2: 상담신청

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
  }

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

  // 연금개시연령 계산 함수 (IBK연금 규칙)
  const getPensionStartAge = (age: number, paymentPeriod: string) => {
    // 납입기간에서 년수 추출
    const years = parseInt(paymentPeriod.replace(/[^0-9]/g, ''));

    // 0~40세
    if (age >= 0 && age <= 40) {
      if (years === 10 || years === 15 || years === 20) return 65;
    }

    // 41~45세
    if (age >= 41 && age <= 45) {
      if (years === 10 || years === 15 || years === 20) return 70;
    }

    // 46~50세
    if (age >= 46 && age <= 50) {
      if (years === 10 || years === 15) return 70;
      if (years === 20) return 75;
    }

    // 51~55세
    if (age >= 51 && age <= 55) {
      if (years === 10) return 70;
      if (years === 15) return 75;
      if (years === 20) return 80;
    }

    // 56~60세
    if (age >= 56 && age <= 60) {
      if (years === 10) return 75;
      if (years === 15) return 80;
    }

    // 61~65세
    if (age >= 61 && age <= 65) {
      if (years === 10) return 80;
    }

    // 66~68세
    if (age >= 66 && age <= 68) {
      if (years === 7) return 80;
    }

    // 기본값 (매칭되지 않는 경우)
    return 65;
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

  // 납입기간 선택 가능 여부 (연령별 제한)
  const getAvailablePaymentPeriods = (age: number): string[] => {
    if (age >= 0 && age <= 55) {
      return ['10년', '12년', '15년', '20년'];
    } else if (age >= 56 && age <= 60) {
      return ['10년', '12년', '15년'];
    } else if (age >= 61 && age <= 65) {
      return ['10년', '12년'];
    } else if (age >= 66 && age <= 68) {
      return ['7년']; // 7년납 자동 적용
    }
    return [];
  };

  const availablePaymentPeriods = isAgeKnown ? getAvailablePaymentPeriods(Number(insuranceAge)) : [];

  // 66~68세는 7년납 자동 적용
  useEffect(() => {
    if (isAgeKnown && Number(insuranceAge) >= 66 && Number(insuranceAge) <= 68) {
      if (paymentPeriod !== '7년') {
        setPaymentPeriod('7년');
      }
    }
  }, [insuranceAge, isAgeKnown]);

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
        className="w-full py-6 md:py-10 lg:py-3"
        style={{
          background: 'linear-gradient(to bottom right, #006b54, #008c73)',
          backgroundImage: 'linear-gradient(to bottom right, #006b54, #008c73), radial-gradient(rgba(255,255,255,0.08) 2px, transparent 2px)',
          backgroundSize: 'auto, 20px 20px',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-col lg:flex-row items-center md:items-center lg:items-start justify-center lg:justify-between gap-4 md:gap-8 lg:gap-12 px-4 md:px-6 lg:px-4 md:py-4 lg:py-4">
          {/* 왼쪽: 간단한 슬로건 디자인 */}
          <div className="flex-1 flex flex-col items-center md:items-center lg:items-start text-center md:text-center lg:text-left">
            {/* 하나생명 로고 */}
            <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-4 flex items-center gap-3">
              <div className="bg-white/90 px-4 py-2 rounded-lg shadow-md backdrop-blur-sm">
                <img src="/hana-logo.png" alt="하나생명" className="h-6 sm:h-8 md:h-10 lg:h-8 w-auto" />
              </div>
              <span className="text-white text-sm sm:text-base md:text-lg font-bold" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>하나생명</span>
            </div>

            {/* 메인 슬로건 */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 lg:mb-4 leading-tight">
              (무)하나뿐인 변액연금보험
            </h1>

            {/* 원금 손실 경고 문구 */}
            <p className="text-xs sm:text-sm text-red-300 mb-3 sm:mb-4 text-center md:text-center lg:text-left">
              ※ 원금 손실이 발생할 수 있는 상품입니다
            </p>

            {/* 간단한 특징 설명 */}
            <ul className="mb-1 space-y-1 sm:space-y-1.5 md:space-y-2.5 lg:space-y-2">
              <li className="flex items-center text-sm sm:text-base md:text-lg lg:text-lg text-white justify-center md:justify-center lg:justify-start">
                <span className="text-sm sm:text-base md:text-lg lg:text-xl mr-1 sm:mr-1.5 md:mr-2.5 lg:mr-2 text-[#ffd700] flex-shrink-0">✔</span>
                <span>최대 <span className="text-[#ffd700] font-bold">연단리 7%</span> 보증이율 적용</span>
              </li>
              <li className="flex items-center text-sm sm:text-base md:text-lg lg:text-lg text-white justify-center md:justify-center lg:justify-start">
                <span className="text-sm sm:text-base md:text-lg lg:text-xl mr-1 sm:mr-1.5 md:mr-2.5 lg:mr-2 text-[#ffd700] flex-shrink-0">✔</span>
                <span><span className="text-[#a7f3d0] font-bold">최저사망적립액</span> 및 <span className="text-[#a7f3d0] font-bold">최저연금지급액</span> 보증</span>
              </li>
              <li className="flex items-center text-sm sm:text-base md:text-lg lg:text-lg text-white justify-center md:justify-center lg:justify-start">
                <span className="text-sm sm:text-base md:text-lg lg:text-xl mr-1 sm:mr-1.5 md:mr-2.5 lg:mr-2 text-[#ffd700] flex-shrink-0">✔</span>
                <span>가입나이 <span className="text-[#7dd3fc] font-bold">0~68세</span> / 연금개시 <span className="text-[#7dd3fc] font-bold">30~85세</span></span>
              </li>
              <li className="flex items-center text-sm sm:text-base md:text-lg lg:text-lg text-white justify-center md:justify-center lg:justify-start">
                <span className="text-sm sm:text-base md:text-lg lg:text-xl mr-1 sm:mr-1.5 md:mr-2.5 lg:mr-2 text-[#ffd700] flex-shrink-0">✔</span>
                <span>월납 <span className="text-[#c4b5fd] font-bold">20만원</span>부터 가입 가능</span>
              </li>
            </ul>

            {/* 간단한 보증 내용 박스 */}
            <div className="w-full max-w-2xl lg:max-w-3xl mx-auto bg-white rounded-xl shadow-lg mt-4 sm:mt-5 md:mt-6 mb-3 sm:mb-4 p-4 sm:p-5 md:p-6 lg:p-4 px-4 sm:px-5 md:px-6 lg:px-4 pt-5 sm:pt-6 md:pt-7 lg:pt-6 pb-5 sm:pb-6 md:pb-7 lg:pb-6">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-4 mb-2 sm:mb-3">
                {/* 1. 보증이율 */}
                <div className="text-center p-3 sm:p-4 md:p-5 bg-white rounded-xl shadow-sm border-2 border-gray-100 hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between min-h-[140px] sm:min-h-[160px] md:min-h-[180px]">
                  <div className="mb-2">
                    <div className="inline-block bg-emerald-50 text-emerald-700 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg mb-2">보증이율</div>
                  </div>
                  <div className="flex items-center justify-center mb-3">
                    <div className="text-xs sm:text-sm text-gray-600 mr-2 font-semibold leading-tight">
                      최대<br />연단리
                    </div>
                    <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-600" style={{ animation: 'jump-simple 1.2s ease-in-out infinite' }}>7%</div>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 leading-tight">
                    25년이상 연단리 7% 보증
                  </div>
                </div>

                {/* 2. 최저보증 */}
                <div className="text-center p-3 sm:p-4 md:p-5 bg-white rounded-xl shadow-sm border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 flex flex-col justify-between min-h-[140px] sm:min-h-[160px] md:min-h-[180px]">
                  <div className="mb-2">
                    <div className="inline-block bg-blue-50 text-blue-700 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg mb-2">최저보증</div>
                  </div>
                  <div className="flex-1 flex items-center justify-center mb-3">
                    <div className="text-sm sm:text-base text-gray-700 leading-tight font-semibold">
                      최저사망적립액<br />최저연금지급액
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 leading-tight">
                    사망·연금 모두 최저금액 보증
                  </div>
                </div>

              </div>
              <div className="text-xs text-gray-700 text-center mt-4">
                <div className="font-semibold mb-2">보증이율(연단리) 예시표</div>
                <table className="w-full text-[10px] sm:text-xs">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-1 sm:p-1.5">연금개시전 보험기간</th>
                      <th className="border border-gray-300 p-1 sm:p-1.5">15년이상~<br />20년미만</th>
                      <th className="border border-gray-300 p-1 sm:p-1.5">20년이상~<br />25년미만</th>
                      <th className="border border-gray-300 p-1 sm:p-1.5">25년이상</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-1 sm:p-1.5 font-semibold">보증이율</td>
                      <td className="border border-gray-300 p-1 sm:p-1.5 text-emerald-600 font-bold">5%</td>
                      <td className="border border-gray-300 p-1 sm:p-1.5 text-emerald-600 font-bold">6%</td>
                      <td className="border border-gray-300 p-1 sm:p-1.5 text-emerald-600 font-bold">7%</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-2 text-[9px] sm:text-[10px] text-gray-600">※ 연복리 환산시 보증이율은 연단리 보증이율과 다르며, 가입조건별 상이합니다.</p>
              </div>

              {/* CSS 애니메이션 스타일 */}
              <style jsx>{`
                @keyframes jump-simple {
                  0%, 100% { transform: translateY(0) scale(1); }
                  50% { transform: translateY(-8px) scale(1.05); }
                }
                
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
            <div id="calculator-box" className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-2xl p-5 sm:p-6 md:p-7 relative flex flex-col">
              <div className="mb-5 sm:mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#00a884] to-[#008c73] rounded-lg flex items-center justify-center">
                    <CalculatorIcon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">연금액 계산하기</h3>
                </div>
                <p className="text-gray-700 text-xs sm:text-sm ml-10">간단한 정보 입력으로 예상 연금액을 확인하세요</p>
              </div>
              <form className="flex flex-col gap-3 sm:gap-4" onSubmit={handleInsuranceCostCalculate}>
                {/* 성별/이름 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">성별</label>
                    <div className="flex gap-2">
                      <label className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border-2 cursor-pointer transition-all ${gender === "M" ? 'border-[#00a884] bg-[#00a884]/5 text-[#00a884]' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" name="gender" value="M" checked={gender === "M"} onChange={handleGenderChange} className="sr-only" />
                        <span className="text-sm font-medium">남자</span>
                      </label>
                      <label className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border-2 cursor-pointer transition-all ${gender === "F" ? 'border-[#00a884] bg-[#00a884]/5 text-[#00a884]' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" name="gender" value="F" checked={gender === "F"} onChange={handleGenderChange} className="sr-only" />
                        <span className="text-sm font-medium">여자</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">이름</label>
                    <input type="text" inputMode="text" ref={nameInputRef} value={name} onChange={handleNameChange} onFocus={handleInputFocus} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); birthInputRef.current?.focus(); } }} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition-all" placeholder="홍길동" />
                  </div>
                </div>

                {/* 생년월일/연락처 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">생년월일</label>
                    <input type="text" inputMode="numeric" pattern="[0-9]*" ref={birthInputRef} value={birth} onChange={handleBirthChange} onFocus={handleInputFocus} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition-all" placeholder="19880818" maxLength={8} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">연락처</label>
                    <input type="text" inputMode="numeric" pattern="[0-9]*" ref={phoneInputRef} value={phone} onChange={handlePhoneChange} onFocus={handleInputFocus} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition-all" placeholder="01012345678" />
                  </div>
                </div>

                {/* 69세 이상 안내 */}
                {isAgeKnown && Number(insuranceAge) > 68 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                    <p className="text-sm text-red-700 font-medium">이 상품은 68세까지 가입 가능합니다.</p>
                  </div>
                )}

                {/* 납입기간 */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">납입기간</label>
                  {isAgeKnown && Number(insuranceAge) >= 66 && Number(insuranceAge) <= 68 ? (
                    // 66~68세: 7년납 자동 적용
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-3">
                        <div className="w-full text-center py-2.5 text-sm border-2 border-[#00a884] bg-[#00a884]/5 text-[#00a884] font-bold rounded-lg">
                          7년
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['10년', '12년', '15년', '20년'].map((period) => {
                        // 생년월일 입력 전에는 모두 활성화, 입력 후에는 연령별 제한 적용
                        const isAvailable = !isAgeKnown || availablePaymentPeriods.includes(period);
                        return (
                          <label key={period} className={`relative ${isAvailable ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                            {period === '10년' && isAvailable && (
                              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#00a884] to-[#008c73] text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-lg z-10 animate-bounce">추천</span>
                            )}
                            <input
                              type="radio"
                              name="paymentPeriod"
                              value={period}
                              checked={paymentPeriod === period}
                              onChange={handlePaymentPeriodChange}
                              disabled={!isAvailable}
                              className="peer sr-only"
                            />
                            <div className={`w-full text-center py-2.5 text-sm border-2 rounded-lg transition-all ${!isAvailable
                              ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                              : paymentPeriod === period
                                ? 'border-[#00a884] bg-[#00a884]/5 text-[#00a884] font-bold'
                                : 'border-gray-200 hover:border-gray-300'
                              }`}>
                              {period}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 월 납입금액 */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">월 납입금액</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['30만원', '50만원', '70만원', '100만원', '130만원', '150만원'].map((amount) => (
                      <label key={amount} className="cursor-pointer">
                        <input type="radio" name="paymentAmount" value={amount} checked={paymentAmount === amount} onChange={handlePaymentAmountChange} className="peer sr-only" />
                        <div className={`w-full text-center py-2.5 text-sm border-2 rounded-lg transition-all ${paymentAmount === amount ? 'border-[#00a884] bg-[#00a884]/5 text-[#00a884] font-bold' : 'border-gray-200 hover:border-gray-300'}`}>
                          {amount}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 개인정보 동의 */}
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} className="w-4 h-4 text-[#00a884] rounded border-gray-300 cursor-pointer focus:ring-[#00a884]" />
                  <span className="text-xs text-gray-600">
                    개인정보 수집 및 이용에 동의합니다.
                    <button type="button" onClick={onOpenPrivacy} className="text-[#00a884] underline ml-1 hover:text-[#008c73]">자세히 보기</button>
                  </span>
                </div>

                {/* 버튼들 */}
                <div className="flex flex-col gap-2 mt-1">
                  <button type="submit" className="w-full bg-gradient-to-r from-[#00a884] to-[#008c73] text-white font-bold rounded-xl py-3.5 text-base hover:opacity-95 transition flex items-center justify-center gap-2 shadow-lg shadow-[#00a884]/25 cursor-pointer">
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.25a1 1 0 01-1 1A17.93 17.93 0 013 5a1 1 0 011-1h3.25a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z" />
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
                    <span className="font-bold text-[#3a8094]">하나생명</span>
                  </div>
                </div>
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>상품명</span>
                    <span className="font-bold text-[#3a8094]">(무)하나뿐인 변액연금보험</span>
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
                <div className="text-xs text-gray-700 text-center mt-4">
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
                    <span className="font-bold text-[#3a8094]">하나생명</span>
                  </div>
                </div>
                <div className="bg-white p-1.5 sm:p-2 rounded border border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium"><span className='text-[#3a8094] mr-1'>▸</span>상품명</span>
                    <span className="font-bold text-[#3a8094]">(무)하나뿐인 변액연금보험</span>
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
                <div className="text-xs text-gray-700 text-center mt-4">
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
                    className={`${!isAgeEligible ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-[#00a884] text-white hover:bg-[#008c73]'} w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 rounded-md text-sm sm:text-base font-medium transition-colors min-w-[100px] sm:min-w-[120px]`}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.25a1 1 0 01-1 1A17.93 17.93 0 013 5a1 1 0 011-1h3.25a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z" />
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
                  className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 bg-[#00a884] text-white rounded-md text-sm sm:text-base font-medium 
                           hover:bg-[#008c73] transition-colors min-w-[100px] sm:min-w-[120px]"
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

