# 상품 추가 AI 에이전트 가이드

이 문서는 **보험 상품 페이지를 AI 에이전트로 안정적으로 추가**하기 위한 컨텍스트입니다.

## 1) 현재 코드베이스에서 상품 페이지 기본 구조

권장 구조는 `ProductDetailTemplate` 기반입니다.

- 경로: `app/insurance/<category>/<company>/<product>/page.tsx`
- 공통 레이아웃: `templates/Product/ProductDetailTemplate.tsx`
- **핵심 레퍼런스 (Gold Standard):**
  - **페이지 구조:** `app/insurance/annuity/kb/triple-level-up/page.tsx`
  - **모달/인증 로직:** `app/insurance/annuity/kb/triple-level-up/components/CalculatorConsultModal.tsx` (중앙 집중식 스캐폴드 적용됨)
  - **공지사항:** `app/insurance/whole-life/shinhan/more-the-dream/components/Notice.tsx` (StandardProductNotice 사용 예시)
  - **U/I 스캐폴드:** `templates/Product/components/CalculatorConsultModalScaffold.tsx`

주요 공통 컴포넌트:
- `components/product/SloganSection.tsx`
- `components/product/SloganCardView.tsx`
- `components/product/StandardProductNotice.tsx` (금융소비자 보호안내 등 표준 문구 포함)
- `components/product/PrivacyConsent.tsx` (법적 필수 항목 - 연락처, 제3자 제공 분리 등 반영됨)
- `components/CustomSelect.tsx` (네이티브 select 대신 사용 필수)
- `templates/Product/components/CalculatorConsultModalScaffold.tsx` (StepHeader, InfoItem, PreviewCard, StepSection 제공)

상품별로 일반적으로 필요한 파일:
- `app/insurance/.../page.tsx`
- `app/insurance/.../components/CalculatorConsultModal.tsx`
- `app/insurance/.../components/Notice.tsx`
- `app/insurance/.../components/BodyTabViews/ProductInfo.tsx`
- `app/insurance/.../components/BodyTabViews/CoverageDetails.tsx`
- `app/insurance/.../components/BodyTabViews/Surrender.tsx`

---

## 2) 디자인 시스템 및 UI 실천 사항

- **폰트 스케일링**: 모바일에서 표(Table) 등의 텍스트가 깨지지 않도록 `app/globals.css`의 전역 모바일 폰트 스케일링 규칙을 따릅니다.
- **스티키 바**: `ProductDetailTemplate`이 제공하는 하단 스티키 액션 바를 적극 활용합니다.
- **모달 인증 디자인**: `CalculatorConsultModal`의 Step 2는 `PreviewCard`를 사용한 요약 정보와 테두리가 있는 인증번호 입력 영역을 포함해야 합니다. (KB 트리플 레벨업 참조)
- **추천 배지**: `CustomSelect` 옵션 중 추천 항목(예: 5년납)에는 `[추천]` 배지를 추가합니다.

---

## 3) SVG/이미지 자산 정리 및 사용 규칙

- **SVG 사용 방식**: 모든 SVG는 React 컴포넌트화 하지 않고 **정적 자산(`public/svgs/`)**으로 관리합니다.
  - 사용 예시: `<img src="/svgs/common/icon/info.svg" className="w-4 h-4" alt="info" />`
  - 인라인 SVG 코드를 JSX에 직접 삽입하거나 컴포넌트로 만들지 마세요.
- **자산 위치**:
  - 공통 아이콘: `/public/svgs/common/` (icon, check, arrow 등)
  - 상품별 정보성 이미지: `/public/svgs/product/`
  - 슬로건 섹션 이미지: `/public/svgs/slogan/`
- **파일명 규칙**: 소문자와 하이픈(`-`)만 사용합니다. (예: `check-circle.svg`)

---

## 4) 상품 추가 시 필수 업데이트 포인트 (Checklist)

- [ ] `constants/insurance.ts` 업데이트 (`INSURANCE_PRODUCTS`, `PRODUCT_CONFIGS` 등)
- [ ] `page.tsx`에서 `ProductDetailTemplate` 적용
- [ ] `CalculatorConsultModal.tsx`에서 `CalculatorConsultModalScaffold`의 모듈형 컴포넌트 적용:
  - `StepHeader`: 단계별 제목 및 설명
  - `InfoItem`: 결과 데이터 행 (blur 처리 지원)
  - `PreviewCard`: 인증 전 요약 카드
  - `StepSection`: 상세 정보 섹션
- [ ] `CalculatorConsultModal.tsx` 내 모든 SVG를 `<img src="/svgs/..." />` 형식으로 교체
- [ ] `Notice.tsx`에서 `StandardProductNotice` 적용
- [ ] `SloganSection`에 `bottomNote` (상품별 기초 요건 설명) 추가

---

## 5) AI 에이전트에 바로 사용할 프롬프트 템플릿

아래 프롬프트를 에이전트에게 전달하여 작업을 시작하세요:

```md
다음 신규 보험 상품 페이지를 우리 프로젝트의 'Gold Standard' 패턴에 맞게 추가해줘.

[레퍼런스 파일]
- 전체 구조: app/insurance/annuity/kb/triple-level-up/page.tsx
- 모달/인증: app/insurance/annuity/kb/triple-level-up/components/CalculatorConsultModal.tsx
- 공지사항: components/product/StandardProductNotice.tsx
- U/I 스캐폴드: templates/Product/components/CalculatorConsultModalScaffold.tsx

[목표 상품 정보]
- 상품명: <상품명>
- URL 경로: /insurance/<category>/<company>/<product>
- 카테고리: <연금보험|종신보험|기타>

[필수 구현 사항]
1. `ProductDetailTemplate`을 최상위 템플릿으로 사용하세요.
2. `SloganSection`과 `SloganCardView`를 사용하여 히어로 섹션을 구성하세요.
3. `CalculatorConsultModal`은 반드시 다음을 포함해야 합니다:
   - `CalculatorConsultModalScaffold.tsx`에서 `StepHeader`, `InfoItem`, `PreviewCard`, `StepSection`을 import하여 사용.
   - 모든 아이콘/이미지는 `/public/svgs/` 경로의 파일을 `<img src="..." />`로 사용 (인라인 SVG 금지).
   - `CustomSelect` 컴포넌트 사용 (네이티브 <select> 금지).
   - `PrivacyConsent` 컴포넌트 사용.
   - Step 2 인증 화면에 `PreviewCard`와 `InfoItem` (blur 옵션) 적용.
   - Step 3 결과 화면에 `InfoItem`을 사용하여 데이터 렌더링.
4. `Notice` 컴포넌트는 `StandardProductNotice`를 감싸서 구현하고, 해당 상품의 고유 유의사항을 `notices` prop으로 전달하세요.
5. 관련 탭 콘텐츠(`ProductInfo`, `CoverageDetails`, `Surrender`)를 구현하세요.
6. `constants/insurance.ts`에 신규 상품 설정을 추가하세요.

[디자인/카피 입력값]
- 슬로건 타이틀: <텍스트>
- checkItems: <항목 리스트>
- 카드 섹션 구성 요건: <요건>
- 심의필 번호: <번호>

[검증 및 정리]
- 모든 SVG가 정적 자산 경로를 참조하고 있는지 확인하세요.
- `CalculatorConsultModal`의 UI가 중앙 집중식 스캐폴드 패턴을 따르는지 확인하세요.
- 미사용 import 및 'Dead Code'를 철저히 제거하세요.
- 타입 안전성을 확보하세요.
```

---

## 6) 에이전트 제약 사항 (주의점)

- `h-[px]` 처럼 ad-hoc한 클래스 생성을 지양하고 디자인 토큰을 사용하세요.
- `PrivacyConsent`에서 선택 항목(마케팅 등)과 필수 항목이 법적 기준에 맞게 분리되었는지 확인하세요.
- 상품별 기초 데이터(환급률 등)가 `CalculatorConsultModal`의 계산 로직에 정확히 반영되게 하세요.
