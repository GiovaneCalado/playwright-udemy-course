import { expect, Locator, Page } from '@playwright/test'

export class PurchaseCurrencyPage {
  readonly page: Page;
  readonly puchaseCurrencyTab: Locator;
  readonly currencySelectbox: Locator;
  readonly rateMessage: Locator;
  readonly amountInput: Locator;
  readonly dollarCheck: Locator;
  readonly calculateButton: Locator;
  readonly conversionAmount: Locator;
  readonly purchaseButton: Locator;
  readonly purchaseSuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.puchaseCurrencyTab = page.locator('text=Purchase Foreign Currency');
    this.currencySelectbox = page.locator('#pc_currency');
    this.rateMessage = page.locator('.help-block');
    this.amountInput = page.locator('#pc_amount');
    this.dollarCheck = page.locator('#pc_inDollars_true');
    this.calculateButton = page.locator('#pc_calculate_costs');
    this.conversionAmount = page.locator('#pc_conversion_amount')
    this.purchaseButton = page.locator('#purchase_cash')
    this.purchaseSuccessMessage = page.locator('#alert_content')
  }

  async purchaseForeignCurrency() {
    await this.puchaseCurrencyTab.click();
    await this.currencySelectbox.selectOption('CAD');
    await expect(this.rateMessage).toBeVisible();
    await expect(this.rateMessage).toContainText("Today's Sell Rate: 1 dollar (CAD) = 1.0617 U.S. dollar (USD)");
    await this.amountInput.fill('500');
    await this.dollarCheck.click();
    await this.calculateButton.click();
    await expect(this.conversionAmount).toBeVisible();
    await expect(this.conversionAmount).toHaveText('470.94 dollar (CAD) = 500.00 U.S. dollar (USD)');
    await this.purchaseButton.click();
  }

  async assertPurchaseSuccess() {
    await expect(this.purchaseSuccessMessage).toBeVisible();
    await expect(this.purchaseSuccessMessage).toHaveText('Foreign currency cash was successfully purchased.');
  }
}