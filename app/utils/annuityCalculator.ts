// 연금개시연령 계산 유틸리티

export interface AnnuityCalculationParams {
  customerAge: number;        // 고객 연령 (15~70세)
  paymentPeriod: number;      // 납입기간 (10, 15, 20년)
  monthlyPremium: number;     // 월 보험료 (30만원, 50만원, 100만원)
  gender: 'male' | 'female';  // 성별
}

export interface AnnuityCalculationResult {
  customerAge: number;        // 고객 연령
  paymentPeriod: number;      // 납입기간
  monthlyPremium: number;     // 월 보험료
  gender: 'male' | 'female';  // 성별
  annuityStartAge: number;    // 연금개시연령
  totalPayment: number;       // 총 납입금액
  calculationNote: string;    // 계산 설명
}

/**
 * 연금개시연령을 계산합니다.
 * 연금개시연령은 다음 중 더 늦은 시점입니다:
 * 1. 납입기간 완료 시점 (고객연령 + 납입기간)
 * 2. 최소 연금개시연령 (65세, 70세, 75세, 80세 중 선택)
 */
export function calculateAnnuityStartAge(params: AnnuityCalculationParams): AnnuityCalculationResult {
  const { customerAge, paymentPeriod, monthlyPremium, gender } = params;
  
  // 납입기간 완료 시점
  const paymentCompletionAge = customerAge + paymentPeriod;
  
  // 최소 연금개시연령 결정 (납입기간 완료 시점에 따라)
  let minAnnuityStartAge: number;
  
  if (paymentCompletionAge <= 65) {
    minAnnuityStartAge = 65;
  } else if (paymentCompletionAge <= 70) {
    minAnnuityStartAge = 70;
  } else if (paymentCompletionAge <= 75) {
    minAnnuityStartAge = 75;
  } else {
    minAnnuityStartAge = 80;
  }
  
  // 연금개시연령은 납입기간 완료 시점과 최소 연금개시연령 중 더 늦은 시점
  const annuityStartAge = Math.max(paymentCompletionAge, minAnnuityStartAge);
  
  // 총 납입금액 계산
  const totalPayment = monthlyPremium * 12 * paymentPeriod;
  
  // 계산 설명 생성
  let calculationNote = '';
  if (paymentCompletionAge >= annuityStartAge) {
    calculationNote = `납입기간 완료 시점(${paymentCompletionAge}세)에 연금개시`;
  } else {
    calculationNote = `납입기간 완료 시점(${paymentCompletionAge}세) 이후 ${annuityStartAge}세에 연금개시`;
  }
  
  return {
    customerAge,
    paymentPeriod,
    monthlyPremium,
    gender,
    annuityStartAge,
    totalPayment,
    calculationNote
  };
}

/**
 * 연령별 납입기간별 연금개시연령 예시를 생성합니다.
 */
export function generateAnnuityExamples(): AnnuityCalculationResult[] {
  const examples: AnnuityCalculationResult[] = [];
  
  // 연령별 예시 (15세~70세)
  const ages = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70];
  const paymentPeriods = [10, 15, 20];
  const monthlyPremiums = [300000, 500000, 1000000]; // 30만원, 50만원, 100만원
  const genders: ('male' | 'female')[] = ['male', 'female'];
  
  // 대표적인 예시들만 생성 (너무 많으면 복잡해짐)
  const representativeAges = [25, 35, 45, 55, 65, 70];
  
  for (const age of representativeAges) {
    for (const period of paymentPeriods) {
      for (const premium of monthlyPremiums) {
        for (const gender of genders) {
          // 연금개시연령이 80세를 초과하는 경우는 제외
          const result = calculateAnnuityStartAge({
            customerAge: age,
            paymentPeriod: period,
            monthlyPremium: premium,
            gender
          });
          
          if (result.annuityStartAge <= 80) {
            examples.push(result);
          }
        }
      }
    }
  }
  
  return examples;
}

/**
 * 특정 연령과 납입기간에 대한 연금개시연령을 빠르게 조회합니다.
 */
export function getQuickAnnuityStartAge(customerAge: number, paymentPeriod: number): number {
  const paymentCompletionAge = customerAge + paymentPeriod;
  
  if (paymentCompletionAge <= 65) return 65;
  if (paymentCompletionAge <= 70) return 70;
  if (paymentCompletionAge <= 75) return 75;
  return 80;
}
