import { test, expect } from '@playwright/test';

import { loadHomePage, assertPageTitle } from '../helpers'

/* A tag @first+test tbm é uma identificação do cenário
Para rodar cenários com essa tag digitar npx playwright test --grep @first_test
Para não rodar cenários com essa tag digitar npx playwright test --grep-invert @first_test */
test('Access a website @first_test', async ({ page }) => {
  await page.goto('https://example.com/');
  const pageTitle = page.locator('h1')
  await expect(pageTitle).toContainText('Example Domain');
});

// test.describe é usado para agrupar testes dentro de uma suite
test.describe('Login suite', () => {
  test('Click on sign in button with no user or password', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html');
    await page.click('#signin_button');
    await page.click('text=Sign in');
    const messageError = page.locator('.alert');
    await expect(messageError).toHaveText('Login and/or password are wrong. ');
  });
  
  test('Click on sign in button with wrong user and password', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html');
    await page.click('#signin_button');
  
    await page.fill('#user_login', 'whoever');
    await page.fill('#user_password', 'whatever');
    await page.click('text=Sign in');
  
    const messageError = page.locator('.alert');
    await expect(messageError).toHaveText('Login and/or password are wrong. ');
  });
});

// test.only pode ser usado para rodar apenas cenários com esta annotation
// test.skip pode ser usado para pular um teste
// Outras annotations que podem ser usadas são: beforeEach, beforeAll, afterEach e afterAll, as annotations são auto-explicativas
test('Lean differente assertion types', async ({ page }) => {
  await page.goto('https://example.com/');
  await expect(page).toHaveURL('https://example.com/');
  await expect(page).toHaveTitle('Example Domain');

  const element =  page.locator('h1');
  await expect(element).toBeVisible();
  await expect(element).toContainText('Example Domain');
  await expect(element).toHaveCount(1);

  const fakeElement = page.locator('h5');
  await expect(fakeElement).not.toBeVisible();
});

test('Take screenshots while testing', async ({ page }) => {
  await page.goto('https://example.com/');
  await page.screenshot({ path: 'screenchot.png', fullPage: true});
});

test('Single element screenshot', async ({ page }) => {
  await page.goto('https://example.com/');
  const element = page.locator('h1');
  await element.screenshot({ path: 'single_element_screenchot.png' });
});

test('Custom Helpers', async ({ page }) => {
  await loadHomePage(page);
  // await page.pause() // pode ser usado para inspecionar, caso queira debugar a aplicação inteira, pode rodar no terminal com --debug
  await assertPageTitle(page);
});
