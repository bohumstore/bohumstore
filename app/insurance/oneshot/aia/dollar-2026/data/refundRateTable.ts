// AIA 달러연금보험 환급률 조견표 (10년 시점 기준)
// 단위: % (예: 156.96 = 156.96%)

export type Gender = 'M' | 'F';

interface RefundRateData {
  [age: number]: {
    M: number;  // 남자 환급률
    F: number;  // 여자 환급률
  };
}

// 일시납 상품이므로 납입기간 구분 없음
export const REFUND_RATE_TABLE: RefundRateData = {
  15: { M: 156.96, F: 156.96 },
  16: { M: 156.96, F: 156.96 },
  17: { M: 156.96, F: 156.96 },
  18: { M: 156.96, F: 156.96 },
  19: { M: 156.96, F: 156.96 },
  20: { M: 156.96, F: 156.96 },
  21: { M: 156.96, F: 156.96 },
  22: { M: 156.96, F: 156.96 },
  23: { M: 156.96, F: 156.96 },
  24: { M: 156.96, F: 156.96 },
  25: { M: 156.96, F: 156.96 },
  26: { M: 156.96, F: 156.96 },
  27: { M: 156.96, F: 156.96 },
  28: { M: 156.96, F: 156.96 },
  29: { M: 156.96, F: 156.96 },
  30: { M: 156.96, F: 156.96 },
  31: { M: 156.96, F: 156.96 },
  32: { M: 156.96, F: 156.96 },
  33: { M: 156.96, F: 156.96 },
  34: { M: 156.96, F: 156.96 },
  35: { M: 156.96, F: 156.96 },
  36: { M: 156.96, F: 156.96 },
  37: { M: 156.96, F: 156.96 },
  38: { M: 156.96, F: 156.96 },
  39: { M: 156.96, F: 156.96 },
  40: { M: 156.96, F: 156.96 },
  41: { M: 156.96, F: 156.96 },
  42: { M: 156.96, F: 156.96 },
  43: { M: 156.96, F: 156.96 },
  44: { M: 156.96, F: 156.96 },
  45: { M: 156.96, F: 156.96 },
  46: { M: 156.96, F: 156.96 },
  47: { M: 156.96, F: 156.96 },
  48: { M: 156.96, F: 156.96 },
  49: { M: 156.96, F: 156.96 },
  50: { M: 156.96, F: 156.96 },
  51: { M: 156.96, F: 156.96 },
  52: { M: 156.96, F: 156.96 },
  53: { M: 156.96, F: 156.96 },
  54: { M: 156.96, F: 156.96 },
  55: { M: 156.96, F: 156.96 },
  56: { M: 156.96, F: 156.96 },
  57: { M: 156.96, F: 156.96 },
  58: { M: 156.96, F: 156.96 },
  59: { M: 156.96, F: 156.96 },
  60: { M: 156.96, F: 156.96 },
  61: { M: 156.96, F: 156.96 },
  62: { M: 156.96, F: 156.96 },
  63: { M: 156.96, F: 156.96 },
  64: { M: 156.96, F: 156.96 },
  65: { M: 156.96, F: 156.96 },
  66: { M: 156.96, F: 156.96 },
  67: { M: 156.96, F: 156.96 },
  68: { M: 156.96, F: 156.96 },
  69: { M: 156.96, F: 156.96 },
  70: { M: 156.96, F: 156.96 },
};

/**
 * 환급률 조회 함수
 * @param age 보험연령
 * @param gender 성별 ('M' | 'F')
 * @returns 환급률 (예: 156.96) 또는 null (해당 데이터 없음)
 */
export function getRefundRate(
  age: number,
  gender: Gender
): number | null {
  const ageData = REFUND_RATE_TABLE[age];
  if (!ageData) return null;
  
  return ageData[gender] ?? null;
}

/**
 * 환급금 계산 함수 (일시납)
 * @param age 보험연령
 * @param gender 성별
 * @param lumpSumPremium 일시납 금액 (달러)
 * @returns { rate: 환급률(%), interest: 이자($), refund: 해약환급금($), total: 일시납금액($) } 또는 null
 */
export function calculateRefund(
  age: number,
  gender: Gender,
  lumpSumPremium: number
): { rate: number; interest: number; refund: number; total: number } | null {
  const rate = getRefundRate(age, gender);
  if (rate === null) return null;
  
  const total = lumpSumPremium;
  const rateDecimal = rate / 100;
  const refund = Math.round(total * rateDecimal * 100) / 100; // 소수점 둘째자리까지
  const interest = Math.round((refund - total) * 100) / 100;
  
  return { rate, interest, refund, total };
}
