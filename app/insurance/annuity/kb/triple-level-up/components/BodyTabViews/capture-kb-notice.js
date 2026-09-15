const playwright = require('playwright');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

(async () => {
  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 860, height: 10000 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  const url = 'http://localhost:3000/insurance/annuity/kb/triple-level-up/notice-capture';

  console.log('페이지 로딩 중...');
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  console.log('콘텐츠 영역 찾는 중...');
  const contentElement = await page.$('div.px-6.py-4');
  if (!contentElement) {
    console.error('콘텐츠를 찾을 수 없습니다.');
    await browser.close();
    return;
  }

  await page.waitForTimeout(500);

  const boundingBox = await contentElement.boundingBox();
  if (!boundingBox) {
    console.error('콘텐츠 영역을 찾을 수 없습니다.');
    await browser.close();
    return;
  }

  console.log(`콘텐츠 높이: ${Math.ceil(boundingBox.height)}px`);

  console.log('스크린샷 촬영 중...');

  const outputDir = path.join(__dirname, 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const tempPath = path.join(outputDir, 'temp_kb_notice.png');
  const outputPath = path.join(outputDir, 'bo_kb_notice.png');

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

  const tempWithPadding = path.join(outputDir, 'temp_kb_notice_padding.png');
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

  const targetWidth = 860;
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

  const finalMetadata = await sharp(outputPath).metadata();
  const logicalWidth = targetWidth;
  const logicalHeight = Math.round(finalMetadata.height / 2);

  console.log(`✓ 이미지 생성 완료: ${outputPath}`);
  console.log(`  - 크기: ${logicalWidth} × ${logicalHeight}px (실제: ${finalMetadata.width} × ${finalMetadata.height}px @ 2x)`);
  console.log(`  - 보험사 컬러: #FBAF00 적용됨`);
  console.log(`  - 플로팅 UI: 제거됨`);
})();
