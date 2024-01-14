import { test, expect } from '@playwright/test';

test('can select symptoms and find conditions', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Get Started!' }).click();
  await page.getByText('anxiety').click();
  await page.getByRole('link', { name: 'Diagnose' }).click();
  await expect(page.getByText('Hypoglycemia')).toBeVisible();
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
});

test('can remove selected symptoms', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Get Started!' }).click();
  await page.getByPlaceholder('Search symptoms').click();
  await page.getByPlaceholder('Search symptoms').fill('ex');
  await page.getByText('extra marital contacts').click();
  await expect(page.getByText('Remove extra marital contactsextra marital contacts')).toBeVisible();
  await page.getByRole('button', { name: 'Remove extra marital contacts' }).click();
  await expect(page.getByText('Remove extra marital contactsextra marital contacts')).not.toBeVisible();
});

test('conditions with more symptoms appear first', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Get Started!' }).click();
  await page.getByPlaceholder('Search symptoms').click();
  await page.getByPlaceholder('Search symptoms').fill('shiver');
  await page.getByText('shivering').click();
  await page.getByPlaceholder('Search symptoms').click();
  await page.getByPlaceholder('Search symptoms').fill('chills');
  await page.getByText('chills').click();
  await page.getByPlaceholder('Search symptoms').click();
  await page.getByPlaceholder('Search symptoms').fill('fever');
  await page.getByText('high fever').click();
  await page.getByRole('link', { name: 'Diagnose' }).click();
  await expect(page.getByText('Allergy')).toBeInViewport();
});

test('can navigate to homepage via nav bar', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Get Started!' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'Web Doctor' }).click();
  await expect(page.getByText('Welcome')).toBeVisible();
});

test('can navigate to symptoms picker via back button', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Get Started!' }).click();
  await page.getByRole('link', { name: 'Diagnose' }).click();
  await page.getByRole('button', { name: 'Back' }).click();
  await expect(page.getByText('What are your symptoms?')).toBeVisible();
});
