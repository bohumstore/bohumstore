const { chromium } = require('playwright');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'components', 'BodyTabViews', 'output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function captureNotice() {
  console.log('\n=== 가입시 알아두실 사항 PC용 캡처 시작 ===');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1800, height: 1200 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();

  try {
    // 페이지 로드
    console.log('페이지 로딩 중...');
    await page.goto('http://localhost:3000/insurance/oneshot/aia/dollar/notice-capture', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    await page.waitForTimeout(3000);

    // 이미지 로드 대기
    await page.waitForSelector('img[src="/1m.png"]', { timeout: 10000 });
    await page.waitForTimeout(2000);

    // 페이지 스크롤
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);

    // 콘텐츠 영역 측정
    const contentInfo = await page.evaluate(() => {
      const content = document.querySelector('.max-w-4xl');
      if (!content) return null;

      const rect = content.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;

      return {
        x: rect.left,
        y: rect.top + scrollY,
        width: rect.width,
        height: content.scrollHeight
      };
    });

    if (!contentInfo) {
      throw new Error('콘텐츠 영역을 찾을 수 없습니다');
    }

    console.log(`콘텐츠 높이: ${contentInfo.height}px`);
    console.log('스크린샷 촬영 중...');

    // fullPage로 촬영 후 영역만 잘라내기
    const fullPagePath = path.join(outputDir, 'temp_full_notice.png');
    await page.screenshot({
      path: fullPagePath,
      fullPage: true
    });

    // Sharp로 영역만 잘라내기
    const tempPath = path.join(outputDir, 'temp_notice.png');

    // 전체 페이지 이미지 크기 확인
    const fullPageMetadata = await sharp(fullPagePath).metadata();

    // 안전한 좌표 계산
    const extractLeft = Math.max(0, Math.round(contentInfo.x));
    const extractTop = Math.max(0, Math.round(contentInfo.y));
    const extractWidth = Math.min(Math.round(contentInfo.width), fullPageMetadata.width - extractLeft);
    const extractHeight = Math.min(Math.round(contentInfo.height), fullPageMetadata.height - extractTop);

    console.log(`Extract 영역: left=${extractLeft}, top=${extractTop}, width=${extractWidth}, height=${extractHeight}`);
    console.log(`전체 이미지: width=${fullPageMetadata.width}, height=${fullPageMetadata.height}`);

    await sharp(fullPagePath)
      .extract({
        left: extractLeft,
        top: extractTop,
        width: extractWidth,
        height: extractHeight
      })
      .toFile(tempPath);

    // 임시 전체 페이지 이미지 삭제
    fs.unlinkSync(fullPagePath);

    // 워터마크 적용
    await addWatermark(tempPath, path.join(outputDir, '가입시알아두실사항_PC.png'));

    // 임시 파일 삭제
    fs.unlinkSync(tempPath);

    const metadata = await sharp(path.join(outputDir, '가입시알아두실사항_PC.png')).metadata();
    console.log(`✓ PC용 이미지 생성 완료: ${path.join(outputDir, '가입시알아두실사항_PC.png')}`);
    console.log(`  - 크기: ${metadata.width} × ${metadata.height}px`);

  } catch (error) {
    console.error('오류 발생:', error);
  } finally {
    await context.close();
    await browser.close();
  }
}

async function addWatermark(inputPath, outputPath) {
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

  // PC 설정
  const opacity = 0.06;
  const wmSize = 180;
  const startTop = 360;
  const wmGap = 520;

  console.log(`워터마크 설정 (PC): 크기 ${wmSize}px / 시작 ${startTop}px / 간격 ${wmGap}px / 투명도 ${opacity * 100}%`);

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

  // 워터마크 배치 계산 (가로 중앙, 세로 반복)
  const composites = [];
  const startX = Math.floor((imageWidth - wmSize) / 2);

  // 워터마크가 이미지보다 큰 경우 건너뛰기
  if (wmSize > imageWidth || wmSize > imageHeight) {
    console.log('워터마크가 이미지보다 커서 적용하지 않습니다.');
    await sharp(inputPath).toFile(outputPath);
    return;
  }

  for (let y = startTop; y < imageHeight; y += wmGap) {
    // 워터마크가 이미지 범위 내에 있는지 확인
    if (y >= 0 && y + wmSize <= imageHeight && startX >= 0 && startX + wmSize <= imageWidth) {
      composites.push({
        input: watermarkBuffer,
        top: y,
        left: startX,
        blend: 'over'
      });
    }
  }

  // 워터마크가 하나도 없으면 원본 복사
  if (composites.length === 0) {
    console.log('배치 가능한 워터마크가 없습니다.');
    await sharp(inputPath).toFile(outputPath);
    return;
  }

  // 최종 이미지 생성
  await sharp(inputPath)
    .composite(composites)
    .png()
    .toFile(outputPath);

  console.log(`워터마크 적용 완료: ${composites.length}개 배치`);
}

(async () => {
  await captureNotice();
  console.log('\n=== 이미지 생성 완료 ===');
})();
