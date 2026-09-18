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
  { name: '보장 내용', selector: 'button:has-text("보장 내용")', filename: '보장내용', pcMobile: true },
  { name: '해약환급금', selector: 'button:has-text("해약환급금")', filename: '해약환급금', pcMobile: true },
  { name: '상품 정보', selector: 'button:has-text("상품 정보")', filename: '가입안내', pcMobile: true },
  { name: '가입시 알아두실 사항', selector: null, filename: '가입시알아두실사항', pcMobile: false, isNotice: true }
];

async function captureTab(tab, isPC) {
  const deviceType = isPC ? 'PC' : '모바일';
  console.log(`\n=== ${tab.name} ${deviceType}용 캡처 시작 ===`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: isPC ? { width: 960, height: 1200 } : { width: 400, height: 800 },
    deviceScaleFactor: isPC ? 1 : 3,
  });

  const page = await context.newPage();

  try {
    // 페이지 로드
    console.log(`${tab.name} 페이지 로딩 중...`);
    const url = tab.isNotice
      ? 'http://localhost:3000/insurance/annuity/kb/triple-level-up/notice-capture'
      : 'http://localhost:3000/insurance/annuity/kb/triple-level-up';

    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    await page.waitForTimeout(2000);

    if (!tab.isNotice) {
      // 탭 클릭
      console.log(`${tab.name} 탭 클릭 중...`);
      await page.click(tab.selector);
      await page.waitForTimeout(2000);
    }

    // 스타일 적용
    console.log('보험사 컬러 적용 및 여백 축소 중...');

    // 탭별로 다른 스타일 적용 (모든 탭 제목 표시)
    const hideTitle = false;

    await page.addStyleTag({
      content: `
      /* 메인 컬러 적용 */
      .text-\\[\\#1e3a8a\\] { color: #FBAF00 !important; }
      .bg-\\[\\#1e3a8a\\] { background-color: #FBAF00 !important; }
      .border-\\[\\#1e3a8a\\] { border-color: #FBAF00 !important; }
      
      /* 모든 탭 제목을 검은색으로 */
      h2.text-2xl.border-b-2 { color: #222 !important; border-color: #222 !important; }
      
      /* 플로팅 UI 제거 */
      .fixed { display: none !important; }
      
      /* 탭 구분선 제거 */
      .border-b { border-bottom: none !important; }
      .border-t, .border-t-2 { border-top: none !important; }
      
      /* 탭 컨테이너 여백 제거 */
      .px-4.py-6 { padding: 0 !important; }
      .space-y-8 { margin-top: 0 !important; }
      
      ${isPC ? `
        /* PC 여백 (모든 탭 동일) */
        .space-y-8 { padding-left: 32px !important; padding-right: 32px !important; padding-top: 16px !important; padding-bottom: 16px !important; }
        .px-6 { padding-left: 32px !important; padding-right: 32px !important; padding-top: 16px !important; }
      ` : `
        /* 모바일 여백 (AIA와 동일) */
        .space-y-8 { padding-left: 16px !important; padding-right: 16px !important; padding-top: 12px !important; padding-bottom: 8px !important; }
        .px-6 { padding-left: 16px !important; padding-right: 16px !important; padding-top: 12px !important; }
        /* 모바일 폰트 크기 조정 */
        .text-xs { font-size: 11px !important; }
        .text-sm { font-size: 12px !important; }
        .text-base { font-size: 13px !important; }
      `}
      `
    });

    await page.waitForTimeout(1000);

    // 페이지 스크롤
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);

    // 콘텐츠 영역만 측정 및 위치 확인 (실제 콘텐츠 폭 사용)
    const contentInfo = await page.evaluate(() => {
      const content = document.querySelector('div.space-y-8') || document.querySelector('.max-w-4xl') || document.querySelector('.max-w-\\[860px\\]') || document.querySelector('.px-6');
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

    // 전체 페이지 이미지 크기 확인
    const fullPageMetadata = await sharp(fullPagePath).metadata();

    // Sharp로 영역만 잘라내기 (DPR 고려)
    const scale = isPC ? 1 : 3;
    const extractLeft = Math.max(0, Math.round(contentInfo.x * scale));
    const extractTop = Math.max(0, Math.round(contentInfo.y * scale));
    const extractWidth = Math.min(Math.round(contentInfo.width * scale), fullPageMetadata.width - extractLeft);
    const extractHeight = Math.min(Math.round(contentInfo.height * scale), fullPageMetadata.height - extractTop);

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

    return { tempPath, contentHeight: contentInfo.height };

  } catch (error) {
    console.error('오류 발생:', error);
    return null;
  } finally {
    await context.close();
    await browser.close();
  }
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

  // PC/모바일 설정
  const opacity = 0.06;
  const wmSize = isPC ? 180 : 390;
  const startTop = isPC ? 360 : 1080;
  const wmGap = isPC ? 520 : 1560;

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
    // 워터마크가 이미지 범위 내에 있는지 확인 (하단 일부 잘림 허용)
    if (y >= 0 && y < imageHeight && startX >= 0 && startX + wmSize <= imageWidth) {
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
  for (const tab of tabs) {
    // PC 캡처
    const pcResult = await captureTab(tab, true);
    if (pcResult) {
      const pcOutputPath = path.join(outputDir, `${tab.filename}_PC.png`);
      await addWatermark(pcResult.tempPath, pcOutputPath, true);
      fs.unlinkSync(pcResult.tempPath);

      const metadata = await sharp(pcOutputPath).metadata();
      console.log(`✓ PC용 이미지 생성 완료: ${pcOutputPath}`);
      console.log(`  - 크기: ${metadata.width} × ${metadata.height}px`);
    }

    // 모바일 캡처 (NoticeCapture는 제외)
    if (tab.pcMobile) {
      const mobileResult = await captureTab(tab, false);
      if (mobileResult) {
        const mobileOutputPath = path.join(outputDir, `${tab.filename}_모바일.png`);
        await addWatermark(mobileResult.tempPath, mobileOutputPath, false);
        fs.unlinkSync(mobileResult.tempPath);

        const metadata = await sharp(mobileOutputPath).metadata();
        console.log(`✓ 모바일용 이미지 생성 완료: ${mobileOutputPath}`);
        console.log(`  - 크기: ${metadata.width} × ${metadata.height}px`);
        console.log(`  - CSS 기준: ${Math.round(metadata.width / 3)} × ${Math.round(metadata.height / 3)}px`);
      }
    }
  }

  console.log('\n=== 모든 이미지 생성 완료 ===');
})();
