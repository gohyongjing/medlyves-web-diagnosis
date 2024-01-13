import { test, expect } from '@playwright/test';

test('can find conditions and drug', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Get Started!' }).click();
  await page.getByRole('link', { name: 'Diagnose' }).click();
});
