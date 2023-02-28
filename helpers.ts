import { expect } from '@playwright/test';

export async function loadHomePage(page) {
  await page.goto('https://www.example.com');
}

export async function assertPageTitle(page) {
  await page.waitForSelector('h1');
  await expect(page).toHaveTitle('Example Domain');
}