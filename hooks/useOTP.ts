'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import request from '@/app/api/request';

// ── Types ──
export interface OTPConfig {
  /** POST /api/postOTP 에 전달할 templateId */
  templateId: string;
  /** POST /api/postOTP 에 전달할 companyName */
  companyName: string;
  /** POST /api/postOTP 에 전달할 productName */
  productName: string;
  /** 현재 입력된 전화번호 */
  phone: string;
}

export interface OTPState {
  otpSent: boolean;
  otpCode: string;
  otpTimer: number;
  otpResendAvailable: boolean;
}

// ── Hook ──
export function useOTP() {
  // 보험료 확인용 OTP
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpResendAvailable, setOtpResendAvailable] = useState(true);

  // 상담 신청용 OTP
  const [consultOtpCode, setConsultOtpCode] = useState('');
  const [consultOtpTimer, setConsultOtpTimer] = useState(180);
  const [consultOtpResendAvailable, setConsultOtpResendAvailable] = useState(true);
  const [consultIsVerified, setConsultIsVerified] = useState(false);

  // 에러 메시지
  const [errorMsg, setErrorMsg] = useState('');

  // verifying (인증 진행 중)
  const [verifying, setVerifying] = useState(false);

  // 모달 표시
  const [showResultModal, setShowResultModal] = useState(false);
  const [showConsultModal, setShowConsultModal] = useState(false);

  // 상담 타입/시간 드롭다운
  const [showConsultTypeDropdown, setShowConsultTypeDropdown] = useState(false);
  const [showConsultTimeDropdown, setShowConsultTimeDropdown] = useState(false);

  // 상담 정보
  const [consultType, setConsultType] = useState('연금보험');
  const [consultTime, setConsultTime] = useState('아무때나');

  // Refs
  const otpInputRef = useRef<HTMLInputElement>(null);
  const consultOtpInputRef = useRef<HTMLInputElement>(null);

  // ── OTP Timer ──
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpTimer > 0) {
      timer = setTimeout(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            setOtpResendAvailable(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [otpTimer]);

  // ── Consult OTP Timer ──
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (consultOtpTimer > 0) {
      timer = setTimeout(() => {
        setConsultOtpTimer((prev) => {
          if (prev <= 1) {
            setConsultOtpResendAvailable(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [consultOtpTimer]);

  // ── OTP 전송 ──
  const handlePostOTP = useCallback(async (config: OTPConfig) => {
    console.log(`[CLIENT] 인증번호 전송 시작: ${new Date().toISOString()}`);
    try {
      await request.post('/api/postOTP', {
        phone: config.phone,
        templateId: config.templateId,
        companyName: config.companyName,
        productName: config.productName,
      });
      console.log(`[CLIENT] 인증번호 전송 성공: ${new Date().toISOString()}`);
      setOtpSent(true);
      alert('인증번호가 전송되었습니다.');
    } catch (e: any) {
      console.error(`[CLIENT] 인증번호 전송 실패:`, e);
      if (e.code === 'ECONNABORTED') {
        alert('인증번호 전송 시간이 초과되었습니다. 다시 시도해주세요.');
      } else if (e.response?.status === 502) {
        alert('알림톡 전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        alert('인증번호 전송에 실패했습니다.');
      }
    }
  }, []);

  // ── 인증번호 전송 (보험료 확인용) ──
  const handleSendOTP = useCallback(
    async (config: OTPConfig) => {
      setOtpTimer(180);
      setOtpResendAvailable(false);
      await handlePostOTP(config);
      setTimeout(() => {
        otpInputRef.current?.focus();
        otpInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    },
    [handlePostOTP]
  );

  // ── 인증번호 전송 (상담 신청용) ──
  const handleConsultSendOTP = useCallback(
    async (config: OTPConfig) => {
      setConsultOtpTimer(180);
      setConsultOtpResendAvailable(false);
      await handlePostOTP(config);
      setTimeout(() => {
        consultOtpInputRef.current?.focus();
        consultOtpInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    },
    [handlePostOTP]
  );

  // ── 6자리 확인만 (인증 완료 처리는 product-specific) ──
  const handleVerifyAndShowInfo = useCallback(() => {
    if (otpCode.length !== 6) {
      alert('6자리 인증번호를 입력해주세요.');
      return false;
    }
    return true;
  }, [otpCode]);

  // ── 결과 모달 닫기 ──
  const handleCloseModal = useCallback(() => {
    setShowResultModal(false);
    setOtpTimer(0);
    setOtpResendAvailable(true);
  }, []);

  // ── 상담 모달 열기 ──
  const handleOpenConsultModal = useCallback(() => {
    setConsultIsVerified(false);
    setConsultOtpCode('');
    setConsultOtpTimer(0);
    setConsultOtpResendAvailable(true);
    setShowConsultModal(true);
  }, []);

  // ── 상담 모달 닫기 ──
  const handleCloseConsultModal = useCallback(() => {
    setConsultIsVerified(false);
    setShowConsultModal(false);
    setConsultOtpTimer(0);
    setConsultOtpResendAvailable(true);
  }, []);

  return {
    // OTP state (보험료 확인용)
    otpSent,
    setOtpSent,
    otpCode,
    setOtpCode,
    otpTimer,
    setOtpTimer,
    otpResendAvailable,
    setOtpResendAvailable,

    // OTP state (상담 신청용)
    consultOtpCode,
    setConsultOtpCode,
    consultOtpTimer,
    setConsultOtpTimer,
    consultOtpResendAvailable,
    setConsultOtpResendAvailable,
    consultIsVerified,
    setConsultIsVerified,

    // Error & verifying
    errorMsg,
    setErrorMsg,
    verifying,
    setVerifying,

    // Modal state
    showResultModal,
    setShowResultModal,
    showConsultModal,
    setShowConsultModal,
    showConsultTypeDropdown,
    setShowConsultTypeDropdown,
    showConsultTimeDropdown,
    setShowConsultTimeDropdown,
    consultType,
    setConsultType,
    consultTime,
    setConsultTime,

    // Refs
    otpInputRef,
    consultOtpInputRef,

    // Handler functions
    handlePostOTP,
    handleSendOTP,
    handleConsultSendOTP,
    handleVerifyAndShowInfo,
    handleCloseModal,
    handleOpenConsultModal,
    handleCloseConsultModal,
  };
}
