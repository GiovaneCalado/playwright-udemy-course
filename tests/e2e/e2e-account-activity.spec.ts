import { test } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';
import { Navbar } from '../../page-objects/components/Navbar';
import { AccountActivityPage } from '../../page-objects/AccountActivityPage';

test.describe('Filter Transactions', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let navbar: Navbar;
  let accountActivityPage: AccountActivityPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    navbar = new Navbar(page);
    accountActivityPage = new AccountActivityPage(page);

    await homePage.visit();
    await homePage.clickOnSignIn();
    await loginPage.login('username', 'password');

    await loginPage.quitErrorPage();
  });

  test('Verify the results for each account', async ({ page }) => {
    await navbar.clickOnTab('Account Activity');
    await accountActivityPage.checkAccountActivity('2', 3);
    await accountActivityPage.checkAccountActivity('4', 2);
    await accountActivityPage.checkAccountActivity('6', 0);
  })
});