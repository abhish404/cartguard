// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

/**
 * CHECKOUT TEST SUITE
 *
 * Validates the complete checkout process:
 *   • Full happy-path checkout (add item → cart → checkout → finish)
 *   • Empty checkout form validation
 *   • Order confirmation message verification
 */
test.describe('Checkout Functionality', () => {
  let inventoryPage;
  let cartPage;
  let checkoutPage;

  // Log in and add an item to cart before each test
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);

    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
  });

  test('should complete the full checkout flow successfully', async ({ page }) => {
    // Arrange — add a product and go to cart
    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/cart/);

    // Act — proceed through checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInformation('John', 'Doe', '90210');
    await checkoutPage.continue();

    // Assert — verify order summary is displayed
    await expect(checkoutPage.summaryItems).toHaveCount(1);
    await expect(checkoutPage.totalLabel).toBeVisible();

    // Act — finish the purchase
    await checkoutPage.finish();

    // Assert — confirmation message is shown
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    await expect(page).toHaveURL(/checkout-complete/);
  });

  test('should show validation error when checkout form is empty', async ({ page }) => {
    // Arrange — add item and proceed to checkout
    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    // Act — click Continue without filling the form
    await checkoutPage.continue();

    // Assert — "First Name is required" error appears
    const errorText = await checkoutPage.getErrorMessage();
    expect(errorText).toContain('First Name is required');
  });

  test('should display order confirmation message after successful checkout', async ({ page }) => {
    // Arrange — add item, go through checkout
    await inventoryPage.addItemToCart('sauce-labs-bike-light');
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInformation('Jane', 'Smith', '10001');
    await checkoutPage.continue();
    await checkoutPage.finish();

    // Assert — verify both confirmation header and description text
    const headerText = await checkoutPage.getCompleteHeaderText();
    expect(headerText).toBe('Thank you for your order!');
    await expect(checkoutPage.completeText).toBeVisible();
    await expect(checkoutPage.backHomeButton).toBeVisible();
  });
});
