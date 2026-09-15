const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function applyWatermark() {
  const outputDir = path.join(__dirname, 'output');

  const watermarkPath = 'c:\\Users\\개미남\\Desktop\\웹개발수업\\project\\bohumstore\\public\\character.png';

  if (!fs.existsSync(watermarkPath)) {
    console.error('워터마크 이미지를 찾을 수 없습니다:', watermarkPath);
    return;
  }

  console.log('워터마크 이미지:', watermarkPath);

  const inputPath = path.join(outputDir, 'bo_coverage_test.png');

  if (!fs.existsSync(inputPath)) {
    console.log('bo_coverage_test.png 파일을 찾을 수 없습니다.');
    return;
  }

  console.log('\nbo_coverage_test.png 처리 중...');

  const metadata = await sharp(inputPath).metadata();
  const width = metadata.width;
  const height = metadata.height;

  console.log(`  원본 크기: ${width} × ${height}px`);

  const spacing = 700;

  // PC 버전 (1200px로 리사이즈, 워터마크 적용)
  const pcWidth = 1200;
  const pcHeight = Math.floor((height / width) * pcWidth);

  const pcWatermarkSize = Math.floor(pcWidth * 0.10);
  const pcWatermarkBuffer = await sharp(watermarkPath)
    .resize(pcWatermarkSize, pcWatermarkSize, { fit: 'contain' })
    .composite([{
      input: Buffer.from([255, 255, 255, Math.floor(255 * 0.08)]),
      raw: {
        width: 1,
        height: 1,
        channels: 4
      },
      tile: true,
      blend: 'dest-in'
    }])
    .png()
    .toBuffer();

  const pcComposites = [];
  for (let y = spacing / 2; y < pcHeight; y += spacing) {
    const left = Math.floor((pcWidth - pcWatermarkSize) / 2);
    const top = Math.floor(y - pcWatermarkSize / 2);

    if (top >= 0 && top + pcWatermarkSize <= pcHeight) {
      pcComposites.push({
        input: pcWatermarkBuffer,
        left: left,
        top: top,
        blend: 'over'
      });
    }
  }

  const pcOutputPath = path.join(outputDir, 'bo_coverage_test_pc.png');
  await sharp(inputPath)
    .resize(pcWidth, pcHeight, { fit: 'contain', background: { r: 255, g: 255, b: 255 } })
    .composite(pcComposites)
    .png()
    .toFile(pcOutputPath);

  console.log(`  ✓ PC 버전 생성: ${pcOutputPath} (${pcWidth} × ${pcHeight}px)`);

  // 모바일 버전 (2400px 폭, 워터마크 적용)
  const mobileWidth = 2400;
  const mobileHeight = Math.floor((height / width) * mobileWidth);

  const mobileWatermarkSize = Math.floor(mobileWidth * 0.10);
  const mobileWatermarkBuffer = await sharp(watermarkPath)
    .resize(mobileWatermarkSize, mobileWatermarkSize, { fit: 'contain' })
    .composite([{
      input: Buffer.from([255, 255, 255, Math.floor(255 * 0.08)]),
      raw: {
        width: 1,
        height: 1,
        channels: 4
      },
      tile: true,
      blend: 'dest-in'
    }])
    .png()
    .toBuffer();

  const mobileComposites = [];
  for (let y = spacing / 2; y < mobileHeight; y += spacing) {
    const left = Math.floor((mobileWidth - mobileWatermarkSize) / 2);
    const top = Math.floor(y - mobileWatermarkSize / 2);

    if (top >= 0 && top + mobileWatermarkSize <= mobileHeight) {
      mobileComposites.push({
        input: mobileWatermarkBuffer,
        left: left,
        top: top,
        blend: 'over'
      });
    }
  }

  const mobileOutputPath = path.join(outputDir, 'bo_coverage_test_mobile.png');
  await sharp(inputPath)
    .resize(mobileWidth, mobileHeight, { fit: 'contain', background: { r: 255, g: 255, b: 255 } })
    .composite(mobileComposites)
    .png()
    .toFile(mobileOutputPath);

  console.log(`  ✓ 모바일 버전 생성: ${mobileOutputPath} (${mobileWidth} × ${mobileHeight}px)`);

  console.log('\n✓ 테스트 이미지 처리 완료!');
}

applyWatermark().catch(console.error);
