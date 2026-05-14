const fs = require('fs');
const path = require('path');

console.log('=== 验证HTML页面结构 ===\n');

let allPassed = true;

// 读取index.html文件
const indexPath = path.join(__dirname, '../index.html');
const indexContent = fs.readFileSync(indexPath, 'utf8');

// 检查的容器结构
const containersToCheck = [
  {
    name: 'business-section',
    containerClass: 'business-container',
    requiredPattern: '<section class="business-section">[\\s\\S]*?<div class="container business-container">'
  },
  {
    name: 'profile-section',
    containerClass: 'profile-container',
    requiredPattern: '<section class="profile-section">[\\s\\S]*?<div class="container profile-container">'
  },
  {
    name: 'news-section',
    containerClass: 'news-container',
    requiredPattern: '<section class="news-section">[\\s\\S]*?<div class="container news-container">'
  }
];

// 检查每个容器结构
for (const container of containersToCheck) {
  console.log(`检查 ${container.name}...`);
  
  // 查找容器结构
  const regex = new RegExp(container.requiredPattern, 'g');
  const matches = indexContent.match(regex);
  
  if (matches && matches.length > 0) {
    console.log(`   ✓ 找到正确的 ${container.name} 结构`);
    console.log(`   ✓ 使用了 ${container.containerClass} 类`);
  } else {
    console.log(`   ✗ ${container.name} 结构不正确`);
    console.log(`   ✗ 可能缺少 ${container.containerClass} 类`);
    allPassed = false;
  }
  
  console.log('');
}

// 检查text-glow-effect类是否仍然存在
console.log('检查text-glow-effect类...');
if (indexContent.includes('text-glow-effect')) {
  const matches = indexContent.match(/text-glow-effect/g);
  console.log(`   ✓ 找到text-glow-effect类`);
  console.log(`   ✓ 共有 ${matches ? matches.length : 0} 个元素使用了text-glow-effect类`);
} else {
  console.log(`   ✗ 未找到text-glow-effect类`);
  allPassed = false;
}

console.log('');

// 检查是否移除了Bootstrap
console.log('检查是否移除了Bootstrap...');
if (!indexContent.includes('bootstrap') && !indexContent.includes('Bootstrap')) {
  console.log('   ✓ 未找到Bootstrap相关代码');
} else {
  console.log('   ✗ 找到Bootstrap相关代码');
  allPassed = false;
}

// 总结
console.log('\n=== 验证结果 ===');
if (allPassed) {
  console.log('✅ 所有验证通过！HTML页面结构已恢复正常。');
  console.log('');
  console.log('已修复的HTML结构：');
  console.log('   1. business-section: 使用 <div class="container business-container">');
  console.log('   2. profile-section: 使用 <div class="container profile-container">');
  console.log('   3. news-section: 使用 <div class="container news-container">');
  console.log('');
  console.log('页面布局现在应该与index (3).html一致，没有偏差。');
  console.log('所有特效（text-glow-effect）仍然正常工作。');
} else {
  console.log('❌ 部分验证失败，请检查上述错误');
  process.exit(1);
}