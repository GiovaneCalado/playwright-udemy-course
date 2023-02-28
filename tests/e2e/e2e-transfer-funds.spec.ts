import { test } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';
import { Navbar } from '../../page-objects/components/Navbar';
import { TransferFundsPage } from '../../page-objects/TransferFundsPage';

test.describe('Transfer money and make payments', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let navbar: Navbar;
  let transferFundsPage: TransferFundsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    navbar = new Navbar(page);
    transferFundsPage = new TransferFundsPage(page);

    await homePage.visit();
    await homePage.clickOnSignIn();
    await loginPage.login('username', 'password');
    await loginPage.quitErrorPage();
  });

  test('Transfer funds', async ({ page }) => {
    await navbar.clickOnTab('Transfer Funds')
    await transferFundsPage.tansferFunds();
    await transferFundsPage.verifyTransfer();
    await transferFundsPage.assertTransfer();
  });
});