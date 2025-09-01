import { expect, test } from '@playwright/test';

test('Route to login page if not logged in', async ({ page }) => {
  await page.goto('https://localhost:3100/tasks');

  const signInHeading = page.getByRole('heading', { name: 'Sign in' });

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/GOV.UK/);
  await expect(signInHeading).toBeVisible();
});

test('get started link', async ({ page }) => {
  await page.goto('https://localhost:3100/');

  const username = page.getByRole('textbox', { name: 'Username' });
  const password = page.getByRole('textbox', { name: 'Password' });

  // Click the get started link.
  await username.fill('test.user');
  await password.fill('Password123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  const allTasksHeading = page.getByRole('heading', { name: 'All Tasks' });

  await expect(allTasksHeading).toBeVisible();
});
