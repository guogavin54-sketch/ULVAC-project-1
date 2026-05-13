const fs = require('fs');
const path = require('path');
const { runChecks } = require('./mobile-style-check');

function formatReport(report) {
  const lines = [
    '# Mobile Style Assertion Report',
    '',
    `- Viewport: ${report.viewport.width}x${report.viewport.height}`,
    `- Body Class: \`${report.bodyClass || '(empty)'}\``,
    `- Result: ${report.passed ? 'PASS' : 'FAIL'}`,
    '',
    '| Selector | Result | Expected | Actual |',
    '| --- | --- | --- | --- |'
  ];

  report.results.forEach((result) => {
    const expected = Object.entries(result.expected)
      .map(([key, value]) => `${key}: ${value}`)
      .join('<br>');
    const actual = Object.entries(result.actual)
      .map(([key, value]) => `${key}: ${value}`)
      .join('<br>');
    lines.push(`| \`${result.selector}\` | ${result.pass ? 'PASS' : 'FAIL'} | ${expected} | ${actual} |`);
  });

  return `${lines.join('\n')}\n`;
}

(async () => {
  const report = await runChecks();
  const reportPath = path.resolve('docs/mobile-top/MOBILE_STYLE_TEST_REPORT.md');

  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, formatReport(report), 'utf8');

  if (!report.passed) {
    console.error(JSON.stringify(report, null, 2));
    process.exit(1);
  }

  console.log(`Mobile style assertions passed. Report written to ${reportPath}`);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
