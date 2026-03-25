import React, { useEffect, useState } from 'react';
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
import { useInsuranceForm } from '@/hooks/useInsuranceForm';
import { useOTP } from '@/hooks/useOTP';

// 간병인보험 전용 설정
const currentPath = '/insurance/carer';
const productConfig = null; // 간병인보험은 별도 설정

const INSURANCE_COMPANY_ID = 'CARER_INSURANCE'; // 간병인보험
const INSURANCE_PRODUCT_ID = 'CARER_INSURANCE_PRODUCT'; // 간병인보험 상품

type SloganProps = {
  onOpenPrivacy?: () => void;
  onModalStateChange?: (isOpen: boolean) => void;
};

export default function Slogan({ onModalStateChange }: SloganProps) {
  // ── 공통 훅 ──
  const form = useInsuranceForm();
  const otp = useOTP();

  // ── 상태 관리 ──
  const [showPrivacy, setShowPrivacy] = useState(false);

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
  const [consultType, setConsultType] = React.useState('간병인보험');
  const [consultTime, setConsultTime] = React.useState('아무때나');
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
    '오후 06:00 이후',
  ];

  // ── 상품별 연령 로직 ──
  const getAgeRange = (period: string) => {
    if (period.includes('5')) return { min: 15, max: 64 };
    if (period.includes('7')) return { min: 15, max: 66 };
    if (period.includes('10')) return { min: 15, max: 69 };
    return { min: 15, max: 70 };
  };

  const ageRange = getAgeRange(paymentPeriod);
  const isAgeEligible =
    isAgeKnown && numericInsuranceAge >= ageRange.min && numericInsuranceAge <= ageRange.max;

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
    companyName: '간병인보험',
    productName: '간병인보험',
    phone,
  };

  // ── 생년월일/연락처 유효성 검사 (carer 고유) ──
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

  const validatePhone = (phoneValue: string): boolean => {
    if (!phoneValue.startsWith('010')) return false;
    if (phoneValue.length < 10 || phoneValue.length > 11) return false;
    return true;
  };

  // ── 이벤트 핸들러 (상품별 로직) ──
  const handleConsultationRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setCounselType(1);
    setShowConsultModal(true);
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

  // 간병인보험 고유: 상담 모달 열기 (별도 인라인 검증)
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
        mounthlyPremium: paymentAmount,
        paymentPeriod: paymentPeriod,
        tenYearReturnRate: rate ? (rate * 100).toFixed(2) : '-',
        interestValue,
        refundValue,
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
      const res = await request.post('/api/verifyOTP', {
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
        templateId: 'UB_8715',
      });
      if (res.data.success) {
        alert('상담 신청이 완료되었습니다!');
        setConsultIsVerified(true);
      } else {
        alert('인증에 실패했습니다.');
        return;
      }
    } catch (e: any) {
      console.error('OTP 인증 오류:', e);
      alert(e.response?.data?.error || e.message || '인증에 실패했습니다.');
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

  // 환급률 계산 (10년 시점 기준)
  let rate = 1.2278,
    interestRate = 0.2278; // 기본값: 5년납
  if (paymentPeriod.includes('5')) {
    rate = 1.2278; // 122.78%
    interestRate = 0.2278; // 22.78%
  } else if (paymentPeriod.includes('7')) {
    rate = 1.1958; // 119.58%
    interestRate = 0.1958; // 19.58%
  } else if (paymentPeriod.includes('10')) {
    rate = 1.1499; // 114.99%
    interestRate = 0.1499; // 14.99%
  }

  const interestValue = total ? (total * interestRate).toLocaleString('en-US') : '-';
  const refundValue = total ? (total * rate).toLocaleString('en-US') : '-';

  return (
    <>
      <section
        id="slogan-section"
        className="w-full bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 py-6 md:py-10 lg:py-8"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 md:flex-col md:items-center md:gap-6 md:px-8 md:py-4 lg:flex-row lg:items-start lg:justify-between lg:gap-16 lg:px-8 lg:py-6">
          {/* 왼쪽: 상품 설명/이미지 */}
          <div className="flex flex-1 flex-col items-center text-center md:items-center md:text-center lg:max-w-xl lg:items-start lg:text-left">
            <p className="mb-2 text-sm text-text-muted sm:text-base lg:mb-3 lg:text-lg">
              노후에 가장 무서운 건
            </p>
            <h1 className="mb-3 text-2xl font-bold leading-tight text-text-primary sm:text-3xl md:text-4xl lg:mb-4 lg:whitespace-nowrap lg:text-[42px] xl:text-5xl">
              병원비가 아니라 <span className="text-brand-primary">간병비</span>입니다
            </h1>
            <p className="mb-4 text-sm text-text-muted md:mb-6 md:text-base lg:text-lg">
              실손보험으로는 해결되지 않는 간병비, 미리 준비하세요
            </p>

            <ul className="mb-5 space-y-2.5 sm:mb-6 sm:space-y-3 lg:mb-8 lg:space-y-4">
              <li className="flex items-center justify-center text-sm text-gray-700 sm:text-base lg:justify-start lg:text-lg">
                <span className="mr-2.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary-soft text-xs text-brand-primary lg:mr-3 lg:h-6 lg:w-6 lg:text-sm">
                  ✓
                </span>
                <span>
                  하루 <span className="font-bold text-rose-500">최대 20만원</span> 간병인 사용료
                  지급
                </span>
              </li>
              <li className="flex items-center justify-center text-sm text-gray-700 sm:text-base lg:justify-start lg:text-lg">
                <span className="mr-2.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary-soft text-xs text-brand-primary lg:mr-3 lg:h-6 lg:w-6 lg:text-sm">
                  ✓
                </span>
                <span>
                  월 <span className="font-bold text-brand-primary">2~5만원</span>으로 간병비 걱정
                  해결
                </span>
              </li>
              <li className="flex items-center justify-center text-sm text-gray-700 sm:text-base lg:justify-start lg:text-lg">
                <span className="mr-2.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary-soft text-xs text-brand-primary lg:mr-3 lg:h-6 lg:w-6 lg:text-sm">
                  ✓
                </span>
                <span>
                  <span className="font-bold text-emerald-600">가족간병</span>시에도 보험금 지급
                </span>
              </li>
            </ul>

            {/* 간병비 현실 카드 */}
            <div className="mx-auto mb-4 w-full max-w-lg rounded-2xl bg-slate-50 p-5 sm:p-6 lg:mx-0 lg:max-w-xl lg:p-7">
              <p className="mb-4 text-center text-sm text-text-muted lg:mb-5 lg:text-left lg:text-base">
                간병인 비용, 얼마나 드는지 아시나요?
              </p>

              {/* 핵심 금액 */}
              <div className="mb-4 flex items-center justify-center gap-4 sm:gap-6 lg:mb-5 lg:justify-start lg:gap-8">
                <div className="text-center lg:text-left">
                  <div className="mb-1 text-xs text-gray-400 lg:text-sm">하루 평균</div>
                  <div className="text-xl font-bold text-gray-800 sm:text-2xl lg:text-3xl">
                    12만원
                  </div>
                </div>
                <div className="text-xl text-gray-300 lg:text-2xl">→</div>
                <div className="text-center lg:text-left">
                  <div className="mb-1 text-xs text-gray-400 lg:text-sm">한 달이면</div>
                  <div className="animate-pulse text-2xl font-bold text-brand-primary sm:text-3xl lg:text-4xl">
                    360만원
                  </div>
                </div>
              </div>

              <div className="text-center lg:text-left">
                <span className="inline-block rounded-full bg-blue-600 px-4 py-2 text-xs font-medium text-white sm:text-sm lg:px-5 lg:py-2.5 lg:text-base">
                  간병인보험으로 하루 최대 20만원 보장
                </span>
              </div>
            </div>

            {/* 안내 문구 */}
            <p className="text-center text-xs text-gray-400 lg:text-left lg:text-sm">
              ※ 보장내용은 보험사 및 상품에 따라 다를 수 있습니다
            </p>
          </div>
          {/* 오른쪽: 환급금 확인 카드 */}
          <div className="flex w-full flex-1 justify-center lg:ml-8 lg:justify-end lg:self-center">
            <div
              id="consultation-box"
              className="relative flex w-full max-w-md flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-xl sm:max-w-lg sm:p-6 md:p-7"
            >
              <div className="mb-5 sm:mb-6">
                <div className="mb-1 flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary sm:text-xl">무료 상담신청</h3>
                </div>
                <p className="ml-[46px] text-xs text-text-muted sm:text-sm">
                  간병인보험, 전문가가 쉽고 명쾌하게 알려드립니다
                </p>
              </div>

              {/* 간병인보험 보장 내용 박스 */}
              <div className="relative mb-4 rounded-xl bg-slate-50 p-3">
                {/* 상품 비교 뱃지 */}
                <span className="absolute -right-2 -top-2 z-10 animate-bounce rounded-full bg-gradient-to-r from-red-500 to-rose-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-lg sm:text-xs">
                  상품 비교
                </span>
                <div className="mb-2 text-xs font-semibold text-gray-700">일일 보장금액</div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-muted">
                      간병인사용일당<span className="text-gray-400">(요양병원제외)</span>
                    </span>
                    <span className="font-semibold text-text-primary">15~20만원</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-muted">요양병원</span>
                    <span className="font-semibold text-text-primary">5~6만원</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-muted">간호간병통합서비스병실</span>
                    <span className="font-semibold text-text-primary">7만원</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-muted">가족간병</span>
                    <span className="font-semibold text-brand-primary">보장</span>
                  </div>
                </div>
                <div className="mt-2 text-[10px] text-gray-400">
                  ※ 보장내용은 보험사 및 상품에 따라 다를 수 있습니다
                </div>
              </div>

              <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleConsultationRequest}>
                {/* 성별/이름 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                      성별 <span className="text-status-red">*</span>
                    </label>
                    <div className="flex gap-2">
                      <label
                        className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg border-2 py-2.5 transition-all ${gender === 'M' ? 'border-brand-primary bg-bg-blue text-brand-primary' : 'border-border-default hover:border-border-default'}`}
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
                        className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg border-2 py-2.5 transition-all ${gender === 'F' ? 'border-brand-primary bg-bg-blue text-brand-primary' : 'border-border-default hover:border-border-default'}`}
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
                      className="w-full rounded-lg border border-border-default px-3 py-2.5 text-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                      className="w-full rounded-lg border border-border-default px-3 py-2.5 text-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                      className="w-full rounded-lg border border-border-default px-3 py-2.5 text-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      placeholder="01012345678"
                    />
                  </div>
                </div>

                {/* 상담종류/상담시간대 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                      상담종류
                    </label>
                    <div className="flex w-full items-center gap-1.5 rounded-lg border border-blue-200 bg-bg-blue px-3 py-2.5 text-sm font-semibold text-blue-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      간병인보험
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                      상담시간대 <span className="text-status-red">*</span>
                    </label>
                    <select
                      value={consultTime}
                      onChange={(e) => setConsultTime(e.target.value)}
                      className="w-full rounded-lg border border-border-default bg-white px-3 py-2.5 text-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="h-4 w-4 cursor-pointer rounded border-border-default text-brand-primary focus:ring-blue-500"
                  />
                  <span className="text-xs text-text-secondary">
                    개인정보 수집 및 이용에 동의합니다.
                    <button
                      type="button"
                      onClick={() => setShowPrivacy(true)}
                      className="ml-1 text-brand-primary underline hover:text-blue-800"
                    >
                      자세히 보기
                    </button>
                  </span>
                </div>

                {/* 버튼들 */}
                <div className="mt-1 flex gap-2">
                  <button
                    type="button"
                    onClick={handleOpenConsultModal}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
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
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#fee500] py-3.5 text-base font-bold text-[#3d1e1e] shadow-lg shadow-yellow-400/25 transition hover:opacity-95"
                  >
                    <ChatBubbleLeftRightIcon className="h-5 w-5" />
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
              <CalculatorIcon className="h-6 w-6 text-[#3a8094]" />
              해약환급금 확인하기
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
                    <span className="font-bold text-[#3a8094]">하나생명</span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>상품명
                    </span>
                    <span className="font-bold text-[#3a8094]">하나로THE연결된종신보험</span>
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
                      <span className="text-[#3b82f6]">{interestValue}</span>{' '}
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
                      <span className="text-[#ef4444]">{refundValue}</span>{' '}
                      <span className="text-[#3a8094]">원</span>
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
                    <span className="font-bold text-[#3a8094]">하나생명</span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>상품명
                    </span>
                    <span className="font-bold text-[#3a8094]">하나로THE연결된종신보험</span>
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
                    className={`mt-1 w-full rounded-md px-3 py-2.5 text-base font-semibold transition-colors sm:mt-2 sm:px-4 sm:py-3 sm:text-lg ${verifying || otpCode.length !== 6 ? 'cursor-not-allowed bg-gray-300 text-text-muted' : 'bg-[#e11d48] text-white hover:bg-[#be185d]'}`}
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
              className="h-6 w-6 text-brand-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
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
              <span className="align-middle text-2xl font-extrabold text-brand-primary">
                {name}
              </span>
              <span className="align-middle text-lg font-bold text-brand-primary">&nbsp;님</span>
              {insuranceAge !== '' && (
                <span className="ml-2 flex items-center font-bold">
                  <span className="text-lg text-text-muted">보험연령 </span>
                  <span className="mx-1 text-2xl font-extrabold text-status-red">
                    {insuranceAge}
                  </span>
                  <span className="text-lg text-text-muted">세</span>
                </span>
              )}
            </h3>
            <div className="grid grid-cols-1 gap-1.5">
              <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-xs font-medium text-text-secondary sm:text-sm">
                    <span className="mr-1 text-brand-primary">▸</span>이름
                  </span>
                  <span className="text-sm font-bold text-text-primary sm:text-base">{name}</span>
                </div>
              </div>
              <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-xs font-medium text-text-secondary sm:text-sm">
                    <span className="mr-1 text-brand-primary">▸</span>연락처
                  </span>
                  <span className="text-sm font-bold text-text-primary sm:text-base">{phone}</span>
                </div>
              </div>
              <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-xs font-medium text-text-secondary sm:text-sm">
                    <span className="mr-1 text-brand-primary">▸</span>상담 종류
                  </span>
                  {consultIsVerified ? (
                    <span className="text-sm font-bold text-text-primary sm:text-base">
                      {consultType}
                    </span>
                  ) : (
                    <select
                      value={consultType}
                      onChange={(e) => setConsultType(e.target.value)}
                      className="cursor-pointer border-none bg-transparent text-right text-sm font-bold text-brand-primary focus:outline-none sm:text-base"
                    >
                      {consultTypeOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
              <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-xs font-medium text-text-secondary sm:text-sm">
                    <span className="mr-1 text-brand-primary">▸</span>상담 시간대
                  </span>
                  {consultIsVerified ? (
                    <span className="text-sm font-bold text-text-primary sm:text-base">
                      {consultTime}
                    </span>
                  ) : (
                    <select
                      value={consultTime}
                      onChange={(e) => setConsultTime(e.target.value)}
                      className="cursor-pointer border-none bg-transparent text-right text-sm font-bold text-brand-primary focus:outline-none sm:text-base"
                    >
                      {consultTimeOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
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
                  className="w-full min-w-[100px] rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 sm:w-auto sm:min-w-[120px] sm:px-4 sm:py-2.5 sm:text-base"
                >
                  {consultOtpResendAvailable ? '인증번호 전송' : '재발송'}
                </button>
                {!consultOtpResendAvailable && (
                  <div className="flex min-w-[60px] items-center justify-center text-sm font-medium text-brand-primary">
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
                  className="flex-1 rounded-md border border-border-default px-3 py-2 text-sm focus:border-brand-primary focus:ring-blue-500 sm:py-2.5 sm:text-base"
                  placeholder="6자리 인증번호 입력"
                />
              </div>
              <button
                type="button"
                onClick={handleConsultVerifyOTP}
                disabled={verifying || consultOtpCode.length !== 6}
                className={`mt-1 w-full rounded-md px-3 py-2.5 text-base font-semibold transition-colors sm:mt-2 sm:px-4 sm:py-3 sm:text-lg ${verifying || consultOtpCode.length !== 6 ? 'cursor-not-allowed bg-gray-300 text-text-muted' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                {verifying ? '인증 처리중...' : '인증하고 상담신청'}
              </button>
            </div>
          )}
        </div>
      </Modal>

      {/* 개인정보 처리방침 모달 */}
      <Modal
        title="개인정보 수집 및 이용 동의"
        open={showPrivacy}
        onClose={() => setShowPrivacy(false)}
      >
        <div>
          <div className="heading-4 text-text-primary mb-5">
            보험료 계산 및 상품소개를 위한 개인정보 처리
          </div>
          <div className="body-m text-text-secondary leading-relaxed mb-6 space-y-0.5">
            <p>입력하신 고객님의 정보는 동의한 범위에서만 사용됩니다.</p>
            <p>동의 시 선택 동의가 포함되며, 개별 선택도 가능해요.</p>
          </div>

          <p className="body-m text-[#4f5b66] mb-3">[필수] 개인(신용) 정보 수집·이용에 관한 사항</p>

          <div className="bg-[#f4f7fe] p-4 rounded-lg body-s text-text-secondary mb-6 max-h-[280px] overflow-y-auto space-y-4">
            <div>
              <p className="font-bold text-text-primary mb-1">[개인 정보 수집 및 이용 동의]</p>
              <p>㈜ 메타리치 보험스토어는 상담신청 및 보험상품 소개를 위해 고객님의 개인정보 수집, 이용 및 제공에 대한 동의를 받고 있습니다.</p>
            </div>
            <div>
              <p className="font-bold text-text-primary mb-1">▣ 개인정보 수집ㆍ이용 동의</p>
              <p>당사 및 당사 업무수탁자는 「개인정보보호법」, 「정보통신망 이용촉진 및 정보 보호 등에 관한 법률」에 따라 귀하의 개인정보를 다음과 같이 수집·이용하고자 합니다.</p>
              <p className="mt-2 font-semibold">1. 개인정보 수집 및 이용 목적</p>
              <p>- 보험 상담 및 상품소개, 보험 리모델링 및 가입 권유를 위한 안내 및 서비스 제공</p>
              <p className="mt-2 font-semibold">2. 개인정보 수집 및 이용 항목</p>
              <p>- 이름, 성별, 생년월일, 연락처, IP주소</p>
              <p className="mt-2 font-semibold">3. 개인정보 보유 및 이용기간</p>
              <p>- 동의일로부터 5년</p>
              <p className="mt-2 font-semibold">4. 동의를 거부할 권리 및 동의를 거부할 경우의 불이익</p>
              <p>- 귀하는 개인정보 수집, 이용에 대한 동의를 거부할 권리가 있습니다.</p>
              <p>- 동의 거부시 보험계약 상담 등의 서비스를 받으실 수 없습니다.</p>
            </div>
            <div>
              <p className="font-bold text-text-primary mb-1">▣ 개인정보 제공에 관한 동의</p>
              <p className="font-semibold">1. 제공 받는 자</p>
              <p>- 당사 소속 설계사, 당사의 모집 위탁 계약을 체결한 자 (대리점, 설계사)</p>
              <p className="mt-2 font-semibold">2. 개인정보를 제공받는 자의 이용 목적</p>
              <p>- 보험 상품/서비스 소개 및 상담</p>
              <p className="mt-2 font-semibold">3. 제공하는 정보</p>
              <p>- 이름, 성별, 생년월일, 연락처</p>
              <p className="mt-2 font-semibold">4. 제공받는 자의 개인정보 보유 및 이용 기간</p>
              <p>- 동의일로부터 5년</p>
              <p className="mt-2 font-semibold">5. 동의를 거부할 권리 및 동의를 거부할 경우의 불이익</p>
              <p>- 귀하는 개인정보 수집, 이용에 대한 동의를 거부할 권리가 있습니다.</p>
              <p>- 동의 거부 시 보험계약 상담 등의 서비스를 받으실 수 없습니다.</p>
            </div>
            <div>
              <p className="font-bold text-text-primary mb-1">▣ 개인정보 활용에 관한 동의</p>
              <p>㈜메타리치 보험스토어는 「개인정보보호법」및「신용정보의 이용 및 보호에 관한 법률」에 따라 당사 상품소개 및 홍보 등을 위하여 귀하의 개인(신용)정보를 다음과 같이 수집ㆍ이용하고자 합니다.</p>
              <p className="text-status-info text-xs mt-1">* 동의 후 언제든지 동의 철회 중단을 요청하실 수 있습니다.</p>
              <p className="mt-2 font-semibold">1. 수집항목</p>
              <p>- 이름, 성별, 생년월일, 연락처, IP주소</p>
              <p className="mt-2 font-semibold">2. 보유·이용기간</p>
              <p>- 정보동의고객 : 동의일로부터 5년</p>
              <p className="mt-2 font-semibold">3. 수집목적</p>
              <p>상담신청에 대한 응대, 우편 · 전화 · 인터넷 · 방문 등을 통한 유익한 정보의 제공, 금융상품 소개 및 가입 권유, 재무설계서비스 및 기타 서비스의 제공 안내, 이벤트 · 행사의 안내 등 회사의 정상적인 영업에 관계된 행위</p>
              <p className="text-text-muted text-xs mt-1">* 상담신청은 개인정보 활용 동의를 거부하셔도 전화로 상담을 진행할 수 있습니다.</p>
            </div>
            <div className="border-t border-border-default pt-3">
              <p className="font-bold text-text-primary mb-1">※ 동의 철회를 위한 안내</p>
              <p>본 동의를 하시더라도 당사 고객센터를 통해 동의를 철회하거나 가입 권유 목적의 연락에 대한 중단을 요청하실 수 있습니다.</p>
            </div>
          </div>
          
          <button
            onClick={() => {
              setIsChecked(true);
              setShowPrivacy(false);
            }}
            className="w-full h-[44px] rounded-lg bg-button button-l text-text-inverse transition hover:bg-button-hover"
          >
            확인
          </button>
        </div>
      </Modal>
    </>
  );
}
