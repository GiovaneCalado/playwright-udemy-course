import { expect, Locator, Page } from "@playwright/test";

export class TransferFundsPage {
  readonly page: Page;
  readonly originAccountSelectbox: Locator;
  readonly destinationAccountSelectbox: Locator;
  readonly amountInput: Locator;
  readonly descriptionInput: Locator;
  readonly continueButton: Locator;
  readonly boardHeader: Locator;
  readonly sucessMessage: Locator;

  constructor(page:Page) {
    this.page = page;
    this.originAccountSelectbox = page.locator('#tf_fromAccountId');
    this.destinationAccountSelectbox = page.locator('#tf_toAccountId');
    this.amountInput = page.locator('#tf_amount');
    this.descriptionInput = page.locator('#tf_description');
    this.continueButton = page.locator('#btn_submit');
    this.boardHeader = page.locator('h2.board-header');
    this.sucessMessage = page.locator('.alert-success');
  }

  async tansferFunds() {
    await this.originAccountSelectbox.selectOption('2');
    await this.destinationAccountSelectbox.selectOption('3');
    await this.amountInput.fill('500');
    await this.descriptionInput.fill('Take the money');
    await this.continueButton.click();
  }

  async verifyTransfer() {
    await expect(this.boardHeader).toContainText('Verify');
    await this.continueButton.click();
  }

  async assertTransfer() {
    await expect(this.sucessMessage).toHaveText('You successfully submitted your transaction.');
  }
}