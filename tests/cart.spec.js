// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');

/**
 * CART TEST SUITE
 *
 * Validates shopping cart functionality:
 *   • Adding a single item and verifying the badge
 *   • Adding multiple items and verifying the count
 *   • Removing an item from the cart
 *   • Cart persistence after page navigation
 */
test.describe('Cart Functionality', () => {
  let inventoryPage;
  let cartPage;

  // Log in before each test so we start on the inventory page
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);

    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
  });

  test('should update cart badge when adding a single item', async () => {
    // Act — add one product to the cart
    await inventoryPage.addItemToCart('sauce-labs-backpack');

    // Assert — cart badge shows "1"
    const count = await inventoryPage.getCartBadgeCount();
    expect(count).toBe(1);
  });

  test('should update cart badge when adding multiple items', async () => {
    // Act — add three products to the cart
    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await inventoryPage.addItemToCart('sauce-labs-bike-light');
    await inventoryPage.addItemToCart('sauce-labs-bolt-t-shirt');

    // Assert — cart badge shows "3"
    const count = await inventoryPage.getCartBadgeCount();
    expect(count).toBe(3);
  });

  test('should remove an item from the cart', async ({ page }) => {
    // Arrange — add two items
    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await inventoryPage.addItemToCart('sauce-labs-bike-light');
    expect(await inventoryPage.getCartBadgeCount()).toBe(2);

    // Act — navigate to cart and remove one item
    await inventoryPage.goToCart();
    await cartPage.removeItem('sauce-labs-backpack');

    // Assert — only one item remains in the cart
    const itemCount = await cartPage.getItemCount();
    expect(itemCount).toBe(1);
  });

  test('should persist cart contents after navigating away and back', async ({ page }) => {
    // Arrange — add an item to the cart
    await inventoryPage.addItemToCart('sauce-labs-backpack');
    expect(await inventoryPage.getCartBadgeCount()).toBe(1);

    // Act — navigate to the cart, then back to products, then back to cart
    await inventoryPage.goToCart();
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/inventory/);
    await inventoryPage.goToCart();

    // Assert — the item is still in the cart
    const itemCount = await cartPage.getItemCount();
    expect(itemCount).toBe(1);
  });
});
