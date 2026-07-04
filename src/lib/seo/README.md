# SEO 중앙 관리 시스템

보험스토어의 모든 SEO 메타데이터를 중앙에서 관리하는 시스템입니다.

## 📁 구조

```
src/lib/seo/
├── insuranceMetadata.ts       # SEO 데이터 저장소
├── createInsuranceMetadata.ts # 메타데이터 생성 함수
└── README.md                  # 이 문서
```

## 🎯 주요 기능

### 1. 상품별 메타데이터 관리
- 각 보험 상품의 SEO 정보를 객체 형태로 중앙 관리
- title, description, keywords, canonical, ogImage 등 포함

### 2. 자동 메타데이터 생성
- Next.js Metadata 객체 자동 생성
- OpenGraph, Twitter Card, robots 등 자동 설정

### 3. 확장 가능한 구조
- 상품 페이지 (product)
- 카테고리 페이지 (category)
- 비교 페이지 (comparison)

## 📝 사용 방법

### 1. 새 상품 추가하기

`src/lib/seo/insuranceMetadata.ts` 파일을 열고 `insuranceMetadata` 객체에 추가:

```typescript
export const insuranceMetadata: Record<string, InsuranceMetadataConfig> = {
  // ... 기존 상품들
  
  // 새 상품 추가
  'new-product-key': {
    title: '상품명 | 보험사 | 보험스토어',
    description: '상품 설명 (150자 이내 권장)',
    keywords: '키워드1, 키워드2, 키워드3',
    canonical: 'https://bohumstore.net/insurance/category/company/product',
    ogImage: 'https://bohumstore.net/company-logo.png',
    category: '상품 카테고리',
    company: '보험사명'
  }
};
```

### 2. 상품 페이지에서 사용하기

`app/insurance/category/company/product/layout.tsx`:

```typescript
import { Metadata } from 'next';
import { createInsuranceMetadata } from '@/src/lib/seo/createInsuranceMetadata';

export const metadata: Metadata = createInsuranceMetadata('new-product-key');

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

### 3. 카테고리 페이지에서 사용하기

```typescript
import { createCategoryMetadata } from '@/src/lib/seo/createInsuranceMetadata';

export const metadata: Metadata = createCategoryMetadata('annuity');
```

### 4. 비교 페이지에서 사용하기

```typescript
import { createComparisonMetadata } from '@/src/lib/seo/createInsuranceMetadata';

export const metadata: Metadata = createComparisonMetadata('top-refund');
```

## 🔧 자동 생성되는 메타데이터

각 함수는 다음 항목을 자동으로 생성합니다:

- ✅ `title` - 페이지 제목
- ✅ `description` - 페이지 설명
- ✅ `keywords` - 검색 키워드
- ✅ `canonical` - 정규 URL
- ✅ `authors` - 작성자 정보
- ✅ `creator` - 제작자
- ✅ `publisher` - 발행자
- ✅ `robots` - 크롤러 설정
- ✅ `openGraph` - 오픈그래프 (Facebook, Kakao 등)
- ✅ `twitter` - 트위터 카드
- ✅ `alternates` - 대체 URL

## 📊 현재 등록된 상품 (11개)

### 연금보험 (5개)
- `metlife-only-dollar` - 메트라이프 달러연금
- `kb-triple-level-up` - KB 트리플 레벨업
- `im-plus-pro` - IM Plus PRO
- `kdb-happy-plus` - KDB 행복플러스
- `kdb-happy-dream` - KDB 행복드림

### 변액연금보험 (1개)
- `ibk-lifetime` - IBK 평생보증

### 일시납연금 (1개)
- `aia-dollar-oneshot` - AIA 달러연금

### 종신보험 (3개)
- `metlife-usd` - 메트라이프 달러종신
- `shinhan-more-the-dream` - 신한 모아더드림
- `hana-hanaro` - 하나로 THE 연결된

### 기타 (1개)
- `carer` - 간병보험

## 🚀 향후 확장 계획

### 1. 카테고리 페이지 (현재 운영 중)
- `/insurance/annuity` - 연금보험 카테고리
- `/insurance/whole-life` - 종신보험 카테고리
- `/insurance/oneshot` - 일시납연금 카테고리
- `/insurance/carer` - 간병보험 카테고리

### 2. 비교 페이지 (향후 백오피스 연동 예정)
**⚠️ 주의: 아직 실제 페이지가 생성되지 않았습니다.**

향후 백오피스 상품 DB와 연동하여 자동 생성될 예정:
- `/comparison/top-refund` - 환급률 TOP10
- `/comparison/annuity` - 연금보험 비교
- `/comparison/company` - 보험사별 비교
- `/comparison/ending-soon` - 판매 종료 예정 상품

현재는 SEO 시스템 내에 확장 가능성만 남겨두었으며,  
실제 라우트나 화면은 백오피스 개발 후 생성됩니다.

## ⚠️ 주의사항

1. **키 값 일관성**: 상품 키는 URL 경로와 일치시키는 것을 권장
2. **이미지 경로**: ogImage는 절대 경로 사용 (https://...)
3. **키워드 개수**: 10-15개 내외로 유지 (너무 많으면 스팸으로 간주)
4. **설명 길이**: description은 150-160자 이내 권장

## 📈 SEO 체크리스트

새 상품 추가 시 확인사항:

- [ ] `insuranceMetadata.ts`에 상품 정보 추가
- [ ] title에 상품명, 보험사, 보험스토어 포함
- [ ] description 150자 이내로 작성
- [ ] keywords 10-15개 선정
- [ ] canonical URL 정확히 입력
- [ ] ogImage 경로 확인
- [ ] layout.tsx에서 `createInsuranceMetadata()` 호출
- [ ] 빌드 후 메타태그 확인

## 🔍 메타데이터 확인 방법

1. **개발 환경**:
   ```bash
   npm run dev
   ```
   브라우저에서 페이지 소스 보기 (Ctrl+U)

2. **프로덕션 빌드**:
   ```bash
   npm run build
   npm run start
   ```

3. **SEO 검증 도구**:
   - Google Rich Results Test
   - Facebook Sharing Debugger
   - Twitter Card Validator
   - 네이버 웹마스터도구

## 💡 팁

- 상품이 100개 이상 추가되어도 `insuranceMetadata.ts` 파일 하나만 관리하면 됩니다
- 각 상품 페이지는 단 1줄(`createInsuranceMetadata('key')`)만 작성하면 됩니다
- 공통 SEO 설정 변경은 `createInsuranceMetadata.ts`의 `generateMetadata()` 함수만 수정하면 됩니다
