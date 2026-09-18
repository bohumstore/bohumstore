const playwright = require('playwright');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

async function captureVersion(browser, url, width, isMobile, outputName) {
  const context = await browser.newContext({
    viewport: { width: width * 2, height: 15000 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log(`\n=== ${outputName} 캡처 시작 (폭: ${width}px) ===`);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);

  // 탭 버튼이 렌더링될 때까지 대기
  await page.waitForSelector('button', { timeout: 10000 });

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

  await page.waitForTimeout(8000);
  await page.waitForSelector('table', { timeout: 20000 });
  await page.waitForTimeout(5000);

  // 페이지 스크롤
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);

  // 보험사 컬러 변경 (#1e3a8a -> #D5003E)
  console.log('보험사 컬러 적용 중...');
  await page.addStyleTag({
    content: `
      .border-l-4.border-\\[\\#1e3a8a\\] { border-left-color: #D5003E !important; }
      .border-b-2.border-\\[\\#1e3a8a\\] { border-bottom-color: #D5003E !important; }
      .text-\\[\\#1e3a8a\\] { color: #D5003E !important; }
      .bg-\\[\\#1e3a8a\\] { background-color: #D5003E !important; }
    `
  });

  // 모바일 전용 스타일 적용
  if (isMobile) {
    console.log('모바일 레이아웃 적용 중...');
    await page.addStyleTag({
      content: `
        /* 모바일: 표 글자 크기 조정 */
        table { font-size: 11px !important; }
        table th { font-size: 11px !important; padding: 6px 4px !important; }
        table td { font-size: 11px !important; padding: 6px 4px !important; }
        
        /* 모바일: 제목 크기 조정 */
        h2 { font-size: 20px !important; }
        h3 { font-size: 18px !important; }
        
        /* 모바일: 기준 텍스트 크기 */
        .text-xs { font-size: 10px !important; }
        
        /* 모바일: 주석 크기 */
        .text-gray-600 p { font-size: 10px !important; line-height: 1.5 !important; }
        
        /* 모바일: 여백 조정 */
        .space-y-8 { gap: 1.5rem !important; }
        .space-y-4 { gap: 1rem !important; }
      `
    });
  }

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

    // 검정 원형 버튼 제거
    document.querySelectorAll('button').forEach(btn => {
      const style = window.getComputedStyle(btn);
      if (style.position === 'fixed' || style.borderRadius.includes('50%') || style.borderRadius.includes('9999')) {
        btn.remove();
      }
    });
  });

  await page.waitForTimeout(500);

  // 콘텐츠 영역 찾기
  const contentElement = await page.$('div.space-y-8');
  if (!contentElement) {
    console.error('콘텐츠를 찾을 수 없습니다.');
    await context.close();
    return null;
  }

  const contentHeight = await page.evaluate(() => {
    const content = document.querySelector('div.space-y-8');
    return content ? content.scrollHeight : 0;
  });

  console.log(`콘텐츠 높이: ${contentHeight}px`);

  const outputDir = path.join(__dirname, 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const tempPath = path.join(outputDir, `temp_${outputName}.png`);

  // 스크린샷
  console.log('스크린샷 촬영 중...');
  await contentElement.screenshot({
    path: tempPath,
    type: 'png',
  });

  await context.close();

  return tempPath;
}

async function addWatermark(inputPath, outputPath, width, isMobile) {
  console.log('워터마크 적용 중...');

  const watermarkPath = 'C:\\Users\\개미남\\Desktop\\웹개발수업\\project\\bohumstore\\public\\character.png';

  if (!fs.existsSync(watermarkPath)) {
    console.warn(`워터마크 파일을 찾을 수 없습니다: ${watermarkPath}`);
    await sharp(inputPath).toFile(outputPath);
    return;
  }

  const metadata = await sharp(inputPath).metadata();
  const imageWidth = metadata.width;
  const imageHeight = metadata.height;

  // 워터마크 설정 (PC와 모바일 동일)
  const wmSize = 240 * 2; // deviceScaleFactor 2 적용
  const wmGap = 700 * 2;
  const opacity = 0.07;

  // 워터마크 리사이즈 및 투명도 적용
  const watermarkBuffer = await sharp(watermarkPath)
    .resize(wmSize, wmSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .composite([{
      input: Buffer.from([255, 255, 255, Math.round(255 * opacity)]),
      raw: { width: 1, height: 1, channels: 4 },
      tile: true,
      blend: 'dest-in'
    }])
    .png()
    .toBuffer();

  // 워터마크 배치 계산
  const composites = [];
  const startX = Math.floor((imageWidth - wmSize) / 2);

  for (let y = wmGap; y < imageHeight + wmSize; y += wmGap) {
    composites.push({
      input: watermarkBuffer,
      top: y - wmSize / 2,
      left: startX,
      blend: 'over'
    });
  }

  // 최종 이미지 생성
  await sharp(inputPath)
    .composite(composites)
    .png()
    .toFile(outputPath);

  console.log(`워터마크 적용 완료: ${composites.length}개 배치`);
}

(async () => {
  const browser = await playwright.chromium.launch({ headless: true });
  const url = 'http://localhost:3000/insurance/oneshot/aia/dollar';

  try {
    // PC용 캡처 (1800px)
    const pcTempPath = await captureVersion(browser, url, 1800, false, '해약환급금_PC');
    if (pcTempPath) {
      const pcOutputPath = path.join(path.dirname(pcTempPath), '해약환급금_PC.png');
      await addWatermark(pcTempPath, pcOutputPath, 1800, false);
      fs.unlinkSync(pcTempPath);

      const pcMetadata = await sharp(pcOutputPath).metadata();
      console.log(`✓ PC용 이미지 생성 완료: ${pcOutputPath}`);
      console.log(`  - 크기: ${pcMetadata.width / 2} × ${pcMetadata.height / 2}px (논리적)`);
    }

    // 모바일용 캡처 (1200px)
    const mobileTempPath = await captureVersion(browser, url, 1200, true, '해약환급금_모바일');
    if (mobileTempPath) {
      const mobileOutputPath = path.join(path.dirname(mobileTempPath), '해약환급금_모바일.png');
      await addWatermark(mobileTempPath, mobileOutputPath, 1200, true);
      fs.unlinkSync(mobileTempPath);

      const mobileMetadata = await sharp(mobileOutputPath).metadata();
      console.log(`✓ 모바일용 이미지 생성 완료: ${mobileOutputPath}`);
      console.log(`  - 크기: ${mobileMetadata.width / 2} × ${mobileMetadata.height / 2}px (논리적)`);
    }

    console.log('\n=== 모든 이미지 생성 완료 ===');
  } catch (error) {
    console.error('오류 발생:', error);
  } finally {
    await browser.close();
  }
})();
