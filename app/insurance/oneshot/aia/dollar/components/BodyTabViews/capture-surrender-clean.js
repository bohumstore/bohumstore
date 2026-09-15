const playwright = require('playwright');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

(async () => {
  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 2400, height: 15000 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  const url = 'http://localhost:3000/insurance/oneshot/aia/dollar';

  console.log('페이지 로딩 중...');
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // 해약환급금 예시표 탭 클릭
  console.log('해약환급금 예시표 탭 클릭 중...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    for (const btn of buttons) {
      const text = btn.textContent || btn.innerText;
      if (text && text.trim() === '해약환급금 예시표') {
        btn.click();
        break;
      }
    }
  });

  await page.waitForTimeout(5000);
  await page.waitForSelector('table', { timeout: 10000 });
  await page.waitForTimeout(3000);

  // 페이지 스크롤
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);

  // 표 확인
  const tableCount = await page.evaluate(() => document.querySelectorAll('table').length);
  console.log(`발견된 표: ${tableCount}개`);

  // 스타일 주입: 보험사 컬러 변경
  console.log('보험사 컬러 적용 중...');
  await page.addStyleTag({
    content: `
      .border-l-4.border-\\[\\#1e3a8a\\] { border-left-color: #D5003E !important; }
      .border-b-2.border-\\[\\#1e3a8a\\] { border-bottom-color: #D5003E !important; }
      .text-\\[\\#1e3a8a\\] { color: #D5003E !important; }
      .bg-\\[\\#1e3a8a\\] { background-color: #D5003E !important; }
    `
  });

  // 플로팅 UI 제거
  console.log('플로팅 UI 제거 중...');
  await page.evaluate(() => {
    document.querySelectorAll('*').forEach(el => {
      const style = window.getComputedStyle(el);
      const isInContent = el.closest('div.space-y-8');
      if (!isInContent && (style.position === 'fixed' || style.position === 'sticky')) {
        el.remove();
      }
    });
  });

  // 제목 제거 및 패딩 조정
  await page.evaluate(() => {
    const contentDiv = document.querySelector('div.space-y-8');
    if (contentDiv) {
      const title = contentDiv.querySelector('h2');
      if (title && title.textContent.includes('해약환급금')) {
        title.remove();
      }
      contentDiv.style.paddingTop = '0.5rem';
      contentDiv.style.paddingBottom = '1rem';
      contentDiv.style.paddingLeft = '0.25rem';
      contentDiv.style.paddingRight = '0.25rem';
    }
  });

  await page.waitForTimeout(500);

  // 콘텐츠 영역 찾기
  const contentElement = await page.$('div.space-y-8');
  if (!contentElement) {
    console.error('콘텐츠를 찾을 수 없습니다.');
    await browser.close();
    return;
  }

  const contentHeight = await page.evaluate(() => {
    const content = document.querySelector('div.space-y-8');
    return content ? content.scrollHeight : 0;
  });

  console.log(`콘텐츠 높이: ${contentHeight}px`);
  console.log('스크린샷 촬영 중...');

  const outputDir = path.join(__dirname, 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const tempPath = path.join(outputDir, 'temp_surrender_clean.png');
  const outputPath = path.join(outputDir, 'bo_surrender.png');

  // 스크린샷
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

  const tempWithPadding = path.join(outputDir, 'temp_surrender_padding.png');
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
  console.log(`  - 크기: ${logicalWidth} × ${logicalHeight}px`);
})();
