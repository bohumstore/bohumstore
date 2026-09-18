const sharp = require('sharp');
const path = require('path');

async function checkSizes() {
  console.log('\n=== KB 트리플 레벨업 ===');
  const kbPath = 'app/insurance/annuity/kb/triple-level-up/components/BodyTabViews/output';
  
  const kbPC = await sharp(path.join(kbPath, '가입안내_PC.png')).metadata();
  console.log(`가입안내 PC: ${kbPC.width} × ${kbPC.height}px`);
  
  const kbMobile = await sharp(path.join(kbPath, '가입안내_모바일.png')).metadata();
  console.log(`가입안내 모바일: ${kbMobile.width} × ${kbMobile.height}px (CSS: ${Math.round(kbMobile.width/3)} × ${Math.round(kbMobile.height/3)}px)`);
  
  const kbSurrender = await sharp(path.join(kbPath, '해약환급금_PC.png')).metadata();
  console.log(`해약환급금 PC: ${kbSurrender.width} × ${kbSurrender.height}px`);
  
  console.log('\n=== IM Plus PRO ===');
  const imPath = 'app/insurance/annuity/im/plus-pro/components/BodyTabViews/output';
  
  const imPC = await sharp(path.join(imPath, '상품 정보_PC.png')).metadata();
  console.log(`상품 정보 PC: ${imPC.width} × ${imPC.height}px`);
  
  const imMobile = await sharp(path.join(imPath, '상품 정보_모바일.png')).metadata();
  console.log(`상품 정보 모바일: ${imMobile.width} × ${imMobile.height}px (CSS: ${Math.round(imMobile.width/3)} × ${Math.round(imMobile.height/3)}px)`);
  
  const imSurrender = await sharp(path.join(imPath, '해약환급금_PC.png')).metadata();
  console.log(`해약환급금 PC: ${imSurrender.width} × ${imSurrender.height}px`);
  
  const imNotice = await sharp(path.join(imPath, '가입시알아두실사항_PC.png')).metadata();
  console.log(`가입시알아두실사항 PC: ${imNotice.width} × ${imNotice.height}px`);
}

checkSizes().catch(console.error);
