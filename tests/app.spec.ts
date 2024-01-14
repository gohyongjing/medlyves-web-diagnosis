import { test, expect } from '@playwright/test';

test('can find conditions and drug', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Get Started!' }).click();
  await page.getByRole('link', { name: 'Diagnose' }).click();
});

test('can navigate to homepage via nav bar', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Get Started!' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'Web Doc' }).click();
  await expect(page.getByText('Welcome')).toBeVisible();
});

test('can navigate to symptoms picker via back button', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Get Started!' }).click();
  await page.getByRole('link', { name: 'Diagnose' }).click();
  await page.getByRole('button', { name: 'Back' }).click();
  await expect(page.getByText('What are your symptoms?')).toBeVisible();
});
