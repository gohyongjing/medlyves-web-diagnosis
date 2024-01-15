import { test, expect } from '@playwright/test';

test('can navigate to homepage via nav bar', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Get Started!' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'Web Doctor' }).click();
  await expect(page.getByText('Welcome')).toBeVisible();
});

test('can remove selected symptoms', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Get Started!' }).click();
  await page.getByPlaceholder('Search symptoms').fill('ex');
  await page.getByText('extra marital contacts').click();
  await expect(page.getByText('Remove extra marital contactsextra marital contacts')).toBeVisible();
  await page.getByRole('button', { name: 'Remove extra marital contacts' }).click();
  await expect(page.getByText('Remove extra marital contactsextra marital contacts')).not.toBeVisible();
});

test('can expand the dropdown menu by clicking "show more"', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Get Started!' }).click();
  await page.getByRole('button', { name: 'Show more' }).click();
  await expect(page.getByText('cold hands and feets')).toBeVisible();
});

test('can search for conditions and find conditions', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Get Started!' }).click();
  await page.getByPlaceholder('Search symptoms').click();
  await page.getByPlaceholder('Search symptoms').fill('joint');
  await page.getByText('joint pain', { exact: true }).click();
  await page.getByPlaceholder('Search symptoms').click();
  await page.getByPlaceholder('Search symptoms').fill('vom');
  await page.getByText('vomiting').click();
  await page.getByRole('link', { name: 'Diagnose' }).click();
  await expect(page.getByText('Hepatitis D')).toBeVisible();
  await expect(page.getByText('Hepatitis E')).toBeVisible();

  // conditions with less symptoms appear below
  await expect(page.getByText('GERD')).not.toBeInViewport();
});

test('can see drugs needed for medical conditions', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Get Started!' }).click();
  await page.getByText('acidity').click();
  await page.getByRole('link', { name: 'Diagnose' }).click();
  await page.locator('div').filter({ hasText: /^GERDacidityShow details$/ }).getByRole('button').click();
  await expect(page.getByText('ranitidine')).toBeVisible();
  await expect(page.getByText('rabeprazole')).toBeVisible();
  await expect(page.getByText('omeprazole / sodium')).toBeVisible();
});

test('can navigate to symptoms picker via back button', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Get Started!' }).click();
  await page.getByPlaceholder('Search symptoms').fill('extra ');
  await page.getByText('extra marital contacts').click();
  await page.getByRole('link', { name: 'Diagnose' }).click();
  await page.getByRole('button', { name: 'Back' }).click();
  await expect(page.getByText('What are your symptoms?')).toBeVisible();
  await expect(page.getByText('extra marital contacts')).toBeVisible();
});
