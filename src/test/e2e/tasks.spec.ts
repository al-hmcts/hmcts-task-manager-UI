import { expect, test } from '@playwright/test';

async function login(page) {
  await page.goto('https://localhost:3100/');

  const username = page.getByRole('textbox', { name: 'Username' });
  const password = page.getByRole('textbox', { name: 'Password' });

  await username.fill('test.user');
  await password.fill('Password123');
  await page.getByRole('button', { name: 'Sign in' }).click();
}

test('Route to login page if not logged in', async ({ page }) => {
  await page.goto('https://localhost:3100/tasks');

  const signInHeading = page.getByRole('heading', { name: 'Sign in' });

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/GOV.UK/);
  await expect(signInHeading).toBeVisible();
});

test('Login and navigate to all tasks', async ({ page }) => {
  await login(page);
  const allTasksHeading = page.getByRole('heading', { name: 'All Tasks' });
  await expect(allTasksHeading).toBeVisible();
});

test('Add/Edit/Remove task', async ({ page }) => {
  await login(page);

  // Define constants for reusable elements
  const addTaskButton = page.getByRole('button', { name: 'Add Task' });
  const taskTitleInput = page.getByRole('textbox', { name: 'Task title' });
  const taskDescriptionInput = page.getByRole('textbox', { name: 'Task description' });
  const sortByDropdown = page.getByLabel('Sort by');
  const dayInput = page.getByRole('textbox', { name: 'Day' });
  const monthInput = page.getByRole('textbox', { name: 'Month' });
  const yearInput = page.getByRole('textbox', { name: 'Year' });
  const saveTaskButton = page.getByRole('button', { name: 'Save Task' });
  const editLink = page.getByRole('link', { name: 'Edit' });
  const updateTaskButton = page.getByRole('button', { name: 'Update Task' });
  const deleteLink = page.getByRole('link', { name: 'Delete' });
  const confirmDeleteButton = page.getByRole('button', { name: 'Yes, delete task' });

  // Add a new task
  await addTaskButton.click();
  await taskTitleInput.fill('Frodos Task');
  await taskDescriptionInput.fill('Retrieve the ring from Mount Doom');
  await sortByDropdown.selectOption('in progress');
  await dayInput.fill('1');
  await monthInput.fill('09');
  await yearInput.fill('2025');
  await saveTaskButton.click();
  await expect(page.getByText('Frodos Task')).toBeVisible();

  // Edit the task
  await editLink.first().click();
  await taskTitleInput.fill('Frodos Task - Updated');
  await sortByDropdown.selectOption('completed');
  await updateTaskButton.click();
  await expect(page.getByText('Frodos Task - Updated')).toBeVisible();

  // Delete the task
  await deleteLink.first().click();
  await confirmDeleteButton.click();
  await expect(page.getByText('Frodos Task - Updated')).not.toBeVisible();
});
