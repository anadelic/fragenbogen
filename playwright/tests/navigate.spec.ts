import { expect, test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'New Iteration' }).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('test');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByLabel('Luke Skywalker').check();
  await page.getByRole('button', { name: 'Next Question' }).click();
  await page.getByText('Hoth').click();
  await page.getByText('Endor').click();
  await page.getByRole('button', { name: 'Next Question' }).click();
  await page.getByText('Return of the Jedi').click();
  page.once('dialog', (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Next Question' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
});
