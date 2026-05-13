const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const viewports = [
  { width: 1920, height: 1080, label: '1920x1080', isMobile: false, hasTouch: false },
  { width: 1440, height: 900, label: '1440x900', isMobile: false, hasTouch: false },
  { width: 1280, height: 800, label: '1280x800', isMobile: false, hasTouch: false },
  { width: 1024, height: 768, label: '1024x768', isMobile: false, hasTouch: false },
  { width: 768, height: 1024, label: '768x1024', isMobile: true, hasTouch: true }
];

const checks = [
  { label: 'Header Global', selectors: ['.global-header .logo-text'] },
  { label: 'Hero H1', selectors: ['.hero-content h1'] },
  { label: 'Hero Description', selectors: ['.hero-description'] },
  { label: 'Hero Button', selectors: ['.btn-hero-white span'] },
  { label: 'Business Title', selectors: ['.business-header h2', '.business-mobile-title'] },
  { label: 'Business Card Title', selectors: ['.business-card h3', '.business-accordion-label'] },
  { label: 'Profile Title', selectors: ['.profile-container h2'] },
  { label: 'Profile Value', selectors: ['.stat-value'] },
  { label: 'News Title', selectors: ['.news-container h2'] },
  { label: 'News Card Title', selectors: ['.news-card.large h3', '.news-card.large .news-content h3'] },
  { label: 'Value Report Title', selectors: ['.report-text h2'] },
  { label: 'Footer Link', selectors: ['.footer-nav-group a'] }
];

async function pickVisibleSelector(page, selectors) {
  return page.evaluate((selectorList) => {
    const isVisible = (element) => {
      if (!element) return false;
      const style = window.getComputedStyle(element);
      const rects = element.getClientRects();
      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        style.opacity !== '0' &&
        rects.length > 0
      );
    };

    for (const selector of selectorList) {
      const node = document.querySelector(selector);
      if (isVisible(node)) return selector;
    }

    for (const selector of selectorList) {
      if (document.querySelector(selector)) return selector;
    }

    return null;
  }, selectors);
}

async function readTypography(page, selector) {
  return page.$eval(selector, (element) => {
    const style = window.getComputedStyle(element);
    return {
      fontSize: style.fontSize.trim(),
      lineHeight: style.lineHeight.trim()
    };
  });
}

function buildReport(results) {
  const lines = [
    '# Responsive Font Scale Report',
    '',
    '## Breakpoint Rules',
    '- `>= 1920px`: keep 1920 design font size as the exact base value.',
    '- `1280px - 1919px`: desktop fluid scale using root typography tokens.',
    '- `769px - 1279px`: continue shrinking with the same token system to prevent oversized type on compact desktop/tablet.',
    '- `<= 768px`: switch to mobile typography rules in `mobile.css`.',
    '',
    '## Viewport Verification'
  ];

  results.forEach((item) => {
    lines.push('');
    lines.push(`### ${item.viewport.label}`);
    lines.push(`- Body class: \`${item.bodyClass || '(empty)'}\``);
    lines.push('| Item | Selector | Font Size | Line Height |');
    lines.push('| --- | --- | --- | --- |');
    item.rows.forEach((row) => {
      lines.push(`| ${row.label} | \`${row.selector}\` | ${row.fontSize} | ${row.lineHeight} |`);
    });
  });

  return `${lines.join('\n')}\n`;
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const fileUrl = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');

  try {
    const results = [];

    for (const viewport of viewports) {
      await page.setViewport({
        width: viewport.width,
        height: viewport.height,
        deviceScaleFactor: 1,
        isMobile: viewport.isMobile,
        hasTouch: viewport.hasTouch
      });

      await page.goto(fileUrl, { waitUntil: 'networkidle0' });
      await page.evaluateHandle('document.fonts.ready');

      const bodyClass = await page.$eval('body', (body) => body.className);
      const rows = [];

      for (const check of checks) {
        const selector = await pickVisibleSelector(page, check.selectors);
        if (!selector) continue;
        const values = await readTypography(page, selector);
        rows.push({
          label: check.label,
          selector,
          ...values
        });
      }

      results.push({
        viewport,
        bodyClass,
        rows
      });
    }

    const reportPath = path.resolve('docs/responsive-font-scale/REPORT.md');
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, buildReport(results), 'utf8');
    console.log(`Responsive font report written to ${reportPath}`);
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
