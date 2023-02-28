import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';

test.describe.parallel("Login/Logout flow", () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  // Before Hook
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await homePage.visit();
    await homePage.clickOnSignIn();
  });

  // Negative Scenario
  test('Login with wrong username and password', async ({ }) => {
    await loginPage.login('invalid username', 'invalid password');
    await loginPage.wait(3000)
    await loginPage.assertErrorMessage();
  });

  // Positive Scenario
  test('Login with username and password and then logout', async ({ page }) => {
    await loginPage.login('username', 'password');
    await loginPage.quitErrorPage();

    const elementMenu = page.locator('#account_summary_tab');
    await expect(elementMenu).toBeVisible();

    await page.goto('http://zero.webappsecurity.com/bank/logout.html');
    await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
  });
});