import { test, expect } from "@playwright/test";

test.describe('Visual Regression Testing Example', () => {
  test('Compare full page Snapshot', async ({ page }) => {
    await page.goto('https://www.example.com');
    expect(await page.screenshot()).toMatchSnapshot('homepage.png');
  })

  test('Single Element Snapshot', async ({ page }) => {
    await page.goto('https://www.example.com');
    const pageElement = page.locator('h1');
    expect(await pageElement.screenshot()).toMatchSnapshot('page-title.png');
  })
  //  In case your snapshots are deprecated and need to be updated, you can delete you images and run again, or run the tests with --update-snapshots on terminal
})