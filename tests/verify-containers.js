const fs = require('fs');
const path = require('path');

console.log('=== 验证容器样式 ===\n');

let allPassed = true;

// 读取style.css文件
const stylePath = path.join(__dirname, '../css/style.css');
const styleContent = fs.readFileSync(stylePath, 'utf8');

// 检查的容器样式
const containersToCheck = [
  {
    name: '.business-container',
    requiredProperties: [
      'display: flex',
      'align-items: flex-start',
      'column-gap: 3.75%',
      'width: 100%'
    ]
  },
  {
    name: '.profile-container',
    requiredProperties: [
      'display: flex',
      'flex-direction: column',
      'align-items: flex-start',
      'row-gap: 48px',
      'width: 100%'
    ]
  },
  {
    name: '.news-container',
    requiredProperties: [
      'display: flex',
      'flex-direction: column',
      'align-items: flex-start',
      'row-gap: 48px',
      'width: 100%'
    ]
  }
];

// 检查每个容器样式
for (const container of containersToCheck) {
  console.log(`检查 ${container.name}...`);
  
  // 查找容器样式定义
  const containerRegex = new RegExp(`${container.name.replace('.', '\\.')}\\s*\\{[^}]*\\}`, 'g');
  const matches = styleContent.match(containerRegex);
  
  if (matches && matches.length > 0) {
    console.log(`   ✓ 找到 ${container.name} 样式定义`);
    
    // 检查是否包含所有必需的属性
    const containerContent = matches[0];
    let missingProperties = [];
    
    for (const property of container.requiredProperties) {
      if (!containerContent.includes(property)) {
        missingProperties.push(property);
      }
    }
    
    if (missingProperties.length === 0) {
      console.log(`   ✓ 所有必需属性都存在`);
    } else {
      console.log(`   ✗ 缺少以下属性: ${missingProperties.join(', ')}`);
      allPassed = false;
    }
  } else {
    console.log(`   ✗ 未找到 ${container.name} 样式定义`);
    allPassed = false;
  }
  
  console.log('');
}

// 总结
console.log('=== 验证结果 ===');
if (allPassed) {
  console.log('✅ 所有容器样式验证通过！');
  console.log('');
  console.log('已恢复的容器样式：');
  console.log('   1. .business-container - 水平Flex布局，3.75%列间距');
  console.log('   2. .profile-container - 垂直Flex布局，48px行间距');
  console.log('   3. .news-container - 垂直Flex布局，48px行间距');
  console.log('');
  console.log('页面布局现在应该与之前版本一致，没有偏差。');
} else {
  console.log('❌ 部分容器样式验证失败，请检查上述错误');
  process.exit(1);
}