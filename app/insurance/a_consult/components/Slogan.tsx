import React, { useState, useEffect, useRef } from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import Modal from '@/components/Modal';
import request from '@/app/api/request';
import FireworksEffect from '@/components/shared/FireworksEffect';

type SloganProps = {
  onOpenPrivacy: () => void;
  onModalStateChange?: (isOpen: boolean) => void;
};

export default function Slogan({ onOpenPrivacy, onModalStateChange }: SloganProps) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [isChecked, setIsChecked] = useState(true);

  const [verifying, setVerifying] = useState(false);

  const [showConsultModal, setShowConsultModal] = useState(false);
  const [consultOtpCode, setConsultOtpCode] = useState('');
  const [consultOtpTimer, setConsultOtpTimer] = useState(180);
  const [consultOtpResendAvailable, setConsultOtpResendAvailable] = useState(true);
  const [consultIsVerified, setConsultIsVerified] = useState(false);

  const [consultType, setConsultType] = useState('- 상담 종류 선택 -');
  const [consultTime, setConsultTime] = useState('아무때나');
  const consultTypeOptions = [
    '- 상담 종류 선택 -',
    '암보험',
    '3대진단비보험',
    '무해지건강보험',
    '어린이보험',
    '수술/입원비보험',
    '유병자/간편보험',
    '간호/간병보험',
    '종신/정기보험',
    '연금/변액연금보험',
    '운전자보험',
    '기타문의',
  ];
  const consultTimeOptions = [
    '- 상담 시간대 선택 -',
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

  // 입력 포커스 제어용 Ref
  const nameInputRef = useRef<HTMLInputElement>(null);
  const birthInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const consultOtpInputRef = useRef<HTMLInputElement>(null);

  // 상담신청 타이머 효과
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (consultOtpTimer > 0) {
      timer = setTimeout(() => setConsultOtpTimer(consultOtpTimer - 1), 1000);
    } else if (consultOtpTimer === 0 && !consultOtpResendAvailable) {
      setConsultOtpResendAvailable(true);
    }
    return () => clearTimeout(timer);
  }, [consultOtpTimer, consultOtpResendAvailable]);

  // 모달 상태 변경 시 부모에게 알림
  useEffect(() => {
    onModalStateChange?.(showConsultModal);
  }, [showConsultModal, onModalStateChange]);

  const validateForm = () => {
    if (!isChecked) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return false;
    }
    if (!gender) {
      alert('성별을 선택해주세요.');
      return false;
    }
    if (!name) {
      alert('이름을 입력해주세요.');
      return false;
    }
    if (!birth) {
      alert('생년월일을 입력해주세요.');
      return false;
    }
    if (!/^\d{8}$/.test(birth)) {
      alert('생년월일을 8자리 숫자로 입력해주세요. (예: 19880818)');
      return false;
    }
    const birthYear = parseInt(birth.substring(0, 4));
    const birthMonth = parseInt(birth.substring(4, 6));
    const birthDay = parseInt(birth.substring(6, 8));
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);

    if (
      birthYear < 1900 ||
      birthYear > new Date().getFullYear() ||
      birthMonth < 1 ||
      birthMonth > 12 ||
      birthDay < 1 ||
      birthDay > 31 ||
      birthDate.getFullYear() !== birthYear ||
      birthDate.getMonth() !== birthMonth - 1 ||
      birthDate.getDate() !== birthDay
    ) {
      alert('올바른 생년월일을 입력해주세요.');
      return false;
    }

    // 보험연령 안내는 모달에서 처리 (이 상품: 15~70세)
    const formInsuranceAge = Number(getInsuranceAge(birth));

    if (!phone) {
      alert('연락처를 입력해주세요.');
      return false;
    }
    if (!/^\d{11}$/.test(phone)) {
      alert('연락처를 11자리 숫자로 입력해주세요. (예: 01012345678)');
      return false;
    }
    if (!phone.startsWith('010')) {
      alert('올바른 휴대폰 번호를 입력해주세요. (010으로 시작)');
      return false;
    }

    if (consultType === '- 상담 종류 선택 -') {
      alert('상담 종류를 선택해주세요.');
      return false;
    }
    if (consultTime === '- 상담 시간대 선택 -') {
      alert('상담 시간대를 선택해주세요.');
      return false;
    }
    return true;
  };

  const handlePostOTP = async () => {
    const templateId = 'UA_7754';
    try {
      await request.post('/api/postOTP', {
        phone,
        templateId,
        companyName: '보험스토어',
        productName: '상담신청',
      });
      alert('인증번호가 전송되었습니다.');
    } catch (e: any) {
      if (e.code === 'ECONNABORTED') {
        alert('인증번호 전송 시간이 초과되었습니다. 다시 시도해주세요.');
      } else {
        alert('인증번호 전송에 실패했습니다.');
      }
    }
  };

  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numbers = value.replace(/[^0-9]/g, '').slice(0, 8);
    setBirth(numbers);
    if (numbers.length === 8) {
      setTimeout(() => phoneInputRef.current?.focus(), 0);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numbers = value.replace(/[^0-9]/g, '').slice(0, 11);
    setPhone(numbers);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // 입력값 변경 시 처리
  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };
  // 입력 필드 포커스 시 스크롤 조정
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const target = e.target;
    // 모바일 환경에서 키보드가 올라올 때 입력창이 가려지지 않도록 중앙으로 스크롤
    if (window.innerWidth < 768 && target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleOpenConsultModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isChecked) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }
    if (!gender || !name || !birth || !phone) {
      alert('성별, 이름, 생년월일, 연락처를 모두 입력해 주세요.');
      return;
    }
    if (consultType === '- 상담 종류 선택 -') {
      alert('상담 종류를 선택해주세요.');
      return;
    }
    if (consultTime === '- 상담 시간대 선택 -') {
      alert('상담 시간대를 선택해주세요.');
      return;
    }
    setConsultIsVerified(false);
    setConsultOtpCode('');
    setConsultOtpTimer(0);
    setConsultOtpResendAvailable(true);
    setShowConsultModal(true);
  };
  const handleCloseConsultModal = () => {
    setConsultIsVerified(false);
    setShowConsultModal(false);
    setConsultOtpTimer(0);
    setConsultOtpResendAvailable(true);
  };
  const handleConsultSendOTP = async () => {
    setConsultOtpTimer(180);
    setConsultOtpResendAvailable(false);
    await handlePostOTP();
    // 인증번호 입력란에 포커스 및 스크롤
    setTimeout(() => {
      consultOtpInputRef.current?.focus();
      consultOtpInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
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
        companyId: null, // 상담 신청이므로 특정 회사 없음
        productId: null, // 상담 신청이므로 특정 상품 없음
        consultType, // 선택한 상담 종류 (예: 어린이보험)
        counselTime: consultTime,
        templateId: 'UB_8715',
      });
      if (res.data.success) {
        alert('인증이 완료되었습니다!');
        setConsultIsVerified(true);
        // 중복 발송 방지를 위해 추가 onlyClient 후속 발송 제거
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

  // 상담 신청 폼 제출 핸들러
  const handleInsuranceCostCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    // 필수 필드 검증
    if (!name.trim()) {
      alert('이름을 입력해주세요.');
      nameInputRef.current?.focus();
      return;
    }

    if (!gender) {
      alert('성별을 선택해주세요.');
      return;
    }

    if (birth.length !== 8) {
      alert('생년월일을 8자리로 입력해주세요. (예: 19880818)');
      birthInputRef.current?.focus();
      return;
    }

    // 생년월일 유효성 검사
    const birthYear = parseInt(birth.substring(0, 4));
    const birthMonth = parseInt(birth.substring(4, 6));
    const birthDay = parseInt(birth.substring(6, 8));
    if (
      birthYear < 1900 ||
      birthYear > new Date().getFullYear() ||
      birthMonth < 1 ||
      birthMonth > 12 ||
      birthDay < 1 ||
      birthDay > 31
    ) {
      alert('생년월일을 올바르게 입력해 주세요. (예: 19880818)');
      birthInputRef.current?.focus();
      return;
    }

    if (phone.length < 10 || phone.length > 11) {
      alert('연락처를 올바르게 입력해 주세요. (예: 01012345678)');
      phoneInputRef.current?.focus();
      return;
    }

    if (!phone.startsWith('010')) {
      alert('연락처를 올바르게 입력해 주세요. (010으로 시작)');
      phoneInputRef.current?.focus();
      return;
    }

    if (consultType === '- 상담 종류 선택 -') {
      alert('상담 종류를 선택해주세요.');
      return;
    }

    if (consultTime === '- 상담 시간대 선택 -') {
      alert('상담 시간대를 선택해주세요.');
      return;
    }

    if (!isChecked) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    // 모든 검증 통과 시 상담 모달 열기
    handleOpenConsultModal(e);
  };

  // 보험연령 계산 함수
  const getInsuranceAge = (birth: string) => {
    if (!/^\d{8}$/.test(birth)) return '';
    const birthYear = parseInt(birth.substring(0, 4));
    const birthMonth = parseInt(birth.substring(4, 6));
    const birthDay = parseInt(birth.substring(6, 8));
    const today = new Date();
    let age = today.getFullYear() - birthYear;
    if (
      today.getMonth() + 1 < birthMonth ||
      (today.getMonth() + 1 === birthMonth && today.getDate() < birthDay)
    ) {
      age -= 1;
    }
    return age;
  };

  // 보험연령 계산
  const insuranceAge = getInsuranceAge(birth);

  // 현재 년도, 월 가져오기
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 0-11을 1-12로 변환

  // 이슈 업데이트 관리: 내용 업데이트 완료 시 이 값을 현재 월로 변경
  const lastUpdatedMonth = 12; // ★ 이슈 내용이 업데이트된 월 (12월 = 내용 표시, 1월 되면 자동으로 업데이트중)
  const isUpdating = currentMonth !== lastUpdatedMonth;

  return (
    <>
      <section
        id="slogan-section"
        className="w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 py-8 md:py-10 lg:py-12"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 sm:gap-6 lg:flex-row lg:gap-16 lg:px-8">
          {/* 왼쪽: 설명 */}
          <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
            {/* 배지 */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-100 bg-white px-3 py-1 text-xs font-medium md:text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
              </span>
              <span className="text-text-secondary">
                {currentYear}년 {currentMonth}월
              </span>
            </div>

            <h1 className="mb-3 text-2xl font-bold leading-tight text-text-primary sm:text-3xl md:mb-4 md:text-4xl lg:text-5xl xl:text-6xl">
              보험, <span className="text-brand-primary">제대로</span> 알고
              <br />
              가입하고 계신가요?
            </h1>
            <p className="mb-5 text-base text-text-muted md:mb-6 md:text-lg">
              복잡한 보험, 전문가가 쉽게 설명해드립니다
            </p>

            <ul className="mb-4 space-y-2 text-left md:space-y-3 lg:mb-6">
              <li className="flex items-center text-sm text-gray-700 md:text-base lg:text-lg">
                <span className="mr-2 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary-soft text-xs text-brand-primary md:mr-3 md:h-6 md:w-6">
                  ✓
                </span>
                <span>
                  내 보험료가 적절한지{' '}
                  <span className="font-semibold text-text-primary">무료 분석</span>
                </span>
              </li>
              <li className="flex items-center text-sm text-gray-700 md:text-base lg:text-lg">
                <span className="mr-2 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary-soft text-xs text-brand-primary md:mr-3 md:h-6 md:w-6">
                  ✓
                </span>
                <span>
                  여러 보험사 상품{' '}
                  <span className="font-semibold text-text-primary">객관적 비교</span>
                </span>
              </li>
              <li className="flex items-center text-sm text-gray-700 md:text-base lg:text-lg">
                <span className="mr-2 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary-soft text-xs text-brand-primary md:mr-3 md:h-6 md:w-6">
                  ✓
                </span>
                <span>
                  불필요한 특약 <span className="font-semibold text-text-primary">정리 컨설팅</span>
                </span>
              </li>
            </ul>

            {/* 이 달의 보험 이슈 */}
            <div className="mx-auto w-full max-w-[360px] rounded-xl border border-orange-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:max-w-sm sm:p-5 md:max-w-md lg:mx-0 lg:max-w-md">
              <div className="mb-2 flex items-center gap-2 sm:mb-3">
                <span className="animate-pulse text-base text-orange-500 sm:text-lg">📢</span>
                <span className="text-sm font-bold text-gray-800 sm:text-base">
                  {currentMonth}월 보험 이슈
                </span>
                <span className="ml-auto animate-pulse rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-medium text-white sm:px-2.5 sm:py-1 sm:text-xs">
                  HOT
                </span>
              </div>
              {isUpdating ? (
                <div className="flex items-center justify-center gap-2 py-4 sm:gap-3 sm:py-5">
                  <div className="flex gap-1.5">
                    <span
                      className="h-2.5 w-2.5 animate-bounce rounded-full bg-orange-400 sm:h-3 sm:w-3"
                      style={{ animationDelay: '0ms' }}
                    ></span>
                    <span
                      className="h-2.5 w-2.5 animate-bounce rounded-full bg-orange-400 sm:h-3 sm:w-3"
                      style={{ animationDelay: '150ms' }}
                    ></span>
                    <span
                      className="h-2.5 w-2.5 animate-bounce rounded-full bg-orange-400 sm:h-3 sm:w-3"
                      style={{ animationDelay: '300ms' }}
                    ></span>
                  </div>
                  <span className="animate-pulse text-sm font-medium text-orange-600 sm:text-base">
                    {currentMonth}월 보험 이슈 확인 및 업데이트중...
                  </span>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-2.5">
                  <div className="flex items-start gap-2 text-sm text-text-secondary sm:text-base">
                    <span className="flex-shrink-0 animate-pulse text-orange-400">▸</span>
                    <span>
                      2025년 <span className="font-semibold text-status-red">보험료 인상</span>{' '}
                      예정!
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-text-secondary sm:text-base">
                    <span className="flex-shrink-0 animate-pulse text-orange-400">▸</span>
                    <span>
                      운전자보험{' '}
                      <span className="font-semibold text-status-red">변호사선임비용 축소</span>{' '}
                      예정!
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-text-secondary sm:text-base">
                    <span className="flex-shrink-0 animate-pulse text-orange-400">▸</span>
                    <span>
                      단기납종신보험{' '}
                      <span className="font-semibold text-status-red">환급률 축소</span> 예정!
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 오른쪽: 상담 신청 카드 */}
          <div className="flex w-full max-w-lg flex-1 justify-center lg:justify-end">
            <div
              id="calculator-box"
              className="w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-xl sm:p-6 md:p-8"
            >
              <div className="mb-5 sm:mb-6">
                <div className="mb-1 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                    <svg
                      className="h-4 w-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary sm:text-xl">무료 상담 신청</h3>
                </div>
                <p className="ml-10 text-xs text-text-muted sm:text-sm">
                  간단한 정보 입력으로 맞춤 상담을 받아보세요
                </p>
              </div>
              <form
                className="flex flex-col gap-4 sm:gap-5"
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
                      className="w-full rounded-lg border border-border-default px-3 py-2.5 text-sm transition-all focus:border-brand-primary focus:ring-2 focus:ring-blue-500/20"
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
                      className="w-full rounded-lg border border-border-default px-3 py-2.5 text-sm transition-all focus:border-brand-primary focus:ring-2 focus:ring-blue-500/20"
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
                      className="w-full rounded-lg border border-border-default px-3 py-2.5 text-sm transition-all focus:border-brand-primary focus:ring-2 focus:ring-blue-500/20"
                      placeholder="01012345678"
                    />
                  </div>
                </div>

                {/* 상담 정보 선택 */}
                <div className="grid grid-cols-2 gap-3">
                  {/* 상담 종류 드롭다운 */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-text-secondary sm:text-sm">
                      상담 종류 <span className="text-status-red">*</span>
                    </label>
                    <select
                      value={consultType}
                      onChange={(e) => setConsultType(e.target.value)}
                      className="w-full rounded-lg border border-border-default bg-white px-3 py-2.5 text-sm transition-all focus:border-brand-primary focus:ring-2 focus:ring-blue-500/20"
                    >
                      {consultTypeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* 상담 시간대 드롭다운 */}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-text-secondary sm:text-sm">
                      상담 시간대 <span className="text-status-red">*</span>
                    </label>
                    <select
                      value={consultTime}
                      onChange={(e) => setConsultTime(e.target.value)}
                      className="w-full rounded-lg border border-border-default bg-white px-3 py-2.5 text-sm transition-all focus:border-brand-primary focus:ring-2 focus:ring-blue-500/20"
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
                <div className="mb-2 flex items-center gap-2">
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
                      onClick={onOpenPrivacy}
                      className="ml-1 text-brand-primary underline hover:text-blue-800"
                    >
                      자세히 보기
                    </button>
                  </span>
                </div>

                {/* 버튼들 */}
                <div className="flex gap-2 pt-2">
                  <div className="relative flex-1">
                    <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 animate-bounce whitespace-nowrap rounded-full bg-gradient-to-r from-red-500 to-rose-500 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-lg sm:-top-4 sm:px-3 sm:py-1 sm:text-xs">
                      무료 상담
                    </span>
                    <button
                      type="submit"
                      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700"
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
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      상담신청
                    </button>
                  </div>
                  <a
                    href="https://pf.kakao.com/_lrubxb/chat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#fee500] py-3.5 text-base font-bold text-[#3d1e1e] shadow-lg shadow-[#fee500]/25 transition hover:opacity-95"
                  >
                    <ChatBubbleLeftRightIcon className="h-5 w-5" />
                    채팅상담
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
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
    </>
  );
}
