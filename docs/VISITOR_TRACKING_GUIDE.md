# 방문자 추적 시스템 사용 가이드

## 개요
이 시스템은 웹사이트 방문자의 유입 경로, 키워드, IP 주소 등을 추적하여 마케팅 효과를 분석할 수 있게 해주는 도구입니다.

## 주요 기능

### 1. 자동 추적
- **페이지 방문**: 모든 페이지 접속 시 자동으로 방문자 정보 수집
- **디바이스 정보**: 데스크톱/모바일/태블릿 구분
- **브라우저/OS**: 사용자의 브라우저와 운영체제 정보
- **IP 주소**: 방문자의 IP 주소 (위치 정보 포함)
- **세션 관리**: 동일 사용자의 여러 페이지 방문을 세션으로 구분

### 2. UTM 파라미터 추적
- **utm_source**: 유입 소스 (google, facebook, naver 등)
- **utm_medium**: 유입 미디엄 (cpc, email, social 등)
- **utm_campaign**: 캠페인명
- **utm_term**: 키워드
- **utm_content**: 콘텐츠 구분

### 3. 상담/보험료 확인 연동
- **상담 신청**: `counsel_type_id = 2` (상담신청)
- **보험료 확인**: `counsel_type_id = 1` (보험료 확인)
- **상품 정보**: 어떤 상품을 조회했는지 추적
- **보험사 정보**: 어떤 보험사 상품을 확인했는지 추적

## 설치 및 설정

### 1. Supabase 테이블 생성
```sql
-- create_visitor_tracking_table.sql 파일의 내용을 Supabase SQL Editor에서 실행
```

### 2. 환경 변수 확인
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. 패키지 설치
```bash
npm install date-fns
```

## 사용법

### 1. 기본 페이지 방문 추적
```tsx
import { trackPageVisit } from '@/app/utils/visitorTracking';

export default function MyPage() {
  useEffect(() => {
    trackPageVisit();
  }, []);
  
  // ... 페이지 내용
}
```

### 2. 상담 신청 시 추적
```tsx
import { trackCounselRequest } from '@/app/utils/visitorTracking';

const handleCounselSubmit = async (phone: string, name: string) => {
  // 상담 신청 처리
  await submitCounsel(phone, name);
  
  // 추적 데이터 저장
  await trackCounselRequest(
    2, // 상담신청 ID
    phone,
    name,
    {
      product_id: selectedProduct.id,
      company_id: selectedCompany.id,
    }
  );
};
```

### 3. 보험료 확인 시 추적
```tsx
import { trackPremiumCheck } from '@/app/utils/visitorTracking';

const handlePremiumCheck = async (productId: number, companyId: number) => {
  // 보험료 계산 처리
  const premium = await calculatePremium(productId, companyId);
  
  // 추적 데이터 저장
  await trackPremiumCheck(productId, companyId);
  
  return premium;
};
```

### 4. UTM 파라미터를 포함한 링크 생성
```
https://yoursite.com/?utm_source=google&utm_medium=cpc&utm_campaign=summer2024&utm_term=보험료비교
```

## 관리자 페이지

### 접속 방법
```
https://yoursite.com/admin/visitor-tracking
```

### 주요 기능
1. **통계 요약**: 전체 방문자 수, 고유 방문자 수, 상담 신청 수 등
2. **필터링**: 날짜, 상담 유형, UTM 소스, 디바이스 등으로 필터링
3. **데이터 테이블**: 상세 방문자 정보를 테이블 형태로 표시
4. **CSV 다운로드**: 필터링된 데이터를 CSV 파일로 다운로드

### 데이터 분석 예시

#### 1. 마케팅 채널 효과 분석
```
UTM 소스별 방문자 수:
- google: 150명
- facebook: 80명
- naver: 120명
- direct: 200명
```

#### 2. 상담 전환율 분석
```
전체 방문자: 550명
상담 신청: 45명
전환율: 8.2%
```

#### 3. 디바이스별 사용 패턴
```
데스크톱: 60%
모바일: 35%
태블릿: 5%
```

## 고급 기능

### 1. 실시간 추적
```tsx
// 실시간 방문자 수 모니터링
const [liveVisitors, setLiveVisitors] = useState(0);

useEffect(() => {
  const interval = setInterval(async () => {
    const response = await fetch('/api/visitor-stats?date_from=today');
    const data = await response.json();
    setLiveVisitors(data.totalVisitors);
  }, 30000); // 30초마다 업데이트
  
  return () => clearInterval(interval);
}, []);
```

### 2. 커스텀 이벤트 추적
```tsx
import { trackVisitor } from '@/app/utils/visitorTracking';

// 특정 버튼 클릭 추적
const handleButtonClick = async () => {
  await trackVisitor({
    counsel_type_id: null,
    product_id: null,
    company_id: null,
    // 커스텀 데이터 추가
    custom_event: 'button_click',
    button_name: 'download_guide'
  });
};
```

## 보안 고려사항

### 1. 개인정보 보호
- IP 주소는 익명화 처리 고려
- 개인정보 수집 시 동의 절차 필수
- GDPR 등 개인정보보호법 준수

### 2. 접근 제어
- 관리자 페이지는 인증된 사용자만 접근 가능
- API 엔드포인트에 적절한 권한 설정

### 3. 데이터 보관
- 오래된 데이터는 주기적으로 아카이브
- 백업 및 복구 정책 수립

## 문제 해결

### 1. 데이터가 수집되지 않는 경우
- Supabase 연결 확인
- 브라우저 콘솔에서 에러 메시지 확인
- 네트워크 탭에서 API 호출 상태 확인

### 2. 성능 이슈
- 인덱스 생성 확인
- 데이터베이스 쿼리 최적화
- 페이지네이션 적용

### 3. UTM 파라미터가 인식되지 않는 경우
- URL 파라미터 형식 확인
- 브라우저 캐시 클리어
- JavaScript 실행 환경 확인

## 추가 개발 아이디어

### 1. 대시보드 개선
- 차트 및 그래프 추가
- 실시간 알림 기능
- 자동 리포트 생성

### 2. 고급 분석
- 사용자 행동 패턴 분석
- A/B 테스트 결과 추적
- 예측 분석 (머신러닝)

### 3. 통합 기능
- Google Analytics 연동
- CRM 시스템 연동
- 이메일 마케팅 도구 연동

## 문의 및 지원
시스템 사용 중 문제가 발생하거나 추가 기능이 필요한 경우 개발팀에 문의하세요.

