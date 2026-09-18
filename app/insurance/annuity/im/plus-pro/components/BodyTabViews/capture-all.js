const { chromium } = require('playwright');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.join(__dirname, 'output');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const tabs = [
  { name: '보장 내용', selector: 'button:has-text("보장 내용")', isNotice: false },
  { name: '상품 정보', selector: 'button:has-text("상품 정보")', isNotice: false },
];

const WATERMARK_PATH = path.join(__dirname, '../../../../../../../public/character.png');

async function captureTab(tab, isPC) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: isPC ? { width: 1800, height: 1200 } : { width: 400, height: 800 },
    deviceScaleFactor: isPC ? 1 : 3,
  });

  const page = await context.newPage();

  try {
    console.log(`\n=== ${tab.name} ${isPC ? 'PC' : '모바일'}용 캡처 시작 ===`);
    console.log(`${tab.name} 페이지 로딩 중...`);
    await page.goto('http://localhost:3000/insurance/annuity/im/plus-pro', {
      waitUntil: 'networkidle',
      timeout: 60000
    });
    await page.waitForTimeout(2000);

    if (!tab.isNotice) {
      console.log(`${tab.name} 탭 클릭 중...`);
      await page.click(tab.selector);
      await page.waitForTimeout(2000);
    }

    console.log('보험사 컬러 적용 및 여백 축소 중...');

    await page.addStyleTag({
      content: `
      /* 메인 컬러 적용 */
      .text-\\[\\#1e3a8a\\] { color: #01B597 !important; }
      .bg-\\[\\#1e3a8a\\] { background-color: #01B597 !important; }
      .border-\\[\\#1e3a8a\\] { border-color: #01B597 !important; }
      
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
        /* 모바일 여백 */
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

    const tempPath = path.join(OUTPUT_DIR, `temp_${tab.name}_${isPC ? 'pc' : 'mobile'}.png`);
    const fullPagePath = path.join(OUTPUT_DIR, `temp_full_${tab.name}_${isPC ? 'pc' : 'mobile'}.png`);

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

    const outputFileName = `${tab.name}_${isPC ? 'PC' : '모바일'}.png`;
    const outputPath = path.join(OUTPUT_DIR, outputFileName);

    await finalImage.toFile(outputPath);

    const metadata = await sharp(outputPath).metadata();
    console.log(`✓ ${isPC ? 'PC' : '모바일'}용 이미지 생성 완료: ${outputPath}`);
    console.log(`  - 크기: ${metadata.width} × ${metadata.height}px`);
    if (!isPC) {
      console.log(`  - CSS 기준: ${Math.round(metadata.width / 3)} × ${Math.round(metadata.height / 3)}px`);
    }

  } catch (error) {
    console.error(`❌ ${tab.name} ${isPC ? 'PC' : '모바일'} 캡처 실패:`, error);
    throw error;
  } finally {
    await browser.close();
  }
}

async function main() {
  for (const tab of tabs) {
    await captureTab(tab, true);
    await captureTab(tab, false);
  }

  console.log('\n=== 모든 이미지 생성 완료 ===');
}

main().catch(console.error);
