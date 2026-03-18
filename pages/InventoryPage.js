/**
 * InventoryPage — Page Object for the SauceDemo product listing page.
 *
 * Provides helpers to:
 *   • Add / remove products from the cart
 *   • Read the cart badge count
 *   • Open the sidebar menu and log out
 */
class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.pageTitle = page.locator('.title');
  }

  /**
   * Add a product to the cart by its name slug.
   * Example slug: "sauce-labs-backpack"
   * @param {string} itemSlug — kebab-case product name
   */
  async addItemToCart(itemSlug) {
    await this.page.locator(`[data-test="add-to-cart-${itemSlug}"]`).click();
  }

  /**
   * Remove a product from the cart by its name slug.
   * @param {string} itemSlug
   */
  async removeItem(itemSlug) {
    await this.page.locator(`[data-test="remove-${itemSlug}"]`).click();
  }

  /**
   * Return the number shown on the cart badge.
   * Returns 0 if the badge is not visible.
   * @returns {Promise<number>}
   */
  async getCartBadgeCount() {
    if (await this.cartBadge.isVisible()) {
      const text = await this.cartBadge.textContent();
      return parseInt(text, 10);
    }
    return 0;
  }

  /** Navigate to the cart page by clicking the cart icon. */
  async goToCart() {
    await this.cartLink.click();
  }

  /** Open the sidebar menu and click the Logout link. */
  async logout() {
    await this.menuButton.click();
    // Wait for the sidebar animation to finish
    await this.logoutLink.waitFor({ state: 'visible' });
    await this.logoutLink.click();
  }
}

module.exports = { InventoryPage };
