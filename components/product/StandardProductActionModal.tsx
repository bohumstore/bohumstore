'use client';

import React, { useState, useEffect } from 'react';
import Modal from '@/components/Modal';
import request from '@/app/api/request';
import FireworksEffect from '@/components/shared/FireworksEffect';
import { useInsuranceForm } from '@/hooks/useInsuranceForm';
import { useOTP } from '@/hooks/useOTP';
import TextField from '@/components/TextField';
import Button from '@/components/shared/Button';
import { ModalScrollBody } from '@/templates/Product/components/CalculatorConsultModalScaffold';
import { CONSULT_TIME_OPTIONS } from '@/constants/insurance';

type ModalType = 'calculate' | 'consult';

interface StandardProductActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ModalType;
  config: {
    templateId: string;
    companyName: string;
    productName: string;
    productId?: number;
    companyId?: number;
    consultType: string;
  };
  renderStep1Header?: () => React.ReactNode;
  // Optional: product-specific calculation logic or fields
  calculationConfig?: {
    minAge?: number;
    maxAge?: number;
    validateAge?: boolean;
    defaultPaymentPeriod?: string;
    defaultPaymentAmount?: string;
  };
}

export default function StandardProductActionModal({
  isOpen,
  onClose,
  type,
  config,
  renderStep1Header,
  calculationConfig,
}: StandardProductActionModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [consultTimeLocal, setConsultTimeLocal] = useState('아무때나');

  const {
    name, setName, gender, setGender, birth, phone,
    nameInputRef, birthInputRef, phoneInputRef,
    handleInputFocus, handleBirthChange, handlePhoneChange, validateForm,
    insuranceAge, formatTime,
  } = useInsuranceForm({
    defaultPaymentPeriod: calculationConfig?.defaultPaymentPeriod || '',
    defaultPaymentAmount: calculationConfig?.defaultPaymentAmount || '',
    validateAge: calculationConfig?.validateAge || false,
    minAge: calculationConfig?.minAge,
    maxAge: calculationConfig?.maxAge,
  });

  const {
    consultOtpCode, setConsultOtpCode, consultOtpTimer,
    consultOtpResendAvailable,
    consultIsVerified, setConsultIsVerified,
    verifying, setVerifying,
    consultOtpInputRef,
    handleConsultSendOTP,
  } = useOTP();

  useEffect(() => {
    if (isOpen) {
      if (consultIsVerified) setStep(3);
      else setStep(1);
    } else {
      setStep(1);
    }
  }, [isOpen, consultIsVerified]);

  const handleGenderChange = (v: string) => {
    setGender(v);
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };

  const handleSendOTP = async () => {
    const otpConfig = {
      templateId: config.templateId,
      companyName: config.companyName,
      productName: config.productName,
      phone,
    };
    await handleConsultSendOTP(otpConfig);
  };

  const handleVerifyOTP = async () => {
    if (verifying) return;
    if (consultOtpCode.length !== 6) { alert('6자리 인증번호를 입력해주세요.'); return; }
    setVerifying(true);
    try {
      const res = await request.post('/api/verifyOTP', {
        phone,
        name,
        birth,
        gender,
        code: consultOtpCode,
        counselType: 2, // 상담용
        companyId: config.companyId || null,
        productId: config.productId || null,
        consultType: config.consultType,
        counselTime: consultTimeLocal,
        mounthlyPremium: '',
        paymentPeriod: '',
        tenYearReturnRate: '-',
        interestValue: '-',
        refundValue: '-',
        templateId: config.templateId,
      });
      if (res.data.success) {
        alert('상담 신청이 완료되었습니다!');
        setConsultIsVerified(true);
        setStep(3);
      } else {
        alert('인증에 실패했습니다.');
      }
    } catch (e: any) {
      console.error('OTP 인증 오류:', e);
      alert(e.response?.data?.error || e.message || '인증에 실패했습니다.');
    } finally {
      setVerifying(false);
    }
  };

  /* ── Step 1: 정보 입력 ── */
  const renderStep1 = () => (
    <div className="space-y-5">
      <div>
        <div className="heading-4 text-text-primary">
          {config.productName} {type === 'calculate' ? '보험료 확인' : '상담 신청'}
        </div>
        <p className="body-l text-text-muted mt-1 mb-5">
          {type === 'calculate' ? '정확한 설계를 위해 필수 정보를 입력해주세요.' : '전문가가 쉽고 명쾌하게 알려드립니다.'}
        </p>

        {renderStep1Header && renderStep1Header()}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block button-s text-text-secondary mb-1.5">성별 <span className="text-status-red">*</span></label>
          <div className="flex gap-2">
            {['M', 'F'].map(v => (
              <label key={v} className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg border-2 py-2.5 transition ${gender === v ? 'border-button bg-button/5 text-button' : 'border-border-default'}`}>
                <input type="radio" value={v} checked={gender === v} onChange={() => handleGenderChange(v)} className="sr-only" />
                <span className="body-m font-medium">{v === 'M' ? '남자' : '여자'}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block button-s text-text-secondary mb-1.5">이름 <span className="text-status-red">*</span></label>
          <TextField ref={nameInputRef} value={name} onChange={e => setName(e.target.value)} onFocus={handleInputFocus} className="w-full" placeholder="홍길동" />
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
        <label className="block button-s text-text-secondary mb-1.5">상담시간대 <span className="text-status-red">*</span></label>
        <select
          value={consultTimeLocal}
          onChange={(e) => setConsultTimeLocal(e.target.value)}
          className="w-full rounded-lg border border-border-default bg-white px-3 py-2.5 text-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        >
          {CONSULT_TIME_OPTIONS.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={() => {
          if (!validateForm()) return;
          setStep(2);
        }}
        className="w-full h-[44px] rounded-lg bg-button button-l text-text-inverse transition hover:bg-button-hover"
      >
        다음
      </button>
    </div>
  );

  /* ── Step 2: OTP 인증 ── */
  const renderStep2 = () => (
    <div className="space-y-5">
      <div>
        <p className="heading-5 text-text-primary mb-3 flex items-center">
          <span className="mr-1.5">●</span> 내 상담 정보
          <button onClick={() => setStep(1)} className="ml-auto body-m text-brand-primary font-medium hover:underline">수정</button>
        </p>
        <div className="bg-section-bg rounded-xl p-4 body-m text-text-primary space-y-1">
          <p><span className="font-bold">{name}</span> · {insuranceAge !== '' ? `${insuranceAge}세` : ''}</p>
          <p className="text-text-muted body-m">{config.consultType} 상담 · {consultTimeLocal}</p>
        </div>
      </div>

      <div>
        <p className="heading-5 text-text-primary mb-1 flex items-center">🔒 휴대폰 인증</p>
        <p className="body-s text-text-muted mb-3">상담신청을 위해 휴대폰 인증이 필요해요.</p>
        <div className="flex gap-2 mb-3">
          <TextField type="text" value={phone} readOnly className="flex-1 bg-page-bg text-text-muted h-auto py-2.5" />
          <Button variant="secondary" size="sm" onClick={handleSendOTP}>{consultOtpResendAvailable ? '인증번호 받기' : '재발송'}</Button>
        </div>
        <div className="relative mb-2">
          <TextField type="text" inputMode="numeric" maxLength={6} ref={consultOtpInputRef} value={consultOtpCode} onChange={e => setConsultOtpCode(e.target.value.replace(/[^0-9]/g, ''))} className="w-full h-auto py-2.5" placeholder="인증번호 6자리 입력" />
          {!consultOtpResendAvailable && <span className="absolute right-3 top-1/2 -translate-y-1/2 body-m font-medium text-status-red">{formatTime(consultOtpTimer)}</span>}
        </div>
      </div>

      <Button variant="primary" size="full" onClick={handleVerifyOTP} disabled={verifying || consultOtpCode.length !== 6}>
        {verifying ? '인증 처리중...' : '상담 신청하기'}
      </Button>
    </div>
  );

  /* ── Step 3: 완료 ── */
  const renderStep3 = () => (
    <div className="text-center py-8 px-4">
      <FireworksEffect show={true} />
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary-soft mb-5">
        <svg className="w-8 h-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      </div>
      <div className="heading-4 text-text-primary mb-2">상담신청이 접수되었습니다!</div>
      <p className="body-m text-text-secondary leading-relaxed">
        담당자가 <span className="font-bold text-brand-primary">{consultTimeLocal}</span>에
        <br />입력하신 번호로 연락드리겠습니다.
      </p>
    </div>
  );

  return (
    <Modal open={isOpen} onClose={onClose} hideHeader hideFooter>
      <ModalScrollBody className="relative py-10 px-6">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        <button
          onClick={onClose}
          className="w-full mt-3 py-3 body-m font-medium text-text-muted hover:text-text-primary transition text-center"
        >
          닫기
        </button>
      </ModalScrollBody>
    </Modal>
  );
}
