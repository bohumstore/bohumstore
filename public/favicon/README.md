# 파비콘 파일 가이드

이 폴더에 다음 파비콘 파일들을 넣어주세요:

## 필수 파일 목록

### 일반 파비콘 (브라우저)
- `favicon-16x16.png` - 16x16px
- `favicon-32x32.png` - 32x32px
- `favicon-96x96.png` - 96x96px

### 애플 (iOS/macOS)
- `apple-icon-57x57.png` - 57x57px
- `apple-icon-60x60.png` - 60x60px
- `apple-icon-72x72.png` - 72x72px
- `apple-icon-76x76.png` - 76x76px
- `apple-icon-114x114.png` - 114x114px
- `apple-icon-120x120.png` - 120x120px
- `apple-icon-144x144.png` - 144x144px
- `apple-icon-152x152.png` - 152x152px
- `apple-icon-180x180.png` - 180x180px (주요 아이콘)

### 안드로이드
- `android-icon-192x192.png` - 192x192px
- `android-icon-512x512.png` - 512x512px (PWA용)

### MS Windows (타일)
- `ms-icon-70x70.png` - 70x70px
- `ms-icon-144x144.png` - 144x144px
- `ms-icon-150x150.png` - 150x150px
- `ms-icon-310x310.png` - 310x310px

## 파일 형식
- 모든 파일은 **PNG 형식**이어야 합니다
- 투명 배경 또는 흰색 배경 권장
- 고품질 이미지 사용 권장

## 파일 배치 후
파일들을 이 폴더(`public/favicon/`)에 넣으신 후:
1. 개발 서버를 재시작하세요: `npm run dev`
2. 브라우저 캐시를 지우고 페이지를 새로고침하세요

## 확인 방법
- **브라우저 탭**: 파비콘이 표시되는지 확인
- **북마크**: 북마크 추가 시 아이콘 확인
- **iOS**: 홈 화면에 추가 시 아이콘 확인
- **Android**: 홈 화면에 추가 시 아이콘 확인
- **Windows**: 타일 고정 시 아이콘 확인
