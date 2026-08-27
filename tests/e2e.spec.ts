import { test, expect } from '@playwright/test';

test('App layout loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('StudySync').first()).toBeVisible();
});

test('Navigation works', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Overview').first()).toBeVisible();
});
