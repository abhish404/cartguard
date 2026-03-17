// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright Configuration
 *
 * Configures cross-browser testing (Chromium & Firefox), screenshots on failure,
 * HTML reporting, and a base URL pointing to SauceDemo.
 *
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  // Directory containing test files
  testDir: './tests',

  // Maximum time a single test can run (30 seconds)
  timeout: 30_000,

  // Assertion-specific timeout
  expect: {
    timeout: 5_000,
  },

  // Run tests in parallel across files
  fullyParallel: true,

  // Fail the build on CI if test.only is left in the source code
  forbidOnly: !!process.env.CI,

  // Retry failed tests once on CI, no retries locally
  retries: process.env.CI ? 1 : 0,

  // Limit parallel workers on CI to avoid flakiness
  workers: process.env.CI ? 1 : undefined,

  // HTML reporter — generates a rich interactive report
  reporter: 'html',

  // Shared settings for all projects
  use: {
    // Base URL for all page.goto() calls
    baseURL: 'https://www.saucedemo.com',

    // Capture screenshot only when a test fails
    screenshot: 'only-on-failure',

    // Record trace on first retry for debugging
    trace: 'on-first-retry',

    // Set viewport for consistent rendering
    viewport: { width: 1280, height: 720 },
  },

  // Cross-browser projects
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
