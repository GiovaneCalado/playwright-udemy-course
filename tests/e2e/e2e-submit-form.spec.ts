import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage';
import { FeedbackPage } from '../../page-objects/FeedbackPage';

test.describe('Submit feedback form', () => {
  let homePage: HomePage;
  let feedbackPage: FeedbackPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    feedbackPage = new FeedbackPage(page);

    await homePage.visit();
    await homePage.accessFeedbackPage();

    await feedbackPage.assertFeedbackPage();
  })

  test('Clear all fields in the form', async ({ page }) => {
    await feedbackPage.fillForm('Giovane', 'giovane@email.com', 'Churros', 'Esse churros é top');

    await feedbackPage.cleanUpForm();
    await feedbackPage.assertCleanForm();
  });

  test('Fill in the fields and submit feedback', async ({ page }) => {
    await feedbackPage.fillForm('Giovane', 'giovane@email.com', 'Churros', 'Esse churros é top');

    await feedbackPage.submitForm();
    await feedbackPage.assertFormSent();
  });
});
