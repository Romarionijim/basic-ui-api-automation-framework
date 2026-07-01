import { test as setup } from '../../ui/fixtures/page-object-fixture';
import { expect } from '@playwright/test';
import path from 'path';
import { SauceDemoCredentials } from '../../ui/consts/sauce-credentials.consts';

const authFile = path.join(__dirname, '../../playwright/.auth/user.json');

setup('Authenticate', async ({ page, loginPage, homePage }) => {
    await loginPage.navigateTo('/');
    await loginPage.loginToSauceDemo();
    const currentPage = await homePage.getCurrentPage();
    await expect(currentPage).toHaveURL(/inventory.html/);
    await page.context().storageState({ path: authFile });
})