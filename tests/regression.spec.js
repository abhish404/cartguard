// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

/**
 * REGRESSION TEST SUITE
 *
 * Smoke test that exercises the complete happy path in a single test:
 *   Login → Add to Cart → Checkout → Fill Form → Finish → Logout
 *
 * This serves as a critical regression gate — if this test fails, something
 * fundamental is broken in the application's core user journey.
 */
test.describe('Regression — Full Happy Path', () => {
  test('should complete the entire user journey: login → cart → checkout → logout', async ({ page }) => {
    // ─── Step 1: Login ──────────────────────────────────────────────────
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);

    // ─── Step 2: Add items to cart ──────────────────────────────────────
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await inventoryPage.addItemToCart('sauce-labs-bolt-t-shirt');
    expect(await inventoryPage.getCartBadgeCount()).toBe(2);

    // ─── Step 3: Navigate to cart and verify ─────────────────────────────
    await inventoryPage.goToCart();
    const cartPage = new CartPage(page);
    expect(await cartPage.getItemCount()).toBe(2);

    // ─── Step 4: Checkout — fill information ─────────────────────────────
    await cartPage.proceedToCheckout();
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillInformation('Smoke', 'Test', '00000');
    await checkoutPage.continue();

    // ─── Step 5: Review order summary ────────────────────────────────────
    await expect(checkoutPage.summaryItems).toHaveCount(2);
    await expect(checkoutPage.totalLabel).toBeVisible();

    // ─── Step 6: Finish the order ────────────────────────────────────────
    await checkoutPage.finish();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');

    // ─── Step 7: Return home and logout ──────────────────────────────────
    await checkoutPage.backToProducts();
    await expect(page).toHaveURL(/inventory/);
    await inventoryPage.logout();

    // Assert — back on login page
    await expect(page).toHaveURL('/');
    await expect(loginPage.loginButton).toBeVisible();
  });
});
