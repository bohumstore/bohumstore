# Middleware 기능 수동 테스트 체크리스트

## 🚀 테스트 준비
- [ ] 개발 서버 실행: `npm run dev`
- [ ] 브라우저에서 `http://localhost:3000` 접속 확인

## 🔄 리다이렉트 테스트 (미완성 경로)

### 1. 메인 페이지 테스트
- [ ] `http://localhost:3000/` 접속
- [ ] URL이 자동으로 `/coming-soon`으로 변경되는지 확인
- [ ] "메인/카테고리 페이지는 준비 중이에요" 제목이 표시되는지 확인

### 2. 보험 카테고리 테스트
- [ ] `http://localhost:3000/insurance` 접속
- [ ] URL이 자동으로 `/coming-soon`으로 변경되는지 확인
- [ ] coming-soon 페이지가 정상 표시되는지 확인

### 3. 연금 보험 테스트
- [ ] `http://localhost:3000/insurance/annuity` 접속
- [ ] URL이 자동으로 `/coming-soon`으로 변경되는지 확인
- [ ] coming-soon 페이지가 정상 표시되는지 확인

### 4. 종신 보험 테스트
- [ ] `http://localhost:3000/insurance/whole-life` 접속
- [ ] URL이 자동으로 `/coming-soon`으로 변경되는지 확인
- [ ] coming-soon 페이지가 정상 표시되는지 확인

## ✅ 정상 접근 테스트 (완성된 상세 페이지)

### 1. KDB 행복플러스 연금보험
- [ ] `http://localhost:3000/insurance/annuity/kdb/happy-plus` 접속
- [ ] URL이 변경되지 않는지 확인 (리다이렉트 안됨)
- [ ] coming-soon 페이지가 아닌 상품 상세 페이지가 표시되는지 확인

### 2. KDB 행복드림 변액연금
- [ ] `http://localhost:3000/insurance/annuity/kdb/happy-dream` 접속
- [ ] URL이 변경되지 않는지 확인
- [ ] 상품 상세 페이지가 정상 표시되는지 확인

### 3. IBK 평생보증 변액연금
- [ ] `http://localhost:3000/insurance/annuity/ibk/lifetime` 접속
- [ ] URL이 변경되지 않는지 확인
- [ ] 상품 상세 페이지가 정상 표시되는지 확인

### 4. 신한 모아더드림 Plus 종신보험
- [ ] `http://localhost:3000/insurance/whole-life/shinhan/more-the-dream` 접속
- [ ] URL이 변경되지 않는지 확인
- [ ] 상품 상세 페이지가 정상 표시되는지 확인

## 🔗 Coming Soon 페이지 링크 테스트

### 1. Coming Soon 페이지 접속
- [ ] `http://localhost:3000/coming-soon` 직접 접속
- [ ] 4개 상품 카드가 모두 표시되는지 확인
- [ ] 각 상품의 로고, 회사명, 상품명이 정확히 표시되는지 확인

### 2. KDB 행복플러스 연금보험 링크
- [ ] 첫 번째 상품 카드 클릭
- [ ] `/insurance/annuity/kdb/happy-plus` 페이지로 이동하는지 확인
- [ ] 상품 상세 페이지가 정상 표시되는지 확인

### 3. KDB 행복드림 변액연금 링크
- [ ] 두 번째 상품 카드 클릭
- [ ] `/insurance/annuity/kdb/happy-dream` 페이지로 이동하는지 확인
- [ ] 상품 상세 페이지가 정상 표시되는지 확인

### 4. IBK 평생보증 변액연금 링크
- [ ] 세 번째 상품 카드 클릭
- [ ] `/insurance/annuity/ibk/lifetime` 페이지로 이동하는지 확인
- [ ] 상품 상세 페이지가 정상 표시되는지 확인

### 5. 신한 모아더드림 Plus 종신보험 링크
- [ ] 네 번째 상품 카드 클릭
- [ ] `/insurance/whole-life/shinhan/more-the-dream` 페이지로 이동하는지 확인
- [ ] 상품 상세 페이지가 정상 표시되는지 확인

## 🚫 404 페이지 테스트

### 1. 존재하지 않는 경로 테스트
- [ ] `http://localhost:3000/non-existent-path` 접속
- [ ] "페이지를 찾을 수 없어요" 메시지가 표시되는지 확인
- [ ] 2개의 상품 링크 버튼이 표시되는지 확인

### 2. 404 페이지 링크 테스트
- [ ] "KDB 행복플러스 연금보험" 버튼 클릭
- [ ] 해당 상품 페이지로 정상 이동하는지 확인

## 🔍 추가 확인사항

### 1. 브라우저 개발자 도구
- [ ] Network 탭에서 리다이렉트가 rewrite로 처리되는지 확인
- [ ] Console에 에러가 없는지 확인

### 2. SEO 메타태그
- [ ] 미완성 경로에서 robots 메타태그가 `index: false, follow: true`로 설정되는지 확인

### 3. 반응형 테스트
- [ ] 모바일/태블릿/데스크톱 크기에서 정상 작동하는지 확인

## 📝 테스트 결과 요약

- [ ] **리다이렉트 테스트**: 4/4 성공
- [ ] **정상 접근 테스트**: 4/4 성공  
- [ ] **링크 테스트**: 4/4 성공
- [ ] **404 페이지 테스트**: 1/1 성공
- [ ] **전체 테스트**: 13/13 성공

## 🚨 문제 발생 시 체크포인트

1. **개발 서버가 실행 중인지 확인**
2. **middleware.ts 파일이 프로젝트 루트에 있는지 확인**
3. **app/coming-soon/page.tsx 파일이 정상 생성되었는지 확인**
4. **브라우저 캐시를 지우고 새로고침**
5. **Next.js 빌드 에러가 없는지 확인**

---

**테스트 완료일**: ___________  
**테스터**: ___________  
**비고**: ___________
