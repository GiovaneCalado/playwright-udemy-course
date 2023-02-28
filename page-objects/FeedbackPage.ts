import { expect, Locator, Page } from "@playwright/test";

export class FeedbackPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly commentInput: Locator;
  readonly clearFormButton: Locator;
  readonly submitFormButton: Locator;
  readonly feedbackPageTitle: Locator;

  constructor(page:Page) {
    this.page = page;
    this.nameInput = page.locator('#name');
    this.emailInput = page.locator('#email');
    this.subjectInput = page.locator('#subject');
    this.commentInput = page.locator('#comment');
    this.clearFormButton = page.locator("input[name= 'clear']");
    this.submitFormButton = page.locator('.btn-signin');
    this.feedbackPageTitle = page.locator('#feedback-title');
  }

  async fillForm(name: string, email: string, subject: string, comment: string) {
    await this.nameInput.type(name);
    await this.emailInput.type(email);
    await this.subjectInput.type(subject);
    await this.clearFormButton.type(comment);
  }

  async assertFeedbackPage() {
    await expect(this.nameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
  }

  async cleanUpForm() {
    await this.clearFormButton.click();
  }

  async assertCleanForm() {
    await expect(this.nameInput).toBeEmpty();
    await expect(this.emailInput).toBeEmpty();
  }

  async submitForm() {
    await this.submitFormButton.click();
  }

  async assertFormSent() {
    await expect(this.feedbackPageTitle).toBeVisible();
  }
}