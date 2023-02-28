import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage';

test.describe('Search for results', () => {
  test('Should find search results', async ({ page }) => {
    let homePage: HomePage = new HomePage(page);

    await homePage.visit();
    await homePage.searchFor('bank')

    const resultsNumber = page.locator('li > a')
    await expect(resultsNumber).toHaveCount(2)
  });
});