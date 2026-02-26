import React, { useEffect } from 'react';
import { CalculatorIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import Modal from '@/components/Modal';
import request from '@/app/api/request';
import SelectField from '@/components/SelectField';
import TextField from '@/components/TextField';
import ToggleButtonGroup from '@/components/ToggleButtonGroup';
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

// 현재 경로에 맞는 상품 정보 가져오기
const currentPath = '/insurance/whole-life/shinhan/more-the-dream';
const productConfig = getProductConfigByPath(currentPath);

const INSURANCE_COMPANY_ID = INSURANCE_COMPANIES.SHINHAN_LIFE; // 신한라이프
const INSURANCE_PRODUCT_ID = INSURANCE_PRODUCTS.SHINHAN_MORE_THE_DREAM; // 신한 모아더드림 Plus 종신보험

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
  const [consultType, setConsultType] = React.useState('종신보험');
  const [consultTime, setConsultTime] = React.useState('아무때나');
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
    '오후 06:00 이후',
  ];

  // 연령 적합성 (15~70세)
  const isAgeEligible = isAgeKnown && numericInsuranceAge >= 15 && numericInsuranceAge <= 70;

  // 모달 상태 변경 시 부모에게 알림
  useEffect(() => {
    const isAnyModalOpen = showResultModal || showConsultModal;
    onModalStateChange?.(isAnyModalOpen);
  }, [showResultModal, showConsultModal, onModalStateChange]);

  // ── OTP 전송 설정 ──
  const otpConfig = {
    templateId: getTemplateIdByPath(currentPath) || 'UA_7754',
    companyName: productConfig?.config.companyName || '신한라이프',
    productName: productConfig?.config.name || '모아더드림Plus종신보험',
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
        mounthlyPremium: paymentAmount,
        paymentPeriod: paymentPeriod,
        tenYearReturnRate: rate ? (rate * 100).toFixed(1) : '-',
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
      let tenYearReturnRate = '-';
      let interestValueCalc = '-';
      let refundValueCalc = '-';

      if (paymentPeriod && paymentAmount) {
        tenYearReturnRate = rate ? (rate * 100).toFixed(1) : '-';
        interestValueCalc = total ? (total * interestRate).toLocaleString('ko-KR') : '-';
        refundValueCalc = total ? (total * rate).toLocaleString('ko-KR') : '-';
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

  let rate = 1.227,
    interestRate = 0.227;
  if (paymentPeriod.includes('5')) {
    rate = 1.227;
    interestRate = 0.227;
  } else if (paymentPeriod.includes('7')) {
    rate = 1.195;
    interestRate = 0.195;
  } else if (paymentPeriod.includes('10')) {
    rate = 1.15;
    interestRate = 0.15;
  }

  const interestValue = total ? (total * interestRate).toLocaleString('en-US') : '-';
  const refundValue = total ? (total * rate).toLocaleString('en-US') : '-';

  return (
    <>
      <section
        id="slogan-section"
        className="w-full bg-[#fce7f3] py-6 md:py-10 lg:py-3"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(249, 168, 212, 0.1) 10px, rgba(249, 168, 212, 0.1) 12px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 px-4 md:flex-col md:items-center md:gap-8 md:px-6 md:py-4 lg:flex-row lg:items-start lg:justify-between lg:gap-12 lg:px-4 lg:py-4">
          <div className="flex flex-1 flex-col items-center text-center md:items-center md:text-center lg:items-start lg:text-left">
            <div className="mb-2 flex items-center gap-2 text-sm text-text-muted">
              <img
                src="/images/logos/shinhan-life-logo.png"
                alt="신한라이프 로고"
                className="h-6 w-auto"
                style={{ minWidth: '24px' }}
              />
              <span>신한라이프생명</span>
            </div>
            <h1 className="mb-3 text-lg font-bold leading-tight text-text-primary sm:mb-4 sm:text-xl md:mb-6 md:text-2xl lg:mb-4 lg:text-3xl">
              모아더드림Plus종신보험
              <br />
              (해약환급금 일부지급형)
            </h1>
            <ul className="mb-3 space-y-1 sm:mb-5 sm:space-y-1.5 md:mb-8 md:space-y-2.5 lg:mb-8 lg:space-y-2">
              <li className="flex items-center justify-center text-sm text-gray-800 sm:text-base md:justify-center md:text-lg lg:justify-start lg:text-lg">
                <span className="mr-1 flex-shrink-0 text-sm text-[#0066cc] sm:mr-1.5 sm:text-base md:mr-2.5 md:text-lg lg:mr-2 lg:text-xl">
                  ✔
                </span>
                <span>평생 든든한 종신보장</span>
              </li>
              <li className="flex items-center justify-center text-sm text-gray-800 sm:text-base md:justify-center md:text-lg lg:justify-start lg:text-lg">
                <span className="mr-1 flex-shrink-0 text-sm text-[#0066cc] sm:mr-1.5 sm:text-base md:mr-2.5 md:text-lg lg:mr-2 lg:text-xl">
                  ✔
                </span>
                <span className="leading-tight">
                  10년시점 해약환급금{' '}
                  <span className="font-semibold text-brand-primary">122.7%</span>{' '}
                  <span className="text-[10px] text-text-muted sm:text-xs">(일반심사형 기준)</span>
                </span>
              </li>
              <li className="flex items-center justify-center text-sm text-gray-800 sm:text-base md:justify-center md:text-lg lg:justify-start lg:text-lg">
                <span className="mr-1 flex-shrink-0 text-sm text-[#0066cc] sm:mr-1.5 sm:text-base md:mr-2.5 md:text-lg lg:mr-2 lg:text-xl">
                  ✔
                </span>
                <span>설계·심사에 따라 가입금액 선택 가능</span>
              </li>
              <li className="flex items-center justify-center text-sm text-gray-800 sm:text-base md:justify-center md:text-lg lg:justify-start lg:text-lg">
                <span className="mr-1 flex-shrink-0 text-sm text-[#0066cc] sm:mr-1.5 sm:text-base md:mr-2.5 md:text-lg lg:mr-2 lg:text-xl">
                  ✔
                </span>
                <span className="leading-tight">
                  납입완료보너스·장기유지보너스 제공{' '}
                  <span className="text-[10px] text-text-muted sm:text-xs">(약관 기준)</span>
                </span>
              </li>
              <li className="flex items-center justify-center text-sm text-gray-800 sm:text-base md:justify-center md:text-lg lg:justify-start lg:text-lg">
                <span className="mr-1 flex-shrink-0 text-sm text-[#0066cc] sm:mr-1.5 sm:text-base md:mr-2.5 md:text-lg lg:mr-2 lg:text-xl">
                  ✔
                </span>
                <span className="leading-tight">
                  일반심사형: 만 <span className="font-semibold text-indigo-600">15~70세</span> /
                  간편심사형: 만 <span className="font-semibold text-purple-600">30~69세</span>
                  <br />
                  <span className="text-[10px] text-text-muted sm:text-xs">
                    (단, 성별 및 납입기간별 가입나이 상이)
                  </span>
                </span>
              </li>
            </ul>
            <div className="mx-auto mb-3 w-full max-w-2xl rounded-xl bg-white p-4 px-4 pb-5 pt-5 shadow-lg sm:mb-4 sm:p-5 sm:px-5 sm:pb-6 sm:pt-6 md:p-7 md:px-7 md:pb-8 md:pt-8 lg:max-w-3xl lg:p-6 lg:px-6 lg:pb-7 lg:pt-7">
              <div className="mb-3 text-center sm:mb-4">
                <span className="rounded bg-page-bg px-2 py-1 text-xs font-medium text-text-muted">
                  [50세 남자 일반심사형, 5년납, 1억원 기준]
                </span>
              </div>

              <div className="mb-3 grid grid-cols-3 gap-2 sm:mb-4 sm:gap-3 md:gap-5 lg:gap-4">
                <div className="px-0.5 text-center sm:px-1">
                  <div
                    className="mb-2 inline-block translate-y-0 transform whitespace-nowrap rounded-lg bg-gradient-to-b from-[#3b82f6] via-[#2563eb] to-[#1d4ed8] px-1.5 py-1 text-xs font-bold text-white transition-transform hover:translate-y-[-2px] sm:mb-2.5 sm:px-2 sm:py-1.5 sm:text-sm md:text-base"
                    style={{
                      boxShadow:
                        '0 6px 12px rgba(29, 78, 216, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    7년 시점
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-lg font-extrabold text-[#3b82f6] sm:text-xl md:text-2xl">
                      93.2%
                    </div>
                  </div>
                </div>

                <div className="px-0.5 text-center sm:px-1">
                  <div
                    className="mb-2 inline-block translate-y-0 transform whitespace-nowrap rounded-lg bg-gradient-to-b from-[#ef4444] via-[#dc2626] to-[#b91c1c] px-1.5 py-1 text-xs font-bold text-white transition-transform hover:translate-y-[-2px] sm:mb-2.5 sm:px-2 sm:py-1.5 sm:text-sm md:text-base"
                    style={{
                      boxShadow:
                        '0 6px 12px rgba(185, 28, 28, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    10년 시점
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="animate-[jump-glow_1.2s_ease-in-out_infinite] text-lg font-extrabold text-[#ef4444] sm:text-xl md:text-2xl">
                      122.7%
                    </div>
                  </div>
                </div>

                <div className="px-0.5 text-center sm:px-1">
                  <div
                    className="mb-2 inline-block translate-y-0 transform whitespace-nowrap rounded-lg bg-gradient-to-b from-[#10b981] via-[#059669] to-[#047857] px-1.5 py-1 text-xs font-bold text-white transition-transform hover:translate-y-[-2px] sm:mb-2.5 sm:px-2 sm:py-1.5 sm:text-sm md:text-base"
                    style={{
                      boxShadow:
                        '0 6px 12px rgba(4, 120, 87, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    보너스
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-xs font-bold leading-tight text-emerald-600 sm:text-sm">
                      납입완료보너스
                      <br />
                      장기유지보너스
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-1 justify-center lg:ml-8 lg:justify-end lg:self-center">
            <div
              id="calculator-box"
              className="relative flex w-full max-w-md flex-col rounded-2xl bg-white p-5 shadow-2xl sm:max-w-lg sm:p-6 md:p-7"
            >
              <div className="mb-5 sm:mb-6">
                <div className="mb-1 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed]">
                    <CalculatorIcon className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary sm:text-xl">
                    해약환급금 계산하기
                  </h3>
                </div>
                <p className="ml-10 text-xs text-text-muted sm:text-sm">
                  간단한 정보 입력으로 예상 해약환급금을 확인하세요
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
                        className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg border-2 py-2.5 transition-all ${gender === 'M' ? 'border-[#8b5cf6] bg-[#8b5cf6]/5 text-[#8b5cf6]' : 'border-border-default hover:border-border-default'}`}
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
                        className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg border-2 py-2.5 transition-all ${gender === 'F' ? 'border-[#8b5cf6] bg-[#8b5cf6]/5 text-[#8b5cf6]' : 'border-border-default hover:border-border-default'}`}
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
                      className="w-full rounded-lg border border-border-default px-3 py-2.5 text-sm transition-all focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20"
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
                      className="w-full rounded-lg border border-border-default px-3 py-2.5 text-sm transition-all focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20"
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
                      className="w-full rounded-lg border border-border-default px-3 py-2.5 text-sm transition-all focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20"
                      placeholder="01012345678"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                    납입기간
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['5년', '7년', '10년'].map((period) => (
                      <label key={period} className="relative cursor-pointer">
                        {period === '5년' && (
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
                          className={`w-full rounded-lg border-2 py-2.5 text-center text-sm transition-all ${paymentPeriod === period ? 'border-[#8b5cf6] bg-[#8b5cf6]/5 font-bold text-[#8b5cf6]' : 'border-border-default hover:border-border-default'}`}
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
                          className={`w-full rounded-lg border-2 py-2.5 text-center text-sm transition-all ${paymentAmount === amount ? 'border-[#8b5cf6] bg-[#8b5cf6]/5 font-bold text-[#8b5cf6]' : 'border-border-default hover:border-border-default'}`}
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
                    className="h-4 w-4 cursor-pointer rounded border-border-default text-[#8b5cf6] focus:ring-[#8b5cf6]"
                  />
                  <span className="text-xs text-text-secondary">
                    개인정보 수집 및 이용에 동의합니다.
                    <button
                      type="button"
                      onClick={onOpenPrivacy}
                      className="ml-1 text-[#8b5cf6] underline hover:text-[#7c3aed]"
                    >
                      자세히 보기
                    </button>
                  </span>
                </div>

                <div className="mt-1 flex flex-col gap-2">
                  <button
                    type="submit"
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] py-3.5 text-base font-bold text-white shadow-lg shadow-[#8b5cf6]/25 transition hover:opacity-95"
                  >
                    <CalculatorIcon className="h-5 w-5" />
                    해약환급금 확인하기
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
              환급금 확인하기
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
        <div className="space-y-4">
          {isAgeKnown && !isAgeEligible && (
            <div className="rounded border border-red-200 bg-red-50 p-2 text-sm text-red-700">
              이 상품은 15세~70세까지만 가입 가능합니다. 현재 보험연령 {numericInsuranceAge}세는
              가입 대상이 아닙니다. 계산 기능은 이용하실 수 없습니다.
            </div>
          )}
          {isVerified && (
            <>
              <FireworksEffect show={true} />
              <div className="mb-2 rounded bg-[#f8f8ff] p-3 text-center">
                <div className="text-lg font-bold text-black">환급금 산출이 완료되었습니다.</div>
              </div>
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
                <div className="rounded border border-border-default bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-text-secondary">
                      <span className="mr-1 text-[#3a8094]">▸</span>보험사
                    </span>
                    <span className="font-bold text-[#3a8094]">신한라이프생명</span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-text-secondary">
                      <span className="mr-1 text-[#3a8094]">▸</span>상품명
                    </span>
                    <span className="font-bold text-[#3a8094]">모아더드림Plus종신보험</span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-text-secondary">
                      <span className="mr-1 text-[#3a8094]">▸</span>납입기간 / 월보험료
                    </span>
                    <span className="font-bold text-[#3a8094]">
                      {paymentPeriod && paymentAmount ? `${paymentPeriod} / ${paymentAmount}` : '-'}
                    </span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-text-secondary">
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
                <div className="rounded border border-border-default bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-text-secondary">
                      <span className="mr-1 text-[#3a8094]">▸</span>10년 시점 환급률
                    </span>
                    <span className="font-bold">
                      <span className="text-[#7c3aed]">{rate ? (rate * 100).toFixed(1) : '-'}</span>{' '}
                      <span className="text-[#3a8094]">%</span>
                    </span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-text-secondary">
                      <span className="mr-1 text-[#3a8094]">▸</span>10년 시점 이자
                    </span>
                    <span className="font-bold">
                      <span className="text-[#3b82f6]">{interestValue}</span>{' '}
                      <span className="text-[#3a8094]">원</span>
                    </span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-text-secondary">
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
                <div className="rounded border border-border-default bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-text-secondary">
                      <span className="mr-1 text-[#3a8094]">▸</span>보험사
                    </span>
                    <span className="font-bold text-[#3a8094]">신한라이프생명</span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-text-secondary">
                      <span className="mr-1 text-[#3a8094]">▸</span>상품명
                    </span>
                    <span className="font-bold text-[#3a8094]">모아더드림Plus종신보험</span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-text-secondary">
                      <span className="mr-1 text-[#3a8094]">▸</span>납입기간 / 월보험료
                    </span>
                    <span className="font-bold text-[#3a8094]">
                      {paymentPeriod && paymentAmount ? `${paymentPeriod} / ${paymentAmount}` : '-'}
                    </span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-text-secondary">
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
                <div className="rounded border border-border-default bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-text-secondary">
                      <span className="mr-1 text-[#3a8094]">▸</span>10년 시점 환급률
                    </span>
                    <span className="font-bold">
                      <span className="text-[#7c3aed]">?</span>{' '}
                      <span className="text-[#3a8094]">%</span>
                    </span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-text-secondary">
                      <span className="mr-1 text-[#3a8094]">▸</span>10년 시점 이자
                    </span>
                    <span className="font-bold">
                      <span className="text-[#3b82f6]">?</span>{' '}
                      <span className="text-[#3a8094]">원</span>
                    </span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-text-secondary">
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
              <div className="mt-0 rounded-lg bg-page-bg p-1.5 sm:p-2">
                <h3 className="mb-1 text-sm font-bold text-text-primary sm:text-base">
                  휴대폰 인증
                </h3>
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
        <div className="space-y-3">
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
