import { Locator, Page } from '@playwright/test'

export class HomePage {
  // Define Selectors
  readonly page: Page;
  readonly signInButton: Locator;
  readonly searchBox: Locator;
  readonly feedbackPage: Locator;

  // Init selectors using constructor
  constructor(page:Page) {
    this.page = page;
    this.signInButton = page.locator('#signin_button');
    this.searchBox = page.locator('#searchTerm');
    this.feedbackPage = page.locator('#feedback');
  }

    // Define login page methods
    async visit() {
      await this.page.goto('http://zero.webappsecurity.com');
    }

    async clickOnSignIn() {
      await this.signInButton.click();
    }

    async searchFor(key: string) {
      await this.searchBox.type(key);
      await this.page.keyboard.press('Enter');
    }

    async accessFeedbackPage() {
      await this.feedbackPage.click();
    }
}
