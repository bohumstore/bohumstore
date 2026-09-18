const playwright = require('playwright');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

async function capturePCVersion(browser, url) {
  const context = await browser.newContext({
    viewport: { width: 1800, height: 15000 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  console.log('\n=== PC용 캡처 시작 (1800px) ===');
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);
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

  // 보험사 컬러 변경 및 여백 축소
  console.log('보험사 컬러 적용 및 여백 축소 중...');
  await page.addStyleTag({
    content: `
      .border-l-4.border-\\[\\#1e3a8a\\] { border-left-color: #D5003E !important; }
      .border-b-2.border-\\[\\#1e3a8a\\] { border-bottom-color: #D5003E !important; }
      .text-\\[\\#1e3a8a\\] { color: #D5003E !important; }
      .bg-\\[\\#1e3a8a\\] { background-color: #D5003E !important; }
      
      /* PC 여백 축소 */
      .space-y-8 { padding-left: 24px !important; padding-right: 24px !important; padding-top: 16px !important; padding-bottom: 8px !important; }
    `
  });

  // 상단 제목 제거
  console.log('상단 제목 제거 중...');
  await page.evaluate(() => {
    const h2 = document.querySelector('h2');
    if (h2 && h2.textContent.includes('해약환급금')) {
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

  await page.waitForTimeout(500);

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

  const tempPath = path.join(outputDir, 'temp_pc.png');
  console.log('스크린샷 촬영 중...');
  await contentElement.screenshot({
    path: tempPath,
    type: 'png',
  });

  await context.close();
  return tempPath;
}

async function captureMobileVersion(browser, url) {
  const context = await browser.newContext({
    viewport: { width: 400, height: 15000 },
    deviceScaleFactor: 3,
  });
  const page = await context.newPage();

  console.log('\n=== 모바일용 캡처 시작 (400px viewport, DPR 3) ===');
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(5000);
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

  // 보험사 컬러 변경
  console.log('보험사 컬러 적용 중...');
  await page.addStyleTag({
    content: `
      .border-l-4.border-\\[\\#1e3a8a\\] { border-left-color: #D5003E !important; }
      .border-b-2.border-\\[\\#1e3a8a\\] { border-bottom-color: #D5003E !important; }
      .text-\\[\\#1e3a8a\\] { color: #D5003E !important; }
      .bg-\\[\\#1e3a8a\\] { background-color: #D5003E !important; }
    `
  });

  // 상단 제목 제거
  console.log('상단 제목 제거 중...');
  await page.evaluate(() => {
    const h2 = document.querySelector('h2');
    if (h2 && h2.textContent.includes('해약환급금')) {
      h2.remove();
    }
  });

  // 모바일 전용 레이아웃 적용
  console.log('모바일 레이아웃 적용 중...');

  // 표를 3개로 분리하여 재생성
  await page.evaluate(() => {
    const tableContainers = document.querySelectorAll('.overflow-x-auto');

    tableContainers.forEach(tableContainer => {
      const originalTable = tableContainer.querySelector('table');
      if (!originalTable) return;

      // 원본 데이터 추출
      const rows = Array.from(originalTable.querySelectorAll('tbody tr'));
      const rowData = rows.map(row => {
        const cells = Array.from(row.querySelectorAll('td'));
        return {
          period: cells[0]?.textContent?.trim() || '',
          premium: cells[1]?.textContent?.trim() || '',
          refund1: cells[2]?.textContent?.trim() || '',
          rate1: cells[3]?.textContent?.trim() || '',
          refund2: cells[4]?.textContent?.trim() || '',
          rate2: cells[5]?.textContent?.trim() || '',
          refund3: cells[6]?.textContent?.trim() || '',
          rate3: cells[7]?.textContent?.trim() || '',
          is10Year: cells[0]?.textContent?.trim() === '10년'
        };
      });

      // 3개의 표 생성
      const scenarios = [
        { title: '㉠ 현재 공시이율 가정시', refundKey: 'refund1', rateKey: 'rate1' },
        { title: '㉡ 공시이율 1.5%p 상승시', refundKey: 'refund2', rateKey: 'rate2' },
        { title: '㉢ 최저해약환급금', refundKey: 'refund3', rateKey: 'rate3' }
      ];

      const container = document.createElement('div');
      container.style.cssText = 'display: flex; flex-direction: column; gap: 1.5rem; width: 100%;';

      scenarios.forEach(scenario => {
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'width: 100%;';

        const title = document.createElement('h4');
        title.textContent = scenario.title;
        title.style.cssText = 'font-size: 13px; font-weight: bold; margin-bottom: 0.5rem; color: #1f2937;';
        wrapper.appendChild(title);

        const table = document.createElement('table');
        table.style.cssText = 'width: 100%; border-collapse: collapse; font-size: 10px; table-layout: fixed;';

        // 헤더
        const thead = document.createElement('thead');
        thead.innerHTML = `
          <tr style="background-color: #D5003E; color: white;">
            <th style="border: 1px solid #d1d5db; padding: 4px 2px; text-align: center; font-size: 9px; width: 15%;">경과<br/>기간</th>
            <th style="border: 1px solid #d1d5db; padding: 4px 2px; text-align: center; font-size: 9px; width: 30%;">납입보험료<br/>누계(USD)</th>
            <th style="border: 1px solid #d1d5db; padding: 4px 2px; text-align: center; font-size: 9px; width: 30%;">해약환급금<br/>(USD)</th>
            <th style="border: 1px solid #d1d5db; padding: 4px 2px; text-align: center; font-size: 9px; width: 25%;">해약<br/>환급률(%)</th>
          </tr>
        `;
        table.appendChild(thead);

        // 바디
        const tbody = document.createElement('tbody');
        rowData.forEach((data, idx) => {
          const tr = document.createElement('tr');

          if (data.is10Year) {
            tr.style.cssText = 'background: linear-gradient(to right, #fef2f2, #fce7f3); border-left: 3px solid #ef4444;';
          } else {
            tr.style.backgroundColor = idx % 2 === 0 ? '#ffffff' : '#f9fafb';
          }

          const cellStyle = data.is10Year
            ? 'border: 1px solid #d1d5db; padding: 5px 2px; font-weight: bold; color: #991b1b; font-size: 9px;'
            : 'border: 1px solid #d1d5db; padding: 4px 2px; font-size: 9px;';

          tr.innerHTML = `
            <td style="${cellStyle} text-align: center;">${data.period}</td>
            <td style="${cellStyle} text-align: right;">${data.premium}</td>
            <td style="${cellStyle} text-align: right;">${data[scenario.refundKey]}</td>
            <td style="${cellStyle} text-align: right;">${data[scenario.rateKey]}</td>
          `;
          tbody.appendChild(tr);
        });
        table.appendChild(tbody);

        wrapper.appendChild(table);
        container.appendChild(wrapper);
      });

      tableContainer.innerHTML = '';
      tableContainer.appendChild(container);
    });
  });

  // 모바일 스타일 및 여백 축소 적용
  await page.addStyleTag({
    content: `
      /* 기본 폰트 크기 */
      body { font-size: 14px !important; }
      h2 { font-size: 18px !important; }
      h3 { font-size: 15px !important; }
      
      /* 모바일 여백 축소 */
      .space-y-8 { padding-left: 16px !important; padding-right: 16px !important; padding-top: 12px !important; padding-bottom: 8px !important; }
      .space-y-8 > * + * { margin-top: 1.5rem !important; }
      .space-y-4 > * + * { margin-top: 1rem !important; }
      
      /* 주석 크기 */
      .text-xs { font-size: 10px !important; line-height: 1.4 !important; }
    `
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
      if (style.position === 'fixed') {
        btn.remove();
      }
    });
  });

  await page.waitForTimeout(1000);

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

  console.log(`콘텐츠 높이: ${contentHeight}px (CSS 기준)`);
  console.log(`최종 PNG 높이: ${contentHeight * 3}px`);

  const outputDir = path.join(__dirname, 'output');
  const tempPath = path.join(outputDir, 'temp_mobile.png');

  console.log('스크린샷 촬영 중...');
  await contentElement.screenshot({
    path: tempPath,
    type: 'png',
  });

  await context.close();
  return tempPath;
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

  for (let y = startTop; y < imageHeight + wmSize; y += wmGap) {
    composites.push({
      input: watermarkBuffer,
      top: y,
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
    // Surrender-2026을 Surrender로 임시 변경
    const fs = require('fs');
    const surrender2026Path = 'C:\\Users\\개미남\\Desktop\\웹개발수업\\project\\bohumstore\\app\\insurance\\oneshot\\aia\\dollar\\components\\BodyTabViews\\Surrender-2026.tsx';
    const surrenderPath = 'C:\\Users\\개미남\\Desktop\\웹개발수업\\project\\bohumstore\\app\\insurance\\oneshot\\aia\\dollar\\components\\BodyTabViews\\Surrender.tsx';
    const backupPath = 'C:\\Users\\개미남\\Desktop\\웹개발수업\\project\\bohumstore\\app\\insurance\\oneshot\\aia\\dollar\\components\\BodyTabViews\\Surrender-backup.tsx';

    console.log('Surrender-2026을 Surrender로 임시 변경...');
    fs.copyFileSync(surrender2026Path, surrenderPath);

    // PC용 캡처
    const pcTempPath = await capturePCVersion(browser, url);
    if (pcTempPath) {
      const pcOutputPath = path.join(path.dirname(pcTempPath), '해약환급금_PC.png');
      await addWatermark(pcTempPath, pcOutputPath, true);
      fs.unlinkSync(pcTempPath);

      const pcMetadata = await sharp(pcOutputPath).metadata();
      console.log(`✓ PC용 이미지 생성 완료: ${pcOutputPath}`);
      console.log(`  - 크기: ${pcMetadata.width} × ${pcMetadata.height}px`);
    }

    // 모바일용 캡처
    const mobileTempPath = await captureMobileVersion(browser, url);
    if (mobileTempPath) {
      const mobileOutputPath = path.join(path.dirname(mobileTempPath), '해약환급금_모바일.png');
      await addWatermark(mobileTempPath, mobileOutputPath, false);
      fs.unlinkSync(mobileTempPath);

      const mobileMetadata = await sharp(mobileOutputPath).metadata();
      console.log(`✓ 모바일용 이미지 생성 완료: ${mobileOutputPath}`);
      console.log(`  - 크기: ${mobileMetadata.width} × ${mobileMetadata.height}px`);
      console.log(`  - CSS 기준: ${mobileMetadata.width / 3} × ${mobileMetadata.height / 3}px`);
    }

    // 원본 복원
    console.log('\n원본 Surrender.tsx 복원 중...');
    const cleanSurrenderCode = `import React from 'react'
import Surrender2026 from './Surrender-2026'

export default function Surrender() {
  return <Surrender2026 />
}
`;
    fs.writeFileSync(surrenderPath, cleanSurrenderCode, 'utf8');
    console.log('복원 완료!');

    console.log('\n=== 모든 이미지 생성 완료 ===');
  } catch (error) {
    console.error('오류 발생:', error);
  } finally {
    await browser.close();
  }
})();
