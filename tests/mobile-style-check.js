const path = require('path');
const puppeteer = require('puppeteer');

async function collectComputedStyles(page, selector, properties) {
  await page.waitForSelector(selector, { timeout: 5000 });
  return page.$eval(
    selector,
    (element, requestedProperties) => {
      const computed = window.getComputedStyle(element);
      const values = {};
      requestedProperties.forEach((property) => {
        values[property] = computed.getPropertyValue(property);
      });
      return values;
    },
    properties
  );
}

async function runChecks() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const fileUrl = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');

  const viewport = {
    width: 375,
    height: 812,
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true
  };

  try {
    await page.setViewport(viewport);
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    await page.evaluateHandle('document.fonts.ready');

    const bodyClass = await page.$eval('body', (body) => body.className);
    const checks = [
      {
        selector: '.menu-toggle',
        properties: {
          display: 'flex',
          width: '44px',
          height: '44px'
        }
      },
      {
        selector: '.main-nav',
        properties: {
          display: 'none'
        }
      },
      {
        selector: '.global-header',
        properties: {
          height: '69px'
        }
      },
      {
        selector: '.hero-content h1',
        properties: {
          fontSize: '34px',
          lineHeight: '44px'
        }
      },
      {
        selector: '.btn-hero-white span',
        properties: {
          fontSize: '15px',
          lineHeight: '23px'
        }
      },
      {
        selector: '.business-mobile-title',
        properties: {
          fontSize: '28px',
          lineHeight: '36px'
        }
      },
      {
        selector: '.news-card.large .news-content h3',
        properties: {
          fontSize: '16px',
          lineHeight: '24px'
        }
      },
      {
        selector: '.news-date',
        properties: {
          fontSize: '15px',
          lineHeight: '19px',
          color: 'rgb(136, 136, 136)'
        }
      },
      {
        selector: '.stat-period',
        properties: {
          fontSize: '13px',
          lineHeight: '18px'
        }
      },
      {
        selector: '.stat-value',
        properties: {
          fontSize: '28px',
          lineHeight: '28px'
        }
      },
      {
        selector: '.stat-currency',
        properties: {
          fontSize: '20px',
          lineHeight: '28px'
        }
      },
      {
        selector: '.stat-label',
        properties: {
          fontSize: '16px',
          lineHeight: '24px'
        }
      },
      {
        selector: '.btn-report span',
        properties: {
          fontSize: '16px',
          lineHeight: '24px'
        }
      },
      {
        selector: '.footer-nav-group a',
        properties: {
          display: 'block',
          fontSize: '16px',
          lineHeight: '22px'
        }
      }
    ];

    const results = [];
    for (const check of checks) {
      const propertyNames = Object.keys(check.properties).map((property) =>
        property.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
      );
      const computed = await collectComputedStyles(page, check.selector, propertyNames);
      const actual = {};

      Object.keys(check.properties).forEach((propertyName, index) => {
        const cssProperty = propertyNames[index];
        actual[propertyName] = computed[cssProperty].trim();
      });

      const mismatches = Object.entries(check.properties)
        .filter(([propertyName, expectedValue]) => actual[propertyName] !== expectedValue)
        .map(([propertyName, expectedValue]) => ({
          property: propertyName,
          expected: expectedValue,
          actual: actual[propertyName]
        }));

      results.push({
        selector: check.selector,
        expected: check.properties,
        actual,
        pass: mismatches.length === 0,
        mismatches
      });
    }

    return {
      viewport,
      bodyClass,
      results,
      passed: results.every((result) => result.pass)
    };
  } finally {
    await browser.close();
  }
}

module.exports = {
  runChecks
};
