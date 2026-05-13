const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('file:///' + path.resolve('index.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  
  // 等待动画结束，截取最终呈现的画面
  await new Promise(r => setTimeout(r, 4000));

  const resolutions = [
    { width: 1440, height: 900, name: '1440x900' }
  ];

  for (const res of resolutions) {
    await page.setViewport({ width: res.width, height: res.height, deviceScaleFactor: 1 });
    const section = await page.$('.hero');
    await section.screenshot({ path: `hero_section_${res.name}.png` });
  }

  await browser.close();
})();
