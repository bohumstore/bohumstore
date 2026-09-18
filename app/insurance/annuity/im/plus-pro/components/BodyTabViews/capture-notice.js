const { chromium } = require('playwright');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.join(__dirname, 'output');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const WATERMARK_PATH = path.join(__dirname, '../../../../../../../public/character.png');

async function captureNotice() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1800, height: 1200 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();

  try {
    console.log('\n=== 가입시 알아두실 사항 PC용 캡처 시작 ===');
    console.log('가입시 알아두실 사항 페이지 로딩 중...');
    await page.goto('http://localhost:3000/insurance/annuity/im/plus-pro/notice-capture', {
      waitUntil: 'networkidle',
      timeout: 60000
    });

    console.log('보험사 컬러 적용 및 여백 축소 중...');
    await page.addStyleTag({
      content: `
      /* 메인 컬러 적용 */
      .text-\\[\\#1e3a8a\\] { color: #01B597 !important; }
      .bg-\\[\\#1e3a8a\\] { background-color: #01B597 !important; }
      .border-\\[\\#1e3a8a\\] { border-color: #01B597 !important; }
      
      /* 제목과 밑줄은 검은색으로 */
      h2.text-2xl.border-b-2 { color: #222 !important; border-color: #222 !important; }
      
      /* 플로팅 UI 제거 */
      .fixed { display: none !important; }
      
      /* PC 여백 */
      .px-6 { padding-left: 32px !important; padding-right: 32px !important; padding-top: 16px !important; }
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
      const content = document.querySelector('.px-6');
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

    // 스크린샷 촬영 (fullPage로 촬영 후 영역만 잘라내기)
    console.log('스크린샷 촬영 중...');

    const fullPagePath = path.join(OUTPUT_DIR, `temp_full_notice_pc.png`);

    await page.screenshot({
      path: fullPagePath,
      fullPage: true
    });

    // 전체 페이지 이미지 크기 확인
    const fullPageMetadata = await sharp(fullPagePath).metadata();

    // Sharp로 영역만 잘라내기
    const extractLeft = Math.max(0, Math.round(contentInfo.x));
    const extractTop = Math.max(0, Math.round(contentInfo.y));
    const extractWidth = Math.min(Math.round(contentInfo.width), fullPageMetadata.width - extractLeft);
    const extractHeight = Math.min(Math.round(contentInfo.height), fullPageMetadata.height - extractTop);

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
    const watermarkSize = 180;
    const startTop = 360;
    const gap = 520;
    const opacity = 0.06;

    console.log(`워터마크 설정 (PC): 크기 ${watermarkSize}px / 시작 ${startTop}px / 간격 ${gap}px / 투명도 ${opacity * 100}%`);

    const watermarkCount = Math.floor((contentInfo.height - startTop) / gap) + 1;
    const watermarks = [];

    for (let i = 0; i < watermarkCount; i++) {
      const top = startTop + (i * gap);
      if (top + watermarkSize <= contentInfo.height) {
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

    const outputPath = path.join(OUTPUT_DIR, '가입시알아두실사항_PC.png');
    await finalImage.toFile(outputPath);

    const metadata = await sharp(outputPath).metadata();
    console.log(`✓ PC용 이미지 생성 완료: ${outputPath}`);
    console.log(`  - 크기: ${metadata.width} × ${metadata.height}px`);

  } catch (error) {
    console.error('❌ 가입시 알아두실 사항 캡처 실패:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

captureNotice().then(() => {
  console.log('\n=== 가입시 알아두실 사항 이미지 생성 완료 ===');
}).catch(console.error);
