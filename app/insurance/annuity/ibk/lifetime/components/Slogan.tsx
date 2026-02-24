import React, { useState, useEffect, useRef } from 'react';
import { CalculatorIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import Modal from '@/components/Modal';
import request from '@/app/api/request';
import { supabase } from '@/app/api/supabase';
import { getProductConfigByPath, getTemplateIdByPath } from '@/constants/insurance';
import { calculateAnnuityStartAge } from '@/lib/annuityCalculator';
import FireworksEffect from '@/components/shared/FireworksEffect';
import { trackSimplifiedVisitor } from '@/lib/visitorTracking';
import { useInsuranceForm } from '@/hooks/useInsuranceForm';
import { useOTP } from '@/hooks/useOTP';

// 현재 경로에 맞는 상품 정보 가져오기
const currentPath = '/insurance/annuity/ibk/lifetime';
const productConfig = getProductConfigByPath(currentPath);

const INSURANCE_COMPANY_ID = 3; // IBK 연금보험
const INSURANCE_PRODUCT_ID = 4; // IBK 평생연금받는 변액연금보험 id 코드값

type SloganProps = {
  onOpenPrivacy: () => void;
  onModalStateChange?: (isOpen: boolean) => void;
};

export default function Slogan({ onOpenPrivacy, onModalStateChange }: SloganProps) {
  const [counselType, setCounselType] = useState(1); // 1: 보험료 확인, 2: 상담신청
  const [excelResult, setExcelResult] = useState<{
    monthlyPension: number;
    performancePension: number;
    guaranteedAmount: number;
    totalUntil100: number;
    pensionStartAge: number | string;
    notice: string;
  } | null>(null);

  const [eligibility, setEligibility] = useState<any>({});

  // Shared hooks
  const {
    name,
    setName,
    gender,
    setGender,
    birth,
    setBirth,
    phone,
    setPhone,
    paymentPeriod,
    setPaymentPeriod,
    paymentAmount,
    setPaymentAmount,
    isChecked,
    setIsChecked,
    nameInputRef,
    birthInputRef,
    phoneInputRef,
    handleInputFocus,
    handleBirthChange: baseHandleBirthChange,
    handlePhoneChange: baseHandlePhoneChange,
    validateForm,
    getInsuranceAge,
    insuranceAge,
    isAgeKnown,
    numericInsuranceAge,
    isAgeEligible,
    isVerified,
    setIsVerified,
    formatTime,
  } = useInsuranceForm({
    defaultPaymentPeriod: '',
    defaultPaymentAmount: '',
    validateAge: true,
    minAge: 0,
    maxAge: 68,
  });

  const {
    otpSent,
    setOtpSent,
    otpCode,
    setOtpCode,
    verifying,
    setVerifying,
    otpTimer,
    setOtpTimer,
    otpResendAvailable,
    setOtpResendAvailable,
    showResultModal,
    setShowResultModal,
    showConsultModal,
    setShowConsultModal,
    consultOtpCode,
    setConsultOtpCode,
    consultOtpTimer,
    setConsultOtpTimer,
    consultOtpResendAvailable,
    setConsultOtpResendAvailable,
    consultIsVerified,
    setConsultIsVerified,
    showConsultTypeDropdown,
    setShowConsultTypeDropdown,
    showConsultTimeDropdown,
    setShowConsultTimeDropdown,
    consultType,
    setConsultType,
    consultTime,
    setConsultTime,
    otpInputRef,
    consultOtpInputRef,
    handlePostOTP: baseHandlePostOTP,
    handleCloseModal: baseHandleCloseModal,
    handleOpenConsultModal: baseHandleOpenConsultModal,
    handleCloseConsultModal: baseHandleCloseConsultModal,
    handleConsultSendOTP: baseHandleConsultSendOTP,
  } = useOTP();

  // ── Override Handlers to reset excelResult ──

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
    setIsVerified(false);
    setExcelResult(null);
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

  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    baseHandleBirthChange(e);
    setIsVerified(false);
    setExcelResult(null);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    baseHandlePhoneChange(e);
    setIsVerified(false);
    setExcelResult(null);
  };

  const handleCloseModal = () => {
    baseHandleCloseModal();
    setExcelResult(null);
  };

  const handleInsuranceCostCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setCounselType(1);
    setShowResultModal(true);
  };

  const handlePostOTP = async () => {
    await baseHandlePostOTP({
      phone,
      templateId: getTemplateIdByPath(currentPath),
      companyName: 'IBK연금보험',
      productName: 'IBK평생연금받는변액연금보험',
    });
  };

  const handleSendOTP = async () => {
    const ageForOtp = insuranceAge !== '' ? Number(insuranceAge) : NaN;
    if (isNaN(ageForOtp) || ageForOtp < 0 || ageForOtp > 68) return;

    setOtpTimer(180);
    setOtpResendAvailable(false);
    await handlePostOTP();
    setTimeout(() => {
      otpInputRef.current?.focus();
      otpInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  };

  // ── Product Specific Logic ──

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
            mode: 'eligibility',
          }),
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
    ? excelResult &&
      typeof excelResult.pensionStartAge === 'number' &&
      excelResult.pensionStartAge > 0
      ? excelResult.pensionStartAge
      : getPensionStartAge(Number(insuranceAge), paymentPeriod)
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
            productType: 'ibk-lifetime',
          }),
        });
        if (!resp.ok) return;
        const data = await resp.json();
        if (!canceled && data?.success && data?.data?.pensionStartAge) {
          setExcelResult((prev) => ({
            pensionStartAge: data.data.pensionStartAge || 0,
            monthlyPension: data.data.monthlyPension || 0,
            performancePension: data.data.performancePension || 0,
            guaranteedAmount: data.data.guaranteedAmount || 0,
            totalUntil100: data.data.totalUntil100 || 0,
            notice: data.data.notice || '',
          }));
        }
      } catch (e) {
        // ignore
      }
    };
    prefetchExcel();
    return () => {
      canceled = true;
    };
  }, [gender, birth, paymentPeriod, paymentAmount]);

  // 납입기간 버튼 비활성화 여부 확인 (연금개시연령이 80세를 초과하는 경우)
  const ageLimit10 = Number(insuranceAge) + 10 > 80;
  const ageLimit15 = Number(insuranceAge) + 15 > 80;
  const ageLimit20 = Number(insuranceAge) + 20 > 80;

  // 연금액 계산 함수 (변액연금용 - 실적배당 포함) => Not used for excelResult logic directly, but kept if needed for logic fallback?
  // Code seems to assume rely on excelResult mostly or use simplified calc for display

  // Supabase에 사용자 생성 및 상담 기록 저장
  const saveToSupabase = async (counselType: number) => {
    try {
      let userId: number;
      const { data: existingUser } = await supabase
        .from('user')
        .select('id')
        .eq('phone', phone)
        .single();
      if (existingUser) {
        userId = existingUser.id;
      } else {
        const { data: newUser, error: createError } = await supabase
          .from('user')
          .insert({
            name,
            phone,
            birth,
            gender,
          })
          .select('id')
          .single();
        if (createError) return;
        userId = newUser.id;
      }
      const { data: counselRecord, error: counselError } = await supabase
        .from('counsel')
        .insert({
          user_id: userId,
          company_id: INSURANCE_COMPANY_ID,
          product_id: INSURANCE_PRODUCT_ID,
          counsel_type_id: counselType,
        })
        .select()
        .single();
      if (counselError) return;
      return { userId, counselId: counselRecord.id };
    } catch (error) {}
  };

  const handleVerifyOTP = async () => {
    const ageForVerify = insuranceAge !== '' ? Number(insuranceAge) : NaN;
    if (isNaN(ageForVerify) || ageForVerify < 0 || ageForVerify > 68) return;
    if (otpCode.length !== 6) {
      alert('6자리 인증번호를 입력해 주세요.');
      return;
    }

    setVerifying(true);
    try {
      let monthlyPayment = 0;
      if (paymentAmount.includes('만원')) {
        const num = parseInt(paymentAmount.replace(/[^0-9]/g, ''));
        monthlyPayment = num * 10000;
      } else {
        monthlyPayment = parseInt(paymentAmount.replace(/[^0-9]/g, ''));
      }
      const years = parseInt(paymentPeriod.replace(/[^0-9]/g, ''));

      // API 호출 (Verify + Save)
      // Note: IBK page seems to just use /api/verifyOTP and rely on it to return success
      // AND also saving to Supabase separately

      // We need to calculate pension first to send to verifyOTP for AlimTalk
      let calculatedPension = {
        monthly: 0,
        performance: 0,
        guaranteed: 0,
        totalUntil100: 0,
        pensionStartAge: 0,
        notice: '',
      };

      try {
        const resp = await fetch('/api/calculate-pension/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerName: name,
            gender,
            age: Number(insuranceAge),
            paymentPeriod: years,
            monthlyPayment,
            productType: 'ibk-lifetime',
          }),
        });
        if (resp.ok) {
          const data = await resp.json();
          if (data.success && data.data) {
            calculatedPension = {
              monthly: data.data.monthlyPension || 0,
              performance: data.data.performancePension || 0,
              guaranteed: data.data.guaranteedAmount || 0,
              totalUntil100: data.data.totalUntil100 || 0,
              pensionStartAge: data.data.pensionStartAge || 0,
              notice: data.data.notice || '',
            };
            // Update state
            setExcelResult((prev) => ({
              ...(prev || {
                monthlyPension: 0,
                performancePension: 0,
                guaranteedAmount: 0,
                totalUntil100: 0,
                pensionStartAge: 0,
                notice: '',
              }),
              ...calculatedPension,
              monthlyPension: calculatedPension.monthly,
              performancePension: calculatedPension.performance,
              guaranteedAmount: calculatedPension.guaranteed,
            }));
          }
        }
      } catch (e) {}

      const payload = {
        phone,
        name,
        birth,
        gender,
        code: otpCode,
        counselType: counselType,
        companyId: INSURANCE_COMPANY_ID,
        productId: INSURANCE_PRODUCT_ID,
        counselTime: consultTime,
        mounthlyPremium: paymentAmount, // 당월 보험료
        paymentPeriod: paymentPeriod, // 납입기간
        monthlyPension: calculatedPension.monthly, // 월 수령액
        totalUntil100: calculatedPension.totalUntil100, // 100세 보증금액
        guaranteedPension: calculatedPension.guaranteed, // 보증급액
        pensionStartAge: calculatedPension.pensionStartAge, // 개시나이
        performancePension: calculatedPension.performance, // 변액 포함 월 수령액
        templateId: 'UB_8705', // 고객용 결과 발송
        adminTemplateId: 'UA_8331', // 관리자용 결과 발송
      };

      const res = await request.post('/api/verifyOTP', payload);

      if (res.data.success) {
        // Supabase에 데이터 저장
        await saveToSupabase(1); // 1: 환급금(연금액) 확인

        // 방문자 추적: 연금액 확인 (Simplified Visitor Tracking)
        try {
          await trackSimplifiedVisitor({ counsel_type_id: 1 });
        } catch (e) {
          console.error(e);
        }

        setIsVerified(true);
        setOtpSent(false);
        alert('인증이 완료되었습니다!');
      } else {
        alert('인증에 실패했습니다.');
      }
    } catch (e: any) {
      if (e.response?.data?.error) {
        alert(`인증 에러: ${e.response.data.error}`);
      } else {
        alert('인증에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setVerifying(false);
    }
  };

  const handleConsultVerifyOTP = async () => {
    if (verifying) return;
    if (consultOtpCode.length !== 6) {
      alert('6자리 인증번호를 입력해주세요.');
      return;
    }

    setVerifying(true);
    try {
      // Calculate pension for payload
      let additionalInfo = {
        monthly: 0,
        performance: 0,
        guaranteed: 0,
        totalUntil100: 0,
        pensionStartAge: 0,
      };

      if (paymentPeriod && paymentAmount) {
        // Try to calculate if needed
        // We can skip re-calculation if not strictly required for consult,
        // but consistent with other flows allows admin to see estimates
        // Simple default or 0 if not calc
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
        consultType, // 상담 종류
        counselTime: consultTime, // 상담 시간
        mounthlyPremium: paymentAmount || '',
        paymentPeriod: paymentPeriod || '',

        monthlyPension: additionalInfo.monthly,
        performancePension: additionalInfo.performance,

        templateId: 'UB_8715', // 고객용 상담신청 완료 전송용 템플릿
        adminTemplateId: 'UA_8332', // 관리자용 상담신청 접수 전송용 템플릿
      };
      console.log('[IBK][CONSULT] verifyOTP payload', payload);

      const res = await request.post('/api/verifyOTP', payload);
      if (res.data.success) {
        // Supabase에 데이터 저장
        const supabaseResult = await saveToSupabase(2); // 2: 상담신청

        alert('인증이 완료되었습니다!');
        setConsultIsVerified(true);
      } else {
        alert('인증에 실패했습니다.');
        return;
      }
    } catch (e: any) {
      alert(e.error || '인증에 실패했습니다.');
    } finally {
      setVerifying(false);
    }
  };

  // Use hook handlers if no override needed
  const handleOpenConsultModal = baseHandleOpenConsultModal;
  const handleCloseConsultModal = baseHandleCloseConsultModal;
  const handleConsultSendOTP = async () => {
    await baseHandleConsultSendOTP({
      phone,
      templateId: 'UB_8715',
      companyName: 'IBK연금보험',
      productName: 'IBK평생연금받는변액연금보험',
    });
  };

  // 보험연령 계산 함수 - hook provided getInsuranceAge is generic, we can use it.
  // const getInsuranceAgeHook = (birthStr: string) => { ... } - Replaced by hook
  // const getInsuranceAge = getInsuranceAgeHook; - Deduped

  // 총 납입액, 환급률, 확정이자, 해약환급금 계산
  let amount = 0;
  if (paymentAmount.includes('만원')) {
    const num = parseInt(paymentAmount.replace(/[^0-9]/g, ''));
    amount = num * 10000;
  } else {
    amount = parseInt(paymentAmount.replace(/[^0-9]/g, ''));
  }
  const months = parseInt(paymentPeriod.replace(/[^0-9]/g, '')) * 12;
  const total = !isNaN(amount) && !isNaN(months) && amount > 0 && months > 0 ? amount * months : 0;

  // 연금액 계산
  const pensionAmounts = {
    monthly: excelResult?.monthlyPension || 0,
    performance: excelResult?.performancePension || 0,
    totalUntil100: excelResult?.totalUntil100 || 0,
  };
  const guaranteedAmount =
    excelResult?.guaranteedAmount ||
    (pensionAmounts.monthly ? pensionAmounts.monthly * 12 * 20 : 0);

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
    '오후 06:00 이후',
  ];

  return (
    <>
      <section
        className="w-full bg-[#1e293b] py-6 md:py-10 lg:py-3"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 2px, transparent 2px)',
          backgroundSize: '20px 20px',
        }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 px-4 md:flex-col md:items-center md:gap-8 md:px-6 md:py-4 lg:flex-row lg:items-start lg:justify-between lg:gap-12 lg:px-4 lg:py-4">
          <div className="flex flex-1 flex-col items-center text-center md:items-center md:text-center lg:items-start lg:text-left">
            <h1 className="mb-3 text-2xl font-bold leading-tight text-white sm:mb-4 sm:text-3xl md:mb-6 md:text-4xl lg:mb-4 lg:text-5xl">
              20년까지 연단리 8%!
              <br />
              보증되는 변액연금보험!
            </h1>

            <ul className="mb-3 space-y-1 sm:mb-5 sm:space-y-1.5 md:mb-8 md:space-y-2.5 lg:mb-8 lg:space-y-2">
              <li className="flex items-center justify-center text-sm text-white sm:text-base md:justify-center md:text-lg lg:justify-start lg:text-lg">
                <span className="mr-1 flex-shrink-0 text-sm text-[#ffd700] sm:mr-1.5 sm:text-base md:mr-2.5 md:text-lg lg:mr-2 lg:text-xl">
                  ✔
                </span>
                <span>
                  최대 <span className="font-semibold text-[#fbbf24]">20년</span>동안{' '}
                  <span className="font-semibold text-[#fbbf24]">연단리 8%</span>!
                </span>
              </li>
              <li className="flex items-center justify-center text-sm text-white sm:text-base md:justify-center md:text-lg lg:justify-start lg:text-lg">
                <span className="mr-1 flex-shrink-0 text-sm text-[#ffd700] sm:mr-1.5 sm:text-base md:mr-2.5 md:text-lg lg:mr-2 lg:text-xl">
                  ✔
                </span>
                <span>
                  가입 <span className="font-semibold text-[#60a5fa]">0~68세</span> / 연금개시{' '}
                  <span className="font-semibold text-[#60a5fa]">30~80세</span>
                </span>
              </li>
              <li className="flex items-center justify-center text-sm text-white sm:text-base md:justify-center md:text-lg lg:justify-start lg:text-lg">
                <span className="mr-1 flex-shrink-0 text-sm text-[#ffd700] sm:mr-1.5 sm:text-base md:mr-2.5 md:text-lg lg:mr-2 lg:text-xl">
                  ✔
                </span>
                <span>
                  <span className="font-semibold text-[#22d3ee]">실적배당</span> 종신연금{' '}
                  <span className="font-semibold text-[#22d3ee]">보증지급</span>
                </span>
              </li>
              <li className="flex items-center justify-center text-sm text-white sm:text-base md:justify-center md:text-lg lg:justify-start lg:text-lg">
                <span className="mr-1 flex-shrink-0 text-sm text-[#ffd700] sm:mr-1.5 sm:text-base md:mr-2.5 md:text-lg lg:mr-2 lg:text-xl">
                  ✔
                </span>
                <span>
                  최저사망계약자적립액 <span className="font-semibold text-[#a78bfa]">보증</span>
                </span>
              </li>
            </ul>

            <div className="mx-auto mb-3 w-full max-w-2xl rounded-xl bg-white p-4 px-4 pb-5 pt-5 shadow-lg sm:mb-4 sm:p-5 sm:px-5 sm:pb-6 sm:pt-6 md:p-6 md:px-6 md:pb-7 md:pt-7 lg:max-w-3xl lg:p-4 lg:px-4 lg:pb-6 lg:pt-6">
              <div className="mb-2 grid grid-cols-3 gap-2 sm:mb-3 sm:gap-3 md:gap-4 lg:gap-3">
                <div className="relative flex min-h-[120px] flex-col justify-between overflow-hidden rounded-lg border border-orange-200 bg-gradient-to-br from-orange-100 to-orange-200 p-1.5 text-center shadow-md transition-all duration-300 sm:min-h-[140px] sm:p-2 md:min-h-[160px] md:p-3 lg:p-3">
                  <div
                    className="pointer-events-none absolute inset-0 -translate-x-full -skew-x-12 transform bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    style={{
                      animation: 'shine1 4s ease-in-out infinite',
                    }}
                  ></div>

                  <div className="relative z-10">
                    <div className="mb-1 inline-block rounded-full bg-gradient-to-r from-orange-600 to-orange-700 px-1.5 py-1 text-[10px] font-bold text-white shadow-md sm:mb-2 sm:px-2 sm:py-1.5 sm:text-xs md:px-3 md:text-sm">
                      높은 보증이율
                    </div>
                  </div>
                  <div className="relative z-10 mb-2 flex items-center justify-center">
                    <div className="mr-1 text-[10px] font-semibold leading-tight text-gray-700 sm:mr-2 sm:text-xs">
                      최대
                      <br />
                      연단리
                    </div>
                    <div className="animate-[jump-glow_1.2s_ease-in-out_infinite] text-2xl font-extrabold text-orange-600 sm:text-3xl md:text-4xl">
                      8%
                    </div>
                  </div>
                  <div className="relative z-10 rounded-lg bg-white/50 p-1 text-[10px] leading-tight text-text-secondary sm:p-1.5 sm:text-xs">
                    20년까지 연단리 8%
                    <br />
                    이후 5% 보증
                  </div>
                </div>

                <div className="relative flex min-h-[120px] flex-col justify-between overflow-hidden rounded-lg border border-green-200 bg-gradient-to-br from-green-100 to-green-200 p-1.5 text-center shadow-md transition-all duration-300 sm:min-h-[140px] sm:p-2 md:min-h-[160px] md:p-3 lg:p-3">
                  <div
                    className="pointer-events-none absolute inset-0 -translate-x-full -skew-x-12 transform bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    style={{
                      animation: 'shine2 4s ease-in-out infinite',
                    }}
                  ></div>

                  <div className="relative z-10">
                    <div className="mb-1 inline-block rounded-full bg-gradient-to-r from-green-600 to-green-700 px-1.5 py-1 text-[10px] font-bold text-white shadow-md sm:mb-2 sm:px-2 sm:py-1.5 sm:text-xs md:px-3 md:text-sm">
                      무심사 가입
                    </div>
                  </div>
                  <div className="relative z-10 flex flex-1 items-center justify-center">
                    <div className="text-[10px] font-medium leading-tight text-gray-700 sm:text-xs">
                      질병여부 상관없이
                      <br />
                      무진단·무심사
                    </div>
                  </div>
                  <div className="relative z-10 rounded-lg bg-white/50 p-1 text-[10px] leading-tight text-text-secondary sm:p-1.5 sm:text-xs">
                    당뇨, 암, 고혈압 등<br />
                    가입제한 없음
                  </div>
                </div>

                <div className="relative flex min-h-[120px] flex-col justify-between overflow-hidden rounded-lg border border-blue-200 bg-gradient-to-br from-blue-100 to-blue-200 p-1.5 text-center shadow-md transition-all duration-300 sm:min-h-[140px] sm:p-2 md:min-h-[160px] md:p-3 lg:p-3">
                  <div
                    className="pointer-events-none absolute inset-0 -translate-x-full -skew-x-12 transform bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    style={{
                      animation: 'shine3 4s ease-in-out infinite',
                    }}
                  ></div>

                  <div className="relative z-10">
                    <div className="mb-1 inline-block rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-1.5 py-1 text-[10px] font-bold text-white shadow-md sm:mb-2 sm:px-2 sm:py-1.5 sm:text-xs md:px-3 md:text-sm">
                      조기연금개시
                    </div>
                  </div>
                  <div className="relative z-10 flex flex-1 items-center justify-center">
                    <div className="text-[10px] font-medium leading-tight text-gray-700 sm:text-xs">
                      30세부터
                      <br />
                      연금개시 가능
                    </div>
                  </div>
                  <div className="relative z-10 rounded-lg bg-white/50 p-1 text-[10px] leading-tight text-text-secondary sm:p-1.5 sm:text-xs">
                    미보증형은
                    <br />
                    45세부터 가능
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center text-xs text-text-muted">
                <p>※ 대표계약기준(40세, 10년납, 65세 연금개시), 복리이자율로 환산시 연복리 4.5%</p>
              </div>

              <style jsx>{`
                @keyframes shine1 {
                  0% {
                    transform: translateX(-100%) skewX(-12deg);
                  }
                  25% {
                    transform: translateX(100%) skewX(-12deg);
                  }
                  100% {
                    transform: translateX(100%) skewX(-12deg);
                  }
                }

                @keyframes shine2 {
                  0% {
                    transform: translateX(-100%) skewX(-12deg);
                  }
                  25% {
                    transform: translateX(100%) skewX(-12deg);
                  }
                  100% {
                    transform: translateX(100%) skewX(-12deg);
                  }
                }

                @keyframes shine3 {
                  0% {
                    transform: translateX(-100%) skewX(-12deg);
                  }
                  25% {
                    transform: translateX(100%) skewX(-12deg);
                  }
                  100% {
                    transform: translateX(100%) skewX(-12deg);
                  }
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
          <div className="flex w-full flex-1 justify-center lg:ml-8 lg:justify-end lg:self-center">
            <div
              id="calculator-box"
              className="relative flex w-full max-w-md flex-col rounded-2xl bg-white p-5 shadow-2xl sm:max-w-lg sm:p-6 md:p-7"
            >
              <div className="mb-5 sm:mb-6">
                <div className="mb-1 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#f59e0b] to-[#d97706]">
                    <CalculatorIcon className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary sm:text-xl">
                    연금액 계산하기
                  </h3>
                </div>
                <p className="ml-10 text-xs text-text-muted sm:text-sm">
                  간단한 정보 입력으로 예상 연금액을 확인하세요
                </p>
              </div>
              <form
                className="flex flex-col gap-3 sm:gap-4"
                onSubmit={handleInsuranceCostCalculate}
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                      성별
                    </label>
                    <div className="flex gap-2">
                      <label
                        className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg border-2 py-2.5 transition-all ${gender === 'M' ? 'border-[#f59e0b] bg-[#f59e0b]/5 text-[#f59e0b]' : 'border-border-default hover:border-border-default'}`}
                      >
                        <input
                          type="radio"
                          name="gender"
                          value="M"
                          checked={gender === 'M'}
                          onChange={handleGenderChange}
                          className="sr-only"
                        />
                        <span className="text-sm font-medium">남자</span>
                      </label>
                      <label
                        className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg border-2 py-2.5 transition-all ${gender === 'F' ? 'border-[#f59e0b] bg-[#f59e0b]/5 text-[#f59e0b]' : 'border-border-default hover:border-border-default'}`}
                      >
                        <input
                          type="radio"
                          name="gender"
                          value="F"
                          checked={gender === 'F'}
                          onChange={handleGenderChange}
                          className="sr-only"
                        />
                        <span className="text-sm font-medium">여자</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                      이름
                    </label>
                    <input
                      type="text"
                      inputMode="text"
                      ref={nameInputRef}
                      value={name}
                      onChange={handleNameChange}
                      onFocus={handleInputFocus}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          birthInputRef.current?.focus();
                        }
                      }}
                      className="w-full rounded-lg border border-border-default px-3 py-2.5 text-sm transition-all focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/20"
                      placeholder="홍길동"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                      생년월일
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      ref={birthInputRef}
                      value={birth}
                      onChange={handleBirthChange}
                      onFocus={handleInputFocus}
                      className="w-full rounded-lg border border-border-default px-3 py-2.5 text-sm transition-all focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/20"
                      placeholder="19880818"
                      maxLength={8}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                      연락처
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      ref={phoneInputRef}
                      value={phone}
                      onChange={handlePhoneChange}
                      onFocus={handleInputFocus}
                      className="w-full rounded-lg border border-border-default px-3 py-2.5 text-sm transition-all focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/20"
                      placeholder="01012345678"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                    납입기간
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['10년', '15년', '20년'].map((period) => (
                      <label key={period} className="relative cursor-pointer">
                        {period === '10년' && (
                          <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 animate-bounce rounded-full bg-gradient-to-r from-[#f59e0b] to-[#d97706] px-2.5 py-0.5 text-xs font-bold text-white shadow-lg">
                            추천
                          </span>
                        )}
                        <input
                          type="radio"
                          name="paymentPeriod"
                          value={period}
                          checked={paymentPeriod === period}
                          onChange={handlePaymentPeriodChange}
                          className="peer sr-only"
                        />
                        <div
                          className={`w-full rounded-lg border-2 py-2.5 text-center text-sm transition-all ${paymentPeriod === period ? 'border-[#f59e0b] bg-[#f59e0b]/5 font-bold text-[#f59e0b]' : 'border-border-default hover:border-border-default'}`}
                        >
                          {period}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                    월 납입금액
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['30만원', '50만원', '100만원'].map((amount) => (
                      <label key={amount} className="cursor-pointer">
                        <input
                          type="radio"
                          name="paymentAmount"
                          value={amount}
                          checked={paymentAmount === amount}
                          onChange={handlePaymentAmountChange}
                          className="peer sr-only"
                        />
                        <div
                          className={`w-full rounded-lg border-2 py-2.5 text-center text-sm transition-all ${paymentAmount === amount ? 'border-[#f59e0b] bg-[#f59e0b]/5 font-bold text-[#f59e0b]' : 'border-border-default hover:border-border-default'}`}
                        >
                          {amount}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="h-4 w-4 cursor-pointer rounded border-border-default text-[#f59e0b] focus:ring-[#f59e0b]"
                  />
                  <span className="text-xs text-text-secondary">
                    개인정보 수집 및 이용에 동의합니다.
                    <button
                      type="button"
                      onClick={onOpenPrivacy}
                      className="ml-1 text-[#f59e0b] underline hover:text-[#d97706]"
                    >
                      자세히 보기
                    </button>
                  </span>
                </div>

                <div className="mt-1 flex flex-col gap-2">
                  <button
                    type="submit"
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#d97706] py-3.5 text-base font-bold text-white shadow-lg shadow-[#f59e0b]/25 transition hover:opacity-95"
                  >
                    <CalculatorIcon className="h-5 w-5" />
                    연금액 확인하기
                  </button>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleOpenConsultModal}
                      className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[#fa5a5a] py-3 text-sm font-bold text-white transition hover:opacity-95"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 12a9.75 9.75 0 1 1 19.5 0v3.375a2.625 2.625 0 0 1-2.625 2.625h-1.125a.375.375 0 0 1-.375-.375V15a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 0 .75-.75V12a8.25 8.25 0 1 0-16.5 0v1.5a.75.75 0 0 0 .75.75h.75A.75.75 0 0 1 6 15v2.625a.375.375 0 0 1-.375.375H4.5A2.625 2.625 0 0 1 1.875 15.375V12Z"
                        />
                      </svg>
                      상담신청
                    </button>
                    <a
                      href="https://pf.kakao.com/_lrubxb/chat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[#fee500] py-3 text-sm font-bold text-[#3d1e1e] transition hover:opacity-95"
                    >
                      <ChatBubbleLeftRightIcon className="h-4 w-4" />
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
              <CalculatorIcon className="h-6 w-6 text-[#3a8094]" />
              연금액 확인하기
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-[#fa5a5a]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.25a1 1 0 01-1 1A17.93 17.93 0 013 5a1 1 0 011-1h3.25a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z"
                />
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
            <div className="rounded border border-red-200 bg-red-50 p-1.5 text-xs text-red-700 sm:p-2 sm:text-sm">
              이 상품은 0세~68세까지만 가입 가능합니다. 현재 보험연령 {numericInsuranceAge}세는 가입
              대상이 아닙니다. 계산 기능은 이용하실 수 없습니다.
            </div>
          )}
          {isVerified && (
            <>
              <FireworksEffect show={true} />
              <div className="mb-1.5 rounded bg-[#f8f8ff] p-2 text-center sm:mb-2 sm:p-2.5">
                <div className="text-base font-bold text-black sm:text-lg">
                  연금액 산출이 완료되었습니다.
                </div>
              </div>
              <div className="rounded-lg bg-page-bg p-1.5 sm:p-2">
                <h3 className="mb-1.5 flex items-center text-base font-bold text-text-primary sm:mb-2 sm:text-lg">
                  <span className="align-middle text-2xl font-extrabold text-[#7c3aed]">
                    {name}
                  </span>
                  <span className="align-middle text-lg font-bold text-[#7c3aed]">&nbsp;님</span>
                  {insuranceAge !== '' && (
                    <span className="ml-2 flex items-center font-bold">
                      <span className="text-lg text-[#3a8094]">보험연령 </span>
                      <span className="mx-1 text-2xl font-extrabold text-[#ef4444]">
                        {insuranceAge}
                      </span>
                      <span className="text-lg text-[#3a8094]">세</span>
                    </span>
                  )}
                </h3>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>보험사
                    </span>
                    <span className="font-bold text-[#3a8094]">IBK연금보험</span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>상품명
                    </span>
                    <span className="font-bold text-[#3a8094]">
                      IBK연금액 평생보증받는변액연금보험
                    </span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>납입기간 / 월보험료
                    </span>
                    <span className="font-bold text-[#3a8094]">
                      {paymentPeriod && paymentAmount ? `${paymentPeriod} / ${paymentAmount}` : '-'}
                    </span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>총 납입액
                    </span>
                    <span className="font-bold">
                      <span className="text-[#3a8094]">
                        {total ? total.toLocaleString('en-US') : '-'}
                      </span>
                      <span className="text-[#3a8094]"> 원</span>
                    </span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>연금개시연령
                    </span>
                    <span className="font-bold">
                      <span className="text-[#7c3aed]">{currentPensionStartAge || '-'}</span>{' '}
                      <span className="text-[#3a8094]">세</span>
                    </span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>월 연금액
                    </span>
                    <span className="font-bold">
                      <span className="text-[#3b82f6]">
                        {isVerified
                          ? `약 ${pensionAmounts.monthly.toLocaleString('en-US')}`
                          : '인증 후 확인가능'}
                      </span>
                      {isVerified && <span className="text-[#3a8094]"> 원</span>}
                    </span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>20년 보증기간 연금액
                    </span>
                    <span className="font-bold">
                      <span className="text-[#ef4444]">
                        {isVerified
                          ? `약 ${guaranteedAmount.toLocaleString('en-US')}`
                          : '인증 후 확인가능'}
                      </span>
                      {isVerified && <span className="text-[#3a8094]"> 원</span>}
                    </span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>100세까지 생존 시 총 받는 금액
                    </span>
                    <span className="font-bold">
                      <span className="text-[#10b981]">
                        {isVerified
                          ? `약 ${pensionAmounts.totalUntil100?.toLocaleString('en-US')}`
                          : '인증 후 확인가능'}
                      </span>
                      {isVerified && <span className="text-[#3a8094]"> 원</span>}
                    </span>
                  </div>
                </div>
                <div className="mt-4 text-center text-xs text-text-muted">
                  * 실제 연금액은 가입시점 및 고객 정보에 따라 달라질 수 있습니다.
                  <br />* 본 계산 결과는 참고용이며, 실제 계약 시 보험사 약관 및 상품설명서를 확인
                  바랍니다.
                </div>
              </div>
            </>
          )}
          {!isVerified && (
            <>
              <div className="rounded-lg bg-page-bg p-2">
                <h3 className="mb-2 flex items-center text-lg font-bold text-text-primary">
                  <span className="align-middle text-2xl font-extrabold text-[#7c3aed]">
                    {name}
                  </span>
                  <span className="align-middle text-lg font-bold text-[#7c3aed]">&nbsp;님</span>
                  {insuranceAge !== '' && (
                    <span className="ml-2 flex items-center font-bold">
                      <span className="text-lg text-[#3a8094]">보험연령 </span>
                      <span className="mx-1 text-2xl font-extrabold text-[#ef4444]">
                        {insuranceAge}
                      </span>
                      <span className="text-lg text-[#3a8094]">세</span>
                    </span>
                  )}
                </h3>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>보험사
                    </span>
                    <span className="font-bold text-[#3a8094]">
                      {isVerified ? 'IBK연금보험' : '인증 후 확인가능'}
                    </span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>상품명
                    </span>
                    <span className="font-bold text-[#3a8094]">
                      {isVerified ? '더!행복드림변액연금보험' : '인증 후 확인가능'}
                    </span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>납입기간 / 월보험료
                    </span>
                    <span className="font-bold text-[#3a8094]">
                      {paymentPeriod && paymentAmount ? `${paymentPeriod} / ${paymentAmount}` : '-'}
                    </span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>총 납입액
                    </span>
                    <span className="font-bold">
                      <span className="text-[#3a8094]">
                        {total ? total.toLocaleString('en-US') : '-'}
                      </span>
                      <span className="text-[#3a8094]"> 원</span>
                    </span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>연금개시연령
                    </span>
                    <span className="font-bold">
                      <span className="text-[#7c3aed]">{currentPensionStartAge || '?'}</span>{' '}
                      <span className="text-[#3a8094]">세</span>
                    </span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>월 연금액
                    </span>
                    <span className="font-bold">
                      <span className="text-[#3b82f6]">인증 후 확인가능</span>
                    </span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>20년 보증기간 연금액
                    </span>
                    <span className="font-bold">
                      <span className="text-[#ef4444]">인증 후 확인가능</span>
                    </span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>100세까지 생존 시 총 받는 금액
                    </span>
                    <span className="font-bold">
                      <span className="text-[#10b981]">인증 후 확인가능</span>
                    </span>
                  </div>
                </div>
                <div className="mt-4 text-center text-xs text-text-muted">
                  * 실제 연금액은 가입시점 및 고객 정보에 따라 달라질 수 있습니다.
                  <div className="mt-0.5 text-[#3a8094]">
                    * 휴대폰 인증 완료 후 상세 정보를 확인하실 수 있습니다.
                  </div>
                </div>
              </div>
              <div className="mt-0 rounded-lg bg-page-bg p-1.5 sm:p-2">
                <h3 className="mb-1 text-sm font-bold text-text-primary sm:text-base">
                  휴대폰 인증
                </h3>
                <p className="mb-1 text-xs text-text-secondary sm:text-sm">
                  정확한 보험료 확인을 위해 휴대폰 인증이 필요합니다.
                </p>
                <div className="mb-2 flex flex-col items-stretch gap-1.5 sm:mb-3 sm:flex-row sm:items-center sm:gap-2">
                  <input
                    type="text"
                    value={phone}
                    readOnly
                    className="flex-1 rounded-md border border-border-default bg-gray-100 px-3 py-2 text-sm sm:py-2.5 sm:text-base"
                  />
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={!isAgeEligible}
                    className={`${!isAgeEligible ? 'cursor-not-allowed bg-gray-300 text-text-muted' : 'bg-[#f97316] text-white hover:bg-[#ea580c]'} w-full min-w-[100px] rounded-md px-3 py-2 text-sm font-medium transition-colors sm:w-auto sm:min-w-[120px] sm:px-4 sm:py-2.5 sm:text-base`}
                  >
                    {otpResendAvailable ? '인증번호 전송' : '재발송'}
                  </button>
                  {!otpResendAvailable && (
                    <div className="flex min-w-[60px] items-center justify-center text-sm font-medium text-[#3a8094]">
                      {formatTime(otpTimer)}
                    </div>
                  )}
                </div>
                <div className="mb-2 flex gap-1.5 sm:mb-3 sm:gap-2">
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
                    className="flex-1 rounded-md border border-border-default px-3 py-2 text-sm focus:border-[#3a8094] focus:ring-[#3a8094] sm:py-2.5 sm:text-base"
                    placeholder="6자리 인증번호 입력"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleVerifyOTP}
                  disabled={!isAgeEligible || verifying || otpCode.length !== 6}
                  className={`mt-1 w-full rounded-md px-3 py-2.5 text-base font-semibold transition-colors sm:mt-2 sm:px-4 sm:py-3 sm:text-lg ${!isAgeEligible || verifying || otpCode.length !== 6 ? 'cursor-not-allowed bg-gray-300 text-text-muted' : 'bg-[#3a8094] text-white hover:bg-[#2c6070]'}`}
                >
                  {verifying ? '인증 처리중...' : '인증하고 결과 확인하기'}
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
      <Modal
        title={
          <span className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-[#fa5a5a]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.25a1 1 0 01-1 1A17.93 17.93 0 013 5a1 1 0 011-1h3.25a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z"
              />
            </svg>
            상담 신청하기
          </span>
        }
        open={showConsultModal}
        onClose={handleCloseConsultModal}
      >
        <div className="space-y-2 sm:space-y-2.5">
          {consultIsVerified ? (
            <>
              <FireworksEffect show={true} />
              <div className="mb-1 rounded bg-[#f8f8ff] p-2 text-center sm:p-2.5">
                <div className="text-base font-bold text-black sm:text-lg">
                  상담신청이 접수되었습니다.
                </div>
                <div className="mt-1 text-sm text-text-secondary">
                  담당자가 선택하신 상담 시간에 연락드릴 예정입니다.
                </div>
              </div>
            </>
          ) : (
            <div className="mb-1 rounded bg-[#f8f8ff] p-2 text-center text-sm font-semibold text-gray-700">
              상담신청을 위해 아래 정보를 입력해 주세요.
            </div>
          )}
          <div className="mb-0.5 rounded-lg bg-page-bg p-1.5 sm:p-2">
            <h3 className="mb-1.5 flex items-center sm:mb-2">
              <span className="align-middle text-2xl font-extrabold text-[#7c3aed]">{name}</span>
              <span className="align-middle text-lg font-bold text-[#7c3aed]">&nbsp;님</span>
              {insuranceAge !== '' && (
                <span className="ml-2 flex items-center font-bold">
                  <span className="text-lg text-[#3a8094]">보험연령 </span>
                  <span className="mx-1 text-2xl font-extrabold text-[#ef4444]">
                    {insuranceAge}
                  </span>
                  <span className="text-lg text-[#3a8094]">세</span>
                </span>
              )}
            </h3>
            <div className="grid grid-cols-1 gap-1 sm:gap-1.5">
              <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-xs font-medium text-text-secondary sm:text-sm">
                    <span className="mr-1 text-[#3a8094]">▸</span>이름
                  </span>
                  <span className="text-sm font-bold text-[#3a8094] sm:text-base">{name}</span>
                </div>
              </div>
              <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-xs font-medium text-text-secondary sm:text-sm">
                    <span className="mr-1 text-[#3a8094]">▸</span>연락처
                  </span>
                  <span className="text-sm font-bold text-[#3a8094] sm:text-base">{phone}</span>
                </div>
              </div>
              <div
                className={`relative rounded border border-border-default bg-white p-1.5 sm:p-2 ${consultIsVerified ? '' : 'cursor-pointer select-none'}`}
                onClick={
                  consultIsVerified ? undefined : () => setShowConsultTypeDropdown((v) => !v)
                }
                tabIndex={consultIsVerified ? -1 : 0}
                onBlur={
                  consultIsVerified
                    ? undefined
                    : () => setTimeout(() => setShowConsultTypeDropdown(false), 100)
                }
                aria-disabled={consultIsVerified}
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-xs font-medium text-text-secondary sm:text-sm">
                    <span className="mr-1 text-[#3a8094]">▸</span>상담종류
                  </span>
                  <span
                    className={`flex items-center gap-1 text-sm font-bold sm:text-base ${consultIsVerified ? 'text-[#3a8094]' : 'text-[#7c3aed]'}`}
                  >
                    {consultType}
                    {!consultIsVerified && (
                      <svg
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </span>
                </div>
                {!consultIsVerified && showConsultTypeDropdown && (
                  <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded border border-border-default bg-white shadow">
                    {consultTypeOptions.map((opt) => (
                      <div
                        key={opt}
                        className={`cursor-pointer px-4 py-2 text-sm hover:bg-bg-blue ${consultType === opt ? 'font-bold text-[#7c3aed]' : 'text-gray-700'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setConsultType(opt);
                          setShowConsultTypeDropdown(false);
                        }}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div
                className={`relative rounded border border-border-default bg-white p-1.5 sm:p-2 ${consultIsVerified ? '' : 'cursor-pointer select-none'}`}
                onClick={
                  consultIsVerified ? undefined : () => setShowConsultTimeDropdown((v) => !v)
                }
                tabIndex={consultIsVerified ? -1 : 0}
                onBlur={
                  consultIsVerified
                    ? undefined
                    : () => setTimeout(() => setShowConsultTimeDropdown(false), 100)
                }
                aria-disabled={consultIsVerified}
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-xs font-medium text-text-secondary sm:text-sm">
                    <span className="mr-1 text-[#3a8094]">▸</span>상담시간대
                  </span>
                  <span
                    className={`flex items-center gap-1 text-sm font-bold sm:text-base ${consultIsVerified ? 'text-[#3a8094]' : 'text-[#7c3aed]'}`}
                  >
                    {consultTime}
                    {!consultIsVerified && (
                      <svg
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </span>
                </div>
                {!consultIsVerified && showConsultTimeDropdown && (
                  <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-48 overflow-y-auto overscroll-contain rounded border border-border-default bg-white shadow">
                    {consultTimeOptions.map((opt) => (
                      <div
                        key={opt}
                        className={`cursor-pointer px-4 py-2 text-sm hover:bg-bg-blue ${consultTime === opt ? 'font-bold text-[#7c3aed]' : 'text-gray-700'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setConsultTime(opt);
                          setShowConsultTimeDropdown(false);
                        }}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mb-1 rounded bg-[#f8f8ff] p-2 text-center text-xs text-text-secondary">
            📢 상담 중 궁금한 점은 언제든 말씀해 주세요.
          </div>
          {!consultIsVerified && (
            <div className="mt-0 rounded-lg bg-page-bg p-1.5 sm:p-2">
              <h3 className="mb-1 text-sm font-bold text-text-primary sm:text-base">휴대폰 인증</h3>
              <p className="mb-1 text-xs text-text-secondary sm:text-sm">
                상담신청을 위해 휴대폰 인증이 필요합니다.
              </p>
              <div className="mb-2 flex flex-col items-stretch gap-1.5 sm:mb-2.5 sm:flex-row sm:items-center sm:gap-2">
                <input
                  type="text"
                  value={phone}
                  readOnly
                  className="flex-1 rounded-md border border-border-default bg-gray-100 px-3 py-2 text-sm sm:py-2.5 sm:text-base"
                />
                <button
                  type="button"
                  onClick={handleConsultSendOTP}
                  className="w-full min-w-[100px] rounded-md bg-[#f97316] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#ea580c] sm:w-auto sm:min-w-[120px] sm:px-4 sm:py-2.5 sm:text-base"
                >
                  {consultOtpResendAvailable ? '인증번호 전송' : '재발송'}
                </button>
                {!consultOtpResendAvailable && (
                  <div className="flex min-w-[60px] items-center justify-center text-sm font-medium text-[#3a8094]">
                    {formatTime(consultOtpTimer)}
                  </div>
                )}
              </div>
              <div className="mb-2 flex gap-1.5 sm:mb-3 sm:gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  ref={consultOtpInputRef}
                  value={consultOtpCode}
                  onChange={(e) =>
                    setConsultOtpCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))
                  }
                  onFocus={(e) => {
                    if (window.innerWidth < 768) {
                      setTimeout(() => {
                        e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }, 300);
                    }
                  }}
                  maxLength={6}
                  className="flex-1 rounded-md border border-border-default px-3 py-2 text-sm focus:border-[#3a8094] focus:ring-[#3a8094] sm:py-2.5 sm:text-base"
                  placeholder="6자리 인증번호 입력"
                />
              </div>
              <button
                type="button"
                onClick={handleConsultVerifyOTP}
                disabled={verifying || consultOtpCode.length !== 6}
                className={`mt-1 w-full rounded-md px-3 py-2.5 text-base font-semibold transition-colors sm:mt-2 sm:px-4 sm:py-3 sm:text-lg ${verifying || consultOtpCode.length !== 6 ? 'cursor-not-allowed bg-gray-300 text-text-muted' : 'bg-[#3a8094] text-white hover:bg-[#2c6070]'}`}
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
