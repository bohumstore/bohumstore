# Playwright MCP Server

이 프로젝트는 Playwright를 사용하여 웹 자동화를 수행하는 MCP (Model Context Protocol) 서버입니다.

## 설치된 도구들

### 1. navigate
- **설명**: 지정된 URL로 이동
- **매개변수**: 
  - `url`: 이동할 URL
  - `browser`: 브라우저 타입 (chromium, firefox, webkit)

### 2. click
- **설명**: 지정된 요소 클릭
- **매개변수**: 
  - `selector`: CSS 선택자
  - `browser`: 브라우저 타입

### 3. type
- **설명**: 지정된 요소에 텍스트 입력
- **매개변수**: 
  - `selector`: CSS 선택자
  - `text`: 입력할 텍스트
  - `browser`: 브라우저 타입

### 4. screenshot
- **설명**: 스크린샷 촬영
- **매개변수**: 
  - `path`: 저장할 파일 경로 (기본값: screenshot.png)
  - `browser`: 브라우저 타입

### 5. getText
- **설명**: 요소의 텍스트 내용 가져오기
- **매개변수**: 
  - `selector`: CSS 선택자
  - `browser`: 브라우저 타입

### 6. waitForElement
- **설명**: 요소가 나타날 때까지 대기
- **매개변수**: 
  - `selector`: CSS 선택자
  - `timeout`: 대기 시간 (밀리초, 기본값: 30000)
  - `browser`: 브라우저 타입

### 7. evaluate
- **설명**: 페이지에서 JavaScript 코드 실행
- **매개변수**: 
  - `code`: 실행할 JavaScript 코드
  - `browser`: 브라우저 타입

## 사용법

### Cursor에서 MCP 서버 연결
1. `Tools & Integrations` 탭으로 이동
2. `MCP Tools` 섹션에서 `New MCP Server` 클릭
3. 서버 이름: `playwright`
4. 명령어: `node mcp-server-playwright.js`
5. 작업 디렉토리: 현재 프로젝트 폴더

### 서버 실행
```bash
npm run mcp-playwright
```

## 예시 사용법

### 웹사이트 방문
```
navigate to https://example.com using chromium
```

### 요소 클릭
```
click the button with selector "#submit-button"
```

### 텍스트 입력
```
type "Hello World" into the input field with selector "#username"
```

### 스크린샷 촬영
```
take a screenshot and save it as "my-screenshot.png"
```

## 주의사항

- Playwright는 헤드리스 모드로 실행됩니다
- 브라우저 인스턴스는 각 작업마다 새로 생성됩니다
- 일부 웹사이트는 봇 탐지를 할 수 있습니다
- 보안상 민감한 정보가 포함된 웹사이트는 주의해서 사용하세요
