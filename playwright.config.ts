import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  timeout: 10 * 10 * 60 * 1000,
  globalTimeout: 10 * 60 * 60 * 1000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report/', open: 'never' }],
    ['list'],
  ],
  use: {
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
      name: 'e2e',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.UI_HOME_BASE_URL,
        storageState: 'playwright/.auth/user.json',
        testIdAttribute: 'data-test'
      },
      dependencies: ['setup'],
      workers: process.env.WORKERS ? Number(process.env.WORKERS): 1,
      testDir: './tests/e2e',
    },

    {
      name: 'api',
      use: { baseURL: process.env.API_BASE_URL },
      workers: process.env.WORKERS ? Number(process.env.WORKERS): 1,
      testDir: './tests/api',
    },
  ],
});
