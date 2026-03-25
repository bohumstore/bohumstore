import React, { useEffect } from 'react';
import { CalculatorIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import Modal from '@/components/Modal';
import request from '@/app/api/request';
import {
  getProductConfigByPath,
  getTemplateIdByPath,
  INSURANCE_COMPANIES,
  INSURANCE_PRODUCTS,
} from '@/constants/insurance';
import FireworksEffect from '@/components/shared/FireworksEffect';
import { trackPremiumCheck } from '@/lib/visitorTracking';
import { getRefundRate, PaymentPeriod, Gender } from '../data/refundRateTable';
import { useInsuranceForm } from '@/hooks/useInsuranceForm';
import { useOTP } from '@/hooks/useOTP';

// 현재 경로에 맞는 상품 정보 가져오기
const currentPath = '/insurance/whole-life/metlife/usd';
const productConfig = getProductConfigByPath(currentPath);

const INSURANCE_COMPANY_ID = INSURANCE_COMPANIES.METLIFE; // 메트라이프생명
const INSURANCE_PRODUCT_ID = INSURANCE_PRODUCTS.METLIFE_USD; // (무)백만인을위한달러종신보험Plus

// 기준환율 (원/달러)
const BASE_EXCHANGE_RATE = 1450;

type SloganProps = {
  onOpenPrivacy: () => void;
  onModalStateChange?: (isOpen: boolean) => void;
};

export default function Slogan({ onOpenPrivacy, onModalStateChange }: SloganProps) {
  // ── 공통 훅 ──
  const form = useInsuranceForm();
  const otp = useOTP();

  const {
    counselType,
    setCounselType,
    name,
    gender,
    birth,
    phone,
    paymentPeriod,
    paymentAmount,
    isChecked,
    setIsChecked,
    isVerified,
    setIsVerified,
    nameInputRef,
    birthInputRef,
    phoneInputRef,
    handleInputFocus,
    handleGenderChange,
    handleNameChange,
    handleBirthChange,
    handlePhoneChange,
    handlePaymentPeriodChange,
    handlePaymentAmountChange,
    validateForm,
    getInsuranceAge,
    insuranceAge,
    isAgeKnown,
    numericInsuranceAge,
    formatTime,
  } = form;

  const {
    otpSent,
    setOtpSent,
    otpCode,
    setOtpCode,
    otpTimer,
    setOtpTimer,
    otpResendAvailable,
    setOtpResendAvailable,
    consultOtpCode,
    setConsultOtpCode,
    consultOtpTimer,
    consultOtpResendAvailable,
    consultIsVerified,
    setConsultIsVerified,
    verifying,
    setVerifying,
    errorMsg,
    showResultModal,
    setShowResultModal,
    showConsultModal,
    setShowConsultModal,
    showConsultTypeDropdown,
    setShowConsultTypeDropdown,
    showConsultTimeDropdown,
    setShowConsultTimeDropdown,
    otpInputRef,
    consultOtpInputRef,
    handleCloseConsultModal,
  } = otp;

  // ── 상품별 설정 ──
  const [consultType, setConsultType] = React.useState('달러종신보험');
  const [consultTime, setConsultTime] = React.useState('아무때나');
  const consultTypeOptions = ['달러종신보험'];
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

  // ── 상품별 연령 로직 ──
  // 납입기간별 가입 가능 연령 범위
  const getAgeRange = (period: string) => {
    if (period.includes('5')) return { min: 15, max: 64 };
    if (period.includes('7')) return { min: 15, max: 66 };
    if (period.includes('10')) return { min: 15, max: 69 };
    return { min: 15, max: 70 }; // 기본값
  };

  const ageRange = getAgeRange(paymentPeriod);
  const isAgeEligible =
    isAgeKnown && numericInsuranceAge >= ageRange.min && numericInsuranceAge <= ageRange.max;

  // 가능한 납입기간 찾기
  const getAvailablePaymentPeriods = (age: number) => {
    const available = [];
    if (age >= 15 && age <= 64) available.push('5년납');
    if (age >= 15 && age <= 66) available.push('7년납');
    if (age >= 15 && age <= 69) available.push('10년납');
    return available;
  };

  const availablePaymentPeriods = isAgeKnown ? getAvailablePaymentPeriods(numericInsuranceAge) : [];

  // 모달 상태 변경 시 부모에게 알림
  useEffect(() => {
    const isAnyModalOpen = showResultModal || showConsultModal;
    onModalStateChange?.(isAnyModalOpen);
  }, [showResultModal, showConsultModal, onModalStateChange]);

  // ── OTP 전송 설정 ──
  const otpConfig = {
    templateId: getTemplateIdByPath(currentPath) || 'UA_7754',
    companyName: productConfig?.config.companyName || '메트라이프생명',
    productName: productConfig?.config.name || '백만인을위한달러종신보험Plus',
    phone,
  };

  // ── 이벤트 핸들러 (상품별 로직) ──
  const handleInsuranceCostCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setCounselType(1);
    setShowResultModal(true);
  };

  const handleVerifyAndShowInfo = () => {
    if (otpCode.length !== 6) {
      alert('6자리 인증번호를 입력해주세요.');
      return;
    }
    setIsVerified(true);
    alert('인증이 완료되었습니다!');
  };

  const handlePostOTP = async () => {
    await otp.handlePostOTP(otpConfig);
  };

  const handleSendOTP = async () => {
    const ageForOtp = insuranceAge !== '' ? Number(insuranceAge) : NaN;
    if (isNaN(ageForOtp) || ageForOtp < 15 || ageForOtp > 70) return;
    await otp.handleSendOTP(otpConfig);
  };

  const handleConsultSendOTP = async () => {
    await otp.handleConsultSendOTP(otpConfig);
  };

  const handleCloseModal = () => {
    setIsVerified(false);
    otp.handleCloseModal();
  };

  const handleOpenConsultModal = () => {
    if (!validateForm()) return;
    otp.handleOpenConsultModal();
  };

  const handleVerifyOTP = async () => {
    const ageForVerify = insuranceAge !== '' ? Number(insuranceAge) : NaN;
    if (isNaN(ageForVerify) || ageForVerify < 15 || ageForVerify > 70) return;
    if (otpCode.length !== 6) {
      alert('6자리 인증번호를 입력해주세요.');
      return;
    }

    setVerifying(true);
    try {
      const res = await request.post('/api/verifyOTP', {
        phone,
        name,
        birth,
        gender,
        code: otpCode,
        counselType: counselType,
        companyId: INSURANCE_COMPANY_ID,
        productId: INSURANCE_PRODUCT_ID,
        counselTime: consultTime,
        mounthlyPremium: monthlyPremiumForAlimtalk, // 달러 환산 포함
        paymentPeriod: paymentPeriod,
        tenYearReturnRate: rate ? (rate * 100).toFixed(2) : '-',
        interestValue: interestValueForAlimtalk, // 달러 환산 포함
        refundValue: refundValueForAlimtalk, // 달러 환산 포함
        templateId: 'UB_8712',
      });
      if (res.data.success) {
        try {
          await trackPremiumCheck(INSURANCE_PRODUCT_ID, INSURANCE_COMPANY_ID, {
            phone,
            name,
            counsel_type_id: 1,
            utm_source: 'direct',
            utm_campaign: 'premium_calculation',
          });
          console.log('[CLIENT] 방문자 추적 성공: 환급금 확인');
        } catch (trackingError) {
          console.warn('[CLIENT] 방문자 추적 실패 (무시됨):', trackingError);
        }

        setIsVerified(true);
        setOtpSent(false);
        alert('인증이 완료되었습니다!');
      } else {
        alert('인증에 실패했습니다.');
      }
    } catch (e: any) {
      alert(e.error || '인증에 실패했습니다.');
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
      let tenYearReturnRate = '-';
      let interestValueCalc = '-';
      let refundValueCalc = '-';

      if (paymentPeriod && paymentAmount) {
        tenYearReturnRate = rate ? (rate * 100).toFixed(2) : '-';
        interestValueCalc = total ? Math.round(total * interestRate).toLocaleString('ko-KR') : '-';
        refundValueCalc = total ? Math.round(total * rate).toLocaleString('ko-KR') : '-';
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
        tenYearReturnRate,
        interestValue: interestValueCalc,
        refundValue: refundValueCalc,
        templateId: 'UB_8715',
      });
      if (res.data.success) {
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

  // ── 상품별 계산 로직 ──
  let amount = 0;
  if (paymentAmount.includes('만원')) {
    const num = parseInt(paymentAmount.replace(/[^0-9]/g, ''));
    amount = num * 10000;
  } else {
    amount = parseInt(paymentAmount.replace(/[^0-9]/g, ''));
  }
  const months = parseInt(paymentPeriod.replace(/[^0-9]/g, '')) * 12;
  const total = !isNaN(amount) && !isNaN(months) && amount > 0 && months > 0 ? amount * months : 0;

  // 환급률 계산 (10년 시점 기준) - 연령/성별별 조견표 사용
  const refundRateFromTable =
    paymentPeriod && gender && isAgeKnown
      ? getRefundRate(paymentPeriod as PaymentPeriod, numericInsuranceAge, gender as Gender)
      : null;

  // 환급률 (소수점 형태, 예: 1.249 = 124.9%)
  const rate = refundRateFromTable ? refundRateFromTable / 100 : 1.249;
  const interestRate = rate - 1; // 이자율 = 환급률 - 100%

  const interestValue = total ? Math.round(total * interestRate).toLocaleString('ko-KR') : '-';
  const refundValue = total ? Math.round(total * rate).toLocaleString('ko-KR') : '-';

  // 알림톡용 달러 환산 포함 값 (띄어쓰기: "10,374,000 원 (약 7,154$)" 형태)
  const interestValueForAlimtalk = total
    ? `${Math.round(total * interestRate).toLocaleString('ko-KR')} 원 (약 ${Math.round((total * interestRate) / BASE_EXCHANGE_RATE).toLocaleString()}$)`
    : '-';
  const refundValueForAlimtalk = total
    ? `${Math.round(total * rate).toLocaleString('ko-KR')} 원 (약 ${Math.round((total * rate) / BASE_EXCHANGE_RATE).toLocaleString()}$)`
    : '-';
  const monthlyPremiumForAlimtalk = paymentAmount
    ? `${paymentAmount} (약 ${Math.round((parseInt(paymentAmount.replace(/[^0-9]/g, '')) * 10000) / BASE_EXCHANGE_RATE)}$)`
    : '-';

  return (
    <>
      <section
        id="slogan-section"
        className="relative w-full overflow-hidden bg-gradient-to-b from-[#0a1628] via-[#0f2744] to-[#1a3a5c] py-10 md:py-14 lg:py-16"
      >
        {/* 배경 장식 요소 */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-[#00d4aa]/10 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-[#3b82f6]/10 blur-3xl"></div>
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8b5cf6]/5 blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-center gap-8 px-4 md:gap-10 md:px-6 lg:flex-row lg:items-start lg:justify-between lg:gap-16 lg:px-8">
          {/* 왼쪽: 상품 설명 */}
          <div className="flex max-w-xl flex-1 flex-col items-center text-center lg:max-w-none lg:items-start lg:text-left">
            {/* 상단 뱃지 */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00d4aa]/40 bg-[#00d4aa]/20 px-4 py-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#00d4aa]"></span>
              <span className="text-xs font-medium text-[#00d4aa] sm:text-sm">
                <span className="font-bold text-[#fbbf24]">달러종신보험</span>으로 준비하는{' '}
                <span className="font-bold text-[#60a5fa]">미래 자산</span>
              </span>
            </div>

            {/* 메인 타이틀 */}
            <h1 className="mb-3 text-2xl font-extrabold leading-tight text-white sm:text-3xl md:text-4xl lg:text-[2.75rem]">
              <span className="text-[#00d4aa]">달러</span> vs{' '}
              <span className="text-[#60a5fa]">원화</span>,
              <br />
              <span className="text-white">원하는 화폐로</span>
              <br />
              <span className="text-white">골라 받으세요!</span>
            </h1>

            <p className="mb-6 max-w-md text-sm text-gray-400 sm:text-base lg:mb-8">
              <span className="font-bold text-[#f97316]">원화고정납입옵션</span>으로
              <br />
              <span className="font-medium text-white">
                환율 변동에도 흔들리지 않는 안정적인 자산 설계
              </span>
            </p>

            {/* 3개의 핵심 혜택 카드 */}
            <div className="mb-6 grid w-full max-w-lg grid-cols-3 gap-2 sm:gap-3 lg:max-w-xl lg:gap-4">
              {/* 달러/원화 선택 */}
              <div className="group rounded-xl border border-[#2d4a6f] bg-gradient-to-br from-[#1e3a5f] to-[#0f2744] p-3 transition-all hover:border-[#00d4aa]/50 sm:p-4">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00d4aa] to-[#00b894] transition-transform group-hover:scale-110 sm:mb-3 sm:h-12 sm:w-12">
                  <svg
                    className="h-5 w-5 text-white sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                </div>
                <p className="mb-0.5 text-center text-[10px] text-gray-400 sm:text-xs">통화 선택</p>
                <p className="text-center text-sm font-black text-[#00d4aa] sm:text-lg">$/₩ 자유</p>
              </div>

              {/* 해약환급금 */}
              <div className="group relative overflow-hidden rounded-xl border-2 border-[#f59e0b]/50 bg-gradient-to-br from-[#1e3a5f] to-[#0f2744] p-3 transition-all hover:border-[#f59e0b] sm:p-4">
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#f59e0b]/0 via-[#f59e0b]/20 to-[#f59e0b]/0"></div>
                <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-[#f59e0b]/20 blur-xl"></div>
                <div className="relative z-10 mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#d97706] shadow-lg shadow-[#f59e0b]/30 transition-transform group-hover:scale-110 sm:mb-3 sm:h-12 sm:w-12">
                  <svg
                    className="h-5 w-5 text-white sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <p className="relative z-10 mb-0.5 text-center text-[10px] text-gray-300 sm:text-xs">
                  10년+1일 해약환급금
                </p>
                <p className="relative z-10 origin-center scale-110 animate-pulse text-center text-xl font-black text-[#fbbf24] drop-shadow-[0_0_15px_rgba(251,191,36,0.8)] sm:text-2xl">
                  124.9%
                </p>
              </div>

              {/* 사망보장 체증 */}
              <div className="group rounded-xl border border-[#2d4a6f] bg-gradient-to-br from-[#1e3a5f] to-[#0f2744] p-3 transition-all hover:border-[#8b5cf6]/50 sm:p-4">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] transition-transform group-hover:scale-110 sm:mb-3 sm:h-12 sm:w-12">
                  <svg
                    className="h-5 w-5 text-white sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                </div>
                <p className="mb-0.5 text-center text-[10px] text-gray-400 sm:text-xs">사망보장</p>
                <p className="text-center text-sm font-black text-[#a78bfa] sm:text-lg">
                  최대 150%
                </p>
              </div>
            </div>

            {/* 신뢰 뱃지 */}
            <div className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8]">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white sm:text-sm">위기 속 달러 강세</p>
                  <p className="text-[10px] text-gray-400 sm:text-xs">안정적 자산 보유</p>
                </div>
              </div>
              <div className="h-8 w-px bg-white/20"></div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#f59e0b] to-[#d97706]">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#fbbf24] sm:text-sm">환전수수료 최저</p>
                  <p className="text-[10px] text-gray-400 sm:text-xs">1$당 2원</p>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 환급금 확인 카드 */}
          <div className="flex w-full max-w-md flex-1 justify-center sm:max-w-lg lg:max-w-none lg:justify-end">
            <div
              id="calculator-box"
              className="relative flex w-full max-w-md flex-col rounded-2xl bg-white p-5 shadow-2xl sm:max-w-lg sm:p-6 md:p-7"
            >
              {/* 헤더 */}
              <div className="mb-5 sm:mb-6">
                <div className="mb-1 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#00529b] to-[#003d7a]">
                    <CalculatorIcon className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary sm:text-xl">
                    달러환급액 계산하기
                  </h3>
                </div>
                <p className="ml-10 text-xs text-text-muted sm:text-sm">
                  간단한 정보 입력으로 예상 달러환급액을 확인하세요
                </p>
              </div>

              <form className="flex flex-col gap-4" onSubmit={handleInsuranceCostCalculate}>
                {/* 성별/이름 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                      성별
                    </label>
                    <div className="flex gap-2">
                      <label
                        className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg border-2 py-2.5 transition-all ${gender === 'M' ? 'border-[#00529b] bg-[#00529b]/5 text-[#00529b]' : 'border-border-default hover:border-border-default'}`}
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
                        className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg border-2 py-2.5 transition-all ${gender === 'F' ? 'border-[#00529b] bg-[#00529b]/5 text-[#00529b]' : 'border-border-default hover:border-border-default'}`}
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
                      className="w-full rounded-lg border border-border-default px-3 py-2.5 text-sm transition-all focus:border-[#00529b] focus:ring-2 focus:ring-[#00529b]/20"
                      placeholder="홍길동"
                    />
                  </div>
                </div>

                {/* 생년월일/연락처 */}
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
                      className="w-full rounded-lg border border-border-default px-3 py-2.5 text-sm transition-all focus:border-[#00529b] focus:ring-2 focus:ring-[#00529b]/20"
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
                      className="w-full rounded-lg border border-border-default px-3 py-2.5 text-sm transition-all focus:border-[#00529b] focus:ring-2 focus:ring-[#00529b]/20"
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
                    {['5년납', '7년납', '10년납'].map((period) => (
                      <label key={period} className="relative cursor-pointer">
                        {period === '7년납' && (
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
                          className={`w-full rounded-lg border-2 py-2.5 text-center text-sm transition-all ${paymentPeriod === period ? 'border-[#00529b] bg-[#00529b]/5 font-bold text-[#00529b]' : 'border-border-default hover:border-border-default'}`}
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
                    월 납입금액 <span className="font-normal text-gray-400">(원화/달러)</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { krw: '30만원', usd: Math.round(300000 / BASE_EXCHANGE_RATE) },
                      { krw: '50만원', usd: Math.round(500000 / BASE_EXCHANGE_RATE) },
                      { krw: '100만원', usd: Math.round(1000000 / BASE_EXCHANGE_RATE) },
                    ].map((item) => (
                      <label key={item.krw} className="cursor-pointer">
                        <input
                          type="radio"
                          name="paymentAmount"
                          value={item.krw}
                          checked={paymentAmount === item.krw}
                          onChange={handlePaymentAmountChange}
                          className="peer sr-only"
                        />
                        <div
                          className={`w-full rounded-lg border-2 py-2 text-center text-sm transition-all ${paymentAmount === item.krw ? 'border-[#00529b] bg-[#00529b]/5 font-bold text-[#00529b]' : 'border-border-default hover:border-border-default'}`}
                        >
                          <div>{item.krw}</div>
                          <div
                            className={`text-xs ${paymentAmount === item.krw ? 'text-[#00529b]/70' : 'text-gray-400'}`}
                          >
                            약 {item.usd}$
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  <p className="mt-2 text-center text-[10px] text-[#00529b]">
                    ※ 달러 환산 금액은 기준환율 {BASE_EXCHANGE_RATE.toLocaleString()}원 적용 / 실제
                    환율에 따라 변동됩니다.
                  </p>
                </div>

                {/* 개인정보 동의 */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="h-4 w-4 cursor-pointer rounded border-border-default text-[#00529b] focus:ring-[#00529b]"
                  />
                  <span className="text-xs text-text-secondary">
                    개인정보 수집 및 이용에 동의합니다.
                    <button
                      type="button"
                      onClick={onOpenPrivacy}
                      className="ml-1 text-[#00529b] underline hover:text-[#003d7a]"
                    >
                      자세히 보기
                    </button>
                  </span>
                </div>

                {/* 버튼들 */}
                <div className="mt-1 flex flex-col gap-2">
                  <button
                    type="submit"
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00529b] to-[#003d7a] py-3.5 text-base font-bold text-white shadow-lg shadow-[#00529b]/25 transition hover:opacity-95"
                  >
                    <CalculatorIcon className="h-5 w-5" />
                    달러환급액 확인하기
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
              달러환급액 확인하기
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
            <div className="rounded border border-red-200 bg-red-50 p-1.5 text-xs sm:p-2 sm:text-sm">
              <p className="mb-0.5 font-bold text-red-700 sm:mb-1">
                ⚠️ {paymentPeriod} 가입불가 (보험연령 {numericInsuranceAge}세)
              </p>
              {availablePaymentPeriods.length > 0 ? (
                <p className="text-blue-700">
                  ✓ 가입 가능:{' '}
                  <span className="font-semibold">{availablePaymentPeriods.join(', ')}</span>
                </p>
              ) : (
                <p className="text-orange-700">※ 상담신청을 통해 문의해주세요.</p>
              )}
            </div>
          )}
          {/* 환급금 산출 완료 안내 박스 (인증 후) */}
          {isVerified && (
            <>
              <FireworksEffect show={true} />
              <div className="mb-1.5 rounded bg-[#f8f8ff] p-2 text-center sm:mb-2 sm:p-2.5">
                <div className="text-base font-bold text-black sm:text-lg">
                  환급금 산출이 완료되었습니다.
                </div>
              </div>
              {/* 환급금 결과값 UI (상세 정보) */}
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
                    <span className="font-bold text-[#3a8094]">메트라이프생명</span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>상품명
                    </span>
                    <span className="text-xs font-bold text-[#3a8094]">
                      (무)백만인을위한달러종신보험Plus
                    </span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>납입기간 / 월보험료
                    </span>
                    <span className="font-bold text-[#3a8094]">
                      {paymentPeriod && paymentAmount ? (
                        <>
                          {paymentPeriod} / {paymentAmount}
                          <span className="ml-1 text-xs font-normal text-gray-400">
                            (약{' '}
                            {Math.round(
                              (parseInt(paymentAmount.replace(/[^0-9]/g, '')) * 10000) /
                                BASE_EXCHANGE_RATE
                            )}
                            $)
                          </span>
                        </>
                      ) : (
                        '-'
                      )}
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
                        {total ? total.toLocaleString('ko-KR') : '-'}원
                      </span>
                      <span className="ml-1 text-xs font-normal text-gray-400">
                        (약{' '}
                        {total
                          ? `${Math.round(total / BASE_EXCHANGE_RATE).toLocaleString()}$`
                          : '-'}
                        )
                      </span>
                    </span>
                  </div>
                </div>
                {/* 10년 시점 환급률 */}
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>10년 시점 환급률
                    </span>
                    <span className="font-bold">
                      <span className="text-[#7c3aed]">{rate ? (rate * 100).toFixed(2) : '-'}</span>{' '}
                      <span className="text-[#3a8094]">%</span>
                    </span>
                  </div>
                </div>
                {/* 10년 시점 이자 (총납입액과 해약환급금 차액) */}
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>10년 시점 이자
                    </span>
                    <span className="font-bold">
                      <span className="text-[#3b82f6]">{interestValue}원</span>
                      <span className="ml-1 text-xs font-normal text-gray-400">
                        (약{' '}
                        {total
                          ? `${Math.round((total * interestRate) / BASE_EXCHANGE_RATE).toLocaleString()}$`
                          : '-'}
                        )
                      </span>
                    </span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>10년 시점 예상 해약환급금
                    </span>
                    <span className="font-bold">
                      <span className="text-[#ef4444]">{refundValue}원</span>
                      <span className="ml-1 text-xs font-normal text-gray-400">
                        (약{' '}
                        {total
                          ? `${Math.round((total * rate) / BASE_EXCHANGE_RATE).toLocaleString()}$`
                          : '-'}
                        )
                      </span>
                    </span>
                  </div>
                </div>
                <div className="mt-4 text-center text-xs text-text-muted">
                  * 실제 보험료 및 해약환급금은 가입시점 및 고객 정보에 따라 달라질 수 있습니다.
                  <br />* 본 계산 결과는 참고용이며, 실제 계약 시 보험사 약관 및 상품설명서를 확인
                  바랍니다.
                </div>
              </div>
            </>
          )}
          {!isVerified && (
            <>
              {/* 환급금 계산 결과 */}
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
                    <span className="text-xs font-medium text-[#7c3aed]">🔒 인증 후 확인</span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>상품명
                    </span>
                    <span className="text-xs font-medium text-[#7c3aed]">🔒 인증 후 확인</span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>납입기간 / 월보험료
                    </span>
                    <span className="font-bold text-[#3a8094]">
                      {paymentPeriod && paymentAmount ? (
                        <>
                          {paymentPeriod} / {paymentAmount}
                          <span className="ml-1 text-xs font-normal text-gray-400">
                            (약{' '}
                            {Math.round(
                              (parseInt(paymentAmount.replace(/[^0-9]/g, '')) * 10000) /
                                BASE_EXCHANGE_RATE
                            )}
                            $)
                          </span>
                        </>
                      ) : (
                        '-'
                      )}
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
                        {total ? total.toLocaleString('ko-KR') : '-'}원
                      </span>
                      <span className="ml-1 text-xs font-normal text-gray-400">
                        (약{' '}
                        {total
                          ? `${Math.round(total / BASE_EXCHANGE_RATE).toLocaleString()}$`
                          : '-'}
                        )
                      </span>
                    </span>
                  </div>
                </div>
                {/* 10년 시점 환급률 */}
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>10년 시점 환급률
                    </span>
                    <span className="font-bold">
                      <span className="text-[#7c3aed]">?</span>{' '}
                      <span className="text-[#3a8094]">%</span>
                    </span>
                  </div>
                </div>
                {/* 10년 시점 이자 (총납입액과 해약환급금 차액) */}
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>10년 시점 이자
                    </span>
                    <span className="font-bold">
                      <span className="text-[#3b82f6]">?</span>{' '}
                      <span className="text-[#3a8094]">원</span>
                    </span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>10년 시점 예상 해약환급금
                    </span>
                    <span className="font-bold">
                      <span className="text-[#ef4444]">?</span>{' '}
                      <span className="text-[#3a8094]">원</span>
                    </span>
                  </div>
                </div>
                <div className="mt-4 text-center text-xs text-text-muted">
                  * 실제 보험료 및 해약환급금은 가입시점 및 고객 정보에 따라 달라질 수 있습니다.
                  <div className="mt-0.5 text-[#3a8094]">
                    * 휴대폰 인증 완료 후 상세 정보를 확인하실 수 있습니다.
                  </div>
                </div>
              </div>
              {/* 휴대폰 인증 안내 및 인증번호 입력란 */}
              <div className="mt-0 rounded-lg bg-page-bg p-2">
                <h3 className="mb-1 text-base font-bold text-text-primary">휴대폰 인증</h3>
                <p className="mb-1 text-xs text-text-secondary sm:text-sm">
                  정확한 환급금 확인을 위해 휴대폰 인증이 필요합니다.
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
                {isAgeEligible ? (
                  <button
                    type="button"
                    onClick={handleVerifyOTP}
                    disabled={verifying || otpCode.length !== 6}
                    className={`mt-1 w-full rounded-md px-3 py-2.5 text-base font-semibold transition-colors sm:mt-2 sm:px-4 sm:py-3 sm:text-lg ${verifying || otpCode.length !== 6 ? 'cursor-not-allowed bg-gray-300 text-text-muted' : 'bg-[#3a8094] text-white hover:bg-[#2c6070]'}`}
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
                    className="mt-1 flex w-full items-center justify-center gap-2 rounded-md bg-[#fa5a5a] px-3 py-2.5 text-base font-semibold text-white transition-colors hover:bg-[#e14949] sm:mt-2 sm:px-4 sm:py-3 sm:text-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.25a1 1 0 01-1 1A17.93 17.93 0 013 5a1 1 0 011-1h3.25a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z"
                      />
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
          {/* 안내문구 */}
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
            <div className="grid grid-cols-1 gap-1.5">
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
          {/* 상담 안내 박스 */}
          <div className="mb-1 rounded bg-[#f8f8ff] p-2 text-center text-xs text-text-secondary">
            📢 상담 중 궁금한 점은 언제든 말씀해 주세요.
          </div>
          {/* 휴대폰 인증 안내 */}
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
