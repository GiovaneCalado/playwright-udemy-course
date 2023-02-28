import { expect, Locator, Page } from "@playwright/test";

export class AccountActivityPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly accountSelectbox: Locator;
  readonly transactionsTable: Locator;
  readonly noResultMessage: Locator;

  constructor(page:Page) {
    this.page = page;
    this.pageTitle = page.locator('h2');
    this.accountSelectbox = page.locator('#aa_accountId');
    this.transactionsTable = page.locator('#all_transactions_for_account tbody tr');
    this.noResultMessage = page.locator('.well');
  }

  async assertPageTitle() {
    await expect(this.pageTitle).toHaveText('Show Transactions');
  }

  async checkAccountActivity(account: string, transactions: number) {
    await this.accountSelectbox.selectOption(account);
    transactions == 0 ? await expect(this.noResultMessage).toBeVisible() : await expect(this.transactionsTable).toHaveCount(transactions);
  }
}