// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

/**
 * LOGIN TEST SUITE
 *
 * Validates authentication flows on SauceDemo including:
 *   • Successful login with valid credentials
 *   • Locked-out user error handling
 *   • Invalid credentials error handling
 *   • Empty form validation
 *   • Logout functionality
 */
test.describe('Login Functionality', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login successfully with standard_user credentials', async ({ page }) => {
    // Arrange & Act — log in with valid credentials
    await loginPage.login('standard_user', 'secret_sauce');

    // Assert — user is redirected to the inventory page
    await expect(page).toHaveURL(/inventory/);
  });

  test('should show error message for locked_out_user', async () => {
    // Arrange & Act — attempt login with a locked-out account
    await loginPage.login('locked_out_user', 'secret_sauce');

    // Assert — an appropriate error is displayed
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('locked out');
  });

  test('should show error message for wrong password', async () => {
    // Arrange & Act — provide an incorrect password
    await loginPage.login('standard_user', 'wrong_password');

    // Assert — generic "do not match" error appears
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('do not match');
  });

  test('should show validation error when username and password are empty', async () => {
    // Act — click Login without entering any credentials
    await loginPage.login('', '');

    // Assert — "Username is required" validation error
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Username is required');
  });

  test('should show validation error when only password is empty', async () => {
    // Act — provide username but leave password blank
    await loginPage.login('standard_user', '');

    // Assert — "Password is required" validation error
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Password is required');
  });

  test('should log out successfully and return to the login page', async ({ page }) => {
    // Arrange — log in first
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);

    // Act — perform logout via the sidebar menu
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.logout();

    // Assert — user is back on the login page
    await expect(page).toHaveURL('/');
    await expect(loginPage.loginButton).toBeVisible();
  });
});
