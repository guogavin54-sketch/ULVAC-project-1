const fs = require('fs');
const path = require('path');

console.log('=== 验证页面特效和1280宽度 ===\n');

let allPassed = true;

// 1. 检查tokens.css中的容器宽度
console.log('1. 检查tokens.css中的容器宽度...');
const tokensPath = path.join(__dirname, '../css/tokens.css');
const tokensContent = fs.readFileSync(tokensPath, 'utf8');
if (tokensContent.includes('--container-max-width: 1280px')) {
  console.log('   ✓ 容器最大宽度设置为1280px');
} else {
  console.log('   ✗ 容器最大宽度未设置为1280px');
  allPassed = false;
}

// 2. 检查animations.css中的特效动画
console.log('\n2. 检查animations.css中的特效动画...');
const animationsPath = path.join(__dirname, '../css/animations.css');
const animationsContent = fs.readFileSync(animationsPath, 'utf8');

const requiredAnimations = [
  '@keyframes text-gradient-flow',
  '@keyframes text-ray-sweep',
  '.text-glow-effect'
];

for (const animation of requiredAnimations) {
  if (animationsContent.includes(animation)) {
    console.log(`   ✓ 找到 ${animation}`);
  } else {
    console.log(`   ✗ 未找到 ${animation}`);
    allPassed = false;
  }
}

// 3. 检查style.css中的卡片hover样式
console.log('\n3. 检查style.css中的卡片hover样式...');
const stylePath = path.join(__dirname, '../css/style.css');
const styleContent = fs.readFileSync(stylePath, 'utf8');

const requiredStyles = [
  '.business-card:hover h3',
  '.news-card:hover h3',
  'linear-gradient(to right, #0f66ad, #1c7dcd, #0f66ad)',
  'animation: text-gradient-flow'
];

for (const style of requiredStyles) {
  if (styleContent.includes(style)) {
    console.log(`   ✓ 找到 ${style}`);
  } else {
    console.log(`   ✗ 未找到 ${style}`);
    allPassed = false;
  }
}

// 4. 检查index.html中的text-glow-effect类
console.log('\n4. 检查index.html中的text-glow-effect类...');
const indexPath = path.join(__dirname, '../index.html');
const indexContent = fs.readFileSync(indexPath, 'utf8');

if (indexContent.includes('text-glow-effect')) {
  console.log('   ✓ 找到text-glow-effect类');
  
  // 统计有多少个h3标题使用了这个类
  const matches = indexContent.match(/text-glow-effect/g);
  console.log(`   ✓ 共有 ${matches ? matches.length : 0} 个元素使用了text-glow-effect类`);
} else {
  console.log('   ✗ 未找到text-glow-effect类');
  allPassed = false;
}

// 5. 检查是否移除了Bootstrap
console.log('\n5. 检查是否移除了Bootstrap...');
if (!indexContent.includes('bootstrap') && !indexContent.includes('Bootstrap')) {
  console.log('   ✓ 未找到Bootstrap相关代码');
} else {
  console.log('   ✗ 找到Bootstrap相关代码');
  allPassed = false;
}

// 总结
console.log('\n=== 验证结果 ===');
if (allPassed) {
  console.log('✅ 所有验证通过！页面包含：');
  console.log('   - 1280px容器宽度');
  console.log('   - 文字渐变特效动画');
  console.log('   - 卡片hover时的流光效果');
  console.log('   - 深蓝色渐变 (#0f66ad, #1c7dcd, #0f66ad)');
  console.log('   - 从左到右的一次性射线动画');
  console.log('   - 已移除Bootstrap框架');
} else {
  console.log('❌ 部分验证失败，请检查上述错误');
  process.exit(1);
}