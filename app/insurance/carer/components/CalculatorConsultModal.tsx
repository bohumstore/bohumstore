'use client';

import React, { useState, useEffect } from 'react';
import Modal from '@/components/Modal';
import request from '@/app/api/request';
import { CONSULT_TIME_OPTIONS } from '@/constants/insurance';
import FireworksEffect from '@/components/shared/FireworksEffect';
import { useInsuranceForm } from '@/hooks/useInsuranceForm';
import { useOTP } from '@/hooks/useOTP';
import TextField from '@/components/TextField';
import SelectChip from '@/components/SelectChip';
import PrivacyConsent from '@/components/product/PrivacyConsent';
import Button from '@/components/shared/Button';
import CustomSelect from '@/components/CustomSelect';
import { ModalScrollBody, PreviewCard, StepHeader, InfoItem } from '@/templates/Product/components/CalculatorConsultModalScaffold';

type ModalType = 'calculate' | 'consult';

interface CalculatorConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ModalType;
}

export default function CalculatorConsultModal({ isOpen, onClose, type }: CalculatorConsultModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [consultMessage, setConsultMessage] = useState('');

  const {
    name, setName, gender, setGender, birth, phone,
    isChecked, setIsChecked, nameInputRef, birthInputRef, phoneInputRef,
    handleInputFocus, handleBirthChange: baseHandleBirthChange,
    handlePhoneChange: baseHandlePhoneChange, validateForm,
    isVerified, setIsVerified, formatTime,
  } = useInsuranceForm({ defaultPaymentPeriod: '', defaultPaymentAmount: '', validateAge: false });

  const {
    otpCode, setOtpCode, verifying, setVerifying,
    otpTimer, otpResendAvailable,
    consultOtpCode, setConsultOtpCode, consultOtpTimer,
    consultOtpResendAvailable,
    consultIsVerified, setConsultIsVerified,
    consultTime, setConsultTime,
    otpInputRef,
    handleSendOTP: baseHandleSendOTP,
    handleConsultSendOTP: baseHandleConsultSendOTP,
    setOtpSent,
  } = useOTP();

  useEffect(() => {
    if (isOpen) {
      if (type === 'calculate' && isVerified) setStep(3);
      else if (type === 'consult' && consultIsVerified) setStep(3);
      else setStep(1);
    } else {
      setStep(1);
      setIsChecked(false);
    }
  }, [isOpen, type, isVerified, consultIsVerified, setIsChecked]);

  // ── Input handlers ──
  const handleGenderChange = (value: 'M' | 'F') => {
    setGender(value); setIsVerified(false);
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value); setIsVerified(false); };
  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => { baseHandleBirthChange(e); setIsVerified(false); };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => { baseHandlePhoneChange(e); setIsVerified(false); };

  // ── OTP ──
  const handleSendOTP = async () => {
    const otpConfig = {
      templateId: 'UB_8715',
      companyName: '간병인보험',
      productName: '전문 간병인보험',
      phone,
    };

    if (type === 'calculate') {
      await baseHandleSendOTP(otpConfig);
    } else {
      await baseHandleConsultSendOTP(otpConfig);
    }
  };

  // ── OTP Verify ──
  const handleVerifyOTP = async () => {
    const code = type === 'calculate' ? otpCode : consultOtpCode;
    if (code.length !== 6) { alert('6자리 인증번호를 입력해 주세요.'); return; }
    setVerifying(true);
    try {
      const res = await request.post('/api/verifyOTP', {
        phone, name, birth, gender, code,
        counselType: type === 'calculate' ? 1 : 2,
        consultType: '간병인보험',
        counselTime: consultTime,
        consultMessage: type === 'consult' ? consultMessage : '',
        templateId: 'UB_8715', // 간병인보험은 상담 위주이므로 공통 상담 템플릿 사용
      });
      if (res.data.success) {
        if (type === 'calculate') {
          setIsVerified(true);
          setOtpSent(false);
        } else {
          setConsultIsVerified(true);
        }
        alert('인증이 완료되었습니다!');
        setStep(3);
      } else { alert('인증에 실패했습니다.'); }
    } catch { alert('인증에 실패했습니다. 다시 시도해주세요.'); }
    finally { setVerifying(false); }
  };

  /* ═══════════════════════════════════════════
     Step 1: 정보 입력
  ═══════════════════════════════════════════ */
  const renderStep1 = () => (
    <div className="space-y-5">
      <StepHeader 
        title={type === 'calculate' ? '간병인보험 정보 확인' : '간병인보험 상담 신청'} 
        description="정확한 안내를 위해 필수 정보를 입력해주세요."
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block button-s text-text-secondary mb-1.5">성별 <span className="text-status-red">*</span></label>
          <div className="flex gap-2">
            {(['M', 'F'] as const).map(v => (
              <SelectChip
                key={v}
                active={gender === v}
                onClick={() => handleGenderChange(v)}
                className="flex-1 h-[36px] w-auto"
              >
                {v === 'M' ? '남자' : '여자'}
              </SelectChip>
            ))}
          </div>
        </div>
        <div>
          <label className="block button-s text-text-secondary mb-1.5">이름 <span className="text-status-red">*</span></label>
          <TextField ref={nameInputRef} value={name} onChange={handleNameChange} onFocus={handleInputFocus} className="w-full" placeholder="홍길동" />
        </div>
      </div>

      {type === 'consult' && (
        <div>
          <p className="heading-5 text-text-primary mb-2">상담 전에 남길 말이 있나요? (선택)</p>
          <textarea
            value={consultMessage}
            onChange={e => setConsultMessage(e.target.value)}
            className="w-full rounded-lg border border-border-default px-3 py-2.5 body-m outline-none focus:border-border-focus resize-none h-[72px]"
            placeholder="미리 전달하고 싶은 내용을 작성해 주세요."
          />
        </div>
      )}

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
        <label className="block button-s text-text-secondary mb-1.5">상담 시간대 <span className="text-status-red">*</span></label>
        <CustomSelect
          value={consultTime}
          onChange={(val) => setConsultTime(val)}
          className="w-full"
          options={CONSULT_TIME_OPTIONS.map(t => ({ value: t, label: t }))}
        />
      </div>

      <PrivacyConsent
        checked={isChecked}
        onChange={(checked) => setIsChecked(checked)}
      />

      <button
        type="button"
        onClick={() => {
          if (!isChecked) { alert('개인정보 수집·이용에 동의해주세요.'); return; }
          if (!validateForm()) return;
          setStep(2);
        }}
        className="w-full h-[44px] rounded-lg bg-button button-l text-text-inverse transition hover:bg-button-hover"
      >
        다음
      </button>
    </div>
  );

  /* ═══════════════════════════════════════════
     Step 2: 인증 화면
  ═══════════════════════════════════════════ */
  const renderStep2 = () => {
    const isCalc = type === 'calculate';
    const timer = isCalc ? otpTimer : consultOtpTimer;
    const canResend = isCalc ? otpResendAvailable : consultOtpResendAvailable;
    const code = isCalc ? otpCode : consultOtpCode;
    const setCode = isCalc ? setOtpCode : setConsultOtpCode;

    return (
      <div className="space-y-5">
        <StepHeader title={isCalc ? '보험료 및 혜택 확인하기' : '상담 신청 인증'} />

        {isCalc && (
          <PreviewCard
            className="rounded-2xl border border-border-default bg-white p-5 shadow-sm mb-6"
            headerClassName="body-m font-bold text-text-primary flex items-center mb-3"
            titleClassName="flex items-center gap-1"
            bodyClassName="select-none"
            title={
              <>
                <span className="text-text-primary">간병인 보험 혜택 요약</span>
                <span className="text-brand-primary ml-1">{name} 님</span>
              </>
            }
            icon={<img src="/svgs/common/icon/person.svg" className="w-4 h-4 mr-1.5" alt="user" />}
            hint={<><span className="text-brand-primary mr-1">→</span><span>인증하면 상세 보장 내역을 확인할 수 있어요.</span></>}
            hintClassName="flex items-center body-s text-text-muted mt-3"
          >
            <div className="bg-page-bg rounded-lg px-4 py-3 body-m mb-2 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-text-primary font-medium">간병인 사용 일당</span>
                <span className="font-bold text-brand-primary blur-sm">최대 20만원</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-primary font-medium">가족 간병 시</span>
                <span className="font-bold text-brand-primary blur-sm">보험금 지급</span>
              </div>
            </div>
          </PreviewCard>
        )}

        <div>
          <p className="heading-5 text-text-primary mb-1 flex items-center gap-1">
            <img src="/svgs/common/icon/verify.svg" className="w-5 h-5" alt="lock" />
            휴대폰 인증
          </p>
          <p className="body-s text-text-muted mb-3">본인 확인을 위해 휴대폰 인증이 필요합니다.</p>
          <div className="flex gap-2 mb-3">
            <TextField type="text" value={phone} readOnly className="flex-1 bg-white border border-border-default text-text-primary h-auto py-2.5" />
            <Button variant="primary" size="sm" onClick={handleSendOTP} className="shrink-0">{canResend ? '인증번호 받기' : '재발송'}</Button>
          </div>
          <div className="relative">
            <TextField type="text" inputMode="numeric" maxLength={6} ref={otpInputRef} value={code} onChange={e => setCode(e.target.value.replace(/[^0-9]/g, ''))} className="w-full h-auto py-2.5 bg-white" placeholder="인증번호 6자리 입력" />
            {!canResend && <span className="absolute right-3 top-1/2 -translate-y-1/2 body-m font-medium text-brand-primary">{formatTime(timer)}</span>}
          </div>
        </div>

        <Button variant="primary" size="full" onClick={handleVerifyOTP} disabled={verifying || code.length !== 6}>
          {verifying ? '인증 처리중...' : isCalc ? '결과 확인하기' : '상담 신청하기'}
        </Button>
      </div>
    );
  };

  /* ═══════════════════════════════════════════
     Step 3: 결과
  ═══════════════════════════════════════════ */
  const renderStep3 = () => (
    <div className="text-center py-8 px-4">
      <FireworksEffect show={true} />
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary-soft mb-5">
        <img src="/svgs/common/check/check-circle.svg" className="w-8 h-8" alt="check" />
      </div>
      <StepHeader 
        title={type === 'calculate' ? '정보 접수가 완료되었습니다!' : '상담신청이 접수되었습니다!'} 
        description="전문 상담원이 곧 연락드려 상세한 내용을 안내해 드리겠습니다." 
        className="text-center" 
      />
      <div className="mt-8 bg-page-bg rounded-xl p-6 text-left space-y-3">
        <InfoItem label="보험종류" value="간병인보험" />
        <InfoItem label="이름" value={name} />
        <InfoItem label="연락처" value={phone} />
        <InfoItem label="희망 상담시간" value={consultTime} />
      </div>
    </div>
  );

  return (
    <Modal open={isOpen} onClose={onClose} hideHeader hideFooter>
      <ModalScrollBody className="relative py-10 px-6">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        {step !== 2 && (
          <button
            onClick={onClose}
            className="w-full mt-3 py-3 body-m font-medium text-text-muted hover:text-text-primary transition text-center"
          >
            닫기
          </button>
        )}
      </ModalScrollBody>
    </Modal>
  );
}
