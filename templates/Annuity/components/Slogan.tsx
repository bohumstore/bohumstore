import React, { useState, useEffect, useRef } from 'react';
import { CalculatorIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import Modal from '@/components/Modal';
import request from '@/app/api/request';
import FireworksEffect from './FireworksEffect';

const INSURANCE_COMPANY_ID = 1; // KB 손해보험
const INSURANCE_PRODUCT_ID = 1; // KB 트리플 레벨업 연금보험 무배당 id 코드값

type SloganProps = {
  onOpenPrivacy: () => void;
};

export default function Slogan({ onOpenPrivacy }: SloganProps) {
  const [counselType, setCounselType] = useState(1); // 1: 보험료 확인, 2: 상담신청
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentPeriod, setPaymentPeriod] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [isChecked, setIsChecked] = useState(true);

  const [showResultModal, setShowResultModal] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpResendAvailable, setOtpResendAvailable] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  const [showConsultModal, setShowConsultModal] = useState(false);
  const [consultOtpCode, setConsultOtpCode] = useState('');
  const [consultOtpTimer, setConsultOtpTimer] = useState(180);
  const [consultOtpResendAvailable, setConsultOtpResendAvailable] = useState(true);
  const [consultIsVerified, setConsultIsVerified] = useState(false);

  const [showConsultTypeDropdown, setShowConsultTypeDropdown] = useState(false);
  const [showConsultTimeDropdown, setShowConsultTimeDropdown] = useState(false);
  const [consultType, setConsultType] = useState('연금보험');
  const [consultTime, setConsultTime] = useState('아무때나');
  const consultTypeOptions = ['연금보험'];
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

  // 타이머 효과
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpTimer > 0) {
      timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
    } else if (otpTimer === 0 && !otpResendAvailable) {
      setOtpResendAvailable(true);
    }
    return () => clearTimeout(timer);
  }, [otpTimer, otpResendAvailable]);

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

    // 보험연령 체크 (0~70세만 가입 가능)
    const formInsuranceAge = Number(getInsuranceAge(birth));
    if (isNaN(formInsuranceAge) || formInsuranceAge < 0 || formInsuranceAge > 70) {
      alert('이 상품은 0~70세까지만 가입이 가능합니다.');
      return false;
    }

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

    if (!paymentPeriod) {
      alert('납입기간을 선택해주세요.');
      return false;
    }
    if (!paymentAmount) {
      alert('월 납입금액을 선택해주세요.');
      return false;
    }
    return true;
  };

  const handlePostOTP = async () => {
    const templateId = 'UA_7754';
    try {
      await request.post('/api/postOTP', { phone, templateId });
      setOtpSent(true);
    } catch (e: any) {
      console.error(e);
      alert('인증번호 전송에 실패했습니다.');
    }
  };

  const handleInsuranceCostCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setCounselType(1);
    setShowResultModal(true);
  };

  const handleVerifyAndShowInfo = () => {
    // if (!otpSent) {
    //   alert('인증번호를 먼저 전송해 주세요.');
    //   return;
    // }
    if (otpCode.length !== 6) {
      alert('6자리 인증번호를 입력해주세요.');
      return;
    }
    setIsVerified(true);
    alert('인증이 완료되었습니다!');
  };

  const handleVerifyOTP = async () => {
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
        tenYearReturnRate: rate ? Math.round(rate * 100) : '-', // 환급률
        interestValue, // 확정이자(실제 값)
        refundValue, // 예상해약환급금(실제 값)
      });
      if (res.data.success) {
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

  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 숫자만 추출하고 8자리로 제한
    const numbers = value.replace(/[^0-9]/g, '').slice(0, 8);
    setBirth(numbers);
    setIsVerified(false);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 숫자만 추출하고 11자리로 제한
    const numbers = value.replace(/[^0-9]/g, '').slice(0, 11);
    setPhone(numbers);
    setIsVerified(false);
  };

  const handleSendOTP = async () => {
    setOtpTimer(180); // 3분
    setOtpResendAvailable(false);
    await handlePostOTP(); // 인증번호 전송 및 otpSent true 처리
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // 모달 닫힐 때 인증상태 초기화
  const handleCloseModal = () => {
    setIsVerified(false);
    setShowResultModal(false);
    setOtpTimer(0);
    setOtpResendAvailable(true);
  };

  // 입력값 변경 시 인증상태 초기화
  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
    setIsVerified(false);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsVerified(false);
  };
  const handlePaymentPeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentPeriod(e.target.value);
    setIsVerified(false);
  };
  const handlePaymentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentAmount(e.target.value);
    setIsVerified(false);
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
  const consultOtpInputRef = useRef<HTMLInputElement>(null);
  const handleConsultSendOTP = async () => {
    setConsultOtpTimer(180);
    setConsultOtpResendAvailable(false);
    await handlePostOTP();
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
        companyId: INSURANCE_COMPANY_ID,
        productId: INSURANCE_PRODUCT_ID,
        consultType,
        counselTime: consultTime,
        mounthlyPremium: paymentAmount,
        paymentPeriod: paymentPeriod,
        tenYearReturnRate: rate ? Math.round(rate * 100) : '-',
        interestValue,
        refundValue,
      });
      if (res.data.success) {
        alert('인증이 완료되었습니다!');
        setConsultIsVerified(true);
        // 중복 발송 방지를 위해 onlyClient 후속 발송 제거
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
  let rate = 1.3,
    interestRate = 0.3;
  if (paymentPeriod.includes('5')) {
    rate = 1.3;
    interestRate = 0.3;
  } else if (paymentPeriod.includes('7')) {
    rate = 1.25;
    interestRate = 0.25;
  } else if (paymentPeriod.includes('10')) {
    rate = 1.2;
    interestRate = 0.2;
  }
  const interestValue = total ? (total * interestRate).toLocaleString('en-US') : '-';
  const refundValue = total ? (total * rate).toLocaleString('en-US') : '-';

  return (
    <>
      <section
        className="w-full bg-[#ffe15a] py-2 md:py-3"
        style={{
          backgroundImage: 'radial-gradient(#f8d34a 2px, transparent 2px)',
          backgroundSize: '20px 20px',
        }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-8 px-4 md:flex-col md:items-start md:gap-12 md:py-4 lg:flex-row lg:justify-between">
          {/* 왼쪽: 상품 설명/이미지 */}
          <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
              <img
                src="/images/logos/kb-life-logo.png"
                alt="KB라이프 로고"
                className="h-6 w-auto"
                style={{ minWidth: '24px' }}
              />
              <span>KB라이프생명</span>
            </div>
            <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
              KB 트리플 레벨업
              <br />
              연금보험 (보증형)
            </h1>
            <ul className="mb-8 space-y-2">
              <li className="flex items-center justify-center text-lg text-gray-800 md:justify-start">
                <span className="mr-2 text-xl text-[#ff8c1a]">✔</span>
                10년시점 130% 해약환급률 보증{' '}
                <span className="align-baseline text-xs">(5년납)</span>
              </li>
              <li className="flex items-center justify-center text-lg text-gray-800 md:justify-start">
                <span className="mr-2 text-xl text-[#ff8c1a]">✔</span>
                가입 0~70세 / 연금개시 45~85세
              </li>
              <li className="flex items-center justify-center text-lg text-gray-800 md:justify-start">
                <span className="mr-2 text-xl text-[#ff8c1a]">✔</span>
                비과세{' '}
                <span className="align-baseline text-xs">
                  (월 150만원 한도, 10년유지 세법요건 충족시)
                </span>
              </li>
              <li className="flex items-center justify-center text-lg text-gray-800 md:justify-start">
                <span className="mr-2 text-xl text-[#ff8c1a]">✔</span>
                병력 무심사 / 무사망 보장 / 전건 가입 가능
              </li>
            </ul>
            {/* 환급률/적립액 안내 UI */}
            <div className="mx-auto mb-6 w-full max-w-full rounded-xl bg-white p-4 px-2 shadow-md md:max-w-lg md:px-0 md:py-8">
              <div className="mb-2 flex flex-row items-stretch justify-between gap-4 md:items-end md:gap-0">
                <div className="min-w-[110px] flex-1 text-center md:min-w-[160px]">
                  <div className="mb-2 inline-block rounded-full bg-[#ff8c1a] px-4 py-1 text-xs font-bold text-white">
                    7년 시점
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="mb-1 text-2xl md:text-5xl">💰</span>
                    <div className="text-xs font-bold md:text-xl">환급률</div>
                    <div className="text-xl font-extrabold text-[#ff8c1a] md:text-4xl">100%</div>
                    <div className="mt-1 text-xs text-gray-500">* 5년납</div>
                  </div>
                </div>
                <div className="min-w-[110px] flex-1 text-center md:min-w-[160px]">
                  <div className="mb-2 inline-block rounded-full bg-[#3a80e0] px-4 py-1 text-xs font-bold text-white">
                    10년 시점
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="mb-1 text-2xl md:text-5xl">💰</span>
                    <div className="text-xs font-bold md:text-xl">환급률</div>
                    <div className="animate-[jump-glow_1.2s_ease-in-out_infinite] text-xl font-extrabold text-[#3a80e0] md:text-4xl">
                      130%
                    </div>
                    <div className="mt-1 whitespace-nowrap text-xs text-gray-500">* 5년납</div>
                  </div>
                </div>
                <div className="min-w-[110px] flex-1 text-center md:min-w-[160px]">
                  <div className="mb-2 inline-block rounded-full bg-[#e23c3c] px-4 py-1 text-xs font-bold text-white">
                    연금개시 시점
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="mb-1 text-2xl md:text-5xl">🐷</span>
                    <div className="text-xs font-bold md:text-xl">계약자적립액</div>
                    <div className="text-lg font-extrabold text-[#e23c3c] md:text-4xl">2.0%</div>
                    <div className="mt-1 text-xs text-gray-500">(연금을 개시하는 경우에 한함)</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center text-xs text-gray-500">
                <p>* 환급률은 트리플 레벨업 보증률 반영한 금액 입니다.</p>
                <p>(부분 보증형에 한함)</p>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-400">
              준법감시인 심의필 제2025-광고-1168호(2025.06.05~2026.06.04)
            </div>
          </div>
          {/* 오른쪽: 보험료 확인 카드 */}
          <div className="flex w-full flex-1 justify-center md:ml-8 md:justify-end md:self-end">
            <div className="relative flex w-full max-w-md flex-col rounded-3xl border-2 border-[#3a8094] bg-white p-8 shadow-xl">
              {/* 새로운 헤더 디자인 */}
              <div className="mb-6">
                <h3 className="flex items-center gap-2 text-2xl font-bold text-[#3a8094]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z"
                    />
                  </svg>
                  보험료 계산하기
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  간단한 정보 입력으로 예상 보험료를 확인하세요
                </p>
              </div>
              <form className="flex flex-col gap-4" onSubmit={handleInsuranceCostCalculate}>
                {/* 가입 정보 입력 */}
                <div className="mb-6 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block cursor-pointer text-sm font-medium text-gray-600">
                        성별
                      </label>
                      <div className="flex gap-6">
                        <label className="flex cursor-pointer items-center gap-2.5">
                          <input
                            type="radio"
                            name="gender"
                            value="M"
                            checked={gender === 'M'}
                            onChange={handleGenderChange}
                            className="h-5 w-5 cursor-pointer text-blue-600"
                          />
                          <span className="text-base">남자</span>
                        </label>
                        <label className="flex cursor-pointer items-center gap-2.5">
                          <input
                            type="radio"
                            name="gender"
                            value="F"
                            checked={gender === 'F'}
                            onChange={handleGenderChange}
                            className="h-5 w-5 cursor-pointer text-blue-600"
                          />
                          <span className="text-base">여자</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block cursor-pointer text-sm font-medium text-gray-600">
                        이름
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="홍길동"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block cursor-pointer text-sm font-medium text-gray-600">
                        생년월일
                      </label>
                      <input
                        type="text"
                        value={birth}
                        onChange={handleBirthChange}
                        className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="19880818"
                        maxLength={8}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block cursor-pointer text-sm font-medium text-gray-600">
                        연락처
                      </label>
                      <input
                        type="text"
                        value={phone}
                        onChange={handlePhoneChange}
                        className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="01012345678"
                      />
                    </div>
                  </div>
                </div>

                {/* 납입 정보 선택 */}
                <div className="mb-6 space-y-4">
                  <div>
                    <label className="mb-1.5 block cursor-pointer text-sm font-medium text-gray-600">
                      납입기간
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['5년', '7년', '10년'].map((period) => (
                        <label
                          key={period}
                          className="relative flex cursor-pointer items-center justify-center"
                        >
                          {/* 추천 배지 */}
                          {period === '5년' && (
                            <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 animate-bounce rounded-full bg-[#ff8c1a] px-2 py-0.5 text-xs font-bold text-white shadow">
                              추천
                            </span>
                          )}
                          <input
                            type="radio"
                            name="paymentPeriod"
                            value={period}
                            checked={paymentPeriod === period}
                            onChange={handlePaymentPeriodChange}
                            className="peer sr-only cursor-pointer"
                          />
                          <div className="w-full cursor-pointer rounded-lg border-2 border-gray-200 px-2 py-2 text-center text-sm transition-all duration-200 ease-in-out hover:border-[#3a8094] hover:bg-gray-50 peer-checked:border-[#3a8094] peer-checked:bg-[#f0f9ff] peer-checked:font-bold peer-checked:text-[#3a8094] peer-checked:shadow-[0_0_10px_rgba(58,128,148,0.1)]">
                            {period}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block cursor-pointer text-sm font-medium text-gray-600">
                      월 납입금액
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['30만원', '50만원', '100만원'].map((amount) => (
                        <label
                          key={amount}
                          className="relative flex cursor-pointer items-center justify-center"
                        >
                          <input
                            type="radio"
                            name="paymentAmount"
                            value={amount}
                            checked={paymentAmount === amount}
                            onChange={handlePaymentAmountChange}
                            className="peer sr-only cursor-pointer"
                          />
                          <div className="w-full cursor-pointer rounded-lg border-2 border-gray-200 px-2 py-2 text-center text-sm transition-all duration-200 ease-in-out hover:border-[#3a8094] hover:bg-gray-50 peer-checked:border-[#3a8094] peer-checked:bg-[#f0f9ff] peer-checked:font-bold peer-checked:text-[#3a8094] peer-checked:shadow-[0_0_10px_rgba(58,128,148,0.1)]">
                            {amount}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 개인정보 동의 */}
                <div className="mb-6 flex items-start justify-end gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="mt-0.5 h-3.5 w-3.5 cursor-pointer rounded border-gray-300 text-blue-600"
                  />
                  <div className="text-xs text-gray-600">
                    <span>개인정보 수집 및 이용에 동의합니다. </span>
                    <button
                      type="button"
                      onClick={onOpenPrivacy}
                      className="cursor-pointer text-blue-600 underline hover:text-blue-800"
                    >
                      자세히 보기
                    </button>
                  </div>
                </div>

                {/* 기존 버튼들 */}
                <div className="flex flex-col gap-2">
                  <button
                    type="submit"
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#3a8094] py-4 text-lg font-bold text-white transition hover:opacity-90"
                  >
                    <CalculatorIcon className="h-6 w-6" />
                    보험료 확인하기
                  </button>
                  <div className="flex flex-row gap-2">
                    <button
                      type="button"
                      onClick={handleOpenConsultModal}
                      className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#fa5a5a] py-4 text-lg font-bold text-white transition hover:opacity-90"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
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
                      href="http://pf.kakao.com/_lrubxb/chat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#fee500] py-4 text-lg font-bold text-[#3d1e1e] transition hover:opacity-90"
                    >
                      <ChatBubbleLeftRightIcon className="h-6 w-6" />
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
              <div className="rounded-lg bg-gray-50 p-2">
                <h3 className="mb-2 flex items-center text-lg font-bold text-gray-900">
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
                <div className="rounded border border-gray-200 bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-gray-600">
                      <span className="mr-1 text-[#3a8094]">▸</span>보험사
                    </span>
                    <span className="font-bold text-[#3a8094]">KB라이프</span>
                  </div>
                </div>
                <div className="rounded border border-gray-200 bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-gray-600">
                      <span className="mr-1 text-[#3a8094]">▸</span>상품명
                    </span>
                    <span className="font-bold text-[#3a8094]">KB트리플레벨업연금보험</span>
                  </div>
                </div>
                <div className="rounded border border-gray-200 bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-gray-600">
                      <span className="mr-1 text-[#3a8094]">▸</span>납입기간 / 월보험료
                    </span>
                    <span className="font-bold text-[#3a8094]">
                      {paymentPeriod && paymentAmount ? `${paymentPeriod} / ${paymentAmount}` : '-'}
                    </span>
                  </div>
                </div>
                {/* 총 납입액 */}
                <div className="rounded border border-gray-200 bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-gray-600">
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
                <div className="rounded border border-gray-200 bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-gray-600">
                      <span className="mr-1 text-[#3a8094]">▸</span>10년 시점 환급률
                    </span>
                    <span className="font-bold">
                      <span className="text-[#7c3aed]">{rate ? Math.round(rate * 100) : '-'}</span>{' '}
                      <span className="text-[#3a8094]">%</span>
                    </span>
                  </div>
                </div>
                {/* 10년 확정이자 */}
                <div className="rounded border border-gray-200 bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-gray-600">
                      <span className="mr-1 text-[#3a8094]">▸</span>10년 확정이자
                    </span>
                    <span className="font-bold">
                      <span className="text-[#3b82f6]">{interestValue}</span>{' '}
                      <span className="text-[#3a8094]">원</span>
                    </span>
                  </div>
                </div>
                <div className="rounded border border-gray-200 bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-gray-600">
                      <span className="mr-1 text-[#3a8094]">▸</span>10년 시점 예상 해약환급금
                    </span>
                    <span className="font-bold">
                      <span className="text-[#ef4444]">{refundValue}</span>{' '}
                      <span className="text-[#3a8094]">원</span>
                    </span>
                  </div>
                </div>
                <div className="mt-4 text-center text-xs text-gray-500">
                  * 실제 보험료 및 해약환급금은 가입시점 및 고객 정보에 따라 달라질 수 있습니다.
                </div>
              </div>
            </>
          )}
          {!isVerified && (
            <>
              {/* 보험료 계산 결과 */}
              <div className="rounded-lg bg-gray-50 p-2">
                <h3 className="mb-2 flex items-center text-lg font-bold text-gray-900">
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
                <div className="rounded border border-gray-200 bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-gray-600">
                      <span className="mr-1 text-[#3a8094]">▸</span>보험사
                    </span>
                    <span className="font-bold text-[#3a8094]">KB라이프</span>
                  </div>
                </div>
                <div className="rounded border border-gray-200 bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-gray-600">
                      <span className="mr-1 text-[#3a8094]">▸</span>상품명
                    </span>
                    <span className="font-bold text-[#3a8094]">KB트리플레벨업연금보험</span>
                  </div>
                </div>
                <div className="rounded border border-gray-200 bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-gray-600">
                      <span className="mr-1 text-[#3a8094]">▸</span>납입기간 / 월보험료
                    </span>
                    <span className="font-bold text-[#3a8094]">
                      {paymentPeriod && paymentAmount ? `${paymentPeriod} / ${paymentAmount}` : '-'}
                    </span>
                  </div>
                </div>
                {/* 총 납입액 */}
                <div className="rounded border border-gray-200 bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-gray-600">
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
                <div className="rounded border border-gray-200 bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-gray-600">
                      <span className="mr-1 text-[#3a8094]">▸</span>10년 시점 환급률
                    </span>
                    <span className="font-bold">
                      <span className="text-[#7c3aed]">?</span>{' '}
                      <span className="text-[#3a8094]">%</span>
                    </span>
                  </div>
                </div>
                {/* 10년 확정이자 */}
                <div className="rounded border border-gray-200 bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-gray-600">
                      <span className="mr-1 text-[#3a8094]">▸</span>10년 확정이자
                    </span>
                    <span className="font-bold">
                      <span className="text-[#3b82f6]">?</span>{' '}
                      <span className="text-[#3a8094]">원</span>
                    </span>
                  </div>
                </div>
                <div className="rounded border border-gray-200 bg-white p-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sm font-medium text-gray-600">
                      <span className="mr-1 text-[#3a8094]">▸</span>10년 시점 예상 해약환급금
                    </span>
                    <span className="font-bold">
                      <span className="text-[#ef4444]">?</span>{' '}
                      <span className="text-[#3a8094]">원</span>
                    </span>
                  </div>
                </div>
                <div className="mt-4 text-center text-xs text-gray-500">
                  * 실제 보험료 및 해약환급금은 가입시점 및 고객 정보에 따라 달라질 수 있습니다.
                  <div className="mt-0.5 text-[#3a8094]">
                    * 휴대폰 인증 완료 후 상세 정보를 확인하실 수 있습니다.
                  </div>
                </div>
              </div>
              {/* 휴대폰 인증 안내 및 인증번호 입력란을 항상 노출 */}
              <div className="mt-0 rounded-lg bg-gray-50 p-2">
                <h3 className="mb-1 text-base font-bold text-gray-900">휴대폰 인증</h3>
                <p className="mb-1 text-sm text-gray-600">
                  정확한 보험료 확인을 위해 휴대폰 인증이 필요합니다.
                </p>
                <div className="mb-1 flex items-center gap-1">
                  <input
                    type="text"
                    value={phone}
                    readOnly
                    className="flex-1 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-base"
                  />
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={!otpResendAvailable}
                    className="min-w-[80px] rounded-md bg-[#3a8094] px-2 py-1 text-sm font-medium text-white transition-colors hover:bg-[#2c6070] disabled:cursor-not-allowed disabled:bg-gray-400"
                  >
                    {otpResendAvailable ? '인증번호 전송' : '재발송'}
                  </button>
                  {!otpResendAvailable && (
                    <div className="flex min-w-[60px] items-center justify-center text-xs font-medium text-[#3a8094]">
                      {formatTime(otpTimer)}
                    </div>
                  )}
                </div>
                <div className="mb-1 flex gap-1">
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
                      setOtpCode(val);
                    }}
                    maxLength={6}
                    className="flex-1 rounded-md border border-gray-300 px-2 py-2 text-sm focus:border-[#3a8094] focus:ring-[#3a8094]"
                    placeholder="6자리 인증번호 입력"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleVerifyOTP}
                  className="mt-1 w-full rounded-md bg-[#3a8094] px-2 py-2.5 text-base font-semibold text-white transition-colors hover:bg-[#2c6070]"
                >
                  인증 및 보험료 계산
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
                <div className="mt-1 text-sm text-gray-600">
                  담당자가 선택하신 상담 시간에 연락드릴 예정입니다.
                </div>
              </div>
            </>
          ) : (
            <div className="mb-1 rounded bg-[#f8f8ff] p-2 text-center text-sm font-semibold text-gray-700">
              상담신청을 위해 아래 정보를 입력해 주세요.
            </div>
          )}
          <div className="mb-0.5 rounded-lg bg-gray-50 p-2.5">
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
              <div className="rounded border border-gray-200 bg-white p-2.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-sm font-medium text-gray-600">
                    <span className="mr-1 text-[#3a8094]">▸</span>이름
                  </span>
                  <span className="text-base font-bold text-[#3a8094]">{name}</span>
                </div>
              </div>
              <div className="rounded border border-gray-200 bg-white p-2.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-sm font-medium text-gray-600">
                    <span className="mr-1 text-[#3a8094]">▸</span>연락처
                  </span>
                  <span className="text-base font-bold text-[#3a8094]">{phone}</span>
                </div>
              </div>
              <div
                className={`relative rounded border border-gray-200 bg-white p-2.5 ${consultIsVerified ? '' : 'cursor-pointer select-none'}`}
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
                  <span className="text-sm font-medium text-gray-600">
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
                  <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded border border-gray-200 bg-white shadow">
                    {consultTypeOptions.map((opt) => (
                      <div
                        key={opt}
                        className={`cursor-pointer px-4 py-2 text-sm hover:bg-blue-50 ${consultType === opt ? 'font-bold text-[#7c3aed]' : 'text-gray-700'}`}
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
                className={`relative rounded border border-gray-200 bg-white p-2.5 ${consultIsVerified ? '' : 'cursor-pointer select-none'}`}
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
                  <span className="text-sm font-medium text-gray-600">
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
                  <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-48 overflow-y-auto overscroll-contain rounded border border-gray-200 bg-white shadow">
                    {consultTimeOptions.map((opt) => (
                      <div
                        key={opt}
                        className={`cursor-pointer px-4 py-2 text-sm hover:bg-blue-50 ${consultTime === opt ? 'font-bold text-[#7c3aed]' : 'text-gray-700'}`}
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
          <div className="mb-1 rounded bg-[#f8f8ff] p-2 text-center text-xs text-gray-600">
            📢 상담 중 궁금한 점은 언제든 말씀해 주세요.
          </div>
          {/* 휴대폰 인증 안내 */}
          {!consultIsVerified && (
            <div className="mt-0 rounded-lg bg-gray-50 p-2">
              <h3 className="mb-1 text-base font-bold text-gray-900">휴대폰 인증</h3>
              <p className="mb-1 text-sm text-gray-600">
                상담신청을 위해 휴대폰 인증이 필요합니다.
              </p>
              <div className="mb-1 flex items-center gap-1">
                <input
                  type="text"
                  value={phone}
                  readOnly
                  className="flex-1 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-base"
                />
                <button
                  type="button"
                  onClick={handleConsultSendOTP}
                  disabled={!consultOtpResendAvailable}
                  className="min-w-[80px] rounded-md bg-[#3a8094] px-2 py-1 text-sm font-medium text-white transition-colors hover:bg-[#2c6070] disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {consultOtpResendAvailable ? '인증번호 전송' : '재발송'}
                </button>
                {!consultOtpResendAvailable && (
                  <div className="flex min-w-[60px] items-center justify-center text-xs font-medium text-[#3a8094]">
                    {formatTime(consultOtpTimer)}
                  </div>
                )}
              </div>
              <div className="mb-1 flex gap-1">
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
                  className="flex-1 rounded-md border border-gray-300 px-2 py-2 text-sm focus:border-[#3a8094] focus:ring-[#3a8094]"
                  placeholder="6자리 인증번호 입력"
                />
              </div>
              <button
                type="button"
                onClick={handleConsultVerifyOTP}
                disabled={verifying || consultOtpResendAvailable}
                className={`mt-1 w-full rounded-md px-2 py-2.5 text-base font-semibold transition-colors ${verifying || consultOtpResendAvailable ? 'cursor-not-allowed bg-gray-300 text-gray-500' : 'bg-[#3a8094] text-white hover:bg-[#2c6070]'}`}
              >
                {verifying
                  ? '인증 처리중...'
                  : consultOtpResendAvailable
                    ? '인증번호를 먼저 전송하세요'
                    : '인증 및 상담신청'}
              </button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
