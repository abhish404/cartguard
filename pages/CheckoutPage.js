/**
 * CheckoutPage — Page Object for the SauceDemo checkout flow.
 *
 * Covers the multi-step checkout process:
 *   Step 1: Your Information (name & postal code)
 *   Step 2: Overview (order summary)
 *   Complete: Confirmation screen
 */
class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Step 1 — Your Information
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');

    // Step 2 — Overview
    this.summaryItems = page.locator('.cart_item');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
    this.finishButton = page.locator('[data-test="finish"]');

    // Complete
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  /**
   * Fill the personal information form on checkout step 1.
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} postalCode
   */
  async fillInformation(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  /** Submit the information form (Step 1 → Step 2). */
  async continue() {
    await this.continueButton.click();
  }

  /** Click Finish to complete the purchase (Step 2 → Complete). */
  async finish() {
    await this.finishButton.click();
  }

  /**
   * Return the error message text shown on the checkout form.
   * @returns {Promise<string>}
   */
  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  /**
   * Return the confirmation header text (e.g. "Thank you for your order!").
   * @returns {Promise<string>}
   */
  async getCompleteHeaderText() {
    return await this.completeHeader.textContent();
  }

  /** Click "Back Home" to return to the inventory page after checkout. */
  async backToProducts() {
    await this.backHomeButton.click();
  }
}

module.exports = { CheckoutPage };
