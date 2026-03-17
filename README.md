# 🛒 QA E-Commerce Automation Project

> End-to-end test automation for [SauceDemo](https://www.saucedemo.com) built with **Playwright** and the **Page Object Model** design pattern.

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![CI](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?logo=githubactions&logoColor=white)

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Project Structure](#project-structure)
- [Test Coverage](#test-coverage)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [CI/CD Pipeline](#cicd-pipeline)
- [What is the Page Object Model?](#what-is-the-page-object-model-pom)

---

## About the Project

This is a portfolio project demonstrating professional QA automation practices against a real e-commerce demo application. It covers **login**, **cart**, **checkout**, and **regression** scenarios across **Chromium** and **Firefox**.

**Key highlights:**

- 🏗️ **Page Object Model (POM)** — clean separation of selectors and test logic
- 🌐 **Cross-browser testing** — Chromium and Firefox
- 📸 **Screenshots on failure** — automatic capture for debugging
- 📊 **HTML reports** — rich, interactive test reports
- 🔄 **GitHub Actions CI/CD** — automated test runs on every push/PR

---

## Project Structure

```
qa-ecommerce-project/
├── tests/                          ← Test suites
│   ├── login.spec.js               ← Authentication tests
│   ├── cart.spec.js                 ← Shopping cart tests
│   ├── checkout.spec.js            ← Checkout flow tests
│   └── regression.spec.js          ← Full happy-path smoke test
├── pages/                          ← Page Object Model classes
│   ├── LoginPage.js                ← Login page selectors & actions
│   ├── InventoryPage.js            ← Product listing page
│   ├── CartPage.js                 ← Shopping cart page
│   └── CheckoutPage.js             ← Checkout flow (3 steps)
├── .github/
│   └── workflows/
│       └── playwright.yml          ← GitHub Actions CI/CD
├── playwright.config.js            ← Playwright configuration
├── package.json                    ← Dependencies & scripts
└── README.md                       ← You are here
```

---

## Test Coverage

| Suite | File | Tests | Scenarios |
|-------|------|:-----:|-----------|
| **Login** | `login.spec.js` | 6 | Valid login, locked user, wrong password, empty fields, logout |
| **Cart** | `cart.spec.js` | 4 | Single/multiple add, remove item, persistence after navigation |
| **Checkout** | `checkout.spec.js` | 3 | Full checkout flow, empty form validation, confirmation message |
| **Regression** | `regression.spec.js` | 1 | End-to-end smoke: login → cart → checkout → logout |
| | | **14** | **Total tests × 2 browsers = 28 test runs** |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) **v18+**
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/qa-ecommerce-project.git
cd qa-ecommerce-project

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install --with-deps chromium firefox
```

---

## Running Tests

```bash
# Run all tests (Chromium + Firefox)
npm test

# Run tests on Chromium only
npm run test:chromium

# Run tests on Firefox only
npm run test:firefox

# Open the HTML test report
npm run test:report
```

### Useful Playwright CLI options

```bash
# Run in headed mode (see the browser)
npx playwright test --headed

# Run a specific test file
npx playwright test tests/login.spec.js

# Run tests with verbose output
npx playwright test --reporter=list

# Debug a test with the Playwright Inspector
npx playwright test --debug
```

---

## CI/CD Pipeline

This project includes a **GitHub Actions** workflow (`.github/workflows/playwright.yml`) that:

1. ✅ Triggers on every **push** and **pull request** to `main`
2. ✅ Sets up **Node.js 18**
3. ✅ Installs dependencies and Playwright browsers
4. ✅ Runs **all tests**
5. ✅ Uploads the **HTML report** as a downloadable artifact

The HTML test report is retained for **30 days** and can be downloaded from the workflow run's "Artifacts" section.

---

## What is the Page Object Model (POM)?

The **Page Object Model** is a design pattern used in test automation that creates an abstraction layer between the test code and the UI under test.

### How it works

Each page (or major component) of the application is represented by a **class** that:

1. **Stores element locators** — all selectors (IDs, CSS selectors, data attributes) live in one place
2. **Exposes action methods** — like `login()`, `addItemToCart()`, `fillInformation()`
3. **Hides implementation details** — tests don't need to know *how* the page works, only *what* it can do

### Example

```javascript
// ❌ Without POM — brittle, duplicated selectors everywhere
await page.locator('[data-test="username"]').fill('standard_user');
await page.locator('[data-test="password"]').fill('secret_sauce');
await page.locator('[data-test="login-button"]').click();

// ✅ With POM — clean, reusable, maintainable
const loginPage = new LoginPage(page);
await loginPage.login('standard_user', 'secret_sauce');
```

### Why real QA teams use POM

| Benefit | Explanation |
|---------|-------------|
| **Maintainability** | If a selector changes, you update it in **one place** (the page object), not in dozens of tests |
| **Readability** | Tests read like plain English: `loginPage.login(...)` instead of raw selectors |
| **Reusability** | The same page object is shared across multiple test files |
| **Scalability** | As the app grows, you simply add new page objects without touching existing tests |
| **Team Collaboration** | Developers can update page objects while QA engineers focus on writing test logic |

In professional QA teams, POM is the **industry standard** for organizing Playwright, Selenium, and Cypress test suites. It's one of the first patterns interviewers look for in a QA Engineer's portfolio.

---

## 📄 License

This project is open-sourced under the [MIT License](LICENSE).

---

*Built as a portfolio project demonstrating QA automation best practices.*
