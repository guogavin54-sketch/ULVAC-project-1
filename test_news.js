const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function runTests() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Wait for network to be idle to ensure fonts are loaded
  await page.goto('file:///' + path.resolve('index.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  // Disable animations so they don't hide the content
  await page.evaluate(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        animation: none !important;
        transition: none !important;
      }
      .animate-on-scroll {
        opacity: 1 !important;
        transform: none !important;
      }
    `;
    document.head.appendChild(style);
  });

  const resolutions = [
    { width: 1920, height: 1080, name: '1920x1080' },
    { width: 1366, height: 768, name: '1366x768' },
    { width: 375, height: 812, name: '375x812' }
  ];

  for (const res of resolutions) {
    await page.setViewport({ width: res.width, height: res.height, deviceScaleFactor: 1 });
    
    // Scroll to the news section
    const newsSection = await page.$('.news-section');
    if (newsSection) {
      await page.evaluate((el) => el.scrollIntoView(), newsSection);
      await new Promise(r => setTimeout(r, 500)); // wait for layout
      await newsSection.screenshot({ path: `news_section_${res.name}.png` });
      console.log(`Screenshot saved for ${res.name}`);
    } else {
      console.log('News section not found!');
    }
  }

  await browser.close();
}

runTests().catch(console.error);
