const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function applyWatermark() {
  const outputDir = path.join(__dirname, 'output');

  // 워터마크 이미지 경로 (public/character.png)
  const watermarkPath = 'c:\\Users\\개미남\\Desktop\\웹개발수업\\project\\bohumstore\\public\\character.png';

  // 워터마크 이미지가 없으면 종료
  if (!fs.existsSync(watermarkPath)) {
    console.error('워터마크 이미지를 찾을 수 없습니다:', watermarkPath);
    return;
  }

  console.log('워터마크 이미지:', watermarkPath);

  // 처리할 이미지 목록
  const images = [
    { name: 'bo_coverage.png', createMobile: true },
    { name: 'bo_insurance.png', createMobile: true },
    { name: 'bo_surrender.png', createMobile: true },
    { name: 'bo_notice.png', createMobile: false }
  ];

  for (const img of images) {
    const inputPath = path.join(outputDir, img.name);

    if (!fs.existsSync(inputPath)) {
      console.log(`${img.name} 파일을 찾을 수 없습니다. 건너뜁니다.`);
      continue;
    }

    console.log(`\n${img.name} 처리 중...`);

    // 원본 이미지 메타데이터
    const metadata = await sharp(inputPath).metadata();
    const width = metadata.width;
    const height = metadata.height;

    console.log(`  원본 크기: ${width} × ${height}px`);

    // 워터마크 크기 조정 (원본 이미지 너비의 10% 정도)
    const watermarkSize = Math.floor(width * 0.10);

    // 워터마크 준비 (투명도 8% = opacity 0.08)
    const watermarkBuffer = await sharp(watermarkPath)
      .resize(watermarkSize, watermarkSize, { fit: 'contain' })
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

    // 워터마크 배치 계산 (700px 간격, 가운데 정렬)
    const spacing = 700;
    const composites = [];

    // 세로 방향으로 워터마크 배치
    for (let y = spacing / 2; y < height; y += spacing) {
      const left = Math.floor((width - watermarkSize) / 2);
      const top = Math.floor(y - watermarkSize / 2);

      if (top >= 0 && top + watermarkSize <= height) {
        composites.push({
          input: watermarkBuffer,
          left: left,
          top: top,
          blend: 'over'
        });
      }
    }

    // PC 버전 (1200px로 리사이즈, 워터마크 적용)
    const pcWidth = 1200;
    const pcHeight = Math.floor((height / width) * pcWidth);

    // PC용 워터마크 크기 (절대값 고정)
    const pcWatermarkSize = 240;
    const pcWatermarkBuffer = await sharp(watermarkPath)
      .resize(pcWatermarkSize, pcWatermarkSize, { fit: 'contain' })
      .composite([{
        input: Buffer.from([255, 255, 255, Math.floor(255 * 0.07)]),
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

    // PC용 워터마크 배치
    const pcComposites = [];
    for (let y = spacing / 2; y < pcHeight + spacing; y += spacing) {
      const left = Math.floor((pcWidth - pcWatermarkSize) / 2);
      const top = Math.floor(y - pcWatermarkSize / 2);

      pcComposites.push({
        input: pcWatermarkBuffer,
        left: left,
        top: top,
        blend: 'over'
      });
    }

    const pcOutputPath = path.join(outputDir, img.name.replace('.png', '_pc.png'));
    await sharp(inputPath)
      .resize(pcWidth, pcHeight, { fit: 'contain', background: { r: 255, g: 255, b: 255 } })
      .composite(pcComposites)
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(pcOutputPath);

    console.log(`  ✓ PC 버전 생성: ${pcOutputPath} (${pcWidth} × ${pcHeight}px)`);

    // 모바일 버전 (2400px 폭, 워터마크 적용)
    if (img.createMobile) {
      const mobileWidth = 2400;
      const mobileHeight = Math.floor((height / width) * mobileWidth);

      // 모바일용 워터마크 크기 (PC의 2배 - 비율 유지)
      const mobileWatermarkSize = 480;
      const mobileWatermarkBuffer = await sharp(watermarkPath)
        .resize(mobileWatermarkSize, mobileWatermarkSize, { fit: 'contain' })
        .composite([{
          input: Buffer.from([255, 255, 255, Math.floor(255 * 0.07)]),
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

      // 모바일용 워터마크 배치 (간격 2배)
      const mobileSpacing = spacing * 2; // 1400px
      const mobileComposites = [];
      for (let y = mobileSpacing / 2; y < mobileHeight + mobileSpacing; y += mobileSpacing) {
        const left = Math.floor((mobileWidth - mobileWatermarkSize) / 2);
        const top = Math.floor(y - mobileWatermarkSize / 2);

        mobileComposites.push({
          input: mobileWatermarkBuffer,
          left: left,
          top: top,
          blend: 'over'
        });
      }

      const mobileOutputPath = path.join(outputDir, img.name.replace('.png', '_mobile.png'));
      await sharp(inputPath)
        .resize(mobileWidth, mobileHeight, { fit: 'contain', background: { r: 255, g: 255, b: 255 } })
        .composite(mobileComposites)
        .png({ quality: 85, compressionLevel: 9, adaptiveFiltering: true, palette: true })
        .toFile(mobileOutputPath);

      console.log(`  ✓ 모바일 버전 생성: ${mobileOutputPath} (${mobileWidth} × ${mobileHeight}px)`);
    }
  }

  console.log('\n✓ 모든 이미지 처리 완료!');
}

applyWatermark().catch(console.error);
