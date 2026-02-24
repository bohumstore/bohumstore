'use client';

import React, { useState, useEffect } from 'react';
import Modal from '@/components/Modal';
import request from '@/app/api/request';
import { getTemplateIdByPath } from '@/constants/insurance';
import { trackPremiumCheck } from '@/lib/visitorTracking';
import FireworksEffect from '@/components/shared/FireworksEffect';
import { useInsuranceForm } from '@/hooks/useInsuranceForm';
import { useOTP } from '@/hooks/useOTP';
import TextField from '@/components/TextField';
import Button from '@/components/shared/Button';

const currentPath = '/insurance/annuity/kdb/happy-plus';
const INSURANCE_COMPANY_ID = 2;
const INSURANCE_PRODUCT_ID = 3;

type ModalType = 'calculate' | 'consult';

interface CalculatorConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ModalType;
}

export default function CalculatorConsultModal({ isOpen, onClose, type }: CalculatorConsultModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [consentGiven, setConsentGiven] = useState(false);
  const [consultMessage, setConsultMessage] = useState('');
  const [pensionAmounts, setPensionAmounts] = useState({
    monthly: 0, guaranteed: 0, totalUntil100: 0, pensionStartAge: 0, notice: '',
  });
  const [currentPensionStartAge, setCurrentPensionStartAge] = useState<number | null>(null);

  const {
    name, setName, gender, setGender, birth, phone, setPhone,
    paymentPeriod, setPaymentPeriod, paymentAmount, setPaymentAmount,
    isChecked, setIsChecked, nameInputRef, birthInputRef, phoneInputRef,
    handleInputFocus, handleBirthChange: baseHandleBirthChange,
    handlePhoneChange: baseHandlePhoneChange, validateForm,
    insuranceAge, isAgeKnown, numericInsuranceAge, isAgeEligible,
    isVerified, setIsVerified, formatTime,
  } = useInsuranceForm({ defaultPaymentPeriod: '', defaultPaymentAmount: '', validateAge: true, minAge: 15, maxAge: 70 });

  const {
    otpCode, setOtpCode, verifying, setVerifying,
    otpTimer, otpResendAvailable,
    consultOtpCode, setConsultOtpCode, consultOtpTimer,
    consultOtpResendAvailable,
    consultIsVerified, setConsultIsVerified,
    consultType, setConsultType, consultTime, setConsultTime,
    otpInputRef, consultOtpInputRef,
    handleSendOTP: baseHandleSendOTP,
    handleConsultSendOTP: baseHandleConsultSendOTP,
    setOtpSent,
  } = useOTP();

  useEffect(() => {
    if (isOpen) {
      if (type === 'calculate' && isVerified) setStep(4);
      else if (type === 'consult' && consultIsVerified) setStep(4);
      else if (!consentGiven) setStep(1);
      else if (consentGiven && step === 1) setStep(2);
    } else {
      // 모달이 닫히면 상태 초기화
      setStep(1);
      setConsentGiven(false);
      setIsChecked(false);
    }
  }, [isOpen, type, isVerified, consultIsVerified, consentGiven]);

  // Input handlers
  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value); setIsVerified(false);
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value); setIsVerified(false); };
  const handlePaymentPeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => { setPaymentPeriod(e.target.value); setIsVerified(false); };
  const handlePaymentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => { setPaymentAmount(e.target.value); setIsVerified(false); };
  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => { baseHandleBirthChange(e); setIsVerified(false); };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => { baseHandlePhoneChange(e); setIsVerified(false); };

  // OTP
  const handleSendOTP = async () => {
    const age = insuranceAge !== '' ? Number(insuranceAge) : NaN;
    if (isNaN(age) || age < 15 || age > 70) return;

    const otpConfig = {
      templateId: type === 'calculate' ? getTemplateIdByPath(currentPath) : 'UB_8715',
      companyName: 'KDB생명',
      productName: '더!행복플러스연금보험(보증형)',
      phone,
    };

    if (type === 'calculate') {
      await baseHandleSendOTP(otpConfig);
    } else {
      await baseHandleConsultSendOTP(otpConfig);
    }
  };

  // Pension calc
  const getPensionStartAge = (age: number, pp: string) => {
    const years = parseInt(pp.replace(/[^0-9]/g, ''));
    const ca = age + years;
    if (ca >= 80) return 80; if (ca >= 75) return 75; if (ca >= 70) return 70;
    return Math.max(ca, 65);
  };

  useEffect(() => {
    if (!paymentPeriod || !paymentAmount || !gender || !insuranceAge) { setCurrentPensionStartAge(null); return; }
    setCurrentPensionStartAge(getPensionStartAge(Number(insuranceAge), paymentPeriod));
  }, [paymentPeriod, paymentAmount, gender, insuranceAge]);

  const is15YearDisabled = Number(insuranceAge) + 15 > 80;
  const is20YearDisabled = Number(insuranceAge) + 20 > 80;

  const calculatePensionAmount = async (age: number, pp: string, pa: string, g: string) => {
    if (!age || !pp || !pa || !g) return { monthly: 0, guaranteed: 0, totalUntil100: 0, pensionStartAge: 0, notice: '' };
    try {
      let mp = 0;
      if (pa.includes('만원')) mp = parseInt(pa.replace(/[^0-9]/g, '')) * 10000;
      else mp = parseInt(pa.replace(/[^0-9]/g, ''));
      const py = parseInt(pp.replace(/[^0-9]/g, ''));
      const res = await fetch('/api/calculate-pension/', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerName: name, gender: g, age, paymentPeriod: py, monthlyPayment: mp, productType: 'happy-plus' }),
      });
      if (!res.ok) throw new Error('fail');
      const result = await res.json();
      if (result.success) return { monthly: result.data.monthlyPension, guaranteed: result.data.guaranteedAmount, totalUntil100: result.data.totalUntil100, pensionStartAge: result.data.pensionStartAge, notice: result.data.notice };
      throw new Error('fail');
    } catch { return { monthly: 0, guaranteed: 0, totalUntil100: 0, pensionStartAge: 0, notice: '' }; }
  };

  const handleVerifyOTP = async () => {
    const code = type === 'calculate' ? otpCode : consultOtpCode;
    if (code.length !== 6) { alert('6자리 인증번호를 입력해 주세요.'); return; }
    setVerifying(true);
    try {
      let calc = pensionAmounts;
      if (paymentPeriod && paymentAmount) { calc = await calculatePensionAmount(Number(insuranceAge), paymentPeriod, paymentAmount, gender); setPensionAmounts(calc); }
      const res = await request.post('/api/verifyOTP', {
        phone, name, birth, gender, code, counselType: type === 'calculate' ? 1 : 2,
        companyId: INSURANCE_COMPANY_ID, productId: INSURANCE_PRODUCT_ID,
        counselTime: consultTime, consultType: type === 'consult' ? consultType : undefined,
        mounthlyPremium: paymentAmount, paymentPeriod,
        monthlyPension: calc.monthly, guaranteedPension: calc.guaranteed,
        pensionStartAge: calc.pensionStartAge, totalUntil100: calc.totalUntil100,
        templateId: type === 'calculate' ? 'UB_8705' : 'UB_8715',
        adminTemplateId: type === 'calculate' ? 'UA_8331' : 'UA_8332',
      });
      if (res.data.success) {
        if (type === 'calculate') {
          try { await trackPremiumCheck(INSURANCE_PRODUCT_ID, INSURANCE_COMPANY_ID, { phone, name, counsel_type_id: 1, utm_source: 'direct', utm_campaign: 'premium_calculation' }); } catch {}
          setIsVerified(true); setOtpSent(false);
        } else { setConsultIsVerified(true); }
        alert('인증이 완료되었습니다!'); setStep(4);
      } else { alert('인증에 실패했습니다.'); }
    } catch { alert('인증에 실패했습니다. 다시 시도해주세요.'); }
    finally { setVerifying(false); }
  };

  let amount = 0;
  if (paymentAmount.includes('만원')) amount = parseInt(paymentAmount.replace(/[^0-9]/g, '')) * 10000;
  const months = parseInt(paymentPeriod.replace(/[^0-9]/g, '')) * 12;
  const total = amount > 0 && months > 0 ? amount * months : 0;

  /* ═══════════════════════════════════════════
     Step 1: 개인정보 동의
  ═══════════════════════════════════════════ */
  const renderStep1 = () => (
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

      <div className="flex gap-3">
        <button
          onClick={() => { setConsentGiven(true); setIsChecked(true); setStep(2); }}
          className="flex-1 h-[44px] rounded-lg bg-button button-l text-text-inverse transition hover:bg-button-hover"
        >
          동의
        </button>
        <button
          onClick={onClose}
          className="flex-1 h-[44px] rounded-lg bg-[#f0f3fa] button-l text-[#4f5b66] transition hover:bg-border-default"
        >
          미동의
        </button>
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════
     Step 2: 정보 입력
  ═══════════════════════════════════════════ */
  const renderStep2 = () => (
    <div className="space-y-5">
      <div className="">
        <div className="heading-4 text-text-primary">
          {type === 'calculate' ? '보험료 계산 정보 입력' : '상담 신청 정보 입력'}
        </div>
        <p className="body-l text-text-muted mt-1">정확한 안내를 위해 필수 정보를 입력해주세요.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block button-s text-text-secondary mb-1.5">성별 <span className="text-status-red">*</span></label>
          <div className="flex gap-2">
            {['M', 'F'].map(v => (
              <label key={v} className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg border-2 py-2.5 transition ${gender === v ? 'border-button bg-button/5 text-button' : 'border-border-default'}`}>
                <input type="radio" value={v} checked={gender === v} onChange={handleGenderChange} className="sr-only" />
                <span className="body-m font-medium">{v === 'M' ? '남자' : '여자'}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block button-s text-text-secondary mb-1.5">이름 <span className="text-status-red">*</span></label>
          <TextField ref={nameInputRef} value={name} onChange={handleNameChange} onFocus={handleInputFocus} className="w-full" placeholder="홍길동" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block button-s text-text-secondary mb-1.5">생년월일 <span className="text-status-red">*</span></label>
          <TextField type="text" inputMode="numeric" ref={birthInputRef} value={birth} onChange={handleBirthChange} onFocus={handleInputFocus} maxLength={8} className="w-full" placeholder="19880818" />
        </div>
        <div>
          <label className="block button-s text-text-secondary mb-1.5">연락처 <span className="text-status-red">*</span></label>
          <TextField type="text" inputMode="numeric" ref={phoneInputRef} value={phone} onChange={handlePhoneChange} onFocus={handleInputFocus} maxLength={11} className="w-full" placeholder="01012345678" />
        </div>
      </div>

      <div>
        <label className="block button-s text-text-secondary mb-2">납입기간 <span className="text-status-red">*</span></label>
        <div className="grid grid-cols-3 gap-2">
          {['10년', '15년', '20년'].map(p => {
            const disabled = (p === '15년' && is15YearDisabled) || (p === '20년' && is20YearDisabled);
            return (
              <label key={p} className="relative flex cursor-pointer items-center justify-center">
                {p === '10년' && <span className="absolute -top-2 left-1/2 z-10 -translate-x-1/2 rounded-full bg-status-yellow px-1.5 py-0.5 caption-s font-bold text-text-inverse">추천</span>}
                <input type="radio" value={p} checked={paymentPeriod === p} onChange={handlePaymentPeriodChange} disabled={disabled} className="peer sr-only" />
                <div className={`w-full rounded-lg border-2 py-2.5 text-center body-m transition ${disabled ? 'border-border-default bg-page-bg text-text-disabled' : 'border-border-default peer-checked:border-button peer-checked:bg-button/5 peer-checked:font-bold peer-checked:text-button'}`}>{p}</div>
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block button-s text-text-secondary mb-2">월 납입금액 <span className="text-status-red">*</span></label>
        <div className="grid grid-cols-3 gap-2">
          {['30만원', '50만원', '100만원'].map(a => (
            <label key={a} className="relative flex cursor-pointer items-center justify-center">
              <input type="radio" value={a} checked={paymentAmount === a} onChange={handlePaymentAmountChange} className="peer sr-only" />
              <div className="w-full rounded-lg border-2 border-border-default py-2.5 text-center body-m transition peer-checked:border-button peer-checked:bg-button/5 peer-checked:font-bold peer-checked:text-button">{a}</div>
            </label>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          if (!validateForm()) return;
          if (isAgeKnown && !isAgeEligible) { alert(`이 상품은 15세~70세까지만 가입 가능합니다. 현재 보험연령 ${numericInsuranceAge}세는 가입 대상이 아닙니다.`); return; }
          setStep(3);
        }}
        className="w-full h-[44px] rounded-lg bg-button button-l text-text-inverse transition hover:bg-button-hover"
      >
        다음
      </button>
    </div>
  );

  /* ═══════════════════════════════════════════
     Step 3: 인증 화면
  ═══════════════════════════════════════════ */
  const renderStep3 = () => {
    const isCalc = type === 'calculate';
    const timer = isCalc ? otpTimer : consultOtpTimer;
    const canResend = isCalc ? otpResendAvailable : consultOtpResendAvailable;
    const code = isCalc ? otpCode : consultOtpCode;
    const setCode = isCalc ? setOtpCode : setConsultOtpCode;

    if (isCalc) {
      /* ── 계산하기 인증 ── */
      return (
        <div className="space-y-5">
          <div className="">
            <div className="heading-4 text-text-primary">
              {type === 'calculate' ? '연금액 확인하기' : '상담 신청하기'}
            </div>
          </div>
          <div className="rounded-2xl bg-section-bg p-5">
            <p className="body-m font-bold text-text-primary flex items-center mb-3">
              <span className="text-brand-primary mr-1.5">●</span> 연금 예상 요약 <span className="ml-2 text-brand-primary font-extrabold">{name} 님</span>
            </p>
            <div className="space-y-2 select-none">
              <div className="flex justify-between bg-white/60 rounded-lg p-3 body-m">
                <span className="text-text-secondary font-medium">월 연금액</span>
                <span className="font-bold text-brand-primary bg-brand-primary/10 rounded px-5 blur-[4px]">000,000 원</span>
              </div>
              <div className="caption-r text-text-muted px-1">
                연금 개시 {currentPensionStartAge || '--'}세 · 총 납입액 약 {total > 0 ? Math.round(total / 10000).toLocaleString() : '--'}만 원
              </div>
            </div>
          </div>

          <div>
            <p className="heading-5 text-text-primary mb-1 flex items-center">🔒 휴대폰 인증</p>
            <p className="body-s text-text-muted mb-3">정확한 연금액 확인을 위해 휴대폰 인증이 필요합니다.</p>
            <div className="flex gap-2 mb-3">
              <TextField type="text" value={phone} readOnly className="flex-1 bg-page-bg text-text-muted h-auto py-2.5" />
              <Button variant="secondary" size="sm" onClick={handleSendOTP}>
                {canResend ? '인증번호 받기' : '재발송'}
              </Button>
            </div>
            <div className="relative mb-4">
              <TextField type="text" inputMode="numeric" maxLength={6} ref={otpInputRef} value={code} onChange={e => setCode(e.target.value.replace(/[^0-9]/g, ''))} className="w-full h-auto py-2.5" placeholder="인증번호 6자리 입력" />
              {!canResend && <span className="absolute right-3 top-1/2 -translate-y-1/2 body-m font-medium text-status-red">{formatTime(timer)}</span>}
            </div>
          </div>

          <div>
            <p className="heading-5 text-text-primary mb-3 flex items-center">··· 상세 정보 보기</p>
            <div className="space-y-2 select-none">
              {['보험사', '상품명', '납입기간/월보험료', '20년 보증기간 연금액', '100세까지 생존 시 총 받는 금액'].map(label => (
                <div key={label} className="flex justify-between items-center bg-white border border-border-default rounded-lg p-3 body-m">
                  <span className="text-text-secondary font-medium flex items-center"><span className="text-brand-primary mr-1.5">▸</span>{label}</span>
                  <span className="font-bold text-brand-primary blur-[4px] select-none">●●●</span>
                </div>
              ))}
            </div>
            <div className="mt-3 caption-r text-text-muted leading-normal text-center">
              * 실제 연금액은 가입시점 및 고객 정보에 따라 달라질 수 있습니다.<br />
              * 휴대폰 인증 완료 후 상세정보를 확인하실 수 있습니다.
            </div>
          </div>

          <Button variant="primary" size="full" onClick={handleVerifyOTP} disabled={verifying || code.length !== 6}>
            {verifying ? '인증 처리중...' : '연금액 결과 확인하기'}
          </Button>
        </div>
      );
    }

    /* ── 상담 신청 인증 ── */
    return (
      <div className="space-y-5">
        <div>
          <p className="heading-5 text-text-primary mb-3 flex items-center">
            <span className="mr-1.5">●</span> 내 상담 정보
            <button onClick={() => setStep(2)} className="ml-auto body-m text-brand-primary font-medium hover:underline">수정</button>
          </p>
          <div className="bg-section-bg rounded-xl p-4 body-m text-text-primary space-y-1">
            <p><span className="font-bold">{name}</span> · {insuranceAge}세</p>
            <p className="text-text-muted body-m">담보상담 · {consultTime}</p>
          </div>
        </div>

        <div>
          <p className="heading-5 text-text-primary mb-2">상담 전에 남길 말이 있나요? (선택)</p>
          <textarea
            value={consultMessage}
            onChange={e => setConsultMessage(e.target.value)}
            className="w-full rounded-lg border border-border-default px-3 py-2.5 body-m outline-none focus:border-border-focus resize-none h-[72px]"
            placeholder="미리 전달하고 싶은 내용을 작성해 주세요."
          />
        </div>

        <div>
          <p className="heading-5 text-text-primary mb-1 flex items-center">🔒 휴대폰 인증</p>
          <p className="body-s text-text-muted mb-3">상담신청을 위해 휴대폰 인증이 필요해요.</p>
          <div className="flex gap-2 mb-3">
            <TextField type="text" value={phone} readOnly className="flex-1 bg-page-bg text-text-muted h-auto py-2.5" />
            <Button variant="secondary" size="sm" onClick={handleSendOTP}>
              {canResend ? '인증번호 받기' : '재발송'}
            </Button>
          </div>
          <div className="relative mb-2">
            <TextField type="text" inputMode="numeric" maxLength={6} ref={consultOtpInputRef} value={code} onChange={e => setCode(e.target.value.replace(/[^0-9]/g, ''))} className="w-full h-auto py-2.5" placeholder="인증번호 6자리 입력" />
            {!canResend && <span className="absolute right-3 top-1/2 -translate-y-1/2 body-m font-medium text-status-red">{formatTime(timer)}</span>}
          </div>
        </div>

        <Button variant="primary" size="full" onClick={handleVerifyOTP} disabled={verifying || code.length !== 6}>
          {verifying ? '인증 처리중...' : '상담 신청하기'}
        </Button>
      </div>
    );
  };

  /* ═══════════════════════════════════════════
     Step 4: 결과
  ═══════════════════════════════════════════ */
  const renderStep4 = () => {
    if (type === 'consult') {
      return (
        <div className="text-center py-8 px-4">
          <FireworksEffect show={true} />
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary-soft mb-5">
            <svg className="w-8 h-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <div className="heading-4 text-text-primary mb-2">상담신청이 접수되었습니다!</div>
          <p className="body-m text-text-secondary leading-relaxed">담당자가 입력하신 번호로 빠르게 안내해 드리겠습니다.</p>
        </div>
      );
    }

    /* 계산 결과 */
    return (
      <div className="px-2 py-2 space-y-4">
        <FireworksEffect show={true} />
        <div className="mb-2">
          <div className="heading-4 text-text-primary">연금액 산출 결과</div>
        </div>

        <div className="rounded-xl bg-page-bg p-4">
          <div className="mb-3 flex items-center heading-5 text-text-primary">
            <span className="heading-4 text-category-purple">{name}</span>
            <span className="heading-5 text-category-purple">&nbsp;님</span>
            <span className="ml-2 flex items-center">
              <span className="body-m text-brand-primary mr-1">보험연령</span>
              <span className="body-xl font-extrabold text-status-red">{insuranceAge}</span>
              <span className="body-m text-brand-primary">세</span>
            </span>
          </div>

          <div className="space-y-2">
            {[
              { label: '보험사', value: 'KDB생명', color: 'text-brand-primary' },
              { label: '상품명', value: '더!행복플러스연금보험(보증형)', color: 'text-brand-primary' },
              { label: '납입기간 / 월보험료', value: `${paymentPeriod} / ${paymentAmount}`, color: 'text-brand-primary' },
              { label: '총 납입액', value: total ? `${total.toLocaleString()} 원` : '-', color: 'text-brand-primary' },
              { label: '연금개시연령', value: `${pensionAmounts.pensionStartAge || currentPensionStartAge || '?'} 세`, color: 'text-category-purple' },
              { label: '월 연금액', value: pensionAmounts.monthly > 0 ? `약 ${pensionAmounts.monthly.toLocaleString()} 원` : '별도 상담 문의', color: 'text-category-health' },
              { label: '20년 보증기간 연금액', value: pensionAmounts.guaranteed > 0 ? `약 ${pensionAmounts.guaranteed.toLocaleString()} 원` : '별도 상담 문의', color: 'text-status-red' },
              { label: '100세까지 생존 시 총 받는 금액', value: pensionAmounts.totalUntil100 > 0 ? `약 ${pensionAmounts.totalUntil100.toLocaleString()} 원` : '별도 상담 문의', color: 'text-category-life' },
            ].map(item => (
              <div key={item.label} className="flex justify-between bg-white border border-border-default p-3 rounded-lg body-m">
                <span className="text-text-secondary font-medium"><span className="text-brand-primary mr-1">▸</span>{item.label}</span>
                <span className={`font-bold ${item.color}`}>{item.value}</span>
              </div>
            ))}
          </div>

          {pensionAmounts.notice && (
            <div className="mt-3 rounded-lg border border-status-yellow/30 bg-status-yellow/5 p-3 body-s text-text-secondary">
              <span className="font-medium">※ 안내:</span> {pensionAmounts.notice}
            </div>
          )}

          <div className="mt-4 text-center caption-r text-text-muted leading-normal">
            * 실제 연금액은 가입시점 및 고객 정보에 따라 달라질 수 있습니다.<br />
            * 본 계산 결과는 참고용이며, 실제 계약 시 약관을 확인 바랍니다.
          </div>
        </div>
      </div>
    );
  };

  /* ═══════════════════════════════════════════
     Modal Title
  ═══════════════════════════════════════════ */
  let modalTitle = '상담 신청하기';
  if (step === 1) modalTitle = '동의';
  else if (step === 2) modalTitle = type === 'calculate' ? '보험료 계산 정보 입력' : '상담 신청 정보 입력';
  else if (step === 3) modalTitle = type === 'calculate' ? '상담 전 인증' : '상담 전 인증';
  else if (step === 4) modalTitle = type === 'calculate' ? '연금액 산출 완료' : '상담 신청 완료';

  return (
    <Modal open={isOpen} onClose={onClose} hideHeader hideFooter>
      <div className="relative py-10 px-6">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}

        <button
          onClick={onClose}
          className="w-full mt-3 py-3 body-m font-medium text-text-muted hover:text-text-primary transition text-center"
        >
          닫기
        </button>
      </div>
    </Modal>
  );
}
