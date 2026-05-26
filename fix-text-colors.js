const fs = require('fs');
const path = require('path');

// 변경할 색상 매핑
const colorReplacements = [
  { from: /text-gray-400/g, to: 'text-gray-600' },
  { from: /text-gray-500/g, to: 'text-gray-700' },
  { from: /text-slate-300/g, to: 'text-slate-500' },
  { from: /text-slate-400/g, to: 'text-slate-600' },
];

// 재귀적으로 파일 찾기
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // node_modules, .next 등 제외
      if (!file.startsWith('.') && file !== 'node_modules') {
        findFiles(filePath, fileList);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.js')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// 파일 내용 변경
function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  colorReplacements.forEach(({ from, to }) => {
    if (from.test(content)) {
      content = content.replace(from, to);
      changed = true;
    }
  });
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Updated: ${filePath}`);
    return 1;
  }
  
  return 0;
}

// 실행
const appDir = path.join(__dirname, 'app');
const files = findFiles(appDir);
let updatedCount = 0;

console.log(`Found ${files.length} files to check...\n`);

files.forEach(file => {
  updatedCount += replaceInFile(file);
});

console.log(`\n✅ Complete! Updated ${updatedCount} files.`);
