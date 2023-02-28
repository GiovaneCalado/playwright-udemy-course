import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage';

export class LoginPage extends AbstractPage{
  // Define Selectors
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly loginForm: Locator;

  // Init selectors using constructor
  constructor(page: Page) {
    super(page)
    this.usernameInput = page.locator('#user_login');
    this.passwordInput = page.locator('#user_password');
    this.submitButton = page.locator('input[name=submit]');
    this.errorMessage = page.locator('.alert-error');
    this.loginForm = page.locator('#login_form');
  }

  // Define login page methods
  async login(username: string, password: string) {
    await this.usernameInput.type(username);
    await this.passwordInput.type(password);
    await this.submitButton.click();
  }

  async quitErrorPage () {
    await this.page.goto('http://zero.webappsecurity.com/bank/account-summary.html');
  }

  async assertErrorMessage() {
    await expect(this.errorMessage).toContainText('Login and/or password are wrong.')
  }

  async assertSnapshotLoginForm() {
    expect(await this.loginForm.screenshot()).toMatchSnapshot('login-form.png');
  }

  async assertSnapshotLoginError() {
    expect(await this.errorMessage.screenshot()).toMatchSnapshot('login-error.png');
  }
}