const { chromium } = require('playwright');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.join(__dirname, 'output');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const WATERMARK_PATH = path.join(__dirname, '../../../../../../../public/character.png');

// 캡처할 페이지 정보
const pages = [
  { name: '보장내용', url: '/insurance/annuity/metlife/only-dollar/coverage-capture', urlMobile: null },
  { name: '가입안내', url: '/insurance/annuity/metlife/only-dollar/productinfo-capture', urlMobile: null },
  { name: '해약환급금예시표', url: '/insurance/annuity/metlife/only-dollar/surrender-capture', urlMobile: '/insurance/annuity/metlife/only-dollar/surrender-mobile-capture' },
  { name: '가입시알아두실사항', url: '/insurance/annuity/metlife/only-dollar/notice-capture', urlMobile: null }
];

async function capturePage(pageInfo, isPC) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: isPC ? { width: 960, height: 1200 } : { width: 400, height: 800 },
    deviceScaleFactor: isPC ? 1 : 3,
  });

  const page = await context.newPage();

  try {
    console.log(`\n=== ${pageInfo.name} ${isPC ? 'PC' : '모바일'}용 캡처 시작 ===`);

    const targetUrl = (isPC || !pageInfo.urlMobile) ? pageInfo.url : pageInfo.urlMobile;
    console.log('페이지 로딩 중...');
    await page.goto(`http://localhost:3000${targetUrl}`, {
      waitUntil: 'networkidle',
      timeout: 60000
    });
    await page.waitForTimeout(3000);

    // 콘텐츠가 로드될 때까지 대기
    await page.waitForSelector('div.space-y-8', { timeout: 10000 }).catch(() => {
      console.log('space-y-8 클래스를 찾지 못했습니다. 계속 진행합니다.');
    });

    console.log('스타일 적용 중...');
    await page.addStyleTag({
      content: `
      /* 메인 컬러 적용 */
      .text-\\[\\#1e3a8a\\] { color: #003652 !important; }
      .bg-\\[\\#1e3a8a\\] { background-color: #003652 !important; }
      .border-\\[\\#1e3a8a\\] { border-color: #003652 !important; }
      .border-l-\\[\\#1e3a8a\\] { border-left-color: #003652 !important; }
      
      /* 플로팅 UI 제거 */
      .fixed { display: none !important; }
      [class*="fixed"] { display: none !important; }
      button[class*="rounded-full"] { display: none !important; }
      button[class*="z-50"] { display: none !important; }
      button[class*="z-40"] { display: none !important; }
      [class*="scroll"] { display: none !important; }
      
      /* 개발 버튼 제거 */
      button:has-text("개발") { display: none !important; }
      `
    });

    await page.waitForTimeout(1000);

    // 페이지 스크롤
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);

    // 콘텐츠 영역 측정
    const contentInfo = await page.evaluate(() => {
      const content = document.querySelector('div.space-y-8') || document.querySelector('.max-w-4xl');

      if (content) {
        const rect = content.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;

        return {
          x: rect.left,
          y: rect.top + scrollY,
          width: rect.width,
          height: content.scrollHeight
        };
      }

      // fallback: body 전체 사용
      return {
        x: 0,
        y: 0,
        width: document.body.clientWidth,
        height: document.body.scrollHeight
      };
    });

    if (!contentInfo) {
      throw new Error('콘텐츠 영역을 찾을 수 없습니다');
    }

    console.log(`콘텐츠 높이: ${contentInfo.height}px${isPC ? '' : ' (CSS 기준)'}`);
    const finalHeight = isPC ? contentInfo.height : contentInfo.height * 3;
    if (!isPC) {
      console.log(`최종 PNG 높이: ${finalHeight}px`);
    }

    console.log('스크린샷 촬영 중...');

    // fullPage로 촬영 후 영역만 잘라내기
    const fullPagePath = path.join(OUTPUT_DIR, `temp_full_${pageInfo.name}_${isPC ? 'pc' : 'mobile'}.png`);
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

    // 워터마크 적용
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
      if (top < finalHeight) {  // 하단 일부 잘림 허용
        watermarks.push({
          top: top,
          left: Math.floor((extractWidth - watermarkSize) / 2)
        });
      }
    }

    console.log(`워터마크 적용 완료: ${watermarks.length}개 배치`);

    // 워터마크 버퍼 생성 (투명도 적용)
    const watermarkBuffer = await sharp(WATERMARK_PATH)
      .resize(watermarkSize, watermarkSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .composite([{
        input: Buffer.from([255, 255, 255, Math.round(255 * opacity)]),
        raw: { width: 1, height: 1, channels: 4 },
        tile: true,
        blend: 'dest-in'
      }])
      .toBuffer();

    // 워터마크 배치 정보 생성
    const compositeArray = watermarks.map(wm => ({
      input: watermarkBuffer,
      top: wm.top,
      left: wm.left,
      blend: 'over'
    }));

    let finalImage = sharp(screenshot);

    if (compositeArray.length > 0) {
      finalImage = finalImage.composite(compositeArray);
    }

    const outputFileName = `${pageInfo.name}_${isPC ? 'PC' : '모바일'}.png`;
    const outputPath = path.join(OUTPUT_DIR, outputFileName);

    await finalImage.toFile(outputPath);

    const metadata = await sharp(outputPath).metadata();
    console.log(`✓ ${isPC ? 'PC' : '모바일'}용 이미지 생성 완료: ${outputPath}`);
    console.log(`  - 크기: ${metadata.width} × ${metadata.height}px`);
    if (!isPC) {
      console.log(`  - CSS 기준: ${Math.round(metadata.width / 3)} × ${Math.round(metadata.height / 3)}px`);
    }

    await context.close();
    await browser.close();

  } catch (error) {
    console.error('오류 발생:', error);
    await context.close();
    await browser.close();
  }
}

(async () => {
  for (const pageInfo of pages) {
    // PC 캡처
    await capturePage(pageInfo, true);

    // 모바일 캡처
    await capturePage(pageInfo, false);
  }

  console.log('\n=== 모든 이미지 생성 완료 ===');
})();
