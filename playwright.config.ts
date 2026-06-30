import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'test-results/', open: false }],
    ['list'],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    launchOptions: {
      slowMo: 650,
      headless: process.env.HEADLESS === 'false' ? false : true
    }
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      use: {
        baseURL: process.env.LOGIN_BASE_URL,
        testIdAttribute: 'data-test'
      }
    },

    {
      name: 'ui',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.UI_HOME_BASE_URL,
        storageState: 'playwright/.auth/user.json',
        testIdAttribute: 'data-test'
      },
      dependencies: ['setup'],
      workers: process.env.CI ? 2 : 1,
      testDir: './tests/ui',
    },

    {
      name: 'api',
      use: { baseURL: process.env.API_BASE_URL },
      workers: process.env.CI ? 2 : 1,
      testDir: './tests/api',
    },
  ],
});
