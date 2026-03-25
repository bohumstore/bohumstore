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
import { useInsuranceForm } from '@/hooks/useInsuranceForm';
import { useOTP } from '@/hooks/useOTP';

// 현재 경로에 맞는 상품 정보 가져오기
const currentPath = '/insurance/whole-life/dongyang/new-life';
const productConfig = getProductConfigByPath(currentPath);

const INSURANCE_COMPANY_ID = INSURANCE_COMPANIES.DONGYANG_LIFE; // 동양생명
const INSURANCE_PRODUCT_ID = INSURANCE_PRODUCTS.DONGYANG_NEW_ALDDUL_PLUS_WHOLE_LIFE; // 동양생명 new알뜰플러스종신보험

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
    companyName: productConfig?.config.companyName || '동양생명',
    productName: productConfig?.config.name || 'new알뜰플러스종신보험',
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
    if (!isChecked) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }
    if (!gender || !name || !birth || !phone) {
      alert('성별, 이름, 생년월일, 연락처를 모두 입력해 주세요.');
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
        mounthlyPremium: paymentAmount, // 실제 선택값
        paymentPeriod: paymentPeriod, // 실제 선택값
        tenYearReturnRate: rate ? (rate * 100).toFixed(1) : '-', // 환급률 (소수점 첫째 자리까지)
        interestValue, // 확정이자(실제 값)
        refundValue, // 예상해약환급금(실제 값)
        templateId: 'UB_8712',
        adminTemplateId: 'UA_8331',
      });
      if (res.data.success) {
        // 방문자 추적: 보험료 확인
        try {
          await trackPremiumCheck(INSURANCE_PRODUCT_ID, INSURANCE_COMPANY_ID, {
            phone,
            name,
            counsel_type_id: 1, // 보험료 확인
            utm_source: 'direct',
            utm_campaign: 'premium_calculation',
          });
          console.log('[CLIENT] 방문자 추적 성공: 보험료 확인');
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

    // 기본 필수 데이터만 확인 (납입기간, 월납입금액 제외)
    if (!name || !birth || !gender || !phone) {
      alert('필수 정보가 누락되었습니다. 모든 정보를 입력해주세요.');
      return;
    }

    setVerifying(true);
    try {
      // 납입기간과 월납입금액이 있는 경우에만 계산값 사용
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

  // ── 계산 로직 (상품별) ──
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

  // 환급률 계산 (안내용 가정치)
  let rate = 1.2,
    interestRate = 0.2; // 기본값: 5년납 가정치
  if (paymentPeriod.includes('5')) {
    rate = 1.2;
    interestRate = 0.2;
  } else if (paymentPeriod.includes('7')) {
    rate = 1.17;
    interestRate = 0.17;
  } else if (paymentPeriod.includes('10')) {
    rate = 1.12;
    interestRate = 0.12;
  }

  const interestValue = total ? (total * interestRate).toLocaleString('en-US') : '-';
  const refundValue = total ? (total * rate).toLocaleString('en-US') : '-';

  return (
    <>
      <section
        className="w-full bg-[#fff7cc] py-6 md:py-10 lg:py-3"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 px-4 md:flex-col md:items-center md:gap-8 md:px-6 md:py-4 lg:flex-row lg:items-start lg:justify-between lg:gap-12 lg:px-4 lg:py-4">
          {/* 왼쪽: 상품 설명/이미지 */}
          <div className="flex flex-1 flex-col items-center text-center md:items-center md:text-center lg:items-start lg:text-left">
            <div className="mb-2 flex items-center gap-2 text-sm text-text-secondary">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#2f80ed] font-bold text-white">
                D
              </span>
              <span>동양생명</span>
            </div>
            <h1 className="mb-4 text-3xl font-bold leading-tight text-text-primary md:mb-6 md:text-4xl lg:mb-4 lg:text-5xl">
              new알뜰플러스종신보험
              <br />
              (무배당, 해약환급금 일부지급형)
            </h1>
            <ul className="mb-8 space-y-2 md:mb-10 md:space-y-3 lg:mb-8 lg:space-y-2">
              <li className="flex items-center justify-center text-lg text-gray-800 md:justify-center md:text-xl lg:justify-start lg:text-lg">
                <span className="mr-2 text-xl text-[#f59e0b] md:mr-3 md:text-2xl lg:mr-2 lg:text-xl">
                  ✔
                </span>
                종신 사망보장 중심의 합리적 보장 설계
              </li>
              <li className="flex items-center justify-center text-lg text-gray-800 md:justify-center md:text-xl lg:justify-start lg:text-lg">
                <span className="mr-2 text-xl text-[#f59e0b] md:mr-3 md:text-2xl lg:mr-2 lg:text-xl">
                  ✔
                </span>
                해약환급금 일부지급형으로 보험료 부담 경감
              </li>
              <li className="flex items-center justify-center text-lg text-gray-800 md:justify-center md:text-xl lg:justify-start lg:text-lg">
                <span className="mr-2 text-xl text-[#f59e0b] md:mr-3 md:text-2xl lg:mr-2 lg:text-xl">
                  ✔
                </span>
                일반심사형/간편심사형 선택 가능(회사 기준)
              </li>
              <li className="flex items-center justify-center text-lg text-gray-800 md:justify-center md:text-xl lg:justify-start lg:text-lg">
                <span className="mr-2 text-xl text-[#f59e0b] md:mr-3 md:text-2xl lg:mr-2 lg:text-xl">
                  ✔
                </span>
                납입면제 등 부가 기능 제공(약관 기준)
              </li>
              <li className="flex items-center justify-center text-lg text-gray-800 md:justify-center md:text-xl lg:justify-start lg:text-lg">
                <span className="mr-2 text-xl text-[#f59e0b] md:mr-3 md:text-2xl lg:mr-2 lg:text-xl">
                  ✔
                </span>
                가입나이 및 가입한도는 회사 심사기준에 따름
              </li>
            </ul>
            {/* 환급률/보너스 안내 UI */}
            <div
              className="relative mx-auto mb-4 w-full max-w-full overflow-hidden rounded-2xl border border-white/50 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 p-6 shadow-2xl backdrop-blur-sm md:mb-6 md:max-w-4xl md:p-8 lg:p-6"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(147,197,253,0.1) 50%, rgba(196,181,253,0.1) 100%)',
                boxShadow:
                  '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              }}
            >
              {/* 유리반사 효과 */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-60"></div>
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

              <div className="relative z-10 grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-3 lg:gap-4">
                {/* 1. 7년 시점 (안내용) */}
                <div className="flex h-full flex-col justify-between rounded-xl border border-blue-200 bg-gradient-to-br from-blue-100 to-indigo-100 p-3 text-center shadow-lg transition-all duration-300 hover:shadow-xl md:p-4 lg:p-3">
                  <div>
                    <div className="mb-3 inline-block rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-md">
                      7년 시점
                    </div>
                  </div>
                  <div className="flex flex-1 items-center justify-center">
                    <div className="text-xl font-black text-brand-primary drop-shadow-lg md:text-2xl">
                      상품설명서 참조
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/50 p-2 text-xs leading-tight text-text-secondary">
                    * 예시는 안내용입니다.
                  </div>
                </div>

                {/* 2. 10년 시점 (안내용) */}
                <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-red-200 bg-gradient-to-br from-red-100 to-rose-100 p-3 text-center shadow-lg transition-all duration-300 hover:shadow-xl md:p-4 lg:p-3">
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/70 to-transparent"></div>
                  <div className="relative z-10">
                    <div className="mb-2 inline-block rounded-full bg-gradient-to-r from-red-500 to-rose-600 px-4 py-2 text-sm font-bold text-white shadow-md">
                      10년 시점
                    </div>
                    <div className="mb-2 flex items-center justify-center">
                      <div className="text-xl font-black text-status-red drop-shadow-lg md:text-2xl">
                        상품설명서 참조
                      </div>
                    </div>
                  </div>
                  <div className="relative z-10 mt-auto rounded-lg bg-white/50 p-2 text-xs leading-tight text-text-secondary">
                    * 예시는 안내용입니다.
                  </div>
                </div>

                {/* 3. 보너스 */}
                <div className="flex h-full flex-col justify-between rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-100 to-teal-100 p-3 text-center shadow-lg transition-all duration-300 hover:shadow-xl md:p-4 lg:p-3">
                  <div>
                    <div className="mb-3 inline-block rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-sm font-bold text-white shadow-md">
                      부가 기능
                    </div>
                  </div>
                  <div className="flex flex-1 items-center justify-center">
                    <div className="text-xs font-bold leading-tight text-gray-800">납입면제 등</div>
                  </div>
                  <div className="rounded-lg bg-white/50 p-2 text-xs leading-tight text-text-secondary">
                    약관 기준 적용
                  </div>
                </div>
              </div>
              <div className="relative z-10 mt-4 text-center text-xs text-text-secondary">
                <p className="font-medium">
                  * 모든 수치는 예시이며 실제 보장/환급 내용은 약관 및 상품설명서를 참고하세요.
                </p>
              </div>
            </div>
          </div>
          {/* 오른쪽: 보험료 확인 카드 */}
          <div className="flex w-full flex-1 justify-center lg:ml-8 lg:justify-end lg:self-end">
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
                    보험료 계산하기
                  </h3>
                </div>
                <p className="ml-10 text-xs text-text-muted sm:text-sm">
                  간단한 정보 입력으로 예상 보험료를 확인하세요
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

                {/* 납입기간 */}
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
                          className={`w-full rounded-lg border-2 py-2.5 text-center text-sm transition-all ${paymentPeriod === period ? 'border-[#f59e0b] bg-[#f59e0b]/5 font-bold text-[#f59e0b]' : 'border-border-default hover:border-border-default'}`}
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
                          className={`w-full rounded-lg border-2 py-2.5 text-center text-sm transition-all ${paymentAmount === amount ? 'border-[#f59e0b] bg-[#f59e0b]/5 font-bold text-[#f59e0b]' : 'border-border-default hover:border-border-default'}`}
                        >
                          {amount}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 개인정보 동의 */}
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

                {/* 버튼들 */}
                <div className="mt-1 flex flex-col gap-2">
                  <button
                    type="submit"
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#d97706] py-3.5 text-base font-bold text-white shadow-lg shadow-[#f59e0b]/25 transition hover:opacity-95"
                  >
                    <CalculatorIcon className="h-5 w-5" />
                    보험료 확인하기
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
              보험료 확인하기
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
          {/* 보험료 산출 완료 안내 박스 (인증 후) */}
          {isVerified && (
            <>
              <FireworksEffect show={true} />
              <div className="mb-2 rounded bg-[#f8f8ff] p-3 text-center">
                <div className="text-lg font-bold text-black">보험료 산출이 완료되었습니다.</div>
              </div>
              {/* 보험료 결과값 UI (상세 정보) */}
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
                    <span className="font-bold text-[#3a8094]">동양생명</span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>상품명
                    </span>
                    <span className="font-bold text-[#3a8094]">new알뜰플러스종신보험</span>
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
                      <span className="text-[#7c3aed]">{rate ? (rate * 100).toFixed(1) : '-'}</span>{' '}
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
                    <span className="font-bold text-[#3a8094]">동양생명</span>
                  </div>
                </div>
                <div className="rounded border border-border-default bg-white p-1.5 sm:p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-xs font-medium text-text-secondary sm:text-sm">
                      <span className="mr-1 text-[#3a8094]">▸</span>상품명
                    </span>
                    <span className="font-bold text-[#3a8094]">new알뜰플러스종신보험</span>
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
              {/* 휴대폰 인증 안내 및 인증번호 입력란을 항상 노출 */}
              <div className="mt-0 rounded-lg bg-page-bg p-2">
                {isAgeKnown && !isAgeEligible && (
                  <div className="mb-1 rounded border border-red-200 bg-red-50 p-2 text-sm text-red-700">
                    이 상품은 15세~70세까지만 가입 가능합니다. 현재 보험연령 {numericInsuranceAge}
                    세는 가입 대상이 아닙니다. 계산 기능은 이용하실 수 없습니다.
                  </div>
                )}
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
                <div className="mb-4 flex gap-2">
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
                      setOtpCode(val);
                    }}
                    maxLength={6}
                    className="flex-1 rounded-md border border-border-default px-4 py-3 text-base focus:border-[#3a8094] focus:ring-[#3a8094]"
                    placeholder="6자리 인증번호 입력"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleVerifyOTP}
                  disabled={!isAgeEligible || verifying}
                  className={`mt-1 w-full rounded-md px-2 py-2.5 text-base font-semibold transition-colors ${!isAgeEligible || verifying ? 'cursor-not-allowed bg-gray-300 text-text-muted' : 'bg-[#3a8094] text-white hover:bg-[#2c6070]'}`}
                >
                  {verifying ? '인증 처리중...' : '인증 및 보험료 계산'}
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
              <div className="mb-4 flex gap-2">
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
                  className="flex-1 rounded-md border border-border-default px-4 py-3 text-base focus:border-[#3a8094] focus:ring-[#3a8094]"
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
