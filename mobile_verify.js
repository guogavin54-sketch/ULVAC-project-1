const puppeteer = require('puppeteer');
const path = require('path');

async function disableMotion(page) {
  await page.evaluate(() => {
    const style = document.createElement('style');
    style.setAttribute('data-mobile-verify', 'true');
    style.innerHTML = `
      *,
      *::before,
      *::after {
        animation-duration: 0s !important;
        transition-duration: 0s !important;
        scroll-behavior: auto !important;
      }
      .animate-on-scroll {
        opacity: 1 !important;
        transform: none !important;
      }
    `;
    document.head.appendChild(style);
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      el.classList.add('is-visible');
    });
  });
}

async function captureState(page, name, setup) {
  if (setup) {
    await setup();
  }
  await page.screenshot({ path: name, fullPage: true });
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const fileUrl = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');

  const viewports = [
    { width: 375, height: 812, label: '375x812' },
    { width: 390, height: 844, label: '390x844' },
    { width: 768, height: 1024, label: '768x1024' }
  ];

  for (const viewport of viewports) {
    await page.setViewport({ ...viewport, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    await page.evaluateHandle('document.fonts.ready');
    await disableMotion(page);

    await captureState(page, `mobile_${viewport.label}_home.png`);

    await captureState(page, `mobile_${viewport.label}_menu.png`, async () => {
      await page.click('.menu-toggle');
      await page.waitForSelector('.mobile-side-nav.is-open');
    });

    await captureState(page, `mobile_${viewport.label}_accordion.png`, async () => {
      await page.goto(fileUrl, { waitUntil: 'networkidle0' });
      await page.evaluateHandle('document.fonts.ready');
      await disableMotion(page);
      await page.evaluate(() => {
        const business = document.querySelector('.business-mobile');
        if (business) business.scrollIntoView({ block: 'start' });
      });
      await page.evaluate(() => {
        const trigger = document.querySelector('.business-accordion-trigger');
        if (trigger) {
          trigger.click();
        }
      });
      await page.waitForFunction(
        () => Boolean(document.querySelector('.business-accordion-item.is-open')),
        { timeout: 5000 }
      );
    });
  }

  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
