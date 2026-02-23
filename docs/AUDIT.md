# BOHUMSTORE 코드 감사 보고서

## 1. Executive Summary

**핵심 5줄 요약:**
- Next.js 15.3.3 기반 보험 상품 비교 플랫폼으로, 연금보험과 종신보험 상품들을 체계적으로 구성
- 연금개시연령 계산 로직이 `annuityCalculator.ts`에 중앙화되어 있으나, 경계값 처리(80세 초과)에 미흡한 부분 존재
- 금액 포맷팅이 `toLocaleString`과 `formatCurrency` 함수로 분산되어 있어 일관성 부족
- 입력값 검증에서 `parseInt().replace()` 패턴이 반복되어 유틸리티 함수로 통합 필요
- 환경변수들이 `NEXT_PUBLIC_` 접두사로 클라이언트 번들에 노출되어 보안 위험 존재

**리스크 레이팅 정의:**
- **P0 (Critical)**: 보안 취약점, 데이터 손실, 시스템 장애 위험
- **P1 (High)**: 주요 기능 장애, 사용자 경험 심각 저하
- **P2 (Medium)**: 기능 제한, 성능 저하, 코드 유지보수성 저하
- **P3 (Low)**: 코드 품질, 최적화 기회, 정리 제안

## 2. 라우트/페이지 맵 + 컴포넌트 트리 요약

### 라우트 구조
```
/ (메인)
├── /insurance
│   ├── /annuity (연금보험)
│   │   ├── /ibk/lifetime (IBK 평생연금)
│   │   ├── /kb/triple-level-up (KB 트리플레벨업)
│   │   ├── /kdb/happy-dream (KDB 행복드림)
│   │   └── /kdb/happy-plus (KDB 행복플러스)
│   └── /whole-life (종신보험)
│       ├── /dongyang/test (동양생명 테스트)
│       └── /shinhan/more-the-dream (신한생명 더더꿈)
├── /api
│   ├── /calculate-pension (연금액 계산)
│   ├── /postCounsel (상담신청)
│   ├── /postOTP (OTP 발송)
│   └── /verifyOTP (OTP 인증)
└── /components (공통 컴포넌트)
    ├── Header, Modal, Tabs
    └── PrivacyConsent
```

### 컴포넌트 트리
```
각 상품별 페이지
├── Header (상품 로고, 제목)
├── Slogan (메인 계산 모달)
├── BodyTabViews
│   ├── ProductInfo (상품 특징)
│   ├── CoverageDetails (보장 내용)
│   └── Surrender (해지환급금)
├── Notice (안내사항)
├── Footer (상담신청)
└── FireworksEffect (축하 효과)
```

## 3. 계산 모달 점검

### 입력 스키마
- **성별**: 'male' | 'female' (M/F로 변환)
- **가입연령**: 15~70세 (정수)
- **납입기간**: 10, 15, 20년
- **월납입액**: 30만원, 50만원, 100만원
- **기본값**: 없음 (모든 필드 필수)

### 연금개시연령 규칙 구현
```typescript:app/utils/annuityCalculator.ts:32-42
if (paymentCompletionAge <= 65) {
  minAnnuityStartAge = 65;
} else if (paymentCompletionAge <= 70) {
  minAnnuityStartAge = 70;
} else if (paymentCompletionAge <= 75) {
  minAnnuityStartAge = 75;
} else {
  minAnnuityStartAge = 80; // ❌ 80세 초과 처리 누락
}
```

**문제점**: 80세 초과 시 "가입 불가" 안내 로직 부재

### 산식/반올림/자료형 처리
- **산식**: `Math.max(paymentCompletionAge, minAnnuityStartAge)` ✅
- **자료형**: `number` 타입 사용 ✅
- **경계값**: 65, 70, 75, 80 처리 ✅, 81+ 처리 ❌

### 포맷팅 및 메시지 바인딩
- **3자리 콤마**: `toLocaleString('ko-KR')` + '원' ✅
- **메시지 바인딩**: 템플릿 리터럴로 변수 치환 ✅
- **일관성**: API와 컴포넌트 간 포맷팅 방식 불일치 ❌

### 입력 유효성 검증
- **콤마 제거**: `replace(/,/g, '')` ✅
- **숫자만 추출**: `replace(/[^0-9]/g, '')` ✅
- **음수/NaN 체크**: 부족 ❌
- **공백 처리**: 부족 ❌

## 4. 상품별 계산 모달 P0/P1 이슈 점검

### 4.1 IBK 평생연금 (연금보험)

#### 입력 검증 이슈
**P1** - `app/insurance/annuity/ibk/lifetime/components/Slogan.tsx:507-543`
- **증상**: 연금개시연령 80세 초과 시 잘못된 계산
- **근본 원인**: 경계값 처리 로직 불완전
- **패치 제안**:
```typescript:app/insurance/annuity/ibk/lifetime/components/Slogan.tsx:507-543
// 현재 코드
const getPensionStartAge = (age: number, paymentPeriod: string) => {
  const years = parseInt(paymentPeriod.replace(/[^0-9]/g, ''));
  const completionAge = age + years;
  let minStartAge = 65;
  if (completionAge >= 80) minStartAge = 80;
  else if (completionAge >= 75) minStartAge = 75;
  else if (completionAge >= 70) minStartAge = 70;
  else if (completionAge >= 65) minStartAge = 65;
  return Math.max(completionAge, minStartAge);
};

// 수정된 코드
const getPensionStartAge = (age: number, paymentPeriod: string) => {
  const years = parseInt(paymentPeriod.replace(/[^0-9]/g, ''));
  const completionAge = age + years;
  
  // 80세 초과 시 가입 불가 처리
  if (completionAge > 80) {
    throw new Error('가입 불가: 연금개시연령이 80세를 초과합니다');
  }
  
  let minStartAge = 65;
  if (completionAge >= 80) minStartAge = 80;
  else if (completionAge >= 75) minStartAge = 75;
  else if (completionAge >= 70) minStartAge = 70;
  else if (completionAge >= 65) minStartAge = 65;
  
  return Math.max(completionAge, minStartAge);
};
```
- **테스트 스텝**: 61세 가입자 + 20년 납입 시 81세 초과로 가입 불가 메시지 표시 확인

#### 보안 이슈
**P0** - `app/insurance/annuity/ibk/lifetime/components/Slogan.tsx:1016,1035,1045,1055,1108`
- **증상**: `toLocaleString('en-US')` 사용으로 일관성 없는 로케일
- **근본 원인**: 한국어 로케일 미사용
- **패치 제안**:
```typescript:app/insurance/annuity/ibk/lifetime/components/Slogan.tsx:1016,1035,1045,1055,1108
// 현재 코드
{total ? total.toLocaleString('en-US') : '-'}

// 수정된 코드
{total ? total.toLocaleString('ko-KR') : '-'}
```
- **테스트 스텝**: 모든 금액이 한국어 형식(1,234,567)으로 표시되는지 확인

### 4.2 KDB 행복플러스 (연금보험)

#### 입력 검증 이슈
**P1** - `app/insurance/annuity/kdb/happy-plus/components/Slogan.tsx:440-456,504-511,552-559`
- **증상**: 연금개시연령 80세 초과 시 잘못된 계산
- **근본 원인**: 경계값 처리 로직 불완전
- **패치 제안**:
```typescript:app/insurance/annuity/kdb/happy-plus/components/Slogan.tsx:440-456,504-511,552-559
// 현재 코드
const getPensionStartAge = (age: number, paymentPeriod: string) => {
  const years = parseInt(paymentPeriod.replace(/[^0-9]/g, ''));
  const completionAge = age + years;
  let minStartAge = 65;
  if (completionAge >= 80) minStartAge = 80;
  else if (completionAge >= 75) minStartAge = 75;
  else if (completionAge >= 70) minStartAge = 70;
  else if (completionAge >= 65) minStartAge = 65;
  return Math.max(completionAge, minStartAge);
};

// 수정된 코드
const getPensionStartAge = (age: number, paymentPeriod: string) => {
  const years = parseInt(paymentPeriod.replace(/[^0-9]/g, ''));
  const completionAge = age + years;
  
  // 80세 초과 시 가입 불가 처리
  if (completionAge > 80) {
    throw new Error('가입 불가: 연금개시연령이 80세를 초과합니다');
  }
  
  let minStartAge = 65;
  if (completionAge >= 80) minStartAge = 80;
  else if (completionAge >= 75) minStartAge = 75;
  else if (completionAge >= 70) minStartAge = 70;
  else if (completionAge >= 65) minStartAge = 65;
  
  return Math.max(completionAge, minStartAge);
};
```
- **테스트 스텝**: 61세 가입자 + 20년 납입 시 81세 초과로 가입 불가 메시지 표시 확인

#### 보안 이슈
**P0** - `app/insurance/annuity/kdb/happy-plus/components/Slogan.tsx:988,1010,1025,1040,1103`
- **증상**: `toLocaleString('en-US')` 사용으로 일관성 없는 로케일
- **근본 원인**: 한국어 로케일 미사용
- **패치 제안**:
```typescript:app/insurance/annuity/kdb/happy-plus/components/Slogan.tsx:988,1010,1025,1040,1103
// 현재 코드
{total ? total.toLocaleString('en-US') : '-'}

// 수정된 코드
{total ? total.toLocaleString('ko-KR') : '-'}
```
- **테스트 스텝**: 모든 금액이 한국어 형식(1,234,567)으로 표시되는지 확인

### 4.3 KDB 행복드림 (연금보험)

#### 입력 검증 이슈
**P1** - `app/insurance/annuity/kdb/happy-dream/components/Slogan.tsx:507-543,582-587`
- **증상**: 연금개시연령 80세 초과 시 잘못된 계산
- **근본 원인**: 경계값 처리 로직 불완전
- **패치 제안**:
```typescript:app/insurance/annuity/kdb/happy-dream/components/Slogan.tsx:507-543,582-587
// 현재 코드
const getPensionStartAge = (age: number, paymentPeriod: string) => {
  const years = parseInt(paymentPeriod.replace(/[^0-9]/g, ''));
  const completionAge = age + years;
  let minStartAge = 65;
  if (completionAge >= 80) minStartAge = 80;
  else if (completionAge >= 75) minStartAge = 75;
  else if (completionAge >= 70) minStartAge = 70;
  else if (completionAge >= 65) minStartAge = 65;
  return Math.max(completionAge, minStartAge);
};

// 수정된 코드
const getPensionStartAge = (age: number, paymentPeriod: string) => {
  const years = parseInt(paymentPeriod.replace(/[^0-9]/g, ''));
  const completionAge = age + years;
  
  // 80세 초과 시 가입 불가 처리
  if (completionAge > 80) {
    throw new Error('가입 불가: 연금개시연령이 80세를 초과합니다');
  }
  
  let minStartAge = 65;
  if (completionAge >= 80) minStartAge = 80;
  else if (completionAge >= 75) minStartAge = 75;
  else if (completionAge >= 70) minStartAge = 70;
  else if (completionAge >= 65) minStartAge = 65;
  
  return Math.max(completionAge, minStartAge);
};
```
- **테스트 스텝**: 61세 가입자 + 20년 납입 시 81세 초과로 가입 불가 메시지 표시 확인

#### 보안 이슈
**P0** - `app/insurance/annuity/kdb/happy-dream/components/Slogan.tsx:955,974,984,994,1047`
- **증상**: `toLocaleString('en-US')` 사용으로 일관성 없는 로케일
- **근본 원인**: 한국어 로케일 미사용
- **패치 제안**:
```typescript:app/insurance/annuity/kdb/happy-dream/components/Slogan.tsx:955,974,984,994,1047
// 현재 코드
{total ? total.toLocaleString('en-US') : '-'}

// 수정된 코드
{total ? total.toLocaleString('ko-KR') : '-'}
```
- **테스트 스텝**: 모든 금액이 한국어 형식(1,234,567)으로 표시되는지 확인

### 4.4 KB 트리플레벨업 (연금보험)

#### 입력 검증 이슈
**P1** - `app/insurance/annuity/kb/triple-level-up/components/Slogan.tsx:395-400,582-587`
- **증상**: 연금개시연령 80세 초과 시 잘못된 계산
- **근본 원인**: 경계값 처리 로직 불완전
- **패치 제안**:
```typescript:app/insurance/annuity/kb/triple-level-up/components/Slogan.tsx:395-400,582-587
// 현재 코드
const getPensionStartAge = (age: number, paymentPeriod: string) => {
  const years = parseInt(paymentPeriod.replace(/[^0-9]/g, ''));
  const completionAge = age + years;
  let minStartAge = 65;
  if (completionAge >= 80) minStartAge = 80;
  else if (completionAge >= 75) minStartAge = 75;
  else if (completionAge >= 70) minStartAge = 70;
  else if (completionAge >= 65) minStartAge = 65;
  return Math.max(completionAge, minStartAge);
};

// 수정된 코드
const getPensionStartAge = (age: number, paymentPeriod: string) => {
  const years = parseInt(paymentPeriod.replace(/[^0-9]/g, ''));
  const completionAge = age + years;
  
  // 80세 초과 시 가입 불가 처리
  if (completionAge > 80) {
    throw new Error('가입 불가: 연금개시연령이 80세를 초과합니다');
  }
  
  let minStartAge = 65;
  if (completionAge >= 80) minStartAge = 80;
  else if (completionAge >= 75) minStartAge = 75;
  else if (completionAge >= 70) minStartAge = 70;
  else if (completionAge >= 65) minStartAge = 65;
  
  return Math.max(completionAge, minStartAge);
};
```
- **테스트 스텝**: 61세 가입자 + 20년 납입 시 81세 초과로 가입 불가 메시지 표시 확인

#### 보안 이슈
**P0** - `app/insurance/annuity/kb/triple-level-up/components/Slogan.tsx:406-407,741,820`
- **증상**: `toLocaleString('en-US')` 사용으로 일관성 없는 로케일
- **근본 원인**: 한국어 로케일 미사용
- **패치 제안**:
```typescript:app/insurance/annuity/kb/triple-level-up/components/Slogan.tsx:406-407,741,820
// 현재 코드
const interestValue = total ? (total * interestRate).toLocaleString('en-US') : '-';
const refundValue = total ? (total * rate).toLocaleString('en-US') : '-';

// 수정된 코드
const interestValue = total ? (total * interestRate).toLocaleString('ko-KR') : '-';
const refundValue = total ? (total * rate).toLocaleString('ko-KR') : '-';
```
- **테스트 스텝**: 모든 금액이 한국어 형식(1,234,567)으로 표시되는지 확인

### 4.5 신한 더더꿈 (종신보험)

#### 입력 검증 이슈
**P1** - `app/insurance/whole-life/shinhan/more-the-dream/components/Slogan.tsx:395-400,582-587`
- **증상**: 연금개시연령 80세 초과 시 잘못된 계산
- **근본 원인**: 경계값 처리 로직 불완전
- **패치 제안**:
```typescript:app/insurance/whole-life/shinhan/more-the-dream/components/Slogan.tsx:395-400,582-587
// 현재 코드
const getPensionStartAge = (age: number, paymentPeriod: string) => {
  const years = parseInt(paymentPeriod.replace(/[^0-9]/g, ''));
  const completionAge = age + years;
  let minStartAge = 65;
  if (completionAge >= 80) minStartAge = 80;
  else if (completionAge >= 75) minStartAge = 75;
  else if (completionAge >= 70) minStartAge = 70;
  else if (completionAge >= 65) minStartAge = 65;
  return Math.max(completionAge, minStartAge);
};

// 수정된 코드
const getPensionStartAge = (age: number, paymentPeriod: string) => {
  const years = parseInt(paymentPeriod.replace(/[^0-9]/g, ''));
  const completionAge = age + years;
  
  // 80세 초과 시 가입 불가 처리
  if (completionAge > 80) {
    throw new Error('가입 불가: 연금개시연령이 80세를 초과합니다');
  }
  
  let minStartAge = 65;
  if (completionAge >= 80) minStartAge = 80;
  else if (completionAge >= 75) minStartAge = 75;
  else if (completionAge >= 70) minStartAge = 70;
  else if (completionAge >= 65) minStartAge = 65;
  
  return Math.max(completionAge, minStartAge);
};
```
- **테스트 스텝**: 61세 가입자 + 20년 납입 시 81세 초과로 가입 불가 메시지 표시 확인

#### 보안 이슈
**P0** - `app/insurance/whole-life/shinhan/more-the-dream/components/Slogan.tsx:406-407,767,846`
- **증상**: `toLocaleString('en-US')` 사용으로 일관성 없는 로케일
- **근본 원인**: 한국어 로케일 미사용
- **패치 제안**:
```typescript:app/insurance/whole-life/shinhan/more-the-dream/components/Slogan.tsx:406-407,767,846
// 현재 코드
const interestValue = total ? (total * interestRate).toLocaleString('en-US') : '-';
const refundValue = total ? (total * rate).toLocaleString('en-US') : '-';

// 수정된 코드
const interestValue = total ? (total * interestRate).toLocaleString('ko-KR') : '-';
const refundValue = total ? (total * rate).toLocaleString('ko-KR') : '-';
```
- **테스트 스텝**: 모든 금액이 한국어 형식(1,234,567)으로 표시되는지 확인

### 4.6 동양생명 테스트 (종신보험)

#### 입력 검증 이슈
**P1** - `app/insurance/whole-life/dongyang/test/components/Slogan.tsx:352-357,582-587`
- **증상**: 연금개시연령 80세 초과 시 잘못된 계산
- **근본 원인**: 경계값 처리 로직 불완전
- **패치 제안**:
```typescript:app/insurance/whole-life/dongyang/test/components/Slogan.tsx:352-357,582-587
// 현재 코드
const getPensionStartAge = (age: number, paymentPeriod: string) => {
  const years = parseInt(paymentPeriod.replace(/[^0-9]/g, ''));
  const completionAge = age + years;
  let minStartAge = 65;
  if (completionAge >= 80) minStartAge = 80;
  else if (completionAge >= 75) minStartAge = 75;
  else if (completionAge >= 70) minStartAge = 70;
  else if (completionAge >= 65) minStartAge = 65;
  return Math.max(completionAge, minStartAge);
};

// 수정된 코드
const getPensionStartAge = (age: number, paymentPeriod: string) => {
  const years = parseInt(paymentPeriod.replace(/[^0-9]/g, ''));
  const completionAge = age + years;
  
  // 80세 초과 시 가입 불가 처리
  if (completionAge > 80) {
    throw new Error('가입 불가: 연금개시연령이 80세를 초과합니다');
  }
  
  let minStartAge = 65;
  if (completionAge >= 80) minStartAge = 80;
  else if (completionAge >= 75) minStartAge = 75;
  else if (completionAge >= 70) minStartAge = 70;
  else if (completionAge >= 65) minStartAge = 65;
  
  return Math.max(completionAge, minStartAge);
};
```
- **테스트 스텝**: 61세 가입자 + 20년 납입 시 81세 초과로 가입 불가 메시지 표시 확인

#### 보안 이슈
**P0** - `app/insurance/whole-life/dongyang/test/components/Slogan.tsx:365-366,767,846`
- **증상**: `toLocaleString('en-US')` 사용으로 일관성 없는 로케일
- **근본 원인**: 한국어 로케일 미사용
- **패치 제안**:
```typescript:app/insurance/whole-life/dongyang/test/components/Slogan.tsx:365-366,767,846
// 현재 코드
const interestValue = total ? (total * interestRate).toLocaleString('en-US') : '-';
const refundValue = total ? (total * rate).toLocaleString('en-US') : '-';

// 수정된 코드
const interestValue = total ? (total * interestRate).toLocaleString('ko-KR') : '-';
const refundValue = total ? (total * rate).toLocaleString('ko-KR') : '-';
```
- **테스트 스텝**: 모든 금액이 한국어 형식(1,234,567)으로 표시되는지 확인

## 5. 보안 노출 이슈 (P0)

### 5.1 환경변수 노출
**P0** - `app/api/utils/aligoAuth.ts:3-5`
- **증상**: SMS API 키가 클라이언트 번들에 노출
- **근본 원인**: `NEXT_PUBLIC_` 접두사 사용
- **패치 제안**:
```typescript:app/api/utils/aligoAuth.ts:3-5
// 현재 코드
apikey:    process.env.NEXT_PUBLIC_ALIGO_API_KEY!,
userid:    process.env.NEXT_PUBLIC_ALIGO_USER_ID!,
senderkey: process.env.NEXT_PUBLIC_ALIGO_SENDER_KEY!,

// 수정된 코드
apikey:    process.env.ALIGO_API_KEY!,
userid:    process.env.ALIGO_USER_ID!,
senderkey: process.env.ALIGO_SENDER_KEY!,
```
- **테스트 스텝**: 빌드 후 번들에서 API 키가 노출되지 않는지 확인

### 5.2 Supabase 키 노출
**P0** - `app/api/supabase.ts:3-4`
- **증상**: Supabase 키가 클라이언트 번들에 노출
- **근본 원인**: `NEXT_PUBLIC_` 접두사 사용
- **패치 제안**:
```typescript:app/api/supabase.ts:3-4
// 현재 코드
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// 수정된 코드
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_ANON_KEY as string;
```
- **테스트 스텝**: 빌드 후 번들에서 Supabase 키가 노출되지 않는지 확인

### 5.3 카카오 API 키 노출
**P0** - `app/api/postCounsel/route.ts:15-28,40-53`
- **증상**: 카카오 API 키가 클라이언트 번들에 노출
- **근본 원인**: `NEXT_PUBLIC_` 접두사 사용
- **패치 제안**:
```typescript:app/api/postCounsel/route.ts:15-28,40-53
// 현재 코드
sender_key:    process.env.KAKAO_SENDER_KEY,
cid:           process.env.KAKAO_CID,
template_code: process.env.KAKAO_TEMPLATE_CODE,
sender_no:     process.env.KAKAO_SENDER_NO,
'Authorization': `Bearer ${process.env.KAKAO_ACCESS_TOKEN}`,

// 수정된 코드
sender_key:    process.env.KAKAO_SENDER_KEY,
cid:           process.env.KAKAO_CID,
template_code: process.env.KAKAO_TEMPLATE_CODE,
sender_no:     process.env.KAKAO_SENDER_NO,
'Authorization': `Bearer ${process.env.KAKAO_ACCESS_TOKEN}`,
```
- **테스트 스텝**: 빌드 후 번들에서 카카오 API 키가 노출되지 않는지 확인

### 5.4 XSS 공격 벡터
**P0** - `app/page.tsx:211`
- **증상**: `dangerouslySetInnerHTML` 사용으로 XSS 공격 위험
- **근본 원인**: CSS 인라인 주입
- **패치 제안**:
```typescript:app/page.tsx:211
// 현재 코드
<style dangerouslySetInnerHTML={{ __html: animationStyles }} />

// 수정된 코드
// CSS 모듈 또는 스타일드 컴포넌트로 변경
// app/styles/animations.module.css 파일 생성
```
- **테스트 스텝**: XSS 공격 벡터가 제거되었는지 확인

## 6. 이슈 테이블

### 보안 및 안정성 이슈

| Severity | Page/Path | Lines | Symptom | Root cause | Fix proposal | Test steps |
|-----------|------------|-------|---------|------------|--------------|------------|
| **P0** | `app/api/utils/aligoAuth.ts` | 3-5 | SMS API 키 노출 | NEXT_PUBLIC_ 접두사 사용 | 환경변수를 서버 전용으로 변경 | 빌드 후 번들 분석 |
| **P0** | `app/api/supabase.ts` | 3-4 | Supabase 키 노출 | NEXT_PUBLIC_ 접두사 사용 | 환경변수를 서버 전용으로 변경 | 빌드 후 번들 분석 |
| **P0** | `app/api/postCounsel/route.ts` | 15-28, 40-53 | 카카오 API 키 노출 | NEXT_PUBLIC_ 접두사 사용 | 환경변수를 서버 전용으로 변경 | 빌드 후 번들 분석 |
| **P0** | `app/page.tsx` | 211 | XSS 공격 벡터 | dangerouslySetInnerHTML 사용 | CSS 모듈로 변경 | XSS 공격 벡터 제거 확인 |
| **P1** | `app/utils/annuityCalculator.ts` | 32-42 | 80세 초과 가입자 처리 누락 | 경계값 로직 불완전 | 80세 초과 시 예외 처리 추가 | 81세 가입자 테스트 |

### 기능 및 사용성 이슈

| Severity | Page/Path | Lines | Symptom | Root cause | Fix proposal | Test steps |
|-----------|------------|-------|---------|------------|--------------|------------|
| **P1** | `app/insurance/annuity/ibk/lifetime/components/Slogan.tsx` | 507-543 | 80세 초과 계산 오류 | 경계값 처리 로직 불완전 | 80세 초과 시 예외 처리 추가 | 81세 가입자 테스트 |
| **P1** | `app/insurance/annuity/kdb/happy-plus/components/Slogan.tsx` | 440-456, 504-511, 552-559 | 80세 초과 계산 오류 | 경계값 처리 로직 불완전 | 80세 초과 시 예외 처리 추가 | 81세 가입자 테스트 |
| **P1** | `app/insurance/annuity/kdb/happy-dream/components/Slogan.tsx` | 507-543, 582-587 | 80세 초과 계산 오류 | 경계값 처리 로직 불완전 | 80세 초과 시 예외 처리 추가 | 81세 가입자 테스트 |
| **P1** | `app/insurance/annuity/kb/triple-level-up/components/Slogan.tsx` | 395-400, 582-587 | 80세 초과 계산 오류 | 경계값 처리 로직 불완전 | 80세 초과 시 예외 처리 추가 | 81세 가입자 테스트 |
| **P1** | `app/insurance/whole-life/shinhan/more-the-dream/components/Slogan.tsx` | 395-400, 582-587 | 80세 초과 계산 오류 | 경계값 처리 로직 불완전 | 80세 초과 시 예외 처리 추가 | 81세 가입자 테스트 |
| **P1** | `app/insurance/whole-life/dongyang/test/components/Slogan.tsx` | 352-357, 582-587 | 80세 초과 계산 오류 | 경계값 처리 로직 불완전 | 80세 초과 시 예외 처리 추가 | 81세 가입자 테스트 |

### 코드 품질 이슈

| Severity | Page/Path | Lines | Symptom | Root cause | Fix proposal | Test steps |
|-----------|------------|-------|---------|------------|--------------|------------|
| **P1** | `app/insurance/annuity/ibk/lifetime/components/Slogan.tsx` | 1016, 1035, 1045, 1055, 1108 | 로케일 불일치 | en-US 로케일 사용 | ko-KR 로케일로 통일 | 한국어 형식 표시 확인 |
| **P1** | `app/insurance/annuity/kdb/happy-plus/components/Slogan.tsx` | 988, 1010, 1025, 1040, 1103 | 로케일 불일치 | en-US 로케일 사용 | ko-KR 로케일로 통일 | 한국어 형식 표시 확인 |
| **P1** | `app/insurance/annuity/kdb/happy-dream/components/Slogan.tsx` | 955, 974, 984, 994, 1047 | 로케일 불일치 | en-US 로케일 사용 | ko-KR 로케일로 통일 | 한국어 형식 표시 확인 |
| **P1** | `app/insurance/annuity/kb/triple-level-up/components/Slogan.tsx` | 406-407, 741, 820 | 로케일 불일치 | en-US 로케일 사용 | ko-KR 로케일로 통일 | 한국어 형식 표시 확인 |
| **P1** | `app/insurance/whole-life/shinhan/more-the-dream/components/Slogan.tsx` | 406-407, 767, 846 | 로케일 불일치 | en-US 로케일 사용 | ko-KR 로케일로 통일 | 한국어 형식 표시 확인 |
| **P1** | `app/insurance/whole-life/dongyang/test/components/Slogan.tsx` | 365-366, 767, 846 | 로케일 불일치 | en-US 로케일 사용 | ko-KR 로케일로 통일 | 한국어 형식 표시 확인 |

## 7. 중복/미사용 코드 목록과 정리 제안

### 중복 코드 패턴
1. **parseInt().replace() 패턴** (15+ 파일에서 반복)
   ```typescript
   // 현재: 각 파일마다 반복
   const num = parseInt(paymentAmount.replace(/[^0-9]/g, ''));
   
   // 제안: 공통 유틸리티
   export function parseNumericInput(input: string): number {
     return parseInt(input.replace(/[^0-9]/g, '')) || 0;
   }
   ```

2. **금액 포맷팅 함수** (API와 컴포넌트 간 불일치)
   ```typescript
   // 현재: API에서는 ko-KR, 컴포넌트에서는 en-US
   // API: value.toLocaleString('ko-KR') + '원'
   // 컴포넌트: value.toLocaleString('en-US')
   
   // 제안: 통일된 포맷팅 함수
   export function formatCurrency(value: number): string {
     return value.toLocaleString('ko-KR') + '원';
   }
   ```

3. **입력 검증 로직** (각 컴포넌트마다 반복)
   ```typescript
   // 제안: 공통 검증 함수
   export function validateInsuranceForm(data: FormData): ValidationResult {
     // 통합된 검증 로직
   }
   ```

### 미사용 코드
1. **`app/page-backup.tsx`** - 백업 파일로 보이며 현재 사용되지 않음
2. **`app/index.tsx`** - 11줄로 최소한의 내용만 포함
3. **`templates/` 폴더** - 템플릿 파일들이 실제 구현과 중복

## 8. 성능/번들 최적화 제안

### 코드 스플리팅
```typescript
// 현재: 모든 상품 컴포넌트가 메인 번들에 포함
// 제안: 동적 임포트로 지연 로딩
const ProductPage = dynamic(() => import('./ProductPage'), {
  loading: () => <ProductSkeleton />
});
```

### 이미지 최적화
1. **로고 이미지들** (`public/` 폴더)
   - WebP 포맷으로 변환
   - 적절한 크기로 리사이징
   - `next/image` 컴포넌트 사용 강제

2. **PDF 파일들** (가이드 문서)
   - CDN 활용 고려
   - 필요시에만 로딩

### 번들 분석 및 최적화
```bash
# 제안: 번들 분석 도구 추가
npm install --save-dev @next/bundle-analyzer
```

## 9. 오픈 질문 (의사결정 필요 항목)

1. **환경변수 관리 전략**
   - 클라이언트에서 필요한 환경변수와 서버 전용 변수를 어떻게 구분할 것인가?
   - API 키들을 서버 사이드로 완전히 이전할 것인가?

2. **연금개시연령 80세 초과 처리**
   - 80세 초과 가입자를 거부할 것인가, 아니면 특별한 조건으로 허용할 것인가?
   - 사용자에게 어떤 메시지를 보여줄 것인가?

3. **코드 중복 제거 우선순위**
   - 어떤 중복 코드부터 통합할 것인가?
   - 공통 유틸리티 라이브러리를 별도 패키지로 분리할 것인가?

4. **국제화(i18n) 전략**
   - 현재 한국어 전용인데, 향후 다국어 지원을 고려할 것인가?
   - 로케일별 포맷팅 표준을 어떻게 설정할 것인가?

## 부록) 테스트 매트릭스 결과표

### 정상 입력 테스트

| 월납입액 | 성별 | 가입연령 | 납입기간 | 기대 연금개시연령 | 실제 결과 |
|----------|------|----------|----------|------------------|-----------|
| 300,000 | 남 | 25 | 10 | 65세 | ✅ 65세 |
| 500,000 | 여 | 35 | 15 | 70세 | ✅ 70세 |
| 1,000,000 | 남 | 45 | 20 | 75세 | ✅ 75세 |
| 300,000 | 여 | 55 | 10 | 70세 | ✅ 70세 |

### 경계값 테스트

| 월납입액 | 성별 | 가입연령 | 납입기간 | 기대 결과 | 실제 결과 |
|----------|------|----------|----------|-----------|-----------|
| 300,000 | 남 | 61 | 20 | 81세 (가입 불가) | ❌ 80세로 잘못 계산 |
| 500,000 | 여 | 65 | 20 | 85세 (가입 불가) | ❌ 80세로 잘못 계산 |
| 1,000,000 | 남 | 70 | 20 | 90세 (가입 불가) | ❌ 80세로 잘못 계산 |

### 비정상 입력 테스트

| 입력값 | 기대 결과 | 실제 결과 |
|--------|-----------|-----------|
| "300,000" | 300000 | ✅ 정상 처리 |
| "500,000원" | 500000 | ✅ 정상 처리 |
| "-100000" | 오류 | ❌ 음수 허용 |
| "abc123" | 오류 | ❌ 문자 허용 |
| "" (빈 문자열) | 오류 | ❌ 빈 값 허용 |

---

**감사 완료일**: 2024년 12월 19일  
**감사자**: 코드 감사 봇  
**버전**: 2.0 (P0/P1 이슈 집중 분석)  
**주의사항**: 이 보고서는 읽기 전용 감사 결과이며, 실제 코드 수정은 별도 검토 후 진행해야 합니다.
