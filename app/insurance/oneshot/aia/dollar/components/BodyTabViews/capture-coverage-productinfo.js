const { chromium } = require('playwright');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 탭 정보
const tabs = [
  { name: '보장 내용', selector: 'button:has-text("보장 내용")', filename: '보장내용' },
  { name: '상품 정보', selector: 'button:has-text("상품 정보")', filename: '가입안내' }
];

async function captureTab(page, tab, isPC) {
  console.log(`\n=== ${tab.name} ${isPC ? 'PC' : '모바일'}용 캡처 시작 ===`);

  // 탭 클릭
  console.log(`${tab.name} 탭 클릭 중...`);
  await page.click(tab.selector);
  await page.waitForTimeout(3000);
  await page.waitForSelector('table', { timeout: 20000 });
  await page.waitForTimeout(2000);

  // 페이지 스크롤
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);

  // 보험사 컬러 변경 및 여백 축소
  console.log('보험사 컬러 적용 및 여백 축소 중...');
  await page.addStyleTag({
    content: `
      .border-l-4.border-\\[\\#1e3a8a\\] { border-left-color: #D5003E !important; }
      .border-b-2.border-\\[\\#1e3a8a\\] { border-bottom-color: #D5003E !important; }
      .text-\\[\\#1e3a8a\\] { color: #D5003E !important; }
      .bg-\\[\\#1e3a8a\\] { background-color: #D5003E !important; }
      
      /* ${isPC ? 'PC' : '모바일'} 여백 축소 */
      .space-y-8 { padding-left: ${isPC ? '24px' : '16px'} !important; padding-right: ${isPC ? '24px' : '16px'} !important; padding-top: ${isPC ? '16px' : '12px'} !important; padding-bottom: 8px !important; }
    `
  });

  // 상단 제목 제거
  console.log('상단 제목 제거 중...');
  await page.evaluate(() => {
    const h2 = document.querySelector('h2');
    if (h2) {
      h2.remove();
    }
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

    document.querySelectorAll('button').forEach(btn => {
      const style = window.getComputedStyle(btn);
      if (style.position === 'fixed' || style.borderRadius.includes('50%') || style.borderRadius.includes('9999')) {
        btn.remove();
      }
    });
  });

  // 콘텐츠 영역만 측정 및 위치 확인
  const contentInfo = await page.evaluate(() => {
    const content = document.querySelector('div.space-y-8');
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

  console.log(`콘텐츠 높이: ${contentInfo.height}px${isPC ? '' : ' (CSS 기준)'}`);

  // 스크린샷 촬영 (콘텐츠 영역만)
  const finalHeight = isPC ? contentInfo.height : contentInfo.height * 3;
  console.log(isPC ? '' : `최종 PNG 높이: ${finalHeight}px`);
  console.log('스크린샷 촬영 중...');

  const tempPath = path.join(outputDir, `temp_${tab.filename}_${isPC ? 'pc' : 'mobile'}.png`);

  // fullPage로 촬영 후 영역만 잘라내기
  const fullPagePath = path.join(outputDir, `temp_full_${tab.filename}_${isPC ? 'pc' : 'mobile'}.png`);
  await page.screenshot({
    path: fullPagePath,
    fullPage: true
  });

  // Sharp로 영역만 잘라내기
  const scale = isPC ? 1 : 3;
  await sharp(fullPagePath)
    .extract({
      left: Math.round(contentInfo.x * scale),
      top: Math.round(contentInfo.y * scale),
      width: Math.round(contentInfo.width * scale),
      height: Math.round(contentInfo.height * scale)
    })
    .toFile(tempPath);

  // 임시 전체 페이지 이미지 삭제
  fs.unlinkSync(fullPagePath);

  return { tempPath, contentHeight: contentInfo.height };
}

async function addWatermark(inputPath, outputPath, isPC) {
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

  // PC와 모바일 별도 설정 (실제 화면에서 비슷한 크기로 보이도록)
  const opacity = 0.06;
  let wmSize, startTop, wmGap;

  if (isPC) {
    // PC: 180px
    wmSize = 180;
    startTop = 360;
    wmGap = 520;
  } else {
    // 모바일: CSS 130px (실제 390px)
    wmSize = 130 * 3;
    startTop = 360 * 3;
    wmGap = 520 * 3;
  }

  console.log(`워터마크 설정 (${isPC ? 'PC' : '모바일'}): 크기 ${wmSize}px / 시작 ${startTop}px / 간격 ${wmGap}px / 투명도 ${opacity * 100}%`);

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
  const browser = await chromium.launch({ headless: true });

  try {
    for (const tab of tabs) {
      // PC 캡처
      const pcContext = await browser.newContext({
        viewport: { width: 1800, height: 1200 },
        deviceScaleFactor: 1,
      });
      const pcPage = await pcContext.newPage();
      await pcPage.goto('http://localhost:3000/insurance/oneshot/aia/dollar', { waitUntil: 'networkidle' });
      await pcPage.waitForTimeout(5000);

      const { tempPath: pcTempPath, contentHeight: pcHeight } = await captureTab(pcPage, tab, true);
      await pcContext.close();

      const pcOutputPath = path.join(outputDir, `${tab.filename}_PC.png`);
      await addWatermark(pcTempPath, pcOutputPath, true);
      fs.unlinkSync(pcTempPath);

      const pcMetadata = await sharp(pcOutputPath).metadata();
      console.log(`✓ PC용 이미지 생성 완료: ${pcOutputPath}`);
      console.log(`  - 크기: ${pcMetadata.width} × ${pcMetadata.height}px`);

      // 모바일 캡처
      const mobileContext = await browser.newContext({
        viewport: { width: 400, height: 800 },
        deviceScaleFactor: 3,
      });
      const mobilePage = await mobileContext.newPage();
      await mobilePage.goto('http://localhost:3000/insurance/oneshot/aia/dollar', { waitUntil: 'networkidle' });
      await mobilePage.waitForTimeout(5000);

      const { tempPath: mobileTempPath, contentHeight: mobileHeight } = await captureTab(mobilePage, tab, false);
      await mobileContext.close();

      const mobileOutputPath = path.join(outputDir, `${tab.filename}_모바일.png`);
      await addWatermark(mobileTempPath, mobileOutputPath, false);
      fs.unlinkSync(mobileTempPath);

      const mobileMetadata = await sharp(mobileOutputPath).metadata();
      console.log(`✓ 모바일용 이미지 생성 완료: ${mobileOutputPath}`);
      console.log(`  - 크기: ${mobileMetadata.width} × ${mobileMetadata.height}px`);
      console.log(`  - CSS 기준: ${mobileMetadata.width / 3} × ${mobileMetadata.height / 3}px`);
    }

    console.log('\n=== 모든 이미지 생성 완료 ===');
  } catch (error) {
    console.error('오류 발생:', error);
  } finally {
    await browser.close();
  }
})();
