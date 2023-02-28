import test from "@playwright/test";
import { LoginPage } from "../../page-objects/LoginPage";
import { HomePage } from '../../page-objects/HomePage';

test.describe('Login Page Visual Tests', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

    await homePage.visit();
    await homePage.clickOnSignIn();
  })

  test('Validate Login Form Snapshot', async ({}) => {
    await loginPage.assertSnapshotLoginForm();
  })

  test('Validate Login Error Snapshot', async ({}) => {
    await loginPage.login('wrong user', 'wrong pass');
    await loginPage.assertSnapshotLoginError();
  })
})