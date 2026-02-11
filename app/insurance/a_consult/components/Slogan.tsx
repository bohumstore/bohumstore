import React, { useState, useEffect, useRef } from 'react'
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import Modal from '@/components/Modal';
import request from '@/app/api/request';
import FireworksEffect from '@/components/shared/FireworksEffect';

type SloganProps = {
  onOpenPrivacy: () => void
  onModalStateChange?: (isOpen: boolean) => void
}

export default function Slogan({ onOpenPrivacy, onModalStateChange }: SloganProps) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
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
    '기타문의'
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
    '오후 06:00 이후'
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
    
    if (birthYear < 1900 || birthYear > new Date().getFullYear() ||
        birthMonth < 1 || birthMonth > 12 ||
        birthDay < 1 || birthDay > 31 ||
        birthDate.getFullYear() !== birthYear ||
        birthDate.getMonth() !== birthMonth - 1 ||
        birthDate.getDate() !== birthDay) {
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
  }

  const handlePostOTP = async () => {
    const templateId = 'UA_7754';
    try {
      await request.post('/api/postOTP', { 
        phone, 
        templateId,
        companyName: "보험스토어",
        productName: "상담신청"
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
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
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
    setConsultOtpCode("");
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
      alert("6자리 인증번호를 입력해주세요.");
      return;
    }
    setVerifying(true);
    try {
      const res = await request.post("/api/verifyOTP", {
        phone,
        name,
        birth,
        gender,
        code: consultOtpCode,
        counselType: 2,
        companyId: null,  // 상담 신청이므로 특정 회사 없음
        productId: null,  // 상담 신청이므로 특정 상품 없음
        consultType,  // 선택한 상담 종류 (예: 어린이보험)
        counselTime: consultTime,
        templateId: "UB_8715"
      });
      if (res.data.success) {
        alert("인증이 완료되었습니다!");
        setConsultIsVerified(true);
        // 중복 발송 방지를 위해 추가 onlyClient 후속 발송 제거
      } else {
        alert("인증에 실패했습니다.");
        return;
      }
    } catch (e: any) {
      alert(e.error || "인증에 실패했습니다.");
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
    if (birthYear < 1900 || birthYear > new Date().getFullYear() ||
        birthMonth < 1 || birthMonth > 12 ||
        birthDay < 1 || birthDay > 31) {
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
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-16 px-4 lg:px-8">
          {/* 왼쪽: 설명 */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* 배지 */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-red-100 text-xs md:text-sm font-medium mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-text-secondary">{currentYear}년 {currentMonth}월</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-text-primary mb-3 md:mb-4 leading-tight">
              보험, <span className="text-brand-primary">제대로</span> 알고<br />
              가입하고 계신가요?
            </h1>
            <p className="text-base md:text-lg text-text-muted mb-5 md:mb-6">복잡한 보험, 전문가가 쉽게 설명해드립니다</p>
            
            <ul className="space-y-2 md:space-y-3 text-left mb-4 lg:mb-6">
                <li className="flex items-center text-sm md:text-base lg:text-lg text-gray-700">
                    <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-brand-primary-soft text-brand-primary flex items-center justify-center text-xs mr-2 md:mr-3 flex-shrink-0">✓</span>
                    <span>내 보험료가 적절한지 <span className="font-semibold text-text-primary">무료 분석</span></span>
                </li>
                <li className="flex items-center text-sm md:text-base lg:text-lg text-gray-700">
                    <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-brand-primary-soft text-brand-primary flex items-center justify-center text-xs mr-2 md:mr-3 flex-shrink-0">✓</span>
                    <span>여러 보험사 상품 <span className="font-semibold text-text-primary">객관적 비교</span></span>
                </li>
                <li className="flex items-center text-sm md:text-base lg:text-lg text-gray-700">
                    <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-brand-primary-soft text-brand-primary flex items-center justify-center text-xs mr-2 md:mr-3 flex-shrink-0">✓</span>
                    <span>불필요한 특약 <span className="font-semibold text-text-primary">정리 컨설팅</span></span>
                </li>
            </ul>
            
            {/* 이 달의 보험 이슈 */}
            <div className="w-full max-w-[360px] sm:max-w-sm md:max-w-md lg:max-w-md mx-auto lg:mx-0 bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-orange-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="text-orange-500 text-base sm:text-lg animate-pulse">📢</span>
                <span className="text-sm sm:text-base font-bold text-gray-800">{currentMonth}월 보험 이슈</span>
                <span className="ml-auto px-2 sm:px-2.5 py-0.5 sm:py-1 bg-red-500 text-white text-[10px] sm:text-xs font-medium rounded-full animate-pulse">HOT</span>
              </div>
              {isUpdating ? (
                <div className="flex items-center justify-center gap-2 sm:gap-3 py-4 sm:py-5">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                  <span className="text-sm sm:text-base text-orange-600 font-medium animate-pulse">{currentMonth}월 보험 이슈 확인 및 업데이트중...</span>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-2.5">
                  <div className="flex items-start gap-2 text-sm sm:text-base text-text-secondary">
                    <span className="text-orange-400 flex-shrink-0 animate-pulse">▸</span>
                    <span>2025년 <span className="font-semibold text-status-red">보험료 인상</span> 예정!</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm sm:text-base text-text-secondary">
                    <span className="text-orange-400 flex-shrink-0 animate-pulse">▸</span>
                    <span>운전자보험 <span className="font-semibold text-status-red">변호사선임비용 축소</span> 예정!</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm sm:text-base text-text-secondary">
                    <span className="text-orange-400 flex-shrink-0 animate-pulse">▸</span>
                    <span>단기납종신보험 <span className="font-semibold text-status-red">환급률 축소</span> 예정!</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* 오른쪽: 상담 신청 카드 */}
          <div className="flex-1 flex justify-center lg:justify-end w-full max-w-lg">
            <div id="calculator-box" className="w-full bg-white rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 border border-gray-100">
              <div className="mb-5 sm:mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-text-primary">무료 상담 신청</h3>
                </div>
                <p className="text-text-muted text-xs sm:text-sm ml-10">간단한 정보 입력으로 맞춤 상담을 받아보세요</p>
              </div>
              <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleInsuranceCostCalculate}>
                {/* 성별/이름 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1.5">성별 <span className="text-status-red">*</span></label>
                    <div className="flex gap-2">
                      <label className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border-2 cursor-pointer transition-all ${gender === "M" ? 'border-brand-primary bg-bg-blue text-brand-primary' : 'border-border-default hover:border-border-default'}`}>
                        <input type="radio" name="gender" value="M" checked={gender === "M"} onChange={handleGenderChange} className="sr-only" />
                        <span className="text-sm font-medium">남자</span>
                      </label>
                      <label className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border-2 cursor-pointer transition-all ${gender === "F" ? 'border-brand-primary bg-bg-blue text-brand-primary' : 'border-border-default hover:border-border-default'}`}>
                        <input type="radio" name="gender" value="F" checked={gender === "F"} onChange={handleGenderChange} className="sr-only" />
                        <span className="text-sm font-medium">여자</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1.5">이름 <span className="text-status-red">*</span></label>
                    <input type="text" inputMode="text" ref={nameInputRef} value={name} onChange={handleNameChange} onFocus={handleInputFocus} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); birthInputRef.current?.focus(); } }} className="w-full px-3 py-2.5 border border-border-default rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-brand-primary transition-all" placeholder="홍길동" />
                  </div>
                </div>

                {/* 생년월일/연락처 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1.5">생년월일 <span className="text-status-red">*</span></label>
                    <input type="text" inputMode="numeric" pattern="[0-9]*" ref={birthInputRef} value={birth} onChange={handleBirthChange} onFocus={handleInputFocus} className="w-full px-3 py-2.5 border border-border-default rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-brand-primary transition-all" placeholder="19880818" maxLength={8} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1.5">연락처 <span className="text-status-red">*</span></label>
                    <input type="text" inputMode="numeric" pattern="[0-9]*" ref={phoneInputRef} value={phone} onChange={handlePhoneChange} onFocus={handleInputFocus} className="w-full px-3 py-2.5 border border-border-default rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-brand-primary transition-all" placeholder="01012345678" />
                  </div>
                </div>

                {/* 상담 정보 선택 */}
                <div className="grid grid-cols-2 gap-3">
                  {/* 상담 종류 드롭다운 */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-text-secondary mb-1.5">상담 종류 <span className="text-status-red">*</span></label>
                    <select
                      value={consultType}
                      onChange={(e) => setConsultType(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white border border-border-default rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-brand-primary transition-all"
                    >
                      {consultTypeOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  {/* 상담 시간대 드롭다운 */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-text-secondary mb-1.5">상담 시간대 <span className="text-status-red">*</span></label>
                    <select
                      value={consultTime}
                      onChange={(e) => setConsultTime(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white border border-border-default rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-brand-primary transition-all"
                    >
                      {consultTimeOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 개인정보 동의 */}
                <div className="flex items-center gap-2 mb-2">
                  <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} className="w-4 h-4 text-brand-primary rounded border-border-default cursor-pointer focus:ring-blue-500" />
                  <span className="text-xs text-text-secondary">
                    개인정보 수집 및 이용에 동의합니다. 
                    <button type="button" onClick={onOpenPrivacy} className="text-brand-primary underline ml-1 hover:text-blue-800">자세히 보기</button>
                  </span>
                </div>

                {/* 버튼들 */}
                <div className="flex gap-2 pt-2">
                  <div className="relative flex-1">
                    <span className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-500 to-rose-500 text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-lg z-10 animate-bounce whitespace-nowrap">
                      무료 상담
                    </span>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-3.5 text-base transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 cursor-pointer">
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                      </svg>
                      상담신청
                    </button>
                  </div>
                  <a href="https://pf.kakao.com/_lrubxb/chat" target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#fee500] text-[#3d1e1e] font-bold rounded-xl py-3.5 text-base flex items-center justify-center gap-2 hover:opacity-95 transition cursor-pointer shadow-lg shadow-[#fee500]/25">
                    <ChatBubbleLeftRightIcon className="w-5 h-5" />
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-brand-primary">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
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
              <div className="bg-[#f8f8ff] rounded p-2 sm:p-2.5 mb-1 text-center">
                <div className="text-base sm:text-lg text-black font-bold">상담신청이 접수되었습니다.</div>
                <div className="text-sm text-text-secondary mt-1">담당자가 선택하신 상담 시간에 연락드릴 예정입니다.</div>
              </div>
            </>
          ) : (
            <div className="text-sm text-gray-700 bg-[#f8f8ff] rounded p-2 mb-1 text-center font-semibold">
              상담신청을 위해 아래 정보를 입력해 주세요.
            </div>
          )}
          <div className="bg-page-bg rounded-lg p-1.5 sm:p-2 mb-0.5">
            <h3 className="mb-1.5 sm:mb-2 flex items-center">
              <span className="text-2xl text-brand-primary font-extrabold align-middle">{name}</span>
              <span className="text-lg text-brand-primary font-bold align-middle">&nbsp;님</span>
              {insuranceAge !== '' && (
                <span className="font-bold ml-2 flex items-center">
                  <span className="text-lg text-text-muted">보험연령 </span>
                  <span className="text-2xl font-extrabold text-status-red mx-1">{insuranceAge}</span>
                  <span className="text-lg text-text-muted">세</span>
                </span>
              )}
            </h3>
            <div className="grid grid-cols-1 gap-1.5">
              <div className="bg-white p-1.5 sm:p-2 rounded border border-border-default">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-xs sm:text-sm text-text-secondary font-medium"><span className='text-brand-primary mr-1'>▸</span>이름</span>
                  <span className="font-bold text-text-primary text-sm sm:text-base">{name}</span>
                </div>
              </div>
              <div className="bg-white p-1.5 sm:p-2 rounded border border-border-default">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-xs sm:text-sm text-text-secondary font-medium"><span className='text-brand-primary mr-1'>▸</span>연락처</span>
                  <span className="font-bold text-text-primary text-sm sm:text-base">{phone}</span>
                </div>
              </div>
              <div className="bg-white p-1.5 sm:p-2 rounded border border-border-default">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-xs sm:text-sm text-text-secondary font-medium"><span className='text-brand-primary mr-1'>▸</span>상담 종류</span>
                  {consultIsVerified ? (
                    <span className="font-bold text-text-primary text-sm sm:text-base">{consultType}</span>
                  ) : (
                    <select
                      value={consultType}
                      onChange={(e) => setConsultType(e.target.value)}
                      className="font-bold text-brand-primary text-sm sm:text-base bg-transparent border-none focus:outline-none cursor-pointer text-right"
                    >
                      {consultTypeOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
              <div className="bg-white p-1.5 sm:p-2 rounded border border-border-default">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-xs sm:text-sm text-text-secondary font-medium"><span className='text-brand-primary mr-1'>▸</span>상담 시간대</span>
                  {consultIsVerified ? (
                    <span className="font-bold text-text-primary text-sm sm:text-base">{consultTime}</span>
                  ) : (
                    <select
                      value={consultTime}
                      onChange={(e) => setConsultTime(e.target.value)}
                      className="font-bold text-brand-primary text-sm sm:text-base bg-transparent border-none focus:outline-none cursor-pointer text-right"
                    >
                      {consultTimeOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* 상담 안내 박스 */}
          <div className="bg-[#f8f8ff] rounded p-2 text-xs text-text-secondary text-center mb-1">
            📢 상담 중 궁금한 점은 언제든 말씀해 주세요.
          </div>
          {/* 휴대폰 인증 안내 */}
          {!consultIsVerified && (
            <div className="bg-page-bg rounded-lg p-1.5 sm:p-2 mt-0">
              <h3 className="text-sm sm:text-base font-bold text-text-primary mb-1">휴대폰 인증</h3>
              <p className="text-xs sm:text-sm text-text-secondary mb-1">상담신청을 위해 휴대폰 인증이 필요합니다.</p>
              <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2 mb-2 sm:mb-2.5 items-stretch sm:items-center">
                <input
                  type="text"
                  value={phone}
                  readOnly
                  className="flex-1 px-3 py-2 sm:py-2.5 border border-border-default rounded-md text-sm sm:text-base bg-gray-100"
                />
                <button
                  type="button"
                  onClick={handleConsultSendOTP}
                  className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 bg-blue-600 text-white rounded-md text-sm sm:text-base font-medium 
                           hover:bg-blue-700 transition-colors min-w-[100px] sm:min-w-[120px]"
                >
                  {consultOtpResendAvailable ? '인증번호 전송' : '재발송'}
                </button>
                {!consultOtpResendAvailable && (
                  <div className="min-w-[60px] flex items-center justify-center text-brand-primary font-medium text-sm">
                    {formatTime(consultOtpTimer)}
                  </div>
                )}
              </div>
              <div className="flex gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  ref={consultOtpInputRef}
                  value={consultOtpCode}
                  onChange={e => setConsultOtpCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                  onFocus={(e) => {
                    if (window.innerWidth < 768) {
                      setTimeout(() => {
                        e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }, 300);
                    }
                  }}
                  maxLength={6}
                  className="flex-1 px-3 py-2 sm:py-2.5 border border-border-default rounded-md text-sm sm:text-base focus:ring-blue-500 focus:border-brand-primary"
                  placeholder="6자리 인증번호 입력"
                />
              </div>
              <button
                type="button"
                onClick={handleConsultVerifyOTP}
                disabled={verifying || consultOtpCode.length !== 6}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-md text-base sm:text-lg font-semibold transition-colors mt-1 sm:mt-2 ${(verifying || consultOtpCode.length !== 6) ? 'bg-gray-300 text-text-muted cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
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
