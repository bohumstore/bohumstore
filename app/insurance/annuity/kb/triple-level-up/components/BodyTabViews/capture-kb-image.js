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

  const url = 'http://localhost:3000/insurance/annuity/kb/triple-level-up';

  console.log('페이지 로딩 중...');
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // 상품 정보 탭 클릭
  try {
    await page.waitForTimeout(1500);

    const clicked = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      for (const btn of buttons) {
        const text = btn.textContent || btn.innerText;
        if (text && text.trim() === '상품 정보') {
          btn.click();
          return true;
        }
      }
      return false;
    });

    if (clicked) {
      console.log('상품 정보 탭 클릭 완료');
      await page.waitForTimeout(3000);
      await page.waitForSelector('table', { timeout: 5000 });
      await page.waitForTimeout(1000);
    } else {
      console.log('상품 정보 탭을 찾을 수 없습니다.');
    }
  } catch (e) {
    console.log('상품 정보 탭 클릭 실패:', e.message);
  }

  console.log('스타일 주입 중...');

  // 임시 스타일 주입: 보험사 컬러를 #FBAF00으로 변경
  await page.addStyleTag({
    content: `
      .border-l-4.border-\\[\\#1e3a8a\\] { border-left-color: #FBAF00 !important; }
      .border-b-2.border-\\[\\#1e3a8a\\] { border-bottom-color: #FBAF00 !important; }
      .border-b.border-\\[\\#1e3a8a\\] { border-bottom-color: #FBAF00 !important; }
      .text-\\[\\#1e3a8a\\] { color: #FBAF00 !important; }
      .bg-\\[\\#1e3a8a\\] { background-color: #FBAF00 !important; }
    `
  });

  console.log('플로팅 UI 제거 중...');

  // JavaScript로 플로팅 요소 직접 제거
  await page.evaluate(() => {
    document.querySelectorAll('*').forEach(el => {
      const style = window.getComputedStyle(el);
      if (style.position === 'fixed' || style.position === 'sticky') {
        el.style.display = 'none !important';
        el.style.visibility = 'hidden !important';
        el.style.opacity = '0 !important';
      }
    });

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

  await page.evaluate(() => {
    const allEls = Array.from(document.querySelectorAll('*'));

    allEls.forEach(el => {
      const style = window.getComputedStyle(el);
      const isInContent = el.closest('div.space-y-8');

      if (!isInContent) {
        if (style.position === 'fixed' || style.position === 'sticky') {
          el.remove();
          return;
        }

        const zIndex = parseInt(style.zIndex);
        if (!isNaN(zIndex) && zIndex > 10) {
          el.remove();
          return;
        }

        if (el.tagName === 'BUTTON' || el.tagName === 'A') {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            el.remove();
            return;
          }
        }

        if (style.borderRadius && parseFloat(style.borderRadius) > 20) {
          const rect = el.getBoundingClientRect();
          if (rect.width > 30 && rect.height > 30 && Math.abs(rect.width - rect.height) < 10) {
            el.remove();
            return;
          }
        }
      }
    });

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

  // 가입안내 제목 제거 및 패딩 조정
  await page.evaluate(() => {
    const contentDiv = document.querySelector('div.space-y-8');
    if (contentDiv) {
      const title = contentDiv.querySelector('h2');
      if (title && title.textContent.includes('가입안내')) {
        title.remove();
      }

      // 상하 패딩 축소
      contentDiv.style.paddingTop = '0.5rem';
      contentDiv.style.paddingBottom = '1rem';

      // 양옆 패딩 최소화 (모바일에서 글자 크게 보이도록)
      contentDiv.style.paddingLeft = '0.25rem';
      contentDiv.style.paddingRight = '0.25rem';
    }
  });

  await page.waitForTimeout(200);

  console.log('상품정보 콘텐츠 영역 찾는 중...');

  const contentElement = await page.$('div.space-y-8');

  if (!contentElement) {
    console.error('상품정보 콘텐츠를 찾을 수 없습니다.');
    await browser.close();
    return;
  }

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

  const tempPath = path.join(outputDir, 'temp_kb.png');
  const outputPath = path.join(outputDir, 'bo_kb_insurance.png');

  await contentElement.screenshot({
    path: tempPath,
    type: 'png',
  });

  await browser.close();

  console.log('이미지 처리 중...');

  const metadata = await sharp(tempPath).metadata();
  const actualWidth = metadata.width;
  const actualHeight = metadata.height;

  const bottomPadding = 8 * 2;
  const finalHeight = actualHeight + bottomPadding;

  const tempWithPadding = path.join(outputDir, 'temp_kb_padding.png');
  await sharp({
    create: {
      width: actualWidth,
      height: finalHeight,
      channels: 3,
      background: { r: 255, g: 255, b: 255 }
    }
  })
    .composite([{
      input: tempPath,
      top: 0,
      left: 0
    }])
    .png()
    .toFile(tempWithPadding);

  const targetWidth = 2400;
  const resizedHeight = Math.round((finalHeight / actualWidth) * targetWidth * 2);

  await sharp(tempWithPadding)
    .resize(targetWidth * 2, resizedHeight, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255 }
    })
    .png()
    .toFile(outputPath);

  fs.unlinkSync(tempPath);
  fs.unlinkSync(tempWithPadding);

  const logicalWidth = targetWidth;
  const logicalHeight = resizedHeight / 2;

  console.log(`✓ 이미지 생성 완료: ${outputPath}`);
  console.log(`  - 크기: ${logicalWidth} × ${logicalHeight}px (실제: ${targetWidth * 2} × ${resizedHeight}px @ 2x)`);
  console.log(`  - 보험사 컬러: #FBAF00 적용됨`);
  console.log(`  - 플로팅 UI: 제거됨`);
})();
