import { expect, Locator, Page } from "@playwright/test";

export class PaymentPage {
  readonly page: Page;
  readonly payeeSelectbox: Locator;
  readonly payeeDetailsButton: Locator;
  readonly payeeDetailsText: Locator
  readonly accountSelectbox: Locator;
  readonly amountInput: Locator;
  readonly dateInput: Locator;
  readonly descriptionInput: Locator;
  readonly payButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.payeeSelectbox = page.locator('#sp_payee');
    this.payeeDetailsButton = page.locator('#sp_get_payee_details');
    this.payeeDetailsText = page.locator('#sp_payee_details')
    this.accountSelectbox = page.locator('#sp_account');
    this.amountInput = page.locator('#sp_amount');
    this.dateInput = page.locator('#sp_date');
    this.descriptionInput = page.locator('#sp_description');
    this.payButton = page.locator('#pay_saved_payees');
    this.successMessage = page.locator('#alert_content > span');
  }

  async fillPaymentForm() {
    await this.payeeSelectbox.selectOption('apple');
    await this.payeeDetailsButton.click();
    await expect(this.payeeDetailsText).toBeVisible();
    await this.accountSelectbox.selectOption('6');
    await this.amountInput.fill('5000');
    await this.dateInput.fill('2021-11-09')
    await this.descriptionInput.fill('Some random Message');
    await this.payButton.click();
  }

  async assertSuccess() {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toContainText('The payment was successfully submitted');
  }
}