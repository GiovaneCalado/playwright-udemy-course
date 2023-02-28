import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';
import { Navbar } from '../../page-objects/components/Navbar';
import { PaymentPage } from '../../page-objects/PaymentPage';

test.describe('Make a new payment', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let navbar: Navbar;
  let paymentPage: PaymentPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    navbar = new Navbar(page);
    paymentPage = new PaymentPage(page);
    
    await homePage.visit();
    await homePage.clickOnSignIn();

    await loginPage.login('username', 'password');
    await loginPage.quitErrorPage();
  });

  test('Should send new payment', async ({ }) => {
    await navbar.clickOnTab('Pay Bills');
    await paymentPage.fillPaymentForm();
    await paymentPage.assertSuccess();
  });
});