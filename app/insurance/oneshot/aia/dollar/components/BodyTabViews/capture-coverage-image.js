const playwright = require('playwright');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

(async () => {
  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 2400, height: 10000 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  // 로컬 개발 서버 URL
  const url = 'http://localhost:3000/insurance/oneshot/aia/dollar';

  console.log('페이지 로딩 중...');
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 보장내용 탭 클릭
  try {
    await page.waitForTimeout(1000);

    // 탭 버튼 찾기 - '보장 내용' (공백 포함)
    const clicked = await page.evaluate(() => {
      // 모든 버튼 검사
      const buttons = Array.from(document.querySelectorAll('button'));
      for (const btn of buttons) {
        const text = btn.textContent || btn.innerText;
        if (text && text.trim() === '보장 내용') {
          btn.click();
          return true;
        }
      }
      return false;
    });

    if (clicked) {
      console.log('보장 내용 탭 클릭 완료');
      await page.waitForTimeout(3000);

      // 표가 렌더링될 때까지 대기
      await page.waitForSelector('table', { timeout: 5000 });
      await page.waitForTimeout(1000);
    } else {
      console.log('보장 내용 탭을 찾을 수 없습니다.');
    }
  } catch (e) {
    console.log('보장내용 탭 클릭 실패:', e.message);
  }

  console.log('스타일 주입 중...');

  // 임시 스타일 주입: 보험사 컬러를 #D5003E로 변경
  await page.addStyleTag({
    content: `
      /* 섹션 제목 왼쪽 세로선 */
      .border-l-4.border-\\[\\#1e3a8a\\] {
        border-left-color: #D5003E !important;
      }
      
      /* 상단 구분선 */
      .border-b-2.border-\\[\\#1e3a8a\\] {
        border-bottom-color: #D5003E !important;
      }
      
      /* 제목 텍스트 색상 */
      .text-\\[\\#1e3a8a\\] {
        color: #D5003E !important;
      }
      
      /* 표 헤더 배경색 */
      .bg-\\[\\#1e3a8a\\] {
        background-color: #D5003E !important;
      }
      
      /* 플로팅 버튼 숨김 */
      [class*="fixed"],
      [class*="sticky"],
      button[class*="fixed"],
      div[class*="fixed"],
      a[class*="fixed"] {
        display: none !important;
      }
      
      /* 우측 하단 플로팅 요소 숨김 */
      div[style*="position: fixed"],
      div[style*="position:fixed"] {
        display: none !important;
      }
    `
  });

  console.log('플로팅 UI 제거 중...');

  // JavaScript로 플로팅 요소 직접 제거
  await page.evaluate(() => {
    // 모든 fixed/sticky 요소 숨기기
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      const style = window.getComputedStyle(el);
      if (style.position === 'fixed' || style.position === 'sticky') {
        el.style.display = 'none !important';
        el.style.visibility = 'hidden !important';
        el.style.opacity = '0 !important';
      }
    });

    // 일반적인 플로팅 버튼 클래스명/속성으로 숨기기
    const floatingSelectors = [
      '[class*="floating"]',
      '[class*="Floating"]',
      '[class*="quick"]',
      '[class*="Quick"]',
      '[class*="fab"]',
      '[class*="FAB"]',
      'button[aria-label*="상담"]',
      'button[aria-label*="문의"]',
      'a[aria-label*="상담"]',
      'a[aria-label*="문의"]',
      'button[class*="rounded-full"]',
      'a[class*="rounded-full"]',
      'div[class*="z-50"]',
      'div[class*="z-40"]',
      'button[class*="bg-black"]',
      'button[class*="bg-gray"]',
      'div[class*="bottom-"]',
      'div[class*="right-"]',
      'div[class*="left-"]',
    ];

    floatingSelectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          // 본문 콘텐츠 내부가 아닌 경우만 숨김
          const isInContent = el.closest('div.space-y-8');
          if (!isInContent) {
            el.style.display = 'none !important';
            el.style.visibility = 'hidden !important';
            el.style.opacity = '0 !important';
          }
        });
      } catch (e) { }
    });
  });

  await page.waitForTimeout(500);

  // 추가 플로팅 UI 제거 (더 강력하게)
  await page.evaluate(() => {
    // 모든 요소 검사
    const allEls = Array.from(document.querySelectorAll('*'));

    allEls.forEach(el => {
      const style = window.getComputedStyle(el);
      const isInContent = el.closest('div.space-y-8');

      // 콘텐츠 영역 내부가 아닌 경우
      if (!isInContent) {
        // fixed/sticky 요소 완전 제거
        if (style.position === 'fixed' || style.position === 'sticky') {
          el.remove();
          return;
        }

        // z-index가 높은 요소 제거
        const zIndex = parseInt(style.zIndex);
        if (!isNaN(zIndex) && zIndex > 10) {
          el.remove();
          return;
        }

        // 버튼/링크 중 보이는 것 제거
        if (el.tagName === 'BUTTON' || el.tagName === 'A') {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            el.remove();
            return;
          }
        }

        // 원형 버튼 스타일 제거
        if (style.borderRadius && parseFloat(style.borderRadius) > 20) {
          const rect = el.getBoundingClientRect();
          if (rect.width > 30 && rect.height > 30 && Math.abs(rect.width - rect.height) < 10) {
            el.remove();
            return;
          }
        }
      }
    });

    // 추가: body 직계 자식 중 콘텐츠 영역이 아닌 모든 요소 제거
    Array.from(document.body.children).forEach(child => {
      const isMain = child.querySelector('div.space-y-8');
      if (!isMain && child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE') {
        const style = window.getComputedStyle(child);
        if (style.position === 'fixed' || style.position === 'absolute') {
          child.remove();
        }
      }
    });
  });

  await page.waitForTimeout(1000);

  // 보장내용 제목 제거 및 패딩 조정
  await page.evaluate(() => {
    const contentDiv = document.querySelector('div.space-y-8');
    if (contentDiv) {
      // 보장내용 제목 제거
      const title = contentDiv.querySelector('h2');
      if (title && title.textContent.includes('보장내용')) {
        title.remove();
      }

      // 패딩 조정
      contentDiv.style.paddingTop = '0.5rem';
      contentDiv.style.paddingLeft = '0.25rem';
      contentDiv.style.paddingRight = '0.25rem';
      contentDiv.style.paddingBottom = '1rem';
    }
  });

  await page.waitForTimeout(200);

  console.log('보장내용 콘텐츠 영역 찾는 중...');

  // 보장내용 콘텐츠 영역 찾기
  const contentElement = await page.$('div.space-y-8');

  if (!contentElement) {
    console.error('보장내용 콘텐츠를 찾을 수 없습니다.');
    await browser.close();
    return;
  }

  // 콘텐츠 영역의 크기와 위치 가져오기
  const boundingBox = await contentElement.boundingBox();

  if (!boundingBox) {
    console.error('콘텐츠 영역의 크기를 측정할 수 없습니다.');
    await browser.close();
    return;
  }

  console.log(`콘텐츠 높이: ${Math.ceil(boundingBox.height)}px`);

  console.log('스크린샷 촬영 중...');

  const outputDir = path.join(__dirname, 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const tempPath = path.join(outputDir, 'temp_coverage.png');
  const outputPath = path.join(outputDir, 'bo_coverage.png');

  // 콘텐츠 영역만 캡처 (임시 파일)
  await contentElement.screenshot({
    path: tempPath,
    type: 'png',
  });

  await browser.close();

  console.log('이미지 처리 중...');

  // 캡처한 이미지 메타데이터 가져오기
  const metadata = await sharp(tempPath).metadata();
  const actualWidth = metadata.width;
  const actualHeight = metadata.height;

  // 하단 여백 추가 (약 8px * deviceScaleFactor, 상단과 동일)
  const bottomPadding = 8 * 2;
  const finalHeight = actualHeight + bottomPadding;

  // 하단 여백 추가한 임시 이미지 생성
  const tempWithPadding = path.join(outputDir, 'temp_coverage_padding.png');
  await sharp({
    create: {
      width: actualWidth,
      height: finalHeight,
      channels: 3,
      background: { r: 255, g: 255, b: 255 }
    }
  })
    .composite([
      {
        input: tempPath,
        top: 0,
        left: 0
      }
    ])
    .png()
    .toFile(tempWithPadding);

  // 2400px 폭으로 리사이즈
  const targetWidth = 2400;
  const resizedHeight = Math.round((finalHeight / actualWidth) * targetWidth * 2);

  await sharp(tempWithPadding)
    .resize(targetWidth * 2, resizedHeight, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255 }
    })
    .png()
    .toFile(outputPath);

  // 임시 파일 삭제
  fs.unlinkSync(tempPath);
  fs.unlinkSync(tempWithPadding);

  const logicalWidth = targetWidth;
  const logicalHeight = resizedHeight / 2;

  console.log(`✓ 이미지 생성 완료: ${outputPath}`);
  console.log(`  - 크기: ${logicalWidth} × ${logicalHeight}px (실제: ${actualWidth} × ${finalHeight}px @ 2x)`);
  console.log(`  - 보험사 컬러: #D5003E 적용됨`);
  console.log(`  - 플로팅 UI: 제거됨`);
})();
