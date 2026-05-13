const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('file:///' + path.resolve('index.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      * { animation: none !important; transition: none !important; }
      .animate-on-scroll { opacity: 1 !important; transform: none !important; }
    `;
    document.head.appendChild(style);
  });

  const resolutions = [
    { width: 1366, height: 768, name: '1366x768' },
    { width: 375, height: 812, name: '375x812' }
  ];

  for (const res of resolutions) {
    await page.setViewport({ width: res.width, height: res.height, deviceScaleFactor: 1 });
    const section = await page.$('.profile-section');
    await page.evaluate((el) => el.scrollIntoView(), section);
    await new Promise(r => setTimeout(r, 300));
    await section.screenshot({ path: `profile_section_${res.name}.png` });
  }

  await browser.close();
})();
