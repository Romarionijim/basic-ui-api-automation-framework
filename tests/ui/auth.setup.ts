import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { SauceDemoCredentials } from '../../ui/consts/sauce-credentials.consts';

const authFile = path.join(__dirname, '../../playwright/.auth/user.json');

setup('Authenticate', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('username').fill(SauceDemoCredentials.STANDARD_USERNAME);
    await page.getByTestId('password').fill(SauceDemoCredentials.STANDARD_PASSWORD);
    await page.getByTestId('login-button').click();
    await expect(page).toHaveURL(/inventory.html/);
    await page.context().storageState({ path: authFile });
})