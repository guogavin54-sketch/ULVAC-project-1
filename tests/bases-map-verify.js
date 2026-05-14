const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const targets = [
  { name: 'desktop', width: 1440, height: 1400, region: 'europe' },
  { name: 'tablet', width: 1024, height: 1366, region: 'north-america' },
  { name: 'mobile', width: 390, height: 1600, isMobile: true, hasTouch: true, region: 'asia' }
];

function fileUrl() {
  return 'file:///' + path.resolve('index.html').replace(/\\/g, '/');
}

async function captureSection(page, selector, outputPath) {
  const handle = await page.$(selector);
  if (!handle) {
    throw new Error(`Missing selector: ${selector}`);
  }
  await handle.screenshot({ path: outputPath });
}

async function getRegionTitle(page) {
  return page.$eval('.bases-region-title', (node) => node.textContent.trim());
}

async function getLayoutMetrics(page, regionId) {
  return page.evaluate((targetRegion) => {
    const stage = document.querySelector('.bases-map-stage');
    const card = document.querySelector('.bases-region-card');
    const hotspot = document.querySelector(`.bases-hotspot[data-region="${targetRegion}"]`);

    if (!stage || !card || !hotspot) {
      return null;
    }

    const stageRect = stage.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const hotspotRect = hotspot.getBoundingClientRect();
    const hotspotCenterX = hotspotRect.left + (hotspotRect.width / 2);
    const cardCenterX = cardRect.left + (cardRect.width / 2);
    const horizontalDelta = Math.abs(cardCenterX - hotspotCenterX);
    const isBelow = cardRect.top >= hotspotRect.bottom;
    const isWithinStage =
      cardRect.left >= stageRect.left &&
      cardRect.right <= stageRect.right &&
      cardRect.top >= stageRect.top &&
      cardRect.bottom <= stageRect.bottom;

    return {
      horizontalDelta: Number(horizontalDelta.toFixed(2)),
      isBelow,
      isWithinStage
    };
  }, regionId);
}

async function clickRegion(page, regionId) {
  await page.click(`.bases-hotspot[data-region="${regionId}"]`);
  await new Promise((resolve) => setTimeout(resolve, 520));
}

function report(results) {
  const lines = [
    '# Bases Map Verify Report',
    '',
    '| Viewport | Default Title | Switched Region | Switched Title | Delta X | Below | In Stage | Result |',
    '| --- | --- | --- | --- | --- | --- | --- | --- |'
  ];

  results.forEach((item) => {
    lines.push(`| ${item.viewport} | ${item.defaultTitle} | ${item.targetRegion} | ${item.switchedTitle} | ${item.horizontalDelta}px | ${item.isBelow ? 'YES' : 'NO'} | ${item.isWithinStage ? 'YES' : 'NO'} | ${item.passed ? 'PASS' : 'FAIL'} |`);
  });

  return `${lines.join('\n')}\n`;
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const outputDir = path.resolve('docs/map-bases-switch');
  const results = [];

  fs.mkdirSync(outputDir, { recursive: true });

  try {
    for (const target of targets) {
      await page.setViewport({
        width: target.width,
        height: target.height,
        deviceScaleFactor: 1,
        isMobile: !!target.isMobile,
        hasTouch: !!target.hasTouch
      });

      await page.goto(fileUrl(), { waitUntil: 'networkidle0' });
      await page.evaluateHandle('document.fonts.ready');
      await page.waitForSelector('.bases-section');

      const defaultTitle = await getRegionTitle(page);
      const defaultShot = path.join(outputDir, `bases-map-${target.name}-default.png`);
      await captureSection(page, '.bases-section', defaultShot);

      await clickRegion(page, target.region);
      const switchedTitle = await getRegionTitle(page);
      const metrics = await getLayoutMetrics(page, target.region);
      const switchedShot = path.join(outputDir, `bases-map-${target.name}-${target.region}.png`);
      await captureSection(page, '.bases-section', switchedShot);

      results.push({
        viewport: `${target.width}x${target.height}`,
        defaultTitle,
        targetRegion: target.region,
        switchedTitle,
        horizontalDelta: metrics ? metrics.horizontalDelta : 'n/a',
        isBelow: metrics ? metrics.isBelow : false,
        isWithinStage: metrics ? metrics.isWithinStage : false,
        passed: Boolean(
          metrics &&
          switchedTitle.toLowerCase() !== defaultTitle.toLowerCase() &&
          metrics.horizontalDelta <= 24 &&
          metrics.isBelow &&
          metrics.isWithinStage
        )
      });
    }
  } finally {
    await browser.close();
  }

  const reportPath = path.join(outputDir, 'VERIFY_REPORT.md');
  fs.writeFileSync(reportPath, report(results), 'utf8');

  if (results.some((item) => !item.passed)) {
    process.exit(1);
  }
})();
