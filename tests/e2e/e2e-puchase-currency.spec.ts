import { test } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';
import { Navbar } from '../../page-objects/components/Navbar';
import { PurchaseCurrencyPage } from '../../page-objects/PuchaseCurrencyPage';

test.describe('Puchase foreign currency', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let navbar: Navbar;
  let purchaseCurrencyPage: PurchaseCurrencyPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    navbar = new Navbar(page);
    purchaseCurrencyPage = new PurchaseCurrencyPage(page);

    await homePage.visit();
    await homePage.clickOnSignIn();
    await loginPage.login('username', 'password');
    await loginPage.quitErrorPage();
  });

  test('Should puchase foreign currency', async ({ page }) => {
    await navbar.clickOnTab('Pay Bills');
    await purchaseCurrencyPage.purchaseForeignCurrency();
    await purchaseCurrencyPage.assertPurchaseSuccess();
  });
});