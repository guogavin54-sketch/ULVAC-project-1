/** @jest-environment node */

const { runChecks } = require('./mobile-style-check');

describe('mobile style priority', () => {
  jest.setTimeout(30000);

  test('375 viewport uses mobile.css computed values', async () => {
    const report = await runChecks();

    expect(report.bodyClass).toContain('is-mobile');
    report.results.forEach((result) => {
      expect(result.mismatches).toEqual([]);
    });
  });
});
