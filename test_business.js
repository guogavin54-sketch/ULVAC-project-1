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
    { width: 1440, height: 900, name: '1440x900' },
    { width: 1920, height: 1080, name: '1920x1080' }
  ];

  for (const res of resolutions) {
    await page.setViewport({ width: res.width, height: res.height, deviceScaleFactor: 1 });
    const section = await page.$('.business-section');
    await page.evaluate((el) => el.scrollIntoView(), section);
    await new Promise(r => setTimeout(r, 300));
    await section.screenshot({ path: `business_section_${res.name}.png` });
  }

  await browser.close();
})();
