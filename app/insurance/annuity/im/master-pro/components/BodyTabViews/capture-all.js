const { chromium } = require('playwright');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.join(__dirname, 'output');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const WATERMARK_PATH = path.join(__dirname, '../../../../../../../public/character.png');
const BRAND_COLOR = '#01B597';
const SIDE_PADDING_PC = 40;
const SIDE_PADDING_MOBILE = 16;
const BASE_URL = 'http://localhost:3000/insurance/annuity/im/master-pro';

const pages = [
  { name: '상품정보', url: `${BASE_URL}/productinfo-capture`, splitTables: false },
  { name: '보장내용', url: `${BASE_URL}/coverage-capture`, splitTables: false },
  { name: '해약환급금', url: `${BASE_URL}/surrender-capture`, splitTables: true },
  { name: '가입시알아두실사항', url: `${BASE_URL}/notice-capture`, splitTables: false },
];

// 모바일: 13열 이상의 넓은 표를 시나리오(투자수익률 가정)별 표로 분리
async function splitWideTablesForMobile(page) {
  await page.evaluate((color) => {
    document.querySelectorAll('table').forEach((table) => {
      const headRows = table.querySelectorAll('thead tr');
      if (headRows.length !== 2) return;

      const scenarioCells = Array.from(headRows[0].querySelectorAll('th')).filter((th) => th.colSpan === 4);
      if (scenarioCells.length === 0) return;

      const subHeaders = Array.from(headRows[1].querySelectorAll('th')).map((th) => th.innerHTML);
      const bodyRows = Array.from(table.querySelectorAll('tbody tr')).map((tr) =>
        Array.from(tr.querySelectorAll('td')).map((td) => td.textContent.trim())
      );

      const container = document.createElement('div');
      container.style.cssText = 'display:flex;flex-direction:column;gap:16px;width:100%;';

      scenarioCells.forEach((cell, idx) => {
        const wrapper = document.createElement('div');

        const title = document.createElement('div');
        title.style.cssText = 'font-size:12px;font-weight:bold;color:#1f2937;margin-bottom:6px;';
        title.innerHTML = cell.innerHTML.replace(/<br\s*\/?>/g, ' ');
        wrapper.appendChild(title);

        const t = document.createElement('table');
        t.style.cssText = 'width:100%;border-collapse:collapse;table-layout:fixed;text-align:center;';

        const thStyle = `border:1px solid #d1d5db;padding:4px 1px;font-size:10px;background:${color};color:#fff;`;
        const tdStyle = 'border:1px solid #d1d5db;padding:5px 1px;font-size:10px;';
        const widths = ['13%', '15%', '16%', '14%', '14%', '14%', '14%'];

        const fixedHead = ['구분', '납입<br>보험료<br>(A)', '특별계정<br>투입금액<br>누계'];
        const scenarioHead = subHeaders.slice(idx * 4, idx * 4 + 4);
        const headCells = fixedHead.concat(scenarioHead)
          .map((h, i) => `<th style="${thStyle}width:${widths[i]};">${h}</th>`)
          .join('');
        t.innerHTML = `<thead><tr>${headCells}</tr></thead>`;

        const tbody = document.createElement('tbody');
        bodyRows.forEach((cells, rowIdx) => {
          const start = 3 + idx * 4;
          const picked = cells.slice(0, 3).concat(cells.slice(start, start + 4));
          const tr = document.createElement('tr');
          tr.style.backgroundColor = rowIdx % 2 === 0 ? '#ffffff' : '#f9fafb';
          tr.innerHTML = picked.map((v) => `<td style="${tdStyle}">${v}</td>`).join('');
          tbody.appendChild(tr);
        });
        t.appendChild(tbody);

        wrapper.appendChild(t);
        container.appendChild(wrapper);
      });

      const holder = table.closest('.overflow-x-auto') || table.parentElement;
      holder.innerHTML = '';
      holder.appendChild(container);
    });
  }, BRAND_COLOR);
}

async function capturePage(pageInfo, isPC) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: isPC ? { width: 960, height: 1200 } : { width: 400, height: 800 },
    deviceScaleFactor: isPC ? 1 : 3,
  });

  const page = await context.newPage();
  const label = isPC ? 'PC' : '모바일';

  try {
    console.log(`\n=== ${pageInfo.name} ${label}용 캡처 시작 ===`);

    await page.goto(pageInfo.url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000);
    await page.waitForSelector('h2, table', { timeout: 10000 });

    await page.addStyleTag({
      content: `
      .text-\\[\\#1e3a8a\\] { color: ${BRAND_COLOR} !important; }
      .bg-\\[\\#1e3a8a\\] { background-color: ${BRAND_COLOR} !important; }
      .border-\\[\\#1e3a8a\\] { border-color: ${BRAND_COLOR} !important; }
      .fixed { display: none !important; }
      `
    });

    await page.evaluate((sidePadding) => {
      const root = document.querySelector('div.space-y-8') || document.querySelector('h2').parentElement;
      root.style.paddingLeft = `${sidePadding}px`;
      root.style.paddingRight = `${sidePadding}px`;
    }, isPC ? SIDE_PADDING_PC : SIDE_PADDING_MOBILE);

    if (!isPC && pageInfo.splitTables) {
      console.log('모바일용 표 분리 중...');
      await splitWideTablesForMobile(page);
    }

    await page.waitForTimeout(1000);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);

    const contentInfo = await page.evaluate(() => {
      const content = document.querySelector('div.space-y-8') || document.querySelector('h2').parentElement;
      const rect = content.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      return {
        x: rect.left,
        y: rect.top + scrollY,
        width: rect.width,
        height: content.scrollHeight,
      };
    });

    const scale = isPC ? 1 : 3;
    const finalHeight = contentInfo.height * scale;
    console.log(`콘텐츠 높이: ${contentInfo.height}px${isPC ? '' : ' (CSS 기준)'}`);

    const fullPagePath = path.join(OUTPUT_DIR, `temp_full_${pageInfo.name}_${isPC ? 'pc' : 'mobile'}.png`);
    await page.screenshot({ path: fullPagePath, fullPage: true });
    const fullMeta = await sharp(fullPagePath).metadata();

    const extractLeft = Math.max(0, Math.round(contentInfo.x * scale));
    const extractTop = Math.max(0, Math.round(contentInfo.y * scale));
    const extractWidth = Math.min(Math.round(contentInfo.width * scale), fullMeta.width - extractLeft);
    const extractHeight = Math.min(Math.round(contentInfo.height * scale), fullMeta.height - extractTop);

    const screenshot = await sharp(fullPagePath)
      .extract({ left: extractLeft, top: extractTop, width: extractWidth, height: extractHeight })
      .toBuffer();
    fs.unlinkSync(fullPagePath);

    const watermarkSize = isPC ? 180 : 390;
    const startTop = isPC ? 360 : 1080;
    const gap = isPC ? 520 : 1560;
    const opacity = 0.06;

    const watermarkBuffer = await sharp(WATERMARK_PATH)
      .resize(watermarkSize, watermarkSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .composite([{
        input: Buffer.from([255, 255, 255, Math.round(255 * opacity)]),
        raw: { width: 1, height: 1, channels: 4 },
        tile: true,
        blend: 'dest-in',
      }])
      .toBuffer();

    const composites = [];
    for (let top = startTop; top < finalHeight; top += gap) {
      composites.push({
        input: watermarkBuffer,
        top,
        left: Math.floor((extractWidth - watermarkSize) / 2),
        blend: 'over',
      });
    }
    console.log(`워터마크 (${label}): 크기 ${watermarkSize}px / 시작 ${startTop}px / 간격 ${gap}px / ${composites.length}개`);

    const outputPath = path.join(OUTPUT_DIR, `${pageInfo.name}_${label}.png`);
    await sharp(screenshot).composite(composites).png().toFile(outputPath);

    const meta = await sharp(outputPath).metadata();
    console.log(`✓ ${label}용 이미지 생성 완료: ${outputPath}`);
    console.log(`  - 크기: ${meta.width} × ${meta.height}px`);
  } catch (error) {
    console.error(`❌ ${pageInfo.name} ${label} 캡처 실패:`, error);
  } finally {
    await context.close();
    await browser.close();
  }
}

(async () => {
  const only = process.argv[2];
  for (const pageInfo of pages.filter((p) => !only || p.name === only)) {
    await capturePage(pageInfo, true);
    await capturePage(pageInfo, false);
  }
  console.log('\n=== 모든 이미지 생성 완료 ===');
})();
