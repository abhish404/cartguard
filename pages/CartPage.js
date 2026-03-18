/**
 * CartPage — Page Object for the SauceDemo shopping cart.
 *
 * Encapsulates selectors and actions for:
 *   • Viewing cart items
 *   • Removing items
 *   • Navigating to checkout or back to shopping
 */
class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.pageTitle = page.locator('.title');
  }

  /**
   * Remove a specific item from the cart by its slug.
   * @param {string} itemSlug — kebab-case product name
   */
  async removeItem(itemSlug) {
    await this.page.locator(`[data-test="remove-${itemSlug}"]`).click();
  }

  /** Click the Checkout button to proceed. */
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  /** Click Continue Shopping to go back to the inventory page. */
  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  /**
   * Return the number of items currently in the cart.
   * @returns {Promise<number>}
   */
  async getItemCount() {
    return await this.cartItems.count();
  }
}

module.exports = { CartPage };
