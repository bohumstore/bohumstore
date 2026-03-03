import React, { useState, useEffect, useRef } from 'react';
import Modal from '@/components/Modal';
import request from '@/app/api/request';
import FireworksEffect from '@/components/shared/FireworksEffect';
import SelectField from '@/components/SelectField';
import TextField from '@/components/TextField';
import ToggleButtonGroup from '@/components/ToggleButtonGroup';
import IconButton from '@/components/IconButton';
import Button from '@/components/shared/Button';

type SloganProps = {
  onOpenPrivacy?: () => void;
  onModalStateChange?: (_isOpen: boolean) => void;
};

export default function Slogan({ onOpenPrivacy: _onOpenPrivacy, onModalStateChange }: SloganProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');

  const [verifying, setVerifying] = useState(false);
  const [consultOtpCode, setConsultOtpCode] = useState('');
  const [consultOtpTimer, setConsultOtpTimer] = useState(180);
  const [consultOtpResendAvailable, setConsultOtpResendAvailable] = useState(true);
  const [consultIsVerified, setConsultIsVerified] = useState(false);
  const [consultMessage, setConsultMessage] = useState('');

  const [consultType, setConsultType] = useState('- 상담 종류 선택 -');
  const [consultTime, setConsultTime] = useState('아무때나');
  const consultTypeOptions = [
    '- 상담 종류 선택 -', '암보험', '3대진단비보험', '무해지건강보험',
    '어린이보험', '수술/입원비보험', '유병자/간편보험', '간호/간병보험',
    '종신/정기보험', '연금/변액연금보험', '운전자보험', '기타문의',
  ];
  const consultTimeOptions = [
    '- 상담 시간대 선택 -', '아무때나',
    '오전 09:00 ~ 10:00', '오전 10:00 ~ 11:00', '오전 11:00 ~ 12:00',
    '오후 12:00 ~ 01:00', '오후 01:00 ~ 02:00', '오후 02:00 ~ 03:00',
    '오후 03:00 ~ 04:00', '오후 04:00 ~ 05:00', '오후 05:00 ~ 06:00',
    '오후 06:00 이후',
  ];

  const nameInputRef = useRef<HTMLInputElement>(null);
  const birthInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const consultOtpInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (consultOtpTimer > 0) {
      timer = setTimeout(() => setConsultOtpTimer(consultOtpTimer - 1), 1000);
    } else if (consultOtpTimer === 0 && !consultOtpResendAvailable) {
      setConsultOtpResendAvailable(true);
    }
    return () => clearTimeout(timer);
  }, [consultOtpTimer, consultOtpResendAvailable]);

  useEffect(() => {
    onModalStateChange?.(showConsultModal);
  }, [showConsultModal, onModalStateChange]);

  // 모달 열릴 때 Step 결정
  useEffect(() => {
    if (showConsultModal) {
      if (consultIsVerified) setStep(2);
      else setStep(1);
    } else {
      setStep(1);
      setIsChecked(false);
    }
  }, [showConsultModal, consultIsVerified]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (window.innerWidth < 768 && e.target) {
      setTimeout(() => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
    }
  };

  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numbers = e.target.value.replace(/[^0-9]/g, '').slice(0, 8);
    setBirth(numbers);
    if (numbers.length === 8) setTimeout(() => phoneInputRef.current?.focus(), 0);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 11));
  };

  const getInsuranceAge = (b: string) => {
    if (!/^\d{8}$/.test(b)) return '';
    const by = parseInt(b.substring(0, 4));
    const bm = parseInt(b.substring(4, 6));
    const bd = parseInt(b.substring(6, 8));
    const today = new Date();
    let age = today.getFullYear() - by;
    if (today.getMonth() + 1 < bm || (today.getMonth() + 1 === bm && today.getDate() < bd)) age -= 1;
    return age;
  };
  const insuranceAge = getInsuranceAge(birth);

  // 슬로건 폼 제출 → 모달 오픈
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isChecked) { alert('개인정보 수집 및 이용에 동의해주세요.'); return; }
    if (!gender) { alert('성별을 선택해주세요.'); return; }
    if (!name) { alert('이름을 입력해주세요.'); return; }
    if (!birth || !/^\d{8}$/.test(birth)) { alert('생년월일을 8자리로 입력해주세요.'); return; }
    const by = parseInt(birth.substring(0, 4)), bm = parseInt(birth.substring(4, 6)), bd = parseInt(birth.substring(6, 8));
    const birthDate = new Date(by, bm - 1, bd);
    if (by < 1900 || by > new Date().getFullYear() || bm < 1 || bm > 12 || bd < 1 || bd > 31 || birthDate.getFullYear() !== by || birthDate.getMonth() !== bm - 1 || birthDate.getDate() !== bd) {
      alert('올바른 생년월일을 입력해주세요.'); return;
    }
    if (!phone || !/^\d{11}$/.test(phone) || !phone.startsWith('010')) { alert('연락처를 올바르게 입력해주세요. (01012345678)'); return; }
    if (consultType === '- 상담 종류 선택 -') { alert('상담 종류를 선택해주세요.'); return; }
    if (consultTime === '- 상담 시간대 선택 -') { alert('상담 시간대를 선택해주세요.'); return; }
    // 폼 검증 통과 → 모달 오픈
    setConsultIsVerified(false);
    setConsultOtpCode('');
    setConsultOtpTimer(0);
    setConsultOtpResendAvailable(true);
    setConsultMessage('');
    setShowConsultModal(true);
  };

  const closeConsultModal = () => {
    setShowConsultModal(false);
    setConsultOtpTimer(0);
    setConsultOtpResendAvailable(true);
  };

  // OTP 발송
  const handlePostOTP = async () => {
    try {
      await request.post('/api/postOTP', { phone, templateId: 'UA_7754', companyName: '보험스토어', productName: '상담신청' });
      alert('인증번호가 전송되었습니다.');
    } catch (e: any) {
      alert(e.code === 'ECONNABORTED' ? '인증번호 전송 시간이 초과되었습니다.' : '인증번호 전송에 실패했습니다.');
    }
  };

  const handleSendOTP = async () => {
    setConsultOtpTimer(180);
    setConsultOtpResendAvailable(false);
    await handlePostOTP();
    setTimeout(() => {
      consultOtpInputRef.current?.focus();
      consultOtpInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  };

  // OTP 인증
  const handleVerifyOTP = async () => {
    if (verifying) return;
    if (consultOtpCode.length !== 6) { alert('6자리 인증번호를 입력해주세요.'); return; }
    setVerifying(true);
    try {
      const res = await request.post('/api/verifyOTP', {
        phone, name, birth, gender,
        code: consultOtpCode, counselType: 2,
        companyId: null, productId: null,
        consultType, counselTime: consultTime,
        templateId: 'UB_8715',
      });
      if (res.data.success) {
        setConsultIsVerified(true);
        setStep(2);
      } else { alert('인증에 실패했습니다.'); }
    } catch (e: any) {
      alert(e.error || '인증에 실패했습니다.');
    } finally { setVerifying(false); }
  };

  const renderStep1 = () => (
    <div className="space-y-5">
      <div>
        <p className="heading-5 text-text-primary mb-3 flex items-center">
          <span className="mr-1.5">●</span> 내 상담 정보
        </p>
        <div className="bg-section-bg rounded-xl p-4 body-m text-text-primary space-y-1">
          <p><span className="font-bold">{name}</span> · {insuranceAge}세</p>
          <p className="text-text-muted body-m">{consultType} · {consultTime}</p>
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
            {consultOtpResendAvailable ? '인증번호 받기' : '재발송'}
          </Button>
        </div>
        <div className="relative mb-2">
          <TextField type="text" inputMode="numeric" maxLength={6} ref={consultOtpInputRef} value={consultOtpCode} onChange={e => setConsultOtpCode(e.target.value.replace(/[^0-9]/g, ''))} className="w-full h-auto py-2.5" placeholder="인증번호 6자리 입력" />
          {!consultOtpResendAvailable && <span className="absolute right-3 top-1/2 -translate-y-1/2 body-m font-medium text-status-red">{formatTime(consultOtpTimer)}</span>}
        </div>
      </div>

      <Button
        variant="primary"
        size="full"
        onClick={handleVerifyOTP}
        disabled={verifying || consultOtpCode.length !== 6}
      >
        {verifying ? '인증 처리중...' : '상담 신청하기'}
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="text-center py-8 px-4">
      <FireworksEffect show={true} />
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary-soft mb-5">
        <svg className="w-8 h-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      </div>
      <div className="heading-4 text-text-primary mb-2">상담신청이 접수되었습니다!</div>
      <p className="body-m text-text-secondary leading-relaxed">담당자가 입력하신 번호로 빠르게 안내해 드리겠습니다.</p>
    </div>
  );

  return (
    <>
      <section
        id="slogan-section"
        className="w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 py-8 md:py-10 lg:py-12"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 sm:gap-6 lg:flex-row lg:gap-16 lg:px-8">
          <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="heading-2 mb-3 leading-tight text-text-primary md:mb-4 md:heading-1">
              <span className="text-brand-primary">내 보험</span>,
              <br />
              지금 괜찮을까요?
            </h1>
            <p className="body-l mb-5 text-text-muted md:mb-6">
              필요한 보장은 챙기고, 불필요한 건 줄여요.
            </p>

            <ul className="mb-4 space-y-2.5 text-left lg:mb-6">
              <li className="flex items-center body-m text-text-secondary md:body-l">
                <span className="mr-2.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary-soft text-xs text-brand-primary md:mr-3 md:h-6 md:w-6">
                  ✓
                </span>
                내 보험료 적정성, <span className="ml-1 font-semibold text-text-primary">무료로 분석해요.</span>
              </li>
              <li className="flex items-center body-m text-text-secondary md:body-l">
                <span className="mr-2.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary-soft text-xs text-brand-primary md:mr-3 md:h-6 md:w-6">
                  ✓
                </span>
                보험사 상품을 <span className="ml-1 font-semibold text-text-primary">객관적으로 비교해요.</span>
              </li>
              <li className="flex items-center body-m text-text-secondary md:body-l">
                <span className="mr-2.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary-soft text-xs text-brand-primary md:mr-3 md:h-6 md:w-6">
                  ✓
                </span>
                중복·불필요 특약을 <span className="ml-1 font-semibold text-text-primary">정리해요.</span>
              </li>
            </ul>
          </div>

          <div className="flex w-full max-w-lg flex-1 justify-center lg:justify-end">
            <div
              id="calculator-box"
              className="w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-xl sm:p-6 md:p-8"
            >
              <div className="mb-5 sm:mb-6">
                <h3 className="heading-4 text-text-primary text-center">상담 시작하기</h3>
              </div>
              <form
                className="flex flex-col gap-4 sm:gap-5"
                onSubmit={handleFormSubmit}
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block button-s text-text-secondary">
                      이름 <span className="text-status-red">*</span>
                    </label>
                    <TextField
                      ref={nameInputRef}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={handleInputFocus}
                      className="w-full"
                      placeholder="홍길동"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block button-s text-text-secondary">
                      성별 <span className="text-status-red">*</span>
                    </label>
                    <ToggleButtonGroup
                      options={[
                        { label: '남자', value: 'M' },
                        { label: '여자', value: 'F' },
                      ]}
                      value={gender}
                      size="s"
                      onChange={(val) => {
                        setGender(val);
                        setTimeout(() => birthInputRef.current?.focus(), 0);
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block button-s text-text-secondary">
                      생년월일 <span className="text-status-red">*</span>
                    </label>
                    <TextField
                      type="text"
                      inputMode="numeric"
                      ref={birthInputRef}
                      value={birth}
                      onChange={handleBirthChange}
                      onFocus={handleInputFocus}
                      maxLength={8}
                      className="w-full"
                      placeholder="19880818"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block button-s text-text-secondary">
                      연락처 <span className="text-status-red">*</span>
                    </label>
                    <TextField
                      type="text"
                      inputMode="numeric"
                      ref={phoneInputRef}
                      value={phone}
                      onChange={handlePhoneChange}
                      onFocus={handleInputFocus}
                      maxLength={11}
                      className="w-full"
                      placeholder="01012345678"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block button-s text-text-secondary sm:text-sm">
                      상담 종류 <span className="text-status-red">*</span>
                    </label>
                    <SelectField
                      value={consultType}
                      onChange={(e) => setConsultType(e.target.value)}
                      className="w-full"
                    >
                      {consultTypeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </SelectField>
                  </div>
                  <div>
                    <label className="mb-1.5 block button-s text-text-secondary sm:text-sm">
                      상담 시간대 <span className="text-status-red">*</span>
                    </label>
                    <SelectField
                      value={consultTime}
                      onChange={(e) => setConsultTime(e.target.value)}
                      className="w-full"
                    >
                      {consultTimeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </SelectField>
                  </div>
                </div>

                <div className="flex items-start gap-2 mt-4">
                  <input
                    type="checkbox"
                    id="privacy-consent"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="mt-1 w-4 h-4 text-button border-border-default rounded focus:ring-button"
                  />
                  <label htmlFor="privacy-consent" className="body-s text-text-secondary cursor-pointer">
                    [필수] 개인정보 수집·이용 및 제공에 동의합니다.
                    <button type="button" onClick={_onOpenPrivacy} className="ml-1 text-text-muted underline hover:text-text-primary">
                      자세히 보기
                    </button>
                  </label>
                </div>

                <div className="flex gap-3 pt-2">
                  <IconButton
                    type="submit"
                    variant="primary"
                    size="m"
                    className="flex-1 w-full"
                  >
                    상담 신청
                  </IconButton>
                  <IconButton
                    type="button"
                    variant="kakao"
                    size="m"
                    onClick={() => window.open('https://pf.kakao.com/_lrubxb/chat', '_blank')}
                    className="flex-1 w-full"
                  >
                    채팅 상담
                  </IconButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Modal open={showConsultModal} onClose={closeConsultModal} hideHeader hideFooter>
        <div className="relative py-10 px-6">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}

          <button
            onClick={closeConsultModal}
            className="w-full mt-3 py-3 body-m font-medium text-text-muted hover:text-text-primary transition text-center"
          >
            닫기
          </button>
        </div>
      </Modal>
    </>
  );
}
