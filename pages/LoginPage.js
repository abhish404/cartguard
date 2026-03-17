/**
 * LoginPage — Page Object for the SauceDemo login screen.
 *
 * Encapsulates all selectors and actions related to authentication:
 *   • Filling credentials
 *   • Submitting the login form
 *   • Reading error messages
 */
class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators (using data-test attributes for stability)
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /** Navigate to the login page */
  async goto() {
    await this.page.goto('/');
  }

  /**
   * Perform a login with the given credentials.
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Return the visible error message text.
   * @returns {Promise<string>}
   */
  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}

module.exports = { LoginPage };
