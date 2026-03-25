import React, { useState, useEffect, useRef } from 'react';
import { CalculatorIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import Modal from '@/components/Modal';
import request from '@/app/api/request';
import { getProductConfigByPath, getTemplateIdByPath } from '@/constants/insurance';
import { supabase } from '@/app/api/supabase';
import { trackPremiumCheck } from '@/lib/visitorTracking';
import FireworksEffect from '@/components/shared/FireworksEffect';
import { useInsuranceForm } from '@/hooks/useInsuranceForm';
import { useOTP } from '@/hooks/useOTP';

// 현재 경로에 맞는 상품 정보 가져오기
const currentPath = '/insurance/annuity/kdb/happy-dream';
const productConfig = getProductConfigByPath(currentPath);

const INSURANCE_COMPANY_ID = 2; // KDB 생명보험
const INSURANCE_PRODUCT_ID = 2; // KDB 더!행복드림변액연금보험 id 코드값

type SloganProps = {
  onOpenPrivacy: () => void;
  onModalStateChange?: (isOpen: boolean) => void;
};

export default function Slogan({ onOpenPrivacy, onModalStateChange }: SloganProps) {
  const [counselType, setCounselType] = useState(1); // 1: 보험료 확인, 2: 상담신청
  const [currentPensionStartAge, setCurrentPensionStartAge] = useState<number | null>(null);

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
    minAge: 15,
    maxAge: 70,
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

  // ── Product Specific State ──

  // 연금액 계산 (미리 표시용 - 기본 로직 제거, 서버 값 도착 후 표시)
  const [serverPension, setServerPension] = useState<{
    monthly: number;
    performance: number;
    guaranteed: number;
    totalUntil100: number;
    pensionStartAge: number | null;
    notice?: string;
  } | null>(null);

  // 인증 직후 확정된 값(카톡에 사용한 것과 동일)을 별도로 보관하여 프리페치 레이스에 영향받지 않도록 함
  const [verifiedPension, setVerifiedPension] = useState<{
    monthly: number;
    performance: number;
    guaranteed: number;
    totalUntil100: number;
    pensionStartAge: number | null;
  } | null>(null);

  // ── Override Handlers to reset pension states ──

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
    setIsVerified(false);
    setVerifiedPension(null);
    setServerPension(null);
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsVerified(false);
    setVerifiedPension(null);
    setServerPension(null);
  };

  const handlePaymentPeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentPeriod(e.target.value);
    setIsVerified(false);
    setVerifiedPension(null);
    setServerPension(null);
  };

  const handlePaymentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentAmount(e.target.value);
    setIsVerified(false);
    setVerifiedPension(null);
    setServerPension(null);
  };

  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    baseHandleBirthChange(e);
    setIsVerified(false);
    setVerifiedPension(null);
    setServerPension(null);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    baseHandlePhoneChange(e);
    setIsVerified(false);
    setVerifiedPension(null);
    setServerPension(null);
  };

  const handleCloseModal = () => {
    baseHandleCloseModal();
    setVerifiedPension(null);
    setServerPension(null);
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
      companyName: 'KDB생명',
      productName: '더!행복드림변액연금보험',
    });
  };

  const handleSendOTP = async () => {
    const ageForOtp = insuranceAge !== '' ? Number(insuranceAge) : NaN;
    if (isNaN(ageForOtp) || ageForOtp < 15 || ageForOtp > 70) return;

    setOtpTimer(180);
    setOtpResendAvailable(false);
    await handlePostOTP();
    setTimeout(() => {
      otpInputRef.current?.focus();
      otpInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  };

  // ── Product Specific Logic ──

  // 연금개시연령 계산 함수 (기본 로직)
  const getPensionStartAge = (age: number, paymentPeriod: string) => {
    const years = parseInt(paymentPeriod.replace(/[^0-9]/g, ''));
    const completionAge = age + years;
    let minStartAge = 65;
    if (completionAge >= 80) minStartAge = 80;
    else if (completionAge >= 75) minStartAge = 75;
    else if (completionAge >= 70) minStartAge = 70;
    else if (completionAge >= 65) minStartAge = 65;
    return Math.max(completionAge, minStartAge);
  };

  // 엑셀 데이터 기반 연금 계산 함수 (비동기)
  const fetchExcelPension = async (
    age: number,
    paymentPeriod: string,
    paymentAmount: string,
    gender: string
  ) => {
    try {
      let monthlyPayment = 0;
      if (paymentAmount.includes('만원')) {
        const num = parseInt(paymentAmount.replace(/[^0-9]/g, ''));
        monthlyPayment = num * 10000;
      } else {
        monthlyPayment = parseInt(paymentAmount.replace(/[^0-9]/g, ''));
      }
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
          productType: 'happy-dream', // happy-dream
        }),
      });

      if (!response.ok) return getDefaultPension(age, paymentPeriod);

      const data = await response.json();
      if (data.error || !data.data) return getDefaultPension(age, paymentPeriod);

      return {
        monthly: data.data.monthlyPension || 0,
        performance: data.data.performancePension || 0, // 변액연금 실적배당 가정액
        guaranteed: data.data.guaranteedAmount || 0,
        totalUntil100: data.data.totalUntil100 || 0,
        pensionStartAge: data.data.pensionStartAge || null,
        notice: data.data.notice,
      };
    } catch (error) {
      console.error('엑셀 기반 연금 계산 오류:', error);
      return getDefaultPension(age, paymentPeriod);
    }
  };

  const getDefaultPension = (age: number, paymentPeriod: string) => {
    return {
      monthly: 0,
      performance: 0,
      guaranteed: 0,
      totalUntil100: 0,
      pensionStartAge: getPensionStartAge(age, paymentPeriod),
      notice: '',
    };
  };

  // 선택된 값이 변경될 때마다 엑셀 데이터 기반으로 연금개시연령 계산
  useEffect(() => {
    const calculateCurrentPensionStartAge = async () => {
      if (!paymentPeriod || !paymentAmount || !gender || !insuranceAge) {
        setCurrentPensionStartAge(null);
        return;
      }
      try {
        let monthlyPayment = 0;
        if (paymentAmount.includes('만원')) {
          const num = parseInt(paymentAmount.replace(/[^0-9]/g, ''));
          monthlyPayment = num * 10000;
        } else {
          monthlyPayment = parseInt(paymentAmount.replace(/[^0-9]/g, ''));
        }
        const years = parseInt(paymentPeriod.replace(/[^0-9]/g, ''));

        const response = await fetch('/api/calculate-pension/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerName: 'temp',
            gender,
            age: Number(insuranceAge),
            paymentPeriod: years,
            monthlyPayment,
            productType: 'happy-dream',
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.data && data.data.pensionStartAge) {
            setCurrentPensionStartAge(data.data.pensionStartAge);
            return;
          }
        }
        setCurrentPensionStartAge(getPensionStartAge(Number(insuranceAge), paymentPeriod));
      } catch (error) {
        setCurrentPensionStartAge(getPensionStartAge(Number(insuranceAge), paymentPeriod));
      }
    };
    calculateCurrentPensionStartAge();
  }, [paymentPeriod, paymentAmount, gender, insuranceAge]);

  // 납입기간 버튼 비활성화 여부 확인
  const is15YearDisabled = Number(insuranceAge) + 15 > 80;
  const is20YearDisabled = Number(insuranceAge) + 20 > 80;

  // Supabase에 사용자 생성 및 상담 기록 저장 (Custom logic in happy-dream)
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
    if (isNaN(ageForVerify) || ageForVerify < 15 || ageForVerify > 70) return;
    if (otpCode.length !== 6) {
      alert('6자리 인증번호를 입력해 주세요.');
      return;
    }

    setVerifying(true);
    try {
      // 연금액 계산 (비동기)
      const p = await fetchExcelPension(Number(insuranceAge), paymentPeriod, paymentAmount, gender);

      setVerifiedPension({
        monthly: p.monthly,
        performance: p.performance,
        guaranteed: p.guaranteed,
        totalUntil100: p.totalUntil100,
        pensionStartAge: p.pensionStartAge,
      });

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
        mounthlyPremium: paymentAmount,
        paymentPeriod: paymentPeriod,
        monthlyPension: p.monthly,
        performancePension: p.performance,
        guaranteedPension: p.guaranteed,
        pensionStartAge: p.pensionStartAge,
        totalUntil100: p.totalUntil100,
        templateId: 'UB_8705',
        adminTemplateId: 'UA_8331',
      };

      const res = await request.post('/api/verifyOTP', requestData);

      if (res.data.success) {
        // Supabase Save
        await saveToSupabase(1); // 1: 보험료 확인

        // Tracker
        try {
          await trackPremiumCheck(INSURANCE_PRODUCT_ID, INSURANCE_COMPANY_ID, {
            phone,
            name,
            counsel_type_id: 1,
            utm_source: 'direct',
            utm_campaign: 'premium_calculation',
          });
        } catch (e) {}

        setIsVerified(true);
        setOtpSent(false);
        alert('인증이 완료되었습니다!');
      } else {
        alert('인증에 실패했습니다.');
      }
    } catch (e: any) {
      alert('인증에 실패했습니다. 다시 시도해주세요.');
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

    if (!name || !birth || !gender || !phone) {
      alert('필수 정보가 누락되었습니다. 모든 정보를 입력해주세요.');
      return;
    }

    setVerifying(true);
    try {
      let calculatedPensionAmounts = {
        monthly: 0,
        performance: 0,
        totalUntil100: 0,
        pensionStartAge: 0,
        notice: '',
      };
      if (paymentPeriod && paymentAmount) {
        const p = await fetchExcelPension(
          Number(insuranceAge),
          paymentPeriod,
          paymentAmount,
          gender
        );
        calculatedPensionAmounts = {
          monthly: p.monthly,
          performance: p.performance,
          totalUntil100: p.totalUntil100,
          pensionStartAge: p.pensionStartAge || 0,
          notice: p.notice || '',
        };
      }

      const res = await request.post('/api/verifyOTP', {
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
        monthlyPension: calculatedPensionAmounts.monthly,
        performancePension: calculatedPensionAmounts.performance,
        templateId: 'UB_8715',
        adminTemplateId: 'UA_8332',
      });

      if (res.data.success) {
        await saveToSupabase(2); // 2: 상담신청
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
      companyName: 'KDB생명',
      productName: '더!행복드림변액연금보험',
    });
  };

  // 총 납입액 계산
  let amount = 0;
  if (paymentAmount.includes('만원')) {
    const num = parseInt(paymentAmount.replace(/[^0-9]/g, ''));
    amount = num * 10000;
  } else {
    amount = parseInt(paymentAmount.replace(/[^0-9]/g, ''));
  }
  const months = parseInt(paymentPeriod.replace(/[^0-9]/g, '')) * 12;
  const total = !isNaN(amount) && !isNaN(months) && amount > 0 && months > 0 ? amount * months : 0;

  // 연금액 계산 (미리 표시용 - 기본 로직 제거, 서버 값 도착 후 표시)
  // UseEffect for prefetch is already handled by serverPension state

  useEffect(() => {
    const prefetch = async () => {
      setServerPension(null);
      if (!paymentPeriod || !paymentAmount || !gender || !insuranceAge) return;
      const p = await fetchExcelPension(Number(insuranceAge), paymentPeriod, paymentAmount, gender);
      setServerPension({
        monthly: p.monthly,
        performance: p.performance,
        guaranteed: p.guaranteed,
        totalUntil100: p.totalUntil100,
        pensionStartAge: p.pensionStartAge,
        notice: p.notice,
      });
    };
    prefetch();
  }, [paymentPeriod, paymentAmount, gender, insuranceAge]);

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
        className="w-full bg-purple-600 py-6 md:py-10 lg:py-3"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 2px, transparent 2px)',
          backgroundSize: '20px 20px',
        }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 px-4 md:flex-col md:items-center md:gap-8 md:px-6 md:py-4 lg:flex-row lg:items-start lg:justify-between lg:gap-12 lg:px-4 lg:py-4">
          {/* 왼쪽: 상품 설명/이미지 */}
          <div className="flex flex-1 flex-col items-center text-center md:items-center md:text-center lg:items-start lg:text-left">
            <div className="mb-2 flex items-center gap-2 text-sm text-white">
              {/* <img src="/kdb-logo.png" alt="KDB 로고" className="h-6 w-auto" style={{minWidth:'24px'}} /> */}
            </div>
            <h1 className="mb-3 text-2xl font-bold leading-tight text-white sm:mb-4 sm:text-3xl md:mb-6 md:text-4xl lg:mb-4 lg:text-5xl">
              20년까지 연단리 7%!
              <br />
              변액연금보험!
            </h1>
            <ul className="mb-3 space-y-1 sm:mb-5 sm:space-y-1.5 md:mb-8 md:space-y-2.5 lg:mb-8 lg:space-y-2">
              <li className="flex items-center justify-center text-sm text-white sm:text-base md:justify-center md:text-lg lg:justify-start lg:text-lg">
                <span className="mr-1 flex-shrink-0 text-sm text-[#ffd700] sm:mr-1.5 sm:text-base md:mr-2.5 md:text-lg lg:mr-2 lg:text-xl">
                  ✔
                </span>
                <span className="leading-tight">
                  연단리 7% 최저연금기준금액 보증{' '}
                  <span className="text-[10px] text-gray-300 sm:text-xs">(20년까지)</span>
                </span>
              </li>
              <li className="flex items-center justify-center text-sm text-white sm:text-base md:justify-center md:text-lg lg:justify-start lg:text-lg">
                <span className="mr-1 flex-shrink-0 text-sm text-[#ffd700] sm:mr-1.5 sm:text-base md:mr-2.5 md:text-lg lg:mr-2 lg:text-xl">
                  ✔
                </span>
                <span>가입 15~70세 / 연금개시 55~80세</span>
              </li>
              <li className="flex items-center justify-center text-sm text-white sm:text-base md:justify-center md:text-lg lg:justify-start lg:text-lg">
                <span className="mr-1 flex-shrink-0 text-sm text-[#ffd700] sm:mr-1.5 sm:text-base md:mr-2.5 md:text-lg lg:mr-2 lg:text-xl">
                  ✔
                </span>
                <span>실적배당 종신연금 보증지급</span>
              </li>
              <li className="flex items-center justify-center text-sm text-white sm:text-base md:justify-center md:text-lg lg:justify-start lg:text-lg">
                <span className="mr-1 flex-shrink-0 text-sm text-[#ffd700] sm:mr-1.5 sm:text-base md:mr-2.5 md:text-lg lg:mr-2 lg:text-xl">
                  ✔
                </span>
                <span>최저사망적립액 보증 / 선지급행복자금</span>
              </li>
            </ul>
            {/* 보증 내용 박스 */}
            <div className="mx-auto mb-3 w-full max-w-2xl rounded-xl bg-white p-4 px-4 pb-5 pt-5 shadow-lg sm:mb-4 sm:p-5 sm:px-5 sm:pb-6 sm:pt-6 md:p-6 md:px-6 md:pb-7 md:pt-7 lg:max-w-3xl lg:p-4 lg:px-4 lg:pb-6 lg:pt-6">
              <div className="mb-2 grid grid-cols-3 gap-2 sm:mb-3 sm:gap-3 md:gap-4 lg:gap-3">
                {/* 1. 생존 시 최대 100세까지 */}
                <div className="flex min-h-[120px] flex-col justify-between rounded-lg border border-purple-200 bg-gradient-to-br from-purple-100 to-purple-200 p-1.5 text-center shadow-md transition-all duration-300 sm:min-h-[140px] sm:p-2 md:min-h-[160px] md:p-3 lg:p-3">
                  <div>
                    <div className="mb-1 inline-block rounded-full bg-gradient-to-r from-purple-600 to-purple-700 px-1.5 py-1 text-[10px] font-bold text-white shadow-md sm:mb-2 sm:px-2 sm:py-1.5 sm:text-xs md:px-3 md:text-sm">
                      생존 시 최대 100세까지
                    </div>
                  </div>
                  <div className="flex flex-1 items-center justify-center">
                    <div className="text-[10px] font-medium leading-tight text-gray-700 sm:text-xs">
                      (예시) 100세
                      <br />
                      최종연금지급일
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/50 p-1 text-[10px] leading-tight text-text-secondary sm:p-1.5 sm:text-xs">
                    = 피보험자의 99세
                    <br />
                    계약 해당일
                  </div>
                </div>

                {/* 2. 보증금리 Top */}
                <div className="relative flex min-h-[120px] flex-col justify-between overflow-hidden rounded-lg border border-pink-200 bg-gradient-to-br from-pink-100 to-pink-200 p-1.5 text-center shadow-md transition-all duration-300 sm:min-h-[140px] sm:p-2 md:min-h-[160px] md:p-3 lg:p-3">
                  <div className="animate-shine-strong absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent"></div>
                  <div className="relative z-10">
                    <div className="mb-1 inline-block rounded-full bg-gradient-to-r from-pink-600 to-pink-700 px-1.5 py-1 text-[10px] font-bold text-white shadow-md sm:mb-2 sm:px-2 sm:py-1.5 sm:text-xs md:px-3 md:text-sm">
                      보증금리 Top
                    </div>
                    <div className="mb-2 flex items-center justify-center">
                      <div className="mr-1 text-[10px] font-semibold leading-tight text-gray-700 sm:mr-2 sm:text-xs">
                        최대
                        <br />
                        연단리
                      </div>
                      <div className="animate-bounce text-2xl font-black text-orange-600 drop-shadow-2xl sm:text-3xl md:text-4xl">
                        7%
                      </div>
                    </div>
                  </div>
                  <div className="relative z-10 mt-auto space-y-0.5 text-[10px] leading-tight text-text-secondary sm:space-y-1 sm:text-xs">
                    <div className="rounded-lg bg-white/60 p-0.5 font-medium sm:p-1">
                      계약일로부터
                      <br />
                      20년: 7%
                    </div>
                    <div className="rounded-lg bg-white/60 p-0.5 font-medium sm:p-1">
                      20년~연금개시까지: <span className="font-bold text-brand-primary">6%</span>
                    </div>
                  </div>
                </div>

                {/* 3. 사망 시에도 보장 */}
                <div className="flex min-h-[120px] flex-col justify-between rounded-lg border border-indigo-200 bg-gradient-to-br from-indigo-100 to-indigo-200 p-1.5 text-center shadow-md transition-all duration-300 sm:min-h-[140px] sm:p-2 md:min-h-[160px] md:p-3 lg:p-3">
                  <div>
                    <div className="mb-1 inline-block rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 px-1.5 py-1 text-[10px] font-bold text-white shadow-md sm:mb-2 sm:px-2 sm:py-1.5 sm:text-xs md:px-3 md:text-sm">
                      사망시에도
                      <br />
                      보장
                    </div>
                  </div>
                  <div className="flex flex-1 items-center justify-center">
                    <div className="text-[10px] font-bold leading-tight text-gray-800 sm:text-xs">
                      최저 사망적립액
                      <br />
                      보장
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/50 p-1 text-[10px] leading-tight text-text-secondary sm:p-1.5 sm:text-xs">
                    장래 공시이율과
                    <br />
                    관계없이
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center text-xs text-text-muted">
                <p>
                  ※ 대표계약기준(40세 남자, 10년납, 연금개시 나이 65세), 복리이자율로 환산시 4.32%
                </p>
              </div>
            </div>
          </div>
          {/* 오른쪽: 보험료 확인 카드 */}
          <div className="flex w-full flex-1 justify-center lg:ml-8 lg:justify-end lg:self-center">
            <div
              id="calculator-box"
              className="relative flex w-full max-w-md flex-col rounded-2xl bg-white p-5 shadow-2xl sm:max-w-lg sm:p-6 md:p-7"
            >
              <div className="mb-5 sm:mb-6">
                <div className="mb-1 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#c084fc] to-[#9333ea]">
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
                {/* 성별/이름 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                      성별 <span className="text-status-red">*</span>
                    </label>
                    <div className="flex gap-2">
                      <label
                        className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg border-2 py-2.5 transition-all ${gender === 'M' ? 'border-[#c084fc] bg-[#c084fc]/5 text-[#c084fc]' : 'border-border-default hover:border-border-default'}`}
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
                        className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg border-2 py-2.5 transition-all ${gender === 'F' ? 'border-[#c084fc] bg-[#c084fc]/5 text-[#c084fc]' : 'border-border-default hover:border-border-default'}`}
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
                      이름 <span className="text-status-red">*</span>
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
                      className="w-full rounded-lg border border-border-default px-3 py-2.5 text-sm transition-all focus:border-[#c084fc] focus:ring-2 focus:ring-[#c084fc]/20"
                      placeholder="홍길동"
                    />
                  </div>
                </div>

                {/* 생년월일/연락처 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                      생년월일 <span className="text-status-red">*</span>
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      ref={birthInputRef}
                      value={birth}
                      onChange={handleBirthChange}
                      onFocus={handleInputFocus}
                      className="w-full rounded-lg border border-border-default px-3 py-2.5 text-sm transition-all focus:border-[#c084fc] focus:ring-2 focus:ring-[#c084fc]/20"
                      placeholder="19880818"
                      maxLength={8}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                      연락처 <span className="text-status-red">*</span>
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      ref={phoneInputRef}
                      value={phone}
                      onChange={handlePhoneChange}
                      onFocus={handleInputFocus}
                      className="w-full rounded-lg border border-border-default px-3 py-2.5 text-sm transition-all focus:border-[#c084fc] focus:ring-2 focus:ring-[#c084fc]/20"
                      placeholder="01012345678"
                    />
                  </div>
                </div>

                {/* 납입기간 */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                    납입기간
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['10년', '15년', '20년'].map((period) => (
                      <label key={period} className="relative cursor-pointer">
                        {period === '10년' && (
                          <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 animate-bounce rounded-full bg-gradient-to-r from-[#c084fc] to-[#9333ea] px-2.5 py-0.5 text-xs font-bold text-white shadow-lg">
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
                          className={`w-full rounded-lg border-2 py-2.5 text-center text-sm transition-all ${paymentPeriod === period ? 'border-[#c084fc] bg-[#c084fc]/5 font-bold text-[#c084fc]' : 'border-border-default hover:border-border-default'}`}
                        >
                          {period}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 월 납입금액 */}
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
                          className={`w-full rounded-lg border-2 py-2.5 text-center text-sm transition-all ${paymentAmount === amount ? 'border-[#c084fc] bg-[#c084fc]/5 font-bold text-[#c084fc]' : 'border-border-default hover:border-border-default'}`}
                        >
                          {amount}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 개인정보 동의 */}
                <div className="mb-4 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="h-4 w-4 cursor-pointer rounded border-border-default text-[#c084fc] focus:ring-[#c084fc]"
                  />
                  <span className="text-xs text-text-secondary">
                    개인정보 수집 및 이용에 동의합니다.
                    <button
                      type="button"
                      onClick={onOpenPrivacy}
                      className="ml-1 text-[#c084fc] underline hover:text-[#9333ea]"
                    >
                      자세히 보기
                    </button>
                  </span>
                </div>

                {/* 버튼들 */}
                <div className="mt-1 flex flex-col gap-2">
                  <button
                    type="submit"
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c084fc] to-[#9333ea] py-3.5 text-base font-bold text-white shadow-lg shadow-[#c084fc]/25 transition hover:opacity-95"
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
              이 상품은 15세~70세까지만 가입 가능합니다. 현재 보험연령 {numericInsuranceAge}세는
              가입 대상이 아닙니다. 계산 기능은 이용하실 수 없습니다.
            </div>
          )}
          {/* 보험료 산출 완료 안내 박스 (인증 후) */}
          {isVerified && (
            <>
              <FireworksEffect show={true} />
              <div className="mb-1.5 rounded bg-[#f8f8ff] p-2 text-center sm:mb-2 sm:p-2.5">
                <div className="text-base font-bold text-black sm:text-lg">
                  연금액 산출이 완료되었습니다.
                </div>
              </div>
              {/* 보험료 결과값 UI (상세 정보) */}
              <div className="rounded-lg bg-page-bg p-1.5 sm:p-2">
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
                    <span className="font-bold text-[#3a8094]">KDB생명</span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>상품명
                    </span>
                    <span className="font-bold text-[#3a8094]">더!행복드림변액연금보험</span>
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
                {/* 총 납입액 */}
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
                {/* 연금개시연령 */}
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
                {/* 월 연금액 */}
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>월 연금액
                    </span>
                    <span className="font-bold">
                      <span className="text-[#3b82f6]">
                        {isVerified
                          ? `약 ${serverPension?.monthly.toLocaleString('en-US')}`
                          : '인증 후 확인가능'}
                      </span>
                      {isVerified && <span className="text-[#3a8094]"> 원</span>}
                    </span>
                  </div>
                </div>
                {/* 20년 보증기간 연금액 */}
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>20년 보증기간 연금액
                    </span>
                    <span className="font-bold">
                      <span className="text-[#ef4444]">
                        {isVerified
                          ? (serverPension?.guaranteed || 0) > 0
                            ? `약 ${serverPension?.guaranteed?.toLocaleString('en-US')}`
                            : '별도 상담 문의'
                          : '인증 후 확인가능'}
                      </span>
                      {isVerified && <span className="text-[#3a8094]"> 원</span>}
                    </span>
                  </div>
                </div>
                {/* 100세까지 생존 시 총 받는 금액 */}
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>100세까지 생존 시 총 받는 금액
                    </span>
                    <span className="font-bold">
                      <span className="text-[#10b981]">
                        {isVerified
                          ? `약 ${serverPension?.totalUntil100.toLocaleString('en-US')}`
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
              {/* 보험료 계산 결과 */}
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
                    {isVerified ? (
                      <span className="font-bold text-[#3a8094]">KDB생명</span>
                    ) : (
                      <span className="text-xs font-medium text-[#7c3aed]">🔒 인증 후 확인</span>
                    )}
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>상품명
                    </span>
                    {isVerified ? (
                      <span className="font-bold text-[#3a8094]">더!행복드림변액연금보험</span>
                    ) : (
                      <span className="text-xs font-medium text-[#7c3aed]">🔒 인증 후 확인</span>
                    )}
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
                {/* 총 납입액 */}
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
                {/* 연금개시연령 */}
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
                {/* 월 연금액 */}
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
                {/* 20년 보증기간 연금액 */}
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
                {/* 100세까지 생존 시 총 받는 금액 */}
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
              {/* 휴대폰 인증 안내 및 인증번호 입력란을 항상 노출 */}
              <div className="mt-0 rounded-lg bg-page-bg p-2">
                <h3 className="mb-1 text-base font-bold text-text-primary">휴대폰 인증</h3>
                <p className="mb-1 text-sm text-text-secondary">
                  정확한 보험료 확인을 위해 휴대폰 인증이 필요합니다.
                </p>
                <div className="mb-1 flex flex-col items-stretch gap-1 sm:flex-row sm:items-center">
                  <input
                    type="text"
                    value={phone}
                    readOnly
                    className="flex-1 rounded-md border border-border-default bg-gray-100 px-4 py-2 text-base"
                  />
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={!isAgeEligible}
                    className={`${!isAgeEligible ? 'cursor-not-allowed bg-gray-300 text-text-muted' : 'bg-[#f97316] text-white hover:bg-[#ea580c]'} w-full min-w-[80px] rounded-md px-2 py-1 text-sm font-medium transition-colors sm:w-auto`}
                  >
                    {otpResendAvailable ? '인증번호 전송' : '재발송'}
                  </button>
                  {!otpResendAvailable && (
                    <div className="flex min-w-[60px] items-center justify-center text-xs font-medium text-[#3a8094]">
                      {formatTime(otpTimer)}
                    </div>
                  )}
                </div>
                <div className="mb-1 flex gap-1">
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
                    className="flex-1 rounded-md border border-border-default px-2 py-2 text-sm focus:border-[#3a8094] focus:ring-[#3a8094]"
                    placeholder="6자리 인증번호 입력"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleVerifyOTP}
                  disabled={!isAgeEligible || verifying || otpCode.length !== 6}
                  className={`mt-1 w-full rounded-md px-2 py-2.5 text-base font-semibold transition-colors ${!isAgeEligible || verifying || otpCode.length !== 6 ? 'cursor-not-allowed bg-gray-300 text-text-muted' : 'bg-[#3a8094] text-white hover:bg-[#2c6070]'}`}
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
        <div className="space-y-3">
          {/* 안내문구 */}
          {consultIsVerified ? (
            <>
              <FireworksEffect show={true} />
              <div className="mb-1 rounded bg-[#f8f8ff] p-3 text-center">
                <div className="text-lg font-bold text-black">상담신청이 접수되었습니다.</div>
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
          <div className="mb-0.5 rounded-lg bg-page-bg p-2.5">
            <h3 className="mb-2 flex items-center">
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
            <div className="grid grid-cols-1 gap-1.5">
              <div className="rounded border border-border-default bg-white p-2.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-sm font-medium text-text-secondary">
                    <span className="mr-1 text-[#3a8094]">▸</span>이름
                  </span>
                  <span className="text-base font-bold text-[#3a8094]">{name}</span>
                </div>
              </div>
              <div className="rounded border border-border-default bg-white p-2.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-sm font-medium text-text-secondary">
                    <span className="mr-1 text-[#3a8094]">▸</span>연락처
                  </span>
                  <span className="text-base font-bold text-[#3a8094]">{phone}</span>
                </div>
              </div>
              <div
                className={`relative rounded border border-border-default bg-white p-2.5 ${consultIsVerified ? '' : 'cursor-pointer select-none'}`}
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
                  <span className="text-sm font-medium text-text-secondary">
                    <span className="mr-1 text-[#3a8094]">▸</span>상담종류
                  </span>
                  <span
                    className={`flex items-center gap-1 text-base font-bold ${consultIsVerified ? 'text-[#3a8094]' : 'text-[#7c3aed]'}`}
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
                className={`relative rounded border border-border-default bg-white p-2.5 ${consultIsVerified ? '' : 'cursor-pointer select-none'}`}
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
                  <span className="text-sm font-medium text-text-secondary">
                    <span className="mr-1 text-[#3a8094]">▸</span>상담시간대
                  </span>
                  <span
                    className={`flex items-center gap-1 text-base font-bold ${consultIsVerified ? 'text-[#3a8094]' : 'text-[#7c3aed]'}`}
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
          {/* 상담 안내 박스 */}
          <div className="mb-1 rounded bg-[#f8f8ff] p-2 text-center text-xs text-text-secondary">
            📢 상담 중 궁금한 점은 언제든 말씀해 주세요.
          </div>
          {/* 휴대폰 인증 안내 */}
          {!consultIsVerified && (
            <div className="mt-0 rounded-lg bg-page-bg p-2">
              <h3 className="mb-1 text-base font-bold text-text-primary">휴대폰 인증</h3>
              <p className="mb-1 text-sm text-text-secondary">
                상담신청을 위해 휴대폰 인증이 필요합니다.
              </p>
              <div className="mb-1 flex flex-col items-stretch gap-1 sm:flex-row sm:items-center">
                <input
                  type="text"
                  value={phone}
                  readOnly
                  className="flex-1 rounded-md border border-border-default bg-gray-100 px-4 py-2 text-base"
                />
                <button
                  type="button"
                  onClick={handleConsultSendOTP}
                  className="w-full min-w-[80px] rounded-md bg-[#f97316] px-2 py-1 text-sm font-medium text-white transition-colors hover:bg-[#ea580c] sm:w-auto"
                >
                  {consultOtpResendAvailable ? '인증번호 전송' : '재발송'}
                </button>
                {!consultOtpResendAvailable && (
                  <div className="flex min-w-[60px] items-center justify-center text-xs font-medium text-[#3a8094]">
                    {formatTime(consultOtpTimer)}
                  </div>
                )}
              </div>
              <div className="mb-1 flex gap-1">
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
                  className="flex-1 rounded-md border border-border-default px-2 py-2 text-sm focus:border-[#3a8094] focus:ring-[#3a8094]"
                  placeholder="6자리 인증번호 입력"
                />
              </div>
              <button
                type="button"
                onClick={handleConsultVerifyOTP}
                disabled={verifying || consultOtpCode.length !== 6}
                className={`mt-1 w-full rounded-md px-2 py-2.5 text-base font-semibold transition-colors ${verifying || consultOtpCode.length !== 6 ? 'cursor-not-allowed bg-gray-300 text-text-muted' : 'bg-[#3a8094] text-white hover:bg-[#2c6070]'}`}
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
