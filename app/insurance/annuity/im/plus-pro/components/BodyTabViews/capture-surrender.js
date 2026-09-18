const { chromium } = require('playwright');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.join(__dirname, 'output');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const WATERMARK_PATH = path.join(__dirname, '../../../../../../../public/character.png');

async function captureSurrender(isPC) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: isPC ? { width: 1800, height: 1200 } : { width: 400, height: 800 },
    deviceScaleFactor: isPC ? 1 : 3,
  });

  const page = await context.newPage();

  try {
    console.log(`\n=== 해약환급금 ${isPC ? 'PC' : '모바일'}용 캡처 시작 ===`);
    console.log('페이지 로딩 중...');
    await page.goto('http://localhost:3000/insurance/annuity/im/plus-pro/surrender-capture', {
      waitUntil: 'networkidle',
      timeout: 60000
    });
    await page.waitForTimeout(1000);

    console.log('스타일 적용 중...');
    await page.addStyleTag({
      content: `
      /* 메인 컬러 적용 */
      .text-\\[\\#1e3a8a\\] { color: #01B597 !important; }
      .bg-\\[\\#1e3a8a\\] { background-color: #01B597 !important; }
      .border-\\[\\#1e3a8a\\] { border-color: #01B597 !important; }
      
      /* 제목은 검은색으로 */
      .text-\\[\\#1e3a8a\\].text-2xl,
      .text-\\[\\#1e3a8a\\].text-3xl { color: #222 !important; }
      .bg-\\[\\#1e3a8a\\].h-1 { background-color: #222 !important; }
      
      /* 제목 밑줄 완전 제거 */
      .mb-2 > .w-full.h-1 { display: none !important; }
      .bg-\\[\\#1e3a8a\\].mb-3 { display: none !important; }
      .w-full.h-1.bg-\\[\\#1e3a8a\\] { display: none !important; }
      div[class*="h-1"][class*="bg-"] { display: none !important; }
      .mb-1 + .w-full { display: none !important; }
      
      /* 플로팅 UI 제거 */
      .fixed { display: none !important; }
      
      /* 상단 구분선 제거 */
      .border-t, .border-t-2 { border-top: none !important; }
      
      ${isPC ? `
        /* PC 여백 */
        .space-y-8 { 
          max-width: 960px !important;
          margin: 0 auto !important;
          padding-left: 40px !important; 
          padding-right: 40px !important; 
          padding-top: 16px !important; 
          padding-bottom: 20px !important; 
        }
      ` : `
        /* 모바일 여백 */
        .space-y-8 { 
          padding-left: 16px !important; 
          padding-right: 16px !important; 
          padding-top: 12px !important; 
          padding-bottom: 12px !important; 
        }
        /* 모바일 폰트 크기 조정 */
        .text-xs { font-size: 10px !important; }
        .text-sm { font-size: 11px !important; }
        .text-\\[10px\\] { font-size: 9px !important; }
        
        /* 모바일 표 최적화 */
        table { font-size: 9px !important; }
        th, td { padding: 4px 2px !important; }
      `}
      `
    });

    await page.waitForTimeout(1000);

    // 페이지 스크롤
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);

    // 콘텐츠 영역만 측정 및 위치 확인 (scrollHeight 사용)
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

    // 스크린샷 촬영 (fullPage로 촬영 후 영역만 잘라내기)
    const finalHeight = isPC ? contentInfo.height : contentInfo.height * 3;
    console.log(isPC ? '' : `최종 PNG 높이: ${finalHeight}px`);
    console.log('스크린샷 촬영 중...');

    const fullPagePath = path.join(OUTPUT_DIR, `temp_full_surrender_${isPC ? 'pc' : 'mobile'}.png`);

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

    const screenshot = await sharp(fullPagePath)
      .extract({
        left: extractLeft,
        top: extractTop,
        width: extractWidth,
        height: extractHeight
      })
      .toBuffer();

    // 임시 전체 페이지 이미지 삭제
    fs.unlinkSync(fullPagePath);

    console.log('워터마크 적용 중...');
    const watermarkSize = isPC ? 180 : 390;
    const startTop = isPC ? 360 : 1080;
    const gap = isPC ? 520 : 1560;
    const opacity = 0.06;

    console.log(`워터마크 설정 (${isPC ? 'PC' : '모바일'}): 크기 ${watermarkSize}px / 시작 ${startTop}px / 간격 ${gap}px / 투명도 ${opacity * 100}%`);

    const watermarkCount = Math.floor((finalHeight - startTop) / gap) + 1;
    const watermarks = [];

    for (let i = 0; i < watermarkCount; i++) {
      const top = startTop + (i * gap);
      if (top + watermarkSize <= finalHeight) {
        watermarks.push({
          input: await sharp(WATERMARK_PATH)
            .resize(watermarkSize, watermarkSize)
            .toBuffer(),
          top: top,
          left: Math.floor((extractWidth - watermarkSize) / 2),
          blend: 'over'
        });
      }
    }

    console.log(`워터마크 적용 완료: ${watermarks.length}개 배치`);

    let finalImage = sharp(screenshot);

    if (watermarks.length > 0) {
      for (const watermark of watermarks) {
        const watermarkWithOpacity = await sharp(watermark.input)
          .composite([{
            input: Buffer.from([255, 255, 255, Math.round(255 * opacity)]),
            raw: { width: 1, height: 1, channels: 4 },
            tile: true,
            blend: 'dest-in'
          }])
          .toBuffer();

        finalImage = finalImage.composite([{
          input: watermarkWithOpacity,
          top: watermark.top,
          left: watermark.left,
          blend: 'over'
        }]);
      }
    }

    const outputFileName = `해약환급금_${isPC ? 'PC' : '모바일'}.png`;
    const outputPath = path.join(OUTPUT_DIR, outputFileName);

    await finalImage.toFile(outputPath);

    const metadata = await sharp(outputPath).metadata();
    console.log(`✓ ${isPC ? 'PC' : '모바일'}용 이미지 생성 완료: ${outputPath}`);
    console.log(`  - 크기: ${metadata.width} × ${metadata.height}px`);
    if (!isPC) {
      console.log(`  - CSS 기준: ${Math.round(metadata.width / 3)} × ${Math.round(metadata.height / 3)}px`);
    }

  } catch (error) {
    console.error(`❌ 해약환급금 ${isPC ? 'PC' : '모바일'} 캡처 실패:`, error);
    throw error;
  } finally {
    await browser.close();
  }
}

async function main() {
  await captureSurrender(true);
  await captureSurrender(false);

  console.log('\n=== 해약환급금 이미지 생성 완료 ===');
}

main().catch(console.error);
