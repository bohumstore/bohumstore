'use client';

import { useState, useRef, useCallback } from 'react';

// ── Types ──
export interface InsuranceFormState {
  counselType: number;
  name: string;
  gender: string;
  birth: string;
  phone: string;
  paymentPeriod: string;
  paymentAmount: string;
  isChecked: boolean;
}

export interface InsuranceFormRefs {
  nameInputRef: React.RefObject<HTMLInputElement | null>;
  birthInputRef: React.RefObject<HTMLInputElement | null>;
  phoneInputRef: React.RefObject<HTMLInputElement | null>;
}

export interface InsuranceFormOptions {
  /** 입력 변경 시 추가로 초기화할 콜백 (예: pensionAmounts 초기화) */
  onInputChange?: () => void;
  defaultPaymentPeriod?: string;
  defaultPaymentAmount?: string;
  validateAge?: boolean;
  minAge?: number;
  maxAge?: number;
}

// ── Hook ──
export function useInsuranceForm(options?: InsuranceFormOptions) {
  const {
    onInputChange,
    defaultPaymentPeriod = '',
    defaultPaymentAmount = '',
    validateAge = false,
    minAge = 0,
    maxAge = 100,
  } = options || {};

  // Form state
  const [counselType, setCounselType] = useState(1);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentPeriod, setPaymentPeriod] = useState(defaultPaymentPeriod);
  const [paymentAmount, setPaymentAmount] = useState(defaultPaymentAmount);
  const [isChecked, setIsChecked] = useState(true);

  // Verification
  const [isVerified, setIsVerified] = useState(false);

  // Refs
  const nameInputRef = useRef<HTMLInputElement>(null);
  const birthInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  // ── Input handlers ──
  const handleInputFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const target = e.target;
    if (window.innerWidth < 768 && target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, []);

  const handleGenderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setGender(e.target.value);
      setIsVerified(false);
      onInputChange?.();
      setTimeout(() => nameInputRef.current?.focus(), 0);
    },
    [onInputChange]
  );

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
      setIsVerified(false);
      onInputChange?.();
    },
    [onInputChange]
  );

  const handleBirthChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numbers = value.replace(/[^0-9]/g, '').slice(0, 8);
    setBirth(numbers);
    setIsVerified(false);
    if (numbers.length === 8) {
      setTimeout(() => phoneInputRef.current?.focus(), 0);
    }
  }, []);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numbers = value.replace(/[^0-9]/g, '').slice(0, 11);
    setPhone(numbers);
    setIsVerified(false);
  }, []);

  const handlePaymentPeriodChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setPaymentPeriod(e.target.value);
      setIsVerified(false);
      onInputChange?.();
    },
    [onInputChange]
  );

  const handlePaymentAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setPaymentAmount(e.target.value);
      setIsVerified(false);
      onInputChange?.();
    },
    [onInputChange]
  );

  // ── Validation ──
  const validateForm = useCallback(
    (requirePayment = true) => {
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

      if (requirePayment) {
        if (!paymentPeriod) {
          alert('납입기간을 선택해주세요.');
          return false;
        }
        if (!paymentAmount) {
          alert('월 납입금액을 선택해주세요.');
          return false;
        }
      }
      return true;
    },
    [isChecked, gender, name, birth, phone, paymentPeriod, paymentAmount]
  );

  // ── Insurance age calculation ──
  const getInsuranceAge = useCallback((birthValue: string): number | '' => {
    if (!/^\d{8}$/.test(birthValue)) return '';
    const birthYear = parseInt(birthValue.substring(0, 4));
    const birthMonth = parseInt(birthValue.substring(4, 6));
    const birthDay = parseInt(birthValue.substring(6, 8));
    const today = new Date();
    let age = today.getFullYear() - birthYear;
    if (
      today.getMonth() + 1 < birthMonth ||
      (today.getMonth() + 1 === birthMonth && today.getDate() < birthDay)
    ) {
      age -= 1;
    }
    return age;
  }, []);

  const insuranceAge = getInsuranceAge(birth);
  const isAgeKnown = insuranceAge !== '';
  const numericInsuranceAge = isAgeKnown ? Number(insuranceAge) : NaN;
  const isAgeEligible =
    !validateAge ||
    (isAgeKnown &&
      !isNaN(numericInsuranceAge) &&
      numericInsuranceAge >= minAge &&
      numericInsuranceAge <= maxAge);

  // ── Timer formatting ──
  const formatTime = useCallback((sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }, []);

  return {
    // State
    counselType,
    setCounselType,
    name,
    setName,
    gender,
    setGender,
    birth,
    setBirth,
    phone,
    setPhone,
    paymentPeriod,
    setPaymentPeriod,
    paymentAmount,
    setPaymentAmount,
    isChecked,
    setIsChecked,
    isVerified,
    setIsVerified,

    // Refs
    nameInputRef,
    birthInputRef,
    phoneInputRef,

    // Handlers
    handleInputFocus,
    handleGenderChange,
    handleNameChange,
    handleBirthChange,
    handlePhoneChange,
    handlePaymentPeriodChange,
    handlePaymentAmountChange,

    // Validation
    validateForm,

    // Age
    getInsuranceAge,
    insuranceAge,
    isAgeKnown,
    numericInsuranceAge,
    isAgeEligible,

    // Utility
    formatTime,
  };
}
