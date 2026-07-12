# UI & API basic Test Automation Framework

A Playwright-based test automation framework covering **UI end-to-end tests** against [SauceDemo](https://www.saucedemo.com/) and **API tests** against [JSONPlaceholder](https://jsonplaceholder.typicode.com/). Built with TypeScript using the Page Object Model pattern, custom Playwright fixtures, and a reusable API client along with server-based arch framework.

---

## Overview

### UI (E2E) Tests

The UI layer automates the SauceDemo web application — a sample e-commerce site. Tests cover:

- **Login** — valid credentials, locked-out users, empty fields, and wrong password scenarios.
- **Add to Cart** — selecting a product on the homepage and verifying the cart badge.
- **Purchase Order (E2E)** — a full end-to-end purchase flow: add item → cart → checkout form → overview → order confirmation.

Authentication is handled via a **setup project** that logs in once, persists the browser storage state to disk, and reuses it across all E2E test projects — eliminating repeated login steps.

### API Tests

The API layer tests RESTful CRUD operations against JSONPlaceholder's `/posts` resource:

- **GET** — retrieve all posts and a single post by ID.
- **POST** — create a new post and assert `201 Created`.
- **PATCH** — partially update a post by ID.
- **DELETE** — delete a post by ID and assert `200 OK`.

A generic `ApiClient` wrapper abstracts HTTP methods (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) and is consumed by domain-specific service classes (e.g. `PostsService`).

---

## Project Structure

### UI (E2E) Architecture

```
e2e/                              ← UI framework layer
├── consts/
│   ├── login-error.consts.ts         # Login error message enums
│   ├── sauce-credentials.consts.ts   # SauceDemo username/password enums
│   └── visibility-options.consts.ts  # waitFor state options enum
├── fixtures/
│   └── page-object-fixture.ts        # Custom Playwright fixture wiring all page objects
├── mocks/
│   └── mock-generator.ts             # Chance.js wrapper for random test data
├── pages/
│   ├── base.page.ts                  # Base page with shared helpers (navigate, waitFor, getText)
│   ├── login.page.ts                 # Login page object
│   ├── home.page.ts                  # Homepage page object (add to cart, go to cart)
│   ├── cart.page.ts                  # Cart page object
│   ├── checkout.page.ts              # Checkout form page object
│   ├── checkout-overview.page.ts     # Checkout overview page object
│   └── checkout-completion.page.ts   # Order completion page object
├── tags/
│   └── test-tags.ts                  # E2E tag enums (@sanity, @login, @cart, @purchase)
└── types/
    └── checkout-details.type.ts      # CheckoutDetails interface

tests/e2e/                        ← UI test specs
├── auth.setup.ts                     # Authentication setup (runs before all E2E tests)
├── login/
│   └── login-tests.spec.ts           # Login scenario tests
├── homepage/
│   └── add-item-to-cart.spec.ts      # Add-to-cart tests
└── purchase/
    └── purchase-order-e2e.spec.ts    # Full purchase flow E2E test
```

### API Architecture

```
api/                              ← API framework layer
├── client/
│   └── api-client.ts                 # Generic HTTP client wrapper (GET, POST, PUT, PATCH, DELETE)
├── consts/
│   └── api-request-methods.consts.ts # HTTP method enums
├── fixtures/
│   └── api.fixture.ts                # Custom Playwright fixture wiring API services
├── services/
│   └── posts/
│       └── post.service.ts           # PostsService — CRUD methods for /posts resource
├── tags/
│   └── test-tags.ts                  # API tag enums (@posts)
└── types/
    ├── api-options.types.ts          # ApiRequestOptions interface (data, params, auth)
    └── post-options.types.ts         # Post & PostResourceOptions interfaces

tests/api/                        ← API test specs
└── posts/
    └── posts-crud.spec.ts            # CRUD tests for /posts endpoint
```

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          Test Spec Files                                │
│    tests/e2e/**/*.spec.ts              tests/api/**/*.spec.ts           │
└────────────┬───────────────────────────────────────┬────────────────────┘
             │                                       │
             ▼                                       ▼
┌────────────────────────────┐          ┌────────────────────────────┐
│    E2E Fixture             │          │    API Fixture              │
│  page-object-fixture.ts   │          │    api.fixture.ts           │
│  (extends Playwright test) │          │  (extends Playwright test) │
└────────────┬───────────────┘          └────────────┬───────────────┘
             │                                       │
             ▼                                       ▼
┌────────────────────────────┐          ┌────────────────────────────┐
│      Page Objects          │          │      Services              │
│  ┌──────────────────────┐  │          │  ┌──────────────────────┐  │
│  │     BasePage          │  │          │  │   PostsService       │  │
│  │  ┌─────────────────┐  │  │          │  └──────────┬───────────┘  │
│  │  │ LoginPage       │  │  │          │             │              │
│  │  │ HomePage        │  │  │          │             ▼              │
│  │  │ CartPage        │  │  │          │  ┌──────────────────────┐  │
│  │  │ CheckoutPage    │  │  │          │  │     ApiClient        │  │
│  │  │ OverviewPage    │  │  │          │  │  (HTTP abstraction)  │  │
│  │  │ CompletionPage  │  │  │          │  └──────────────────────┘  │
│  │  └─────────────────┘  │  │          │                            │
│  └──────────────────────┘  │          └────────────────────────────┘
└────────────────────────────┘
             │                                       │
             ▼                                       ▼
┌────────────────────────────┐          ┌────────────────────────────┐
│   Shared Utilities         │          │   Shared Utilities         │
│  • consts/ (credentials,   │          │  • consts/ (HTTP methods)  │
│    errors, visibility)     │          │  • types/ (request opts,   │
│  • mocks/ (Chance.js)      │          │    post model)             │
│  • types/ (checkout form)  │          │  • tags/ (test tags)       │
│  • tags/ (test tags)       │          │                            │
└────────────────────────────┘          └────────────────────────────┘
```

---

## Prerequisites

- **Node.js** — LTS version (check with `node -v`)
- **npm** — comes with Node.js

---

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd saucedemo-framework-assignment
   ```

2. **Install dependencies** (clean install from lockfile)

   ```bash
   npm ci
   ```

3. **Install Playwright browsers** (required for E2E tests)

   ```bash
   npx playwright install
   ```

   > To also install OS-level dependencies (needed in CI / fresh environments), use:
   > ```bash
   > npx playwright install --with-deps
   > ```

4. **Set up environment variables**

   Create a `.env` file in the project root (one is already provided):

   ```env
   UI_HOME_BASE_URL="https://www.saucedemo.com/inventory.html"
   LOGIN_BASE_URL="https://www.saucedemo.com/"
   API_BASE_URL="https://jsonplaceholder.typicode.com/"
   ```

---

## Running Tests

### All E2E Tests (headless)

```bash
npm run e2e
```

### E2E Tests in Dev Mode (headed, single worker)

```bash
npm run e2e:dev
```

### All API Tests

```bash
npm run api
```

### Run by Tag

```bash
npx playwright test --project=e2e --grep @sanity
npx playwright test --project=e2e --grep @login
npx playwright test --project=e2e --grep @cart
npx playwright test --project=e2e --grep @purchase
npx playwright test --project=api --grep @posts
```

### TypeScript Build Check

```bash
npm run build
```

### View HTML Report

After a test run, open the generated Playwright report:

```bash
npx playwright show-report
```

---

## CI / CD

The project uses **GitHub Actions** with a **workflow → composite action** architecture.

The main workflow (`.github/workflows/playwright.yml`) is triggered on **push to main**, **pull requests to main**, a **daily cron schedule** (`0 5 * * *`), and **manual dispatch**. It defines two jobs that run **in parallel** on `ubuntu-latest`:

- **`run_e2e_tests`** — checks out the repo, then **calls the composite action** at `.github/actions/e2e-tests/action.yaml`. This action handles Node setup, dependency caching, Playwright browser installation (with version-based caching), runs `npm run e2e`, and uploads the HTML report as an artifact.

- **`run_api_tests`** — checks out the repo, then **calls the composite action** at `.github/actions/api-tests/action.yaml`. This action handles Node setup, dependency caching, runs `npm run api`, and uploads the HTML report. No browser installation is needed since API tests use Playwright's `APIRequestContext` directly.

Both composite actions cache `node_modules` based on the `package-lock.json` hash to speed up subsequent runs, and both upload Playwright HTML reports as artifacts (retained for 3 days).


---

## NPM Scripts Reference

| Script        | Command                                                                             | Description                               |
| ------------- | ----------------------------------------------------------------------------------- | ----------------------------------------- |
| `e2e`         | `npx playwright test --project=e2e`                                                | Run E2E tests (headless)                  |
| `e2e:dev`     | `HEADLESS=false WORKERS=1 npx playwright test --project=e2e`                        | Run E2E tests headed with a single worker |
| `api`         | `npx playwright test --project=api`                                                | Run API tests                             |
| `build`       | `npx tsc --noEmit`                                                                 | TypeScript type-check (no output)         |

---

## Key Technologies

| Technology             | Purpose                                                       |
| ---------------------- | ------------------------------------------------------------- |
| **Playwright**         | Browser automation & API testing framework                    |
| **TypeScript**         | Type-safe test and framework code                             |
| **Chance.js**          | Random test data generation (names, addresses)                |
| **dotenv**             | Environment variable management                               |
| **GitHub Actions**     | CI/CD pipeline for automated test execution                   |
