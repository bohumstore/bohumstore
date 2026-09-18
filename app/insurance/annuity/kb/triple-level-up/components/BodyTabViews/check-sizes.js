const sharp = require('sharp');
const path = require('path');

const outputDir = path.join(__dirname, 'output');

const files = [
  '보장내용_PC.png',
  '보장내용_모바일.png',
  '해약환급금_PC.png',
  '해약환급금_모바일.png',
  '가입안내_PC.png',
  '가입안내_모바일.png',
  '가입시알아두실사항_PC.png'
];

async function checkSizes() {
  console.log('\n=== 이미지 사이즈 체크 ===\n');
  
  const pcImages = [];
  const mobileImages = [];
  
  for (const file of files) {
    const filePath = path.join(outputDir, file);
    try {
      const metadata = await sharp(filePath).metadata();
      const info = {
        name: file,
        width: metadata.width,
        height: metadata.height
      };
      
      if (file.includes('PC')) {
        pcImages.push(info);
      } else {
        mobileImages.push(info);
      }
      
      console.log(`${file}`);
      console.log(`  - 크기: ${metadata.width} × ${metadata.height}px`);
      if (file.includes('모바일')) {
        console.log(`  - CSS 기준: ${Math.round(metadata.width / 3)} × ${Math.round(metadata.height / 3)}px`);
      }
      console.log('');
    } catch (error) {
      console.log(`${file}: 파일 없음\n`);
    }
  }
  
  console.log('\n=== PC 이미지 폭 체크 ===');
  const pcWidths = [...new Set(pcImages.map(img => img.width))];
  if (pcWidths.length === 1) {
    console.log(`✅ 모든 PC 이미지 폭 동일: ${pcWidths[0]}px`);
  } else {
    console.log(`❌ PC 이미지 폭이 다름:`);
    pcImages.forEach(img => console.log(`  - ${img.name}: ${img.width}px`));
  }
  
  console.log('\n=== 모바일 이미지 폭 체크 ===');
  const mobileWidths = [...new Set(mobileImages.map(img => img.width))];
  if (mobileWidths.length === 1) {
    console.log(`✅ 모든 모바일 이미지 폭 동일: ${mobileWidths[0]}px`);
  } else {
    console.log(`❌ 모바일 이미지 폭이 다름:`);
    mobileImages.forEach(img => console.log(`  - ${img.name}: ${img.width}px`));
  }
}

checkSizes();
