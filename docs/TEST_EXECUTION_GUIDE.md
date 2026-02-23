# Middleware 기능 테스트 실행 가이드

## 🚀 자동 테스트 (Playwright) - 권장

### 1. Playwright 설치
```bash
npm install --save-dev @playwright/test
npx playwright install
```

### 2. 테스트 실행
```bash
# 모든 테스트 실행 (개발 서버 자동 시작)
npx playwright test

# 특정 테스트만 실행
npx playwright test middleware.test.ts

# UI 모드로 실행 (시각적 확인)
npx playwright test --ui

# 헤드리스 모드로 실행
npx playwright test --headed
```

### 3. 테스트 결과 확인
```bash
# HTML 리포트 생성 및 열기
npx playwright show-report

# 테스트 결과 요약
npx playwright test --reporter=list
```

## 📋 수동 테스트

### 1. 개발 서버 실행
```bash
npm run dev
```

### 2. 브라우저에서 테스트
- `http://localhost:3000` 접속
- `MANUAL_TEST_CHECKLIST.md` 파일의 체크리스트 따라 테스트 진행

## 🔍 테스트 시나리오

### 시나리오 1: 미완성 경로 리다이렉트
1. 브라우저에서 `/` 접속
2. URL이 자동으로 `/coming-soon`으로 변경되는지 확인
3. "메인/카테고리 페이지는 준비 중이에요" 메시지 확인

### 시나리오 2: 완성된 상세 페이지 정상 접근
1. `/insurance/annuity/kdb/happy-plus` 접속
2. URL이 변경되지 않는지 확인
3. 상품 상세 페이지가 정상 표시되는지 확인

### 시나리오 3: Coming Soon 페이지 링크 테스트
1. `/coming-soon` 직접 접속
2. 4개 상품 카드 확인
3. 각 카드 클릭하여 올바른 상세 페이지로 이동하는지 확인

## 🚨 문제 해결

### 문제 1: 테스트가 실패하는 경우
```bash
# Playwright 재설치
npx playwright install --force

# 테스트 캐시 클리어
npx playwright test --clear-cache
```

### 문제 2: 개발 서버 연결 실패
```bash
# 포트 확인
netstat -ano | findstr :3000

# 다른 포트로 실행
npm run dev -- --port 3001
```

### 문제 3: Middleware가 작동하지 않는 경우
1. `middleware.ts` 파일이 프로젝트 루트에 있는지 확인
2. Next.js 버전이 12.2+ 인지 확인
3. 개발 서버 재시작

## 📊 테스트 결과 해석

### 성공 케이스
- ✅ 모든 리다이렉트가 정상 작동
- ✅ 완성된 상세 페이지 정상 접근
- ✅ Coming Soon 페이지 링크 정상 작동
- ✅ 404 페이지 정상 표시

### 실패 케이스
- ❌ 리다이렉트가 작동하지 않음 → middleware.ts 확인
- ❌ Coming Soon 페이지가 표시되지 않음 → page.tsx 파일 확인
- ❌ 링크가 작동하지 않음 → 경로 설정 확인

## 🔧 고급 테스트 옵션

### 1. 특정 브라우저에서만 테스트
```bash
# Chrome만 테스트
npx playwright test --project=chromium

# Firefox만 테스트
npx playwright test --project=firefox
```

### 2. 디버그 모드
```bash
# 디버그 모드로 실행
npx playwright test --debug

# 특정 테스트만 디버그
npx playwright test --debug --grep "리다이렉트"
```

### 3. 성능 테스트
```bash
# 성능 측정 포함
npx playwright test --trace on
```

## 📝 테스트 커스터마이징

### 새로운 테스트 케이스 추가
`tests/middleware.test.ts` 파일에 새로운 테스트 함수 추가:

```typescript
test('새로운 테스트 케이스', async ({ page }) => {
  // 테스트 로직 작성
  await page.goto('/new-path');
  await expect(page).toHaveURL('/expected-url');
});
```

### 테스트 환경 변수 설정
`.env.local` 파일에 테스트 환경 설정:

```bash
# 테스트용 환경 변수
TEST_BASE_URL=http://localhost:3000
TEST_TIMEOUT=30000
```

---

**참고**: 자동 테스트가 권장되지만, 수동 테스트도 함께 진행하여 사용자 경험을 직접 확인하는 것이 좋습니다.
